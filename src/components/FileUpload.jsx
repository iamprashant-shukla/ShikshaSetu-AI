import React, { useState } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { fileProcessor } from '../utils/fileProcessor';

const FileUpload = ({ onFileProcessed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleFile = async (file) => {
    setError(null);
    setIsProcessing(true);
    setUploadedFile({
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      status: 'processing'
    });

    try {
      // Actually process the file with PDF extraction
      const processedData = await fileProcessor.processFile(file);
      
      setUploadedFile(prev => ({ ...prev, status: 'completed' }));
      
      // Pass the processed data with actual extracted text
      onFileProcessed({
        fileName: processedData.fileName,
        fileSize: processedData.fileSize,
        extractedText: processedData.extractedText,
        wordCount: processedData.wordCount,
        analysis: processedData.analysis
      });
      
    } catch (err) {
      console.error('File processing error:', err);
      setError(err.message);
      setUploadedFile(prev => ({ ...prev, status: 'error' }));
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!uploadedFile && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
          <p className="text-sm font-medium text-gray-700 mb-2">
            Drop your policy document here or click to browse
          </p>
          <p className="text-xs text-gray-500 mb-4">
            Supports PDF, TXT, CSV files • Max 10MB
          </p>
          <input
            type="file"
            onChange={handleFileSelect}
            accept=".pdf,.txt,.csv"
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
          >
            <FileText className="h-4 w-4 mr-2" />
            Select File
          </label>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">Upload Failed</p>
              <p className="text-xs text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Uploaded File Display */}
      {uploadedFile && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <div className={`p-2 rounded-lg ${
                uploadedFile.status === 'processing' ? 'bg-blue-100' :
                uploadedFile.status === 'completed' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {uploadedFile.status === 'processing' ? (
                  <Loader className="h-5 w-5 text-blue-600 animate-spin" />
                ) : uploadedFile.status === 'completed' ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{uploadedFile.name}</p>
                <p className="text-xs text-gray-500">{uploadedFile.size}</p>
              </div>
            </div>
            {uploadedFile.status !== 'processing' && (
              <button
                onClick={removeFile}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            )}
          </div>
          
          {uploadedFile.status === 'processing' && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>🤖 AI analyzing document...</span>
                <span>Reading content</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-600 h-1.5 rounded-full animate-pulse" style={{width: '70%'}}></div>
              </div>
            </div>
          )}
          
          {uploadedFile.status === 'completed' && (
            <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900">Document analyzed successfully!</p>
                  <p className="text-xs text-green-700 mt-1">
                    ✅ Content extracted and indexed<br/>
                    ✅ Ready for AI-powered Q&A<br/>
                    💬 Ask any question about this document!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
