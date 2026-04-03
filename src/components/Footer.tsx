import Link from 'next/link';
import { MessageCircle, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link href="/" className="mb-4 block">
              <img src="/logo.png" alt="KidKraze" className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-dark-400 mb-6">
              Fancy Stationery, Gifts, Novelties & School Books
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/kid_kraze_mall" target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-800 hover:bg-primary-600 rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://wa.me/917889231302" target="_blank" rel="noopener noreferrer" className="p-2 bg-dark-800 hover:bg-green-600 rounded-full transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="mailto:contact@kidkraze.com" className="p-2 bg-dark-800 hover:bg-primary-600 rounded-full transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/products?category=new-arrivals" className="text-dark-400 hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/products?category=stationery" className="text-dark-400 hover:text-white transition-colors">Stationery</Link></li>
              <li><Link href="/products?category=art-craft" className="text-dark-400 hover:text-white transition-colors">Art & Craft</Link></li>
              <li><Link href="/products?category=accessories" className="text-dark-400 hover:text-white transition-colors">Accessories</Link></li>
              <li><Link href="/products?category=combos" className="text-dark-400 hover:text-white transition-colors">Combos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Policies</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy-policy" className="text-dark-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-dark-400 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/refund-policy" className="text-dark-400 hover:text-white transition-colors">Refund Policy</Link></li>
              <li><Link href="/shipping-policy" className="text-dark-400 hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/contact" className="text-dark-400 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/admin/orders" className="text-dark-400 hover:text-white transition-colors">Admin Panel</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-500 mt-0.5" />
                <div>
                  <p className="text-dark-400">7889231302</p>
                  <p className="text-dark-400">7986106184</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5" />
                <p className="text-dark-400">
                  SBP City of Dreams, 25B, Kharar - Landran Rd,
                  Near Astro Praveen, City Square,
                  Sector 127, Sahibzada Ajit Singh Nagar,
                  Punjab 140307
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-800 mt-12 pt-8 text-center">
          <p className="text-dark-500">
            &copy; {new Date().getFullYear()} KidKraze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
