import React from 'react';
import TextBlock from '../../UI/TextBlock';
import FeatureBlock from '../../UI/FeatureBlock';

const ThreeJsBackendArticle = () => {
  return (
    <div className="space-y-4">
      <TextBlock title="Summary" color="gray">
        <p>
          A multi-domain backend server used to power the frontend of my personal portfolio. 
          It's built with Node.js and Express and acts as a central hub for aggregating and 
          serving personal data from various sources like my live Chess.com stats, GitHub activity, and sports team standings. The main function is to provide 
          a single, reliable API endpoint for my frontend to fetch and display real-time 
          information about me.
        </p>
      </TextBlock>

      <TextBlock title="Motivation & Goals" color="blue">
        <p>
          The motivation for this project came from a desire to create a somewhat "living" 
          portfolio. A typical portfolio is static, showcasing past work with descriptions 
          and screenshots. I wanted mine to reflect who I am right now: my current hobbies, 
          ongoing coding activity, and personal interests. Instead of just saying I'm an 
          active chess player and coder, why not show it with live data?
        </p>
      </TextBlock>

      <TextBlock title="Design & Architecture" color="beige">
        <p>
          The backend is built using a classic layered architecture, which promotes a clear 
          separation of concerns. This design makes the system easier to understand, test, 
          and extend over time.
        </p>
        <p>
          The image below gives a high-level overview of the server. It might seem complex 
          at first, but it's actually pretty straightforward once we break it down (which 
          we'll do next). So don't worry too much about the details just yet. To make things 
          more intuitive, I'll walk you through it by following the response flow of the Git 
          activity card you can see in the top right corner of this card.
        </p>
        <img 
          src="/images/Projects/threejs-back/fullsystem.webp" 
          alt="System Architecture" 
          className="w-full rounded-lg shadow-md my-4" 
        />
      </TextBlock>

      <TextBlock title="The Breakdown">
        <div className="space-y-8">
          <FeatureBlock
            image="/images/Projects/threejs-back/client request.webp"
            title="1. Client Request"
            description={
              <>
                <p>
                  So you just clicked this project card, now to complete this component my 
                  frontend needs to render a git activity card with live data. Unfortunately 
                  it doesn't know what it needs to render just yet so it sends a request to 
                  my backend server via HTTPS to ask "Hey do you have the latest github 
                  activity for this project?"
                </p>
              </>
            }
          />
          <FeatureBlock
            image="/images/Projects/threejs-back/middleware.webp"
            title="2. Middleware"
            description={
               <>
                <p>
                  From there, the middleware checks that the request comes from an allowed 
                  origin using CORS. It then verifies that the client hasn't exceeded a set 
                  request limit, such as 100 requests every 15 minutes, to prevent abuse. 
                  Finally, for requests with a body (like POST or PUT), it parses the 
                  incoming JSON into a usable JavaScript object.
                </p>
              </>
            }
          />
          <FeatureBlock
            image="/images/Projects/threejs-back/routes-handlers.webp"
            title="3. Routing and Handlers"
            description={
              <>
                <p>
                  Once past the middleware, Express directs the request based on its URL path.
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Routing:</strong> A path like <span className="bg-gray-200 text-red-700 px-2 py-0.5 rounded font-mono text-xs">/git-repos</span> is matched 
                    to its corresponding route module (<span className="bg-gray-200 text-red-700 px-2 py-0.5 rounded font-mono text-xs">gitReposRoute</span>).
                  </li>
                  <li>
                    <strong>Handlers:</strong> The route module then invokes a specific 
                    handler function (e.g., <span className="bg-gray-200 text-red-700 px-2 py-0.5 rounded font-mono text-xs">gitReposHandler</span>). The handler acts 
                    as a thin controller, its sole responsibility is to call the appropriate 
                    function in the service layer. It doesn't know or care <em>how</em> that 
                    function gets the data.
                  </li>
                </ul>
              </>
            }
          />
          <FeatureBlock
            image="/images/Projects/threejs-back/servicelayer.webp"
            title="4. Service Layer"
            description={
              <>
                <p>
                  This is where the magic (business logic) happens. The service layer is 
                  responsible for orchestrating the operations needed to fulfill the request. 
                  For example, the <span className="bg-gray-200 text-red-700 px-2 py-0.5 rounded font-mono text-xs">gitReposService</span>  performs several tasks 
                  in parallel:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Fetch repository details and activity sparkline from the database.
                  </li>
                  <li>
                    Call the external GitHub API for real-time commits.
                  </li>
                  <li>
                    Combine and format this data into a structured object.
                  </li>
                </ul>
              </>
            }
          />
          <FeatureBlock
            image="/images/Projects/threejs-back/datalayer.webp"
            title="5. Data Layer"
            description={
              <>
                <p>
                  The service layer interacts with the database via the Prisma ORM 
                  (Object-Relational Mapper), which allows for writing type-safe database 
                  queries in JavaScript. The data itself is kept up-to-date through 
                  automated workflows:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Data Aggregation:</strong> Various n8n workflows run on a 
                    schedule (using cron jobs) to fetch data from external APIs like{' '}
                    <a 
                      href="http://chess.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-500 hover:underline"
                    >
                      Chess.com
                    </a>
                    , GitHub, and ESPN.
                  </li>
                  <li>
                    <strong>Caching & Reliability:</strong> This data is then stored in a 
                    PostgreSQL database. This approach acts as a cache, ensuring that the 
                    API remains fast and responsive even if an external service is slow or 
                    temporarily unavailable. The data is therefore "live-ish," typically 
                    lagging by only a few minutes to an hour.
                  </li>
                </ul>
              </>
            }
          />
          <div className="p-4 rounded-lg bg-gray-50 mt-4">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">
              6. Deployment
            </h4>
            <p>
              The entire application is containerized using Docker. This encapsulates the 
              application and its dependencies, ensuring consistent behavior across different 
              environments and simplifying deployment. If traffic were to increase, this 
              setup allows for easy scaling by deploying multiple containers behind a load 
              balancer.
            </p>
            <p className="mt-2">
              Here is a link to the excalidraw diagram if you wanted to look at it up close:{' '}
              <a 
                href="https://excalidraw.com/#json=FPHrPdujyqS9ax9nXoQQJ,7K88Gcy13QLJziXJFaJmhQ" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:underline"
              >
                Excalidraw Diagram
              </a>
            </p>
          </div>
        </div>
      </TextBlock>

      <TextBlock title="Reflection">
        <h4 className="font-semibold text-lg text-gray-800 mb-2">
          Biggest Challenge
        </h4>
        <p className="text-gray-600 mb-4">
          The most significant challenge was designing the backend <em>after</em> the 
          frontend was already built. For instance, the initial frontend design for my 
          chess dashboard included opponent country flags. However, the{' '}
          <a 
            href="http://chess.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:underline"
          >
            chess.com
          </a>{' '}
          API for game histories does not provide this information directly, forcing me 
          to make an additional, slow API call for every single game. This reactive 
          approach created sooooo many inefficiencies.
        </p>
        
        <h4 className="font-semibold text-lg text-gray-800 mb-2">
          Key Takeaway
        </h4>
        <p className="text-gray-600 mb-4">
          This project highlighted the importance of designing frontend and backend 
          systems in tandem. A successful application requires a compromise between what 
          the frontend desires and what the backend can feasibly provide. They must be 
          built to complement each other.
        </p>
        
        <h4 className="font-semibold text-lg text-gray-800 mb-2">
          What I'd do differently
        </h4>
        <p className="text-gray-600 mb-4">
          Next time, I'm definitely going to read the External API docs first. That way, I can 
          build the front end around what's actually possible, instead of just focusing on 
          making it look cool and then running into problems.
        </p>
      </TextBlock>
    </div>
  );
};

export default ThreeJsBackendArticle; 