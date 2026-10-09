/**
 * CANONICAL COMPUTER NETWORKS (CN) TOPIC REGISTRY
 * 
 * 48 Topics organized into 6 Placement-Oriented Categories:
 * A. Fundamentals (8 topics)
 * B. Data Link Layer (6 topics)
 * C. Network Layer (8 topics)
 * D. Transport Layer (9 topics)
 * E. Application Layer (9 topics)
 * F. Practical / Modern Networking (8 topics)
 */

import {
  Globe,
  Layers,
  Network,
  Server,
  Share2,
  Cpu,
  ArrowRightLeft,
  FileCode,
  Shield,
  ShieldCheck,
  Zap,
  Repeat,
  Binary,
  Radio,
  Wifi,
  Workflow,
  Search,
  Lock,
  Terminal,
  RefreshCw,
  HardDrive
} from 'lucide-react';

export const CN_TOPIC_GROUPS = [
  {
    id: 'fundamentals',
    title: 'A. Fundamentals',
    shortTitle: 'Fundamentals',
    description: 'Core architectures, topologies, devices, and reference models',
    icon: Globe,
    accentColor: '#3B82F6',
    topicIds: [
      'intro-to-networks',
      'network-types',
      'network-topologies',
      'network-devices',
      'osi-model',
      'tcp-ip-model',
      'osi-vs-tcp-ip',
      'encapsulation-decapsulation'
    ]
  },
  {
    id: 'data-link',
    title: 'B. Data Link Layer',
    shortTitle: 'Data Link Layer',
    description: 'Node-to-node framing, physical MAC addresses, ARP, and switching',
    icon: Layers,
    accentColor: '#10B981',
    topicIds: [
      'mac-address',
      'ethernet-frames',
      'arp-protocol',
      'switching-mac-table',
      'vlan',
      'collision-broadcast-domains'
    ]
  },
  {
    id: 'network-layer',
    title: 'C. Network Layer',
    shortTitle: 'Network Layer',
    description: 'Logical IP addressing, subnetting, routing algorithms, NAT, and ICMP',
    icon: Network,
    accentColor: '#6366F1',
    topicIds: [
      'ip-addressing',
      'ipv4-vs-ipv6',
      'public-vs-private-ip',
      'subnetting-cidr',
      'routing-fundamentals',
      'routing-table-gateway',
      'nat-network-address-translation',
      'icmp-protocol'
    ]
  },
  {
    id: 'transport-layer',
    title: 'D. Transport Layer',
    shortTitle: 'Transport Layer',
    description: 'End-to-end reliability, handshakes, flow control, and sockets',
    icon: ArrowRightLeft,
    accentColor: '#8B5CF6',
    topicIds: [
      'tcp-protocol',
      'tcp-3-way-handshake',
      'tcp-connection-termination',
      'tcp-reliability',
      'flow-control-sliding-window',
      'congestion-control',
      'udp-protocol',
      'tcp-vs-udp',
      'ports-and-sockets'
    ]
  },
  {
    id: 'application-layer',
    title: 'E. Application Layer',
    shortTitle: 'Application Layer',
    description: 'User-facing protocols, name resolution, HTTP semantics, and security',
    icon: Server,
    accentColor: '#EC4899',
    topicIds: [
      'dns-domain-name-system',
      'dhcp-protocol',
      'http-protocol',
      'https-protocol',
      'http-methods',
      'http-status-codes',
      'tls-ssl-handshake',
      'cookies-and-sessions',
      'web-caching'
    ]
  },
  {
    id: 'practical-modern',
    title: 'F. Practical & Modern Networking',
    shortTitle: 'Practical / Modern',
    description: 'Real-world system design, diagnostics, CDNs, load balancing, and troubleshooting',
    icon: Zap,
    accentColor: '#F59E0B',
    topicIds: [
      'url-lifecycle',
      'ping-and-traceroute',
      'firewall',
      'proxy-servers',
      'reverse-proxy',
      'load-balancer',
      'cdn-content-delivery-network',
      'network-troubleshooting'
    ]
  }
];

export const CN_TOPIC_REGISTRY = {
  // A. FUNDAMENTALS
  'intro-to-networks': {
    topicId: 'intro-to-networks',
    topicName: 'Introduction to Computer Networks',
    shortName: 'Intro to Networks',
    category: 'fundamentals',
    categoryName: 'Fundamentals',
    icon: Globe,
    order: 1,
    summary: 'What networks are, client-server vs P2P architectures, and internet packet routing.',
    badge: 'Core'
  },
  'network-types': {
    topicId: 'network-types',
    topicName: 'Types of Networks (LAN, WAN, MAN, PAN, WLAN)',
    shortName: 'Network Types',
    category: 'fundamentals',
    categoryName: 'Fundamentals',
    icon: Wifi,
    order: 2,
    summary: 'Geographic classifications, transmission media, latency trade-offs, and coverage.',
    badge: 'Core'
  },
  'network-topologies': {
    topicId: 'network-topologies',
    topicName: 'Network Topologies (Star, Mesh, Bus, Ring, Hybrid)',
    shortName: 'Topologies',
    category: 'fundamentals',
    categoryName: 'Fundamentals',
    icon: Workflow,
    order: 3,
    summary: 'Physical vs logical wiring, fault tolerance, cable costs, and single point of failure analysis.',
    badge: 'Interview High-Yield'
  },
  'network-devices': {
    topicId: 'network-devices',
    topicName: 'Network Devices (Hub, Switch, Router, Gateway, Bridge)',
    shortName: 'Network Devices',
    category: 'fundamentals',
    categoryName: 'Fundamentals',
    icon: HardDrive,
    order: 4,
    summary: 'Operating layers (L1 vs L2 vs L3), collision containment, and forwarding intelligence.',
    badge: 'Essential'
  },
  'osi-model': {
    topicId: 'osi-model',
    topicName: 'OSI 7-Layer Reference Model',
    shortName: 'OSI Model',
    category: 'fundamentals',
    categoryName: 'Fundamentals',
    icon: Layers,
    order: 5,
    summary: 'Physical to Application layers, layer duties, protocol data units, and abstraction.',
    badge: 'Placement Favorite'
  },
  'tcp-ip-model': {
    topicId: 'tcp-ip-model',
    topicName: 'TCP/IP 4-Layer Architecture',
    shortName: 'TCP/IP Model',
    category: 'fundamentals',
    categoryName: 'Fundamentals',
    icon: Cpu,
    order: 6,
    summary: 'Network Interface, Internet, Transport, and Application layers powering the modern Internet.',
    badge: 'Essential'
  },
  'osi-vs-tcp-ip': {
    topicId: 'osi-vs-tcp-ip',
    topicName: 'OSI vs TCP/IP Model Comparison',
    shortName: 'OSI vs TCP/IP',
    category: 'fundamentals',
    categoryName: 'Fundamentals',
    icon: Repeat,
    order: 7,
    summary: 'Conceptual vs practical model differences, layer mappings, and why TCP/IP prevailed.',
    badge: 'Interview Trap'
  },
  'encapsulation-decapsulation': {
    topicId: 'encapsulation-decapsulation',
    topicName: 'Encapsulation & Decapsulation (PDU Lifecycle)',
    shortName: 'PDU Encapsulation',
    category: 'fundamentals',
    categoryName: 'Fundamentals',
    icon: Binary,
    order: 8,
    summary: 'Data -> Segment -> Packet -> Frame -> Bits header attachment and payload unwrapping.',
    badge: 'VFX Key'
  },

  // B. DATA LINK LAYER
  'mac-address': {
    topicId: 'mac-address',
    topicName: 'MAC Addressing (Physical 48-bit Hardware Address)',
    shortName: 'MAC Address',
    category: 'data-link',
    categoryName: 'Data Link Layer',
    icon: Radio,
    order: 9,
    summary: 'OUI vendor prefixes, NIC burned-in addresses, unicast vs broadcast vs multicast MACs.',
    badge: 'Core'
  },
  'ethernet-frames': {
    topicId: 'ethernet-frames',
    topicName: 'Ethernet & Frame Structure (802.3)',
    shortName: 'Ethernet Frames',
    category: 'data-link',
    categoryName: 'Data Link Layer',
    icon: FileCode,
    order: 10,
    summary: 'Preamble, SFD, Source/Dest MAC, EtherType, Payload, and CRC/FCS error detection.',
    badge: 'Technical'
  },
  'arp-protocol': {
    topicId: 'arp-protocol',
    topicName: 'ARP (Address Resolution Protocol) & Cache',
    shortName: 'ARP Protocol',
    category: 'data-link',
    categoryName: 'Data Link Layer',
    icon: Search,
    order: 11,
    summary: 'Resolving known IPv4 to unknown MAC, broadcast request, unicast reply, and ARP poisoning.',
    badge: 'Placement Favorite'
  },
  'switching-mac-table': {
    topicId: 'switching-mac-table',
    topicName: 'Switching Mechanics & CAM/MAC Address Table',
    shortName: 'Switching & CAM',
    category: 'data-link',
    categoryName: 'Data Link Layer',
    icon: ArrowRightLeft,
    order: 12,
    summary: 'Learning source MACs, selective forwarding, flooding unknown unicasts, and aging timers.',
    badge: 'Placement Classic'
  },
  'vlan': {
    topicId: 'vlan',
    topicName: 'VLAN (Virtual Local Area Network) & 802.1Q Tagging',
    shortName: 'VLAN & Trunking',
    category: 'data-link',
    categoryName: 'Data Link Layer',
    icon: Layers,
    order: 13,
    summary: 'Logical broadcast segment isolation, access vs trunk ports, and inter-VLAN routing.',
    badge: 'System Design'
  },
  'collision-broadcast-domains': {
    topicId: 'collision-broadcast-domains',
    topicName: 'Collision Domains vs Broadcast Domains',
    shortName: 'Collision vs Broadcast',
    category: 'data-link',
    categoryName: 'Data Link Layer',
    icon: Shield,
    order: 14,
    summary: 'How hubs, switches, and routers break down electrical collisions and broadcast floods.',
    badge: 'Interview Trap'
  },

  // C. NETWORK LAYER
  'ip-addressing': {
    topicId: 'ip-addressing',
    topicName: 'IPv4 Addressing & Classful Architecture (A, B, C, D, E)',
    shortName: 'IP Addressing',
    category: 'network-layer',
    categoryName: 'Network Layer',
    icon: Network,
    order: 15,
    summary: '32-bit addresses, network ID vs host ID, default subnet masks, and loopback 127.0.0.1.',
    badge: 'Core'
  },
  'ipv4-vs-ipv6': {
    topicId: 'ipv4-vs-ipv6',
    topicName: 'IPv4 vs IPv6 Architecture & Migration',
    shortName: 'IPv4 vs IPv6',
    category: 'network-layer',
    categoryName: 'Network Layer',
    icon: Repeat,
    order: 16,
    summary: '32-bit vs 128-bit space exhaustion, hex notation, SLAAC, header simplification, and IPSec.',
    badge: 'Modern'
  },
  'public-vs-private-ip': {
    topicId: 'public-vs-private-ip',
    topicName: 'Public vs Private IP (RFC 1918 Ranges & CGNAT)',
    shortName: 'Public vs Private IP',
    category: 'network-layer',
    categoryName: 'Network Layer',
    icon: ShieldCheck,
    order: 17,
    summary: '10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 non-routable ranges and internet routability.',
    badge: 'Essential'
  },
  'subnetting-cidr': {
    topicId: 'subnetting-cidr',
    topicName: 'Subnetting & CIDR (Classless Inter-Domain Routing)',
    shortName: 'Subnetting & CIDR',
    category: 'network-layer',
    categoryName: 'Network Layer',
    icon: Binary,
    order: 18,
    summary: 'Prefix length /24, subnet mask calculation, network/broadcast IPs, and usable host math.',
    badge: 'Placement Benchmark'
  },
  'routing-fundamentals': {
    topicId: 'routing-fundamentals',
    topicName: 'Routing Fundamentals (Static, Dynamic, Distance Vector, Link State)',
    shortName: 'Routing Fundamentals',
    category: 'network-layer',
    categoryName: 'Network Layer',
    icon: Workflow,
    order: 19,
    summary: 'Bellman-Ford vs Dijkstra, hop count vs link cost metric, and autonomous systems.',
    badge: 'Core'
  },
  'routing-table-gateway': {
    topicId: 'routing-table-gateway',
    topicName: 'Routing Table Lookup & Default Gateway',
    shortName: 'Routing Table & Gateway',
    category: 'network-layer',
    categoryName: 'Network Layer',
    icon: Terminal,
    order: 20,
    summary: 'Longest Prefix Match (LPM), next-hop resolution, metric evaluation, and default route 0.0.0.0/0.',
    badge: 'Interview Trap'
  },
  'nat-network-address-translation': {
    topicId: 'nat-network-address-translation',
    topicName: 'NAT (Network Address Translation) & PAT / SNAT / DNAT',
    shortName: 'NAT & PAT',
    category: 'network-layer',
    categoryName: 'Network Layer',
    icon: RefreshCw,
    order: 21,
    summary: 'Port Address Translation mapping multiple internal private IPs to a single public IP.',
    badge: 'Placement Classic'
  },
  'icmp-protocol': {
    topicId: 'icmp-protocol',
    topicName: 'ICMP (Internet Control Message Protocol) & Diagnostics',
    shortName: 'ICMP Protocol',
    category: 'network-layer',
    categoryName: 'Network Layer',
    icon: Zap,
    order: 22,
    summary: 'Echo Request (Type 8), Echo Reply (Type 0), Destination Unreachable (Type 3), and TTL expired.',
    badge: 'Diagnostics'
  },

  // D. TRANSPORT LAYER
  'tcp-protocol': {
    topicId: 'tcp-protocol',
    topicName: 'TCP (Transmission Control Protocol) Architecture & Segment Header',
    shortName: 'TCP Protocol',
    category: 'transport-layer',
    categoryName: 'Transport Layer',
    icon: ArrowRightLeft,
    order: 23,
    summary: 'Connection-oriented reliable byte stream, sequence/ack numbering, and 6 control flags.',
    badge: 'Core High-Yield'
  },
  'tcp-3-way-handshake': {
    topicId: 'tcp-3-way-handshake',
    topicName: 'TCP 3-Way Handshake (SYN, SYN-ACK, ACK)',
    shortName: 'TCP 3-Way Handshake',
    category: 'transport-layer',
    categoryName: 'Transport Layer',
    icon: Zap,
    order: 24,
    summary: 'ISN synchronization, socket connection establishment, SYN flood defense, and state machine.',
    badge: 'Top Placement Ask'
  },
  'tcp-connection-termination': {
    topicId: 'tcp-connection-termination',
    topicName: 'TCP 4-Way Handshake Termination & TIME_WAIT State',
    shortName: 'TCP Termination',
    category: 'transport-layer',
    categoryName: 'Transport Layer',
    icon: Repeat,
    order: 25,
    summary: 'FIN / ACK duplex closing, 2MSL TIME_WAIT duration, and prevention of delayed duplicate segments.',
    badge: 'Interview Trap'
  },
  'tcp-reliability': {
    topicId: 'tcp-reliability',
    topicName: 'TCP Reliability: Sequence Numbers, ACKs & Retransmission (RTO)',
    shortName: 'TCP Reliability',
    category: 'transport-layer',
    categoryName: 'Transport Layer',
    icon: ShieldCheck,
    order: 26,
    summary: 'Cumulative acknowledgments, RTT calculation, Fast Retransmit (3 duplicate ACKs), and lost segments.',
    badge: 'Technical'
  },
  'flow-control-sliding-window': {
    topicId: 'flow-control-sliding-window',
    topicName: 'TCP Flow Control & Sliding Window Protocol',
    shortName: 'Sliding Window',
    category: 'transport-layer',
    categoryName: 'Transport Layer',
    icon: Layers,
    order: 27,
    summary: 'Receiver advertised window (rwnd), preventing receiver buffer overflow, and zero-window probing.',
    badge: 'Placement Benchmark'
  },
  'congestion-control': {
    topicId: 'congestion-control',
    topicName: 'TCP Congestion Control (Slow Start, Congestion Avoidance, Fast Recovery)',
    shortName: 'Congestion Control',
    category: 'transport-layer',
    categoryName: 'Transport Layer',
    icon: Workflow,
    order: 28,
    summary: 'Congestion window (cwnd), ssthresh, AIMD (Additive Increase Multiplicative Decrease), and loss events.',
    badge: 'Interview High-Yield'
  },
  'udp-protocol': {
    topicId: 'udp-protocol',
    topicName: 'UDP (User Datagram Protocol) & 8-Byte Lightweight Header',
    shortName: 'UDP Protocol',
    category: 'transport-layer',
    categoryName: 'Transport Layer',
    icon: Zap,
    order: 29,
    summary: 'Connectionless, stateless, low latency, checksum validation, and real-time streaming use cases.',
    badge: 'Essential'
  },
  'tcp-vs-udp': {
    topicId: 'tcp-vs-udp',
    topicName: 'TCP vs UDP Comparison & Protocol Decision Matrix',
    shortName: 'TCP vs UDP',
    category: 'transport-layer',
    categoryName: 'Transport Layer',
    icon: Repeat,
    order: 30,
    summary: 'Reliability vs speed, overhead, connection state, broadcast capability, and real-world system picks.',
    badge: 'Universal Interview Question'
  },
  'ports-and-sockets': {
    topicId: 'ports-and-sockets',
    topicName: 'Ports, Sockets & Multiplexing / Demultiplexing',
    shortName: 'Ports & Sockets',
    category: 'transport-layer',
    categoryName: 'Transport Layer',
    icon: Radio,
    order: 31,
    summary: '16-bit port spaces, well-known ports (80, 443, 53, 22), 5-tuple socket binding, and concurrent connections.',
    badge: 'Core'
  },

  // E. APPLICATION LAYER
  'dns-domain-name-system': {
    topicId: 'dns-domain-name-system',
    topicName: 'DNS (Domain Name System) Hierarchy & Resolution Process',
    shortName: 'DNS Protocol',
    category: 'application-layer',
    categoryName: 'Application Layer',
    icon: Globe,
    order: 32,
    summary: 'Recursive resolver, Root hints, TLD servers, Authoritative nameservers, and A/AAAA/CNAME records.',
    badge: 'System Design Essential'
  },
  'dhcp-protocol': {
    topicId: 'dhcp-protocol',
    topicName: 'DHCP (Dynamic Host Configuration Protocol) & DORA Process',
    shortName: 'DHCP & DORA',
    category: 'application-layer',
    categoryName: 'Application Layer',
    icon: RefreshCw,
    order: 33,
    summary: 'Discover, Offer, Request, Acknowledge 4-step broadcast handshake, IP lease duration, and renewal.',
    badge: 'Placement Classic'
  },
  'http-protocol': {
    topicId: 'http-protocol',
    topicName: 'HTTP (Hypertext Transfer Protocol) Evolution (1.0 vs 1.1 vs 2.0 vs 3.0)',
    shortName: 'HTTP Evolution',
    category: 'application-layer',
    categoryName: 'Application Layer',
    icon: Server,
    order: 34,
    summary: 'Stateless protocol, Keep-Alive persistent TCP connections, HTTP/2 multiplexing, and HTTP/3 QUIC.',
    badge: 'Top Web Ask'
  },
  'https-protocol': {
    topicId: 'https-protocol',
    topicName: 'HTTPS Architecture, Encryption & Certificate Authorities',
    shortName: 'HTTPS Protocol',
    category: 'application-layer',
    categoryName: 'Application Layer',
    icon: Lock,
    order: 35,
    summary: 'Port 443, SSL/TLS symmetric + asymmetric hybrid encryption, X.509 certificates, and MITM defense.',
    badge: 'Security Essential'
  },
  'http-methods': {
    topicId: 'http-methods',
    topicName: 'HTTP Request Methods, Idempotency & Safety',
    shortName: 'HTTP Methods',
    category: 'application-layer',
    categoryName: 'Application Layer',
    icon: FileCode,
    order: 36,
    summary: 'GET, POST, PUT, DELETE, PATCH, OPTIONS, idempotency guarantees, and payload semantics.',
    badge: 'API Interview'
  },
  'http-status-codes': {
    topicId: 'http-status-codes',
    topicName: 'HTTP Status Codes (1xx, 2xx, 3xx, 4xx, 5xx)',
    shortName: 'HTTP Status Codes',
    category: 'application-layer',
    categoryName: 'Application Layer',
    icon: Terminal,
    order: 37,
    summary: '200 OK, 301 vs 302 redirects, 400 Bad Request, 401 vs 403, 404, 500, 502 Bad Gateway, 504 Timeout.',
    badge: 'Web Foundation'
  },
  'tls-ssl-handshake': {
    topicId: 'tls-ssl-handshake',
    topicName: 'TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange',
    shortName: 'TLS / SSL Handshake',
    category: 'application-layer',
    categoryName: 'Application Layer',
    icon: ShieldCheck,
    order: 38,
    summary: 'ClientHello, ServerHello, Certificate exchange, Diffie-Hellman ephemeral key derivation, and 1-RTT/0-RTT.',
    badge: 'Security High-Yield'
  },
  'cookies-and-sessions': {
    topicId: 'cookies-and-sessions',
    topicName: 'Cookies, Sessions, JWT & State Management over HTTP',
    shortName: 'Cookies & Sessions',
    category: 'application-layer',
    categoryName: 'Application Layer',
    icon: HardDrive,
    order: 39,
    summary: 'Set-Cookie headers, HttpOnly, Secure, SameSite attributes, session store lookup vs stateless JWTs.',
    badge: 'Placement Core'
  },
  'web-caching': {
    topicId: 'web-caching',
    topicName: 'Web Caching, Cache-Control Headers & ETag Validation',
    shortName: 'Web Caching & ETag',
    category: 'application-layer',
    categoryName: 'Application Layer',
    icon: Zap,
    order: 40,
    summary: 'max-age, no-cache vs no-store, 304 Not Modified conditional requests with If-None-Match.',
    badge: 'Performance'
  },

  // F. PRACTICAL & MODERN NETWORKING
  'url-lifecycle': {
    topicId: 'url-lifecycle',
    topicName: 'Complete URL Lifecycle ("What happens when you type a URL into a browser?")',
    shortName: 'URL Lifecycle',
    category: 'practical-modern',
    categoryName: 'Practical & Modern',
    icon: Globe,
    order: 41,
    summary: 'DNS parse -> TCP connect -> TLS negotiation -> HTTP request -> Router transit -> DOM render.',
    badge: 'Universal Placement Question'
  },
  'ping-and-traceroute': {
    topicId: 'ping-and-traceroute',
    topicName: 'Ping & Traceroute Mechanics (TTL Exceeded & RTT Latency)',
    shortName: 'Ping & Traceroute',
    category: 'practical-modern',
    categoryName: 'Practical & Modern',
    icon: Terminal,
    order: 42,
    summary: 'Sending ICMP echo requests and incrementing IP TTL starting from 1 to discover route hops.',
    badge: 'Troubleshooting'
  },
  'firewall': {
    topicId: 'firewall',
    topicName: 'Firewalls: Packet Filtering, Stateful Inspection & WAF',
    shortName: 'Firewalls & WAF',
    category: 'practical-modern',
    categoryName: 'Practical & Modern',
    icon: Shield,
    order: 43,
    summary: 'Stateless ACLs vs stateful connection tracking tables and Layer 7 Web Application Firewalls.',
    badge: 'Security'
  },
  'proxy-servers': {
    topicId: 'proxy-servers',
    topicName: 'Forward Proxy Servers & Anonymity Mechanics',
    shortName: 'Forward Proxy',
    category: 'practical-modern',
    categoryName: 'Practical & Modern',
    icon: ArrowRightLeft,
    order: 44,
    summary: 'Client-side intermediary, corporate traffic filtering, IP masking, and caching outgoing requests.',
    badge: 'Practical'
  },
  'reverse-proxy': {
    topicId: 'reverse-proxy',
    topicName: 'Reverse Proxy (NGINX) Architecture & SSL Offloading',
    shortName: 'Reverse Proxy',
    category: 'practical-modern',
    categoryName: 'Practical & Modern',
    icon: Server,
    order: 45,
    summary: 'Server-side gateway, shielding internal microservices, compression, and centralized SSL termination.',
    badge: 'System Design Essential'
  },
  'load-balancer': {
    topicId: 'load-balancer',
    topicName: 'Load Balancers (Layer 4 vs Layer 7 & Algorithms)',
    shortName: 'Load Balancers',
    category: 'practical-modern',
    categoryName: 'Practical & Modern',
    icon: Workflow,
    order: 46,
    summary: 'Round Robin, Least Connections, IP Hash, Layer 4 TCP proxying vs Layer 7 URL-based routing.',
    badge: 'System Design Classic'
  },
  'cdn-content-delivery-network': {
    topicId: 'cdn-content-delivery-network',
    topicName: 'CDN (Content Delivery Network) & Edge Caching',
    shortName: 'CDN & Edge Caching',
    category: 'practical-modern',
    categoryName: 'Practical & Modern',
    icon: Zap,
    order: 47,
    summary: 'PoP locations, Anycast routing, reducing roundtrip latency for static assets, and origin shield.',
    badge: 'System Design'
  },
  'network-troubleshooting': {
    topicId: 'network-troubleshooting',
    topicName: 'Network Troubleshooting Methodology (Physical -> Application)',
    shortName: 'Troubleshooting Methodology',
    category: 'practical-modern',
    categoryName: 'Practical & Modern',
    icon: Search,
    order: 48,
    summary: 'Bottom-up vs top-down diagnostic approach: ipconfig, ping gateway, ping 8.8.8.8, nslookup, curl.',
    badge: 'Production Engineering'
  }
};

export const CN_TOPICS_LIST = Object.values(CN_TOPIC_REGISTRY).sort((a, b) => a.order - b.order);

/**
 * Resolves any raw topic slug, name, or legacy alias to a canonical topicId.
 */
export function resolveCNTopicId(rawId) {
  if (!rawId) return 'osi-model';
  const clean = String(rawId).toLowerCase().trim().replace(/_/g, '-');

  // Direct match
  if (CN_TOPIC_REGISTRY[clean]) {
    return clean;
  }

  // Legacy & fuzzy alias mapping
  const aliasMap = {
    'intro': 'intro-to-networks',
    'introduction': 'intro-to-networks',
    'types': 'network-types',
    'topologies': 'network-topologies',
    'topology': 'network-topologies',
    'devices': 'network-devices',
    'osi': 'osi-model',
    'osi-layers': 'osi-model',
    'tcp-ip': 'tcp-ip-model',
    'tcpip': 'tcp-ip-model',
    'encapsulation': 'encapsulation-decapsulation',
    'mac': 'mac-address',
    'ethernet': 'ethernet-frames',
    'arp': 'arp-protocol',
    'switching': 'switching-mac-table',
    'switch': 'switching-mac-table',
    'ip': 'ip-addressing',
    'ipv4': 'ip-addressing',
    'ipv6': 'ipv4-vs-ipv6',
    'subnetting': 'subnetting-cidr',
    'cidr': 'subnetting-cidr',
    'routing': 'routing-fundamentals',
    'nat': 'nat-network-address-translation',
    'icmp': 'icmp-protocol',
    'ping': 'ping-and-traceroute',
    'traceroute': 'ping-and-traceroute',
    'tcp': 'tcp-protocol',
    'handshake': 'tcp-3-way-handshake',
    '3-way-handshake': 'tcp-3-way-handshake',
    'udp': 'udp-protocol',
    'ports': 'ports-and-sockets',
    'sockets': 'ports-and-sockets',
    'dns': 'dns-domain-name-system',
    'dhcp': 'dhcp-protocol',
    'http': 'http-protocol',
    'https': 'https-protocol',
    'tls': 'tls-ssl-handshake',
    'ssl': 'tls-ssl-handshake',
    'cookies': 'cookies-and-sessions',
    'sessions': 'cookies-and-sessions',
    'caching': 'web-caching',
    'url': 'url-lifecycle',
    'dns-http': 'dns-domain-name-system',
    'network-security': 'firewall',
    'load-balancing': 'load-balancer',
    'cdn': 'cdn-content-delivery-network',
    'troubleshooting': 'network-troubleshooting'
  };

  if (aliasMap[clean]) {
    return aliasMap[clean];
  }

  // Substring match
  const found = CN_TOPICS_LIST.find(t => 
    t.topicId.includes(clean) || clean.includes(t.topicId) || t.shortName.toLowerCase().includes(clean)
  );

  return found ? found.topicId : 'osi-model';
}

/**
 * Returns canonical topic metadata or defaults to 'osi-model'.
 */
export function getCNTopic(rawId) {
  const resolvedId = resolveCNTopicId(rawId);
  return CN_TOPIC_REGISTRY[resolvedId] || CN_TOPIC_REGISTRY['osi-model'];
}
