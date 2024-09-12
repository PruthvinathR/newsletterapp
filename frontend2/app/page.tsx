"use client"; // Ensure this is a Client Component

import HomePage from '../components/HomePage';
import { useState } from 'react';

export default function Home() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false); // Manage the sign-up state

  return (
    <div>
      <HomePage setIsSignUpOpen={setIsSignUpOpen} />
    </div>
  );
}
