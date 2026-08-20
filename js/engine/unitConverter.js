/**
 * Universal Agricultural Unit Converter Engine
 * Supporting Metric, Imperial, and Traditional South Asian Agricultural Units
 */

export const UnitFactors = {
  // Base unit: square meters (m²)
  area: {
    sq_m: 1,
    ha: 10000,
    acre: 4046.8564224,
    sq_ft: 0.09290304,
    sq_yd: 0.83612736,
    kanal: 505.857053,     // Standard 5445 sq ft (20 marlas)
    marla: 25.29285265    // Standard 272.25 sq ft
  },

  // Base unit: kilogram (kg)
  weight: {
    kg: 1,
    g: 0.001,
    tonne: 1000,
    lb: 0.45359237,
    oz: 0.0283495231,
    quintal: 100,
    cwt_us: 45.359237     // US short hundredweight (100 lb)
  },

  // Base unit: liter (L)
  volume: {
    l: 1,
    ml: 0.001,
    cum: 1000,            // Cubic meter (m³)
    gal_us: 3.785411784,
    gal_uk: 4.54609,
    acre_inch: 102790.15312896, // 1 acre-inch = 27,154.286 US gal ≈ 102.79 m³
    acre_foot: 1233481.8375475  // 1 acre-foot = 1233.48 m³
  },

  // Base unit: meter (m)
  length: {
    m: 1,
    cm: 0.01,
    mm: 0.001,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144
  },

  // Base unit: Liters per hour (L/h)
  flow: {
    l_h: 1,
    l_min: 60,
    cum_h: 1000,
    gpm_us: 227.12470704
  }
};

export function convertArea(value, fromUnit, toUnit) {
  if (value === null || value === undefined || isNaN(value)) return 0;
  const fromFactor = UnitFactors.area[fromUnit] || 1;
  const toFactor = UnitFactors.area[toUnit] || 1;
  return (value * fromFactor) / toFactor;
}

export function convertWeight(value, fromUnit, toUnit) {
  if (value === null || value === undefined || isNaN(value)) return 0;
  const fromFactor = UnitFactors.weight[fromUnit] || 1;
  const toFactor = UnitFactors.weight[toUnit] || 1;
  return (value * fromFactor) / toFactor;
}

export function convertVolume(value, fromUnit, toUnit) {
  if (value === null || value === undefined || isNaN(value)) return 0;
  const fromFactor = UnitFactors.volume[fromUnit] || 1;
  const toFactor = UnitFactors.volume[toUnit] || 1;
  return (value * fromFactor) / toFactor;
}

export function convertLength(value, fromUnit, toUnit) {
  if (value === null || value === undefined || isNaN(value)) return 0;
  const fromFactor = UnitFactors.length[fromUnit] || 1;
  const toFactor = UnitFactors.length[toUnit] || 1;
  return (value * fromFactor) / toFactor;
}

export function convertFlow(value, fromUnit, toUnit) {
  if (value === null || value === undefined || isNaN(value)) return 0;
  const fromFactor = UnitFactors.flow[fromUnit] || 1;
  const toFactor = UnitFactors.flow[toUnit] || 1;
  return (value * fromFactor) / toFactor;
}

export function formatNumber(num, decimals = 2) {
  if (num === null || num === undefined || isNaN(num) || !isFinite(num)) return "0";
  // If number is an integer, show no decimals or up to requested
  if (Math.abs(num) >= 1000000) {
    return Number(num.toFixed(decimals)).toLocaleString('en-US');
  }
  return Number(num.toFixed(decimals)).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  });
}
