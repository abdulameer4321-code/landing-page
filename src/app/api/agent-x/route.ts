import { NextRequest, NextResponse } from "next/server";

// Force runtime execution on every request (never cache or pre-render at build time)
export const dynamic = "force-dynamic";
export const revalidate = 0;

// System Prompt for Agent X
const AGENT_X_SYSTEM_PROMPT = `You are Agent X, a helpful DPDP Copilot on the DPDP MatriX website created by Ameer Riaz.

Your job is to answer questions about:
1. India's Digital Personal Data Protection Act, 2023 (DPDP Act) and the DPDP Rules.
2. The four privacy tools: Privacy Peek, Consent Desk, ROPAx, and Gap Assessment.

Writing rules you must follow:
- Write in short, crisp, helpful sentences.
- Use plain language. Explain terms simply (e.g., "Data Fiduciary: the business that determines the purpose of processing").
- Keep replies focused and under 3 short paragraphs.
- Never give formal legal advice. State you provide general information on Indian privacy law.
- For unrelated queries, state: "I can only help with questions about Indian privacy law and the DPDP MatriX tools."

About the tools:
- Privacy Peek: Browser extension that inspects websites on-device to highlight notices and trackers. Status: Walkthrough only.
- Consent Desk: Consent management platform for unbundled notices and verifiable consent receipts. Status: Live.
- ROPAx: Digital Record of Processing Activities engine for DPDP compliance. Status: Live.
- Gap Assessment: Readiness questionnaire hosted at cloude5.tech highlighting compliance gaps. Status: Beta.

About the creator:
- Ameer Riaz is a Privacy Professional based in Bengaluru, Karnataka.
- Credentials: BBA LL.B. · LL.M. (Data Privacy and Information Technology) · Pursuing CIPP/E and DSCI.`;

// In-memory rate limiting: max 10 requests per minute per IP
const ipRequestHistory = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
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

// Read API key from common environment variable names
function getGoogleApiKey(): string {
  const rawKey =
    process.env.AGENT_X_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.GOOGLE_AI_KEY ||
    process.env.AI_STUDIO_API_KEY ||
    process.env.NEXT_PUBLIC_AGENT_X_API_KEY ||
    "";

  // Clean any whitespace or accidental wrapping quotes from copy-pasting
  return rawKey.trim().replace(/^["']|["']$/g, "");
}

// Built-in offline knowledge fallback
function getOfflineFallbackResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes("privacy peek")) {
    return "Privacy Peek is a client-side browser extension that inspects web pages directly on your device. It shows what notices and tracking cookies are placed, without sending your browsing data to any server. It is currently available as a walkthrough video.";
  }
  if (lower.includes("consent desk")) {
    return "Consent Desk helps websites create clear, unbundled notices for each purpose. It gives visitors a verifiable receipt and allows them to withdraw consent at any time.";
  }
  if (lower.includes("ropa")) {
    return "ROPAx is a tool to maintain a Record of Processing Activities. It documents what personal data you collect, why you collect it, who you share it with, and when you plan to delete it.";
  }
  if (lower.includes("gap assessment") || lower.includes("cloude5")) {
    return "Gap Assessment is an interactive readiness tool hosted at cloude5.tech. It asks simple questions about your data practices and highlights where you need to take action under Indian privacy rules.";
  }
  if (lower.includes("dpdp") || lower.includes("law") || lower.includes("act") || lower.includes("section")) {
    return "The Digital Personal Data Protection Act, 2023 (DPDP Act) is India's comprehensive data privacy law. It governs the processing of digital personal data, requiring Data Fiduciaries to obtain clear consent, provide purpose-specific notices, ensure data erasure, and protect the rights of Data Principals.";
  }

  return "Thank you for asking. Agent X provides general information about Indian privacy law and these four privacy tools. To enable live Google AI Studio model answers, set AGENT_X_API_KEY in your environment.";
}

// Call Google AI Studio (Gemini) API with automatic fallback across active model names
async function callGoogleAiStudio(userMessage: string): Promise<string> {
  const apiKey = getGoogleApiKey();
  if (!apiKey) {
    return getOfflineFallbackResponse(userMessage);
  }

  // Active Google AI Studio models in order of preference
  const candidateModels = [
    process.env.AGENT_X_MODEL?.trim(),
    "gemini-2.0-flash",
    "gemini-2.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro",
  ].filter(Boolean) as string[];

  let lastError = "";

  for (const model of candidateModels) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${AGENT_X_SYSTEM_PROMPT}\n\nUser Question: ${userMessage}` }],
            },
          ],
          generationConfig: {
            maxOutputTokens: 400,
            temperature: 0.3,
          },
        }),
      });

      if (!res.ok) {
        const errJson = (await res.json().catch(() => null)) as {
          error?: { message?: string; status?: string };
        } | null;
        lastError = errJson?.error?.message || `Status ${res.status}`;

        // If this specific model is not found, try the next candidate model in the list
        if (res.status === 404 || lastError.includes("not found")) {
          continue;
        }
        throw new Error(lastError);
      }

      const data = await res.json();
      const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (answer) {
        return answer.trim();
      }
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      lastError = msg;
      if (msg.includes("not found") || msg.includes("404")) {
        continue;
      }
      throw e;
    }
  }

  throw new Error(lastError || "Could not generate content from available Gemini models.");
}

export async function POST(req: NextRequest) {
  let message = "";
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.
