import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GeminiTravelAssistant from './components/GeminiTravelAssistant';
import LoginModal from './components/LoginModal';
import { PropertyType, SearchParams, Property, FeaturedProperty, User, Resort, Room, PG, OfficeSpace, Commercial, RoomRent, HouseRent, Currency, PopularDestination, Deal, Review } from './types';
import { BedIcon, BriefcaseIcon, BuildingIcon, KeyIcon, StoreIcon, HomeIcon, HouseIcon } from './components/IconComponents';

// Page Components
import HomePage from './pages/HomePage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';


const CITIES = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
const RESORT_NAMES = ['Paradise', 'Oasis', 'Serenity', 'Dream', 'Azure', 'Golden', 'Royal', 'Coastal', 'Mountain', 'Lakeside'];
const ROOM_ADJECTIVES = ['Cozy', 'Spacious', 'Modern', 'Charming', 'Sunlit', 'Urban', 'Quiet', 'Luxury', 'Bright', 'Stylish'];
const ROOM_RENT_ADJECTIVES = ['Affordable', 'Private', 'Shared', 'Student', 'Executive', 'Central', 'Peaceful'];
const HOUSE_STYLES = ['Modern Villa', 'Cozy Cottage', 'Urban Townhouse', 'Suburban Family Home', 'Rustic Farmhouse', 'Beachfront Bungalow'];
const PG_NAMES = ['Unity', 'Stanza', 'Orion', 'Apex', 'Zolo', 'Hive', 'Tribe', 'Nest', 'Campus', 'Metro'];
const OFFICE_PREFIX = ['Innovate', 'Synergy', 'Nexus', 'Venture', 'Global', 'Prime', 'Regal', 'Momentum', 'Catalyst', 'Apex'];
const COMMERCIAL_PREFIX = ['Metro', 'City', 'Downtown', 'Grand', 'Union', 'Central', 'Plaza', 'Tower', 'Landmark', 'Corner'];
const ALL_AMENITIES = ['Pool', 'Spa', 'Free WiFi', 'Gym', 'Restaurant', 'Parking', 'Pet Friendly', 'Beach Access'];
const LOREM_IPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const generateReviews = (): Review[] => {
    const reviewCount = Math.floor(Math.random() * 5) + 3;
    const authors = ['John D.', 'Jane S.', 'Mike R.', 'Emily B.', 'Chris G.'];
    const comments = ['Amazing place!', 'Great value for money.', 'Would definitely recommend.', 'Location is perfect.', 'Very clean and modern.'];
    return Array.from({ length: reviewCount }, (_, i) => ({
        author: authors[i % authors.length],
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
        comment: comments[i % comments.length],
    }));
};

const RESORT_IMAGES = [
    ['https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop'],
    ['https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop', 'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2070&auto=format&fit=crop']
];
const ROOM_IMAGES = [
    ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop']
];
const ROOM_RENT_IMAGES = [
    ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1595526114035-0d45ed16da31?q=80&w=1974&auto=format&fit=crop', 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop']
];
const HOUSE_IMAGES = [
    ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop', 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop']
];
const PG_IMAGES = [
    ['https://images.unsplash.com/photo-1593349480503-685d3a5a2185?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1555854877-bab0b56448d1?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1627222295940-aae127618a4a?q=80&w=1986&auto=format&fit=crop']
];
const OFFICE_IMAGES = [
    ['https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop']
];
const COMMERCIAL_IMAGES = [
    ['https://images.unsplash.com/photo-1449247709967-d4461a6a6103?q=80&w=2071&auto=format&fit=crop', 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop']
];


const generateMockData = (params: SearchParams): Property[] => {
    const results: Property[] = [];
    const count = Math.floor(Math.random() * 20) + 50; // 50 to 69 results

    for (let i = 0; i < count; i++) {
        const id = `${params.type.replace(/\s+/g, '-')}-${i}`;
        const location = params.location || CITIES[i % CITIES.length];
        const reviews = generateReviews();
        const description = LOREM_IPSUM;
        
        switch (params.type) {
            case PropertyType.Resorts:
                const numAmenities = Math.floor(Math.random() * 4) + 2;
                const amenities = [...ALL_AMENITIES].sort(() => 0.5 - Math.random()).slice(0, numAmenities);
                results.push({
                    type: PropertyType.Resorts, id, location, reviews, description,
                    name: `${RESORT_NAMES[i % RESORT_NAMES.length]} Resort & Spa`,
                    rating: Math.floor(Math.random() * 3) + 3,
                    pricePerNight: Math.floor(Math.random() * 400) + 150,
                    imageUrls: RESORT_IMAGES[i % RESORT_IMAGES.length],
                    amenities,
                } as Resort);
                break;
            case PropertyType.Rooms:
                const bedrooms = Math.floor(Math.random() * 3) + 1;
                results.push({
                    type: PropertyType.Rooms, id, location, reviews, description,
                    name: `${ROOM_ADJECTIVES[i % ROOM_ADJECTIVES.length]} ${bedrooms}-Bedroom Apartment`,
                    pricePerMonth: Math.floor(Math.random() * 3000) + 1500,
                    bedrooms,
                    bathrooms: Math.max(1, bedrooms - 1),
                    imageUrls: ROOM_IMAGES[i % ROOM_IMAGES.length],
                } as Room);
                break;
             case PropertyType.RoomRent:
                results.push({
                    type: PropertyType.RoomRent, id, location, reviews, description,
                    name: `${ROOM_RENT_ADJECTIVES[i % ROOM_RENT_ADJECTIVES.length]} Room for Rent`,
                    pricePerMonth: Math.floor(Math.random() * 800) + 400,
                    bedrooms: 1,
                    bathrooms: 1,
                    furnished: ['Furnished', 'Semi-Furnished', 'Unfurnished'][i % 3] as any,
                    imageUrls: ROOM_RENT_IMAGES[i % ROOM_RENT_IMAGES.length],
                } as RoomRent);
                break;
            case PropertyType.HouseRent:
                const houseBedrooms = Math.floor(Math.random() * 4) + 2;
                results.push({
                    type: PropertyType.HouseRent, id, location, reviews, description,
                    name: `${HOUSE_STYLES[i % HOUSE_STYLES.length]} in ${location}`,
                    pricePerMonth: Math.floor(Math.random() * 5000) + 2500,
                    bedrooms: houseBedrooms,
                    bathrooms: Math.max(1, houseBedrooms - 1),
                    style: HOUSE_STYLES[i % HOUSE_STYLES.length].split(' ')[1].toLowerCase() as any,
                    imageUrls: HOUSE_IMAGES[i % HOUSE_IMAGES.length],
                } as HouseRent);
                break;
            case PropertyType.PGs:
                results.push({
                    type: PropertyType.PGs, id, location, reviews, description,
                    name: `${PG_NAMES[i % PG_NAMES.length]} Stays`,
                    pricePerBed: Math.floor(Math.random() * 500) + 300,
                    for: ['Boys', 'Girls', 'Co-ed'][i % 3] as any,
                    sharing: ['Single', 'Double', 'Triple'][i % 3] as any,
                    imageUrls: PG_IMAGES[i % PG_IMAGES.length],
                } as PG);
                break;
            case PropertyType.OfficeSpaces:
                results.push({
                    type: PropertyType.OfficeSpaces, id, location, reviews, description,
                    name: `${OFFICE_PREFIX[i % OFFICE_PREFIX.length]} Business Center`,
                    pricePerMonth: Math.floor(Math.random() * 8000) + 2000,
                    sqft: Math.floor(Math.random() * 4000) + 1000,
                    capacity: Math.floor(Math.random() * 40) + 10,
                    imageUrls: OFFICE_IMAGES[i % OFFICE_IMAGES.length],
                } as OfficeSpace);
                break;
            case PropertyType.Commercial:
                results.push({
                    type: PropertyType.Commercial, id, location, reviews, description,
                    name: `${COMMERCIAL_PREFIX[i % COMMERCIAL_PREFIX.length]} Retail Space`,
                    pricePerMonth: Math.floor(Math.random() * 15000) + 5000,
                    sqft: Math.floor(Math.random() * 8000) + 2000,
                    propertyType: ['Retail', 'Warehouse', 'Showroom'][i % 3] as any,
                    imageUrls: COMMERCIAL_IMAGES[i % COMMERCIAL_IMAGES.length],
                } as Commercial);
                break;
        }
    }
    return results;
}

const propertyCategories = [
    { name: PropertyType.Resorts, imageUrl: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?q=80&w=1935&auto=format&fit=crop', icon: BedIcon },
    { name: PropertyType.Rooms, imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop', icon: KeyIcon },
    { name: PropertyType.HouseRent, imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop', icon: HouseIcon },
    { name: PropertyType.PGs, imageUrl: 'https://images.unsplash.com/photo-1600579157249-3a3d43f2a74c?q=80&w=2070&auto=format&fit=crop', icon: BuildingIcon },
    { name: PropertyType.OfficeSpaces, imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop', icon: BriefcaseIcon },
    { name: PropertyType.Commercial, imageUrl: 'https://images.unsplash.com/photo-1577413444983-c088855bf7e4?q=80&w=2070&auto=format&fit=crop', icon: StoreIcon },
];

const featuredPropertiesData: FeaturedProperty[] = [
    { id: 'feat1', type: PropertyType.Resorts, name: 'Serenity Bay Resort', category: 'Luxury Resort', location: 'Maldives', price: 899, priceUnit: '/night', imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?q=80&w=2070&auto=format&fit=crop' },
    { id: 'feat2', type: PropertyType.OfficeSpaces, name: 'Innovate Hub Downtown', category: 'Co-working Space', location: 'San Francisco', price: 5000, priceUnit: '/month', imageUrl: 'https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2070&auto=format&fit=crop' },
    { id: 'feat3', type: PropertyType.HouseRent, name: 'The Urban Villa', category: '3-Bedroom House', location: 'New York', price: 6500, priceUnit: '/month', imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop' },
];

const popularDestinationsData: PopularDestination[] = [
    { name: 'Paris', country: 'France', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760c0337?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Kyoto', country: 'Japan', imageUrl: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Rome', country: 'Italy', imageUrl: 'https://images.unsplash.com/photo-1529171735102-7756244cb36a?q=80&w=1964&auto=format&fit=crop' },
    { name: 'Bali', country: 'Indonesia', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975256?q=80&w=1974&auto=format&fit=crop' },
];

const exclusiveDealsData: Deal[] = [
    { imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop', title: '7-Night Stay in a Luxury Villa', description: 'Experience the ultimate relaxation with our all-inclusive villa package.', price: '$2,499' },
    { imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop', title: 'Weekend Spa Getaway', description: 'Rejuvenate your senses with a weekend of spa treatments and fine dining.', price: '$799' },
    { imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop', title: 'Mountain View Chalet', description: 'Escape to the mountains and enjoy breathtaking views from your private chalet.', price: '$1,299' },
];


const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearchType, setCurrentSearchType] = useState<PropertyType>(PropertyType.Resorts);
  const [aiSearchParams, setAiSearchParams] = useState<Partial<SearchParams> | undefined>(undefined);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cart, setCart] = useState<Property[]>([]);
  
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', onLocationChange);
    return () => window.removeEventListener('popstate', onLocationChange);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setPathname(path);
  };
  
  const allProperties = React.useRef<Map<string, Property>>(new Map());

  const handleSearch = useCallback((params: SearchParams) => {
    setIsLoading(true);
    setCurrentSearchType(params.type);
    setAiSearchParams(params);
    setSearchResults([]); 
    navigate('/');

    setTimeout(() => {
      const mockData = generateMockData(params);
      mockData.forEach(item => allProperties.current.set(item.id, item));
      setSearchResults(mockData);
      setIsLoading(false);
    }, 1500);
  }, []);
  
  const handleAiSearch = useCallback((params: Partial<SearchParams>) => {
    if(params.type && params.location) {
        handleSearch(params as SearchParams);
    } else {
        setAiSearchParams(params);
    }
  }, [handleSearch]);

  const handleNavSearch = useCallback((type: PropertyType) => {
    handleSearch({ type, location: '', guests: 1 });
  }, [handleSearch]);

  const handleLogin = (user: User) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    setIsLoginModalOpen(false);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  }

  const addToCart = (item: Property) => {
      if (!cart.some(cartItem => cartItem.id === item.id)) {
          setCart(prevCart => [...prevCart, item]);
      }
      navigate('/cart');
  };

  const removeFromCart = (itemId: string) => {
      setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };
  
  const clearCart = () => {
    setCart([]);
  }

  const renderPage = () => {
    const propertyMatch = pathname.match(/^\/property\/(.+)/);
    
    if (propertyMatch) {
      const propertyId = propertyMatch[1];
      const property = allProperties.current.get(propertyId);
      
      if (property) {
        return <PropertyDetailPage property={property} currency={currency} onAddToCart={addToCart} onNavigate={navigate} />;
      }
    }
    
    if (pathname === '/cart') {
      return <CartPage cartItems={cart} currency={currency} onRemoveItem={removeFromCart} onNavigate={navigate} />;
    }
    
    if (pathname === '/checkout') {
        return <CheckoutPage cartItems={cart} currency={currency} onNavigate={navigate} onCheckoutSuccess={clearCart} />
    }
    
    // Default to HomePage
    return <HomePage 
        aiSearchParams={aiSearchParams}
        searchResults={searchResults}
        isLoading={isLoading}
        currentSearchType={currentSearchType}
        currency={currency}
        handleSearch={handleSearch}
        handleNavSearch={handleNavSearch}
        navigate={navigate}
        propertyCategories={propertyCategories}
        featuredPropertiesData={featuredPropertiesData}
        popularDestinationsData={popularDestinationsData}
        exclusiveDealsData={exclusiveDealsData}
    />
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        isLoggedIn={isLoggedIn} 
        user={currentUser} 
        cartCount={cart.length}
        onSignInClick={() => setIsLoginModalOpen(true)} 
        onLogout={handleLogout}
        onNavSearch={handleNavSearch}
        onNavigate={navigate}
        onCurrencyChange={setCurrency}
        currentCurrency={currency}
      />
      <main className="flex-grow pt-20">
        {renderPage()}
      </main>
      <GeminiTravelAssistant onAiSearch={handleAiSearch} />
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
      <Footer />
    </div>
  );
};

export default App;