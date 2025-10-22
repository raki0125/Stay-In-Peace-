export enum PropertyType {
  Resorts = 'Resorts',
  Rooms = 'Rooms',
  PGs = 'PGs',
  OfficeSpaces = 'Office Spaces',
  Commercial = 'Commercial',
  RoomRent = 'Room Rent',
  HouseRent = 'House Rent',
}

export interface SearchParams {
  type: PropertyType;
  location: string;
  dateFrom?: string;
  guests?: number;
}

export interface Review {
  author: string;
  rating: number;
  comment: string;
}

export interface Resort {
  type: PropertyType.Resorts;
  id: string;
  name: string;
  location: string;
  rating: number;
  pricePerNight: number; // Base price in USD
  imageUrls: string[];
  amenities: string[];
  description: string;
  reviews: Review[];
}

export interface Room {
  type: PropertyType.Rooms;
  id: string;
  name: string;
  location: string;
  pricePerMonth: number; // Base price in USD
  bedrooms: number;
  bathrooms: number;
  imageUrls: string[];
  description: string;
  reviews: Review[];
}

export interface PG {
  type: PropertyType.PGs;
  id:string;
  name: string;
  location: string;
  pricePerBed: number; // Base price in USD
  for: 'Boys' | 'Girls' | 'Co-ed';
  imageUrls: string[];
  sharing: 'Single' | 'Double' | 'Triple';
  description: string;
  reviews: Review[];
}

export interface OfficeSpace {
  type: PropertyType.OfficeSpaces;
  id: string;
  name: string;
  location: string;
  pricePerMonth: number; // Base price in USD
  sqft: number;
  imageUrls: string[];
  capacity: number;
  description: string;
  reviews: Review[];
}

export interface Commercial {
  type: PropertyType.Commercial;
  id: string;
  name: string;
  location: string;
  pricePerMonth: number; // Base price in USD
  sqft: number;
  propertyType: 'Retail' | 'Warehouse' | 'Showroom';
  imageUrls: string[];
  description: string;
  reviews: Review[];
}

export interface RoomRent {
  type: PropertyType.RoomRent;
  id: string;
  name: string;
  location: string;
  pricePerMonth: number; // Base price in USD
  bedrooms: number;
  bathrooms: number;
  imageUrls: string[];
  furnished: 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
  description: string;
  reviews: Review[];
}

export interface HouseRent {
  type: PropertyType.HouseRent;
  id: string;
  name: string;
  location: string;
  pricePerMonth: number; // Base price in USD
  bedrooms: number;
  bathrooms: number;
  imageUrls: string[];
  style: 'Villa' | 'Cottage' | 'Modern' | 'Farmhouse';
  description: string;
  reviews: Review[];
}

export type Property = Resort | Room | PG | OfficeSpace | Commercial | RoomRent | HouseRent;

export interface PropertyCategory {
  name: PropertyType;
  imageUrl: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface FeaturedProperty {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number; // Base price in USD
  priceUnit: string;
  imageUrl: string;
  type: PropertyType;
}

export interface PopularDestination {
  name: string;
  country: string;
  imageUrl: string;
}

export interface Deal {
  imageUrl: string;
  title: string;
  description: string;
  price: string;
}

export interface User {
    name: string;
}

export type Currency = 'USD' | 'EUR' | 'INR';

export interface CurrencyInfo {
    symbol: string;
    rate: number;
}