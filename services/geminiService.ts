
import { GoogleGenAI } from "@google/genai";
import { Laptop } from "../types";

export interface BotReply {
  message: string;             // Plain text part of the reply
  products: Laptop[];          // Matched laptops from inventory (empty if none)
}

export const getLaptopRecommendation = async (
  userInput: string,
  inventory: Laptop[]
): Promise<BotReply> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return {
      message: "⚠️ Our AI Advisor is temporarily disabled because the Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file to enable this feature!",
      products: [],
    };
  }

  let ai;
  try {
    ai = new GoogleGenAI({ apiKey });
  } catch (error) {
    console.error("Gemini initialization error:", error);
    return {
      message: "There was a problem initializing the AI. Please check your Gemini API Key.",
      products: [],
    };
  }

  // Provide a slim version of inventory (no base64 images) to keep the prompt small
  const slimInventory = inventory.map(l => ({
    id: l.id,
    name: l.name,
    brand: l.brand,
    specs: l.specs,
    detailedSpecs: l.detailedSpecs,
    price: l.price,
    originalPrice: l.originalPrice,
    category: l.category,
    condition: l.condition,
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `You are a friendly and knowledgeable laptop sales expert at Wonderful Computers in Nigeria.

Available inventory (JSON):
${JSON.stringify(slimInventory)}

Customer query: "${userInput}"

INSTRUCTIONS:
- Suggest 1-3 specific laptops from the inventory that best match the customer's needs and budget.
- Be warm, concise, and persuasive.
- Mention prices in Naira (₦).
- If no budget is mentioned and no products obviously match, ask one follow-up question about budget or use case.
- Always mention that Wonderful Computers offers nationwide delivery across Nigeria.

RESPONSE FORMAT (strict JSON — do NOT include any markdown, only raw JSON):
{
  "message": "Your friendly 2-3 sentence response here. Do not list product names in the message since they will be shown as cards below.",
  "productIds": ["id1", "id2"]
}

If no specific products match or you are asking a follow-up question, use an empty array: "productIds": []`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    const rawText = (response.text || '').trim();

    // Strip markdown code fences if Gemini wraps in ```json ... ```
    const jsonText = rawText.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();

    let parsed: { message: string; productIds: string[] };
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      // If JSON parsing fails, return the raw text as a plain message
      return { message: rawText || "I couldn't find a perfect match. Could you tell me your budget?", products: [] };
    }

    const matchedProducts = (parsed.productIds || [])
      .map((id: string) => inventory.find(l => l.id === id))
      .filter(Boolean) as Laptop[];

    return {
      message: parsed.message || "Here are some options for you!",
      products: matchedProducts,
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      message: "Our AI advisor is temporarily offline. You can browse our full catalog or message us directly on WhatsApp for instant help!",
      products: [],
    };
  }
};
