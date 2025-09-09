import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, UserProfile, Nudge, defaultUserProfile } from '../data/products';

interface BasketItem {
  product: Product;
  quantity: number;
}

interface ShopContextType {
  basket: BasketItem[];
  totalItems: number;
  totalPrice: number;
  totalSavings: number;
  scanCount: number;
  nudgeCount: number;
  userProfile: UserProfile;
  currentNudge: Nudge | null;
  dismissedNudges: string[];
  
  addToBasket: (product: Product, quantity?: number) => void;
  removeFromBasket: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  setCurrentNudge: (nudge: Nudge | null) => void;
  dismissNudge: (nudgeId: string) => void;
  incrementScanCount: () => void;
  setUserProfile: (profile: UserProfile) => void;
}

const ShopContext = createContext<ShopContextType | null>(null);

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [scanCount, setScanCount] = useState(0);
  const [nudgeCount, setNudgeCount] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
  const [currentNudge, setCurrentNudge] = useState<Nudge | null>(null);
  const [dismissedNudges, setDismissedNudges] = useState<string[]>([]);

  // Load data from sessionStorage on mount
  useEffect(() => {
    const savedBasket = sessionStorage.getItem('smartshop_basket');
    const savedScanCount = sessionStorage.getItem('smartshop_scanCount');
    const savedNudgeCount = sessionStorage.getItem('smartshop_nudgeCount');
    const savedProfile = sessionStorage.getItem('smartshop_profile');
    const savedDismissed = sessionStorage.getItem('smartshop_dismissed');

    if (savedBasket) setBasket(JSON.parse(savedBasket));
    if (savedScanCount) setScanCount(parseInt(savedScanCount));
    if (savedNudgeCount) setNudgeCount(parseInt(savedNudgeCount));
    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    if (savedDismissed) setDismissedNudges(JSON.parse(savedDismissed));
  }, []);

  // Save to sessionStorage when data changes
  useEffect(() => {
    sessionStorage.setItem('smartshop_basket', JSON.stringify(basket));
  }, [basket]);

  useEffect(() => {
    sessionStorage.setItem('smartshop_scanCount', scanCount.toString());
  }, [scanCount]);

  useEffect(() => {
    sessionStorage.setItem('smartshop_nudgeCount', nudgeCount.toString());
  }, [nudgeCount]);

  useEffect(() => {
    sessionStorage.setItem('smartshop_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    sessionStorage.setItem('smartshop_dismissed', JSON.stringify(dismissedNudges));
  }, [dismissedNudges]);

  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);
  
  const totalPrice = basket.reduce((sum, item) => {
    const price = item.product.nectar_price || item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const totalSavings = basket.reduce((sum, item) => {
    if (item.product.nectar_price) {
      return sum + ((item.product.price - item.product.nectar_price) * item.quantity);
    }
    // Add multi-buy savings calculation here
    return sum;
  }, 0);

  const addToBasket = (product: Product, quantity: number = 1) => {
    setBasket(prev => {
      const existingItem = prev.find(item => item.product.product_id === product.product_id);
      if (existingItem) {
        return prev.map(item =>
          item.product.product_id === product.product_id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromBasket = (productId: string) => {
    setBasket(prev => prev.filter(item => item.product.product_id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromBasket(productId);
      return;
    }
    setBasket(prev =>
      prev.map(item =>
        item.product.product_id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const dismissNudge = (nudgeId: string) => {
    setDismissedNudges(prev => [...prev, nudgeId]);
    setCurrentNudge(null);
  };

  const incrementScanCount = () => {
    setScanCount(prev => prev + 1);
  };

  const handleSetCurrentNudge = (nudge: Nudge | null) => {
    setCurrentNudge(nudge);
    if (nudge) {
      setNudgeCount(prev => prev + 1);
    }
  };

  return (
    <ShopContext.Provider value={{
      basket,
      totalItems,
      totalPrice,
      totalSavings,
      scanCount,
      nudgeCount,
      userProfile,
      currentNudge,
      dismissedNudges,
      addToBasket,
      removeFromBasket,
      updateQuantity,
      setCurrentNudge: handleSetCurrentNudge,
      dismissNudge,
      incrementScanCount,
      setUserProfile
    }}>
      {children}
    </ShopContext.Provider>
  );
};