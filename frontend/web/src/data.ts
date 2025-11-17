import React from 'react';
import { Plant, Tip, CollectionPoint, UserProfile, Achievement } from './types';
import { LeafIcon, PlantIcon, RecycleIcon, UserIcon } from './components/icons';

export const mockPlants: Plant[] = [
  { id: 1, name: 'Manjericão', species: 'Ocimum basilicum', plantedDate: '14/01/2024', nextWatering: '18/01/2024' },
  { id: 2, name: 'Alecrim', species: 'Rosmarinus officinalis', plantedDate: '08/01/2024', nextWatering: '21/01/2024' },
];

export const mockTips: Tip[] = [
  { id: 1, author: 'Carlos', avatar: `https://picsum.photos/seed/carlos/40/40`, content: 'Regue as plantas pela manhã para evitar fungos e permitir melhor absorção da água.' },
  { id: 2, author: 'Ana', avatar: `https://picsum.photos/seed/ana/40/40`, content: 'Use cascas de ovos trituradas como fertilizante natural. É rico em cálcio!' },
];

export const mockCollectionPoints: CollectionPoint[] = [
  {
    id: 1,
    name: "Ecoponto Messejana",
    address: "R. John Lennon, 442 - Messejana",
    types: ['Plástico', 'Papel', 'Vidro', 'Eletrônicos'],
    neighborhood: "Messejana",
    mapLink: "https://www.google.com/maps/place/Ecoponto+Messejana/data=!4m7!3m6!1s0x7c74ff3da70d705:0x973bc2042c9cc379!8m2!3d-3.8213227!4d-38.4923125!16s%2Fg%2F11dxrzbsvd!19sChIJBddw2vNPxwcRecOcLATCO5c?authuser=0&hl=pt-BR&rclk=1"
  },
  {
    id: 2,
    name: "Ecoponto Jardim Glória",
    address: "Rua Glicínia, 321 - Jangurussu",
    types: ['Eletrônicos', 'Óleo', 'Pilhas', 'Papel'],
    neighborhood: "Jangurussu",
    mapLink: "https://www.google.com/maps/place/Ecoponto+Jardim+Gl%C3%B3ria/data=!4m7!3m6!1s0x7c74f35d9c42051:0xf05cd684795f92a0!8m2!3d-3.8176895!4d-38.5057539!16s%2Fg%2F11j4s6jp2j!19sChIJUSDE2TVPxwcRoJJfeYTWXPA?authuser=0&hl=pt-BR&rclk=1"
  },
  {
    id: 3,
    name: "Ecoponto Jardim União",
    address: "Rua Particular, S/N - Passaré",
    types: ['Plástico', 'Papel', 'Vidro'],
    neighborhood: "Passaré",
    mapLink: "https://www.google.com/maps/place/Ecoponto+jardim+uni%C3%A3o/data=!4m7!3m6!1s0x7c74f374937ec45:0x4d3d7788208a49c9!8m2!3d-3.8142416!4d-38.534961!16s%2Fg%2F11h_b3f25x!19sChIJRew3STdPxwcRyUmKIIh3PU0?authuser=0&hl=pt-BR&rclk=1"
  },
  {
    id: 4,
    name: "Ecoponto Mondubim II",
    address: "Rua A, 104 - Mondubim",
    types: ['Vidro', 'Pilhas', 'Eletrônicos'],
    neighborhood: "Mondubim",
    mapLink: "https://www.google.com/maps/place/Ecoponto+-+Mondubim+II/data=!4m7!3m6!1s0x7c74ff910bb2d89:0xb7b1a053cc028939!8m2!3d-3.82264!4d-38.5634538!16s%2Fg%2F11h6r_q23d!19sChIJiS27EPlPxwcROYkCzFOgsbc?authuser=0&hl=pt-BR&rclk=1"
  },
  {
    id: 5,
    name: "Ecoponto Cajazeiras",
    address: "Rua Gisele, 140 - Cajazeiras",
    types: ['Óleo', 'Eletrônicos', 'Papel', 'Plástico'],
    neighborhood: "Cajazeiras",
    mapLink: "https://www.google.com/maps/place/Ecoponto+Cajazeiras/data=!4m7!3m6!1s0x7c74fa1f14b7011:0xc856d2fce03d43b6!8m2!3d-3.8118295!4d-38.5045517!16s%2Fg%2F11hzpkrj2v!19sChIJEXBL8aFPxwcRtkM94PzSVsg?authuser=0&hl=pt-BR&rclk=1"
  },
];

export const mockWasteTypes: string[] = ['Vidro', 'Plástico', 'Eletrônicos', 'Óleo', 'Pilhas', 'Papel'];

const achievements: Achievement[] = [
    { id: 1, icon: PlantIcon, title: 'Primeiro Jardim', description: 'Cadastrou sua primeira planta' },
    { id: 2, icon: LeafIcon, title: 'Eco Mentor', description: 'Compartilhou 5 dicas sustentáveis' },
    { id: 3, icon: RecycleIcon, title: 'Jardineiro Expert', description: 'Cadastrou 10 plantas' },
];


export const mockUserProfile: UserProfile = {
  name: 'Maria Silva Santos',
  email: 'maria.silva@email.com',
  phone: '(85) 99999-9999',
  address: 'Messejana, Fortaleza - CE',
  memberSince: '14/01/2024',
  avatarUrl: `https://picsum.photos/seed/maria/100/100`,
  stats: {
    plants: 12,
    tips: 8,
    points: 450,
    daysActive: 45,
  },
  achievements: achievements,
};