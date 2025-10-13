import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { PortfolioData, Achievement, Project } from '@/types';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'portfolio.json');

// GET - Fetch portfolio data
export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const portfolioData = JSON.parse(data);
    return NextResponse.json(portfolioData);
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}

// POST - Add new achievement or project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data: newData } = body;

    // Read current portfolio data
    const currentData = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const portfolioData: PortfolioData = JSON.parse(currentData);

    if (type === 'achievement') {
      const achievement: Achievement = {
        title: newData.title,
        description: newData.description,
        date: newData.date || new Date().toLocaleDateString(),
        type: newData.type || 'Achievement',
        impact: newData.impact || ''
      };
      
      portfolioData.achievements.push(achievement);
    } else if (type === 'project') {
      const project: Project = {
        id: Math.max(...portfolioData.projects.map(p => p.id), 0) + 1,
        title: newData.title,
        description: newData.description,
        techStack: newData.techStack || [],
        features: newData.features || [],
        links: newData.links || {},
        status: newData.status || 'Active Development',
        impact: newData.impact || ''
      };
      
      portfolioData.projects.push(project);
    } else if (type === 'certificate') {
      // Add certificate as a special type of achievement
      const certificate: Achievement = {
        title: newData.title,
        description: newData.description,
        date: newData.date || new Date().toLocaleDateString(),
        type: 'Certificate',
        impact: newData.impact || ''
      };
      
      portfolioData.achievements.push(certificate);
    } else if (type === 'skill') {
      const { category, skill } = newData;
      if (portfolioData.skills[category as keyof typeof portfolioData.skills]) {
        portfolioData.skills[category as keyof typeof portfolioData.skills].push(skill);
      }
    }

    // Write updated data back to file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(portfolioData, null, 2));
    
    return NextResponse.json({ success: true, data: portfolioData });
  } catch (error) {
    console.error('Error updating portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio data' },
      { status: 500 }
    );
  }
}

// PUT - Update existing data
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, data: updatedData } = body;

    // Read current portfolio data
    const currentData = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const portfolioData: PortfolioData = JSON.parse(currentData);

    if (type === 'achievement') {
      const index = portfolioData.achievements.findIndex(a => a.title === id);
      if (index !== -1) {
        portfolioData.achievements[index] = { ...portfolioData.achievements[index], ...updatedData };
      }
    } else if (type === 'project') {
      const index = portfolioData.projects.findIndex(p => p.id === parseInt(id));
      if (index !== -1) {
        portfolioData.projects[index] = { ...portfolioData.projects[index], ...updatedData };
      }
    } else if (type === 'student') {
      portfolioData.student = { ...portfolioData.student, ...updatedData };
    }

    // Write updated data back to file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(portfolioData, null, 2));
    
    return NextResponse.json({ success: true, data: portfolioData });
  } catch (error) {
    console.error('Error updating portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio data' },
      { status: 500 }
    );
  }
}

// DELETE - Remove data
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    // Read current portfolio data
    const currentData = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const portfolioData: PortfolioData = JSON.parse(currentData);

    if (type === 'achievement') {
      portfolioData.achievements = portfolioData.achievements.filter(a => a.title !== id);
    } else if (type === 'project') {
      portfolioData.projects = portfolioData.projects.filter(p => p.id !== parseInt(id || '0'));
    }

    // Write updated data back to file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(portfolioData, null, 2));
    
    return NextResponse.json({ success: true, data: portfolioData });
  } catch (error) {
    console.error('Error deleting portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio data' },
      { status: 500 }
    );
  }
}
