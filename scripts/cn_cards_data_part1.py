# Part 1: Topics 1 to 14 (Fundamentals and Data Link Layer)

part1_topics = {
  "intro-to-networks": {
    "title": "Introduction to Computer Networks",
    "def": "A computer network is an interconnected collection of autonomous computing devices (hosts, switches, routers) that exchange data and share resources over communication links.",
    "analogy": "Like a global highway system: vehicles (packets) carry passengers (data) from home driveways (source IP) across local streets (switches) and interstate ramps (routers).",
    "problem": "Isolated computers cannot share computational work, databases, or live communication without physical media transfer.",
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
      {"wrong": "A Gateway is just another word for a router.", "why": "While a router can be a default gateway, true gateways perform protocol translation between incompatible systems.", "correct": "A router interconnects IP subnets; a Gateway translates between different architectures."}
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
  },

  "tcp-ip-model": {
    "title": "TCP/IP 4-Layer Architecture",
    "def": "The TCP/IP model (Department of Defense DoD model) is the practical 4-layer protocol stack that actually implements and powers the global Internet.",
    "analogy": "If OSI is the idealistic theoretical blueprint for a house, TCP/IP is the actual brick-and-mortar building that everyone lives in.",
    "problem": "The 7-layer OSI model had rigid session and presentation layers that introduced unnecessary complexity and processing overhead in operating system kernels.",
    "whyItMatters": "Every modern computer, smartphone, Linux kernel, and cloud server runs the TCP/IP stack natively in software.",
    "howSolves": "Combines application, presentation, and session into one Application layer; retains pure Network Interface, Internet, and Transport layers.",
    "steps": [
      {"step": 1, "title": "Application Layer", "desc": "HTTP, DNS, SSH, TLS handled directly by user space processes and libraries."},
      {"step": 2, "title": "Transport Layer", "desc": "TCP (reliable stream) and UDP (unreliable datagram) managed by OS kernel sockets."},
      {"step": 3, "title": "Internet Layer", "desc": "IP (IPv4/IPv6), ICMP, and routing algorithms providing universal best-effort packet delivery."},
      {"step": 4, "title": "Network Interface Layer", "desc": "Ethernet, Wi-Fi, MAC hardware drivers binding OS packets to physical transmission media."}
    ],
    "structure": {
      "Application (L4)": "HTTP, HTTPS, DNS, DHCP, SMTP, SSH, FTP, WebSocket",
      "Transport (L3)": "TCP (Transmission Control Protocol) & UDP (User Datagram Protocol)",
      "Internet (L2)": "IPv4, IPv6, ICMP, ARP (inter-layer), IPsec",
      "Network Interface (L1)": "Ethernet (802.3), Wi-Fi (802.11), PPP, Fiber (SONET)"
    },
    "vfx": "encapsulation",
    "scenario": "A Linux developer builds a Node.js microservice communicating with Redis and PostgreSQL.",
    "challenge": "The developer only wants to write application business logic without managing packet loss, bit flips, or optical transceivers.",
    "resolution": "The developer opens standard POSIX TCP sockets: the TCP/IP kernel stack handles retransmission, sliding window flow control, and IP routing automatically.",
    "examples": {
      "Socket Call": "connect(sockfd, {192.168.1.100, port: 5432})",
      "Kernel Transport": "Wraps payload in 20-byte TCP segment header",
      "Kernel Internet": "Wraps segment in 20-byte IPv4 packet header",
      "NIC Driver": "Pushes 1518-byte Ethernet frame to hardware ring buffer"
    },
    "traps": [
      {"wrong": "TCP/IP has 5 layers officially.", "why": "The original RFC 1122 specification defines exactly 4 layers (Network Interface, Internet, Transport, Application).", "correct": "Some textbooks split the bottom layer into Physical + Data Link (5-layer pedagogical model), but standard TCP/IP is 4 layers."},
      {"wrong": "TCP/IP requires TCP for every single connection.", "why": "Applications can choose UDP (or SCTP/QUIC) instead of TCP.", "correct": "The 'TCP/IP' name refers to the suite; DNS and video streaming frequently use UDP over IP."},
      {"wrong": "TCP/IP guarantees zero packet loss at the Internet layer.", "why": "The IP layer is strictly 'best-effort' and unacknowledged.", "correct": "Reliability is provided by TCP at the Transport layer above IP, not by IP itself."}
    ],
    "interview": {
      "q": "Why did the TCP/IP model succeed in the marketplace while the OSI model remained largely academic?",
      "a": "TCP/IP was developed with an 'implementation-first' pragmatic philosophy (running code and rough consensus through IETF RFCs). It was integrated for free into BSD Unix in 1983, allowing university and military researchers to immediately interconnect machines. In contrast, the OSI standards were committee-driven, overly complex (Session and Presentation layers had weak justification), and too slow to market.",
      "tip": "Quoting RFC culture ('rough consensus and running code') always impresses interviewers."
    },
    "cheat": {
      "keyRule": "Application (L4) -> Transport (L3) -> Internet (L2) -> Network Interface (L1).",
      "summaryPoints": [
        "4 practical layers: Application, Transport, Internet, Network Interface.",
        "IP provides connectionless, best-effort packet delivery across networks.",
        "TCP provides connection-oriented, reliable, ordered byte streams.",
        "Implemented natively inside the OS kernel network stack."
      ],
      "whenToUse": "The architecture governing all real-world socket programming, cloud services, and Internet traffic."
    }
  },

  "osi-vs-tcp-ip": {
    "title": "OSI vs TCP/IP Model Comparison",
    "def": "A direct architectural comparison between the 7-layer theoretical OSI reference model and the 4-layer practical TCP/IP protocol suite.",
    "analogy": "OSI is a 7-step formal culinary textbook separating slicing, seasoning, and tasting; TCP/IP is the chef in a fast-paced restaurant kitchen executing the dish in 4 pragmatic steps.",
    "problem": "Engineers talking across disciplines use OSI layer terminology (e.g. 'Layer 4 Load Balancer', 'Layer 7 WAF') while writing code for TCP/IP systems, creating conceptual confusion.",
    "whyItMatters": "Interviewers frequently test whether candidates understand layer mappings, protocol locations, and the trade-offs between clean abstraction and performance overhead.",
    "howSolves": "Mapping OSI Layers 5, 6, and 7 to TCP/IP Application layer clarifies where functionality belongs in software vs the kernel.",
    "steps": [
      {"step": 1, "title": "Application Mapping", "desc": "OSI L7 (App), L6 (Presentation), L5 (Session) map directly to TCP/IP Application layer."},
      {"step": 2, "title": "Transport Mapping", "desc": "OSI L4 maps 1:1 to TCP/IP Transport layer (TCP/UDP process-to-process delivery)."},
      {"step": 3, "title": "Network Mapping", "desc": "OSI L3 maps 1:1 to TCP/IP Internet layer (IP addressing & hop routing)."},
      {"step": 4, "title": "Link Mapping", "desc": "OSI L2 (Data Link) and L1 (Physical) map to TCP/IP Network Interface layer."}
    ],
    "structure": {
      "OSI L7/L6/L5": "Application, Presentation, Session <--> TCP/IP Application Layer",
      "OSI L4": "Transport Layer <--> TCP/IP Transport Layer (TCP, UDP)",
      "OSI L3": "Network Layer <--> TCP/IP Internet Layer (IP, ICMP, ARP)",
      "OSI L2/L1": "Data Link & Physical <--> TCP/IP Network Interface / Link Layer"
    },
    "vfx": "encapsulation",
    "scenario": "A cloud engineer configures an AWS Application Load Balancer (ALB) and a Network Load Balancer (NLB).",
    "challenge": "What does AWS mean by calling ALB a 'Layer 7' device and NLB a 'Layer 4' device?",
    "resolution": "ALB inspects HTTP headers, cookies, and URL paths (OSI L7); NLB routes purely based on TCP/UDP ports and IP addresses (OSI L4 / TCP/IP Transport).",
    "examples": {
      "Layer 7 Device": "Reverse Proxy (NGINX), WAF (Cloudflare), API Gateway",
      "Layer 4 Device": "Network Load Balancer (AWS NLB), Linux IPVS, HAProxy (TCP mode)",
      "Layer 3 Device": "IP Router, Layer 3 Switch (Cisco Catalyst)",
      "Layer 2 Device": "Standard Ethernet Switch, Wi-Fi Access Point"
    },
    "traps": [
      {"wrong": "Presentation and Session layers do not exist in TCP/IP applications.", "why": "The functionality still exists; it is just handled by user libraries rather than separate kernel layers.", "correct": "In TCP/IP, presentation (TLS encryption, JSON serialization) is implemented directly inside the application layer."},
      {"wrong": "OSI came first, and then TCP/IP was invented to replace it.", "why": "ARPANET and TCP/IP protocols were designed in the early 1970s; OSI was standardized in 1984.", "correct": "TCP/IP protocols were already running on ARPANET before the ISO formalized the OSI model."},
      {"wrong": "A Layer 4 load balancer can inspect URL paths.", "why": "Layer 4 operates strictly on TCP/UDP ports and IP addresses; it has no visibility into HTTP payload strings.", "correct": "URL path inspection requires a Layer 7 proxy that terminates the TCP connection and decrypts TLS."}
    ],
    "interview": {
      "q": "What is the difference between an OSI Layer 4 Load Balancer and a Layer 7 Load Balancer?",
      "a": "A Layer 4 Load Balancer routes traffic based on network and transport layer headers (Source IP, Destination IP, Port) without inspecting the application payload. It makes routing decisions on the initial TCP SYN packet, providing extremely high throughput and low CPU overhead. A Layer 7 Load Balancer terminates the TCP connection, decrypts SSL/TLS, and parses application data (HTTP headers, URL paths, cookies). It enables intelligent content routing (e.g. /api -> backend microservice, /static -> CDN), but incurs higher CPU and memory overhead.",
      "tip": "Draw the comparison table: L4 = fast, packet-level, no decryption; L7 = smart, content-level, SSL termination."
    },
    "cheat": {
      "keyRule": "OSI 7 layers = conceptual reference; TCP/IP 4 layers = real software implementation.",
      "summaryPoints": [
        "OSI L5-L7 are merged into TCP/IP Application layer.",
        "OSI L1-L2 are merged into TCP/IP Network Interface layer.",
        "L4 switches/LBs route by IP + Port; L7 proxies route by HTTP URL/Headers.",
        "OSI provides strict boundary separation; TCP/IP allows protocol optimization across layers."
      ],
      "whenToUse": "Crucial for system design interviews, load balancer selection, and network troubleshooting."
    }
  },

  "encapsulation-decapsulation": {
    "title": "Encapsulation & Decapsulation (PDU Lifecycle)",
    "def": "Encapsulation is the process where each layer on the sender wraps payload data from the layer above with its own protocol control header. Decapsulation is the reverse unpacking process on the receiver.",
    "analogy": "Like Russian nesting dolls (Matryoshka) or mailing a letter: Document -> Envelope with stamp -> Courier pouch -> Mail truck cargo container. Recipient cuts open container -> pouch -> envelope -> reads letter.",
    "problem": "A physical wire transmitting electrical bits has no intrinsic meaning unless data carries structured metadata indicating its sender, destination, protocol, and integrity.",
    "whyItMatters": "Encapsulation ensures modularity: the Network layer does not need to know what application generated the data, only the destination IP address.",
    "howSolves": "Headers act as layer-specific contracts. Each layer processes its own header and discards it before passing payload up to the next layer.",
    "steps": [
      {"step": 1, "title": "Application PDU (Data)", "desc": "HTTP payload: GET /index.html HTTP/1.1 generated by browser."},
      {"step": 2, "title": "Transport PDU (Segment)", "desc": "TCP prepends 20-byte header: Source Port 52000, Dest Port 443, Seq=100."},
      {"step": 3, "title": "Network PDU (Packet)", "desc": "IP prepends 20-byte header: Src IP 192.168.1.5, Dest IP 142.250.72.14, TTL=64."},
      {"step": 4, "title": "Data Link PDU (Frame)", "desc": "Ethernet prepends 14-byte MAC header and appends 4-byte CRC trailer (FCS)."}
    ],
    "structure": {
      "Data (L7-L5)": "User payload string or JSON object",
      "Segment (L4)": "[TCP Header (20B)] + [Data]",
      "Packet (L3)": "[IP Header (20B)] + [TCP Header] + [Data]",
      "Frame (L2)": "[MAC Header (14B)] + [IP Header] + [TCP Header] + [Data] + [CRC Trailer (4B)]",
      "Bits (L1)": "Physical electrical / optical signal encoding"
    },
    "vfx": "encapsulation",
    "scenario": "A user clicks 'Checkout' on an e-commerce website, sending an encrypted credit card token.",
    "challenge": "The packet must navigate 12 intermediate ISP routers that speak different link-layer technologies (Ethernet, MPLS, Wi-Fi).",
    "resolution": "Each router strips the L2 Frame header, inspects the L3 IP destination, selects the outgoing port, and wraps the IP packet in a brand new L2 Frame header for the next hop.",
    "examples": {
      "Original Payload": "POST /checkout HTTP/1.1 (250 bytes)",
      "TCP Segment Size": "250 + 20 = 270 bytes",
      "IP Packet Size": "270 + 20 = 290 bytes",
      "Ethernet Frame Size": "290 + 14 + 4 = 308 bytes total on wire",
      "Protocol Overhead": "18.8% header overhead"
    },
    "traps": [
      {"wrong": "The IP header changes at every router hop.", "why": "Source IP and Destination IP remain unchanged end-to-end across the Internet (unless traversing a NAT gateway).", "correct": "The L2 MAC header changes at EVERY router hop; the L3 IP header remains constant end-to-end (except TTL decrement)."},
      {"wrong": "Encapsulation only adds headers at the beginning of data.", "why": "The Data Link layer also appends a Frame Check Sequence (FCS) trailer at the END of the frame for CRC error detection.", "correct": "Data Link adds BOTH a header at the start and a trailer at the end."},
      {"wrong": "Decapsulation happens on all routers along the path up to Layer 7.", "why": "Intermediate routers only decapsulate up to Layer 3 (IP).", "correct": "Intermediate routers decapsulate L2, read L3, and re-encapsulate L2; only the destination host decapsulates up to Layer 7."}
    ],
    "interview": {
      "q": "As an IP packet travels across three routers from Host A to Host B, which headers change at each hop and which stay the same?",
      "a": "At each router hop: 1. The Layer 2 Data Link (Ethernet) Frame header is completely stripped and replaced with a new Source MAC (the router's egress interface) and Destination MAC (the next hop router or host). 2. The Layer 3 IP header remains constant end-to-end (Source IP and Destination IP do NOT change, assuming no NAT), with the exception of the TTL field (decremented by 1) and the IP Header Checksum (recalculated). 3. The Layer 4 Transport header and Layer 7 Application payload are never touched by intermediate routers.",
      "tip": "Emphasize: 'MAC addresses are hop-by-hop local; IP addresses are end-to-end global.' This is a classic placement gold question."
    },
    "cheat": {
      "keyRule": "Sender: Data -> Segment (L4) -> Packet (L3) -> Frame (L2) -> Bits (L1). Receiver: reverse decapsulation.",
      "summaryPoints": [
        "Encapsulation adds headers top-down; Decapsulation strips headers bottom-up.",
        "MAC addresses change at every single router hop (link-local).",
        "IP addresses remain intact end-to-end (unless modified by NAT).",
        "Frame trailer contains 32-bit CRC / FCS to verify physical integrity before decapsulation."
      ],
      "whenToUse": "Fundamental for packet capture analysis (Wireshark), router debugging, and network latency optimization."
    }
  },

  "mac-address": {
    "title": "MAC Addressing (Physical 48-bit Hardware Address)",
    "def": "A Media Access Control (MAC) address is a unique, 48-bit (6-byte) physical identifier permanently burned into the Read-Only Memory of a Network Interface Card (NIC).",
    "analogy": "Like your biological fingerprint or DNA: permanently bound to your physical body (NIC) regardless of what city (IP subnet) you move to.",
    "problem": "If two computers on the same local Wi-Fi router share the same IP or if IPs change via DHCP, switches need an unalterable hardware address to deliver electrical frames.",
    "whyItMatters": "Layer 2 Ethernet switches operate exclusively on MAC addresses. Without MAC addressing, local multi-access framing on shared copper or Wi-Fi radio frequencies is impossible.",
    "howSolves": "Every NIC manufacturer is assigned an IEEE Organizationally Unique Identifier (OUI), guaranteeing global physical uniqueness for every manufactured network chip.",
    "steps": [
      {"step": 1, "title": "OUI Assignment", "desc": "IEEE assigns first 24 bits (3 bytes) to vendor (e.g., Apple, Intel, Cisco)."},
      {"step": 2, "title": "NIC Serialization", "desc": "Vendor assigns remaining 24 bits (3 bytes) as unique serial number."},
      {"step": 3, "title": "Burned-In Address (BIA)", "desc": "Laser-etched into NIC ROM during silicon fabrication."},
      {"step": 4, "title": "Frame Addressing", "desc": "Ethernet frames stamp Source MAC and Destination MAC into L2 header."}
    ],
    "structure": {
      "Total Size": "48 bits = 6 bytes = 12 hexadecimal characters",
      "Format": "XX:XX:XX:YY:YY:YY or XX-XX-XX-YY-YY-YY",
      "OUI (First 3 Bytes)": "Vendor code (e.g. 00:0C:29 = VMware, AC:DE:48 = Apple)",
      "NIC (Last 3 Bytes)": "Device specific unique hardware identifier",
      "Broadcast MAC": "FF:FF:FF:FF:FF:FF (all 48 bits set to 1)"
    },
    "vfx": "switching",
    "scenario": "A laptop connects to office Wi-Fi, then drives to a coffee shop and connects to public Wi-Fi.",
    "challenge": "Its IP address changes from 10.0.1.45 (office) to 192.168.1.80 (coffee shop). How does the local network recognize its network card?",
    "resolution": "Its MAC address (A4:5E:60:12:AB:9C) remains identical on both networks, allowing local Layer 2 switches to maintain frame delivery.",
    "examples": {
      "Example MAC": "A4:5E:60:12:AB:9C",
      "OUI Prefix": "A4:5E:60 (Apple Inc.)",
      "Device Identifier": "12:AB:9C",
      "Broadcast MAC": "FF:FF:FF:FF:FF:FF",
      "Multicast MAC": "01:00:5E:00:00:01 (IPv4 Multicast prefix)"
    },
    "traps": [
      {"wrong": "A MAC address is routable across the public Internet.", "why": "MAC addresses are link-local only. Routers discard the incoming L2 MAC header when forwarding to the next hop.", "correct": "MAC addresses only have significance within a single local Layer 2 broadcast domain."},
      {"wrong": "MAC addresses can never be changed under any circumstances.", "why": "While the physical BIA in ROM is fixed, operating system drivers allow MAC spoofing in software.", "correct": "Software can spoof the MAC address reported by the OS network stack, although the burned-in ROM address remains."},
      {"wrong": "A device with 2 network cards (Wi-Fi and Ethernet) has 1 MAC address.", "why": "MAC addresses belong to individual network interface controllers (NICs), not the computer motherboard.", "correct": "Each physical or virtual network interface has its own distinct MAC address."}
    ],
    "interview": {
      "q": "Why do we need both MAC addresses and IP addresses? Why can't we use just one?",
      "a": "MAC addresses and IP addresses serve fundamentally different architectural purposes. A MAC address is a flat, non-hierarchical 48-bit identifier identifying a physical hardware interface on a local link. If the global Internet ran on MAC addresses, core internet routers would need routing tables with billions of individual entries (one for every device on Earth), causing immediate memory exhaustion and routing collapse. In contrast, IP addresses are hierarchical (Network ID + Host ID), allowing routers to aggregate millions of hosts into a single route prefix (e.g. /16 or /24). Conversely, we cannot use only IP addresses because hosts frequently join networks without an IP (DHCP requires MAC to assign an IP), and IP addresses change whenever a host moves networks.",
      "tip": "Use the analogy: 'MAC address is your Social Security Number / Aadhaar (who you are); IP address is your postal mailing address (where you currently live).'"
    },
    "cheat": {
      "keyRule": "MAC = 48-bit physical flat address (OUI 24b + NIC 24b); link-local only.",
      "summaryPoints": [
        "48 bits formatted as 6 hex octets (e.g. A4:5E:60:12:AB:9C).",
        "First 3 bytes = Organizationally Unique Identifier (OUI) assigned by IEEE.",
        "Last 3 bytes = Vendor-assigned unique serial number.",
        "Broadcast MAC is FF:FF:FF:FF:FF:FF; received and processed by every NIC in the VLAN."
      ],
      "whenToUse": "Essential for understanding Layer 2 switching, ARP resolution, and Wireshark frame inspection."
    }
  },

  "ethernet-frames": {
    "title": "Ethernet & Frame Structure (802.3)",
    "def": "An Ethernet frame is the standardized Layer 2 Protocol Data Unit (IEEE 802.3) used to transmit data across wired local area networks.",
    "analogy": "An armored bank courier envelope: has sender and receiver names stamped on the outside, a tamper-evident seal (CRC) at the bottom, and carries the cash payload inside.",
    "problem": "Raw physical voltage pulses on a copper wire can suffer electromagnetic noise interference, bit flips, or framing synchronization loss.",
    "whyItMatters": "Ethernet is the dominant Layer 2 wired networking standard worldwide, powering data centers, campuses, home routers, and internet exchange points.",
    "howSolves": "Ethernet defines preambles for clock synchronization, address fields for switching, an EtherType field for protocol demultiplexing, and a 32-bit CRC checksum for error detection.",
    "steps": [
      {"step": 1, "title": "Preamble (7 Bytes)", "desc": "Alternating pattern of 10101010 allowing receiver clock to synchronize with incoming bit stream."},
      {"step": 2, "title": "SFD (1 Byte)", "desc": "Start Frame Delimiter (10101011). Last two 1s signal that the destination MAC starts on the next bit."},
      {"step": 3, "title": "MAC Addressing (12 Bytes)", "desc": "Destination MAC (6B) followed by Source MAC (6B)."},
      {"step": 4, "title": "EtherType (2 Bytes)", "desc": "Identifies encapsulated L3 protocol: 0x0800 for IPv4, 0x86DD for IPv6, 0x0806 for ARP."},
      {"step": 5, "title": "Payload (46 - 1500 Bytes)", "desc": "The encapsulated IP packet. Minimum 46 bytes (padded with zeros if smaller) up to 1500 bytes MTU."},
      {"step": 6, "title": "FCS / CRC (4 Bytes)", "desc": "Frame Check Sequence. 32-bit cyclic redundancy check. If computed CRC does not match, frame is dropped immediately."}
    ],
    "structure": {
      "Preamble + SFD": "8 Bytes (Synchronization & start delimiter)",
      "Destination MAC": "6 Bytes (Target NIC)",
      "Source MAC": "6 Bytes (Sender NIC)",
      "EtherType / Length": "2 Bytes (0x0800 IPv4, 0x0806 ARP, 0x86DD IPv6)",
      "Payload": "46 to 1500 Bytes (Standard Ethernet MTU)",
      "FCS (CRC)": "4 Bytes (Error detection trailer)"
    },
    "vfx": "encapsulation",
    "scenario": "A 10-byte ICMP Echo Request needs to be transmitted over an Ethernet link.",
    "challenge": "Ethernet requires a minimum frame size of 64 bytes for collision detection (CSMA/CD on half-duplex links).",
    "resolution": "The network interface automatically pads 36 zero bytes to the payload, ensuring the frame meets the 64-byte minimum length.",
    "examples": {
      "Minimum Frame Size": "64 bytes (14 header + 46 payload + 4 CRC)",
      "Maximum Frame Size": "1518 bytes (14 header + 1500 payload + 4 CRC)",
      "Jumbo Frame": "Up to 9000 bytes (used in enterprise storage SANs)",
      "EtherType IPv4": "0x0800",
      "EtherType ARP": "0x0806"
    },
    "traps": [
      {"wrong": "Ethernet retransmits frames automatically when the CRC checksum fails.", "why": "Ethernet detects errors; it does NOT correct or retransmit them.", "correct": "Ethernet silently drops corrupted frames. Retransmission is left to upper layers like TCP."},
      {"wrong": "Maximum Transmission Unit (MTU) includes the Ethernet header.", "why": "MTU refers strictly to the maximum PAYLOAD size that fits inside the frame (1500 bytes by default).", "correct": "MTU is 1500 bytes (payload); total frame size on the wire is 1518 bytes (or 1522 with 802.1Q VLAN tag)."},
      {"wrong": "Preamble is counted in the 64-byte minimum frame size.", "why": "Preamble and SFD are physical layer framing overhead.", "correct": "The 64-byte minimum counts from Destination MAC to FCS trailer."}
    ],
    "interview": {
      "q": "Why does Ethernet enforce a minimum frame size of 64 bytes?",
      "a": "The minimum frame size of 64 bytes was mandated by Ethernet's CSMA/CD (Carrier Sense Multiple Access with Collision Detection) protocol. In a shared half-duplex coaxial collision domain (up to 2.5 km with repeaters), a sender must transmit for at least the round-trip propagation time (slot time = 51.2 microseconds at 10 Mbps) to ensure that if a collision occurs at the furthest end of the cable, the collision signal travels back before the sender finishes transmitting. At 10 Mbps, 51.2 microseconds equals exactly 512 bits = 64 bytes. If a frame were smaller (a 'runt'), the sender might finish transmitting and assume success before the collision fragment returned.",
      "tip": "Mention slot time, CSMA/CD, and runt frames when answering this classic question."
    },
    "cheat": {
      "keyRule": "Standard Ethernet: Min 64 bytes, Max 1518 bytes (MTU 1500 bytes). Dropped if CRC fails.",
      "summaryPoints": [
        "Frame format: Dest MAC (6B) + Src MAC (6B) + EtherType (2B) + Payload (46-1500B) + FCS (4B).",
        "EtherType determines upper protocol: 0x0800 (IPv4), 0x0806 (ARP), 0x86DD (IPv6).",
        "FCS uses CRC-32 to detect errors; corrupted frames are discarded without ACK/NACK.",
        "802.1Q adds a 4-byte VLAN tag between Source MAC and EtherType."
      ],
      "whenToUse": "Essential for understanding MTU fragmentation, Wireshark frame analysis, and network interface configuration."
    }
  },

  "arp-protocol": {
    "title": "ARP (Address Resolution Protocol) & Cache",
    "def": "Address Resolution Protocol (ARP, RFC 826) dynamically resolves a known Layer 3 logical IP address to an unknown Layer 2 physical MAC address on a local network segment.",
    "analogy": "In an office meeting room, shouting: 'Whoever is John Doe (IP), please tell me your physical badge number (MAC)!' John speaks up: 'I am John Doe, my badge number is 42.'",
    "problem": "When Host A wants to send an IP packet to Host B on the same LAN, it knows Host B's IP address, but its network card cannot transmit an Ethernet frame without Host B's destination MAC address.",
    "whyItMatters": "Without ARP, no computer could communicate over local Ethernet or Wi-Fi networks.",
    "howSolves": "Host A broadcasts an ARP Request (Who has 192.168.1.50? Tell 192.168.1.10). Host B hears the broadcast and unicasts back an ARP Reply containing its MAC address.",
    "steps": [
      {"step": 1, "title": "ARP Cache Lookup", "desc": "Sender checks local OS ARP cache table. If entry exists, frames transmit immediately without network overhead."},
      {"step": 2, "title": "ARP Request Broadcast", "desc": "If entry missing, sender crafts ARP Request frame with Dest MAC FF:FF:FF:FF:FF:FF. Every switch port floods this broadcast."},
      {"step": 3, "title": "Target Unicast Reply", "desc": "All hosts receive request; only the host matching target IP responds. It sends unicast ARP Reply directly to sender MAC."},
      {"step": 4, "title": "ARP Cache Storage", "desc": "Sender stores target IP -> MAC mapping in ARP table with an expiration TTL (typically 2 to 20 minutes)."}
    ],
    "structure": {
      "Hardware Type": "0x0001 (Ethernet)",
      "Protocol Type": "0x0800 (IPv4)",
      "Hardware / Proto Size": "6 bytes (MAC length), 4 bytes (IP length)",
      "Opcode": "1 = ARP Request, 2 = ARP Reply",
      "Sender MAC / IP": "Source host physical MAC and logical IP",
      "Target MAC / IP": "Target physical MAC (00:00:00:00:00:00 in request) and target IP"
    },
    "vfx": "switching",
    "scenario": "PC A (192.168.1.10) wants to ping PC B (192.168.1.20) for the very first time after booting.",
    "challenge": "PC A has no entry for 192.168.1.20 in its ARP cache. The ICMP Echo Request is held in memory buffer.",
    "resolution": "PC A transmits an ARP request broadcast. PC B responds with its MAC 3C:52:82:11:22:33 within 1 ms. PC A stores it and immediately transmits the pending ping.",
    "examples": {
      "Command Windows/Linux": "arp -a (displays cached IP-to-MAC bindings)",
      "Gratuitous ARP": "Host broadcasts its own IP/MAC on boot to detect duplicate IPs",
      "ARP Cache Timeout": "Entries expire after 120 - 300 seconds of inactivity to handle replaced NICs"
    },
    "traps": [
      {"wrong": "ARP is used to resolve remote Internet websites like google.com to a MAC address.", "why": "ARP is strictly link-local. You cannot ARP a remote public IP.", "correct": "To reach google.com, the host uses ARP to find the MAC address of its DEFAULT GATEWAY router, not Google's server."},
      {"wrong": "ARP runs over UDP or TCP.", "why": "ARP does not use transport layer protocols.", "correct": "ARP operates directly on top of the Data Link layer (EtherType 0x0806)."},
      {"wrong": "ARP Replies are broadcast to the whole network.", "why": "The target already learned the sender's MAC from the request.", "correct": "ARP Requests are broadcast (FF:FF:FF:FF:FF:FF); ARP Replies are UNICAST directly to the requester."}
    ],
    "interview": {
      "q": "What is ARP Spoofing (ARP Poisoning) and how does an attacker execute a Man-in-the-Middle (MITM) attack with it?",
      "a": "ARP is stateless and does not authenticate replies; hosts will blindly update their ARP cache whenever they receive an ARP Reply, even if they never sent a request. In an ARP Spoofing attack, an attacker on the same LAN sends unsolicited (gratuitous) fake ARP replies to the Victim host claiming: 'I have the Default Gateway IP' (binding Gateway IP to Attacker MAC), and sends fake replies to the Router claiming: 'I have the Victim IP' (binding Victim IP to Attacker MAC). All bidirectional internet traffic between the victim and gateway now routes through the attacker's machine, allowing packet sniffing and session hijacking.",
      "tip": "Mention Dynamic ARP Inspection (DAI) on managed switches as the enterprise defense against ARP spoofing."
    },
    "cheat": {
      "keyRule": "ARP resolves IP -> MAC. Request is Broadcast (FF:FF:FF:FF:FF:FF); Reply is Unicast.",
      "summaryPoints": [
        "ARP Request: L2 Broadcast to discover who owns an IP on the local subnet.",
        "ARP Reply: L2 Unicast returning the physical MAC address.",
        "Operating system caches bindings in ARP table (`arp -a`).",
        "To reach outside the subnet, host ARPs for the Default Gateway router's MAC."
      ],
      "whenToUse": "Crucial for network troubleshooting, default gateway connectivity, and security audits."
    }
  },

  "switching-mac-table": {
    "title": "Switching Mechanics & CAM/MAC Address Table",
    "def": "A Layer 2 Switch is an intelligent multiport network bridge that uses a Content Addressable Memory (CAM) table to forward frames directly to target recipient ports without flooding.",
    "analogy": "A receptionist at an office lobby who writes down every employee's room number the first time they walk in. When a package arrives for Bob, the receptionist sends the courier directly to room 302 instead of shouting in all rooms.",
    "problem": "A legacy Hub blindly broadcasts every frame out of all ports, creating massive electrical collisions, wasting bandwidth, and leaking data to eavesdroppers.",
    "whyItMatters": "Switches form the backbone of all modern Ethernet LANs, providing dedicated full-duplex gigabit bandwidth to every connected device simultaneously.",
    "howSolves": "Switches dynamically learn the Source MAC address of every incoming frame and record it against the receiving physical port in their CAM table.",
    "steps": [
      {"step": 1, "title": "Frame Ingestion", "desc": "Frame arrives on Switch Port 1 with Src MAC A and Dest MAC B."},
      {"step": 2, "title": "Source Learning", "desc": "Switch records binding: [MAC A -> Port 1] in CAM table and resets aging timer (300s)."},
      {"step": 3, "title": "Destination Lookup", "desc": "Switch looks up Dest MAC B in CAM table."},
      {"step": 4, "title": "Selective Forwarding", "desc": "If found (MAC B -> Port 4), frame is forwarded ONLY out of Port 4. If unknown, switch floods frame out all ports except Port 1."}
    ],
    "structure": {
      "CAM Table Columns": "VLAN ID | MAC Address | Type (Dynamic/Static) | Port Number",
      "Aging Timer": "Default 300 seconds (5 minutes) before inactive entries are flushed",
      "Forwarding Logic": "Unicast Forward (known) | Unknown Unicast Flood (unknown) | Broadcast Flood | Multicast Flood",
      "ASIC Architecture": "Application-Specific Integrated Circuits enable wire-speed hardware switching"
    },
    "vfx": "switching",
    "scenario": "An enterprise switch connects 48 workstations. Host 1 sends a heavy 50 GB database backup to Host 2.",
    "challenge": "If the switch flooded the 50 GB backup to all 48 ports, all other 46 employees would experience severe network lag.",
    "resolution": "The switch has learned Host 2 is on Port 2. It switches the 50 GB stream strictly between Port 1 and Port 2 at wire-speed, leaving all other 46 ports completely unaffected.",
    "examples": {
      "Cisco Command": "show mac address-table",
      "Sample CAM Entry": "VLAN 10 | 0014.2201.2345 | DYNAMIC | FastEthernet0/5",
      "Unknown Unicast Flood": "Forwarded out ports 2 through 48 when destination MAC is not yet in CAM table"
    },
    "traps": [
      {"wrong": "A switch learns MAC addresses from the Destination MAC field of the frame.", "why": "The switch has no idea where the destination device is until that device sends traffic.", "correct": "A switch learns MAC addresses strictly from the SOURCE MAC address of incoming frames."},
      {"wrong": "Switches never flood traffic under normal operation.", "why": "Switches MUST flood broadcasts (FF:FF:FF:FF:FF:FF) and unknown unicasts whose MAC has not been learned yet.", "correct": "Switches flood broadcasts, multicasts, and unknown unicasts out of all ports except the receiving port."},
      {"wrong": "A switch port can only ever learn 1 MAC address.", "why": "If a switch port is connected to another switch or a hypervisor running multiple VMs, it learns multiple MACs on that single port.", "correct": "A switch port can learn hundreds of MAC addresses in its CAM table."}
    ],
    "interview": {
      "q": "What is a MAC Flooding Attack (CAM Table Overflow) and how does it compromise switch security?",
      "a": "A switch CAM table has finite hardware memory (e.g., 8,000 to 128,000 MAC entries). In a MAC Flooding attack, an attacker uses tools like macof to generate hundreds of thousands of bogus Ethernet frames with randomized fake source MAC addresses every second. The switch CAM table fills to capacity, evicting legitimate entries. When the CAM table overflows, the switch can no longer store new MACs and enters 'Fail-Open' mode: it treats all incoming frames as Unknown Unicasts and floods them out of EVERY physical port. The switch effectively degrades into a dumb Hub, allowing the attacker on any port to sniff all confidential network traffic with Wireshark. Defense: Port Security (limiting MAC count per port).",
      "tip": "Explain the transition: 'Switch CAM table overflows -> switch degrades into a hub -> attacker sniffs traffic.' Mention Port Security as mitigation."
    },
    "cheat": {
      "keyRule": "Switch learns from SOURCE MAC; forwards by DESTINATION MAC. Floods if destination is unknown.",
      "summaryPoints": [
        "Learns incoming Source MAC -> physical ingress port mapping.",
        "Forwards known unicasts exclusively to destination port.",
        "Floods broadcasts and unknown unicasts out all ports except source.",
        "Entries age out after 300 seconds of inactivity to support moved devices."
      ],
      "whenToUse": "The foundational mechanism of enterprise Ethernet switching, LAN security, and network performance."
    }
  },

  "vlan": {
    "title": "VLAN (Virtual Local Area Network) & 802.1Q Tagging",
    "def": "A Virtual LAN (VLAN, IEEE 802.1Q) logically partitions a single physical Layer 2 switch infrastructure into multiple isolated broadcast domains.",
    "analogy": "An apartment building with a single physical staircase, but tenants are issued keycards that only unlock doors for their designated floor. Finance floor cannot access Engineering floor.",
    "problem": "In a 500-person building, broadcast storms (ARP requests, DHCP broadcasts) flood every single PC, while guest users on Wi-Fi can sniff sensitive HR payroll servers on the same switch.",
    "whyItMatters": "VLANs eliminate the need to purchase separate physical switches for each department, improving security, reducing broadcast overhead, and simplifying network administration.",
    "howSolves": "Switches tag Ethernet frames with a 4-byte 802.1Q header containing a 12-bit VLAN ID (1 to 4094). Frames never cross between VLANs unless routed by a Layer 3 router.",
    "steps": [
      {"step": 1, "title": "Access Port Ingress", "desc": "Untagged frame enters Access Port assigned to VLAN 10 (Finance)."},
      {"step": 2, "title": "802.1Q Tagging", "desc": "Switch inserts 4-byte 802.1Q tag (VLAN ID 10) into frame header before transmitting over Trunk link."},
      {"step": 3, "title": "Trunk Link Transit", "desc": "Trunk link carries multiplexed tagged traffic from VLAN 10, VLAN 20, VLAN 30 between switches."},
      {"step": 4, "title": "Access Port Egress", "desc": "Destination switch strips the 802.1Q tag and forwards standard untagged frame to target PC on VLAN 10."}
    ],
    "structure": {
      "TPID (2 Bytes)": "Tag Protocol Identifier: 0x8100 identifies 802.1Q tagged frame",
      "PCP (3 bits)": "Priority Code Point for Layer 2 Quality of Service (QoS / CoS)",
      "DEI (1 bit)": "Drop Eligible Indicator for congestion discarding",
      "VID (12 bits)": "VLAN Identifier: 2^12 = 4,096 VLANs (VLAN 1 default, 1-4094 usable)",
      "Port Types": "Access Port (single VLAN, untagged) | Trunk Port (multiple VLANs, tagged)"
    },
    "vfx": "switching",
    "scenario": "A hospital switch connects receptionist terminals, patient monitoring devices, and guest public Wi-Fi on the same 48-port switch.",
    "challenge": "Patient cardiac telemetry devices must never be accessible from the public guest Wi-Fi network.",
    "resolution": "Assign Guest Wi-Fi to VLAN 50, Reception to VLAN 20, and Medical Telemetry to VLAN 30. Traffic between VLANs is blocked at Layer 2.",
    "examples": {
      "VLAN 1": "Default native management VLAN",
      "VLAN 10": "Engineering Subnet: 10.0.10.0/24",
      "VLAN 20": "HR / Payroll Subnet: 10.0.20.0/24",
      "VLAN 99": "Guest Public Wi-Fi: 192.168.99.0/24",
      "Native VLAN": "Untagged traffic traversing an 802.1Q trunk port"
    },
    "traps": [
      {"wrong": "Two computers on different VLANs on the same switch can communicate directly at Layer 2.", "why": "VLANs create completely isolated broadcast domains.", "correct": "Communication between different VLANs ALWAYS requires a Layer 3 routing device (Router-on-a-Stick or Layer 3 Switch)."},
      {"wrong": "End user PCs send tagged 802.1Q frames to access ports.", "why": "Standard PC network cards do not understand 802.1Q tags.", "correct": "The switch inserts tags on ingress and strips tags before delivering frames to end user access ports."},
      {"wrong": "VLANs provide encryption for network packets.", "why": "802.1Q adds a plain text header tag, not cryptography.", "correct": "VLANs provide logical isolation, not data encryption. Use IPsec or TLS for encryption."}
    ],
    "interview": {
      "q": "What is 'Router-on-a-Stick' and how does it enable Inter-VLAN routing?",
      "a": "Because switches cannot route traffic between different VLANs at Layer 2, Inter-VLAN routing is required. In a 'Router-on-a-Stick' architecture, a single physical Ethernet interface on a router connects to a switch Trunk port. The router's physical interface is subdivided into logical 'sub-interfaces' (e.g., gig0/0.10 for VLAN 10 and gig0/0.20 for VLAN 20), each configured with 802.1Q encapsulation and assigned the default gateway IP for that VLAN. When Host A on VLAN 10 sends a packet to Host B on VLAN 20, the frame is tagged VLAN 10, sent up the trunk to the router sub-interface, routed internally at Layer 3 to sub-interface 20, re-tagged as VLAN 20, and sent back down the trunk to the switch.",
      "tip": "Draw the diagram: Switch trunk <== Single Cable ==> Router sub-interfaces gig0/0.10 & gig0/0.20."
    },
    "cheat": {
      "keyRule": "VLAN = logical broadcast domain. Access port = untagged (1 VLAN); Trunk port = tagged (802.1Q).",
      "summaryPoints": [
        "Isolates broadcast domains on shared physical switch hardware.",
        "802.1Q adds 4-byte tag with 12-bit VLAN ID (supports up to 4094 VLANs).",
        "Inter-VLAN routing requires a Layer 3 Router or Layer 3 Switch.",
        "Native VLAN passes across trunk links untagged."
      ],
      "whenToUse": "Standard enterprise network design for departmental segmentation, security, and broadcast storm mitigation."
    }
  },

  "collision-broadcast-domains": {
    "title": "Collision Domains vs Broadcast Domains",
    "def": "A Collision Domain is a physical network segment where electrical data packets can collide with each other during simultaneous transmission. A Broadcast Domain is a logical network area where a broadcast frame sent by one device is received and processed by every other device.",
    "analogy": "Collision domain is two people talking over each other in a room; Broadcast domain is the room's walls: if someone yells 'Fire!', everyone in that room hears it, but people in the next building (separated by a router) do not.",
    "problem": "In early bus networks, multiple PCs transmitting simultaneously caused electrical signal degradation (collisions). In flat switched networks, broadcast storms consume 100% of CPU across all workstations.",
    "whyItMatters": "Network performance tuning is all about MINIMIZING collision domain size (to 1 device per port) and SEGMENTING broadcast domain size (using routers and VLANs).",
    "howSolves": "Switches create micro-segments providing a dedicated collision domain per port; Routers and VLANs break up broadcast domains.",
    "steps": [
      {"step": 1, "title": "Hub Topology", "desc": "1 giant collision domain across all ports. CSMA/CD backoff algorithm handles collisions."},
      {"step": 2, "title": "Switch Micro-segmentation", "desc": "Each switch port is an isolated collision domain. Full-duplex eliminates collisions entirely."},
      {"step": 3, "title": "Broadcast Traversal", "desc": "Switch forwards ARP broadcasts (FF:FF:FF:FF:FF:FF) out of all ports in the VLAN."},
      {"step": 4, "title": "Router Boundary", "desc": "Router drops Layer 2 broadcast frames, containing the broadcast domain within the local subnet."}
    ],
    "structure": {
      "Hub (12 Ports)": "1 Collision Domain | 1 Broadcast Domain",
      "Bridge (2 Ports)": "2 Collision Domains | 1 Broadcast Domain",
      "Switch (24 Ports)": "24 Collision Domains | 1 Broadcast Domain (Default VLAN 1)",
      "Router (4 Ports)": "4 Collision Domains | 4 Broadcast Domains"
    },
    "vfx": "switching",
    "scenario": "An office network with 200 PCs suddenly suffers massive lag because a malfunctioning network printer is broadcasting thousands of invalid packets per second.",
    "challenge": "Because all 200 PCs reside on a single flat switch without VLANs, every PC's CPU interrupts to process the broadcast storm.",
    "resolution": "Subdivide the network into 4 subnets (50 PCs each) separated by a Layer 3 router. The broadcast storm is contained to only 50 PCs, saving the remaining 150 machines.",
    "examples": {
      "CSMA/CD": "Carrier Sense Multiple Access with Collision Detection (half-duplex)",
      "Collision Signal": "Jam signal transmitted when voltage spike detected on wire",
      "Broadcast Address IP": "255.255.255.255 or 192.168.1.255 (directed broadcast)",
      "Broadcast MAC": "FF:FF:FF:FF:FF:FF"
    },
    "traps": [
      {"wrong": "Switches eliminate broadcast domains.", "why": "Switches forward all broadcast frames.", "correct": "Switches eliminate collision domains; Routers eliminate broadcast domains."},
      {"wrong": "Full-duplex Ethernet still experiences packet collisions.", "why": "Full-duplex uses dedicated separate wire pairs for transmit (Tx) and receive (Rx).", "correct": "Full-duplex Ethernet has ZERO collisions; CSMA/CD is completely disabled on full-duplex switch links."},
      {"wrong": "A 48-port switch with 3 VLANs has 1 broadcast domain.", "why": "Each configured VLAN represents a distinct logical broadcast domain.", "correct": "A 48-port switch with 3 configured VLANs has 48 collision domains and 3 broadcast domains."}
    ],
    "interview": {
      "q": "You have a network with 2 hubs (each with 4 ports), connected to a 12-port switch, which connects to a router with 2 interfaces. How many collision domains and broadcast domains exist?",
      "a": "Let's count: 1. Each hub forms 1 collision domain regardless of how many devices connect to it. Two hubs = 2 collision domains. 2. The switch provides 1 collision domain per active port. If 2 ports connect to the hubs, 1 port connects to the router, and let's say remaining 9 ports connect to PCs: the switch has 12 collision domains. (Total collision domains = 12, because the hubs attach to individual switch ports). 3. The router interface isolates the broadcast domain. The switch and hubs all share 1 single broadcast domain on Router Interface 1. Router Interface 2 forms a 2nd broadcast domain. Total: 12 collision domains and 2 broadcast domains.",
      "tip": "Practice counting collision and broadcast domains from network topology diagrams. It is an extremely common technical test question."
    },
    "cheat": {
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
}

print(f"Loaded Part 1: {len(part1_topics)} topics")
