import React, { useState, useEffect } from 'react';
import { UserIcon, TrophyIcon, StarIcon } from '../components/icons';

// Interface para tipar os dados que vêm da API
interface Conquista {
  titulo: string;
  descricao: string;
  pontos: number;
  icone: string;
  data: string;
}

interface UserData {
  id_usuario: number;
  nome: string;
  email: string;
  telefone: string;
  endereco_completo: string;
  data_cadastro: string;
  pontos_total: number;
  total_plantas: number;
  total_dicas: number;
  conquistas: Conquista[];
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Função para escolher o ícone baseado na string que vem do banco
  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'seed':
        return <UserIcon className="w-6 h-6 text-green-600" />;
      case 'leaf':
      case 'tree':
        return <TrophyIcon className="w-6 h-6 text-green-700" />; // Usando Trophy como genérico para planta se não tiver LeafIcon
      case 'star':
        return <StarIcon className="w-6 h-6 text-yellow-500" />;
      case 'calendar':
        return <StarIcon className="w-6 h-6 text-purple-500" />;
      default:
        return <TrophyIcon className="w-6 h-6 text-blue-600" />;
    }
  };

  // Buscar dados assim que a página carrega
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // ID 6 fixo. No futuro, virá do contexto de Auth.
        const response = await fetch('http://localhost:3008/api/usuarios/6');
        
        if (!response.ok) {
          throw new Error('Falha ao buscar dados do usuário');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar o perfil.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Tratamento de Carregamento e Erro
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-brand-blue">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>{error || 'Usuário não encontrado.'}</p>
      </div>
    );
  }

  // Cálculos de interface
  const stats = {
    plants: user.total_plantas || 0, 
    tips: user.total_dicas || 0,  
    points: user.pontos_total || 0,
    daysActive: user.data_cadastro 
      ? Math.floor((new Date().getTime() - new Date(user.data_cadastro).getTime()) / (1000 * 3600 * 24)) 
      : 1
  };

  // Cálculo do próximo nível
  const pointsToNextLevel = 100 - (stats.points % 100);
  const progressPercentage = stats.points % 100;

  return (
    <main className="flex-1 bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <UserIcon className="w-8 h-8 mr-3 text-green-600" />
                Meu Perfil Sustentável
            </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Info Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Informações Pessoais</h2>
                <button className="text-sm font-medium text-green-600 hover:text-green-700">Editar</button>
              </div>
              <div className="flex flex-col items-center md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
                {/* Gerando avatar automático com as iniciais do nome */}
                <img 
                  src={`https://ui-avatars.com/api/?name=${user.nome}&background=0D9488&color=fff`} 
                  alt="User Avatar" 
                  className="w-24 h-24 rounded-full" 
                />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full">
                  <div>
                    <label className="text-xs text-gray-500">Nome Completo</label>
                    <p className="text-gray-800 font-medium">{user.nome}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">E-mail</label>
                    <p className="text-gray-800 font-medium">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Telefone</label>
                    <p className="text-gray-800 font-medium">{user.telefone || 'Não informado'}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Endereço</label>
                    <p className="text-gray-800 font-medium">
                      {user.endereco_completo || 'Endereço não cadastrado'}
                    </p>
                  </div>
                  <div className="md:col-span-2 border-t pt-4 mt-2">
                    <p className="text-sm text-gray-500">
                        Membro desde {user.data_cadastro ? new Date(user.data_cadastro).toLocaleDateString('pt-BR') : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Configurações</h2>
                <p className="text-gray-600">Personalize sua experiência no app.</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Green Journey Card - AGORA DINÂMICO */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Minha Jornada Verde</h2>
              
              {/* Pontuação Principal */}
              <div className="mb-6">
                <p className="text-5xl font-bold text-blue-600">{stats.points}</p>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Pontos de Sustentabilidade</p>
              </div>

              {/* Barra de Progresso do Nível */}
              <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden">
                <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mb-6">
                  Faltam <strong>{pointsToNextLevel} pontos</strong> para o próximo nível!
              </p>

              <div className="flex justify-around pt-4 border-t border-gray-100">
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.plants}</p>
                  <p className="text-xs text-gray-500">Plantas</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.tips}</p>
                  <p className="text-xs text-gray-500">Dicas</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-600">{stats.daysActive}</p>
                    <p className="text-xs text-gray-500">Dias Ativo</p>
                </div>
              </div>
            </div>

            {/* Achievements Card - AGORA DINÂMICO */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Conquistas</h2>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {user.conquistas ? user.conquistas.length : 0} Desbloqueadas
                    </span>
                </div>
                
                <ul className="space-y-4">
                    {user.conquistas && user.conquistas.length > 0 ? (
                        user.conquistas.map((ach, index) => (
                            <li key={index} className="flex items-start p-2 hover:bg-gray-50 rounded-lg transition duration-150">
                                <div className="bg-yellow-50 p-2 rounded-full mr-4 border border-yellow-100 mt-1">
                                   {getAchievementIcon(ach.icone)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-bold text-gray-800 text-sm">{ach.titulo}</h4>
                                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                            +{ach.pontos}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5">{ach.descricao}</p>
                                    <p className="text-[10px] text-gray-400 mt-1 text-right">
                                        Conquistado em: {ach.data}
                                    </p>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="text-center py-4 text-gray-500 text-sm">
                            Você ainda não possui conquistas. Continue usando o app!
                        </li>
                    )}
                </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;