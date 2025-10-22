import React, { useState } from 'react';
import { User, PropertyType, Currency } from '../types';
import { UserIcon, UmbrellaIcon, ShoppingCartIcon } from './IconComponents';

interface HeaderProps {
    isLoggedIn: boolean;
    user: User | null;
    cartCount: number;
    onSignInClick: () => void;
    onLogout: () => void;
    onNavSearch: (type: PropertyType) => void;
    onNavigate: (path: string) => void;
    onCurrencyChange: (currency: Currency) => void;
    currentCurrency: Currency;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, user, cartCount, onSignInClick, onLogout, onNavSearch, onNavigate, onCurrencyChange, currentCurrency }) => {
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const handleCurrencySelect = (currency: Currency) => {
    onCurrencyChange(currency);
    setIsCurrencyOpen(false);
  }

  const NavLink: React.FC<{type: PropertyType, children: React.ReactNode}> = ({ type, children }) => (
    <button onClick={() => onNavSearch(type)} className="text-slate-600 hover:text-slate-900 transition-colors">
      {children}
    </button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button onClick={() => onNavigate('/')} className="flex items-center gap-2 text-slate-900">
            <UmbrellaIcon className="h-7 w-7 text-blue-600" />
            <span className="text-3xl font-bold tracking-tighter">Sip</span>
        </button>
        <nav className="hidden md:flex items-center space-x-5">
          <NavLink type={PropertyType.Resorts}>Resorts</NavLink>
          <NavLink type={PropertyType.Rooms}>Rooms</NavLink>
          <NavLink type={PropertyType.RoomRent}>Room Rent</NavLink>
          <NavLink type={PropertyType.HouseRent}>Houses</NavLink>
          <NavLink type={PropertyType.PGs}>PGs</NavLink>
          <NavLink type={PropertyType.OfficeSpaces}>Workspaces</NavLink>
          <NavLink type={PropertyType.Commercial}>Commercial</NavLink>
        </nav>
        <div className="flex items-center gap-4">
            <div className="relative">
                <button onClick={() => setIsCurrencyOpen(!isCurrencyOpen)} className="font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                    {currentCurrency}
                </button>
                {isCurrencyOpen && (
                    <div className="absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-xl py-1">
                        <button onClick={() => handleCurrencySelect('USD')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">USD</button>
                        <button onClick={() => handleCurrencySelect('EUR')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">EUR</button>
                        <button onClick={() => handleCurrencySelect('INR')} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100">INR</button>
                    </div>
                )}
            </div>
            
            <button onClick={() => onNavigate('/cart')} className="relative text-slate-600 hover:text-slate-900 transition-colors">
                <ShoppingCartIcon className="h-6 w-6" />
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                    </span>
                )}
            </button>

            {isLoggedIn && user ? (
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-slate-700">
                        <UserIcon className="h-5 w-5" />
                        <span className="font-medium">Welcome, {user.name}</span>
                    </div>
                    <button 
                        onClick={onLogout}
                        className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <button 
                    onClick={onSignInClick}
                    className="bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors"
                >
                    Sign In
                </button>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;