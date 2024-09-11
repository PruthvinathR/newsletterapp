import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Check } from 'lucide-react'
import Image from 'next/image' // Add this import

interface HomePageProps {
  setIsSignUpOpen: (isOpen: boolean) => void;
}

export default function HomePage({ setIsSignUpOpen }: HomePageProps) {
  return (
    <>
      <section className="container mx-auto px-4 py-20 text-center">
        <Image src="/images/logo_white.svg" alt="Contexti.fyi Logo" width={200} height={50} className="mx-auto mb-4" /> {/* Updated logo path */}
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
}