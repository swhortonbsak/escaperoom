export const syllabusOverview = [
  {
    area: 'Data representation',
    specRefs: ['3.1', '3.2'],
    rooms: ['room1', 'room5'],
    topics: ['Binary, hex, ASCII/Unicode', "Two's complement", 'Logic gates & Boolean algebra'],
  },
  {
    area: 'Networks & the internet',
    specRefs: ['4.1'],
    rooms: ['room2', 'vault'],
    topics: ['LAN/WAN, IP addresses', 'DNS, URLs, packets', 'TCP/IP stack, routing, packet switching'],
  },
  {
    area: 'Security, privacy & integrity',
    specRefs: ['6.1'],
    rooms: ['room3'],
    topics: ['Malware, phishing, pharming', 'Firewalls, AV, authentication', 'Privacy vs integrity'],
  },
  {
    area: 'Encryption & certificates',
    specRefs: ['17.1'],
    rooms: ['room4'],
    topics: ['Symmetric/asymmetric encryption', 'SSL/TLS, digital certificates', 'Digital signatures'],
  },
  {
    area: 'Algorithms & programming',
    specRefs: ['9.2', '19.1'],
    rooms: ['room6'],
    topics: ['Searching, sorting, Big O', 'Recursion, stacks/queues, ADTs', 'Pseudocode tracing'],
  },
  {
    area: 'CPU & hardware (context)',
    specRefs: ['3.3', '15.2'],
    rooms: ['room5'],
    topics: ['Logic circuits', 'Fetch-execute context via access control metaphor'],
  },
  {
    area: 'Databases & SQL (revision hook)',
    specRefs: ['8.1'],
    rooms: [],
    topics: ['Referenced in teacher plenary — archive stored in relational DB with audit trails'],
  },
  {
    area: 'Validation & verification',
    specRefs: ['9.1'],
    rooms: ['room1', 'room3'],
    topics: ['Input validation vs verification', 'Integrity checks on audit data'],
  },
];

export const gameTimings = [
  { phase: 'Intro briefing', minutes: '2–3' },
  { phase: 'Room 1 — Corrupted Login Banner', minutes: '6–7' },
  { phase: 'Room 2 — Network Trace', minutes: '6–7' },
  { phase: 'Room 3 — Threat Console', minutes: '6–7' },
  { phase: 'Room 4 — Certificate Chain', minutes: '6–7' },
  { phase: 'Room 5 — Logic Lock', minutes: '5–6' },
  { phase: 'Room 6 — Algorithm Vault', minutes: '6–7' },
  { phase: 'Final vault challenge', minutes: '4–5' },
  { phase: 'Total', minutes: '40–50' },
];
