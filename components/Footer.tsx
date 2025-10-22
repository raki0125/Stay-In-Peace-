import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Sip</h2>
            <p className="text-slate-400">Find and book your perfect space.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-white">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Careers</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul>
              <li className="mb-2"><a href="#" className="hover:text-white">Contact Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">FAQ</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Follow Us</h3>
            {/* Social media icons would go here */}
            <p className="text-slate-400">Stay connected for the latest deals.</p>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Sip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;