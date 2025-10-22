import React from 'react';
import Hero from '../components/Hero';
import SearchTabs from '../components/SearchTabs';
import SearchResults from '../components/SearchResults';
import PropertyCategories from '../components/PropertyCategories';
import FeaturedProperties from '../components/FeaturedProperties';
import PopularDestinations from '../components/PopularDestinations';
import ExclusiveDeals from '../components/ExclusiveDeals';
import { Property, SearchParams, PropertyType, Currency, FeaturedProperty, PopularDestination, Deal, PropertyCategory } from '../types';

interface HomePageProps {
    aiSearchParams: Partial<SearchParams> | undefined;
    searchResults: Property[];
    isLoading: boolean;
    currentSearchType: PropertyType;
    currency: Currency;
    handleSearch: (params: SearchParams) => void;
    handleNavSearch: (type: PropertyType) => void;
    navigate: (path: string) => void;
    propertyCategories: PropertyCategory[];
    featuredPropertiesData: FeaturedProperty[];
    popularDestinationsData: PopularDestination[];
    exclusiveDealsData: Deal[];
}

const HomePage: React.FC<HomePageProps> = ({
    aiSearchParams,
    searchResults,
    isLoading,
    currentSearchType,
    currency,
    handleSearch,
    handleNavSearch,
    navigate,
    propertyCategories,
    featuredPropertiesData,
    popularDestinationsData,
    exclusiveDealsData,
}) => {
    return (
        <>
            <Hero />
            <SearchTabs onSearch={handleSearch} initialValues={aiSearchParams}/>
            {searchResults.length > 0 || isLoading ? (
                <SearchResults 
                    results={searchResults} 
                    loading={isLoading} 
                    searchType={currentSearchType} 
                    onNavigate={navigate}
                    currency={currency}
                />
            ) : (
                <>
                    <PropertyCategories categories={propertyCategories} />
                    <FeaturedProperties 
                        properties={featuredPropertiesData} 
                        onSelectProperty={(p) => handleSearch({type: p.type, location: p.location})}
                        currency={currency}
                    />
                    <PopularDestinations destinations={popularDestinationsData} />
                    <ExclusiveDeals deals={exclusiveDealsData} />
                </>
            )}
        </>
    );
};

export default HomePage;
