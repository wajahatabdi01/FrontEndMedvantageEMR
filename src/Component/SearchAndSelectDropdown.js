import React, { useState } from 'react';

function SearchAndSelectDropdown({ options, onSelect }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectOption = option => {
        setSelectedOption(option);
        setSearchQuery('');
        setDropdownOpen(false);
        onSelect(option);
    };

    return (
        <div className="search-select-dropdown">
            <input
                type="text"
                placeholder="Search and select"
                value={searchQuery}
                onClick={() => setDropdownOpen(true)}
                onChange={event => setSearchQuery(event.target.value)}
            />
            {isDropdownOpen && (
                <ul className="dropdown-list">
                    {filteredOptions.map(option => (
                        <li
                            key={option.value}
                            onClick={() => handleSelectOption(option)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
            <div className="selected-option">
                Selected Option: {selectedOption ? selectedOption.label : 'None'}
            </div>
        </div>
    );
}

export default SearchAndSelectDropdown;