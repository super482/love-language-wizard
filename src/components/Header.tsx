
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="relative w-full bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-gradient mr-1">Love</span>
          <span className="text-2xl font-bold text-white">Genie</span>
        </div>
        
        <button 
          className="p-2 rounded-full hover:bg-secondary/50 transition-colors"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-t border-white/10 py-4 px-4 z-50 animate-accordion-down">
          <ul className="flex flex-col space-y-4">
            <li>
              <button 
                onClick={() => navigateTo('/')} 
                className="w-full text-left px-4 py-2 rounded-md hover:bg-secondary/30 transition-colors"
              >
                Home
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('/reply-suggestions')} 
                className="w-full text-left px-4 py-2 rounded-md hover:bg-secondary/30 transition-colors"
              >
                Reply Suggestions
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('/start-conversation')} 
                className="w-full text-left px-4 py-2 rounded-md hover:bg-secondary/30 transition-colors"
              >
                Start Conversation
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('/awkward-situation')} 
                className="w-full text-left px-4 py-2 rounded-md hover:bg-secondary/30 transition-colors"
              >
                Awkward Situation
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
