import React from 'react';
import TextBlock from '../../UI/TextBlock';

const IPhone6DeconstructionArticle = () => {
  return (
    <div className="space-y-6">
      <TextBlock title="Summary" color="blue">
        <p>
          I've always been fascinated by hardware architecture and especially when it comes to phones. 
          So, when my first iPhone finally gave up after five years of loyal service, I figured I had 
          two options: send it off to a landfill… or turn it into art.
        </p>
        <p>
          Naturally, I chose art.
        </p>
        <p>
          I took it apart (with love), framed the pieces, and gifted it to my cousin. They were confused 
          at first, but also impressed. Since then, I've dissected two iPhones and have plans to do a 
          broken Apple Watch soon.
        </p>
      </TextBlock>

      <TextBlock title="Process" color="purple">
        <div className="space-y-6">
          <div className="space-y-2">
            <p>
              <strong>Step 1: Teardown</strong><br/>
              First, I carefully take apart the iPhone. It's a delicate process that requires patience, the right tools, and a steady...ish hand
            </p>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/aaSmU4sYeeA"
                title="iPhone 8 Teardown Process"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="space-y-2">
            <p>
              <strong>Step 2: Layout Planning</strong><br/>
              Next, I draw the frame size on a blank surface and experiment with various layouts for the parts to find the most visually appealing arrangement.
            </p>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/-g7U2KQXDs4"
                title="iPhone 8 Layout Planning"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="space-y-2">
            <p>
              <strong>Step 3: Digital Design</strong><br/>
              Then, I jump into Photoshop or Canva to build labels around the layout and add little icons and details for a polished look.
            </p>
            <div className="flex justify-center">
              <img
                src="/images/Projects/iphone-deconstruction/iphone8-canvasb.webp"
                alt="iPhone 8 digital design mockup"
                className="w-[936px] h-[500px] object-cover rounded-lg border border-gray-200"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p>
              <strong>Step 4: Framing</strong><br/>
              Finally I print the canvas and use industrial-grade glue to attach all the parts to the paper and frame the finished piece.
            </p>
            <div className="flex justify-center">
              <img
                src="/images/Projects/iphone-deconstruction/iphone8-frame.webp"
                alt="iPhone 8 final framed art"
                className="w-[936px] h-[500px] object-cover rounded-lg border border-gray-200"
              />
            </div>
          </div>
        </div>
      </TextBlock>

      <TextBlock title="Results" color="green">
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">iPhone 6 Plus</h4>
            <p className="text-gray-600 text-sm">
              My first teardown. Sentimental value. Lots of screws. Way too many screws.
            </p>
            <div className="flex justify-center mt-2">
              <img
                src="/images/Projects/iphone-deconstruction/iphone6-frame.webp"
                alt="iPhone 6 Plus deconstruction canvas"
                className="w-[936px] h-[500px] object-cover rounded-lg border border-gray-200"
              />
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-2">iPhone 8 (Product RED)</h4>
            <p className="text-gray-600 text-sm">
              Sleeker, shinier, slightly scarier to open.
            </p>
            <div className="flex justify-center mt-2">
              <img
                src="/images/Projects/iphone-deconstruction/iphone8-frame.webp"
                alt="iPhone 8 final framed art"
                className="w-[936px] h-[500px] object-cover rounded-lg border border-gray-200"
              />
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
            <h4 className="font-semibold text-gray-800 mb-2">Coming Soon: One (very) dead Apple Watch</h4>
            <p className="text-gray-600 text-sm">
              Wish me luck.
            </p>
            <div className="flex mt-2">
              <img
                src="/images/Projects/iphone-deconstruction/applewatch.webp"
                alt="Apple Watch deconstruction art (coming soon)"
                className="w-48 h-48 object-cover rounded-lg border border-gray-200 "
              />
            </div>
          </div>
        </div>
      </TextBlock>
    </div>
  );
};

export default IPhone6DeconstructionArticle; 