
import React, { useState } from 'react';
import { TrafficIncident, RoadType } from '../types';
import { Search, Layers, Navigation2, ZoomIn, ZoomOut } from 'lucide-react';

interface LiveMapProps {
  incidents: TrafficIncident[];
}

const LiveMap: React.FC<LiveMapProps> = ({ incidents }) => {
  const [zoom, setZoom] = useState(6);

  return (
    <div className="relative h-[calc(100vh-140px)] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#111]">
      {/* Search Overlay */}
      <div className="absolute top-6 left-6 z-10 w-80">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Ziel oder Autobahn suchen..."
            className="w-full h-14 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl pl-12 pr-4 text-sm focus:ring-2 ring-blue-500 outline-none transition-all shadow-2xl"
          />
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute right-6 top-6 z-10 flex flex-col space-y-2">
        <button className="p-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl text-gray-400 hover:text-white"><Layers className="w-6 h-6" /></button>
        <button className="p-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl text-blue-500 shadow-lg shadow-blue-500/20"><Navigation2 className="w-6 h-6" /></button>
      </div>

      <div className="absolute right-6 bottom-24 z-10 flex flex-col space-y-2">
        <button onClick={() => setZoom(z => Math.min(z+1, 15))} className="p-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl text-gray-400 hover:text-white"><ZoomIn className="w-6 h-6" /></button>
        <button onClick={() => setZoom(z => Math.max(z-1, 5))} className="p-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl text-gray-400 hover:text-white"><ZoomOut className="w-6 h-6" /></button>
      </div>

      {/* Simulated Map Background */}
      <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden">
        {/* Simple visual representation of a map grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Mock Roads */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-800 rotate-[-12deg] shadow-[0_0_15px_rgba(255,255,255,0.05)]"></div>
        <div className="absolute top-0 left-1/3 w-2 h-full bg-gray-800 rotate-[5deg]"></div>
        <div className="absolute top-1/4 left-0 w-full h-1 bg-gray-900 rotate-[35deg]"></div>

        {/* Dynamic Incident Markers */}
        {incidents.map((inc, i) => (
          <div 
            key={inc.id}
            className="absolute flex flex-col items-center group cursor-pointer"
            style={{ 
              top: `${20 + i * 25}%`, 
              left: `${30 + i * 15}%`,
              transform: 'translate(-50%, -50%)' 
            }}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-black shadow-2xl transition-all group-hover:scale-125 ${inc.severity === 'high' ? 'bg-red-600' : 'bg-blue-600'}`}>
               <span className="text-white font-bold text-xs">{inc.roadName}</span>
            </div>
            <div className="mt-2 bg-black/90 backdrop-blur text-white text-[10px] px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
              {inc.incident}: {inc.delayMinutes}m
            </div>
          </div>
        ))}
      </div>

      {/* Legend Overlay */}
      <div className="absolute bottom-6 left-6 z-10 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-600"></div>
          <span className="text-xs text-gray-400 font-medium">Stark verlangsamt</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <span className="text-xs text-gray-400 font-medium">Leichter Stau</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-xs text-gray-400 font-medium">Baustelle</span>
        </div>
      </div>
    </div>
  );
};

export default LiveMap;
