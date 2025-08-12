export const projects = [
    {
        title: "Three.js Portfolio Frontend",
        order: 1,
        startDate: "2024-10-01",
        endDate: "2025-06-01",
        images: [
            "/images/Projects/threejs-frontend/city-model.webp",
            "/images/Projects/threejs-frontend/glass-ui.webp",
            "/images/Projects/threejs-frontend/backend-integration.webp",
            "/images/Projects/threejs-frontend/timeline.webp"
        ],
        imageScrollPositions: [0.01, 0.2, 0.35, 0.93],
        thumbnail: "/images/Projects/threejs-frontend/threejs-front-thumbnail.jpg",
        description: "Immersive 3D portfolio with animations and a glassmorphic interface",
        category: "development",
        technologies: ["Three.js", "React", 'TailwindCSS'],
        story: `This project represents a significant milestone in my web development journey. 
                I wanted to create something that would not only showcase my work but also 
                demonstrate my ability to work with modern web technologies and 3D graphics. 
                The site features interactive 3D elements that respond to user interaction, 
                creating an engaging and memorable experience.`,
        github: "https://github.com/Tarblux/three.js-personal-website",
        link: "https://tariqwill.com",
        articleComponent: "ThreeJsWebsiteArticle"
    },
    {
        title: "Three.js Portfolio Backend",
        order: 2,
        startDate: "2025-05-01",
        endDate: "2025-06-01",
        images: [
            "/images/Projects/threejs-back/fullsystem.webp",
            "/images/Projects/threejs-back/client request.webp",
            "/images/Projects/threejs-back/mid-panel.webp",
            "/images/Projects/threejs-back/rh-panel.webp",
            "/images/Projects/threejs-back/servicelayer.webp",
            "/images/Projects/threejs-back/datalayer.webp",
            "/images/Projects/threejs-back/dockerp.webp",
        ],
        imageScrollPositions: [0.01, 0.45, 0.55, 0.6, 0.7, 0.8, 0.9],
        thumbnail: "/images/Projects/threejs-back/threejs-back-thumbnail.jpg",
        description: "Backend service delivering live GitHub, chess, and soccer data to the portfolio",
        category: "development",
        technologies: ["Node.js", "Express", "PostgreSQL"],
        story: `Backend for my three.js portfolio website.`,
        github: "https://github.com/Tarblux/threejs-portfolio-backend",
        articleComponent: "ThreeJsBackendArticle"
    },
    {
        title: "Personal Website (Old)",
        order: 3,
        startDate: "2023-01-02",
        endDate: "2023-05-07",
        images: [
            "/images/Projects/oldpersonal/oldPersonal-panel.webp",
        ],
        imageScrollPositions: [0.01],
        thumbnail: "/images/Projects/oldpersonal/oldPersonal-thumbnail.jpg",
        description: "My original personal website, built with basic html, css, and javascript.",
        category: "development",
        technologies: ["HTML", "CSS", "JavaScript"],
        story: `My original personal website, built with basic html, css, and javascript.`,
        github: "https://github.com/Tarblux/Personal-Website",
        link: "https://tarblux.github.io/Personal-Website/",
        articleComponent: "PersonalWebsiteOldArticle"
    },
    {
        title: "EPL Transfer Market Analysis",
        order: 4,
        startDate: "2022-01-01",
        endDate: "2022-12-31",
        images: [
            "/images/Projects/epl-transfer-analysis/epl-panel.webp",
        ],
        imageScrollPositions: [0.01],
        thumbnail: "/images/Projects/epl-transfer-analysis/epl-thumbnail.jpg",
        description: "Econometric analysis of how Premier League transfer spending affects team performance",
        category: "research",
        technologies: ["Econometrics", "Stata",],
        story: `Conducted comprehensive econometric research analyzing the relationship 
                between English Premier League teams' transfer market activity and their 
                on-field performance. This Senior Individualized Project (SIP) combined 
                economic theory with statistical analysis to understand the impact of 
                transfer spending on team success.`,
        link: "https://docs.google.com/document/d/1SLtyemHjBCRqvyH8uQpPAc-aWXNgBApf/edit?usp=sharing&ouid=110867662222495258528&rtpof=true&sd=true",
        articleComponent: "EplTransferAnalysisArticle"
    },
    {
        title: "Chess Data API",
        order: 5,
        startDate: "2025-04-01",
        endDate: null,
        images: [
            "/images/Projects/chess-data-api/chessapi-panel.webp",
        ],
        imageScrollPositions: [0.01],
        thumbnail: "/images/Projects/chess-data-api/chessapi-thumbnail.jpg",
        description: "A proxy for the Chess.com API that serves customized live chess data for my projects",
        category: "development",
        technologies: ["Next.js", "Typescript", "Vercel"],
        story: `API for chess data.`,
        github: "https://github.com/Tarblux/chess-data-api",
        // link: "https://chess-data-api.vercel.app/",
        articleComponent: "ChessDataApiArticle"
    },
    {
        title: "Creole Linguistics Study",
        order: 6,
        startDate: "2022-12-01",
        endDate: "2023-02-01",
        images: [
            "/images/Projects/creole-linguistics/creole-panel.webp",
        ],
        imageScrollPositions: [0.01],
        thumbnail: "/images/Projects/creole-linguistics/creole-thumbnail.jpg",
        description: "Linguistic research of English Creole phonemics and its convergence with standard English",
        category: "research",
        technologies: ["R", "Python", "LaTeX"],
        story: `This research project involved analyzing linguistic patterns in Jamaican Creole, 
                combining traditional linguistic research methods with modern data analysis 
                techniques. The study provided valuable insights into language evolution and 
                cultural preservation.`,
        github: "https://github.com/Tarblux/Creole-Linguistics-Data-Analytics",
        link: "https://drive.google.com/file/d/1VvQIX4hwmuGBb1aWmFO2kVmFVUvFWfvl/view",
        articleComponent: "CreoleLinguisticsArticle"
    },
    {
        title: "Coding Practice",
        order: 7,
        startDate: "2023-08-01",
        endDate: null,
        images: [
            "/images/Projects/codingPractice/codingPractice-panel.webp",
        ],
        imageScrollPositions: [0.01],
        thumbnail: "/images/Projects/codingPractice/codingPractice-thumbnail.jpg",
        description: "A collection of my coding problems, algorithms, and programming language studies in Jupyter Notebooks.",
        category: "development",
        technologies: ["Algorithms", "Data Structures", ],
        story: `A collection of coding practice problems.`,
        github: "https://github.com/Tarblux/Coding-Practice",
        articleComponent: "CodingPracticeArticle"
    },
    {
        title: "Sustainability at Kalamazoo College",
        order: 8,
        startDate: "2023-09-01",
        endDate: "2023-12-01",
        images: [
            "/images/Projects/sustainability-documentary/sustainability-panel.webp",
        ],  
        imageScrollPositions: [0.01],
        thumbnail: "/images/Projects/sustainability-documentary/sustainability-thumbnail.webp",
        description: "Documentary of sustainability initiatives and practices at K College",
        category: "media",
        technologies: ["Video Editing", "Cinematography", ],
        story: `In my senior year, after wrapping up all my required courses, I decided to branch out and try something new 
                and so I enrolled in an Intro to Documentary class. Our final project was to create a short documentary, 
                and as a member of the campus Eco Club, I saw the perfect opportunity.`,
        link: "https://youtu.be/_HPbgnWnV9c",
        articleComponent: "SustainabilityDocumentaryArticle"
    },
    {
        title: "iPhone Deconstruction Art",
        order: 9,
        startDate: "2023-07-06",
        endDate: "2023-07-06",
        images: [
            "/images/Projects/iphone-deconstruction/iphone8-mock.webp",
        ],
        imageScrollPositions: [0.01],
        thumbnail: "/images/Projects/iphone-deconstruction/iphones-thumbnail.webp",
        description: "A detailed deconstruction of the iPhone 6+ and (RED) editions transformed into wall art pieces",
        category: "media",
        technologies: ["Technical Drawing", "Hardware", "Digital Art"],
        story: `Created a detailed technical documentation of the iPhone 6 Plus, breaking 
                down its key components and specifications. This visual guide showcases 
                the device's internal architecture, from its A8 chip to its camera systems, 
                providing insights into Apple's revolutionary smartphone design.`,
        articleComponent: "IPhoneDeconstructionArticle"
    },
    // {
    //     title: "Graphic Design Portfolio",
    //     order: 10,
    //     startDate: "2023-07-19",
    //     endDate: "2023-07-19",
    //     thumbnail: "/images/Projects/graphics-portfolio/graphics-thumbnail.jpg",
    //     description: "A collection of my graphic design work, including posters, logos, and other designs.",
    //     category: "media",
    //     technologies: ["Photoshop", "Digital Art", "Typography"],
    //     story: `This artistic piece combines portrait photography and sports imagery in a 
    //             minimalist black and white style. The design features Arsenal star Bukayo Saka 
    //             in two contrasting poses - a formal portrait with a signature pose and a 
    //             celebratory moment from a match. The composition is enhanced with his signature, 
    //             the Nigerian flag, and the Arsenal crest, creating a powerful visual narrative 
    //             that celebrates both his heritage and his club identity.`,
    //     articleComponent: "BukayoSakaArtArticle"
    // },
    {
        title: 'Blender Models',
        order: 11,
        startDate: "2025-01-02",
        endDate: null,
        images: [
            "/images/Projects/threejs-frontend/city-model.webp",
            "/images/Projects/blender-models/berger.webp",
            "/images/Projects/blender-models/random-polygon.webp",
        ],
        imageScrollPositions: [0.01, 0.5, 0.9],
        thumbnail: '/images/Projects/blender-models/blender-thumbnail.jpg',
        description: 'A collection of my Blender models and 3D assets I have created.',
        category: 'media',
        technologies: ['Blender', '3D Printing'],
        story: `This project is a collection of my Blender models. I've been using Blender for a while now and I've learned a lot about the software. I've also been using 3D printing to print out my models. I've learned a lot about the software and the hardware.`,
        github: "https://github.com/Tarblux/blender-blems",
        articleComponent: "BlenderModelsArticle"
    }
]; 