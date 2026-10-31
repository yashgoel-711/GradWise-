const DEFAULT_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "google/gemma-4-31b-it:free";
const DEFAULT_FALLBACKS = "google/gemma-4-26b-a4b-it:free,nvidia/nemotron-3-ultra-550b-a55b:free";

const SYSTEM_PROMPT =
  "You are GradWise AI Mentor, a friendly career assistant for college students. " +
  "Give practical advice on skills, certifications, projects, internships, resumes and learning roadmaps. " +
  "Keep answers concise and use markdown bullets where helpful.";

// Env is read per call so it does not matter when dotenv loads.
const getConfig = () => {
  const models = [
    process.env.AI_MODEL || DEFAULT_MODEL,
    ...(process.env.AI_FALLBACK_MODELS ?? DEFAULT_FALLBACKS).split(","),
  ]
    .map((m) => m.trim())
    .filter(Boolean);

  // Zero-cost guard: never call a paid model.
  const paid = models.find((m) => !m.endsWith(":free"));
  if (paid) {
    throw new Error(`Refusing to use "${paid}": only ":free" models are allowed`);
  }

  const apiKey = process.env.AI_API_KEY?.trim();
  if (!apiKey) throw new Error("AI_API_KEY is not set");

  return { url: process.env.AI_API_URL || DEFAULT_URL, apiKey, models };
};

const callModel = async ({ url, apiKey }, model, messages) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model, messages }),
    signal: AbortSignal.timeout(45000),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const err = new Error(data?.error?.message || `AI provider returned ${response.status}`);
    err.status = response.status;
    throw err;
  }

  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error(`Model ${model} returned an empty response`);
  return text;
};

/**
 * @param {string} prompt latest user message
 * @param {{role: "user"|"assistant", content: string}[]} [history] earlier turns
 */
const Ainvidia = async (prompt, history = []) => {
  const config = getConfig();
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history,
    { role: "user", content: prompt },
  ];

  let lastError;
  for (const model of config.models) {
    try {
      return await callModel(config, model, messages);
    } catch (error) {
      lastError = error;
      console.error(`AI model ${model} failed:`, error.message);
    }
  }
  throw lastError;
};

export { Ainvidia };
