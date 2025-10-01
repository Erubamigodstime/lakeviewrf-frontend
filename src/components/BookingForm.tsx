"use client";
import { useState } from "react";

export default function BookingForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const fullName = (form.fullName as HTMLInputElement).value;
    const contactNumber = (form.contactNumber as HTMLInputElement).value;
    const email = (form.bookingEmail as HTMLInputElement).value;
    const serviceRequired = (form.serviceRequired as HTMLSelectElement).value;
    const preferredDateTime = (form.preferredDateTime as HTMLInputElement).value;

    const serviceOption = (form.serviceRequired as HTMLSelectElement).selectedOptions[0];
    const serviceAmount = serviceOption.dataset.amount;

    if (!serviceAmount) {
      alert("Service price not found");
      return;
    }

    try {
      const response = await fetch("/api/paystack-initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          contactNumber,
          email,
          serviceRequired,
          amount: parseInt(serviceAmount, 10) * 100,
          preferredDateTime,
        }),
      });

      const data = await response.json();
      if (data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        alert("Payment could not be initialized.");
      }
    } catch (err) {
      console.error(err);
      alert("Error initializing payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-12 container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Book a Service</h2>
      <form
        id="bookingForm"
        onSubmit={handleSubmit}
        className="space-y-4 max-w-lg mx-auto"
      >
        <input type="text" name="fullName" placeholder="Full Name" required className="w-full p-2 border rounded" />
        <input type="tel" name="contactNumber" placeholder="Contact Number" required className="w-full p-2 border rounded" />
        <input type="email" name="bookingEmail" placeholder="Email" required className="w-full p-2 border rounded" />

        <select name="serviceRequired" required className="w-full p-2 border rounded">
          <option value="">Select Service</option>
          <option value="consultation" data-amount="5000">Consultation - ₦5000</option>
          <option value="therapy" data-amount="10000">Therapy Session - ₦10000</option>
        </select>

        <input type="datetime-local" name="preferredDateTime" required className="w-full p-2 border rounded" />

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? "Processing..." : "Proceed to Paystack"}
        </button>
      </form>
    </section>
  );
}
