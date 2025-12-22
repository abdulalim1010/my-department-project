"use client";

import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";

const MySwal = withReactContent(Swal);

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
        await signInWithEmailAndPassword(auth, email, password);
        await MySwal.fire({
          icon: "success",
          title: "Login successful",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            firebaseUid: userCredential.user.uid,
          }),
        });

        await MySwal.fire({
          icon: "success",
          title: "Registration successful",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      setError(err.message);
      await MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
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

      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          firebaseUid: user.uid,
        }),
      });

      await MySwal.fire({
        icon: "success",
        title: `Welcome ${user.displayName}`,
        text: "Google Sign-In successful",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      setError(err.message);
      await MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <motion.input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
            whileHover={{ scale: 1.01 }}
          />
        )}

        <motion.input
          type="email"
          placeholder="Email Address"
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          whileFocus={{ scale: 1.02 }}
          whileHover={{ scale: 1.01 }}
        />

        <div className="relative">
          <motion.input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
            whileHover={{ scale: 1.01 }}
          />
          <span
            onClick={togglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Register"}
        </motion.button>
      </form>

      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="mb-2">
          Or {isLogin ? "sign in" : "register"} with Google
        </p>
        <motion.button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2 bg-white border flex items-center justify-center space-x-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <img
            src="/google.jpg"
            alt="Google logo"
            className="w-8 h-8 rounded-full"
          />
          <span>{loading ? "Processing..." : "Continue with Google"}</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
