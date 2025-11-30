// ============================================
// SearchSelect Component
// ============================================

import React, { useState, useMemo } from 'react';
import { useDebounce } from '@/hooks';

export interface SearchSelectOption {
  value: string;
  label: string;
  metadata?: Record<string, unknown>;
}

export interface SearchSelectProps {
  label?: string;
  options: SearchSelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  searchPlaceholder?: string;
}

export const SearchSelect = React.memo<SearchSelectProps>(
  ({ label, options, value, onChange, placeholder, error, searchPlaceholder = 'Buscar...' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const debouncedSearch = useDebounce(searchTerm, 300);

    const filteredOptions = useMemo(() => {
      if (!debouncedSearch) return options;
      
      return options.filter(option =>
        option.label.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        option.value.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }, [options, debouncedSearch]);

    const selectedOption = options.find(opt => opt.value === value);

    return (
      <div className="w-full relative">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`
              w-full px-3 py-2 border rounded-lg shadow-sm text-left
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              ${error ? 'border-red-500' : 'border-gray-300'}
            `}
          >
            {selectedOption?.label || placeholder || 'Seleccionar...'}
          </button>

          {isOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsOpen(false)}
              />
              
              {/* Dropdown */}
              <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-hidden">
                {/* Search input */}
                <div className="p-2 border-b border-gray-200">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                {/* Options list */}
                <div className="overflow-y-auto max-h-48">
                  {filteredOptions.length === 0 ? (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      No se encontraron resultados
                    </div>
                  ) : (
                    filteredOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          onChange(option.value);
                          setIsOpen(false);
                          setSearchTerm('');
                        }}
                        className={`
                          w-full px-3 py-2 text-left hover:bg-blue-50 transition-colors
                          ${option.value === value ? 'bg-blue-100 font-medium' : ''}
                        `}
                      >
                        {option.label}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

SearchSelect.displayName = 'SearchSelect';
