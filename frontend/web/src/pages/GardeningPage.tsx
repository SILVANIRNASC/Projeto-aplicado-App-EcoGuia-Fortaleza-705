import React, { useState, useEffect } from 'react';
import { PlantIcon, CloseIcon, CalendarIcon } from '../components/icons';
import { mockTips } from '../data'; // Dicas continuam mockadas por enquanto
import { Tip } from '../types';

// Interface para os dados que vêm do Banco de Dados
interface PlantDB {
  id_planta: number;
  id_usuario: number;
  nome_popular: string;
  nome_cientifico: string;
  data_plantio: string;
  data_formatada?: string;
  frequencia_rega: number;
  ultima_rega: string;
  status_rega?: string; 
  frequencia_adubacao: number;
  ultima_adubacao: string;
  frequencia_poda: number;
  ultima_poda: string;
}

const GardeningPage: React.FC = () => {
  // Estados das Plantas
  const [plants, setPlants] = useState<PlantDB[]>([]);
  const [isLoadingPlants, setIsLoadingPlants] = useState(true);

  const [tips, setTips] = useState<Tip[]>(mockTips);
  const [newTip, setNewTip] = useState('');

  // Estados do Formulário de Cadastro
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<PlantDB | null>(null);

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nome_popular: '',
    nome_cientifico: '',
    data_plantio: '',
    frequencia_rega: 3
  });

  // BUSCAR PLANTAS DO BANCO
  const fetchPlants = async () => {
    try {
      // Usando ID 6 fixo como combinamos nos testes
      const response = await fetch('http://localhost:3008/api/plantas/usuario/6');
      if (response.ok) {
        const data = await response.json();
        setPlants(data);
      } else {
        console.error('Erro ao buscar plantas');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
    } finally {
      setIsLoadingPlants(false);
    }
  };

  // Chama a busca assim que a tela carrega
  useEffect(() => {
    fetchPlants();
  }, []);

  // REGAR PLANTA
  const handleRegar = async (id_planta: number) => {
    try {
      const response = await fetch(`http://localhost:3008/api/plantas/${id_planta}/cuidado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo_cuidado: 'rega' })
      });

      if (response.ok) {
        // Atualiza a lista para recalcular os dias
        fetchPlants(); 
        alert('Planta regada! 💧 As datas foram atualizadas.');
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
    }
  };

  // SALVAR NOVA PLANTA (POST)
  const handleSavePlant = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch('http://localhost:3008/api/plantas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_usuario: 6, // ID fixo
          ...formData
        })
      });

      if (response.ok) {
        alert('Planta cadastrada com sucesso! 🌱');
        setIsModalOpen(false); // Fecha o modal
        setFormData({ nome_popular: '', nome_cientifico: '', data_plantio: '' , frequencia_rega: 3}); // Limpa form
        fetchPlants(); // Atualiza a lista na tela
      } else {
        alert('Erro ao salvar planta.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão.');
    } finally {
      setSaving(false);
    }
  };

  const openCalendar = (plant: PlantDB) => {
    setSelectedPlant(plant);
    setIsCalendarModalOpen(true);
  };

  // Função auxiliar para calcular data futura no front (para o modal de calendário)
  const calcularProximaData = (ultimaData: string, dias: number) => {
    if (!ultimaData) return 'Nunca';
    const data = new Date(ultimaData);
    data.setDate(data.getDate() + dias);
    return data.toLocaleDateString('pt-BR');
  };

  // Função auxiliar para verificar se já regou hoje
  const foiRegadoHoje = (dataString: string) => {
    if (!dataString) return false;
    const hoje = new Date();
    const dataRega = new Date(dataString);
    
    return hoje.getDate() === dataRega.getDate() &&
           hoje.getMonth() === dataRega.getMonth() &&
           hoje.getFullYear() === dataRega.getFullYear();
  };

  // Lógica de Dicas (Mantida do original)
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
    <main className="flex-1 relative">
      {/* Hero Header */}
      <div className="bg-green-50 border-b border-green-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <PlantIcon className="w-8 h-8 mr-3 text-green-700" />
              Meu Jardim Sustentável
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Cultive um futuro sustentável. Monitore suas plantas e contribua para um ambiente mais verde.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Botão de Adicionar Planta */}
        <div className="flex justify-end mb-6">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors flex items-center"
          >
            <span className="text-xl mr-2">+</span> Adicionar Planta
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* COLUNA DA ESQUERDA: LISTA DE PLANTAS */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Minhas Plantas ({plants.length})</h2>
            
            {isLoadingPlants ? (
              <div className="text-center py-10">Carregando seu jardim...</div>
            ) : plants.length === 0 ? (
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <p className="text-gray-500 mb-4">Seu jardim ainda está vazio.</p>
                <button onClick={() => setIsModalOpen(true)} className="text-green-600 font-semibold hover:underline">
                  Cadastre sua primeira planta agora!
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {plants.map((plant) => {
                  const isRegado = foiRegadoHoje(plant.ultima_rega);
                  return (
                    <div key={plant.id_planta} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-green-300 transition-colors">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{plant.nome_popular}</h3>
                          <p className="text-sm text-gray-500 italic">{plant.nome_cientifico}</p>
                          <p className="text-sm text-gray-600 mt-2">
                            <span role="img" aria-label="calendar">🗓️</span> Plantado em: {plant.data_formatada}
                          </p>
                        </div>
                        <div className="mt-4 sm:mt-0 text-left sm:text-right">
                          <p className={`text-sm font-bold mb-2 ${plant.status_rega === 'Atrasada!' ? 'text-red-600' : 'text-blue-600'}`}>
                            <span role="img" aria-label="watering-can">💧</span> Próxima rega: {plant.status_rega}
                          </p>
                          <div className="space-x-2">
                            {isRegado ? (
                                <button 
                                  disabled
                                  className="px-3 py-1 bg-gray-100 text-gray-400 text-xs font-semibold rounded-full cursor-not-allowed border border-gray-100"
                                >
                                  Regado hoje ✔
                                </button>
                              ) : (
                                <button 
                                  onClick={() => handleRegar(plant.id_planta)}
                                  className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full hover:bg-green-200 border border-green-200 transition-all active:scale-95"
                                >
                                  Regar agora
                                </button>
                              )}
                            <button 
                              onClick={() => openCalendar(plant)}
                              className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full hover:bg-gray-200 border border-gray-200 flex-inline items-center"
                            > Calendário
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dicas da Comunidade</h2>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Compartilhe sua dica</h3>
              <textarea
                value={newTip}
                onChange={(e) => setNewTip(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                rows={3}
                placeholder="Escreva aqui uma dica sustentável..."
              ></textarea>
              <button onClick={handleAddTip} className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
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

      {/* MODAL (POPUP) DE CADASTRO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="text-lg font-bold text-gray-900">Nova Planta</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSavePlant} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome Popular</label>
                <input type="text" required className="w-full p-2 border rounded" value={formData.nome_popular} onChange={e => setFormData({...formData, nome_popular: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Espécie</label>
                <input type="text" className="w-full p-2 border rounded" value={formData.nome_cientifico} onChange={e => setFormData({...formData, nome_cientifico: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Data do Plantio</label>
                <input type="date" required className="w-full p-2 border rounded" value={formData.data_plantio} onChange={e => setFormData({...formData, data_plantio: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Regar a cada (dias)</label>
                <input type="number" min="1" required className="w-full p-2 border rounded" value={formData.frequencia_rega} onChange={e => setFormData({...formData, frequencia_rega: parseInt(e.target.value)})} />
              </div>
              <button type="submit" disabled={saving} className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">{saving ? 'Salvando...' : 'Salvar'}</button>
            </form>
          </div>
        </div>
      )}
    
      {/* MODAL DE CALENDÁRIO */}
      {isCalendarModalOpen && selectedPlant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="bg-green-600 p-4 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center">
                <CalendarIcon className="w-6 h-6 mr-2" /> Calendário de Cuidados
              </h3>
              <button onClick={() => setIsCalendarModalOpen(false)}><CloseIcon className="w-6 h-6 text-white" /></button>
            </div>
            
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-1">{selectedPlant.nome_popular}</h4>
              <p className="text-sm text-gray-500 mb-6 italic">{selectedPlant.nome_cientifico}</p>

              <div className="space-y-4">
                {/* CARD DE REGA */}
                <div className="flex items-center bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <span role="img" aria-label="water">💧</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-blue-800">Próxima Rega</p>
                    <p className="text-xs text-blue-600">Frequência: {selectedPlant.frequencia_rega} dias</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">
                      {calcularProximaData(selectedPlant.ultima_rega, selectedPlant.frequencia_rega || 3)}
                    </p>
                  </div>
                </div>

                {/* CARD DE ADUBAÇÃO */}
                <div className="flex items-center bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <span role="img" aria-label="fertilizer">💊</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-yellow-800">Próxima Adubação</p>
                    <p className="text-xs text-yellow-600">Frequência: {selectedPlant.frequencia_adubacao} dias</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">
                       {calcularProximaData(selectedPlant.ultima_adubacao, selectedPlant.frequencia_adubacao)}
                    </p>
                  </div>
                </div>

                {/* CARD DE PODA */}
                <div className="flex items-center bg-green-50 p-3 rounded-lg border border-green-100">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <span role="img" aria-label="prune">✂️</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-green-800">Próxima Poda</p>
                    <p className="text-xs text-green-600">Frequência: {selectedPlant.frequencia_poda} dias</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">
                      {calcularProximaData(selectedPlant.ultima_poda, selectedPlant.frequencia_poda)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t text-center">
                <p className="text-xs text-gray-400">
                  Dica: Mantenha a frequência atualizada para garantir a saúde da sua planta.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default GardeningPage;