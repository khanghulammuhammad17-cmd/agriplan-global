import { CALCULATORS_DATA, CALCULATOR_CATEGORIES } from '../data/calculatorsData.js';
import { CROPS_DATA } from '../data/cropsData.js';
import { GUIDES_DATA } from '../data/guidesData.js';
import { FAQS_DATA } from '../data/faqsData.js';
import { renderPrecisionAgVisualizer } from '../components/PrecisionAgVisualizer.js';

export function renderHomePage() {
  return `
    <div class="space-y-16 sm:space-y-24 pb-16">
      
      <!-- ========================================== -->
      <!-- 2. HERO SECTION -->
      <!-- ========================================== -->
      <section class="relative bg-gradient-to-b from-emerald-950 via-emerald-900 to-slate-900 text-white overflow-hidden pt-12 pb-20 sm:pb-28 lg:pt-16 lg:pb-36 border-b border-emerald-800/50">
        <!-- Subtle agricultural pattern overlay -->
        <div class="absolute inset-0 bg-[radial-gradient(#10b98115_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- Left Hero Content -->
            <div class="lg:col-span-7 space-y-6">
              <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-700/80 text-emerald-300 text-xs font-semibold backdrop-blur-xs">
                <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-400"></i>
                <span>Peer-Reviewed Agricultural Algorithms & FAO Standards</span>
              </div>

              <!-- EXACT REQUIRED H1 & SUPPORTING HEADINGS -->
              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white font-serif leading-[1.1]">
                Global Agriculture Planning Platform
              </h1>

              <p class="text-xl sm:text-2xl font-medium text-emerald-300 font-sans">
                Plan Smarter. Calculate Accurately. Grow Better.
              </p>

              <p class="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Practical agriculture calculators, crop planning tools, seasonal growing calendars, and farming resources designed to help users make better-informed agricultural decisions.
              </p>

              <!-- Hero CTA Buttons -->
              <div class="flex flex-wrap items-center gap-3 pt-2">
                <a href="#/tools" class="px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 group">
                  <i data-lucide="calculator" class="w-4 h-4"></i>
                  <span>Explore Farm Calculators</span>
                  <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
                </a>
                <a href="#/crop-calendar" class="px-5 py-3.5 rounded-2xl bg-emerald-900/80 hover:bg-emerald-800 text-white font-semibold text-sm border border-emerald-700/80 backdrop-blur-xs transition-all flex items-center gap-2">
                  <i data-lucide="calendar" class="w-4 h-4 text-emerald-300"></i>
                  <span>View Crop Calendar</span>
                </a>
                <a href="#/guides" class="px-5 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 backdrop-blur-xs transition-all flex items-center gap-2">
                  <i data-lucide="book-open" class="w-4 h-4 text-emerald-400"></i>
                  <span>Explore Farming Guides</span>
                </a>
              </div>

              <!-- Factual Platform Badges -->
              <div class="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-emerald-800/60 text-xs text-slate-300">
                <div>
                  <div class="text-xl font-bold text-white font-mono">30</div>
                  <span class="text-[11px] text-slate-400">Farm Calculators</span>
                </div>
                <div>
                  <div class="text-xl font-bold text-white font-mono">12</div>
                  <span class="text-[11px] text-slate-400">Months Planning</span>
                </div>
                <div>
                  <div class="text-xl font-bold text-white font-mono">4</div>
                  <span class="text-[11px] text-slate-400">Core Categories</span>
                </div>
                <div>
                  <div class="text-xl font-bold text-emerald-400 font-mono">Free</div>
                  <span class="text-[11px] text-slate-400">Open Access</span>
                </div>
              </div>
            </div>

            <!-- Right Hero Visual with Authentic Agriculture Imagery & Floating Info Cards -->
            <div class="lg:col-span-5 relative">
              <div class="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-700/60 aspect-4/3 sm:aspect-square lg:aspect-4/3 group">
                <img 
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1000&q=80" 
                  alt="Aerial agricultural fields with modern farm machinery for the Global Agriculture Planning Platform"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  width="1000"
                  height="750"
                  loading="eager"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              </div>

              <!-- Floating Info Card 1: Farm Area -->
              <div class="absolute -top-4 -left-4 sm:left-4 bg-slate-900/90 backdrop-blur-md border border-emerald-600/50 rounded-2xl p-3 shadow-xl text-xs text-white flex items-center gap-3 animate-float">
                <div class="p-2 rounded-xl bg-emerald-800 text-emerald-300">
                  <i data-lucide="map" class="w-4 h-4"></i>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 block font-mono uppercase">Farm Area</span>
                  <span class="font-bold text-white">25.0 Hectares (61.8 ac)</span>
                </div>
              </div>

              <!-- Floating Info Card 2: Seed Rate -->
              <div class="absolute top-1/4 -right-4 bg-slate-900/90 backdrop-blur-md border border-emerald-600/50 rounded-2xl p-3 shadow-xl text-xs text-white flex items-center gap-3 animate-float-delayed">
                <div class="p-2 rounded-xl bg-emerald-800 text-emerald-300">
                  <i data-lucide="sprout" class="w-4 h-4"></i>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 block font-mono uppercase">Seed Rate</span>
                  <span class="font-bold text-emerald-300">140 kg/ha (92% PLS)</span>
                </div>
              </div>

              <!-- Floating Info Card 3: Fertilizer (NPK) -->
              <div class="absolute bottom-16 -left-4 bg-slate-900/90 backdrop-blur-md border border-emerald-600/50 rounded-2xl p-3 shadow-xl text-xs text-white flex items-center gap-3 animate-float">
                <div class="p-2 rounded-xl bg-emerald-800 text-emerald-300">
                  <i data-lucide="flask-conical" class="w-4 h-4"></i>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 block font-mono uppercase">Fertilizer (NPK)</span>
                  <span class="font-bold text-white">120N - 60P₂O₅ - 60K₂O</span>
                </div>
              </div>

              <!-- Floating Info Card 4: Crop Water -->
              <div class="absolute -bottom-4 right-6 bg-slate-900/90 backdrop-blur-md border border-emerald-600/50 rounded-2xl p-3 shadow-xl text-xs text-white flex items-center gap-3 animate-float-delayed">
                <div class="p-2 rounded-xl bg-sky-800 text-sky-300">
                  <i data-lucide="droplet" class="w-4 h-4"></i>
                </div>
                <div>
                  <span class="text-[10px] text-slate-400 block font-mono uppercase">Crop Water</span>
                  <span class="font-bold text-sky-300">ETc 5.98 mm/day</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- 3. PLATFORM FEATURES -->
      <!-- ========================================== -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h2 class="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">Comprehensive Agronomic Architecture</h2>
          <p class="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Engineered for Agricultural Precision</p>
          <p class="text-sm text-slate-600 mt-2">Connecting field measurement physics, soil chemistry, crop phenology, and farm budgeting into one unified platform.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all group">
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
              <i data-lucide="calculator" class="w-6 h-6"></i>
            </div>
            <h3 class="font-bold text-slate-900 text-base mb-2">30 Verified Calculators</h3>
            <p class="text-xs text-slate-600 leading-relaxed">Full suite spanning seed density, NPK stoichiometry, FAO-56 Penman ETo, irrigation runtimes, sprayer calibration, and enterprise ROI.</p>
          </div>

          <div class="p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all group">
            <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:bg-amber-700 group-hover:text-white transition-colors">
              <i data-lucide="calendar" class="w-6 h-6"></i>
            </div>
            <h3 class="font-bold text-slate-900 text-base mb-2">Seasonal Growing Calendars</h3>
            <p class="text-xs text-slate-600 leading-relaxed">Interactive planting, vegetative growth, and harvest timelines for 10 field crops, 15 fruit tree species, and 20 vegetable varieties.</p>
          </div>

          <div class="p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all group">
            <div class="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center mb-4 group-hover:bg-sky-700 group-hover:text-white transition-colors">
              <i data-lucide="compass" class="w-6 h-6"></i>
            </div>
            <h3 class="font-bold text-slate-900 text-base mb-2">Dynamic Crop Planner</h3>
            <p class="text-xs text-slate-600 leading-relaxed">Generate tailored farm management schedules, irrigation forecasts, and fertilizer recommendations customized to your acreage and soil.</p>
          </div>

          <div class="p-6 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all group">
            <div class="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4 group-hover:bg-purple-700 group-hover:text-white transition-colors">
              <i data-lucide="book-open" class="w-6 h-6"></i>
            </div>
            <h3 class="font-bold text-slate-900 text-base mb-2">9 In-Depth Farming Guides</h3>
            <p class="text-xs text-slate-600 leading-relaxed">Practical, research-backed guides covering soil science, 4R fertilizer stewardship, irrigation hydraulics, cover crops, and farm budgets.</p>
          </div>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- 4. ALL 30 AGRICULTURAL CALCULATORS PREVIEW -->
      <!-- ========================================== -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
          <div>
            <h2 class="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">Scientific Calculators Registry</h2>
            <p class="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">All 30 Agricultural Calculators</p>
            <p class="text-xs text-slate-500 mt-1">Every calculator is fully functional with transparent formulas and peer-reviewed agronomic citations.</p>
          </div>

          <!-- Category Filter Tabs -->
          <div class="flex flex-wrap items-center gap-2" id="home-calc-filter-tabs">
            <button class="cat-filter-btn active px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-800 text-white shadow-sm" data-cat="all">All (30)</button>
            <button class="cat-filter-btn px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100" data-cat="crop-seed">Crop & Seed (8)</button>
            <button class="cat-filter-btn px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100" data-cat="soil-fertilizer">Soil & Fertilizer (9)</button>
            <button class="cat-filter-btn px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100" data-cat="water-irrigation">Water & Irrigation (7)</button>
            <button class="cat-filter-btn px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100" data-cat="farm-econ">Farm & Econ (6)</button>
          </div>
        </div>

        <!-- 30 Cards Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="home-calculators-grid">
          ${CALCULATORS_DATA.map(calc => `
            <a href="#/tools/${calc.slug}" class="calc-card p-5 rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition-all flex flex-col justify-between group" data-category="${calc.category}">
              <div>
                <div class="flex items-center justify-between mb-3">
                  <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                    <i data-lucide="${calc.icon || 'calculator'}" class="w-5 h-5"></i>
                  </div>
                  <span class="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-800 transition-colors">
                    ${calc.categoryLabel}
                  </span>
                </div>
                <h3 class="font-bold text-slate-900 text-base group-hover:text-emerald-800 transition-colors">${calc.name}</h3>
                <p class="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">${calc.shortDesc}</p>
              </div>

              <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-semibold group-hover:text-emerald-900">
                <span>Launch Calculator</span>
                <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- ========================================== -->
      <!-- 5 & 6. CROP, FRUIT & VEGETABLE CALENDARS PREVIEW -->
      <!-- ========================================== -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-white border border-emerald-800 relative overflow-hidden">
          
          <div class="max-w-3xl mb-8">
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">Seasonal Agrometeorology</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-white font-serif mt-1">Seasonal Growing & Harvest Calendars</h2>
            <p class="text-xs sm:text-sm text-slate-300 mt-2">Month-by-month timelines calibrated across temperate, subtropical, tropical, and arid zones.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <!-- Crop Calendar Card -->
            <div class="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 backdrop-blur-xs flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-emerald-800 text-emerald-300 flex items-center justify-center mb-3">
                  <i data-lucide="sprout" class="w-5 h-5"></i>
                </div>
                <h3 class="font-bold text-lg text-white">Seasonal Crop Calendar</h3>
                <p class="text-xs text-slate-300 mt-2 leading-relaxed">Cereals (Wheat, Maize, Rice, Barley), Pulses (Soybeans, Chickpeas), and Oilseeds (Canola, Sunflowers).</p>
              </div>
              <a href="#/crop-calendar" class="mt-6 inline-flex items-center gap-2 text-xs font-bold text-emerald-300 hover:text-white">
                <span>Explore Field Crop Calendar</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
            </div>

            <!-- Fruit Calendar Card -->
            <div class="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 backdrop-blur-xs flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-rose-900 text-rose-300 flex items-center justify-center mb-3">
                  <i data-lucide="apple" class="w-5 h-5"></i>
                </div>
                <h3 class="font-bold text-lg text-white">Fruit Calendar (15 Species)</h3>
                <p class="text-xs text-slate-300 mt-2 leading-relaxed">Apple, Banana, Mango, Citrus, Grapes, Peach, Plum, Pomegranate, Strawberry, Watermelon, and Melons.</p>
              </div>
              <a href="#/fruit-calendar" class="mt-6 inline-flex items-center gap-2 text-xs font-bold text-emerald-300 hover:text-white">
                <span>View Fruit Harvest Windows</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
            </div>

            <!-- Vegetable Calendar Card -->
            <div class="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 backdrop-blur-xs flex flex-col justify-between">
              <div>
                <div class="w-10 h-10 rounded-xl bg-amber-900 text-amber-300 flex items-center justify-center mb-3">
                  <i data-lucide="carrot" class="w-5 h-5"></i>
                </div>
                <h3 class="font-bold text-lg text-white">Vegetable Calendar (20 Species)</h3>
                <p class="text-xs text-slate-300 mt-2 leading-relaxed">Tomato, Potato, Onion, Carrot, Spinach, Lettuce, Cucumber, Bell Peppers, Cabbage, Broccoli, Peas, Okra, and Zucchini.</p>
              </div>
              <a href="#/vegetable-calendar" class="mt-6 inline-flex items-center gap-2 text-xs font-bold text-emerald-300 hover:text-white">
                <span>View Vegetable Sowing Dates</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
            </div>

          </div>

        </div>
      </section>

      <!-- ========================================== -->
      <!-- 7. CROP PLANNER CALLOUT -->
      <!-- ========================================== -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-emerald-50 via-white to-emerald-50/60 rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          <div class="max-w-2xl">
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-800">Dynamic Agronomic System</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 font-serif mt-1">Interactive Farm Crop Planner</h2>
            <p class="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              Enter your specific location, farm acreage, target crop, and soil characteristics. The system constructs an interactive schedule with estimated harvest dates, seasonal water demands, fertilizer plans, and direct calculator shortcuts.
            </p>
          </div>

          <a href="#/crop-planner" class="px-6 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-xl shadow-emerald-900/20 transition-all flex items-center gap-3 shrink-0">
            <i data-lucide="compass" class="w-5 h-5"></i>
            <span>Launch Crop Planner Tool</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- 8. PRECISION AGRICULTURE DEMONSTRATION SECTION -->
      <!-- ========================================== -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        ${renderPrecisionAgVisualizer()}
      </section>

      <!-- ========================================== -->
      <!-- 9. FARMING GUIDES PREVIEW -->
      <!-- ========================================== -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <h2 class="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">Agronomy Knowledge Base</h2>
            <p class="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Original Farming Guides</p>
          </div>
          <a href="#/guides" class="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1">
            <span>All 9 Guides</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          ${GUIDES_DATA.slice(0, 3).map(guide => `
            <a href="#/guides/${guide.id}" class="rounded-3xl bg-white border border-slate-200 overflow-hidden hover:shadow-xl transition-all group flex flex-col justify-between">
              <div>
                <div class="aspect-16/9 overflow-hidden relative">
                  <img src="${guide.image}" alt="${guide.imageAlt}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-xs">
                    ${guide.category}
                  </span>
                </div>
                <div class="p-6">
                  <span class="text-[11px] text-slate-400 font-mono">${guide.readTime} &bull; ${guide.publishedDate}</span>
                  <h3 class="font-bold text-slate-900 text-base mt-1 group-hover:text-emerald-800 transition-colors">${guide.title}</h3>
                  <p class="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">${guide.excerpt}</p>
                </div>
              </div>
              <div class="px-6 pb-6 pt-2 text-xs font-bold text-emerald-700 flex items-center gap-1">
                <span>Read Full Guide</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- ========================================== -->
      <!-- 10. WHY USE THE PLATFORM -->
      <!-- ========================================== -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-slate-50 rounded-3xl p-8 sm:p-12 border border-slate-200">
          <div class="max-w-3xl mx-auto text-center mb-10">
            <h2 class="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">Standardized Science</h2>
            <p class="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Why Farmers & Agronomists Rely on AgriPlan Global</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-200">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <i data-lucide="check-check" class="w-5 h-5"></i>
              </div>
              <h3 class="font-bold text-slate-900 text-sm mb-1">No Made-Up Formulas</h3>
              <p class="text-xs text-slate-600 leading-relaxed">Every calculator is strictly grounded in peer-reviewed methodologies from FAO, USDA, and leading university agricultural extensions.</p>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <i data-lucide="eye" class="w-5 h-5"></i>
              </div>
              <h3 class="font-bold text-slate-900 text-sm mb-1">Full Step Transparency</h3>
              <p class="text-xs text-slate-600 leading-relaxed">No black-box calculations. View intermediate psychrometric constants, Pure Live Seed indices, and stoichiometric conversions step-by-step.</p>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <i data-lucide="globe-2" class="w-5 h-5"></i>
              </div>
              <h3 class="font-bold text-slate-900 text-sm mb-1">Global Unit Support</h3>
              <p class="text-xs text-slate-600 leading-relaxed">Seamlessly calculate across Metric (Hectares, kg, m³), Imperial (Acres, lb, bu, GPA), and traditional South Asian units (Kanal, Marla).</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================== -->
      <!-- 11. FAQ SECTION -->
      <!-- ========================================== -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">Help & Guidance</h2>
          <p class="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Frequently Asked Questions</p>
        </div>

        <div class="space-y-4">
          ${FAQS_DATA.flatMap(cat => cat.items).map(item => `
            <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <h3 class="font-bold text-slate-900 text-sm mb-2 flex items-start gap-2">
                <i data-lucide="help-circle" class="w-4 h-4 text-emerald-600 mt-0.5 shrink-0"></i>
                <span>${item.q}</span>
              </h3>
              <p class="text-xs text-slate-600 leading-relaxed pl-6">${item.a}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- ========================================== -->
      <!-- 12. FINAL CALL TO ACTION -->
      <!-- ========================================== -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-3xl p-8 sm:p-14 text-white text-center shadow-2xl relative overflow-hidden border border-emerald-700">
          <div class="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 class="text-2xl sm:text-4xl font-extrabold font-serif">Ready to Optimize Your Agricultural Season?</h2>
            <p class="text-xs sm:text-sm text-emerald-200 leading-relaxed">
              Explore our complete suite of 30 scientific calculators, seasonal fruit and vegetable calendars, and dynamic crop planning tools today.
            </p>
            <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a href="#/tools" class="px-6 py-3.5 rounded-2xl bg-white text-emerald-950 font-bold text-sm shadow-md hover:bg-emerald-50 transition-all">
                Launch All 30 Calculators
              </a>
              <a href="#/crop-planner" class="px-6 py-3.5 rounded-2xl bg-emerald-900/90 text-white font-semibold text-sm border border-emerald-600 hover:bg-emerald-800 transition-all">
                Open Crop Planner
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  `;
}
