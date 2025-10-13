import { NextRequest, NextResponse } from 'next/server';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  clone_url: string;
  language: string;
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  homepage: string;
}

interface GitHubLanguages {
  [key: string]: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const token = searchParams.get('token');

    if (!username) {
      return NextResponse.json(
        { error: 'GitHub username is required' },
        { status: 400 }
      );
    }

    // Fetch user repositories
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      { headers }
    );

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`);
    }

    const repos: GitHubRepo[] = await reposResponse.json();

    // Fetch languages for each repository
    const reposWithLanguages = await Promise.all(
      repos.map(async (repo) => {
        try {
          const languagesResponse = await fetch(repo.languages_url, { headers });
          if (languagesResponse.ok) {
            const languages: GitHubLanguages = await languagesResponse.json();
            return {
              ...repo,
              languages: languages,
              primaryLanguage: Object.keys(languages).reduce((a, b) => 
                languages[a] > languages[b] ? a : b, Object.keys(languages)[0]
              )
            };
          }
        } catch (error) {
          console.error(`Error fetching languages for ${repo.name}:`, error);
        }
        return {
          ...repo,
          languages: {},
          primaryLanguage: repo.language || 'Unknown'
        };
      })
    );

    // Calculate statistics
    const stats = {
      totalRepos: reposWithLanguages.length,
      totalStars: reposWithLanguages.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: reposWithLanguages.reduce((sum, repo) => sum + repo.forks_count, 0),
      languages: {} as { [key: string]: number },
      recentRepos: reposWithLanguages
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 10)
    };

    // Calculate language usage
    reposWithLanguages.forEach(repo => {
      Object.entries(repo.languages).forEach(([lang, bytes]) => {
        stats.languages[lang] = (stats.languages[lang] || 0) + bytes;
      });
    });

    // Sort languages by usage
    const sortedLanguages = Object.entries(stats.languages)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([lang]) => lang);

    return NextResponse.json({
      username,
      repositories: reposWithLanguages,
      statistics: {
        ...stats,
        topLanguages: sortedLanguages
      }
    });

  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}

// POST - Sync GitHub data with portfolio
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, token, autoSync = false } = body;

    if (!username) {
      return NextResponse.json(
        { error: 'GitHub username is required' },
        { status: 400 }
      );
    }

    // Fetch GitHub data
    const githubResponse = await fetch(
      `${request.nextUrl.origin}/api/github?username=${username}${token ? `&token=${token}` : ''}`
    );
    
    if (!githubResponse.ok) {
      throw new Error('Failed to fetch GitHub data');
    }

    const githubData = await githubResponse.json();

    if (autoSync) {
      // Auto-sync with portfolio data
      const portfolioResponse = await fetch(`${request.nextUrl.origin}/api/portfolio`);
      const portfolioData = await portfolioResponse.json();

      // Update GitHub URL in student info
      const updatedStudent = {
        ...portfolioData.student,
        github: `https://github.com/${username}`
      };

      // Add GitHub repositories as projects if they don't exist
      const existingProjectTitles = portfolioData.projects.map((p: any) => p.title.toLowerCase());
      const newProjects = githubData.repositories
        .filter((repo: any) => !existingProjectTitles.includes(repo.name.toLowerCase()))
        .slice(0, 5) // Limit to top 5 repositories
        .map((repo: any) => ({
          id: Math.max(...portfolioData.projects.map((p: any) => p.id), 0) + 1,
          title: repo.name,
          description: repo.description || `A ${repo.primaryLanguage} project`,
          techStack: [repo.primaryLanguage, ...Object.keys(repo.languages).slice(0, 3)],
          features: [
            `${repo.stargazers_count} stars`,
            `${repo.forks_count} forks`,
            repo.homepage ? 'Live demo available' : 'Repository only'
          ],
          links: {
            github: repo.html_url,
            ...(repo.homepage && { demo: repo.homepage })
          },
          status: 'Published',
          impact: `Used by ${repo.stargazers_count} developers`
        }));

      // Update portfolio data
      const updatedPortfolio = {
        ...portfolioData,
        student: updatedStudent,
        projects: [...portfolioData.projects, ...newProjects]
      };

      // Save updated portfolio
      const saveResponse = await fetch(`${request.nextUrl.origin}/api/portfolio`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'student', id: 'github', data: updatedStudent })
      });

      return NextResponse.json({
        success: true,
        githubData,
        portfolioUpdated: saveResponse.ok,
        newProjectsAdded: newProjects.length
      });
    }

    return NextResponse.json({
      success: true,
      githubData
    });

  } catch (error) {
    console.error('GitHub sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync GitHub data' },
      { status: 500 }
    );
  }
}
