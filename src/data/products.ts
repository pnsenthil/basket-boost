export interface Product {
  product_id: string;
  name: string;
  brand: string;
  category: string;
  sub_category: string;
  tags: string[];
  diet_tags: string[];
  price: number;
  nectar_price?: number;
  promo?: {
    type: 'multi_buy' | 'percentage' | 'fixed_amount';
    value: string;
    threshold?: number;
    group_id?: string;
  };
  value_band: 'value' | 'mid' | 'premium';
  is_in_stock: boolean;
  image_url?: string;
}

export interface UserProfile {
  diet_tags: string[];
  avoid_brands: string[];
  value_bias: 'value' | 'mid' | 'premium';
  budget_band: 'tight' | 'normal';
}

export interface Nudge {
  nudge_id: string;
  type: 'complement' | 'multi_buy' | 'substitute' | 'trade_up' | 'mission';
  title: string;
  reason: string;
  candidates: Product[];
  savings: string;
  trigger_product_id: string;
}

export const products: Product[] = [
  // Fresh Produce
  {
    product_id: "prod_001",
    name: "Organic Bananas",
    brand: "Sainsburys",
    category: "Fresh Produce",
    sub_category: "Fruit",
    tags: ["organic", "fresh"],
    diet_tags: ["vegan", "gluten-free"],
    price: 1.20,
    value_band: "mid",
    is_in_stock: true
  },
  {
    product_id: "prod_002", 
    name: "British Apples",
    brand: "Sainsburys",
    category: "Fresh Produce",
    sub_category: "Fruit", 
    tags: ["british", "fresh"],
    diet_tags: ["vegan", "gluten-free"],
    price: 2.50,
    value_band: "mid",
    is_in_stock: true
  },
  {
    product_id: "prod_003",
    name: "Baby Spinach",
    brand: "Sainsburys",
    category: "Fresh Produce", 
    sub_category: "Salad",
    tags: ["fresh", "leafy"],
    diet_tags: ["vegan", "gluten-free"],
    price: 1.50,
    value_band: "mid",
    is_in_stock: true
  },

  // Bakery
  {
    product_id: "prod_004",
    name: "Sourdough Bread",
    brand: "Sainsburys",
    category: "Bakery",
    sub_category: "Bread",
    tags: ["fresh", "artisan"],
    diet_tags: [],
    price: 2.20,
    value_band: "mid", 
    is_in_stock: true
  },
  {
    product_id: "prod_005",
    name: "Croissants",
    brand: "Sainsburys",
    category: "Bakery",
    sub_category: "Pastries",
    tags: ["fresh", "buttery"],
    diet_tags: [],
    price: 2.80,
    promo: {
      type: 'multi_buy',
      value: '2 for £4',
      threshold: 2,
      group_id: 'croissants_deal'
    },
    value_band: "mid",
    is_in_stock: true
  },

  // Dairy
  {
    product_id: "prod_006",
    name: "Whole Milk",
    brand: "Sainsburys",
    category: "Dairy",
    sub_category: "Milk",
    tags: ["fresh", "british"],
    diet_tags: [],
    price: 1.45,
    value_band: "value",
    is_in_stock: true
  },
  {
    product_id: "prod_007", 
    name: "Mature Cheddar",
    brand: "Sainsburys",
    category: "Dairy",
    sub_category: "Cheese",
    tags: ["mature", "british"],
    diet_tags: [],
    price: 3.50,
    value_band: "mid",
    is_in_stock: true
  },
  {
    product_id: "prod_008",
    name: "Greek Yogurt",
    brand: "Sainsburys",
    category: "Dairy",
    sub_category: "Yogurt",
    tags: ["protein", "thick"],
    diet_tags: [],
    price: 2.00,
    value_band: "mid",
    is_in_stock: true
  },

  // Meat & Fish
  {
    product_id: "prod_009",
    name: "British Chicken Breast",
    brand: "Sainsburys",
    category: "Meat & Fish", 
    sub_category: "Chicken",
    tags: ["british", "fresh", "lean"],
    diet_tags: [],
    price: 4.50,
    value_band: "mid",
    is_in_stock: true
  },
  {
    product_id: "prod_010",
    name: "Atlantic Salmon Fillet",
    brand: "Sainsburys",
    category: "Meat & Fish",
    sub_category: "Fish",
    tags: ["fresh", "omega-3"],
    diet_tags: [],
    price: 6.00,
    value_band: "premium",
    is_in_stock: true
  },

  // Pantry Essentials
  {
    product_id: "prod_011",
    name: "Penne Pasta",
    brand: "Sainsburys",
    category: "Pantry Essentials",
    sub_category: "Pasta",
    tags: ["italian", "dried"],
    diet_tags: [],
    price: 1.00,
    promo: {
      type: 'multi_buy',
      value: '3 for £2',
      threshold: 3,
      group_id: 'pasta_deal'
    },
    value_band: "value",
    is_in_stock: true
  },
  {
    product_id: "prod_012",
    name: "Tomato Pasta Sauce",
    brand: "Dolmio",
    category: "Pantry Essentials",
    sub_category: "Sauces",
    tags: ["italian", "tomato"],
    diet_tags: [],
    price: 1.80,
    value_band: "mid",
    is_in_stock: true
  },
  {
    product_id: "prod_013",
    name: "Extra Virgin Olive Oil",
    brand: "Sainsburys",
    category: "Pantry Essentials",
    sub_category: "Oils",
    tags: ["cold-pressed", "mediterranean"],
    diet_tags: ["vegan"],
    price: 4.20,
    value_band: "mid",
    is_in_stock: true
  },
  {
    product_id: "prod_014",
    name: "Basmati Rice",
    brand: "Sainsburys",
    category: "Pantry Essentials",
    sub_category: "Rice",
    tags: ["long-grain", "fragrant"],
    diet_tags: ["vegan", "gluten-free"],
    price: 2.50,
    value_band: "mid",
    is_in_stock: true
  }
];

export const complements: Record<string, string[]> = {
  "prod_011": ["prod_012"], // Pasta -> Sauce
  "prod_009": ["prod_013", "prod_003"], // Chicken -> Olive Oil, Spinach
  "prod_004": ["prod_007"], // Bread -> Cheese
  "prod_008": ["prod_002"], // Yogurt -> Apples
  "prod_010": ["prod_014"] // Salmon -> Rice
};

export const missions = [
  {
    name: "Italian Night",
    triggers: ["prod_011", "prod_012"],
    suggestions: ["prod_013", "prod_007"],
    title: "Complete your Italian feast"
  },
  {
    name: "Healthy Breakfast",
    triggers: ["prod_008", "prod_002"],
    suggestions: ["prod_001"],
    title: "Perfect healthy breakfast"
  }
];

export const defaultUserProfile: UserProfile = {
  diet_tags: [],
  avoid_brands: [],
  value_bias: 'mid',
  budget_band: 'normal'
};