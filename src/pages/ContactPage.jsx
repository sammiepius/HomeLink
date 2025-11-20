import { useState } from 'react';
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
} from 'react-icons/fa';
import API from '../api/axios';
import { toast } from 'sonner';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

export default function ContactPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const markerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error('All fields are required.');
      return;
    }
    try {
      const res = await API.post('contact/create', form);
      toast.success('Message sent successfully');
      setForm({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to sent message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-3">
          Contact <span className="text-teal-600">Us</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Have questions or need support? We’re here to help.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* FORM SECTION */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Send us a message
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-gray-700 text-sm">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-600"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-600"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-600"
                  placeholder="0803 000 0000"
                />
              </div>

              <div>
                <label className="text-gray-700 text-sm">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border rounded-lg h-28 focus:outline-none focus:border-teal-600"
                  placeholder="Write your message here..."
                  required></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
                Send Message
              </button>
            </form>
          </div>

          {/* CONTACT INFO SECTION */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Contact Information
              </h3>

              <div className="flex items-start gap-4 mb-4">
                <FaPhone className="text-teal-600 text-xl mt-1" />
                <div>
                  <p className="font-medium text-gray-700">Phone</p>
                  <p className="text-gray-600">+234 801 234 5678</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <FaWhatsapp className="text-teal-600 text-xl mt-1" />
                <div>
                  <p className="font-medium text-gray-700">WhatsApp</p>
                  <p className="text-gray-600">+234 901 234 5678</p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <FaEnvelope className="text-teal-600 text-xl mt-1" />
                <div>
                  <p className="font-medium text-gray-700">Email</p>
                  <p className="text-gray-600">support@homelink.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-teal-600 text-xl mt-1" />
                <div>
                  <p className="font-medium text-gray-700">Address</p>
                  <p className="text-gray-600">Kano, Nigeria</p>
                </div>
              </div>
            </div>

            {/* MAP SECTION */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <MapContainer
                center={[10.3129, 10.9612]} // Tumfure, Gombe State
                zoom={14}
                scrollWheelZoom={false}
                className="w-full h-48">
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />

                <Marker position={[10.3129, 10.9612]} icon={markerIcon}>
                  <Popup>Homelink Office — Tumfure, Gombe State</Popup>
                </Marker>
              </MapContainer>
            </div>

            {/* <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="w-full h-48">
                <iframe
                  title="Company Location"
                  width="100%"
                  height="100%"
                  className="border-0"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.701928572519!2d10.2833!3d10.2903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10f0392e8fef!2sGombe!5e0!3m2!1sen!2sng!4v1234567890"></iframe>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
