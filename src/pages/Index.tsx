import React from 'react';
import { Header } from '../components/Header';
import { ScanInterface } from '../components/ScanInterface';
import { BasketSummary } from '../components/BasketSummary';
import { NudgeCard } from '../components/NudgeCard';
import { ShopProvider } from '../contexts/ShopContext';

const Index = () => {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1 pb-20">
          <ScanInterface />
        </main>
        
        <BasketSummary />
        <NudgeCard />
      </div>
    </ShopProvider>
  );
};

export default Index;
