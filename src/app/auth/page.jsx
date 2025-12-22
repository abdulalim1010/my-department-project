"use client";

import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-blue-50 to-blue-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
      >
        {/* Title */}
        <motion.h1
          key={isLogin ? "login-title" : "register-title"}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-center text-blue-800 mb-2"
        >
          {isLogin ? "Welcome Back" : "Create Account"}
        </motion.h1>

        <motion.p
          key={isLogin ? "login-subtitle" : "register-subtitle"}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center text-gray-500 mb-6"
        >
          {isLogin
            ? "Login to continue"
            : "Register with your information"}
        </motion.p>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login-form" : "register-form"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <AuthForm isLogin={isLogin} />
          </motion.div>
        </AnimatePresence>

        {/* Toggle */}
        <motion.div
          key={isLogin ? "login-toggle" : "register-toggle"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-2 text-blue-700 font-semibold hover:underline"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
