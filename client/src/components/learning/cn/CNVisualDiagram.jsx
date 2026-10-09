import React from 'react';
import {
  Layers,
  Network,
  Server,
  Globe,
  Radio,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Lock,
  Workflow,
  Binary,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

/**
 * CNVisualDiagram Component
 * Interactive visual diagrams and packet structure visualizers tailored for Computer Networks.
 */
export default function CNVisualDiagram({ type, title = '', subtitle = '' }) {
  const renderDiagram = () => {
    switch (type) {
      // 1. OSI 7-Layer Stack vs TCP/IP 4-Layer Model
      case 'osi-model':
      case 'osi-7-layers':
      case 'osi-vs-tcp-ip':
        return (
          <div className="space-y-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* OSI Model (7 Layers) */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wide">OSI 7-Layer Model (ISO)</span>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">Conceptual</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="p-2 bg-pink-100/70 border border-pink-200 rounded-xl flex items-center justify-between font-semibold text-pink-950">
                    <span>L7: Application</span>
                    <span className="font-mono text-[10px] text-pink-700">HTTP, DNS, SSH (Data)</span>
                  </div>
                  <div className="p-2 bg-purple-100/70 border border-purple-200 rounded-xl flex items-center justify-between font-semibold text-purple-950">
                    <span>L6: Presentation</span>
                    <span className="font-mono text-[10px] text-purple-700">SSL/TLS, ASCII, JPEG</span>
                  </div>
                  <div className="p-2 bg-indigo-100/70 border border-indigo-200 rounded-xl flex items-center justify-between font-semibold text-indigo-950">
                    <span>L5: Session</span>
                    <span className="font-mono text-[10px] text-indigo-700">Sockets, RPC, NetBIOS</span>
                  </div>
                  <div className="p-2 bg-blue-100/70 border border-blue-200 rounded-xl flex items-center justify-between font-semibold text-blue-950">
                    <span>L4: Transport</span>
                    <span className="font-mono text-[10px] text-blue-700">TCP, UDP (Segments)</span>
                  </div>
                  <div className="p-2 bg-cyan-100/70 border border-cyan-200 rounded-xl flex items-center justify-between font-semibold text-cyan-950">
                    <span>L3: Network</span>
                    <span className="font-mono text-[10px] text-cyan-700">IPv4, IPv6, ICMP (Packets)</span>
                  </div>
                  <div className="p-2 bg-emerald-100/70 border border-emerald-200 rounded-xl flex items-center justify-between font-semibold text-emerald-950">
                    <span>L2: Data Link</span>
                    <span className="font-mono text-[10px] text-emerald-700">Ethernet, ARP, MAC (Frames)</span>
                  </div>
                  <div className="p-2 bg-slate-200/70 border border-slate-300 rounded-xl flex items-center justify-between font-semibold text-slate-800">
                    <span>L1: Physical</span>
                    <span className="font-mono text-[10px] text-slate-600">Cables, Hubs, Wi-Fi (Bits)</span>
                  </div>
                </div>
              </div>

              {/* TCP/IP Model (4 Layers) */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wide">TCP/IP 4-Layer Model (DoD)</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">Implemented</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-4 bg-pink-100/90 border border-pink-300 rounded-xl space-y-1">
                    <div className="flex items-center justify-between font-bold text-pink-950">
                      <span>1. Application Layer</span>
                      <span className="text-[10px] font-mono text-pink-700">Combines OSI L5, L6, L7</span>
                    </div>
                    <p className="text-[11px] text-pink-800">HTTP, HTTPS, DNS, DHCP, SSH, FTP, SMTP</p>
                  </div>
                  <div className="p-3 bg-blue-100/90 border border-blue-300 rounded-xl space-y-1">
                    <div className="flex items-center justify-between font-bold text-blue-950">
                      <span>2. Transport Layer</span>
                      <span className="text-[10px] font-mono text-blue-700">Matches OSI L4</span>
                    </div>
                    <p className="text-[11px] text-blue-800">TCP (Reliable Byte-Stream) & UDP (Datagram)</p>
                  </div>
                  <div className="p-3 bg-cyan-100/90 border border-cyan-300 rounded-xl space-y-1">
                    <div className="flex items-center justify-between font-bold text-cyan-950">
                      <span>3. Internet Layer</span>
                      <span className="text-[10px] font-mono text-cyan-700">Matches OSI L3</span>
                    </div>
                    <p className="text-[11px] text-cyan-800">IP, ICMP, ARP, NAT, Routing Protocols</p>
                  </div>
                  <div className="p-3 bg-emerald-100/90 border border-emerald-300 rounded-xl space-y-1">
                    <div className="flex items-center justify-between font-bold text-emerald-950">
                      <span>4. Network Interface (Link)</span>
                      <span className="text-[10px] font-mono text-emerald-700">Combines OSI L1 & L2</span>
                    </div>
                    <p className="text-[11px] text-emerald-800">Ethernet, Wi-Fi 802.11, MAC, Physical medium</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // 2. TCP Header Structure (20 Bytes minimum)
      case 'tcp-header':
      case 'tcp-protocol':
        return (
          <div className="space-y-3 py-2 font-mono text-xs">
            <div className="border-2 border-slate-300 rounded-2xl overflow-hidden shadow-xs">
              <div className="grid grid-cols-12 bg-indigo-900 text-white font-bold p-2 text-center text-[10px] uppercase">
                <span className="col-span-6 border-r border-indigo-700">Source Port (16 bits)</span>
                <span className="col-span-6">Destination Port (16 bits)</span>
              </div>
              <div className="grid grid-cols-12 bg-indigo-800 text-indigo-100 font-bold p-2.5 text-center text-[11px] border-t border-indigo-700">
                <span className="col-span-12">Sequence Number (32 bits)</span>
              </div>
              <div className="grid grid-cols-12 bg-indigo-700 text-indigo-50 font-bold p-2.5 text-center text-[11px] border-t border-indigo-600">
                <span className="col-span-12">Acknowledgment Number (32 bits)</span>
              </div>
              <div className="grid grid-cols-12 bg-indigo-600 text-white p-2 text-center text-[10px] border-t border-indigo-500 font-bold">
                <span className="col-span-2 border-r border-indigo-500">Data Offset (4b)</span>
                <span className="col-span-2 border-r border-indigo-500">Reserved (3b)</span>
                <span className="col-span-4 border-r border-indigo-500 bg-amber-500/80 text-slate-950 font-black">Flags: URG, ACK, PSH, RST, SYN, FIN</span>
                <span className="col-span-4">Window Size (16 bits)</span>
              </div>
              <div className="grid grid-cols-12 bg-indigo-900 text-indigo-200 p-2 text-center text-[10px] border-t border-indigo-700">
                <span className="col-span-6 border-r border-indigo-700">Checksum (16 bits)</span>
                <span className="col-span-6">Urgent Pointer (16 bits)</span>
              </div>
              <div className="bg-slate-100 text-slate-700 p-2.5 text-center text-[11px] font-sans font-medium border-t border-slate-300">
                Options (0 to 40 bytes) + Data / Application Payload
              </div>
            </div>
            <div className="text-[11px] text-slate-600 font-sans text-center">
              Minimum TCP header size is <strong>20 bytes</strong> (when Data Offset = 5 words). Maximum is 60 bytes.
            </div>
          </div>
        );

      // 3. IPv4 Header Structure
      case 'ipv4-header':
      case 'ip-addressing':
        return (
          <div className="space-y-3 py-2 font-mono text-xs">
            <div className="border-2 border-slate-300 rounded-2xl overflow-hidden shadow-xs">
              <div className="grid grid-cols-12 bg-cyan-900 text-white font-bold p-2 text-center text-[10px]">
                <span className="col-span-2 border-r border-cyan-800">Version (4b)</span>
                <span className="col-span-2 border-r border-cyan-800">IHL (4b)</span>
                <span className="col-span-3 border-r border-cyan-800">Type of Service (8b)</span>
                <span className="col-span-5">Total Length (16 bits)</span>
              </div>
              <div className="grid grid-cols-12 bg-cyan-800 text-cyan-100 p-2 text-center text-[10px] border-t border-cyan-700">
                <span className="col-span-6 border-r border-cyan-700">Identification (16 bits)</span>
                <span className="col-span-2 border-r border-cyan-700 font-black text-amber-300">Flags (3b)</span>
                <span className="col-span-4">Fragment Offset (13 bits)</span>
              </div>
              <div className="grid grid-cols-12 bg-cyan-700 text-white font-bold p-2 text-center text-[10px] border-t border-cyan-600">
                <span className="col-span-3 border-r border-cyan-600 bg-amber-600/60">TTL (8 bits)</span>
                <span className="col-span-3 border-r border-cyan-600">Protocol (8 bits)</span>
                <span className="col-span-6">Header Checksum (16 bits)</span>
              </div>
              <div className="bg-cyan-950 text-emerald-300 p-2.5 text-center text-[11px] font-bold border-t border-cyan-800">
                Source IP Address (32 bits / 4 bytes, e.g. 192.168.1.10)
              </div>
              <div className="bg-cyan-950 text-emerald-300 p-2.5 text-center text-[11px] font-bold border-t border-cyan-800">
                Destination IP Address (32 bits / 4 bytes, e.g. 142.250.72.14)
              </div>
            </div>
            <div className="text-[11px] text-slate-600 font-sans text-center">
              TTL prevents infinite routing loops. Each router hop decrements TTL by 1. When TTL=0, router drops packet and sends ICMP Type 11.
            </div>
          </div>
        );

      // 4. Ethernet Frame Structure (IEEE 802.3)
      case 'ethernet-frame':
      case 'ethernet-frames':
      case 'mac-address':
        return (
          <div className="space-y-3 py-2 font-mono text-xs">
            <div className="flex flex-wrap sm:flex-nowrap border-2 border-slate-300 rounded-2xl overflow-hidden shadow-xs text-center">
              <div className="w-full sm:w-16 p-2 bg-slate-200 text-slate-700 border-r border-slate-300 text-[10px]">
                <span className="block font-bold">Preamble</span>
                <span className="text-[9px] text-slate-500">7 Bytes</span>
              </div>
              <div className="w-full sm:w-12 p-2 bg-slate-300 text-slate-800 border-r border-slate-400 text-[10px]">
                <span className="block font-bold">SFD</span>
                <span className="text-[9px] text-slate-600">1 Byte</span>
              </div>
              <div className="w-full sm:w-1/4 p-2 bg-emerald-800 text-emerald-100 border-r border-emerald-700 text-[10px]">
                <span className="block font-bold">Dest MAC Address</span>
                <span className="text-[9px] text-emerald-300">6 Bytes (48 bits)</span>
              </div>
              <div className="w-full sm:w-1/4 p-2 bg-emerald-900 text-emerald-200 border-r border-emerald-800 text-[10px]">
                <span className="block font-bold">Src MAC Address</span>
                <span className="text-[9px] text-emerald-400">6 Bytes (48 bits)</span>
              </div>
              <div className="w-full sm:w-16 p-2 bg-indigo-700 text-indigo-100 border-r border-indigo-600 text-[10px]">
                <span className="block font-bold">EtherType</span>
                <span className="text-[9px] text-indigo-300">0x0800 (IPv4)</span>
              </div>
              <div className="flex-1 p-2 bg-amber-50 text-amber-950 border-r border-amber-200 text-[11px] font-sans font-bold">
                Payload / Encapsulated IP Packet (46 to 1500 Bytes MTU)
              </div>
              <div className="w-full sm:w-16 p-2 bg-red-900 text-red-200 text-[10px]">
                <span className="block font-bold">FCS (CRC)</span>
                <span className="text-[9px] text-red-300">4 Bytes</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-600 font-sans text-center">
              Standard Ethernet Maximum Transmission Unit (MTU) is <strong>1500 Bytes</strong>. Minimum total frame size is 64 Bytes.
            </div>
          </div>
        );

      // Default: Network Topologies Overview
      default:
        return (
          <div className="py-2 space-y-4 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-indigo-600 uppercase">Star Topology</span>
                <h4 className="font-black text-indigo-950">Central Switch Hub</h4>
                <p className="text-[11px] text-indigo-700">All nodes connect to a single central switch. Cable cut affects only 1 host.</p>
              </div>
              <div className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-emerald-600 uppercase">Mesh Topology</span>
                <h4 className="font-black text-emerald-950">Point-to-Point Full Mesh</h4>
                <p className="text-[11px] text-emerald-700">Every node connects to every other node: n(n-1)/2 links. Maximum redundancy.</p>
              </div>
              <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-amber-600 uppercase">Bus Topology</span>
                <h4 className="font-black text-amber-950">Shared Backbone Cable</h4>
                <p className="text-[11px] text-amber-700">Single coaxial backbone with terminators. Backbone failure breaks entire network.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
      {title && (
        <div className="border-b border-slate-100 pb-2">
          <h4 className="text-xs sm:text-sm font-black text-slate-800">{title}</h4>
          {subtitle && <p className="text-[11px] text-slate-500 font-medium">{subtitle}</p>}
        </div>
      )}
      {renderDiagram()}
    </div>
  );
}
