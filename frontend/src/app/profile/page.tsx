"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ProfileProps {
  id: number;
  role: number;
  academicId: string;
  name: string;
  email: string;
  password: string;
  department: string;
  phone: string;
  batch: string;
}

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const [user, setUser] = useState<ProfileProps | null>(null);

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const userData = JSON.parse(data);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [searchParams]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-indigo-600 px-8 py-10 text-center">
            <div className="h-24 w-24 rounded-full bg-white text-indigo-600 mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
              {user.name[0]}
            </div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-indigo-200 mt-2">{user.email}</p>
          </div>

          {/* Info Section */}
          <div className="px-8 py-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard title="ID" value={`#${user.academicId}`} />
              <InfoCard title="Phone" value={user.phone || "Not provided"} />
              <InfoCard title="Department" value={user.department || "Not provided"} />
              <InfoCard title="Batch" value={user.batch || "Not provided"} />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-indigo-900 font-medium">{value}</p>
    </div>
  );
}
