import React from 'react';
import { SunIcon } from '../components/icons';

const InfoItem = ({ icon, label, value, highlight = false }: { icon: string, label: string, value: string, highlight?: boolean }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
        <div className="flex items-center text-sm text-gray-600">
            <span role="img" aria-label={label} className="mr-2">{icon}</span> {label}
        </div>
        <div className={`text-sm font-semibold ${highlight ? 'bg-red-500 text-white px-2 py-0.5 rounded-full' : 'text-gray-800'}`}>
            {value}
        </div>
    </div>
);


const RecommendationCard = ({ icon, title, text }: { icon: string, title: string, text: string }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h4 className="font-semibold text-gray-800 flex items-center mb-1">
            <span role="img" aria-label="icon" className="mr-2 text-xl">{icon}</span> {title}
        </h4>
        <p className="text-sm text-gray-600">{text}</p>
    </div>
);


const ClimatePage: React.FC = () => {
  return (
    <main className="flex-1">
      <div className="bg-blue-300" style={{ backgroundImage: 'linear-gradient(to right, #6EE7B7, #3B82F6)', opacity: 0.8 }}>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <SunIcon className="w-8 h-8 mr-3" />
              Clima Inteligente
            </h1>
            <p className="mt-2 text-lg text-blue-100">Previsão Personalizada para Jardinagem. Otimize o cuidado com suas plantas baseado no clima.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Fortaleza - Agora</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col items-center justify-center text-center">
                    <span role="img" aria-label="cloudy" className="text-7xl">☁️</span>
                    <p className="text-6xl font-bold text-gray-800 mt-2">28°C</p>
                    <p className="text-gray-600">Parcialmente nublado</p>
                    <p className="text-sm text-gray-500">Sensação térmica: 31°C</p>
                </div>
                <div>
                    <InfoItem icon="💧" label="Umidade" value="75%" />
                    <InfoItem icon="💨" label="Vento" value="12 km/h" />
                    <InfoItem icon="👀" label="Visibilidade" value="10 km" />
                    <InfoItem icon="🌅" label="Nascer do sol" value="05:30" />
                    <InfoItem icon="🌇" label="Pôr do sol" value="17:45" />
                    <InfoItem icon="☀️" label="Índice UV" value="8 - Alto" highlight />
                </div>
            </div>
        </div>

        <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recomendações Sustentáveis</h2>
            <div className="space-y-4">
                <RecommendationCard 
                    icon="💧" 
                    title="Rega das Plantas" 
                    text="Com a previsão de chuva para amanhã, evite regar suas plantas hoje." 
                />
                 <RecommendationCard 
                    icon="🌱" 
                    title="Melhor Hora para Plantar" 
                    text="Com temperatura amena pela manhã, é o momento ideal para plantar mudas." 
                />
                 <RecommendationCard 
                    icon="♻️" 
                    title="Compostagem" 
                    text="O tempo úmido acelera a decomposição. Revire sua composteira hoje." 
                />
            </div>
        </div>
      </div>
    </main>
  );
};

export default ClimatePage;
