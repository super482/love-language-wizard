
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid Gemini API key",
        variant: "destructive",
      });
      return;
    }

    // Save API key to localStorage
    localStorage.setItem('geminiApiKey', apiKey);
    onSave(apiKey);
    onClose();
    
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle>Enter Gemini API Key</DialogTitle>
          <DialogDescription className="text-gray-400">
            To use LoveGenie, you need to provide a Gemini API key. Your key is stored locally and never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              placeholder="Paste your Gemini API key here"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-secondary/30 border-white/10 focus:border-love"
            />
          </div>
          
          <div className="text-xs text-gray-400">
            You can get an API key from{" "}
            <a 
              href="https://ai.google.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-love hover:underline"
            >
              Google AI Studio
            </a>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSave} className="magic-gradient border-none">
            Save API Key
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
