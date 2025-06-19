import React from 'react';

const ImageArray = ({ 
  images = [], 
  className = "",
  imageClassName = "",
  rounded = "lg",
  gap = "4",
  aspectRatio = "square", // square, wide, tall, auto
  onClick = null,
  onImageSelect = null,
  selectedIndex = null,
  imageItems = []
}) => {
  if (!images.length) return null;

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full'
  };

  const gapClasses = {
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8'
  };

  const aspectRatioClasses = {
    square: 'aspect-square',
    wide: 'aspect-video',
    tall: 'aspect-[3/4]',
    auto: ''
  };

  const handleImageClick = (image, index) => {
    if (onClick) onClick(image, index);
    if (onImageSelect && imageItems) {
      // Find the corresponding index in the main imageItems array
      const mainImageIndex = imageItems.findIndex(item => item.src === (typeof image === 'string' ? image : image.src || image.url));
      if (mainImageIndex !== -1) {
        onImageSelect(mainImageIndex);
      }
    }
  };

  const handleImageHover = (image, index) => {
    if (onImageSelect && imageItems) {
      // Find the corresponding index in the main imageItems array
      const mainImageIndex = imageItems.findIndex(item => item.src === (typeof image === 'string' ? image : image.src || image.url));
      if (mainImageIndex !== -1) {
        onImageSelect(mainImageIndex);
      }
    }
  };

  return (
    <div className={`flex ${gapClasses[gap] || gapClasses[4]} overflow-x-auto ${className}`}>
      {images.map((image, index) => {
        const imageSrc = typeof image === 'string' ? image : image.src || image.url;
        const isSelected = imageItems && selectedIndex !== null && 
          imageItems[selectedIndex] && imageItems[selectedIndex].src === imageSrc;
        
        return (
          <div
            key={image.id || index}
            className={`flex-shrink-0 overflow-hidden border-2 transition-all duration-200 ${roundedClasses[rounded] || roundedClasses.lg} ${
              isSelected 
                ? 'border-blue-400 shadow-lg shadow-blue-400/50 ring-2 ring-blue-400/30' 
                : 'border-transparent hover:border-gray-300'
            } ${
              (onClick || onImageSelect) ? 'cursor-pointer hover:opacity-90 transition-all' : ''
            }`}
            onClick={() => handleImageClick(image, index)}
            onMouseEnter={() => handleImageHover(image, index)}
          >
            <img
              src={imageSrc}
              alt={typeof image === 'string' ? `Image ${index + 1}` : image.alt || image.title || `Image ${index + 1}`}
              className={`object-cover ${imageClassName || `w-full h-full ${aspectRatioClasses[aspectRatio]}`}`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageArray; 