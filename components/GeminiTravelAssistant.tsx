import React, { useState } from 'react';
import { parseTravelQuery } from '../services/geminiService';
import { SearchParams } from '../types';
import { SparklesIcon, SendIcon } from './IconComponents';

interface GeminiTravelAssistantProps {
  onAiSearch: (params: Partial<SearchParams>) => void;
}

const GeminiTravelAssistant: React.FC<GeminiTravelAssistantProps> = ({ onAiSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const parsedParams = await parseTravelQuery(query);
      onAiSearch(parsedParams);
      setIsOpen(false);
      setQuery('');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-full p-4 shadow-2xl hover:scale-110 transform transition-all duration-300 z-50"
        aria-label="Open AI Property Assistant"
      >
        <SparklesIcon className="h-8 w-8" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm bg-white rounded-2xl shadow-2xl z-50 overflow-hidden transform transition-all origin-bottom-right animate-in fade-in slide-in-from-bottom-5">
          <div className="p-4 bg-slate-800 text-white">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <SparklesIcon className="h-5 w-5" />
              AI Property Assistant
            </h3>
            <p className="text-sm text-slate-300">Describe the space you need, we'll find it.</p>
          </div>
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., 'Find a 2-bedroom room in San Francisco for under $4000/month'"
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                rows={4}
                disabled={isLoading}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button
                type="submit"
                className="w-full mt-2 bg-slate-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 disabled:bg-slate-400"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    Find my space <SendIcon className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiTravelAssistant;
