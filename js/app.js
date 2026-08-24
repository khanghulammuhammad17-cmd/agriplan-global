import { renderNavbar } from './components/Navbar.js';
import { renderFooter } from './components/Footer.js';
import { renderSearchModal, performGlobalSearch } from './components/SearchModal.js';
import { handleRouting } from './router.js';
import { getCalculatorBySlug } from './data/calculatorsData.js';
import { executeCalculator, formatResultCards } from './components/calcRunner.js';
import { generateCropPlanOutput } from './pages/CropPlannerPage.js';

// Initialize Core Application
document.addEventListener('DOMContentLoaded', () => {
  const navContainer = document.getElementById('app-header');
  const footerContainer = document.getElementById('app-footer');
  const modalContainer = document.getElementById('app-modal');

  if (navContainer) navContainer.innerHTML = renderNavbar();
  if (footerContainer) footerContainer.innerHTML = renderFooter();
  if (modalContainer) modalContainer.innerHTML = renderSearchModal();

  // Initial Route
  handleRouting();
  window.addEventListener('hashchange', handleRouting);

  // Global Event Listeners
  initGlobalEventListeners();
  initSearchModalListeners();
});

// Post-Page Render Event Dispatcher
window.addEventListener('page-rendered', (e) => {
  const path = e.detail.path || '';

  // 1. If single calculator page, auto-calculate initial values
  const calcView = document.getElementById('calculator-view');
  if (calcView) {
    const slug = calcView.dataset.slug;
    triggerActiveCalculation(slug);
    setupCalculatorEvents(slug);
  }

  // 2. If crop planner, generate initial default plan
  const plannerContainer = document.getElementById('planner-results-container');
  if (plannerContainer) {
    setupCropPlannerEvents();
  }

  // 3. Setup Homepage & Directory filters
  setupCategoryFilters();

  // 4. Setup Calendar filters
  setupCalendarFilters();

  // 5. Setup Precision Ag visualizer
  setupPrecisionAgEvents();

  // 6. Setup Contact form
  setupContactFormEvents();

  // Re-create icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

function initGlobalEventListeners() {
  // Mobile drawer toggle
  document.addEventListener('click', (e) => {
    const menuBtn = e.target.closest('#mobile-menu-btn');
    const closeBtn = e.target.closest('#mobile-drawer-close');
    const mobileLink = e.target.closest('.mobile-link');
    const drawer = document.getElementById('mobile-drawer');
    const drawerContent = document.getElementById('mobile-drawer-content');

    if (menuBtn && drawer && drawerContent) {
      drawer.classList.remove('opacity-0', 'pointer-events-none');
      drawerContent.classList.remove('translate-x-full');
    } else if ((closeBtn || mobileLink || e.target === drawer) && drawer && drawerContent) {
      drawer.classList.add('opacity-0', 'pointer-events-none');
      drawerContent.classList.add('translate-x-full');
    }
  });

  // Global keyboard shortcut for search (Ctrl+K or Cmd+K)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearchModal();
    }
    if (e.key === 'Escape') {
      closeSearchModal();
    }
  });
}

function initSearchModalListeners() {
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('#search-modal-trigger');
    const closeBtn = e.target.closest('#search-modal-close-btn');
    const tag = e.target.closest('.search-tag');
    const modal = document.getElementById('search-modal');
    const modalBox = document.getElementById('search-modal-box');
    const searchItem = e.target.closest('.search-result-item');

    if (trigger) {
      openSearchModal();
    } else if (closeBtn || (modal && e.target === modal)) {
      closeSearchModal();
    } else if (tag) {
      const term = tag.dataset.term;
      const input = document.getElementById('global-search-input');
      if (input) {
        input.value = term;
        input.dispatchEvent(new Event('input'));
      }
    } else if (searchItem) {
      closeSearchModal();
    }
  });

  document.addEventListener('input', (e) => {
    if (e.target && e.target.id === 'global-search-input') {
      const resultsContainer = document.getElementById('search-results');
      if (resultsContainer) {
        resultsContainer.innerHTML = performGlobalSearch(e.target.value);
        if (window.lucide) window.lucide.createIcons();
      }
    }
  });
}

function openSearchModal() {
  const modal = document.getElementById('search-modal');
  const modalBox = document.getElementById('search-modal-box');
  const input = document.getElementById('global-search-input');
  if (modal && modalBox) {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modalBox.classList.remove('scale-95');
    modalBox.classList.add('scale-100');
    setTimeout(() => { if (input) input.focus(); }, 50);
  }
}

function closeSearchModal() {
  const modal = document.getElementById('search-modal');
  const modalBox = document.getElementById('search-modal-box');
  if (modal && modalBox) {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modalBox.classList.remove('scale-100');
    modalBox.classList.add('scale-95');
  }
}

function setupCalculatorEvents(slug) {
  const form = document.getElementById('active-calculator-form');
  const submitBtn = document.getElementById('calc-submit-btn');
  const resetBtn = document.getElementById('calc-reset-btn');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => triggerActiveCalculation(slug));
  }

  if (form) {
    form.addEventListener('input', () => triggerActiveCalculation(slug));
    form.addEventListener('change', () => triggerActiveCalculation(slug));
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const calc = getCalculatorBySlug(slug);
      if (calc && calc.defaultInputs) {
        Object.keys(calc.defaultInputs).forEach(key => {
          const inputEl = document.getElementById(`input-${key}`);
          if (inputEl) {
            if (inputEl.type === 'checkbox') inputEl.checked = !!calc.defaultInputs[key];
            else inputEl.value = calc.defaultInputs[key];
          }
        });
        triggerActiveCalculation(slug);
      }
    });
  }
}

function triggerActiveCalculation(slug) {
  const calc = getCalculatorBySlug(slug);
  if (!calc) return;

  const inputs = {};
  const form = document.getElementById('active-calculator-form');
  if (form) {
    const inputElements = form.querySelectorAll('input, select');
    inputElements.forEach(el => {
      const name = el.id.replace(/^input-/, '');
      if (el.type === 'checkbox') {
        inputs[name] = el.checked;
      } else {
        inputs[name] = el.value;
      }
    });
  }

  // Execute calculation engine safely
  try {
    const result = executeCalculator(slug, inputs);
    const outputContainer = document.getElementById('dynamic-result-output');
    const stepContainer = document.getElementById('dynamic-step-breakdown');

    if (outputContainer) {
      outputContainer.innerHTML = formatResultCards(slug, result);
    }

    if (stepContainer && result.steps) {
      stepContainer.innerHTML = result.steps.map(s => `<div>&bull; ${s}</div>`).join('');
    }
  } catch (err) {
    console.error('Calculation error:', err);
  }
}

function setupCropPlannerEvents() {
  const generateBtn = document.getElementById('planner-generate-btn');
  const resultsContainer = document.getElementById('planner-results-container');

  const updatePlan = () => {
    const crop = document.getElementById('planner-crop-select')?.value || 'wheat';
    const area = document.getElementById('planner-area')?.value || 10;
    const unit = document.getElementById('planner-area-unit')?.value || 'ha';
    const date = document.getElementById('planner-plant-date')?.value || '2026-10-15';
    const soil = document.getElementById('planner-soil-type')?.value || 'loam';
    const irrig = document.getElementById('planner-irrig-type')?.value || 'drip';

    if (resultsContainer) {
      resultsContainer.innerHTML = generateCropPlanOutput(crop, area, unit, date, soil, irrig);
      if (window.lucide) window.lucide.createIcons();
    }
  };

  updatePlan();
  if (generateBtn) generateBtn.addEventListener('click', updatePlan);
  document.getElementById('planner-crop-select')?.addEventListener('change', updatePlan);
}

function setupCategoryFilters() {
  // Homepage calculator filter tabs
  const homeButtons = document.querySelectorAll('#home-calc-filter-tabs .cat-filter-btn');
  const homeCards = document.querySelectorAll('#home-calculators-grid .calc-card');

  homeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      homeButtons.forEach(b => {
        b.classList.remove('active', 'bg-emerald-800', 'text-white', 'shadow-sm');
        b.classList.add('text-slate-600', 'hover:bg-slate-100');
      });
      btn.classList.add('active', 'bg-emerald-800', 'text-white', 'shadow-sm');
      btn.classList.remove('text-slate-600', 'hover:bg-slate-100');

      const cat = btn.dataset.cat;
      homeCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Directory filter tabs & live text filter
  const dirButtons = document.querySelectorAll('#calc-index-filter-tabs .calc-tab-btn');
  const dirCards = document.querySelectorAll('#calc-index-grid .calc-index-card');
  const dirInput = document.getElementById('calc-filter-input');

  let activeCat = 'all';
  let searchTerm = '';

  const applyDirFilter = () => {
    dirCards.forEach(card => {
      const matchCat = activeCat === 'all' || card.dataset.category === activeCat;
      const matchText = !searchTerm || card.textContent.toLowerCase().includes(searchTerm);
      card.style.display = matchCat && matchText ? 'flex' : 'none';
    });
  };

  dirButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dirButtons.forEach(b => {
        b.classList.remove('active', 'bg-emerald-800', 'text-white', 'shadow-sm');
        b.classList.add('bg-slate-100', 'text-slate-600');
      });
      btn.classList.add('active', 'bg-emerald-800', 'text-white', 'shadow-sm');
      btn.classList.remove('bg-slate-100', 'text-slate-600');
      activeCat = btn.dataset.cat;
      applyDirFilter();
    });
  });

  if (dirInput) {
    dirInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase().trim();
      applyDirFilter();
    });
  }
}

function setupCalendarFilters() {
  // Field Crops Calendar Filter
  const cropZone = document.getElementById('calendar-zone-filter');
  const cropCat = document.getElementById('calendar-cat-filter');
  const cropMonth = document.getElementById('calendar-month-filter');
  const cropSearch = document.getElementById('calendar-search-input');
  const cropRows = document.querySelectorAll('#crops-calendar-tbody .calendar-row');

  const filterCropCalendar = () => {
    const z = cropZone?.value || 'all';
    const c = cropCat?.value || 'all';
    const m = cropMonth?.value || 'all';
    const s = (cropSearch?.value || '').toLowerCase().trim();

    cropRows.forEach(row => {
      const zoneMatch = z === 'all' || row.dataset.zone === z;
      const catMatch = c === 'all' || row.dataset.category === c;
      const searchMatch = !s || row.dataset.name.includes(s);

      let monthMatch = true;
      if (m !== 'all') {
        const mIdx = parseInt(m, 10);
        const cell = row.querySelector(`[data-month="${mIdx}"]`);
        if (cell) {
          const text = cell.textContent.trim();
          monthMatch = text === 'P' || text === 'H';
        }
      }

      row.style.display = (zoneMatch && catMatch && searchMatch && monthMatch) ? '' : 'none';
    });
  };

  cropZone?.addEventListener('change', filterCropCalendar);
  cropCat?.addEventListener('change', filterCropCalendar);
  cropMonth?.addEventListener('change', filterCropCalendar);
  cropSearch?.addEventListener('input', filterCropCalendar);

  // Fruit Calendar Filter
  const fruitZone = document.getElementById('fruit-zone-filter');
  const fruitMonth = document.getElementById('fruit-month-filter');
  const fruitSearch = document.getElementById('fruit-search-input');
  const fruitRows = document.querySelectorAll('#fruit-calendar-tbody .fruit-row');

  const filterFruitCalendar = () => {
    const z = fruitZone?.value || 'all';
    const m = fruitMonth?.value || 'all';
    const s = (fruitSearch?.value || '').toLowerCase().trim();

    fruitRows.forEach(row => {
      const zoneMatch = z === 'all' || row.dataset.zone === z;
      const searchMatch = !s || row.dataset.name.includes(s);
      let monthMatch = true;
      if (m !== 'all') {
        const mIdx = parseInt(m, 10);
        const cell = row.querySelector(`[data-month="${mIdx}"]`);
        if (cell) {
          monthMatch = cell.textContent.trim() === 'H';
        }
      }
      row.style.display = (zoneMatch && searchMatch && monthMatch) ? '' : 'none';
    });
  };

  fruitZone?.addEventListener('change', filterFruitCalendar);
  fruitMonth?.addEventListener('change', filterFruitCalendar);
  fruitSearch?.addEventListener('input', filterFruitCalendar);

  // Vegetable Calendar Filter
  const vegZone = document.getElementById('veg-zone-filter');
  const vegMonth = document.getElementById('veg-month-filter');
  const vegSearch = document.getElementById('veg-search-input');
  const vegRows = document.querySelectorAll('#veg-calendar-tbody .veg-row');

  const filterVegCalendar = () => {
    const z = vegZone?.value || 'all';
    const m = vegMonth?.value || 'all';
    const s = (vegSearch?.value || '').toLowerCase().trim();

    vegRows.forEach(row => {
      const zoneMatch = z === 'all' || row.dataset.zone === z;
      const searchMatch = !s || row.dataset.name.includes(s);
      let monthMatch = true;
      if (m !== 'all') {
        const mIdx = parseInt(m, 10);
        const cell = row.querySelector(`[data-month="${mIdx}"]`);
        if (cell) {
          const t = cell.textContent.trim();
          monthMatch = t === 'P' || t === 'H';
        }
      }
      row.style.display = (zoneMatch && searchMatch && monthMatch) ? '' : 'none';
    });
  };

  vegZone?.addEventListener('change', filterVegCalendar);
  vegMonth?.addEventListener('change', filterVegCalendar);
  vegSearch?.addEventListener('input', filterVegCalendar);
}

function setupPrecisionAgEvents() {
  const layerTabs = document.querySelectorAll('.layer-tab');
  const fieldZones = document.querySelectorAll('.field-zone');
  const layerLabel = document.getElementById('active-layer-name');

  layerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      layerTabs.forEach(t => {
        t.classList.remove('active', 'bg-emerald-700', 'text-white', 'shadow-sm');
        t.classList.add('text-slate-400');
      });
      tab.classList.add('active', 'bg-emerald-700', 'text-white', 'shadow-sm');
      tab.classList.remove('text-slate-400');

      const layer = tab.dataset.layer;
      if (layerLabel) {
        if (layer === 'ndvi') layerLabel.textContent = 'NDVI Canopy Vigor Index';
        else if (layer === 'moisture') layerLabel.textContent = 'Volumetric Soil Moisture Map';
        else if (layer === 'vrt') layerLabel.textContent = 'Variable Rate (VRT) Prescription';
        else if (layer === 'elevation') layerLabel.textContent = 'Surface Topography & Drainage';
      }
    });
  });

  fieldZones.forEach(zone => {
    zone.addEventListener('click', () => {
      const zId = document.getElementById('telemetry-zone-id');
      const zCrop = document.getElementById('telemetry-crop');
      const zArea = document.getElementById('telemetry-area');
      const zNdvi = document.getElementById('telemetry-ndvi');
      const zMoisture = document.getElementById('telemetry-moisture');
      const zFert = document.getElementById('telemetry-fert');
      const zStatus = document.getElementById('telemetry-status');

      if (zId) zId.textContent = zone.dataset.zone;
      if (zCrop) zCrop.textContent = zone.dataset.crop;
      if (zArea) zArea.textContent = zone.dataset.area;
      if (zNdvi) zNdvi.textContent = zone.dataset.ndvi;
      if (zMoisture) zMoisture.textContent = zone.dataset.moisture;
      if (zFert) zFert.textContent = zone.dataset.fert;
      if (zStatus) zStatus.textContent = zone.dataset.status;
    });
  });
}

function setupContactFormEvents() {
  const submitBtn = document.getElementById('contact-submit-btn');
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('contact-success-msg');

  if (submitBtn && form) {
    submitBtn.addEventListener('click', () => {
      const name = document.getElementById('contact-name')?.value;
      const email = document.getElementById('contact-email')?.value;
      const msg = document.getElementById('contact-message')?.value;

      if (!name || !email || !msg) {
        alert('Please fill out all required fields.');
        return;
      }

      form.classList.add('hidden');
      if (successMsg) {
        successMsg.classList.remove('hidden');
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }
}
