import { useState } from 'react'
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Copy, BookOpen, Check, LinkIcon, Clock } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select" // Add this import

// Sample data (you would typically fetch this from an API)
const newsletters = [
    { id: 1, name: 'Morning Brew', description: 'Daily business news', categories: ['Business', 'Tech', 'Finance'], subscribed: true },
    { id: 2, name: 'The Hustle', description: 'Tech and business news', categories: ['Tech', 'Business', 'Startups'], subscribed: true },
    { id: 3, name: 'TLDR', description: 'Tech news for developers', categories: ['Tech', 'Development', 'AI'], subscribed: true },
  ]
  
  const recommendedNewsletters = [
    { id: 7, name: 'Finimize', description: 'Financial news made simple', categories: ['Finance', 'Business', 'Investing'], subscribed: false },
    { id: 8, name: 'CB Insights', description: 'Tech market intelligence', categories: ['Tech', 'Market', 'Analysis'], subscribed: false },
    { id: 9, name: 'Product Hunt Daily', description: 'Best new products', categories: ['Tech', 'Products', 'Startups'], subscribed: false },
  ]
  
  const articles = [
    { id: 1, title: 'The Future of AI in Healthcare', source: 'TechCrunch', categories: ['AI', 'Healthcare', 'Tech'] },
    { id: 2, title: 'How Blockchain is Revolutionizing Finance', source: 'Forbes', categories: ['Blockchain', 'Finance', 'Tech'] },
    { id: 3, title: 'The Rise of No-Code Platforms', source: 'Wired', categories: ['No-Code', 'Tech', 'Development'] },
  ]
  
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

export default function LoggedInPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategories, setActiveCategories] = useState(['AI'])
  const [activeTab, setActiveTab] = useState('newsletters')
  const [email, setEmail] = useState('') // Add this line to define 'email'
  const [isFrequencyDialogOpen, setIsFrequencyDialogOpen] = useState(false) // Add this line to define 'isFrequencyDialogOpen'
  const [frequency, setFrequency] = useState('daily') // Add this line to define 'frequency'
  const [day, setDay] = useState('monday') // Add this line to define 'day'
  const [time, setTime] = useState('') // Add this line to define 'time'

  const toggleCategory = (category: string) => {
    setActiveCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 bg-white"> // Added bg-white class
      <h1 className="text-4xl font-bold text-center mb-4">CONTEXTI.FYI</h1>
      <p className="text-center mb-4">One email ID to rule them all!</p>
      
      <div className="max-w-md mx-auto mb-8 relative">
        <Input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="pr-10 text-center"
        />
        <Button 
          variant="ghost" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={() => navigator.clipboard.writeText(email)}
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <p className="text-center mb-8">
        Use your dedicated email ID to sign-up for newsletters<br />
        Clean inbox = Happy you!
      </p>

      <div className="flex justify-between items-center mb-4">
        <Input 
          type="text" 
          placeholder="Search newsletters and articles"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Dialog open={isFrequencyDialogOpen} onOpenChange={setIsFrequencyDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Clock className="mr-2 h-4 w-4" /> Set Notification Frequency
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Notification Frequency</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-4">
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              {frequency === 'weekly' && (
                <Select value={day} onValueChange={setDay}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(d => (
                      <SelectItem key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Input 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)}
              />
              <Button onClick={() => setIsFrequencyDialogOpen(false)}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {['AI', 'Tech', 'Business', 'Finance', 'Startups', 'Innovation'].map(category => (
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
        </TabsList>
        <TabsContent value="newsletters">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsletters.map(newsletter => (
              <Card key={newsletter.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      {newsletter.name.substring(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-bold">{newsletter.name}</h3>
                      <p className="text-sm text-gray-500">{newsletter.description}</p>
                    </div>
                    <div className="text-xs text-gray-400 ml-auto">3d ago</div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {newsletter.categories.map(category => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Copy className="h-4 w-4 mr-2" /> Unsub
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <BookOpen className="h-4 w-4 mr-2" /> Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="articles">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map(article => (
              <Card key={article.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="mb-2">
                    <h3 className="font-bold">{article.title}</h3>
                    <p className="text-sm text-gray-500">{article.source}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {article.categories.map(category => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <BookOpen className="h-4 w-4 mr-2" /> Read Summary
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <h2 className="text-2xl font-bold mb-4">Recommended</h2>
      <p className="mb-4">One-click subscribe. Stay informed with no added effort.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedNewsletters.map(newsletter => (
          <Card key={newsletter.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  {newsletter.name.substring(0, 2)}
                </div>
                <div>
                  <h3 className="font-bold">{newsletter.name}</h3>
                  <p className="text-sm text-gray-500">{newsletter.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-2">
                {newsletter.categories.map(category => (
                  <Badge key={category} variant="secondary" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Check className="h-4 w-4 mr-2" /> Sub
                </Button>
                <Button variant="outline" className="flex-1">
                  <LinkIcon className="h-4 w-4 mr-2" /> Link
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}