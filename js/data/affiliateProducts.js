/**
 * Curated High-Converting Amazon Affiliate Agricultural Products
 * Partner Tag: agriplangloba-20
 */

export const AFFILIATE_TAG = 'agriplangloba-20';

export function getAmazonSearchUrl(keywords) {
  return `https://www.amazon.com/s?k=${encodeURIComponent(keywords)}&tag=${AFFILIATE_TAG}`;
}

export const CATEGORY_AFFILIATE_TOOLS = {
  // Category 1: Crop & Seed Planning
  'crops-seed': [
    {
      title: 'Digital Precision Grain & Seed Gram Scale (0.01g Accuracy)',
      desc: 'Essential for measuring Thousand Kernel Weight (TKW) and precise seed calibration.',
      rating: '4.8',
      reviews: '2,450',
      price: '$18.99',
      tag: 'Seed Testing',
      keywords: 'digital pocket scale 0.01g precision grain seed',
      icon: 'scale'
    },
    {
      title: 'Handheld Grain Moisture Meter with Double Probes',
      desc: 'Accurately tests moisture content in Wheat, Corn, Rice, and Barley before sowing or storage.',
      rating: '4.7',
      reviews: '1,180',
      price: '$42.50',
      tag: 'Moisture Control',
      keywords: 'handheld grain moisture meter probe wheat corn',
      icon: 'droplets'
    }
  ],

  // Category 2: Soil & Nutrient Management
  'soil-fertility': [
    {
      title: '3-in-1 Digital Soil pH, Moisture & Sunlight Tester',
      desc: 'Instant soil condition diagnostics for optimizing NPK fertilizer absorption and root health.',
      rating: '4.9',
      reviews: '5,820',
      price: '$16.99',
      tag: 'Soil Diagnostics',
      keywords: 'soil ph meter moisture light tester plant sensor',
      icon: 'test-tube-2'
    },
    {
      title: 'Professional Soil NPK & pH Chemical Test Kit (40 Tests)',
      desc: 'Lab-quality reagent testing for available Nitrogen, Phosphorus, Potassium, and pH levels.',
      rating: '4.6',
      reviews: '3,140',
      price: '$28.99',
      tag: 'NPK Testing',
      keywords: 'soil test kit npk nitrogen phosphorus potassium ph',
      icon: 'flask-conical'
    }
  ],

  // Category 3: Water & Irrigation Management
  'water-irrigation': [
    {
      title: 'Smart Automatic Drip Irrigation Controller & Timer',
      desc: 'Programmable multi-zone digital valve timer for precision water scheduling and FAO-56 compliance.',
      rating: '4.8',
      reviews: '4,210',
      price: '$36.99',
      tag: 'Irrigation Automation',
      keywords: 'water timer automatic drip irrigation controller digital',
      icon: 'timer'
    },
    {
      title: 'High-Precision Digital Water Flow Meter & Volume Totalizer',
      desc: 'Measures exact gallon/liter flow rate and water consumption for farm drip and sprinkler lines.',
      rating: '4.7',
      reviews: '1,890',
      price: '$21.99',
      tag: 'Flow Measurement',
      keywords: 'digital water flow meter hose garden drip measurement',
      icon: 'gauge'
    }
  ],

  // Category 4: Farm Economics & Harvest Planning
  'farm-economics': [
    {
      title: 'Professional Optical Brix Refractometer (0-32% Sugar)',
      desc: 'Measures fruit, vegetable, and crop sap sweetness to determine exact optimal harvest timing.',
      rating: '4.9',
      reviews: '3,650',
      price: '$22.99',
      tag: 'Harvest Timing',
      keywords: 'brix refractometer 0 32 fruit sugar harvest testing',
      icon: 'sparkles'
    },
    {
      title: 'Heavy-Duty Soil & Compost Probe Thermometer (20-Inch)',
      desc: 'Monitors deep soil temperature for timely spring planting and winter dormancy management.',
      rating: '4.8',
      reviews: '2,110',
      price: '$19.50',
      tag: 'Field Monitoring',
      keywords: 'soil thermometer probe long stem planting temperature',
      icon: 'thermometer'
    }
  ]
};

export function renderAffiliateRecommendations(categorySlug) {
  const tools = CATEGORY_AFFILIATE_TOOLS[categorySlug] || CATEGORY_AFFILIATE_TOOLS['crops-seed'];

  return `
    <div class="mt-10 pt-8 border-t border-slate-200" id="affiliate-tools-section">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <div class="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider font-mono">
            <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
            <span>Recommended Field Tools & Precision Equipment</span>
          </div>
          <h3 class="text-lg font-bold text-slate-900 font-serif mt-1">
            Tools to Enhance Your Agronomic Accuracy
          </h3>
        </div>
        <span class="text-[11px] text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
          Partner Verified &bull; Amazon Associates
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        ${tools.map(tool => `
          <div class="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                  ${tool.tag}
                </span>
                <span class="text-xs font-bold text-slate-900 font-mono">
                  ${tool.price}
                </span>
              </div>

              <h4 class="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                ${tool.title}
              </h4>

              <p class="text-xs text-slate-600 mt-1.5 leading-relaxed">
                ${tool.desc}
              </p>
            </div>

            <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <div class="flex items-center gap-1 text-xs text-amber-600 font-medium">
                <span>⭐ ${tool.rating}</span>
                <span class="text-slate-400 text-[11px]">(${tool.reviews})</span>
              </div>

              <a 
                href="${getAmazonSearchUrl(tool.keywords)}" 
                target="_blank" 
                rel="nofollow noopener sponsored" 
                class="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm hover:shadow transition-all flex items-center gap-1.5"
              >
                <span>Check Price on Amazon</span>
                <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
              </a>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Amazon Affiliate Policy Disclosure -->
      <p class="text-[10px] text-slate-600 text-center mt-4">
        As an Amazon Associate, AgriPlan Global earns from qualifying purchases. We independently recommend precision tools to assist growers.
      </p>
    </div>
  `;
}

/**
 * Mobile-Optimized Featured Tools Showcase for Homepage
 */
export function renderHomepageAffiliateShowcase() {
  const featuredTools = [
    CATEGORY_AFFILIATE_TOOLS['crops-seed'][0],       // Precision Scale
    CATEGORY_AFFILIATE_TOOLS['soil-fertility'][0],   // 3-in-1 Soil pH & Moisture Tester
    CATEGORY_AFFILIATE_TOOLS['water-irrigation'][0], // Drip Irrigation Controller Timer
    CATEGORY_AFFILIATE_TOOLS['farm-economics'][0]    // Optical Brix Refractometer
  ];

  return `
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="home-featured-tools-section">
      <div class="bg-gradient-to-b from-slate-50 to-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <div class="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider font-mono mb-1">
              <i data-lucide="shopping-bag" class="w-3.5 h-3.5"></i>
              <span>Amazon Associates Verified Equipment</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
              Featured Precision Agricultural Field Tools
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 mt-1">
              Field-tested diagnostic instruments to pair with your farm calculations for maximum crop yield.
            </p>
          </div>

          <span class="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-full self-start md:self-auto border border-emerald-200">
            <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-700"></i>
            <span>Verified 4.7+ Rating</span>
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          ${featuredTools.map(tool => `
            <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-500/60 transition-all flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between gap-2 mb-3">
                  <span class="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ${tool.tag}
                  </span>
                  <span class="text-xs font-bold text-slate-900 font-mono">
                    ${tool.price}
                  </span>
                </div>

                <h3 class="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                  ${tool.title}
                </h3>

                <p class="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  ${tool.desc}
                </p>
              </div>

              <div class="mt-5 pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <div class="flex items-center justify-between text-xs text-amber-600 font-semibold">
                  <span>⭐ ${tool.rating}</span>
                  <span class="text-slate-400 text-[11px]">(${tool.reviews} reviews)</span>
                </div>

                <a 
                  href="${getAmazonSearchUrl(tool.keywords)}" 
                  target="_blank" 
                  rel="nofollow noopener sponsored" 
                  class="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>Check Price on Amazon</span>
                  <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
                </a>
              </div>
            </div>
          `).join('')}
        </div>

        <p class="text-[10px] text-slate-600 text-center mt-6">
          As an Amazon Associate, AgriPlan Global earns from qualifying purchases.
        </p>

      </div>
    </section>
  `;
}
