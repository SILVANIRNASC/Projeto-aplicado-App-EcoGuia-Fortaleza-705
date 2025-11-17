import React from 'react';
import { UserIcon } from '../components/icons';
import { mockUserProfile } from '../data';

const ProfilePage: React.FC = () => {
    const user = mockUserProfile;
  return (
    <main className="flex-1">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <UserIcon className="w-8 h-8 mr-3 text-brand-blue" />
                Meu Perfil Sustentável
            </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Info Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Informações Pessoais</h2>
                <button className="text-sm font-medium text-brand-blue hover:text-brand-blue-dark">Editar</button>
              </div>
              <div className="flex flex-col items-center md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <img src={user.avatarUrl} alt="User Avatar" className="w-24 h-24 rounded-full" />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full">
                  <div>
                    <label className="text-xs text-gray-500">Nome Completo</label>
                    <p className="text-gray-800 font-medium">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">E-mail</label>
                    <p className="text-gray-800 font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Telefone</label>
                    <p className="text-gray-800 font-medium">{user.phone}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Endereço</label>
                    <p className="text-gray-800 font-medium">{user.address}</p>
                  </div>
                  <div className="md:col-span-2 border-t pt-4 mt-2">
                    <p className="text-sm text-gray-500">Membro desde {user.memberSince}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Configurações</h2>
                <p className="text-gray-600">Personalize sua experiência no app.</p>
                {/* Add settings toggles/options here */}
            </div>
          </div>

          <div className="space-y-8">
            {/* Green Journey Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Minha Jornada Verde</h2>
              <div className="flex justify-around mb-4">
                <div>
                  <p className="text-2xl font-bold text-brand-green">{user.stats.plants}</p>
                  <p className="text-sm text-gray-500">Plantas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-brand-green">{user.stats.tips}</p>
                  <p className="text-sm text-gray-500">Dicas</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-4xl font-bold text-brand-blue">{user.stats.points}</p>
                <p className="text-sm text-gray-500">Pontos de Sustentabilidade</p>
              </div>
              <span className="text-xs text-white bg-gray-400 rounded-full px-3 py-1">{user.stats.daysActive} dias ativo</span>
            </div>

            {/* Achievements Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Conquistas</h2>
                <ul className="space-y-4">
                    {user.achievements.map(ach => (
                        <li key={ach.id} className="flex items-center">
                            <div className="bg-yellow-100 p-2 rounded-full mr-4">
                               <ach.icon className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800">{ach.title}</h4>
                                <p className="text-sm text-gray-500">{ach.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
