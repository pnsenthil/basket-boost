import React from 'react';
import { Link } from 'react-router-dom';
import { Scan, ShoppingCart, Store } from 'lucide-react';
import { Header } from '../components/Header';
import { ScanInterface } from '../components/ScanInterface';
import { BasketSummary } from '../components/BasketSummary';
import { NudgeCard } from '../components/NudgeCard';
import { Button } from '../components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="gradient-primary text-white py-12 px-4">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
            <Scan className="w-10 h-10 text-white" />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold mb-2">SmartShop</h1>
            <p className="text-primary-light text-lg">Scan, save, and shop smarter with personalized offers</p>
          </div>
          
          <div className="space-y-3">
            <Link to="/shop" className="block">
              <Button size="lg" variant="secondary" className="w-full flex items-center justify-center space-x-2">
                <Store className="w-5 h-5" />
                <span>Browse Categories</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <main className="flex-1 pb-20">
        <ScanInterface />
      </main>
      
      <BasketSummary />
      <NudgeCard />
    </div>
  );
};

export default Index;
