import { chatResponses, getRandomResponse } from '../data/chatResponses.js';
import { groqAI } from './groqAI.js';

export class AIResponseGenerator {
  constructor() {
    this.isProcessing = false;
    this.conversationHistory = [];
  }

  // 🔥 UPDATED: Process query with document support
  async processQuery(query, context = null) {
    this.isProcessing = true;
    
    // Simulate thinking time
    await this.simulateProcessing();
    
    let response;
    let usedRealAI = false;

    // Try REAL AI first if available
    if (groqAI.isAvailable()) {
      try {
        // 🔥 UPDATED: Pass full document data to AI
        const uploadedDocs = context?.uploadedDocs || [];
        response = await groqAI.processQuery(query, uploadedDocs);
        usedRealAI = true;
        console.log('✅ Using REAL AI (Groq) with', uploadedDocs.length, 'documents');
      } catch (error) {
        console.error('AI API failed, using fallback:', error);
        response = this.generateFallbackResponse(query.toLowerCase(), context);
      }
    } else {
      // Use fallback responses
      console.log('⚠️ Using fallback responses (no API key)');
      response = this.generateFallbackResponse(query.toLowerCase(), context);
    }
    
    // Add to conversation history
    this.conversationHistory.push({
      query,
      response,
      timestamp: new Date(),
      context,
      usedRealAI
    });
    
    this.isProcessing = false;
    return response;
  }

  // Generate fallback response when AI is not available
  generateFallbackResponse(query, context) {
    // Greeting responses
    if (this.isGreeting(query)) {
      return getRandomResponse(chatResponses.greetings);
    }

    // Budget related queries
    if (query.includes('budget')) {
      if (query.includes('total')) {
        return chatResponses.budget_queries['total budget'];
      } else if (query.includes('pm shri')) {
        return chatResponses.budget_queries['pm shri budget'];
      } else if (query.includes('scholarship')) {
        return chatResponses.budget_queries['scholarship budget'];
      } else {
        return chatResponses.budget_queries['total budget'];
      }
    }

    // Scheme specific queries
    if (query.includes('samagra shiksha')) {
      return chatResponses.scheme_queries['samagra shiksha'];
    }
    if (query.includes('nipun bharat')) {
      return chatResponses.scheme_queries['nipun bharat'];
    }
    if (query.includes('digital') && (query.includes('india') || query.includes('learning'))) {
      return chatResponses.scheme_queries['digital india'];
    }

    // Comparison queries
    if (query.includes('largest') || query.includes('biggest')) {
      return chatResponses.comparisons['largest scheme'];
    }
    if (query.includes('beneficiar') && query.includes('comparison')) {
      return chatResponses.comparisons['beneficiaries comparison'];
    }

    // Analysis and insights
    if (query.includes('trend') || query.includes('analysis')) {
      return chatResponses.insights['trends'];
    }
    if (query.includes('recommend') || query.includes('suggest')) {
      return chatResponses.insights['recommendations'];
    }

    // Policy specific questions
    if (context && context.policyId) {
      return this.generatePolicySpecificResponse(query, context.policyId);
    }

    // Default responses for unmatched queries
    if (this.conversationHistory.length === 0) {
      return getRandomResponse(chatResponses.greetings);
    } else {
      return getRandomResponse(chatResponses.default_responses);
    }
  }

  // Generate policy-specific responses
  generatePolicySpecificResponse(query, policyId) {
    const responses = {
      1: "📋 **PM SHRI Schools - Detailed Analysis:**\n\nThis flagship infrastructure program represents the largest education transformation initiative with comprehensive smart classroom integration and NEP 2020 implementation framework.",
      2: "📚 **Samagra Shiksha - Deep Dive:**\n\nAs India's most comprehensive education program, it integrates pre-school to senior secondary education with focus on inclusive learning and teacher capacity building.",
      3: "🎓 **Scholarship Portal - Advanced Insights:**\n\nThe digital transformation of scholarship distribution has achieved 99% processing efficiency with real-time tracking and transparent fund disbursal mechanisms."
    };

    return responses[policyId] || getRandomResponse(chatResponses.default_responses);
  }

  // Check if query is a greeting
  isGreeting(query) {
    const greetingWords = ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good afternoon', 'help'];
    return greetingWords.some(word => query.includes(word));
  }

  // Simulate AI processing delay
  async simulateProcessing() {
    // Random delay between 1-2.5 seconds for realism
    const delay = Math.random() * 1500 + 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  // Get conversation history
  getHistory() {
    return this.conversationHistory;
  }

  // Clear conversation
  clearHistory() {
    this.conversationHistory = [];
    if (groqAI.isAvailable()) {
      groqAI.clearHistory();
    }
  }

  // Get processing status
  getProcessingStatus() {
    return this.isProcessing;
  }

  // Check if using real AI
  isUsingRealAI() {
    return groqAI.isAvailable();
  }
}

// Create singleton instance
export const aiResponder = new AIResponseGenerator();
