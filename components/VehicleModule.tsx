
import React from 'react';
import { VehicleStatus } from '../types';
import { Car, Zap, Wind, ShieldCheck, Settings } from 'lucide-react';

interface VehicleModuleProps {
  status: VehicleStatus;
  setStatus: React.Dispatch<React.SetStateAction<VehicleStatus>>;
}

const VehicleModule: React.FC<VehicleModuleProps> = ({ status, setStatus }) => {
  const modes = [
    { name: 'Eco', icon: Zap, color: 'text-green-500', bg: 'bg-green-500/10', desc: 'Effizientes Fahren für Langstrecken' },
    { name: 'Comfort', icon: Wind, color: 'text-blue-500', bg: 'bg-blue-500/10', desc: 'Maximale Dämpfung für Autobahnreisen' },
    { name: 'Sport', icon: Car, color: 'text-red-500', bg: 'bg-red-500/10', desc: 'Direktes Ansprechverhalten für Landstraßen' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/5 p-8 rounded-[40px] border border-white/10 overflow-hidden relative">
        {/* Background Visual */}
        <div className="absolute -right-20 top-0 opacity-10">
          <Car size={300} />
        </div>

        <div className="z-10 text-center md:text-left">
          <h2 className="text-4xl font-black mb-2 tracking-tighter">FAHRMODUS</h2>
          <p className="text-gray-400 max-w-sm mb-8">Passen Sie die Fahrcharakteristik an die aktuellen Straßenbedingungen an.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {modes.map((mode) => (
              <button
                key={mode.name}
                onClick={() => setStatus({ ...status, suspension: mode.name as any })}
                className={`p-6 rounded-3xl border transition-all flex flex-col items-center gap-3 ${status.suspension === mode.name ? `bg-white/10 border-white/20 scale-105 shadow-2xl` : 'border-transparent hover:bg-white/5 grayscale hover:grayscale-0'}`}
              >
                <div className={`p-4 rounded-2xl ${mode.bg}`}>
                  <mode.icon className={`w-8 h-8 ${mode.color}`} />
                </div>
                <span className="font-bold">{mode.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-500/20 rounded-2xl">
              <ShieldCheck className="text-blue-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Assistenzsysteme</h3>
          </div>
          
          <div className="space-y-4">
             {[
               { name: 'Spurhalteassistent', active: true },
               { name: 'Totwinkel-Warner', active: true },
               { name: 'Verkehrszeichenerkennung', active: true },
               { name: 'Notbremsassistent', active: false }
             ].map(item => (
               <div key={item.name} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                 <span className="text-gray-300 font-medium">{item.name}</span>
                 <div className={`w-12 h-6 rounded-full p-1 transition-all ${item.active ? 'bg-blue-600' : 'bg-gray-700'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-white/5 p-8 rounded-[40px] border border-white/10">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-orange-500/20 rounded-2xl">
              <Settings className="text-orange-400 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">Wartung & Info</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
              <span className="text-gray-400">Nächster Service</span>
              <span className="text-2xl font-bold">In {status.nextService}</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
              <span className="text-gray-400">Fahrgestellnummer</span>
              <span className="font-mono text-sm">WBA1234567890DE</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
              <span className="text-gray-400">Software-Version</span>
              <span className="text-blue-400 font-bold">OS 2.4.1 (Stable)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModule;
