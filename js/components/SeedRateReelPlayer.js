/**
 * Vertical 9:16 Reel/Video Player for Seed Rate Calculation Explainer
 */

export function renderSeedRateReelPlayer() {
  return `
    <div class="my-10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 border border-emerald-800/60 shadow-2xl text-white">
      
      <div class="text-center max-w-xl mx-auto mb-6">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/80 text-emerald-300 text-xs font-semibold mb-2">
          <i data-lucide="video" class="w-3.5 h-3.5 text-emerald-400"></i>
          <span>Interactive Video Walkthrough</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold font-serif text-white">
          Seed Rate Calculation in Action
        </h3>
        <p class="text-xs text-slate-400 mt-1">
          Watch how Pure Live Seed (PLS), field emergence, and bulk bags are calculated in 25 seconds.
        </p>
      </div>

      <!-- Vertical Reel Phone Mockup Player -->
      <div class="flex justify-center">
        <div class="relative w-full max-w-[320px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-950 flex flex-col justify-between select-none group" id="reel-player-container">
          
          <!-- Background Scene Visual Layers -->
          <div class="absolute inset-0 z-0">
            <!-- Scene 1 Background Image -->
            <img 
              id="reel-bg-image"
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80" 
              alt="Farmer and laptop calculating seed rate" 
              class="w-full h-full object-cover opacity-60 transition-all duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70"></div>
          </div>

          <!-- Top HUD Header Overlay -->
          <div class="relative z-10 p-4 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400 radar-beacon"></span>
              <span class="text-[11px] font-bold text-white tracking-wider uppercase drop-shadow font-mono" id="reel-scene-badge">
                INTRODUCING AgriPlan Global
              </span>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/90 text-emerald-950 font-mono">
              100% FREE
            </span>
          </div>

          <!-- Center Dynamic Animated Scene Display -->
          <div class="relative z-10 px-4 py-2 my-auto" id="reel-scene-content">
            <!-- Dynamic Content Injected via JS -->
          </div>

          <!-- Bottom Player Controls Bar (Matching Screenshot UI) -->
          <div class="relative z-10 p-4 bg-slate-950/80 backdrop-blur-md border-t border-slate-800/80 space-y-3">
            
            <!-- Progress Scrubber -->
            <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden relative cursor-pointer" id="reel-progress-track">
              <div id="reel-progress-bar" class="h-full bg-emerald-400 transition-all duration-200 w-1/3"></div>
            </div>

            <!-- Buttons: Play/Pause, Timer & Speed -->
            <div class="flex items-center justify-between text-xs">
              <div class="flex items-center gap-2">
                <button id="reel-play-btn" class="w-8 h-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-all shadow-md">
                  <i data-lucide="pause" class="w-4 h-4" id="reel-play-icon"></i>
                </button>
                <span class="text-[11px] font-mono text-slate-300" id="reel-time-display">0:08 / 0:25</span>
              </div>

              <!-- Speed Toggle (1.0x / 1.5x) -->
              <button id="reel-speed-btn" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono font-bold border border-slate-700 transition-colors">
                1.0x
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  `;
}

export function initSeedRateReelPlayer() {
  const container = document.getElementById('reel-player-container');
  if (!container) return;

  let currentScene = 1;
  let isPlaying = true;
  let speed = 1.0;
  let progress = 0;
  let interval = null;

  const bgImages = {
    1: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80",
    2: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80",
    3: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80"
  };

  const scenes = {
    1: {
      badge: "STEP 1: PURE LIVE SEED",
      html: `
        <div class="space-y-3 text-center animate-fade-in">
          <div class="p-3.5 rounded-2xl bg-slate-900/90 border border-emerald-500/60 shadow-xl backdrop-blur-md">
            <span class="text-[10px] uppercase font-bold text-emerald-400 tracking-wider font-mono">Seed Tag Analysis</span>
            <div class="text-xs text-slate-200 mt-1 font-mono">
              90% Germination &bull; 98% Purity
            </div>
            <div class="mt-2 py-1.5 px-2 bg-emerald-950/80 rounded-xl border border-emerald-600 font-mono">
              <span class="text-[10px] text-emerald-300 block">Pure Live Seed (PLS)</span>
              <span class="text-2xl font-extrabold text-emerald-300">88.20 %</span>
            </div>
          </div>
          <p class="text-[11px] text-slate-300 font-sans leading-tight">
            Stop sowing based on bulk bag weight. Only viable seeds grow!
          </p>
        </div>
      `
    },
    2: {
      badge: "STEP 2: EMERGENCE & DENSITY",
      html: `
        <div class="space-y-3 text-center animate-fade-in">
          <div class="p-3.5 rounded-2xl bg-slate-900/90 border border-sky-500/60 shadow-xl backdrop-blur-md">
            <span class="text-[10px] uppercase font-bold text-sky-400 tracking-wider font-mono">Field Population</span>
            <div class="text-xs text-slate-200 mt-1 font-mono">
              150k Plants/ac &bull; 85% Emergence
            </div>
            <div class="mt-2 py-1.5 px-2 bg-sky-950/80 rounded-xl border border-sky-600 font-mono">
              <span class="text-[10px] text-sky-300 block">Pure Seed Base</span>
              <span class="text-2xl font-extrabold text-sky-300">79.4 kg/ac</span>
            </div>
          </div>
          <p class="text-[11px] text-slate-300 font-sans leading-tight">
            Accounts for 15% seedbed mortality and seed weight (45g TKW).
          </p>
        </div>
      `
    },
    3: {
      badge: "STEP 3: FINAL BAG REQUIREMENT",
      html: `
        <div class="space-y-3 text-center animate-fade-in">
          <div class="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/60 shadow-xl backdrop-blur-md">
            <span class="text-[10px] uppercase font-bold text-amber-400 tracking-wider font-mono">10 Acres Farm Total</span>
            <div class="text-xs text-slate-200 mt-1 font-mono">
              Bulk Rate: 90.0 kg / Acre
            </div>
            <div class="mt-2 py-1.5 px-2 bg-amber-950/80 rounded-xl border border-amber-500 font-mono">
              <span class="text-[10px] text-amber-300 block">Total Seed to Buy</span>
              <span class="text-2xl font-extrabold text-amber-300">18 Bags (900 kg)</span>
            </div>
          </div>
          <p class="text-[11px] text-emerald-300 font-sans font-semibold leading-tight">
            Zero waste • Accurate plant density • Maximum harvest yield!
          </p>
        </div>
      `
    }
  };

  const updateSceneDisplay = (sceneNum) => {
    currentScene = sceneNum;
    const content = document.getElementById('reel-scene-content');
    const badge = document.getElementById('reel-scene-badge');
    const bg = document.getElementById('reel-bg-image');

    if (content) content.innerHTML = scenes[sceneNum].html;
    if (badge) badge.textContent = scenes[sceneNum].badge;
    if (bg) bg.src = bgImages[sceneNum];
  };

  const tick = () => {
    progress += 0.5 * speed;
    if (progress > 25) {
      progress = 0;
    }

    const sec = Math.floor(progress);
    const timeDisplay = document.getElementById('reel-time-display');
    const progressBar = document.getElementById('reel-progress-bar');

    if (timeDisplay) timeDisplay.textContent = `0:${sec < 10 ? '0' + sec : sec} / 0:25`;
    if (progressBar) progressBar.style.width = `${(progress / 25) * 100}%`;

    let targetScene = 1;
    if (progress >= 8 && progress < 17) targetScene = 2;
    else if (progress >= 17) targetScene = 3;

    if (targetScene !== currentScene) {
      updateSceneDisplay(targetScene);
    }
  };

  const start = () => {
    isPlaying = true;
    const icon = document.getElementById('reel-play-icon');
    if (icon) icon.setAttribute('data-lucide', 'pause');
    if (window.lucide) window.lucide.createIcons();
    clearInterval(interval);
    interval = setInterval(tick, 500);
  };

  const stop = () => {
    isPlaying = false;
    const icon = document.getElementById('reel-play-icon');
    if (icon) icon.setAttribute('data-lucide', 'play');
    if (window.lucide) window.lucide.createIcons();
    clearInterval(interval);
  };

  document.getElementById('reel-play-btn')?.addEventListener('click', () => {
    if (isPlaying) stop();
    else start();
  });

  document.getElementById('reel-speed-btn')?.addEventListener('click', () => {
    if (speed === 1.0) speed = 1.5;
    else if (speed === 1.5) speed = 2.0;
    else speed = 1.0;

    const btn = document.getElementById('reel-speed-btn');
    if (btn) btn.textContent = `${speed.toFixed(1)}x`;
  });

  updateSceneDisplay(1);
  start();
}
