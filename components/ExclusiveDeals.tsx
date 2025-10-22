import React from 'react';
import { Deal } from '../types';

interface ExclusiveDealsProps {
    deals: Deal[];
}

const DealCard: React.FC<{ deal: Deal }> = ({ deal }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img src={deal.imageUrl} alt={deal.title} className="w-full h-56 object-cover" />
        <div className="p-6">
            <h3 className="font-bold text-xl mb-2">{deal.title}</h3>
            <p className="text-slate-600 mb-4">{deal.description}</p>
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-slate-500">From</p>
                    <p className="text-2xl font-bold text-slate-900">{deal.price}</p>
                </div>
                <button className="bg-slate-800 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors">
                    View Deal
                </button>
            </div>
        </div>
    </div>
);

const ExclusiveDeals: React.FC<ExclusiveDealsProps> = ({ deals }) => {
    return (
        <div className="bg-slate-50">
            <div className="container mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Exclusive Deals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {deals.map(deal => <DealCard key={deal.title} deal={deal} />)}
                </div>
            </div>
        </div>
    );
};

export default ExclusiveDeals;
