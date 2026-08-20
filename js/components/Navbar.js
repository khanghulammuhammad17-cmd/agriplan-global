/**
 * Navigation Bar Component
 * Sticky responsive header with tools dropdown, mobile drawer, and global search trigger.
 */

export function renderNavbar() {
  return `
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Brand Logo & Name -->
          <div class="flex items-center gap-3">
            <a href="#/" class="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg p-1">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform duration-200">
                <i data-lucide="sprout" class="w-6 h-6 text-emerald-300"></i>
              </div>
              <div>
                <span class="text-xl font-bold tracking-tight text-emerald-950 font-serif block leading-none">AgriPlan <span class="text-emerald-700">Global</span></span>
                <span class="text-[10px] uppercase font-semibold tracking-wider text-emerald-600/90 block mt-1">Agriculture Planning Platform</span>
              </div>
            </a>
          </div>

          <!-- Desktop Navigation Links -->
          <nav class="hidden lg:flex items-center gap-1 font-medium text-slate-700 text-sm" aria-label="Main Navigation">
            <a href="#/" class="nav-link px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50/80 transition-colors">Home</a>
            
            <!-- Tools Dropdown Trigger -->
            <div class="relative group" id="tools-dropdown-container">
              <button id="tools-dropdown-btn" class="nav-link flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600" aria-expanded="false" aria-haspopup="true">
                <span>Farm Calculators</span>
                <i data-lucide="chevron-down" class="w-4 h-4 text-slate-400 group-hover:text-emerald-700 transition-transform group-hover:rotate-180 duration-200"></i>
              </button>

              <!-- Mega Dropdown Menu -->
              <div class="dropdown-menu absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[720px] bg-white rounded-2xl shadow-2xl border border-emerald-100 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div class="grid grid-cols-2 gap-6">
                  
                  <div>
                    <div class="flex items-center gap-2 pb-2 mb-3 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-emerald-800">
                      <i data-lucide="sprout" class="w-4 h-4 text-emerald-600"></i>
                      <span>Crop & Seed (8 Tools)</span>
                    </div>
                    <ul class="space-y-1 text-xs">
                      <li><a href="#/tools/seed-rate-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-medium">Seed Rate Calculator</a></li>
                      <li><a href="#/tools/seeding-density-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Seeding Density Calculator</a></li>
                      <li><a href="#/tools/plant-population-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Plant Population Calculator</a></li>
                      <li><a href="#/tools/crop-yield-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Crop Yield Calculator</a></li>
                      <li><a href="#/tools/harvest-yield-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Harvest Yield Calculator</a></li>
                      <li><a href="#/tools/crop-area-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Crop Area Calculator</a></li>
                      <li><a href="#/tools/crop-spacing-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Crop Spacing Calculator</a></li>
                      <li><a href="#/tools/germination-rate-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Germination Rate Calculator</a></li>
                    </ul>

                    <div class="flex items-center gap-2 pb-2 mb-3 mt-4 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-emerald-800">
                      <i data-lucide="flask-conical" class="w-4 h-4 text-emerald-600"></i>
                      <span>Soil & Fertilizer (9 Tools)</span>
                    </div>
                    <ul class="space-y-1 text-xs">
                      <li><a href="#/tools/fertilizer-requirement-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 font-medium">Fertilizer Requirement</a></li>
                      <li><a href="#/tools/npk-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">NPK Fertilizer Calculator</a></li>
                      <li><a href="#/tools/nitrogen-requirement-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Nitrogen Requirement</a></li>
                      <li><a href="#/tools/phosphorus-requirement-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Phosphorus Requirement</a></li>
                      <li><a href="#/tools/potassium-requirement-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Potassium Requirement</a></li>
                      <li><a href="#/tools/lime-requirement-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Lime Requirement</a></li>
                      <li><a href="#/tools/compost-application-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Compost Application</a></li>
                    </ul>
                  </div>

                  <div>
                    <div class="flex items-center gap-2 pb-2 mb-3 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-emerald-800">
                      <i data-lucide="droplet" class="w-4 h-4 text-emerald-600"></i>
                      <span>Water & Irrigation (7 Tools)</span>
                    </div>
                    <ul class="space-y-1 text-xs">
                      <li><a href="#/tools/eto-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-emerald-800 font-semibold bg-emerald-50/50">ETo Calculator (FAO-56)</a></li>
                      <li><a href="#/tools/crop-water-requirement-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Crop Water Requirement (ETc)</a></li>
                      <li><a href="#/tools/irrigation-water-requirement-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Irrigation Water Requirement</a></li>
                      <li><a href="#/tools/irrigation-scheduling-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Irrigation Scheduling</a></li>
                      <li><a href="#/tools/irrigation-runtime-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Irrigation System Runtime</a></li>
                      <li><a href="#/tools/effective-rainfall-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Effective Rainfall Calculator</a></li>
                      <li><a href="#/tools/water-volume-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Water Volume Calculator</a></li>
                    </ul>

                    <div class="flex items-center gap-2 pb-2 mb-3 mt-4 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-emerald-800">
                      <i data-lucide="coins" class="w-4 h-4 text-emerald-600"></i>
                      <span>Farm & Economics (6 Tools)</span>
                    </div>
                    <ul class="space-y-1 text-xs">
                      <li><a href="#/tools/farm-area-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Farm Area Calculator (Kanal/Acre)</a></li>
                      <li><a href="#/tools/agriculture-unit-converter" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Agriculture Unit Converter</a></li>
                      <li><a href="#/tools/sprayer-calibration-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Sprayer Calibration</a></li>
                      <li><a href="#/tools/farm-input-cost-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Farm Input Cost</a></li>
                      <li><a href="#/tools/crop-production-cost-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-slate-700 hover:text-emerald-800">Crop Production Cost</a></li>
                      <li><a href="#/tools/farm-profit-roi-calculator" class="block p-1.5 rounded hover:bg-emerald-50 text-emerald-800 font-semibold bg-emerald-50/50">Farm Profit / ROI Calculator</a></li>
                    </ul>
                  </div>

                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a href="#/tools" class="font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1">
                    <span>View All 30 Agricultural Calculators</span>
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                  </a>
                  <span class="text-slate-400">FAO & University Research Compliant</span>
                </div>
              </div>
            </div>

            <a href="#/crop-calendar" class="nav-link px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50/80 transition-colors">Crop Calendar</a>
            <a href="#/fruit-calendar" class="nav-link px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50/80 transition-colors">Fruit Calendar</a>
            <a href="#/vegetable-calendar" class="nav-link px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50/80 transition-colors">Vegetable Calendar</a>
            <a href="#/crop-planner" class="nav-link px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50/80 transition-colors font-semibold text-emerald-800">Crop Planner</a>
            <a href="#/guides" class="nav-link px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50/80 transition-colors">Farming Guides</a>
            <a href="#/methodology" class="nav-link px-3 py-2 rounded-lg hover:text-emerald-800 hover:bg-emerald-50/80 transition-colors">Methodology</a>
          </nav>

          <!-- Right Action Controls: Search & Explore Tools Button -->
          <div class="flex items-center gap-3">
            <!-- Global Search Trigger Button -->
            <button id="search-modal-trigger" class="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-500 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl border border-slate-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600" aria-label="Search Platform">
              <i data-lucide="search" class="w-4 h-4 text-slate-500"></i>
              <span class="hidden sm:inline">Search tools & crops...</span>
              <kbd class="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white border border-slate-300 rounded text-slate-400 shadow-2xs">Ctrl+K</kbd>
            </button>

            <!-- Primary CTA -->
            <a href="#/tools" class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm shadow-sm hover:shadow-md shadow-emerald-900/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">
              <i data-lucide="calculator" class="w-4 h-4"></i>
              <span>Explore Tools</span>
            </a>

            <!-- Mobile Hamburger Button -->
            <button id="mobile-menu-btn" class="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600" aria-label="Open Navigation Menu" aria-expanded="false">
              <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-drawer" class="lg:hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 opacity-0 pointer-events-none">
        <div class="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between transform translate-x-full transition-transform duration-300 ease-in-out overflow-y-auto" id="mobile-drawer-content">
          <div>
            <div class="flex items-center justify-between pb-4 border-b border-slate-100">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                  <i data-lucide="sprout" class="w-5 h-5 text-emerald-300"></i>
                </div>
                <span class="font-bold text-emerald-950 font-serif">AgriPlan Global</span>
              </div>
              <button id="mobile-drawer-close" class="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100" aria-label="Close Menu">
                <i data-lucide="x" class="w-5 h-5"></i>
              </button>
            </div>

            <nav class="mt-6 space-y-2 text-sm font-medium text-slate-700">
              <a href="#/" class="mobile-link block px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800">Home</a>
              <a href="#/tools" class="mobile-link block px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800 font-semibold text-emerald-800">All 30 Calculators</a>
              <a href="#/crop-planner" class="mobile-link block px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800">Crop Planner</a>
              <a href="#/crop-calendar" class="mobile-link block px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800">Seasonal Crop Calendar</a>
              <a href="#/fruit-calendar" class="mobile-link block px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800">Fruit Calendar</a>
              <a href="#/vegetable-calendar" class="mobile-link block px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800">Vegetable Calendar</a>
              <a href="#/guides" class="mobile-link block px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800">Farming Guides</a>
              <a href="#/methodology" class="mobile-link block px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800">Methodology & Sources</a>
              <a href="#/about" class="mobile-link block px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800">About Platform</a>
              <a href="#/contact" class="mobile-link block px-3 py-2.5 rounded-xl hover:bg-emerald-50 hover:text-emerald-800">Contact & Support</a>
            </nav>
          </div>

          <div class="pt-6 border-t border-slate-100">
            <a href="#/tools" class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-700 text-white font-medium text-sm shadow-md">
              <i data-lucide="calculator" class="w-4 h-4"></i>
              <span>Open Farm Calculators</span>
            </a>
          </div>
        </div>
      </div>

    </header>
  `;
}
