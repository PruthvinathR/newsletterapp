import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Check } from 'lucide-react'
import Image from 'next/image' // Add this import
import { ArrowDown } from 'lucide-react' // Import an arrow icon
import { useEffect, useState } from 'react'; // Add this import

interface HomePageProps {
  setIsSignUpOpen: (isOpen: boolean) => void;
}

export default function HomePage({ setIsSignUpOpen }: HomePageProps) {
  const [marginTop, setMarginTop] = useState('50vh'); // Initialize state for marginTop

  useEffect(() => {
    const handleResize = () => {
      const newMarginTop = window.innerHeight * 0.2; // Calculate dynamic margin
      setMarginTop(`${newMarginTop}px`);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call on mount to set initial value

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <section className="container mx-auto px-4 py-20 text-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <Image src="/images/logo_white.svg" alt="Contexti.fyi Logo" width={200} height={50} className="mx-auto mb-4" />
        <h1 className="text-5xl font-bold mb-4">Say no to an<br />OVERWHELMING INBOX</h1>
        <p className="text-xl mb-8">Read only what matters<br />Stay ahead while saving 10+ hours a week</p>
        <div className="max-w-md mx-auto relative">
          <Input 
            type="email" 
            placeholder="Start for free by entering your email ID" 
            className="bg-white/10 border-white/20 text-white placeholder-white/50 pr-12"
          />
          <Button 
            className="absolute right-1 top-1 bottom-1 rounded-l-none bg-[#B15A6A] hover:bg-[#9A4959] text-white"
            onClick={() => setIsSignUpOpen(true)}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Down Arrow Indicator */}
      <div className="flex justify-center mb-4 fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <ArrowDown 
          className="h-8 w-8 text-white animate-bounce cursor-pointer" 
          onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} 
        />
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="container mx-auto px-4 py-20" style={{ marginTop }}>
        <h2 className="text-3xl font-bold text-center mb-8">How it works</h2>
        <div className="relative">
          <iframe 
            src="https://www.youtube.com/embed/5i0Z0E5yaYI" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full rounded-lg shadow-lg aspect-video" // Updated classes for responsiveness and aspect ratio
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
}