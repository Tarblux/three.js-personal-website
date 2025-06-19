import React from 'react';


import ThreeJsWebsiteArticle from './Articles/ThreeJsWebsiteArticle';
import PersonalWebsiteOldArticle from './Articles/PersonalWebsiteOldArticle';
import ThreeJsBackendArticle from './Articles/ThreeJsBackendArticle';
import CodingPracticeArticle from './Articles/CodingPracticeArticle';
import ChessDataApiArticle from './Articles/ChessDataApiArticle';
import EplTransferAnalysisArticle from './Articles/EplTransferAnalysisArticle';
import CreoleLinguisticsArticle from './Articles/CreoleLinguisticsArticle';
import SustainabilityDocumentaryArticle from './Articles/SustainabilityDocumentaryArticle';
import IPhone6DeconstructionArticle from './Articles/IPhone6DeconstructionArticle';
import BukayoSakaArtArticle from './Articles/BukayoSakaArtArticle';
import IPhone8DeconstructionArticle from './Articles/IPhone8DeconstructionArticle';
import BlenderModelsArticle from './Articles/BlenderModelsArticle';

// Component mapping
const articleComponents = {
  ThreeJsWebsiteArticle,
  PersonalWebsiteOldArticle,
  ThreeJsBackendArticle,
  CodingPracticeArticle,
  ChessDataApiArticle,
  EplTransferAnalysisArticle,
  CreoleLinguisticsArticle,
  SustainabilityDocumentaryArticle,
  IPhone6DeconstructionArticle,
  BukayoSakaArtArticle,
  IPhone8DeconstructionArticle,
  BlenderModelsArticle
};

const ProjectArticleViewer = ({ project, onImageSelect, selectedImageIndex, imageItems }) => {
  if (!project || !project.articleComponent) {
    return (
      <div className="px-6 py-4">
        {project && <h2 className="text-xl font-bold mb-6">{project.title}</h2>}
        <p className="text-gray-600 text-sm">
          No article available for this project.
        </p>
      </div>
    );
  }

  const ArticleComponent = articleComponents[project.articleComponent];

  if (!ArticleComponent) {
    return (
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-6">{project.title}</h2>
        <p className="text-gray-600 text-sm">
          Article component "{project.articleComponent}" not found.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      {/* Project Title */}
      <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
      
      {/* Article Content */}
      <ArticleComponent 
        project={project} 
        onImageSelect={onImageSelect}
        selectedImageIndex={selectedImageIndex}
        imageItems={imageItems}
      />
    </div>
  );
};

export default ProjectArticleViewer; 