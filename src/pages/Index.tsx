
import React, { useState } from 'react';
import FileUploadZone from '@/components/FileUploadZone';
import AnalyzeButton from '@/components/AnalyzeButton';

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <main className="container mx-auto px-4 py-16 animate-fade-in">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Analyze Your Files
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your file and let our advanced AI analyze it in seconds
          </p>
        </div>

        <div className="space-y-8">
          <FileUploadZone />
          
          <div className="text-center">
            <AnalyzeButton
              onClick={handleAnalyze}
              isLoading={isAnalyzing}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
