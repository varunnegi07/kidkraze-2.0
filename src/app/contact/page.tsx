'use client';

import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = encodeURIComponent(
      `*New Inquiry from KidKraze Website*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Message:* ${message}`
    );
    window.open(`https://wa.me/917889231302?text=${text}`, '_blank');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-dark-900 mb-8 text-center">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-dark-100">
          <h2 className="text-xl font-semibold text-dark-900 mb-6">Get in Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-dark-900">Phone</p>
                <p className="text-dark-500">+91 78892 31302</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-dark-900">Email</p>
                <p className="text-dark-500">kidkrazemall@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="font-medium text-dark-900">Address</p>
                <p className="text-dark-500">Delhi, India</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-dark-900">WhatsApp</p>
                <a href="https://wa.me/917889231302" target="_blank" rel="noopener noreferrer" className="text-dark-500 hover:text-green-600 transition-colors">Chat with us on WhatsApp</a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-dark-100">
          <h2 className="text-xl font-semibold text-dark-900 mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-50 border border-dark-100 rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:border-primary-500"
              />
            </div>
            
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-50 border border-dark-100 rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:border-primary-500"
              />
            </div>
            
            <div>
              <input
                type="tel"
                placeholder="Your Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-50 border border-dark-100 rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:border-primary-500"
              />
            </div>
            
            <div>
              <textarea
                rows={4}
                placeholder="Your Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-50 border border-dark-100 rounded-xl text-dark-900 placeholder-dark-400 focus:outline-none focus:border-primary-500 resize-none"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-dark-900 text-white rounded-xl font-semibold hover:bg-dark-800 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}