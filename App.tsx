
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Navigation, 
  Map as MapIcon, 
  Settings, 
  Radio as RadioIcon, 
  ShieldAlert, 
  Car, 
  Thermometer, 
  CloudRain,
  Activity,
  Mic,
  AlertTriangle,
  ChevronRight,
  Wind
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Dashboard from './components/Dashboard';
import LiveMap from './components/LiveMap';
import VehicleModule from './components/VehicleModule';
import RadioInterface from './components/RadioInterface';
import { TrafficIncident, RoadType, IncidentType, VehicleStatus } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'map' | 'vehicle' | 'radio'>('dashboard');
  const [incidents, setIncidents] = useState<TrafficIncident[]>([]);
  const [vehicleStatus, setVehicleStatus] = useState<VehicleStatus>({
    suspension: 'Comfort',
    speed: 0,
    fuelLevel: 85,
    tirePressure: '2.4 bar',
    nextService: '5000 km'
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulation der Echtzeit-Datenaktualisierung
  const fetchTrafficData = useCallback(async () => {
    // In einer echten App würde hier ein API-Aufruf zu ADAC/Google Maps/TomTom erfolgen
    const mockData: TrafficIncident[] = [
      {
        id: '1',
        roadName: 'A8',
        type: RoadType.Autobahn,
        incident: IncidentType.Stau,
        description: 'Überlastung zwischen Stuttgart-Degerloch und Esslingen',
        delayMinutes: 25,
        severity: 'high',
        location: { lat: 48.71, lng: 9.17 }
      },
      {
        id: '2',
        roadName: 'B10',
        type: RoadType.Bundesstrasse,
        incident: IncidentType.Unfall,
        description: 'Sperrung der rechten Fahrbahn',
        delayMinutes: 10,
        severity: 'medium',
        location: { lat: 48.78, lng: 9.22 }
      },
      {
        id: '3',
        roadName: 'L1205',
        type: RoadType.Landesstrasse,
        incident: IncidentType.Baustelle,
        description: 'Einspurige Verkehrsführung',
        delayMinutes: 5,
        severity: 'low',
        location: { lat: 48.65, lng: 9.25 }
      }
    ];
    
    setIncidents(mockData);
    setLastUpdate(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchTrafficData();
    const interval = setInterval(fetchTrafficData, 30000); // Alle 30s Updates
    return () => clearInterval(interval);
  }, [fetchTrafficData]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard incidents={incidents} vehicleStatus={vehicleStatus} />;
      case 'map':
        return <LiveMap incidents={incidents} />;
      case 'vehicle':
        return <VehicleModule status={vehicleStatus} setStatus={setVehicleStatus} />;
      case 'radio':
        return <RadioInterface incidents={incidents} />;
      default:
        return <Dashboard incidents={incidents} vehicleStatus={vehicleStatus} />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#050505] text-gray-100 overflow-hidden">
      {/* Sidebar Navigation */}
      <nav className="w-20 md:w-24 bg-[#0a0a0a] border-r border-white/10 flex flex-col items-center py-8 space-y-8 z-50">
        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/20 mb-4">
          <Navigation className="w-8 h-8 text-white" />
        </div>
        
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`p-4 rounded-2xl transition-all duration-300 ${activeTab === 'dashboard' ? 'bg-white/10 text-blue-400' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
        >
          <Activity className="w-7 h-7" />
        </button>
        
        <button 
          onClick={() => setActiveTab('map')}
          className={`p-4 rounded-2xl transition-all duration-300 ${activeTab === 'map' ? 'bg-white/10 text-blue-400' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
        >
          <MapIcon className="w-7 h-7" />
        </button>
        
        <button 
          onClick={() => setActiveTab('vehicle')}
          className={`p-4 rounded-2xl transition-all duration-300 ${activeTab === 'vehicle' ? 'bg-white/10 text-blue-400' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
        >
          <Car className="w-7 h-7" />
        </button>

        <button 
          onClick={() => setActiveTab('radio')}
          className={`p-4 rounded-2xl transition-all duration-300 ${activeTab === 'radio' ? 'bg-white/10 text-blue-400' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
        >
          <RadioIcon className="w-7 h-7" />
        </button>

        <div className="mt-auto flex flex-col items-center space-y-6">
           <button className="p-4 text-red-500 animate-pulse transition-all">
            <ShieldAlert className="w-7 h-7" />
          </button>
          <button className="p-4 text-gray-500 hover:text-white">
            <Settings className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
        {/* Header Bar */}
        <header className="sticky top-0 h-20 glass-panel z-40 px-8 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold tracking-tight">AUTOPILOT <span className="text-blue-500 font-black">DE</span></h1>
            <div className="h-4 w-[1px] bg-white/20"></div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>System Online: {lastUpdate.toLocaleTimeString()}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4 bg-white/5 px-4 py-2 rounded-xl">
              <div className="flex items-center space-x-2 border-r border-white/10 pr-4">
                <Thermometer className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium">12°C</span>
              </div>
              <div className="flex items-center space-x-2">
                <CloudRain className="w-4 h-4 text-blue-300" />
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Wind className="w-4 h-4 text-gray-300" />
                <span className="text-sm font-medium">12km/h</span>
              </div>
            </div>
            
            <div className="relative group">
              <button className="flex items-center space-x-3 bg-white/10 p-2 pr-4 rounded-full border border-white/10 hover:bg-white/20 transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold">JD</div>
                <span className="text-sm font-medium hidden md:block">Johannes D.</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-8">
          {renderContent()}
        </div>
      </main>

      {/* AI Voice Assistant Widget */}
      <div className="fixed bottom-8 right-8 z-50">
        <AIAssistant incidents={incidents} />
      </div>
    </div>
  );
};

// Sub-Component for AI Voice Assistant
const AIAssistant: React.FC<{ incidents: TrafficIncident[] }> = ({ incidents }) => {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleVoiceCommand = async () => {
    setIsListening(true);
    // Simulation: KI analysiert die aktuelle Verkehrslage
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const prompt = `Du bist ein deutscher Fahrassistent. Analysiere diese Verkehrslage und gib eine kurze, prägnante Sprachwarnung (max 2 Sätze): ${JSON.stringify(incidents)}. Sage mir, ob ich meine Route ändern sollte.`;
      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setResponse(result.text || "Verbindung fehlgeschlagen");
      setTimeout(() => setResponse(null), 8000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsListening(false);
    }
  };

  return (
    <div className="flex flex-col items-end space-y-4">
      {response && (
        <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-2xl max-w-xs animate-in slide-in-from-right fade-in duration-500 border border-blue-400">
          <p className="text-sm font-medium leading-relaxed italic">"{response}"</p>
        </div>
      )}
      <button 
        onClick={handleVoiceCommand}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${isListening ? 'bg-red-500 animate-pulse ring-4 ring-red-500/20' : 'bg-blue-600 hover:bg-blue-500 ring-4 ring-blue-600/20'}`}
      >
        <Mic className={`w-8 h-8 text-white ${isListening ? 'animate-bounce' : ''}`} />
      </button>
    </div>
  );
};

export default App;
