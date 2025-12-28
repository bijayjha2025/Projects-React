import { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            if(query) {
                onSearch(query);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [query, onSearch]);

    return(
        <div className='max-w-2xl mx-auto px-4'>
            <input type='text' value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search recipes' className='w-full px-6 py-3 rounded-lg border-gray-300 border-2 focus:outline-none focus:border-[#58e633] font-share'/>
        </div>
    );
};

export default SearchBar;