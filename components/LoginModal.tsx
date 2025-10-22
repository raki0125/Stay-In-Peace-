import React, { useState } from 'react';
import { User } from '../types';
import { XIcon, UserIcon } from './IconComponents';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogin: (user: User) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            if (username.toLowerCase() === 'demo' && password === 'demo') {
                onLogin({ name: 'Demo User' });
            } else {
                setError('Invalid username or password. Please use demo/demo.');
            }
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm transform transition-all animate-in fade-in zoom-in-95" onClick={e => e.stopPropagation()}>
                <div className="p-8 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800">
                        <XIcon className="h-6 w-6" />
                    </button>
                    
                    <div className="text-center mb-6">
                        <UserIcon className="h-12 w-12 bg-slate-100 text-slate-500 p-2 rounded-full mx-auto mb-4" />
                        <h2 className="text-2xl font-bold">Sign In</h2>
                        <p className="text-slate-500">Use <span className="font-semibold">demo</span> / <span className="font-semibold">demo</span> to log in.</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="username">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full h-12 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="demo"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-12 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="demo"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 disabled:bg-slate-400"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Signing In...</span>
                                </>
                            ) : 'Sign In'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
