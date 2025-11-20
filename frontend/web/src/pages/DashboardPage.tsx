import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeafIcon, RecycleIcon, SunIcon, UserIcon } from '../components/icons';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3008/api';

const DashboardCard = ({ icon, title, description, path }: { icon: React.ReactNode, title: string, description: string, path: string }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path)}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center text-center group"
    >
      <div className="bg-blue-50 text-brand-blue p-4 rounded-full mb-4 group-hover:bg-blue-100 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const DashboardPage = () => {
  // Estado para armazenar os números reais
  const [stats, setStats] = useState({
    plants: 0,
    tips: 0,
    points: 0,
    daysActive: 0
  });
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  // Buscando os dados do Backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const storedName = localStorage.getItem('user_name');
        
        if (storedName) setUserName(storedName);

        if (!userId) {
            // Se não tiver ID, não faz o fetch (idealmente redirecionaria para login)
            setLoading(false);
            return;
        }

        const response = await fetch(`${API_BASE_URL}/usuarios/${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          
          // Calculando dias ativos
          const days = data.data_cadastro 
            ? Math.floor((new Date().getTime() - new Date(data.data_cadastro).getTime()) / (1000 * 3600 * 24)) 
            : 1;

          setStats({
            plants: data.total_plantas || 0,
            tips: data.total_dicas || 0,
            points: data.pontos_total || 0,
            daysActive: days
          });
        }
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <main className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-white text-center py-12 px-4 border-b border-gray-200">
            <div className="inline-block bg-brand-blue p-4 rounded-full mb-4 shadow-lg ring-4 ring-blue-100">
                <LeafIcon className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-brand-green">
                EcoGuia Fortaleza
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              {userName ? `Olá, ${userName}! ` : ''}Transforme sua cidade em um lugar mais verde e sustentável. Cultive, recicle e cuide do meio ambiente de forma inteligente.
            </p>
        </div>
        
        <div className="p-4 md:p-8">
          {/* Grid de Navegação */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-12 relative z-10">
            <DashboardCard 
              icon={<LeafIcon className="h-8 w-8" />}
              title="Meu Jardim"
              description="Gerencie suas plantas e veja dicas de jardinagem."
              path="/jardinagem"
            />
            <DashboardCard 
              icon={<RecycleIcon className="h-8 w-8" />}
              title="Descarte Sustentável"
              description="Encontre pontos de coleta e aprenda a reciclar."
              path="/descarte"
            />
            <DashboardCard 
              icon={<SunIcon className="h-8 w-8" />}
              title="Clima Inteligente"
              description="Veja a previsão do tempo e recomendações."
              path="/clima"
            />
            <DashboardCard 
              icon={<UserIcon className="h-8 w-8" />}
              title="Meu Perfil"
              description="Acompanhe seu progresso e conquistas."
              path="/perfil"
            />
          </div>

          {/* Área de Estatísticas Dinâmicas */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Sua Jornada Verde</h2>
              
              {loading ? (
                <div className="flex justify-center py-8">
                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100">
                    <div className="group">
                        <p className="text-4xl font-bold text-brand-green mb-1 group-hover:scale-110 transition-transform">
                          {stats.plants}
                        </p>
                        <p className="text-gray-500 font-medium">Plantas</p>
                    </div>
                    <div className="group">
                        <p className="text-4xl font-bold text-brand-green mb-1 group-hover:scale-110 transition-transform">
                          {stats.tips}
                        </p>
                        <p className="text-gray-500 font-medium">Dicas</p>
                    </div>
                    <div className="group">
                        <p className="text-4xl font-bold text-brand-blue mb-1 group-hover:scale-110 transition-transform">
                          {stats.points}
                        </p>
                        <p className="text-gray-500 font-medium">Pontos</p>
                    </div>
                    <div className="group">
                        <p className="text-4xl font-bold text-brand-blue mb-1 group-hover:scale-110 transition-transform">
                          {stats.daysActive}
                        </p>
                        <p className="text-gray-500 font-medium">Dias Ativo</p>
                    </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;