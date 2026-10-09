import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  ChevronRight,
  Server,
  Globe,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Terminal,
  Shield,
  ShieldCheck,
  HardDrive,
  Cpu,
  Search,
  Lock,
  Radio,
  FileText,
  Activity,
  Workflow
} from 'lucide-react';

/**
 * CNVFXEngine Component
 * Comprehensive visual simulation engine for Computer Networks.
 * 
 * Implements educational, slow-to-medium animated flows answering:
 * 1. Where did it start?
 * 2. What changed?
 * 3. Where did it go?
 * 4. What happened there?
 * 5. What came back?
 * 
 * Features:
 * - Responsive 100% width with generous node spacing (no clipping)
 * - Animated glowing packet traveling between active nodes
 * - Exploded packet header telemetry (IPs, Ports, TTL, MACs, Flags)
 * - Concept-specific scenarios (Routing, Handshake, DNS, DHCP, NAT, Load Balancer, Switching, Encapsulation)
 * - Play / Pause / Step Back / Step Forward / Speed (0.5x Slow / 1x) / Replay
 * - Respects prefers-reduced-motion
 */
export default function CNVFXEngine({
  vfxType = 'packet-travel',
  topicId,
  title,
  subtitle,
  className = ''
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1); // 1 = Normal Educational (3.5s per step), 0.5 = Slower (5.5s per step)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Determine scenario configuration based on vfxType or topicId
  const scenario = useMemo(() => {
    const cleanType = String(vfxType || topicId || 'packet-travel').toLowerCase().trim();

    // 1. TCP 3-Way Handshake
    if (cleanType.includes('handshake')) {
      return {
        title: 'TCP 3-Way Handshake: Stateful Connection Establishment',
        type: 'handshake',
        nodes: [
          { id: 'client', name: 'Client Host', role: 'Initiator', ip: '192.168.1.50', port: 'Ephemeral 52140', icon: Globe },
          { id: 'internet', name: 'Internet Path', role: 'Transit', ip: 'ISP Hops', port: 'Optical Transit', icon: Radio },
          { id: 'server', name: 'Web Server', role: 'Listener', ip: '142.250.72.14', port: 'Port 443 (HTTPS)', icon: Server }
        ],
        steps: [
          {
            from: 'client',
            to: 'server',
            hopNumber: 1,
            label: '1. SYN Segment (Seq = 1000)',
            action: 'Client selects random ISN = 1000, sets SYN=1 flag, and transmits initial connection request.',
            whatChanged: 'Client socket transitions from CLOSED to SYN_SENT state.',
            packet: { 'Flags': 'SYN = 1, ACK = 0', 'Seq No': '1000', 'Ack No': '0 (None)', 'Payload': '0 Bytes (Handshake Only)' },
            nodeState: { client: 'SYN_SENT', server: 'LISTEN' }
          },
          {
            from: 'server',
            to: 'client',
            hopNumber: 2,
            label: '2. SYN-ACK Segment (Seq = 5000, Ack = 1001)',
            action: 'Server acknowledges client ISN (Ack = 1001) and sends its own server ISN = 5000 with SYN+ACK flags.',
            whatChanged: 'Server socket transitions from LISTEN to SYN_RCVD state. Allocates transmission buffer.',
            packet: { 'Flags': 'SYN = 1, ACK = 1', 'Seq No': '5000', 'Ack No': '1001', 'Window': '65535 Bytes' },
            nodeState: { client: 'SYN_SENT', server: 'SYN_RCVD' }
          },
          {
            from: 'client',
            to: 'server',
            hopNumber: 3,
            label: '3. ACK Segment (Seq = 1001, Ack = 5001)',
            action: 'Client acknowledges server ISN (Ack = 5001). Duplex connection is now formally ESTABLISHED!',
            whatChanged: 'Both endpoints enter ESTABLISHED state. Ready for full-duplex HTTP/HTTPS payload transfer.',
            packet: { 'Flags': 'SYN = 0, ACK = 1', 'Seq No': '1001', 'Ack No': '5001', 'State': 'ESTABLISHED' },
            nodeState: { client: 'ESTABLISHED', server: 'ESTABLISHED' }
          }
        ]
      };
    }

    // 2. DNS Resolution
    if (cleanType.includes('dns')) {
      return {
        title: 'Hierarchical DNS Resolution (Domain Name -> IP Address)',
        type: 'dns',
        nodes: [
          { id: 'browser', name: 'Browser Client', role: 'Origin', ip: '192.168.1.10', port: 'OS Cache', icon: Globe },
          { id: 'resolver', name: 'Recursive Resolver', role: 'ISP / 8.8.8.8', ip: '8.8.8.8', port: 'UDP Port 53', icon: Cpu },
          { id: 'root', name: 'Root Server (.)', role: 'Root Zone', ip: '198.41.0.4', port: '13 Anycast Clusters', icon: HardDrive },
          { id: 'tld', name: 'TLD Server (.com)', role: 'Top-Level Domain', ip: '192.5.6.30', port: 'Verisign .com', icon: HardDrive },
          { id: 'auth', name: 'Authoritative DNS', role: 'Zone Authority', ip: 'ns1.example.com', port: 'Zone Records', icon: Server }
        ],
        steps: [
          {
            from: 'browser',
            to: 'resolver',
            hopNumber: 1,
            label: '1. Recursive Query: "What is IP for example.com?"',
            action: 'Browser misses local OS cache; issues UDP port 53 query to configured recursive resolver.',
            whatChanged: 'Recursive resolver takes ownership of resolving the complete hierarchical tree.',
            packet: { 'Query': 'example.com', 'Record': 'Type A (IPv4)', 'Protocol': 'UDP Port 53' }
          },
          {
            from: 'resolver',
            to: 'root',
            hopNumber: 2,
            label: '2. Root Referral: "Where is .com TLD?"',
            action: 'Resolver queries 1 of 13 Root Server clusters. Root returns referral to the .com TLD servers.',
            whatChanged: 'Resolver receives IP list of .com TLD name servers.',
            packet: { 'Query': '.com TLD', 'Reply': 'Referral -> 192.5.6.30 (a.gtld-servers.net)' }
          },
          {
            from: 'resolver',
            to: 'tld',
            hopNumber: 3,
            label: '3. TLD Referral: "Where is example.com?"',
            action: 'Resolver queries .com TLD. TLD returns authoritative nameservers configured for example.com.',
            whatChanged: 'Resolver receives authoritative nameservers (ns1.example.com) for the domain.',
            packet: { 'Query': 'example.com', 'Reply': 'Referral -> ns1.example.com' }
          },
          {
            from: 'resolver',
            to: 'auth',
            hopNumber: 4,
            label: '4. Authoritative Answer: A Record Returned',
            action: 'Resolver queries Authoritative server ns1.example.com. Server returns authoritative IP 93.184.216.34 with TTL=300.',
            whatChanged: 'Resolver caches the definitive IP address for 300 seconds and returns result to browser.',
            packet: { 'Domain': 'example.com', 'A Record': '93.184.216.34', 'TTL': '300s' }
          }
        ]
      };
    }

    // 3. DHCP DORA
    if (cleanType.includes('dhcp')) {
      return {
        title: 'DHCP 4-Step DORA Process (Automatic IP Configuration)',
        type: 'dhcp',
        nodes: [
          { id: 'client', name: 'New Client Laptop', role: 'Unconfigured', ip: '0.0.0.0 (Unset)', port: 'UDP Port 68', icon: Globe },
          { id: 'switch', name: 'LAN Switch', role: 'L2 Forwarder', ip: 'Broadcast Domain', port: 'VLAN 1', icon: Radio },
          { id: 'server', name: 'DHCP Server', role: 'Address Pool', ip: '192.168.1.1', port: 'UDP Port 67', icon: Server }
        ],
        steps: [
          {
            from: 'client',
            to: 'server',
            hopNumber: 1,
            label: '1. DHCPDISCOVER (Layer 2 & 3 Broadcast)',
            action: 'Client has no IP. Broadcasts on UDP port 67 (Src 0.0.0.0:68 -> Dest 255.255.255.255:67, MAC FF:FF:FF:FF:FF:FF).',
            whatChanged: 'Client requests available lease configurations on the local subnet.',
            packet: { 'Msg': 'DHCPDISCOVER', 'Src IP': '0.0.0.0', 'Dest IP': '255.255.255.255', 'Client MAC': 'A4:5E:60:12:AB:9C' }
          },
          {
            from: 'server',
            to: 'client',
            hopNumber: 2,
            label: '2. DHCPOFFER (Unicast / Broadcast Offer)',
            action: 'DHCP Server reserves available IP 192.168.1.105 from address pool and offers it to client MAC.',
            whatChanged: 'Server specifies offered IP, Subnet Mask (255.255.255.0), Gateway (192.168.1.1), DNS (8.8.8.8), and Lease (86400s).',
            packet: { 'Msg': 'DHCPOFFER', 'Offered IP': '192.168.1.105', 'Subnet Mask': '255.255.255.0', 'Gateway': '192.168.1.1' }
          },
          {
            from: 'client',
            to: 'server',
            hopNumber: 3,
            label: '3. DHCPREQUEST (Broadcast Acceptance)',
            action: 'Client broadcasts formal acceptance of offered IP 192.168.1.105, notifying other potential DHCP servers to release held IPs.',
            whatChanged: 'Client requests lease binding for the offered parameters.',
            packet: { 'Msg': 'DHCPREQUEST', 'Requested IP': '192.168.1.105', 'Server Identifier': '192.168.1.1' }
          },
          {
            from: 'server',
            to: 'client',
            hopNumber: 4,
            label: '4. DHCPACK (Lease Commitment Confirmed)',
            action: 'Server commits lease in its binding database and confirms assignment. Client binds IP 192.168.1.105 to its NIC interface.',
            whatChanged: 'Client is now fully configured with valid IP, Default Gateway, and DNS servers. Ready for internet access!',
            packet: { 'Msg': 'DHCPACK', 'Assigned IP': '192.168.1.105', 'Status': 'Lease Active (24h)' }
          }
        ]
      };
    }

    // 4. NAT / PAT
    if (cleanType.includes('nat')) {
      return {
        title: 'PAT / NAT (Port Address Translation) Lifecycle',
        type: 'nat',
        nodes: [
          { id: 'client', name: 'Private PC', role: 'Internal Host', ip: '192.168.1.10 (Private)', port: 'Port 54321', icon: Globe },
          { id: 'router', name: 'NAT Gateway Router', role: 'Translator', ip: 'WAN: 203.0.113.5 (Public)', port: 'NAT State Table', icon: Radio },
          { id: 'server', name: 'Web Server', role: 'Public Internet', ip: '142.250.72.14 (Public)', port: 'Port 443 (HTTPS)', icon: Server }
        ],
        steps: [
          {
            from: 'client',
            to: 'router',
            hopNumber: 1,
            label: '1. Outbound Private Packet',
            action: 'Internal PC sends packet: [Src: 192.168.1.10:54321 -> Dest: 142.250.72.14:443]. Private IP cannot route on public Internet.',
            whatChanged: 'Packet arrives at internal LAN interface of the gateway router.',
            packet: { 'Src Socket': '192.168.1.10:54321', 'Dest Socket': '142.250.72.14:443', 'Type': 'Private Outbound' }
          },
          {
            from: 'router',
            to: 'server',
            hopNumber: 2,
            label: '2. NAT Translation & Public Forward',
            action: 'Router rewrites Source IP to its Public WAN IP and allocates unused ephemeral port 40001: [Src: 203.0.113.5:40001]. Records mapping in NAT table.',
            whatChanged: 'NAT Table updated: 192.168.1.10:54321 <==> 203.0.113.5:40001. Packet routes across Internet.',
            packet: { 'Translated Src': '203.0.113.5:40001', 'Dest Socket': '142.250.72.14:443', 'NAT Entry': 'Added' }
          },
          {
            from: 'server',
            to: 'router',
            hopNumber: 3,
            label: '3. Inbound Server Reply',
            action: 'Web server responds to the public socket: [Src: 142.250.72.14:443 -> Dest: 203.0.113.5:40001]. Web server has zero awareness of internal private IP.',
            whatChanged: 'Packet arrives at router WAN interface addressed to public port 40001.',
            packet: { 'Reply Src': '142.250.72.14:443', 'Reply Dest': '203.0.113.5:40001', 'Payload': 'HTTP 200 OK' }
          },
          {
            from: 'router',
            to: 'client',
            hopNumber: 4,
            label: '4. De-NAT & Local Delivery',
            action: 'Router looks up port 40001 in NAT state table, finds internal mapping 192.168.1.10:54321, rewrites destination IP, and forwards packet to local PC.',
            whatChanged: 'Client receives response seamlessly without knowing NAT occurred.',
            packet: { 'Restored Dest': '192.168.1.10:54321', 'Status': 'Delivered to Private Host' }
          }
        ]
      };
    }

    // 5. Load Balancer
    if (cleanType.includes('load-balancer') || cleanType.includes('reverse-proxy')) {
      return {
        title: 'Layer 7 Load Balancer Request Distribution',
        type: 'load-balancer',
        nodes: [
          { id: 'client', name: 'Global Clients', role: 'Traffic Origin', ip: 'Multiple Client IPs', port: 'Ephemeral Ports', icon: Globe },
          { id: 'lb', name: 'Load Balancer (VIP)', role: 'Reverse Proxy', ip: 'VIP: 104.21.5.88', port: 'Port 443 (Round Robin)', icon: Cpu },
          { id: 's1', name: 'Backend App 1', role: 'Worker Node', ip: '10.0.1.10:8080', port: 'Healthy', icon: Server },
          { id: 's2', name: 'Backend App 2', role: 'Worker Node', ip: '10.0.1.11:8080', port: 'Healthy', icon: Server },
          { id: 's3', name: 'Backend App 3', role: 'Worker Node', ip: '10.0.1.12:8080', port: 'Healthy', icon: Server }
        ],
        steps: [
          {
            from: 'client',
            to: 'lb',
            hopNumber: 1,
            label: '1. Client Connects to Single Public VIP',
            action: 'Client browsers connect to single public Virtual IP (VIP: 104.21.5.88). Backend servers are hidden.',
            whatChanged: 'Load balancer terminates client TLS handshake and inspects HTTP headers.',
            packet: { 'Request': 'GET /api/checkout', 'Client IP': '198.51.100.12', 'VIP': '104.21.5.88:443' }
          },
          {
            from: 'lb',
            to: 's1',
            hopNumber: 2,
            label: '2. Request 1 Dispatched -> Server 1',
            action: 'Load balancer checks health status, evaluates Round-Robin algorithm, and forwards request to App Server 1.',
            whatChanged: 'Server 1 executes business logic without CPU bottlenecking.',
            packet: { 'Route': 'App Server 1 (10.0.1.10:8080)', 'Algorithm': 'Least Connections' }
          },
          {
            from: 'lb',
            to: 's2',
            hopNumber: 3,
            label: '3. Request 2 Dispatched -> Server 2',
            action: 'Next incoming request is load-balanced to App Server 2, maintaining horizontal scalability.',
            whatChanged: 'Traffic is evenly distributed across cluster nodes.',
            packet: { 'Route': 'App Server 2 (10.0.1.11:8080)', 'Algorithm': 'Least Connections' }
          },
          {
            from: 's1',
            to: 'client',
            hopNumber: 4,
            label: '4. Server 1 Response Returned via VIP',
            action: 'Server 1 generates response; load balancer compresses payload with Brotli/Gzip and returns to client.',
            whatChanged: 'Client receives response seamlessly from VIP.',
            packet: { 'Response': '200 OK', 'Processed By': 'App Server 1' }
          }
        ]
      };
    }

    // 6. Encapsulation & Decapsulation
    if (cleanType.includes('encapsulation')) {
      return {
        title: 'PDU Encapsulation & Decapsulation Stack',
        type: 'encapsulation',
        nodes: [
          { id: 'app', name: 'Application Layer', role: 'Layer 7', ip: 'User Data', port: 'HTTP Payload', icon: FileText },
          { id: 'trans', name: 'Transport Layer', role: 'Layer 4', ip: 'Ports 52140 -> 443', port: 'TCP Segment', icon: Layers },
          { id: 'net', name: 'Network Layer', role: 'Layer 3', ip: '192.168.1.10 -> 142.250.72.14', port: 'IP Packet', icon: Cpu },
          { id: 'link', name: 'Data Link Layer', role: 'Layer 2', ip: 'MAC: A4:5E... -> 3C:52...', port: 'Ethernet Frame', icon: HardDrive }
        ],
        steps: [
          {
            from: 'app',
            to: 'trans',
            hopNumber: 1,
            label: '1. App Data -> Layer 4 TCP Segment',
            action: 'Application sends raw HTTP data. Transport layer prepends 20-byte TCP header with Source/Dest ports, Sequence number, and control flags.',
            whatChanged: 'PDU becomes a TCP Segment.',
            packet: { 'L7 Payload': 'GET /index.html', 'L4 Header': 'TCP [SrcPort: 52140, DstPort: 443, Seq: 1000]' }
          },
          {
            from: 'trans',
            to: 'net',
            hopNumber: 2,
            label: '2. TCP Segment -> Layer 3 IP Packet',
            action: 'Network layer prepends 20-byte IPv4 header containing Source IP, Destination IP, Protocol = 6 (TCP), and TTL = 64.',
            whatChanged: 'PDU becomes an IP Packet (Datagram). Routable across autonomous networks.',
            packet: { 'L3 Header': 'IP [Src: 192.168.1.10, Dst: 142.250.72.14, TTL: 64, Proto: TCP]' }
          },
          {
            from: 'net',
            to: 'link',
            hopNumber: 3,
            label: '3. IP Packet -> Layer 2 Ethernet Frame',
            action: 'Data Link layer prepends 14-byte MAC header (Src MAC, Dest MAC, EtherType=0x0800) and appends 4-byte CRC/FCS trailer.',
            whatChanged: 'PDU becomes an Ethernet Frame. Ready for physical wire transmission.',
            packet: { 'L2 Header': 'MAC [Src: A4:5E:60:12:AB:9C, Dst: 3C:52:82:91:10:EF]', 'Trailer': 'CRC FCS Checksum' }
          },
          {
            from: 'link',
            to: 'app',
            hopNumber: 4,
            label: '4. Frame Delivered & Decapsulated at Receiver',
            action: 'Receiver NIC verifies CRC, strips MAC header, passes packet up to IP layer. IP strips IP header, passes segment to TCP. TCP strips TCP header and delivers HTTP data to web server process.',
            whatChanged: 'Full decapsulation complete. Web server receives original application payload.',
            packet: { 'Decapsulation': 'Success', 'Delivered To': 'Apache/NGINX Web Server' }
          }
        ]
      };
    }

    // Default: 5-Node Hop-by-Hop Packet Routing Flow
    return {
      title: 'Hop-by-Hop Packet Forwarding & Routing',
      type: 'routing',
      nodes: [
        { id: 'source', name: 'Source Host A', role: 'Origin', ip: '192.168.1.10', port: 'LAN 1 (Subnet A)', icon: Globe },
        { id: 'r1', name: 'Default Gateway (R1)', role: 'First Hop Router', ip: '192.168.1.1', port: 'Fa0/0 <-> Gi0/1', icon: Radio },
        { id: 'r2', name: 'Core ISP Router (R2)', role: 'Backbone Transit', ip: '10.20.30.1', port: 'High-Speed Optical', icon: Cpu },
        { id: 'r3', name: 'Destination Router (R3)', role: 'Final Hop Router', ip: '172.16.0.1', port: 'Serial0/1 <-> Fa0/0', icon: Radio },
        { id: 'dest', name: 'Destination Host B', role: 'Target Endpoint', ip: '172.16.0.50', port: 'LAN 2 (Subnet B)', icon: Server }
      ],
      steps: [
        {
          from: 'source',
          to: 'r1',
          hopNumber: 1,
          label: '1. Host A Identifies Remote Destination & Forwards to Gateway',
          action: 'Host A applies subnet mask (255.255.255.0), detects 172.16.0.50 is off-subnet, and frames packet to Default Gateway R1 MAC address.',
          whatChanged: 'Packet exits Host A NIC onto local Ethernet wire (TTL = 64).',
          packet: { 'Src IP': '192.168.1.10', 'Dest IP': '172.16.0.50', 'TTL': '64', 'Dest MAC': 'R1_Fa0/0_MAC' }
        },
        {
          from: 'r1',
          to: 'r2',
          hopNumber: 2,
          label: '2. Gateway R1 Strips L2 Frame, Decrements TTL, & Inspects Routing Table',
          action: 'R1 strips Ethernet header, decrements TTL 64 -> 63, verifies checksum, consults Longest Prefix Match (LPM), and encapsulates for WAN link to R2.',
          whatChanged: 'TTL decremented to 63. New Layer 2 frame addresses Core ISP Router R2.',
          packet: { 'Src IP': '192.168.1.10', 'Dest IP': '172.16.0.50', 'TTL': '63 (Decremented)', 'Interface': 'WAN Gi0/1' }
        },
        {
          from: 'r2',
          to: 'r3',
          hopNumber: 3,
          label: '3. Core ISP Router R2 Switches Packet across Optical Backbone',
          action: 'R2 evaluates BGP/OSPF forwarding table, decrements TTL 63 -> 62, and switches packet across fiber backbone to Destination Router R3.',
          whatChanged: 'TTL decremented to 62. Packet traverses autonomous ISP transit network.',
          packet: { 'Src IP': '192.168.1.10', 'Dest IP': '172.16.0.50', 'TTL': '62', 'Link': 'Optical Backbone' }
        },
        {
          from: 'r3',
          to: 'dest',
          hopNumber: 4,
          label: '4. Destination Router R3 Resolves Host B MAC via ARP & Delivers Frame',
          action: 'R3 recognizes 172.16.0.50 belongs to directly attached LAN 2. Looks up Host B in ARP cache, wraps in final Ethernet frame, and delivers to Host B.',
          whatChanged: 'Packet successfully delivered to Host B! Final TTL = 61.',
          packet: { 'Src IP': '192.168.1.10', 'Dest IP': '172.16.0.50', 'Final TTL': '61', 'Status': 'Delivered to Target' }
        }
      ]
    };
  }, [vfxType, topicId]);

  const activeStepData = scenario.steps[currentStep] || scenario.steps[0];
  const totalSteps = scenario.steps.length;

  // Auto-play timer with educational delay (3500ms normal, 5500ms slow)
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    const delay = speed === 1 ? 3500 : 5500;
    const timer = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % totalSteps);
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, totalSteps, speed, prefersReducedMotion]);

  const handleNextStep = () => {
    setCurrentStep((prev) => (prev + 1) % totalSteps);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => (prev === 0 ? totalSteps - 1 : prev - 1));
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  // Calculate packet traveling position percentage across the node row
  const fromIndex = scenario.nodes.findIndex((n) => n.id === activeStepData.from);
  const toIndex = scenario.nodes.findIndex((n) => n.id === activeStepData.to);
  const safeFrom = fromIndex !== -1 ? fromIndex : 0;
  const safeTo = toIndex !== -1 ? toIndex : scenario.nodes.length - 1;

  // Compute position percentage (0% to 100%)
  const numNodes = scenario.nodes.length;
  const fromPercent = ((safeFrom + 0.5) / numNodes) * 100;
  const toPercent = ((safeTo + 0.5) / numNodes) * 100;
  const packetMidPercent = (fromPercent + toPercent) / 2;

  return (
    <div className={`w-full bg-slate-950 border border-slate-800 text-white rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6 ${className}`}>
      {/* 1. Header with Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/90 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Network Simulation
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-slate-400 text-xs font-bold">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-100 mt-1">
            {title || scenario.title}
          </h3>
        </div>

        {/* Playback Controls Bar */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isPlaying
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
            }`}
            title={isPlaying ? 'Pause simulation' : 'Play simulation'}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrevStep}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Previous step"
          >
            <SkipBack size={15} />
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Next step"
          >
            <SkipForward size={15} />
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Replay from start"
          >
            <RotateCcw size={14} />
          </button>

          <button
            type="button"
            onClick={() => setSpeed(speed === 1 ? 0.5 : 1)}
            className="px-2.5 py-1 rounded-lg text-[10px] font-black text-slate-400 hover:text-slate-200 border border-slate-700 cursor-pointer"
            title="Toggle simulation speed"
          >
            {speed === 1 ? '1x Speed' : '0.5x Slow'}
          </button>
        </div>
      </div>

      {/* 2. Visual Topology Stage (Nodes + Connecting Cable + Traveling Packet) */}
      <div className="relative py-6 px-1">
        {/* Physical Link Wire Running Horizontally behind Nodes */}
        <div className="hidden sm:block absolute top-[68px] left-[6%] right-[6%] h-1 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 rounded-full z-0">
          {/* Pulsing signal glow on wire */}
          <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-pulse" />
        </div>

        {/* Nodes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 relative z-10">
          {scenario.nodes.map((node, nIdx) => {
            const isSource = activeStepData.from === node.id;
            const isTarget = activeStepData.to === node.id;
            const isActive = isSource || isTarget;

            let borderClass = 'border-slate-800/90 bg-slate-900/70 text-slate-400';
            let roleBadge = 'bg-slate-800 text-slate-400';

            if (isSource) {
              borderClass = 'border-blue-500 bg-blue-950/60 text-blue-200 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/20';
              roleBadge = 'bg-blue-600 text-white animate-pulse';
            } else if (isTarget) {
              borderClass = 'border-emerald-500 bg-emerald-950/60 text-emerald-200 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/20';
              roleBadge = 'bg-emerald-600 text-white animate-pulse';
            }

            const IconComponent = node.icon || Server;

            return (
              <div
                key={node.id}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between gap-2.5 ${borderClass}`}
              >
                {/* Active Indicator Role Badge */}
                <div className="flex items-center justify-between gap-1">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${roleBadge}`}>
                    {isSource ? 'Sender' : isTarget ? 'Receiver' : node.role || `Hop ${nIdx + 1}`}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">#{nIdx + 1}</span>
                </div>

                {/* Node Name & Icon */}
                <div className="flex items-center gap-2.5">
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-800 text-slate-400'
                  }`}>
                    <IconComponent size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-black text-slate-100 leading-snug truncate" title={node.name}>
                      {node.name}
                    </h4>
                    <span className="text-[11px] text-blue-400 font-mono block truncate" title={node.ip}>
                      {node.ip}
                    </span>
                  </div>
                </div>

                {/* Port / Subnet / Interface Details */}
                <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono flex items-center justify-between text-slate-400">
                  <span className="truncate">{node.port}</span>
                  {activeStepData.nodeState && activeStepData.nodeState[node.id] && (
                    <span className="font-bold text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-700/60 shrink-0">
                      {activeStepData.nodeState[node.id]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Animated Traveling Packet Indicator Bar */}
        <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 relative shadow-inner">
          <div className="flex items-center justify-between text-xs font-black text-slate-400 mb-2">
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
              From: {scenario.nodes.find((n) => n.id === activeStepData.from)?.name || activeStepData.from}
            </span>
            <span className="text-slate-500 font-mono uppercase text-[10px] tracking-wider">
              Hop Transmission Channel
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              To: {scenario.nodes.find((n) => n.id === activeStepData.to)?.name || activeStepData.to}
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            </span>
          </div>

          {/* Active Step Action & Exploded Telemetry */}
          <div className="space-y-3 pt-1">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-xs sm:text-sm font-black text-emerald-300">
                {activeStepData.label}
              </span>
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full shrink-0">
                Step {currentStep + 1} of {totalSteps}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {activeStepData.action || activeStepData.description}
            </p>

            {activeStepData.whatChanged && (
              <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-800/60 text-xs text-blue-200 flex items-start gap-2">
                <Zap size={14} className="text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong>What changed:</strong> {activeStepData.whatChanged}
                </span>
              </div>
            )}

            {/* Packet Header Fields */}
            {activeStepData.packet && (
              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 font-sans">
                  Packet Headers & Control Offsets at this Hop
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 font-mono text-xs">
                  {Object.entries(activeStepData.packet).map(([k, v]) => (
                    <div
                      key={k}
                      className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2"
                    >
                      <span className="text-slate-400 text-[11px] shrink-0">{k}:</span>
                      <span className="font-bold text-emerald-400 text-[11px] truncate" title={String(v)}>
                        {String(v)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Progress Step Pills Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/90">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {scenario.steps.map((st, sIdx) => {
            const isCompleted = sIdx < currentStep;
            const isCurrent = sIdx === currentStep;

            return (
              <button
                key={sIdx}
                type="button"
                onClick={() => {
                  setCurrentStep(sIdx);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-2 ring-blue-400/40'
                    : isCompleted
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                }`}
              >
                <span>Step {sIdx + 1}</span>
                {isCompleted && <CheckCircle2 size={12} className="text-emerald-400" />}
              </button>
            );
          })}
        </div>

        <span className="text-[11px] font-semibold text-slate-400 shrink-0">
          Click any step to inspect telemetry
        </span>
      </div>
    </div>
  );
}
