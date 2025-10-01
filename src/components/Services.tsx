export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Consultation</h3>
            <p className="text-gray-600">
              Professional consultations to guide your health decisions.
            </p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Therapy</h3>
            <p className="text-gray-600">
              Specialized therapy sessions tailored to your needs.
            </p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl font-semibold mb-4">Wellness</h3>
            <p className="text-gray-600">
              Holistic wellness services to keep you balanced and strong.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
