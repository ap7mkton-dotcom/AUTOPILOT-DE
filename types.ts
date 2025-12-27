
export enum RoadType {
  Autobahn = 'A',
  Bundesstrasse = 'B',
  Landesstrasse = 'L'
}

export enum IncidentType {
  Stau = 'Stau',
  Unfall = 'Unfall',
  Baustelle = 'Baustelle',
  Wetter = 'Wettergefahr',
  Glatteis = 'Glatteis'
}

export interface TrafficIncident {
  id: string;
  roadName: string;
  type: RoadType;
  incident: IncidentType;
  description: string;
  delayMinutes: number;
  severity: 'low' | 'medium' | 'high';
  location: {
    lat: number;
    lng: number;
  };
}

export interface VehicleStatus {
  suspension: 'Comfort' | 'Sport' | 'Eco';
  speed: number;
  fuelLevel: number;
  tirePressure: string;
  nextService: string;
}

export interface RadioState {
  station: string;
  isPlaying: boolean;
  frequency: string;
}
