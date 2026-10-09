import os
import json

topics_data = {
  "intro-to-networks": {
    "title": "Introduction to Computer Networks",
    "def": "A computer network is an interconnected collection of autonomous computing devices (hosts, switches, routers) that exchange data and share resources over shared communication links.",
    "analogy": "Like a global highway system: vehicles (packets) carry passengers (data) from home driveways (source IP) to destinations across local streets (switches) and interstate ramps (routers).",
    "problem": "Isolated computers cannot share computational work, databases, or live communication without physical media transfer (e.g., thumb drives or floppy disks).",
    "whyItMatters": "Modern distributed computing, cloud storage, payment APIs, and real-time collaboration require millisecond-latency global resource exchange.",
    "howSolves": "Network communication protocols standardize packetization, addressing, routing, and error checking across heterogenous hardware vendors.",
    "steps": [
      {"step": 1, "title": "Host Creation", "desc": "Application generates byte stream and requests socket transmission via OS kernel."},
      {"step": 2, "title": "Packetization", "desc": "Data is segmented and wrapped in transport, network, and data link headers."},
      {"step": 3, "title": "Media Signaling", "desc": "NIC converts bits into electromagnetic radio waves or light pulses."},
      {"step": 4, "title": "Destination Delivery", "desc": "Destination NIC verifies checksum, decapsulates headers, and passes payload to target process."}
    ],
    "structure": {
      "Nodes": "End systems (Clients, Servers) and Intermediary devices (Switches, Routers)",
      "Links": "Twisted pair copper (Cat6), Optical fiber, Wireless radio (802.11)",
      "Protocols": "Standardized rules governing format, timing, sequencing, and error control",
      "Topology": "Physical layout and logical signal paths connecting all nodes"
    },
    "vfx": "packet-travel",
    "scenario": "A branch office in Bangalore needs to access inventory records stored on a cloud database in Virginia, USA.",
    "challenge": "Packets must traverse 14,000 km of undersea optical fiber cables across 15 router hops within 200 milliseconds.",
    "resolution": "Border Gateway Protocol (BGP) routes packets across Tier-1 ISPs, ensuring reliable transit with dynamic failover if an undersea cable is cut.",
    "examples": {
      "Local Host": "192.168.1.15",
      "Subnet Mask": "255.255.255.0",
      "Default Gateway": "192.168.1.1",
      "Target Cloud IP": "54.239.28.85 (AWS Virginia)",
      "Round Trip Time (RTT)": "184 ms"
    },
    "traps": [
      {"wrong": "The Internet is owned and run by a single central governing computer.", "why": "The Internet is a decentralized network of networks operated by autonomous ISPs.", "correct": "The Internet relies on peer routing protocols without any central bottleneck or single owner."},
      {"wrong": "Bandwidth is the speed at which bits travel along a wire.", "why": "Bits always travel at the speed of light in copper/fiber (~200,000 km/s).", "correct": "Bandwidth is the capacity (bits per second) transmitted simultaneously, not signal propagation speed."},
      {"wrong": "Packets in the same transmission always take the exact same physical path.", "why": "IP routing is packet-switched and dynamic.", "correct": "Different packets between the same host and server can take different router paths depending on congestion."}
    ],
    "interview": {
      "q": "What is the difference between Circuit Switching and Packet Switching?",
      "a": "Circuit switching reserves a dedicated physical end-to-end communication channel for the entire session duration (e.g. traditional landline telephone). Packet switching breaks data into discrete addressed packets that share communication links dynamically with other traffic (e.g. the Internet). Packet switching provides dramatically higher link utilization efficiency and resilience against link failures.",
      "tip": "Always mention statistical multiplexing when discussing packet switching advantages in placement interviews."
    },
    "cheat": {
      "keyRule": "Networks exchange discrete packets across shared media using layered protocols.",
      "summaryPoints": [
        "End Systems (hosts) run user applications; Intermediary systems (routers/switches) forward packets.",
        "Packet switching dominates modern networks due to statistical multiplexing efficiency.",
        "Network latency = Transmission delay + Propagation delay + Queuing delay + Processing delay.",
        "Protocols define the syntax, semantics, and synchronization of network communication."
      ],
      "whenToUse": "Foundation for understanding all subsequent OSI and TCP/IP protocol layers."
    }
  },

  "network-types": {
    "title": "Types of Networks (LAN, WAN, MAN, PAN, WLAN)",
    "def": "Networks are classified by their geographical span, administrative control, data transmission rates, and physical media into PAN, LAN, WLAN, MAN, and WAN.",
    "analogy": "PAN is your personal desk workspace; LAN is your office building; MAN is the city metro rail; WAN is the global international airline network.",
    "problem": "A single networking standard cannot cost-effectively span both a 2-meter Bluetooth headset connection and a 10,000-kilometer cross-continental internet link.",
    "whyItMatters": "Architects must select appropriate technologies: low-power PAN for wearables, high-throughput LAN for data centers, and redundant WAN for distributed offices.",
    "howSolves": "Different physical layer standards (802.15 WPAN, 802.3 Ethernet, 802.11 Wi-Fi, MPLS/SD-WAN) optimize bandwidth, power consumption, and distance.",
    "steps": [
      {"step": 1, "title": "PAN (Personal Area)", "desc": "Range < 10 meters. Bluetooth, Zigbee, NFC connecting phones, watches, headphones."},
      {"step": 2, "title": "LAN (Local Area)", "desc": "Range < 1 km. High-speed Ethernet/Wi-Fi (1-100 Gbps) within a home, campus, or data center."},
      {"step": 3, "title": "MAN (Metropolitan)", "desc": "Range 5-50 km. Municipal fiber loops, cable TV networks connecting city branches."},
      {"step": 4, "title": "WAN (Wide Area)", "desc": "Global coverage. Interconnected routers spanning countries using leased lines and satellites."}
    ],
    "structure": {
      "PAN": "Range: ~10 m | Speed: 1-24 Mbps | Media: 2.4 GHz RF (Bluetooth/NFC)",
      "LAN": "Range: ~1 km | Speed: 100 Mbps - 100 Gbps | Media: Cat6 Twisted Pair, Fiber",
      "MAN": "Range: ~50 km | Speed: 100 Mbps - 10 Gbps | Media: Dark Fiber, Metro Ethernet",
      "WAN": "Range: Global | Speed: 1.5 Mbps - 400 Gbps | Media: Undersea Fiber, Satellites"
    },
    "vfx": "packet-travel",
    "scenario": "A national retail bank connects 5,000 local branches across India to a central core banking database in Mumbai.",
    "challenge": "Local branches need high-speed connectivity for staff PCs, but WAN links over public internet can suffer jitter and downtime.",
    "resolution": "Each branch uses an internal Gigabit LAN, while interconnecting to the Mumbai headquarters via an encrypted SD-WAN mesh over redundant leased lines.",
    "examples": {
      "Branch LAN": "Gigabit Ethernet (1000BASE-T) inside branch",
      "Customer Wi-Fi": "WLAN (802.11ax Wi-Fi 6) on isolated VLAN",
      "City Interconnect": "Metro Ethernet MAN between regional hubs",
      "Core Banking WAN": "Multiprotocol Label Switching (MPLS) with 99.999% SLA"
    },
    "traps": [
      {"wrong": "WLAN is a separate higher-tier network type than LAN.", "why": "WLAN is simply the wireless transmission variant of a LAN (IEEE 802.11).", "correct": "WLAN operates within LAN geographical scale but uses radio frequency instead of copper cables."},
      {"wrong": "WANs always provide faster throughput than LANs because they are bigger.", "why": "Long physical distances introduce propagation delay and expensive link bandwidth.", "correct": "LANs offer drastically higher speeds (10-100 Gbps) and lower latency (<1 ms) compared to WANs."},
      {"wrong": "The Internet is the only existing WAN.", "why": "Private enterprise WANs connect private data centers without public internet transit.", "correct": "The Internet is the largest public WAN, but many private WANs exist worldwide."}
    ],
    "interview": {
      "q": "Why is latency significantly lower on a LAN than on a WAN?",
      "a": "LAN latency is typically under 1 millisecond because physical cable runs are short (<100m for Cat6), media is dedicated with minimal queuing delay, and switching occurs at Layer 2 without routing table lookup overhead. WAN latency (40-200ms) is constrained by the speed of light over thousands of kilometers of fiber, serialization delays across lower-bandwidth pipes, and queuing delays through multiple transit routers.",
      "tip": "Highlight propagation delay (distance / speed of light) as the unbreakable physical barrier for WAN latency."
    },
    "cheat": {
      "keyRule": "PAN = Personal devices (<10m); LAN = Local building (<1km); WAN = Global inter-network.",
      "summaryPoints": [
        "LAN provides maximum bandwidth (1-100 Gbps) and lowest latency (<1 ms).",
        "WLAN replaces physical cables with 2.4 GHz and 5 GHz radio frequencies (802.11 standard).",
        "WAN connections require specialized edge routers and telecommunication carriers.",
        "SD-WAN dynamically steers traffic over multi-carrier WAN links based on real-time latency."
      ],
      "whenToUse": "Use when determining network boundaries, routing scopes, and link infrastructure budgets."
    }
  },

  "network-topologies": {
    "title": "Network Topologies (Star, Mesh, Bus, Ring, Hybrid)",
    "def": "A network topology defines how devices (nodes) and communication pathways (links) are physically wired and logically configured to route traffic.",
    "analogy": "Star is airport hubs where all planes route through a central city; Mesh is a web of direct flights between every pair of cities; Bus is a single train track where all stations attach to one line.",
    "problem": "Connecting 50 office computers haphazardly without an intentional topology causes wiring chaos, signal collisions, and single points of failure.",
    "whyItMatters": "Topology dictates cable costs, installation complexity, fault tolerance, and what happens when an individual link or device crashes.",
    "howSolves": "Standardized topologies balance cost vs redundancy: Star for enterprise LANs, Full Mesh for ISP backbones, Hybrid for campus infrastructures.",
    "steps": [
      {"step": 1, "title": "Star Topology", "desc": "All nodes connect to a central switch. Link failure affects only that single node."},
      {"step": 2, "title": "Mesh Topology", "desc": "Every node connects to every other node: n*(n-1)/2 links. Maximum fault tolerance."},
      {"step": 3, "title": "Bus Topology", "desc": "All nodes share a single coaxial cable backbone with terminators at both ends."},
      {"step": 4, "title": "Ring Topology", "desc": "Nodes form a closed loop. Tokens circulate unidirectionally or bidirectionally."}
    ],
    "structure": {
      "Star Links": "n links for n devices | Central bottleneck: Switch",
      "Full Mesh Links": "n*(n - 1) / 2 physical links | Port count: (n - 1) per device",
      "Partial Mesh": "Redundant links between critical core routers only",
      "Hybrid": "Combination of Star networks interconnected by a Mesh or Tree backbone"
    },
    "vfx": "packet-travel",
    "scenario": "A nuclear power plant control system requires zero packet loss even if two fiber lines are accidentally severed by construction equipment.",
    "challenge": "A Star topology would fail completely if the central core switch suffered power failure or backplane lockup.",
    "resolution": "Deploy a Full Mesh topology across core controllers with Spanning Tree Protocol (STP) and dual redundant power supplies.",
    "examples": {
      "Star Nodes": "100 PCs connected to 48-port Cisco Catalyst switches",
      "Mesh Calculation": "For 6 core routers: 6*(5)/2 = 15 direct fiber links",
      "Bus Legacy": "10BASE2 Thinnet coaxial cable with 50-ohm BNC terminators",
      "Modern Standard": "Extended Star / Tree topology in all enterprise office buildings"
    },
    "traps": [
      {"wrong": "A Full Mesh topology is always the best choice for an office network.", "why": "Full Mesh for 500 computers would require 124,750 cable runs and 499 NIC ports per PC.", "correct": "Full Mesh is cost-prohibitive for end hosts; it is reserved for core ISP routers and mission-critical clusters."},
      {"wrong": "In a Star topology, if one host cable breaks, the whole network stops.", "why": "Only that specific broken link drops.", "correct": "The network only fails if the central switch fails, not if an individual host cable breaks."},
      {"wrong": "Physical topology is always identical to logical topology.", "why": "Token Ring physically looked like a star hub, but internally circulated a logical ring token.", "correct": "Physical topology is the physical cabling; logical topology is how signal data flows."}
    ],
    "interview": {
      "q": "How many physical links are needed for a Full Mesh network with 10 nodes?",
      "a": "The formula for a Full Mesh network is n*(n - 1) / 2. For 10 nodes: 10 * (10 - 1) / 2 = 10 * 9 / 2 = 45 physical duplex links. Each node must have (n - 1) = 9 dedicated network interfaces.",
      "tip": "Interviewers love asking the n(n-1)/2 formula and then following up with: 'What is the trade-off of Full Mesh vs Partial Mesh?'"
    },
    "cheat": {
      "keyRule": "Star = cheap & scalable (standard LAN); Full Mesh = maximum redundancy [n*(n-1)/2 links].",
      "summaryPoints": [
        "Star topology is universal in modern LANs due to cheap Cat6 cables and isolated port failures.",
        "Full Mesh provides zero single-point-of-failure at the cost of O(n^2) cable and port scaling.",
        "Bus topology suffers from electrical reflection if cable terminators are missing or damaged.",
        "Ring topology uses token passing to eliminate collisions (e.g. FDDI fiber rings)."
      ],
      "whenToUse": "Use when evaluating network availability requirements, disaster recovery, and infrastructure cabling."
    }
  },

  "network-devices": {
    "title": "Network Devices (Hub, Switch, Router, Gateway, Bridge)",
    "def": "Network hardware devices operate at distinct layers of the OSI reference model to regenerate signals, direct local frames, route internet packets, or translate protocol suites.",
    "analogy": "Hub is a megaphone shouting to everyone in the room; Switch is a smart postman delivering letters directly to specific desk names; Router is an air traffic controller directing planes between different cities.",
    "problem": "A simple copper wire cannot intelligently filter electrical noise, isolate traffic between departments, or connect an Ethernet LAN to an optical fiber internet provider.",
    "whyItMatters": "Placing a dumb L1 Hub in a modern 200-person office would flood all ports with every single packet, causing severe collisions, sluggish speeds, and security sniffing.",
    "howSolves": "Layer 2 Switches maintain MAC address tables for dedicated micro-segmentation; Layer 3 Routers use IP routing tables to segment broadcast domains.",
    "steps": [
      {"step": 1, "title": "Hub (Layer 1)", "desc": "Multiport repeater. Takes incoming bit from one port and regenerates it out to ALL other ports."},
      {"step": 2, "title": "Bridge (Layer 2)", "desc": "Connects two network segments. Inspects MAC addresses to filter or forward frames."},
      {"step": 3, "title": "Switch (Layer 2 / Layer 3)", "desc": "Multiport bridge. Uses CAM table to forward frames directly to target destination MAC."},
      {"step": 4, "title": "Router (Layer 3)", "desc": "Interconnects distinct IP subnets. Evaluates destination IP using routing table to forward packets."}
    ],
    "structure": {
      "Hub (L1)": "1 Collision Domain | 1 Broadcast Domain | Half Duplex | Floods all ports",
      "Switch (L2)": "N Collision Domains (1 per port) | 1 Broadcast Domain | Full Duplex | CAM Table",
      "Router (L3)": "N Collision Domains | N Broadcast Domains (Breaks broadcasts) | IP Routing Table",
      "Gateway": "Protocol converter operating across all layers (e.g. VoIP to PSTN gateway)"
    },
    "vfx": "routing",
    "scenario": "An attacker plugs a Wireshark laptop into a wall port and attempts to capture coworker passwords transmitted across the floor.",
    "challenge": "If connected via a Hub, the attacker's NIC hears all electrical signals and reads all packets in cleartext.",
    "resolution": "A modern Layer 2 Switch forwards unicast frames strictly to the recipient's physical port based on its MAC table, preventing casual promiscuous sniffing.",
    "examples": {
      "Hub Flooding": "Frame from Port 1 copied blindly to Ports 2, 3, 4, 5",
      "Switch Forwarding": "Frame for MAC 3C:52:... forwarded ONLY out of Port 3",
      "Router Subnet Transit": "Subnet 192.168.1.0/24 routed to Subnet 10.0.0.0/8 via interface GigabitEthernet0/1",
      "Default Gateway": "192.168.1.1 on internal router interface"
    },
    "traps": [
      {"wrong": "A switch breaks up broadcast domains.", "why": "Switches forward all broadcast frames (FF:FF:FF:FF:FF:FF) out of all active ports.", "correct": "A switch breaks collision domains; a ROUTER breaks broadcast domains."},
      {"wrong": "A router forwards traffic based on MAC address.", "why": "Routers strip the L2 MAC header and inspect the L3 destination IP address.", "correct": "Switches forward by MAC address; Routers forward by IP address."},
      {"wrong": "A Gateway is just another word for a router.", "why": "While a router can be a default gateway, true gateways perform protocol translation between incompatible systems.", "correct": "A router interconnects IP subnets; a Gateway translates between different architectures (e.g. email gateway, API gateway)."}
    ],
    "interview": {
      "q": "What is the difference between a Hub, a Switch, and a Router in terms of collision and broadcast domains?",
      "a": "A Hub has 1 single collision domain and 1 broadcast domain across all ports. A Switch provides a dedicated collision domain for each individual port, but shares 1 single broadcast domain across all ports (unless partitioned by VLANs). A Router provides both separate collision domains per interface AND breaks broadcast domains, meaning broadcasts are not forwarded across router interfaces.",
      "tip": "Memorize: 'Switches break collision domains; Routers break broadcast domains.' This is asked in virtually every MNC fresher interview."
    },
    "cheat": {
      "keyRule": "Hub = L1 repeater; Switch = L2 MAC forwarder; Router = L3 IP boundary.",
      "summaryPoints": [
        "Hub operates at Physical Layer (L1); floods all frames blindly; half-duplex only.",
        "Switch operates at Data Link Layer (L2); learns MAC addresses in CAM table; full-duplex.",
        "Router operates at Network Layer (L3); inspects IP headers; connects different subnets.",
        "Layer 3 switches combine switch wire-speed ASICs with router IP routing capability."
      ],
      "whenToUse": "Essential for architecting enterprise topologies and answering placement networking questions."
    }
  },

  "osi-model": {
    "title": "OSI 7-Layer Reference Model",
    "def": "The Open Systems Interconnection (OSI) reference model is an ISO conceptual framework dividing computer network communication into 7 distinct abstraction layers.",
    "analogy": "Sending an international parcel: 7. You write letter; 6. Translator translates language; 5. Secretary confirms recipient availability; 4. Courier stamps tracking number; 3. Postal sorting maps city route; 2. Local van delivers to street box; 1. Wheels roll on asphalt road.",
    "problem": "In the 1970s, proprietary networking vendors (IBM SNA, DECnet) produced hardware that could not talk to each other, creating vendor lock-in.",
    "whyItMatters": "The 7-layer hierarchy standardizes interfaces so an application developer can write web code without caring whether the client connects via Wi-Fi, Ethernet, or 5G fiber.",
    "howSolves": "Each layer provides a specific service to the layer above it, abstracting the complexities of the underlying layers through standardized Protocol Data Units (PDUs).",
    "steps": [
      {"step": 1, "title": "Physical (L1) - Bits", "desc": "Voltage levels, bit timing, fiber optic light pulses, cables (RJ45, Cat6)."},
      {"step": 2, "title": "Data Link (L2) - Frames", "desc": "Node-to-node hop delivery, 48-bit MAC addresses, error detection (CRC)."},
      {"step": 3, "title": "Network (L3) - Packets", "desc": "End-to-end routing across networks, logical IPv4/IPv6 addressing."},
      {"step": 4, "title": "Transport (L4) - Segments", "desc": "Process-to-process delivery, port numbers, reliability (TCP) or speed (UDP)."},
      {"step": 5, "title": "Session (L5) - Data", "desc": "Establishes, manages, and terminates multi-stream communication sessions (RPC, Sockets)."},
      {"step": 6, "title": "Presentation (L6) - Data", "desc": "Data translation, syntax, compression (gzip), and encryption (SSL/TLS, ASCII)."},
      {"step": 7, "title": "Application (L7) - Data", "desc": "Direct user interface protocols (HTTP, DNS, SMTP, FTP, SSH)."}
    ],
    "structure": {
      "Layer 7 (Application)": "HTTP, HTTPS, DNS, DHCP, SMTP, FTP, SSH",
      "Layer 6 (Presentation)": "SSL/TLS, ASCII, EBCDIC, JPEG, MPEG, Data Compression",
      "Layer 5 (Session)": "NetBIOS, RPC, PPTP, Sockets Session Management",
      "Layer 4 (Transport)": "TCP, UDP, SCTP (Ports 0 - 65535)",
      "Layer 3 (Network)": "IPv4, IPv6, ICMP, IPsec, IGMP, Routing",
      "Layer 2 (Data Link)": "Ethernet, Wi-Fi 802.11, ARP, PPP, Switches",
      "Layer 1 (Physical)": "Copper Cat6, Fiber optics, Radio RF, Hubs, Repeaters"
    },
    "vfx": "encapsulation",
    "scenario": "A student types https://google.com into their laptop and hits Enter.",
    "challenge": "How do abstract application concepts (URL string) convert into microscopic optical pulses in undersea glass cables?",
    "resolution": "Data cascades down the 7 OSI layers, gaining protocol headers at each step, and is unwrapped in reverse order by Google's servers.",
    "examples": {
      "PDU Mnemonic": "Please Do Not Throw Sausage Pizza Away (Physical -> Application)",
      "Top-Down Mnemonic": "All People Seem To Need Data Processing (Application -> Physical)",
      "L4 Protocol Data Unit": "Segment (TCP) / Datagram (UDP)",
      "L3 Protocol Data Unit": "Packet",
      "L2 Protocol Data Unit": "Frame",
      "L1 Protocol Data Unit": "Bits"
    },
    "traps": [
      {"wrong": "The OSI model is the physical protocol stack currently running the Internet.", "why": "The modern Internet runs on the 4-layer TCP/IP protocol suite, not the 7-layer OSI model.", "correct": "OSI is a conceptual reference model; TCP/IP is the practical implementation."},
      {"wrong": "Routers operate at all 7 layers of the OSI model.", "why": "Standard IP routers only inspect headers up to Layer 3 (Network).", "correct": "Standard routers operate at Layer 3; Layer 2 switches operate at Layer 2; only end hosts inspect all 7 layers."},
      {"wrong": "Encryption only occurs at Layer 7.", "why": "IPsec encrypts at Layer 3; MACsec encrypts at Layer 2; TLS operates at Layer 6/7.", "correct": "Encryption can be implemented at Layer 2, Layer 3, or Layer 6/7 depending on security architecture."}
    ],
    "interview": {
      "q": "Name the 7 layers of the OSI model from bottom to top, their corresponding Protocol Data Units (PDUs), and one protocol for each.",
      "a": "1. Physical (Bits, 802.3u); 2. Data Link (Frames, Ethernet/ARP); 3. Network (Packets, IPv4/ICMP); 4. Transport (Segments, TCP/UDP); 5. Session (Data, RPC/NetBIOS); 6. Presentation (Data, TLS/ASCII); 7. Application (Data, HTTP/DNS).",
      "tip": "Always specify the exact PDU names: Bits -> Frames -> Packets -> Segments -> Data."
    },
    "cheat": {
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
}

print("Topics authored:", len(topics_data))
