export const chatResponses = {
  // Greetings
  greetings: [
    "🙏 Namaste! I'm NitiSetu, your AI-powered government policy assistant. I can help you explore education schemes, budgets, and insights. What would you like to know?",
    "Hello! I'm here to help you navigate India's education policies. Ask me about schemes, budgets, beneficiaries, or any specific questions!",
    "Welcome to NitiSetu! I have comprehensive information about government education schemes. How can I assist you today?"
  ],

  // Budget related queries
  budget_queries: {
    "total budget": "📊 **Total Education Budget Analysis:**\n\n🔹 **Total Allocation:** ₹88,410 crores across 6 major schemes\n🔹 **Largest Scheme:** Samagra Shiksha (₹31,050 cr)\n🔹 **Infrastructure Focus:** PM SHRI Schools (₹27,360 cr)\n🔹 **Digital Investment:** ₹15,000 cr for e-Learning\n\n💡 *AI Insight: This represents 40% increase from previous allocation cycle.*",
    
    "pm shri budget": "💰 **PM SHRI Schools Budget:**\n\n🔹 **Total:** ₹27,360 crores (2022-2027)\n🔹 **Per School:** ~₹1.9 crores average\n🔹 **Coverage:** 14,500 schools across all states\n🔹 **Impact:** 50 lakh students directly benefited\n\n📈 *This makes it the largest education infrastructure investment in Indian history!*",
    
    "scholarship budget": "🎓 **Scholarship Program Budget:**\n\n🔹 **Annual Allocation:** ₹5,000 crores\n🔹 **Beneficiaries:** 5 crore students annually\n🔹 **Per Student:** Average ₹1,000 per beneficiary\n🔹 **Success Rate:** 99% digital processing\n\n💡 *AI Analysis: 70% efficiency improvement over manual systems.*"
  },

  // Scheme specific queries
  scheme_queries: {
    "samagra shiksha": "📚 **Samagra Shiksha Abhiyan - Comprehensive Analysis:**\n\n**🎯 Scope:** Pre-school to Class XII coverage\n**💰 Investment:** ₹31,050 crores (largest allocation)\n**👥 Impact:** 25.7 crore students nationwide\n**🏫 Coverage:** 95% schools across India\n\n**Key Achievements:**\n✅ 15 lakh teachers trained\n✅ Inclusive education for all\n✅ Digital integration completed\n\n*AI Recommendation: Focus on learning outcomes in next phase.*",
    
    "nipun bharat": "🧮 **NIPUN Bharat Mission - Foundational Learning:**\n\n**🎯 Objective:** Universal literacy & numeracy by Grade 3\n**💰 Budget:** ₹8,000 crores\n**👶 Target:** 12 crore children (ages 3-9)\n**📅 Timeline:** 2021-2026\n\n**Revolutionary Approach:**\n🎮 Play-based learning methodology\n📱 AI-powered assessment tools\n🏫 80% schools already implementing\n\n*This addresses India's foundational learning crisis at its root!*",
    
    "digital india": "💻 **Digital India e-Learning Ecosystem:**\n\n**🌐 Platforms:** SWAYAM + DIKSHA + e-PG Pathshala\n**💰 Investment:** ₹15,000 crores\n**👥 Users:** 10 crore learners\n**⏰ Content:** 2+ lakh hours available\n\n**AI-Powered Features:**\n🤖 Personalized learning paths\n🗣️ 18+ language support\n📊 Real-time progress tracking\n\n*99.9% uptime makes it India's most reliable education platform!*"
  },

  // Comparative queries
  comparisons: {
    "largest scheme": "📊 **Largest Education Schemes by Budget:**\n\n🥇 **Samagra Shiksha:** ₹31,050 cr (Comprehensive K-12)\n🥈 **PM SHRI Schools:** ₹27,360 cr (Infrastructure)\n🥉 **Digital India e-Learning:** ₹15,000 cr (Digital)\n\n💡 *Together, these top 3 schemes account for 82% of total education budget, showing government's focus on comprehensive, infrastructure, and digital education.*",
    
    "beneficiaries comparison": "👥 **Beneficiary Reach Analysis:**\n\n🏆 **Samagra Shiksha:** 25.7 crore students (Universal K-12)\n📱 **Digital Platforms:** 10 crore learners (Online)\n🍽️ **Scholarship Portal:** 5 crore students (Financial aid)\n\n📈 *AI Insight: Combined reach of 40+ crore beneficiaries represents 30% of India's population!*"
  },

  // Insights and analysis
  insights: {
    "trends": "📈 **AI-Detected Policy Trends:**\n\n🔥 **Emerging Patterns:**\n• 60% budget shift towards digital integration\n• Focus on foundational learning (ages 3-9)\n• Infrastructure + Technology convergence\n• Emphasis on teacher capacity building\n\n🚀 **Future Predictions:**\n• AI tutoring integration by 2025\n• Blockchain certificates adoption\n• Virtual reality in classrooms\n\n*These trends align with global education transformation!*",
    
    "recommendations": "💡 **AI Strategic Recommendations:**\n\n🎯 **Immediate Actions:**\n• Accelerate rural digital connectivity\n• Strengthen teacher training programs\n• Implement real-time monitoring systems\n\n📊 **Policy Optimization:**\n• Cross-scheme synergy enhancement\n• Outcome-based budget allocation\n• Community engagement integration\n\n🚀 **Innovation Opportunities:**\n• AI-powered personalized learning\n• Blockchain for certificate verification\n• Predictive analytics for dropout prevention"
  },

  // Default responses
  default_responses: [
    "🤔 I understand you're asking about education policies. Could you be more specific? I can help with budgets, beneficiaries, scheme details, or comparisons.",
    "💭 That's an interesting query! I have detailed information about 6 major education schemes. Try asking about 'PM SHRI budget' or 'Samagra Shiksha details'.",
    "🔍 I'm constantly analyzing policy data. For the best results, try specific questions like 'Which scheme has the largest budget?' or 'Tell me about digital education initiatives'."
  ],

  // Error responses
  not_found: [
    "🔍 I don't have specific information about that topic in my current database. However, I can provide comprehensive details about PM SHRI Schools, Samagra Shiksha, Digital India e-Learning, NIPUN Bharat, National Scholarship Portal, and Atal Innovation Mission.",
    "❓ That query doesn't match my policy database. Try asking about scheme budgets, beneficiaries, or comparisons between major education initiatives.",
    "🤖 My AI analysis doesn't cover that specific area yet. I specialize in education policy schemes, budgets, and impact analysis. What else can I help you explore?"
  ]
};

// Function to get random response from array
export const getRandomResponse = (responseArray) => {
  return responseArray[Math.floor(Math.random() * responseArray.length)];
};

// Function to simulate typing delay
export const getTypingDelay = (text) => {
  return Math.max(1000, text.length * 20); // Minimum 1 second, then 20ms per character
};
