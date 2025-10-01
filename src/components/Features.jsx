import { Home, ShieldCheck, Users } from "lucide-react";

export default function Features() {
  const features = [
    {
      id: 1,
      icon: <Home className="w-12 h-12 text-teal-600" />,
      title: "Find Your Dream Home",
      desc: "Browse thousands of houses and apartments tailored to your lifestyle.",
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-12 h-12 text-teal-600" />,
      title: "Trusted Agents",
      desc: "Work with verified landlords and agents to ensure a smooth process.",
    },
    {
      id: 3,
      icon: <Users className="w-12 h-12 text-teal-600" />,
      title: "Easy Process",
      desc: "Simple search, direct connection, and hassle-free rental or purchase.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Why Choose <span className="text-teal-600">HomeLink</span>?
        </h2>

        <div className="grid md:grid-cols-3 gap-12">
          {features.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-6">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}