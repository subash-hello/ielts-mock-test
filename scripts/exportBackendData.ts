import fs from 'fs';
import path from 'path';

const store: Record<string, string> = {};
(globalThis as any).localStorage = {
  getItem: (k: string) => store[k] || null,
  setItem: (k: string, v: string) => { store[k] = v; },
  removeItem: (k: string) => { delete store[k]; },
  clear: () => { for (const k of Object.keys(store)) delete store[k]; }
};

import { allMockTests } from '../src/data/mockTests';
import { ConsultancyService } from '../src/services/consultancyService';

const backendDataDir = path.join(process.cwd(), 'backend', 'data');
if (!fs.existsSync(backendDataDir)) {
  fs.mkdirSync(backendDataDir, { recursive: true });
}

// 1. Export all tests
fs.writeFileSync(
  path.join(backendDataDir, 'tests.json'),
  JSON.stringify(allMockTests, null, 2),
  'utf-8'
);
console.log(`✅ Exported ${allMockTests.length} tests to backend/data/tests.json`);

// 2. Export default consultancies
const consultancies = ConsultancyService.getConsultancies();
fs.writeFileSync(
  path.join(backendDataDir, 'consultancies.json'),
  JSON.stringify(consultancies, null, 2),
  'utf-8'
);
console.log(`✅ Exported ${consultancies.length} consultancies to backend/data/consultancies.json`);

// 3. Export default stations
const stationsMap: Record<string, any[]> = {};
for (const c of consultancies) {
  stationsMap[c.id] = ConsultancyService.getStations(c.id);
}
fs.writeFileSync(
  path.join(backendDataDir, 'stations.json'),
  JSON.stringify(stationsMap, null, 2),
  'utf-8'
);
console.log(`✅ Exported stations to backend/data/stations.json`);
