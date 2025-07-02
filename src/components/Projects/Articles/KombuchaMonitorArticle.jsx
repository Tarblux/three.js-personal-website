import React from 'react';
import TextBlock from '../../UI/TextBlock';

const KombuchaMonitorArticle = ({ project }) => {
  return (
    <div className="space-y-6">
      <TextBlock title="Summary" color="blue">
        <p className="text-gray-600 leading-relaxed mb-4">
          Right now, I manually record temperature and other data while brewing kombucha. 
          But as someone curious about embedded systems, I thought this would be the perfect excuse to start learning. 
          The goal is to build a system that tracks and monitors temperature, pH, and other variables throughout the fermentation process.
        </p>
        <p className="text-gray-600 leading-relaxed mb-4">
          I've always loved how each batch of kombucha develops its own unique personality based on factors like temperature and bacterial activity. 
          While measuring everything might take away some of that mystery, I see it as a way to better understand what creates a great flavor. 
          And more importantly, it means I can actually recreate my best batches and know why they turned out so well.
        </p>
      </TextBlock>
      <TextBlock title="Current Progress" color="teal">
        <p className="text-gray-600 leading-relaxed">
          At the moment, I'm still getting familiar with the world of embedded systems. 
          I haven't started writing much code yet. Instead, I've been reviewing documentation and slowly exploring things at a relaxed pace, 
          learning passively and experimenting when I have time.
        </p>
      </TextBlock>
    </div>
  );
};

export default KombuchaMonitorArticle; 