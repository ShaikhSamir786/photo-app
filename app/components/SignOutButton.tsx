'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { BsBoxArrowRight } from 'react-icons/bs';

// Define constants for storage keys
const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'userData';
const REFRESH_TOKEN_KEY = 'refreshToken';

export default function SignOutButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Comprehensive storage clearing function
     */
    const clearAllAuthData = () => {
        if (typeof window === 'undefined') return;

        try {
            // Clear all localStorage items
            const itemsToRemove = [
                AUTH_TOKEN_KEY,
                USER_DATA_KEY,
                REFRESH_TOKEN_KEY,
                'supabase.auth.token',
                'sb-access-token',
                'sb-refresh-token',
            ];

            // Remove specific items
            itemsToRemove.forEach(key => {
                localStorage.removeItem(key);
            });

            // Also clear any items with Supabase prefixes
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('sb-') || key.startsWith('supabase.')) {
                    localStorage.removeItem(key);
                }
            });

            // Clear sessionStorage
            sessionStorage.clear();

            console.log("All authentication data cleared from storage.");
        } catch (storageError) {
            console.error("Failed to clear storage:", storageError);
            throw new Error("Failed to clear local data");
        }
    };

    /**
     * Main sign-out handler
     */
    const handleSignOut = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // 1. Attempt backend logout if endpoint exists
            try {
                const token = localStorage.getItem(AUTH_TOKEN_KEY);
                const response = await fetch('/api/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        ...(token && { 'Authorization': `Bearer ${token}` })
                    },
                    credentials: 'include'
                });

                if (response.ok) {
                    console.log("Backend logout successful.");
                } else {
                    console.warn("Backend logout failed, continuing with client-side cleanup.");
                }
            } catch (apiError) {
                console.warn("Backend logout endpoint not available, continuing with client-side cleanup.");
            }

            // 2. Clear all local authentication data
            clearAllAuthData();

            // 3. Redirect to login page immediately
            console.log("Redirecting to login page...");
            router.push('/login');
            
            // Force refresh to ensure clean state
            setTimeout(() => {
                router.refresh();
            }, 100);

        } catch (error) {
            console.error("Sign out failed:", error);
            
            // User-friendly error messages
            if (error instanceof TypeError && error.message.includes('fetch')) {
                setError("Network error. Signed out locally only.");
            } else if (error instanceof Error) {
                setError(`Sign out failed: ${error.message}`);
            } else {
                setError("An unexpected error occurred during sign out.");
            }

            // Even if something fails, try to clear data and redirect
            try {
                clearAllAuthData();
                router.push('/login');
            } catch (fallbackError) {
                console.error("Fallback redirect also failed:", fallbackError);
            }
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Emergency fallback sign-out
     */
    const handleEmergencySignOut = () => {
        try {
            // Nuclear option - clear everything
            if (typeof window !== 'undefined') {
                localStorage.clear();
                sessionStorage.clear();
                
                // Force redirect without router
                window.location.href = '/login';
            }
        } catch (error) {
            console.error("Emergency sign out failed:", error);
            // Last resort - hard reload to login
            window.location.href = '/login';
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={handleSignOut}
                disabled={isLoading}
                className={`
                    flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg 
                    transition-all duration-200 border shadow-sm
                    ${isLoading
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300'
                        : 'bg-white text-red-600 border-red-300 hover:bg-red-50 hover:text-red-700 hover:border-red-400 hover:shadow-md'
                    }
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                    disabled:opacity-60 disabled:cursor-not-allowed
                    min-w-[120px]
                `}
                aria-label={isLoading ? 'Signing out...' : 'Sign out'}
            >
                <BsBoxArrowRight 
                    size={16} 
                    className={isLoading ? 'animate-pulse' : ''} 
                />
                <span>{isLoading ? 'Signing Out...' : 'Sign Out'}</span>
            </button>

            {/* Error display */}
            {error && (
                <div className="flex flex-col gap-2 p-3 bg-red-50 border border-red-200 rounded-lg max-w-xs">
                    <p className="text-sm text-red-600 font-medium">{error}</p>
                    <div className="flex gap-2 mt-1">
                        <button
                            onClick={handleSignOut}
                            className="text-sm text-red-700 hover:text-red-800 font-medium px-3 py-1 bg-red-100 rounded-md hover:bg-red-200 transition-colors"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={handleEmergencySignOut}
                            className="text-sm text-red-700 underline hover:text-red-800 font-medium"
                        >
                            Emergency Sign Out
                        </button>
                    </div>
                </div>
            )}

            {/* Global loading overlay */}
            {isLoading && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-3 border border-gray-200">
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-red-600 border-t-transparent"></div>
                        <div>
                            <span className="text-gray-800 font-medium">Signing out</span>
                            <p className="text-gray-500 text-sm">Redirecting to login...</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}