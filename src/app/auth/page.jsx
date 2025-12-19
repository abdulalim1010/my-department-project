"use client";

import { useState } from "react";
import AuthForm from "../components/AuthForm";
 

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-500 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-center text-gray-500 mb-6">
          {isLogin
            ? "Login to continue"
            : "Register with your information"}
        </p>

        {/* Form */}
        <AuthForm isLogin={isLogin} />

        {/* Toggle */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-2 text-blue-700 font-semibold hover:underline"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </div>
      </div>
    </div>
  );
}
