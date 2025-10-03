import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, FileText, Trash2, Sparkles, ArrowDown } from 'lucide-react';
import FileUpload from './FileUpload';
import { groqAI } from '../utils/groqAI';
import { aiResponder } from '../utils/fakeSummarizer';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content:
        "Hello! I'm your AI Policy Assistant. I can help you explore education schemes, analyze documents, and answer policy questions. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [showFileUpload, setShowFileUpload] = useState(false);

  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [isNearBottom, setIsNearBottom] = useState(true);

  const quickQuestions = [
    'What is the total education budget?',
    'Tell me about PM SHRI Schools',
    'Compare scholarship schemes',
    'Show recent policy updates'
  ];

  const scrollToBottom = () => {
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      setIsNearBottom(distanceFromBottom < 150);
    }
  };

  const handleFileProcessed = (fileData) => {
    setUploadedDocs((prev) => [...prev, fileData]);
    const aiMessage = {
      id: messages.length + 1,
      type: 'ai',
      content: `✅ Document analyzed: **${fileData.fileName}**\n\n📊 Summary: ${fileData.analysis.summary}\n\n📈 Stats:\n• ${fileData.wordCount.toLocaleString()} words\n• Type: ${fileData.analysis.documentType}\n• Size: ${fileData.fileSize}\n\nYou can now ask questions about this document!`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, aiMessage]);
    setShowFileUpload(false);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    const typingMessage = {
      id: messages.length + 2,
      type: 'ai',
      content: '',
      timestamp: new Date(),
      isTyping: true,
    };

    setMessages((prev) => [...prev, typingMessage]);

    try {
      const aiResponse = await aiResponder.processQuery(inputMessage, {
        uploadedDocs: uploadedDocs,
        hasDocuments: uploadedDocs.length > 0,
        docCount: uploadedDocs.length,
      });

      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isTyping);
        return [
          ...filtered,
          {
            id: messages.length + 2,
            type: 'ai',
            content: aiResponse,
            timestamp: new Date(),
          },
        ];
      });
    } catch (error) {
      console.error('Message error:', error);
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isTyping);
        return [
          ...filtered,
          {
            id: messages.length + 2,
            type: 'ai',
            content:
              'I apologize for the inconvenience. Please try asking about education schemes or upload a document for analysis.',
            timestamp: new Date(),
          },
        ];
      });
    }

    setIsTyping(false);
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-[#1E3A5F] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-[#1E3A5F] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-[#1E3A5F] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span className="text-xs text-gray-500">AI is thinking...</span>
    </div>
  );

  const MessageBubble = ({ message }) => {
    const isAI = message.type === 'ai';

    return (
      <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-6 animate-fadeIn`}>
        <div
          className={`flex items-start space-x-3 max-w-[90%] md:max-w-3xl ${
            isAI ? '' : 'flex-row-reverse space-x-reverse'
          }`}
        >
          {/* Avatar */}
          <div
            className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
              isAI
                ? 'bg-[#1E3A5F] shadow-sm'
                : 'bg-[#D4AF37] shadow-sm'
            }`}
          >
            {isAI ? (
              <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-white" />
            ) : (
              <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
            )}
          </div>

          {/* Message Content */}
          <div
            className={`px-4 md:px-5 py-3 md:py-4 rounded-2xl ${
              isAI
                ? 'bg-white border border-gray-200 text-gray-900 shadow-sm'
                : 'bg-[#1E3A5F] text-white shadow-sm'
            }`}
          >
            {message.isTyping ? (
              <TypingIndicator />
            ) : (
              <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{message.content}</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 min-h-[calc(100vh-80px)] flex flex-col">
        
        {/* Clean Header */}
        <div className="mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1E3A5F] rounded-xl flex items-center justify-center">
                  <Bot className="h-6 w-6 md:h-7 md:w-7 text-[#D4AF37]" />
                </div>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">AI Policy Assistant</h1>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`w-2 h-2 rounded-full ${groqAI.isAvailable() ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-xs md:text-sm text-gray-600">
                      {groqAI.isAvailable() ? 'Online' : 'Demo Mode'}
                    </span>
                  </div>
                </div>
              </div>

              {uploadedDocs.length > 0 && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 font-medium">
                    {uploadedDocs.length} document{uploadedDocs.length > 1 ? 's' : ''}
                  </span>
                  <button
                    onClick={() => setUploadedDocs([])}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Clear documents"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              )}
            </div>

            {uploadedDocs.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {uploadedDocs.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg"
                  >
                    <FileText className="h-3.5 w-3.5 text-gray-600" />
                    <span className="text-xs font-medium text-gray-700 truncate max-w-[150px]">
                      {doc.fileName}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-6 md:p-8"
          >
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Scroll Button */}
          {!isNearBottom && (
            <button
              onClick={() => {
                setIsNearBottom(true);
                messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="absolute bottom-28 right-6 p-3 bg-white border border-gray-300 text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <ArrowDown className="h-5 w-5" />
            </button>
          )}

          {/* File Upload */}
          {showFileUpload && (
            <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
              <FileUpload onFileProcessed={handleFileProcessed} />
            </div>
          )}

          {/* Quick Questions - Clean & Simple */}
          {messages.length === 1 && !showFileUpload && (
            <div className="px-6 py-5 bg-gray-50 border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-600 mb-3">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-medium border border-gray-200 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area - Clean */}
          <div className="p-5 md:p-6 bg-white border-t border-gray-200">
            <div className="flex items-end space-x-3">
              <button
                onClick={() => setShowFileUpload(!showFileUpload)}
                className={`p-3 rounded-lg transition-all ${
                  showFileUpload
                    ? 'bg-[#1E3A5F] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title="Upload document"
              >
                <FileText className="h-5 w-5" />
              </button>

              <div className="flex-1">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your question here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1E3A5F] focus:border-transparent resize-none text-sm transition-all bg-white"
                  rows={1}
                  disabled={isTyping}
                />
              </div>

              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="p-3 bg-[#1E3A5F] text-white rounded-lg hover:bg-[#2D4A70] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isTyping ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>
                  AI Online
                  {uploadedDocs.length > 0 && ` • ${uploadedDocs.length} doc${uploadedDocs.length > 1 ? 's' : ''}`}
                </span>
              </div>
              <span className="hidden sm:block">Press Enter to send</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
