import React, { useState, useEffect, useRef } from 'react';

const KineticTitle = ({ sections, scrollProgress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  // Refs for smooth animation 
  const currentProgressRef = useRef(0);
  const currentSectionProgressRef = useRef(0);
  const rafRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  
  // Total pages from ScrollControls 
  const totalPages = 15;
  
  // Fade on idle logic - watch scroll progress changes
  useEffect(() => {
    // Set scrolling state to true when scroll progress changes
    setIsScrolling(true);
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set new timeout to detect when scrolling has stopped
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1500); // Fade out after 1.5 seconds of no scrolling
    
    // Cleanup timeout on unmount
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [scrollProgress]);
  
  useEffect(() => {
    const damping = 0.1; 
    
    const updateProgress = () => {
      // Convert scroll progress (0-1) to actual scroll position (0-totalPages)
      const targetScrollPosition = scrollProgress * totalPages;
      
      // Smooth interpolation towards target
      const diff = targetScrollPosition - currentProgressRef.current;
      
      if (Math.abs(diff) < 0.001) {
        currentProgressRef.current = targetScrollPosition;
      } else {
        currentProgressRef.current += diff * damping;
      }
      

      
      // Find which section is currently active
      let newActiveIndex = 0;
      let newSectionProgress = 0;
      let foundExactMatch = false;
      
      // First, try to find an exact match within section ranges
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const [rangeStart, rangeEnd] = section.range;
        
        // Check if current scroll position is within this section's range
        if (currentProgressRef.current >= rangeStart && currentProgressRef.current <= rangeEnd) {
          newActiveIndex = i;
          foundExactMatch = true;
          
          // Calculate progress within this specific section (0-1)
          const sectionLength = rangeEnd - rangeStart;
          const positionInSection = currentProgressRef.current - rangeStart;
          newSectionProgress = Math.min(Math.max(positionInSection / sectionLength, 0), 1);
          break;
        }
      }
      
      // If no exact match, find the closest section (handles gaps between ranges)
      if (!foundExactMatch) {
        let closestDistance = Infinity;
        let closestIndex = 0;
        
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];
          const [rangeStart, rangeEnd] = section.range;
          const sectionCenter = (rangeStart + rangeEnd) / 2;
          const distance = Math.abs(currentProgressRef.current - sectionCenter);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
          }
        }
        
        newActiveIndex = closestIndex;
        
        // For gaps, set progress based on proximity to section start/end
        const closestSection = sections[closestIndex];
        const [rangeStart, rangeEnd] = closestSection.range;
        
        if (currentProgressRef.current < rangeStart) {
          // Before section starts
          newSectionProgress = 0;
        } else if (currentProgressRef.current > rangeEnd) {
          // After section ends
          newSectionProgress = 1;
        } else {
          // Within section (shouldn't happen since we didn't find exact match, but safety)
          const sectionLength = rangeEnd - rangeStart;
          const positionInSection = currentProgressRef.current - rangeStart;
          newSectionProgress = Math.min(Math.max(positionInSection / sectionLength, 0), 1);
        }
      }
      
      setActiveIndex(newActiveIndex);
      
      // Smooth the section progress as well
      const progressDiff = newSectionProgress - currentSectionProgressRef.current;
      if (Math.abs(progressDiff) < 0.001) {
        currentSectionProgressRef.current = newSectionProgress;
      } else {
        currentSectionProgressRef.current += progressDiff * damping;
      }
      
      // Update state to trigger re-render with smoothed values
      setSectionProgress(currentSectionProgressRef.current);
      
      rafRef.current = requestAnimationFrame(updateProgress);
    };
    
    rafRef.current = requestAnimationFrame(updateProgress);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scrollProgress, sections]);

  // Simple vertical positions (no 3D)
  const getSimplePosition = (position) => {
    const positions = {
      top: {
        y: -60,
        scale: 0.7,
        opacity: 0.6,
        zIndex: 5
      },
      center: {
        y: 0,
        scale: 1.2,
        opacity: 1,
        zIndex: 10
      },
      bottom: {
        y: 60,
        scale: 0.7,
        opacity: 0.6,
        zIndex: 5
      }
    };
    
    const pos = positions[position];
    
    return {
      transform: `translate(-50%, calc(-50% + ${pos.y}px)) scale(${pos.scale})`,
      opacity: pos.opacity,
      zIndex: pos.zIndex
    };
  };

  const getPreviousSection = () => {
    const prevIndex = activeIndex - 1;
    return prevIndex >= 0 ? sections[prevIndex] : null;
  };

  const getCurrentSection = () => {
    return sections[activeIndex] || sections[0];
  };

  const getNextSection = () => {
    const nextIndex = activeIndex + 1;
    return nextIndex < sections.length ? sections[nextIndex] : null;
  };

  return (
    <div 
      className="fixed top-20 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-700 ease-out"
      style={{ 
        opacity: isScrolling ? 1 : 0
      }}
    >
      <div className="relative w-96 h-40">
        {/* Simple vertical carousel */}
        <div className="relative w-full h-full">
          
          {/* Top Position - Previous */}
          {getPreviousSection() && (
            <div
              className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out"
              style={{
                ...getSimplePosition('top'),
                transformOrigin: 'center center',
              }}
            >
              <div className="relative text-center whitespace-nowrap">
                <div className="text-white text-3xl font-medium transition-all duration-300">
                  <span className="text-3xl">{getPreviousSection().title}</span>
                </div>
              </div>
            </div>
          )}

          {/* Center Position - Active */}
          <div
            className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out"
            style={{
              ...getSimplePosition('center'),
              transformOrigin: 'center center',
            }}
          >
            <div className="relative text-center whitespace-nowrap">
              {/* Background layer - greyed out text */}
              <div className="text-gray-400 text-5xl font-bold transition-all duration-300">
                <span className="font-bold text-5xl">{getCurrentSection().title}</span>
              </div>

              {/* Foreground layer - white filled text with clip-path */}
              <div
                className="absolute inset-0 text-white text-5xl font-bold flex items-center justify-center"
                style={{
                  clipPath: (() => {
                    const bottomClip = 100 - (sectionProgress * 100);
                    return `inset(0 0 ${bottomClip}% 0)`;
                  })()
                }}
              >
                <span className="font-bold text-5xl">{getCurrentSection().title}</span>
              </div>
            </div>
          </div>

          {/* Bottom Position - Next */}
          {getNextSection() && (
            <div
              className="absolute top-1/2 left-1/2 transition-all duration-500 ease-out"
              style={{
                ...getSimplePosition('bottom'),
                transformOrigin: 'center center',
              }}
            >
              <div className="relative text-center whitespace-nowrap">
                <div className="text-white text-3xl font-medium transition-all duration-300">
                  <span className="text-3xl">{getNextSection().title}</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default KineticTitle;