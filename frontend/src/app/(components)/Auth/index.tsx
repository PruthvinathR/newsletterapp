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

    const [login, { data, error, isLoading }] = useLoginMutation();
    
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget.form as HTMLFormElement);

        if (isSignupMode) {
            const firstName = formData.get('firstName') as string;
            const lastName = formData.get('lastName') as string;
            const organization = formData.get('organization') as string;
            // Handle signup logic here
        } else {
            // Make login API call

            try {
                type LoginCredentials = { email: string; password: string };
                const credentials: LoginCredentials = { email, password }; 
                const result = await login(credentials);
                const data = result.data;
                if (data && data.access_token) {
                    // Store the JWT token (you might want to use a more secure method in production)
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
                    console.error('Login failed: Invalid response data');
                }
            } catch (error) {
                console.error('Login failed:', error);
                // Handle login error (e.g., show error message to user)
            }
            
        }
    };

    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {useAppSelector((state) => state.global.isSignupMode) ? 'Sign Up' : 'Login'}
            </h2>
            <form>
              {useAppSelector((state) => state.global.isSignupMode) && (
                <>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-2 mb-4 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-2 mb-4 border rounded"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Organization"
                    className="w-full p-2 mb-4 border rounded"
                    required
                  />
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
              <input
                type="password"
                placeholder="Password"
                className="w-full p-2 mb-6 border rounded"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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