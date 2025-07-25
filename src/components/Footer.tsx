import React from "react";
import { Palmtree, MessageCircle, Music, MessageSquare } from "lucide-react";

const discordLink = import.meta.env.VITE_LINK_DISCORD;
const telegramLink = import.meta.env.VITE_LINK_TELEGRAM;
const tiktokLink = import.meta.env.VITE_LINK_TIKTOK;
const versione = import.meta.env.VITE_VERSION_REGOLAMENTO;

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-emerald-800/80 to-teal-800/80 backdrop-blur-sm border-t border-teal-400/30 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-lg shadow-lg">
                <Palmtree className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
                Maracuja Roleplay
              </span>
            </div>
            <p className="text-teal-200 mb-4">
              Una comunità roleplay dedicata al divertimento e al rispetto
              reciproco. Unisciti a noi per vivere avventure indimenticabili! 🌴
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-orange-200 font-semibold mb-4 text-center md:text-left">
              Collegamenti Utili
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={discordLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-200 hover:text-orange-300 transition-colors flex items-center justify-center md:justify-start"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Discord
                </a>
              </li>
              <li>
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-200 hover:text-orange-300 transition-colors flex items-center justify-center md:justify-start"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href={tiktokLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-200 hover:text-orange-300 transition-colors flex items-center justify-center md:justify-start"
                >
                  <Music className="h-4 w-4 mr-2" />
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal-400/30 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-teal-200 text-sm">
              © 2025 Maracuja Roleplay. Tutti i diritti riservati.
            </p>
            <p className="text-teal-300 text-sm mt-2 md:mt-0">
              Versione: {versione}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
