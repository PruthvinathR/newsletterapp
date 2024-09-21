'use client';

import { useAppDispatch, useAppSelector } from '@/app/redux';
import { setIsAuthenticated, setIsSignupMode, setUser, User } from '@/app/state';
import { useLoginMutation, useSignupMutation } from '@/app/state/api';
import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode';

type Props = {

}

type DecodedToken = {
    sub: string;
    firstName: string;
    lastName: string;
    email: string;
}

const AuthComponent =  (props: Props) => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.global.isAuthenticated);
    const isSignupMode = useAppSelector((state) => state.global.isSignupMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [organization, setOrganization] = useState('');

    const [login, { data: loginData, error: loginError, isLoading: isLoginLoading }] = useLoginMutation();
    const [signup, { data: signupData, error: signupError, isLoading: isSignupLoading }] = useSignupMutation();

    const [showLoginError, setShowLoginError] = useState(false);
    const [showSignupError, setShowSignupError] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);

    
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        if (isSignupMode) {
            handleSignup();
        } else {
            handleLogin();
        }
    };

    const handleSignup = async () => {
        if (!isValidSignupForm()) {
            setShowSignupError(true);
            return;
        }

        setShowSignupError(false);
        const first_name = firstName;
        const last_name = lastName;
        try {
            const result = await signup({first_name, last_name, organization, email, password});
            handleAuthSuccess(result.data);
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const result = await login({email, password});
            handleAuthSuccess(result.data);
        } catch (error) {
            setShowLoginError(true);
            console.error('Login failed:', error);
        }
    };

    const handleAuthSuccess = (data: any) => {
        if (data && data.access_token) {
            localStorage.setItem('token', data.access_token);

            const decodedToken = jwtDecode<DecodedToken>(data.access_token);
            const userData: User = {
                id: decodedToken.sub,
                firstName: data.user.first_name,
                lastName: data.user.last_name,
                organization: data.user.organization,
                email: data.user.email
            };

            dispatch(setUser(userData));
            dispatch(setIsAuthenticated(true));
        } else {
            dispatch(setIsAuthenticated(false));
            setShowLoginError(true);
            console.error('Authentication failed: Invalid response data');
        }
    };

    const isValidSignupForm = () => {
        return firstName && lastName && organization && email && 
               password.length >= 8 && 
               /(?=.*[A-Z])/.test(password) && 
               /(?=.*[a-z])/.test(password) && 
               /(?=.*\d)/.test(password) && 
               /(?=.*[@!_%&*$])/.test(password);
    };

    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {useAppSelector((state) => state.global.isSignupMode) ? 'Sign Up' : 'Login'}
            </h2>
            <form>
              {isSignupMode && (
                <>
                  <input
                    type="text"
                    placeholder="First Name"
                    className={`w-full p-2 mt-4 border rounded ${firstName === '' && showSignupError && 'border-red-500'}`}
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {firstName === '' && showSignupError && <p className="text-red-500 text-sm mb-2">First Name is required</p>}
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={`w-full p-2 mt-4 border rounded ${lastName === '' && showSignupError && 'border-red-500'}`}
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {lastName === '' && showSignupError && <p className="text-red-500 text-sm mb-2">Last Name is required</p>}
                  <input
                    type="text"
                    placeholder="Organization"
                    className={`w-full p-2 mt-4 border rounded ${organization === '' && showSignupError && 'border-red-500'}`}
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                  />
                  {organization === '' && showSignupError && <p className="text-red-500 text-sm mb-2">Organization is required</p>}
                </>
              )}
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {email === '' && showSignupError && <p className="text-red-500 text-sm mb-2">Email is required</p>}
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-4 border rounded"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isSignupMode && password === '' && showSignupError && <p className="text-red-500 text-sm mb-2">Password is required</p>}
              {isSignupMode && showSignupError && (
                <>
                  {[
                    { condition: password.length < 8, message: "Password must be at least 8 characters long" },
                    { condition: !/(?=.*[A-Z])/.test(password), message: "Password must contain at least one uppercase letter" },
                    { condition: !/(?=.*[a-z])/.test(password), message: "Password must contain at least one lowercase letter" },
                    { condition: !/(?=.*\d)/.test(password), message: "Password must contain at least one number" },
                    { condition: !/(?=.*[@!_%&*$])/.test(password), message: "Password must contain at least one special character" }
                  ].map(({ condition, message }, index) => 
                    condition && <p key={index} className="text-red-500 text-sm mb-2">{message}</p>
                  )}
                </>
              )}
              {isSignupMode && (
                <p className="text-sm text-gray-600 mb-4">
                  Password must contain:
                  <ul className="list-disc pl-5">
                    <li>At least 8 characters</li>
                    <li>1 uppercase letter</li>
                    <li>1 lowercase letter</li>
                    <li>1 number</li>
                    <li>1 special character</li>
                  </ul>
                </p>
              )}
              {showLoginError && (
                <p className="text-red-500 text-sm mb-4">
                  Invalid username or password. Please try again.
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-blue-200 text-white p-2 rounded hover:bg-blue-600"
                onClick={handleSubmit}
              >
                {isSignupMode ? 'Sign Up' : 'Login'}
              </button>
            </form>
            <p className="mt-4 text-center">
              {useAppSelector((state) => state.global.isSignupMode) ? 'Already have an account?' : "Don't have an account?"}
              <button
                className="text-blue-500 hover:underline ml-1"
                onClick={() => {
                  dispatch(setIsSignupMode(!isSignupMode));
                  setShowLoginError((isSignupMode) => !isSignupMode);
                }}
              >
                {isSignupMode ? 'Login' : 'Sign Up'}
              </button>
            </p>
      </div>
    </div>
  )
}

export default AuthComponent