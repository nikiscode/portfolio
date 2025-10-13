import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import portfolioData from '@/data/portfolio.json';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    // Initialize Gemini AI directly in the API route
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Create the prompt
    const prompt = `
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

User's question: "${message}"

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

    // Generate response from Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Chat API error:', error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID')) {
        return NextResponse.json(
          { error: 'Invalid Gemini API key. Please check your API key configuration.' },
          { status: 401 }
        );
      }
      if (error.message.includes('QUOTA_EXCEEDED')) {
        return NextResponse.json(
          { error: 'API quota exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      if (error.message.includes('SAFETY')) {
        return NextResponse.json(
          { error: 'Content blocked by safety filters. Please rephrase your question.' },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to generate response. Please try again.' },
      { status: 500 }
    );
  }
}
