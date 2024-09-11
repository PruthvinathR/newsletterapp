import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Send, TrendingUp } from 'lucide-react'
import Image from 'next/image'

const newsletterData = [
  {
    id: 1,
    title: "OpenAI and Anthropic partner with US gov",
    source: "AI Weekly",
    content: "OpenAI and Anthropic just signed a groundbreaking agreement with the U.S. Artificial Intelligence Safety Institute to allow government access and testing of their AI models before public release. This collaboration is a step toward AI regulation and safety efforts, with the U.S. government evaluating AI models' capabilities and associated risks.",
    image: "/placeholder.svg?height=200&width=400",
    category: "AI"
  },
  {
    id: 2,
    title: "Apple unveils Vision Pro",
    source: "Tech Crunch",
    content: "Apple has announced its first major new product category since 2015: a mixed reality headset called Vision Pro. Priced at $3,499, it's positioned as a premium device for both consumers and professionals. The headset features high-resolution displays, advanced eye and hand tracking, and runs on visionOS, a new operating system designed for spatial computing.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Tech"
  },
  {
    id: 3,
    title: "SpaceX's Starship completes first integrated flight test",
    source: "Space News",
    content: "SpaceX's Starship, the world's largest and most powerful rocket, completed its first integrated flight test. While the mission ended in an explosion minutes after liftoff, SpaceX considers it a success in gathering crucial data for future improvements. This test marks a significant milestone in SpaceX's goal of making human life multi-planetary.",
    image: "/placeholder.svg?height=200&width=400",
    category: "Innovation"
  }
]

const trendingTopics = [
  { id: 1, topic: "AI Ethics", trend: "up", percentage: 15 },
  { id: 2, topic: "Quantum Computing", trend: "up", percentage: 8 },
  { id: 3, topic: "Sustainable Tech", trend: "up", percentage: 12 },
  { id: 4, topic: "Cybersecurity", trend: "down", percentage: 3 },
  { id: 5, topic: "5G Networks", trend: "up", percentage: 6 }
]

export default function OutputPage() {
  const [activeCategories, setActiveCategories] = useState(['AI'])
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { role: 'system', content: 'Hello! I\'m your AI assistant. How can I help you with the latest tech news?' }
  ])

  const toggleCategory = (category: string) => {
    setActiveCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatInput.trim()) {
      setChatMessages([...chatMessages, { role: 'user', content: chatInput }])
      // Simulated AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { role: 'system', content: `Here's a summary based on your query: "${chatInput}"...` }])
      }, 1000)
      setChatInput('')
    }
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">CONTEXTI.FYI</h1>
      <p className="text-center mb-8">No more TL;DR</p>

      <Tabs defaultValue="scrollable" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="scrollable">Scrollable</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="topics">Hot Topics</TabsTrigger>
          <TabsTrigger value="mindmap">Mind Map</TabsTrigger>
        </TabsList>

        <div className="flex flex-wrap gap-2 mb-4">
          {['AI', 'Tech', 'Start-up', 'Innovation'].map(category => (
            <Badge 
              key={category} 
              variant={activeCategories.includes(category) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <TabsContent value="scrollable">
          <div className="space-y-8">
            {newsletterData.filter(item => activeCategories.includes(item.category)).map(newsletter => (
              <Card key={newsletter.id}>
                <CardHeader>
                  <CardTitle>{newsletter.title}</CardTitle>
                  <p className="text-sm text-gray-500">{newsletter.source}</p>
                </CardHeader>
                <CardContent>
                  <Image src={newsletter.image} alt={newsletter.title} width={400} height={200} className="mb-4 rounded-lg" />
                  <p>{newsletter.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="chat">
          <Card>
            <CardContent className="p-4">
              <div className="mb-4 space-y-4">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-lg p-2 ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Input 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about the latest tech news..."
                  className="flex-grow"
                />
                <Button type="submit"><Send className="h-4 w-4" /></Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topics">
          <Card>
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {trendingTopics.map(topic => (
                  <li key={topic.id} className="flex items-center justify-between">
                    <span>{topic.topic}</span>
                    <div className="flex items-center">
                      {topic.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <TrendingUp className="h-4 w-4 text-red-500 mr-2 transform rotate-180" />
                      )}
                      <span className={topic.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                        {topic.percentage}%
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mindmap">
          <Card>
            <CardHeader>
              <CardTitle>Tech Landscape Mind Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-center text-gray-500">Interactive mind map visualization would go here, showing connections between different tech topics and trends.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}