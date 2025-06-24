import React from 'react';
import TextBlock from '../../UI/TextBlock';

const BukayoSakaArtArticle = () => {
  return (
    <div className="space-y-6">
      <TextBlock color="blue">
        <p>
          This project showcases a collection of my graphic design work, spanning various styles and mediums. From sports-inspired artwork to product mockups and branding concepts, each piece represents a different creative direction and technical challenge.
        </p>
        <p>
          My approach to graphic design combines digital artistry with strategic thinking, often drawing inspiration from sports, technology, and contemporary culture. Here are some highlights from my portfolio:
        </p>
      </TextBlock>

      <TextBlock title="Bukayo Saka Wall Art" color="purple">
        <p>
          A minimalist black and white piece featuring Arsenal star Bukayo Saka in two contrasting poses - a formal portrait with a signature pose and a celebratory moment from a match. The composition is enhanced with his signature, the Nigerian flag, and the Arsenal crest, creating a powerful visual narrative that celebrates both his heritage and his club identity.
        </p>
        <div className="flex justify-center my-4">
          <img
            src="/images/Projects/graphics-portfolio/bskaks.webp"
            alt="Bukayo Saka Wall Art Design"
            className="w-[600px] h-[340px] object-cover rounded-lg border border-gray-200"
          />
        </div>
      </TextBlock>

      <TextBlock title="Arsenal 23/24 Season Graphics" color="red">
        <p>
          A series of graphics celebrating Arsenal's 2023/24 season, featuring dynamic compositions that capture the energy and passion of football. These pieces blend modern design principles with traditional sports aesthetics.
        </p>
        <div className="flex justify-center my-4">
          <img
            src="/images/Projects/graphics-portfolio/arsenal2324.webp"
            alt="Arsenal 23/24 Season Graphics"
            className="w-[600px] h-[340px] object-cover rounded-lg border border-gray-200"
          />
        </div>
      </TextBlock>

      <TextBlock title="iPhone 8 Deconstruction" color="gray">
        <p>
          A technical illustration that breaks down the iPhone 8 into its component parts. This piece demonstrates my ability to create detailed technical graphics while maintaining visual appeal and clarity.
        </p>
        <div className="flex justify-center my-4">
          <img
            src="/images/Projects/graphics-portfolio/Iphone8deconstructed.webp"
            alt="iPhone 8 Deconstruction Technical Illustration"
            className="w-[600px] h-[340px] object-cover rounded-lg border border-gray-200"
          />
        </div>
      </TextBlock>

      <TextBlock title="ISO Hoodie Design" color="green">
        <p>
          A streetwear-inspired hoodie design featuring the ISO logo. This piece showcases my skills in apparel design and branding, creating a clean, modern aesthetic that would appeal to a tech-savvy audience.
        </p>
        <div className="flex justify-center my-4">
          <img
            src="/images/Projects/graphics-portfolio/isohoodie.webp"
            alt="ISO Hoodie Design"
            className="w-[600px] h-[340px] object-cover rounded-lg border border-gray-200"
          />
        </div>
      </TextBlock>

      <TextBlock title="Leetbuds Product Mockup" color="blue">
        <p>
          A product mockup for "Leetbuds" - a fictional tech product that demonstrates my ability to create realistic product visualizations. This piece combines 3D rendering techniques with graphic design to create compelling product presentations.
        </p>
        <div className="flex justify-center my-4">
          <img
            src="/images/Projects/graphics-portfolio/Leetbuds.webp"
            alt="Leetbuds Product Mockup"
            className="w-[600px] h-[340px] object-cover rounded-lg border border-gray-200"
          />
        </div>
      </TextBlock>
    </div>
  );
};

export default BukayoSakaArtArticle; 