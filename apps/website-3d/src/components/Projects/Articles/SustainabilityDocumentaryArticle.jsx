import React from 'react';
import TextBlock from '../../UI/TextBlock';

const SustainabilityDocumentaryArticle = () => {
  return (
    <div className="space-y-6">
      <TextBlock title="Summary" color="blue">
        <p>
          In my senior year, after wrapping up all my required courses, I decided to branch out and try something new 
          and so I enrolled in an Intro to Documentary class. Our final project was to create a short documentary, 
          and as a member of the campus Eco Club, I saw the perfect opportunity.
        </p>
        <p>
          I wanted to spotlight the work we were doing as a club and shed light on the areas that still needed improvement. 
          The project quickly became more than just a class assignment, it turned into a meaningful way to raise awareness 
          and inspire action.
        </p>
        <p>
          To my surprise (and excitement), the finished documentary was even featured by the school on their official platforms.
        </p>
      </TextBlock>


      <TextBlock title="Documentary Video" color="teal">
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/_HPbgnWnV9c"
              title="Sustainability Documentary at Kalamazoo College"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </TextBlock>
    </div>
  );
};

export default SustainabilityDocumentaryArticle; 