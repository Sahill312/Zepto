import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import './App.css'

interface Chip {
  id: number;
  label: string;
}

const AutocompleteChips: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<Chip[]>([]);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: string[] = [
    'Nick',
    'John',
    'Jay',
    'Aman',
    'Sam',
    'Sahil',
    'Arsh',
    
  ];

  useEffect(() => {
    const newFilteredItems = items.filter(
      (item) => !chips.some((chip) => chip.label === item)
    );
    setFilteredItems(newFilteredItems);
  }, [chips]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    const newFilteredItems = items.filter(
      (item) =>
        !chips.some((chip) => chip.label === item) &&
        item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(newFilteredItems);
    setShowDropdown(true);
  };

  const handleItemClick = (item: string) => {
    const newChips = [...chips, { id: Date.now(), label: item }];
    setChips(newChips);
    setInputValue('');
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const handleChipRemove = (id: number) => {
    const updatedChips = chips.filter((chip) => chip.id !== id);
    setChips(updatedChips);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && inputValue === '' && chips.length > 0) {
      const lastChip = chips[chips.length - 1];
      if (lastChip) {
        handleChipRemove(lastChip.id);
      }
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div>
      <div className="chip-container">
        {chips.map((chip) => (
          <div key={chip.id} className="chip">
            {chip.label}
            <span onClick={() => handleChipRemove(chip.id)} className="chip-remove">
              X
            </span>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          ref={inputRef}
        />
      </div>
      {showDropdown && (
        <div className="custom-dropdown" onBlur={closeDropdown}>
          {filteredItems.map((item) => (
            <div key={item} onClick={() => handleItemClick(item)}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteChips;
