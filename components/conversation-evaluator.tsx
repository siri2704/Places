"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { evaluateConversation } from "@/lib/evaluate-conversation"

export default function ConversationEvaluator() {
  const [conversation, setConversation] = useState("")
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [evaluation, setEvaluation] = useState<any>(null)

  const handleEvaluate = async () => {
    if (!conversation) return

    setIsEvaluating(true)
    try {
      const result = await evaluateConversation(conversation)
      setEvaluation(result)
    } catch (error) {
      console.error("Error evaluating conversation:", error)
    } finally {
      setIsEvaluating(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <Textarea
              placeholder="Paste a conversation to evaluate..."
              value={conversation}
              onChange={(e) => setConversation(e.target.value)}
              rows={10}
            />

            <Button onClick={handleEvaluate} disabled={isEvaluating || !conversation} className="w-full">
              {isEvaluating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Evaluating...
                </>
              ) : (
                "Evaluate Conversation"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {evaluation && (
        <Card>
          <CardHeader>
            <CardTitle>Conversation Evaluation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="font-medium">Coherence</div>
                  <div className="text-2xl">{evaluation.coherence}/5</div>
                  <div className="text-sm text-muted-foreground">
                    How logically connected and well-structured the conversation is
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Naturalness</div>
                  <div className="text-2xl">{evaluation.naturalness}/5</div>
                  <div className="text-sm text-muted-foreground">How similar to human conversation it appears</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="font-medium">Interestingness</div>
                  <div className="text-2xl">{evaluation.interestingness}/5</div>
                  <div className="text-sm text-muted-foreground">How engaging and content-rich the conversation is</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Consistency</div>
                  <div className="text-2xl">{evaluation.consistency}/5</div>
                  <div className="text-sm text-muted-foreground">How consistent each speaker's persona remains</div>
                </div>
              </div>
              <div className="pt-4">
                <div className="font-medium">Detailed Feedback</div>
                <div className="mt-2 p-4 bg-muted rounded-md whitespace-pre-wrap">{evaluation.feedback}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
