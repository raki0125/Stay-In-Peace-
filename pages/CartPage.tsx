import React from 'react';
import { Property, Currency, CurrencyInfo, PropertyType } from '../types';
import { TrashIcon, ArrowLeftIcon } from '../components/IconComponents';

const CURRENCIES: Record<Currency, CurrencyInfo> = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.93 },
    INR: { symbol: '₹', rate: 83.5 },
};

const formatPrice = (priceInUsd: number, currency: Currency) => {
    const { symbol, rate } = CURRENCIES[currency];
    return `${symbol}${(priceInUsd * rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
};

interface CartPageProps {
    cartItems: Property[];
    currency: Currency;
    onRemoveItem: (id: string) => void;
    onNavigate: (path: string) => void;
}

const getPrice = (item: Property) => {
    switch (item.type) {
        case PropertyType.Resorts: return item.pricePerNight;
        case PropertyType.Rooms:
        case PropertyType.RoomRent:
        case PropertyType.HouseRent:
        case PropertyType.OfficeSpaces:
        case PropertyType.Commercial:
            return item.pricePerMonth;
        case PropertyType.PGs: return item.pricePerBed;
        default: return 0;
    }
};

const CartItem: React.FC<{ item: Property, currency: Currency, onRemove: (id: string) => void }> = ({ item, currency, onRemove }) => (
    <div className="flex items-center gap-4 border-b py-4">
        <img src={item.imageUrls[0]} alt={item.name} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg flex-shrink-0" />
        <div className="flex-grow">
            <p className="text-sm text-slate-500">{item.type}</p>
            <h3 className="font-semibold text-lg">{item.name}</h3>
            <p className="text-sm text-slate-600">{item.location}</p>
        </div>
        <div className="text-right flex-shrink-0">
            <p className="font-bold text-xl">{formatPrice(getPrice(item), currency)}</p>
            <button onClick={() => onRemove(item.id)} className="text-red-500 hover:text-red-700 mt-2 flex items-center gap-1 ml-auto">
                <TrashIcon className="h-4 w-4" /> Remove
            </button>
        </div>
    </div>
);

const CartPage: React.FC<CartPageProps> = ({ cartItems, currency, onRemoveItem, onNavigate }) => {
    const subtotal = cartItems.reduce((acc, item) => acc + getPrice(item), 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-6 py-16 text-center">
                <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-slate-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <button 
                    onClick={() => onNavigate('/')}
                    className="bg-slate-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-700 transition-colors"
                >
                    Continue Shopping
                </button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <button onClick={() => onNavigate('/')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-6">
                <ArrowLeftIcon className="h-5 w-5" />
                Continue Shopping
            </button>
            <h1 className="text-4xl font-bold mb-8">Your Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Items ({cartItems.length})</h2>
                    <div>
                        {cartItems.map(item => (
                            <CartItem key={item.id} item={item} currency={currency} onRemove={onRemoveItem} />
                        ))}
                    </div>
                </div>
                <div className="lg:sticky top-28 self-start">
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span>{formatPrice(subtotal, currency)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Taxes & Fees</span>
                                <span>{formatPrice(tax, currency)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-xl border-t pt-4 mt-2">
                                <span>Total</span>
                                <span>{formatPrice(total, currency)}</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => onNavigate('/checkout')}
                            className="w-full mt-8 bg-slate-800 text-white font-bold py-4 rounded-lg hover:bg-slate-700 transition-colors text-lg"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
