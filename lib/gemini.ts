import { GoogleGenerativeAI } from '@google/generative-ai';
import { PortfolioData } from '@/types';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export class GeminiService {
  private model: any;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateResponse(userMessage: string, portfolioData: PortfolioData): Promise<string> {
    try {
      // Use API route for better error handling
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `API request failed: ${response.status}`;
        
        // Provide specific error messages based on status code
        if (response.status === 401) {
          return "🔑 **API Key Issue**: Please check your Gemini API key configuration. Make sure you've added a valid API key to your `.env.local` file.";
        }
        if (response.status === 429) {
          return "⏰ **Rate Limit**: You've exceeded the API rate limit. Please wait a moment and try again.";
        }
        if (response.status === 400) {
          return "🚫 **Content Filter**: Your message was blocked by safety filters. Please try rephrasing your question.";
        }
        
        return `❌ **Error**: ${errorMessage}`;
      }

      const data = await response.json();
      return data.response || "I apologize, but I'm having trouble processing your request right now. Please try again later.";
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return "🌐 **Network Error**: Unable to connect to the AI service. Please check your internet connection and try again.";
      }
      
      return "I apologize, but I'm having trouble processing your request right now. Please try again later.";
    }
  }

  private createPrompt(userMessage: string, portfolioData: PortfolioData): string {
    return `
You are an AI assistant representing ${portfolioData.student.name}, a ${portfolioData.student.year} ${portfolioData.student.major} student at ${portfolioData.student.university} who is applying to be a Google Student Ambassador.

Here's the portfolio information:

STUDENT INFO:
- Name: ${portfolioData.student.name}
- Title: ${portfolioData.student.title}
- University: ${portfolioData.student.university}
- Year: ${portfolioData.student.year}
- Major: ${portfolioData.student.major}
- Location: ${portfolioData.student.location}
- Email: ${portfolioData.student.email}
- LinkedIn: ${portfolioData.student.linkedin}
- GitHub: ${portfolioData.student.github}

ABOUT:
${portfolioData.about.summary}

Interests: ${portfolioData.about.interests.join(', ')}
Goals: ${portfolioData.about.goals.join(', ')}

PROJECTS:
${portfolioData.projects.map(project => `
- ${project.title}: ${project.description}
  Tech Stack: ${project.techStack.join(', ')}
  Status: ${project.status}
  Impact: ${project.impact}
  Links: ${Object.entries(project.links).map(([key, value]) => `${key}: ${value}`).join(', ')}
`).join('\n')}

ACHIEVEMENTS:
${portfolioData.achievements.map(achievement => `
- ${achievement.title} (${achievement.type}): ${achievement.description}
  Date: ${achievement.date}
  Impact: ${achievement.impact}
`).join('\n')}

SKILLS:
Programming Languages: ${portfolioData.skills.programmingLanguages.join(', ')}
Web Technologies: ${portfolioData.skills.webTechnologies.join(', ')}
Databases: ${portfolioData.skills.databases.join(', ')}
Cloud Platforms: ${portfolioData.skills.cloudPlatforms.join(', ')}
AI/ML: ${portfolioData.skills.aiMl.join(', ')}
Tools: ${portfolioData.skills.tools.join(', ')}

EXPERIENCE:
${portfolioData.experience.map(exp => `
- ${exp.title} at ${exp.company} (${exp.duration}): ${exp.description}
  Technologies: ${exp.technologies.join(', ')}
`).join('\n')}

EDUCATION:
${portfolioData.education.degree} at ${portfolioData.education.university}
Expected Graduation: ${portfolioData.education.expectedGraduation}
GPA: ${portfolioData.education.gpa}
Relevant Coursework: ${portfolioData.education.relevantCoursework.join(', ')}

User's question: "${userMessage}"

Instructions:
1. Respond as if you are ${portfolioData.student.name}'s AI assistant
2. Be helpful, engaging, and showcase their achievements and skills
3. When mentioning projects, provide specific details and impact
4. Use a conversational tone that reflects their passion for technology
5. If asked about specific projects, provide detailed information including tech stack and impact
6. If asked about skills, organize them by category and mention proficiency levels
7. Always highlight their suitability for the Google Student Ambassador role
8. Keep responses concise but informative (2-3 paragraphs max)
9. Use markdown formatting for better readability when appropriate
10. If the user asks something not related to the portfolio, politely redirect them to ask about ${portfolioData.student.name}'s background, projects, skills, or achievements

Respond to the user's question now:
`;
  }
}

export const geminiService = new GeminiService();
