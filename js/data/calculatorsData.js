import { CAT1_CALCULATORS } from './calcCat1.js';
import { CAT2_CALCULATORS } from './calcCat2.js';
import { CAT3_CALCULATORS } from './calcCat3.js';
import { CAT4_CALCULATORS } from './calcCat4.js';

export const CALCULATORS_DATA = [
  ...CAT1_CALCULATORS,
  ...CAT2_CALCULATORS,
  ...CAT3_CALCULATORS,
  ...CAT4_CALCULATORS
];

export const CALCULATOR_CATEGORIES = [
  { id: 'all', label: 'All 30 Calculators', icon: 'layout-grid', count: 30, desc: 'Complete suite of verified agronomic calculation tools.' },
  { id: 'crop-seed', label: 'Crop & Seed', icon: 'sprout', count: 8, desc: 'Seed rate, seeding density, plant population, spacing, yields, and germination bioassays.' },
  { id: 'soil-fertilizer', label: 'Soil & Fertilizer', icon: 'flask-conical', count: 9, desc: 'Nutrient targets, NPK balancing, soil test calibration, liming, and compost applications.' },
  { id: 'water-irrigation', label: 'Water & Irrigation', icon: 'droplet', count: 7, desc: 'FAO-56 Penman-Monteith ETo, crop water ETc, irrigation scheduling, system runtimes, and volume.' },
  { id: 'farm-econ', label: 'Farm & Agriculture', icon: 'coins', count: 6, desc: 'Land area converters, agricultural unit conversions, sprayer calibration, enterprise budgets, and ROI.' }
];

export function getCalculatorBySlug(slug) {
  return CALCULATORS_DATA.find(c => c.slug === slug);
}

export function getCalculatorsByCategory(catId) {
  if (!catId || catId === 'all') return CALCULATORS_DATA;
  return CALCULATORS_DATA.filter(c => c.category === catId);
}
