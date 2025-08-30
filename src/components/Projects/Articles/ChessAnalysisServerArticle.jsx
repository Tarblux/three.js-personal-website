import React from 'react';
import TextBlock from '../../UI/TextBlock';

const ChessAnalysisServerArticle = ({ project }) => {
  return (
    <div className="space-y-6">
      <TextBlock title="Summary" color="blue">
        <p className="text-gray-600 leading-relaxed mb-4">
          The goal is to build a full-featured chess analysis server that can process individual games and deliver deep insights. 
          It will identify the best moves, highlight missed opportunities, and point out key momentum shifts during a match. 
          Over time, the system will expand to include full-game aggregation, offering a broader perspective on my playing style and progress.
        </p>
      </TextBlock>
      <TextBlock title="Current Progress" color="teal">
        <p className="text-gray-600 leading-relaxed">
          Right now, I am focused on building the core analysis functionality using a Python Flask server (may change). My main goal at this stage is to figure out how to analyze a single game from start to finish. I am exploring what data I can extract, what insights are most valuable, and how that information can be structured for future use.
        </p>
        <p className="text-gray-600 leading-relaxed mt-2">
          As part of this process, I've started mapping out the general architecture for the project. The diagram below shows the main components and how I envision them interacting: a core analysis engine, data sources (like chess game databases , Graph databases and APIs), and a servicees layer for insights and visualizations. Each part is designed to be modular so new features and data sources can be added over time.
        </p>
        <img 
          src="/images/ProjectsConstruction/elombe-diagram.webp" 
          alt="Chess Analysis Server Architecture Diagram" 
          className="w-full rounded-lg shadow-md mb-4" 
        />
        <p className="text-gray-600 leading-relaxed">
          This architecture will definitely evolve and change as the project grows, but it represents the general idea of how I want the different systems to interact with each other. The goal is to keep things flexible and scalable, so I can experiment and expand the analysis capabilities as needed.
        </p>
      </TextBlock>
      <TextBlock title="Planned Features" color="purple">
        <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
          <li>Track my accuracy and performance over time</li>
          <li>Analyze openings, common mistakes, and tactical strengths</li>
          <li>Visualize trends in ratings, streaks, and time usage</li>
          <li>Curate and annotate my most memorable games</li>
          <li>Reflect on patterns in how I win, lose, and grow as a player</li>
        </ul>
      </TextBlock>
    </div>
  );
};

export default ChessAnalysisServerArticle; 