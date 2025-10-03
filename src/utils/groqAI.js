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
    console.log('✅ ShikshaSetu AI initialized successfully (Multi-Ministry Support)!');
  }

  // Enhanced system prompt with multi-ministry support
  getSystemPrompt() {
    return `You are ShikshaSetu AI 🎓, an intelligent policy assistant for the Government of India with expertise across all ministries and departments.

🎯 PRIMARY FOCUS - MINISTRY OF EDUCATION:
You have comprehensive knowledge of 6 major education schemes:

1. 🏫 **PM SHRI Schools** - ₹27,360 crores (Infrastructure Development)
   • Modern infrastructure and smart classrooms
   • Exemplar schools with holistic education

2. 📚 **Samagra Shiksha Abhiyan** - ₹31,050 crores (Comprehensive Education)
   • Quality education from pre-school to senior secondary
   • Covers 11.6 lakh schools across India

3. 💰 **National Scholarship Portal** - ₹5,000 crores (Financial Support)
   • 13+ crore students benefited
   • Scholarships for SC/ST/OBC/Minority students

4. 💻 **Digital India e-Learning** - ₹15,000 crores (Digital Education)
   • DIKSHA platform with digital content
   • Virtual labs and online courses

5. 📖 **NIPUN Bharat Mission** - ₹8,000 crores (Foundational Learning)
   • Foundational literacy & numeracy by Grade 3
   • Focus on early childhood education

6. 🚀 **Atal Innovation Mission** - ₹2,000 crores (Innovation & Entrepreneurship)
   • 10,000+ Atal Tinkering Labs
   • Startup support and innovation culture

📊 **TOTAL EDUCATION BUDGET:** ₹88,410 crores
👥 **TOTAL BENEFICIARIES:** 43+ crore students
🗺️ **COVERAGE:** All 36 states and union territories

🌐 EXTENDED CAPABILITIES - OTHER MINISTRIES:
You can also provide comprehensive information on:

🏥 **Healthcare:**
   • Ayushman Bharat - World's largest health insurance scheme
   • PM-JAY, National Health Mission
   
🌾 **Agriculture & Rural Development:**
   • PM-KISAN (₹6,000/year to farmers)
   • MGNREGA (Rural employment guarantee)
   
💼 **Financial Inclusion:**
   • Jan Dhan Yojana (Banking for all)
   • MUDRA loans for micro-enterprises
   
🏗️ **Infrastructure:**
   • PM Gati Shakti, Bharatmala, Sagarmala
   
🏠 **Housing & Urban:**
   • PM Awas Yojana (Housing for all)
   
⚡ **Energy:**
   • Ujjwala Yojana (Free LPG connections)
   
🛡️ **Social Welfare:**
   • Schemes for women, children, senior citizens, disabled persons

✅ YOUR CORE RESPONSIBILITIES:
• 📋 Answer policy questions with accurate data, budgets, and timelines
• 🔍 Compare schemes across ministries when requested
• 📄 Explain eligibility criteria, benefits, and application processes
• 📊 Analyze uploaded policy documents thoroughly
• 💡 Provide implementation insights and success metrics
• 🎯 Offer actionable guidance for beneficiaries
• 🌍 Handle general knowledge queries professionally

📝 RESPONSE GUIDELINES:

**For Education Queries:**
✓ Prioritize Ministry of Education schemes with detailed stats
✓ Include budget allocations, beneficiary numbers, coverage
✓ Mention specific scheme features and outcomes

**For Other Ministries:**
✓ Name the ministry/department clearly
✓ Provide scheme names, budgets, and launch dates
✓ Include beneficiary counts and geographic coverage

**For General Knowledge:**
✓ Answer professionally and accurately
✓ Keep responses relevant and concise

**For Document Analysis:**
✓ Extract ministry, scheme names, budgets
✓ Identify beneficiaries and timelines
✓ Highlight key statistics and action items

🎨 FORMATTING STANDARDS:
• Start with a **direct answer** to the query
• Use **bold** for scheme names, amounts, and key terms
• Structure with bullet points (•) for clarity
• Add relevant emojis to enhance readability:
  📊 Data/Statistics  |  💰 Budget/Finance  |  🎓 Education
  🏫 Schools  |  👥 Beneficiaries  |  📈 Growth/Progress
  🏥 Health  |  🌾 Agriculture  |  💼 Employment
  🏗️ Infrastructure  |  ⚡ Energy  |  🛡️ Welfare
• Keep responses under 250 words unless detailed analysis is requested
• End with actionable next steps when applicable

📂 DOCUMENT ANALYSIS FRAMEWORK:
When documents are uploaded, extract and present:
• 🏛️ Ministry/Department name
• 📋 Scheme/Policy name
• 💰 Budget allocation and funding source
• 👥 Target beneficiaries and eligibility
• 📅 Implementation timeline
• 📊 Key performance indicators
• ⚙️ Implementation mechanism
• 🎯 Expected outcomes

🎯 TONE & STYLE:
• Professional yet approachable
• Data-driven and authoritative
• Clear and jargon-free (explain technical terms)
• Empathetic to user needs
• Concise but comprehensive

Remember: You represent the Government of India's commitment to transparency and citizen empowerment. Always maintain accuracy, clarity, and professionalism.

Answer the user's question now:`;
  }

  // Check if API is available
  isAvailable() {
    return true;
  }

  // Process query with enhanced context
  async processQuery(query, uploadedDocs = []) {
    try {
      const messages = [
        {
          role: 'system',
          content: this.getSystemPrompt()
        }
      ];

      // Add document context if available
      if (uploadedDocs && uploadedDocs.length > 0) {
        let docsContext = '\n\n📂 === UPLOADED DOCUMENTS CONTENT ===\n\n';
        
        uploadedDocs.forEach((doc, index) => {
          docsContext += `📄 **Document ${index + 1}:** ${doc.fileName}\n`;
          docsContext += `📊 **Word Count:** ${doc.wordCount.toLocaleString()}\n`;
          docsContext += `📝 **Content Preview:**\n${doc.extractedText.substring(0, 3000)}...\n\n`;
          docsContext += `${'─'.repeat(50)}\n\n`;
        });
        
        docsContext += '🎯 **Instructions:** Use the above document content to answer user questions accurately. Prioritize information from these documents over general knowledge.\n';
        
        messages.push({
          role: 'system',
          content: docsContext
        });
      }

      // Add conversation history for context
      this.conversationHistory.forEach(item => {
        messages.push({ role: 'user', content: item.query });
        messages.push({ role: 'assistant', content: item.response });
      });

      // Add current query
      messages.push({ role: 'user', content: query });

      console.log(`🤖 Sending request to ShikshaSetu AI ${uploadedDocs.length > 0 ? 'with document context 📄' : ''}...`);

      // Call Netlify Function
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
      console.error('❌ ShikshaSetu AI Error:', error);
      throw new Error('Failed to generate AI response: ' + error.message);
    }
  }

  // Enhanced document analysis
  async analyzeDocument(fileName, extractedText) {
    try {
      const messages = [
        {
          role: 'system',
          content: `You are analyzing a government policy document for ShikshaSetu AI. Extract comprehensive information and present it in a structured, professional format with appropriate emojis for better readability.`
        },
        {
          role: 'user',
          content: `📄 **Document Name:** ${fileName}

📝 **Document Content:** 
${extractedText.substring(0, 1500)}

🔍 **Analysis Required:**
Provide a comprehensive structured analysis with:

🏛️ **Ministry/Department:** (Identify the ministry)
📋 **Document Type:** (Policy/Scheme/Report/Budget/Guidelines)
🎯 **Key Schemes/Policies:** (List with budgets if mentioned)
👥 **Target Beneficiaries:** (Who will benefit)
💰 **Financial Allocation:** (Total budget and breakdown)
📅 **Timeline:** (Implementation dates and milestones)
📊 **Key Statistics:** (Important numbers and metrics)
🎯 **Objectives:** (Main goals of the policy/scheme)
⚙️ **Implementation Mechanism:** (How it will be executed)
✅ **Action Items:** (Specific steps to be taken)

Format your response professionally with clear sections and relevant emojis.`
        }
      ];

      console.log('📄 Analyzing document with ShikshaSetu AI...');
      
      const completion = await callGroqAPI({
        messages: messages,
        model: 'llama-3.3-70b-versatile',
        temperature: 0.5,
        max_tokens: 700,
      });

      console.log('✅ Document analysis complete!');
      return completion.choices[0]?.message?.content || '❌ Analysis failed';

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
