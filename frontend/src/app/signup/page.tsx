"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AttachNetLogo from "../components/AttachNetLogo";
import Label from "../atoms/Label";
import Input from "../atoms/Input";
import Select from "../atoms/Select";
import Button from "../atoms/Button";

export default function SignupPage() {
  const searchParams = useSearchParams();
  const roleType = searchParams?.get("role") === "1" ? "Student" : "Teacher";
  const role = searchParams?.get("role")

  const [formData, setFormData] = useState({
    role: role,
    name: "",
    email: "",
    academicId: "",
    department: "",
    phone: "",
    batch: "",
    password: "",
  });

  const departments = ["CSE", "EEE", "CE", "ME", "BME", "ETE", "MSE", "MIE", "PME", "WRE", "Archi"];
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async () => {
    
    const { name, email, academicId, department, phone, batch, password } = formData;
    if (!name || !email || !academicId || !department || !phone || !batch || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User created successfully:", result);
        router.push("/login");
      } else {
        const error = await response.json();
        console.error("Failed to create user:", error);
        alert("Failed to create user. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("An error occurred while creating the user.");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
      <div className="container mx-auto px-4 pb-16 pt-8">
        <div className="flex flex-col items-center mb-6">
          <AttachNetLogo />
          <h1 className="text-4xl font-bold text-black mt-4">Create Your AttachNet Account</h1>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="space-y-4">
              <div>
                <Label text="Role"/>
                <input
                  type="text"
                  value={roleType}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-100 rounded-lg shadow-md border border-gray-200 text-black focus:outline-none"
                />
              </div>
              <div>
              <Label text="Name"/>
              <Input type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-lg shadow-md border border-gray-200 text-black focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none"
                />
                
              </div>

              <div>
              <Label text="Email"/>
              <Input 
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-lg shadow-md border border-gray-200 text-black focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none"
                  />
              </div>

              <div>
              <Label text={`${roleType}ID`}/>
                <Input
                  type="text"
                  name="academicId"
                  placeholder="Enter your academic ID"
                  value={formData.academicId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-lg shadow-md border border-gray-200 text-black focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none"
                />
              </div>

            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <div>
              <Label text="Department"/>
              <Select
                name="department"
                value={formData.department}
                onChange={handleChange}
                options={departments}
                placeholder="Select your department"
              />
              </div>

              <div>
              <Label text="Phone"/>
                <Input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-lg shadow-md border border-gray-200 text-black focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none"
                />
              </div>

              <div>
              <Label text="Batch"/>
                <Input
                  type="text"
                  name="batch"
                  placeholder="Enter your batch"
                  value={formData.batch}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-lg shadow-md border border-gray-200 text-black focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none"
                />
              </div>

              <div>
              <Label text="Password"/>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white rounded-lg shadow-md border border-gray-200 text-black focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 outline-none"
                />
              </div>
            </div>
          </div>


          <Button text="Submit" onClick={handleSubmit}
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-colors font-semibold mt-6"
          />

          <div className="text-center mt-6">
            <span className="text-black">Already have an account? </span>
            <Button text="Log In" onClick={() => router.push("/login")} 
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
              />
            
          </div>
        </div>
      </div>
    </div>
  );
}
