// app/pollodf/page.tsx
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import axios from 'axios';
import Layout from '../components/Layout';
import Button from '../components/Button';

export default function PolloDFPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [brainrotText, setBrainrotText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a PDF file');
        setFile(null);
      }
    }
  };

  const generateBrainrot = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post('/api/generate-brainrot', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setBrainrotText(response.data.brainrotText);
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.response?.data?.error || 'Failed to generate brainrot');
    } finally {
      setLoading(false);
    }
  };

  const downloadBrainrotText = () => {
    const element = document.createElement('a');
    const file = new Blob([brainrotText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'brainrot.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-start p-8 bg-gradient-to-br from-yellow-500 to-red-500">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-white"
        >
          PolloDF
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg p-8"
        >
          <div className="flex justify-between mb-4">
            <label className="flex items-center px-4 py-2 bg-white text-red-500 rounded-lg shadow-md hover:bg-red-500 hover:text-white transition-colors cursor-pointer">
              <input
                type="file"
                onChange={onFileChange}
                accept="application/pdf"
                className="hidden"
              />
              {file ? file.name : 'Upload PDF'}
            </label>
            <Button onClick={() => router.push('/home')}>
              Back to Home
            </Button>
          </div>

          {error && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="bg-white bg-opacity-20 rounded-lg p-4 h-[600px] overflow-auto">
            {brainrotText ? (
              <div className="text-white whitespace-pre-wrap">{brainrotText}</div>
            ) : (
              <div className="flex items-center justify-center h-full text-white">
                Upload a PDF and click Generate to see the brainrot version
              </div>
            )}
          </div>

          <div className="flex justify-center mt-4 space-x-4">
            <Button
              onClick={generateBrainrot}
              disabled={!file || loading}
            >
              {loading ? 'Generating...' : 'Generate Brainrot'}
            </Button>
            
            <Button
              onClick={downloadBrainrotText}
              disabled={!brainrotText}
            >
              Download Brainrot
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
