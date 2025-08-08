import React from 'react';
import TextBlock from '../../UI/TextBlock';

const FootballAnalyticsArticle = ({ project }) => {
  return (
    <div className="space-y-6">
      <TextBlock title="Summary" color="blue">
        <p className="text-gray-600 leading-relaxed mb-4">
          About two years ago, I had the idea to visualize live football matches as 2D renders. 
          My original "big brain" plan was to use computer vision and train a machine learning model to analyze match footage. 
          I quickly realized that the scale of that project was far bigger than what I wanted to take on.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          So I pivoted. Now, the goal is to build a web app or interactive article where I can recreate key moments from football matches. 
          These scenes will feature 2D animations with data overlays to highlight positioning, movement, and decision-making during critical plays.
        </p>
      </TextBlock>
      <TextBlock title="Current Progress" color="teal">
        <p className="text-gray-600 leading-relaxed">
          This is still a very early-stage project. At the moment, I'm focused on making architectural decisions, 
          exploring what's possible with the tools I've selected, and starting to design the user interface.
        </p>
        <p className="text-gray-600 leading-relaxed mt-2">
          I'm including it here even though it's still in its infancy because I actively think about it and research ideas during my lunch breaks everyday. 
          I've also been discussing it with one of my coworkers, who writes a sports blog, which has made the process more fun and collaborative.
        </p>
      </TextBlock>
      <TextBlock title="Related Documents" color="red">
        <a 
          href="https://docs.google.com/document/d/1EWUXeGCRgpwjbHdOTSlT9PmQ9n8DeUIu0QbsqkjPNGg/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 p-2 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 hover:border-gray-300"
        >
          <img 
            src="/icons/docx-doc.svg" 
            alt="PDF Icon" 
            className="w-6 h-6"
          />
          <span className="text-blue-400 hover:text-blue-600 font-medium">
            Football Aisight Design Document
          </span>
        </a>
      </TextBlock>
    </div>
  );
};

export default FootballAnalyticsArticle; 