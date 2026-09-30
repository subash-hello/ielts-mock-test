import React, { useState } from 'react';
import { MapPin, ZoomIn, X, Check, Info } from 'lucide-react';

interface PinCoord {
  letter: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  label?: string;
}

interface ListeningMapDiagramProps {
  title?: string;
  imageUrl?: string;
  options?: string[];
  selectedLetter?: string;
  onSelectLetter?: (letter: string) => void;
  answeredLetters?: Record<string, number>; // letter -> questionNumber
  testId?: string;
}

export const ListeningMapDiagram: React.FC<ListeningMapDiagramProps> = ({
  title = 'Farley House and Grounds',
  imageUrl,
  options,
  selectedLetter,
  onSelectLetter,
  answeredLetters = {},
  testId
}) => {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cleanTitle = (title || '').toLowerCase();

  // Resolve official map configuration based on imageUrl, title, or testId
  let mapImage = imageUrl;
  let pins: PinCoord[] = [];
  let displayTitle = title || 'Map / Diagram Labelling';

  if (
    mapImage?.includes('cam19') ||
    cleanTitle.includes('farley') ||
    cleanTitle.includes('cambridge 19') ||
    cleanTitle.includes('cam 19') ||
    testId?.includes('cambridge-19-test-1')
  ) {
    mapImage = mapImage || '/images/maps/cam19-test1-farley-house.jpg';
    displayTitle = 'Farley House and Grounds — Official Cambridge Map';
    pins = [
      { letter: 'A', x: 52.8, y: 16.3, label: 'Temple' },
      { letter: 'B', x: 25.7, y: 30.5, label: 'North Lake Bend' },
      { letter: 'C', x: 47.3, y: 34.7, label: 'House North Ramp' },
      { letter: 'D', x: 64.3, y: 27.6, label: 'Kitchen Gardens' },
      { letter: 'E', x: 20.7, y: 46.3, label: 'House West Entry' },
      { letter: 'F', x: 80.3, y: 54.0, label: 'East Woods Path' },
      { letter: 'G', x: 32.7, y: 66.5, label: 'Old Stables Far Corner' },
      { letter: 'H', x: 47.8, y: 79.3, label: 'Courtyard South Gate' }
    ];
  } else if (
    mapImage?.includes('cam18') ||
    cleanTitle.includes('housing') ||
    cleanTitle.includes('residential') ||
    cleanTitle.includes('nunston')
  ) {
    mapImage = mapImage || '/images/maps/cam18-test2-housing-development.jpg';
    displayTitle = 'New Housing Development Plan — Official Cambridge Map';
    pins = [
      { letter: 'A', x: 59.0, y: 23.5, label: 'North Loop' },
      { letter: 'B', x: 73.5, y: 29.5, label: 'Housing for Elderly' },
      { letter: 'C', x: 22.2, y: 46.8, label: 'West Entrance North' },
      { letter: 'D', x: 59.0, y: 39.0, label: 'South of Lake' },
      { letter: 'E', x: 92.5, y: 34.5, label: 'North-East Cul-de-sac' },
      { letter: 'F', x: 27.5, y: 57.5, label: 'Inner Curve Road' },
      { letter: 'G', x: 66.8, y: 65.2, label: 'Middle Terrace' },
      { letter: 'H', x: 24.5, y: 72.8, label: 'South-West Curve' },
      { letter: 'I', x: 92.5, y: 75.8, label: 'South-East Cul-de-sac' }
    ];
  } else if (
    mapImage?.includes('cam21') ||
    cleanTitle.includes('melby') ||
    cleanTitle.includes('coal') ||
    cleanTitle.includes('mine')
  ) {
    mapImage = mapImage || '/images/maps/cam21-test2-melby-coal-mine.png';
    displayTitle = 'Melby Coal Mine Site Plan — Official Cambridge Map';
    pins = [
      { letter: 'A', x: 14.5, y: 74.0, label: 'West Large Facility' },
      { letter: 'B', x: 12.8, y: 26.5, label: 'North-West Building' },
      { letter: 'C', x: 31.5, y: 43.5, label: 'Next to Engine House' },
      { letter: 'D', x: 45.3, y: 29.5, label: 'Top-Center L-Building' },
      { letter: 'E', x: 51.6, y: 60.5, label: 'Center L-Building' },
      { letter: 'F', x: 41.0, y: 83.5, label: 'Visitor Centre Left' },
      { letter: 'G', x: 51.8, y: 83.5, label: 'Visitor Centre Right' },
      { letter: 'H', x: 76.0, y: 35.0, label: 'North-East Facility' },
      { letter: 'I', x: 80.8, y: 59.0, label: 'Near Car Park Walkway' }
    ];
  } else {
    // Fallback letters
    const letters = options || ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    pins = letters.map((l, idx) => ({
      letter: l,
      x: 15 + (idx % 4) * 23,
      y: 20 + Math.floor(idx / 4) * 45
    }));
  }

  // List of all letters to show in the quick-selector bar
  const allLetters = options || pins.map((p) => p.letter);

  return (
    <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-xs select-none">
      {/* Official Map Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-600 shrink-0" />
          <div>
            <h4 className="font-bold text-slate-900 text-sm">{displayTitle}</h4>
            <span className="text-[11px] text-slate-500 font-medium">
              Official IELTS Examination Material
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsZoomOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded hover:bg-slate-50 hover:text-slate-900 transition shadow-2xs"
            title="Expand map in full screen"
          >
            <ZoomIn className="w-3.5 h-3.5 text-slate-600" />
            <span>Enlarge Map</span>
          </button>
        </div>
      </div>

      {/* Main Diagram Area with Official Image and Interactive Markers */}
      <div className="p-3 sm:p-5 bg-[#ffffff] flex flex-col items-center justify-center">
        <div className="relative inline-block max-w-full rounded-lg border border-slate-200 overflow-hidden bg-white shadow-2xs">
          {mapImage && !imageError ? (
            <div className="relative">
              <img
                src={mapImage}
                alt={displayTitle}
                onError={() => setImageError(true)}
                className="block w-auto max-h-[500px] object-contain mx-auto"
                style={{ minHeight: '260px' }}
              />

              {/* Interactive Hotspot Letter Markers Overlaid directly onto Official Map */}
              {pins.map((pin) => {
                const isSelected = selectedLetter === pin.letter;
                const assignedQ = answeredLetters[pin.letter];

                return (
                  <button
                    key={pin.letter}
                    type="button"
                    onClick={() => onSelectLetter && onSelectLetter(pin.letter)}
                    style={{
                      left: `${pin.x}%`,
                      top: `${pin.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    className={`absolute z-10 flex items-center justify-center rounded-full transition-all cursor-pointer group ${
                      isSelected
                        ? 'w-9 h-9 bg-red-600 text-white font-extrabold text-sm ring-4 ring-red-300 shadow-lg scale-110'
                        : assignedQ
                        ? 'w-8 h-8 bg-blue-600 text-white font-bold text-xs ring-2 ring-blue-300 shadow-md'
                        : 'w-7 h-7 bg-white/90 hover:bg-white text-slate-900 font-bold text-xs border-2 border-slate-900 shadow-xs hover:scale-115 hover:border-red-600 hover:text-red-600'
                    }`}
                    title={`Letter ${pin.letter}${assignedQ ? ` (Assigned to Q${assignedQ})` : ''}`}
                  >
                    <span>{pin.letter}</span>

                    {/* Question Badge indicator if answered */}
                    {assignedQ && (
                      <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[9px] font-extrabold px-1 py-0.2 rounded-full border border-white shadow-xs">
                        Q{assignedQ}
                      </span>
                    )}

                    {/* Tooltip on hover */}
                    <span className="opacity-0 group-hover:opacity-100 pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap transition-opacity shadow-md z-20">
                      Letter {pin.letter}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Fallback clean architectural schematic if image is missing */
            <div className="w-[600px] h-[360px] bg-slate-100 flex flex-col items-center justify-center p-6 text-center">
              <MapPin className="w-8 h-8 text-slate-400 mb-2" />
              <p className="font-bold text-slate-800 text-sm">{displayTitle}</p>
              <p className="text-xs text-slate-500 mt-1">
                Official diagram reference — use the letter selectors below
              </p>
            </div>
          )}
        </div>

        {/* Quick Letter Selector Bar */}
        <div className="w-full mt-4 pt-3 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-500" />
              Letter Options
            </span>
            <span className="text-[11px] text-slate-500">
              Click any letter to select for active question
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {allLetters.map((letter) => {
              const isSelected = selectedLetter === letter;
              const assignedQ = answeredLetters[letter];

              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => onSelectLetter && onSelectLetter(letter)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-bold transition select-none ${
                    isSelected
                      ? 'bg-red-600 border-red-700 text-white shadow-sm ring-2 ring-red-300'
                      : assignedQ
                      ? 'bg-blue-50 border-blue-300 text-blue-800 hover:bg-blue-100'
                      : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-slate-400'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full flex items-center justify-center font-mono text-xs font-extrabold bg-black/10">
                    {letter}
                  </span>
                  {assignedQ ? (
                    <span className="text-[11px] font-semibold text-blue-700 flex items-center gap-0.5">
                      <Check className="w-3 h-3" />
                      Q{assignedQ}
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400 font-normal">Unused</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen / Lightbox Modal for Enlarge View */}
      {isZoomOpen && mapImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {displayTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-auto flex items-center justify-center bg-white flex-1">
              <img
                src={mapImage}
                alt={displayTitle}
                className="max-w-full max-h-[75vh] object-contain shadow-sm border border-slate-200 rounded"
              />
            </div>

            <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-600">
              <span>Official Cambridge Examination Graphic</span>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="px-3 py-1 bg-slate-800 text-white font-semibold rounded hover:bg-slate-900 transition"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
