export function renderMethodologyPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="#/" class="hover:text-emerald-700">Home</a>
        <span>/</span>
        <span class="text-emerald-900 font-semibold">Methodology & Sources</span>
      </nav>

      <div class="space-y-4 mb-10">
        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
          Scientific Transparency
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
          Agronomic Calculation Methodologies & Research Standards
        </h1>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
          AgriPlan Global adheres to peer-reviewed agronomic formulas, thermodynamic energy-balance physics, and published university agricultural extension recommendations.
        </p>
      </div>

      <!-- Methodology Breakdown Sections -->
      <div class="space-y-8 text-sm text-slate-700 leading-relaxed">
        
        <!-- 1. Evapotranspiration & Water -->
        <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div class="flex items-center gap-2 text-emerald-900 font-bold text-base">
            <i data-lucide="droplet" class="w-5 h-5 text-emerald-600"></i>
            <h3>1. Evapotranspiration & Irrigation (FAO-56 Standards)</h3>
          </div>
          <p>
            Reference crop evapotranspiration (ETo) is computed strictly via the full <strong>FAO-56 Penman-Monteith physical equation</strong> (Allen et al., 1998; FAO Irrigation and Drainage Paper No. 56). This formulation integrates solar radiation balance ($R_n$), aerodynamic vapor pressure deficit ($e_s - e_a$), psychrometric constants ($\gamma$), and 2-meter wind speed ($u_2$) for a standardized grass surface.
          </p>
          <p>
            Crop water requirements ($ET_c$) apply the FAO single crop coefficient framework ($ET_c = ET_0 \times K_c$) utilizing verified growth-stage $K_c$ tables calibrated across initial, mid-season, and late-maturity phenological phases.
          </p>
        </div>

        <!-- 2. Seed Science & Population -->
        <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div class="flex items-center gap-2 text-emerald-900 font-bold text-base">
            <i data-lucide="sprout" class="w-5 h-5 text-emerald-600"></i>
            <h3>2. Seed Rates, Density & Pure Live Seed (ISTA Protocols)</h3>
          </div>
          <p>
            Seed rate adjustments follow International Seed Testing Association (ISTA) and Association of Official Seed Analysts (AOSA) Pure Live Seed (PLS) standards: <code>PLS % = (Germination % × Purity %) ÷ 100</code>. Seeding density math converts bulk kilogram seed rates and Thousand Kernel Weights (TKW) into accurate seeds per square meter and established field plant populations.
          </p>
        </div>

        <!-- 3. Soil Science & Nutrient Management -->
        <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div class="flex items-center gap-2 text-emerald-900 font-bold text-base">
            <i data-lucide="flask-conical" class="w-5 h-5 text-emerald-600"></i>
            <h3>3. Soil Nutrient Balancing & Liming Models</h3>
          </div>
          <p>
            Fertilizer calculations use exact stoichiometric mass-balance equations, distinguishing elemental phosphorus (P) and potassium (K) from commercial fertilizer oxides ($P_2O_5 = P \times 2.2915$; $K_2O = K \times 1.2046$). Soil liming requirements incorporate soil texture buffering capacities (SMP/Woodruff indices) and Calcium Carbonate Equivalent (CCE) product neutralizing values.
          </p>
        </div>

        <!-- 4. Farm Machinery & Hydraulics -->
        <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div class="flex items-center gap-2 text-emerald-900 font-bold text-base">
            <i data-lucide="spray-can" class="w-5 h-5 text-emerald-600"></i>
            <h3>4. Sprayer Hydraulics & Precision Calibration (ISO/ASABE)</h3>
          </div>
          <p>
            Boom sprayer calibrations implement ISO 5682 and ASABE S592 hydraulic engineering standards relating nozzle discharge (L/min), tractor forward velocity (km/h), and boom nozzle spacing (cm) to compute application volume (L/ha and Gallons/Acre).
          </p>
        </div>

        <!-- 5. Farm Financial Standards -->
        <div class="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div class="flex items-center gap-2 text-emerald-900 font-bold text-base">
            <i data-lucide="coins" class="w-5 h-5 text-emerald-600"></i>
            <h3>5. Enterprise Economics & ROI (FFSC Guidelines)</h3>
          </div>
          <p>
            Cost of production, enterprise budgeting, Return on Investment (ROI), and Benefit-Cost Ratios (BCR) follow the Farm Financial Standards Council (FFSC) agricultural financial reporting recommendations.
          </p>
        </div>

        <!-- Authoritative References List -->
        <div class="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
          <h3 class="font-bold text-slate-900 text-sm uppercase tracking-wider">Primary Authoritative References</h3>
          <ul class="space-y-2 text-xs text-slate-600">
            <li>&bull; <strong>Food and Agriculture Organization of the United Nations (FAO):</strong> <em>Irrigation and Drainage Paper No. 56: Crop Evapotranspiration</em> (Rome, Italy).</li>
            <li>&bull; <strong>International Seed Testing Association (ISTA):</strong> <em>International Rules for Seed Testing</em> (Bassersdorf, Switzerland).</li>
            <li>&bull; <strong>United States Department of Agriculture - Natural Resources Conservation Service (USDA-NRCS):</strong> <em>National Engineering Handbook Part 652: Irrigation</em>.</li>
            <li>&bull; <strong>American Society of Agricultural and Biological Engineers (ASABE):</strong> <em>ASABE Standards: Precision Planter Spacing and Sprayer Calibration</em>.</li>
            <li>&bull; <strong>University Agricultural Extension Services:</strong> Iowa State University Extension, Purdue Extension, UC Davis Agriculture & Natural Resources, Penn State Extension, University of Minnesota Extension.</li>
            <li>&bull; <strong>Farm Financial Standards Council (FFSC):</strong> <em>Financial Guidelines for Agriculture</em>.</li>
          </ul>
        </div>

      </div>

    </div>
  `;
}
