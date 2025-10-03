const Groq = require('groq-sdk');

exports.handler = async (event) => {
  // CORS headers for development
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse request body
    const { messages, model, temperature, max_tokens } = JSON.parse(event.body || '{}');
    
    // Validate API key
    if (!process.env.GROQ_API_KEY) {
      console.error('❌ GROQ_API_KEY not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured. Check environment variables.' })
      };
    }

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid messages format' })
      };
    }

    console.log('✅ Groq proxy: Calling API...');

    // Initialize Groq client
    const groq = new Groq({ 
      apiKey: process.env.GROQ_API_KEY 
    });

    // Make API request
    const result = await groq.chat.completions.create({
      messages,
      model: model || 'llama-3.3-70b-versatile',
      temperature: temperature !== undefined ? temperature : 0.3,
      max_tokens: max_tokens || 1000,
    });

    console.log('✅ Groq proxy: Success');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    };

  } catch (err) {
    console.error('❌ Groq proxy error:', err.message);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Groq API request failed',
        message: err.message,
        details: process.env.NODE_ENV === 'development' ? err.toString() : undefined
      })
    };
  }
};
