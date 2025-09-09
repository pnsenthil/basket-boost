import React from 'react';
import { ShoppingBasket } from 'lucide-react';
import { useShop } from '../contexts/ShopContext';

export const Header: React.FC = () => {
  const { totalItems, totalPrice } = useShop();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <h1 className="text-lg font-semibold text-foreground">SmartShop</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {totalItems > 0 && (
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Total</div>
              <div className="text-sm font-semibold">£{totalPrice.toFixed(2)}</div>
            </div>
          )}
          
          <div className="relative">
            <ShoppingBasket className="w-6 h-6 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};