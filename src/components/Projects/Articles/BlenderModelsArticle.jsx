import React from 'react';
import TextBlock from '../../UI/TextBlock';

const BlenderModelsArticle = () => {
  return (
    <div className="space-y-6">
      <TextBlock color="blue">
        <p>
          This project is a collection of Blender models and 3D assets I've created over time. It started as a way to apply version control to my creative work. Coming from software engineering, version control had already become a habit, so it felt natural to bring that mindset into 3D modeling too.
        </p>
        <p>
          I'm still fairly new to the space, so the collection is small for now, but it's steadily growing. Each piece reflects a different point in the learning curve. Here are a few of my early creations:
        </p>
      </TextBlock>

      <TextBlock title="Low Poly City" color="purple">
        <p>
          A stylized miniature city. This was my first big model, and I built it to serve as the centerpiece of my Three.js portfolio. You're actually standing in it right now (so feel free to consider yourself a local).
        </p>
        <div className="flex justify-center my-4">
          <img
            src="/images/Projects/threejs-frontend/city-model.webp"
            alt="Low Poly City Blender Model"
            className="w-[600px] h-[340px] object-cover rounded-lg border border-gray-200"
          />
        </div>
      </TextBlock>

      <TextBlock title="Burger" color="orange">
        <p>
          Built while following Bruno Simon's Three.js course. He walks through the steps of modeling a burger, and I ended up with this tasty low-poly classic.
        </p>
        <div className="flex justify-center my-4">
          <img
            src="/images/Projects/blender-models/berger.webp"
            alt="Low Poly Burger Blender Model"
            className="w-[600px] h-[340px] object-cover rounded-lg border border-gray-200"
          />
        </div>
      </TextBlock>

      <TextBlock title="Random Polygons" color="teal">
        <p>
          My very first render. I didn't know what I was doing yet—I just kept experimenting until it looked cool. It's also the only one that still features the default cube, so it holds a special place in my heart.
        </p>
        <div className="flex justify-center my-4">
          <img
            src="/images/Projects/blender-models/random-polygon.webp"
            alt="Random Polygon Blender Model"
            className="w-[600px] h-[340px] object-cover rounded-lg border border-gray-200"
          />
        </div>
      </TextBlock>
    </div>
  );
};

export default BlenderModelsArticle; 