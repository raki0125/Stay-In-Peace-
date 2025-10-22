import React from 'react';
import { FeaturedProperty, Currency, CurrencyInfo } from '../types';

const CURRENCIES: Record<Currency, CurrencyInfo> = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.93 },
    INR: { symbol: '₹', rate: 83.5 },
};

const formatPrice = (priceInUsd: number, currency: Currency) => {
    const { symbol, rate } = CURRENCIES[currency];
    return `${symbol}${(priceInUsd * rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
};

interface FeaturedPropertiesProps {
    properties: FeaturedProperty[];
    onSelectProperty: (property: FeaturedProperty) => void;
    currency: Currency;
}

const PropertyCard: React.FC<{ property: FeaturedProperty; onSelect: () => void; currency: Currency }> = ({ property, onSelect, currency }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img src={property.imageUrl} alt={property.name} className="w-full h-56 object-cover" />
        <div className="p-6">
            <p className="text-sm font-semibold text-blue-600 mb-1">{property.category}</p>
            <h3 className="font-bold text-xl mb-2">{property.name}</h3>
            <p className="text-slate-600 mb-4">{property.location}</p>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-slate-500">From</p>
                    <p className="text-2xl font-bold text-slate-900">{formatPrice(property.price, currency)}<span className="text-base font-normal text-slate-500">{property.priceUnit}</span></p>
                </div>
                <button onClick={onSelect} className="bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors">
                    View
                </button>
            </div>
        </div>
    </div>
);

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties, onSelectProperty, currency }) => {
    return (
        <div className="bg-slate-50">
            <div className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Featured Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {properties.map(prop => <PropertyCard key={prop.id} property={prop} onSelect={() => onSelectProperty(prop)} currency={currency} />)}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProperties;