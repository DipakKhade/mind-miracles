import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';
import { IoLogoFacebook } from 'react-icons/io5';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ms-sonali-khade-79b674331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      icon: FaLinkedinIn,
      color: 'hover:text-blue-600',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1DZRPYsPws/?mibextid=LQQJ4d',
      icon: IoLogoFacebook,
      color: 'hover:text-blue-500',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/mind_miracles_/profilecard/?igsh=bXNxMjRrcnF2ZnMw',
      icon: FaInstagram,
      color: 'hover:text-pink-500',
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@ms.sonaleepsychologist?si=S3x_G2-Z0zvzcx9n',
      icon: FaYoutube,
      color: 'hover:text-red-500',
    },
    {
      name: 'WhatsApp',
      href: 'https://api.whatsapp.com/send/?phone=917798082219&text&type=phone_number&app_absent=0',
      icon: FaWhatsapp,
      color: 'hover:text-green-500',
    },
  ];

  const quickLinks = [{ name: 'Courses', href: '/courses' }];

  const services = [
    { name: 'Psychology Consultation', href: '/services/consultation' },
    { name: 'Online Therapy', href: '/services/therapy' },
    { name: 'Group Sessions', href: '/services/group' },
    { name: 'Workshops', href: '/services/workshops' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="mb-4 text-2xl font-bold">Mind Miracles</h3>
              <p className="leading-relaxed text-gray-300">
                Transforming lives through professional psychology services and
                mental health support. Your journey to wellness starts here.
              </p>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className="mb-3 text-lg font-semibold">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 transition-colors duration-200 ${social.color}`}
                      aria-label={social.name}
                    >
                      <IconComponent className="h-6 w-6" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 transition-colors duration-200 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    // href={service.href}
                    href={'/'}
                    className="text-gray-300 transition-colors duration-200 hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaPhone className="h-4 w-4 flex-shrink-0 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a
                    href="tel:+917798082219"
                    className="text-white transition-colors duration-200 hover:text-green-400"
                  >
                    +91-779-808-2219
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FaEnvelope className="h-4 w-4 flex-shrink-0 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a
                    href="mailto:mindmiracles1707@gmail.com"
                    className="break-all text-white transition-colors duration-200 hover:text-blue-400"
                  >
                    mindmiracles1707@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  asChild
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  <Link
                    href="https://api.whatsapp.com/send/?phone=917798082219&text&type=phone_number&app_absent=0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp className="mr-2 h-4 w-4" />
                    Chat on WhatsApp
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="text-sm text-gray-400">
            <p>&copy; {currentYear} Mind Miracles. All rights reserved.</p>
          </div>

          {/* <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-200">
              Cookie Policy
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
