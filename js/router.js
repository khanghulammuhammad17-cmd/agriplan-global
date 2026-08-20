import { renderHomePage } from './pages/HomePage.js';
import { renderCalculatorsIndexPage } from './pages/CalculatorsIndexPage.js';
import { renderCalculatorPage } from './components/CalculatorView.js';
import { renderCropCalendarPage } from './pages/CropCalendarPage.js';
import { renderFruitCalendarPage } from './pages/FruitCalendarPage.js';
import { renderVegetableCalendarPage } from './pages/VegetableCalendarPage.js';
import { renderCropPlannerPage } from './pages/CropPlannerPage.js';
import { renderCropSinglePage } from './pages/CropSinglePage.js';
import { renderGuidesIndexPage, renderGuideSinglePage } from './pages/GuidesPage.js';
import { renderMethodologyPage } from './pages/MethodologyPage.js';
import { renderAboutPage, renderContactPage, renderPrivacyPage, renderTermsPage, renderDisclaimerPage } from './pages/LegalPages.js';
import { getCalculatorBySlug } from './data/calculatorsData.js';
import { getCropById } from './data/cropsData.js';
import { getGuideById } from './data/guidesData.js';

export function handleRouting() {
  const rawHash = window.location.hash || '#/';
  const path = rawHash.replace(/^#/, '') || '/';
  const appContainer = document.getElementById('app-main');
  if (!appContainer) return;

  // Clean route matching
  const segments = path.split('/').filter(Boolean);

  let html = '';
  let pageTitle = 'Global Agriculture Planning Platform | Farm Calculators & Crop Planning';
  let metaDesc = 'Global Agriculture Planning Platform offers free farm calculators, crop planning tools, seed rate, fertilizer, irrigation, soil, yield, and seasonal fruit and vegetable planning resources.';

  if (segments.length === 0 || segments[0] === '') {
    // 1. Homepage
    html = renderHomePage();
    pageTitle = 'Global Agriculture Planning Platform | Farm Calculators & Crop Planning';
    metaDesc = 'Global Agriculture Planning Platform offers free farm calculators, crop planning tools, seed rate, fertilizer, irrigation, soil, yield, and seasonal fruit and vegetable planning resources.';
  } else if (segments[0] === 'tools') {
    if (segments.length === 1) {
      // 2. All 30 Calculators
      html = renderCalculatorsIndexPage();
      pageTitle = 'All 30 Agricultural Calculators | Global Agriculture Planning Platform';
      metaDesc = 'Explore 30 scientific agricultural calculators for seed rate, fertilizer requirements, FAO-56 Penman ETo, irrigation scheduling, and farm ROI.';
    } else {
      // 3. Single Calculator
      const slug = segments[1];
      const calc = getCalculatorBySlug(slug);
      html = renderCalculatorPage(slug);
      if (calc) {
        pageTitle = `${calc.h1} | Global Agriculture Planning Platform`;
        metaDesc = calc.intro;
      }
    }
  } else if (segments[0] === 'crop-calendar') {
    html = renderCropCalendarPage();
    pageTitle = 'Seasonal Crop Calendar | Global Agriculture Planning Platform';
    metaDesc = 'Explore seasonal planting, vegetative development, and harvest calendar windows for field crops across temperate, subtropical, tropical, and arid zones.';
  } else if (segments[0] === 'fruit-calendar') {
    html = renderFruitCalendarPage();
    pageTitle = 'Fruit Calendar (15 Species) | Global Agriculture Planning Platform';
    metaDesc = 'Comprehensive seasonal fruit calendar for apple, banana, mango, citrus, peach, plum, grapes, strawberry, watermelon, and melons.';
  } else if (segments[0] === 'vegetable-calendar') {
    html = renderVegetableCalendarPage();
    pageTitle = 'Vegetable Calendar (20 Species) | Global Agriculture Planning Platform';
    metaDesc = 'Seasonal vegetable growing and sowing calendar for tomato, potato, onion, carrot, spinach, lettuce, cucumber, pepper, cabbage, and broccoli.';
  } else if (segments[0] === 'crop-planner') {
    html = renderCropPlannerPage();
    pageTitle = 'Interactive Crop Planner | Global Agriculture Planning Platform';
    metaDesc = 'Dynamic agricultural crop planner: calculate seasonal timelines, irrigation water demands, and fertilizer programs for your farm acreage.';
  } else if (segments[0] === 'crops') {
    const cropId = segments[1];
    const crop = getCropById(cropId);
    html = renderCropSinglePage(cropId);
    if (crop) {
      pageTitle = `${crop.name} Agronomy & Production Guide | AgriPlan Global`;
      metaDesc = `Complete agronomic profile for ${crop.name} (${crop.scientificName}): seed rates, planting windows, soil pH, Kc crop coefficients, and calculators.`;
    }
  } else if (segments[0] === 'guides') {
    if (segments.length === 1) {
      html = renderGuidesIndexPage();
      pageTitle = 'Farming & Agronomy Guides | Global Agriculture Planning Platform';
      metaDesc = 'Practical agricultural guides covering crop rotation, seed science, soil chemistry, 4R fertilizer stewardship, and irrigation engineering.';
    } else {
      const guideId = segments[1];
      const guide = getGuideById(guideId);
      html = renderGuideSinglePage(guideId);
      if (guide) {
        pageTitle = `${guide.title} | AgriPlan Global Guides`;
        metaDesc = guide.excerpt;
      }
    }
  } else if (segments[0] === 'methodology') {
    html = renderMethodologyPage();
    pageTitle = 'Calculation Methodology & Research Sources | AgriPlan Global';
    metaDesc = 'Detailed documentation of FAO-56 Penman-Monteith, USDA-NRCS, and university extension agronomic formulas used across AgriPlan Global.';
  } else if (segments[0] === 'about') {
    html = renderAboutPage();
    pageTitle = 'About Us | Global Agriculture Planning Platform';
    metaDesc = 'Learn about the mission, scientific standards, and open-access agricultural technology behind AgriPlan Global.';
  } else if (segments[0] === 'contact') {
    html = renderContactPage();
    pageTitle = 'Contact & Support | Global Agriculture Planning Platform';
    metaDesc = 'Contact the AgriPlan Global agronomy team for calculation feedback, research partnerships, and inquiries.';
  } else if (segments[0] === 'privacy') {
    html = renderPrivacyPage();
    pageTitle = 'Privacy Policy | Global Agriculture Planning Platform';
  } else if (segments[0] === 'terms') {
    html = renderTermsPage();
    pageTitle = 'Terms of Use | Global Agriculture Planning Platform';
  } else if (segments[0] === 'disclaimer') {
    html = renderDisclaimerPage();
    pageTitle = 'Agricultural Disclaimer | Global Agriculture Planning Platform';
  } else {
    html = renderHomePage();
  }

  // Update DOM & Metadata
  appContainer.innerHTML = html;
  document.title = pageTitle;

  const metaDescEl = document.querySelector('meta[name="description"]');
  if (metaDescEl) metaDescEl.setAttribute('content', metaDesc);

  const ogTitleEl = document.querySelector('meta[property="og:title"]');
  if (ogTitleEl) ogTitleEl.setAttribute('content', pageTitle);

  const ogDescEl = document.querySelector('meta[property="og:description"]');
  if (ogDescEl) ogDescEl.setAttribute('content', metaDesc);

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Post-render lifecycle hooks
  setupPageInteractions(path);
}

function setupPageInteractions(path) {
  // Dispatched from app.js
  window.dispatchEvent(new CustomEvent('page-rendered', { detail: { path } }));
}
