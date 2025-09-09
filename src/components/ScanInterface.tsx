import React, { useState } from 'react';
import { Scan, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { products, Product } from '../data/products';
import { useShop } from '../contexts/ShopContext';
import { generateNudge } from '../utils/nudgeEngine';

export const ScanInterface: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const { addToBasket, incrementScanCount, setCurrentNudge, scanCount, nudgeCount } = useShop();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductSelect = async (product: Product) => {
    setIsScanning(true);
    
    // Add to basket
    addToBasket(product);
    incrementScanCount();
    
    // Generate nudge after a short delay
    setTimeout(() => {
      const nudge = generateNudge(product, scanCount, nudgeCount);
      if (nudge) {
        setCurrentNudge(nudge);
      }
      setIsScanning(false);
      setSearchTerm('');
    }, 300);
  };

  const handleScanRandom = () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    handleProductSelect(randomProduct);
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Main Scan Button */}
      <div className="text-center space-y-4">
        <Button
          onClick={handleScanRandom}
          disabled={isScanning}
          className={`w-32 h-32 rounded-full gradient-primary text-white shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 ${
            isScanning ? '' : 'scan-pulse'
          }`}
        >
          <div className="flex flex-col items-center space-y-2">
            <Scan className="w-8 h-8" />
            <span className="text-sm font-medium">
              {isScanning ? 'Scanning...' : 'Scan Item'}
            </span>
          </div>
        </Button>
        
        <p className="text-sm text-muted-foreground">
          Tap to scan or search for products below
        </p>
      </div>

      {/* Search Interface */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Product Results */}
        {searchTerm && filteredProducts.length > 0 && (
          <div className="bg-card rounded-lg border border-border shadow-card max-h-60 overflow-y-auto">
            {filteredProducts.slice(0, 5).map((product) => (
              <button
                key={product.product_id}
                onClick={() => handleProductSelect(product)}
                className="w-full p-3 text-left hover:bg-accent transition-colors border-b border-border last:border-b-0 focus:outline-none focus:bg-accent"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.brand} • {product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">£{product.price.toFixed(2)}</p>
                    {product.promo && (
                      <p className="text-xs text-success">{product.promo.value}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};