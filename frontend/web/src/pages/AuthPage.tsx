import React, { useState } from 'react';
import { LeafIcon, UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon, MapPinIcon } from '../components/icons';

interface AuthPageProps {
  onLogin: () => void;
}
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3008/api';

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLocationMessage, setShowLocationMessage] = useState(false);


  // Estado único para todos os campos do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    password: '',
    telefone: '',
    bairro: '',
    cidade: 'Fortaleza',
    estado: 'CE'
  });

  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleLocationClick = () => {
    setShowLocationMessage(true);
    // Esconde a mensagem automaticamente após 4 segundos
    setTimeout(() => setShowLocationMessage(false), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      await handleLogin();
    } else {
      await handleRegister();
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Salva o ID e Nome para usar em todo o app
        localStorage.setItem('user_id', data.usuario.id_usuario);
        localStorage.setItem('user_name', data.usuario.nome);
        
        // Redireciona para o Dashboard
        onLogin(); 
      } else {
        alert(`Erro: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const payload = {
        nome: formData.nome,
        email: formData.email,
        senha_hash: formData.password, 
        telefone: formData.telefone,
        bairro: formData.bairro,
        // Garante que envia Fortaleza/CE mesmo se o estado falhar visualmente
        cidade: formData.cidade || 'Fortaleza',
        estado: formData.estado || 'CE'
      };

      const response = await fetch(`${API_BASE_URL}/usuarios/cadastrar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Bem-vindo(a), ${data.nome}! Cadastro realizado com sucesso.`);
        localStorage.setItem('user_id', data.id_usuario);
        localStorage.setItem('user_name', data.nome);
        onLogin(); 
      } else {
        const err = await response.json();
        alert(`Erro ao cadastrar: ${err.error || 'Verifique os dados.'}`);
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
            <LeafIcon className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Acesse sua conta' : 'Crie sua conta'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          EcoGuia Fortaleza 🌱
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      required={!isLogin}
                      className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="Seu nome completo"
                      value={formData.nome}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="telefone"
                      name="telefone"
                      type="text"
                      className="focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                      placeholder="(85) 99999-9999"
                      value={formData.telefone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">Bairro</label>
                        <input
                        id="bairro"
                        name="bairro"
                        type="text"
                        className="focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                        value={formData.bairro}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">Cidade</label>
                        <input
                            id="cidade"
                            name="cidade"
                            type="text"
                            readOnly
                            className="block w-full sm:text-sm border-gray-300 rounded-md p-2 border bg-gray-100 text-gray-500 cursor-not-allowed"
                            value={formData.cidade}
                            onClick={handleLocationClick}
                            onFocus={handleLocationClick}
                        />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado (UF)</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPinIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="estado"
                            name="estado"
                            type="text"
                            readOnly
                            className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border uppercase bg-gray-100 text-gray-500 cursor-not-allowed"
                            value={formData.estado}
                            onClick={handleLocationClick}
                            onFocus={handleLocationClick}
                        />
                    </div>
                </div>

                {showLocationMessage && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 animate-fade-in-up">
                        <div className="flex">
                            <div className="ml-1">
                                <p className="text-xs text-yellow-700">
                                    O sistema foi feito para <strong>Fortaleza - CE</strong>. Em breve teremos cobertura em mais cidades!
                                </p>
                            </div>
                        </div>
                    </div>
                )}
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MailIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                    {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="font-medium text-brand-blue hover:text-brand-blue-dark"
                >
                  {isLogin ? 'Não tem uma conta? Cadastre-se' : 'Já tem uma conta? Entre'}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;