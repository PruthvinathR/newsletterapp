'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Settings, LogOut, CreditCard, Linkedin } from 'lucide-react'
import HomePage from './HomePage'
import LoggedInPage from './LoggedInPage'
import OutputPage from './OutputPage'
import { Input } from "../components/ui/input"

export function AppPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')
  const [email, setEmail] = useState('')
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isAccountDialogOpen, setIsAccountDialogOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
      setCurrentPage('loggedIn');
    } else {
      setCurrentPage('home'); // Ensure it defaults to 'home' if not logged in
    }
  }, [])

  const handleLogin = () => {
    localStorage.setItem('userToken', 'dummy-token');
    setIsLoggedIn(true);
    setCurrentPage('loggedIn');
    setIsSignInOpen(false); // Close the sign-in dialog
  }

  const handleLogout = () => {
    localStorage.removeItem('userToken')
    setIsLoggedIn(false)
    setCurrentPage('home')
    setIsAccountDialogOpen(false)
  }

  const handleSignUp = () => {
    localStorage.setItem('userToken', 'dummy-token'); // Simulate successful sign-up
    setIsLoggedIn(true);
    setCurrentPage('loggedIn');
    setIsSignUpOpen(false); // Close the sign-up dialog
  }

  return (
    <div className={`min-h-screen bg-black text-white`}>
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src={isLoggedIn ? "/images/logo_black.svg" : "/images/logo_white.svg"} alt="Contexti.fyi Logo" width={200} height={50} />
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
            <DialogContent className="sm:max-w-[425px] bg-white text-black">
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

      {currentPage === 'home' && <HomePage setIsSignUpOpen={setIsSignUpOpen} />}
      {currentPage === 'loggedIn' && <LoggedInPage />}
      {currentPage === 'output' && <OutputPage />}

      {/* Sign Up Dialog */}
      <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white text-black">
          <DialogHeader>
            <DialogTitle>Sign up</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button variant="outline" className="w-full">
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
            <Input type="password" placeholder="Password" />
            <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={handleSignUp}>Sign up</Button>
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

      {/* Sign In Dialog */}
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
            <Button className="w-full bg-black text-white hover:bg-gray-800" onClick={handleLogin}>Sign in</Button>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="bg-gray-900 mt-20">
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
  )
}