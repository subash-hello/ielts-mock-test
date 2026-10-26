import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://vdcaqvdgmliljyhcgdfj.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function seedStations() {
  const consultancyId = 'kiec-lalitpur';
  const stations = [];

  for (let i = 1; i <= 12; i++) {
    const num = i < 10 ? `0${i}` : `${i}`;
    const name = `PC-${num}`;
    const id = `${consultancyId}-pc-${num.toLowerCase()}`;
    stations.push({
      id,
      consultancy_id: consultancyId,
      name,
      status: 'idle',
      current_question: 1,
      total_questions: 40,
      answered_count: 0,
      last_heartbeat: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }

  console.log(`Seeding ${stations.length} workstations for ${consultancyId} into Supabase...`);
  const { data, error } = await supabase
    .from('consultancy_stations')
    .upsert(stations, { onConflict: 'id' });

  if (error) {
    console.error('Failed to seed stations:', error.message);
    process.exit(1);
  }

  console.log('✅ Successfully seeded 12 workstations (PC-01 to PC-12) in Supabase!');
}

seedStations().catch((err) => {
  console.error('Unexpected error:', err);
  process.exit(1);
});
