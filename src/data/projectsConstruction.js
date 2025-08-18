// Phase 1: Planning
// Phase 2: Design
// Phase 3: Development
// Phase 4: Testing
// Phase 5: Deployment

export const projectsConstruction = [
    {
        title: 'Chess Analysis Server',
        startDate: "2025-04-01",
        endDate: null,
        thumbnail: '/images/ProjectsConstruction/chessanalysis-panel.webp',
        description: 'Full-featured chess analysis server for processing games and delivering deep insights',
        category: 'Development',
        technologies: ['Python', 'Flask', 'PostgreSQL'],
        phase: 3,
        github: 'https://github.com/Tarblux/chess-analysis-server',
        story: `The goal is to build a full-featured chess analysis server that can process individual games and deliver deep insights. It will identify the best moves, highlight missed opportunities, and point out key momentum shifts during a match. Over time, the system will expand to include full-game aggregation, offering a broader perspective on my playing style and progress.`,
        articleComponent: "ChessAnalysisServerArticle"
    },
    {
        title: '2D Football Analytics',
        startDate: "2024-10-01",
        endDate: null,
        thumbnail: '/images/ProjectsConstruction/fotball-thumbnail.webp',
        description: 'Interactive 2D football match visualization with data overlays',
        category: 'Development',
        technologies: ['Computer Vision', 'OpenCV', 'React'],
        phase: 1,
        story: `About two years ago, I had the idea to visualize live football matches as 2D renders. My original "big brain" plan was to use computer vision and train a machine learning model to analyze match footage. I quickly realized that the scale of that project was far bigger than what I wanted to take on. So I pivoted. Now, the goal is to build a web app or interactive article where I can recreate key moments from football matches.`,
        articleComponent: "FootballAnalyticsArticle"
    },
    {
        title: 'Kombucha Fermentation Monitor',
        startDate: "2025-01-02",
        endDate: null,
        thumbnail: '/images/ProjectsConstruction/booch-panel.webp',
        description: 'Embedded system for monitoring temperature, pH, and fermentation variables',
        category: 'Hardware Development',
        technologies: ['STM32', 'C++', 'Embedded Systems'],
        phase: 2,
        story: `Right now, I manually record temperature and other data while brewing kombucha. But as someone curious about embedded systems, I thought this would be the perfect excuse to start learning. The goal is to build a system that tracks and monitors temperature, pH, and other variables throughout the fermentation process.`,
        articleComponent: "KombuchaMonitorArticle"
    }
]; 