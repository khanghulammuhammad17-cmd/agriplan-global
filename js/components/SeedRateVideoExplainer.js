/**
 * Interactive 3-Part Animated Video & Calculation Explainer for Seed Rate Calculator
 */

export function renderSeedRateVideoExplainer() {
  return `
    <div class="mb-10 rounded-3xl bg-slate-950 border border-emerald-800/60 overflow-hidden shadow-2xl text-white" id="seed-video-explainer-container">
      
      <!-- Video Header Bar -->
      <div class="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-xl bg-emerald-700/80 flex items-center justify-center text-white shadow-sm">
            <i data-lucide="play-circle" class="w-5 h-5 text-emerald-300"></i>
          </div>
          <div>
            <span class="text-xs font-bold text-white block">Seed Rate Calculation Walkthrough</span>
            <span class="text-[10px] text-emerald-400 font-mono">3-Part Animated Explainer &bull; 0:30 Duration</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <!-- Language Toggle -->
          <div class="flex items-center bg-slate-800 p-1 rounded-xl text-[11px] font-semibold border border-slate-700">
            <button id="video-lang-en" class="px-2.5 py-1 rounded-lg bg-emerald-700 text-white transition-all video-lang-btn active">English</button>
            <button id="video-lang-ur" class="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white transition-all video-lang-btn">اردو</button>
          </div>

          <!-- Speak Audio Button -->
          <button id="video-audio-toggle" class="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 text-xs flex items-center gap-1" title="Voiceover Audio">
            <i data-lucide="volume-2" class="w-4 h-4"></i>
          </button>
        </div>
      </div>

      <!-- Main Visual Cinema Stage -->
      <div class="relative p-6 sm:p-8 bg-gradient-to-b from-slate-950 via-emerald-950/40 to-slate-950 min-h-[300px] flex flex-col justify-between overflow-hidden" id="video-stage">
        
        <!-- Background Ambient Aurora -->
        <div class="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-aurora"></div>

        <!-- Dynamic Scene Content Injected by JS -->
        <div id="video-scene-content" class="relative z-10 transition-all duration-500">
          <!-- Step 1 Content Default -->
        </div>

        <!-- On-Screen Subtitle / Voiceover Box -->
        <div class="relative z-10 mt-6 p-4 rounded-2xl bg-slate-900/90 border border-emerald-700/50 backdrop-blur-md">
          <div class="flex items-start gap-3">
            <div class="p-1.5 rounded-lg bg-emerald-900/80 text-emerald-400 mt-0.5">
              <i data-lucide="message-square" class="w-4 h-4"></i>
            </div>
            <div class="flex-1">
              <span class="text-[10px] font-mono uppercase text-emerald-400 tracking-wider font-bold block" id="video-narrator-title">Step 1: Pure Live Seed (PLS)</span>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed mt-0.5" id="video-subtitle-text">
                "Never sow seed based on bag weight alone! Standard seed is never 100% pure or viable. Enter your seed tag's 90% germination and 98% purity to find your true 88.2% PLS."
              </p>
            </div>
          </div>
        </div>

      </div>

      <!-- Chapter Navigation Tabs & Progress Bar -->
      <div class="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
        
        <!-- Progress Bar -->
        <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden relative cursor-pointer" id="video-timeline-bar">
          <div id="video-progress-fill" class="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 w-1/3"></div>
        </div>

        <!-- 3 Part Buttons & Controls -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          
          <div class="flex items-center gap-2">
            <button id="video-play-btn" class="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md">
              <i data-lucide="play" class="w-4 h-4" id="video-play-icon"></i>
              <span id="video-play-label">Play Walkthrough</span>
            </button>
            <button id="video-replay-btn" class="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1" title="Restart">
              <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
            </button>
          </div>

          <!-- 3 Step Tabs -->
          <div class="flex items-center gap-1.5 text-xs">
            <button class="video-part-tab px-3 py-1.5 rounded-xl bg-emerald-800 text-white font-semibold transition-all border border-emerald-600" data-part="1">
              Part 1: PLS %
            </button>
            <button class="video-part-tab px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-700" data-part="2">
              Part 2: Emergence & Density
            </button>
            <button class="video-part-tab px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-700" data-part="3">
              Part 3: Final 18 Bags
            </button>
          </div>

          <!-- Load into Form Button -->
          <button id="video-load-values-btn" class="px-3 py-1.5 rounded-xl bg-emerald-950 text-emerald-300 hover:bg-emerald-900 border border-emerald-800 text-xs font-semibold flex items-center gap-1 transition-all">
            <i data-lucide="arrow-down-circle" class="w-3.5 h-3.5"></i>
            <span>Load Demo to Form</span>
          </button>

        </div>

      </div>

    </div>
  `;
}

export function initSeedRateVideoExplainer() {
  const container = document.getElementById('seed-video-explainer-container');
  if (!container) return;

  let currentPart = 1;
  let isPlaying = false;
  let timer = null;
  let currentLang = 'en';
  let isSpeechEnabled = true;

  const scenes = {
    1: {
      title: "Step 1: Pure Live Seed (PLS %)",
      titleUrdu: "پہلا مرحلہ: پیور لائیو سیڈ (PLS %)",
      html: `
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold font-mono uppercase text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800">
              0:00 - 0:10 &bull; Tag Quality Analysis
            </span>
            <span class="text-xs text-slate-400 font-mono">Formula: (Germination × Purity) ÷ 100</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span class="text-[10px] text-slate-400 block font-mono">Seed Germination Rate</span>
              <span class="text-xl font-bold text-white font-mono mt-1 block">90.0 %</span>
              <span class="text-[10px] text-emerald-400 mt-0.5 block">Viable Embryos</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span class="text-[10px] text-slate-400 block font-mono">Seed Purity Index</span>
              <span class="text-xl font-bold text-white font-mono mt-1 block">98.0 %</span>
              <span class="text-[10px] text-emerald-400 mt-0.5 block">Pure Crop Seed</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-600 shadow-lg shadow-emerald-900/30">
              <span class="text-[10px] text-emerald-300 block font-mono">Pure Live Seed (PLS)</span>
              <span class="text-2xl font-extrabold text-emerald-300 font-mono mt-1 block">88.20 %</span>
              <span class="text-[10px] text-emerald-400 mt-0.5 block">True Viable Ratio</span>
            </div>
          </div>
        </div>
      `,
      subEn: "Never sow seed based on bag weight alone! Standard seed is never 100% pure or viable. Enter your seed tag's 90% germination and 98% purity. The system calculates your true Pure Live Seed at 88.2%.",
      subUr: "کبھی بھی صرف بوری کے وزن پر بیج کی مقدار طے نہ کریں! ایگری پلان گلوبل پر 90 فیصد اگاؤ اور 98 فیصد صفائی درج کریں، سسٹم فوراً آپ کو 88.2 فیصد پیور لائیو سیڈ (PLS) نکال کر دے گا۔"
    },
    2: {
      title: "Step 2: Plant Population & Field Requirement",
      titleUrdu: "دوسرا مرحلہ: پودوں کی تعداد اور فیلڈ ایمرجنس",
      html: `
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold font-mono uppercase text-sky-400 bg-sky-950/80 px-2.5 py-1 rounded-md border border-sky-800">
              0:10 - 0:20 &bull; Soil Emergence & TKW Mass
            </span>
            <span class="text-xs text-slate-400 font-mono">Target: 150,000 Plants/Acre &bull; TKW: 45g</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span class="text-[10px] text-slate-400 block font-mono">Target Plant Density</span>
              <span class="text-xl font-bold text-white font-mono mt-1 block">150k / Acre</span>
              <span class="text-[10px] text-slate-400 mt-0.5 block">10 Acres = 1.5M Plants</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span class="text-[10px] text-slate-400 block font-mono">Field Emergence Factor</span>
              <span class="text-xl font-bold text-amber-300 font-mono mt-1 block">85.0 %</span>
              <span class="text-[10px] text-amber-400 mt-0.5 block">15% Soil Mortality</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-sky-950/90 border border-sky-600 shadow-lg shadow-sky-900/30">
              <span class="text-[10px] text-sky-300 block font-mono">Pure Seed Mass Required</span>
              <span class="text-2xl font-extrabold text-sky-300 font-mono mt-1 block">79.4 kg/ac</span>
              <span class="text-[10px] text-sky-400 mt-0.5 block">Pure Seed Base</span>
            </div>
          </div>
        </div>
      `,
      subEn: "Next, enter your target population of 150,000 plants per acre, 85% expected field emergence, and 45-gram seed weight. The calculator accounts for soil mortality and determines you need 79.4 kg of pure live seed per acre.",
      subUr: "اب فی ایکڑ ڈیڑھ لاکھ پودوں کا ہدف، 85 فیصد فیلڈ ایمرجنس اور 45 گرام بیج کا وزن درج کریں۔ کیلکولیٹر زمین میں ضائع ہونے والے بیجوں کا حساب لگا کر اصل درکار مقدار طے کر دے گا۔"
    },
    3: {
      title: "Step 3: Final Bulk Seed & 18 Bags Output",
      titleUrdu: "تیسرا مرحلہ: مارکیٹ سے خریدنے کے لیے 18 بوریاں",
      html: `
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold font-mono uppercase text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800">
              0:20 - 0:30 &bull; Realized Bulk Seed Output
            </span>
            <span class="text-xs text-slate-400 font-mono">Bulk Rate = 79.4 kg ÷ 0.882 PLS</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span class="text-[10px] text-slate-400 block font-mono">Bulk Seed Rate</span>
              <span class="text-xl font-bold text-white font-mono mt-1 block">90.0 kg / Acre</span>
              <span class="text-[10px] text-emerald-400 mt-0.5 block">Adjusted for PLS</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-emerald-950/90 border border-emerald-500 shadow-xl">
              <span class="text-[10px] text-emerald-300 block font-mono">Total Seed for 10 Acres</span>
              <span class="text-2xl font-extrabold text-white font-mono mt-1 block">900 kg</span>
              <span class="text-[10px] text-emerald-400 mt-0.5 block">Exact Purchase Mass</span>
            </div>

            <div class="p-3.5 rounded-2xl bg-amber-950/90 border border-amber-500 shadow-xl">
              <span class="text-[10px] text-amber-300 block font-mono">Bags to Purchase (50kg)</span>
              <span class="text-2xl font-extrabold text-amber-300 font-mono mt-1 block">18 Bags</span>
              <span class="text-[10px] text-amber-400 mt-0.5 block">Zero Guesswork</span>
            </div>
          </div>
        </div>
      `,
      subEn: "Finally, it divides pure seed by your 88.2% PLS factor, giving you your exact purchase requirement: 90 kg per acre, or exactly 18 bags of 50kg for your 10-acre farm! Stop guessing, calculate free on AgriPlan Global.",
      subUr: "آخر میں یہ آپ کو خریدنے کے لیے بیج کی حتمی مقدار بتائے گا: 90 کلوگرام فی ایکڑ، یعنی 10 ایکڑ کے لیے پورے 18 تھیلے (50 کلو والے)! اپنا وقت اور پیسہ بچائیں۔ ابھی مفت حساب لگائیں!"
    }
  };

  const renderScene = (partNumber) => {
    currentPart = partNumber;
    const scene = scenes[partNumber];
    const contentEl = document.getElementById('video-scene-content');
    const titleEl = document.getElementById('video-narrator-title');
    const subtitleEl = document.getElementById('video-subtitle-text');
    const progressFill = document.getElementById('video-progress-fill');

    if (contentEl) contentEl.innerHTML = scene.html;
    if (titleEl) titleEl.textContent = currentLang === 'ur' ? scene.titleUrdu : scene.title;
    if (subtitleEl) subtitleEl.textContent = `"${currentLang === 'ur' ? scene.subUr : scene.subEn}"`;
    if (progressFill) progressFill.style.width = `${(partNumber / 3) * 100}%`;

    document.querySelectorAll('.video-part-tab').forEach(tab => {
      const p = parseInt(tab.dataset.part, 10);
      if (p === partNumber) {
        tab.className = 'video-part-tab px-3 py-1.5 rounded-xl bg-emerald-700 text-white font-semibold transition-all border border-emerald-500 shadow-sm';
      } else {
        tab.className = 'video-part-tab px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-700';
      }
    });

    if (window.lucide) window.lucide.createIcons();

    if (isSpeechEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentLang === 'ur' ? scene.subUr : scene.subEn);
      utterance.lang = currentLang === 'ur' ? 'ur-PK' : 'en-US';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startPlaying = () => {
    isPlaying = true;
    const playIcon = document.getElementById('video-play-icon');
    const playLabel = document.getElementById('video-play-label');
    if (playIcon) playIcon.setAttribute('data-lucide', 'pause');
    if (playLabel) playLabel.textContent = 'Pause';
    if (window.lucide) window.lucide.createIcons();

    clearInterval(timer);
    timer = setInterval(() => {
      if (currentPart < 3) {
        renderScene(currentPart + 1);
      } else {
        stopPlaying();
        renderScene(1);
      }
    }, 10000);
  };

  const stopPlaying = () => {
    isPlaying = false;
    clearInterval(timer);
    const playIcon = document.getElementById('video-play-icon');
    const playLabel = document.getElementById('video-play-label');
    if (playIcon) playIcon.setAttribute('data-lucide', 'play');
    if (playLabel) playLabel.textContent = 'Play Walkthrough';
    if (window.lucide) window.lucide.createIcons();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  // Event Listeners
  document.getElementById('video-play-btn')?.addEventListener('click', () => {
    if (isPlaying) stopPlaying();
    else startPlaying();
  });

  document.getElementById('video-replay-btn')?.addEventListener('click', () => {
    stopPlaying();
    renderScene(1);
  });

  document.querySelectorAll('.video-part-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      stopPlaying();
      const p = parseInt(tab.dataset.part, 10);
      renderScene(p);
    });
  });

  document.getElementById('video-lang-en')?.addEventListener('click', () => {
    currentLang = 'en';
    document.getElementById('video-lang-en')?.classList.add('bg-emerald-700', 'text-white');
    document.getElementById('video-lang-en')?.classList.remove('text-slate-400');
    document.getElementById('video-lang-ur')?.classList.remove('bg-emerald-700', 'text-white');
    document.getElementById('video-lang-ur')?.classList.add('text-slate-400');
    renderScene(currentPart);
  });

  document.getElementById('video-lang-ur')?.addEventListener('click', () => {
    currentLang = 'ur';
    document.getElementById('video-lang-ur')?.classList.add('bg-emerald-700', 'text-white');
    document.getElementById('video-lang-ur')?.classList.remove('text-slate-400');
    document.getElementById('video-lang-en')?.classList.remove('bg-emerald-700', 'text-white');
    document.getElementById('video-lang-en')?.classList.add('text-slate-400');
    renderScene(currentPart);
  });

  document.getElementById('video-audio-toggle')?.addEventListener('click', () => {
    isSpeechEnabled = !isSpeechEnabled;
    const btn = document.getElementById('video-audio-toggle');
    if (btn) {
      if (isSpeechEnabled) {
        btn.classList.add('text-emerald-300');
        btn.classList.remove('text-slate-500');
        renderScene(currentPart);
      } else {
        btn.classList.remove('text-emerald-300');
        btn.classList.add('text-slate-500');
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      }
    }
  });

  document.getElementById('video-load-values-btn')?.addEventListener('click', () => {
    const areaInput = document.getElementById('input-area');
    const unitInput = document.getElementById('input-areaUnit');
    const plantPop = document.getElementById('input-targetPlantPop');
    const germ = document.getElementById('input-germinationRate');
    const purity = document.getElementById('input-purity');
    const emergence = document.getElementById('input-fieldEmergence');
    const tkw = document.getElementById('input-tkw');

    if (areaInput) areaInput.value = 10;
    if (unitInput) unitInput.value = 'acre';
    if (plantPop) plantPop.value = 150000;
    if (germ) germ.value = 90;
    if (purity) purity.value = 98;
    if (emergence) emergence.value = 85;
    if (tkw) tkw.value = 45;

    areaInput?.dispatchEvent(new Event('input', { bubbles: true }));

    const formEl = document.getElementById('active-calculator-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  // Initial Scene Render
  renderScene(1);
}
