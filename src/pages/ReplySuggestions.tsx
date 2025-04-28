
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ChatInput from '@/components/ChatInput';
import TonalitySelector from '@/components/TonalitySelector';
import IconUpload from '@/components/IconUpload';
import ApiKeyModal from '@/components/ApiKeyModal';
import { generateReply } from '@/utils/aiUtils';
import { useToast } from '@/components/ui/use-toast';

const ReplySuggestions = () => {
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [mode, setMode] = useState<'upload' | 'type'>('upload');
  const [selectedTone, setSelectedTone] = useState('Casual');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedReply, setGeneratedReply] = useState<string | null>(null);
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

  const handleImageSelect = (file: File) => {
    toast({
      title: "Image Uploaded",
      description: "In a production app, this would process the image for chat extraction.",
    });
    
    // Switch to typing mode after image upload
    setMode('type');
  };

  const handleChatSubmit = async (theirMessage: string, myMessage?: string) => {
    if (!apiKey) {
      setIsApiKeyModalOpen(true);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const reply = await generateReply({
        theirMessage,
        myMessage,
        tone: selectedTone,
        context: context || undefined
      });
      
      setGeneratedReply(reply);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to generate reply. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
  };

  const handleAbracadabra = () => {
    if (mode === 'type') {
      document.getElementById('theirMessage')?.focus();
    } else {
      toast({
        title: "Please provide input",
        description: "Upload a screenshot or switch to typing mode",
      });
    }
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
          <h1 className="text-3xl font-bold">Reply Suggestions</h1>
        </div>
        
        <div className="glass-card rounded-2xl p-6 mb-8">
          <h2 className="text-xl text-center mb-4">
            Upload a chat screenshot for smart reply suggestions
          </h2>
          
          <div className="mb-6">
            {mode === 'upload' ? (
              <IconUpload
                onImageSelect={handleImageSelect}
                icon={<Pencil className="text-love" />}
                text="Add chat screenshot"
              />
            ) : (
              <ChatInput
                onSubmit={handleChatSubmit}
                type="doubleInput"
              />
            )}
          </div>
          
          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant={mode === 'upload' ? 'default' : 'outline'}
              onClick={() => setMode('upload')}
              className={mode === 'upload' ? 'magic-gradient border-none' : ''}
            >
              Upload Screenshot
            </Button>
            <Button
              variant={mode === 'type' ? 'default' : 'outline'}
              onClick={() => setMode('type')}
              className={mode === 'type' ? 'magic-gradient border-none' : ''}
            >
              Type Messages
            </Button>
          </div>
          
          <TonalitySelector
            selectedTone={selectedTone}
            setSelectedTone={setSelectedTone}
          />
          
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
        
        {generatedReply && (
          <div className="glass-card rounded-2xl p-6 mb-8 animate-accordion-down">
            <h2 className="text-xl font-semibold mb-4">Suggested Reply</h2>
            <div className="bg-secondary/30 p-4 rounded-lg border border-white/10">
              <p className="text-lg">{generatedReply}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(generatedReply);
                  toast({
                    title: "Copied!",
                    description: "Reply copied to clipboard",
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
            onClick={handleAbracadabra}
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

export default ReplySuggestions;
