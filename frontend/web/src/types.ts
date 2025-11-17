export interface Plant {
  id: number;
  name: string;
  species: string;
  plantedDate: string;
  nextWatering: string;
}

export interface Tip {
  id: number;
  author: string;
  avatar: string;
  content: string;
}

export interface CollectionPoint {
  id: number;
  name: string;
  address: string;
  types: string[];
  neighborhood: string;
  mapLink?: string;
}

export interface Achievement {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  memberSince: string;
  avatarUrl: string;
  stats: {
    plants: number;
    tips: number;
    points: number;
    daysActive: number;
  };
  achievements: Achievement[];
}