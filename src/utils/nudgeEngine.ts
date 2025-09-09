import { Product, Nudge, complements, missions } from '../data/products';
import { products } from '../data/products';

export const generateNudge = (
  scannedProduct: Product,
  scanCount: number,
  nudgeCount: number
): Nudge | null => {
  // Throttling rules: max 1 nudge per 3 scans, max 6 total nudges
  const shouldShowNudge = scanCount % 3 === 0 && nudgeCount < 6;
  
  if (!shouldShowNudge) {
    return null;
  }

  // Try complement nudge first
  const complementNudge = generateComplementNudge(scannedProduct);
  if (complementNudge) return complementNudge;

  // Try multi-buy nudge
  const multiBuyNudge = generateMultiBuyNudge(scannedProduct);
  if (multiBuyNudge) return multiBuyNudge;

  // Try mission nudge
  const missionNudge = generateMissionNudge(scannedProduct);
  if (missionNudge) return missionNudge;

  return null;
};

const generateComplementNudge = (scannedProduct: Product): Nudge | null => {
  const complementIds = complements[scannedProduct.product_id];
  if (!complementIds || complementIds.length === 0) return null;

  const complementProduct = products.find(p => complementIds.includes(p.product_id));
  if (!complementProduct) return null;

  const savings = calculateSavings(complementProduct);
  
  return {
    nudge_id: `complement_${Date.now()}`,
    type: 'complement',
    title: 'Perfect pairing!',
    reason: `${complementProduct.name} goes great with ${scannedProduct.name}`,
    candidates: [complementProduct],
    savings: savings,
    trigger_product_id: scannedProduct.product_id
  };
};

const generateMultiBuyNudge = (scannedProduct: Product): Nudge | null => {
  if (!scannedProduct.promo || scannedProduct.promo.type !== 'multi_buy') {
    return null;
  }

  const { threshold = 2, value, group_id } = scannedProduct.promo;
  
  // Find more products in the same promotion
  const promoProducts = products.filter(p => 
    p.promo?.group_id === group_id && 
    p.product_id !== scannedProduct.product_id
  );

  const candidateProduct = promoProducts[0] || scannedProduct;

  return {
    nudge_id: `multibuy_${Date.now()}`,
    type: 'multi_buy',
    title: 'Complete the deal!',
    reason: `Add another for ${value}`,
    candidates: [candidateProduct],
    savings: calculateMultiBuySavings(scannedProduct, threshold),
    trigger_product_id: scannedProduct.product_id
  };
};

const generateMissionNudge = (scannedProduct: Product): Nudge | null => {
  const relevantMission = missions.find(mission =>
    mission.triggers.includes(scannedProduct.product_id)
  );

  if (!relevantMission) return null;

  const suggestionProduct = products.find(p =>
    relevantMission.suggestions.includes(p.product_id)
  );

  if (!suggestionProduct) return null;

  return {
    nudge_id: `mission_${Date.now()}`,
    type: 'mission',
    title: relevantMission.title,
    reason: `Complete your ${relevantMission.name.toLowerCase()}`,
    candidates: [suggestionProduct],
    savings: calculateSavings(suggestionProduct),
    trigger_product_id: scannedProduct.product_id
  };
};

const calculateSavings = (product: Product): string => {
  if (product.nectar_price) {
    const savings = product.price - product.nectar_price;
    return `Save £${savings.toFixed(2)}`;
  }
  
  if (product.promo) {
    switch (product.promo.type) {
      case 'percentage':
        return `${product.promo.value} off`;
      case 'fixed_amount':
        return `Save ${product.promo.value}`;
      case 'multi_buy':
        return product.promo.value;
    }
  }
  
  return '';
};

const calculateMultiBuySavings = (product: Product, threshold: number): string => {
  if (!product.promo) return '';
  
  const regularPrice = product.price * threshold;
  // Simple calculation for demo - in real world this would be more complex
  const promoPrice = regularPrice * 0.8; // Assume 20% savings
  const savings = regularPrice - promoPrice;
  
  return `Save £${savings.toFixed(2)}`;
};