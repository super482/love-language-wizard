
import React from 'react';

interface TonalitySelectorProps {
  selectedTone: string;
  setSelectedTone: (tone: string) => void;
}

const tones = [
  "Casual",
  "Flirty",
  "Nonchalant",
  "Playful",
  "Romantic",
  "Serious",
  "Funny",
  "Mysterious",
  "Caring",
  "Intellectual"
];

const TonalitySelector: React.FC<TonalitySelectorProps> = ({ selectedTone, setSelectedTone }) => {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-4">Tonalities</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {tones.map((tone) => (
          <button
            key={tone}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedTone === tone
                ? 'magic-gradient text-white'
                : 'bg-secondary/50 hover:bg-secondary/80 text-gray-200'
            }`}
            onClick={() => setSelectedTone(tone)}
          >
            {tone}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TonalitySelector;
