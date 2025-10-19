## # AI-Powered Portfolio Website

A comprehensive, interactive portfolio website featuring AI chat capabilities, creative showcase, and dynamic GitHub integration. Built for Google Student Ambassador applications with a focus on authentic learning journey representation.

## 🚀 Features

### 🤖 AI Chat Interface (Coming Soon)
- **Google Gemini AI Integration**: Powered by Google's Gemini API for intelligent responses
- **Dynamic Responses**: AI responds contextually based on portfolio data
- **Typing Animations**: Realistic typing indicators and smooth animations
- **Conversational Flow**: Natural chat experience with follow-up questions
- **Status**: Currently showing "Coming Soon" page with beautiful animations

### 🎨 Creative Showcase
- **Animated Hero Section**: Google-branded hero with rotating stats
- **Interactive Timeline**: Achievement and project timeline with filters
- **3D Project Showcase**: Immersive project carousel with hover effects
- **Live Stats Dashboard**: Animated counters and metrics
- **Interactive Skill Radar**: Canvas-based skill visualization
- **Google Ambassador Highlights**: Dedicated section for ambassador applications

### 📊 Portfolio Sections
- **About Me**: Personal summary, interests, and academic goals
- **Projects**: 7 detailed projects with tech stacks, features, and GitHub links
- **Achievements**: 6 achievements including hackathons, certifications, and academic honors
- **Skills**: Categorized technical skills with focus learner levels (under 50%)
- **Experience**: Professional experience and internships
- **Education**: Academic background and coursework

### 🛠️ Technical Features
- **Next.js 14**: Latest React framework with App Router
- **TypeScript**: Full type safety and better development experience
- **TailwindCSS**: Utility-first CSS framework for rapid styling
- **Framer Motion**: Advanced animations and transitions
- **Google Gemini API**: AI-powered conversational responses
- **GitHub Integration**: Dynamic project data fetching
- **Responsive Design**: Optimized for all devices
- **Smooth Scrolling**: Enhanced user experience

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── chat/route.ts        # AI chat API endpoint
│   │   ├── portfolio/route.ts  # Portfolio CRUD operations
│   │   └── github/route.ts     # GitHub integration
│   ├── admin/page.tsx          # Admin panel for data management
│   ├── chat/page.tsx           # Chat interface (Coming Soon)
│   ├── portfolio/page.tsx      # Portfolio view page
│   ├── showcase/page.tsx       # Creative showcase page
│   ├── globals.css             # Global styles and TailwindCSS
│   ├── layout.tsx              # Root layout component
│   └── page.tsx               # Main landing page
├── components/
│   ├── AchievementCard.tsx     # Achievement display with links
│   ├── AchievementTimeline.tsx # Timeline component
│   ├── AdminPanel.tsx          # Data management interface
│   ├── AnimatedHero.tsx        # Hero section with animations
│   ├── ChatInterface.tsx       # Main chat interface
│   ├── ChatSidebar.tsx         # Chat history sidebar
│   ├── CreativeShowcase.tsx    # Full-screen showcase
│   ├── GoogleAmbassadorHighlights.tsx # Ambassador application section
│   ├── InteractiveSkillRadar.tsx # Skill radar visualization
│   ├── LandingPage.tsx         # Main portfolio page
│   ├── LiveStatsDashboard.tsx # Animated stats dashboard
│   ├── Project3DShowcase.tsx  # 3D project carousel
│   ├── ProjectCard.tsx        # Project display component
│   ├── SkillVisualizer.tsx     # Skills visualization
│   └── WelcomeMessage.tsx      # Welcome component
├── data/
│   └── portfolio.json          # Portfolio data structure
├── lib/
│   └── gemini.ts              # Google Gemini API service
├── store/
│   └── chatStore.ts           # Zustand state management
├── types/
│   └── index.ts               # TypeScript type definitions
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # TailwindCSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nikiscode/portfolio
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

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Main Portfolio (`/`)
- **Clean Professional Profile**: AI/ML Student | Full-Stack Developer
- **About Section**: Academic focus and learning goals
- **Projects**: 7 technical projects with GitHub links
- **Achievements**: 6 achievements with LinkedIn/GitHub links
- **Skills**: Focus learner levels (under 50% proficiency)
- **Experience**: Professional and academic experience
- **Education**: Amity University, B.Tech AI/ML

### Creative Showcase (`/showcase`)
- **Google Ambassador Application**: Complete dedicated presentation
- **Animated Elements**: Hero section, timeline, 3D projects
- **Interactive Features**: Skill radar, live stats, ambassador highlights
- **Navigation**: Easy return to main portfolio
- **Full-Screen Experience**: Immersive presentation mode

### Chat Interface (`/chat`)
- **Coming Soon Page**: Beautiful animated placeholder
- **Future AI Features**: Planned conversational interface
- **Easy Navigation**: Back to portfolio button

### Admin Panel (`/admin`)
- **Data Management**: Add/update achievements, projects, certificates
- **GitHub Sync**: Fetch and update project data
- **Profile Management**: Update personal information

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
- **Smooth Scrolling**: Enhanced laptop experience

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
- **Zustand**: State management
- **Recharts**: Data visualization

### Performance Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js built-in optimization
- **Bundle Analysis**: Built-in bundle analyzer
- **Lazy Loading**: Components load on demand
- **Caching**: API responses cached appropriately
- **SSR Compatibility**: Server-side rendering support

### Security
- **Environment Variables**: Sensitive data in env files
- **API Key Protection**: Client-side API key handling
- **Input Sanitization**: User input properly sanitized
- **HTTPS**: Secure connections in production

## 📊 Portfolio Data

### Student Information
- **Name**: Nikitha N
- **Title**: AI/ML Student | Full-Stack Developer
- **University**: Amity University, B.Tech AI/ML
- **Location**: Bengaluru, India
- **Email**: nikitha.nrb@gmail.com
- **GitHub**: https://github.com/nikiscode
- **LinkedIn**: https://www.linkedin.com/in/nikitha-n-254a10347/

### Projects (7)
1. **Local LLM Integration** - Multi-model AI integration
2. **eConsult-Sentiment** - Healthcare sentiment analysis
3. **AI-Powered PDF Chatbot** - Document analysis system
4. **Portfolio Website** - Modern responsive portfolio
5. **Screening Bot** - Automated candidate evaluation
6. **Student Voting System** - Academic project with FastAPI
7. **GitHub Activity Tracker** - Repository monitoring tool

### Achievements (6)
1. **GDG Certification** - Google Developer Groups certified
2. **AI-Powered PDF Chatbot** - LinkedIn featured project
3. **Student Voting System** - Academic project showcase
4. **eConsult-Sentiment Hackathon** - September 2025 certification
5. **Open Source Contributions** - 12+ GitHub repositories
6. **Academic Excellence** - University recognition

### Skills (Focus Learner Levels)
- **Programming Languages**: 45% (Python, JavaScript, HTML, CSS, R, C)
- **Web Technologies**: 40% (React, FastAPI, Flask, TailwindCSS)
- **AI/ML Tools**: 35% (PyTorch, Transformers, NLTK, spaCy)
- **Databases**: 30% (MySQL, Data Analysis, Visualization)
- **Cloud Platforms**: 25% (GitHub, Version Control, Local Deployment)
- **Development Tools**: 40% (Git, Python Libraries, Automation)

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
- **Amity University**: For academic support and opportunities

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the documentation
- Review the example queries
- Test with the sample data

---

**Built with ❤️ for Google Student Ambassador applications**

**Contact**: nikitha.nrb@gmail.com | **GitHub**: https://github.com/nikiscode
