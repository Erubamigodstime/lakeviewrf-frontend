"use client";

export default function Pricing() {
  const handleInquiry = (planName: string) => {
    const message = `Hello Lakeview Health Services, I am interested in the following service/plan: ${planName}. Please provide more information or help me proceed. Thank you!`;
    const emailSubject = `Inquiry about ${planName}`;

    const whatsappUrl = `https://wa.me/2349121675872?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    const mailtoLink = `mailto:Lakeviewhealthservices1@gmail.com?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(message)}`;
    window.open(mailtoLink);

    alert(
      `Your inquiry for "${planName}" has been sent via WhatsApp and Email! We will respond shortly.`
    );
  };

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Consultation</h3>
            <p className="text-gray-600 mb-4">₦5,000 per session</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => handleInquiry("Consultation")}
            >
              Inquire Now
            </button>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Therapy</h3>
            <p className="text-gray-600 mb-4">₦10,000 per session</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => handleInquiry("Therapy")}
            >
              Inquire Now
            </button>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Wellness Plan</h3>
            <p className="text-gray-600 mb-4">₦20,000 monthly</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => handleInquiry("Wellness Plan")}
            >
              Inquire Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
