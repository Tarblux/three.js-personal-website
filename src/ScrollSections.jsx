import Section from "./helpers/Section.jsx"
import { usePriorityLoading } from './hooks/usePriorityLoading.js'

// Utility function to calculate mobile positioning
// Mobile typically needs tighter spacing and earlier start/end points
const getMobileProps = (desktopTop, desktopFadeInStart, desktopFadeInEnd, desktopFadeOutStart, desktopFadeOutEnd, topOffset = -20, fadeOffset = -5) => ({
  mobileTop: `${parseInt(desktopTop) + topOffset}vh`,
  mobileFadeInStart: desktopFadeInStart + fadeOffset,
  mobileFadeInEnd: desktopFadeInEnd + fadeOffset,
  mobileFadeOutStart: desktopFadeOutStart + fadeOffset,
  mobileFadeOutEnd: desktopFadeOutEnd + fadeOffset
})
import WelcomeMessage from "./components/UI/WelcomeMessage.jsx"
import Introduction from "./components/Introduction/Introduction.jsx"
import Flextrade from "./components/Career/Flextrade.jsx"
import EagleMed from "./components/Career/EagleMed.jsx"
import ProjectsOverview from "./components/Projects/ProjectsOverview.jsx"
import ProjectsWarehouse from "./components/Projects/ProjectsWarehouse.jsx"
import ProjectsConstruction from "./components/Projects/ProjectsConstruction.jsx"
import Education from "./components/Education/EducationKzoo.jsx"
import CollegeJobs from "./components/Education/CollegeJobs.jsx"
import CollegeClubs from "./components/Education/CollegeClubs.jsx"
import EducationYonsei from "./components/Education/EducationYonsei.jsx"
import Languages from "./components/Languages/Languages.jsx"
import FootballWatch from "./components/Hobbies/FootballWatch.jsx"
import FootballMemories from "./components/Hobbies/FootballMemories.jsx"
import FootballPlay from "./components/Hobbies/FootballPlay.jsx"
import ChessPlay from "./components/Hobbies/ChessPlay.jsx"
import ChessDashboard from "./components/Hobbies/ChessDashboard.jsx"
import Kombucha from "./components/Hobbies/Kombucha.jsx"
import KombuchaMenu from "./components/Hobbies/KombuchaMenu.jsx"
import Contact from "./components/Contact/Contact.jsx"
import Credits from "./components/Contact/Credits.jsx"

export default function ScrollSections({ showWelcome, onSelectVideo, onWatchActiveChange, onMemoriesActiveChange }) {
  const priorityStatus = usePriorityLoading()
  
  return (
    <>
      <Section 
        top="5vh"
        fadeInStart={-10}
        fadeInEnd={0}
        fadeOutStart={5}
        fadeOutEnd={10}
        mobileTop="-5vh"
        mobileFadeInStart={-10}
        mobileFadeInEnd={0}
        mobileFadeOutStart={5}
        mobileFadeOutEnd={10}
      >
        <div className="flex justify-center items-center h-screen">
          <WelcomeMessage showMessage={showWelcome} />
        </div>
      </Section>
      
      {/* Critical React Components - Always render once critical assets start loading */}
      {priorityStatus.phases.critical.loaded > 0 && (
        <>
          <Section 
            top="40vh"
            fadeInStart={20}
            fadeInEnd={30}
            fadeOutStart={65}
            fadeOutEnd={75}
            mobileTop="29vh"
            mobileFadeInStart={15}
            mobileFadeInEnd={25}
            mobileFadeOutStart={60}
            mobileFadeOutEnd={70}
          >
            <Introduction />
          </Section>

          <Section 
            top="110vh"
            fadeInStart={100}
            fadeInEnd={110}
            fadeOutStart={125}
            fadeOutEnd={140}
            mobileTop="95vh"
            mobileFadeInStart={95}
            mobileFadeInEnd={105}
            mobileFadeOutStart={120}
            mobileFadeOutEnd={135}
          >
            <Flextrade />
          </Section>

          <Section 
            top="200vh"
            fadeInStart={190}
            fadeInEnd={195}
            fadeOutStart={220}
            fadeOutEnd={230}
            mobileTop="180vh"
            mobileFadeInStart={185}
            mobileFadeInEnd={190}
            mobileFadeOutStart={215}
            mobileFadeOutEnd={225}
          >
            <EagleMed />
          </Section>

          <Section 
            top="275vh"
            fadeInStart={270}
            fadeInEnd={280}
            fadeOutStart={310}
            fadeOutEnd={315}
            {...getMobileProps("260vh", 270, 280, 310, 315)}
          >
            <ProjectsOverview />
          </Section>
        </>
      )}

      {/* High Priority React Components */}
      {(priorityStatus.phases.critical.completed || priorityStatus.phases.high.loaded > 0) && (
        <>
          <Section 
            top="350vh"
            fadeInStart={350}
            fadeInEnd={360}
            fadeOutStart={400}
            fadeOutEnd={410}
            {...getMobileProps("330vh", 350, 360, 400, 410)}
          >
            <ProjectsWarehouse />
          </Section>

          <Section 
            top="430vh"
            fadeInStart={440}
            fadeInEnd={450}
            fadeOutStart={460}
            fadeOutEnd={470}
            {...getMobileProps("404vh", 430, 440, 460, 470)}
          >
            <ProjectsConstruction />
          </Section>

          <Section 
            top="540vh"
            fadeInStart={550}
            fadeInEnd={565}
            fadeOutStart={580}
            fadeOutEnd={590}
            {...getMobileProps("510vh", 520, 535, 550, 560)}
          >
            <Education />
          </Section>

          <Section 
            top="580vh"
            fadeInStart={590}
            fadeInEnd={605}
            fadeOutStart={625}
            fadeOutEnd={635}
            {...getMobileProps("540vh", 570, 585, 605, 615)}
          >
            <CollegeJobs />
          </Section>

          <Section 
            top="620vh"
            fadeInStart={645}
            fadeInEnd={655}
            fadeOutStart={665}
            fadeOutEnd={675}
            {...getMobileProps("580vh", 605, 615, 635, 645)}
          >
            <CollegeClubs />
          </Section>
          
          <Section 
            top="680vh"
            fadeInStart={705}
            fadeInEnd={715}
            fadeOutStart={725}
            fadeOutEnd={735}
            {...getMobileProps("635vh", 670, 685, 705, 715)}
          >
            <EducationYonsei />
          </Section>
        </>
      )}

      {/* Medium Priority React Components */}
      {(priorityStatus.phases.high.completed || priorityStatus.phases.medium.loaded > 0) && (
        <>
          <Section 
            top="745vh"
            fadeInStart={765}
            fadeInEnd={775}
            fadeOutStart={790}
            fadeOutEnd={800}
            {...getMobileProps("680vh", 730, 745, 765, 775)}
          >
            <Languages />
          </Section>

          <Section 
            top="780vh"
            fadeInStart={815}
            fadeInEnd={825}
            fadeOutStart={835}
            fadeOutEnd={845}
            {...getMobileProps("715vh", 770, 785, 805, 815)}
            onActiveChange={onWatchActiveChange}
          >
            <FootballWatch />
          </Section>

          <Section 
            top="925vh"
            fadeInStart={875}
            fadeInEnd={880}
            fadeOutStart={900}
            fadeOutEnd={910}
            {...getMobileProps("850vh", 820, 830, 840, 850)}
            onActiveChange={onMemoriesActiveChange}
          >
            <FootballMemories onSelectVideo={onSelectVideo} />
          </Section>

          <Section 
            top="910vh"
            fadeInStart={960}
            fadeInEnd={970}
            fadeOutStart={980}
            fadeOutEnd={990}
            {...getMobileProps("846vh", 915, 925, 935, 945)}
          >
            <FootballPlay />
          </Section>

          <Section 
            top="985vh"
            fadeInStart={1040}
            fadeInEnd={1050}
            fadeOutStart={1065}
            fadeOutEnd={1075}
            {...getMobileProps("909vh", 990, 1000, 1015, 1025)}
          >
            <ChessPlay />
          </Section>

          <Section 
            top="1080vh"
            fadeInStart={1085}
            fadeInEnd={1095}
            fadeOutStart={1110}
            fadeOutEnd={1120}
            {...getMobileProps("993vh", 1035, 1045, 1060, 1070)}
          >
            <ChessDashboard />
          </Section>

          <Section 
            top="1080vh"
            fadeInStart={1135}
            fadeInEnd={1145}
            fadeOutStart={1160}
            fadeOutEnd={1170}
            {...getMobileProps("995vh", 1080, 1090, 1105, 1115)}
          >
            <Kombucha />
          </Section>

          <Section 
            top="1130vh"
            fadeInStart={1190}
            fadeInEnd={1200}
            fadeOutStart={1220}
            fadeOutEnd={1230}
            {...getMobileProps("1050vh", 1130, 1140, 1155, 1165)}
          >
            <KombuchaMenu />
          </Section>
        </>
      )}

      {/* Low Priority React Components */}
      {(priorityStatus.phases.medium.completed || priorityStatus.phases.low.loaded > 0) && (
        <>
          <Section 
            top="1200vh"
            fadeInStart={1260}
            fadeInEnd={1270}
            fadeOutStart={1280}
            fadeOutEnd={1290}
            {...getMobileProps("1110vh", 1200, 1210, 1225, 1235)}
          >
            <Contact />
          </Section>

          <Section 
            top="1215vh"
            fadeInStart={1290}
            fadeInEnd={1300}
            fadeOutStart={1310}
            fadeOutEnd={1320}
            {...getMobileProps("1115vh", 1200, 1210, 1225, 1235)}
          >
            <Credits />
          </Section>
        </>
      )}
    </>
  )
} 