// analyze.tsx
import React from 'react';

export const Analyze = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full !bg-gradient-to-br from-blue-100 to-purple-200 p-6">
        <br /><br />
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-16">
        Choose one of these options to identify your mental health condition
      </h1>
<br /><br />
      <div className="flex flex-col space-y-12 w-3/4 max-w-xl items-center">
        {/* Button 1 */}
        <button
          className="w-full !bg-blue-500 !text-white !rounded-3xl p-10 shadow-2xl hover:!bg-blue-600 transition-all duration-300 flex flex-col items-center"
          style={{
            all: 'unset',
            width: '100%',
            backgroundColor: '#3B82F6',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <h2 className="text-3xl font-bold mb-2">Scale Based Analysis</h2>
          <p className="text-lg text-white">
            Rate your mental state from 1 to 10 for several factors and get a quick evaluation.
          </p>
        </button>
<br />
<br />
        {/* Button 2 */}
        <button
          className="w-full !bg-purple-500 !text-white !rounded-3xl p-10 shadow-2xl hover:!bg-purple-600 transition-all duration-300 flex flex-col items-center"
          style={{
            all: 'unset',
            width: '100%',
            backgroundColor: '#8B5CF6',
            borderRadius: '1.5rem',
            padding: '2.5rem',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          <h2 className="text-3xl font-bold mb-2">Sentiment Analysis on Text</h2>
          <p className="text-lg text-white">
            Share how you feel, and we'll analyze your emotions through your words.
          </p>
        </button>
      </div>
    </div>
  );
};
