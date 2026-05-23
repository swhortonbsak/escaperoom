import type { PuzzleMeta } from '../../types';

export const room3Meta: PuzzleMeta = {
  id: 'room3',
  title: 'The Threat Console',
  subtitle: 'Incident triage & countermeasures',
  briefing:
    'Six security incidents flooded the SOC console. Match each threat to the best countermeasure and identify the privacy vs integrity scenario to recover fragment R5.',
  expectedMinutes: 7,
  keyFragment: '52',
  keyFragmentLabel: 'Fragment R5 — hex pair (Session layer tag)',
  stackLayer: 5,
  stackLayerName: 'Session — access & authentication',
  successExplanation:
    'Phishing defeats strong passwords because credentials are surrendered willingly — user training and email filtering help. Pharming redirects DNS/hosts file — verify certificates and use DNSSEC-aware resolvers. Malware needs anti-malware and backups; spyware adds monitoring. The hospital scenario is a data integrity issue (records altered), not merely confidentiality. Fragment 52₁₆ = 82₁₀ = "R".',
  syllabusLinks: [
    { specRef: '6.1', topic: 'Security, privacy and data integrity', paper: 'AS Paper 1' },
    { specRef: '6.1', topic: 'Malware, phishing, pharming threats', paper: 'AS Paper 1' },
    { specRef: '6.1', topic: 'Firewall, anti-virus, encryption countermeasures', paper: 'AS Paper 1' },
    { specRef: '6.1', topic: 'Authentication and access rights', paper: 'AS Paper 1' },
  ],
  hints: [
    { level: 1, text: 'Ask: does the countermeasure match the attack vector? Strong passwords do not stop phishing.' },
    { level: 2, text: 'Phishing→training+filter; Pharming→cert verification; Ransomware→backup+AV; Spyware→anti-spyware; Brute force→lockout+2FA; Hospital→integrity.' },
    { level: 3, text: 'Matches: phish→user_education, pharm→verify_certs, ransom→backup, spy→anti_spyware, brute→account_lockout, hospital→integrity_check. Fragment: 52.' },
  ],
  teacherAnswer: 'phish→user_education, pharm→verify_certs, ransom→offline_backup, spy→anti_spyware, brute→account_lockout, hospital→integrity_check. Fragment: 52.',
  commonMisconceptions: [
    'Assuming a strong password alone prevents phishing.',
    'Confusing data privacy (who sees data) with data integrity (whether data is accurate).',
    'Using a firewall as the primary defence against pharming.',
  ],
  plenaryQuestions: [
    'Why is phishing a human-factor attack rather than a brute-force attack?',
    'How do digital signatures support data integrity?',
    'When is encryption necessary but not sufficient?',
  ],
};

export interface ThreatIncident {
  id: string;
  title: string;
  description: string;
}

export interface Countermeasure {
  id: string;
  label: string;
}

export const room3Incidents: ThreatIncident[] = [
  { id: 'phish', title: 'Credential harvest email', description: 'Staff received a fake IT portal link; several entered valid passwords.' },
  { id: 'pharm', title: 'DNS redirect', description: 'Users typing the archive URL reach a look-alike site with a valid-looking but wrong certificate.' },
  { id: 'ransom', title: 'Encrypted file shares', description: 'Lab NAS files encrypted; ransom note demands payment.' },
  { id: 'spy', title: 'Keylogger detected', description: 'Background process captures keystrokes on a shared workstation.' },
  { id: 'brute', title: 'Repeated login attempts', description: 'Automated guesses against the admin portal from multiple IPs.' },
  { id: 'hospital', title: 'Altered patient-style test records', description: 'Research audit logs show grades changed without authorisation — data may be untrustworthy.' },
];

export const room3Countermeasures: Countermeasure[] = [
  { id: 'user_education', label: 'Security awareness training + email filtering' },
  { id: 'verify_certs', label: 'Verify digital certificates & monitor DNS/hosts' },
  { id: 'offline_backup', label: 'Offline backups + anti-malware scan' },
  { id: 'anti_spyware', label: 'Anti-spyware scan + least-privilege accounts' },
  { id: 'account_lockout', label: 'Account lockout + two-factor authentication' },
  { id: 'integrity_check', label: 'Integrity checks (hashing/audit trails) — not just encryption' },
  { id: 'strong_password', label: 'Enforce stronger password policy only' },
  { id: 'firewall_only', label: 'Enable firewall and take no further action' },
];

export const room3CorrectMatches: Record<string, string> = {
  phish: 'user_education',
  pharm: 'verify_certs',
  ransom: 'offline_backup',
  spy: 'anti_spyware',
  brute: 'account_lockout',
  hospital: 'integrity_check',
};

export const room3Fragment = '52';
