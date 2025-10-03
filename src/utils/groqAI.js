// Helper function to call Netlify Function
const callGroqAPI = async ({ messages, model, temperature = 0.3, max_tokens = 1000 }) => {
  const res = await fetch('/.netlify/functions/groq-proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, model, temperature, max_tokens }),
  });
  if (!res.ok) throw new Error('Groq proxy error');
  return await res.json();
};

class GroqAIService {
  constructor() {
    this.conversationHistory = [];
    console.log('✅ Groq AI initialized successfully (using Netlify Function)!');
  }

  // System prompt for government policy assistant
  getSystemPrompt() {
    return `You are NitiSetu, an AI assistant for the Ministry of Education, Government of India. 

KNOWLEDGE BASE:
You have access to 6 major education schemes:
1. PM SHRI Schools - ₹27,360 crores (Infrastructure Development)
2. Samagra Shiksha Abhiyan - ₹31,050 crores (Comprehensive Education)
3. National Scholarship Portal - ₹5,000 crores (Financial Support)
4. Digital India e-Learning - ₹15,000 crores (Digital Education)
5. NIPUN Bharat Mission - ₹8,000 crores (Foundational Learning)
6. Atal Innovation Mission - ₹2,000 crores (Innovation & Entrepreneurship)

TOTAL BUDGET: ₹88,410 crores
TOTAL BENEFICIARIES: 43+ crore students across India
GEOGRAPHIC COVERAGE: All 36 states and union territories

YOUR ROLE:
- Answer questions about education policies, schemes, and budgets
- Provide accurate data from the schemes above
- When documents are uploaded, prioritize information from those documents
- Be professional, concise, and helpful
- Use emojis sparingly (📊 💰 🎓 🏫 👥)
- Format responses with bullet points when listing items
- Always cite specific scheme names and figures
- Keep responses conversational but professional

RESPONSE FORMAT:
- Keep responses under 200 words unless asked for details
- Use **bold** for important terms
- Start with a direct answer, then add details

Answer the user's question now:`;
  }

  // Check if API is available
  isAvailable() {
    return true; // Always true when using Netlify Function
  }

  // Process query with real AI and document context
  async processQuery(query, uploadedDocs = []) {
    try {
      // Build messages array
      const messages = [
        {
          role: 'system',
          content: this.getSystemPrompt()
        }
      ];

      // Add uploaded documents context
      if (uploadedDocs && uploadedDocs.length > 0) {
        let docsContext = '\n\n=== UPLOADED DOCUMENTS CONTENT ===\n\n';
        
        uploadedDocs.forEach((doc, index) => {
          docsContext += `Document ${index + 1}: ${doc.fileName}\n`;
          docsContext += `Word Count: ${doc.wordCount}\n`;
          docsContext += `Content:\n${doc.extractedText.substring(0, 3000)}...\n\n`;
          docsContext += `---\n\n`;
        });
        
        docsContext += 'Use the above document content to answer user questions accurately. Prioritize information from these documents.\n';
        
        messages.push({
          role: 'system',
          content: docsContext
        });
      }

      // Add conversation history
      this.conversationHistory.forEach(item => {
        messages.push({ role: 'user', content: item.query });
        messages.push({ role: 'assistant', content: item.response });
      });

      // Add current query
      messages.push({ role: 'user', content: query });

      console.log(`🤖 Sending request to Groq AI via Netlify Function ${uploadedDocs.length > 0 ? 'with document context' : ''}...`);

      // Call Netlify Function instead of direct API
      const completion = await callGroqAPI({
        messages: messages,
        model: 'llama-3.3-70b-versatile',
        temperature: 0.7,
        max_tokens: 800,
      });

      const responseText = completion.choices[0]?.message?.content || 'No response generated';

      console.log('✅ Received AI response!');

      // Save to conversation history
      this.conversationHistory.push({
        query: query,
        response: responseText,
        timestamp: new Date()
      });

      return responseText;

    } catch (error) {
      console.error('❌ Groq API Error:', error);
      throw new Error('Failed to generate AI response: ' + error.message);
    }
  }

  // Analyze uploaded document
  async analyzeDocument(fileName, extractedText) {
    try {
      const messages = [
        {
          role: 'system',
          content: 'You are analyzing a government policy document for the Ministry of Education, India.'
        },
        {
          role: 'user',
          content: `Document Name: ${fileName}\n\nDocument Content: ${extractedText.substring(0, 1000)}\n\nProvide structured analysis with:\n- Document Type\n- Key Points (3-4 bullets)\n- Financial Data\n- Statistics\n- Action Items`
        }
      ];

      console.log('📄 Analyzing document with AI via Netlify Function...');
      
      // Call Netlify Function instead of direct API
      const completion = await callGroqAPI({
        messages: messages,
        model: 'llama-3.3-70b-versatile',
        temperature: 0.5,
        max_tokens: 600,
      });

      console.log('✅ Document analysis complete!');
      return completion.choices[0]?.message?.content || 'Analysis failed';

    } catch (error) {
      console.error('❌ Document analysis error:', error);
      throw error;
    }
  }

  // Clear conversation history
  clearHistory() {
    this.conversationHistory = [];
    console.log('🗑️ Conversation history cleared');
  }

  // Get conversation history
  getHistory() {
    return this.conversationHistory;
  }
}

// Export singleton instance
export const groqAI = new GroqAIService();
