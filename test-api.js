#!/usr/bin/env node

// Simple script to test if the Gemini API key is working
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config({ path: '.env.local' });

async function testAPI() {
  console.log('🧪 Testing Gemini API connection...\n');
  
  // Check if API key exists
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    console.log('❌ Error: No API key found');
    console.log('📝 Please add your API key to .env.local:');
    console.log('   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here\n');
    process.exit(1);
  }
  
  if (!apiKey.startsWith('AIzaSy')) {
    console.log('❌ Error: Invalid API key format');
    console.log('📝 API key should start with "AIzaSy"');
    console.log('🔗 Get your key from: https://makersuite.google.com/app/apikey\n');
    process.exit(1);
  }
  
  console.log('✅ API key found:', apiKey.substring(0, 10) + '...');
  
  try {
    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    console.log('🔄 Testing API call...');
    
    // Test with a simple prompt
    const result = await model.generateContent('Hello, can you respond with "API test successful"?');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ API test successful!');
    console.log('🤖 Response:', text);
    console.log('\n🎉 Your Gemini API is working correctly!');
    console.log('🚀 You can now run: npm run dev');
    
  } catch (error) {
    console.log('❌ API test failed:');
    console.log('📝 Error:', error.message);
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.log('\n🔧 Solutions:');
      console.log('1. Check your API key at: https://makersuite.google.com/app/apikey');
      console.log('2. Make sure the key is correctly copied to .env.local');
      console.log('3. Restart your development server after adding the key');
    } else if (error.message.includes('QUOTA_EXCEEDED')) {
      console.log('\n🔧 Solutions:');
      console.log('1. Check your API quota at: https://makersuite.google.com/app/apikey');
      console.log('2. Wait a few minutes before trying again');
      console.log('3. Consider upgrading your API plan if needed');
    } else {
      console.log('\n🔧 General solutions:');
      console.log('1. Check your internet connection');
      console.log('2. Verify your API key is correct');
      console.log('3. Try again in a few minutes');
    }
    
    process.exit(1);
  }
}

// Run the test
testAPI().catch(console.error);
