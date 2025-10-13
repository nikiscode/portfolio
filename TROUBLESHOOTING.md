# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. 🔑 API Key Issues

**Error**: "API Key Issue: Please check your Gemini API key configuration"

**Solution**:
1. **Get your API key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated key

2. **Add to environment file**:
   ```bash
   # Create .env.local file in the project root
   echo "NEXT_PUBLIC_GEMINI_API_KEY=your_actual_api_key_here" > .env.local
   ```

3. **Restart the development server**:
   ```bash
   npm run dev
   ```

### 2. 🌐 Network Issues

**Error**: "Network Error: Unable to connect to the AI service"

**Solutions**:
- Check your internet connection
- Try refreshing the page
- Check if your firewall is blocking the request
- Try using a different network

### 3. ⏰ Rate Limiting

**Error**: "Rate Limit: You've exceeded the API rate limit"

**Solutions**:
- Wait a few minutes before trying again
- Check your API quota in Google AI Studio
- Consider upgrading your API plan if needed

### 4. 🚫 Content Filter

**Error**: "Content Filter: Your message was blocked by safety filters"

**Solutions**:
- Rephrase your question
- Avoid sensitive or inappropriate content
- Try asking about portfolio-related topics

### 5. 🔄 Development Server Issues

**Error**: "Failed to generate response"

**Solutions**:
1. **Check if the server is running**:
   ```bash
   npm run dev
   ```

2. **Check the console for errors**:
   - Open browser developer tools (F12)
   - Look for error messages in the Console tab

3. **Verify file structure**:
   ```bash
   ls -la
   # Should see: .env.local, package.json, app/, components/, etc.
   ```

### 6. 📦 Dependency Issues

**Error**: Module not found or import errors

**Solutions**:
1. **Reinstall dependencies**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node.js version**:
   ```bash
   node --version
   # Should be 18+ for Next.js 14
   ```

### 7. 🎨 Styling Issues

**Error**: Styles not loading or TailwindCSS not working

**Solutions**:
1. **Check TailwindCSS configuration**:
   ```bash
   cat tailwind.config.js
   ```

2. **Restart the development server**:
   ```bash
   npm run dev
   ```

3. **Clear browser cache**:
   - Hard refresh (Ctrl+F5 or Cmd+Shift+R)

## 🔍 Debugging Steps

### 1. Check Environment Variables
```bash
# In your terminal, run:
echo $NEXT_PUBLIC_GEMINI_API_KEY
# Should show your API key (not empty)
```

### 2. Test API Key Manually
```bash
# Test if your API key works
curl -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY"
```

### 3. Check Browser Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for error messages
4. Try sending a message and watch for errors

### 4. Check Network Tab
1. Open browser developer tools (F12)
2. Go to Network tab
3. Send a message
4. Look for failed requests to `/api/chat`

## 🚀 Quick Fixes

### Reset Everything
```bash
# Stop the server (Ctrl+C)
# Then run:
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### Check API Key Format
Your API key should look like:
```
AIzaSyC... (starts with AIzaSy)
```

### Verify File Structure
```
portfolio/
├── .env.local          # ← Your API key goes here
├── package.json
├── app/
│   ├── api/chat/route.ts
│   └── page.tsx
├── components/
├── data/portfolio.json
└── lib/gemini.ts
```

## 📞 Getting Help

### 1. Check the Console
- Open browser developer tools (F12)
- Look for error messages
- Take a screenshot of any errors

### 2. Test the API Key
- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- Make sure your API key is active
- Check your quota and usage

### 3. Verify Setup
- Make sure you're in the correct directory
- Check that all files are present
- Verify your Node.js version (18+)

### 4. Common Mistakes
- ❌ API key in wrong file (should be `.env.local`)
- ❌ Missing `NEXT_PUBLIC_` prefix
- ❌ Server not restarted after adding API key
- ❌ Wrong directory (should be in `/portfolio/`)

## ✅ Success Checklist

- [ ] API key added to `.env.local`
- [ ] Development server running (`npm run dev`)
- [ ] No errors in browser console
- [ ] Can send messages in the chat interface
- [ ] AI responds with portfolio information

---

**Still having issues?** Check the browser console for specific error messages and share them for more targeted help! 🚀
