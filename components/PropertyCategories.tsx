import React from 'react';
import { PropertyCategory } from '../types';

interface PropertyCategoriesProps {
  categories: PropertyCategory[];
}

const CategoryCard: React.FC<{ category: PropertyCategory }> = ({ category }) => (
  <div className="relative rounded-xl overflow-hidden h-80 group cursor-pointer">
    <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-6 flex items-center gap-3">
      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
        <category.icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white">{category.name}</h3>
      </div>
    </div>
  </div>
);

const PropertyCategories: React.FC<PropertyCategoriesProps> = ({ categories }) => {
  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center text-slate-800">Explore by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map(cat => <CategoryCard key={cat.name} category={cat} />)}
      </div>
    </div>
  );
};

export default PropertyCategories;