const fs = require('fs');

const base = 'http://127.0.0.1:3000';

async function post(path, payload) {
  const res = await fetch(base + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  let body = null;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  return { ok: res.ok, status: res.status, body };
}

async function get(path) {
  const res = await fetch(base + path);
  return res.json();
}

async function main() {
  const payload = {
    sources: [
      { id: 'src_demo_3', name: 'Word of Mouth', country: 'India', website: '' },
      { id: 'src_demo_4', name: 'Instagram Outreach', country: 'India', website: 'https://instagram.com' },
      { id: 'src_demo_5', name: 'Executive Referral Network', country: 'India', website: 'https://example.com/network' }
    ],
    coachees: [
      {
        id: 'coach_demo_3', type: 'Individual', firstName: 'Neha', secondName: 'Iyer',
        ageGroup: '20-30', sex: 'Female', email: 'neha.iyer@example.com', phone: '+91-9999990003',
        linkedin: 'https://linkedin.com/in/nehaiyer', occupation: 'Student',
        organisation: 'IIM Bengaluru', city: 'Bengaluru', country: 'India', sourceId: 'src_demo_3'
      },
      {
        id: 'coach_demo_4', type: 'Individual', firstName: 'Rohan', secondName: 'Mehta',
        ageGroup: '40-50', sex: 'Male', email: 'rohan.mehta@example.com', phone: '+91-9999990004',
        linkedin: 'https://linkedin.com/in/rohanmehta', occupation: 'Employed',
        organisation: 'BlueOrbit', city: 'Mumbai', country: 'India', sourceId: 'src_demo_4'
      },
      {
        id: 'coach_demo_5', type: 'Group', groupTeamName: 'First-time Managers Cohort', numParticipants: 10,
        members: 'Managers from Sales, Ops, Product', organisation: 'FinEdge', city: 'Pune', country: 'India', sourceId: 'src_demo_5'
      },
      {
        id: 'coach_demo_6', type: 'Team', groupTeamName: 'Engineering Leads Circle', numParticipants: 7,
        members: 'Engineering managers and tech leads', organisation: 'TechNova', city: 'Hyderabad', country: 'India', sourceId: 'src_demo_5'
      }
    ],
    sessions: [
      {
        id: 'sess_demo_3', coacheeId: 'coach_demo_3', coacheeType: 'Individual',
        sessionDate: '2026-01-20', duration: 1.0, theme: ['Well-being', 'Habits'],
        paymentType: 'Peer', notes: 'Routine and stress management'
      },
      {
        id: 'sess_demo_4', coacheeId: 'coach_demo_3', coacheeType: 'Individual',
        sessionDate: '2026-02-12', duration: 1.0, theme: ['Career', 'Productivity'],
        paymentType: 'Pro Bono', notes: 'Career planning for internships'
      },
      {
        id: 'sess_demo_5', coacheeId: 'coach_demo_4', coacheeType: 'Individual',
        sessionDate: '2026-02-09', duration: 1.5, theme: ['Communication', 'Relationships'],
        paymentType: 'Paid', notes: 'Executive communication coaching'
      },
      {
        id: 'sess_demo_6', coacheeId: 'coach_demo_5', coacheeType: 'Group',
        sessionDate: '2026-01-28', duration: 2.0, theme: ['Leadership', 'Other Professional'],
        paymentType: 'Paid', notes: 'Cohort leadership workshop'
      },
      {
        id: 'sess_demo_7', coacheeId: 'coach_demo_6', coacheeType: 'Team',
        sessionDate: '2026-02-14', duration: 1.5, theme: ['Productivity', 'Communication'],
        paymentType: 'Paid', notes: 'Team operating cadence and meeting hygiene'
      },
      {
        id: 'sess_demo_8', coacheeId: 'coach_demo_2', coacheeType: 'Team',
        sessionDate: '2026-02-16', duration: 1.0, theme: ['Well-being', 'Other Personal'],
        paymentType: 'Paid', notes: 'Team energy and burnout prevention'
      }
    ]
  };

  const seed = await post('/api/seed-demo', payload);
  const [sources, coachees, sessions] = await Promise.all([
    get('/api/sources'),
    get('/api/coachees'),
    get('/api/sessions')
  ]);

  const result = {
    seed,
    counts: {
      sources: sources.length,
      coachees: coachees.length,
      sessions: sessions.length
    }
  };

  fs.writeFileSync('seed_more_result.json', JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
