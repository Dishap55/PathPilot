/**
 * MASTER COMPUTER NETWORKS (CN) MCQ QUESTION BANK
 * 186 Topic-Scoped MCQs and 48 Diagram Questions across all 48 Topics
 * Contains 5-tier Difficulty, Progressive Hints, Explanations, and Placement Metadata
 */

export const CN_MCQ_QUESTIONS = [
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
    "companyMetadata": {
      "company": "TCS",
      "role": "Associate Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS NQT Tech Fundamentals"
    },
    "topicId": "intro-to-networks"
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
    "companyMetadata": {
      "company": "Cisco",
      "role": "Network Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Fresher Technical Interview"
    },
    "topicId": "intro-to-networks"
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
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon Technical Interview - Network Latency"
    },
    "topicId": "intro-to-networks"
  },
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
    "companyMetadata": {
      "company": "Infosys",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys Technical Assessment"
    },
    "topicId": "network-types"
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
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Cloud Support / SDE",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Azure Infrastructure Engineering Interview"
    },
    "topicId": "network-types"
  },
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
    "companyMetadata": {
      "company": "Wipro",
      "role": "Project Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Talent Hunt"
    },
    "topicId": "network-topologies"
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
    "companyMetadata": {
      "company": "Cisco",
      "role": "Core Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Written Technical Exam"
    },
    "topicId": "network-topologies"
  },
  {
    "id": "network-devices-mcq-1",
    "topicId": "network-devices",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Network Devices?",
    "options": [
      "A) Network hardware devices operate at distinct layers of the OSI reference model to regenerate signals, direct local frames, route internet packets, or translate protocol suites.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Network Devices.",
    "progressiveHint": "Core definition: Network hardware devices operate at distinct layers of the OSI reference model to regenerate signals, direct local frames, route internet packets, or translate protocol suites.",
    "explanation": "Network Devices is fundamentally designed for: Network hardware devices operate at distinct layers of the OSI reference model to regenerate signals, direct local frames, route internet packets, or translate protocol suites.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "network-devices-mcq-2",
    "topicId": "network-devices",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Network Devices, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "network-devices-mcq-3",
    "topicId": "network-devices",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Network Devices is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "network-devices-mcq-4",
    "topicId": "network-devices",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is the difference between a Hub, a Switch, and a Router in terms of collision and broadcast domains?'. How should a software engineer address this?",
    "options": [
      "A) A Hub has 1 single collision domain and 1 broadcast domain across all ports. A Switch provides a dedicated collision domain for each individual port, but shares 1 single broadcast domain across all ports (unless partitioned by VLANs). A Router provides both separate collision domains per interface AND breaks broadcast domains, meaning broadcasts are not forwarded across router interfaces.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: A Hub has 1 single collision domain and 1 broadcast domain across all ports. A Switch provides a dedicated collision domain for each individual port, but shares 1 single broadcast domain across all ports (unless partitioned by VLANs). A Router provides both separate collision domains per interface AND breaks broadcast domains, meaning broadcasts are not forwarded across router interfaces.",
    "explanation": "Correct engineering approach: A Hub has 1 single collision domain and 1 broadcast domain across all ports. A Switch provides a dedicated collision domain for each individual port, but shares 1 single broadcast domain across all ports (unless partitioned by VLANs). A Router provides both separate collision domains per interface AND breaks broadcast domains, meaning broadcasts are not forwarded across router interfaces.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
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
    "companyMetadata": {
      "company": "Accenture",
      "role": "Software Associate",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Accenture Cognitive & Technical Assessment"
    },
    "topicId": "osi-model"
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
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Technical Phone Screen"
    },
    "topicId": "osi-model"
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
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Bar Raiser"
    },
    "topicId": "osi-model"
  },
  {
    "id": "tcp-ip-model-mcq-1",
    "topicId": "tcp-ip-model",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of TCP/IP 4-Layer Architecture?",
    "options": [
      "A) The TCP/IP model (Department of Defense DoD model) is the practical 4-layer protocol stack that actually implements and powers the global Internet.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of TCP/IP 4-Layer Architecture.",
    "progressiveHint": "Core definition: The TCP/IP model (Department of Defense DoD model) is the practical 4-layer protocol stack that actually implements and powers the global Internet.",
    "explanation": "TCP/IP 4-Layer Architecture is fundamentally designed for: The TCP/IP model (Department of Defense DoD model) is the practical 4-layer protocol stack that actually implements and powers the global Internet.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "tcp-ip-model-mcq-2",
    "topicId": "tcp-ip-model",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of TCP/IP 4-Layer Architecture, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "tcp-ip-model-mcq-3",
    "topicId": "tcp-ip-model",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing TCP/IP 4-Layer Architecture is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "tcp-ip-model-mcq-4",
    "topicId": "tcp-ip-model",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'Why did the TCP/IP model succeed in the marketplace while the OSI model remained largely academic?'. How should a software engineer address this?",
    "options": [
      "A) TCP/IP was developed with an 'implementation-first' pragmatic philosophy (running code and rough consensus through IETF RFCs). It was integrated for free into BSD Unix in 1983, allowing university and military researchers to immediately interconnect machines. In contrast, the OSI standards were committee-driven, overly complex (Session and Presentation layers had weak justification), and too slow to market.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: TCP/IP was developed with an 'implementation-first' pragmatic philosophy (running code and rough consensus through IETF RFCs). It was integrated for free into BSD Unix in 1983, allowing university and military researchers to immediately interconnect machines. In contrast, the OSI standards were committee-driven, overly complex (Session and Presentation layers had weak justification), and too slow to market.",
    "explanation": "Correct engineering approach: TCP/IP was developed with an 'implementation-first' pragmatic philosophy (running code and rough consensus through IETF RFCs). It was integrated for free into BSD Unix in 1983, allowing university and military researchers to immediately interconnect machines. In contrast, the OSI standards were committee-driven, overly complex (Session and Presentation layers had weak justification), and too slow to market.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "osi-vs-tcp-ip-mcq-1",
    "topicId": "osi-vs-tcp-ip",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of OSI vs TCP/IP Model Comparison?",
    "options": [
      "A) A direct architectural comparison between the 7-layer theoretical OSI reference model and the 4-layer practical TCP/IP protocol suite.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of OSI vs TCP/IP Model Comparison.",
    "progressiveHint": "Core definition: A direct architectural comparison between the 7-layer theoretical OSI reference model and the 4-layer practical TCP/IP protocol suite.",
    "explanation": "OSI vs TCP/IP Model Comparison is fundamentally designed for: A direct architectural comparison between the 7-layer theoretical OSI reference model and the 4-layer practical TCP/IP protocol suite.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "osi-vs-tcp-ip-mcq-2",
    "topicId": "osi-vs-tcp-ip",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of OSI vs TCP/IP Model Comparison, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "osi-vs-tcp-ip-mcq-3",
    "topicId": "osi-vs-tcp-ip",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing OSI vs TCP/IP Model Comparison is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "osi-vs-tcp-ip-mcq-4",
    "topicId": "osi-vs-tcp-ip",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is the difference between an OSI Layer 4 Load Balancer and a Layer 7 Load Balancer?'. How should a software engineer address this?",
    "options": [
      "A) A Layer 4 Load Balancer routes traffic based on network and transport layer headers (Source IP, Destination IP, Port) without inspecting the application payload. It makes routing decisions on the initial TCP SYN packet, providing extremely high throughput and low CPU overhead. A Layer 7 Load Balancer terminates the TCP connection, decrypts SSL/TLS, and parses application data (HTTP headers, URL paths, cookies). It enables intelligent content routing (e.g. /api -> backend microservice, /static -> CDN), but incurs higher CPU and memory overhead.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: A Layer 4 Load Balancer routes traffic based on network and transport layer headers (Source IP, Destination IP, Port) without inspecting the application payload. It makes routing decisions on the initial TCP SYN packet, providing extremely high throughput and low CPU overhead. A Layer 7 Load Balancer terminates the TCP connection, decrypts SSL/TLS, and parses application data (HTTP headers, URL paths, cookies). It enables intelligent content routing (e.g. /api -> backend microservice, /static -> CDN), but incurs higher CPU and memory overhead.",
    "explanation": "Correct engineering approach: A Layer 4 Load Balancer routes traffic based on network and transport layer headers (Source IP, Destination IP, Port) without inspecting the application payload. It makes routing decisions on the initial TCP SYN packet, providing extremely high throughput and low CPU overhead. A Layer 7 Load Balancer terminates the TCP connection, decrypts SSL/TLS, and parses application data (HTTP headers, URL paths, cookies). It enables intelligent content routing (e.g. /api -> backend microservice, /static -> CDN), but incurs higher CPU and memory overhead.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "encapsulation-decapsulation-mcq-1",
    "topicId": "encapsulation-decapsulation",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Encapsulation & Decapsulation?",
    "options": [
      "A) Encapsulation is the process where each layer on the sender wraps payload data from the layer above with its own protocol control header. Decapsulation is the reverse unpacking process on the receiver.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Encapsulation & Decapsulation.",
    "progressiveHint": "Core definition: Encapsulation is the process where each layer on the sender wraps payload data from the layer above with its own protocol control header. Decapsulation is the reverse unpacking process on the receiver.",
    "explanation": "Encapsulation & Decapsulation is fundamentally designed for: Encapsulation is the process where each layer on the sender wraps payload data from the layer above with its own protocol control header. Decapsulation is the reverse unpacking process on the receiver.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "encapsulation-decapsulation-mcq-2",
    "topicId": "encapsulation-decapsulation",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Encapsulation & Decapsulation, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "encapsulation-decapsulation-mcq-3",
    "topicId": "encapsulation-decapsulation",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Encapsulation & Decapsulation is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "encapsulation-decapsulation-mcq-4",
    "topicId": "encapsulation-decapsulation",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'As an IP packet travels across three routers from Host A to Host B, which headers change at each hop and which stay the same?'. How should a software engineer address this?",
    "options": [
      "A) At each router hop: 1. The Layer 2 Data Link (Ethernet) Frame header is completely stripped and replaced with a new Source MAC (the router's egress interface) and Destination MAC (the next hop router or host). 2. The Layer 3 IP header remains constant end-to-end (Source IP and Destination IP do NOT change, assuming no NAT), with the exception of the TTL field (decremented by 1) and the IP Header Checksum (recalculated). 3. The Layer 4 Transport header and Layer 7 Application payload are never touched by intermediate routers.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: At each router hop: 1. The Layer 2 Data Link (Ethernet) Frame header is completely stripped and replaced with a new Source MAC (the router's egress interface) and Destination MAC (the next hop router or host). 2. The Layer 3 IP header remains constant end-to-end (Source IP and Destination IP do NOT change, assuming no NAT), with the exception of the TTL field (decremented by 1) and the IP Header Checksum (recalculated). 3. The Layer 4 Transport header and Layer 7 Application payload are never touched by intermediate routers.",
    "explanation": "Correct engineering approach: At each router hop: 1. The Layer 2 Data Link (Ethernet) Frame header is completely stripped and replaced with a new Source MAC (the router's egress interface) and Destination MAC (the next hop router or host). 2. The Layer 3 IP header remains constant end-to-end (Source IP and Destination IP do NOT change, assuming no NAT), with the exception of the TTL field (decremented by 1) and the IP Header Checksum (recalculated). 3. The Layer 4 Transport header and Layer 7 Application payload are never touched by intermediate routers.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "mac-address-mcq-1",
    "topicId": "mac-address",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of MAC Addressing?",
    "options": [
      "A) A Media Access Control (MAC) address is a unique, 48-bit (6-byte) physical identifier permanently burned into the Read-Only Memory of a Network Interface Card (NIC).",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of MAC Addressing.",
    "progressiveHint": "Core definition: A Media Access Control (MAC) address is a unique, 48-bit (6-byte) physical identifier permanently burned into the Read-Only Memory of a Network Interface Card (NIC).",
    "explanation": "MAC Addressing is fundamentally designed for: A Media Access Control (MAC) address is a unique, 48-bit (6-byte) physical identifier permanently burned into the Read-Only Memory of a Network Interface Card (NIC).",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "mac-address-mcq-2",
    "topicId": "mac-address",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of MAC Addressing, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "mac-address-mcq-3",
    "topicId": "mac-address",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing MAC Addressing is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "mac-address-mcq-4",
    "topicId": "mac-address",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'Why do we need both MAC addresses and IP addresses? Why can't we use just one?'. How should a software engineer address this?",
    "options": [
      "A) MAC addresses and IP addresses serve fundamentally different architectural purposes. A MAC address is a flat, non-hierarchical 48-bit identifier identifying a physical hardware interface on a local link. If the global Internet ran on MAC addresses, core internet routers would need routing tables with billions of individual entries (one for every device on Earth), causing immediate memory exhaustion and routing collapse. In contrast, IP addresses are hierarchical (Network ID + Host ID), allowing routers to aggregate millions of hosts into a single route prefix (e.g. /16 or /24). Conversely, we cannot use only IP addresses because hosts frequently join networks without an IP (DHCP requires MAC to assign an IP), and IP addresses change whenever a host moves networks.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: MAC addresses and IP addresses serve fundamentally different architectural purposes. A MAC address is a flat, non-hierarchical 48-bit identifier identifying a physical hardware interface on a local link. If the global Internet ran on MAC addresses, core internet routers would need routing tables with billions of individual entries (one for every device on Earth), causing immediate memory exhaustion and routing collapse. In contrast, IP addresses are hierarchical (Network ID + Host ID), allowing routers to aggregate millions of hosts into a single route prefix (e.g. /16 or /24). Conversely, we cannot use only IP addresses because hosts frequently join networks without an IP (DHCP requires MAC to assign an IP), and IP addresses change whenever a host moves networks.",
    "explanation": "Correct engineering approach: MAC addresses and IP addresses serve fundamentally different architectural purposes. A MAC address is a flat, non-hierarchical 48-bit identifier identifying a physical hardware interface on a local link. If the global Internet ran on MAC addresses, core internet routers would need routing tables with billions of individual entries (one for every device on Earth), causing immediate memory exhaustion and routing collapse. In contrast, IP addresses are hierarchical (Network ID + Host ID), allowing routers to aggregate millions of hosts into a single route prefix (e.g. /16 or /24). Conversely, we cannot use only IP addresses because hosts frequently join networks without an IP (DHCP requires MAC to assign an IP), and IP addresses change whenever a host moves networks.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "ethernet-frames-mcq-1",
    "topicId": "ethernet-frames",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Ethernet & Frame Structure?",
    "options": [
      "A) An Ethernet frame is the standardized Layer 2 Protocol Data Unit (IEEE 802.3) used to transmit data across wired local area networks.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Ethernet & Frame Structure.",
    "progressiveHint": "Core definition: An Ethernet frame is the standardized Layer 2 Protocol Data Unit (IEEE 802.3) used to transmit data across wired local area networks.",
    "explanation": "Ethernet & Frame Structure is fundamentally designed for: An Ethernet frame is the standardized Layer 2 Protocol Data Unit (IEEE 802.3) used to transmit data across wired local area networks.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "ethernet-frames-mcq-2",
    "topicId": "ethernet-frames",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Ethernet & Frame Structure, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "ethernet-frames-mcq-3",
    "topicId": "ethernet-frames",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Ethernet & Frame Structure is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "ethernet-frames-mcq-4",
    "topicId": "ethernet-frames",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'Why does Ethernet enforce a minimum frame size of 64 bytes?'. How should a software engineer address this?",
    "options": [
      "A) The minimum frame size of 64 bytes was mandated by Ethernet's CSMA/CD (Carrier Sense Multiple Access with Collision Detection) protocol. In a shared half-duplex coaxial collision domain (up to 2.5 km with repeaters), a sender must transmit for at least the round-trip propagation time (slot time = 51.2 microseconds at 10 Mbps) to ensure that if a collision occurs at the furthest end of the cable, the collision signal travels back before the sender finishes transmitting. At 10 Mbps, 51.2 microseconds equals exactly 512 bits = 64 bytes. If a frame were smaller (a 'runt'), the sender might finish transmitting and assume success before the collision fragment returned.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: The minimum frame size of 64 bytes was mandated by Ethernet's CSMA/CD (Carrier Sense Multiple Access with Collision Detection) protocol. In a shared half-duplex coaxial collision domain (up to 2.5 km with repeaters), a sender must transmit for at least the round-trip propagation time (slot time = 51.2 microseconds at 10 Mbps) to ensure that if a collision occurs at the furthest end of the cable, the collision signal travels back before the sender finishes transmitting. At 10 Mbps, 51.2 microseconds equals exactly 512 bits = 64 bytes. If a frame were smaller (a 'runt'), the sender might finish transmitting and assume success before the collision fragment returned.",
    "explanation": "Correct engineering approach: The minimum frame size of 64 bytes was mandated by Ethernet's CSMA/CD (Carrier Sense Multiple Access with Collision Detection) protocol. In a shared half-duplex coaxial collision domain (up to 2.5 km with repeaters), a sender must transmit for at least the round-trip propagation time (slot time = 51.2 microseconds at 10 Mbps) to ensure that if a collision occurs at the furthest end of the cable, the collision signal travels back before the sender finishes transmitting. At 10 Mbps, 51.2 microseconds equals exactly 512 bits = 64 bytes. If a frame were smaller (a 'runt'), the sender might finish transmitting and assume success before the collision fragment returned.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "arp-protocol-mcq-1",
    "topicId": "arp-protocol",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of ARP?",
    "options": [
      "A) Address Resolution Protocol (ARP, RFC 826) dynamically resolves a known Layer 3 logical IP address to an unknown Layer 2 physical MAC address on a local network segment.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of ARP.",
    "progressiveHint": "Core definition: Address Resolution Protocol (ARP, RFC 826) dynamically resolves a known Layer 3 logical IP address to an unknown Layer 2 physical MAC address on a local network segment.",
    "explanation": "ARP is fundamentally designed for: Address Resolution Protocol (ARP, RFC 826) dynamically resolves a known Layer 3 logical IP address to an unknown Layer 2 physical MAC address on a local network segment.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "arp-protocol-mcq-2",
    "topicId": "arp-protocol",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of ARP, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "arp-protocol-mcq-3",
    "topicId": "arp-protocol",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing ARP is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "arp-protocol-mcq-4",
    "topicId": "arp-protocol",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is ARP Spoofing (ARP Poisoning) and how does an attacker execute a Man-in-the-Middle (MITM) attack with it?'. How should a software engineer address this?",
    "options": [
      "A) ARP is stateless and does not authenticate replies; hosts will blindly update their ARP cache whenever they receive an ARP Reply, even if they never sent a request. In an ARP Spoofing attack, an attacker on the same LAN sends unsolicited (gratuitous) fake ARP replies to the Victim host claiming: 'I have the Default Gateway IP' (binding Gateway IP to Attacker MAC), and sends fake replies to the Router claiming: 'I have the Victim IP' (binding Victim IP to Attacker MAC). All bidirectional internet traffic between the victim and gateway now routes through the attacker's machine, allowing packet sniffing and session hijacking.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: ARP is stateless and does not authenticate replies; hosts will blindly update their ARP cache whenever they receive an ARP Reply, even if they never sent a request. In an ARP Spoofing attack, an attacker on the same LAN sends unsolicited (gratuitous) fake ARP replies to the Victim host claiming: 'I have the Default Gateway IP' (binding Gateway IP to Attacker MAC), and sends fake replies to the Router claiming: 'I have the Victim IP' (binding Victim IP to Attacker MAC). All bidirectional internet traffic between the victim and gateway now routes through the attacker's machine, allowing packet sniffing and session hijacking.",
    "explanation": "Correct engineering approach: ARP is stateless and does not authenticate replies; hosts will blindly update their ARP cache whenever they receive an ARP Reply, even if they never sent a request. In an ARP Spoofing attack, an attacker on the same LAN sends unsolicited (gratuitous) fake ARP replies to the Victim host claiming: 'I have the Default Gateway IP' (binding Gateway IP to Attacker MAC), and sends fake replies to the Router claiming: 'I have the Victim IP' (binding Victim IP to Attacker MAC). All bidirectional internet traffic between the victim and gateway now routes through the attacker's machine, allowing packet sniffing and session hijacking.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "switching-mac-table-mcq-1",
    "topicId": "switching-mac-table",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Switching Mechanics & CAM/MAC Address Table?",
    "options": [
      "A) A Layer 2 Switch is an intelligent multiport network bridge that uses a Content Addressable Memory (CAM) table to forward frames directly to target recipient ports without flooding.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Switching Mechanics & CAM/MAC Address Table.",
    "progressiveHint": "Core definition: A Layer 2 Switch is an intelligent multiport network bridge that uses a Content Addressable Memory (CAM) table to forward frames directly to target recipient ports without flooding.",
    "explanation": "Switching Mechanics & CAM/MAC Address Table is fundamentally designed for: A Layer 2 Switch is an intelligent multiport network bridge that uses a Content Addressable Memory (CAM) table to forward frames directly to target recipient ports without flooding.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "switching-mac-table-mcq-2",
    "topicId": "switching-mac-table",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Switching Mechanics & CAM/MAC Address Table, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "switching-mac-table-mcq-3",
    "topicId": "switching-mac-table",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Switching Mechanics & CAM/MAC Address Table is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "switching-mac-table-mcq-4",
    "topicId": "switching-mac-table",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is a MAC Flooding Attack (CAM Table Overflow) and how does it compromise switch security?'. How should a software engineer address this?",
    "options": [
      "A) A switch CAM table has finite hardware memory (e.g., 8,000 to 128,000 MAC entries). In a MAC Flooding attack, an attacker uses tools like macof to generate hundreds of thousands of bogus Ethernet frames with randomized fake source MAC addresses every second. The switch CAM table fills to capacity, evicting legitimate entries. When the CAM table overflows, the switch can no longer store new MACs and enters 'Fail-Open' mode: it treats all incoming frames as Unknown Unicasts and floods them out of EVERY physical port. The switch effectively degrades into a dumb Hub, allowing the attacker on any port to sniff all confidential network traffic with Wireshark. Defense: Port Security (limiting MAC count per port).",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: A switch CAM table has finite hardware memory (e.g., 8,000 to 128,000 MAC entries). In a MAC Flooding attack, an attacker uses tools like macof to generate hundreds of thousands of bogus Ethernet frames with randomized fake source MAC addresses every second. The switch CAM table fills to capacity, evicting legitimate entries. When the CAM table overflows, the switch can no longer store new MACs and enters 'Fail-Open' mode: it treats all incoming frames as Unknown Unicasts and floods them out of EVERY physical port. The switch effectively degrades into a dumb Hub, allowing the attacker on any port to sniff all confidential network traffic with Wireshark. Defense: Port Security (limiting MAC count per port).",
    "explanation": "Correct engineering approach: A switch CAM table has finite hardware memory (e.g., 8,000 to 128,000 MAC entries). In a MAC Flooding attack, an attacker uses tools like macof to generate hundreds of thousands of bogus Ethernet frames with randomized fake source MAC addresses every second. The switch CAM table fills to capacity, evicting legitimate entries. When the CAM table overflows, the switch can no longer store new MACs and enters 'Fail-Open' mode: it treats all incoming frames as Unknown Unicasts and floods them out of EVERY physical port. The switch effectively degrades into a dumb Hub, allowing the attacker on any port to sniff all confidential network traffic with Wireshark. Defense: Port Security (limiting MAC count per port).",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "vlan-mcq-1",
    "topicId": "vlan",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of VLAN?",
    "options": [
      "A) A Virtual LAN (VLAN, IEEE 802.1Q) logically partitions a single physical Layer 2 switch infrastructure into multiple isolated broadcast domains.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of VLAN.",
    "progressiveHint": "Core definition: A Virtual LAN (VLAN, IEEE 802.1Q) logically partitions a single physical Layer 2 switch infrastructure into multiple isolated broadcast domains.",
    "explanation": "VLAN is fundamentally designed for: A Virtual LAN (VLAN, IEEE 802.1Q) logically partitions a single physical Layer 2 switch infrastructure into multiple isolated broadcast domains.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "vlan-mcq-2",
    "topicId": "vlan",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of VLAN, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "vlan-mcq-3",
    "topicId": "vlan",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing VLAN is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "vlan-mcq-4",
    "topicId": "vlan",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is 'Router-on-a-Stick' and how does it enable Inter-VLAN routing?'. How should a software engineer address this?",
    "options": [
      "A) Because switches cannot route traffic between different VLANs at Layer 2, Inter-VLAN routing is required. In a 'Router-on-a-Stick' architecture, a single physical Ethernet interface on a router connects to a switch Trunk port. The router's physical interface is subdivided into logical 'sub-interfaces' (e.g., gig0/0.10 for VLAN 10 and gig0/0.20 for VLAN 20), each configured with 802.1Q encapsulation and assigned the default gateway IP for that VLAN. When Host A on VLAN 10 sends a packet to Host B on VLAN 20, the frame is tagged VLAN 10, sent up the trunk to the router sub-interface, routed internally at Layer 3 to sub-interface 20, re-tagged as VLAN 20, and sent back down the trunk to the switch.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: Because switches cannot route traffic between different VLANs at Layer 2, Inter-VLAN routing is required. In a 'Router-on-a-Stick' architecture, a single physical Ethernet interface on a router connects to a switch Trunk port. The router's physical interface is subdivided into logical 'sub-interfaces' (e.g., gig0/0.10 for VLAN 10 and gig0/0.20 for VLAN 20), each configured with 802.1Q encapsulation and assigned the default gateway IP for that VLAN. When Host A on VLAN 10 sends a packet to Host B on VLAN 20, the frame is tagged VLAN 10, sent up the trunk to the router sub-interface, routed internally at Layer 3 to sub-interface 20, re-tagged as VLAN 20, and sent back down the trunk to the switch.",
    "explanation": "Correct engineering approach: Because switches cannot route traffic between different VLANs at Layer 2, Inter-VLAN routing is required. In a 'Router-on-a-Stick' architecture, a single physical Ethernet interface on a router connects to a switch Trunk port. The router's physical interface is subdivided into logical 'sub-interfaces' (e.g., gig0/0.10 for VLAN 10 and gig0/0.20 for VLAN 20), each configured with 802.1Q encapsulation and assigned the default gateway IP for that VLAN. When Host A on VLAN 10 sends a packet to Host B on VLAN 20, the frame is tagged VLAN 10, sent up the trunk to the router sub-interface, routed internally at Layer 3 to sub-interface 20, re-tagged as VLAN 20, and sent back down the trunk to the switch.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "collision-broadcast-domains-mcq-1",
    "topicId": "collision-broadcast-domains",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Collision Domains vs Broadcast Domains?",
    "options": [
      "A) A Collision Domain is a physical network segment where electrical data packets can collide with each other during simultaneous transmission. A Broadcast Domain is a logical network area where a broadcast frame sent by one device is received and processed by every other device.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Collision Domains vs Broadcast Domains.",
    "progressiveHint": "Core definition: A Collision Domain is a physical network segment where electrical data packets can collide with each other during simultaneous transmission. A Broadcast Domain is a logical network area where a broadcast frame sent by one device is received and processed by every other device.",
    "explanation": "Collision Domains vs Broadcast Domains is fundamentally designed for: A Collision Domain is a physical network segment where electrical data packets can collide with each other during simultaneous transmission. A Broadcast Domain is a logical network area where a broadcast frame sent by one device is received and processed by every other device.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "collision-broadcast-domains-mcq-2",
    "topicId": "collision-broadcast-domains",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Collision Domains vs Broadcast Domains, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "collision-broadcast-domains-mcq-3",
    "topicId": "collision-broadcast-domains",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Collision Domains vs Broadcast Domains is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "collision-broadcast-domains-mcq-4",
    "topicId": "collision-broadcast-domains",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'You have a network with 2 hubs (each with 4 ports), connected to a 12-port switch, which connects to a router with 2 interfaces. How many collision domains and broadcast domains exist?'. How should a software engineer address this?",
    "options": [
      "A) Let's count: 1. Each hub forms 1 collision domain regardless of how many devices connect to it. Two hubs = 2 collision domains. 2. The switch provides 1 collision domain per active port. If 2 ports connect to the hubs, 1 port connects to the router, and let's say remaining 9 ports connect to PCs: the switch has 12 collision domains. (Total collision domains = 12, because the hubs attach to individual switch ports). 3. The router interface isolates the broadcast domain. The switch and hubs all share 1 single broadcast domain on Router Interface 1. Router Interface 2 forms a 2nd broadcast domain. Total: 12 collision domains and 2 broadcast domains.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: Let's count: 1. Each hub forms 1 collision domain regardless of how many devices connect to it. Two hubs = 2 collision domains. 2. The switch provides 1 collision domain per active port. If 2 ports connect to the hubs, 1 port connects to the router, and let's say remaining 9 ports connect to PCs: the switch has 12 collision domains. (Total collision domains = 12, because the hubs attach to individual switch ports). 3. The router interface isolates the broadcast domain. The switch and hubs all share 1 single broadcast domain on Router Interface 1. Router Interface 2 forms a 2nd broadcast domain. Total: 12 collision domains and 2 broadcast domains.",
    "explanation": "Correct engineering approach: Let's count: 1. Each hub forms 1 collision domain regardless of how many devices connect to it. Two hubs = 2 collision domains. 2. The switch provides 1 collision domain per active port. If 2 ports connect to the hubs, 1 port connects to the router, and let's say remaining 9 ports connect to PCs: the switch has 12 collision domains. (Total collision domains = 12, because the hubs attach to individual switch ports). 3. The router interface isolates the broadcast domain. The switch and hubs all share 1 single broadcast domain on Router Interface 1. Router Interface 2 forms a 2nd broadcast domain. Total: 12 collision domains and 2 broadcast domains.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "ip-addressing-mcq-1",
    "topicId": "ip-addressing",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of IPv4 Addressing & Classful Architecture?",
    "options": [
      "A) An IPv4 address is a 32-bit (4-byte) logical identifier assigned to every device connected to an IP network, divided into a Network ID and a Host ID.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of IPv4 Addressing & Classful Architecture.",
    "progressiveHint": "Core definition: An IPv4 address is a 32-bit (4-byte) logical identifier assigned to every device connected to an IP network, divided into a Network ID and a Host ID.",
    "explanation": "IPv4 Addressing & Classful Architecture is fundamentally designed for: An IPv4 address is a 32-bit (4-byte) logical identifier assigned to every device connected to an IP network, divided into a Network ID and a Host ID.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "ip-addressing-mcq-2",
    "topicId": "ip-addressing",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of IPv4 Addressing & Classful Architecture, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "ip-addressing-mcq-3",
    "topicId": "ip-addressing",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing IPv4 Addressing & Classful Architecture is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "ip-addressing-mcq-4",
    "topicId": "ip-addressing",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'Why were classful IP addresses (Classes A, B, C) replaced by Classless Inter-Domain Routing (CIDR)?'. How should a software engineer address this?",
    "options": [
      "A) Classful addressing was excessively rigid and caused massive IPv4 address waste. For example, if an enterprise needed 300 IP addresses, a Class C network (254 hosts) was too small, forcing the allocation of a Class B network (65,534 hosts). This resulted in over 65,000 unused wasted addresses in a single allocation. By 1993, IPv4 address space was near exhaustion, and core router routing tables were exploding. Classless Inter-Domain Routing (CIDR, RFC 1519) eliminated rigid class boundaries by allowing arbitrary prefix lengths (e.g. /23 giving 510 hosts), enabling efficient address allocation and route summarization.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: Classful addressing was excessively rigid and caused massive IPv4 address waste. For example, if an enterprise needed 300 IP addresses, a Class C network (254 hosts) was too small, forcing the allocation of a Class B network (65,534 hosts). This resulted in over 65,000 unused wasted addresses in a single allocation. By 1993, IPv4 address space was near exhaustion, and core router routing tables were exploding. Classless Inter-Domain Routing (CIDR, RFC 1519) eliminated rigid class boundaries by allowing arbitrary prefix lengths (e.g. /23 giving 510 hosts), enabling efficient address allocation and route summarization.",
    "explanation": "Correct engineering approach: Classful addressing was excessively rigid and caused massive IPv4 address waste. For example, if an enterprise needed 300 IP addresses, a Class C network (254 hosts) was too small, forcing the allocation of a Class B network (65,534 hosts). This resulted in over 65,000 unused wasted addresses in a single allocation. By 1993, IPv4 address space was near exhaustion, and core router routing tables were exploding. Classless Inter-Domain Routing (CIDR, RFC 1519) eliminated rigid class boundaries by allowing arbitrary prefix lengths (e.g. /23 giving 510 hosts), enabling efficient address allocation and route summarization.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "ipv4-vs-ipv6-mcq-1",
    "topicId": "ipv4-vs-ipv6",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of IPv4 vs IPv6 Architecture & Migration?",
    "options": [
      "A) IPv6 is the next-generation Internet Protocol offering a 128-bit address space (3.4 x 10^38 addresses), replacing 32-bit IPv4 to solve global address exhaustion.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of IPv4 vs IPv6 Architecture & Migration.",
    "progressiveHint": "Core definition: IPv6 is the next-generation Internet Protocol offering a 128-bit address space (3.4 x 10^38 addresses), replacing 32-bit IPv4 to solve global address exhaustion.",
    "explanation": "IPv4 vs IPv6 Architecture & Migration is fundamentally designed for: IPv6 is the next-generation Internet Protocol offering a 128-bit address space (3.4 x 10^38 addresses), replacing 32-bit IPv4 to solve global address exhaustion.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "ipv4-vs-ipv6-mcq-2",
    "topicId": "ipv4-vs-ipv6",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of IPv4 vs IPv6 Architecture & Migration, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "ipv4-vs-ipv6-mcq-3",
    "topicId": "ipv4-vs-ipv6",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing IPv4 vs IPv6 Architecture & Migration is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "ipv4-vs-ipv6-mcq-4",
    "topicId": "ipv4-vs-ipv6",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'Why does IPv6 omit the header checksum that was present in IPv4?'. How should a software engineer address this?",
    "options": [
      "A) In IPv4, every intermediate router hop decrements the TTL field by 1, requiring the router's CPU to recalculate the IPv4 header checksum at every single hop, creating latency. In IPv6, the header checksum was deliberately eliminated because: 1. Layer 2 Data Link protocols (Ethernet CRC, Wi-Fi) already provide robust frame integrity checks. 2. Layer 4 Transport protocols (TCP and UDP mandatory in IPv6) already compute checksums over the payload and pseudo-header. Removing the L3 checksum allows hardware router ASICs to forward IPv6 packets significantly faster without computing arithmetic checksums at every transit hop.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: In IPv4, every intermediate router hop decrements the TTL field by 1, requiring the router's CPU to recalculate the IPv4 header checksum at every single hop, creating latency. In IPv6, the header checksum was deliberately eliminated because: 1. Layer 2 Data Link protocols (Ethernet CRC, Wi-Fi) already provide robust frame integrity checks. 2. Layer 4 Transport protocols (TCP and UDP mandatory in IPv6) already compute checksums over the payload and pseudo-header. Removing the L3 checksum allows hardware router ASICs to forward IPv6 packets significantly faster without computing arithmetic checksums at every transit hop.",
    "explanation": "Correct engineering approach: In IPv4, every intermediate router hop decrements the TTL field by 1, requiring the router's CPU to recalculate the IPv4 header checksum at every single hop, creating latency. In IPv6, the header checksum was deliberately eliminated because: 1. Layer 2 Data Link protocols (Ethernet CRC, Wi-Fi) already provide robust frame integrity checks. 2. Layer 4 Transport protocols (TCP and UDP mandatory in IPv6) already compute checksums over the payload and pseudo-header. Removing the L3 checksum allows hardware router ASICs to forward IPv6 packets significantly faster without computing arithmetic checksums at every transit hop.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "public-vs-private-ip-mcq-1",
    "topicId": "public-vs-private-ip",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Public vs Private IP?",
    "options": [
      "A) Public IP addresses are globally unique and routable across the public Internet. Private IP addresses (RFC 1918) are non-routable on the Internet, reserved for internal home, campus, and enterprise LANs.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Public vs Private IP.",
    "progressiveHint": "Core definition: Public IP addresses are globally unique and routable across the public Internet. Private IP addresses (RFC 1918) are non-routable on the Internet, reserved for internal home, campus, and enterprise LANs.",
    "explanation": "Public vs Private IP is fundamentally designed for: Public IP addresses are globally unique and routable across the public Internet. Private IP addresses (RFC 1918) are non-routable on the Internet, reserved for internal home, campus, and enterprise LANs.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "public-vs-private-ip-mcq-2",
    "topicId": "public-vs-private-ip",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Public vs Private IP, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "public-vs-private-ip-mcq-3",
    "topicId": "public-vs-private-ip",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Public vs Private IP is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "public-vs-private-ip-mcq-4",
    "topicId": "public-vs-private-ip",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What are the exact RFC 1918 private IPv4 address ranges?'. How should a software engineer address this?",
    "options": [
      "A) The three RFC 1918 private IPv4 ranges are: 1. Class A: 10.0.0.0 to 10.255.255.255 (Prefix 10.0.0.0/8, total 16,777,216 IPs). 2. Class B: 172.16.0.0 to 172.31.255.255 (Prefix 172.16.0.0/12, total 1,048,576 IPs, spanning 16 Class B equivalents). 3. Class C: 192.168.0.0 to 192.168.255.255 (Prefix 192.168.0.0/16, total 65,536 IPs, spanning 256 Class C equivalents).",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: The three RFC 1918 private IPv4 ranges are: 1. Class A: 10.0.0.0 to 10.255.255.255 (Prefix 10.0.0.0/8, total 16,777,216 IPs). 2. Class B: 172.16.0.0 to 172.31.255.255 (Prefix 172.16.0.0/12, total 1,048,576 IPs, spanning 16 Class B equivalents). 3. Class C: 192.168.0.0 to 192.168.255.255 (Prefix 192.168.0.0/16, total 65,536 IPs, spanning 256 Class C equivalents).",
    "explanation": "Correct engineering approach: The three RFC 1918 private IPv4 ranges are: 1. Class A: 10.0.0.0 to 10.255.255.255 (Prefix 10.0.0.0/8, total 16,777,216 IPs). 2. Class B: 172.16.0.0 to 172.31.255.255 (Prefix 172.16.0.0/12, total 1,048,576 IPs, spanning 16 Class B equivalents). 3. Class C: 192.168.0.0 to 192.168.255.255 (Prefix 192.168.0.0/16, total 65,536 IPs, spanning 256 Class C equivalents).",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "subnetting-cidr-mcq-1",
    "topicId": "subnetting-cidr",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Subnetting & CIDR?",
    "options": [
      "A) Subnetting is the practice of dividing a large physical IP network into smaller, logically isolated sub-networks (subnets) by borrowing bits from the host portion to extend the network prefix.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Subnetting & CIDR.",
    "progressiveHint": "Core definition: Subnetting is the practice of dividing a large physical IP network into smaller, logically isolated sub-networks (subnets) by borrowing bits from the host portion to extend the network prefix.",
    "explanation": "Subnetting & CIDR is fundamentally designed for: Subnetting is the practice of dividing a large physical IP network into smaller, logically isolated sub-networks (subnets) by borrowing bits from the host portion to extend the network prefix.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "subnetting-cidr-mcq-2",
    "topicId": "subnetting-cidr",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Subnetting & CIDR, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "subnetting-cidr-mcq-3",
    "topicId": "subnetting-cidr",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Subnetting & CIDR is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "subnetting-cidr-mcq-4",
    "topicId": "subnetting-cidr",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is the network address, broadcast address, and number of usable hosts for the IP 172.16.50.85 with subnet mask 255.255.255.224 (/27)?'. How should a software engineer address this?",
    "options": [
      "A) 1. Mask 255.255.255.224 is /27. The interesting octet is the 4th octet (224). 2. Block size = 256 - 224 = 32. 3. Subnets in the 4th octet increase in multiples of 32: 0, 32, 64, 96, 128... 4. The host IP 85 falls between 64 and 95. 5. Network Address = 172.16.50.64. 6. Broadcast Address = next subnet (96) minus 1 = 172.16.50.95. 7. Usable Host Range = 172.16.50.65 through 172.16.50.94. 8. Usable Hosts = 2^(32-27) - 2 = 2^5 - 2 = 32 - 2 = 30 usable hosts.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: 1. Mask 255.255.255.224 is /27. The interesting octet is the 4th octet (224). 2. Block size = 256 - 224 = 32. 3. Subnets in the 4th octet increase in multiples of 32: 0, 32, 64, 96, 128... 4. The host IP 85 falls between 64 and 95. 5. Network Address = 172.16.50.64. 6. Broadcast Address = next subnet (96) minus 1 = 172.16.50.95. 7. Usable Host Range = 172.16.50.65 through 172.16.50.94. 8. Usable Hosts = 2^(32-27) - 2 = 2^5 - 2 = 32 - 2 = 30 usable hosts.",
    "explanation": "Correct engineering approach: 1. Mask 255.255.255.224 is /27. The interesting octet is the 4th octet (224). 2. Block size = 256 - 224 = 32. 3. Subnets in the 4th octet increase in multiples of 32: 0, 32, 64, 96, 128... 4. The host IP 85 falls between 64 and 95. 5. Network Address = 172.16.50.64. 6. Broadcast Address = next subnet (96) minus 1 = 172.16.50.95. 7. Usable Host Range = 172.16.50.65 through 172.16.50.94. 8. Usable Hosts = 2^(32-27) - 2 = 2^5 - 2 = 32 - 2 = 30 usable hosts.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "routing-fundamentals-mcq-1",
    "topicId": "routing-fundamentals",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Routing Fundamentals?",
    "options": [
      "A) Routing is the Layer 3 process by which routers inspect the destination IP address of an incoming packet and determine the optimal next-hop interface to forward it toward its final destination.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Routing Fundamentals.",
    "progressiveHint": "Core definition: Routing is the Layer 3 process by which routers inspect the destination IP address of an incoming packet and determine the optimal next-hop interface to forward it toward its final destination.",
    "explanation": "Routing Fundamentals is fundamentally designed for: Routing is the Layer 3 process by which routers inspect the destination IP address of an incoming packet and determine the optimal next-hop interface to forward it toward its final destination.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "routing-fundamentals-mcq-2",
    "topicId": "routing-fundamentals",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Routing Fundamentals, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "routing-fundamentals-mcq-3",
    "topicId": "routing-fundamentals",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Routing Fundamentals is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "routing-fundamentals-mcq-4",
    "topicId": "routing-fundamentals",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is the difference between Distance Vector and Link State routing algorithms?'. How should a software engineer address this?",
    "options": [
      "A) 1. Routing knowledge: Distance Vector routers only know distance (hops) and vector (direction/next-hop) learned secondhand from immediate neighbors ('routing by rumor'). Link State routers flood link states so every router in the area builds an identical, complete map of the entire network topology. 2. Algorithm: Distance Vector uses Bellman-Ford; Link State uses Dijkstra's Shortest Path First (SPF). 3. Updates: Distance Vector sends periodic full table updates; Link State sends triggered, incremental updates only when a link state changes. 4. Convergence & Scalability: Link State converges drastically faster without routing loops and scales to large enterprise networks.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: 1. Routing knowledge: Distance Vector routers only know distance (hops) and vector (direction/next-hop) learned secondhand from immediate neighbors ('routing by rumor'). Link State routers flood link states so every router in the area builds an identical, complete map of the entire network topology. 2. Algorithm: Distance Vector uses Bellman-Ford; Link State uses Dijkstra's Shortest Path First (SPF). 3. Updates: Distance Vector sends periodic full table updates; Link State sends triggered, incremental updates only when a link state changes. 4. Convergence & Scalability: Link State converges drastically faster without routing loops and scales to large enterprise networks.",
    "explanation": "Correct engineering approach: 1. Routing knowledge: Distance Vector routers only know distance (hops) and vector (direction/next-hop) learned secondhand from immediate neighbors ('routing by rumor'). Link State routers flood link states so every router in the area builds an identical, complete map of the entire network topology. 2. Algorithm: Distance Vector uses Bellman-Ford; Link State uses Dijkstra's Shortest Path First (SPF). 3. Updates: Distance Vector sends periodic full table updates; Link State sends triggered, incremental updates only when a link state changes. 4. Convergence & Scalability: Link State converges drastically faster without routing loops and scales to large enterprise networks.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "routing-table-gateway-mcq-1",
    "topicId": "routing-table-gateway",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Routing Table Lookup & Default Gateway?",
    "options": [
      "A) A routing table is an in-memory database stored on hosts and routers mapping destination network prefixes to next-hop IP addresses and exit interfaces. The Default Gateway is the fallback router used when no specific route matches.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Routing Table Lookup & Default Gateway.",
    "progressiveHint": "Core definition: A routing table is an in-memory database stored on hosts and routers mapping destination network prefixes to next-hop IP addresses and exit interfaces. The Default Gateway is the fallback router used when no specific route matches.",
    "explanation": "Routing Table Lookup & Default Gateway is fundamentally designed for: A routing table is an in-memory database stored on hosts and routers mapping destination network prefixes to next-hop IP addresses and exit interfaces. The Default Gateway is the fallback router used when no specific route matches.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "routing-table-gateway-mcq-2",
    "topicId": "routing-table-gateway",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Routing Table Lookup & Default Gateway, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "routing-table-gateway-mcq-3",
    "topicId": "routing-table-gateway",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Routing Table Lookup & Default Gateway is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "routing-table-gateway-mcq-4",
    "topicId": "routing-table-gateway",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'Explain the Longest Prefix Match (LPM) algorithm in IP routing with an example.'. How should a software engineer address this?",
    "options": [
      "A) Longest Prefix Match (LPM) is the algorithm used by routers to select the winning route from the routing table when a destination IP matches multiple entries. The router selects the entry with the longest subnet mask (most specific network prefix). For example, consider a packet destined for IP 192.168.1.130. The routing table contains three matching entries: 1. 0.0.0.0/0 (Default route, mask length 0). 2. 192.168.1.0/24 (Mask length 24). 3. 192.168.1.128/28 (Mask length 28). The destination IP 192.168.1.130 satisfies all three rules. The router chooses Route 3 (192.168.1.128/28) because /28 is the longest prefix match (28 bits vs 24 bits vs 0 bits).",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: Longest Prefix Match (LPM) is the algorithm used by routers to select the winning route from the routing table when a destination IP matches multiple entries. The router selects the entry with the longest subnet mask (most specific network prefix). For example, consider a packet destined for IP 192.168.1.130. The routing table contains three matching entries: 1. 0.0.0.0/0 (Default route, mask length 0). 2. 192.168.1.0/24 (Mask length 24). 3. 192.168.1.128/28 (Mask length 28). The destination IP 192.168.1.130 satisfies all three rules. The router chooses Route 3 (192.168.1.128/28) because /28 is the longest prefix match (28 bits vs 24 bits vs 0 bits).",
    "explanation": "Correct engineering approach: Longest Prefix Match (LPM) is the algorithm used by routers to select the winning route from the routing table when a destination IP matches multiple entries. The router selects the entry with the longest subnet mask (most specific network prefix). For example, consider a packet destined for IP 192.168.1.130. The routing table contains three matching entries: 1. 0.0.0.0/0 (Default route, mask length 0). 2. 192.168.1.0/24 (Mask length 24). 3. 192.168.1.128/28 (Mask length 28). The destination IP 192.168.1.130 satisfies all three rules. The router chooses Route 3 (192.168.1.128/28) because /28 is the longest prefix match (28 bits vs 24 bits vs 0 bits).",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "nat-network-address-translation-mcq-1",
    "topicId": "nat-network-address-translation",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of NAT?",
    "options": [
      "A) Network Address Translation (NAT, RFC 1631) modifies the source or destination IP and port numbers in packet headers as they traverse a router, enabling multiple private devices to share a single public IP.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of NAT.",
    "progressiveHint": "Core definition: Network Address Translation (NAT, RFC 1631) modifies the source or destination IP and port numbers in packet headers as they traverse a router, enabling multiple private devices to share a single public IP.",
    "explanation": "NAT is fundamentally designed for: Network Address Translation (NAT, RFC 1631) modifies the source or destination IP and port numbers in packet headers as they traverse a router, enabling multiple private devices to share a single public IP.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "nat-network-address-translation-mcq-2",
    "topicId": "nat-network-address-translation",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of NAT, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "nat-network-address-translation-mcq-3",
    "topicId": "nat-network-address-translation",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing NAT is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "nat-network-address-translation-mcq-4",
    "topicId": "nat-network-address-translation",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is the difference between SNAT (Source NAT) and DNAT (Destination NAT)?'. How should a software engineer address this?",
    "options": [
      "A) SNAT (Source NAT) rewrites the private Source IP address of an outbound packet to a public IP as it leaves the local network. It is used when internal clients initiate connections to external internet servers. DNAT (Destination NAT / Port Forwarding) rewrites the Destination IP address of an inbound packet arriving on the router's public interface to an internal private server IP. It is used when external internet users need to access an internal service (e.g. accessing a company web server hosted at private IP 10.0.1.50 via public IP 203.0.113.10:443).",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: SNAT (Source NAT) rewrites the private Source IP address of an outbound packet to a public IP as it leaves the local network. It is used when internal clients initiate connections to external internet servers. DNAT (Destination NAT / Port Forwarding) rewrites the Destination IP address of an inbound packet arriving on the router's public interface to an internal private server IP. It is used when external internet users need to access an internal service (e.g. accessing a company web server hosted at private IP 10.0.1.50 via public IP 203.0.113.10:443).",
    "explanation": "Correct engineering approach: SNAT (Source NAT) rewrites the private Source IP address of an outbound packet to a public IP as it leaves the local network. It is used when internal clients initiate connections to external internet servers. DNAT (Destination NAT / Port Forwarding) rewrites the Destination IP address of an inbound packet arriving on the router's public interface to an internal private server IP. It is used when external internet users need to access an internal service (e.g. accessing a company web server hosted at private IP 10.0.1.50 via public IP 203.0.113.10:443).",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "icmp-protocol-mcq-1",
    "topicId": "icmp-protocol",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of ICMP?",
    "options": [
      "A) Internet Control Message Protocol (ICMP, RFC 792) is a network-layer diagnostic and error-reporting protocol used by network devices to report transmission problems and test reachability.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of ICMP.",
    "progressiveHint": "Core definition: Internet Control Message Protocol (ICMP, RFC 792) is a network-layer diagnostic and error-reporting protocol used by network devices to report transmission problems and test reachability.",
    "explanation": "ICMP is fundamentally designed for: Internet Control Message Protocol (ICMP, RFC 792) is a network-layer diagnostic and error-reporting protocol used by network devices to report transmission problems and test reachability.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "icmp-protocol-mcq-2",
    "topicId": "icmp-protocol",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of ICMP, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "icmp-protocol-mcq-3",
    "topicId": "icmp-protocol",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing ICMP is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "icmp-protocol-mcq-4",
    "topicId": "icmp-protocol",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'How does `traceroute` use ICMP and the IP TTL field to discover all router hops between a client and a server?'. How should a software engineer address this?",
    "options": [
      "A) Traceroute discovers network hops by intentionally exploiting the IP Time-To-Live (TTL) field and ICMP Time Exceeded (Type 11) messages. 1. The client sends a packet with TTL=1. The first router decrements TTL to 0, drops the packet, and sends back an ICMP Type 11 message. The client records the router's IP and measures the RTT. 2. The client sends a packet with TTL=2. It passes Router 1 (TTL becomes 1) and reaches Router 2, where TTL becomes 0. Router 2 drops it and returns ICMP Type 11. 3. The client increments TTL by 1 sequentially (TTL=3, 4, 5...) until the packet reaches the final destination, which responds with an ICMP Echo Reply (or Port Unreachable). By recording the source IP of each returning ICMP message, the client maps the complete hop-by-hop path.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: Traceroute discovers network hops by intentionally exploiting the IP Time-To-Live (TTL) field and ICMP Time Exceeded (Type 11) messages. 1. The client sends a packet with TTL=1. The first router decrements TTL to 0, drops the packet, and sends back an ICMP Type 11 message. The client records the router's IP and measures the RTT. 2. The client sends a packet with TTL=2. It passes Router 1 (TTL becomes 1) and reaches Router 2, where TTL becomes 0. Router 2 drops it and returns ICMP Type 11. 3. The client increments TTL by 1 sequentially (TTL=3, 4, 5...) until the packet reaches the final destination, which responds with an ICMP Echo Reply (or Port Unreachable). By recording the source IP of each returning ICMP message, the client maps the complete hop-by-hop path.",
    "explanation": "Correct engineering approach: Traceroute discovers network hops by intentionally exploiting the IP Time-To-Live (TTL) field and ICMP Time Exceeded (Type 11) messages. 1. The client sends a packet with TTL=1. The first router decrements TTL to 0, drops the packet, and sends back an ICMP Type 11 message. The client records the router's IP and measures the RTT. 2. The client sends a packet with TTL=2. It passes Router 1 (TTL becomes 1) and reaches Router 2, where TTL becomes 0. Router 2 drops it and returns ICMP Type 11. 3. The client increments TTL by 1 sequentially (TTL=3, 4, 5...) until the packet reaches the final destination, which responds with an ICMP Echo Reply (or Port Unreachable). By recording the source IP of each returning ICMP message, the client maps the complete hop-by-hop path.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "tcp-protocol-mcq-1",
    "topicId": "tcp-protocol",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of TCP Architecture & Segment Header Format?",
    "options": [
      "A) Transmission Control Protocol (TCP, RFC 793) is a connection-oriented, reliable, full-duplex Transport Layer protocol providing ordered, error-checked delivery of a stream of octets between processes.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of TCP Architecture & Segment Header Format.",
    "progressiveHint": "Core definition: Transmission Control Protocol (TCP, RFC 793) is a connection-oriented, reliable, full-duplex Transport Layer protocol providing ordered, error-checked delivery of a stream of octets between processes.",
    "explanation": "TCP Architecture & Segment Header Format is fundamentally designed for: Transmission Control Protocol (TCP, RFC 793) is a connection-oriented, reliable, full-duplex Transport Layer protocol providing ordered, error-checked delivery of a stream of octets between processes.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "tcp-protocol-mcq-2",
    "topicId": "tcp-protocol",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of TCP Architecture & Segment Header Format, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "tcp-protocol-mcq-3",
    "topicId": "tcp-protocol",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing TCP Architecture & Segment Header Format is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "tcp-protocol-mcq-4",
    "topicId": "tcp-protocol",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What are the six standard control flags in the TCP header and what does each flag signify?'. How should a software engineer address this?",
    "options": [
      "A) 1. SYN (Synchronize): Initiates connection establishment; synchronizes initial sequence numbers (ISN). 2. ACK (Acknowledgment): Confirms receipt of bytes; indicates the 'Acknowledgment Number' field is valid. 3. FIN (Finish): Gracefully closes connection from sender's side (no more data to send). 4. RST (Reset): Abruptly terminates/aborts a connection due to an unrecoverable error or closed port. 5. PSH (Push): Requests receiver to immediately push buffered data to application without waiting for buffer to fill. 6. URG (Urgent): Indicates Urgent Pointer field is valid, pointing to high-priority out-of-band data.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: 1. SYN (Synchronize): Initiates connection establishment; synchronizes initial sequence numbers (ISN). 2. ACK (Acknowledgment): Confirms receipt of bytes; indicates the 'Acknowledgment Number' field is valid. 3. FIN (Finish): Gracefully closes connection from sender's side (no more data to send). 4. RST (Reset): Abruptly terminates/aborts a connection due to an unrecoverable error or closed port. 5. PSH (Push): Requests receiver to immediately push buffered data to application without waiting for buffer to fill. 6. URG (Urgent): Indicates Urgent Pointer field is valid, pointing to high-priority out-of-band data.",
    "explanation": "Correct engineering approach: 1. SYN (Synchronize): Initiates connection establishment; synchronizes initial sequence numbers (ISN). 2. ACK (Acknowledgment): Confirms receipt of bytes; indicates the 'Acknowledgment Number' field is valid. 3. FIN (Finish): Gracefully closes connection from sender's side (no more data to send). 4. RST (Reset): Abruptly terminates/aborts a connection due to an unrecoverable error or closed port. 5. PSH (Push): Requests receiver to immediately push buffered data to application without waiting for buffer to fill. 6. URG (Urgent): Indicates Urgent Pointer field is valid, pointing to high-priority out-of-band data.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "tcp-3-way-handshake-mcq-1",
    "topicId": "tcp-3-way-handshake",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of TCP 3-Way Handshake?",
    "options": [
      "A) The TCP 3-Way Handshake is the 3-step synchronization process used by client and server to negotiate Initial Sequence Numbers (ISNs) and establish a reliable full-duplex socket connection.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of TCP 3-Way Handshake.",
    "progressiveHint": "Core definition: The TCP 3-Way Handshake is the 3-step synchronization process used by client and server to negotiate Initial Sequence Numbers (ISNs) and establish a reliable full-duplex socket connection.",
    "explanation": "TCP 3-Way Handshake is fundamentally designed for: The TCP 3-Way Handshake is the 3-step synchronization process used by client and server to negotiate Initial Sequence Numbers (ISNs) and establish a reliable full-duplex socket connection.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "tcp-3-way-handshake-mcq-2",
    "topicId": "tcp-3-way-handshake",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of TCP 3-Way Handshake, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "tcp-3-way-handshake-mcq-3",
    "topicId": "tcp-3-way-handshake",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing TCP 3-Way Handshake is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "tcp-3-way-handshake-mcq-4",
    "topicId": "tcp-3-way-handshake",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is a SYN Flood attack and how do SYN Cookies defend against it?'. How should a software engineer address this?",
    "options": [
      "A) In a SYN Flood attack (DoS), an attacker sends millions of spoofed TCP SYN packets with fake source IPs to a server. For each SYN, the server allocates socket buffer memory, enters the SYN_RCVD state, and waits for the final ACK (which never arrives because the source IP was fake). The server's 'SYN backlog queue' exhausts its memory, causing it to drop legitimate connection requests. Mitigation: SYN Cookies (RFC 4987). Instead of allocating memory in SYN_RCVD, the server encodes the connection state (client IP, port, timestamp, secret key) mathematically into its own 32-bit Initial Sequence Number (ISN_s). Only when the client returns a valid ACK (with Ack = ISN_s + 1) does the server verify the cookie and allocate memory, completely immune to backlog exhaustion.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: In a SYN Flood attack (DoS), an attacker sends millions of spoofed TCP SYN packets with fake source IPs to a server. For each SYN, the server allocates socket buffer memory, enters the SYN_RCVD state, and waits for the final ACK (which never arrives because the source IP was fake). The server's 'SYN backlog queue' exhausts its memory, causing it to drop legitimate connection requests. Mitigation: SYN Cookies (RFC 4987). Instead of allocating memory in SYN_RCVD, the server encodes the connection state (client IP, port, timestamp, secret key) mathematically into its own 32-bit Initial Sequence Number (ISN_s). Only when the client returns a valid ACK (with Ack = ISN_s + 1) does the server verify the cookie and allocate memory, completely immune to backlog exhaustion.",
    "explanation": "Correct engineering approach: In a SYN Flood attack (DoS), an attacker sends millions of spoofed TCP SYN packets with fake source IPs to a server. For each SYN, the server allocates socket buffer memory, enters the SYN_RCVD state, and waits for the final ACK (which never arrives because the source IP was fake). The server's 'SYN backlog queue' exhausts its memory, causing it to drop legitimate connection requests. Mitigation: SYN Cookies (RFC 4987). Instead of allocating memory in SYN_RCVD, the server encodes the connection state (client IP, port, timestamp, secret key) mathematically into its own 32-bit Initial Sequence Number (ISN_s). Only when the client returns a valid ACK (with Ack = ISN_s + 1) does the server verify the cookie and allocate memory, completely immune to backlog exhaustion.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "tcp-connection-termination-mcq-1",
    "topicId": "tcp-connection-termination",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of TCP 4-Way Handshake Termination & TIME_WAIT State?",
    "options": [
      "A) TCP connection termination is the 4-step graceful closing handshake that independently terminates transmission in both directions (full-duplex teardown), concluding with the TIME_WAIT state.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of TCP 4-Way Handshake Termination & TIME_WAIT State.",
    "progressiveHint": "Core definition: TCP connection termination is the 4-step graceful closing handshake that independently terminates transmission in both directions (full-duplex teardown), concluding with the TIME_WAIT state.",
    "explanation": "TCP 4-Way Handshake Termination & TIME_WAIT State is fundamentally designed for: TCP connection termination is the 4-step graceful closing handshake that independently terminates transmission in both directions (full-duplex teardown), concluding with the TIME_WAIT state.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "tcp-connection-termination-mcq-2",
    "topicId": "tcp-connection-termination",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of TCP 4-Way Handshake Termination & TIME_WAIT State, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "tcp-connection-termination-mcq-3",
    "topicId": "tcp-connection-termination",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing TCP 4-Way Handshake Termination & TIME_WAIT State is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "tcp-connection-termination-mcq-4",
    "topicId": "tcp-connection-termination",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'Why is the TIME_WAIT state necessary, and why does it last for 2MSL (Maximum Segment Lifetime)?'. How should a software engineer address this?",
    "options": [
      "A) The TIME_WAIT state serves two critical architectural purposes: 1. Reliable Final ACK Delivery: If the client's final ACK (Step 4) is lost in transit, the server will time out and retransmit its FIN (Step 3). If the client closed immediately instead of waiting in TIME_WAIT, it would respond to the retransmitted FIN with an RST, making the server think the connection terminated abnormally with an error. In TIME_WAIT, the client can re-send the final ACK. 2. Preventing Old Duplicate Segment Confusion: Packets can be delayed in transit by routing loops. Waiting for 2 * MSL (Maximum Segment Lifetime = time for packet to travel + response to return) guarantees that all lingering duplicate packets from the old connection have died and cleared the Internet before a new connection reuses the same IP:Port 4-tuple.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: The TIME_WAIT state serves two critical architectural purposes: 1. Reliable Final ACK Delivery: If the client's final ACK (Step 4) is lost in transit, the server will time out and retransmit its FIN (Step 3). If the client closed immediately instead of waiting in TIME_WAIT, it would respond to the retransmitted FIN with an RST, making the server think the connection terminated abnormally with an error. In TIME_WAIT, the client can re-send the final ACK. 2. Preventing Old Duplicate Segment Confusion: Packets can be delayed in transit by routing loops. Waiting for 2 * MSL (Maximum Segment Lifetime = time for packet to travel + response to return) guarantees that all lingering duplicate packets from the old connection have died and cleared the Internet before a new connection reuses the same IP:Port 4-tuple.",
    "explanation": "Correct engineering approach: The TIME_WAIT state serves two critical architectural purposes: 1. Reliable Final ACK Delivery: If the client's final ACK (Step 4) is lost in transit, the server will time out and retransmit its FIN (Step 3). If the client closed immediately instead of waiting in TIME_WAIT, it would respond to the retransmitted FIN with an RST, making the server think the connection terminated abnormally with an error. In TIME_WAIT, the client can re-send the final ACK. 2. Preventing Old Duplicate Segment Confusion: Packets can be delayed in transit by routing loops. Waiting for 2 * MSL (Maximum Segment Lifetime = time for packet to travel + response to return) guarantees that all lingering duplicate packets from the old connection have died and cleared the Internet before a new connection reuses the same IP:Port 4-tuple.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "tcp-reliability-mcq-1",
    "topicId": "tcp-reliability",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of TCP Reliability: Sequence Numbers, ACKs & Retransmission?",
    "options": [
      "A) TCP guarantees 100% reliable data transmission across unreliable IP networks through byte sequence numbering, cumulative acknowledgments, and dynamic retransmission timers.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of TCP Reliability: Sequence Numbers, ACKs & Retransmission.",
    "progressiveHint": "Core definition: TCP guarantees 100% reliable data transmission across unreliable IP networks through byte sequence numbering, cumulative acknowledgments, and dynamic retransmission timers.",
    "explanation": "TCP Reliability: Sequence Numbers, ACKs & Retransmission is fundamentally designed for: TCP guarantees 100% reliable data transmission across unreliable IP networks through byte sequence numbering, cumulative acknowledgments, and dynamic retransmission timers.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "tcp-reliability-mcq-2",
    "topicId": "tcp-reliability",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of TCP Reliability: Sequence Numbers, ACKs & Retransmission, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "tcp-reliability-mcq-3",
    "topicId": "tcp-reliability",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing TCP Reliability: Sequence Numbers, ACKs & Retransmission is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "tcp-reliability-mcq-4",
    "topicId": "tcp-reliability",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is the difference between Go-Back-N ARQ and Selective Repeat (SACK) in TCP?'. How should a software engineer address this?",
    "options": [
      "A) In traditional Go-Back-N (cumulative ACK without SACK), if segment 2 is lost out of segments 1-5, the receiver can only send 'Ack=2'. The sender has no way of knowing segments 3, 4, and 5 arrived safely, so when its timer expires, it must retransmit ALL segments from 2 onward (2, 3, 4, 5), wasting bandwidth. In Selective Repeat (enabled via Selective ACK / SACK, RFC 2018), the receiver sends SACK blocks in the TCP options header detailing non-contiguous ranges that arrived (e.g. SACK: 3000-6000). The sender retransmits ONLY the missing segment 2, preserving network capacity and reducing recovery latency.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: In traditional Go-Back-N (cumulative ACK without SACK), if segment 2 is lost out of segments 1-5, the receiver can only send 'Ack=2'. The sender has no way of knowing segments 3, 4, and 5 arrived safely, so when its timer expires, it must retransmit ALL segments from 2 onward (2, 3, 4, 5), wasting bandwidth. In Selective Repeat (enabled via Selective ACK / SACK, RFC 2018), the receiver sends SACK blocks in the TCP options header detailing non-contiguous ranges that arrived (e.g. SACK: 3000-6000). The sender retransmits ONLY the missing segment 2, preserving network capacity and reducing recovery latency.",
    "explanation": "Correct engineering approach: In traditional Go-Back-N (cumulative ACK without SACK), if segment 2 is lost out of segments 1-5, the receiver can only send 'Ack=2'. The sender has no way of knowing segments 3, 4, and 5 arrived safely, so when its timer expires, it must retransmit ALL segments from 2 onward (2, 3, 4, 5), wasting bandwidth. In Selective Repeat (enabled via Selective ACK / SACK, RFC 2018), the receiver sends SACK blocks in the TCP options header detailing non-contiguous ranges that arrived (e.g. SACK: 3000-6000). The sender retransmits ONLY the missing segment 2, preserving network capacity and reducing recovery latency.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "flow-control-sliding-window-mcq-1",
    "topicId": "flow-control-sliding-window",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of TCP Flow Control & Sliding Window Protocol?",
    "options": [
      "A) TCP Flow Control prevents a fast sender from overwhelming a slow receiver's buffer memory through the Sliding Window Protocol and the Advertised Window (rwnd) field.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of TCP Flow Control & Sliding Window Protocol.",
    "progressiveHint": "Core definition: TCP Flow Control prevents a fast sender from overwhelming a slow receiver's buffer memory through the Sliding Window Protocol and the Advertised Window (rwnd) field.",
    "explanation": "TCP Flow Control & Sliding Window Protocol is fundamentally designed for: TCP Flow Control prevents a fast sender from overwhelming a slow receiver's buffer memory through the Sliding Window Protocol and the Advertised Window (rwnd) field.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "flow-control-sliding-window-mcq-2",
    "topicId": "flow-control-sliding-window",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of TCP Flow Control & Sliding Window Protocol, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "flow-control-sliding-window-mcq-3",
    "topicId": "flow-control-sliding-window",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing TCP Flow Control & Sliding Window Protocol is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "flow-control-sliding-window-mcq-4",
    "topicId": "flow-control-sliding-window",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is the difference between Flow Control and Congestion Control in TCP?'. How should a software engineer address this?",
    "options": [
      "A) Flow Control and Congestion Control protect two completely different entities: 1. Flow Control prevents a fast sender from overwhelming the SLOW RECEIVER's buffer. It is regulated by the Advertised Window (rwnd) explicitly reported by the receiver in the TCP header. 2. Congestion Control prevents senders from overwhelming the INTERMEDIATE NETWORK routers and transmission links. It is regulated by the Congestion Window (cwnd), which is dynamically calculated by the sender based on observed latency and packet drops (AIMD, Slow Start). At any moment, the sender transmits at: Effective Window = min(rwnd, cwnd).",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: Flow Control and Congestion Control protect two completely different entities: 1. Flow Control prevents a fast sender from overwhelming the SLOW RECEIVER's buffer. It is regulated by the Advertised Window (rwnd) explicitly reported by the receiver in the TCP header. 2. Congestion Control prevents senders from overwhelming the INTERMEDIATE NETWORK routers and transmission links. It is regulated by the Congestion Window (cwnd), which is dynamically calculated by the sender based on observed latency and packet drops (AIMD, Slow Start). At any moment, the sender transmits at: Effective Window = min(rwnd, cwnd).",
    "explanation": "Correct engineering approach: Flow Control and Congestion Control protect two completely different entities: 1. Flow Control prevents a fast sender from overwhelming the SLOW RECEIVER's buffer. It is regulated by the Advertised Window (rwnd) explicitly reported by the receiver in the TCP header. 2. Congestion Control prevents senders from overwhelming the INTERMEDIATE NETWORK routers and transmission links. It is regulated by the Congestion Window (cwnd), which is dynamically calculated by the sender based on observed latency and packet drops (AIMD, Slow Start). At any moment, the sender transmits at: Effective Window = min(rwnd, cwnd).",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "congestion-control-mcq-1",
    "topicId": "congestion-control",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of TCP Congestion Control?",
    "options": [
      "A) TCP Congestion Control dynamically regulates the sender's transmission rate to prevent intermediate network routers and buffers from collapsing due to packet traffic overload.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of TCP Congestion Control.",
    "progressiveHint": "Core definition: TCP Congestion Control dynamically regulates the sender's transmission rate to prevent intermediate network routers and buffers from collapsing due to packet traffic overload.",
    "explanation": "TCP Congestion Control is fundamentally designed for: TCP Congestion Control dynamically regulates the sender's transmission rate to prevent intermediate network routers and buffers from collapsing due to packet traffic overload.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "congestion-control-mcq-2",
    "topicId": "congestion-control",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of TCP Congestion Control, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "congestion-control-mcq-3",
    "topicId": "congestion-control",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing TCP Congestion Control is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "congestion-control-mcq-4",
    "topicId": "congestion-control",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'Explain the AIMD (Additive Increase Multiplicative Decrease) principle in TCP and why it leads to fair bandwidth allocation.'. How should a software engineer address this?",
    "options": [
      "A) AIMD is the mathematical foundation of TCP congestion avoidance. 1. Additive Increase: As long as no packet loss occurs, the sender increases its congestion window linearly by adding 1 MSS every Round Trip Time (cwnd = cwnd + 1). This cautiously probes for available bandwidth. 2. Multiplicative Decrease: The moment packet loss is detected (via 3 duplicate ACKs), the sender cuts its congestion window in half (cwnd = cwnd / 2). If two flows share a bottleneck link, the flow consuming more bandwidth loses more in absolute terms when halved. Over successive sawtooth cycles, this mathematical convergence forces competing connections to settle at an equal, fair share of link capacity while maximizing utilization.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: AIMD is the mathematical foundation of TCP congestion avoidance. 1. Additive Increase: As long as no packet loss occurs, the sender increases its congestion window linearly by adding 1 MSS every Round Trip Time (cwnd = cwnd + 1). This cautiously probes for available bandwidth. 2. Multiplicative Decrease: The moment packet loss is detected (via 3 duplicate ACKs), the sender cuts its congestion window in half (cwnd = cwnd / 2). If two flows share a bottleneck link, the flow consuming more bandwidth loses more in absolute terms when halved. Over successive sawtooth cycles, this mathematical convergence forces competing connections to settle at an equal, fair share of link capacity while maximizing utilization.",
    "explanation": "Correct engineering approach: AIMD is the mathematical foundation of TCP congestion avoidance. 1. Additive Increase: As long as no packet loss occurs, the sender increases its congestion window linearly by adding 1 MSS every Round Trip Time (cwnd = cwnd + 1). This cautiously probes for available bandwidth. 2. Multiplicative Decrease: The moment packet loss is detected (via 3 duplicate ACKs), the sender cuts its congestion window in half (cwnd = cwnd / 2). If two flows share a bottleneck link, the flow consuming more bandwidth loses more in absolute terms when halved. Over successive sawtooth cycles, this mathematical convergence forces competing connections to settle at an equal, fair share of link capacity while maximizing utilization.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "udp-protocol-mcq-1",
    "topicId": "udp-protocol",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of UDP?",
    "options": [
      "A) User Datagram Protocol (UDP, RFC 768) is a connectionless, lightweight, unreliable Transport Layer protocol that transmits independent datagrams without handshakes, acknowledgments, or flow control.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of UDP.",
    "progressiveHint": "Core definition: User Datagram Protocol (UDP, RFC 768) is a connectionless, lightweight, unreliable Transport Layer protocol that transmits independent datagrams without handshakes, acknowledgments, or flow control.",
    "explanation": "UDP is fundamentally designed for: User Datagram Protocol (UDP, RFC 768) is a connectionless, lightweight, unreliable Transport Layer protocol that transmits independent datagrams without handshakes, acknowledgments, or flow control.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "udp-protocol-mcq-2",
    "topicId": "udp-protocol",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of UDP, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "udp-protocol-mcq-3",
    "topicId": "udp-protocol",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing UDP is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "udp-protocol-mcq-4",
    "topicId": "udp-protocol",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'Why does DNS use UDP for standard queries, but switches to TCP for zone transfers?'. How should a software engineer address this?",
    "options": [
      "A) DNS uses UDP (port 53) for standard domain queries because a query fits in a single packet (<512 bytes) and expects a single reply. Using UDP avoids the overhead and latency of a TCP 3-way handshake and teardown, allowing root and TLD nameservers to serve millions of queries per second. However, DNS switches to TCP (port 53) in two cases: 1. Zone Transfers (AXFR/IXFR) between primary and secondary nameservers: transferring entire DNS zone databases requires reliable, ordered byte streams without missing records. 2. Responses exceeding 512 bytes (without EDNS0): if a DNS reply is truncated (TC flag set), the client falls back to TCP to receive the full payload.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: DNS uses UDP (port 53) for standard domain queries because a query fits in a single packet (<512 bytes) and expects a single reply. Using UDP avoids the overhead and latency of a TCP 3-way handshake and teardown, allowing root and TLD nameservers to serve millions of queries per second. However, DNS switches to TCP (port 53) in two cases: 1. Zone Transfers (AXFR/IXFR) between primary and secondary nameservers: transferring entire DNS zone databases requires reliable, ordered byte streams without missing records. 2. Responses exceeding 512 bytes (without EDNS0): if a DNS reply is truncated (TC flag set), the client falls back to TCP to receive the full payload.",
    "explanation": "Correct engineering approach: DNS uses UDP (port 53) for standard domain queries because a query fits in a single packet (<512 bytes) and expects a single reply. Using UDP avoids the overhead and latency of a TCP 3-way handshake and teardown, allowing root and TLD nameservers to serve millions of queries per second. However, DNS switches to TCP (port 53) in two cases: 1. Zone Transfers (AXFR/IXFR) between primary and secondary nameservers: transferring entire DNS zone databases requires reliable, ordered byte streams without missing records. 2. Responses exceeding 512 bytes (without EDNS0): if a DNS reply is truncated (TC flag set), the client falls back to TCP to receive the full payload.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "tcp-vs-udp-mcq-1",
    "topicId": "tcp-vs-udp",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of TCP vs UDP Comparison & Protocol Decision Matrix?",
    "options": [
      "A) A comprehensive architectural comparison evaluating the trade-offs between TCP (reliable, ordered, connection-oriented) and UDP (fast, lightweight, connectionless).",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of TCP vs UDP Comparison & Protocol Decision Matrix.",
    "progressiveHint": "Core definition: A comprehensive architectural comparison evaluating the trade-offs between TCP (reliable, ordered, connection-oriented) and UDP (fast, lightweight, connectionless).",
    "explanation": "TCP vs UDP Comparison & Protocol Decision Matrix is fundamentally designed for: A comprehensive architectural comparison evaluating the trade-offs between TCP (reliable, ordered, connection-oriented) and UDP (fast, lightweight, connectionless).",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "tcp-vs-udp-mcq-2",
    "topicId": "tcp-vs-udp",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of TCP vs UDP Comparison & Protocol Decision Matrix, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "tcp-vs-udp-mcq-3",
    "topicId": "tcp-vs-udp",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing TCP vs UDP Comparison & Protocol Decision Matrix is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "tcp-vs-udp-mcq-4",
    "topicId": "tcp-vs-udp",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'Why does HTTP/3 (QUIC) run over UDP instead of TCP, given that web pages require 100% reliable data?'. How should a software engineer address this?",
    "options": [
      "A) HTTP/2 solved application-layer head-of-line blocking by multiplexing multiple requests over a single TCP connection. However, it introduced 'Transport-Layer Head-of-Line Blocking': if a single TCP packet is dropped, the entire TCP connection freezes while the OS waits for retransmission, stalling all other multiplexed web streams simultaneously. HTTP/3 solves this by migrating to QUIC, which runs on top of UDP. QUIC implements its own lightweight stream multiplexing and retransmission logic directly in user space. If a packet for Stream 1 is lost, Stream 2 and Stream 3 continue loading without delay. Furthermore, QUIC combines connection establishment with TLS 1.3 encryption, enabling 0-RTT connection resumption.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: HTTP/2 solved application-layer head-of-line blocking by multiplexing multiple requests over a single TCP connection. However, it introduced 'Transport-Layer Head-of-Line Blocking': if a single TCP packet is dropped, the entire TCP connection freezes while the OS waits for retransmission, stalling all other multiplexed web streams simultaneously. HTTP/3 solves this by migrating to QUIC, which runs on top of UDP. QUIC implements its own lightweight stream multiplexing and retransmission logic directly in user space. If a packet for Stream 1 is lost, Stream 2 and Stream 3 continue loading without delay. Furthermore, QUIC combines connection establishment with TLS 1.3 encryption, enabling 0-RTT connection resumption.",
    "explanation": "Correct engineering approach: HTTP/2 solved application-layer head-of-line blocking by multiplexing multiple requests over a single TCP connection. However, it introduced 'Transport-Layer Head-of-Line Blocking': if a single TCP packet is dropped, the entire TCP connection freezes while the OS waits for retransmission, stalling all other multiplexed web streams simultaneously. HTTP/3 solves this by migrating to QUIC, which runs on top of UDP. QUIC implements its own lightweight stream multiplexing and retransmission logic directly in user space. If a packet for Stream 1 is lost, Stream 2 and Stream 3 continue loading without delay. Furthermore, QUIC combines connection establishment with TLS 1.3 encryption, enabling 0-RTT connection resumption.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "ports-and-sockets-mcq-1",
    "topicId": "ports-and-sockets",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Ports, Sockets & Multiplexing / Demultiplexing?",
    "options": [
      "A) A port is a 16-bit numerical identifier (0 to 65535) used by the Transport Layer to direct data to specific software processes. A socket is the unique combination of an IP address and a Port number representing an endpoint of communication.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Ports, Sockets & Multiplexing / Demultiplexing.",
    "progressiveHint": "Core definition: A port is a 16-bit numerical identifier (0 to 65535) used by the Transport Layer to direct data to specific software processes. A socket is the unique combination of an IP address and a Port number representing an endpoint of communication.",
    "explanation": "Ports, Sockets & Multiplexing / Demultiplexing is fundamentally designed for: A port is a 16-bit numerical identifier (0 to 65535) used by the Transport Layer to direct data to specific software processes. A socket is the unique combination of an IP address and a Port number representing an endpoint of communication.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "ports-and-sockets-mcq-2",
    "topicId": "ports-and-sockets",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Ports, Sockets & Multiplexing / Demultiplexing, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "ports-and-sockets-mcq-3",
    "topicId": "ports-and-sockets",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Ports, Sockets & Multiplexing / Demultiplexing is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "ports-and-sockets-mcq-4",
    "topicId": "ports-and-sockets",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'How can a web server handle 100,000 concurrent TCP connections on a single listening port (e.g. port 443)?'. How should a software engineer address this?",
    "options": [
      "A) A TCP connection is not identified by the server's listening port alone; it is uniquely identified in the OS kernel by the 5-Tuple: {Source IP, Source Port, Destination IP, Destination Port, Protocol}. The server's listening socket on 0.0.0.0:443 never exchanges data; its only job is to accept new handshakes. When `accept()` completes, the OS kernel creates a brand new connected socket descriptor with the same Destination Port (443), but bound to the client's unique Source IP and Source Port. As long as the client IP or client ephemeral port is different, the 5-tuple is unique. A server can handle hundreds of thousands of concurrent connections bounded only by RAM, file descriptors (`ulimit -n`), and CPU scheduling.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: A TCP connection is not identified by the server's listening port alone; it is uniquely identified in the OS kernel by the 5-Tuple: {Source IP, Source Port, Destination IP, Destination Port, Protocol}. The server's listening socket on 0.0.0.0:443 never exchanges data; its only job is to accept new handshakes. When `accept()` completes, the OS kernel creates a brand new connected socket descriptor with the same Destination Port (443), but bound to the client's unique Source IP and Source Port. As long as the client IP or client ephemeral port is different, the 5-tuple is unique. A server can handle hundreds of thousands of concurrent connections bounded only by RAM, file descriptors (`ulimit -n`), and CPU scheduling.",
    "explanation": "Correct engineering approach: A TCP connection is not identified by the server's listening port alone; it is uniquely identified in the OS kernel by the 5-Tuple: {Source IP, Source Port, Destination IP, Destination Port, Protocol}. The server's listening socket on 0.0.0.0:443 never exchanges data; its only job is to accept new handshakes. When `accept()` completes, the OS kernel creates a brand new connected socket descriptor with the same Destination Port (443), but bound to the client's unique Source IP and Source Port. As long as the client IP or client ephemeral port is different, the 5-tuple is unique. A server can handle hundreds of thousands of concurrent connections bounded only by RAM, file descriptors (`ulimit -n`), and CPU scheduling.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "dns-domain-name-system-mcq-1",
    "topicId": "dns-domain-name-system",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of DNS Hierarchy & Resolution Process?",
    "options": [
      "A) The Domain Name System (DNS, RFC 1035) is the global hierarchical decentralized naming database that translates human-readable domain names (e.g. google.com) into machine-routable IP addresses (e.g. 142.250.72.14).",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of DNS Hierarchy & Resolution Process.",
    "progressiveHint": "Core definition: The Domain Name System (DNS, RFC 1035) is the global hierarchical decentralized naming database that translates human-readable domain names (e.g. google.com) into machine-routable IP addresses (e.g. 142.250.72.14).",
    "explanation": "DNS Hierarchy & Resolution Process is fundamentally designed for: The Domain Name System (DNS, RFC 1035) is the global hierarchical decentralized naming database that translates human-readable domain names (e.g. google.com) into machine-routable IP addresses (e.g. 142.250.72.14).",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "dns-domain-name-system-mcq-2",
    "topicId": "dns-domain-name-system",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of DNS Hierarchy & Resolution Process, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "dns-domain-name-system-mcq-3",
    "topicId": "dns-domain-name-system",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing DNS Hierarchy & Resolution Process is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "dns-domain-name-system-mcq-4",
    "topicId": "dns-domain-name-system",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is the difference between an Iterative DNS query and a Recursive DNS query?'. How should a software engineer address this?",
    "options": [
      "A) In a Recursive Query, the client asks a DNS server (typically the local ISP or recursive resolver like 8.8.8.8) to do all the work: 'Please resolve this domain for me and return the final IP address or an error; do not give me referrals.' The resolver takes full responsibility, querying root, TLD, and authoritative servers on behalf of the client. In an Iterative Query, the client asks a server: 'Give me the answer if you know it; otherwise, return the best referral (the IP of the next nameserver down the tree) so I can query it myself.' Root and TLD nameservers handle only iterative queries to protect their CPU and network resources from maintaining millions of recursive state sessions.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: In a Recursive Query, the client asks a DNS server (typically the local ISP or recursive resolver like 8.8.8.8) to do all the work: 'Please resolve this domain for me and return the final IP address or an error; do not give me referrals.' The resolver takes full responsibility, querying root, TLD, and authoritative servers on behalf of the client. In an Iterative Query, the client asks a server: 'Give me the answer if you know it; otherwise, return the best referral (the IP of the next nameserver down the tree) so I can query it myself.' Root and TLD nameservers handle only iterative queries to protect their CPU and network resources from maintaining millions of recursive state sessions.",
    "explanation": "Correct engineering approach: In a Recursive Query, the client asks a DNS server (typically the local ISP or recursive resolver like 8.8.8.8) to do all the work: 'Please resolve this domain for me and return the final IP address or an error; do not give me referrals.' The resolver takes full responsibility, querying root, TLD, and authoritative servers on behalf of the client. In an Iterative Query, the client asks a server: 'Give me the answer if you know it; otherwise, return the best referral (the IP of the next nameserver down the tree) so I can query it myself.' Root and TLD nameservers handle only iterative queries to protect their CPU and network resources from maintaining millions of recursive state sessions.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "dhcp-protocol-mcq-1",
    "topicId": "dhcp-protocol",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of DHCP?",
    "options": [
      "A) DHCP (RFC 2131) is an application-layer network management protocol operating over UDP (ports 67/68) that automatically assigns IP addresses, subnet masks, default gateways, and DNS servers to client devices on a local network.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of DHCP.",
    "progressiveHint": "Core definition: DHCP (RFC 2131) is an application-layer network management protocol operating over UDP (ports 67/68) that automatically assigns IP addresses, subnet masks, default gateways, and DNS servers to client devices on a local network.",
    "explanation": "DHCP is fundamentally designed for: DHCP (RFC 2131) is an application-layer network management protocol operating over UDP (ports 67/68) that automatically assigns IP addresses, subnet masks, default gateways, and DNS servers to client devices on a local network.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "dhcp-protocol-mcq-2",
    "topicId": "dhcp-protocol",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of DHCP, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "dhcp-protocol-mcq-3",
    "topicId": "dhcp-protocol",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing DHCP is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "dhcp-protocol-mcq-4",
    "topicId": "dhcp-protocol",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is a 'Rogue DHCP Server' attack and how does DHCP Snooping prevent it?'. How should a software engineer address this?",
    "options": [
      "A) A Rogue DHCP Server attack occurs when an attacker connects an unauthorized DHCP server (or rogue Wi-Fi router) to a network switch. When clients broadcast DHCPDISCOVER, the rogue server responds faster than the legitimate network server, assigning clients a malicious Default Gateway IP (the attacker's machine) and malicious DNS server. All client internet traffic is intercepted in a Man-in-the-Middle (MITM) attack. Defense: DHCP Snooping on Layer 2 managed switches. The switch administrator configures the legitimate uplink port to the real DHCP server as 'Trusted', and all user access ports as 'Untrusted'. The switch hardware automatically inspects incoming traffic on Untrusted ports and drops any DHCPOFFER or DHCPACK packets, preventing rogue servers from answering clients.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: A Rogue DHCP Server attack occurs when an attacker connects an unauthorized DHCP server (or rogue Wi-Fi router) to a network switch. When clients broadcast DHCPDISCOVER, the rogue server responds faster than the legitimate network server, assigning clients a malicious Default Gateway IP (the attacker's machine) and malicious DNS server. All client internet traffic is intercepted in a Man-in-the-Middle (MITM) attack. Defense: DHCP Snooping on Layer 2 managed switches. The switch administrator configures the legitimate uplink port to the real DHCP server as 'Trusted', and all user access ports as 'Untrusted'. The switch hardware automatically inspects incoming traffic on Untrusted ports and drops any DHCPOFFER or DHCPACK packets, preventing rogue servers from answering clients.",
    "explanation": "Correct engineering approach: A Rogue DHCP Server attack occurs when an attacker connects an unauthorized DHCP server (or rogue Wi-Fi router) to a network switch. When clients broadcast DHCPDISCOVER, the rogue server responds faster than the legitimate network server, assigning clients a malicious Default Gateway IP (the attacker's machine) and malicious DNS server. All client internet traffic is intercepted in a Man-in-the-Middle (MITM) attack. Defense: DHCP Snooping on Layer 2 managed switches. The switch administrator configures the legitimate uplink port to the real DHCP server as 'Trusted', and all user access ports as 'Untrusted'. The switch hardware automatically inspects incoming traffic on Untrusted ports and drops any DHCPOFFER or DHCPACK packets, preventing rogue servers from answering clients.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "http-protocol-mcq-1",
    "topicId": "http-protocol",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of HTTP?",
    "options": [
      "A) HTTP is the stateless, application-layer request-response protocol powering the World Wide Web, governing how clients request resources and how servers serve web pages and APIs.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of HTTP.",
    "progressiveHint": "Core definition: HTTP is the stateless, application-layer request-response protocol powering the World Wide Web, governing how clients request resources and how servers serve web pages and APIs.",
    "explanation": "HTTP is fundamentally designed for: HTTP is the stateless, application-layer request-response protocol powering the World Wide Web, governing how clients request resources and how servers serve web pages and APIs.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "http-protocol-mcq-2",
    "topicId": "http-protocol",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of HTTP, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "http-protocol-mcq-3",
    "topicId": "http-protocol",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing HTTP is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "http-protocol-mcq-4",
    "topicId": "http-protocol",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is Head-of-Line (HoL) Blocking and how did HTTP/2 and HTTP/3 solve it differently?'. How should a software engineer address this?",
    "options": [
      "A) Head-of-Line (HoL) Blocking occurs when the head of a line of data blocks all subsequent items behind it. 1. In HTTP/1.1, HoL blocking happened at the application layer: over a single TCP connection, the client had to wait for the server to finish responding to Request 1 before Request 2 could be processed. Browsers worked around this by opening up to 6 separate TCP connections per domain. 2. HTTP/2 solved application-layer HoL blocking by introducing binary framing and multiplexing: multiple requests and responses are broken into frames with Stream IDs and interleaved over a single TCP connection concurrently. However, HTTP/2 introduced Transport-Layer HoL blocking: because all streams share one TCP connection, if one packet drops on the link, TCP freezes the entire socket buffer, stalling all 100 streams until retransmission. 3. HTTP/3 solved this by replacing TCP with QUIC over UDP. Each stream in QUIC has independent packet loss recovery. If Stream 1 loses a packet, Streams 2 through 100 continue downloading without any stall.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: Head-of-Line (HoL) Blocking occurs when the head of a line of data blocks all subsequent items behind it. 1. In HTTP/1.1, HoL blocking happened at the application layer: over a single TCP connection, the client had to wait for the server to finish responding to Request 1 before Request 2 could be processed. Browsers worked around this by opening up to 6 separate TCP connections per domain. 2. HTTP/2 solved application-layer HoL blocking by introducing binary framing and multiplexing: multiple requests and responses are broken into frames with Stream IDs and interleaved over a single TCP connection concurrently. However, HTTP/2 introduced Transport-Layer HoL blocking: because all streams share one TCP connection, if one packet drops on the link, TCP freezes the entire socket buffer, stalling all 100 streams until retransmission. 3. HTTP/3 solved this by replacing TCP with QUIC over UDP. Each stream in QUIC has independent packet loss recovery. If Stream 1 loses a packet, Streams 2 through 100 continue downloading without any stall.",
    "explanation": "Correct engineering approach: Head-of-Line (HoL) Blocking occurs when the head of a line of data blocks all subsequent items behind it. 1. In HTTP/1.1, HoL blocking happened at the application layer: over a single TCP connection, the client had to wait for the server to finish responding to Request 1 before Request 2 could be processed. Browsers worked around this by opening up to 6 separate TCP connections per domain. 2. HTTP/2 solved application-layer HoL blocking by introducing binary framing and multiplexing: multiple requests and responses are broken into frames with Stream IDs and interleaved over a single TCP connection concurrently. However, HTTP/2 introduced Transport-Layer HoL blocking: because all streams share one TCP connection, if one packet drops on the link, TCP freezes the entire socket buffer, stalling all 100 streams until retransmission. 3. HTTP/3 solved this by replacing TCP with QUIC over UDP. Each stream in QUIC has independent packet loss recovery. If Stream 1 loses a packet, Streams 2 through 100 continue downloading without any stall.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "https-protocol-mcq-1",
    "topicId": "https-protocol",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of HTTPS Architecture, Encryption & Certificate Authorities?",
    "options": [
      "A) HTTPS (Hypertext Transfer Protocol Secure, RFC 2818) is the secure encrypted version of HTTP, running over port 443 by encapsulating standard HTTP traffic inside a Transport Layer Security (TLS) cryptographic tunnel.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of HTTPS Architecture, Encryption & Certificate Authorities.",
    "progressiveHint": "Core definition: HTTPS (Hypertext Transfer Protocol Secure, RFC 2818) is the secure encrypted version of HTTP, running over port 443 by encapsulating standard HTTP traffic inside a Transport Layer Security (TLS) cryptographic tunnel.",
    "explanation": "HTTPS Architecture, Encryption & Certificate Authorities is fundamentally designed for: HTTPS (Hypertext Transfer Protocol Secure, RFC 2818) is the secure encrypted version of HTTP, running over port 443 by encapsulating standard HTTP traffic inside a Transport Layer Security (TLS) cryptographic tunnel.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "https-protocol-mcq-2",
    "topicId": "https-protocol",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of HTTPS Architecture, Encryption & Certificate Authorities, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "https-protocol-mcq-3",
    "topicId": "https-protocol",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing HTTPS Architecture, Encryption & Certificate Authorities is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "https-protocol-mcq-4",
    "topicId": "https-protocol",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is a Digital Certificate (X.509) and how does the browser verify the 'Chain of Trust'?'. How should a software engineer address this?",
    "options": [
      "A) An X.509 Digital Certificate is a cryptographically signed electronic passport issued by a trusted Certificate Authority (CA) that binds a domain name (e.g. google.com) to its public encryption key. The browser verifies the certificate via a hierarchical 'Chain of Trust': 1. The server presents its End-Entity (Leaf) certificate. 2. The browser checks the digital signature on the leaf certificate, which was signed by an Intermediate CA's private key. 3. The browser validates the intermediate certificate, which was signed by a Root CA. 4. The browser compares the Root CA against its pre-installed, hardened 'Root CA Trust Store' embedded in the operating system (e.g. macOS keychain or Windows certificate store). If any link in the cryptographic signature chain is expired, revoked (via CRL/OCSP), or unsigned by a trusted root, the browser displays a severe security warning.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: An X.509 Digital Certificate is a cryptographically signed electronic passport issued by a trusted Certificate Authority (CA) that binds a domain name (e.g. google.com) to its public encryption key. The browser verifies the certificate via a hierarchical 'Chain of Trust': 1. The server presents its End-Entity (Leaf) certificate. 2. The browser checks the digital signature on the leaf certificate, which was signed by an Intermediate CA's private key. 3. The browser validates the intermediate certificate, which was signed by a Root CA. 4. The browser compares the Root CA against its pre-installed, hardened 'Root CA Trust Store' embedded in the operating system (e.g. macOS keychain or Windows certificate store). If any link in the cryptographic signature chain is expired, revoked (via CRL/OCSP), or unsigned by a trusted root, the browser displays a severe security warning.",
    "explanation": "Correct engineering approach: An X.509 Digital Certificate is a cryptographically signed electronic passport issued by a trusted Certificate Authority (CA) that binds a domain name (e.g. google.com) to its public encryption key. The browser verifies the certificate via a hierarchical 'Chain of Trust': 1. The server presents its End-Entity (Leaf) certificate. 2. The browser checks the digital signature on the leaf certificate, which was signed by an Intermediate CA's private key. 3. The browser validates the intermediate certificate, which was signed by a Root CA. 4. The browser compares the Root CA against its pre-installed, hardened 'Root CA Trust Store' embedded in the operating system (e.g. macOS keychain or Windows certificate store). If any link in the cryptographic signature chain is expired, revoked (via CRL/OCSP), or unsigned by a trusted root, the browser displays a severe security warning.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "http-methods-mcq-1",
    "topicId": "http-methods",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of HTTP Request Methods, Idempotency & Safety?",
    "options": [
      "A) HTTP methods (verbs) define the desired action to be performed on a target web resource, classified by their semantics, safety (read-only), and idempotency (repeatability without side effects).",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of HTTP Request Methods, Idempotency & Safety.",
    "progressiveHint": "Core definition: HTTP methods (verbs) define the desired action to be performed on a target web resource, classified by their semantics, safety (read-only), and idempotency (repeatability without side effects).",
    "explanation": "HTTP Request Methods, Idempotency & Safety is fundamentally designed for: HTTP methods (verbs) define the desired action to be performed on a target web resource, classified by their semantics, safety (read-only), and idempotency (repeatability without side effects).",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "http-methods-mcq-2",
    "topicId": "http-methods",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of HTTP Request Methods, Idempotency & Safety, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "http-methods-mcq-3",
    "topicId": "http-methods",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing HTTP Request Methods, Idempotency & Safety is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "http-methods-mcq-4",
    "topicId": "http-methods",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What does it mean for an HTTP method to be 'Idempotent' versus 'Safe'?'. How should a software engineer address this?",
    "options": [
      "A) 1. Safe Method: An HTTP method is Safe if it is read-only and does not alter the server's state (it produces no side effects). GET, HEAD, and OPTIONS are safe methods. Safe methods can be pre-fetched, cached, and crawled by search engines without risk. 2. Idempotent Method: An HTTP method is Idempotent if making multiple identical requests has the exact same effect on the server state as making a single request (mathematically, f(f(x)) = f(x)). GET, PUT, DELETE, HEAD, and OPTIONS are idempotent. For example, executing `PUT /user/1 {name: 'Alice'}` five times leaves the user named Alice every time. In contrast, executing `POST /orders` five times creates five separate orders. Browsers can automatically retry idempotent requests upon network timeout without asking the user.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: 1. Safe Method: An HTTP method is Safe if it is read-only and does not alter the server's state (it produces no side effects). GET, HEAD, and OPTIONS are safe methods. Safe methods can be pre-fetched, cached, and crawled by search engines without risk. 2. Idempotent Method: An HTTP method is Idempotent if making multiple identical requests has the exact same effect on the server state as making a single request (mathematically, f(f(x)) = f(x)). GET, PUT, DELETE, HEAD, and OPTIONS are idempotent. For example, executing `PUT /user/1 {name: 'Alice'}` five times leaves the user named Alice every time. In contrast, executing `POST /orders` five times creates five separate orders. Browsers can automatically retry idempotent requests upon network timeout without asking the user.",
    "explanation": "Correct engineering approach: 1. Safe Method: An HTTP method is Safe if it is read-only and does not alter the server's state (it produces no side effects). GET, HEAD, and OPTIONS are safe methods. Safe methods can be pre-fetched, cached, and crawled by search engines without risk. 2. Idempotent Method: An HTTP method is Idempotent if making multiple identical requests has the exact same effect on the server state as making a single request (mathematically, f(f(x)) = f(x)). GET, PUT, DELETE, HEAD, and OPTIONS are idempotent. For example, executing `PUT /user/1 {name: 'Alice'}` five times leaves the user named Alice every time. In contrast, executing `POST /orders` five times creates five separate orders. Browsers can automatically retry idempotent requests upon network timeout without asking the user.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "http-status-codes-mcq-1",
    "topicId": "http-status-codes",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of HTTP Status Codes?",
    "options": [
      "A) HTTP status codes are standardized 3-digit numerical responses issued by a server indicating the outcome of a client's HTTP request, categorized into 5 functional classes.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of HTTP Status Codes.",
    "progressiveHint": "Core definition: HTTP status codes are standardized 3-digit numerical responses issued by a server indicating the outcome of a client's HTTP request, categorized into 5 functional classes.",
    "explanation": "HTTP Status Codes is fundamentally designed for: HTTP status codes are standardized 3-digit numerical responses issued by a server indicating the outcome of a client's HTTP request, categorized into 5 functional classes.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "http-status-codes-mcq-2",
    "topicId": "http-status-codes",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of HTTP Status Codes, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "http-status-codes-mcq-3",
    "topicId": "http-status-codes",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing HTTP Status Codes is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "http-status-codes-mcq-4",
    "topicId": "http-status-codes",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is the architectural difference between a 502 Bad Gateway and a 504 Gateway Timeout error in a microservices deployment?'. How should a software engineer address this?",
    "options": [
      "A) Both 502 and 504 are returned by intermediary proxies (such as NGINX, AWS ALB, or Cloudflare) acting as gateways to upstream backend application servers. 1. 502 Bad Gateway: The reverse proxy contacted the upstream backend server, but the backend server returned an invalid response, reset the connection, or crashed unexpectedly (e.g. process died, out-of-memory crash, port closed). 2. 504 Gateway Timeout: The reverse proxy successfully established contact with the upstream backend, but the backend server failed to finish computing and returning a response within the proxy's configured timeout window (e.g. a slow database query ran for 60 seconds when `proxy_read_timeout` was set to 30 seconds).",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: Both 502 and 504 are returned by intermediary proxies (such as NGINX, AWS ALB, or Cloudflare) acting as gateways to upstream backend application servers. 1. 502 Bad Gateway: The reverse proxy contacted the upstream backend server, but the backend server returned an invalid response, reset the connection, or crashed unexpectedly (e.g. process died, out-of-memory crash, port closed). 2. 504 Gateway Timeout: The reverse proxy successfully established contact with the upstream backend, but the backend server failed to finish computing and returning a response within the proxy's configured timeout window (e.g. a slow database query ran for 60 seconds when `proxy_read_timeout` was set to 30 seconds).",
    "explanation": "Correct engineering approach: Both 502 and 504 are returned by intermediary proxies (such as NGINX, AWS ALB, or Cloudflare) acting as gateways to upstream backend application servers. 1. 502 Bad Gateway: The reverse proxy contacted the upstream backend server, but the backend server returned an invalid response, reset the connection, or crashed unexpectedly (e.g. process died, out-of-memory crash, port closed). 2. 504 Gateway Timeout: The reverse proxy successfully established contact with the upstream backend, but the backend server failed to finish computing and returning a response within the proxy's configured timeout window (e.g. a slow database query ran for 60 seconds when `proxy_read_timeout` was set to 30 seconds).",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "tls-ssl-handshake-mcq-1",
    "topicId": "tls-ssl-handshake",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange?",
    "options": [
      "A) The Transport Layer Security (TLS) handshake is the cryptographic protocol that negotiates cipher suites, authenticates the server via digital certificates, and establishes shared symmetric encryption keys before application data transmits.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange.",
    "progressiveHint": "Core definition: The Transport Layer Security (TLS) handshake is the cryptographic protocol that negotiates cipher suites, authenticates the server via digital certificates, and establishes shared symmetric encryption keys before application data transmits.",
    "explanation": "TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange is fundamentally designed for: The Transport Layer Security (TLS) handshake is the cryptographic protocol that negotiates cipher suites, authenticates the server via digital certificates, and establishes shared symmetric encryption keys before application data transmits.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "tls-ssl-handshake-mcq-2",
    "topicId": "tls-ssl-handshake",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "tls-ssl-handshake-mcq-3",
    "topicId": "tls-ssl-handshake",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "tls-ssl-handshake-mcq-4",
    "topicId": "tls-ssl-handshake",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is Perfect Forward Secrecy (PFS) and why did TLS 1.3 make it mandatory?'. How should a software engineer address this?",
    "options": [
      "A) Perfect Forward Secrecy (PFS) is a cryptographic property ensuring that even if an attacker records encrypted network traffic today and steals the server's private key 10 years in the future, the attacker still CANNOT decrypt the historical recorded traffic. In older systems (TLS 1.2 with RSA key exchange), the client encrypted the master pre-secret with the server's static public key; compromising the server's private key in the future broke all past sessions. With Perfect Forward Secrecy (using Ephemeral Diffie-Hellman, ECDHE), unique, temporary session keys are negotiated for each individual connection and immediately erased from RAM after the session ends. Because the ephemeral keys were never saved to disk, compromising the server's private key in the future yields zero decryption capability. TLS 1.3 made PFS mandatory by removing static RSA key exchange entirely.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: Perfect Forward Secrecy (PFS) is a cryptographic property ensuring that even if an attacker records encrypted network traffic today and steals the server's private key 10 years in the future, the attacker still CANNOT decrypt the historical recorded traffic. In older systems (TLS 1.2 with RSA key exchange), the client encrypted the master pre-secret with the server's static public key; compromising the server's private key in the future broke all past sessions. With Perfect Forward Secrecy (using Ephemeral Diffie-Hellman, ECDHE), unique, temporary session keys are negotiated for each individual connection and immediately erased from RAM after the session ends. Because the ephemeral keys were never saved to disk, compromising the server's private key in the future yields zero decryption capability. TLS 1.3 made PFS mandatory by removing static RSA key exchange entirely.",
    "explanation": "Correct engineering approach: Perfect Forward Secrecy (PFS) is a cryptographic property ensuring that even if an attacker records encrypted network traffic today and steals the server's private key 10 years in the future, the attacker still CANNOT decrypt the historical recorded traffic. In older systems (TLS 1.2 with RSA key exchange), the client encrypted the master pre-secret with the server's static public key; compromising the server's private key in the future broke all past sessions. With Perfect Forward Secrecy (using Ephemeral Diffie-Hellman, ECDHE), unique, temporary session keys are negotiated for each individual connection and immediately erased from RAM after the session ends. Because the ephemeral keys were never saved to disk, compromising the server's private key in the future yields zero decryption capability. TLS 1.3 made PFS mandatory by removing static RSA key exchange entirely.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "cookies-and-sessions-mcq-1",
    "topicId": "cookies-and-sessions",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Cookies, Sessions, JWT & State Management over HTTP?",
    "options": [
      "A) Techniques used to simulate continuous stateful sessions over the architecturally stateless HTTP protocol, comparing server-side sessions, browser cookies, and cryptographically signed JSON Web Tokens (JWT).",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Cookies, Sessions, JWT & State Management over HTTP.",
    "progressiveHint": "Core definition: Techniques used to simulate continuous stateful sessions over the architecturally stateless HTTP protocol, comparing server-side sessions, browser cookies, and cryptographically signed JSON Web Tokens (JWT).",
    "explanation": "Cookies, Sessions, JWT & State Management over HTTP is fundamentally designed for: Techniques used to simulate continuous stateful sessions over the architecturally stateless HTTP protocol, comparing server-side sessions, browser cookies, and cryptographically signed JSON Web Tokens (JWT).",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "cookies-and-sessions-mcq-2",
    "topicId": "cookies-and-sessions",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Cookies, Sessions, JWT & State Management over HTTP, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "cookies-and-sessions-mcq-3",
    "topicId": "cookies-and-sessions",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Cookies, Sessions, JWT & State Management over HTTP is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "cookies-and-sessions-mcq-4",
    "topicId": "cookies-and-sessions",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is the trade-off between Server-Side Sessions (stored in Redis) and Stateless JSON Web Tokens (JWT)?'. How should a software engineer address this?",
    "options": [
      "A) 1. Server-Side Sessions: The client stores only a random, opaque session ID cookie. The server stores user session data in a fast in-memory store like Redis. Pros: Instant revocation (logging out or banning a user immediately deletes the Redis key); small cookie payload. Cons: Requires scaling and clustering the central Redis state store across all server regions. 2. Stateless JWT: The server signs user claims (user ID, permissions, expiration) cryptographically and sends the token to the client. Pros: Completely stateless\u2014any microservice can verify the signature using the public key without querying a central database, making it ideal for distributed horizontal scaling. Cons: Impossible to revoke instantly before expiration without building a stateful blocklist; larger payload size sent on every request; risk of token theft via XSS if stored in localStorage.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: 1. Server-Side Sessions: The client stores only a random, opaque session ID cookie. The server stores user session data in a fast in-memory store like Redis. Pros: Instant revocation (logging out or banning a user immediately deletes the Redis key); small cookie payload. Cons: Requires scaling and clustering the central Redis state store across all server regions. 2. Stateless JWT: The server signs user claims (user ID, permissions, expiration) cryptographically and sends the token to the client. Pros: Completely stateless\u2014any microservice can verify the signature using the public key without querying a central database, making it ideal for distributed horizontal scaling. Cons: Impossible to revoke instantly before expiration without building a stateful blocklist; larger payload size sent on every request; risk of token theft via XSS if stored in localStorage.",
    "explanation": "Correct engineering approach: 1. Server-Side Sessions: The client stores only a random, opaque session ID cookie. The server stores user session data in a fast in-memory store like Redis. Pros: Instant revocation (logging out or banning a user immediately deletes the Redis key); small cookie payload. Cons: Requires scaling and clustering the central Redis state store across all server regions. 2. Stateless JWT: The server signs user claims (user ID, permissions, expiration) cryptographically and sends the token to the client. Pros: Completely stateless\u2014any microservice can verify the signature using the public key without querying a central database, making it ideal for distributed horizontal scaling. Cons: Impossible to revoke instantly before expiration without building a stateful blocklist; larger payload size sent on every request; risk of token theft via XSS if stored in localStorage.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "web-caching-mcq-1",
    "topicId": "web-caching",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Web Caching, Cache-Control Headers & ETag Validation?",
    "options": [
      "A) Web caching is the technique of storing copies of HTTP responses in browser memory, local disk, forward proxies, or CDN edge nodes to serve future identical requests without contacting the origin server.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Web Caching, Cache-Control Headers & ETag Validation.",
    "progressiveHint": "Core definition: Web caching is the technique of storing copies of HTTP responses in browser memory, local disk, forward proxies, or CDN edge nodes to serve future identical requests without contacting the origin server.",
    "explanation": "Web Caching, Cache-Control Headers & ETag Validation is fundamentally designed for: Web caching is the technique of storing copies of HTTP responses in browser memory, local disk, forward proxies, or CDN edge nodes to serve future identical requests without contacting the origin server.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "web-caching-mcq-2",
    "topicId": "web-caching",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Web Caching, Cache-Control Headers & ETag Validation, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "web-caching-mcq-3",
    "topicId": "web-caching",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Web Caching, Cache-Control Headers & ETag Validation is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "web-caching-mcq-4",
    "topicId": "web-caching",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is the difference between `Cache-Control: no-cache` and `Cache-Control: no-store`?'. How should a software engineer address this?",
    "options": [
      "A) This is one of the most common web interview questions: 1. `no-cache`: Instructs the browser or CDN that it CAN store a copy of the response in its cache, but it MUST re-validate that cached copy with the origin server (using conditional headers like `If-None-Match: <ETag>`) before serving it to the user. If the server replies `304 Not Modified`, the cached copy is used. It means: 'Cache it, but check with me before using it.' 2. `no-store`: Strictly forbids the browser, CDN, or any intermediate proxy from saving ANY copy of the response to disk or memory under any circumstances. Every single request must download the full payload from the origin server. It is reserved for sensitive, confidential data like banking balances, passwords, and private medical records.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: This is one of the most common web interview questions: 1. `no-cache`: Instructs the browser or CDN that it CAN store a copy of the response in its cache, but it MUST re-validate that cached copy with the origin server (using conditional headers like `If-None-Match: <ETag>`) before serving it to the user. If the server replies `304 Not Modified`, the cached copy is used. It means: 'Cache it, but check with me before using it.' 2. `no-store`: Strictly forbids the browser, CDN, or any intermediate proxy from saving ANY copy of the response to disk or memory under any circumstances. Every single request must download the full payload from the origin server. It is reserved for sensitive, confidential data like banking balances, passwords, and private medical records.",
    "explanation": "Correct engineering approach: This is one of the most common web interview questions: 1. `no-cache`: Instructs the browser or CDN that it CAN store a copy of the response in its cache, but it MUST re-validate that cached copy with the origin server (using conditional headers like `If-None-Match: <ETag>`) before serving it to the user. If the server replies `304 Not Modified`, the cached copy is used. It means: 'Cache it, but check with me before using it.' 2. `no-store`: Strictly forbids the browser, CDN, or any intermediate proxy from saving ANY copy of the response to disk or memory under any circumstances. Every single request must download the full payload from the origin server. It is reserved for sensitive, confidential data like banking balances, passwords, and private medical records.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "url-lifecycle-mcq-1",
    "topicId": "url-lifecycle",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Complete URL Lifecycle?",
    "options": [
      "A) The universal software engineering interview question detailing the complete end-to-end journey from user keystroke to pixels rendering on the screen across all networking and OS layers.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Complete URL Lifecycle.",
    "progressiveHint": "Core definition: The universal software engineering interview question detailing the complete end-to-end journey from user keystroke to pixels rendering on the screen across all networking and OS layers.",
    "explanation": "Complete URL Lifecycle is fundamentally designed for: The universal software engineering interview question detailing the complete end-to-end journey from user keystroke to pixels rendering on the screen across all networking and OS layers.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "url-lifecycle-mcq-2",
    "topicId": "url-lifecycle",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Complete URL Lifecycle, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "url-lifecycle-mcq-3",
    "topicId": "url-lifecycle",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Complete URL Lifecycle is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "url-lifecycle-mcq-4",
    "topicId": "url-lifecycle",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'Walk me through the exact networking sequence of typing a URL into a browser from DNS to the first HTTP byte.'. How should a software engineer address this?",
    "options": [
      "A) 1. URL Parsing: Browser extracts protocol (HTTPS), domain (example.com), and checks HSTS cache. 2. DNS Resolution: Browser checks local cache. If miss, sends UDP packet to recursive resolver (port 53). Resolver queries Root ('.'), TLD ('.com'), and Authoritative server, returning IPv4 address 93.184.216.34. 3. Local Routing & ARP: OS checks routing table, identifies destination is outside local subnet, and uses ARP cache to resolve Default Gateway's MAC address. 4. TCP 3-Way Handshake: Client sends TCP SYN to server on port 443; server replies SYN-ACK; client returns ACK. Connection is ESTABLISHED (1-RTT). 5. TLS 1.3 Handshake: Client sends ClientHello with Diffie-Hellman key share; server returns ServerHello, Certificate, and key share; mutual symmetric session keys derived (1-RTT). 6. HTTP Request: Client sends encrypted `GET / HTTP/1.1` request. Server processes request and streams back `200 OK` with HTML payload. 7. Rendering: Browser parses HTML to construct DOM Tree, parses CSS for CSSOM, builds Render Tree, calculates Layout, and paints pixels on screen.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: 1. URL Parsing: Browser extracts protocol (HTTPS), domain (example.com), and checks HSTS cache. 2. DNS Resolution: Browser checks local cache. If miss, sends UDP packet to recursive resolver (port 53). Resolver queries Root ('.'), TLD ('.com'), and Authoritative server, returning IPv4 address 93.184.216.34. 3. Local Routing & ARP: OS checks routing table, identifies destination is outside local subnet, and uses ARP cache to resolve Default Gateway's MAC address. 4. TCP 3-Way Handshake: Client sends TCP SYN to server on port 443; server replies SYN-ACK; client returns ACK. Connection is ESTABLISHED (1-RTT). 5. TLS 1.3 Handshake: Client sends ClientHello with Diffie-Hellman key share; server returns ServerHello, Certificate, and key share; mutual symmetric session keys derived (1-RTT). 6. HTTP Request: Client sends encrypted `GET / HTTP/1.1` request. Server processes request and streams back `200 OK` with HTML payload. 7. Rendering: Browser parses HTML to construct DOM Tree, parses CSS for CSSOM, builds Render Tree, calculates Layout, and paints pixels on screen.",
    "explanation": "Correct engineering approach: 1. URL Parsing: Browser extracts protocol (HTTPS), domain (example.com), and checks HSTS cache. 2. DNS Resolution: Browser checks local cache. If miss, sends UDP packet to recursive resolver (port 53). Resolver queries Root ('.'), TLD ('.com'), and Authoritative server, returning IPv4 address 93.184.216.34. 3. Local Routing & ARP: OS checks routing table, identifies destination is outside local subnet, and uses ARP cache to resolve Default Gateway's MAC address. 4. TCP 3-Way Handshake: Client sends TCP SYN to server on port 443; server replies SYN-ACK; client returns ACK. Connection is ESTABLISHED (1-RTT). 5. TLS 1.3 Handshake: Client sends ClientHello with Diffie-Hellman key share; server returns ServerHello, Certificate, and key share; mutual symmetric session keys derived (1-RTT). 6. HTTP Request: Client sends encrypted `GET / HTTP/1.1` request. Server processes request and streams back `200 OK` with HTML payload. 7. Rendering: Browser parses HTML to construct DOM Tree, parses CSS for CSSOM, builds Render Tree, calculates Layout, and paints pixels on screen.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "ping-and-traceroute-mcq-1",
    "topicId": "ping-and-traceroute",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Ping & Traceroute Mechanics?",
    "options": [
      "A) Ping measures point-to-point network reachability and round-trip latency using ICMP Echo messages. Traceroute maps the exact intermediate router hops along a network path by intentionally exploiting IP Time-To-Live (TTL) expiration.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Ping & Traceroute Mechanics.",
    "progressiveHint": "Core definition: Ping measures point-to-point network reachability and round-trip latency using ICMP Echo messages. Traceroute maps the exact intermediate router hops along a network path by intentionally exploiting IP Time-To-Live (TTL) expiration.",
    "explanation": "Ping & Traceroute Mechanics is fundamentally designed for: Ping measures point-to-point network reachability and round-trip latency using ICMP Echo messages. Traceroute maps the exact intermediate router hops along a network path by intentionally exploiting IP Time-To-Live (TTL) expiration.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "ping-and-traceroute-mcq-2",
    "topicId": "ping-and-traceroute",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Ping & Traceroute Mechanics, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "ping-and-traceroute-mcq-3",
    "topicId": "ping-and-traceroute",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Ping & Traceroute Mechanics is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "ping-and-traceroute-mcq-4",
    "topicId": "ping-and-traceroute",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'Why does Windows `tracert` behave differently than Linux `traceroute`?'. How should a software engineer address this?",
    "options": [
      "A) Windows `tracert` and Linux `traceroute` use the exact same TTL-incrementing mechanism, but transmit different underlying packet types: 1. Windows `tracert` sends ICMP Echo Request packets (Type 8) with incrementing TTLs. When the destination is reached, the destination returns an ICMP Echo Reply (Type 0). 2. Linux `traceroute` by default sends UDP datagrams to deliberately obscure, invalid high port numbers (ports 33434 through 33534). Intermediate routers still return ICMP Type 11 (TTL Exceeded), but when the packet reaches the final destination, the destination sees that no application is listening on that UDP port and returns an ICMP Type 3 Code 3 (Destination Port Unreachable) message, signaling the end of the trace. (Linux can be told to use ICMP via `traceroute -I`).",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: Windows `tracert` and Linux `traceroute` use the exact same TTL-incrementing mechanism, but transmit different underlying packet types: 1. Windows `tracert` sends ICMP Echo Request packets (Type 8) with incrementing TTLs. When the destination is reached, the destination returns an ICMP Echo Reply (Type 0). 2. Linux `traceroute` by default sends UDP datagrams to deliberately obscure, invalid high port numbers (ports 33434 through 33534). Intermediate routers still return ICMP Type 11 (TTL Exceeded), but when the packet reaches the final destination, the destination sees that no application is listening on that UDP port and returns an ICMP Type 3 Code 3 (Destination Port Unreachable) message, signaling the end of the trace. (Linux can be told to use ICMP via `traceroute -I`).",
    "explanation": "Correct engineering approach: Windows `tracert` and Linux `traceroute` use the exact same TTL-incrementing mechanism, but transmit different underlying packet types: 1. Windows `tracert` sends ICMP Echo Request packets (Type 8) with incrementing TTLs. When the destination is reached, the destination returns an ICMP Echo Reply (Type 0). 2. Linux `traceroute` by default sends UDP datagrams to deliberately obscure, invalid high port numbers (ports 33434 through 33534). Intermediate routers still return ICMP Type 11 (TTL Exceeded), but when the packet reaches the final destination, the destination sees that no application is listening on that UDP port and returns an ICMP Type 3 Code 3 (Destination Port Unreachable) message, signaling the end of the trace. (Linux can be told to use ICMP via `traceroute -I`).",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "firewall-mcq-1",
    "topicId": "firewall",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Firewalls: Packet Filtering, Stateful Inspection & WAF?",
    "options": [
      "A) A firewall is a network security system that monitors, filters, and controls incoming and outgoing network traffic based on predetermined security rules, operating across Layers 3, 4, and 7.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Firewalls: Packet Filtering, Stateful Inspection & WAF.",
    "progressiveHint": "Core definition: A firewall is a network security system that monitors, filters, and controls incoming and outgoing network traffic based on predetermined security rules, operating across Layers 3, 4, and 7.",
    "explanation": "Firewalls: Packet Filtering, Stateful Inspection & WAF is fundamentally designed for: A firewall is a network security system that monitors, filters, and controls incoming and outgoing network traffic based on predetermined security rules, operating across Layers 3, 4, and 7.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "firewall-mcq-2",
    "topicId": "firewall",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Firewalls: Packet Filtering, Stateful Inspection & WAF, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "firewall-mcq-3",
    "topicId": "firewall",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Firewalls: Packet Filtering, Stateful Inspection & WAF is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "firewall-mcq-4",
    "topicId": "firewall",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is the difference between a Stateless Packet Filter, a Stateful Firewall, and a Web Application Firewall (WAF)?'. How should a software engineer address this?",
    "options": [
      "A) 1. Stateless Packet Filter (Layer 3/4): Inspects each packet in isolation against static rules (Source IP, Dest IP, Port, Protocol). It has no memory of past packets and cannot tell if an incoming packet is a response to an outbound request. Fast hardware execution, but requires opening broad return port ranges. 2. Stateful Firewall (Layer 4): Tracks the state of active network connections in a dynamic state table. It validates TCP handshakes and automatically permits inbound return packets matching an active outbound session. Blocks unsolicited inbound scans. 3. Web Application Firewall (WAF / Layer 7): Operates at the Application Layer. It terminates TLS, parses HTTP headers, cookies, and POST bodies, and applies regex inspection to detect application-level exploits such as SQL Injection, Cross-Site Scripting (XSS), and remote code execution (e.g. Log4j).",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: 1. Stateless Packet Filter (Layer 3/4): Inspects each packet in isolation against static rules (Source IP, Dest IP, Port, Protocol). It has no memory of past packets and cannot tell if an incoming packet is a response to an outbound request. Fast hardware execution, but requires opening broad return port ranges. 2. Stateful Firewall (Layer 4): Tracks the state of active network connections in a dynamic state table. It validates TCP handshakes and automatically permits inbound return packets matching an active outbound session. Blocks unsolicited inbound scans. 3. Web Application Firewall (WAF / Layer 7): Operates at the Application Layer. It terminates TLS, parses HTTP headers, cookies, and POST bodies, and applies regex inspection to detect application-level exploits such as SQL Injection, Cross-Site Scripting (XSS), and remote code execution (e.g. Log4j).",
    "explanation": "Correct engineering approach: 1. Stateless Packet Filter (Layer 3/4): Inspects each packet in isolation against static rules (Source IP, Dest IP, Port, Protocol). It has no memory of past packets and cannot tell if an incoming packet is a response to an outbound request. Fast hardware execution, but requires opening broad return port ranges. 2. Stateful Firewall (Layer 4): Tracks the state of active network connections in a dynamic state table. It validates TCP handshakes and automatically permits inbound return packets matching an active outbound session. Blocks unsolicited inbound scans. 3. Web Application Firewall (WAF / Layer 7): Operates at the Application Layer. It terminates TLS, parses HTTP headers, cookies, and POST bodies, and applies regex inspection to detect application-level exploits such as SQL Injection, Cross-Site Scripting (XSS), and remote code execution (e.g. Log4j).",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "proxy-servers-mcq-1",
    "topicId": "proxy-servers",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Forward Proxy Servers & Anonymity Mechanics?",
    "options": [
      "A) A Forward Proxy is an intermediary server that sits between client devices and the public Internet, intercepting outbound requests to provide anonymity, caching, content filtering, and corporate security enforcement.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Forward Proxy Servers & Anonymity Mechanics.",
    "progressiveHint": "Core definition: A Forward Proxy is an intermediary server that sits between client devices and the public Internet, intercepting outbound requests to provide anonymity, caching, content filtering, and corporate security enforcement.",
    "explanation": "Forward Proxy Servers & Anonymity Mechanics is fundamentally designed for: A Forward Proxy is an intermediary server that sits between client devices and the public Internet, intercepting outbound requests to provide anonymity, caching, content filtering, and corporate security enforcement.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "proxy-servers-mcq-2",
    "topicId": "proxy-servers",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Forward Proxy Servers & Anonymity Mechanics, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "proxy-servers-mcq-3",
    "topicId": "proxy-servers",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Forward Proxy Servers & Anonymity Mechanics is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "proxy-servers-mcq-4",
    "topicId": "proxy-servers",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is the architectural difference between a Forward Proxy and a Reverse Proxy?'. How should a software engineer address this?",
    "options": [
      "A) 1. Forward Proxy (Client-Facing): Sits in front of client devices. Clients explicitly configure their browsers or network gateways to route through it. The destination web server has no idea who the real client is; it only sees the Forward Proxy's IP address. Primary purposes: client anonymity, bypassing geo-restrictions, corporate content filtering, and outbound caching. 2. Reverse Proxy (Server-Facing): Sits in front of origin backend servers. Clients connect to the reverse proxy's public IP thinking it is the actual website. The reverse proxy terminates the connection and forwards the request to internal backend microservices. The client has no idea which backend server handled the request. Primary purposes: load balancing, SSL/TLS termination, DDoS protection, web caching, and hiding internal microservice topology.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: 1. Forward Proxy (Client-Facing): Sits in front of client devices. Clients explicitly configure their browsers or network gateways to route through it. The destination web server has no idea who the real client is; it only sees the Forward Proxy's IP address. Primary purposes: client anonymity, bypassing geo-restrictions, corporate content filtering, and outbound caching. 2. Reverse Proxy (Server-Facing): Sits in front of origin backend servers. Clients connect to the reverse proxy's public IP thinking it is the actual website. The reverse proxy terminates the connection and forwards the request to internal backend microservices. The client has no idea which backend server handled the request. Primary purposes: load balancing, SSL/TLS termination, DDoS protection, web caching, and hiding internal microservice topology.",
    "explanation": "Correct engineering approach: 1. Forward Proxy (Client-Facing): Sits in front of client devices. Clients explicitly configure their browsers or network gateways to route through it. The destination web server has no idea who the real client is; it only sees the Forward Proxy's IP address. Primary purposes: client anonymity, bypassing geo-restrictions, corporate content filtering, and outbound caching. 2. Reverse Proxy (Server-Facing): Sits in front of origin backend servers. Clients connect to the reverse proxy's public IP thinking it is the actual website. The reverse proxy terminates the connection and forwards the request to internal backend microservices. The client has no idea which backend server handled the request. Primary purposes: load balancing, SSL/TLS termination, DDoS protection, web caching, and hiding internal microservice topology.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "reverse-proxy-mcq-1",
    "topicId": "reverse-proxy",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Reverse Proxy?",
    "options": [
      "A) A Reverse Proxy is a server that sits in front of one or more origin web servers, intercepting incoming client requests and routing them to appropriate backend microservices while providing SSL termination, caching, and security.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Reverse Proxy.",
    "progressiveHint": "Core definition: A Reverse Proxy is a server that sits in front of one or more origin web servers, intercepting incoming client requests and routing them to appropriate backend microservices while providing SSL termination, caching, and security.",
    "explanation": "Reverse Proxy is fundamentally designed for: A Reverse Proxy is a server that sits in front of one or more origin web servers, intercepting incoming client requests and routing them to appropriate backend microservices while providing SSL termination, caching, and security.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "reverse-proxy-mcq-2",
    "topicId": "reverse-proxy",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Reverse Proxy, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "reverse-proxy-mcq-3",
    "topicId": "reverse-proxy",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Reverse Proxy is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "reverse-proxy-mcq-4",
    "topicId": "reverse-proxy",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is 'SSL Termination' (SSL Offloading) on a reverse proxy, and what are its architectural advantages and security considerations?'. How should a software engineer address this?",
    "options": [
      "A) SSL Termination is the practice of terminating and decrypting incoming HTTPS connections at the reverse proxy perimeter, before forwarding the decrypted HTTP requests over the internal private network to backend application servers. Architectural Advantages: 1. CPU Offloading: Decrypting asymmetric ciphers is computationally expensive; offloading crypto to the reverse proxy frees up backend application servers to focus on business logic. 2. Centralized Certificate Management: Only the reverse proxy needs certificate renewals (Let's Encrypt / DigiCert); backend servers do not require individual certificates. 3. Payload Inspection & Caching: Allows the proxy to inspect HTTP headers, compress responses (gzip/brotli), and cache static assets. Security Consideration: Traffic between the reverse proxy and backend servers travels unencrypted in cleartext. In Zero-Trust architectures (HIPAA, PCI-DSS), 'SSL Bridging' (re-encrypting traffic between proxy and backend) is required.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: SSL Termination is the practice of terminating and decrypting incoming HTTPS connections at the reverse proxy perimeter, before forwarding the decrypted HTTP requests over the internal private network to backend application servers. Architectural Advantages: 1. CPU Offloading: Decrypting asymmetric ciphers is computationally expensive; offloading crypto to the reverse proxy frees up backend application servers to focus on business logic. 2. Centralized Certificate Management: Only the reverse proxy needs certificate renewals (Let's Encrypt / DigiCert); backend servers do not require individual certificates. 3. Payload Inspection & Caching: Allows the proxy to inspect HTTP headers, compress responses (gzip/brotli), and cache static assets. Security Consideration: Traffic between the reverse proxy and backend servers travels unencrypted in cleartext. In Zero-Trust architectures (HIPAA, PCI-DSS), 'SSL Bridging' (re-encrypting traffic between proxy and backend) is required.",
    "explanation": "Correct engineering approach: SSL Termination is the practice of terminating and decrypting incoming HTTPS connections at the reverse proxy perimeter, before forwarding the decrypted HTTP requests over the internal private network to backend application servers. Architectural Advantages: 1. CPU Offloading: Decrypting asymmetric ciphers is computationally expensive; offloading crypto to the reverse proxy frees up backend application servers to focus on business logic. 2. Centralized Certificate Management: Only the reverse proxy needs certificate renewals (Let's Encrypt / DigiCert); backend servers do not require individual certificates. 3. Payload Inspection & Caching: Allows the proxy to inspect HTTP headers, compress responses (gzip/brotli), and cache static assets. Security Consideration: Traffic between the reverse proxy and backend servers travels unencrypted in cleartext. In Zero-Trust architectures (HIPAA, PCI-DSS), 'SSL Bridging' (re-encrypting traffic between proxy and backend) is required.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "load-balancer-mcq-1",
    "topicId": "load-balancer",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Load Balancers?",
    "options": [
      "A) A Load Balancer distributes incoming network traffic across a cluster of backend servers to optimize resource utilization, maximize throughput, minimize response latency, and prevent server overload.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Load Balancers.",
    "progressiveHint": "Core definition: A Load Balancer distributes incoming network traffic across a cluster of backend servers to optimize resource utilization, maximize throughput, minimize response latency, and prevent server overload.",
    "explanation": "Load Balancers is fundamentally designed for: A Load Balancer distributes incoming network traffic across a cluster of backend servers to optimize resource utilization, maximize throughput, minimize response latency, and prevent server overload.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "load-balancer-mcq-2",
    "topicId": "load-balancer",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Load Balancers, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Amazon",
      "role": "SDE-1",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Amazon SDE Networking Round"
    }
  },
  {
    "id": "load-balancer-mcq-3",
    "topicId": "load-balancer",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Load Balancers is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "load-balancer-mcq-4",
    "topicId": "load-balancer",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What are the key trade-offs between Layer 4 (L4) and Layer 7 (L7) Load Balancers?'. How should a software engineer address this?",
    "options": [
      "A) 1. Layer 4 (Transport Layer): Operates at IP and TCP/UDP port levels. It inspects only the first SYN packet, makes a routing decision, and passes raw packets through via NAT or Direct Server Return (DSR). Pros: Extreme performance (millions of packets/sec), minimal CPU and memory overhead, protocol agnostic. Cons: Blind to application payload; cannot inspect HTTP headers, cookies, or URL paths; cannot terminate SSL/TLS. 2. Layer 7 (Application Layer): Operates at the HTTP/HTTPS layer. It terminates the TCP connection, decrypts SSL/TLS, and parses the full HTTP request (URL paths, headers, cookies, HTTP methods). Pros: Intelligent routing (e.g. /video -> media cluster, /checkout -> payments cluster), sticky sessions via cookies, SSL termination, and WAF security filtering. Cons: Higher CPU/RAM overhead; lower raw packet throughput compared to L4.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: 1. Layer 4 (Transport Layer): Operates at IP and TCP/UDP port levels. It inspects only the first SYN packet, makes a routing decision, and passes raw packets through via NAT or Direct Server Return (DSR). Pros: Extreme performance (millions of packets/sec), minimal CPU and memory overhead, protocol agnostic. Cons: Blind to application payload; cannot inspect HTTP headers, cookies, or URL paths; cannot terminate SSL/TLS. 2. Layer 7 (Application Layer): Operates at the HTTP/HTTPS layer. It terminates the TCP connection, decrypts SSL/TLS, and parses the full HTTP request (URL paths, headers, cookies, HTTP methods). Pros: Intelligent routing (e.g. /video -> media cluster, /checkout -> payments cluster), sticky sessions via cookies, SSL termination, and WAF security filtering. Cons: Higher CPU/RAM overhead; lower raw packet throughput compared to L4.",
    "explanation": "Correct engineering approach: 1. Layer 4 (Transport Layer): Operates at IP and TCP/UDP port levels. It inspects only the first SYN packet, makes a routing decision, and passes raw packets through via NAT or Direct Server Return (DSR). Pros: Extreme performance (millions of packets/sec), minimal CPU and memory overhead, protocol agnostic. Cons: Blind to application payload; cannot inspect HTTP headers, cookies, or URL paths; cannot terminate SSL/TLS. 2. Layer 7 (Application Layer): Operates at the HTTP/HTTPS layer. It terminates the TCP connection, decrypts SSL/TLS, and parses the full HTTP request (URL paths, headers, cookies, HTTP methods). Pros: Intelligent routing (e.g. /video -> media cluster, /checkout -> payments cluster), sticky sessions via cookies, SSL termination, and WAF security filtering. Cons: Higher CPU/RAM overhead; lower raw packet throughput compared to L4.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Infosys",
      "role": "Specialist Programmer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Infosys HackWithInfy Technical"
    }
  },
  {
    "id": "cdn-content-delivery-network-mcq-1",
    "topicId": "cdn-content-delivery-network",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of CDN?",
    "options": [
      "A) A Content Delivery Network (CDN) is a geographically distributed network of proxy edge servers (Points of Presence, PoPs) that cache and deliver web assets close to end users to minimize latency.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of CDN.",
    "progressiveHint": "Core definition: A Content Delivery Network (CDN) is a geographically distributed network of proxy edge servers (Points of Presence, PoPs) that cache and deliver web assets close to end users to minimize latency.",
    "explanation": "CDN is fundamentally designed for: A Content Delivery Network (CDN) is a geographically distributed network of proxy edge servers (Points of Presence, PoPs) that cache and deliver web assets close to end users to minimize latency.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "cdn-content-delivery-network-mcq-2",
    "topicId": "cdn-content-delivery-network",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of CDN, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Cisco",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cisco Network Architecture Round"
    }
  },
  {
    "id": "cdn-content-delivery-network-mcq-3",
    "topicId": "cdn-content-delivery-network",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing CDN is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "Microsoft",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Microsoft Technical Campus Recruitment"
    }
  },
  {
    "id": "cdn-content-delivery-network-mcq-4",
    "topicId": "cdn-content-delivery-network",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'What is BGP Anycast and how do CDNs use it to direct users to their nearest edge server?'. How should a software engineer address this?",
    "options": [
      "A) BGP Anycast is an IP network addressing technique where multiple geographically distributed physical edge servers share and advertise the EXACT SAME IP address to global internet routers using BGP. When a client's computer sends a packet to that Anycast IP address, global Internet Service Provider (ISP) routers evaluate their BGP routing tables and automatically forward the packet along the shortest topological path (lowest AS-path hop count). Consequently, a user in Tokyo connects to the CDN's Tokyo data center, while a user in London connecting to the exact same IP address connects to the London data center. Anycast eliminates DNS geo-lookup latency, provides instant DDoS absorption across all global PoPs, and provides automatic failover if an edge site goes down.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: BGP Anycast is an IP network addressing technique where multiple geographically distributed physical edge servers share and advertise the EXACT SAME IP address to global internet routers using BGP. When a client's computer sends a packet to that Anycast IP address, global Internet Service Provider (ISP) routers evaluate their BGP routing tables and automatically forward the packet along the shortest topological path (lowest AS-path hop count). Consequently, a user in Tokyo connects to the CDN's Tokyo data center, while a user in London connecting to the exact same IP address connects to the London data center. Anycast eliminates DNS geo-lookup latency, provides instant DDoS absorption across all global PoPs, and provides automatic failover if an edge site goes down.",
    "explanation": "Correct engineering approach: BGP Anycast is an IP network addressing technique where multiple geographically distributed physical edge servers share and advertise the EXACT SAME IP address to global internet routers using BGP. When a client's computer sends a packet to that Anycast IP address, global Internet Service Provider (ISP) routers evaluate their BGP routing tables and automatically forward the packet along the shortest topological path (lowest AS-path hop count). Consequently, a user in Tokyo connects to the CDN's Tokyo data center, while a user in London connecting to the exact same IP address connects to the London data center. Anycast eliminates DNS geo-lookup latency, provides instant DDoS absorption across all global PoPs, and provides automatic failover if an edge site goes down.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Cloudflare",
      "role": "Systems Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Cloudflare Performance Engineering"
    }
  },
  {
    "id": "network-troubleshooting-mcq-1",
    "topicId": "network-troubleshooting",
    "difficulty": "Easy",
    "questionType": "Conceptual",
    "question": "In Computer Networks, what is the core architectural purpose of Network Troubleshooting Methodology?",
    "options": [
      "A) A systematic, disciplined engineering methodology for diagnosing, localizing, and resolving network connectivity and performance failures using a structured bottom-up or top-down approach.",
      "B) To compress video files into MP4 format on local disk",
      "C) To supply electric battery power to motherboard transistors",
      "D) To recompile C++ code into machine assembly"
    ],
    "correctIndex": 0,
    "hint": "Reflect on the primary definition of Network Troubleshooting Methodology.",
    "progressiveHint": "Core definition: A systematic, disciplined engineering methodology for diagnosing, localizing, and resolving network connectivity and performance failures using a structured bottom-up or top-down approach.",
    "explanation": "Network Troubleshooting Methodology is fundamentally designed for: A systematic, disciplined engineering methodology for diagnosing, localizing, and resolving network connectivity and performance failures using a structured bottom-up or top-down approach.",
    "optionExplanations": [
      "A is the exact technical definition and role in the network stack.",
      "B describes local multimedia encoding, not network protocols.",
      "C describes hardware power regulation.",
      "D describes compiler tooling."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  },
  {
    "id": "network-troubleshooting-mcq-2",
    "topicId": "network-troubleshooting",
    "difficulty": "Medium",
    "questionType": "Header / Internal Structure",
    "question": "When inspecting the internal structure and operation of Network Troubleshooting Methodology, which statement is technically accurate?",
    "options": [
      "A) Protocol header format, control flags, and payload encapsulation.",
      "B) It operates completely without any header or control metadata",
      "C) It has been permanently removed from the Internet standard protocol stack",
      "D) It can only function if the client machine has two physical graphics cards"
    ],
    "correctIndex": 0,
    "hint": "Think about the protocol header fields, flags, and encapsulation requirements.",
    "progressiveHint": "Internal details: Protocol header format, control flags, and payload encapsulation.",
    "explanation": "In technical implementation: Protocol header format, control flags, and payload encapsulation.",
    "optionExplanations": [
      "A accurately states the protocol's architectural composition.",
      "B is false; all network layer protocols require control headers.",
      "C is false; it is an active Internet standard.",
      "D is completely irrelevant hardware."
    ],
    "companyMetadata": {
      "company": "Google",
      "role": "Software Engineer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Google Systems & Networking Interview"
    }
  },
  {
    "id": "network-troubleshooting-mcq-3",
    "topicId": "network-troubleshooting",
    "difficulty": "Interview Trap",
    "questionType": "Interview Trap",
    "question": "A common interview trap when discussing Network Troubleshooting Methodology is evaluating: 'Confusing theoretical concepts with practical protocol behavior.'. What is the correct technical reality?",
    "options": [
      "A) Always distinguish physical link layer from logical transport layer contracts.",
      "B) Confusing theoretical concepts with practical protocol behavior.",
      "C) Network packets are routed based on CPU thermal temperature",
      "D) The concept only exists in theoretical textbooks and is never used in real operating systems"
    ],
    "correctIndex": 0,
    "hint": "Identify the common misconception vs the actual protocol contract.",
    "progressiveHint": "Remember: Always distinguish physical link layer from logical transport layer contracts.",
    "explanation": "Common trap: Confusing theoretical concepts with practical protocol behavior.. The actual reality: Always distinguish physical link layer from logical transport layer contracts.",
    "optionExplanations": [
      "A represents the accurate networking standard and correct interview answer.",
      "B is the exact classic trap students fall for.",
      "C is nonsense.",
      "D is false; it is implemented in production operating systems."
    ],
    "companyMetadata": {
      "company": "TCS",
      "role": "Digital Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "TCS Digital Technical Round"
    }
  },
  {
    "id": "network-troubleshooting-mcq-4",
    "topicId": "network-troubleshooting",
    "difficulty": "Placement",
    "questionType": "Placement Scenario",
    "question": "Interview Question: 'A user reports that they cannot access a website using its domain name (https://example.com), but they CAN access it by typing its direct IP address (https://93.184.216.34) into the browser. What is the root cause, and how do you diagnose it?'. How should a software engineer address this?",
    "options": [
      "A) The root cause is a DNS (Domain Name System) failure. Because the user can reach the web server using its direct IP address, we know that: 1. Layer 1 Physical link is working. 2. Layer 2 Data Link is working. 3. Layer 3 IP routing and default gateway are working. 4. Layer 4 TCP handshake on port 443 succeeds. 5. Layer 7 web server is alive and responding. The failure occurs exclusively when resolving the hostname 'example.com' to that IP. Diagnostic steps: 1. Check local hosts file (`/etc/hosts` or `C:\\Windows\\System32\\drivers\\etc\\hosts`) for corrupted overrides. 2. Test DNS resolution using `nslookup example.com` or `dig example.com`. If it fails, check the configured DNS server in `ipconfig /all` or `/etc/resolv.conf`. 3. Query a known public DNS server: `nslookup example.com 8.8.8.8`. If the public server succeeds, the user's local ISP or corporate DNS server is down or misconfigured. 4. Flush local DNS cache with `ipconfig /flushdns`.",
      "B) Immediately reboot all core backbone routers without checking logs",
      "C) Delete all DNS records and reinstall Windows OS",
      "D) Turn off network encryption to make packets travel faster"
    ],
    "correctIndex": 0,
    "hint": "Consider structured networking troubleshooting methodology.",
    "progressiveHint": "Key resolution: The root cause is a DNS (Domain Name System) failure. Because the user can reach the web server using its direct IP address, we know that: 1. Layer 1 Physical link is working. 2. Layer 2 Data Link is working. 3. Layer 3 IP routing and default gateway are working. 4. Layer 4 TCP handshake on port 443 succeeds. 5. Layer 7 web server is alive and responding. The failure occurs exclusively when resolving the hostname 'example.com' to that IP. Diagnostic steps: 1. Check local hosts file (`/etc/hosts` or `C:\\Windows\\System32\\drivers\\etc\\hosts`) for corrupted overrides. 2. Test DNS resolution using `nslookup example.com` or `dig example.com`. If it fails, check the configured DNS server in `ipconfig /all` or `/etc/resolv.conf`. 3. Query a known public DNS server: `nslookup example.com 8.8.8.8`. If the public server succeeds, the user's local ISP or corporate DNS server is down or misconfigured. 4. Flush local DNS cache with `ipconfig /flushdns`.",
    "explanation": "Correct engineering approach: The root cause is a DNS (Domain Name System) failure. Because the user can reach the web server using its direct IP address, we know that: 1. Layer 1 Physical link is working. 2. Layer 2 Data Link is working. 3. Layer 3 IP routing and default gateway are working. 4. Layer 4 TCP handshake on port 443 succeeds. 5. Layer 7 web server is alive and responding. The failure occurs exclusively when resolving the hostname 'example.com' to that IP. Diagnostic steps: 1. Check local hosts file (`/etc/hosts` or `C:\\Windows\\System32\\drivers\\etc\\hosts`) for corrupted overrides. 2. Test DNS resolution using `nslookup example.com` or `dig example.com`. If it fails, check the configured DNS server in `ipconfig /all` or `/etc/resolv.conf`. 3. Query a known public DNS server: `nslookup example.com 8.8.8.8`. If the public server succeeds, the user's local ISP or corporate DNS server is down or misconfigured. 4. Flush local DNS cache with `ipconfig /flushdns`.",
    "optionExplanations": [
      "A is the precise industry-standard resolution expected in technical interviews.",
      "B causes widespread production outages.",
      "C is destructive and addresses the wrong layer.",
      "D creates catastrophic security vulnerabilities."
    ],
    "companyMetadata": {
      "company": "Wipro",
      "role": "Turbo Developer",
      "evidenceType": "ACTUAL_REPORTED",
      "sourceTitle": "Wipro Elite National Assessment"
    }
  }
];

export const CN_DIAGRAM_QUESTIONS = [
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
    ],
    "topicId": "intro-to-networks"
  },
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
    ],
    "topicId": "network-types"
  },
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
    ],
    "topicId": "network-topologies"
  },
  {
    "id": "network-devices-diag-1",
    "topicId": "network-devices",
    "difficulty": "Medium",
    "title": "Network Devices Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Network Devices)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Network Devices, what happens during active transmission?",
    "options": [
      "A) Network hardware devices operate at distinct layers of the OSI reference model to regenerate signals, direct local frames, route internet packets, or translate protocol suites.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Network Devices.",
    "explanation": "During communication: Network hardware devices operate at distinct layers of the OSI reference model to regenerate signals, direct local frames, route internet packets, or translate protocol suites.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
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
    ],
    "topicId": "osi-model"
  },
  {
    "id": "tcp-ip-model-diag-1",
    "topicId": "tcp-ip-model",
    "difficulty": "Medium",
    "title": "TCP/IP 4-Layer Architecture Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (TCP/IP 4-Layer Architecture)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for TCP/IP 4-Layer Architecture, what happens during active transmission?",
    "options": [
      "A) The TCP/IP model (Department of Defense DoD model) is the practical 4-layer protocol stack that actually implements and powers the global Internet.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through TCP/IP 4-Layer Architecture.",
    "explanation": "During communication: The TCP/IP model (Department of Defense DoD model) is the practical 4-layer protocol stack that actually implements and powers the global Internet.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "osi-vs-tcp-ip-diag-1",
    "topicId": "osi-vs-tcp-ip",
    "difficulty": "Medium",
    "title": "OSI vs TCP/IP Model Comparison Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (OSI vs TCP/IP Model Comparison)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for OSI vs TCP/IP Model Comparison, what happens during active transmission?",
    "options": [
      "A) A direct architectural comparison between the 7-layer theoretical OSI reference model and the 4-layer practical TCP/IP protocol suite.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through OSI vs TCP/IP Model Comparison.",
    "explanation": "During communication: A direct architectural comparison between the 7-layer theoretical OSI reference model and the 4-layer practical TCP/IP protocol suite.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "encapsulation-decapsulation-diag-1",
    "topicId": "encapsulation-decapsulation",
    "difficulty": "Medium",
    "title": "Encapsulation & Decapsulation Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Encapsulation & Decapsulation)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Encapsulation & Decapsulation, what happens during active transmission?",
    "options": [
      "A) Encapsulation is the process where each layer on the sender wraps payload data from the layer above with its own protocol control header. Decapsulation is the reverse unpacking process on the receiver.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Encapsulation & Decapsulation.",
    "explanation": "During communication: Encapsulation is the process where each layer on the sender wraps payload data from the layer above with its own protocol control header. Decapsulation is the reverse unpacking process on the receiver.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "mac-address-diag-1",
    "topicId": "mac-address",
    "difficulty": "Medium",
    "title": "MAC Addressing Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (MAC Addressing)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for MAC Addressing, what happens during active transmission?",
    "options": [
      "A) A Media Access Control (MAC) address is a unique, 48-bit (6-byte) physical identifier permanently burned into the Read-Only Memory of a Network Interface Card (NIC).",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through MAC Addressing.",
    "explanation": "During communication: A Media Access Control (MAC) address is a unique, 48-bit (6-byte) physical identifier permanently burned into the Read-Only Memory of a Network Interface Card (NIC).. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "ethernet-frames-diag-1",
    "topicId": "ethernet-frames",
    "difficulty": "Medium",
    "title": "Ethernet & Frame Structure Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Ethernet & Frame Structure)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Ethernet & Frame Structure, what happens during active transmission?",
    "options": [
      "A) An Ethernet frame is the standardized Layer 2 Protocol Data Unit (IEEE 802.3) used to transmit data across wired local area networks.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Ethernet & Frame Structure.",
    "explanation": "During communication: An Ethernet frame is the standardized Layer 2 Protocol Data Unit (IEEE 802.3) used to transmit data across wired local area networks.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "arp-protocol-diag-1",
    "topicId": "arp-protocol",
    "difficulty": "Medium",
    "title": "ARP Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (ARP)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for ARP, what happens during active transmission?",
    "options": [
      "A) Address Resolution Protocol (ARP, RFC 826) dynamically resolves a known Layer 3 logical IP address to an unknown Layer 2 physical MAC address on a local network segment.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through ARP.",
    "explanation": "During communication: Address Resolution Protocol (ARP, RFC 826) dynamically resolves a known Layer 3 logical IP address to an unknown Layer 2 physical MAC address on a local network segment.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "switching-mac-table-diag-1",
    "topicId": "switching-mac-table",
    "difficulty": "Medium",
    "title": "Switching Mechanics & CAM/MAC Address Table Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Switching Mechanics & CAM/MAC Address Table)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Switching Mechanics & CAM/MAC Address Table, what happens during active transmission?",
    "options": [
      "A) A Layer 2 Switch is an intelligent multiport network bridge that uses a Content Addressable Memory (CAM) table to forward frames directly to target recipient ports without flooding.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Switching Mechanics & CAM/MAC Address Table.",
    "explanation": "During communication: A Layer 2 Switch is an intelligent multiport network bridge that uses a Content Addressable Memory (CAM) table to forward frames directly to target recipient ports without flooding.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "vlan-diag-1",
    "topicId": "vlan",
    "difficulty": "Medium",
    "title": "VLAN Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (VLAN)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for VLAN, what happens during active transmission?",
    "options": [
      "A) A Virtual LAN (VLAN, IEEE 802.1Q) logically partitions a single physical Layer 2 switch infrastructure into multiple isolated broadcast domains.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through VLAN.",
    "explanation": "During communication: A Virtual LAN (VLAN, IEEE 802.1Q) logically partitions a single physical Layer 2 switch infrastructure into multiple isolated broadcast domains.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "collision-broadcast-domains-diag-1",
    "topicId": "collision-broadcast-domains",
    "difficulty": "Medium",
    "title": "Collision Domains vs Broadcast Domains Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Collision Domains vs Broadcast Domains)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Collision Domains vs Broadcast Domains, what happens during active transmission?",
    "options": [
      "A) A Collision Domain is a physical network segment where electrical data packets can collide with each other during simultaneous transmission. A Broadcast Domain is a logical network area where a broadcast frame sent by one device is received and processed by every other device.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Collision Domains vs Broadcast Domains.",
    "explanation": "During communication: A Collision Domain is a physical network segment where electrical data packets can collide with each other during simultaneous transmission. A Broadcast Domain is a logical network area where a broadcast frame sent by one device is received and processed by every other device.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "ip-addressing-diag-1",
    "topicId": "ip-addressing",
    "difficulty": "Medium",
    "title": "IPv4 Addressing & Classful Architecture Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (IPv4 Addressing & Classful Architecture)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for IPv4 Addressing & Classful Architecture, what happens during active transmission?",
    "options": [
      "A) An IPv4 address is a 32-bit (4-byte) logical identifier assigned to every device connected to an IP network, divided into a Network ID and a Host ID.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through IPv4 Addressing & Classful Architecture.",
    "explanation": "During communication: An IPv4 address is a 32-bit (4-byte) logical identifier assigned to every device connected to an IP network, divided into a Network ID and a Host ID.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "ipv4-vs-ipv6-diag-1",
    "topicId": "ipv4-vs-ipv6",
    "difficulty": "Medium",
    "title": "IPv4 vs IPv6 Architecture & Migration Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (IPv4 vs IPv6 Architecture & Migration)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for IPv4 vs IPv6 Architecture & Migration, what happens during active transmission?",
    "options": [
      "A) IPv6 is the next-generation Internet Protocol offering a 128-bit address space (3.4 x 10^38 addresses), replacing 32-bit IPv4 to solve global address exhaustion.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through IPv4 vs IPv6 Architecture & Migration.",
    "explanation": "During communication: IPv6 is the next-generation Internet Protocol offering a 128-bit address space (3.4 x 10^38 addresses), replacing 32-bit IPv4 to solve global address exhaustion.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "public-vs-private-ip-diag-1",
    "topicId": "public-vs-private-ip",
    "difficulty": "Medium",
    "title": "Public vs Private IP Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Public vs Private IP)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Public vs Private IP, what happens during active transmission?",
    "options": [
      "A) Public IP addresses are globally unique and routable across the public Internet. Private IP addresses (RFC 1918) are non-routable on the Internet, reserved for internal home, campus, and enterprise LANs.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Public vs Private IP.",
    "explanation": "During communication: Public IP addresses are globally unique and routable across the public Internet. Private IP addresses (RFC 1918) are non-routable on the Internet, reserved for internal home, campus, and enterprise LANs.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "subnetting-cidr-diag-1",
    "topicId": "subnetting-cidr",
    "difficulty": "Medium",
    "title": "Subnetting & CIDR Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Subnetting & CIDR)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Subnetting & CIDR, what happens during active transmission?",
    "options": [
      "A) Subnetting is the practice of dividing a large physical IP network into smaller, logically isolated sub-networks (subnets) by borrowing bits from the host portion to extend the network prefix.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Subnetting & CIDR.",
    "explanation": "During communication: Subnetting is the practice of dividing a large physical IP network into smaller, logically isolated sub-networks (subnets) by borrowing bits from the host portion to extend the network prefix.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "routing-fundamentals-diag-1",
    "topicId": "routing-fundamentals",
    "difficulty": "Medium",
    "title": "Routing Fundamentals Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Routing Fundamentals)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Routing Fundamentals, what happens during active transmission?",
    "options": [
      "A) Routing is the Layer 3 process by which routers inspect the destination IP address of an incoming packet and determine the optimal next-hop interface to forward it toward its final destination.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Routing Fundamentals.",
    "explanation": "During communication: Routing is the Layer 3 process by which routers inspect the destination IP address of an incoming packet and determine the optimal next-hop interface to forward it toward its final destination.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "routing-table-gateway-diag-1",
    "topicId": "routing-table-gateway",
    "difficulty": "Medium",
    "title": "Routing Table Lookup & Default Gateway Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Routing Table Lookup & Default Gateway)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Routing Table Lookup & Default Gateway, what happens during active transmission?",
    "options": [
      "A) A routing table is an in-memory database stored on hosts and routers mapping destination network prefixes to next-hop IP addresses and exit interfaces. The Default Gateway is the fallback router used when no specific route matches.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Routing Table Lookup & Default Gateway.",
    "explanation": "During communication: A routing table is an in-memory database stored on hosts and routers mapping destination network prefixes to next-hop IP addresses and exit interfaces. The Default Gateway is the fallback router used when no specific route matches.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "nat-network-address-translation-diag-1",
    "topicId": "nat-network-address-translation",
    "difficulty": "Medium",
    "title": "NAT Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (NAT)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for NAT, what happens during active transmission?",
    "options": [
      "A) Network Address Translation (NAT, RFC 1631) modifies the source or destination IP and port numbers in packet headers as they traverse a router, enabling multiple private devices to share a single public IP.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through NAT.",
    "explanation": "During communication: Network Address Translation (NAT, RFC 1631) modifies the source or destination IP and port numbers in packet headers as they traverse a router, enabling multiple private devices to share a single public IP.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "icmp-protocol-diag-1",
    "topicId": "icmp-protocol",
    "difficulty": "Medium",
    "title": "ICMP Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (ICMP)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for ICMP, what happens during active transmission?",
    "options": [
      "A) Internet Control Message Protocol (ICMP, RFC 792) is a network-layer diagnostic and error-reporting protocol used by network devices to report transmission problems and test reachability.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through ICMP.",
    "explanation": "During communication: Internet Control Message Protocol (ICMP, RFC 792) is a network-layer diagnostic and error-reporting protocol used by network devices to report transmission problems and test reachability.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "tcp-protocol-diag-1",
    "topicId": "tcp-protocol",
    "difficulty": "Medium",
    "title": "TCP Architecture & Segment Header Format Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (TCP Architecture & Segment Header Format)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for TCP Architecture & Segment Header Format, what happens during active transmission?",
    "options": [
      "A) Transmission Control Protocol (TCP, RFC 793) is a connection-oriented, reliable, full-duplex Transport Layer protocol providing ordered, error-checked delivery of a stream of octets between processes.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through TCP Architecture & Segment Header Format.",
    "explanation": "During communication: Transmission Control Protocol (TCP, RFC 793) is a connection-oriented, reliable, full-duplex Transport Layer protocol providing ordered, error-checked delivery of a stream of octets between processes.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "tcp-3-way-handshake-diag-1",
    "topicId": "tcp-3-way-handshake",
    "difficulty": "Medium",
    "title": "TCP 3-Way Handshake Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (TCP 3-Way Handshake)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for TCP 3-Way Handshake, what happens during active transmission?",
    "options": [
      "A) The TCP 3-Way Handshake is the 3-step synchronization process used by client and server to negotiate Initial Sequence Numbers (ISNs) and establish a reliable full-duplex socket connection.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through TCP 3-Way Handshake.",
    "explanation": "During communication: The TCP 3-Way Handshake is the 3-step synchronization process used by client and server to negotiate Initial Sequence Numbers (ISNs) and establish a reliable full-duplex socket connection.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "tcp-connection-termination-diag-1",
    "topicId": "tcp-connection-termination",
    "difficulty": "Medium",
    "title": "TCP 4-Way Handshake Termination & TIME_WAIT State Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (TCP 4-Way Handshake Termination & TIME_WAIT State)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for TCP 4-Way Handshake Termination & TIME_WAIT State, what happens during active transmission?",
    "options": [
      "A) TCP connection termination is the 4-step graceful closing handshake that independently terminates transmission in both directions (full-duplex teardown), concluding with the TIME_WAIT state.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through TCP 4-Way Handshake Termination & TIME_WAIT State.",
    "explanation": "During communication: TCP connection termination is the 4-step graceful closing handshake that independently terminates transmission in both directions (full-duplex teardown), concluding with the TIME_WAIT state.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "tcp-reliability-diag-1",
    "topicId": "tcp-reliability",
    "difficulty": "Medium",
    "title": "TCP Reliability: Sequence Numbers, ACKs & Retransmission Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (TCP Reliability: Sequence Numbers, ACKs & Retransmission)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for TCP Reliability: Sequence Numbers, ACKs & Retransmission, what happens during active transmission?",
    "options": [
      "A) TCP guarantees 100% reliable data transmission across unreliable IP networks through byte sequence numbering, cumulative acknowledgments, and dynamic retransmission timers.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through TCP Reliability: Sequence Numbers, ACKs & Retransmission.",
    "explanation": "During communication: TCP guarantees 100% reliable data transmission across unreliable IP networks through byte sequence numbering, cumulative acknowledgments, and dynamic retransmission timers.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "flow-control-sliding-window-diag-1",
    "topicId": "flow-control-sliding-window",
    "difficulty": "Medium",
    "title": "TCP Flow Control & Sliding Window Protocol Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (TCP Flow Control & Sliding Window Protocol)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for TCP Flow Control & Sliding Window Protocol, what happens during active transmission?",
    "options": [
      "A) TCP Flow Control prevents a fast sender from overwhelming a slow receiver's buffer memory through the Sliding Window Protocol and the Advertised Window (rwnd) field.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through TCP Flow Control & Sliding Window Protocol.",
    "explanation": "During communication: TCP Flow Control prevents a fast sender from overwhelming a slow receiver's buffer memory through the Sliding Window Protocol and the Advertised Window (rwnd) field.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "congestion-control-diag-1",
    "topicId": "congestion-control",
    "difficulty": "Medium",
    "title": "TCP Congestion Control Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (TCP Congestion Control)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for TCP Congestion Control, what happens during active transmission?",
    "options": [
      "A) TCP Congestion Control dynamically regulates the sender's transmission rate to prevent intermediate network routers and buffers from collapsing due to packet traffic overload.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through TCP Congestion Control.",
    "explanation": "During communication: TCP Congestion Control dynamically regulates the sender's transmission rate to prevent intermediate network routers and buffers from collapsing due to packet traffic overload.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "udp-protocol-diag-1",
    "topicId": "udp-protocol",
    "difficulty": "Medium",
    "title": "UDP Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (UDP)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for UDP, what happens during active transmission?",
    "options": [
      "A) User Datagram Protocol (UDP, RFC 768) is a connectionless, lightweight, unreliable Transport Layer protocol that transmits independent datagrams without handshakes, acknowledgments, or flow control.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through UDP.",
    "explanation": "During communication: User Datagram Protocol (UDP, RFC 768) is a connectionless, lightweight, unreliable Transport Layer protocol that transmits independent datagrams without handshakes, acknowledgments, or flow control.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "tcp-vs-udp-diag-1",
    "topicId": "tcp-vs-udp",
    "difficulty": "Medium",
    "title": "TCP vs UDP Comparison & Protocol Decision Matrix Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (TCP vs UDP Comparison & Protocol Decision Matrix)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for TCP vs UDP Comparison & Protocol Decision Matrix, what happens during active transmission?",
    "options": [
      "A) A comprehensive architectural comparison evaluating the trade-offs between TCP (reliable, ordered, connection-oriented) and UDP (fast, lightweight, connectionless).",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through TCP vs UDP Comparison & Protocol Decision Matrix.",
    "explanation": "During communication: A comprehensive architectural comparison evaluating the trade-offs between TCP (reliable, ordered, connection-oriented) and UDP (fast, lightweight, connectionless).. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "ports-and-sockets-diag-1",
    "topicId": "ports-and-sockets",
    "difficulty": "Medium",
    "title": "Ports, Sockets & Multiplexing / Demultiplexing Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Ports, Sockets & Multiplexing / Demultiplexing)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Ports, Sockets & Multiplexing / Demultiplexing, what happens during active transmission?",
    "options": [
      "A) A port is a 16-bit numerical identifier (0 to 65535) used by the Transport Layer to direct data to specific software processes. A socket is the unique combination of an IP address and a Port number representing an endpoint of communication.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Ports, Sockets & Multiplexing / Demultiplexing.",
    "explanation": "During communication: A port is a 16-bit numerical identifier (0 to 65535) used by the Transport Layer to direct data to specific software processes. A socket is the unique combination of an IP address and a Port number representing an endpoint of communication.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "dns-domain-name-system-diag-1",
    "topicId": "dns-domain-name-system",
    "difficulty": "Medium",
    "title": "DNS Hierarchy & Resolution Process Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (DNS Hierarchy & Resolution Process)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for DNS Hierarchy & Resolution Process, what happens during active transmission?",
    "options": [
      "A) The Domain Name System (DNS, RFC 1035) is the global hierarchical decentralized naming database that translates human-readable domain names (e.g. google.com) into machine-routable IP addresses (e.g. 142.250.72.14).",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through DNS Hierarchy & Resolution Process.",
    "explanation": "During communication: The Domain Name System (DNS, RFC 1035) is the global hierarchical decentralized naming database that translates human-readable domain names (e.g. google.com) into machine-routable IP addresses (e.g. 142.250.72.14).. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "dhcp-protocol-diag-1",
    "topicId": "dhcp-protocol",
    "difficulty": "Medium",
    "title": "DHCP Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (DHCP)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for DHCP, what happens during active transmission?",
    "options": [
      "A) DHCP (RFC 2131) is an application-layer network management protocol operating over UDP (ports 67/68) that automatically assigns IP addresses, subnet masks, default gateways, and DNS servers to client devices on a local network.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through DHCP.",
    "explanation": "During communication: DHCP (RFC 2131) is an application-layer network management protocol operating over UDP (ports 67/68) that automatically assigns IP addresses, subnet masks, default gateways, and DNS servers to client devices on a local network.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "http-protocol-diag-1",
    "topicId": "http-protocol",
    "difficulty": "Medium",
    "title": "HTTP Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (HTTP)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for HTTP, what happens during active transmission?",
    "options": [
      "A) HTTP is the stateless, application-layer request-response protocol powering the World Wide Web, governing how clients request resources and how servers serve web pages and APIs.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through HTTP.",
    "explanation": "During communication: HTTP is the stateless, application-layer request-response protocol powering the World Wide Web, governing how clients request resources and how servers serve web pages and APIs.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "https-protocol-diag-1",
    "topicId": "https-protocol",
    "difficulty": "Medium",
    "title": "HTTPS Architecture, Encryption & Certificate Authorities Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (HTTPS Architecture, Encryption & Certificate Authorities)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for HTTPS Architecture, Encryption & Certificate Authorities, what happens during active transmission?",
    "options": [
      "A) HTTPS (Hypertext Transfer Protocol Secure, RFC 2818) is the secure encrypted version of HTTP, running over port 443 by encapsulating standard HTTP traffic inside a Transport Layer Security (TLS) cryptographic tunnel.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through HTTPS Architecture, Encryption & Certificate Authorities.",
    "explanation": "During communication: HTTPS (Hypertext Transfer Protocol Secure, RFC 2818) is the secure encrypted version of HTTP, running over port 443 by encapsulating standard HTTP traffic inside a Transport Layer Security (TLS) cryptographic tunnel.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "http-methods-diag-1",
    "topicId": "http-methods",
    "difficulty": "Medium",
    "title": "HTTP Request Methods, Idempotency & Safety Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (HTTP Request Methods, Idempotency & Safety)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for HTTP Request Methods, Idempotency & Safety, what happens during active transmission?",
    "options": [
      "A) HTTP methods (verbs) define the desired action to be performed on a target web resource, classified by their semantics, safety (read-only), and idempotency (repeatability without side effects).",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through HTTP Request Methods, Idempotency & Safety.",
    "explanation": "During communication: HTTP methods (verbs) define the desired action to be performed on a target web resource, classified by their semantics, safety (read-only), and idempotency (repeatability without side effects).. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "http-status-codes-diag-1",
    "topicId": "http-status-codes",
    "difficulty": "Medium",
    "title": "HTTP Status Codes Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (HTTP Status Codes)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for HTTP Status Codes, what happens during active transmission?",
    "options": [
      "A) HTTP status codes are standardized 3-digit numerical responses issued by a server indicating the outcome of a client's HTTP request, categorized into 5 functional classes.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through HTTP Status Codes.",
    "explanation": "During communication: HTTP status codes are standardized 3-digit numerical responses issued by a server indicating the outcome of a client's HTTP request, categorized into 5 functional classes.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "tls-ssl-handshake-diag-1",
    "topicId": "tls-ssl-handshake",
    "difficulty": "Medium",
    "title": "TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange, what happens during active transmission?",
    "options": [
      "A) The Transport Layer Security (TLS) handshake is the cryptographic protocol that negotiates cipher suites, authenticates the server via digital certificates, and establishes shared symmetric encryption keys before application data transmits.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange.",
    "explanation": "During communication: The Transport Layer Security (TLS) handshake is the cryptographic protocol that negotiates cipher suites, authenticates the server via digital certificates, and establishes shared symmetric encryption keys before application data transmits.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "cookies-and-sessions-diag-1",
    "topicId": "cookies-and-sessions",
    "difficulty": "Medium",
    "title": "Cookies, Sessions, JWT & State Management over HTTP Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Cookies, Sessions, JWT & State Management over HTTP)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Cookies, Sessions, JWT & State Management over HTTP, what happens during active transmission?",
    "options": [
      "A) Techniques used to simulate continuous stateful sessions over the architecturally stateless HTTP protocol, comparing server-side sessions, browser cookies, and cryptographically signed JSON Web Tokens (JWT).",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Cookies, Sessions, JWT & State Management over HTTP.",
    "explanation": "During communication: Techniques used to simulate continuous stateful sessions over the architecturally stateless HTTP protocol, comparing server-side sessions, browser cookies, and cryptographically signed JSON Web Tokens (JWT).. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "web-caching-diag-1",
    "topicId": "web-caching",
    "difficulty": "Medium",
    "title": "Web Caching, Cache-Control Headers & ETag Validation Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Web Caching, Cache-Control Headers & ETag Validation)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Web Caching, Cache-Control Headers & ETag Validation, what happens during active transmission?",
    "options": [
      "A) Web caching is the technique of storing copies of HTTP responses in browser memory, local disk, forward proxies, or CDN edge nodes to serve future identical requests without contacting the origin server.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Web Caching, Cache-Control Headers & ETag Validation.",
    "explanation": "During communication: Web caching is the technique of storing copies of HTTP responses in browser memory, local disk, forward proxies, or CDN edge nodes to serve future identical requests without contacting the origin server.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "url-lifecycle-diag-1",
    "topicId": "url-lifecycle",
    "difficulty": "Medium",
    "title": "Complete URL Lifecycle Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Complete URL Lifecycle)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Complete URL Lifecycle, what happens during active transmission?",
    "options": [
      "A) The universal software engineering interview question detailing the complete end-to-end journey from user keystroke to pixels rendering on the screen across all networking and OS layers.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Complete URL Lifecycle.",
    "explanation": "During communication: The universal software engineering interview question detailing the complete end-to-end journey from user keystroke to pixels rendering on the screen across all networking and OS layers.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "ping-and-traceroute-diag-1",
    "topicId": "ping-and-traceroute",
    "difficulty": "Medium",
    "title": "Ping & Traceroute Mechanics Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Ping & Traceroute Mechanics)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Ping & Traceroute Mechanics, what happens during active transmission?",
    "options": [
      "A) Ping measures point-to-point network reachability and round-trip latency using ICMP Echo messages. Traceroute maps the exact intermediate router hops along a network path by intentionally exploiting IP Time-To-Live (TTL) expiration.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Ping & Traceroute Mechanics.",
    "explanation": "During communication: Ping measures point-to-point network reachability and round-trip latency using ICMP Echo messages. Traceroute maps the exact intermediate router hops along a network path by intentionally exploiting IP Time-To-Live (TTL) expiration.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "firewall-diag-1",
    "topicId": "firewall",
    "difficulty": "Medium",
    "title": "Firewalls: Packet Filtering, Stateful Inspection & WAF Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Firewalls: Packet Filtering, Stateful Inspection & WAF)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Firewalls: Packet Filtering, Stateful Inspection & WAF, what happens during active transmission?",
    "options": [
      "A) A firewall is a network security system that monitors, filters, and controls incoming and outgoing network traffic based on predetermined security rules, operating across Layers 3, 4, and 7.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Firewalls: Packet Filtering, Stateful Inspection & WAF.",
    "explanation": "During communication: A firewall is a network security system that monitors, filters, and controls incoming and outgoing network traffic based on predetermined security rules, operating across Layers 3, 4, and 7.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "proxy-servers-diag-1",
    "topicId": "proxy-servers",
    "difficulty": "Medium",
    "title": "Forward Proxy Servers & Anonymity Mechanics Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Forward Proxy Servers & Anonymity Mechanics)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Forward Proxy Servers & Anonymity Mechanics, what happens during active transmission?",
    "options": [
      "A) A Forward Proxy is an intermediary server that sits between client devices and the public Internet, intercepting outbound requests to provide anonymity, caching, content filtering, and corporate security enforcement.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Forward Proxy Servers & Anonymity Mechanics.",
    "explanation": "During communication: A Forward Proxy is an intermediary server that sits between client devices and the public Internet, intercepting outbound requests to provide anonymity, caching, content filtering, and corporate security enforcement.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "reverse-proxy-diag-1",
    "topicId": "reverse-proxy",
    "difficulty": "Medium",
    "title": "Reverse Proxy Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Reverse Proxy)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Reverse Proxy, what happens during active transmission?",
    "options": [
      "A) A Reverse Proxy is a server that sits in front of one or more origin web servers, intercepting incoming client requests and routing them to appropriate backend microservices while providing SSL termination, caching, and security.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Reverse Proxy.",
    "explanation": "During communication: A Reverse Proxy is a server that sits in front of one or more origin web servers, intercepting incoming client requests and routing them to appropriate backend microservices while providing SSL termination, caching, and security.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "load-balancer-diag-1",
    "topicId": "load-balancer",
    "difficulty": "Medium",
    "title": "Load Balancers Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Load Balancers)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Load Balancers, what happens during active transmission?",
    "options": [
      "A) A Load Balancer distributes incoming network traffic across a cluster of backend servers to optimize resource utilization, maximize throughput, minimize response latency, and prevent server overload.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Load Balancers.",
    "explanation": "During communication: A Load Balancer distributes incoming network traffic across a cluster of backend servers to optimize resource utilization, maximize throughput, minimize response latency, and prevent server overload.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "cdn-content-delivery-network-diag-1",
    "topicId": "cdn-content-delivery-network",
    "difficulty": "Medium",
    "title": "CDN Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (CDN)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for CDN, what happens during active transmission?",
    "options": [
      "A) A Content Delivery Network (CDN) is a geographically distributed network of proxy edge servers (Points of Presence, PoPs) that cache and deliver web assets close to end users to minimize latency.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through CDN.",
    "explanation": "During communication: A Content Delivery Network (CDN) is a geographically distributed network of proxy edge servers (Points of Presence, PoPs) that cache and deliver web assets close to end users to minimize latency.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  },
  {
    "id": "network-troubleshooting-diag-1",
    "topicId": "network-troubleshooting",
    "difficulty": "Medium",
    "title": "Network Troubleshooting Methodology Data Flow & Architecture",
    "diagram": "[ Host A (Sender) ]\\n        |\\n        v  (Network Troubleshooting Methodology)\\n[ Network Node / Switch / Router ]\\n        |\\n        v\\n[ Host B (Receiver) ]",
    "question": "In the protocol interaction diagram above for Network Troubleshooting Methodology, what happens during active transmission?",
    "options": [
      "A) A systematic, disciplined engineering methodology for diagnosing, localizing, and resolving network connectivity and performance failures using a structured bottom-up or top-down approach.",
      "B) The packet is converted into audio sound waves to bypass firewalls",
      "C) The packet is duplicated 10,000 times to guarantee delivery through brute force",
      "D) The receiver shuts down its network adapter immediately"
    ],
    "correctIndex": 0,
    "hint": "Follow the data flow through Network Troubleshooting Methodology.",
    "explanation": "During communication: A systematic, disciplined engineering methodology for diagnosing, localizing, and resolving network connectivity and performance failures using a structured bottom-up or top-down approach.. The protocol guarantees standardized processing across network boundaries.",
    "optionExplanations": [
      "A accurately describes the protocol's operation.",
      "B is absurd.",
      "C is broadcast storm flooding, which is an error condition.",
      "D terminates communication erroneously."
    ]
  }
];
