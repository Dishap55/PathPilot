/**
 * MASTER COMPUTER NETWORKS (CN) REVISION & EXAM PREPARATION DATA
 * Comprehensive placement-focused revision covering:
 * 1. Complete End-to-End Data Journey (Encapsulation & Decapsulation)
 * 2. Realistic packet walkthrough (https://example.com)
 * 3. What Changes vs What Stays Same at Each Hop
 * 4. Layer -> PDU -> Protocol -> Device -> Function Matrix
 * 5. Protocol Revision & Comparison Cards (TCP/UDP, HTTP/HTTPS, DNS, DHCP, ARP, ICMP, NAT)
 * 6. Interactive Visual Flows (Handshake, DORA, DNS, ARP, HTTP Lifecycle)
 * 7. "Who Does What?" Rapid Exam Flashcards
 * 8. CN Must-Revise Priority Checklist
 * 9. High-Yield CN Numericals & Formulas
 * 10. Placement Interview Traps & Pitfalls
 * 11. 5-Minute Rapid Revision Mode
 */

export const CN_DATA_JOURNEY_STAGES = [
  {
    stage: 1,
    layerNumber: 7,
    layerName: 'Application Layer',
    pdu: 'Data',
    side: 'sender',
    action: 'User initiates HTTPS request to https://example.com in browser.',
    headerAdded: 'HTTP/HTTPS Request Payload',
    headerDetails: {
      'Method': 'GET /index.html HTTP/1.1',
      'Host': 'example.com',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; x64)',
      'Accept': 'text/html,application/xhtml+xml',
      'Connection': 'keep-alive'
    },
    visualStack: ['HTTP Data'],
    examPoint: 'Application layer generates raw user message; no transport or routing metadata exists yet.'
  },
  {
    stage: 2,
    layerNumber: 4,
    layerName: 'Transport Layer',
    pdu: 'Segment (TCP) / Datagram (UDP)',
    side: 'sender',
    action: 'OS Transport stack adds 20-byte TCP header with process port numbers and sequence tracking.',
    headerAdded: 'TCP Header (20 Bytes)',
    headerDetails: {
      'Source Port': '52144 (Random Ephemeral Port allocated by client OS)',
      'Destination Port': '443 (Standard HTTPS Server Port)',
      'Sequence Number': '1000 (Random Initial Sequence Number - ISN)',
      'Acknowledgment': '5001 (Cumulative Ack)',
      'Header Length': '20 Bytes (Data Offset = 5)',
      'Control Flags': 'ACK, PSH (Push payload to application)'
    },
    visualStack: ['TCP Header', 'HTTP Data'],
    examPoint: 'Transport layer provides process-to-process multiplexing via Ports and end-to-end reliability.'
  },
  {
    stage: 3,
    layerNumber: 3,
    layerName: 'Network Layer',
    pdu: 'Packet (Datagram)',
    side: 'sender',
    action: 'IP stack prepends 20-byte IPv4 header containing logical host addresses and hop limit.',
    headerAdded: 'IPv4 Header (20 Bytes)',
    headerDetails: {
      'Source IP': '192.168.1.10 (Client Private IP)',
      'Destination IP': '93.184.216.34 (example.com Resolved Public IP)',
      'TTL (Time to Live)': '64 (Max hops before packet is discarded to prevent loops)',
      'Protocol': '6 (Identifies TCP payload for receiver)',
      'Header Checksum': '0x7A4B (Verifies IP header integrity only)'
    },
    visualStack: ['IP Header', 'TCP Header', 'HTTP Data'],
    examPoint: 'Network layer handles host-to-host global addressing and routing. IP addresses do NOT change across standard routers.'
  },
  {
    stage: 4,
    layerNumber: 2,
    layerName: 'Data Link Layer',
    pdu: 'Frame',
    side: 'sender',
    action: 'NIC encapsulates IP packet into Ethernet II frame with local MAC addresses and CRC trailer.',
    headerAdded: 'Ethernet Header (14 Bytes) + CRC Trailer (4 Bytes)',
    headerDetails: {
      'Source MAC': 'A4:5E:60:12:AB:9C (Client physical NIC MAC)',
      'Destination MAC': '00:1A:2B:3C:4D:5E (Default Gateway Router Fa0/0 MAC)',
      'EtherType': '0x0800 (IPv4 Payload)',
      'FCS / CRC Trailer': '4-Byte Cyclic Redundancy Check (Error detection)'
    },
    visualStack: ['MAC Header', 'IP Header', 'TCP Header', 'HTTP Data', 'CRC Trailer'],
    examPoint: 'Data Link layer handles hop-by-hop local delivery. Destination MAC is the GATEWAY router, NOT the final web server!'
  },
  {
    stage: 5,
    layerNumber: 1,
    layerName: 'Physical Layer',
    pdu: 'Bits (Physical Signals)',
    side: 'sender',
    action: 'NIC PHY chip converts framed binary bits into physical voltages (copper) or light pulses (fiber).',
    headerAdded: 'Preamble & Start Frame Delimiter (SFD)',
    headerDetails: {
      'Transmission Media': 'Cat6 Twisted Pair / 1000BASE-T Ethernet',
      'Encoding': 'PAM-5 Modulation (Pulse Amplitude)',
      'Bitstream': '10101010 10101010 ... 11010010 (Bits traveling down cable)'
    },
    visualStack: ['Bits (1011001...)'],
    examPoint: 'Physical layer has zero concept of packets, IPs, or ports. It only transmits raw physical bits.'
  },
  {
    stage: 6,
    layerNumber: 3,
    layerName: 'Intermediate Routing Hops',
    pdu: 'Packet in Transit',
    side: 'network',
    action: 'Router strips Layer 2 frame, decrements TTL 64 -> 63, evaluates routing table, and re-encapsulates for next hop.',
    headerAdded: 'New Hop-by-Hop MAC Header',
    headerDetails: {
      'Source MAC at Hop 2': 'Router 1 WAN Outbound Interface MAC',
      'Dest MAC at Hop 2': 'Core ISP Router 2 Inbound Interface MAC',
      'Source IP': '192.168.1.10 (Unchanged)',
      'Dest IP': '93.184.216.34 (Unchanged)',
      'TTL at Hop 2': '63 (Decremented by 1)',
      'Checksum': 'Recomputed due to TTL change'
    },
    visualStack: ['New Hop MAC', 'IP Header (TTL=63)', 'TCP Header', 'HTTP Data', 'New CRC'],
    examPoint: 'EXAM TRAP: MAC addresses change at EVERY hop; IP addresses and Port numbers remain constant end-to-end!'
  },
  {
    stage: 7,
    layerNumber: 1,
    layerName: 'Physical Layer (Receiver)',
    pdu: 'Bits received',
    side: 'receiver',
    action: 'Web server NIC detects electrical/optical signals and reconstructs raw binary bitstream.',
    headerAdded: 'Demodulation',
    headerDetails: {
      'Receiver NIC': 'Intel 10GbE SFP+ Fiber Transceiver',
      'Action': 'Converts light pulses back into binary byte buffers in NIC ring memory'
    },
    visualStack: ['Bits -> Byte Buffer'],
    examPoint: 'Physical layer passes raw bytes up to Layer 2 NIC driver.'
  },
  {
    stage: 8,
    layerNumber: 2,
    layerName: 'Data Link Layer (Receiver)',
    pdu: 'Frame Decapsulation',
    side: 'receiver',
    action: 'Server NIC validates CRC checksum, verifies Destination MAC matches server NIC, and strips Ethernet header.',
    headerAdded: 'Unwrapping L2',
    headerDetails: {
      'CRC Check': 'MATCH (Zero bit corruption detected)',
      'Dest MAC Check': 'MATCH (Matches Server NIC 3C:52:82:91:10:EF)',
      'Stripped': 'Ethernet Header (14B) & CRC Trailer (4B) discarded',
      'Passed Up': 'IPv4 Packet passed to OS Network Layer via IRQ'
    },
    visualStack: ['IP Header', 'TCP Header', 'HTTP Data'],
    examPoint: 'If CRC checksum fails, frame is dropped immediately without acknowledgement.'
  },
  {
    stage: 9,
    layerNumber: 3,
    layerName: 'Network Layer (Receiver)',
    pdu: 'Packet Decapsulation',
    side: 'receiver',
    action: 'OS IP stack checks Destination IP matches server, verifies Protocol = 6 (TCP), and strips IP header.',
    headerAdded: 'Unwrapping L3',
    headerDetails: {
      'Dest IP Check': 'MATCH (93.184.216.34 belongs to server)',
      'Protocol Field': '6 -> Dispatches payload to TCP protocol handler',
      'Stripped': '20-Byte IPv4 Header discarded'
    },
    visualStack: ['TCP Header', 'HTTP Data'],
    examPoint: 'Network layer verifies IP integrity and directs payload to correct Transport Layer protocol handler.'
  },
  {
    stage: 10,
    layerNumber: 4,
    layerName: 'Transport Layer (Receiver)',
    pdu: 'Segment Decapsulation',
    side: 'receiver',
    action: 'TCP stack validates checksum, checks Sequence number for in-order delivery, sends ACK, and demultiplexes to Port 443.',
    headerAdded: 'Unwrapping L4',
    headerDetails: {
      'Dest Port': '443 -> Demultiplexes to NGINX/Apache socket descriptor',
      'Seq Verification': 'In-order delivery confirmed',
      'Stripped': '20-Byte TCP Header discarded',
      'Socket Buffer': 'HTTP Payload placed in application receive buffer'
    },
    visualStack: ['HTTP Data'],
    examPoint: 'Transport layer demultiplexes payload to the exact listening software process using the 16-bit Destination Port.'
  },
  {
    stage: 11,
    layerNumber: 7,
    layerName: 'Application Layer (Receiver)',
    pdu: 'Application Payload Delivered',
    side: 'receiver',
    action: 'Web server process (NGINX/Apache) reads GET /index.html from socket and generates HTTP 200 OK response.',
    headerAdded: 'Process Execution',
    headerDetails: {
      'Received Message': 'GET /index.html HTTP/1.1',
      'Server Action': 'Fetches index.html from disk/cache',
      'Response Generated': 'HTTP/1.1 200 OK + HTML Body',
      'Return Flow': 'Response undergoes reverse encapsulation back to client!'
    },
    visualStack: ['Original HTTP Request Delivered!'],
    examPoint: 'The user application receives the exact raw payload sent by the origin client without any network headers!'
  }
];

export const CN_WHAT_CHANGES_TABLE = [
  {
    field: 'Source IP Address',
    changes: 'NO',
    explanation: 'End-to-end logical identifier of the origin client host (192.168.1.10). Stays unchanged throughout routing (unless crossing NAT).',
    examNote: 'Critical placement question: IP addresses are global and end-to-end.'
  },
  {
    field: 'Destination IP Address',
    changes: 'NO',
    explanation: 'End-to-end logical identifier of the target server (93.184.216.34). Used by every router for Longest Prefix Match forwarding.',
    examNote: 'Does not change from hop to hop.'
  },
  {
    field: 'Source Port & Dest Port',
    changes: 'NO',
    explanation: 'Transport layer process identifiers (52144 -> 443). Intermediate routers operate at Layer 3 and do not modify Layer 4 port headers.',
    examNote: 'Only NAT/PAT gateways modify transport ports.'
  },
  {
    field: 'Source MAC Address',
    changes: 'YES (At EVERY hop)',
    explanation: 'Rewritten at each hop to the physical MAC address of the transmitting router interface on the local link.',
    examNote: 'Source MAC is always the previous physical device that just forwarded the frame.'
  },
  {
    field: 'Destination MAC Address',
    changes: 'YES (At EVERY hop)',
    explanation: 'Rewritten at each hop to the MAC address of the NEXT-HOP router or destination host on the local physical link.',
    examNote: 'Destination MAC is always the immediate next hop, resolved via ARP.'
  },
  {
    field: 'Time to Live (TTL)',
    changes: 'YES (Decrements by 1)',
    explanation: 'Decremented by 1 at every router hop. If TTL reaches 0, router drops packet and returns ICMP Time Exceeded (Type 11).',
    examNote: 'Used by traceroute to discover internet topology.'
  },
  {
    field: 'IP Header Checksum',
    changes: 'YES (Recomputed at each hop)',
    explanation: 'Because the TTL field decrements by 1 at each router, the 16-bit IP header checksum must be recalculated at every single hop.',
    examNote: 'IPv6 completely removed the header checksum to accelerate hardware router switching.'
  }
];

export const CN_LAYER_MATRIX = [
  {
    layerNumber: 7,
    layerName: 'Application Layer',
    pdu: 'Data / Message',
    protocols: 'HTTP, HTTPS, DNS, DHCP, FTP, SMTP, SSH, Telnet',
    mainJob: 'Provides network services directly to end-user software applications and APIs.',
    devices: 'Host, Web Browser, Server, API Gateway, Reverse Proxy',
    examPoint: 'User-facing protocol semantics. High-yield: HTTP methods, DNS resolution hierarchy, and DHCP DORA.'
  },
  {
    layerNumber: 6,
    layerName: 'Presentation Layer',
    pdu: 'Formatted Data',
    protocols: 'TLS/SSL, ASCII, UTF-8, JPEG, JSON, Gzip',
    mainJob: 'Data translation, encryption/decryption, compression, and character encoding.',
    devices: 'OS Crypto Subsystem, TLS Accelerator',
    examPoint: 'Handles syntax and semantics of exchanged data. TLS 1.3 encryption occurs here.'
  },
  {
    layerNumber: 5,
    layerName: 'Session Layer',
    pdu: 'Session Data',
    protocols: 'NetBIOS, RPC, Sockets, PPTP',
    mainJob: 'Establishes, manages, and terminates conversational sessions between endpoints.',
    devices: 'OS Kernel Session Manager',
    examPoint: 'Maintains checkpoints and dialog separation. Often combined into Application Layer in TCP/IP model.'
  },
  {
    layerNumber: 4,
    layerName: 'Transport Layer',
    pdu: 'Segment (TCP) / Datagram (UDP)',
    protocols: 'TCP, UDP, SCTP, QUIC',
    mainJob: 'Host-to-host process communication, port multiplexing, reliability, flow and congestion control.',
    devices: 'Host OS Network Stack, L4 Load Balancer',
    examPoint: 'MUST KNOW: TCP (reliable, ordered, 3-way handshake) vs UDP (connectionless, 8-byte header, low latency).'
  },
  {
    layerNumber: 3,
    layerName: 'Network Layer',
    pdu: 'Packet / Datagram',
    protocols: 'IPv4, IPv6, ICMP, ARP, OSPF, BGP, NAT',
    mainJob: 'Logical host-to-host addressing, subnetting, path selection, and packet routing.',
    devices: 'Router, Layer 3 Switch',
    examPoint: 'IP addressing, CIDR subnetting, Default Gateway forwarding, and TTL loop prevention.'
  },
  {
    layerNumber: 2,
    layerName: 'Data Link Layer',
    pdu: 'Frame',
    protocols: 'Ethernet (802.3), Wi-Fi (802.11), PPP, ARP',
    mainJob: 'Node-to-node physical delivery on local link, MAC addressing, framing, and CRC error detection.',
    devices: 'Switch, Bridge, NIC, Access Point',
    examPoint: 'Switches learn MAC addresses by inspecting Source MAC of incoming frames and forward by Destination MAC.'
  },
  {
    layerNumber: 1,
    layerName: 'Physical Layer',
    pdu: 'Bits',
    protocols: '1000BASE-T, DSL, Fiber Optics, 802.11 PHY',
    mainJob: 'Transmission and reception of raw unstructured binary bitstreams over physical transmission medium.',
    devices: 'Hub, Repeater, Cables, Fiber Transceiver',
    examPoint: 'Hubs operate here and broadcast every bit out all ports, creating a single shared collision domain.'
  }
];

export const CN_PROTOCOL_CARDS = [
  {
    id: 'tcp-vs-udp',
    title: 'TCP vs UDP: The Core Transport Duel',
    layer: 'Layer 4 (Transport)',
    badge: 'Top Placement Question',
    comparisons: [
      { feature: 'Connection State', tcp: 'Connection-oriented (Requires 3-Way Handshake)', udp: 'Connectionless (Sends datagrams immediately)' },
      { feature: 'Reliability', tcp: '100% Reliable (Guarantees delivery via ACKs & Retransmit)', udp: 'Unreliable / Best-effort (Zero retransmissions)' },
      { feature: 'Packet Ordering', tcp: 'Strictly in-order (Reassembles byte stream by Seq No)', udp: 'Unordered (Packets delivered in order of arrival)' },
      { feature: 'Header Size', tcp: '20 to 60 Bytes (Heavyweight)', udp: 'Exactly 8 Bytes (Lightweight)' },
      { feature: 'Flow & Congestion Control', tcp: 'Built-in (Sliding Window, Slow Start, AIMD)', udp: 'None (Application must rate-limit itself)' },
      { feature: 'Broadcast / Multicast', tcp: 'Unicast ONLY (Strict 1-to-1 peer connection)', udp: 'Supports Unicast, Multicast, and Broadcast' },
      { feature: 'Common Protocols', tcp: 'HTTP/HTTPS, SSH, SFTP, MySQL, SMTP, BGP', udp: 'DNS, DHCP, NTP, SNMP, VoIP, WebRTC, HTTP/3 (QUIC)' }
    ],
    examTrap: 'TRAP: "UDP has zero error detection." WRONG! UDP has an optional 16-bit Checksum to detect corrupted bits; it just drops bad packets without retransmitting them.'
  },
  {
    id: 'http-vs-https',
    title: 'HTTP vs HTTPS & Port Numbers',
    layer: 'Layer 7 (Application)',
    badge: 'Web Architecture',
    comparisons: [
      { feature: 'Security', tcp: 'Cleartext (Unencrypted, vulnerable to sniffing & MITM)', udp: 'Encrypted via TLS/SSL (Confidentiality & Integrity)' },
      { feature: 'Standard Port', tcp: 'Port 80', udp: 'Port 443' },
      { feature: 'Transport Handshake', tcp: 'TCP 3-Way Handshake only (1 RTT)', udp: 'TCP 3-Way Handshake + TLS 1.3 Handshake (2 RTTs)' },
      { feature: 'Certificates', tcp: 'None required', udp: 'Requires Digital Certificate signed by trusted CA' }
    ],
    examTrap: 'TRAP: HTTPS is NOT a separate protocol; it is standard HTTP messages wrapped inside a cryptographic TLS session.'
  },
  {
    id: 'dns-card',
    title: 'DNS (Domain Name System)',
    layer: 'Layer 7 (Application) over UDP/TCP Port 53',
    badge: 'Internet Phonebook',
    summary: 'Translates human domain names (google.com) into 32-bit (IPv4) or 128-bit (IPv6) machine IP addresses.',
    keyPoints: [
      'Uses UDP port 53 for small fast queries (<512B); switches to TCP port 53 for Zone Transfers (AXFR) and responses > 512B.',
      'Hierarchical resolution: Browser Cache -> OS Resolver -> Root Server (.) -> TLD Server (.com) -> Authoritative Server.',
      'Record types: A (IPv4), AAAA (IPv6), CNAME (Domain Alias), MX (Mail Exchange), NS (Nameserver).'
    ],
    examTrap: 'A CNAME record points to another domain name, NOT directly to an IP address.'
  },
  {
    id: 'dhcp-card',
    title: 'DHCP & The DORA Handshake',
    layer: 'Layer 7 (Application) over UDP Ports 67 & 68',
    badge: 'IP Automation',
    summary: 'Automates network configuration of IP addresses, subnet masks, default gateways, and DNS servers.',
    keyPoints: [
      'DORA Mnemonic: Discover (Broadcast) -> Offer (Unicast/Bcast) -> Request (Broadcast) -> Acknowledge (Unicast/Bcast).',
      'Client uses UDP port 68; Server uses UDP port 67.',
      'Leases expire; renewed at 50% (T1) and 87.5% (T2) intervals.',
      'DHCP Snooping on switches prevents Rogue DHCP Server MITM attacks.'
    ],
    examTrap: 'Step 3 (DHCPREQUEST) is BROADCAST, not unicast, so all other DHCP servers see the accepted offer and free their held IPs.'
  },
  {
    id: 'arp-card',
    title: 'ARP (Address Resolution Protocol)',
    layer: 'Layer 2/3 Glue Protocol',
    badge: 'Hardware Mapping',
    summary: 'Maps a known Layer 3 logical IP address to an unknown Layer 2 physical MAC address on the local broadcast domain.',
    keyPoints: [
      'ARP Request is BROADCAST (Dest MAC: FF:FF:FF:FF:FF:FF): "Who has IP 192.168.1.50? Tell 192.168.1.10".',
      'ARP Reply is UNICAST directly to sender: "192.168.1.50 is at MAC 3C:52:82:91:10:EF".',
      'Hosts store results in local ARP Table/Cache (`arp -a`) with aging timeout (e.g. 300s).'
    ],
    examTrap: 'ARP CANNOT cross routers! Routers do NOT forward Layer 2 broadcast packets. To communicate outside the local subnet, host ARPs for its Default Gateway MAC.'
  },
  {
    id: 'icmp-card',
    title: 'ICMP (Internet Control Message Protocol)',
    layer: 'Layer 3 (Network)',
    badge: 'Diagnostics',
    summary: 'Provides error reporting, operational diagnostics, and connectivity checks. Carried directly inside IP packets (Protocol = 1).',
    keyPoints: [
      'Ping uses ICMP Type 8 (Echo Request) and Type 0 (Echo Reply).',
      'Traceroute relies on ICMP Type 11 (Time to Live Exceeded in Transit) triggered when router decrements TTL to 0.',
      'Path MTU Discovery uses ICMP Type 3 Code 4 (Destination Unreachable: Fragmentation Needed but DF bit set).'
    ],
    examTrap: 'ICMP has NO PORT NUMBERS! Port numbers belong to Layer 4 (TCP/UDP); ICMP operates directly on Layer 3.'
  },
  {
    id: 'nat-card',
    title: 'NAT (Network Address Translation & PAT)',
    layer: 'Layer 3 / 4 Gateway Boundary',
    badge: 'IPv4 Preservation',
    summary: 'Conserves public IPv4 addresses by multiplexing thousands of private LAN hosts (RFC 1918) through one single public WAN IP.',
    keyPoints: [
      'PAT (Port Address Translation) assigns unique high-range ephemeral ports (e.g. 40001) on the public IP to track sessions.',
      'Private RFC 1918 subnets: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. These are non-routable on the public Internet.',
      'Maintains internal state table: [Private IP:Port] <==> [Public WAN IP:Port] <==> [Destination IP:Port].'
    ],
    examTrap: 'NAT breaks peer-to-peer protocols (VoIP, WebRTC) because external peers cannot initiate inbound connections to private IPs without port forwarding or STUN/TURN traversal.'
  }
];

export const CN_WHO_DOES_WHAT = [
  {
    id: 'wdw-1',
    question: 'Who routes packets between different IP subnets?',
    answer: 'ROUTER (Layer 3 - Network Layer)',
    detail: 'Routers inspect destination IP addresses, evaluate Longest Prefix Match (LPM) in routing tables, decrement TTL, and forward packets between distinct broadcast domains.'
  },
  {
    id: 'wdw-2',
    question: 'Who forwards frames within the same local network using MAC addresses?',
    answer: 'SWITCH (Layer 2 - Data Link Layer)',
    detail: 'Switches maintain a CAM/MAC Address Table mapping port numbers to learned MAC addresses. Forwards frames directly to destination port or floods if destination is unknown.'
  },
  {
    id: 'wdw-3',
    question: 'Who translates human domain names into numerical IP addresses?',
    answer: 'DNS (Domain Name System - Layer 7)',
    detail: 'DNS hierarchical resolvers query Root, TLD, and Authoritative servers over UDP port 53 to map hostnames like example.com to IP 93.184.216.34.'
  },
  {
    id: 'wdw-4',
    question: 'Who automatically leases IP addresses, subnet masks, and gateways to client devices?',
    answer: 'DHCP (Dynamic Host Configuration Protocol - Layer 7)',
    detail: 'DHCP runs the 4-step DORA handshake (Discover, Offer, Request, Ack) over UDP ports 67/68 to bootstrap unconfigured network adapters.'
  },
  {
    id: 'wdw-5',
    question: 'Who resolves an IP address to a local physical MAC address?',
    answer: 'ARP (Address Resolution Protocol - Layer 2/3)',
    detail: 'When a host knows the target IP on the local subnet, it broadcasts an ARP Request (FF:FF:FF:FF:FF:FF) and receives a unicast ARP Reply containing the target hardware MAC.'
  },
  {
    id: 'wdw-6',
    question: 'Who provides guaranteed, reliable, in-order byte stream delivery with flow control?',
    answer: 'TCP (Transmission Control Protocol - Layer 4)',
    detail: 'TCP uses 3-way handshakes, sequence numbers, cumulative acknowledgments, sliding windows, and retransmission timeouts (RTO) to guarantee 100% data integrity.'
  },
  {
    id: 'wdw-7',
    question: 'Who provides ultra-low latency, connectionless, lightweight datagram transport?',
    answer: 'UDP (User Datagram Protocol - Layer 4)',
    detail: 'UDP features a minimal 8-byte header with zero connection handshake delay, ideal for real-time video, gaming, DNS queries, and HTTP/3 QUIC.'
  },
  {
    id: 'wdw-8',
    question: 'Who identifies specific software processes running on a multi-tasking host?',
    answer: 'PORT NUMBERS (Layer 4 - Transport Layer)',
    detail: '16-bit integers (0 to 65535). Well-known ports (0-1023) identify standard services like HTTP (80), HTTPS (443), SSH (22), and DNS (53).'
  },
  {
    id: 'wdw-9',
    question: 'Who checks end-to-end network connectivity and reports TTL expired errors?',
    answer: 'ICMP (Internet Control Message Protocol - Layer 3)',
    detail: 'Used by Ping (Echo Request Type 8 / Echo Reply Type 0) and Traceroute (TTL Exceeded Type 11) for diagnostic telemetry.'
  },
  {
    id: 'wdw-10',
    question: 'Who translates private RFC 1918 IP addresses into a public routable IP?',
    answer: 'NAT / PAT (Network Address Translation - Gateway Router)',
    detail: 'Rewrites source IP and allocates public ports to allow hundreds of internal devices to share a single public IPv4 address.'
  },
  {
    id: 'wdw-11',
    question: 'Who distributes incoming client traffic across multiple backend web servers?',
    answer: 'LOAD BALANCER (L4 / L7 Reverse Proxy)',
    detail: 'Terminates client connections on a Virtual IP (VIP) and forwards traffic across backend server pools using Round-Robin, Least-Connections, or IP-Hash algorithms.'
  },
  {
    id: 'wdw-12',
    question: 'Who caches static web assets at global edge locations near end users?',
    answer: 'CDN (Content Delivery Network)',
    detail: 'Geographically distributed edge proxy servers (Cloudflare, Akamai) that cache images, scripts, and videos to eliminate origin latency.'
  }
];

export const CN_NUMERICALS_CHEATSHEET = [
  {
    id: 'num-subnetting',
    title: 'IPv4 Subnetting & Usable Host Calculation',
    formula: 'Total Addresses = 2^(32 - Prefix); Usable Hosts = 2^(32 - Prefix) - 2',
    explanation: 'Subtract 2 because the very FIRST address is the Network Address, and the very LAST address is the Directed Broadcast Address.',
    workedExample: {
      problem: 'Given the network 192.168.10.0/26, find: Subnet Mask, Total IPs, Usable Hosts, Network ID, and Broadcast ID.',
      solution: [
        '1. Prefix length = /26. Host bits = 32 - 26 = 6 bits.',
        '2. Total IP addresses = 2^6 = 64 addresses.',
        '3. Usable hosts = 64 - 2 = 62 usable host devices.',
        '4. Subnet Mask = 255.255.255.192 (11111111.11111111.11111111.11000000).',
        '5. Block size = 64. Subnet range = 192.168.10.0 to 192.168.10.63.',
        '6. Network Address = 192.168.10.0; Broadcast Address = 192.168.10.63.',
        '7. Usable Host Range = 192.168.10.1 through 192.168.10.62.'
      ]
    },
    examTip: 'Whenever asked for "usable hosts", ALWAYS remember to subtract 2!'
  },
  {
    id: 'num-delays',
    title: 'Transmission Delay vs Propagation Delay',
    formula: 'Transmission Delay (T_trans) = L / R  |  Propagation Delay (T_prop) = d / s',
    explanation: 'Transmission delay is the time to push L bits onto the transmission link with bandwidth R bps. Propagation delay is the time for a bit to physically travel distance d at speed s (approx 2x10^8 m/s in fiber/copper).',
    workedExample: {
      problem: 'A 1 MB file (8 x 10^6 bits) is transmitted over a 10 Mbps link across a distance of 2000 km in fiber (speed = 2 x 10^8 m/s). Calculate T_trans and T_prop.',
      solution: [
        '1. Transmission Delay: T_trans = L / R = (8 x 10^6 bits) / (10 x 10^6 bps) = 0.8 seconds (800 ms).',
        '2. Propagation Delay: T_prop = d / s = (2 x 10^6 m) / (2 x 10^8 m/s) = 0.01 seconds (10 ms).',
        '3. Total Delivery Time = T_trans + T_prop = 800 ms + 10 ms = 810 ms.'
      ]
    },
    examTip: 'Increasing bandwidth reduces Transmission delay, but has ZERO impact on Propagation delay!'
  },
  {
    id: 'num-bdp',
    title: 'Bandwidth-Delay Product (BDP)',
    formula: 'BDP = Bandwidth (bps) x Round Trip Time (RTT seconds)',
    explanation: 'Represents the maximum volume of unacknowledged data that can be in flight simultaneously inside the network pipe.',
    workedExample: {
      problem: 'Calculate the BDP for a 1 Gbps fiber link with RTT = 50 ms. How large should the TCP receive buffer be to achieve 100% link utilization?',
      solution: [
        '1. Bandwidth = 1 x 10^9 bps. RTT = 50 ms = 0.05 seconds.',
        '2. BDP = (1 x 10^9) x 0.05 = 50,000,000 bits = 6.25 Megabytes (MB).',
        '3. Conclusion: The TCP sliding window / buffer must be at least 6.25 MB to fully saturate the link.'
      ]
    },
    examTip: 'High-BDP links (Long Fat Networks - LFNs) require the TCP Window Scale Option (RFC 7323) to exceed standard 64KB window limits.'
  },
  {
    id: 'num-sliding-window',
    title: 'Stop-and-Wait & Sliding Window Efficiency',
    formula: 'Efficiency (η) = N / (1 + 2a), where a = T_prop / T_trans and N = Window Size',
    explanation: 'In Stop-and-Wait, N = 1, so η = 1 / (1 + 2a). In Sliding Window, to achieve 100% efficiency (η = 1), window size N must satisfy N >= 1 + 2a.',
    workedExample: {
      problem: 'If packet transmission time T_trans = 1 ms and propagation time T_prop = 49.5 ms, find: 1. Stop-and-wait efficiency. 2. Minimum window size for 100% utilization.',
      solution: [
        '1. a = T_prop / T_trans = 49.5 / 1 = 49.5.',
        '2. Stop-and-Wait Efficiency = 1 / (1 + 2 x 49.5) = 1 / 100 = 1%. The link is 99% idle!',
        '3. For 100% utilization (η = 1): N >= 1 + 2a = 1 + 2(49.5) = 100 packets.',
        '4. Minimum sequence number bits required: For Go-Back-N, ceil(log2(N + 1)) = ceil(log2(101)) = 7 bits. For Selective Repeat, ceil(log2(2N)) = ceil(log2(200)) = 8 bits.'
      ]
    },
    examTip: 'Remember: Minimum sequence numbers for Go-Back-N is (N + 1); for Selective Repeat it is 2N!'
  }
];

export const CN_INTERVIEW_TRAPS = [
  {
    wrong: 'MAC address is used to route packets across the global Internet.',
    correct: 'MAC address is strictly a local data-link identifier. It gets rewritten at every single router hop. IP addresses are used for global routing.',
    concept: 'Layer 2 vs Layer 3 Addressing'
  },
  {
    wrong: 'A Network Switch and a Router do the same job.',
    correct: 'A Switch operates at Layer 2, connects devices within the SAME broadcast domain, and forwards frames by MAC. A Router operates at Layer 3, connects DIFFERENT subnets, and forwards packets by IP.',
    concept: 'Network Devices'
  },
  {
    wrong: 'TCP and UDP cannot share the same port number on the same computer.',
    correct: 'TCP and UDP maintain completely independent protocol demultiplexing tables in the OS kernel. TCP port 53 and UDP port 53 can both be bound simultaneously without conflict.',
    concept: 'Transport Demultiplexing'
  },
  {
    wrong: 'DNS downloads and delivers web page HTML to the browser.',
    correct: 'DNS only resolves the domain name into an IP address! Once the browser has the IP, HTTP/HTTPS handles downloading HTML over a TCP connection.',
    concept: 'Application Protocol Roles'
  },
  {
    wrong: 'DHCP operates over TCP to guarantee reliable IP assignment.',
    correct: 'A client that has no IP address cannot establish a stateful TCP 3-way handshake! DHCP must operate over connectionless UDP broadcast messages.',
    concept: 'DHCP Bootstrap'
  },
  {
    wrong: 'HTTPS is an entirely separate protocol built from scratch.',
    correct: 'HTTPS is standard HTTP application data encrypted inside a Layer 4/6 TLS (Transport Layer Security) cryptographic tunnel.',
    concept: 'Web Security'
  },
  {
    wrong: 'ICMP is an application layer diagnostic tool like curl.',
    correct: 'ICMP operates directly at Layer 3 (Network Layer) with Protocol number 1. It has NO transport layer port numbers.',
    concept: 'ICMP Architecture'
  },
  {
    wrong: 'A web server listening on port 443 can only accept 1 concurrent connection.',
    correct: 'TCP connections are identified by the 5-Tuple: {Source IP, Source Port, Dest IP, Dest Port, Protocol}. A single server port can handle 100,000+ concurrent clients.',
    concept: 'Socket 5-Tuple'
  }
];
