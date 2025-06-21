import React from 'react';
import TextBlock from '../../UI/TextBlock';
import FeatureBlock from '../../UI/FeatureBlock';
import TechStack from '../../UI/TechStack';
import ImageArray from '../../UI/ImageArray';
import CollapsibleSection from '../../UI/CollapsibleSection';

const ThreeJsWebsiteArticle = ({ project, onImageSelect, selectedImageIndex, imageItems }) => {
  const techStackData = [
    {
      id: 1,
      name: "Three.js",
      icon: "/icons/Three.js_light.svg",
      description: "A JavaScript library for creating 3D graphics in the browser.",
      howIUsedIt: "I used Three.js to create interactive 3D models and scenes for my portfolio website. It allowed me to render complex 3D environments directly in the browser with smooth animations and user interactions.",
      whyIChoseIt: "Three.js is the industry standard for 3D web graphics, with excellent documentation and a large community. It provides the perfect balance between power and ease of use for creating immersive web experiences.",
      color: '#9333EA'
    },
    {
      id: 2,
      name: "React",
      icon: "/icons/React_light.svg",
      description: "A JavaScript library for building user interfaces",
      howIUsedIt: "Used React to build the component-based architecture of my portfolio, managing state and creating reusable UI components that work seamlessly with the 3D elements.",
      whyIChoseIt: "React's component-based architecture makes it perfect for building scalable applications with clean, maintainable code. The virtual DOM also helps with performance when integrating with Three.js.",
      color: '#3B82F6'
    },
    {
      id: 3,
      name: "TailwindCSS",
      icon: "/icons/Tailwind CSS_wordmark_light.svg",
      description: "A utility-first CSS framework",
      howIUsedIt: "Used TailwindCSS for rapid prototyping and consistent styling throughout the application, creating responsive layouts that complement the 3D elements.",
      whyIChoseIt: "TailwindCSS allows for rapid development with its utility-first approach while maintaining design consistency. It's perfect for creating modern, responsive web interfaces.",
      color: '#3B82F6'
    }
  ];

  const additionalTools = [
    {
      name: "Adobe After Effects",
      description: "I used Adobe After Effects to create motion graphics and visual effects that were later integrated into the 3D scenes, adding dynamic elements that enhance the overall user experience.",
      color: "#9999FF"
    },
    {
      name: "Blender",
      description: "I used Blender to create and optimize 3D models and environments for the website. This included modeling, texturing, and preparing assets for web deployment with proper compression and LOD systems.",
      color: "#FF8C00"
    },
    {
      name: "Theatre.js",
      description: "I used Theatre.js for creating complex animations and cinematic sequences within the 3D environment, allowing for precise timing and professional-quality motion design in the browser.",
      color: "#4A90E2"
    },
    {
      name: "Canva",
      description: "I used Canva for rapid prototyping of UI elements and creating consistent brand assets that were later implemented in the final design system.",
      color: "#00C4CC"
    }
  ];

  return (
    <div className="space-y-6">

      <TextBlock title="Motivation & Goals" color="blue">
        <p>
          I had been working primarily with traditional 2D interfaces, but once I saw what was possible 
          with 3D on the web, I was hooked. The main goal of this project was to create an immersive, layered 
          experience that blends a functional UI with interactive 3D elements.
        </p>
        <p>
          I wanted users to feel like they were stepping into something, not just clicking through it. 
          I had always felt like my work was missing another dimension (no pun intended) and this project 
          was my way of pushing past those flat boundaries and experimenting with space, depth, and 
          interaction in a more dynamic way.
        </p>
      </TextBlock>

      <TextBlock title="Core Features" color="purple">
        <FeatureBlock
          image="/images/Projects/project-tester.webp"
          title="Interactive 3D Model"
          description="The 3D model was made in Blender to create immersive environments that respond to user interaction, providing a unique navigation experience through different sections of the portfolio."
        />
        
        <FeatureBlock
          image="/images/Projects/project-tester.webp"
          title="Glassmorphism UI"
          description="Apple calls it liquid glass but I say they are pulling a coop but not a toop so what are they without my real deal presence. I am like a whipper and never a snapper."
        />
        
        <FeatureBlock
          image="/images/Projects/project-tester.webp"
          title="Backend Integration"
          description="To help bring it to life I decided that I must provide a steady feed of grain and petrol so hence we have a backend but we are never not here."
        />
      </TextBlock>

      <TechStack 
        title="Tech Stack"
        techItems={techStackData}
        className="my-6"
      />

      <CollapsibleSection title="Other Tools, Libraries and Tech" defaultOpen={false}>
        <div className="space-y-4">
          {additionalTools.map((tool, index) => (
            <div key={index} className="flex items-start gap-3">
        
              <div>
                <span 
                  className="font-semibold text-base"
                  style={{ color: tool.color }}
                >
                  {tool.name}
                </span>
                <span className="text-gray-600 text-sm ml-2">
                  - {tool.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <TextBlock title="Project Story" color="indigo">
        <p>{project.story}</p>
      </TextBlock>

      {/* Project Gallery */}
      {/* <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Project Gallery</h3>
        <ImageArray 
                          images={project.images || [project.thumbnail]}
          gap="2"
          rounded="lg"
          aspectRatio="square"
          onImageSelect={onImageSelect}
          selectedIndex={selectedImageIndex}
          imageItems={imageItems}
          className="mb-4"
          imageClassName="w-20 h-20"
        />
      </div> */}
    </div>
  );
};

export default ThreeJsWebsiteArticle;
