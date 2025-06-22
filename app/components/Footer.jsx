import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F3F4F6] border-t border-gray-200 py-6 px-4 md:py-10 md:px-12 flex flex-col gap-6">
      
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 border-b pb-6">
        
        {/* Logo */}
        <div>
          <img className="h-8" src="/logo.png" alt="Logo" />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-blue-500" />
            <span>+91 9529512659</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-blue-500" />
            <span>abhijeetkamalekar15@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-blue-500" />
            <span>Sangli, Maharashtra</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-center text-xs text-gray-500">
        © 2025. All rights reserved by <span className="ml-1 font-semibold">VASTRA VIBES</span>
      </div>
    </footer>
  );
}
