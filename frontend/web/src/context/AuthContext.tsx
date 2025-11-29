import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

// Tipagem do Usuário
interface User {
    id_usuario: number;
    nome: string;
    email: string;
    token?: string;
}

interface AuthContextData {
    user: User | null;
    isAuthenticated: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Ao abrir o app, verifica se tem cookie salvo
        const storedToken = Cookies.get('eco_token');
        const storedUser = localStorage.getItem('eco_user_data');

        if (storedToken && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (userData: User, token: string) => {
        Cookies.set('eco_token', token, { expires: 1 }); // Expira em 1 dia
        
        // Salva dados básicos para recuperar no refresh
        localStorage.setItem('eco_user_data', JSON.stringify(userData));
        
        setUser(userData);
    };

    const logout = () => {
        Cookies.remove('eco_token');
        localStorage.removeItem('eco_user_data');
        setUser(null);
        window.location.href = '/';
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para facilitar o uso
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};