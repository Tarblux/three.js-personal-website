import React from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';

const LanguageCoverageMap = ({ mapData, features, languageColors, languageList }) => {
  return (
    <div className="bg-white/90 rounded-lg shadow-lg p-2 col-span-1 row-span-2 md:col-span-2 md:row-span-2 flex flex-col transition-transform duration-300 ease-in-out hover:scale-[1.02]">
      <div className="flex items-center gap-2 mb-2 ml-2">
        <img src="/images/Languages/map-location-pin-svgrepo-com.svg" alt="Map Pin" className="w-6 h-6" />
        <h2 className="text-xl font-bold">Languages Coverage Map</h2>
      </div>
      <div className="flex-1 min-h-0 rounded-xl overflow-hidden">
        {features.length > 0 && (
          <ResponsiveChoropleth
            data={mapData}
            features={features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors={languageColors}
            domain={[0, languageList.length - 1]}
            unknownColor="#eee"
            label="properties.name"
            valueFormat={v => languageList[v]}
            projectionScale={90}
            projectionTranslation={[0.5, 0.7]}
            projectionRotation={[0, 0, 0]}
            borderWidth={0.35}
            borderColor="#152538"
            legends={[
              {
                anchor: 'bottom-left',
                direction: 'column',
                justify: false,
                translateX: 20,
                translateY: -30,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: '#000000',
                itemOpacity: 0.95,
                symbolSize: 8,
                data: languageList.map((lang, i) => ({
                  id: lang,
                  label: lang,
                  color: languageColors[i]
                }))
              }
            ]}
            theme={{
              background: 'transparent',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default LanguageCoverageMap; 