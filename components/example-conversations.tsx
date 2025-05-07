import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ConversationDisplay } from "./conversation-display"

const dyadicExamples = [
  {
    title: "Travel Conversation",
    conversation: `Alice: Hi!
Bob: Hey, how are you doing?
Alice: I'm doing well! I just got back from my vacation in Japan.
Bob: Wow that's awesome! What did you think of it?
Alice: Japan was such an amazing place to visit!
Bob: Wow! What was your favorite part?
Alice: I really enjoyed the food in Tokyo.
Bob: Which airline did you take?
Alice: I flew using Japan Airlines.`,
  },
  {
    title: "Hobbies Conversation",
    conversation: `Alice: What do you like to do for fun?
Bob: I used to play soccer in college, so I still like to play for fun on the weekends!
Alice: That's great. Soccer is a great way to stay in good shape.
Bob: I agree - it's really good cardio. What about you?
Alice: I love to play tennis. I've been taking lessons for a few months now!
Bob: Tennis is fun too!`,
  },
]

const triadicExamples = [
  {
    title: "Travel Conversation (3 People)",
    conversation: `Alice: Hi!
Bob: Hey, how are you doing?
Alice: I'm doing well! I just got back from my vacation in Japan.
Bob: Wow that's awesome! What did you think of it?
Alice: Japan was such an amazing place to visit!
Claire: Wow, I've always wanted to visit Japan!
Bob: What was your favorite part?
Alice: I really enjoyed the food in Tokyo. I had the best sushi of my life!
Bob: Which airline did you take?
Alice: I flew using Japan Airlines.
Claire: How expensive are tickets these days?`,
  },
  {
    title: "Hobbies Conversation (3 People)",
    conversation: `Alice: What do you like to do for fun?
Bob: I used to play soccer in college, so I still like to play for fun on the weekends!
Claire: Oh wow! Did you play varsity soccer?
Bob: Yeah, I was a four-year starter!
Alice: That's great. Soccer is a great way to stay in good shape.
Bob: I agree - it's really good cardio. What about you all?
Claire: I'm in a flag football league! We play every Saturday afternoon.
Alice: I love to play tennis. I've been taking lessons for a few months now!
Bob: Cool, football and tennis are fun too!`,
  },
]

export function ExampleConversations() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Example Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="dyadic">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dyadic">Dyadic (2 People)</TabsTrigger>
              <TabsTrigger value="triadic">Triadic (3 People)</TabsTrigger>
            </TabsList>
            <TabsContent value="dyadic" className="space-y-6 mt-4">
              {dyadicExamples.map((example, index) => (
                <ConversationDisplay key={index} title={example.title} conversation={example.conversation} />
              ))}
            </TabsContent>
            <TabsContent value="triadic" className="space-y-6 mt-4">
              {triadicExamples.map((example, index) => (
                <ConversationDisplay key={index} title={example.title} conversation={example.conversation} />
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
