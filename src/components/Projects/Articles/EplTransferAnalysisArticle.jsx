import React from 'react';
import TextBlock from '../../UI/TextBlock';
import FeatureBlock from '../../UI/FeatureBlock';

const EplTransferAnalysisArticle = () => {
  return (
    <div className="space-y-6">
      <TextBlock title="Research Recap: Unpacking the Link Between Spending and Success in the Premier League" color="gray">
        <p>
          For as long as I can remember, I've been captivated by two things: the strategic depth of economics 
          and the thrilling unpredictability of the English Premier League. My Senior Individualized Project 
          was born from the intersection of these passions. I wanted to move beyond punditry and fan speculation 
          to empirically answer a question that dominates modern football: Does a club's activity in the transfer 
          market truly translate to better performance on the pitch?
        </p>
      </TextBlock>

      <TextBlock title="My Initial Hypothesis" color="blue">
        <p>
          The conventional wisdom often suggests that teams can "buy the title." My initial hypothesis, however, 
          was skeptical. I proposed that <strong>increased transfer spending does not positively impact the 
          on-field performance of English Premier League teams</strong>. I believed factors like team cohesion 
          and management were far more critical than simply having the deepest pockets.
        </p>
      </TextBlock>

      <TextBlock title="Data and Methodology" color="purple">
        <p>
          To tackle this question, I compiled a comprehensive panel dataset spanning ten seasons of the Premier 
          League, from the 2011/12 to the 2021/22 season. My goal was to create a robust model that could 
          accurately assess the impact of financial activities on performance. The data was meticulously 
          collected from reputable sources.
        </p>
        <p>
          Here is a full breakdown of the variables and terms I used for the analysis:
        </p>
        
        <div className="overflow-x-auto my-6">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Variable</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Source</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-blue-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold" colSpan="3">Dependent Variable</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                  Total Points<sub>it</sub>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  The total points accumulated by a team in a season.
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Whoscored - League Table Data
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold" colSpan="3">Explanatory Variables</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                  Net Transfer Expenditure<sub>it</sub>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Net expenditure of a team's transfer activity, measured in euros.
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Transfermrkt - Premier League Transfers
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                  Total Transfers<sub>it</sub>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  The total transfers completed by a team.
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Transfermrkt - Premier League Transfers
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                  Total Payroll<sub>it</sub>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  The total amount of money spent on first-team player contracts, measured in euros.
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Sportrac - English Premier League Contracts
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                  DEpl<sub>it</sub>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Dummy representing if a team plays in the English Premier League.
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Whoscored - League Table Data
                </td>
              </tr>
              <tr className="bg-yellow-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold" colSpan="3">Model Terms</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                  β<sub>0</sub>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Intercept coefficient.
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  —
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                  V<sub>it</sub>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Error term.
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  —
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                  t
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Time period (year) specified.
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  —
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
                  i
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  Country observed.
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  —
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TextBlock>

      <TextBlock title="The Econometric Models" color="teal">
        <p>
          With my data compiled, I used a fixed-effect panel data regression analysis. I formulated a primary 
          model and two variations to determine the best possible fit for the data and test the influence of 
          each variable.
        </p>
        
        <div className="space-y-6 my-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">Equation 1: Full Model</h4>
            <p className="text-gray-600 mb-3">
              This was my primary model, including all independent variables to provide the most comprehensive analysis.
            </p>
            <div className="bg-white p-4 rounded border text-center font-mono text-lg">
              Y<sub>it</sub> = β<sub>0</sub> + β<sub>1</sub>(Net Transfer Expenditure)<sub>it</sub> + β<sub>2</sub>(Total Transfers)<sub>it</sub> + β<sub>3</sub>(Total Payroll)<sub>it</sub> + V<sub>it</sub>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">Equation 2: Model without Payroll</h4>
            <p className="text-gray-600 mb-3">
              A second model was considered, removing the Total Payroll variable to test its overall contribution to the model's fit.
            </p>
            <div className="bg-white p-4 rounded border text-center font-mono text-lg">
              Y<sub>it</sub> = β<sub>0</sub> + β<sub>1</sub>(Net Transfer Expenditure)<sub>it</sub> + β<sub>2</sub>(Total Transfers)<sub>it</sub> + V<sub>it</sub>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">Equation 3: Simplest Model</h4>
            <p className="text-gray-600 mb-3">
              Finally, a third model was estimated with only Net Transfer Expenditure to isolate its effect.
            </p>
            <div className="bg-white p-4 rounded border text-center font-mono text-lg">
              Y<sub>it</sub> = β<sub>0</sub> + β<sub>1</sub>(Net Transfer Expenditure)<sub>it</sub> + V<sub>it</sub>
            </div>
          </div>
        </div>
      </TextBlock>

      <TextBlock title="My Findings: What the Data Revealed" color="orange ">
        <p>
          After running the regressions and using a Hausman test to confirm the fixed-effect model was most 
          appropriate, the results were fascinating. The first model proved to be the best fit, explaining 
          approximately 48.1% of the variance in a team's total points (R-squared: 0.4811).
        </p>
        
        <p className="mt-4">
          Here are the specific results from that main regression model:
        </p>

        <div className="overflow-x-auto my-6 ">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Variable</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Coefficient</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Standard Error</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">t-statistic</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold">P-value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-green-100">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Net Transfer Expenditure</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-green-700">+0.309466</td>
                <td className="border border-gray-300 px-4 py-2 font-mono">0.072435</td>
                <td className="border border-gray-300 px-4 py-2 font-mono">1.62</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-green-700">0.005</td>
              </tr>
              <tr className="bg-red-100">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Total Transfers</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-red-700">-0.206825</td>
                <td className="border border-gray-300 px-4 py-2 font-mono">0.045691</td>
                <td className="border border-gray-300 px-4 py-2 font-mono">-0.77</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-red-700">0.014</td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Total Payroll</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-yellow-700">-0.182379</td>
                <td className="border border-gray-300 px-4 py-2 font-mono">0.063865</td>
                <td className="border border-gray-300 px-4 py-2 font-mono">-0.42</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-yellow-700">0.678</td>
              </tr>
              <tr className="bg-blue-100">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Constant</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-blue-700">44.95926</td>
                <td className="border border-gray-300 px-4 py-2 font-mono">10.78355</td>
                <td className="border border-gray-300 px-4 py-2 font-mono">3.54</td>
                <td className="border border-gray-300 px-4 py-2 font-mono text-blue-700">0.003</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">Net Spending Does Matter</h4>
            <p>
              My analysis revealed that <strong>Net Transfer Expenditure</strong> had a 
              <span className="text-green-600 font-semibold"> positive and statistically significant coefficient of +0.309</span>. 
              This means that for every €1 million increase in net spending, a team could expect to gain 
              about 0.3 points over a season, holding other factors constant. This finding directly 
              challenged my initial hypothesis and suggested that strategic spending can indeed lead to 
              improved on-field results.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">The Cost of High Turnover</h4>
            <p>
              The model showed that <strong>Total Transfers</strong> had a 
              <span className="text-red-600 font-semibold"> negative and statistically significant coefficient of -0.206</span>. 
              This supported my theory that high squad instability is detrimental. For each additional 
              transfer a club makes (whether buying or selling), its performance tends to dip. This 
              highlights the importance of team cohesion, which can be eroded by constant changes to 
              the roster.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-lg text-gray-800 mb-2">The Payroll Paradox</h4>
            <p>
              Perhaps the most counter-intuitive finding was related to <strong>Total Payroll</strong>, 
              which had a <span className="text-yellow-600 font-semibold">negative coefficient of -0.182</span>. 
              While this result was <span className="text-yellow-600 font-semibold">not statistically significant</span> 
              (with a P-value of 0.678), it hints that higher wage bills may not guarantee better performance. 
              As I speculated in my paper, this could potentially be due to factors like player complacency 
              after landing a major contract.
            </p>
          </div>
        </div>
      </TextBlock>

      <TextBlock title="Conclusion and Personal Reflection" color="indigo">
        <p>
          This research project was an incredible journey that allowed me to merge my academic interests with 
          a lifelong passion. The final conclusion was more complex than a simple "yes" or "no." While my 
          initial hypothesis that spending doesn't matter was proven wrong, the story is not just about the 
          amount of money spent.
        </p>
        <p className="mt-4">
          My analysis indicates that success in the Premier League is a delicate balancing act. Strategic, 
          net-positive investment in players can provide a competitive edge. However, this must be balanced 
          with squad stability, as high player turnover can undo the benefits of that spending. The idea 
          that a club can simply "buy a title" with a revolving door of expensive players is, according to 
          my findings, a flawed strategy.
        </p>
        <p className="mt-4">
          Looking back, I am proud of the depth of this analysis, but I also recognize its limitations. 
          Football is a beautifully complex sport, and many factors beyond the variables I studied contribute 
          to a team's success. For future work, I would be interested in exploring the impact of player age 
          and specific positions to build an even more comprehensive model of performance in the beautiful game.
        </p>
      </TextBlock>

      <TextBlock title="Related Documents" color="red">
        <a 
          href="https://docs.google.com/document/d/1SLtyemHjBCRqvyH8uQpPAc-aWXNgBApf/edit?usp=sharing&ouid=110867662222495258528&rtpof=true&sd=true"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 p-2 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 hover:border-gray-300"
        >
          <img 
            src="/icons/docx-doc.svg" 
            alt="PDF Icon" 
            className="w-6 h-6"
          />
          <span className="text-blue-400 hover:text-blue-600 font-medium">
            Research Paper: EPL Transfer Analysis
          </span>
        </a>
      </TextBlock>
    </div>
  );
};

export default EplTransferAnalysisArticle; 