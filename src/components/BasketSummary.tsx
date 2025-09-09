import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useShop } from '../contexts/ShopContext';

export const BasketSummary: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { basket, totalItems, totalPrice, totalSavings, updateQuantity, removeFromBasket } = useShop();

  if (totalItems === 0) return null;

  return (
    <div className="bg-white border-t border-border shadow-lg">
      {/* Summary Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-accent transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="text-left">
            <div className="font-semibold text-foreground">
              {totalItems} item{totalItems !== 1 ? 's' : ''} • £{totalPrice.toFixed(2)}
            </div>
            {totalSavings > 0 && (
              <div className="text-sm text-success">
                You're saving £{totalSavings.toFixed(2)}
              </div>
            )}
          </div>
        </div>
        
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        ) : (
          <ChevronUp className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {/* Expanded Basket Items */}
      {isExpanded && (
        <div className="border-t border-border max-h-80 overflow-y-auto">
          {basket.map((item) => (
            <div
              key={item.product.product_id}
              className="p-4 border-b border-border last:border-b-0 basket-item-enter"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-foreground truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {item.product.brand}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm font-semibold">
                      £{((item.product.nectar_price || item.product.price) * item.quantity).toFixed(2)}
                    </span>
                    {item.product.nectar_price && (
                      <span className="text-xs text-muted-foreground line-through">
                        £{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2 ml-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.product.product_id, item.quantity - 1)}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity}
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateQuantity(item.product.product_id, item.quantity + 1)}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromBasket(item.product.product_id)}
                    className="w-8 h-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Checkout Button */}
          <div className="p-4 bg-accent">
            <Button className="w-full gradient-primary text-white">
              Proceed to Payment • £{totalPrice.toFixed(2)}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};