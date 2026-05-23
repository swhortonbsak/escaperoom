import type { PuzzleMeta } from '../../types';

export const room4Meta: PuzzleMeta = {
  id: 'room4',
  title: 'The Certificate Chain',
  subtitle: 'TLS, keys & trust',
  briefing:
    'Reconstruct the secure exchange between the lab client and archive server. Assign each cryptographic operation to the correct key or certificate action, reject the forged certificate, and recover fragment U7.',
  expectedMinutes: 7,
  keyFragment: '55',
  keyFragmentLabel: 'Fragment U7 — hex pair (Transport layer tag)',
  stackLayer: 4,
  stackLayerName: 'Transport — TLS & confidentiality',
  successExplanation:
    'Symmetric session keys encrypt bulk data for confidentiality. The server\'s public key (in its CA-signed certificate) encrypts the session key exchange. The server signs with its private key so clients verify authenticity. A certificate signed by an unknown CA must be rejected — confidentiality without authenticity enables MITM attacks. Fragment 55₁₆ = 85₁₀ = "U".',
  syllabusLinks: [
    { specRef: '17.1', topic: 'Symmetric and asymmetric encryption', paper: 'A Level Paper 3' },
    { specRef: '17.1', topic: 'SSL/TLS and digital certificates', paper: 'A Level Paper 3' },
    { specRef: '17.1', topic: 'Digital signatures', paper: 'A Level Paper 3' },
  ],
  hints: [
    { level: 1, text: 'Bulk data uses symmetric encryption. Key exchange and signatures use asymmetric keys.' },
    { level: 2, text: 'Encrypt with recipient public key; decrypt with private. Sign with sender private; verify with public. Reject cert from unknown CA.' },
    { level: 3, text: 'session_encrypt→symmetric_key, key_exchange→server_public, signature→server_private, verify→server_public, reject→fake_cert. Fragment: 55.' },
  ],
  teacherAnswer: 'session_encrypt→symmetric_key, exchange→server_public, decrypt_key→server_private, sign→server_private, verify→server_public, reject fake cert signed by UnknownCA. Fragment: 55.',
  commonMisconceptions: [
    'Using the private key to encrypt bulk file data (too slow — symmetric used instead).',
    'Trusting a certificate because the padlock icon appears, without checking the CA chain.',
    'Confusing confidentiality (encryption) with authenticity (signatures/certificates).',
  ],
  plenaryQuestions: [
    'Why does TLS use both symmetric and asymmetric encryption?',
    'What role does a Certificate Authority play?',
    'How does a digital signature prove authenticity but not necessarily confidentiality?',
  ],
};

export interface CertStep {
  id: string;
  label: string;
  description: string;
}

export interface KeyOption {
  id: string;
  label: string;
}

export const room4Steps: CertStep[] = [
  { id: 'session_encrypt', label: 'Encrypt exam archive stream', description: 'Bulk data in transit after handshake' },
  { id: 'key_exchange', label: 'Encrypt session key for server', description: 'Client sends newly generated session key' },
  { id: 'decrypt_key', label: 'Decrypt session key', description: 'Server receives encrypted session key' },
  { id: 'sign', label: 'Sign handshake message', description: 'Server proves identity during TLS handshake' },
  { id: 'verify', label: 'Verify server signature', description: 'Client checks message genuinely from server' },
];

export const room4KeyOptions: KeyOption[] = [
  { id: 'symmetric_key', label: 'Symmetric session key' },
  { id: 'server_public', label: "Server's public key" },
  { id: 'server_private', label: "Server's private key" },
  { id: 'client_public', label: "Client's public key" },
  { id: 'ca_root', label: 'CA root certificate only' },
];

export const room4CorrectAssignments: Record<string, string> = {
  session_encrypt: 'symmetric_key',
  key_exchange: 'server_public',
  decrypt_key: 'server_private',
  sign: 'server_private',
  verify: 'server_public',
};

export const room4Certificates = [
  { id: 'valid', subject: 'CN=archive.bsak.edu', issuer: 'Cambridge Research CA', trusted: true },
  { id: 'fake', subject: 'CN=archive.bsak.edu', issuer: 'UnknownCA Self-Signed', trusted: false },
];

export const room4RejectId = 'fake';
export const room4Fragment = '55';
