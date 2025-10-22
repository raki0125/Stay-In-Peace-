import React, { useState, useEffect } from 'react';
import { Property, Currency, CurrencyInfo, PropertyType } from '../types';
import { ArrowLeftIcon, CreditCardIcon, CheckCircleIcon } from '../components/IconComponents';

const CURRENCIES: Record<Currency, CurrencyInfo> = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.93 },
    INR: { symbol: '₹', rate: 83.5 },
};

const formatPrice = (priceInUsd: number, currency: Currency) => {
    const { symbol, rate } = CURRENCIES[currency];
    return `${symbol}${(priceInUsd * rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
};

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

interface CheckoutPageProps {
    cartItems: Property[];
    currency: Currency;
    onNavigate: (path: string) => void;
    onCheckoutSuccess: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, currency, onNavigate, onCheckoutSuccess }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (cartItems.length === 0 && !isSuccess) {
            onNavigate('/');
        }
    }, [cartItems, onNavigate, isSuccess]);

    const subtotal = cartItems.reduce((acc, item) => acc + getPrice(item), 0);
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            onCheckoutSuccess();
            setTimeout(() => {
                onNavigate('/');
            }, 3000);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="container mx-auto px-6 py-16 text-center animate-in fade-in">
                <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto mb-6" />
                <h1 className="text-4xl font-bold mb-4">Booking Confirmed!</h1>
                <p className="text-slate-600 mb-2">Thank you for your booking. A confirmation has been sent to your email.</p>
                <p className="text-slate-500">You will be redirected to the homepage shortly.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <button onClick={() => onNavigate('/cart')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-6">
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Cart
            </button>
            <h1 className="text-4xl font-bold mb-8">Checkout</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Payment Form */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                    <form onSubmit={handleCheckout}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                                <div className="relative">
                                    <CreditCardIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <input type="text" placeholder="0000 0000 0000 0000" required className="w-full h-12 pl-10 pr-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Cardholder Name</label>
                                <input type="text" placeholder="John Doe" required className="w-full h-12 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                                    <input type="text" placeholder="MM/YY" required className="w-full h-12 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                                    <input type="text" placeholder="123" required className="w-full h-12 px-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                        </div>
                        <button 
                            type="submit"
                            disabled={isProcessing}
                            className="w-full mt-8 bg-slate-800 text-white font-bold py-4 rounded-lg hover:bg-slate-700 transition-colors text-lg flex items-center justify-center disabled:bg-slate-400"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Processing...
                                </>
                            ) : `Pay ${formatPrice(total, currency)}`}
                        </button>
                    </form>
                </div>
                {/* Order Summary */}
                <div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        <div className="space-y-4 border-b pb-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <img src={item.imageUrls[0]} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                    <div className="flex-grow">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-sm text-slate-500">{item.type}</p>
                                    </div>
                                    <p className="font-semibold">{formatPrice(getPrice(item), currency)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-3 mt-4">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
