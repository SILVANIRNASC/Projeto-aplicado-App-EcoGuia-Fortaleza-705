import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CalendarIcon, ChatBubbleIcon, CloseIcon, HappyFaceIcon, LeafIcon, RecycleIcon } from './icons';

// Configuração da URL da API (Produção vs Localhost)
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://ecoguia-api-0wh8.onrender.com/api' 
  : 'http://localhost:3008/api';

// Adicionei a prop `onClick` para os botões de sugestão funcionarem
const SuggestionButton = ({ icon, text, onClick }: { icon: React.ReactNode, text: string, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className="flex items-center text-left w-full bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors text-sm text-gray-700"
    >
        {icon}
        <span className="ml-2 font-medium">{text}</span>
    </button>
);

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ type: 'user' | 'bot', text: string }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleChat = () => setIsOpen(!isOpen);

    // Função handleSend atualizada para conectar com o Backend
    const handleSend = async (textOverride?: string) => {
        const textToSend = textOverride || inputValue;

        if (textToSend.trim()) {
            // Adiciona a mensagem do usuário na tela
            setMessages(prev => [...prev, { type: 'user', text: textToSend }]);
            setInputValue('');
            setIsLoading(true);

            try {
                // Envia para a API
                const response = await fetch(`${API_BASE_URL}/ask`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ question: textToSend })
                });

                const data = await response.json();
                const botReply = data.resposta || "Desculpe, não entendi. Tente novamente.";

                // Adiciona a resposta do bot na tela
                setMessages(prev => [...prev, { type: 'bot', text: botReply }]);
            } catch (error) {
                setMessages(prev => [...prev, { type: 'bot', text: "Estou com problemas de conexão. Tente mais tarde." }]);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed bottom-24 right-4 sm:right-8 w-[calc(100vw-2rem)] max-w-sm h-[70vh] max-h-[550px] bg-white rounded-xl shadow-2xl z-20 flex flex-col font-sans">
                    {/* Header */}
                    <div className="bg-brand-blue text-white p-3 rounded-t-xl flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <div className="bg-white/20 p-1.5 rounded-full">
                                <ChatBubbleIcon className="w-6 h-6 -scale-x-100" />
                            </div>
                            <div>
                                <h3 className="font-bold text-base">EcoAssistente</h3>
                                <p className="text-xs opacity-90">Seu guia sustentável</p>
                            </div>
                        </div>
                        <button onClick={toggleChat} className="p-1 rounded-full hover:bg-white/20 transition-colors">
                            <CloseIcon className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                        <div className="flex">
                            <div className="bg-gray-100 rounded-lg p-3 max-w-xs text-sm text-gray-800">
                                Olá! 👋 Sou o EcoAssistente do EcoGuia Fortaleza. Como posso ajudá-lo com práticas sustentáveis hoje?
                            </div>
                        </div>

                        {/* Suggestions - Agora funcionais com onClick */}
                        <div className="space-y-2">
                            <SuggestionButton 
                                icon={<LeafIcon className="w-5 h-5 text-brand-green" />} 
                                text="Dicas de jardinagem" 
                                onClick={() => handleSend("Me dê dicas de jardinagem")}
                            />
                            <SuggestionButton 
                                icon={<RecycleIcon className="w-5 h-5 text-brand-blue" />} 
                                text="Pontos de coleta" 
                                onClick={() => handleSend("Onde ficam os pontos de coleta?")}
                            />
                            <SuggestionButton 
                                icon={<CalendarIcon className="w-5 h-5 text-gray-500" />} 
                                text="Eventos próximos" 
                                onClick={() => handleSend("Quais os próximos eventos sustentáveis?")}
                            />
                        </div>

                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : ''}`}>
                                <div className={`rounded-lg p-3 max-w-xs text-sm whitespace-pre-wrap ${msg.type === 'user' ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-800'}`}>
                                    <ReactMarkdown 
                                        children={msg.text} 
                                        remarkPlugins={[remarkGfm]}
                                        components={{
                                            // Estilização personalizada para elementos Markdown
                                            p: ({node, ...props}) => <p className="mb-1 last:mb-0" {...props} />,
                                            ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2 space-y-1" {...props} />,
                                            ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-2 space-y-1" {...props} />,
                                            li: ({node, ...props}) => <li className="" {...props} />,
                                            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                                            a: ({node, ...props}) => <a className="text-blue-500 hover:underline break-all" target="_blank" rel="noopener noreferrer" {...props} />,
                                            code: ({node, className, children, ...props}: any) => {
                                                const match = /language-(\w+)/.exec(className || '')
                                                return match ? (
                                                    <div className="bg-gray-800 text-white p-2 rounded my-2 overflow-x-auto text-xs">
                                                        <code className={className} {...props}>{children}</code>
                                                    </div>
                                                ) : (
                                                    <code className="bg-gray-200 text-red-500 rounded px-1 py-0.5 text-xs" {...props}>{children}</code>
                                                )
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                        
                        {isLoading && (
                            <div className="flex">
                                <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-500 italic">
                                    Digitando...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Footer */}
                    <div className="p-3 border-t border-gray-200">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Digite sua pergunta..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                disabled={isLoading}
                                className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue text-sm disabled:bg-gray-50"
                            />
                            <button 
                                onClick={() => handleSend()} 
                                disabled={isLoading}
                                className="px-4 py-2 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors text-sm disabled:opacity-70"
                            >
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Toggle Button */}
            <button
                onClick={toggleChat}
                className="fixed bottom-6 right-6 bg-brand-blue text-white p-4 rounded-full shadow-lg z-20 hover:bg-brand-blue-dark transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
                aria-label={isOpen ? "Fechar EcoAssistente" : "Abrir EcoAssistente"}
            >
                <HappyFaceIcon className="w-8 h-8" />
            </button>
        </>
    );
};

export default Chatbot;