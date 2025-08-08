import React from 'react';
import TextBlock from '../../UI/TextBlock';
import FeatureBlock from '../../UI/FeatureBlock';

const CreoleLinguisticsArticle = () => {
  return (
    <div >
      <TextBlock title="Creole Linguistics: A Statistical Exploration of Jamaican Music" color="gray">
        <p>
          After completing my first major research paper, I discovered a genuine passion for the research process itself. 
          The experience of forming a hypothesis, meticulously gathering data, and using statistical models to uncover 
          hidden truths was incredibly rewarding. It ignited a desire to apply these analytical skills to other areas 
          I was passionate about. This led me directly to my next project: a statistical exploration of Creole languages, 
          specifically Jamaican Patois, within the music that has been the soundtrack to my life.
        </p>
        <p>
          This project, titled "Creole Linguistics Analysis: An In-Depth Statistical Exploration of Creole Music," 
          aimed to move beyond simple observation and empirically analyze the linguistic composition of Dancehall, 
          Reggae, and Afrobeat music. I wanted to quantify the usage of English versus Patois and other non-English 
          languages to understand the unique identity of each genre.
        </p>
      </TextBlock>

      <TextBlock title="My Methodology: How I Turned Music into Data" color="blue">
        <p>
          The first challenge was building a unique dataset from scratch. The process involved several distinct steps 
          that transformed musical lyrics into quantifiable data for statistical analysis.
        </p>
        
        <div className="">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">1. Dataset Creation</h4>
            <p className="text-gray-600">
              I began by randomly selecting songs from curated Dancehall and Reggae playlists on Spotify to ensure 
              a non-biased sample. The final dataset was a balanced collection of 100 songs, including 46 Dancehall, 
              44 Reggae, and 10 Afrobeat tracks from 54 different artists, with release dates ranging from 1976 to 2023.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">2. Lyric Extraction</h4>
            <p className="text-gray-600">
              I wrote a Python script to interface with the Genius.com API. This script allowed me to programmatically 
              scrape the lyrics for all 100 songs and organize them for analysis.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">3. Linguistic Analysis in R</h4>
            <p className="text-gray-600">
              This was the core of the project. Using RStudio, I imported the lyrics and split them into individual words. 
              To classify each word, I compared it against a comprehensive word list from the Oxford English Dictionary. 
              Words that matched were classified as "English," while non-matching words were classified as "Patois" 
              (or "Non-English" for Afrobeat tracks).
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">4. Visualization</h4>
            <p className="text-gray-600">
              Finally, I used Google Sheets and RStudio to create visualizations—like bar graphs, pie charts, and 
              word clouds—to help interpret the data and tell a compelling story.
            </p>
          </div>
        </div>
      </TextBlock>

      <TextBlock title="Key Findings from the Analysis" color="purple">
        <p>
          The analysis was broken down into three parts, each revealing fascinating insights into the linguistic 
          texture of these genres.
        </p>
      </TextBlock>

      <TextBlock title="1. Word Count Analysis: A Tale of Two Genres" color="teal">
        <p>
          The most immediate finding was the significant difference in Patois usage between Dancehall and Reggae.
        </p>
        
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Genre</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Patois Usage</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">English Usage</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Key Insight</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-green-100">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Dancehall</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-green-700">29%</td>
                <td className="border border-gray-300 px-4 py-2 font-mono">71%</td>
                <td className="border border-gray-300 px-4 py-2">
                  Higher Patois integration, closest to 50% Patois: Beenie Man's "Sim Simma" at 49.61%
                </td>
              </tr>
              <tr className="bg-blue-100">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Reggae</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-blue-700">9%</td>
                <td className="border border-gray-300 px-4 py-2 font-mono">91%</td>
                <td className="border border-gray-300 px-4 py-2">
                  Only genre with songs sung exclusively in English
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          Interestingly, while no Dancehall song in my dataset had more Patois words than English words, 
          Beenie Man's "Sim Simma" came the closest at 49.61% Patois. Furthermore, Reggae was the only 
          genre to feature songs sung exclusively in English.
        </p>
      </TextBlock>

      <TextBlock title="2. Word Frequency Analysis: Which Words Dominate?" color="orange">
        <p>
          I then looked at which individual word was used most frequently in each song. The results further 
          highlighted the deep integration of Patois in Dancehall.
        </p>
        
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Genre</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Patois as Most-Used Word</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Significance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-green-100">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Dancehall</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-green-700">45% of songs</td>
                <td className="border border-gray-300 px-4 py-2">
                  Patois words often central to song's hook or chorus
                </td>
              </tr>
              <tr className="bg-blue-100">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Reggae</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-blue-700">18% of songs</td>
                <td className="border border-gray-300 px-4 py-2">
                  Lower frequency but still present in key lyrical moments
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TextBlock>

      <TextBlock title="3. Word Cloud Analysis: Uncovering Common Ground" color="indigo">
        <p>
          The word clouds, which visually represent word frequency, produced one of my favorite discoveries. 
          Despite their differences, the analysis revealed that in both Dancehall and Reggae, the word 
          <strong>"Dem"</strong> was the most frequently used Patois word. In the Afrobeat songs, the most 
          common non-English word was <strong>"Dey,"</strong> highlighting recurring linguistic patterns 
          and shared cultural touchstones across the African diaspora.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg my-6">
          <h4 className="font-semibold text-lg text-gray-800 mb-2">Cross-Genre Linguistic Patterns</h4>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Dancehall & Reggae:</strong> "Dem" - most frequent Patois word</li>
            <li><strong>Afrobeat:</strong> "Dey" - most common non-English word</li>
            <li><strong>Cultural Connection:</strong> Shared linguistic patterns across African diaspora</li>
          </ul>
        </div>
      </TextBlock>

      <TextBlock title="Conclusion: Language, History, and Identity" color="red">
        <p>
          In conclusion, this analysis unveiled a significant linguistic disparity between Reggae and Dancehall. 
          I believe this divergence is deeply connected to the historical context in which these genres emerged.
        </p>
        <p className="mt-4">
          Reggae developed its roots during the era of British governance in Jamaica, which may have influenced 
          its preference for a higher proportion of English. In contrast, Dancehall emerged years after Jamaica 
          gained independence, a post-colonial period that may have fostered a greater incorporation of local 
          language and a stronger assertion of linguistic identity through Patois.
        </p>
        <p className="mt-4">
          Understanding these historical underpinnings enriches our appreciation for the diverse expressions 
          within Jamaican music and its evolution. This project was a fulfilling journey, and it would not 
          have been possible without the guidance and unwavering support of Dr. Tris Faulkner and the Spanish 
          department. Her belief in my abilities was instrumental, and I am truly grateful for the opportunity.
        </p>
      </TextBlock>

      <TextBlock title="Technologies and Tools Used" color="green">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">Data Collection</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• Python (API integration)</li>
              <li>• Genius.com API</li>
              <li>• Spotify playlists</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">Analysis & Visualization</h4>
            <ul className="space-y-1 text-gray-700">
              <li>• R & RStudio</li>
              <li>• Oxford English Dictionary</li>
              <li>• Google Sheets</li>
            </ul>
          </div>
        </div>
      </TextBlock>

      <TextBlock title="Related Documents" color="red">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <a 
            href="https://drive.google.com/file/d/1VvQIX4hwmuGBb1aWmFO2kVmFVUvFWfvl/view?usp=drive_link" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 hover:border-gray-300"
          >
            <img src="/icons/pdf-doc.svg" alt="PDF Icon" className="w-6 h-6" />
            <span className="text-red-400 hover:text-red-800 font-medium text-sm">
              Tariq Williams - Creole Linguistics Analysis.pdf
            </span>
          </a>
          <a 
            href="https://drive.google.com/file/d/1v4FZD-WUI4BWxLJ0Ulrkvc40A3CiZ2Xt/view?usp=drive_link" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 hover:border-gray-300"
          >
            <img src="/icons/pdf-doc.svg" alt="PDF Icon" className="w-6 h-6" />
            <span className="text-red-400 hover:text-red-800 font-medium text-sm">
              Independent Study Proposal.pdf
            </span>
          </a>
          <a 
            href="https://docs.google.com/spreadsheets/d/1WF9Pp_c59nSLRCj0LNuhYX5FeIMtdNy9/edit?usp=drive_link&ouid=110867662222495258528&rtpof=true&sd=true" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 hover:border-gray-300"
          >
            <img src="/icons/xls-doc.svg" alt="Excel Icon" className="w-6 h-6" />
            <span className="text-green-600 hover:text-green-800 font-medium text-sm">
              Main_Lyrics_Data.xlsx
            </span>
          </a>
          <a 
            href="https://docs.google.com/spreadsheets/d/1x0SsUVS9sBZ_BqTqLRsH9NIwgz6Tlg2U/edit?usp=drive_link&ouid=110867662222495258528&rtpof=true&sd=true" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 hover:border-gray-300"
          >
            <img src="/icons/xls-doc.svg" alt="Excel Icon" className="w-6 h-6" />
            <span className="text-green-600 hover:text-green-800 font-medium text-sm">
              word_freq_analysis.xlsx
            </span>
          </a>
          <a 
            href="https://docs.google.com/spreadsheets/d/1c-HU33ZT4PCeJdrYBdRzZdHpRj31d-Y1/edit?usp=drive_link&ouid=110867662222495258528&rtpof=true&sd=true" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 hover:border-gray-300"
          >
            <img src="/icons/xls-doc.svg" alt="Excel Icon" className="w-6 h-6" />
            <span className="text-green-600 hover:text-green-800 font-medium text-sm">
              word_counts.xlsx
            </span>
          </a>
        </div>
      </TextBlock>
    </div>
  );
};

export default CreoleLinguisticsArticle; 