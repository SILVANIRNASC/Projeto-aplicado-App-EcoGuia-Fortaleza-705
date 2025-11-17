import React, { useState } from 'react';
import { PlantIcon } from '../components/icons';
import { mockPlants, mockTips } from '../data';
import { Plant, Tip } from '../types';

const GardeningPage: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>(mockPlants);
  const [tips, setTips] = useState<Tip[]>(mockTips);
  const [newTip, setNewTip] = useState('');

  const handleAddTip = () => {
    if (newTip.trim()) {
      const tip: Tip = {
        id: tips.length + 1,
        author: 'Você',
        avatar: `https://picsum.photos/seed/you/40/40`,
        content: newTip,
      };
      setTips([tip, ...tips]);
      setNewTip('');
    }
  };

  return (
    <main className="flex-1">
      <div className="bg-brand-green-light">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <PlantIcon className="w-8 h-8 mr-3 text-brand-green-dark" />
              Meu Jardim Sustentável
            </h1>
            <p className="mt-2 text-lg text-gray-600">Cultive um futuro sustentável. Monitore suas plantas e contribua para um ambiente mais verde.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-6">
          <button className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors">
            + Adicionar Planta
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Minhas Plantas</h2>
            <div className="space-y-4">
              {plants.map((plant) => (
                <div key={plant.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{plant.name}</h3>
                      <p className="text-sm text-gray-500 italic">{plant.species}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        <span role="img" aria-label="calendar">🗓️</span> Plantado em: {plant.plantedDate}
                      </p>
                    </div>
                    <div className="mt-4 sm:mt-0 text-left sm:text-right">
                       <p className="text-sm text-blue-600 font-semibold">
                         <span role="img" aria-label="watering-can">💧</span> Próxima rega: {plant.nextWatering}
                       </p>
                      <div className="mt-3 space-x-2">
                        <button className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">Reguei hoje</button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full">Calendário</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dicas Sustentáveis</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Compartilhe sua dica</h3>
              <textarea
                value={newTip}
                onChange={(e) => setNewTip(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-blue focus:border-brand-blue"
                rows={3}
                placeholder="Compartilhe uma dica sustentável com a comunidade..."
              ></textarea>
              <button onClick={handleAddTip} className="mt-3 w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-lg transition-colors">
                Publicar Dica
              </button>
            </div>
            <div className="space-y-4">
              {tips.map((tip) => (
                <div key={tip.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-start">
                  <img src={tip.avatar} alt={tip.author} className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <p className="text-sm text-gray-800">{tip.content}</p>
                    <p className="text-xs text-gray-500 mt-1">- {tip.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GardeningPage;
