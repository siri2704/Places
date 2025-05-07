"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { useState } from "react"

interface ConversationDisplayProps {
  conversation: string
  title?: string
}

export function ConversationDisplay({ conversation, title = "Generated Conversation" }: ConversationDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(conversation)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Parse the conversation into turns
  const turns = conversation
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const match = line.match(/^([^:]+):(.*)/)
      if (match) {
        return {
          speaker: match[1].trim(),
          text: match[2].trim(),
        }
      }
      return null
    })
    .filter(Boolean)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-8">
          <Copy className="h-4 w-4 mr-2" />
          {copied ? "Copied!" : "Copy"}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {turns.map((turn, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <div className="font-medium text-sm">{turn?.speaker}</div>
              <div className="bg-muted p-3 rounded-md">{turn?.text}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
