
import React from 'react';
import { TrafficIncident, VehicleStatus, RoadType } from '../types';
import { AlertCircle, Clock, MapPin, Gauge, Fuel, Droplets } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  incidents: TrafficIncident[];
  vehicleStatus: VehicleStatus;
}

const Dashboard: React.FC<DashboardProps> = ({ incidents, vehicleStatus }) => {
  const data = incidents.map(inc => ({
    name: inc.roadName,
    delay: inc.delayMinutes,
    severity: inc.severity
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Critical Alerts Column */}
      <div className="lg:col-span-2 space-y-8">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <AlertCircle className="text-red-500" /> 
              Aktuelle Warnungen
            </h2>
            <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-gray-400">
              DEUTSCHLANDWEIT
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {incidents.map((inc) => (
              <div key={inc.id} className={`p-5 rounded-2xl border transition-all hover:scale-[1.02] ${inc.severity === 'high' ? 'bg-red-500/10 border-red-500/20' : 'bg-white/5 border-white/10'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-lg text-sm font-bold ${inc.type === RoadType.Autobahn ? 'bg-blue-600' : 'bg-yellow-600 text-black'}`}>
                    {inc.roadName}
                  </div>
                  <div className="flex items-center text-gray-400 text-sm font-medium">
                    <Clock className="w-4 h-4 mr-1 text-blue-400" />
                    +{inc.delayMinutes} min
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{inc.incident}</h3>
                <p className="text-sm text-gray-400 leading-snug">{inc.description}</p>
                <div className="mt-4 flex items-center text-xs text-blue-400 font-bold uppercase tracking-wider">
                  <MapPin className="w-3 h-3 mr-1" />
                  GPS-Daten verfügbar
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Traffic Delay Visualization */}
        <section className="bg-white/5 p-6 rounded-3xl border border-white/10">
          <h3 className="text-xl font-bold mb-6">Zeitverlust Analyse</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} label={{ value: 'Minuten', angle: -90, position: 'insideLeft', fill: '#666' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                />
                <Bar dataKey="delay" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.severity === 'high' ? '#ef4444' : '#3b82f6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Vehicle Summary Column */}
      <div className="space-y-8">
        <section className="bg-gradient-to-b from-blue-600/20 to-transparent p-6 rounded-3xl border border-blue-500/20">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <Gauge className="text-blue-400" /> Fahrzeugstatus
          </h3>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  <Fuel className="text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Reichweite</p>
                  <p className="font-bold text-lg">{vehicleStatus.fuelLevel}% / 640km</p>
                </div>
              </div>
              <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${vehicleStatus.fuelLevel}%` }}></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/5 rounded-xl">
                  <Droplets className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Reifendruck</p>
                  <p className="font-bold text-lg">{vehicleStatus.tirePressure}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-green-500 px-2 py-1 bg-green-500/10 rounded">OK</span>
            </div>

            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-xs text-gray-500 uppercase font-bold mb-2">Empfehlung</p>
              <p className="text-sm italic text-gray-300">"Aufgrund der Staus auf der A8 empfehlen wir den 'Eco'-Modus zur Treibstoffersparnis."</p>
            </div>
          </div>
        </section>

        <section className="bg-white/5 p-6 rounded-3xl border border-white/10">
          <h3 className="text-xl font-bold mb-4">Wetter-Warnungen</h3>
          <div className="flex items-center gap-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
             <div className="text-yellow-500 text-3xl font-bold">!</div>
             <div>
               <p className="font-bold">Aquaplaning Gefahr</p>
               <p className="text-xs text-gray-400">Bereich Süddeutschland (Baden-Württemberg)</p>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
