"use client"; // Mark this component as a Client Component

import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Check } from 'lucide-react'
import Image from 'next/image'
import { ArrowDown } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'; 
import { auth } from '../config/firebaseConfig'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Settings, LogOut, CreditCard, Linkedin } from 'lucide-react'
import { useRouter } from 'next/navigation';

interface HomePageProps {
  setIsSignUpOpen: (isOpen: boolean) => void;
}

export default function HomePage({ setIsSignUpOpen: setSignUpOpen }: HomePageProps) {
  const router = useRouter(); // Initialize router

  const [marginTop, setMarginTop] = useState('50vh');

  useEffect(() => {
    const handleResize = () => {
      const newMarginTop = window.innerHeight * 0.2;
      setMarginTop(`${newMarginTop}px`);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const howItWorksRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [email, setEmail] = useState('');
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); // Ensure this line is present

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
      setCurrentPage('loggedIn');
    } else {
      setCurrentPage('home');
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (userCredential) {
            setEmail(email); // Store the user's email in state
            setIsLoggedIn(true);
            router.push('/loggedInPage'); // Redirect to LoggedInPage
            setIsSignInOpen(false);
        }
    } catch (error) {
        console.error("Error signing in:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    router.push('/'); // Redirect to home page after logout
    setIsAccountDialogOpen(false);
  }

  const handleSignUp = async (email: string, password: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (userCredential) {
            setEmail(email); // Store the user's email in state
            setIsSignUpOpen(false);
            router.push('/loggedInPage'); // This should now work correctly
        }
    } catch (error) {
        console.error("Error signing up:", error);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        if (result) {
            const user = result.user;
            setEmail(user.email || ''); // Store the user's email in state
            setIsLoggedIn(true);
            setIsSignUpOpen(false);
            router.push('/loggedInPage'); // This should now work correctly
        }
    } catch (error) {
        console.error("Error signing up with Google:", error);
    }
  };

  return (
    <>
     <header className="container mx-auto px-4 py-6 flex justify-between items-center fixed top-0 left-0 right-0 z-10 w-full">
          <div className="flex items-center space-x-4 w-full"> 
            <Image src="/images/logo_white.svg" alt="Contexti.fyi Logo" width={200} height={50} />
          </div>
          <nav className="flex justify-center space-x-4 mb-4 w-full">
            <Button onClick={() => howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              How it works
            </Button>
            <Button onClick={() => pricingRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              Pricing
            </Button>
            <Button onClick={() => setIsSignUpOpen(true)}>Get Started</Button>
          </nav>
          <Button 
            variant="outline" 
            className="text-black bg-white hover:bg-gray-100"
            onClick={() => setIsSignUpOpen(true)}
          >
            Sign-up
          </Button>
        </header>
    
      <section className="container mx-auto px-4 py-10 text-center" style={{ marginTop: '100px' }}> 
        <Image src="/images/logo_white.svg" alt="Contexti.fyi Logo" width={200} height={50} className="mx-auto mb-4" />
        <h1 className="text-5xl font-bold mb-4 text-white">Say no to an<br />OVERWHELMING INBOX</h1>
        <p className="text-xl mb-8 text-white">Read only what matters<br />Stay ahead while saving 10+ hours a week</p>
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

      <div className="flex justify-center mb-4 fixed bottom-4 left-1/2 transform -translate-x-1/2">
        <ArrowDown 
          className="h-8 w-8 text-white animate-bounce cursor-pointer" 
          onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })} 
        />
      </div>

      <section ref={howItWorksRef} id="how-it-works" className="container mx-auto px-4 py-20 how-it-works" style={{ marginTop }}>
        <h2 className="text-3xl font-bold text-center mb-8 text-white">How it works</h2>
        <div className="relative">
          <iframe 
            src="https://www.youtube.com/embed/5i0Z0E5yaYI" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="w-full h-full rounded-lg shadow-lg aspect-video"
          ></iframe>
        </div>
      </section>

      <section ref={pricingRef} id="pricing" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Pricing Plans</h2>
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

      <div className={`bg-black text-white`}>
       

        <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
          <DialogContent className="sm:max-w-[425px] bg-white text-black">
            <DialogHeader>
              <DialogTitle>Sign up</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button variant="outline" className="w-full" onClick={handleGoogleSignUp}>
                <Image src="/images/google_logo.svg" alt="Google logo" width={20} height={20} className="mr-2" />
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
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> 
              <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={() => handleSignUp(email, password)}>Sign up</Button>
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
                <Image src="/images/google_logo.svg" alt="Google logo" width={20} height={20} className="mr-2" />
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
              <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={() => handleLogin(email, password)}>Sign in</Button>
            </div>
          </DialogContent>
        </Dialog>

        <footer className="bg-gray-900 mt-10">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <Image src="/images/logo_white.svg" alt="Contexti.fyi Logo" width={150} height={40} />
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
    </>
  )
}