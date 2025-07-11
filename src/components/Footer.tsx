import React from 'react';
import { Palmtree, Heart, Users, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-800/80 to-teal-800/80 backdrop-blur-sm border-t border-teal-400/30 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-lg shadow-lg">
                <Palmtree className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
                Maracuja Roleplay
              </span>
            </div>
            <p className="text-teal-200 mb-4">
              Una comunità roleplay tropicale dedicata al divertimento e al rispetto reciproco. 
              Unisciti a noi per vivere avventure indimenticabili sotto il sole! 🌴
            </p>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-300 font-medium">Server Online</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-orange-200 font-semibold mb-4">Collegamenti Utili</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-teal-200 hover:text-orange-300 transition-colors flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Discord Server
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-200 hover:text-orange-300 transition-colors flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Forum Comunità
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-200 hover:text-orange-300 transition-colors flex items-center">
                  <Palmtree className="h-4 w-4 mr-2" />
                  Whitelist
                </a>
              </li>
              <li>
                <a href="#" className="text-teal-200 hover:text-orange-300 transition-colors flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Donazioni
                </a>
              </li>
            </ul>
          </div>

          {/* Stats */}
          <div>
            <h3 className="text-orange-200 font-semibold mb-4">Statistiche Server</h3>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-teal-700/50 to-emerald-700/50 rounded-lg p-3 border border-teal-400/20">
                <div className="flex justify-between items-center">
                  <span className="text-teal-200">Giocatori Online</span>
                  <span className="text-green-300 font-bold">127/200</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-700/50 to-emerald-700/50 rounded-lg p-3 border border-teal-400/20">
                <div className="flex justify-between items-center">
                  <span className="text-teal-200">Membri Registrati</span>
                  <span className="text-orange-300 font-bold">2,847</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-teal-700/50 to-emerald-700/50 rounded-lg p-3 border border-teal-400/20">
                <div className="flex justify-between items-center">
                  <span className="text-teal-200">Uptime Server</span>
                  <span className="text-amber-300 font-bold">99.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-teal-400/30 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-teal-200 text-sm">
              © 2025 Maracuja Roleplay. Tutti i diritti riservati.
            </p>
            <p className="text-teal-300 text-sm mt-2 md:mt-0">
              Versione regolamento: 2.1.0 • Ultimo aggiornamento: 15 Gen 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;