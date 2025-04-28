
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Love</span>Genie
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            AI-powered conversation magic for your romantic life. Get reply suggestions, 
            conversation starters, and help with awkward situations.
          </p>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            title="Reply Suggestions"
            description="Upload a chat screenshot or type in messages for smart reply suggestions"
            icon={
              <svg className="w-12 h-12 text-love" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            }
            route="/reply-suggestions"
            rating={5}
            count="2.5 million"
          />
          
          <FeatureCard
            title="Start Conversation"
            description="Upload a pic of a person or activity for conversation starters"
            icon={
              <svg className="w-12 h-12 text-magic" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
            route="/start-conversation"
            rating={4.5}
            count="1.7 million"
          />
          
          <FeatureCard
            title="Awkward Situation"
            description="Provide the situation details for the best advice!"
            icon={
              <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            route="/awkward-situation"
            rating={5}
            count="1.5 million"
          />
        </section>
        
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-card rounded-xl p-6">
              <div className="flex justify-center items-center h-12 w-12 rounded-full magic-gradient mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Choose Feature</h3>
              <p className="text-gray-400">Select one of our three magical features based on your needs</p>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <div className="flex justify-center items-center h-12 w-12 rounded-full magic-gradient mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Input Details</h3>
              <p className="text-gray-400">Upload a screenshot, photo, or type your situation details</p>
            </div>
            
            <div className="glass-card rounded-xl p-6">
              <div className="flex justify-center items-center h-12 w-12 rounded-full magic-gradient mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Get Magic Advice</h3>
              <p className="text-gray-400">Hit "Abracadabra" and watch the relationship magic happen!</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="mt-auto py-6 bg-background border-t border-white/10">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} LoveGenie. All rights reserved.</p>
          <p className="mt-1">AI-powered conversation magic for your romantic life.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
