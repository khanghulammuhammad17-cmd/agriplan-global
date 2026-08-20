import { GUIDES_DATA, getGuideById } from '../data/guidesData.js';
import { getCalculatorBySlug } from '../data/calculatorsData.js';

export function renderGuidesIndexPage() {
  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <!-- Page Header -->
      <div class="max-w-3xl mb-10">
        <nav class="flex items-center gap-2 text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
          <a href="#/" class="hover:text-emerald-700">Home</a>
          <span>/</span>
          <span class="text-emerald-900 font-semibold">Farming Guides</span>
        </nav>
        
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
          Agricultural Knowledge & Farming Guides
        </h1>
        <p class="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          In-depth, peer-reviewed educational articles and practical field manuals covering crop rotation, seed science, soil chemistry, 4R fertilizer stewardship, irrigation engineering, and farm economics.
        </p>
      </div>

      <!-- 9 Guides Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${GUIDES_DATA.map(guide => `
          <article class="rounded-3xl bg-white border border-slate-200 overflow-hidden hover:shadow-xl hover:border-emerald-500 transition-all flex flex-col justify-between group">
            <div>
              <div class="aspect-16/9 overflow-hidden relative">
                <img src="${guide.image}" alt="${guide.imageAlt}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white backdrop-blur-xs">
                  ${guide.category}
                </span>
              </div>
              <div class="p-6">
                <span class="text-[11px] text-slate-400 font-mono">${guide.readTime} &bull; ${guide.publishedDate}</span>
                <h2 class="font-bold text-slate-900 text-lg mt-1 group-hover:text-emerald-800 transition-colors">${guide.title}</h2>
                <p class="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">${guide.excerpt}</p>
              </div>
            </div>

            <div class="p-6 pt-0">
              <a href="#/guides/${guide.id}" class="w-full py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-800 font-semibold text-xs flex items-center justify-between group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                <span>Read Comprehensive Guide</span>
                <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>
          </article>
        `).join('')}
      </div>

    </div>
  `;
}

export function renderGuideSinglePage(guideId) {
  const guide = getGuideById(guideId);
  if (!guide) {
    return `
      <div class="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 class="text-2xl font-bold text-slate-800">Guide Not Found</h1>
        <p class="text-slate-600 mt-2">The requested agricultural guide could not be found.</p>
        <a href="#/guides" class="inline-block mt-4 px-4 py-2 bg-emerald-700 text-white rounded-xl">View All Guides</a>
      </div>
    `;
  }

  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="#/" class="hover:text-emerald-700">Home</a>
        <span>/</span>
        <a href="#/guides" class="hover:text-emerald-700">Guides</a>
        <span>/</span>
        <span class="text-emerald-900 font-semibold">${guide.category}</span>
      </nav>

      <!-- Article Header -->
      <div class="space-y-3 mb-8">
        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
          ${guide.category}
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif leading-tight">
          ${guide.title}
        </h1>
        <div class="flex items-center gap-4 text-xs text-slate-500 font-mono">
          <span>${guide.readTime}</span>
          <span>&bull;</span>
          <span>Published: ${guide.publishedDate}</span>
          <span>&bull;</span>
          <span>AgriPlan Global Research Team</span>
        </div>
      </div>

      <!-- Feature Image -->
      <div class="aspect-16/9 rounded-3xl overflow-hidden shadow-lg border border-slate-200 mb-10">
        <img src="${guide.image}" alt="${guide.imageAlt}" class="w-full h-full object-cover" loading="eager" />
      </div>

      <!-- Guide Main Body Content -->
      <div class="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-6">
        ${guide.content}
      </div>

      <!-- Related Planning Calculators Section -->
      ${guide.relatedCalculators && guide.relatedCalculators.length > 0 ? `
        <div class="mt-12 pt-8 border-t border-slate-200">
          <h3 class="text-base font-bold text-slate-900 uppercase tracking-wider mb-4 font-serif">
            Related Field Calculators for this Guide
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            ${guide.relatedCalculators.map(slug => {
              const c = getCalculatorBySlug(slug);
              if (!c) return '';
              return `
                <a href="#/tools/${c.slug}" class="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group">
                  <div class="font-bold text-slate-900 text-sm group-hover:text-emerald-800 flex items-center justify-between">
                    <span>${c.name}</span>
                    <i data-lucide="arrow-right" class="w-4 h-4 text-slate-400 group-hover:text-emerald-700"></i>
                  </div>
                  <p class="text-xs text-slate-500 line-clamp-2 mt-1">${c.shortDesc}</p>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

    </div>
  `;
}
