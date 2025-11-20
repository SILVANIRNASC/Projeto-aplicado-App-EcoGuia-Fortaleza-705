import React, { useState, useEffect } from 'react';
import { SunIcon } from '../components/icons';

const InfoItem = ({ icon, label, value, highlight = false }: { icon: string, label: string, value: string, highlight?: boolean }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
        <div className="flex items-center text-sm text-gray-600">
            <span role="img" aria-label={label} className="mr-2">{icon}</span> {label}
        </div>
        <div className={`text-sm font-semibold ${highlight ? 'bg-red-500 text-white px-2 py-0.5 rounded-full' : 'text-gray-800'}`}>
            {value}
        </div>
    </div>
);

const RecommendationCard = ({ icon, title, text }: { icon: string, title: string, text: string }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h4 className="font-semibold text-gray-800 flex items-center mb-1">
            <span role="img" aria-label="icon" className="mr-2 text-xl">{icon}</span> {title}
        </h4>
        <p className="text-sm text-gray-600">{text}</p>
    </div>
);

const API_BASE_URL = import.meta.env.PROD 
  ? 'https://ecoguia-api-0wh8.onrender.com/api' 
  : 'http://localhost:3008/api';
  
// --- Interface para os dados da API ---
interface WeatherData {
    temp: number;
    feels_like: number;
    description: string;
    icon: string;
    humidity: number;
    wind_seed: number;
    visibility: number;
    sunrise: number;
    sunset: number;
    city: string;
    sustainability_tip: string;
    message: string;
}

// --- interface para o estado das dicas de IA ---
interface AiTipState {
    text: string | null;
    loading: boolean;
    error: string | null;
}

// --- Funções Utilitárias ---

// Formata um timestamp (em segundos) para HH:mm
const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Converte para milissegundos
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

// Converte m/s para km/h e arredonda
const formatWindSpeed = (speedInMs: number) => {
    const speedInKmh = speedInMs * 3.6;
    return `${Math.round(speedInKmh)} km/h`;
};

// Converte metros para km
const formatVisibility = (visibilityInMeters: number) => {
    const visibilityInKm = visibilityInMeters / 1000;
    return `${visibilityInKm} km`;
};

const ClimatePage: React.FC = () => {
    // 1. Estados principais (Clima)
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 2. Estados para as dicas de IA
    const [plantingTip, setPlantingTip] = useState<AiTipState>({
        text: null,
        loading: false, // Começa como false, será true após o clima carregar
        error: null,
    });
    const [compostingTip, setCompostingTip] = useState<AiTipState>({
        text: null,
        loading: false,
        error: null,
    });

    // 3. Função para chamar a API de IA (reutilizável)
    const fetchAiTip = async (question: string): Promise<string> => {
        try {
            const response = await fetch(`${API_BASE_URL}/ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });
            if (!response.ok) {
                throw new Error('Falha ao buscar dica da IA');
            }
            const data = await response.json();
            if (data.resposta) {
                return data.resposta;
            } else {
                throw new Error('Resposta inesperada da API de IA');
            }
        } catch (err) {
            throw err; // Propaga o erro para o Promise.allSettled
        }
    };

    // 4. useEffect para buscar clima E depois as dicas
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Buscar Dados do Clima
                setLoading(true);
                const weatherResponse = await fetch(`${API_BASE_URL}/weather`);
                if (!weatherResponse.ok) {
                    throw new Error('Falha ao buscar dados do clima');
                }
                const weatherData: WeatherData = await weatherResponse.json();
                setWeatherData(weatherData);
                setLoading(false);
                setError(null);

                // Buscar Dicas da IA (usando dados do clima)
                
                // Define os prompts dinâmicos
                const plantingPrompt = `Clima: ${weatherData.temp}°C, ${weatherData.description}. Dê uma dica de jardinagem (máximo 150 caracteres) sobre a melhor hora para plantar hoje.`;
                const compostingPrompt = `Clima: ${weatherData.temp}°C, ${weatherData.humidity}% de umidade. Dê UMA ÚNICA dica curta (máximo 150 caracteres) sobre compostagem doméstica baseada neste clima.`;

                // Ativa o loading dos cards de dica
                setPlantingTip({ text: null, loading: true, error: null });
                setCompostingTip({ text: null, loading: true, error: null });

                // Busca as duas dicas em paralelo
                const [plantingResult, compostingResult] = await Promise.allSettled([
                    fetchAiTip(plantingPrompt),
                    fetchAiTip(compostingPrompt)
                ]);

                // Processa o resultado do plantio
                if (plantingResult.status === 'fulfilled') {
                    setPlantingTip({ text: plantingResult.value, loading: false, error: null });
                } else {
                    setPlantingTip({ text: null, loading: false, error: plantingResult.reason.message });
                }

                // Processa o resultado da compostagem
                if (compostingResult.status === 'fulfilled') {
                    setCompostingTip({ text: compostingResult.value, loading: false, error: null });
                } else {
                    setCompostingTip({ text: null, loading: false, error: compostingResult.reason.message });
                }

            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : 'Ocorreu um erro desconhecido';
                setError(errorMsg);
                setLoading(false);
                setPlantingTip({ text: null, loading: false, error: 'Falha ao carregar clima.' });
                setCompostingTip({ text: null, loading: false, error: 'Falha ao carregar clima.' });
            }
        };

        fetchAllData();
    }, []);

    // 5. Helper para renderizar os cards de dica
    const renderAiTipCard = (icon: string, title: string, tipState: AiTipState) => {
        let textToShow = 'Carregando dica...';
        if (tipState.loading) {
            textToShow = 'Consultando IA...';
        } else if (tipState.error) {
            textToShow = `Erro: ${tipState.error}`;
        } else if (tipState.text) {
            textToShow = tipState.text;
        } else if (!loading && !weatherData) { // Se o clima falhou
            textToShow = 'Dica indisponível no momento.';
        }

        return <RecommendationCard icon={icon} title={title} text={textToShow} />;
    };


    return (
        <main className="flex-1">
            <div className="bg-blue-300" style={{ backgroundImage: 'linear-gradient(to right, #6EE7B7, #3B82F6)', opacity: 0.8 }}>
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white flex items-center">
                        <SunIcon className="w-8 h-8 mr-3" />
                        Clima Inteligente
                    </h1>
                    <p className="mt-2 text-lg text-blue-100">Previsão Personalizada para Jardinagem. Otimize o cuidado com suas plantas baseado no clima.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    {loading && <p className="text-gray-600">Carregando dados do clima...</p>}
                    {error && <p className="text-red-500">Erro: {error}</p>}
                    
                    {weatherData && (
                        <>
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{weatherData.city} - Agora</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <img 
                                        src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`} 
                                        alt={weatherData.description}
                                        className="w-32 h-32 -mt-4 -mb-2"
                                    />
                                    <p className="text-6xl font-bold text-gray-800 mt-2">
                                        {Math.round(weatherData.temp)}°C
                                    </p>
                                    <p className="text-gray-600 capitalize">
                                        {weatherData.description}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Sensação térmica: {Math.round(weatherData.feels_like)}°C
                                    </p>
                                </div>
                                <div>
                                    <InfoItem icon="💧" label="Umidade" value={`${weatherData.humidity}%`} />
                                    <InfoItem icon="💨" label="Vento" value={formatWindSpeed(weatherData.wind_seed)} />
                                    <InfoItem icon="👀" label="Visibilidade" value={formatVisibility(weatherData.visibility)} />
                                    <InfoItem icon="🌅" label="Nascer do sol" value={formatTime(weatherData.sunrise)} />
                                    <InfoItem icon="🌇" label="Pôr do sol" value={formatTime(weatherData.sunset)} />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="lg:col-span-1">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recomendações Sustentáveis</h2>
                    <div className="space-y-4">
                        
                        {weatherData && (
                            <RecommendationCard
                                icon="💡"
                                title="Dica do Dia"
                                text={weatherData.sustainability_tip}
                            />
                        )}

                        {renderAiTipCard("🌱", "Melhor Hora para Plantar", plantingTip)}
                        {renderAiTipCard("♻️", "Compostagem", compostingTip)}

                    </div>
                </div>
            </div>
        </main>
    );
};

export default ClimatePage;