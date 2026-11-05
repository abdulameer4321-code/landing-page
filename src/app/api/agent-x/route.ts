import { NextRequest, NextResponse } from "next/server";
import { AGENT_X_SYSTEM_PROMPT } from "@/lib/agent-x-prompt";

// Force runtime execution on every request (never cache or pre-render at build time)
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Simple in-memory rate limiting: IP -> timestamp array
const ipRequestHistory = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (ipRequestHistory.get(ip) || []).filter((t) => t > windowStart);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestHistory.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  ipRequestHistory.set(ip, timestamps);
  return false;
}

// Helper to get API key from common environment variable variations
function getApiKey(): string {
  const rawKey =
    process.env.AGENT_X_API_KEY ||
    process.env.LLM_GATEWAY_API_KEY ||
    process.env.LLMGATEWAY_API_KEY ||
    process.env.NEXT_PUBLIC_AGENT_X_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.OPENAI_API_KEY ||
    process.env.GROQ_API_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    process.env.AGENTX_API_KEY ||
    process.env.AGENT_X_KEY ||
    "";

  // Clean any accidental whitespace or wrapping quotes from copy-paste
  return rawKey.trim().replace(/^["']|["']$/g, "");
}

// Swappable provider function to call the AI model API (supports LLM Gateway, Gemini, OpenAI, Groq, Anthropic)
async function callAiModel(prompt: string, userMessage: string): Promise<string> {
  const apiKey = getApiKey();
  const customModel = (process.env.AGENT_X_MODEL || "").trim();
  const customBaseUrl = (process.env.AGENT_X_BASE_URL || "").trim().replace(/\/+$/, "");

  if (!apiKey) {
    // Helpful fallback response when API key is not yet set in environment
    return getOfflineFallbackResponse(userMessage);
  }

  // 1. Explicit Custom Base URL or LLM Gateway (llmgateway.io)
  // LLM Gateway keys start with llmgtwy_ or llm_ or gw_, or when using LLMGateway provider
  const isLlmGateway =
    Boolean(customBaseUrl) ||
    apiKey.startsWith("llmgtwy_") ||
    apiKey.startsWith("llm_") ||
    apiKey.startsWith("gw_") ||
    Boolean(process.env.LLM_GATEWAY_API_KEY) ||
    Boolean(process.env.LLMGATEWAY_API_KEY) ||
    (!apiKey.startsWith("AIzaSy") && !apiKey.startsWith("sk-ant-") && !apiKey.startsWith("gsk_"));

  if (isLlmGateway) {
    const baseUrl = customBaseUrl || "https://api.llmgateway.io/v1";
    const endpoint = `${baseUrl}/chat/completions`;
    const model = customModel || "gpt-4o-mini";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 350,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const errJson = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
      const msg = errJson?.error?.message || `LLM Gateway responded with status ${res.status}`;
      throw new Error(`LLM Gateway Error (${res.status}): ${msg}`);
    }
    const data = await res.json();
    return (data?.choices?.[0]?.message?.content || "").trim();
  }

  // 1. OpenAI (sk-...)
  if (apiKey.startsWith("sk-") && !apiKey.startsWith("sk-ant-")) {
    const model = customModel || "gpt-4o-mini";
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 350,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const errJson = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
      const msg = errJson?.error?.message || `OpenAI responded with status ${res.status}`;
      throw new Error(`OpenAI Error (${res.status}): ${msg}`);
    }
    const data = await res.json();
    return (data?.choices?.[0]?.message?.content || "").trim();
  }

  // 2. Groq (gsk_...)
  if (apiKey.startsWith("gsk_")) {
    const model = customModel || "llama-3.1-8b-instant";
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: userMessage },
        ],
        max_tokens: 350,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const errJson = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
      const msg = errJson?.error?.message || `Groq responded with status ${res.status}`;
      throw new Error(`Groq Error (${res.status}): ${msg}`);
    }
    const data = await res.json();
    return (data?.choices?.[0]?.message?.content || "").trim();
  }

  // 3. Anthropic (sk-ant-...)
  if (apiKey.startsWith("sk-ant-")) {
    const model = customModel || "claude-3-5-haiku-latest";
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 350,
        system: prompt,
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    if (!res.ok) {
      const errJson = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
      const msg = errJson?.error?.message || `Anthropic responded with status ${res.status}`;
      throw new Error(`Anthropic Error (${res.status}): ${msg}`);
    }
    const data = await res.json();
    return (data?.content?.[0]?.text || "").trim();
  }

  // 4. Default: Google Gemini API (AIzaSy... or standard Gemini key)
  const model = customModel || "gemini-1.5-flash";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: `${prompt}\n\nUser Question: ${userMessage}` }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 350,
        temperature: 0.3,
      },
    }),
  });

  if (!res.ok) {
    const errJson = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
    const msg = errJson?.error?.message || `Gemini responded with status ${res.status}`;
    throw new Error(`Gemini Error (${res.status}): ${msg}`);
  }

  const data = await res.json();
  const answer =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "I was unable to generate an answer at this moment. Please try again.";

  return answer.trim();
}

function getOfflineFallbackResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes("privacy peek")) {
    return "Privacy Peek is a browser tool that inspects web pages directly on your device. It shows what notices and tracking cookies are placed, without sending your browsing data to any server. It is currently available as a walkthrough video.";
  }
  if (lower.includes("consent desk")) {
    return "Consent Desk helps websites create clear, unbundled notices for each purpose. It gives visitors a verifiable receipt and allows them to withdraw consent at any time.";
  }
  if (lower.includes("ropa")) {
    return "ROPAx is a tool to maintain a Record of Processing Activities. It documents what personal data you collect, why you collect it, who you share it with, and when you plan to delete it.";
  }
  if (lower.includes("gap assessment") || lower.includes("cloude5")) {
    return "Gap Assessment is an interactive tool hosted at cloude5.tech. It asks simple questions about your data practices and highlights where you need to take action under Indian privacy rules.";
  }
  if (lower.includes("dpdp") || lower.includes("law") || lower.includes("act")) {
    return "The Digital Personal Data Protection Act, 2023 is India's primary data privacy law. It requires companies (Data Fiduciaries) to provide clear notices, obtain genuine consent, protect user data, and erase data when its purpose is fulfilled.";
  }

  return "Thank you for asking. Agent X provides general information about Indian privacy law and these four tools. Note: To enable live model responses, please set AGENT_X_API_KEY in your environment.";
}

export async function POST(req: NextRequest) {
  let message = "";
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before asking another question." },
        { status: 429 }
      );
    }

    const body = await req.json();
    message = (body?.message || "").trim();

    if (!message) {
      return NextResponse.json(
        { error: "Please enter a question." },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Questions are limited to 500 characters." },
        { status: 400 }
      );
    }

    const reply = await callAiModel(AGENT_X_SYSTEM_PROMPT, message);

    return NextResponse.json({ reply });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error("[Agent X Route Error]:", errorMsg);
    // Return transparent feedback in chat so the user can see what the AI provider returned
    return NextResponse.json({
      reply: `⚠️ [AI Service Notice]: ${errorMsg}\n\nHere is information from the DPDP knowledge base:\n\n${getOfflineFallbackResponse(message)}`,
    });
  }
}
