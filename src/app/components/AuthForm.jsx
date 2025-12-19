"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

export default function AuthForm({ isLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // LOGIN
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful");
      } else {
        // REGISTER
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // Save user info to MongoDB
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            firebaseUid: userCredential.user.uid,
          }),
        });

        alert("Registration successful");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user info to MongoDB (if new)
      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          firebaseUid: user.uid,
        }),
      });

      alert("Google Sign-In successful");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={togglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          {loading
            ? "Processing..."
            : isLogin
            ? "Login"
            : "Register"}
        </button>
      </form>

      {!isLogin && (
        <div className="mt-4 text-center">
          <p className="mb-2">Or register with Google</p>
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
          >
            {loading ? "Processing..." : "Sign in with Google"}
          </button>
        </div>
      )}

      {isLogin && (
        <div className="mt-4 text-center">
          <p className="mb-2">Or sign in with Google</p>
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
          >
            {loading ? "Processing..." : "Sign in with Google"}
          </button>
        </div>
      )}
    </div>
  );
}
