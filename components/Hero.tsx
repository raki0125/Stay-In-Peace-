import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-32 pb-16 h-[50vh] min-h-[400px] flex items-center justify-center text-center text-white">
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
      <img
        src="https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop"
        alt="Luxury resort lobby"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative z-20 container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Find Your Perfect Space.</h1>
        <p className="mt-4 text-lg md:text-xl text-slate-200 max-w-3xl mx-auto">
          From resorts and rooms to offices and commercial properties, book your next space with ease.
        </p>
      </div>
    </div>
  );
};

export default Hero;
