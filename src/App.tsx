import React, { useState } from 'react';
import { CSVUploadForm } from './components/CSVUploadForm';
import { PDFGenerator } from './components/PDFGenerator';
import { Footer } from './components/Footer';
import type { CSVData } from './types';
import { FileText } from 'lucide-react';

function App() {
  const [csvData, setCSVData] = useState<CSVData | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 py-12 flex flex-col">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 flex-grow">
        <div className="flex items-center justify-center mb-8">
          <FileText className="w-10 h-10 text-blue-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">
            Générateur de Liste de Parrainages
          </h1>
        </div>

        <CSVUploadForm onDataLoaded={setCSVData} />
        <PDFGenerator data={csvData} />
      </div>
      <Footer />
    </div>
  );
}

export default App;