/**
 * Footer Component
 * Comprehensive footer with complete internal linking, SEO keywords, and legal disclaimer.
 */

export function renderFooter() {
  return `
    <footer class="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          <!-- Brand & SEO Intro -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md">
                <i data-lucide="sprout" class="w-6 h-6 text-emerald-300"></i>
              </div>
              <span class="text-xl font-bold tracking-tight text-white font-serif">AgriPlan Global</span>
            </div>
            
            <p class="text-xs text-slate-400 leading-relaxed">
              <strong>Global Agriculture Planning Platform</strong> provides free, research-grounded agricultural calculators, seasonal growing calendars, and agronomic management tools to help farmers, agronomists, students, and growers plan smarter and calculate accurately.
            </p>

            <div class="flex items-center gap-3 text-xs text-slate-400 pt-2">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-mono">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                30 Active Calculators
              </span>
              <span class="text-slate-500">|</span>
              <span>FAO-56 Compliant</span>
            </div>
          </div>

          <!-- Column 1: Core Planning Tools -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-4">Planning & Calendars</h4>
            <ul class="space-y-2 text-xs text-slate-400">
              <li><a href="#/crop-planner" class="hover:text-emerald-400 transition-colors">Interactive Crop Planner</a></li>
              <li><a href="#/crop-calendar" class="hover:text-emerald-400 transition-colors">Seasonal Crop Calendar</a></li>
              <li><a href="#/fruit-calendar" class="hover:text-emerald-400 transition-colors">Fruit Calendar (15 Species)</a></li>
              <li><a href="#/vegetable-calendar" class="hover:text-emerald-400 transition-colors">Vegetable Calendar (20 Species)</a></li>
              <li><a href="#/crops/wheat" class="hover:text-emerald-400 transition-colors">Wheat Production Guide</a></li>
              <li><a href="#/crops/maize" class="hover:text-emerald-400 transition-colors">Maize / Corn Profile</a></li>
              <li><a href="#/crops/tomato" class="hover:text-emerald-400 transition-colors">Tomato Agronomy Page</a></li>
            </ul>
          </div>

          <!-- Column 2: Key Calculators -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-4">Calculators</h4>
            <ul class="space-y-2 text-xs text-slate-400">
              <li><a href="#/tools/seed-rate-calculator" class="hover:text-emerald-400 transition-colors">Seed Rate Calculator</a></li>
              <li><a href="#/tools/fertilizer-requirement-calculator" class="hover:text-emerald-400 transition-colors">Fertilizer Requirement</a></li>
              <li><a href="#/tools/npk-calculator" class="hover:text-emerald-400 transition-colors">NPK Fertilizer Solver</a></li>
              <li><a href="#/tools/eto-calculator" class="hover:text-emerald-400 transition-colors">FAO-56 Penman ETo</a></li>
              <li><a href="#/tools/crop-water-requirement-calculator" class="hover:text-emerald-400 transition-colors">Crop Water ETc</a></li>
              <li><a href="#/tools/irrigation-scheduling-calculator" class="hover:text-emerald-400 transition-colors">Irrigation Scheduling</a></li>
              <li><a href="#/tools/farm-profit-roi-calculator" class="hover:text-emerald-400 transition-colors">Farm Profit & ROI</a></li>
              <li><a href="#/tools" class="text-emerald-400 hover:underline font-semibold mt-1 block">All 30 Calculators &rarr;</a></li>
            </ul>
          </div>

          <!-- Column 3: Platform & Legal -->
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-white mb-4">About & Resources</h4>
            <ul class="space-y-2 text-xs text-slate-400">
              <li><a href="#/methodology" class="hover:text-emerald-400 transition-colors">Agronomic Methodology</a></li>
              <li><a href="#/guides" class="hover:text-emerald-400 transition-colors">Farming Guides Library</a></li>
              <li><a href="#/about" class="hover:text-emerald-400 transition-colors">About the Platform</a></li>
              <li><a href="#/contact" class="hover:text-emerald-400 transition-colors">Contact & Support</a></li>
              <li><a href="#/privacy" class="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#/terms" class="hover:text-emerald-400 transition-colors">Terms of Use</a></li>
              <li><a href="#/disclaimer" class="hover:text-emerald-400 transition-colors">Agricultural Disclaimer</a></li>
            </ul>
          </div>

        </div>

        <!-- Agricultural Legal Disclaimer & Affiliate Disclosure -->
        <div class="py-6 border-b border-slate-800/80 space-y-2">
          <p class="text-[11px] text-slate-500 leading-relaxed">
            <strong class="text-slate-400">Agricultural Disclaimer:</strong> Information and calculations provided by this platform are for planning and educational purposes. Actual agricultural decisions depend on local climate, soil conditions, crop variety, management practices, soil-test results, product labels, and local agricultural guidance.
          </p>
          <p class="text-[11px] text-slate-500 leading-relaxed">
            <strong class="text-slate-400">Affiliate Disclosure:</strong> AgriPlan Global is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.
          </p>
        </div>

        <!-- Copyright & Standards Badge -->
        <div class="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; 2026 AgriPlan Global &bull; Global Agriculture Planning Platform. All rights reserved.</p>
          <div class="flex items-center gap-4 text-[11px]">
            <a href="sitemap.xml" target="_blank" class="hover:text-slate-400">XML Sitemap</a>
            <span>&bull;</span>
            <a href="robots.txt" target="_blank" class="hover:text-slate-400">Robots.txt</a>
            <span>&bull;</span>
            <span class="text-emerald-400">Plan Smarter. Calculate Accurately. Grow Better.</span>
          </div>
        </div>

      </div>
    </footer>
  `;
}
