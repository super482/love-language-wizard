
import { toast } from "@/components/ui/use-toast";

export interface ReplyRequest {
  theirMessage: string;
  myMessage?: string;
  tone: string;
  context?: string;
}

export interface ConversationRequest {
  imageDescription?: string;
  personDescription?: string;
  tone: string;
  context?: string;
}

export interface AwkwardRequest {
  situation: string;
  context?: string;
}

export const generateReply = async (request: ReplyRequest): Promise<string> => {
  const apiKey = localStorage.getItem('geminiApiKey');
  
  if (!apiKey) {
    throw new Error('API key not found');
  }

  try {
    // We'll mock the response for now
    // In a real implementation, you would call the Gemini API here
    console.log('Generating reply with:', request);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock responses based on tone
    const mockResponses: Record<string, string[]> = {
      "Casual": [
        "Hey, just wanted to check in. How's your day going?",
        "That sounds fun! I'd be up for that.",
        "No worries at all. Talk to you later!"
      ],
      "Flirty": [
        "I can't stop thinking about you... what are you up to tonight?",
        "You always know exactly what to say to make me smile 😉",
        "I'm counting the hours until I see you again..."
      ],
      "Romantic": [
        "You mean the world to me. I'm so lucky to have you in my life.",
        "Every moment with you feels like a dream I never want to wake up from.",
        "My heart skips a beat every time I see your name pop up on my phone."
      ],
      "Playful": [
        "Challenge accepted! You're going down! 😜",
        "Oh really? Prove it! I dare you!",
        "That's what you think! I've got tricks up my sleeve you haven't seen yet!"
      ],
      "Nonchalant": [
        "Yeah, whatever works for you is fine with me.",
        "I mean, I don't really have strong feelings about it either way.",
        "Sure, I guess that could be interesting."
      ]
    };
    
    // Default to Casual if tone not found
    const toneResponses = mockResponses[request.tone] || mockResponses["Casual"];
    const randomIndex = Math.floor(Math.random() * toneResponses.length);
    
    return toneResponses[randomIndex];
  } catch (error) {
    console.error('Error generating reply:', error);
    toast({
      title: "Error",
      description: "Failed to generate reply. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

export const generateConversationStarter = async (request: ConversationRequest): Promise<string> => {
  const apiKey = localStorage.getItem('geminiApiKey');
  
  if (!apiKey) {
    throw new Error('API key not found');
  }

  try {
    // Mock implementation
    console.log('Generating conversation starter with:', request);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const imageBasedStarters = [
      "That's a beautiful photo! Where was it taken?",
      "I love the vibe in this picture. What's the story behind it?",
      "This reminds me of a place I've been meaning to visit. Have you been there long?",
      "The lighting in this photo is gorgeous! Are you into photography?",
      "That looks like such a fun activity! Is it something you do often?"
    ];
    
    const randomIndex = Math.floor(Math.random() * imageBasedStarters.length);
    return imageBasedStarters[randomIndex];
  } catch (error) {
    console.error('Error generating conversation starter:', error);
    toast({
      title: "Error",
      description: "Failed to generate conversation starter. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

export const generateAwkwardAdvice = async (request: AwkwardRequest): Promise<string> => {
  const apiKey = localStorage.getItem('geminiApiKey');
  
  if (!apiKey) {
    throw new Error('API key not found');
  }

  try {
    // Mock implementation
    console.log('Generating awkward situation advice with:', request);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const awkwardAdvice = [
      "Take a deep breath and acknowledge the awkwardness with a light touch of humor. Saying something like 'Well, that got awkward quickly!' can break the tension and show you're self-aware.",
      "Sometimes the best approach is to gently change the subject. Try asking an open question about something you know they're interested in.",
      "Be honest but kind. Say something like 'I'm not sure what the right thing to say is right now, but I value our relationship and want to make sure we're good.'",
      "Give them and yourself some space if needed. You can always say 'Let me think about this a bit more' if you need time to process.",
      "Remember that awkward moments happen to everyone. A simple, genuine 'Sorry about that' can go a long way if you feel you contributed to the awkwardness."
    ];
    
    const randomIndex = Math.floor(Math.random() * awkwardAdvice.length);
    return awkwardAdvice[randomIndex];
  } catch (error) {
    console.error('Error generating awkward situation advice:', error);
    toast({
      title: "Error",
      description: "Failed to generate advice. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};
