import requestIp from 'request-ip';

const promptLimits = new Map();
const MAX_PROMPTS_PER_IP = 10;
const RESET_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(req) {
  const clientIp = requestIp.getClientIp(req);
  const ip = clientIp || 'unknown';

  const now = Date.now();
  const existing = promptLimits.get(ip);

  // If there's an existing record and it hasn't expired, check limit
  if (existing && now - existing.timestamp < RESET_INTERVAL_MS) {
    if (existing.count >= MAX_PROMPTS_PER_IP) {
      return Response.json(
        { error: 'Prompt limit reached. Please come back later.' },
        { status: 429 }
      );
    }
  } else {
    // Reset count if expired or doesn't exist
    promptLimits.set(ip, { count: 0, timestamp: now });
  }

  const { messages } = await req.json();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages,
      }),
    });

    const data = await response.json();

    // Update counter
    const updated = promptLimits.get(ip);
    promptLimits.set(ip, {
      count: updated.count + 1,
      timestamp: updated.timestamp,
    });

    return Response.json({
      response: {
        role: "assistant",
        content: data.choices[0].message.content,
      },
    });
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ error: "API error. Please try again." }, { status: 500 });
  }
}
