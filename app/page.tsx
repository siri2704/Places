import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ConversationGenerator from "@/components/conversation-generator"
import ConversationEvaluator from "@/components/conversation-evaluator"
import { ExampleConversations } from "@/components/example-conversations"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">PLACES</h1>
        <p className="text-xl text-center text-muted-foreground">
          Prompting Language Models for Social Conversation Synthesis
        </p>
      </div>

      <Tabs defaultValue="generate" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">Generate Conversations</TabsTrigger>
          <TabsTrigger value="examples">Example Conversations</TabsTrigger>
          <TabsTrigger value="evaluate">Evaluate Conversations</TabsTrigger>
        </TabsList>
        <TabsContent value="generate">
          <ConversationGenerator />
        </TabsContent>
        <TabsContent value="examples">
          <ExampleConversations />
        </TabsContent>
        <TabsContent value="evaluate">
          <ConversationEvaluator />
        </TabsContent>
      </Tabs>
    </main>
  )
}
