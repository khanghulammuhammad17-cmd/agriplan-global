/**
 * About, Contact, Privacy, Terms, and Disclaimer Pages
 */

export function renderAboutPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="#/" class="hover:text-emerald-700">Home</a>
        <span>/</span>
        <span class="text-emerald-900 font-semibold">About Us</span>
      </nav>

      <div class="space-y-4 mb-10">
        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
          Our Mission & Vision
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
          About AgriPlan Global
        </h1>
        <p class="text-sm sm:text-base text-slate-600 leading-relaxed">
          Democratizing precision agricultural science and crop planning tools for farmers, agronomists, students, and growers worldwide.
        </p>
      </div>

      <div class="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-6">
        <p>
          <strong>AgriPlan Global (Global Agriculture Planning Platform)</strong> was founded with a singular purpose: to bridge the gap between complex peer-reviewed agricultural engineering formulas and everyday on-farm decision making.
        </p>
        <p>
          Too often, agricultural tools either oversimplify formulas into misleading heuristics or hide algorithms behind expensive subscription paywalls. AgriPlan Global provides <strong>30 completely free, transparent, and verified agricultural calculators</strong> along with seasonal growing calendars and research-backed guides.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 not-prose">
          <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <h3 class="font-bold text-slate-900 text-base mb-1">Scientific Integrity</h3>
            <p class="text-xs text-slate-600">Built strictly on FAO-56 Penman-Monteith, USDA-NRCS, and university extension research.</p>
          </div>
          <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <h3 class="font-bold text-slate-900 text-base mb-1">Open Access</h3>
            <p class="text-xs text-slate-600">Zero subscriptions, zero paywalls. Free accessible planning tools for all growers.</p>
          </div>
          <div class="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <h3 class="font-bold text-slate-900 text-base mb-1">Privacy First</h3>
            <p class="text-xs text-slate-600">Calculations run in-browser. We never monetize, store, or sell proprietary farm data.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function renderContactPage() {
  return `
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="#/" class="hover:text-emerald-700">Home</a>
        <span>/</span>
        <span class="text-emerald-900 font-semibold">Contact</span>
      </nav>

      <div class="space-y-3 mb-8">
        <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
          Agronomic Support & Inquiries
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
          Contact AgriPlan Global
        </h1>
        <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Have feedback on a calculation formula, suggested regional calendar adaptations, or technical questions? Reach out to our team.
        </p>
      </div>

      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm" id="contact-form-container">
        <form id="contact-form" class="space-y-4" onsubmit="event.preventDefault();">
          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input type="text" id="contact-name" required placeholder="Dr. Jane Farmer" class="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input type="email" id="contact-email" required placeholder="jane@farm-enterprise.com" class="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Subject / Inquiry Type</label>
            <select id="contact-subject" class="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white">
              <option value="calculator">Calculator Formula Inquiry / Feedback</option>
              <option value="calendar">Regional Crop Calendar Suggestion</option>
              <option value="research">Academic / Extension Collaboration</option>
              <option value="general">General Platform Inquiry</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-700 mb-1">Message</label>
            <textarea id="contact-message" rows="4" required placeholder="Please describe your agronomic feedback or question..." class="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"></textarea>
          </div>

          <button type="button" id="contact-submit-btn" class="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <i data-lucide="send" class="w-4 h-4"></i>
            <span>Send Message</span>
          </button>
        </form>

        <div id="contact-success-msg" class="hidden p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
          <i data-lucide="check-circle-2" class="w-10 h-10 text-emerald-600 mx-auto"></i>
          <h3 class="font-bold text-slate-900 text-base">Message Received</h3>
          <p class="text-xs text-slate-600">Thank you for reaching out. Our agronomy team will review your inquiry shortly.</p>
        </div>
      </div>
    </div>
  `;
}

export function renderPrivacyPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="#/" class="hover:text-emerald-700">Home</a>
        <span>/</span>
        <span class="text-emerald-900 font-semibold">Privacy Policy</span>
      </nav>

      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif mb-6">
        Privacy Policy
      </h1>

      <div class="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
        <p><em>Effective Date: August 2026</em></p>
        <p>
          AgriPlan Global ("we", "our", or "platform") respects the privacy of our users. This Privacy Policy describes how information is collected, used, and protected.
        </p>

        <h3>1. In-Browser Client-Side Calculations</h3>
        <p>
          All 30 agricultural calculators, crop planning tools, and unit converters execute locally in your web browser. We do not store, upload, or process your farm dimensions, crop yields, financial records, or nutrient calculations on remote databases.
        </p>

        <h3>2. Information We Collect</h3>
        <p>
          We do not require user accounts or logins. If you submit a query via our contact form, we collect your name, email, and message solely for answering your inquiry.
        </p>

        <h3>3. Cookies & Analytics</h3>
        <p>
          We use standard, privacy-respecting technical session storage for user preference caching (such as selected units). We do not engage in third-party tracking or behavioral ad profiling.
        </p>
      </div>
    </div>
  `;
}

export function renderTermsPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="#/" class="hover:text-emerald-700">Home</a>
        <span>/</span>
        <span class="text-emerald-900 font-semibold">Terms of Use</span>
      </nav>

      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif mb-6">
        Terms of Use
      </h1>

      <div class="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-4">
        <p><em>Effective Date: August 2026</em></p>
        <p>
          By accessing and using AgriPlan Global (the "Platform"), you agree to be bound by these Terms of Use.
        </p>

        <h3>1. Permitted Use</h3>
        <p>
          The calculators, calendars, and educational articles provided on AgriPlan Global are intended for agricultural planning, research, student study, and educational reference.
        </p>

        <h3>2. Intellectual Property</h3>
        <p>
          The design, website code, custom visualizers, and original guide texts are the intellectual property of AgriPlan Global. Agronomic mathematical equations (such as FAO-56 Penman-Monteith) reside in the public domain.
        </p>
      </div>
    </div>
  `;
}

export function renderDisclaimerPage() {
  return `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav class="flex items-center gap-2 text-xs text-slate-500 mb-6" aria-label="Breadcrumb">
        <a href="#/" class="hover:text-emerald-700">Home</a>
        <span>/</span>
        <span class="text-emerald-900 font-semibold">Agricultural Disclaimer</span>
      </nav>

      <div class="p-8 rounded-3xl bg-amber-50/80 border border-amber-300 shadow-sm space-y-4">
        <div class="flex items-center gap-2 text-amber-950 font-bold text-lg">
          <i data-lucide="alert-triangle" class="w-6 h-6 text-amber-700"></i>
          <h1>Agricultural & Agronomic Disclaimer</h1>
        </div>

        <p class="text-sm text-amber-950/90 leading-relaxed">
          "Information and calculations provided by this platform are for planning and educational purposes. Actual agricultural decisions depend on local climate, soil conditions, crop variety, management practices, soil-test results, product labels, and local agricultural guidance."
        </p>
      </div>

      <div class="prose prose-slate max-w-none text-slate-700 text-sm leading-relaxed space-y-6 mt-8">
        <h3>1. Soil Testing & Chemical Product Labels</h3>
        <p>
          Calculated fertilizer rates, liming recommendations, and sprayer calibration rates are theoretical benchmarks based on standard published literature. Always follow the mandatory chemical label instructions approved by relevant regulatory authorities in your jurisdiction.
        </p>

        <h3>2. Climate and Microclimatic Variability</h3>
        <p>
          Evapotranspiration (ETo), crop coefficient curves (Kc), and frost dates vary widely with elevation, topography, and seasonal storm paths. Never substitute automated calculators for real-time local agrometeorological station data and soil moisture probe sensors.
        </p>
      </div>
    </div>
  `;
}
