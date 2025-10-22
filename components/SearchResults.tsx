import React, { useState, useMemo } from 'react';
import { Property, Resort, Room, PG, OfficeSpace, Commercial, PropertyType, RoomRent, HouseRent, Currency, CurrencyInfo } from '../types';
import { StarIcon, MapPinIcon } from './IconComponents';

const CURRENCIES: Record<Currency, CurrencyInfo> = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.93 },
    INR: { symbol: '₹', rate: 83.5 },
};

const formatPrice = (priceInUsd: number, currency: Currency) => {
    const { symbol, rate } = CURRENCIES[currency];
    return `${symbol}${(priceInUsd * rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
};

interface SearchResultsProps {
  results: Property[];
  loading: boolean;
  searchType: PropertyType;
  onNavigate: (path: string) => void;
  currency: Currency;
}

// ... Card components ...
const RatingStars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} className="h-5 w-5 text-yellow-400" filled={i < rating} />
    ))}
  </div>
);

const CardWrapper: React.FC<{ children: React.ReactNode, onClick: () => void }> = ({ children, onClick }) => (
    <button onClick={onClick} className="text-left bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 w-full flex flex-col h-full">
        {children}
    </button>
);

const CardImage: React.FC<{ src: string, alt: string }> = ({ src, alt }) => (
    <div className="h-56 w-full flex-shrink-0">
        <img className="h-full w-full object-cover" src={src} alt={alt} />
    </div>
);

const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="p-6 flex-grow flex flex-col">
        {children}
    </div>
);

// Updated Card components to accept currency
const ResortCard: React.FC<{ item: Resort, onClick: () => void, currency: Currency }> = ({ item, onClick, currency }) => (
    <CardWrapper onClick={onClick}>
        <CardImage src={item.imageUrls[0]} alt={item.name} />
        <CardContent>
            <h3 className="font-bold text-xl mb-2 flex-grow">{item.name}</h3>
            <p className="text-slate-600 text-sm mb-4 flex items-center gap-1"><MapPinIcon className="h-4 w-4 flex-shrink-0"/>{item.location}</p>
            <div className="flex justify-between items-center mt-auto">
                <RatingStars rating={item.rating} />
                <div className="text-right">
                    <p className="text-xl font-bold text-slate-900">{formatPrice(item.pricePerNight, currency)}</p>
                    <p className="text-sm text-slate-500">/ night</p>
                </div>
            </div>
        </CardContent>
    </CardWrapper>
);

const RoomCard: React.FC<{ item: Room, onClick: () => void, currency: Currency }> = ({ item, onClick, currency }) => (
    <CardWrapper onClick={onClick}>
        <CardImage src={item.imageUrls[0]} alt={item.name} />
        <CardContent>
            <h3 className="font-bold text-xl mb-2 flex-grow">{item.name}</h3>
            <p className="text-slate-600 text-sm mb-2 flex items-center gap-1"><MapPinIcon className="h-4 w-4 flex-shrink-0"/>{item.location}</p>
            <p className="text-sm font-medium mb-4">{item.bedrooms} bed &bull; {item.bathrooms} bath</p>
            <div className="text-right mt-auto">
                <p className="text-xl font-bold text-slate-900">{formatPrice(item.pricePerMonth, currency)}</p>
                <p className="text-sm text-slate-500">/ month</p>
            </div>
        </CardContent>
    </CardWrapper>
);

const RoomRentCard: React.FC<{ item: RoomRent, onClick: () => void, currency: Currency }> = ({ item, onClick, currency }) => (
    <CardWrapper onClick={onClick}>
        <CardImage src={item.imageUrls[0]} alt={item.name} />
        <CardContent>
            <h3 className="font-bold text-xl mb-2 flex-grow">{item.name}</h3>
            <p className="text-slate-600 text-sm mb-2 flex items-center gap-1"><MapPinIcon className="h-4 w-4 flex-shrink-0"/>{item.location}</p>
            <p className="text-sm font-medium mb-4">{item.bedrooms} bed &bull; {item.bathrooms} bath &bull; {item.furnished}</p>
            <div className="text-right mt-auto">
                <p className="text-xl font-bold text-slate-900">{formatPrice(item.pricePerMonth, currency)}</p>
                <p className="text-sm text-slate-500">/ month</p>
            </div>
        </CardContent>
    </CardWrapper>
);

const HouseRentCard: React.FC<{ item: HouseRent, onClick: () => void, currency: Currency }> = ({ item, onClick, currency }) => (
    <CardWrapper onClick={onClick}>
        <CardImage src={item.imageUrls[0]} alt={item.name} />
        <CardContent>
            <h3 className="font-bold text-xl mb-2 flex-grow">{item.name}</h3>
            <p className="text-slate-600 text-sm mb-2 flex items-center gap-1"><MapPinIcon className="h-4 w-4 flex-shrink-0"/>{item.location}</p>
            <p className="text-sm font-medium mb-4">{item.style} &bull; {item.bedrooms} bed &bull; {item.bathrooms} bath</p>
            <div className="text-right mt-auto">
                <p className="text-xl font-bold text-slate-900">{formatPrice(item.pricePerMonth, currency)}</p>
                <p className="text-sm text-slate-500">/ month</p>
            </div>
        </CardContent>
    </CardWrapper>
);


const PGCard: React.FC<{ item: PG, onClick: () => void, currency: Currency }> = ({ item, onClick, currency }) => (
    <CardWrapper onClick={onClick}>
        <CardImage src={item.imageUrls[0]} alt={item.name} />
        <CardContent>
            <h3 className="font-bold text-xl mb-2 flex-grow">{item.name}</h3>
            <p className="text-slate-600 text-sm mb-2 flex items-center gap-1"><MapPinIcon className="h-4 w-4 flex-shrink-0"/>{item.location}</p>
            <p className="text-sm font-medium mb-4">{item.sharing} Sharing &bull; For {item.for}</p>
            <div className="text-right mt-auto">
                <p className="text-xl font-bold text-slate-900">{formatPrice(item.pricePerBed, currency)}</p>
                <p className="text-sm text-slate-500">/ bed / month</p>
            </div>
        </CardContent>
    </CardWrapper>
);

const OfficeSpaceCard: React.FC<{ item: OfficeSpace, onClick: () => void, currency: Currency }> = ({ item, onClick, currency }) => (
    <CardWrapper onClick={onClick}>
        <CardImage src={item.imageUrls[0]} alt={item.name} />
        <CardContent>
            <h3 className="font-bold text-xl mb-2 flex-grow">{item.name}</h3>
            <p className="text-slate-600 text-sm mb-2 flex items-center gap-1"><MapPinIcon className="h-4 w-4 flex-shrink-0"/>{item.location}</p>
            <p className="text-sm font-medium mb-4">{item.sqft.toLocaleString()} sqft &bull; Capacity: {item.capacity}</p>
            <div className="text-right mt-auto">
                <p className="text-xl font-bold text-slate-900">{formatPrice(item.pricePerMonth, currency)}</p>
                <p className="text-sm text-slate-500">/ month</p>
            </div>
        </CardContent>
    </CardWrapper>
);

const CommercialCard: React.FC<{ item: Commercial, onClick: () => void, currency: Currency }> = ({ item, onClick, currency }) => (
    <CardWrapper onClick={onClick}>
        <CardImage src={item.imageUrls[0]} alt={item.name} />
        <CardContent>
            <h3 className="font-bold text-xl mb-2 flex-grow">{item.name}</h3>
            <p className="text-slate-600 text-sm mb-2 flex items-center gap-1"><MapPinIcon className="h-4 w-4 flex-shrink-0"/>{item.location}</p>
            <p className="text-sm font-medium mb-4">{item.propertyType} &bull; {item.sqft.toLocaleString()} sqft</p>
            <div className="text-right mt-auto">
                <p className="text-xl font-bold text-slate-900">{formatPrice(item.pricePerMonth, currency)}</p>
                <p className="text-sm text-slate-500">/ month</p>
            </div>
        </CardContent>
    </CardWrapper>
);

// ... Loading Spinner ...
const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center py-16 col-span-full">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-slate-800"></div>
    </div>
);

const SearchResults: React.FC<SearchResultsProps> = ({ results, loading, searchType, onNavigate, currency }) => {
    const [priceFilter, setPriceFilter] = useState<string>('');
    const [ratingFilter, setRatingFilter] = useState<number>(0);
    const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);
    
    const allAmenities = useMemo(() => {
        if (searchType !== PropertyType.Resorts) return [];
        const amenitiesSet = new Set<string>();
        results.forEach(result => {
            if (result.type === PropertyType.Resorts) {
                result.amenities.forEach(amenity => amenitiesSet.add(amenity));
            }
        });
        return Array.from(amenitiesSet);
    }, [results, searchType]);

    const handleAmenityChange = (amenity: string) => {
        setAmenitiesFilter(prev => 
            prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
        );
    };
    
    const clearFilters = () => {
        setPriceFilter('');
        setRatingFilter(0);
        setAmenitiesFilter([]);
    };

    const filteredResults = useMemo(() => {
        let items = [...results];

        if (priceFilter) {
            const [min, max] = priceFilter.split('-').map(Number);
            items = items.filter(item => {
                const price = 'pricePerNight' in item ? item.pricePerNight : 'pricePerMonth' in item ? item.pricePerMonth : 'pricePerBed' in item ? item.pricePerBed : Infinity;
                return price >= min && (max ? price <= max : true);
            });
        }

        if (ratingFilter > 0) {
            items = items.filter(item => item.type === PropertyType.Resorts && item.rating >= ratingFilter);
        }

        if (amenitiesFilter.length > 0) {
            items = items.filter(item => 
                item.type === PropertyType.Resorts && amenitiesFilter.every(amenity => item.amenities.includes(amenity))
            );
        }

        return items;
    }, [results, priceFilter, ratingFilter, amenitiesFilter]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (results.length === 0 && !loading) {
        return (
            <div className="text-center py-16">
                <h2 className="text-2xl font-semibold mb-2">Start a new search</h2>
                <p className="text-slate-500">Use the form above or the AI assistant to find your perfect space.</p>
            </div>
        );
    }

    const renderCard = (item: Property) => {
        const props = { key: item.id, onClick: () => onNavigate(`/property/${item.id}`), currency };
        switch (item.type) {
            case PropertyType.Resorts: return <ResortCard {...props} item={item as Resort} />;
            case PropertyType.Rooms: return <RoomCard {...props} item={item as Room} />;
            case PropertyType.RoomRent: return <RoomRentCard {...props} item={item as RoomRent} />;
            case PropertyType.HouseRent: return <HouseRentCard {...props} item={item as HouseRent} />;
            case PropertyType.PGs: return <PGCard {...props} item={item as PG} />;
            case PropertyType.OfficeSpaces: return <OfficeSpaceCard {...props} item={item as OfficeSpace} />;
            case PropertyType.Commercial: return <CommercialCard {...props} item={item as Commercial} />;
            default: return null;
        }
    };
    
    const priceRanges = [
        { label: 'Any', value: '' },
        { label: '< $100', value: '0-100' },
        { label: '$100 - $500', value: '100-500' },
        { label: '$500 - $2000', value: '500-2000' },
        { label: '> $2000', value: '2000-Infinity' },
    ];

    return (
        <div className="container mx-auto px-6 py-12">
            <h2 className="text-3xl font-bold mb-8">Showing results for {searchType}</h2>
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filter Sidebar */}
                <aside className="lg:w-1/4 xl:w-1/5 lg:sticky top-24 self-start">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex justify-between items-center mb-4 border-b pb-4">
                            <h3 className="text-xl font-bold">Filters</h3>
                            <button onClick={clearFilters} className="text-sm font-semibold text-blue-600 hover:text-blue-800">Clear All</button>
                        </div>
                        {/* Price Filter */}
                        <div className="mb-6">
                            <h4 className="font-semibold mb-3">Price Range (USD)</h4>
                            <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg">
                                {priceRanges.map(range => <option key={range.value} value={range.value}>{range.label}</option>)}
                            </select>
                        </div>
                        {/* Rating Filter */}
                        {searchType === PropertyType.Resorts && (
                            <div className="mb-6">
                                <h4 className="font-semibold mb-3">Rating</h4>
                                <div className="space-y-2">
                                    {[5, 4, 3].map(star => (
                                        <label key={star} className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="rating" value={star} checked={ratingFilter === star} onChange={(e) => setRatingFilter(Number(e.target.value))} className="h-4 w-4 text-blue-600 focus:ring-blue-500"/>
                                            <RatingStars rating={star} />
                                            <span className="text-sm text-slate-600">& up</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Amenities Filter */}
                        {searchType === PropertyType.Resorts && allAmenities.length > 0 && (
                             <div className="border-t pt-6">
                                <h4 className="font-semibold mb-3">Amenities</h4>
                                <div className="space-y-2">
                                    {allAmenities.map(amenity => (
                                        <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" checked={amenitiesFilter.includes(amenity)} onChange={() => handleAmenityChange(amenity)} className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500" />
                                            <span className="text-sm text-slate-700">{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
                {/* Results Grid */}
                <main className="flex-1">
                    {filteredResults.length > 0 ? (
                        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                            {filteredResults.map(renderCard)}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-xl shadow-md">
                            <h3 className="text-2xl font-semibold mb-2">No results match your filters</h3>
                            <p className="text-slate-500">Try adjusting or clearing your filters to see more.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default SearchResults;