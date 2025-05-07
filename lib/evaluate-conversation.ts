import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function evaluateConversation(conversation: string) {
  const prompt = `
You are an expert in evaluating the quality of synthetic conversations. Please analyze the following conversation and rate it on a scale of 1-5 for each of these dimensions:

1. Coherence: How logically connected and well-structured is the conversation?
2. Naturalness: How similar to human conversation does it appear?
3. Interestingness: How engaging and content-rich is the conversation?
4. Consistency: How consistent is each speaker's persona throughout the conversation?

Also provide detailed feedback explaining your ratings.

Conversation:
${conversation}

Please format your response as a JSON object with the following structure:
{
  "coherence": number,
  "naturalness": number,
  "interestingness": number,
  "consistency": number,
  "feedback": "detailed explanation of ratings"
}
`

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
    temperature: 0.3,
    apiKey: process.env.OPENAI_API_KEY, // Access the API key from environment variables
  })

  try {
    return JSON.parse(text)
  } catch (error) {
    console.error("Error parsing evaluation result:", error)
    return {
      coherence: 0,
      naturalness: 0,
      interestingness: 0,
      consistency: 0,
      feedback: "Error evaluating conversation. Please try again.",
    }
  }
}
