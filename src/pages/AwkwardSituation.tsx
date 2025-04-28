
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import Header from '@/components/Header';
import ApiKeyModal from '@/components/ApiKeyModal';
import { generateAwkwardAdvice } from '@/utils/aiUtils';
import { useToast } from '@/components/ui/use-toast';

const AwkwardSituation = () => {
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [situation, setSituation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedAdvice, setGeneratedAdvice] = useState<string | null>(null);
  const [context, setContext] = useState('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if API key exists in localStorage
    const storedApiKey = localStorage.getItem('geminiApiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    } else {
      setIsApiKeyModalOpen(true);
    }
  }, []);

  const handleGenerate = async () => {
    if (!apiKey) {
      setIsApiKeyModalOpen(true);
      return;
    }
    
    if (!situation.trim()) {
      toast({
        title: "No Situation Provided",
        description: "Please describe the awkward situation",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const advice = await generateAwkwardAdvice({
        situation,
        context: context || undefined
      });
      
      setGeneratedAdvice(advice);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate advice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/')}
            className="mr-2"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-3xl font-bold">Awkward Situation</h1>
        </div>
        
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-xl text-center mb-4">
            Provide the situation details for the best advice!
          </h2>
          
          <div className="mb-6">
            <Textarea
              value={situation}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSituation(e.target.value)}
              placeholder="Describe the awkward situation..."
              className="w-full h-40 rounded-lg bg-secondary/30 border border-white/10 p-3 text-white focus:ring-2 focus:ring-love/50 focus:outline-none"
            />
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Personalize</h3>
            <div className="flex">
              <input
                type="text"
                placeholder="Add context (optional)"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="flex-1 px-4 py-2 rounded-l-lg bg-secondary/30 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-love/50"
              />
              <Button
                className="rounded-l-none"
                variant="outline"
              >
                Add context
              </Button>
            </div>
          </div>
        </div>
        
        {generatedAdvice && (
          <div className="glass-card rounded-2xl p-6 mb-8 animate-accordion-down">
            <h2 className="text-xl font-semibold mb-4">Suggested Advice</h2>
            <div className="bg-secondary/30 p-4 rounded-lg border border-white/10">
              <p className="text-lg">{generatedAdvice}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(generatedAdvice);
                  toast({
                    title: "Copied!",
                    description: "Advice copied to clipboard",
                  });
                }}
                variant="outline"
              >
                Copy
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex justify-center mt-8">
          <Button
            className="magic-gradient border-none text-lg py-6 px-8 hover:opacity-90 transition-opacity"
            onClick={handleGenerate}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing...</span>
              </div>
            ) : (
              <>
                Abracadabra{" "}
                <span className="ml-2 inline-block relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-300 animate-sparkle"></span>
                </span>
              </>
            )}
          </Button>
        </div>
      </main>
      
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleSaveApiKey}
      />
    </div>
  );
};

export default AwkwardSituation;
