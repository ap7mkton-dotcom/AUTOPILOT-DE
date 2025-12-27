
import React, { useState } from 'react';
import { TrafficIncident } from '../types';
import { Play, Pause, SkipForward, SkipBack, Radio, Volume2, Mic2 } from 'lucide-react';

interface RadioInterfaceProps {
  incidents: TrafficIncident[];
}

const RadioInterface: React.FC<RadioInterfaceProps> = ({ incidents }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStation, setCurrentStation] = useState('Antenne Bayern');

  const stations = [
    'Antenne Bayern',
    'SWR3',
    'Bayern 3',
    'WDR 2',
    'Deutschlandfunk'
  ];

  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col justify-center py-12">
      <div className="relative bg-gradient-to-br from-indigo-900/40 to-black p-12 rounded-[50px] border border-white/10 shadow-[0_0_100px_rgba(30,58,138,0.2)]">
        
        {/* Visualization */}
        <div className="flex justify-center items-center gap-1 mb-12 h-20">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1 bg-blue-500/60 rounded-full transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
              style={{ height: isPlaying ? `${Math.random() * 100}%` : '10%' }}
            ></div>
          ))}
        </div>

        <div className="text-center mb-12">
          <p className="text-blue-400 font-bold tracking-[0.3em] uppercase mb-4">Live Radio & Traffic</p>
          <h2 className="text-6xl font-black text-white mb-2">{currentStation}</h2>
          <p className="text-gray-400 font-medium">103.2 MHz — Aktuelle Verkehrsnachrichten</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-12 mb-16">
          <button className="text-gray-500 hover:text-white transition-colors"><SkipBack size={36} /></button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause size={42} fill="currentColor" /> : <Play size={42} fill="currentColor" className="translate-x-1" />}
          </button>
          <button className="text-gray-500 hover:text-white transition-colors"><SkipForward size={36} /></button>
        </div>

        {/* Station Selector */}
        <div className="flex flex-wrap justify-center gap-4">
          {stations.map(station => (
            <button
              key={station}
              onClick={() => setCurrentStation(station)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all ${currentStation === station ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
            >
              {station}
            </button>
          ))}
        </div>

        {/* Traffic Override Panel */}
        <div className="mt-12 bg-red-600/10 border border-red-500/20 p-6 rounded-3xl flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="p-3 bg-red-600 rounded-xl animate-pulse">
               <Mic2 className="text-white w-5 h-5" />
             </div>
             <div>
               <p className="text-red-500 font-black text-xs uppercase tracking-widest">Verkehrsdienst aktiv</p>
               <p className="text-sm font-medium">Unterbricht Musik für wichtige Durchsagen</p>
             </div>
           </div>
           <Volume2 className="text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default RadioInterface;
