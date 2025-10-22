import React, { useState, useEffect, useCallback } from 'react';
import { PropertyType, SearchParams } from '../types';
import { BedIcon, KeyIcon, BuildingIcon, BriefcaseIcon, StoreIcon, MapPinIcon, CalendarIcon, UsersIcon, HomeIcon, HouseIcon } from './IconComponents';

interface SearchTabsProps {
  onSearch: (params: SearchParams) => void;
  initialValues?: Partial<SearchParams>;
}

const SearchTabs: React.FC<SearchTabsProps> = ({ onSearch, initialValues }) => {
  const [activeTab, setActiveTab] = useState<PropertyType>(PropertyType.Resorts);
  const [location, setLocation] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [guests, setGuests] = useState(1);

  const setInitialValues = useCallback((values?: Partial<SearchParams>) => {
    if (values) {
      setActiveTab(values.type || PropertyType.Resorts);
      setLocation(values.location || '');
      setDateFrom(values.dateFrom || '');
      setGuests(values.guests || 1);
    }
  }, []);

  useEffect(() => {
    setInitialValues(initialValues);
  }, [initialValues, setInitialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params: SearchParams = {
      type: activeTab,
      location,
      guests,
      dateFrom,
    };
    onSearch(params);
  };
  
  const getToday = () => new Date().toISOString().split('T')[0];

  const renderForm = () => {
    const showDatePicker = [PropertyType.Resorts, PropertyType.Rooms, PropertyType.RoomRent, PropertyType.HouseRent].includes(activeTab);
    return (
      <>
        <div className="relative flex-grow">
            <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input type="text" placeholder="Location (e.g., 'New York')" value={location} onChange={e => setLocation(e.target.value)} required className="w-full h-12 pl-10 pr-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
        </div>
        {showDatePicker ? (
            <div className="relative flex-grow">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} min={getToday()} className="w-full h-12 pl-10 pr-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
            </div>
        ) : null}
      </>
    );
  }

  const TabButton: React.FC<{ type: PropertyType; icon: React.ReactNode; children: React.ReactNode }> = ({ type, icon, children }) => (
    <button
      onClick={() => setActiveTab(type)}
      className={`flex items-center space-x-2 px-3 py-3 font-semibold rounded-t-lg transition-colors text-sm md:text-base ${
        activeTab === type
          ? 'bg-white text-slate-900'
          : 'bg-transparent text-slate-500 hover:text-slate-800'
      }`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );

  return (
    <div className="container mx-auto px-6 -mt-20 relative z-30">
        <div className="flex flex-wrap">
            <TabButton type={PropertyType.Resorts} icon={<BedIcon className="h-5 w-5"/>}>{PropertyType.Resorts}</TabButton>
            <TabButton type={PropertyType.Rooms} icon={<KeyIcon className="h-5 w-5"/>}>{PropertyType.Rooms}</TabButton>
            <TabButton type={PropertyType.RoomRent} icon={<HomeIcon className="h-5 w-5"/>}>{PropertyType.RoomRent}</TabButton>
            <TabButton type={PropertyType.HouseRent} icon={<HouseIcon className="h-5 w-5" />}>Houses</TabButton>
            <TabButton type={PropertyType.PGs} icon={<BuildingIcon className="h-5 w-5"/>}>{PropertyType.PGs}</TabButton>
            <TabButton type={PropertyType.OfficeSpaces} icon={<BriefcaseIcon className="h-5 w-5"/>}>{PropertyType.OfficeSpaces}</TabButton>
            <TabButton type={PropertyType.Commercial} icon={<StoreIcon className="h-5 w-5"/>}>{PropertyType.Commercial}</TabButton>
        </div>
        <div className="bg-white p-6 rounded-b-lg rounded-r-lg shadow-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-center gap-4">
                {renderForm()}
                {activeTab === PropertyType.Resorts && (
                  <div className="relative flex-grow md:flex-grow-0">
                      <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <select value={guests} onChange={e => setGuests(parseInt(e.target.value))} className="w-full md:w-40 h-12 pl-10 pr-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none">
                          {[...Array(8)].map((_, i) => <option key={i+1} value={i+1}>{i+1} Guest{i > 0 ? 's' : ''}</option>)}
                      </select>
                  </div>
                )}
                <button type="submit" className="bg-slate-800 text-white font-bold h-12 px-8 rounded-lg hover:bg-slate-700 transition-colors flex-shrink-0">
                    Search
                </button>
            </form>
        </div>
    </div>
  );
};

export default SearchTabs;