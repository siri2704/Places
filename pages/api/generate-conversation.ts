import type { NextApiRequest, NextApiResponse } from "next";
import { generateConversation } from "../../lib/generate-conversation";

type Data = {
  conversation?: string;
  error?: string;
  details?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { topic, backgroundInfo, conversationType } = req.body;

    if (!topic || !backgroundInfo) {
      return res
        .status(400)
        .json({ error: "Missing required parameters: topic and backgroundInfo" });
    }

    const conversation = await generateConversation(
      topic,
      backgroundInfo,
      conversationType || "dyadic"
    );

    return res.status(200).json({ conversation });
  } catch (error: unknown) {
    let message = "Failed to generate conversation";
    if (error instanceof Error) {
      message = error.message;
    }
    return res.status(500).json({ error: message, details: message });
  }
}
