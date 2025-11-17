import React, { useState } from 'react';
import { CalendarIcon, ChatBubbleIcon, CloseIcon, HappyFaceIcon, LeafIcon, RecycleIcon } from './icons';

const SuggestionButton = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
    <button className="flex items-center text-left w-full bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors text-sm text-gray-700">
        {icon}
        <span className="ml-2 font-medium">{text}</span>
    </button>
);

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ type: 'user' | 'bot', text: string }[]>([]);
    const [inputValue, setInputValue] = useState('');

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSend = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { type: 'user', text: inputValue }]);
            // Mock bot response
            setTimeout(() => {
                setMessages(prev => [...prev, { type: 'bot', text: `Você perguntou sobre: "${inputValue}". Em breve, poderei te ajudar com isso!` }]);
            }, 1000);
            setInputValue('');
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

                        {/* Suggestions */}
                        <div className="space-y-2">
                            <SuggestionButton icon={<LeafIcon className="w-5 h-5 text-brand-green" />} text="Dicas de jardinagem" />
                            <SuggestionButton icon={<RecycleIcon className="w-5 h-5 text-brand-blue" />} text="Pontos de coleta" />
                            <SuggestionButton icon={<CalendarIcon className="w-5 h-5 text-gray-500" />} text="Eventos próximos" />
                        </div>

                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : ''}`}>
                                <div className={`rounded-lg p-3 max-w-xs text-sm ${msg.type === 'user' ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-800'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
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
                                className="flex-1 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-brand-blue text-sm"
                            />
                            <button onClick={handleSend} className="px-4 py-2 bg-brand-blue text-white font-semibold rounded-lg hover:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition-colors text-sm">
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
