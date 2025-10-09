import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Logo + tagline */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">HomeLink</h2>
          <p className="text-sm">
            Connecting landlords and tenants with ease and transparency.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/rent" className="hover:text-teal-400">
                Rent
              </a>
            </li>
            <li>
              <a href="/buy" className="hover:text-teal-400">
                Buy
              </a>
            </li>
            <li>
              <a href="/add-property" className="hover:text-teal-400">
                Add Property
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-teal-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Socials with icons */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-teal-400">
              <Facebook size={22} />
            </a>
            <a href="#" className="hover:text-teal-400">
              <Twitter size={22} />
            </a>
            <a href="#" className="hover:text-teal-400">
              <Instagram size={22} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 text-center text-sm pt-4">
        © {new Date().getFullYear()} HomeLink. All rights reserved.
      </div>
    </footer>
  );
}
