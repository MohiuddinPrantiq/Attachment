"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AttachNetLogo from "../components/AttachNetLogo";
import Select from "../atoms/Select";

export default function HomePage() {
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();

  const roles = [
    { id: 1, name: "Student" },
    { id: 2, name: "Teacher" },
  ];

  const handleRoleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSelectedRole(e.target.value);
  };

  const handleGetStarted = () => {
    if (!selectedRole) {
      alert("Please select a role to continue.");
      return;
    }

    // Get role ID based on the selected name
    const selectedRoleId = roles.find((role) => role.name === selectedRole)?.id;

    router.push(`/signup?role=${selectedRoleId}`);
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
          <div className="flex justify-center mb-6">
            <AttachNetLogo />
          </div>
          <h1 className="text-5xl font-bold text-indigo-900 mb-4">
            Welcome to AttachNet
          </h1>
          <p className="text-lg text-gray-600">
            Connect, Collaborate, and Learn Together
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          {/* Dropdown */}
          <div className="relative mb-6">
            <Select
              name="role"
              value={selectedRole}
              onChange={handleRoleChange}
              options={roles.map((role) => role.name)}
              placeholder="Select your role"
              className="w-full px-4 py-3 bg-white rounded-lg shadow-md border border-gray-200 text-gray-700 hover:border-indigo-300 transition-colors"
            />
          </div>

          {/* Buttons */}
          <div className="space-y-6">
            <button
              onClick={handleGetStarted}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors font-semibold"
            >
              Get Started
            </button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <span className="text-gray-600">Already have an account? </span>
              <button
                onClick={() => router.push("/login")}
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
              >
                Log In
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
