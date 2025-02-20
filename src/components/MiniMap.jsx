import React from "react";
import silhouette from "/images/city-min.svg";

const MiniMap = () => {
    return (
      <div
        className="
          fixed
          bottom-0
          left-0
          w-full
          h-24            
          bg-gray-900   
          overflow-hidden
        "
      >
        <img
          src={silhouette}
          alt="City Silhouette"
          className="
            w-full
            h-full
            object-cover    
            object-bottom
          "
        />
      </div>
    );
  };
  
  export default MiniMap;
