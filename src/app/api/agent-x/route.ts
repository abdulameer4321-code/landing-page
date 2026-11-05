import { NextRequest, NextResponse } from "next/server";
import { AGENT_X_SYSTEM_PROMPT } from "@/lib/agent-x-prompt";

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

// Swappable provider function to call the AI model API
async function callAiModel(prompt: string, userMessage: string): Promise<string> {
  const apiKey = process.env.AGENT_X_API_KEY;
  const model = process.env.AGENT_X_MODEL || "gemini-1.5-flash";

  if (!apiKey) {
    // Helpful fallback response when API key is not yet set in environment
    return getOfflineFallbackResponse(userMessage);
  }

  // Example integration with Gemini / compatible REST endpoint
  // Keeps provider call isolated in one function so it can be swapped anytime
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
    throw new Error(`AI service responded with status ${res.status}`);
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
    const message = (body?.message || "").trim();

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
  } catch {
    return NextResponse.json(
      { error: "Sorry, I ran into an issue getting an answer. Please try again shortly." },
      { status: 500 }
    );
  }
}
