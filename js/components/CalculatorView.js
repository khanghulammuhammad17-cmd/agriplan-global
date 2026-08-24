import { getCalculatorBySlug } from '../data/calculatorsData.js';
import { renderDynamicFormFields } from './calcForms.js';
import { executeCalculator, formatResultCards } from './calcRunner.js';

export function renderCalculatorPage(slug) {
  const calc = getCalculatorBySlug(slug);
  if (!calc) {
    return `
      <div class="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 class="text-2xl font-bold text-slate-800">Calculator Not Found</h1>
        <p class="text-slate-600 mt-2">The requested calculator could not be found.</p>
        <a href="#/tools" class="inline-block mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl">View All 30 Calculators</a>
      </div>
    `;
  }

  return `
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="calculator-view" data-slug="${calc.slug}">
      
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="#/" class="hover:text-emerald-700">Home</a>
        <span>/</span>
        <a href="#/tools" class="hover:text-emerald-700">Farm Calculators</a>
        <span>/</span>
        <span class="text-emerald-900 font-semibold">${calc.name}</span>
      </nav>

      <!-- H1 & Introduction -->
      <div class="mb-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800 border border-emerald-200 mb-3">
          <i data-lucide="${calc.icon || 'calculator'}" class="w-3.5 h-3.5"></i>
          <span>${calc.categoryLabel}</span>
        </div>
        <h1 class="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-serif">${calc.h1}</h1>
        <p class="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed max-w-3xl">${calc.intro}</p>
      </div>

      <!-- Main Calculator Grid: Form + Result Card -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        <!-- Calculator Form (Col 1-7) -->
        <div class="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          
          <!-- How It Works & Input Guide Box -->
          <div class="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2 text-xs">
            <div class="flex items-center gap-2 font-bold text-emerald-950 text-sm">
              <i data-lucide="help-circle" class="w-4 h-4 text-emerald-700"></i>
              <span>How This Calculator Works & Input Guidelines</span>
            </div>
            <p class="text-slate-700 leading-relaxed">
              ${calc.intro}
            </p>
            <div class="pt-1 text-slate-600">
              <strong class="text-emerald-950 font-semibold">How to use:</strong> Adjust the input parameters below (such as land area, target rates, or seed/soil metrics). The calculator automatically computes verified agronomic results with a step-by-step mathematical breakdown.
            </div>
          </div>

          <div class="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 class="text-lg font-bold text-slate-900 flex items-center gap-2">
              <i data-lucide="sliders" class="w-5 h-5 text-emerald-700"></i>
              <span>Input Parameters</span>
            </h2>
            <button id="calc-reset-btn" class="text-xs font-medium text-slate-500 hover:text-rose-600 flex items-center gap-1 transition-colors">
              <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
              <span>Reset Defaults</span>
            </button>
          </div>

          <form id="active-calculator-form" class="space-y-4" onsubmit="event.preventDefault();">
            ${renderDynamicFormFields(calc)}

            <!-- Calculate Action Buttons -->
            <div class="pt-4 flex items-center gap-3">
              <button type="button" id="calc-submit-btn" class="flex-1 py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md hover:shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600">
                <i data-lucide="calculator" class="w-4 h-4"></i>
                <span>Calculate Result</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Result Card (Col 8-12) -->
        <div class="lg:col-span-5 flex flex-col">
          <div class="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex-1 flex flex-col justify-between border border-emerald-800/40 relative overflow-hidden" id="calculator-result-card">
            
            <div class="relative z-10">
              <div class="flex items-center justify-between pb-4 border-b border-emerald-800/60">
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-300 font-mono">Calculated Output</span>
                <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-700/60 font-mono">Verified Agronomy</span>
              </div>

              <!-- Main Dynamic Result Metric Display -->
              <div id="dynamic-result-output" class="py-6">
                <!-- Injected via JavaScript engine -->
              </div>
            </div>

            <!-- Result Step-by-Step Transparency Box -->
            <div class="mt-4 pt-4 border-t border-emerald-800/60 relative z-10">
              <div class="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-2">Calculation Breakdown</div>
              <div id="dynamic-step-breakdown" class="text-xs text-slate-300 space-y-1.5 font-mono leading-relaxed bg-emerald-950/50 p-3 rounded-xl border border-emerald-800/40 max-h-48 overflow-y-auto">
                <!-- Step lines injected -->
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- Technical & Agronomic Documentation Sections -->
      <div class="space-y-8 border-t border-slate-200 pt-10">
        
        <!-- Formula & Worked Example -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 class="text-sm font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 mb-3">
              <i data-lucide="binary" class="w-4 h-4 text-emerald-700"></i>
              <span>Mathematical Formula</span>
            </h3>
            <div class="p-3 bg-white rounded-xl border border-slate-200 font-mono text-xs text-slate-800 break-words">
              ${calc.formula}
            </div>
          </div>

          <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 class="text-sm font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 mb-3">
              <i data-lucide="check-circle" class="w-4 h-4 text-emerald-700"></i>
              <span>Worked Agronomic Example</span>
            </h3>
            <p class="text-xs text-slate-700 leading-relaxed">${calc.workedExample}</p>
          </div>
        </div>

        <!-- Assumptions & Limitations -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-amber-50/60 rounded-2xl p-6 border border-amber-200/60">
            <h3 class="text-sm font-bold uppercase tracking-wider text-amber-950 flex items-center gap-2 mb-2">
              <i data-lucide="info" class="w-4 h-4 text-amber-700"></i>
              <span>Assumptions</span>
            </h3>
            <p class="text-xs text-amber-900/90 leading-relaxed">${calc.assumptions}</p>
          </div>

          <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-2">
              <i data-lucide="alert-triangle" class="w-4 h-4 text-slate-700"></i>
              <span>Limitations</span>
            </h3>
            <p class="text-xs text-slate-600 leading-relaxed">${calc.limitations}</p>
          </div>
        </div>

        <!-- Methodology & Authoritative Sources -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
          <h3 class="text-sm font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 mb-3">
            <i data-lucide="book-open" class="w-4 h-4 text-emerald-700"></i>
            <span>Calculation Methodology & Sources</span>
          </h3>
          <p class="text-xs text-slate-700 leading-relaxed mb-4">${calc.methodology}</p>
          
          <div class="border-t border-slate-100 pt-3">
            <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Authoritative References:</div>
            <ul class="space-y-1.5 text-xs text-emerald-700 font-medium">
              ${calc.sources.map(s => `
                <li class="flex items-center gap-2">
                  <i data-lucide="external-link" class="w-3.5 h-3.5 text-emerald-500"></i>
                  <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="hover:underline hover:text-emerald-900">${s.title}</a>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- Calculator FAQs -->
        ${calc.faqs && calc.faqs.length > 0 ? `
          <div class="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">Frequently Asked Questions</h3>
            <div class="space-y-3 text-xs">
              ${calc.faqs.map(f => `
                <div class="bg-white p-4 rounded-xl border border-slate-200">
                  <h4 class="font-bold text-slate-900 mb-1">${f.q}</h4>
                  <p class="text-slate-600 leading-relaxed">${f.a}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Related Calculators -->
        ${calc.relatedSlugs && calc.relatedSlugs.length > 0 ? `
          <div>
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4">Related Planning Calculators</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              ${calc.relatedSlugs.map(rSlug => {
                const rel = getCalculatorBySlug(rSlug);
                if (!rel) return '';
                return `
                  <a href="#/tools/${rel.slug}" class="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group">
                    <div class="font-bold text-slate-900 text-sm group-hover:text-emerald-700 flex items-center justify-between">
                      <span>${rel.name}</span>
                      <i data-lucide="arrow-right" class="w-4 h-4 text-slate-300 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all"></i>
                    </div>
                    <p class="text-xs text-slate-500 line-clamp-2 mt-1">${rel.shortDesc}</p>
                  </a>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Internal Agronomic Knowledge Hub & Planning Links -->
        <div class="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
          <div class="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <i data-lucide="compass" class="w-4 h-4 text-emerald-700"></i>
              <span>Related Agronomic Planning Hubs & Guides</span>
            </h3>
            <a href="sitemap.xml" target="_blank" class="text-[11px] font-mono text-emerald-700 hover:text-emerald-900 hover:underline flex items-center gap-1">
              <i data-lucide="file-code" class="w-3.5 h-3.5"></i>
              <span>View XML Sitemap</span>
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <!-- Col 1: Calendars -->
            <div class="space-y-2">
              <span class="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">Seasonal Calendars</span>
              <ul class="space-y-1.5 text-slate-600">
                <li><a href="#/crop-calendar" class="hover:text-emerald-700 hover:underline">&bull; Seasonal Crop Calendar</a></li>
                <li><a href="#/fruit-calendar" class="hover:text-emerald-700 hover:underline">&bull; Fruit Growing Calendar</a></li>
                <li><a href="#/vegetable-calendar" class="hover:text-emerald-700 hover:underline">&bull; Vegetable Sowing Calendar</a></li>
                <li><a href="#/crop-planner" class="hover:text-emerald-700 hover:underline font-semibold text-emerald-800">&bull; Interactive Crop Planner</a></li>
              </ul>
            </div>

            <!-- Col 2: Farming Guides -->
            <div class="space-y-2">
              <span class="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">Related Guides</span>
              <ul class="space-y-1.5 text-slate-600">
                <li><a href="#/guides/seed-selection" class="hover:text-emerald-700 hover:underline">&bull; Seed & PLS Optimization</a></li>
                <li><a href="#/guides/crop-planning" class="hover:text-emerald-700 hover:underline">&bull; Crop Rotation & Planning</a></li>
                <li><a href="#/guides/soil-management" class="hover:text-emerald-700 hover:underline">&bull; Soil Health & CEC Guide</a></li>
                <li><a href="#/guides/fertilizer-management" class="hover:text-emerald-700 hover:underline">&bull; 4R Fertilizer Stewardship</a></li>
              </ul>
            </div>

            <!-- Col 3: Crop Agronomy Profiles -->
            <div class="space-y-2">
              <span class="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">Crop Profiles</span>
              <ul class="space-y-1.5 text-slate-600">
                <li><a href="#/crops/wheat" class="hover:text-emerald-700 hover:underline">&bull; Wheat Agronomy Guide</a></li>
                <li><a href="#/crops/maize" class="hover:text-emerald-700 hover:underline">&bull; Maize Field Guide</a></li>
                <li><a href="#/crops/rice" class="hover:text-emerald-700 hover:underline">&bull; Rice Management Guide</a></li>
                <li><a href="#/crops/soybean" class="hover:text-emerald-700 hover:underline">&bull; Soybean Production Guide</a></li>
              </ul>
            </div>

            <!-- Col 4: Standards & Search -->
            <div class="space-y-2">
              <span class="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">Platform Standards</span>
              <ul class="space-y-1.5 text-slate-600">
                <li><a href="#/methodology" class="hover:text-emerald-700 hover:underline">&bull; FAO & USDA Methodologies</a></li>
                <li><a href="#/tools" class="hover:text-emerald-700 hover:underline">&bull; All 30 Farm Calculators</a></li>
                <li><a href="#/disclaimer" class="hover:text-emerald-700 hover:underline">&bull; Agricultural Disclaimer</a></li>
                <li><a href="sitemap.xml" target="_blank" class="hover:text-emerald-700 hover:underline text-emerald-800 font-semibold">&bull; XML Sitemap (SEO)</a></li>
              </ul>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;
}
