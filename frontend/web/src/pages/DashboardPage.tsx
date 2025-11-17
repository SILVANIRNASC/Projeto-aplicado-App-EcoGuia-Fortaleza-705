import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LeafIcon, RecycleIcon, SunIcon, UserIcon } from '../components/icons';
import { mockUserProfile } from '../data';

const DashboardCard = ({ icon, title, description, path }: { icon: React.ReactNode, title: string, description: string, path: string }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(path)}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center text-center"
    >
      <div className="bg-brand-blue-light text-brand-blue-dark p-4 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

const DashboardPage = () => {
  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white text-center py-8 px-4">
            <div className="inline-block bg-brand-blue p-4 rounded-full mb-4 shadow-lg">
                <LeafIcon className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-brand-green">
                EcoGuia Fortaleza
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Transforme sua cidade em um lugar mais verde e sustentável. Cultive, recicle e cuide do meio ambiente de forma inteligente.
            </p>
        </div>
        
        <div className="p-4 md:p-8 md:pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Sua Jornada Verde</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                      <p className="text-3xl font-bold text-brand-green">{mockUserProfile.stats.plants}</p>
                      <p className="text-gray-500">Plantas</p>
                  </div>
                  <div>
                      <p className="text-3xl font-bold text-brand-green">{mockUserProfile.stats.tips}</p>
                      <p className="text-gray-500">Dicas</p>
                  </div>
                  <div>
                      <p className="text-3xl font-bold text-brand-blue">{mockUserProfile.stats.points}</p>
                      <p className="text-gray-500">Pontos</p>
                  </div>
                  <div>
                      <p className="text-3xl font-bold text-brand-blue">{mockUserProfile.stats.daysActive}</p>
                      <p className="text-gray-500">Dias Ativo</p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;