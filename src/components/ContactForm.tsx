"use client";
import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const name = (form.contactName as HTMLInputElement).value;
    const email = (form.contactEmail as HTMLInputElement).value;
    const message = (form.contactMessage as HTMLTextAreaElement).value;

    const emailSubject = `Message from Website by ${name}`;
    const emailBody = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const mailtoLink = `mailto:Lakeviewhealthservices1@gmail.com?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;
    setLoading(false);
    alert("Your message will now open in your email client. Please send it!");
    form.reset();
  };

  return (
    <section id="contact" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
        <form
          id="contactForm"
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded shadow"
        >
          <input
            type="text"
            name="contactName"
            placeholder="Your Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="contactEmail"
            placeholder="Your Email"
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="contactMessage"
            placeholder="Your Message"
            rows={5}
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}
