import React, { useState, useEffect } from 'react';
import { CalendarIcon, MapPinIcon, CloseIcon, UserIcon, ShareIcon } from '../components/icons';

interface Evento {
  id_evento: number;
  titulo: string;
  descricao: string;
  local: string;
  data_formatada: string;
  total_participantes: number;
  participando: boolean;
}

interface Participante {
    nome: string;
}

const EventosPage: React.FC = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAttendeesModalOpen, setIsAttendeesModalOpen] = useState(false);
  const [currentAttendees, setCurrentAttendees] = useState<Participante[]>([]);
  const [currentEventTitle, setCurrentEventTitle] = useState('');

  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    data_evento: '',
    horario: '',
    local: ''
  });

  const userId = localStorage.getItem('user_id');
  
  const API_BASE_URL = import.meta.env.PROD 
    ? 'https://ecoguia-api-0wh8.onrender.com/api' 
    : 'http://localhost:3008/api';

  // Buscar Eventos
  const fetchEventos = async () => {
    try {
      // Passamos o userId na query para saber quais eventos ELE marcou presença
      const response = await fetch(`${API_BASE_URL}/eventos?id_usuario=${userId || 0}`);
      if (response.ok) {
        const data = await response.json();
        setEventos(data);
      }
    } catch (error) {
      console.error("Erro ao buscar eventos", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const handleViewAttendees = async (evento: Evento) => {
    if (evento.total_participantes === 0) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/eventos/${evento.id_evento}/participantes`);
        if (response.ok) {
            const data = await response.json();
            setCurrentAttendees(data);
            setCurrentEventTitle(evento.titulo);
            setIsAttendeesModalOpen(true);
        }
    } catch (error) {
        console.error(error);
    }
  };

   const handleShare = (evento: Evento) => {
      const textToShare = `📅 *${evento.titulo}* \n\n📍 Local: ${evento.local}\n⏰ Quando: ${evento.data_formatada}\n\n📝 ${evento.descricao}\n\nParticipe com a gente no EcoGuia Fortaleza! 🌱`;
      
      navigator.clipboard.writeText(textToShare).then(() => {
          alert('Link copiado! Agora é só colar no WhatsApp ou Instagram. 🚀');
      });
  };

  // Toggle Presença (Check-in)
  const handleParticipar = async (id_evento: number) => {
    if (!userId) return alert("Faça login para participar de eventos.");

    try {
      const response = await fetch(`${API_BASE_URL}/eventos/${id_evento}/participar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_usuario: parseInt(userId) })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'adicionado') alert("Presença confirmada! 🎉");
        fetchEventos(); // Recarrega para atualizar contadores e botão
      }
    } catch (error) {
      alert("Erro ao atualizar presença.");
    }
  };

  // Criar Evento
  const handleCreateEvento = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Junta data e hora para o formato timestamp do banco
      const dataHora = `${formData.data_evento} ${formData.horario}:00`;

      const response = await fetch(`${API_BASE_URL}/eventos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            titulo: formData.titulo,
            descricao: formData.descricao,
            local: formData.local,
            data_evento: dataHora,
            id_usuario: parseInt(userId)
        })
      });

      if (response.ok) {
        alert("Evento criado com sucesso! 📅");
        setIsModalOpen(false);
        setFormData({ titulo: '', descricao: '', local: '', data_evento: '', horario: '' });
        fetchEventos();
      } else {
        alert("Erro ao criar evento.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex-1 bg-gray-50 min-h-screen relative">
      {/* Header */}
      <div className="bg-purple-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <CalendarIcon className="w-8 h-8 mr-3 text-purple-700" />
              Agenda Sustentável
            </h1>
            <p className="mt-2 text-lg text-gray-600">Participe de mutirões, feiras e workshops em Fortaleza.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-6">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors flex items-center"
          >
            <span className="text-xl mr-2">+</span> Criar Evento
          </button>
        </div>

        {loading ? (
            <div className="text-center py-10 text-gray-500">Carregando agenda...</div>
        ) : eventos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-500 mb-4">Nenhum evento agendado no momento.</p>
                <button onClick={() => setIsModalOpen(true)} className="text-purple-600 font-medium hover:underline">Seja o primeiro a criar um!</button>
            </div>
        ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {eventos.map((evento) => (
                    <div key={evento.id_evento} className={`bg-white rounded-xl shadow-sm border p-6 flex flex-col transition-all ${evento.participando ? 'border-purple-300 ring-1 ring-purple-100' : 'border-gray-200'}`}>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div className="bg-purple-100 text-purple-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide mb-2 inline-block">
                                    Evento
                                </div>
                                <button 
                                    onClick={() => handleShare(evento)}
                                    className="text-gray-400 hover:text-purple-600 transition-colors"
                                    title="Compartilhar evento"
                                >
                                    <ShareIcon className="w-5 h-5" />
                                </button>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{evento.titulo}</h3>
                            
                            <div className="space-y-2 text-sm text-gray-600 mb-4">
                                <div className="flex items-center">
                                    <CalendarIcon className="w-4 h-4 mr-2 text-purple-500" />
                                    {evento.data_formatada}
                                </div>
                                <div className="flex items-center">
                                    <MapPinIcon className="w-4 h-4 mr-2 text-purple-500" />
                                    {evento.local}
                                </div>
                            </div>
                            
                            <p className="text-gray-600 text-sm line-clamp-3 mb-4">{evento.descricao}</p>
                            <button 
                                onClick={() => handleViewAttendees(evento)}
                                className={`flex items-center text-xs mb-4 ${evento.total_participantes > 0 ? 'text-purple-600 hover:underline cursor-pointer' : 'text-gray-400 cursor-default'}`}
                            >
                                <UserIcon className="w-3 h-3 mr-1" />
                                {evento.total_participantes} confirmados {evento.total_participantes > 0 && '(ver todos)'}
                            </button>
                        </div>

                        <button 
                            onClick={() => handleParticipar(evento.id_evento)}
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center ${
                                evento.participando 
                                    ? 'bg-green-100 text-green-800 hover:bg-red-100 hover:text-red-800' 
                                    : 'bg-purple-600 text-white hover:bg-purple-700'
                            }`}
                        >
                            {evento.participando ? (
                                <>
                                    <span className="mr-2">Presença Confirmada</span> ✔
                                </>
                            ) : (
                                "Confirmar Presença"
                            )}
                        </button>
                    </div>
                ))}
            </div>
        )}
      </div>

      {/* Modal Criar Evento */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-fade-in-up">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-lg font-bold text-gray-900">Novo Evento</h3>
              <button onClick={() => setIsModalOpen(false)}><CloseIcon className="w-6 h-6 text-gray-500" /></button>
            </div>
            <form onSubmit={handleCreateEvento} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título do Evento</label>
                <input type="text" required className="w-full p-2 border rounded" value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} placeholder="Ex: Mutirão na Praia" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Data</label>
                    <input type="date" required className="w-full p-2 border rounded" value={formData.data_evento} onChange={e => setFormData({...formData, data_evento: e.target.value})} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Hora</label>
                    <input type="time" required className="w-full p-2 border rounded" value={formData.horario} onChange={e => setFormData({...formData, horario: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Local</label>
                <input type="text" required className="w-full p-2 border rounded" value={formData.local} onChange={e => setFormData({...formData, local: e.target.value})} placeholder="Ex: Praia de Iracema" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea required className="w-full p-2 border rounded" rows={3} value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})} placeholder="Detalhes do evento..." />
              </div>
              <button type="submit" disabled={saving} className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700">{saving ? 'Criando...' : 'Criar Evento'}</button>
            </form>
          </div>
        </div>
      )}

      {isAttendeesModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm overflow-hidden animate-fade-in-up">
                <div className="bg-purple-600 p-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Quem vai?</h3>
                    <button onClick={() => setIsAttendeesModalOpen(false)}><CloseIcon className="w-6 h-6 text-white" /></button>
                </div>
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <p className="font-semibold text-gray-700">{currentEventTitle}</p>
                </div>
                <ul className="max-h-60 overflow-y-auto p-4 space-y-3">
                    {currentAttendees.map((person, index) => (
                        <li key={index} className="flex items-center">
                            <img 
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(person.nome)}&background=0D9488&color=fff`} 
                                alt={person.nome} 
                                className="w-8 h-8 rounded-full mr-3"
                            />
                            <span className="text-gray-800 text-sm font-medium">{person.nome}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      )}
    </main>
  );
};

export default EventosPage;