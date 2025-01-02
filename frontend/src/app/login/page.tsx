"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AttachNetLogo from "../components/AttachNetLogo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    console.log(email,password);
    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      console.log(response.ok)

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      let userData = await response.json();
      console.log(userData);

      router.push(`/profile?data=${encodeURIComponent(JSON.stringify(userData))}`);
      
    } catch (err) {
      throw new Error("Something went wrong. Try again later!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Centered Logo */}
          <div className="flex justify-center mb-6">
            <AttachNetLogo />
          </div>

          <h1 className="text-4xl font-bold text-indigo-900 mb-4">Access your AttachNet account</h1>
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <div className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-lg shadow-md border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white rounded-lg shadow-md border border-gray-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none"
            />
            <button
              onClick={handleLogin}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors font-semibold"
            >
              Log In
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-6"
          >
            <span className="text-gray-600">Don't have an account? </span>
            <button
              onClick={() => router.push("/home")}
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
            >
              Sign Up
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}


