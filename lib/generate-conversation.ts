import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { dyadicExamples, triadicExamples } from "./example-conversations"

export async function generateConversation(
  topic: string,
  backgroundInfo: string,
  conversationType = "dyadic",
): Promise<string> {
  // Select 3 random examples from the appropriate set
  const examples = conversationType === "dyadic" ? dyadicExamples : triadicExamples
  const selectedExamples = getRandomExamples(examples, 3)

  // Create the prompt
  const prompt = createPrompt(topic, backgroundInfo, selectedExamples, conversationType)

  // Generate the conversation
  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
    temperature: 0.92,
    maxTokens: 1000,
    apiKey: process.env.OPENAI_API_KEY, // Access the API key from environment variables
  })

  return text
}

function getRandomExamples(examples: string[], count: number): string[] {
  const shuffled = [...examples].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, examples.length))
}

function createPrompt(topic: string, backgroundInfo: string, examples: string[], conversationType: string): string {
  const speakers = conversationType === "dyadic" ? "Alice and Bob" : "Alice and Bob and Claire"

  const examplesText = examples.join("\n\n")

  return `${examplesText}

The following is a conversation between ${speakers} about ${topic}. ${backgroundInfo}

Result:`
}
