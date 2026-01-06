import { FaHeart, FaShieldAlt, FaLock, FaHandsHelping, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-linear-to-br from-gray-900 to-gray-950 text-white"> {/* Removed mt-20 from here */}
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand & Mission */}
          <div className="space-y-5">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">M</span>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold tracking-tight bg-linear-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    MindShift
                  </h3>
                  <p className="text-xs text-gray-400">Your mental wellness journey starts here</p>
                </div>
              </div>
            </Link>

            <p className="text-gray-300 leading-relaxed text-sm">
              Providing compassionate, accessible mental health support to help you thrive in your wellness journey.
            </p>

            <div className="flex items-center gap-4 pt-3">
              <div className="flex items-center gap-2 text-xs text-green-400">
                <FaLock className="w-3.5 h-3.5" />
                <span>100% Private</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-blue-400">
                <FaShieldAlt className="w-3.5 h-3.5" />
                <span>Secure</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-5 text-white flex items-center gap-2">
              <FaHandsHelping className="w-4 h-4 text-blue-400" />
              Quick Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/crisis"
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group text-sm"
                >
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full group-hover:animate-pulse"></span>
                  Crisis Help (24/7)
                </Link>
              </li>
              <li>
                <Link to="/tools/mood-tracker" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Daily Mood Tracker
                </Link>
              </li>
              <li>
                <Link to="/tools/assessment" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Self-Assessment
                </Link>
              </li>
              <li>
                <Link to="/find-therapist" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Find a Therapist
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Resource Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-base font-semibold mb-5 text-white">Resources</h4>
            <ul className="space-y-2.5">
              <li><Link to="/learn-more" className="text-gray-300 hover:text-white transition-colors text-sm">Mental Health Guide</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Coping Strategies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Wellness Articles</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Support Groups</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Meditation Library</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-base font-semibold mb-5 text-white">Stay Connected</h4>
            <p className="text-gray-300 mb-5 text-sm">
              Subscribe for mental wellness tips and updates.
            </p>

            <form className="mb-6">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 cursor-pointer px-4 py-2.5 bg-linear-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg text-sm"
                >
                  Subscribe
                </button>
              </div>
            </form>

            {/* Social Links */}
            <div className="flex gap-3">
              <a href="#" className="p-2.5 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors group">
                <FaTwitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2.5 bg-gray-800 rounded-lg hover:bg-pink-600 transition-colors group">
                <FaInstagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2.5 bg-gray-800 rounded-lg hover:bg-blue-700 transition-colors group">
                <FaLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2.5 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors group">
                <FaEnvelope className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <div className="text-gray-400 text-xs">
              <p>&copy; {currentYear} MindShift. All rights reserved.</p>
              <p className="mt-1">Made with <FaHeart className="inline w-3 h-3 text-red-500 animate-pulse" /> for mental wellness</p>
            </div>

            <div className="flex flex-wrap gap-4 text-xs">
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Crisis Notice */}
          <div className="mt-5 p-3 bg-linear-to-r from-red-900/30 to-orange-900/30 rounded-lg border border-red-800/50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <p className="text-xs">
                <strong>If you're in crisis:</strong> Please use the emergency button or call your local crisis line.
                You are not alone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}