"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../libs/supabse/client";

export default function AuthForm() {
  const router = useRouter();
  const [isNewUser, setIsNewUser] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Input validation
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please provide a valid email address.");
      return;
    }

    setIsSigningIn(true);
    setMessage("");
    setError(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (authError) {
        // Handle specific authentication errors
        switch (authError.status) {
          case 400:
            if (authError.message.includes("Invalid login credentials")) {
              setError("Invalid email or password. Please try again.");
            } else {
              setError("Invalid request. Please check your input.");
            }
            break;
          case 422:
            setError(
              "Unable to process login. Please check your email address."
            );
            break;
          case 429:
            setError(
              "Too many login attempts. Please try again in a few minutes."
            );
            break;
          case 401:
            setError("Authentication failed. Please check your credentials.");
            break;
          default:
            setError(authError.message || "Login failed. Please try again.");
        }
        console.error("Login error:", authError);
        return;
      }

      // Validate response data
      if (!data || !data.session || !data.user) {
        setError("Login failed. Invalid response from server.");
        console.error("Invalid login response:", data);
        return;
      }

      const token = data.session.access_token;
      const user = data.user;

      if (!token) {
        setError("Login failed. No authentication token received.");
        return;
      }

      // Store token securely
      try {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            email: user.email,
          })
        );
      } catch (storageError) {
        console.error("Failed to store authentication data:", storageError);
        setError(
          "Login successful, but failed to save session data. Some features may not work properly."
        );
        return;
      }

      setMessage("Login successful! Redirecting...");
      router.push("/photos");
      console.log("Login successful for user:", user.email);
    } catch (error) {
      console.error("Unexpected login error:", error);
      if (error instanceof Error) {
        if (
          error.name === "NetworkError" ||
          error.message.includes("network")
        ) {
          setError(
            "Network error. Please check your internet connection and try again."
          );
        } else if (error.message.includes("timeout")) {
          setError("Request timeout. Please try again.");
        } else if (error.message.includes("Failed to fetch")) {
          setError("Unable to connect to the server. Please try again later.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSigningIn(false);
    }
  }

  async function handleSignUp(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Input validation
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please provide a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setIsSigningUp(true);
    setMessage("");
    setError(null);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        switch (signUpError.status) {
          case 400:
            if (signUpError.message.includes("already registered")) {
              setError(
                "An account with this email already exists. Please try logging in."
              );
            } else {
              setError("Invalid email or password format.");
            }
            break;
          case 422:
            setError(
              "Unable to create account. Please check your email address."
            );
            break;
          case 429:
            setError("Too many signup attempts. Please try again later.");
            break;
          default:
            setError(signUpError.message || "Signup failed. Please try again.");
        }
        console.error("Signup error:", signUpError);
        return;
      }

      if (
        data.user &&
        data.user.identities &&
        data.user.identities.length === 0
      ) {
        setError(
          "An account with this email already exists. Please check your email or try logging in."
        );
        return;
      }

      if (data.user?.confirmation_sent_at) {
        setMessage(
          "Signup successful! Please check your email for the confirmation link."
        );
      } else {
        setMessage("Signup successful! You can now log in.");
      }

      console.log("Signup data:", data);
    } catch (error) {
      console.error("Unexpected signup error:", error);
      if (error instanceof Error) {
        if (
          error.name === "NetworkError" ||
          error.message.includes("network")
        ) {
          setError(
            "Network error. Please check your connection and try again."
          );
        } else if (error.message.includes("timeout")) {
          setError("Request timeout. Please try again.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSigningUp(false);
    }
  }

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const isLoading = isNewUser ? isSigningUp : isSigningIn;
  const buttonLabel = isNewUser
    ? isSigningUp
      ? "Creating Account..."
      : "Create Account"
    : isSigningIn
    ? "Signing In..."
    : "Sign In";

  return (
    <form
      onSubmit={isNewUser ? handleSignUp : handleLogin}
      className="w-full space-y-5"
    >
      {/* Form Header */}
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isNewUser ? "Create Your Account" : "Sign In to Your Account"}
        </h2>
        <p className="text-gray-600 text-sm">
          {isNewUser 
            ? "Join thousands of users storing their memories securely" 
            : "Welcome back! Enter your credentials to continue"
          }
        </p>
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-900 bg-white"
          placeholder="Enter your email address"
          required
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 text-gray-900 bg-white"
          placeholder="Enter your password"
          required
        />
        {isNewUser && (
          <p className="text-xs text-gray-500 mt-1">
            Password must be at least 6 characters long
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {buttonLabel}
          </div>
        ) : (
          buttonLabel
        )}
      </button>

      {/* Toggle Auth Mode */}
      <div className="text-center pt-4">
        <p className="text-gray-600 text-sm">
          {isNewUser ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsNewUser(!isNewUser);
              setError(null);
              setMessage("");
            }}
            className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-2 transition-colors duration-200"
          >
            {isNewUser ? "Sign In" : "Create Account"}
          </button>
        </p>
      </div>

      {/* Messages */}
      {message && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center gap-2 text-green-800 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {message}
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center gap-2 text-red-800 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        </div>
      )}
    </form>
  );
}