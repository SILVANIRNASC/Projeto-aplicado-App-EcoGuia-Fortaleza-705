import React, { useState, useMemo, useEffect } from 'react';
import { RecycleIcon, MapPinIcon } from '../components/icons';

interface Residuo {
  nome: string;
  cor: string;
}

interface PontoColeta {
  id_ponto: number;
  nome_local: string;
  endereco: string;
  latitude: string;
  longitude: string;
  horario_funcionamento: string;
  lista_residuos: Residuo[];
}

const ITEMS_PER_PAGE = 20; // Configuração de itens por página

const DescartePage: React.FC = () => {
  const [pontos, setPontos] = useState<PontoColeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [wasteType, setWasteType] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  
  // Estado para paginação
  const [currentPage, setCurrentPage] = useState(1);
  
  const API_BASE_URL = import.meta.env.PROD 
    ? 'https://ecoguia-api-0wh8.onrender.com/api' 
    : 'http://localhost:3008/api';

  // Buscar dados do Backend
  useEffect(() => {
    const fetchPontos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/pontos`);
        if (response.ok) {
          const data = await response.json();
          setPontos(data);
        }
      } catch (error) {
        console.error("Erro ao buscar pontos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPontos();
  }, []);

  // Filtragem no Frontend
  const filteredPoints = useMemo(() => {
    return pontos.filter(point => {
      const wasteMatch = wasteType 
        ? point.lista_residuos.some(r => r.nome.toLowerCase().includes(wasteType.toLowerCase())) 
        : true;
      
      const neighborhoodMatch = neighborhood 
        ? point.endereco.toLowerCase().includes(neighborhood.toLowerCase()) 
        : true;
      
      return wasteMatch && neighborhoodMatch;
    });
  }, [wasteType, neighborhood, pontos]);

  // Resetar para página 1 se o filtro mudar
  useEffect(() => {
    setCurrentPage(1);
  }, [wasteType, neighborhood]);

  // Lógica de Paginação
  const totalItems = filteredPoints.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  
  // Pontos que serão exibidos na página atual
  const currentPoints = filteredPoints.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const availableWasteTypes = useMemo(() => {
    const types = new Set<string>();
    pontos.forEach(p => {
        p.lista_residuos.forEach(r => types.add(r.nome));
    });
    return Array.from(types);
  }, [pontos]);

  return (
    <main className="flex-1 bg-gray-50 min-h-screen">
      <div className="bg-blue-50 border-b border-blue-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <RecycleIcon className="w-8 h-8 mr-3 text-blue-800" />
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
              <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Bairro</label>
              <input
                type="text"
                id="neighborhood"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Ex: Messejana, Aldeota..."
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tipos de Resíduos</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              {loading ? (
                 <div className="text-center py-4 text-gray-400">Carregando...</div>
              ) : (
                  <ul className="space-y-3">
                    {availableWasteTypes.map((type, index) => (
                      <li key={index} className="flex items-center">
                        <span className="h-2 w-2 bg-green-500 rounded-full mr-3"></span>
                        <span className="text-gray-700">{type}</span>
                      </li>
                    ))}
                  </ul>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Pontos de Coleta <span className="text-sm font-normal text-gray-500 ml-2">({filteredPoints.length} encontrados)</span>
                </h2>
            </div>
            
            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                </div>
            ) : (
                <div className="space-y-4">
                {currentPoints.length > 0 ? (
                    <>
                    <div className="flex items-center justify-between bg-white p-4 border border-gray-200 rounded-lg mt-4">
                            <div className="text-sm text-gray-700">
                                Mostrando <span className="font-medium">{startIndex + 1}</span> a <span className="font-medium">{endIndex}</span> de <span className="font-medium">{totalItems}</span> registros
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 border rounded-md text-sm font-medium ${
                                        currentPage === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                    }`}
                                >
                                    Anterior
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 border rounded-md text-sm font-medium ${
                                        currentPage === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                    }`}
                                >
                                    Próximo
                                </button>
                            </div>
                        </div>
                        {currentPoints.map((point) => (
                        <div key={point.id_ponto} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{point.nome_local}</h3>
                                    <p className="text-sm text-gray-600 mt-1 flex items-center">
                                        <MapPinIcon className="w-4 h-4 mr-1 text-gray-400" />
                                        {point.endereco}
                                    </p>
                                </div>
                                
                                {/* LINK DIRETO PARA O GOOGLE MAPS */}
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${point.latitude},${point.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="ml-4 flex-shrink-0 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-800 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                >
                                    <MapPinIcon className="w-4 h-4 mr-2" />
                                    Ver no Mapa
                                </a>
                            </div>
                            
                            <div className="mt-3 flex flex-wrap gap-2">
                            {point.lista_residuos.map((residuo, i) => (
                                <span 
                                    key={i} 
                                    className="px-2 py-1 text-xs font-semibold rounded-full"
                                    style={{ backgroundColor: residuo.cor || '#DBEAFE', color: '#1E40AF' }}
                                >
                                    {residuo.nome}
                                </span>
                            ))}
                            </div>

                            <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                                {point.horario_funcionamento}
                            </div>
                        </div>
                        ))}
                    </>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
                        <p>Nenhum ponto de coleta encontrado para os filtros selecionados.</p>
                    </div>
                )}
                </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DescartePage;