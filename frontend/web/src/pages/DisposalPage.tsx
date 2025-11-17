import React, { useState, useMemo } from 'react';
import { RecycleIcon, MapPinIcon } from '../components/icons';
import { mockCollectionPoints, mockWasteTypes } from '../data';
import { CollectionPoint } from '../types';

const DisposalPage: React.FC = () => {
  const [wasteType, setWasteType] = useState('');
  const [neighborhood, setNeighborhood] = useState('');

  const filteredPoints = useMemo(() => {
    return mockCollectionPoints.filter(point => {
      const wasteMatch = wasteType ? point.types.some(t => t.toLowerCase().includes(wasteType.toLowerCase())) : true;
      const neighborhoodMatch = neighborhood ? point.neighborhood.toLowerCase().includes(neighborhood.toLowerCase()) : true;
      return wasteMatch && neighborhoodMatch;
    });
  }, [wasteType, neighborhood]);
  
  const neighborhoods = useMemo(() => [...new Set(mockCollectionPoints.map(p => p.neighborhood))], []);


  return (
    <main className="flex-1">
      <div className="bg-brand-blue-light">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <RecycleIcon className="w-8 h-8 mr-3 text-brand-blue-dark" />
              Descarte Sustentável
            </h1>
            <p className="mt-2 text-lg text-gray-600">Descarte Correto, Futuro Sustentável. Encontre pontos de coleta e aprenda sobre reciclagem.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Encontrar Pontos de Coleta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="wasteType" className="block text-sm font-medium text-gray-700">Tipo de Resíduo</label>
              <input
                type="text"
                id="wasteType"
                value={wasteType}
                onChange={(e) => setWasteType(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
                placeholder="Ex: vidro, plástico..."
              />
            </div>
            <div>
              <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Bairro</label>
              <input
                type="text"
                id="neighborhood"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
                placeholder="Ex: Messejana, Aldeota..."
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tipos de Resíduos</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <ul className="space-y-3">
                {mockWasteTypes.map((type, index) => (
                  <li key={index} className="flex items-center">
                    <span className="h-2 w-2 bg-brand-green rounded-full mr-3"></span>
                    <span className="text-gray-700">{type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pontos de Coleta ({filteredPoints.length})</h2>
            <div className="space-y-4">
              {filteredPoints.length > 0 ? (
                filteredPoints.map((point) => (
                  <div key={point.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">{point.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{point.address}</p>
                        </div>
                        {point.mapLink && (
                             <a
                                href={point.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-4 flex-shrink-0 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-brand-blue-dark bg-brand-blue-light hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors"
                            >
                                <MapPinIcon className="w-4 h-4 mr-2" />
                                Ver no Mapa
                            </a>
                        )}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {point.types.map((type, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">{type}</span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
                  <p>Nenhum ponto de coleta encontrado para os filtros selecionados.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DisposalPage;