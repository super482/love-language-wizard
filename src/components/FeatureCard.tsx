
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RatingStars from './RatingStars';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  rating: number;
  count: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon, 
  route, 
  rating,
  count 
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className="glass-card rounded-3xl p-6 flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
      onClick={() => navigate(route)}
    >
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="text-gray-300 text-center mb-5">{description}</p>
      
      <div className="w-16 h-16 flex items-center justify-center mb-5">
        {icon}
      </div>
      
      <div className="mt-auto w-full">
        <RatingStars rating={rating} />
        <p className="text-gray-400 text-center mt-1">{count} hints given</p>
      </div>
    </div>
  );
};

export default FeatureCard;
