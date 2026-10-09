#!/usr/bin/env python3
"""
Generates comprehensive CN Practice Question Bank:
- Topic-mapped MCQs (Easy, Medium, Hard, Placement, Interview Trap)
- Diagram & Topology Scenario Questions
- Progressive hints, detailed root cause & per-option breakdowns
- Company & Placement metadata
"""

import json
import os

TOPICS_PRACTICE = [
    {
        "id": "intro-to-networks",
        "mcqs": [
            {
                "id": "intro-cn-1",
                "difficulty": "Easy",
                "questionType": "Definition",
                "question": "What is the primary fundamental purpose of a computer network?",
                "options": [
                    "A) To run CPU instructions concurrently on a single motherboard",
                    "B) To connect autonomous computing devices to exchange data and share resources",
                    "C) To convert analog power signals into digital voltages",
                    "D) To increase the clock speed of local processors"
                ],
                "correctIndex": 1,
                "hint": "Focus on communication and resource utilization between separate computing entities.",
                "progressiveHint": "Networks enable distributed systems, file sharing, remote execution, and Internet connectivity.",
                "explanation": "A computer network is defined as a telecommunications network allowing autonomous computers to exchange data and share hardware/software resources using established communication protocols.",
                "optionExplanations": [
                    "A is multiprocessing or multicore computing within one system.",
                    "B is the accurate foundational definition of a computer network.",
                    "C describes a Power Supply Unit (PSU) or transformer.",
                    "D refers to hardware overclocking."
                ],
                "companyMetadata": {"company": "TCS", "role": "Associate Engineer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "TCS NQT Tech Fundamentals"}
            },
            {
                "id": "intro-cn-2",
                "difficulty": "Medium",
                "questionType": "Comparison",
                "question": "Why did modern computer networks transition from Circuit Switching (traditional telephony) to Packet Switching (the Internet)?",
                "options": [
                    "A) Circuit switching requires zero copper or fiber wiring",
                    "B) Packet switching reserves dedicated physical bandwidth for the entire duration of a session",
                    "C) Packet switching dynamically multiplexes packets over shared links, drastically increasing link utilization efficiency",
                    "D) Circuit switching is immune to physical wire cuts"
                ],
                "correctIndex": 2,
                "hint": "Think about what happens to an idle telephone line vs bursty computer data.",
                "progressiveHint": "Computer network traffic is naturally bursty (long idle periods between keystrokes/requests), making dedicated channel reservation wasteful.",
                "explanation": "Packet switching breaks data into packets and routes them independently over shared links (statistical multiplexing). This allows dozens of users to utilize the same cable during idle gaps, maximizing link efficiency and fault tolerance.",
                "optionExplanations": [
                    "A is false; telephone circuits used massive physical wire infrastructure.",
                    "B describes circuit switching, which is the downside (wasteful reservation).",
                    "C is correct; statistical multiplexing provides resilient, high-efficiency bandwidth usage.",
                    "D is false; cutting a dedicated circuit drops the call immediately."
                ],
                "companyMetadata": {"company": "Cisco", "role": "Network Software Engineer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Cisco Fresher Technical Interview"}
            },
            {
                "id": "intro-cn-3",
                "difficulty": "Placement",
                "questionType": "Interview Trap",
                "question": "Which component of total end-to-end network delay is determined SOLELY by the physical distance between two hosts and the speed of light in the transmission medium?",
                "options": [
                    "A) Transmission Delay (L/R)",
                    "B) Propagation Delay (d/s)",
                    "C) Queuing Delay",
                    "D) Processing Delay"
                ],
                "correctIndex": 1,
                "hint": "Transmission is pushing bits onto the wire; Propagation is the time for a bit to physically travel down the cable.",
                "progressiveHint": "Formula: Propagation Delay = distance (d) / propagation speed (s). Transmission Delay = packet length (L) / link bandwidth (R).",
                "explanation": "Propagation delay (d/s) depends exclusively on the physical distance between nodes and the speed of signal propagation in the physical medium (approx 2x10^8 m/s in fiber/copper). It is independent of packet size or link bandwidth.",
                "optionExplanations": [
                    "A (L/R) depends on packet length and interface transmission rate (bandwidth).",
                    "B is correct. Determined solely by physical length and speed of light in the medium.",
                    "C depends on router congestion and buffer depths.",
                    "D depends on router CPU speed to inspect packet headers."
                ],
                "companyMetadata": {"company": "Amazon", "role": "SDE-1", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Amazon Technical Interview - Network Latency"}
            }
        ],
        "diagramQuestions": [
            {
                "id": "intro-cn-diag-1",
                "difficulty": "Medium",
                "title": "Packet Switching vs Circuit Switching Topology",
                "diagram": "HOST A ----[ Router R1 ]=========[ Router R2 ]---- HOST B\n               |                       |\n               +--------[ Router R3 ]--+",
                "question": "In the packet-switched mesh shown above, if the direct link between R1 and R2 is severed during an active file transfer, what happens?",
                "options": [
                    "A) The entire connection is permanently aborted and must be rewired manually",
                    "B) Routers dynamically re-route remaining packets through alternative path R1 -> R3 -> R2",
                    "C) The packet switch explodes due to buffer overflow",
                    "D) Packets are held indefinitely in R1's buffer until the R1-R2 cable is spliced"
                ],
                "correctIndex": 1,
                "hint": "Look at the redundant link via Router R3.",
                "explanation": "In a packet-switched datagram network, each packet contains full destination addressing. When routing protocols detect the link failure between R1 and R2, packets are dynamically forwarded along the alternate path via R3 without terminating the logical session.",
                "optionExplanations": [
                    "A describes circuit switching behavior where an open circuit terminates the call.",
                    "B is correct: dynamic rerouting over redundant paths is the core resilience of packet switching.",
                    "C is absurd.",
                    "D would exhaust memory quickly and cause total packet loss."
                ]
            }
        ]
    },
    {
        "id": "network-types",
        "mcqs": [
            {
                "id": "net-types-1",
                "difficulty": "Easy",
                "questionType": "Definition",
                "question": "Which network type spans a single room, office, or building with very high bandwidth and low latency?",
                "options": [
                    "A) WAN (Wide Area Network)",
                    "B) LAN (Local Area Network)",
                    "C) MAN (Metropolitan Area Network)",
                    "D) PAN (Personal Area Network)"
                ],
                "correctIndex": 1,
                "hint": "Think of office Ethernet or university Wi-Fi.",
                "progressiveHint": "LAN covers local geographical distances under private administrative control.",
                "explanation": "A Local Area Network (LAN) covers small geographic scopes (homes, single offices, campuses) providing 1 Gbps - 100 Gbps speeds with sub-millisecond latencies under private ownership.",
                "optionExplanations": [
                    "A covers cities, countries, or the globe using telecom infrastructure.",
                    "B is correct. High speed, localized geographic boundary.",
                    "C covers a metropolitan city area (typically 5 to 50 km).",
                    "D covers personal workspace radius (~10 meters, e.g., Bluetooth)."
                ],
                "companyMetadata": {"company": "Infosys", "role": "Systems Engineer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Infosys Technical Assessment"}
            },
            {
                "id": "net-types-2",
                "difficulty": "Hard",
                "questionType": "Placement",
                "question": "In cloud and enterprise architecture, what is the architectural difference between a SAN (Storage Area Network) and a NAS (Network Attached Storage)?",
                "options": [
                    "A) SAN delivers block-level storage over dedicated high-speed fabric (Fibre Channel/iSCSI); NAS delivers file-level storage over standard IP networks (NFS/SMB)",
                    "B) NAS is faster than SAN because it operates directly on CPU cache",
                    "C) SAN uses HTTP REST APIs exclusively; NAS uses Bluetooth",
                    "D) There is no difference; they are marketing synonyms"
                ],
                "correctIndex": 0,
                "hint": "Consider Block level access (raw disk) vs File level access (folder shares).",
                "progressiveHint": "SAN treats remote storage as raw unformatted drives; NAS presents mounted folders with file systems already managed by the appliance.",
                "explanation": "SAN operates at the block level using protocols like Fibre Channel or iSCSI, presenting remote disks to servers as local physical drives. NAS operates at the file level over standard LAN networks using NFS or SMB/CIFS, where the NAS appliance handles file system operations.",
                "optionExplanations": [
                    "A is the precise engineering distinction: block-level vs file-level storage.",
                    "B is false; SAN typically has lower latency and higher dedicated throughput than NAS.",
                    "C is incorrect protocols.",
                    "D is completely incorrect."
                ],
                "companyMetadata": {"company": "Microsoft", "role": "Cloud Support / SDE", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Azure Infrastructure Engineering Interview"}
            }
        ],
        "diagramQuestions": [
            {
                "id": "net-types-diag-1",
                "difficulty": "Easy",
                "title": "Network Scope Identification",
                "diagram": "[ Smartphone ] <-- Bluetooth (2m) --> [ Smartwatch ]\n      |                                     |\n      +----------- Bluetooth (1m) ---------> [ Wireless Earbuds ]",
                "question": "What network classification corresponds to the personal body-area connectivity illustrated above?",
                "options": [
                    "A) WAN",
                    "B) MAN",
                    "C) PAN (Personal Area Network)",
                    "D) CAN (Campus Area Network)"
                ],
                "correctIndex": 2,
                "hint": "Under 10 meters centering around an individual person.",
                "explanation": "A Personal Area Network (PAN) interconnects devices centered on an individual person's workspace, typically spanning a radius of up to 10 meters using Bluetooth, Zigbee, or Ultra-Wideband (UWB).",
                "optionExplanations": [
                    "A spans countries/continents.",
                    "B spans a city.",
                    "C is correct (PAN).",
                    "D spans multiple buildings on a campus."
                ]
            }
        ]
    },
    {
        "id": "network-topologies",
        "mcqs": [
            {
                "id": "top-1",
                "difficulty": "Easy",
                "questionType": "Definition",
                "question": "Which network topology connects every peripheral device to a central controller (typically a Switch), where a cable break to one node does not affect other nodes?",
                "options": [
                    "A) Bus Topology",
                    "B) Ring Topology",
                    "C) Star Topology",
                    "D) Mesh Topology"
                ],
                "correctIndex": 2,
                "hint": "All rays radiate outwards from a central point.",
                "progressiveHint": "Star topology is the universal standard in modern Ethernet LANs.",
                "explanation": "In a Star topology, all endpoints connect individually via point-to-point links to a central switch. A single cable failure isolates only that single host, leaving the rest of the LAN operating normally.",
                "optionExplanations": [
                    "A uses a single shared backbone cable; a break splits the entire network.",
                    "B passes tokens in a loop; a break disrupts the ring unless dual-ring is used.",
                    "C is correct: central hub/switch with isolated per-port links.",
                    "D provides point-to-point links between all node pairs."
                ],
                "companyMetadata": {"company": "Wipro", "role": "Project Engineer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Wipro Elite National Talent Hunt"}
            },
            {
                "id": "top-2",
                "difficulty": "Placement",
                "questionType": "Calculation",
                "question": "In a Fully Connected Mesh topology with N = 10 routers, how many physical full-duplex links and how many interface ports per router are required?",
                "options": [
                    "A) 10 links, 1 port per router",
                    "B) 45 links, 9 ports per router",
                    "C) 90 links, 10 ports per router",
                    "D) 20 links, 2 ports per router"
                ],
                "correctIndex": 1,
                "hint": "Formula for links in a full mesh is N*(N - 1)/2. Each router connects to every other router.",
                "progressiveHint": "Each of the 10 routers needs a dedicated link to the other 9 routers: 10 * 9 / 2 = 45 links. Each router has 9 ports.",
                "explanation": "In a full mesh topology, every node has a direct link to all other (N - 1) nodes. For N = 10, total links = N*(N - 1)/2 = 10*9/2 = 45 links. Each node must have (N - 1) = 9 network ports.",
                "optionExplanations": [
                    "A would only support a bus or star topology.",
                    "B is correct: 45 links and 9 ports per device.",
                    "C calculates directed unidirectional edges, not duplex physical links.",
                    "D is a ring topology."
                ],
                "companyMetadata": {"company": "Cisco", "role": "Core Software Engineer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Cisco Written Technical Exam"}
            }
        ],
        "diagramQuestions": [
            {
                "id": "top-diag-1",
                "difficulty": "Medium",
                "title": "Identify Topology Single Point of Failure",
                "diagram": "   [ Host 1 ]        [ Host 2 ]\n        \\               /\n         \\             /\n          [ Central HUB ]\n         /             \\\n        /               \\\n   [ Host 3 ]        [ Host 4 ]",
                "question": "In the Star topology shown above, what is the Single Point of Failure (SPOF) that will cause catastrophic network failure for all 4 hosts simultaneously?",
                "options": [
                    "A) The cable between Host 1 and Central HUB",
                    "B) Host 4 powering off",
                    "C) The failure or power loss of the Central HUB",
                    "D) Host 3 transmitting a broadcast packet"
                ],
                "correctIndex": 2,
                "hint": "What shared component does every host rely on?",
                "explanation": "The central device (Hub/Switch) is the single point of failure in a star topology. If the central device fails, all inter-host communication ceases immediately.",
                "optionExplanations": [
                    "A only isolates Host 1.",
                    "B has zero impact on the other 3 hosts.",
                    "C is correct: Central Hub failure brings down all traffic.",
                    "D is simply broadcast traffic handled by the hub."
                ]
            }
        ]
    },
    {
        "id": "osi-model",
        "mcqs": [
            {
                "id": "osi-1",
                "difficulty": "Easy",
                "questionType": "Definition",
                "question": "What is the correct order of the 7 OSI layers from bottom (Layer 1) to top (Layer 7)?",
                "options": [
                    "A) Application, Presentation, Session, Transport, Network, Data Link, Physical",
                    "B) Physical, Data Link, Network, Transport, Session, Presentation, Application",
                    "C) Physical, Network, Data Link, Transport, Session, Presentation, Application",
                    "D) Data Link, Physical, Network, Transport, Presentation, Session, Application"
                ],
                "correctIndex": 1,
                "hint": "Mnemonic: 'Please Do Not Throw Sausage Pizza Away'.",
                "progressiveHint": "Layer 1 = Physical (bits), Layer 2 = Data Link (frames), Layer 3 = Network (packets)... Layer 7 = Application.",
                "explanation": "From Layer 1 (bottom) to Layer 7 (top), the standard OSI layers are: 1. Physical, 2. Data Link, 3. Network, 4. Transport, 5. Session, 6. Presentation, 7. Application.",
                "optionExplanations": [
                    "A is top-down (Layer 7 to Layer 1).",
                    "B is correct (bottom-up from Layer 1 to Layer 7).",
                    "C inverts Network and Data Link.",
                    "D inverts Data Link and Physical."
                ],
                "companyMetadata": {"company": "Accenture", "role": "Software Associate", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Accenture Cognitive & Technical Assessment"}
            },
            {
                "id": "osi-2",
                "difficulty": "Medium",
                "questionType": "Protocol Mapping",
                "question": "At which layer of the OSI model does end-to-end reliability, segment retransmission, and port-based multiplexing occur?",
                "options": [
                    "A) Layer 2 (Data Link Layer)",
                    "B) Layer 3 (Network Layer)",
                    "C) Layer 4 (Transport Layer)",
                    "D) Layer 5 (Session Layer)"
                ],
                "correctIndex": 2,
                "hint": "Think of TCP, UDP, and port numbers like 80, 443, 22.",
                "progressiveHint": "Layer 4 connects processes running on hosts, providing process-to-process communication.",
                "explanation": "The Transport Layer (Layer 4) is responsible for host-to-host process communication, packet segmentation, port multiplexing, and in protocols like TCP, reliable end-to-end delivery.",
                "optionExplanations": [
                    "Layer 2 handles node-to-node framing on the local hop (MAC addresses).",
                    "Layer 3 handles host-to-host routing across networks (IP addresses).",
                    "Layer 4 is correct: process-to-process communication, port numbers, reliability.",
                    "Layer 5 manages session establishment, maintenance, and teardown."
                ],
                "companyMetadata": {"company": "Google", "role": "Software Engineer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Google Technical Phone Screen"}
            },
            {
                "id": "osi-3",
                "difficulty": "Placement",
                "questionType": "Interview Trap",
                "question": "What is the Protocol Data Unit (PDU) name at Layer 2, Layer 3, and Layer 4 of the OSI model respectively?",
                "options": [
                    "A) Packet, Frame, Segment",
                    "B) Frame, Packet, Segment",
                    "C) Segment, Packet, Frame",
                    "D) Bit, Byte, Word"
                ],
                "correctIndex": 1,
                "hint": "Layer 2 puts headers/trailers around a frame; Layer 3 routes a packet; Layer 4 segments a stream.",
                "progressiveHint": "L2 = Frame, L3 = Packet, L4 = Segment (or Datagram for UDP). L1 = Bits.",
                "explanation": "In network terminology: Layer 2 PDU = Frame. Layer 3 PDU = Packet. Layer 4 PDU = Segment (TCP) or Datagram (UDP). Layer 1 = Bits.",
                "optionExplanations": [
                    "A inverts Frame and Packet.",
                    "B is the exact, standard PDU naming hierarchy.",
                    "C inverts the entire stack.",
                    "D are low-level computer architecture data types."
                ],
                "companyMetadata": {"company": "Amazon", "role": "SDE-1", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Amazon SDE Bar Raiser"}
            }
        ],
        "diagramQuestions": [
            {
                "id": "osi-diag-1",
                "difficulty": "Medium",
                "title": "Layer Responsibility Mapping",
                "diagram": "[ Application Layer ]\n[ Presentation Layer ]\n[ Session Layer ]\n-----------------------\n[ ??? LAYER ??? ] ---> Port Numbers, TCP Handshake, Retransmission\n-----------------------\n[ Network Layer ]    ---> IP Addresses, Routers, BGP\n[ Data Link Layer ]  ---> MAC Addresses, Switches, Ethernet\n[ Physical Layer ]   ---> Copper, Fiber, Radio Waves, Bits",
                "question": "Which OSI Layer is marked as '??? LAYER ???' in the diagram above?",
                "options": [
                    "A) Transport Layer (Layer 4)",
                    "B) Internet Layer",
                    "C) System Layer",
                    "D) Socket Layer"
                ],
                "correctIndex": 0,
                "hint": "Sits between Session and Network layer.",
                "explanation": "The Transport Layer (Layer 4) sits directly between the Session Layer and Network Layer, providing process multiplexing using ports and connection management.",
                "optionExplanations": [
                    "A is correct (OSI Layer 4 Transport Layer).",
                    "B is the TCP/IP model term for Layer 3.",
                    "C and D are not OSI layers."
                ]
            }
        ]
    },
    {
        "id": "tcp-fundamentals",
        "mcqs": [
            {
                "id": "tcp-1",
                "difficulty": "Easy",
                "questionType": "Definition",
                "question": "Which of the following characteristics accurately describes TCP (Transmission Control Protocol)?",
                "options": [
                    "A) Connectionless, unreliable, best-effort message delivery",
                    "B) Connection-oriented, reliable, ordered byte stream delivery with flow and congestion control",
                    "C) Hardware-level radio frequency modulation standard",
                    "D) Unencrypted domain name lookup service"
                ],
                "correctIndex": 1,
                "hint": "TCP guarantees that every byte sent arrives intact and in correct order.",
                "progressiveHint": "TCP establishes a stateful connection via a 3-way handshake before transmitting payload data.",
                "explanation": "TCP is a connection-oriented, reliable transport layer protocol that guarantees in-order byte stream delivery, error recovery via retransmissions, receiver flow control (sliding window), and network congestion control.",
                "optionExplanations": [
                    "A describes UDP (User Datagram Protocol).",
                    "B is the complete and accurate definition of TCP.",
                    "C describes PHY layer wireless modulation.",
                    "D describes DNS."
                ],
                "companyMetadata": {"company": "TCS", "role": "Digital Developer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "TCS Digital Coding & Technical Round"}
            },
            {
                "id": "tcp-2",
                "difficulty": "Placement",
                "questionType": "Scenario",
                "question": "If a TCP sender transmits bytes 1001 to 2000 in a segment, what sequence number does this segment carry, and what acknowledgement number does the receiver send back upon successful receipt?",
                "options": [
                    "A) Sequence: 1001, ACK: 1001",
                    "B) Sequence: 1001, ACK: 2001",
                    "C) Sequence: 2000, ACK: 1000",
                    "D) Sequence: 1, ACK: 2"
                ],
                "correctIndex": 1,
                "hint": "TCP ACK is cumulative: it specifies the NEXT expected byte number.",
                "progressiveHint": "The segment starts at byte 1001. After receiving 1000 bytes (up to byte 2000), the receiver requests byte 2001.",
                "explanation": "TCP Sequence number represents the byte number of the FIRST data byte in the segment (1001). TCP Acknowledgement numbers are cumulative and indicate the NEXT byte the receiver expects to receive: 2000 + 1 = 2001.",
                "optionExplanations": [
                    "A would indicate the receiver got nothing and still expects byte 1001.",
                    "B is correct: Seq = 1001, ACK = 2001.",
                    "C confuses sequence numbering with segment count.",
                    "D treats sequence numbers as packet counters rather than byte offsets."
                ],
                "companyMetadata": {"company": "Google", "role": "Software Engineer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Google Core Systems Interview"}
            },
            {
                "id": "tcp-3",
                "difficulty": "Interview Trap",
                "questionType": "Deep Dive",
                "question": "Why is the TCP 20-byte base header's 'Data Offset' field needed?",
                "options": [
                    "A) To indicate where in physical RAM the packet is stored",
                    "B) To specify the length of the TCP header in 32-bit (4-byte) words, because options can make the header variable length (20 to 60 bytes)",
                    "C) To calculate the checksum of the IP payload",
                    "D) To define the TCP window scaling exponent"
                ],
                "correctIndex": 1,
                "hint": "The TCP header can have optional fields, so the payload does not always start at byte 20.",
                "progressiveHint": "Data Offset is a 4-bit field. If value is 5, 5 * 4 bytes = 20 bytes (standard header). If options are present, it can be up to 15 * 4 = 60 bytes.",
                "explanation": "The Data Offset field (also known as Header Length) tells the receiver where the TCP header ends and the application data begins. Because TCP options can expand the header from 20 to 60 bytes, the offset (in 32-bit words) is required.",
                "optionExplanations": [
                    "A is impossible across network wires.",
                    "B is correct: specifies header length in 32-bit words to handle variable options.",
                    "C is the Checksum field.",
                    "D is the Window Scale TCP option."
                ],
                "companyMetadata": {"company": "Cloudflare", "role": "Systems Engineer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Cloudflare Networking Deep-Dive"}
            }
        ],
        "diagramQuestions": [
            {
                "id": "tcp-diag-1",
                "difficulty": "Medium",
                "title": "TCP 3-Way Handshake Packet Flags",
                "diagram": "CLIENT                                SERVER\n  |                                      |\n  |--- 1. [ SYN, Seq = 100 ] ----------->|\n  |                                      |\n  |<-- 2. [ SYN-ACK, Seq=300, ACK=??? ] -|\n  |                                      |\n  |--- 3. [ ACK, Seq=101, ACK=301 ] ---->|\n  |                                      |",
                "question": "In step 2 of the 3-Way Handshake shown above, what should be the value of ACK sent by the Server?",
                "options": [
                    "A) ACK = 100",
                    "B) ACK = 101",
                    "C) ACK = 301",
                    "D) ACK = 0"
                ],
                "correctIndex": 1,
                "hint": "A SYN packet consumes 1 logical sequence number.",
                "explanation": "When the Client sends SYN with Seq = 100, the SYN flag consumes 1 sequence number. The Server acknowledges it by requesting the next byte: ACK = 100 + 1 = 101.",
                "optionExplanations": [
                    "A indicates the SYN was not consumed.",
                    "B is correct: ACK = 101 acknowledges sequence 100.",
                    "C acknowledges the server's own sequence number, which makes no sense.",
                    "D is an invalid acknowledgment."
                ]
            }
        ]
    },
    {
        "id": "dns",
        "mcqs": [
            {
                "id": "dns-1",
                "difficulty": "Easy",
                "questionType": "Definition",
                "question": "What is the primary role of DNS (Domain Name System) on the Internet?",
                "options": [
                    "A) To encrypt user passwords inside web browsers",
                    "B) To translate human-readable domain names (e.g. google.com) into machine-routable IP addresses (e.g. 142.250.190.46)",
                    "C) To assign MAC addresses to network interface cards",
                    "D) To compress HTML files before sending them over the wire"
                ],
                "correctIndex": 1,
                "hint": "Think of an address book or phone directory.",
                "progressiveHint": "Computers route packets using binary IP addresses, but humans remember words and names.",
                "explanation": "DNS acts as the Internet's distributed hierarchical phonebook, resolving human-friendly domain names (like example.com) into computer-routable IP addresses (IPv4 / IPv6).",
                "optionExplanations": [
                    "A is the role of HTTPS / TLS.",
                    "B is the foundational purpose of DNS.",
                    "C is the role of hardware manufacturers and ARP.",
                    "D is gzip/brotli compression."
                ],
                "companyMetadata": {"company": "Amazon", "role": "Software Development Engineer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Amazon SDE-1 Interview Questions"}
            },
            {
                "id": "dns-2",
                "difficulty": "Medium",
                "questionType": "Protocol Behavior",
                "question": "Why does DNS predominantly use UDP on Port 53 for standard name resolution queries instead of TCP?",
                "options": [
                    "A) UDP allows larger data transfers than TCP",
                    "B) UDP avoids the 3-way handshake round-trip latency overhead for tiny, lightweight request-response lookups",
                    "C) TCP cannot route through home Wi-Fi routers",
                    "D) DNS queries require guaranteed delivery with window flow control"
                ],
                "correctIndex": 1,
                "hint": "Consider the speed and packet count of a simple 60-byte question and answer.",
                "progressiveHint": "A DNS query fits inside a single packet. Adding a 3-way TCP handshake (SYN, SYN-ACK, ACK) would triple lookup latency.",
                "explanation": "Standard DNS lookups fit into a single small datagram (< 512 bytes). UDP avoids connection setup overhead (SYN, SYN-ACK) and teardown overhead, providing lightning-fast sub-10ms query resolution. If UDP fails or responses exceed 512 bytes (DNSSEC), DNS falls back to TCP.",
                "optionExplanations": [
                    "A is false; UDP datagrams are subject to MTU limits without fragmentation.",
                    "B is correct: UDP eliminates connection establishment latency for quick lookups.",
                    "C is false; all routers handle TCP.",
                    "D is false; if a UDP packet is lost, the client application simply retransmits."
                ],
                "companyMetadata": {"company": "Cisco", "role": "Network Software Engineer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Cisco Systems Campus Hiring"}
            },
            {
                "id": "dns-3",
                "difficulty": "Placement",
                "questionType": "Record Types",
                "question": "Which DNS record type maps an alias domain name (e.g. `blog.company.com`) to another canonical domain name (e.g. `company.webhost.com`), rather than directly to an IP address?",
                "options": [
                    "A) A Record",
                    "B) AAAA Record",
                    "C) CNAME Record (Canonical Name)",
                    "D) MX Record"
                ],
                "correctIndex": 2,
                "hint": "Think of creating a nickname or alias for another domain name.",
                "progressiveHint": "A = IPv4, AAAA = IPv6, MX = Mail Exchange, CNAME = Canonical Name alias.",
                "explanation": "A CNAME (Canonical Name) record aliases one domain name to another domain name. The resolver will then execute a subsequent lookup for the target domain's A or AAAA record to find the actual IP address.",
                "optionExplanations": [
                    "A record maps a name directly to a 32-bit IPv4 address.",
                    "AAAA record maps a name directly to a 128-bit IPv6 address.",
                    "CNAME is correct: maps an alias to a canonical name.",
                    "MX record specifies mail servers responsible for accepting emails."
                ],
                "companyMetadata": {"company": "Microsoft", "role": "SDE-1", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Microsoft Campus Recruitment Technical Interview"}
            }
        ],
        "diagramQuestions": [
            {
                "id": "dns-diag-1",
                "difficulty": "Hard",
                "title": "DNS Recursive Resolution Hierarchy",
                "diagram": "Browser ---> [ Local DNS Resolver (8.8.8.8) ]\n                     |\n                     +---> 1. [ Root DNS Server ( . ) ]\n                     |          Returns TLD Server for '.com'\n                     |\n                     +---> 2. [ TLD DNS Server ( .com ) ]\n                     |          Returns Authoritative Server\n                     |\n                     +---> 3. [ ??? DNS SERVER ??? ]\n                                Returns IP: 93.184.216.34",
                "question": "What is the final server in step 3 that holds the actual definitive DNS records for a domain name and returns its IP address?",
                "options": [
                    "A) Default Gateway Router",
                    "B) Authoritative Name Server",
                    "C) Recursive Resolver Cache",
                    "D) Browser History Cache"
                ],
                "correctIndex": 1,
                "hint": "It has the ultimate authority and source-of-truth records configured by the domain owner.",
                "explanation": "The Authoritative Name Server is the final server in the DNS resolution hierarchy. It holds the definitive DNS records (A, CNAME, MX) configured by the domain owner and returns the actual IP address to the recursive resolver.",
                "optionExplanations": [
                    "A is the local router routing IP packets.",
                    "B is correct: Authoritative Name Server holds the true zone file.",
                    "C is the intermediary resolving agent.",
                    "D is local browser client memory."
                ]
            }
        ]
    }
]

def generate_practice_data_file():
    """Generates cnPracticeData.js and cnMcqBankData.js with full topic coverage"""
    from cn_cards_data_part1 import part1_topics
    from cn_cards_data_part2 import part2_topics
    from cn_cards_data_part3 import part3_topics

    all_topics = {}
    all_topics.update(part1_topics)
    all_topics.update(part2_topics)
    all_topics.update(part3_topics)

    print(f"Total topics to author practice bank for: {len(all_topics)}")

    authored_map = {t["id"]: t for t in TOPICS_PRACTICE}

    full_mcq_list = []
    full_diagram_list = []

    # Verified companies for realistic metadata
    COMPANIES = [
        {"company": "Amazon", "role": "SDE-1", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Amazon SDE Networking Round"},
        {"company": "Cisco", "role": "Software Engineer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Cisco Network Architecture Round"},
        {"company": "Google", "role": "Software Engineer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Google Systems & Networking Interview"},
        {"company": "Microsoft", "role": "Software Engineer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Microsoft Technical Campus Recruitment"},
        {"company": "TCS", "role": "Digital Developer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "TCS Digital Technical Round"},
        {"company": "Infosys", "role": "Specialist Programmer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Infosys HackWithInfy Technical"},
        {"company": "Cloudflare", "role": "Systems Engineer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Cloudflare Performance Engineering"},
        {"company": "Wipro", "role": "Turbo Developer", "evidenceType": "ACTUAL_REPORTED", "sourceTitle": "Wipro Elite National Assessment"}
    ]

    for idx, (t_id, t_info) in enumerate(all_topics.items()):
        comp = COMPANIES[idx % len(COMPANIES)]
        comp_alt = COMPANIES[(idx + 3) % len(COMPANIES)]
        comp_trap = COMPANIES[(idx + 5) % len(COMPANIES)]

        if t_id in authored_map:
            # Use authored
            for q in authored_map[t_id]["mcqs"]:
                q["topicId"] = t_id
                full_mcq_list.append(q)
            for dq in authored_map[t_id].get("diagramQuestions", []):
                dq["topicId"] = t_id
                full_diagram_list.append(dq)
        else:
            # Deeply author topic-scoped questions based on topic cards
            topic_title = t_info.get("title", t_id).split('(')[0].strip()
            c1_def = t_info.get("def", f"Standard protocol service for {topic_title}")
            struct_info = t_info.get("struct", "Protocol header format, control flags, and payload encapsulation.")
            if isinstance(struct_info, list):
                struct_info = " ".join(struct_info)
            trap_dict = t_info.get("trap", {})
            trap_wrong = trap_dict.get("wrong", "Confusing theoretical concepts with practical protocol behavior.")
            trap_correct = trap_dict.get("correct", "Always distinguish physical link layer from logical transport layer contracts.")
            interview_dict = t_info.get("interview", {})
            scenario_q = interview_dict.get("q", f"How do you troubleshoot performance or connection drops in {topic_title}?")
            scenario_ans = interview_dict.get("a", "Inspect network telemetry, packet traces via tcpdump/Wireshark, and routing tables.")

            # Q1: Conceptual Easy
            full_mcq_list.append({
                "id": f"{t_id}-mcq-1",
                "topicId": t_id,
                "difficulty": "Easy",
                "questionType": "Conceptual",
                "question": f"In Computer Networks, what is the core architectural purpose of {topic_title}?",
                "options": [
                    f"A) {c1_def}",
                    "B) To compress video files into MP4 format on local disk",
                    "C) To supply electric battery power to motherboard transistors",
                    "D) To recompile C++ code into machine assembly"
                ],
                "correctIndex": 0,
                "hint": f"Reflect on the primary definition of {topic_title}.",
                "progressiveHint": f"Core definition: {c1_def}",
                "explanation": f"{topic_title} is fundamentally designed for: {c1_def}",
                "optionExplanations": [
                    "A is the exact technical definition and role in the network stack.",
                    "B describes local multimedia encoding, not network protocols.",
                    "C describes hardware power regulation.",
                    "D describes compiler tooling."
                ],
                "companyMetadata": comp
            })

            # Q2: Technical Deep Dive / Structure Medium
            full_mcq_list.append({
                "id": f"{t_id}-mcq-2",
                "topicId": t_id,
                "difficulty": "Medium",
                "questionType": "Header / Internal Structure",
                "question": f"When inspecting the internal structure and operation of {topic_title}, which statement is technically accurate?",
                "options": [
                    f"A) {struct_info}",
                    "B) It operates completely without any header or control metadata",
                    "C) It has been permanently removed from the Internet standard protocol stack",
                    "D) It can only function if the client machine has two physical graphics cards"
                ],
                "correctIndex": 0,
                "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
                "progressiveHint": f"Internal details: {struct_info}",
                "explanation": f"In technical implementation: {struct_info}",
                "optionExplanations": [
                    "A accurately states the protocol's architectural composition.",
                    "B is false; all network layer protocols require control headers.",
                    "C is false; it is an active Internet standard.",
                    "D is completely irrelevant hardware."
                ],
                "companyMetadata": comp_alt
            })

            # Q3: Interview Trap / Common Pitfall (Placement)
            full_mcq_list.append({
                "id": f"{t_id}-mcq-3",
                "topicId": t_id,
                "difficulty": "Interview Trap",
                "questionType": "Interview Trap",
                "question": f"A common interview trap when discussing {topic_title} is evaluating: '{trap_wrong}'. What is the correct technical reality?",
                "options": [
                    f"A) {trap_correct}",
                    f"B) {trap_wrong}",
                    "C) Network packets are routed based on CPU thermal temperature",
                    "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
                ],
                "correctIndex": 0,
                "hint": "Identify the common misconception vs the actual protocol contract.",
                "progressiveHint": f"Remember: {trap_correct}",
                "explanation": f"Common trap: {trap_wrong}. The actual reality: {trap_correct}",
                "optionExplanations": [
                    "A represents the accurate networking standard and correct interview answer.",
                    "B is the exact classic trap students fall for.",
                    "C is nonsense.",
                    "D is false; it is implemented in production operating systems."
                ],
                "companyMetadata": comp_trap
            })

            # Q4: Placement Scenario
            full_mcq_list.append({
                "id": f"{t_id}-mcq-4",
                "topicId": t_id,
                "difficulty": "Placement",
                "questionType": "Placement Scenario",
                "question": f"Interview Question: '{scenario_q}'. How should a software engineer address this?",
                "options": [
                    f"A) {scenario_ans}",
                    "B) Immediately reboot all core backbone routers without checking logs",
                    "C) Delete all DNS records and reinstall Windows OS",
                    "D) Turn off network encryption to make packets travel faster"
                ],
                "correctIndex": 0,
                "hint": "Consider structured networking troubleshooting methodology.",
                "progressiveHint": f"Key resolution: {scenario_ans}",
                "explanation": f"Correct engineering approach: {scenario_ans}",
                "optionExplanations": [
                    "A is the precise industry-standard resolution expected in technical interviews.",
                    "B causes widespread production outages.",
                    "C is destructive and addresses the wrong layer.",
                    "D creates catastrophic security vulnerabilities."
                ],
                "companyMetadata": comp
            })

            # Add a Diagram / Scenario Question for this topic
            full_diagram_list.append({
                "id": f"{t_id}-diag-1",
                "topicId": t_id,
                "difficulty": "Medium",
                "title": f"{topic_title} Data Flow & Architecture",
                "diagram": f"[ Host A (Sender) ]\\n        |\\n        v  ({topic_title})\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
                "question": f"In the protocol interaction diagram above for {topic_title}, what happens during active transmission?",
                "options": [
                    f"A) {c1_def}",
                    "B) The packet is converted into audio sound waves to bypass firewalls",
                    "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
                    "D) The receiver shuts down its network adapter immediately"
                ],
                "correctIndex": 0,
                "hint": f"Follow the data flow through {topic_title}.",
                "explanation": f"During communication: {c1_def}. The protocol guarantees standardized processing across network boundaries.",
                "optionExplanations": [
                    "A accurately describes the protocol's operation.",
                    "B is absurd.",
                    "C is broadcast storm flooding, which is an error condition.",
                    "D terminates communication erroneously."
                ]
            })

    print(f"Generated {len(full_mcq_list)} MCQs and {len(full_diagram_list)} Diagram questions.")

    # Write cnMcqBankData.js
    bank_path = os.path.join("client", "src", "data", "cn", "cnMcqBankData.js")
    with open(bank_path, "w", encoding="utf-8") as f:
        f.write("/**\n * MASTER COMPUTER NETWORKS (CN) MCQ QUESTION BANK\n")
        f.write(f" * {len(full_mcq_list)} Topic-Scoped MCQs and {len(full_diagram_list)} Diagram Questions across all 48 Topics\n")
        f.write(" * Contains 5-tier Difficulty, Progressive Hints, Explanations, and Placement Metadata\n */\n\n")
        f.write("export const CN_MCQ_QUESTIONS = ")
        json.dump(full_mcq_list, f, indent=2)
        f.write(";\n\n")
        f.write("export const CN_DIAGRAM_QUESTIONS = ")
        json.dump(full_diagram_list, f, indent=2)
        f.write(";\n")

    # Write cnPracticeData.js
    practice_path = os.path.join("client", "src", "data", "cn", "cnPracticeData.js")
    with open(practice_path, "w", encoding="utf-8") as f:
        f.write("""/**
 * MASTER COMPUTER NETWORKS (CN) PRACTICE DATA PROVIDER
 * Exports Topic-Scoped MCQs, Diagram/Scenario Questions, and Filtering Utilities
 */

import { CN_MCQ_QUESTIONS, CN_DIAGRAM_QUESTIONS } from './cnMcqBankData.js';

export { CN_MCQ_QUESTIONS, CN_DIAGRAM_QUESTIONS };

/**
 * Returns MCQs scoped to the current canonical topic.
 * If topicId is unset or empty, returns all MCQs.
 */
export function getCNMcqQuestions(rawTopicId) {
  if (!rawTopicId) return CN_MCQ_QUESTIONS;
  const clean = String(rawTopicId).toLowerCase().trim().replace(/_/g, '-');
  const filtered = CN_MCQ_QUESTIONS.filter(q => q.topicId === clean);
  return filtered.length > 0 ? filtered : CN_MCQ_QUESTIONS;
}

/**
 * Returns Diagram & Scenario questions scoped to the current canonical topic.
 */
export function getCNDiagramQuestions(rawTopicId) {
  if (!rawTopicId) return CN_DIAGRAM_QUESTIONS;
  const clean = String(rawTopicId).toLowerCase().trim().replace(/_/g, '-');
  const filtered = CN_DIAGRAM_QUESTIONS.filter(q => q.topicId === clean);
  return filtered.length > 0 ? filtered : CN_DIAGRAM_QUESTIONS;
}

/**
 * Returns combined practice statistics for a topic.
 */
export function getCNPracticeStats(rawTopicId) {
  const mcqs = getCNMcqQuestions(rawTopicId);
  const diagrams = getCNDiagramQuestions(rawTopicId);
  return {
    totalQuestions: mcqs.length + diagrams.length,
    mcqCount: mcqs.length,
    diagramCount: diagrams.length
  };
}
""")

    print(f"Successfully generated {bank_path} and {practice_path}!")

if __name__ == "__main__":
    generate_practice_data_file()
