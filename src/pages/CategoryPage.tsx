import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Search } from 'lucide-react';
import { Header } from '../components/Header';
import { BasketSummary } from '../components/BasketSummary';
import { NudgeCard } from '../components/NudgeCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { products } from '../data/products';
import { useShop } from '../contexts/ShopContext';
import { generateNudge } from '../utils/nudgeEngine';

const categoryNames: Record<string, string> = {
  'fresh-produce': 'Fresh Produce',
  'bakery': 'Bakery',
  'dairy': 'Dairy & Eggs', 
  'meat-fish': 'Meat & Fish',
  'pantry': 'Pantry Essentials'
};

const categoryMap: Record<string, string> = {
  'fresh-produce': 'Fresh Produce',
  'bakery': 'Bakery',
  'dairy': 'Dairy',
  'meat-fish': 'Meat & Fish',
  'pantry': 'Pantry Essentials'
};

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const { addToBasket, incrementScanCount, setCurrentNudge, scanCount, nudgeCount } = useShop();
  
  const categoryName = categoryId ? categoryNames[categoryId] : 'Products';
  const mappedCategory = categoryId ? categoryMap[categoryId] : '';
  
  const categoryProducts = products.filter(product => 
    product.category === mappedCategory &&
    (searchTerm === '' || 
     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddToBasket = (product: any) => {
    addToBasket(product);
    incrementScanCount();
    
    // Generate nudge 
    setTimeout(() => {
      const nudge = generateNudge(product, scanCount, nudgeCount);
      if (nudge) {
        setCurrentNudge(nudge);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20">
        {/* Category Header */}
        <div className="bg-white border-b border-border px-4 py-3">
          <div className="max-w-md mx-auto flex items-center space-x-3">
            <Link to="/shop">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold text-foreground">{categoryName}</h1>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-border bg-white">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${categoryName.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="px-4 py-4">
          <div className="max-w-md mx-auto space-y-3">
            {categoryProducts.length > 0 ? (
              categoryProducts.map((product) => (
                <div key={product.product_id} className="bg-white rounded-lg border border-border p-4 shadow-card">
                  <div className="flex items-start space-x-3">
                    {/* Product Image Placeholder */}
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-2xl">
                        {product.category === 'Fresh Produce' ? '🥬' : 
                         product.category === 'Bakery' ? '🍞' :
                         product.category === 'Dairy' ? '🥛' :
                         product.category === 'Meat & Fish' ? '🐟' : '🍝'}
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-lg font-semibold text-foreground">
                          £{product.price.toFixed(2)}
                        </span>
                        {product.nectar_price && (
                          <span className="text-sm text-muted-foreground line-through">
                            £{product.nectar_price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      
                      {product.promo && (
                        <div className="mt-1">
                          <span className="text-xs bg-success-light text-success px-2 py-1 rounded">
                            {product.promo.value}
                          </span>
                        </div>
                      )}
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {product.diet_tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Add Button */}
                    <Button
                      onClick={() => handleAddToBasket(product)}
                      size="sm"
                      className="gradient-primary text-white flex-shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <div className="text-muted-foreground">
                  {searchTerm ? 'No products found matching your search.' : 'No products available in this category.'}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <BasketSummary />
      <NudgeCard />
    </div>
  );
};

export default CategoryPage;