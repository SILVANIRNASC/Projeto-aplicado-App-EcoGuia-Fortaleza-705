import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';
import { UserIcon, TrophyIcon, StarIcon, CloseIcon } from '../components/icons';

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
  bairro: string;
  cidade: string;
  estado: string;
  endereco_completo: string;
  data_cadastro: string;
  pontos_total: number;
  total_plantas: number;
  total_dicas: number;
  conquistas: Conquista[];
}

const ProfilePage: React.FC = () => {
  const { user: authUser, logout } = useAuth();
  const token = Cookies.get('eco_token');

  // Estado para os dados COMPLETOS do perfil vindos do banco
  const [userProfile, setUserProfile] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Estado para o formulário de edição
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const API_BASE_URL = import.meta.env.PROD 
    ? 'https://ecoguia-api-0wh8.onrender.com/api' 
    : 'http://localhost:3008/api';

  // Função Auxiliar de Máscara
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.substring(0, 11);
    if (match.length === 0) return '';
    if (match.length <= 2) return `(${match}`;
    if (match.length <= 7) return `(${match.substring(0, 2)}) ${match.substring(2)}`;
    return `(${match.substring(0, 2)}) ${match.substring(2, 7)}-${match.substring(7, 11)}`;
  };

  const getAchievementIcon = (iconName: string) => {
    switch (iconName) {
      case 'seed': return <UserIcon className="w-6 h-6 text-green-600" />;
      case 'leaf': 
      case 'tree': return <TrophyIcon className="w-6 h-6 text-green-700" />;
      case 'star': return <StarIcon className="w-6 h-6 text-yellow-500" />;
      case 'calendar': return <StarIcon className="w-6 h-6 text-purple-500" />;
      default: return <TrophyIcon className="w-6 h-6 text-blue-600" />;
    }
  };

  // Função para buscar dados
  const fetchUserData = async () => {
    if (!authUser || !token) {
        setError("Usuário não logado.");
        setLoading(false);
        return;
    }

    try {
      // Usa o ID do usuário logado
      const response = await fetch(`${API_BASE_URL}/usuarios/${authUser.id_usuario}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401 || response.status === 403) {
        logout();
        return;
      }

      if (!response.ok) throw new Error('Falha ao buscar dados');
      const data = await response.json();
      setUserProfile(data);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar o perfil.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [authUser]);

  // Função para abrir o modal preenchido
  const handleOpenEdit = () => {
    if (userProfile) {
      setFormData({
        nome: userProfile.nome,
        telefone: userProfile.telefone ? formatPhoneNumber(userProfile.telefone) : '',
        bairro: userProfile.bairro || '',
        cidade: userProfile.cidade || '',
        estado: userProfile.estado || ''
      });
      setIsEditModalOpen(true);
    }
  };

  // Função de Mudança com Máscara
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'telefone') {
      setFormData({ ...formData, telefone: formatPhoneNumber(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Função para salvar alterações
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authUser || !token) return;
    setSaving(true);

    try {
      const payload = {
        ...formData,
        telefone: formData.telefone.replace(/\D/g, '') // Remove máscara antes de enviar
      };

      const response = await fetch(`${API_BASE_URL}/usuarios/${authUser.id_usuario}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.status === 401) {
        logout();
        return;
      }

      if (response.ok) {
        await fetchUserData(); // Recarrega os dados para atualizar a tela
        setIsEditModalOpen(false);
        alert('Perfil atualizado com sucesso!');
      } else {
        alert('Erro ao atualizar perfil.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
      if (window.confirm("Deseja realmente sair do sistema?")) {
          logout();
      }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-brand-blue">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current"></div>
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className="text-center py-10 text-red-500">
        <p>{error || 'Usuário não encontrado.'}</p>
      </div>
    );
  }

  const stats = {
    plants: userProfile.total_plantas || 0, 
    tips: userProfile.total_dicas || 0,   
    points: userProfile.pontos_total || 0,
    daysActive: userProfile.data_cadastro 
      ? Math.floor((new Date().getTime() - new Date(userProfile.data_cadastro).getTime()) / (1000 * 3600 * 24)) 
      : 1
  };

  const pointsToNextLevel = 100 - (stats.points % 100);
  const progressPercentage = stats.points % 100;

  return (
    <main className="flex-1 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
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
                <button 
                  onClick={handleOpenEdit}
                  className="text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                >
                  Editar
                </button>
              </div>
              <div className="flex flex-col items-center md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.nome)}&background=0D9488&color=fff`} 
                  alt="User Avatar" 
                  className="w-24 h-24 rounded-full" 
                />
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full">
                  <div>
                    <label className="text-xs text-gray-500">Nome Completo</label>
                    <p className="text-gray-800 font-medium">{userProfile.nome}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">E-mail</label>
                    <p className="text-gray-800 font-medium">{userProfile.email}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Telefone</label>
                    <p className="text-gray-800 font-medium">
                      {userProfile.telefone ? formatPhoneNumber(userProfile.telefone) : 'Não informado'}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Endereço</label>
                    <p className="text-gray-800 font-medium">
                      {userProfile.endereco_completo || 'Endereço não cadastrado'}
                    </p>
                  </div>
                  <div className="md:col-span-2 border-t pt-4 mt-2">
                    <p className="text-sm text-gray-500">
                        Membro desde {userProfile.data_cadastro ? new Date(userProfile.data_cadastro).toLocaleDateString('pt-BR') : '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Configurações</h2>
                <p className="text-gray-600">Personalize sua experiência no app.</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Green Journey Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Minha Jornada Verde</h2>
              
              <div className="mb-6">
                <p className="text-5xl font-bold text-blue-600">{stats.points}</p>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Pontos de Sustentabilidade</p>
              </div>

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

            {/* Achievements Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Conquistas</h2>
                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                        {userProfile.conquistas ? userProfile.conquistas.length : 0} Desbloqueadas
                    </span>
                </div>
                
                <ul className="space-y-4">
                    {userProfile.conquistas && userProfile.conquistas.length > 0 ? (
                        userProfile.conquistas.map((ach, index) => (
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

      {/* MODAL DE EDIÇÃO DE PERFIL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold text-gray-900">Editar Perfil</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  required
                  name="nome" 
                  className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input 
                  type="text"
                  name="telefone"
                  className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(xx) xxxxx-xxxx"
                  maxLength={15}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                  <input 
                    type="text" 
                    name="bairro"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
                    value={formData.bairro}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                  <input 
                    type="text" 
                    name="cidade"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500 bg-gray-100 text-gray-500 cursor-not-allowed"
                    value={formData.cidade}
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">UF</label>
                  <input 
                    type="text" 
                    name="estado"
                    maxLength={2}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500 uppercase bg-gray-100 text-gray-500 cursor-not-allowed"
                    value={formData.estado}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button 
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;