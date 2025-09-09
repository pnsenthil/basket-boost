import React, { useEffect, useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { useShop } from '../contexts/ShopContext';

export const NudgeCard: React.FC = () => {
  const { currentNudge, addToBasket, dismissNudge, setCurrentNudge } = useShop();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (currentNudge) {
      setIsVisible(true);
      setIsExiting(false);

      // Auto-dismiss after 6 seconds
      const timer = setTimeout(() => {
        handleDismiss();
      }, 6000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [currentNudge]);

  const handleAccept = () => {
    if (currentNudge) {
      currentNudge.candidates.forEach(product => {
        addToBasket(product);
      });
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (currentNudge) {
        dismissNudge(currentNudge.nudge_id);
      }
      setCurrentNudge(null);
      setIsExiting(false);
    }, 300);
  };

  if (!currentNudge || !isVisible) return null;

  const product = currentNudge.candidates[0];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-25" />
      
      {/* Nudge Card */}
      <div className={`absolute bottom-0 left-0 right-0 pointer-events-auto transform transition-transform duration-300 ${
        isExiting ? 'nudge-exit' : 'nudge-show'
      }`}>
        <div className="max-w-md mx-auto bg-white rounded-t-2xl shadow-nudge border-t border-l border-r border-border">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground">{currentNudge.title}</h3>
              <p className="text-sm text-muted-foreground">{currentNudge.reason}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="w-8 h-8 p-0 hover:bg-muted"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Product Details */}
          <div className="p-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-2xl">🛒</div>
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{product.name}</h4>
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-lg font-semibold text-foreground">
                    £{product.price.toFixed(2)}
                  </span>
                  {currentNudge.savings && (
                    <span className="text-sm font-medium text-success bg-success-light px-2 py-1 rounded">
                      {currentNudge.savings}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <Button
                onClick={handleAccept}
                className="flex-1 gradient-primary text-white hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Basket
              </Button>
              
              <Button
                variant="outline"
                onClick={handleDismiss}
                className="px-6"
              >
                Skip
              </Button>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="h-1 bg-muted">
            <div className="h-full bg-primary animate-pulse" style={{
              animation: 'progress 6s linear forwards'
            }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};