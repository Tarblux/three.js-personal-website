import React from 'react';
import TextBlock from '../../UI/TextBlock';
import TechStack from '../../UI/TechStack';

const ChessDataApiArticle = () => {
  const techStackData = [
    {
      id: 1,
      name: "Next.js",
      icon: "/icons/nextjs.svg",
      description: "A React framework for building full-stack web applications",
      howIUsedIt: "I'm mainly using Next.js for its API routes. There's no real frontend — it just serves as a clean way to structure and deploy backend logic without spinning up a full server.",
      whyIChoseIt: "It works perfectly with Vercel's ecosystem. Honestly, they built it, " +
        "so the integration is smooth and hassle-free.",
      color: '#000000'
    },
    {
      id: 2,
      name: "TypeScript",
      icon: "/icons/typescript.svg",
      description: "A strongly typed programming language that builds on JavaScript",
      howIUsedIt: "I wrote the entire project in TypeScript to add type safety",
      whyIChoseIt: "After working on several JavaScript-heavy projects, I became increasingly " +
        "aware of its limitations. Switching to TypeScript felt like a natural next step " +
        "for long-term maintainability.",
      color: '#3178C6'
    },
    {
      id: 3,
      name: "Axios",
      icon: "/icons/axios.svg",
      description: "A promise-based HTTP client for making API requests",
      howIUsedIt: "I used Axios to handle outbound HTTP requests to the Chess.com API. " +
        "It made request handling and response parsing much simpler.",
      whyIChoseIt: "Familiar syntax, great error handling, and cleaner code compared " +
        "to the native fetch.",
      color: '#5A29E4'
    },
    {
      id: 4,
      name: "Vercel",
      icon: "/icons/Vercel.svg",
      description: "A cloud platform for static sites and serverless functions.",
      howIUsedIt: "I used Vercel's free hobby plan to automatically build and deploy each route as an individual serverless function.",
      whyIChoseIt: "I chose Vercel for its simple, free deployments. It allowed me to bypass the usual complexities of managing servers, SSH keys, and containers, so I could just focus on building the API and deploying it instantly.",
      color: '#000000'
    }
  ];

  return (
    <div className="space-y-6">
      <TextBlock title="The Problem" color="red">
        <p>
          For reasons still unclear, Chess.com has started blocking all requests to their API 
          originating from DigitalOcean IP addresses (
          <a 
            href="https://www.chess.com/clubs/forum/view/chess-com-api-returns-403-blocked-by-cloudflare" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            source
          </a>
          ). Unfortunately, that's where I host all my backend infrastructure.
        </p>
        <p>
          Rather than go through the hassle of migrating everything to a new provider, 
          setting up SSH keys, redeploying containers, and all that chaos, I decided to 
          get creative. The solution? A lightweight "proxy" API, deployed using serverless 
          functions on Vercel.
        </p>
      </TextBlock>

      <TextBlock title="Design and Architecture" color="blue">
        <p>
          At its core, this project is a simple wrapper around the Chess.com API. 
          It pulls data from their endpoints and repackages it to better suit the needs 
          of my Three.js backend server and my chess analytics system.
        </p>
        <p>
          Each route is built as a serverless function and automatically deployed by Vercel 
          under my hobby plan. This setup gives me a clean set of endpoints that I can 
          reuse across all my chess-related projects, without having to worry about the 
          original IP blocks.
        </p>
      </TextBlock>

      <TechStack 
        title="Tech Stack"
        techItems={techStackData}
        className="my-6"
      />

      <TextBlock title="Impact" color="green">
        <p>
          This solution has been incredibly effective. Not only did it solve the immediate 
          problem of accessing Chess.com data, but it also created a more maintainable 
          and scalable architecture for all my chess-related projects.
        </p>
        <p>
          Because each endpoint is modular and self-contained, I can easily reuse or update 
          them across different projects, whether it's for visualizations, analysis, or future tools. 
          And with everything deployed serverlessly, there's zero overhead in maintaining the infrastructure.
        </p>
      </TextBlock>
    </div>
  );
};

export default ChessDataApiArticle; 