import React, { useState } from 'react';
import { Property, Currency, CurrencyInfo, Review, PropertyType } from '../types';
import { StarIcon, MapPinIcon, ArrowLeftIcon } from '../components/IconComponents';

const CURRENCIES: Record<Currency, CurrencyInfo> = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.93 },
    INR: { symbol: '₹', rate: 83.5 },
};

const formatPrice = (priceInUsd: number, currency: Currency) => {
    const { symbol, rate } = CURRENCIES[currency];
    return `${symbol}${(priceInUsd * rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
};

const RatingStars: React.FC<{ rating: number, showLabel?: boolean }> = ({ rating, showLabel = true }) => (
    <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className="h-5 w-5 text-yellow-400" filled={i < Math.round(rating)} />
        ))}
        {showLabel && <span className="ml-2 text-sm text-slate-600">{rating.toFixed(1)}</span>}
    </div>
);

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
    <div className="bg-slate-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
            <div className="font-semibold">{review.author}</div>
            <div className="ml-auto flex-shrink-0">
                <RatingStars rating={review.rating} showLabel={false} />
            </div>
        </div>
        <p className="text-slate-700 text-sm">{review.comment}</p>
    </div>
);


interface PropertyDetailPageProps {
    property: Property;
    currency: Currency;
    onAddToCart: (property: Property) => void;
    onNavigate: (path: string) => void;
}

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ property, currency, onAddToCart, onNavigate }) => {
    const [mainImage, setMainImage] = useState(property.imageUrls[0]);

    const getPrice = () => {
        switch (property.type) {
            case PropertyType.Resorts: return property.pricePerNight;
            case PropertyType.Rooms:
            case PropertyType.RoomRent:
            case PropertyType.HouseRent:
            case PropertyType.OfficeSpaces:
            case PropertyType.Commercial:
                return property.pricePerMonth;
            case PropertyType.PGs: return property.pricePerBed;
            default: return 0;
        }
    };

    const getPriceUnit = () => {
        switch (property.type) {
            case PropertyType.Resorts: return "/ night";
            case PropertyType.PGs: return "/ bed / month";
            default: return "/ month";
        }
    };

    const renderPropertySpecifics = () => {
        const specifics = [];
        if ('bedrooms' in property && property.bedrooms) specifics.push(`${property.bedrooms} bed`);
        if ('bathrooms' in property && property.bathrooms) specifics.push(`${property.bathrooms} bath`);
        if ('sqft' in property && property.sqft) specifics.push(`${property.sqft.toLocaleString()} sqft`);
        if ('capacity' in property && property.capacity) specifics.push(`Capacity: ${property.capacity}`);
        if ('style' in property && property.style) specifics.push(property.style);
        if ('furnished' in property && property.furnished) specifics.push(property.furnished);
        if ('sharing' in property && property.sharing) specifics.push(`${property.sharing} Sharing`);
        if ('for' in property && property.for) specifics.push(`For ${property.for}`);
        if ('propertyType' in property && property.propertyType) specifics.push(property.propertyType);
    
        if (specifics.length === 0) return null;
    
        return (
          <div className="flex items-center text-slate-600 space-x-2 text-sm md:text-base flex-wrap">
            {specifics.map((spec, index) => (
              <React.Fragment key={index}>
                <span>{spec}</span>
                {index < specifics.length - 1 && <span className="text-slate-400">&bull;</span>}
              </React.Fragment>
            ))}
          </div>
        );
      };

    return (
        <div className="container mx-auto px-6 py-8">
             <button onClick={() => onNavigate('/')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-6">
                <ArrowLeftIcon className="h-5 w-5" />
                Back to search
            </button>
            {/* Image Gallery */}
            <div className="mb-8">
                <div className="rounded-2xl overflow-hidden mb-4 h-[300px] md:h-[500px] bg-slate-200">
                    <img src={mainImage} alt={property.name} className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-5 gap-4">
                    {property.imageUrls.map((url, index) => (
                        <button key={index} onClick={() => setMainImage(url)} className={`rounded-lg overflow-hidden h-24 w-full focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all ${mainImage === url ? 'ring-4 ring-blue-500' : 'opacity-70 hover:opacity-100'}`}>
                            <img src={url} alt={`${property.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <p className="text-blue-600 font-semibold">{property.type}</p>
                        <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{property.name}</h1>
                        <div className="flex items-center gap-2 text-slate-600 mb-4">
                            <MapPinIcon className="h-5 w-5 flex-shrink-0" /> {property.location}
                        </div>
                        <div className="mt-4 mb-6">
                            {renderPropertySpecifics()}
                        </div>
                        <div className="border-t border-b py-6 my-6">
                            <h2 className="text-2xl font-bold mb-4">About this space</h2>
                            <p className="text-slate-700 leading-relaxed">{property.description}</p>
                        </div>
                        {property.type === PropertyType.Resorts && 'amenities' in property && property.amenities.length > 0 && (
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {property.amenities.map(amenity => <div key={amenity} className="bg-slate-100 text-slate-800 text-center py-2 px-3 rounded-lg">{amenity}</div>)}
                                </div>
                            </div>
                        )}
                        <div>
                            <h2 className="text-2xl font-bold mb-4">Reviews ({property.reviews.length})</h2>
                            <div className="space-y-4">
                                {property.reviews.map((review, index) => <ReviewCard key={index} review={review} />)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Widget */}
                <div className="lg:sticky top-28 self-start">
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <div className="flex items-baseline mb-4">
                            <p className="text-3xl font-bold">{formatPrice(getPrice(), currency)}</p>
                            <p className="text-slate-500 ml-2">{getPriceUnit()}</p>
                        </div>
                        <button 
                            onClick={() => onAddToCart(property)}
                            className="w-full bg-slate-800 text-white font-bold py-4 rounded-lg hover:bg-slate-700 transition-colors text-lg"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailPage;
