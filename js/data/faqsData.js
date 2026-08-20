/**
 * Global Platform and Agronomy FAQs
 */

export const FAQS_DATA = [
  {
    category: 'Calculations & Science',
    items: [
      {
        q: 'What scientific methodologies are used across the calculators?',
        a: 'All calculations are built strictly on published, peer-reviewed agronomic equations from authoritative agricultural research institutions including the UN FAO (e.g. FAO-56 Penman-Monteith for ETo, FAO CROPWAT for crop coefficients), International Seed Testing Association (ISTA), USDA-NRCS, and leading university agricultural extension services (Iowa State, Purdue, UC Davis, Penn State).'
      },
      {
        q: 'Can these calculators replace on-site soil testing and local agronomists?',
        a: 'No. The calculators provide scientific baseline estimates for planning and education. Local soil tests, cultivar-specific traits, microclimates, pest pressures, and regional extension advice must always guide final commercial field operations.'
      },
      {
        q: 'How does the FAO-56 Penman-Monteith ETo calculator work?',
        a: 'The FAO-56 Penman-Monteith method solves the combined physical thermodynamic energy balance and aerodynamic vapor transfer of a standard well-watered grass reference canopy (0.12 m height, albedo 0.23, surface resistance 70 s/m) using daily temperature, humidity, wind speed, solar radiation, and elevation.'
      }
    ]
  },
  {
    category: 'Planning & Tools',
    items: [
      {
        q: 'Are all 30 calculators free to use?',
        a: 'Yes. AgriPlan Global provides free, instant access to all 30 agricultural calculators, planning tools, seasonal crop calendars, and farming guides without subscriptions or paywalls.'
      },
      {
        q: 'What units are supported in the calculations?',
        a: 'Calculators support both Metric (Hectares, Kilograms, Tonnes, Liters, mm, m³) and Imperial/US Customary units (Acres, Pounds, Bushels, Gallons, Inches, Acre-Feet, Acre-Inches), along with traditional South Asian land measures (Kanal, Marla).'
      },
      {
        q: 'How does the Crop Planner generate recommendations?',
        a: 'The Crop Planner cross-references your selected crop, planting date, farm area, soil texture, and irrigation infrastructure with our verified crop database to construct a customized growth timeline, irrigation forecast, fertilizer guidelines, and linked calculation tools.'
      }
    ]
  },
  {
    category: 'Data & Privacy',
    items: [
      {
        q: 'Is my farm data stored or shared?',
        a: 'No. All calculations and inputs run entirely in your web browser. We do not store, sell, or upload your proprietary farm dimensions, financial records, or yield statistics.'
      }
    ]
  }
];
