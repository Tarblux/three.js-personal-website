import React from 'react';
import TextBlock from '../../UI/TextBlock';
import TechStack from '../../UI/TechStack';

const PersonalWebsiteOldArticle = () => {
  const techStackData = [
    {
      id: 1,
      name: "HTML",
      icon: "/icons/html5.svg",
      description: "HyperText Markup Language",
      howIUsedIt: "Structured the website's content and created the user-facing form fields.",
      color: '#E34F26'
    },
    {
      id: 2,
      name: "CSS",
      icon: "/icons/css.svg",
      description: "Cascading Style Sheets",
      howIUsedIt: "Styled all content and implemented a responsive design, ensuring the layout and navigation adapt seamlessly to different screen sizes.",
      color: '#8000B3'
    },
    {
      id: 3,
      name: "JavaScript",
      icon: "/icons/javascript.svg",
      description: "Programming language",
      howIUsedIt: "Handled the logic for the contact form submission and managed other interactive page elements.",
      color: '#F7DF1E'
    }
  ];

  return (
    <div className="space-y-6">
      <TextBlock title="Motivation & Goals" color="blue">
        <p>
          During my senior year, while searching for a job, I struggled to get callbacks from my applications. 
          I tried fitting everything onto the classic one-page résumé, but it quickly became clear that it 
          wasn't enough to capture the full scope of my experience and interests.
        </p>
        <p>
          That's when I decided to build a personal website, a space where I could present everything in 
          greater detail and give a more complete picture of who I am.
        </p>
      </TextBlock>

      <TechStack 
        title="Tech Stack"
        techItems={techStackData}
        showWhyChoseIt={false}
        className="my-6"
      />

      <TextBlock title="Reflection" color="teal">
        <h4 className="font-semibold text-lg text-gray-800 mb-2">Biggest Challenge</h4>
        <p className="text-gray-600 mb-4">
          As my first-ever programming project, the main challenge was understanding the boundaries of what was practical. 
          I had ambitious ideas (like animating my Bitmoji to wave at visitors) but quickly realized my ambitions and 
          my skills were not quite at the same level. This project was full of moments where I had to tame my vision to match 
          my technical ability.
        </p>
        
        <h4 className="font-semibold text-lg text-gray-800 mb-2">Biggest Lesson</h4>
        <p className="text-gray-600 mb-4">
          Completing this project gave me the confidence that I can truly build things with code. Most importantly, 
          it provided a foundational understanding of what it means to take a programming project from an initial 
          idea all the way to a finished product.
        </p>
      </TextBlock>
    </div>
  );
};

export default PersonalWebsiteOldArticle; 