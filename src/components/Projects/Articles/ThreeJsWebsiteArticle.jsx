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
      howIUsedIt: "Everything 3D you see (the model, animations, lighting, sky, and textures) is powered by Three.js. Without it, you'd just be staring at some floating UI cards over a plain background.",
      whyIChoseIt: "Honestly, it chose itself. Three.js is the most stable and mature option for browser-based 3D, with a strong community that makes debugging less painful.",
      color: '#9333EA'
    },
    {
      id: 2,
      name: "React",
      icon: "/icons/React_light.svg",
      description: "A JavaScript library for building user interfaces",
      howIUsedIt: "I used React to structure the portfolio as a component-based app. It manages state and makes the UI reusable and responsive, especially when syncing with 3D elements.",
      whyIChoseIt: "I needed something that could handle lots of state changes and dynamic UI. React was the obvious choice since my vanilla JavaScript was getting out of hand fast.",
      color: '#3B82F6'
    },
    {
      id: 3,
      name: "TailwindCSS",
      icon: "/icons/tailwindcss.svg",
      description: "A utility-first CSS framework",
      howIUsedIt: "TailwindCSS sped up the styling process and kept styles scoped inside components. It helped keep things clean and consistent across the UI.",
      whyIChoseIt: "To be completely honest I picked it because it looked like cool tech and it seemed like everyone was using it , so I figured I would see what all the fuss was about.",
      color: '#3B82F6'
    },
    {
      id: 4,
      name: "Storybook",
      icon: "/icons/storybook.svg",
      description: "A UI library for building components",
      howIUsedIt: "I used Storybook to isolate and preview each UI component in a clean environment. This made development faster and much more focused.",
      whyIChoseIt: "Since the site loads 3D models and a whole animated train before even reaching the UI, I needed a way to work on components without waiting for the full experience to load.",
      color: '#FF317C'
    }
  ];

  const additionalTools = [
    {
      name: "Adobe After Effects",
      description: "I used Adobe After Effects to create motion graphics and visual effects that were later integrated into the 3D scenes. For example, the stock ticker on the stock trading office was created in After Effects.",
      color: "#9999FF"
    },
    {
      name: "Blender",
      description: "I used Blender to create and optimize 3D models and environments for the website. This included modeling, texturing, and preparing assets for web deployment with proper compression and LOD systems.",
      color: "#FF8C00"
    },
    {
      name: "Theatre.js",
      description: "I used Theatre.js for creating complex animations and cinematic sequences within the 3D environment, it allowed me to visualize and test animations before implementing them in Three.js.",
      color: "#4A90E2"
    },
    {
      name: "Canva",
      description: "I used Canva for graphic design and UI prototyping. I originally planned to use Figma, but since I'd been using Canva for years, it was the fastest way to get started. I genuinely meant to switch to Figma ..... but then I blinked and suddenly I was doing everything with it.",
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
          image="/images/Projects/threejs-frontend/city-model.webp"
          title="Interactive 3D Model"
          description={
            <>
              The 3D model was built in Blender to create a cityscape that reflects different parts of my life and portfolio. 
              Each area corresponds to a theme or experience, making navigation feel more like exploration.
              There's a stock trading office to represent my fintech career, and a chess park for one of my favorite hobbies. 
              An animated train moves through the city, serving as a lighthearted way to bring guests from the web into this digital world.
            </>
          }
        />
        
        <FeatureBlock
          image="/images/Projects/threejs-frontend/glass-ui.webp"
          title="Glassmorphic UI"
          description={
            <>
              Layered on top of the city is a glassmorphic UI built with over 100 custom React components. 
              These elements give users more context without overwhelming the experience.
              Fully modeling the interface in 3D would have made it hard to absorb the content. 
              The transparent glass effect lets users stay connected to the city while interacting with information.
            </>
          }
        />
        
        <FeatureBlock
          image="/images/Projects/threejs-frontend/backend-integration.webp"
          title="Backend Integration"
          description={
            <>
              The site connects to an Express.js server that streams live data about my chess activity, 
              favorite sports team, and GitHub activity.
              In fact, if the activity card to the right is blinking green, all systems are live. 
              If not, maybe the backend is just running on my imagination. Either way, pulling in live data 
              helped bring the city to life in a dynamic and personal way.
            </>
          }
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

      <TextBlock title="Reflection" color="teal">
        <h4 className="font-semibold text-lg text-gray-800 mb-2">Biggest Challenge</h4>
        <p className="text-gray-600 mb-4">
          The hardest part was building two worlds — a 3D experience and a 2D interface — and making them feel like one cohesive project. At times, it genuinely felt like I was working on two completely different apps that were refusing to get along.
        </p>
        <p className="text-gray-600 mb-4">
          Managing the state between the 3D scene and the React UI was especially exhausting. But somewhere in the chaos, it became a fun challenge. It forced me to rethink my initial ideas constantly and dive deep into creative problem-solving.
        </p>
        <h4 className="font-semibold text-lg text-gray-800 mb-2">Lessons Learned</h4>
        <p className="text-gray-600 mb-4">
          Yes, I picked up new frameworks, tools, and UI/UX design skills. But honestly, the biggest lesson was about project management.
        </p>
        <p className="text-gray-600 mb-4">
          Here's a confession: I thought I could finish this entire project in three months. I even taped a plan to my wall (you'll find it below — feel free to laugh). The problem? I never clearly defined what "done" actually looked like. That led me to keep adding features, expanding the scope, and slowly burying myself under an ever-growing backlog. I nearly gave up more than once.
        </p>
        <div className="mb-4">
          <img 
            src="/images/Projects/threejs-frontend/timeline.webp" 
            alt="Project timeline plan" 
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <h4 className="font-semibold text-lg text-gray-800 mb-2">What I'd do differently</h4>
        <p className="text-gray-600 mb-4">
          Next time, I'd start with a full end-to-end prototype. Something rough but complete , just to outline the vision from the start.
        </p>
        <p className="text-gray-600 mb-4">
          Instead, I kept building in isolated parts, constantly refactoring or fixing things that never made it into the final site. I even wanted to change core features midway through but was already too deep to pivot easily. That cost me time I'll never get back but hey you live and you learn.
        </p>
      </TextBlock>

      {/* <TextBlock title="Related Documents" color="red" /> */}

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
