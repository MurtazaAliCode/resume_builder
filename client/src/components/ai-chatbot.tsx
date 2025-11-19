import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, Minimize2, Maximize2, Bot } from 'lucide-react';

interface ChatbotProps {
  onSuggestion: (suggestion: string) => void;
  context?: {
    field: string;
    value: string;
  };
}

interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
  suggestions?: string[];
}

export default function AIChatbot({ onSuggestion, context }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      type: 'bot',
      content: 'Hi! I\'m your AI resume assistant. I can help you write better content for your resume. What would you like help with?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { type: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        type: 'bot',
        content: 'Here are some suggestions for your resume:',
        suggestions: [
          'Developed scalable web applications serving 100K+ users',
          'Led cross-functional teams to deliver projects on time',
          'Implemented modern technologies improving efficiency by 40%',
          'Collaborated with stakeholders to define technical requirements'
        ]
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50"
        style={{ animation: 'float 3s ease-in-out infinite' }}
        aria-label="Open AI Resume Assistant"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
    );
  }

  return (
    <Card className={`chatbot-widget ${isMinimized ? 'h-16' : 'h-96'} transition-all duration-300`}>
      <CardHeader className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5" />
            <CardTitle className="text-sm">AI Resume Assistant</CardTitle>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:bg-white/20 p-1 rounded"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1 rounded text-xl leading-none"
            >
              ×
            </button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-80">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                  }`}>
                  <p className="text-sm">{message.content}</p>
                  {message.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => onSuggestion(suggestion)}
                          className="block w-full text-left p-2 text-xs bg-white rounded border hover:bg-blue-50 transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for resume help..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button size="sm" onClick={handleSendMessage} className="px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}