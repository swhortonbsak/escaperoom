import type { PuzzleMeta } from '../../types';

export const room2Meta: PuzzleMeta = {
  id: 'room2',
  title: 'The Network Trace',
  subtitle: 'Packet journey reconstruction',
  briefing:
    'Analysts captured a simplified trace of a client requesting the Exam Archive. Reorder the events from browser click to server response, then identify the security implication to recover fragment C3.',
  expectedMinutes: 7,
  keyFragment: '43',
  keyFragmentLabel: 'Fragment C3 — hex pair (Network layer tag)',
  stackLayer: 3,
  stackLayerName: 'Network — routing & addressing',
  successExplanation:
    'A web request begins with DNS resolution, then TCP connection setup, routing through the gateway (NAT from private 192.168.x.x to public IP), HTTP request/response, and connection teardown. Exposing a private IP in a public log is a reconnaissance risk — attackers map internal topology. Fragment 43₁₆ = 67₁₀ = ASCII "C".',
  syllabusLinks: [
    { specRef: '4.1', topic: 'LAN, WAN, IP addresses, public vs private', paper: 'AS Paper 1' },
    { specRef: '4.1', topic: 'DNS, URLs, packet switching', paper: 'AS Paper 1' },
    { specRef: '4.1', topic: 'TCP/IP stack and routing', paper: 'AS Paper 1' },
    { specRef: '17.1', topic: 'Network security implications', paper: 'A Level Paper 3' },
  ],
  hints: [
    { level: 1, text: 'DNS must resolve the hostname before any TCP connection to the server IP.' },
    { level: 2, text: 'Order: DNS → SYN → routed request → HTTP 200 → FIN. Pick the reconnaissance risk about private IPs.' },
    { level: 3, text: 'Event order IDs: dns, syn, route, http, fin. Security answer: PRIVATE_IP. Fragment: 43.' },
  ],
  teacherAnswer: 'Order: dns → syn → route → http → fin. Security: PRIVATE_IP (private address leaked). Fragment: 43.',
  commonMisconceptions: [
    'Placing HTTP before TCP handshake.',
    'Assuming DNS happens after the connection is established.',
    'Believing NAT hides internal IPs from all logs — misconfigured logging can still leak them.',
  ],
  plenaryQuestions: [
    'Why is DNS considered part of the application layer but critical to network communication?',
    'What is the difference between a private and public IP address?',
    'How does packet switching differ from circuit switching?',
  ],
};

export const room2Events = [
  { id: 'dns', label: 'DNS lookup', detail: 'Resolver queries authoritative DNS for archive.bsak.edu → 203.0.113.44' },
  { id: 'syn', label: 'TCP SYN', detail: 'Client 192.168.12.8:52431 → 203.0.113.44:443 [SYN]' },
  { id: 'route', label: 'Router forward', detail: 'Campus gateway NAT 192.168.12.8 → 198.51.100.7, packet routed via ISP' },
  { id: 'http', label: 'HTTP GET /vault', detail: 'TLS established; GET /vault HTTP/1.1 → 200 OK (encrypted payload)' },
  { id: 'fin', label: 'TCP FIN', detail: 'Connection closed cleanly after response delivered' },
];

export const room2ShuffledIds = ['http', 'dns', 'fin', 'route', 'syn'];

export const room2SecurityOptions = [
  { id: 'weak_password', label: 'Password too short for TLS' },
  { id: 'private_ip', label: 'Private IP visible in trace — reconnaissance risk' },
  { id: 'dns_down', label: 'DNS server offline' },
  { id: 'http_not_https', label: 'Site uses HTTP not HTTPS' },
];

export const room2Answers = {
  order: ['dns', 'syn', 'route', 'http', 'fin'],
  security: 'private_ip',
  fragment: '43',
};

// Stack layer reference shown after success — used in final vault
export const tcpIpStackReference = [
  { layer: 1, name: 'Physical / Logic hardware', room: 'room5' },
  { layer: 2, name: 'Data Link — encoding', room: 'room1' },
  { layer: 3, name: 'Network — routing', room: 'room2' },
  { layer: 4, name: 'Transport — TLS', room: 'room4' },
  { layer: 5, name: 'Session — access control', room: 'room3' },
  { layer: 7, name: 'Application — algorithms', room: 'room6' },
];
