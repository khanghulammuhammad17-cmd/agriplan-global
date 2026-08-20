/**
 * Master Seasonal Calendars Data
 * Contains comprehensive month-by-month timelines for General Crops, Fruits, and Vegetables.
 * Status keys: 'P' = Planting/Sowing, 'G' = Growing/Canopy, 'H' = Harvesting, '-' = Inactive/Dormant
 */

export const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export const CLIMATE_ZONES = [
  { id: 'all', label: 'All Climate Zones' },
  { id: 'temperate', label: 'Temperate (Zones 5-8)' },
  { id: 'subtropical', label: 'Subtropical / Mediterranean' },
  { id: 'tropical', label: 'Tropical / Warm Subtropical' },
  { id: 'arid', label: 'Arid / Irrigated Plains' }
];

// ==========================================
// 1. CROPS CALENDAR (Cereals, Pulses, Oilseeds)
// ==========================================
export const CROPS_CALENDAR = [
  {
    name: 'Winter Wheat',
    category: 'Cereals',
    zone: 'temperate',
    zoneLabel: 'Temperate / Subtropical',
    schedule: ['G', 'G', 'G', 'G', 'H', 'H', '-', '-', '-', 'P', 'P', 'G'],
    notes: 'Sow before first freeze; requires vernalization; harvest early summer.'
  },
  {
    name: 'Spring Wheat',
    category: 'Cereals',
    zone: 'temperate',
    zoneLabel: 'Cool Temperate',
    schedule: ['-', '-', '-', 'P', 'P', 'G', 'G', 'H', 'H', '-', '-', '-'],
    notes: 'Direct drill as soon as soil thaws; rapid vegetative growth.'
  },
  {
    name: 'Field Corn (Maize)',
    category: 'Cereals',
    zone: 'temperate',
    zoneLabel: 'Temperate / Subtropical',
    schedule: ['-', '-', '-', 'P', 'P', 'G', 'G', 'G', 'H', 'H', '-', '-'],
    notes: 'Plant when 5cm soil temp is >10°C; silking peak in July.'
  },
  {
    name: 'Paddy Rice (Kharif)',
    category: 'Cereals',
    zone: 'tropical',
    zoneLabel: 'Tropical / Monsoon',
    schedule: ['-', '-', '-', '-', 'P', 'P', 'G', 'G', 'G', 'H', 'H', '-'],
    notes: 'Nursery in May; transplant with monsoon rains; harvest autumn.'
  },
  {
    name: 'Paddy Rice (Boro)',
    category: 'Cereals',
    zone: 'subtropical',
    zoneLabel: 'Subtropical Lowlands',
    schedule: ['P', 'G', 'G', 'G', 'H', 'H', '-', '-', '-', '-', '-', 'P'],
    notes: 'Winter irrigated rice; harvested before heavy monsoon rains.'
  },
  {
    name: 'Soybean',
    category: 'Pulses',
    zone: 'temperate',
    zoneLabel: 'Temperate / Subtropical',
    schedule: ['-', '-', '-', '-', 'P', 'P', 'G', 'G', 'H', 'H', '-', '-'],
    notes: 'Warm season legume; inoculate with Bradyrhizobium; harvest dry pods.'
  },
  {
    name: 'Chickpea (Gram)',
    category: 'Pulses',
    zone: 'arid',
    zoneLabel: 'Subtropical / Arid',
    schedule: ['G', 'G', 'H', 'H', '-', '-', '-', '-', '-', 'P', 'P', 'G'],
    notes: 'Rabi season pulse; highly drought tolerant; sensitive to frost at podding.'
  },
  {
    name: 'Canola / Rapeseed',
    category: 'Oilseeds',
    zone: 'temperate',
    zoneLabel: 'Temperate / Subtropical',
    schedule: ['G', 'G', 'G', 'H', 'H', '-', '-', '-', 'P', 'P', 'G', 'G'],
    notes: 'Autumn sown; yellow bloom in spring; harvest before pod shatter.'
  },
  {
    name: 'Sunflower',
    category: 'Oilseeds',
    zone: 'subtropical',
    zoneLabel: 'Subtropical / Arid',
    schedule: ['-', 'P', 'P', 'G', 'G', 'H', 'H', '-', '-', '-', '-', '-'],
    notes: 'Spring planting; deep taproot; harvest when head back turns yellow-brown.'
  },
  {
    name: 'Cotton',
    category: 'Other crops',
    zone: 'tropical',
    zoneLabel: 'Tropical / Subtropical',
    schedule: ['-', '-', '-', 'P', 'P', 'G', 'G', 'G', 'H', 'H', 'H', '-'],
    notes: 'Long warm growing season (150-180 days); defoliate before machine harvest.'
  }
];

// ==========================================
// 2. FRUIT CALENDAR (All 15 Specified Fruits)
// ==========================================
export const FRUITS_CALENDAR = [
  {
    name: 'Apple',
    scientific: 'Malus domestica',
    category: 'Temperate Deciduous',
    zone: 'temperate',
    zoneLabel: 'Temperate',
    schedule: ['P', 'P', 'P', 'G', 'G', 'G', 'G', 'H', 'H', 'H', 'H', 'P'],
    notes: 'Prune in Jan-Feb; bloom in April; harvest Gala in Aug, Fuji in Oct-Nov.'
  },
  {
    name: 'Banana',
    scientific: 'Musa acuminata',
    category: 'Tropical Evergreen',
    zone: 'tropical',
    zoneLabel: 'Tropical',
    schedule: ['H', 'H', 'H', 'P', 'P', 'G', 'G', 'H', 'H', 'H', 'H', 'H'],
    notes: 'Continuous bunch harvest year-round; plant suckers with spring rains.'
  },
  {
    name: 'Mango',
    scientific: 'Mangifera indica',
    category: 'Tropical / Subtropical',
    zone: 'tropical',
    zoneLabel: 'Tropical / Subtropical',
    schedule: ['G', 'G', 'G', 'G', 'H', 'H', 'H', 'H', 'P', 'P', 'G', 'G'],
    notes: 'Flower differentiation Dec-Jan; peak harvest May-August.'
  },
  {
    name: 'Orange',
    scientific: 'Citrus sinensis',
    category: 'Citrus',
    zone: 'subtropical',
    zoneLabel: 'Subtropical / Mediterranean',
    schedule: ['H', 'H', 'P', 'P', 'G', 'G', 'G', 'G', 'G', 'H', 'H', 'H'],
    notes: 'Harvest Navel and Valencia during winter-spring; flushes in spring.'
  },
  {
    name: 'Lemon',
    scientific: 'Citrus limon',
    category: 'Citrus',
    zone: 'subtropical',
    zoneLabel: 'Subtropical / Mediterranean',
    schedule: ['H', 'H', 'H', 'P', 'P', 'G', 'G', 'G', 'H', 'H', 'H', 'H'],
    notes: 'Multiple flowering flushes; main commercial picking late autumn to spring.'
  },
  {
    name: 'Guava',
    scientific: 'Psidium guajava',
    category: 'Subtropical / Tropical',
    zone: 'tropical',
    zoneLabel: 'Subtropical / Tropical',
    schedule: ['H', 'H', '-', 'P', 'P', 'G', 'G', 'H', 'H', 'G', 'H', 'H'],
    notes: 'Dual seasons (Rainy & Winter); winter crop offers superior fruit sweetness.'
  },
  {
    name: 'Peach',
    scientific: 'Prunus persica',
    category: 'Stone Fruit',
    zone: 'temperate',
    zoneLabel: 'Temperate / Mediterranean',
    schedule: ['P', 'P', 'G', 'G', 'H', 'H', 'H', 'G', 'G', '-', '-', 'P'],
    notes: 'Thin young fruitlets in spring; pick firm-ripe for market.'
  },
  {
    name: 'Pear',
    scientific: 'Pyrus communis',
    category: 'Pome Fruit',
    zone: 'temperate',
    zoneLabel: 'Temperate',
    schedule: ['P', 'P', 'P', 'G', 'G', 'G', 'G', 'H', 'H', 'H', '-', 'P'],
    notes: 'Harvest at mature green stage; ripen off the tree in cold storage.'
  },
  {
    name: 'Plum',
    scientific: 'Prunus domestica',
    category: 'Stone Fruit',
    zone: 'temperate',
    zoneLabel: 'Temperate',
    schedule: ['P', 'P', 'G', 'G', 'G', 'H', 'H', 'H', 'G', '-', '-', 'P'],
    notes: 'Susceptible to spring frost; summer harvest for fresh and drying prunes.'
  },
  {
    name: 'Apricot',
    scientific: 'Prunus armeniaca',
    category: 'Stone Fruit',
    zone: 'subtropical',
    zoneLabel: 'Mediterranean / Temperate',
    schedule: ['P', 'P', 'G', 'G', 'H', 'H', 'G', 'G', '-', '-', '-', 'P'],
    notes: 'Early spring bloomer; brief harvest window in late May to July.'
  },
  {
    name: 'Grapes',
    scientific: 'Vitis vinifera',
    category: 'Vineyard / Berry',
    zone: 'subtropical',
    zoneLabel: 'Mediterranean / Temperate',
    schedule: ['P', 'P', 'G', 'G', 'G', 'G', 'H', 'H', 'H', 'G', '-', 'P'],
    notes: 'Winter pruning; shoot positioning; harvest table & wine grapes by brix.'
  },
  {
    name: 'Pomegranate',
    scientific: 'Punica granatum',
    category: 'Subtropical Arid',
    zone: 'arid',
    zoneLabel: 'Arid / Mediterranean',
    schedule: ['P', 'P', 'G', 'G', 'G', 'G', 'G', 'H', 'H', 'H', 'H', '-'],
    notes: 'Drought-hardy; bloom spring-summer; harvest deep red arils in autumn.'
  },
  {
    name: 'Strawberry',
    scientific: 'Fragaria × ananassa',
    category: 'Berries',
    zone: 'temperate',
    zoneLabel: 'Temperate / Subtropical',
    schedule: ['G', 'H', 'H', 'H', 'H', 'H', '-', '-', 'P', 'P', 'G', 'G'],
    notes: 'Autumn planting in plastic mulch beds; peak fruiting spring.'
  },
  {
    name: 'Watermelon',
    scientific: 'Citrullus lanatus',
    category: 'Cucurbits',
    zone: 'subtropical',
    zoneLabel: 'Warm Temperate / Subtropical',
    schedule: ['-', 'P', 'P', 'P', 'G', 'G', 'H', 'H', 'H', '-', '-', '-'],
    notes: 'Requires warm soil (>20°C); tap fruit to check hollow sound maturity.'
  },
  {
    name: 'Melon (Cantaloupe)',
    scientific: 'Cucumis melo',
    category: 'Cucurbits',
    zone: 'subtropical',
    zoneLabel: 'Warm Temperate / Subtropical',
    schedule: ['-', 'P', 'P', 'P', 'G', 'G', 'H', 'H', 'H', '-', '-', '-'],
    notes: 'Harvest at full slip (stem separates cleanly with slight pressure).'
  }
];

// ==========================================
// 3. VEGETABLES CALENDAR (All 20 Specified Veggies)
// ==========================================
export const VEGETABLES_CALENDAR = [
  {
    name: 'Tomato',
    scientific: 'Solanum lycopersicum',
    zone: 'temperate',
    zoneLabel: 'Temperate / Subtropical',
    schedule: ['-', 'P', 'P', 'P', 'G', 'G', 'H', 'H', 'H', 'H', '-', '-'],
    notes: 'Start indoors in Feb; transplant after last frost; harvest through autumn.'
  },
  {
    name: 'Potato',
    scientific: 'Solanum tuberosum',
    zone: 'temperate',
    zoneLabel: 'Cool Temperate / Subtropical',
    schedule: ['-', 'P', 'P', 'P', 'G', 'G', 'H', 'H', 'P', 'G', 'H', '-'],
    notes: 'Plant sprouted seed tubers in early spring or autumn rabi season.'
  },
  {
    name: 'Onion',
    scientific: 'Allium cepa',
    zone: 'subtropical',
    zoneLabel: 'Subtropical / Temperate',
    schedule: ['G', 'G', 'G', 'H', 'H', 'H', '-', '-', '-', 'P', 'P', 'P'],
    notes: 'Sow nursery autumn; transplant winter; harvest when tops lodge over.'
  },
  {
    name: 'Carrot',
    scientific: 'Daucus carota',
    zone: 'temperate',
    zoneLabel: 'Temperate / Cool Season',
    schedule: ['H', 'H', 'P', 'P', 'P', 'G', 'G', 'H', 'P', 'P', 'G', 'H'],
    notes: 'Direct seed in loose stone-free soil; successive spring and autumn crops.'
  },
  {
    name: 'Spinach',
    scientific: 'Spinacia oleracea',
    zone: 'temperate',
    zoneLabel: 'Cool Temperate / Subtropical',
    schedule: ['H', 'H', 'P', 'P', 'H', '-', '-', '-', 'P', 'P', 'H', 'H'],
    notes: 'Fast growing (35-45 days); bolts quickly in hot summer weather.'
  },
  {
    name: 'Lettuce',
    scientific: 'Lactuca sativa',
    zone: 'temperate',
    zoneLabel: 'Temperate / Subtropical',
    schedule: ['H', 'H', 'P', 'P', 'P', 'H', '-', '-', 'P', 'P', 'H', 'H'],
    notes: 'Shallow rooted; prefer cool 15-20°C; protect from intense midday sun.'
  },
  {
    name: 'Cucumber',
    scientific: 'Cucumis sativus',
    zone: 'subtropical',
    zoneLabel: 'Warm Temperate / Subtropical',
    schedule: ['-', 'P', 'P', 'P', 'G', 'H', 'H', 'H', 'H', '-', '-', '-'],
    notes: 'Trellis vines for straight disease-free fruit; harvest every 2 days.'
  },
  {
    name: 'Bell Pepper',
    scientific: 'Capsicum annuum',
    zone: 'temperate',
    zoneLabel: 'Warm Temperate / Subtropical',
    schedule: ['-', 'P', 'P', 'P', 'G', 'G', 'H', 'H', 'H', 'H', '-', '-'],
    notes: 'Transplant into warm soil; stake branches to support heavy fruit load.'
  },
  {
    name: 'Chili',
    scientific: 'Capsicum frutescens',
    zone: 'tropical',
    zoneLabel: 'Tropical / Subtropical',
    schedule: ['-', 'P', 'P', 'P', 'G', 'G', 'H', 'H', 'H', 'H', 'H', '-'],
    notes: 'Prolific continuous harvest; pick green or allow to fully redden.'
  },
  {
    name: 'Eggplant (Brinjal)',
    scientific: 'Solanum melongena',
    zone: 'tropical',
    zoneLabel: 'Tropical / Warm Subtropical',
    schedule: ['-', 'P', 'P', 'P', 'G', 'G', 'H', 'H', 'H', 'H', 'H', '-'],
    notes: 'Heat loving; harvest when skin is glossy before seeds turn brown.'
  },
  {
    name: 'Cabbage',
    scientific: 'Brassica oleracea var. capitata',
    zone: 'temperate',
    zoneLabel: 'Cool Season / Temperate',
    schedule: ['H', 'H', 'P', 'P', 'H', '-', '-', 'P', 'P', 'G', 'H', 'H'],
    notes: 'Heavy feeder; head firmness indicates maturity; frost tolerant.'
  },
  {
    name: 'Cauliflower',
    scientific: 'Brassica oleracea var. botrytis',
    zone: 'temperate',
    zoneLabel: 'Cool Season',
    schedule: ['H', 'H', 'P', 'P', 'H', '-', '-', 'P', 'P', 'G', 'H', 'H'],
    notes: 'Tie outer wrapper leaves over curd (blanching) to preserve pure white color.'
  },
  {
    name: 'Broccoli',
    scientific: 'Brassica oleracea var. italica',
    zone: 'temperate',
    zoneLabel: 'Cool Season',
    schedule: ['H', 'H', 'P', 'P', 'H', '-', '-', 'P', 'P', 'G', 'H', 'H'],
    notes: 'Cut central head while buds are tight; side shoots continue producing.'
  },
  {
    name: 'Peas (Garden / Field)',
    scientific: 'Pisum sativum',
    zone: 'temperate',
    zoneLabel: 'Cool Season / Temperate',
    schedule: ['G', 'H', 'P', 'P', 'H', '-', '-', '-', '-', 'P', 'P', 'G'],
    notes: 'Fixes own nitrogen; sow early spring or autumn; sensitive to heat stress.'
  },
  {
    name: 'Beans (Green / Snap)',
    scientific: 'Phaseolus vulgaris',
    zone: 'temperate',
    zoneLabel: 'Warm Season',
    schedule: ['-', '-', '-', 'P', 'P', 'P', 'G', 'H', 'H', 'H', '-', '-'],
    notes: 'Bush or pole varieties; pick pods while young and tender without bulge.'
  },
  {
    name: 'Radish',
    scientific: 'Raphanus sativus',
    zone: 'temperate',
    zoneLabel: 'Cool Season',
    schedule: ['H', 'H', 'P', 'P', 'P', '-', '-', 'P', 'P', 'P', 'H', 'H'],
    notes: 'Ultra fast (20-30 days); continuous succession sowing for crisp roots.'
  },
  {
    name: 'Turnip',
    scientific: 'Brassica rapa subsp. rapa',
    zone: 'temperate',
    zoneLabel: 'Cool Season',
    schedule: ['H', 'H', 'P', 'P', 'H', '-', '-', 'P', 'P', 'G', 'H', 'H'],
    notes: 'Dual purpose roots and greens; harvest at 5-8 cm root diameter.'
  },
  {
    name: 'Okra (Ladyfinger)',
    scientific: 'Abelmoschus esculentus',
    zone: 'tropical',
    zoneLabel: 'Tropical / Warm Season',
    schedule: ['-', '-', 'P', 'P', 'P', 'G', 'H', 'H', 'H', 'H', '-', '-'],
    notes: 'Thrives in hot summers (>25°C); harvest pods every 2 days when 7-10 cm long.'
  },
  {
    name: 'Pumpkin',
    scientific: 'Cucurbita pepo',
    zone: 'temperate',
    zoneLabel: 'Warm Season',
    schedule: ['-', '-', '-', 'P', 'P', 'G', 'G', 'G', 'H', 'H', 'H', '-'],
    notes: 'Vigorous vines; cure harvested pumpkins in sun for 10 days for long storage.'
  },
  {
    name: 'Zucchini / Courgette',
    scientific: 'Cucurbita pepo',
    zone: 'temperate',
    zoneLabel: 'Warm Season',
    schedule: ['-', '-', 'P', 'P', 'P', 'G', 'H', 'H', 'H', 'H', '-', '-'],
    notes: 'High yielding bush squash; pick small (15-20 cm) for tender sweet texture.'
  }
];
