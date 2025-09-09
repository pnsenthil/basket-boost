import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Apple, 
  Beef, 
  Coffee, 
  ShoppingBasket, 
  Milk,
  Search,
  Scan
} from 'lucide-react';
import { Header } from '../components/Header';
import { BasketSummary } from '../components/BasketSummary';
import { NudgeCard } from '../components/NudgeCard';
import { Button } from '../components/ui/button';

const categories = [
  {
    id: 'fresh-produce',
    name: 'Fresh Produce',
    icon: Apple,
    color: 'bg-green-100 text-green-700',
    description: 'Fresh fruits & vegetables'
  },
  {
    id: 'bakery',
    name: 'Bakery',
    icon: Coffee,
    color: 'bg-amber-100 text-amber-700', 
    description: 'Fresh bread & pastries'
  },
  {
    id: 'dairy',
    name: 'Dairy & Eggs',
    icon: Milk,
    color: 'bg-blue-100 text-blue-700',
    description: 'Milk, cheese & dairy products'
  },
  {
    id: 'meat-fish',
    name: 'Meat & Fish',
    icon: Beef,
    color: 'bg-red-100 text-red-700',
    description: 'Fresh meat & seafood'
  },
  {
    id: 'pantry',
    name: 'Pantry Essentials',
    icon: ShoppingBasket,
    color: 'bg-purple-100 text-purple-700',
    description: 'Pasta, rice & store cupboard'
  }
];

const Shop: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <div className="gradient-primary text-white py-8 px-4">
          <div className="max-w-md mx-auto text-center space-y-4">
            <h1 className="text-2xl font-bold">Shop by Category</h1>
            <p className="text-primary-light">Browse our fresh products or use scan to shop</p>
            
            <div className="flex space-x-3 justify-center">
              <Link to="/scan">
                <Button variant="secondary" className="flex items-center space-x-2">
                  <Scan className="w-4 h-4" />
                  <span>Scan to Shop</span>
                </Button>
              </Link>
              
              <Button variant="outline" className="flex items-center space-x-2 border-white text-white hover:bg-white hover:text-primary">
                <Search className="w-4 h-4" />
                <span>Search</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="px-4 py-6 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Browse Categories</h2>
          
          <div className="grid grid-cols-1 gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="block"
                >
                  <div className="bg-white border border-border rounded-lg p-4 shadow-card hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      
                      <div className="text-muted-foreground">
                        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Offers */}
        <div className="px-4 py-6 bg-accent">
          <h2 className="text-xl font-semibold text-foreground mb-4">Today's Offers</h2>
          
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Multi-buy Pasta</h3>
                  <p className="text-sm text-muted-foreground">3 for £2 on selected pasta</p>
                </div>
                <div className="text-success font-semibold">Save £1</div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-foreground">Fresh Bakery</h3>
                  <p className="text-sm text-muted-foreground">2 for £4 on croissants</p>
                </div>
                <div className="text-success font-semibold">Save £1.60</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BasketSummary />
      <NudgeCard />
    </div>
  );
};

export default Shop;