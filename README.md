# AI-Powered Portfolio Website

A full-featured, interactive portfolio website that mimics the Google Gemini AI chat interface. Users can chat with an AI assistant that responds using the student's portfolio data, showcasing projects, skills, achievements, and more.

## 🚀 Features

### 🤖 AI Chat Interface
- **Google Gemini AI Integration**: Powered by Google's Gemini API for intelligent responses
- **Dynamic Responses**: AI responds contextually based on portfolio data
- **Typing Animations**: Realistic typing indicators and smooth animations
- **Conversational Flow**: Natural chat experience with follow-up questions

### 🎨 UI/UX Design
- **Gemini AI-Style Interface**: Dark theme matching Google's Gemini design
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Interactive Cards**: Hover effects and dynamic content rendering

### 📊 Portfolio Sections
- **About Me**: Personal summary, interests, and goals
- **Projects**: 5 detailed projects with tech stacks, features, and impact
- **Achievements**: Hackathons, academic honors, leadership roles
- **Skills**: Categorized technical skills with visual indicators
- **Experience**: Professional experience and internships
- **Education**: Academic background and coursework

### 🛠️ Technical Features
- **Next.js 14**: Latest React framework with App Router
- **TypeScript**: Full type safety and better development experience
- **TailwindCSS**: Utility-first CSS framework for rapid styling
- **Framer Motion**: Advanced animations and transitions
- **Google Gemini API**: AI-powered conversational responses

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── globals.css          # Global styles and TailwindCSS
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── AchievementCard.tsx  # Achievement display component
│   ├── ChatInput.tsx        # Chat input with auto-resize
│   ├── ChatInterface.tsx   # Main chat interface
│   ├── MessageBubble.tsx    # Individual message component
│   ├── ProjectCard.tsx     # Project display component
│   ├── SkillsSection.tsx   # Skills categorization
│   └── WelcomeMessage.tsx  # Landing page component
├── data/
│   └── portfolio.json       # Portfolio data structure
├── lib/
│   └── gemini.ts           # Google Gemini API service
├── types/
│   └── index.ts            # TypeScript type definitions
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # TailwindCSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Google Gemini API key:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Get Google Gemini API Key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key to your `.env.local` file

5. **Test your API key** (Optional but recommended)
   ```bash
   npm run test-api
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Troubleshooting

If you encounter issues, check the [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) guide for common solutions.

### Quick Fixes:
- **API Key Issues**: Make sure your key is in `.env.local` and starts with `AIzaSy`
- **Network Errors**: Check your internet connection
- **Rate Limiting**: Wait a few minutes and try again
- **Content Filter**: Rephrase your question

### Test Your Setup:
```bash
# Test if your API key works
npm run test-api

# Check for TypeScript errors
npm run type-check

# Verify the build works
npm run build
```

## 🎯 Usage

### Chat Interface
- **Ask Questions**: Type natural language questions about the portfolio
- **Quick Actions**: Use suggested prompts for common queries
- **Dynamic Content**: AI responses trigger relevant portfolio sections
- **Interactive Elements**: Click on project links, view achievements, explore skills

### Example Queries
- "Show me your projects"
- "Tell me about your achievements"
- "What are your technical skills?"
- "Tell me about your AI study assistant project"
- "What programming languages do you know?"
- "Tell me about your Google Summer of Code experience"

### Portfolio Data
The portfolio data is stored in `data/portfolio.json` and includes:
- Student information and contact details
- Detailed project descriptions with tech stacks
- Academic and professional achievements
- Comprehensive skills categorization
- Work experience and education background

## 🛠️ Customization

### Updating Portfolio Data
Edit `data/portfolio.json` to customize:
- Personal information
- Project details and links
- Skills and technologies
- Achievements and experience
- Contact information

### Styling Customization
- **Colors**: Modify `tailwind.config.js` for custom color schemes
- **Components**: Update individual component styles in `components/`
- **Animations**: Adjust Framer Motion animations in components
- **Layout**: Modify responsive breakpoints and spacing

### AI Behavior
Customize AI responses by editing `lib/gemini.ts`:
- Modify the prompt template
- Adjust response length and style
- Add custom instructions for specific queries

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Similar to Vercel, supports Next.js
- **Railway**: Full-stack deployment platform
- **AWS/GCP**: Use services like Amplify or Cloud Run

### Environment Variables
Make sure to set `NEXT_PUBLIC_GEMINI_API_KEY` in your deployment platform.

## 🎨 Design Features

### Gemini AI-Style Interface
- **Dark Theme**: Deep blue-black background (#0f0f23)
- **Accent Colors**: Google blue (#4285f4) for highlights
- **Typography**: Google Sans font family
- **Spacing**: Consistent padding and margins
- **Borders**: Subtle gray borders with hover effects

### Animations
- **Page Load**: Staggered component animations
- **Message Bubbles**: Smooth slide-in effects
- **Typing Indicators**: Realistic typing animation
- **Hover Effects**: Interactive card transformations
- **Scroll Animations**: Elements animate into view

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: TailwindCSS responsive utilities
- **Touch Friendly**: Large touch targets and gestures
- **Performance**: Optimized images and lazy loading

## 🔧 Technical Details

### Dependencies
- **Next.js 14**: React framework with App Router
- **React 18**: Latest React with concurrent features
- **TypeScript**: Type safety and better DX
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Google Generative AI**: Gemini API client
- **Lucide React**: Icon library

### Performance Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js built-in optimization
- **Bundle Analysis**: Built-in bundle analyzer
- **Lazy Loading**: Components load on demand
- **Caching**: API responses cached appropriately

### Security
- **Environment Variables**: Sensitive data in env files
- **API Key Protection**: Client-side API key handling
- **Input Sanitization**: User input properly sanitized
- **HTTPS**: Secure connections in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Gemini**: For the AI API and design inspiration
- **Next.js Team**: For the amazing React framework
- **TailwindCSS**: For the utility-first CSS framework
- **Framer Motion**: For smooth animations
- **Lucide**: For beautiful icons

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the example queries
- Test with the sample data

---

**Built with ❤️ for Google Student Ambassador applications**
"# portfolio" 
