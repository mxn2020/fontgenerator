import { action } from "./_generated/server";
import { v } from "convex/values";
export const generateFonts = action({
    args: { inputText: v.string(), style: v.optional(v.string()) },
    handler: async (_ctx, args) => {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey) throw new Error("OPENAI_API_KEY not configured");
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
            body: JSON.stringify({
                model: "gpt-4o", messages: [
                    {
                        role: "system", content: `You are Fontgenerator, a typography expert. Given text, suggest 10 Google Fonts that would work well for it. For each font, provide CSS import and a preview of how the text looks rendered. Output JSON:
{"fonts":[{"name":"<Google Font name>","css":"font-family: '<name>', <fallback>","preview":"<the text rendered description>","category":"serif|sans-serif|display|handwriting|monospace"}]}
Focus on free Google Fonts. The style preference is: ${args.style || 'versatile mix'}.`
                    },
                    { role: "user", content: args.inputText },
                ], temperature: 0.7, max_tokens: 2000, response_format: { type: "json_object" }
            }),
        });
        if (!r.ok) throw new Error(`API error`);
        return JSON.parse((await r.json() as any).choices?.[0]?.message?.content ?? "{}");
    },
});
