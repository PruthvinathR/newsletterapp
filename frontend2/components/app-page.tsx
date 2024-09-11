'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
// import { useRouter } from 'next/navigation'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Check, Copy, BookOpen, Linkedin, Send, TrendingUp, Settings, LogOut, CreditCard, Clock, Link as LinkIcon } from 'lucide-react'

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

export function AppPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [email, setEmail] = useState('')
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false)
  const [isFrequencyDialogOpen, setIsFrequencyDialogOpen] = useState(false)
  const [frequency, setFrequency] = useState('weekly')
  const [day, setDay] = useState('monday')
  const [time, setTime] = useState('09:00')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategories, setActiveCategories] = useState(['AI'])
  const [activeTab, setActiveTab] = useState('newsletters')
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { role: 'system', content: 'Hello! I\'m your AI assistant. How can I help you with the latest tech news?' }
  ])

  // const router = useRouter()

  useEffect(() => {
    // Check if user is logged in (e.g., by checking for a token in localStorage)
    const token = localStorage.getItem('userToken')
    if (token) {
      setIsLoggedIn(true)
      setCurrentPage('loggedIn')
    }
  }, [])

  const handleLogin = () => {
    // Simulate login process
    localStorage.setItem('userToken', 'dummy-token')
    setIsLoggedIn(true)
    setCurrentPage('loggedIn')
    setIsSignInOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    setIsLoggedIn(false)
    setCurrentPage('home')
    setIsAccountDialogOpen(false)
  }

  const handleGetStarted = () => {
    setIsSignUpOpen(true)
  }

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

  const renderHomepage = () => (
    <>
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">Say no to an<br />OVERWHELMING INBOX</h1>
        <p className="text-xl mb-8">Read only what matters<br />Stay ahead while saving 10+ hours a week</p>
        <div className="max-w-md mx-auto relative">
          <Input 
            type="email" 
            placeholder="Start for free by entering your email ID" 
            className="bg-white/10 border-white/20 text-white placeholder-white/50 pr-12"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button 
            className="absolute right-1 top-1 bottom-1 rounded-l-none bg-[#B15A6A] hover:bg-[#9A4959] text-white"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </div>
      </section>

      <section id="how-it-works" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-8">How it works</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe 
            src="https://www.youtube.com/embed/5i0Z0E5yaYI" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </section>

      <section id="pricing" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-8">Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: 'Basic', price: '$9.99/month', features: ['5 newsletter summaries/week', 'Basic AI summarization', 'Email digests', 'Web app access'] },
            { name: 'Pro', price: '$14.99/month', features: ['Unlimited summaries', 'Advanced AI summarization', 'Custom categories', 'Mobile app access', 'Priority support'] },
            { name: 'Enterprise', price: 'Contact Sales', features: ['Custom solution', 'API access', 'Dedicated account manager', 'Advanced analytics', 'SSO & team management'] }
          ].map((plan, index) => (
            <Card key={index} className="bg-white text-black">
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <p className="text-xl font-bold">{plan.price}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" /> {feature}
                    </li>
                  ))}
                </ul>
                <Button className="mt-4 w-full bg-black text-white hover:bg-gray-800">
                  {plan.name === 'Enterprise' ? 'Contact Us' : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  )

  const renderLoggedInPage = () => (
    <main className="container mx-auto px-4 py-8">
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

  const renderOutputPage = () => (
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

  return (
    <div className={`min-h-screen ${isLoggedIn ? 'bg-white text-black' : 'bg-black text-white'}`}>
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src={isLoggedIn ? "/logo_black.svg" : "/logo_white.svg"} alt="Contexti.fyi Logo" width={200} height={50} />
          {isLoggedIn && (
            <div className="flex space-x-4">
              <Button variant="ghost" onClick={() => setCurrentPage('loggedIn')}>Input</Button>
              <Button variant="ghost" onClick={() => setCurrentPage('output')}>Output</Button>
            </div>
          )}
        </div>
        {isLoggedIn ? (
          <Dialog open={isAccountDialogOpen} onOpenChange={setIsAccountDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Account Management</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col space-y-4">
                <Button variant="outline" className="justify-start">
                  <Settings className="mr-2 h-4 w-4" /> Manage Profile
                </Button>
                <Button variant="outline" className="justify-start">
                  <CreditCard className="mr-2 h-4 w-4" /> Manage Billing
                </Button>
                <Button variant="outline" className="justify-start" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Button 
            variant="outline" 
            className="text-black bg-white hover:bg-gray-100"
            onClick={() => setIsSignUpOpen(true)}
          >
            Sign-up
          </Button>
        )}
      </header>

      {currentPage === 'home' && renderHomepage()}
      {currentPage === 'loggedIn' && renderLoggedInPage()}
      {currentPage === 'output' && renderOutputPage()}

      <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>Sign up</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button variant="outline" className="w-full">
              <Image src="/google-logo.svg" alt="Google logo" width={20} height={20} className="mr-2" />
              Sign up with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" />
            <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={handleLogin}>Sign up</Button>
          </div>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Button variant="link" className="p-0" onClick={() => {
              setIsSignUpOpen(false)
              setIsSignInOpen(true)
            }}>
              Sign in
            </Button>
          </p>
        </DialogContent>
      </Dialog>

      <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>Sign in</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button variant="outline" className="w-full">
              <Image src="/google-logo.svg" alt="Google logo" width={20} height={20} className="mr-2" />
              Sign in with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={handleLogin}>Sign in</Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-gray-900 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Image src="/logo_white.svg" alt="Contexti.fyi Logo" width={150} height={40} />
            </div>
            <nav className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="hover:text-gray-300">Terms</a>
              <a href="#" className="hover:text-gray-300">Privacy</a>
              <a href="#" className="hover:text-gray-300">Contact</a>
            </nav>
            <div className="flex space-x-4">
              <Linkedin className="h-6 w-6" />
            </div>
          </div>
          <div className="text-center mt-8">
            <p>&copy; 2024 Contexti.fyi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}