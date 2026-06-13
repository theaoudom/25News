/**
 * Maps national-team names to flag images from flagcdn.com (free, no key,
 * ISO 3166-1 alpha-2 codes; England/Scotland/Wales/N.Ireland use GB
 * subdivisions). Used to give teams a flag when a data source has no crest
 * (e.g. openfootball). Returns '' for unknown names so callers can fall back.
 */

// Readable name → flagcdn code. Keys are normalised at module load, so accents,
// case and punctuation in the lookup don't matter.
const NAME_TO_CODE: Record<string, string> = {
  // Hosts
  'United States': 'us', USA: 'us', 'United States of America': 'us',
  Canada: 'ca', Mexico: 'mx',
  // UEFA
  England: 'gb-eng', Scotland: 'gb-sct', Wales: 'gb-wls', 'Northern Ireland': 'gb-nir',
  Spain: 'es', Germany: 'de', France: 'fr', Portugal: 'pt', Netherlands: 'nl',
  Belgium: 'be', Croatia: 'hr', Italy: 'it', Switzerland: 'ch', Denmark: 'dk',
  Poland: 'pl', Austria: 'at', Serbia: 'rs', 'Czech Republic': 'cz', Czechia: 'cz',
  Norway: 'no', Sweden: 'se', Ukraine: 'ua', Turkey: 'tr', 'Türkiye': 'tr',
  Greece: 'gr', Hungary: 'hu', Romania: 'ro', 'Republic of Ireland': 'ie', Ireland: 'ie',
  Slovakia: 'sk', Slovenia: 'si', 'Bosnia-Herzegovina': 'ba', 'Bosnia and Herzegovina': 'ba',
  Albania: 'al', Russia: 'ru', Iceland: 'is', Finland: 'fi', Georgia: 'ge',
  // CONMEBOL
  Brazil: 'br', Argentina: 'ar', Uruguay: 'uy', Colombia: 'co', Chile: 'cl',
  Peru: 'pe', Ecuador: 'ec', Paraguay: 'py', Venezuela: 've', Bolivia: 'bo',
  // CONCACAF
  'Costa Rica': 'cr', Panama: 'pa', Jamaica: 'jm', Honduras: 'hn', 'El Salvador': 'sv',
  Guatemala: 'gt', Haiti: 'ht', 'Curaçao': 'cw', Curacao: 'cw',
  'Trinidad and Tobago': 'tt', 'Trinidad & Tobago': 'tt',
  // AFC
  Japan: 'jp', 'South Korea': 'kr', 'Korea Republic': 'kr', 'North Korea': 'kp',
  Iran: 'ir', 'Saudi Arabia': 'sa', Australia: 'au', Qatar: 'qa', Iraq: 'iq',
  'United Arab Emirates': 'ae', UAE: 'ae', Uzbekistan: 'uz', Jordan: 'jo', Oman: 'om',
  China: 'cn', 'China PR': 'cn', Bahrain: 'bh', Kuwait: 'kw', Vietnam: 'vn',
  Thailand: 'th', Indonesia: 'id', India: 'in', Palestine: 'ps', Lebanon: 'lb', Syria: 'sy',
  // CAF
  Morocco: 'ma', Senegal: 'sn', Tunisia: 'tn', Algeria: 'dz', Egypt: 'eg',
  Nigeria: 'ng', Cameroon: 'cm', Ghana: 'gh', 'Ivory Coast': 'ci', "Côte d'Ivoire": 'ci',
  "Cote d'Ivoire": 'ci', Mali: 'ml', 'South Africa': 'za', 'DR Congo': 'cd',
  'Congo DR': 'cd', Congo: 'cg', 'Burkina Faso': 'bf', 'Cape Verde': 'cv', 'Cabo Verde': 'cv',
  Guinea: 'gn', Gabon: 'ga', Zambia: 'zm', Angola: 'ao', Uganda: 'ug', Benin: 'bj',
  Tanzania: 'tz', 'Equatorial Guinea': 'gq', Mozambique: 'mz', Madagascar: 'mg',
  Kenya: 'ke', Sudan: 'sd', Namibia: 'na', Mauritania: 'mr', Libya: 'ly', Togo: 'tg',
  Zimbabwe: 'zw', Ethiopia: 'et',
  // OFC
  'New Zealand': 'nz', Fiji: 'fj', 'New Caledonia': 'nc', Tahiti: 'pf',
  'Solomon Islands': 'sb',
};

const normalize = (s: string): string =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '');

const LOOKUP: Map<string, string> = new Map(
  Object.entries(NAME_TO_CODE).map(([name, code]) => [normalize(name), code]),
);

export function flagUrl(teamName: string): string {
  const code = LOOKUP.get(normalize(teamName));
  return code ? `https://flagcdn.com/${code}.svg` : '';
}
