"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

interface PlanDetails {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  period: string;
  category: string;
  features: string[];
}

function BookingContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("planId");
  
  const [planDetails, setPlanDetails] = useState<PlanDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlanDetails() {
      if (!planId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/pricing/slug/${planId}`);
        if (!res.ok) {
          throw new Error("Plan not found");
        }
        const data = await res.json();
        
        if (data.success && data.data) {
          // Convert backend price (Decimal) to number
          const planData = {
            ...data.data,
            priceValue: parseFloat(data.data.price),
            price: `₦${parseFloat(data.data.price).toLocaleString()}`,
          };
          setPlanDetails(planData);
        } else {
          throw new Error("Invalid plan data");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load plan");
      } finally {
        setLoading(false);
      }
    }

    fetchPlanDetails();
  }, [planId]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Add padding to account for fixed navbar */}
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#0A1C38] mb-4">
            Complete Your Booking
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Fill in your details to proceed with your booking
          </p>

          {/* Loading State */}
          {loading && planId && (
            <div className="bg-blue-50 rounded-lg p-6 mb-8 text-center">
              <p className="text-gray-600">Loading plan details...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
              <p className="text-red-600 font-medium">{error}</p>
              <p className="text-sm text-gray-600 mt-2">
                Please go back and select a valid plan.
              </p>
            </div>
          )}

          {/* Selected Plan Display */}
          {planDetails && !loading && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-[#00BCD4]">
              <h2 className="text-xl font-semibold text-[#0A1C38] mb-2">
                Selected Plan
              </h2>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium text-gray-800">{planDetails.title}</p>
                  <p className="text-sm text-gray-500 capitalize">{planDetails.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#00BCD4]">
                    {planDetails.price}
                    <span className="text-sm font-normal text-gray-500">/{planDetails.period}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Booking Form */}
          <BookingForm 
            planId={planId || undefined}
            planDetails={planDetails || undefined}
          />
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading booking form...</p>
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
