/**
 * 9 Comprehensive Agricultural Farming Guides
 */

export const GUIDES_DATA = [
  {
    id: 'crop-planning',
    title: 'Modern Crop Planning: Rotation, Yield Targets & Enterprise Design',
    category: 'Crop Planning',
    readTime: '8 min read',
    publishedDate: '2026-05-12',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Aerial panoramic view of vibrant crop rotation fields and hedgerows',
    excerpt: 'How to structure multi-year crop rotations, calculate field capacities, balance rotational pest cycles, and align market demand with farm acreage.',
    content: `
      <h2>1. The Agronomic Foundations of Crop Rotation</h2>
      <p>Systematic crop rotation is the most effective biological defense against soil-borne pathogens, weed seedbank buildup, and nutrient stratification. By alternating plant families (such as Poaceae cereals, Fabaceae legumes, and Brassicaceae crucifers), growers break the reproductive life cycles of nematodes, root rots (like <em>Fusarium</em> and <em>Gaeumannomyces</em>), and specialized weeds.</p>
      
      <h3>Key Rotational Principles</h3>
      <ul>
        <li><strong>Legume-Cereal Succession:</strong> Follow pulse crops (soybeans, chickpeas, clover) with high-nitrogen-demand cereals (wheat, corn) to capitalize on 20-50 kg/ha of biological nitrogen credits.</li>
        <li><strong>Root Architecture Alternation:</strong> Alternate deep taproot crops (sunflowers, alfalfa, canola) that penetrate subsoil hardpans with shallow fibrous root crops (maize, barley) that bind topsoil aggregates.</li>
        <li><strong>Allelopathy and Biofumigation:</strong> Incorporate brassica green manures (e.g. mustard) to release glucosinolates that naturally suppress soil fungal pathogens.</li>
      </ul>

      <h2>2. Setting Realistic Yield Goals</h2>
      <p>Target yield should be calculated as the 5-year rolling average yield plus 5-10% under optimal management, rather than unachievable record yields. Fertilizer and irrigation programs calibrated for unrealistic yields waste capital and contaminate groundwater via nitrate leaching.</p>
    `,
    relatedCalculators: ['crop-area-calculator', 'crop-yield-calculator', 'crop-production-cost-calculator']
  },
  {
    id: 'seed-selection',
    title: 'Seed Selection, Pure Live Seed (PLS) & Seeding Density Optimization',
    category: 'Seed Selection',
    readTime: '7 min read',
    publishedDate: '2026-05-18',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Agronomist holding pure golden seeds in cupped hands',
    excerpt: 'A rigorous guide to assessing certified seed tags, calculating Pure Live Seed (PLS), and adjusting drill seeding rates for Thousand Kernel Weight (TKW).',
    content: `
      <h2>1. Understanding the Certified Seed Tag</h2>
      <p>Certified seed guarantees varietal purity, physical cleanliness, and minimum laboratory germination. Key parameters specified on every official seed lot tag include:</p>
      <ul>
        <li><strong>Pure Seed %:</strong> The percentage by weight of the declared crop species free from weed seeds and inert dirt.</li>
        <li><strong>Germination %:</strong> The percentage of seeds that produce normal seedlings under ideal standard lab tests (ISTA/AOSA).</li>
        <li><strong>Thousand Kernel Weight (TKW / TGW):</strong> The physical weight in grams of 1,000 clean seeds, which can fluctuate by up to 40% between varieties and harvest seasons.</li>
      </ul>

      <h2>2. Pure Live Seed (PLS) Math</h2>
      <p>Pure Live Seed defines the true biological value of a seed bag: <code>PLS % = (Germination % × Purity %) ÷ 100</code>. When purchasing seed lots with 85% germination and 95% purity, the PLS is 80.75%. You must increase seeding rate by <code>1 ÷ 0.8075 = 1.238</code> (+23.8%) to deliver the target number of viable seedlings per square meter.</p>
    `,
    relatedCalculators: ['seed-rate-calculator', 'seeding-density-calculator', 'germination-rate-calculator']
  },
  {
    id: 'soil-management',
    title: 'Soil Health, Cation Exchange Capacity (CEC) & pH Buffering',
    category: 'Soil Management',
    readTime: '9 min read',
    publishedDate: '2026-06-02',
    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Rich dark humus soil held in hands showing crumbly aggregate structure',
    excerpt: 'Mastering soil physical properties, organic matter mineralization, CEC base saturation ratios, and agricultural lime buffering.',
    content: `
      <h2>1. Soil pH and Nutrient Availability</h2>
      <p>Soil pH regulates chemical solubility and microbial enzyme activity. At acidic pH below 5.5, aluminum and manganese reach plant-toxic concentrations while phosphorus precipitates into insoluble aluminum phosphates. At alkaline pH above 7.8, phosphorus binds with calcium and micronutrients (iron, zinc, manganese) become severely locked.</p>
      
      <h2>2. Cation Exchange Capacity (CEC)</h2>
      <p>CEC measures the soil's negative surface charge and ability to hold positively charged nutrient ions (Ca²⁺, Mg²⁺, K⁺, NH₄⁺, H⁺, Al³⁺). Sandy soils (CEC 3-8 meq/100g) require frequent small nutrient applications, whereas clay and organic soils (CEC 20-40 meq/100g) retain larger nutrient reservoirs resistant to rapid leaching.</p>
    `,
    relatedCalculators: ['lime-requirement-calculator', 'compost-application-calculator', 'fertilizer-requirement-calculator']
  },
  {
    id: 'fertilizer-management',
    title: 'Precision Fertilizer Management: The 4R Nutrient Stewardship Framework',
    category: 'Fertilizer Management',
    readTime: '10 min read',
    publishedDate: '2026-06-14',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Modern high-clearance tractor applying precision liquid fertilizer to young crops',
    excerpt: 'Applying Right Source, Right Rate, Right Time, and Right Place to maximize nutrient use efficiency and prevent environmental losses.',
    content: `
      <h2>1. The 4R Nutrient Stewardship Principles</h2>
      <ul>
        <li><strong>Right Source:</strong> Match fertilizer chemistry to soil pH and crop uptake preference (e.g. using ammonium vs nitrate, or SOP instead of MOP for chloride-sensitive crops).</li>
        <li><strong>Right Rate:</strong> Calibrate applications using soil-test calibration curves, yield targets, and organic credits.</li>
        <li><strong>Right Time:</strong> Synchronize nutrient availability with peak crop vegetative and reproductive uptake curves.</li>
        <li><strong>Right Place:</strong> Band phosphorus near root zones to minimize fixation and inject or incorporate urea to prevent gaseous ammonia volatilization.</li>
      </ul>
    `,
    relatedCalculators: ['npk-calculator', 'nitrogen-requirement-calculator', 'phosphorus-requirement-calculator', 'potassium-requirement-calculator']
  },
  {
    id: 'irrigation',
    title: 'Irrigation Engineering: Evapotranspiration, Soil Moisture & Efficiency',
    category: 'Irrigation',
    readTime: '11 min read',
    publishedDate: '2026-06-28',
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Center pivot irrigation system watering agricultural crop fields in the evening sun',
    excerpt: 'Engineering crop water balances with FAO-56 Penman-Monteith reference ET, soil-water holding characteristics, and drip runtime scheduling.',
    content: `
      <h2>1. The Soil-Water Reservoir Concept</h2>
      <p>Soil acts as an earthen sponge holding water between two critical hydraulic thresholds:</p>
      <ul>
        <li><strong>Field Capacity (FC):</strong> The volume of water retained against gravitational drainage after 24-48 hours.</li>
        <li><strong>Permanent Wilting Point (WP):</strong> The soil water potential (-1500 kPa / -15 bar) below which plant root suction cannot extract water molecules bound to soil minerals.</li>
      </ul>
      <p><strong>Total Available Water (TAW):</strong> <code>TAW (mm) = 1,000 × (FC - WP) × Rooting Depth (m)</code>. To avoid crop stomatal closure and yield penalty, irrigation must be triggered before depletion exceeds the allowable depletion fraction (typically 40-50% for vegetables, 50-60% for grains).</p>
    `,
    relatedCalculators: ['eto-calculator', 'crop-water-requirement-calculator', 'irrigation-scheduling-calculator', 'irrigation-runtime-calculator']
  },
  {
    id: 'sustainable-agriculture',
    title: 'Regenerative & Sustainable Agriculture: Soil Carbon, Cover Crops & Biodiversity',
    category: 'Sustainable Agriculture',
    readTime: '8 min read',
    publishedDate: '2026-07-04',
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Multi-species flowering cover crop mix growing vigorously between cash crop rows',
    excerpt: 'Practical implementation of conservation tillage, multi-species cover crops, integrated pest management (IPM), and soil organic carbon sequestration.',
    content: `
      <h2>1. Five Core Principles of Soil Health</h2>
      <ol>
        <li><strong>Minimize Soil Disturbance:</strong> Reduce or eliminate inversion plowing to preserve fungal mycorrhizal networks and aggregate stability.</li>
        <li><strong>Maximize Soil Cover:</strong> Maintain crop residue armor to prevent erosion, insulate soil temperature, and suppress weed germination.</li>
        <li><strong>Continuous Living Roots:</strong> Keep active photosynthetic root exudates feeding soil biology throughout the year using cover crops.</li>
        <li><strong>Biodiversity:</strong> Diversify crop rotations and intercropping mixes.</li>
        <li><strong>Livestock Integration:</strong> Graze cover crops where feasible to cycle nutrients rapidly into biological organic matter.</li>
      </ol>
    `,
    relatedCalculators: ['compost-application-calculator', 'crop-yield-calculator']
  },
  {
    id: 'precision-agriculture',
    title: 'Precision Agriculture: Variable Rate Application, NDVI & Telemetry',
    category: 'Precision Agriculture',
    readTime: '9 min read',
    publishedDate: '2026-07-12',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Agricultural drone flying over green crop fields collecting multispectral mapping data',
    excerpt: 'Leveraging satellite NDVI spectral indices, electrical conductivity (EC) soil mapping, ISOBUS tractor control, and variable rate prescriptions.',
    content: `
      <h2>1. Multispectral Vegetation Indices (NDVI)</h2>
      <p>Normalized Difference Vegetation Index (NDVI) measures chlorophyll absorption in the red band (660 nm) and cell structure reflection in near-infrared (840 nm): <code>NDVI = (NIR - Red) ÷ (NIR + Red)</code>. Healthy, dense vegetative canopies yield NDVI values between 0.60 and 0.85, whereas water-stressed or nitrogen-deficient crops drop below 0.40.</p>
      
      <h2>2. Variable Rate Technology (VRT)</h2>
      <p>VRT replaces uniform field broadcasting with prescription maps that allocate fertilizer, seed, and lime precisely where return on investment is highest, trimming 10-25% of input waste on undulating or heterogeneous soils.</p>
    `,
    relatedCalculators: ['sprayer-calibration-calculator', 'fertilizer-application-rate-calculator', 'seed-rate-calculator']
  },
  {
    id: 'farm-economics',
    title: 'Farm Economics: Enterprise Budgeting, Break-Even & Risk Hedging',
    category: 'Farm Economics',
    readTime: '10 min read',
    publishedDate: '2026-07-20',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Farm financial management budget sheets, calculator, and agricultural reports',
    excerpt: 'Calculating operating margins, direct vs overhead costs, break-even commodity pricing, and financial Return on Investment (ROI).',
    content: `
      <h2>1. Enterprise Budget Structure</h2>
      <p>Farm profitability begins with rigorous separation of <strong>Variable Operating Expenses</strong> (seed, fertilizer, fuel, chemicals, casual labor) from <strong>Fixed Overhead Expenses</strong> (land lease, machinery depreciation, insurance, management overhead).</p>
      
      <h2>2. Break-Even Pricing and Marketing</h2>
      <p>Break-even cost of production per unit weight is computed as: <code>Break-Even Price ($/Tonne) = Total Enterprise Cost ($/ha) ÷ Yield (Tonnes/ha)</code>. Locking in forward-pricing contracts above this threshold guarantees enterprise solvency and eliminates speculative risk.</p>
    `,
    relatedCalculators: ['farm-profit-roi-calculator', 'crop-production-cost-calculator', 'farm-input-cost-calculator']
  },
  {
    id: 'harvest-planning',
    title: 'Harvest Planning: Grain Moisture, Storage Aeration & Post-Harvest Losses',
    category: 'Harvest Planning',
    readTime: '7 min read',
    publishedDate: '2026-08-01',
    image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Combine harvester unloading golden wheat grain into a tractor grain cart at sunset',
    excerpt: 'Managing combine harvester losses, grain moisture shrink deductions, equilibrium moisture content (EMC), and bin aeration strategies.',
    content: `
      <h2>1. Determining Optimal Harvest Moisture</h2>
      <p>Harvesting at correct moisture prevents combine mechanical shatter losses while minimizing artificial dryer fuel costs:</p>
      <ul>
        <li><strong>Wheat:</strong> Harvest at 13.5 - 15.0% moisture (safe long-term storage below 14.0%).</li>
        <li><strong>Corn / Maize:</strong> Harvest at 18.0 - 22.0% for mechanical combine efficiency; dry down to 15.0% for commercial elevator delivery.</li>
        <li><strong>Canola / Rapeseed:</strong> Harvest at 8.0 - 10.0% moisture (extremely prone to heat spoilage in bins above 10%).</li>
      </ul>

      <h2>2. Combine Loss Assessment</h2>
      <p>Check header loss, threshing rotor loss, and shoe cleaning sieve loss using standard 1-square-foot drop trays behind the combine axle.</p>
    `,
    relatedCalculators: ['harvest-yield-calculator', 'crop-yield-calculator', 'farm-profit-roi-calculator']
  }
];

export function getGuideById(id) {
  return GUIDES_DATA.find(g => g.id === id);
}
