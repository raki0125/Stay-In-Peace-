import React from 'react';
import { PopularDestination } from '../types';

interface PopularDestinationsProps {
  destinations: PopularDestination[];
}

const DestinationCard: React.FC<{ destination: PopularDestination }> = ({ destination }) => (
  <div className="relative rounded-xl overflow-hidden h-80 group">
    <img src={destination.imageUrl} alt={destination.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6">
      <h3 className="text-2xl font-bold text-white">{destination.name}</h3>
      <p className="text-slate-200">{destination.country}</p>
    </div>
  </div>
);

const PopularDestinations: React.FC<PopularDestinationsProps> = ({ destinations }) => {
  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Popular Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {destinations.map(dest => <DestinationCard key={dest.name} destination={dest} />)}
      </div>
    </div>
  );
};

export default PopularDestinations;
