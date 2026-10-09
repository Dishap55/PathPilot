/**
 * MASTER OPERATING SYSTEMS (OS) SECTION 6: REVISION & EXAM PREP DATA
 * 
 * Master revision materials for competitive exams and technical interviews:
 * 1. Categorized Formula Sheet
 * 2. High-Yield Architecture Comparison Tables
 * 3. Core System Flowcharts & State Pipelines
 * 4. Top 12 Placement Traps & Last-Minute Checklist
 */

export const OS_REVISION_FORMULAS = [
  {
    "category": "CPU Scheduling Metrics",
    "formulas": [
      {
        "name": "Turnaround Time (TAT)",
        "formula": "TAT = Completion Time (CT) - Arrival Time (AT)",
        "notes": "Total lifespan of a process in the system."
      },
      {
        "name": "Waiting Time (WT)",
        "formula": "WT = Turnaround Time (TAT) - Burst Time (BT)",
        "notes": "Total duration spent waiting in the Ready queue."
      },
      {
        "name": "Response Time (RT)",
        "formula": "RT = First CPU Time (ST) - Arrival Time (AT)",
        "notes": "Time from arrival until first scheduled on CPU (RT == WT in non-preemptive)."
      },
      {
        "name": "Average WT",
        "formula": "Avg WT = sum(WT_i) / n",
        "notes": "SJF minimizes this metric mathematically."
      },
      {
        "name": "CPU Utilization",
        "formula": "Utilization = (Busy Time / Total Time) * 100%",
        "notes": "Maximize by minimizing idle gaps in schedule."
      }
    ]
  },
  {
    "category": "Deadlocks & Resource Allocation",
    "formulas": [
      {
        "name": "Minimum Deadlock-Free Resources",
        "formula": "R >= n * (k - 1) + 1   OR   R >= sum(Max_i - 1) + 1",
        "notes": "n = number of processes, k = maximum demand per process."
      },
      {
        "name": "Banker's Need Matrix",
        "formula": "Need[i][j] = Max[i][j] - Allocation[i][j]",
        "notes": "Must satisfy Need[i] <= Available for process to run."
      },
      {
        "name": "Resource Reclaim upon Completion",
        "formula": "Available_new = Available_current + Allocation[i]",
        "notes": "Reclaim ALLOCATED resources, NOT Max resources!"
      }
    ]
  },
  {
    "category": "Paging & Memory Management",
    "formulas": [
      {
        "name": "Page Offset Bits (d)",
        "formula": "d = log2(Page Size in bytes)",
        "notes": "e.g., 4KB page = log2(4096) = 12 bits."
      },
      {
        "name": "Page Number Bits (p)",
        "formula": "p = Logical Address Bits - d",
        "notes": "e.g., 32 - 12 = 20 bits (2^20 pages)."
      },
      {
        "name": "Single-Level Page Table Size",
        "formula": "Size = 2^p * (PTE size in bytes)",
        "notes": "e.g., 2^20 * 4 bytes = 4MB per process."
      },
      {
        "name": "Physical Address Translation",
        "formula": "Physical Address = (Frame Number << d) | Offset",
        "notes": "Offset d is copied unchanged from logical to physical address."
      }
    ]
  },
  {
    "category": "Segmentation",
    "formulas": [
      {
        "name": "Segmentation Validity Condition",
        "formula": "0 <= Offset < Limit",
        "notes": "If Offset >= Limit -> Hardware raises SIGSEGV."
      },
      {
        "name": "Physical Address Calculation",
        "formula": "Physical Address = Base Address + Offset",
        "notes": "Arithmetic addition (not bitwise concatenation)."
      }
    ]
  },
  {
    "category": "TLB & Effective Access Time (EAT)",
    "formulas": [
      {
        "name": "Single-Level Paging with TLB",
        "formula": "EAT = h * (tlb + ma) + (1 - h) * (tlb + 2 * ma)",
        "notes": "h = hit ratio, tlb = TLB lookup time, ma = main memory access time."
      },
      {
        "name": "Multi-Level Paging (k levels) with TLB",
        "formula": "EAT = h * (tlb + ma) + (1 - h) * (tlb + (k + 1) * ma)",
        "notes": "Miss requires traversing k levels of page tables + 1 memory data access."
      }
    ]
  },
  {
    "category": "Virtual Memory & Demand Paging",
    "formulas": [
      {
        "name": "Demand Paging EAT",
        "formula": "EAT = (1 - p) * ma + p * (Page Fault Service Time)",
        "notes": "p = page fault rate (must be < 0.0001 to prevent severe thrashing)."
      }
    ]
  },
  {
    "category": "Secondary Storage & Disk Scheduling",
    "formulas": [
      {
        "name": "Average Rotational Latency",
        "formula": "Rotational Latency = 0.5 * (60 / RPM) seconds",
        "notes": "e.g., 7200 RPM -> 0.5 * (60 / 7200) = 4.17 ms."
      },
      {
        "name": "Transfer Time",
        "formula": "Transfer Time = (Data Size) / (Transfer Rate)",
        "notes": "Pure electronic bus read rate."
      },
      {
        "name": "Total Disk Access Time",
        "formula": "Total Access Time = Seek Time + Rotational Latency + Transfer Time",
        "notes": "Seek time is mechanical and dominates."
      }
    ]
  }
];
export const OS_REVISION_COMPARISONS = [
  {
    "title": "Process vs Thread",
    "headers": [
      "Property",
      "Process",
      "Thread"
    ],
    "rows": [
      [
        "Definition",
        "Program in active execution",
        "Lightweight basic unit of CPU utilization within a process"
      ],
      [
        "Address Space",
        "Independent isolated address space",
        "Shares code, data, and heap with peer threads"
      ],
      [
        "Context Switch Overhead",
        "Heavy (reloads page tables, flushes TLB)",
        "Lightweight (switches only registers and stack)"
      ],
      [
        "Inter-Communication",
        "Requires IPC (pipes, sockets, shared memory)",
        "Directly reads/writes shared heap variables"
      ],
      [
        "Crash Impact",
        "A process crash does not affect other processes",
        "One thread crash can corrupt the entire process"
      ]
    ]
  },
  {
    "title": "Preemptive vs Non-Preemptive Scheduling",
    "headers": [
      "Criteria",
      "Preemptive Scheduling",
      "Non-Preemptive Scheduling"
    ],
    "rows": [
      [
        "Interruption",
        "CPU can be forcibly seized from a running process",
        "Process retains CPU until it voluntarily yields or terminates"
      ],
      [
        "Overhead",
        "High (frequent context switches and queue updates)",
        "Low (minimal context switching overhead)"
      ],
      [
        "Starvation Risk",
        "Low-priority processes may starve without aging",
        "Short jobs can starve behind a long CPU-bound process"
      ],
      [
        "Real-Time Suitability",
        "Essential for responsive interactive and real-time systems",
        "Unsuitable for real-time due to unpredictable delays"
      ],
      [
        "Examples",
        "SRTF, Round Robin, Preemptive Priority",
        "FCFS, Non-preemptive SJF, Non-preemptive Priority"
      ]
    ]
  },
  {
    "title": "Mutex vs Semaphore",
    "headers": [
      "Feature",
      "Mutex (Mutual Exclusion Lock)",
      "Semaphore (Signaling Variable)"
    ],
    "rows": [
      [
        "Mechanism",
        "Strict binary locking mechanism",
        "Integer signaling variable (counting or binary)"
      ],
      [
        "Ownership",
        "Has thread ownership (only lock-holder can unlock)",
        "No ownership (any thread can call signal())"
      ],
      [
        "Value Range",
        "Binary only (0 = unlocked, 1 = locked)",
        "0 to N (counting) or 0 to 1 (binary)"
      ],
      [
        "Primary Use Case",
        "Protecting critical sections with mutual exclusion",
        "Managing shared resource pools and event signaling"
      ],
      [
        "Negative Value",
        "Never negative",
        "Negative value indicates exact count of sleeping threads"
      ]
    ]
  },
  {
    "title": "Paging vs Segmentation",
    "headers": [
      "Parameter",
      "Paging",
      "Segmentation"
    ],
    "rows": [
      [
        "Block Size",
        "Fixed size (typically 4KB powers of 2)",
        "Variable size matching logical code/data modules"
      ],
      [
        "Programmer Visibility",
        "Completely transparent (invisible to programmer)",
        "Visible to programmer (logical program view)"
      ],
      [
        "Hardware Formula",
        "Concatenation: Frame Number || Offset",
        "Arithmetic Addition: Base + Offset (after Limit check)"
      ],
      [
        "Fragmentation",
        "Zero external fragmentation; internal on last page",
        "Suffers from external fragmentation; zero internal fragmentation"
      ],
      [
        "Primary Purpose",
        "Eliminate contiguous allocation constraints",
        "Provide logical protection and sharing boundaries"
      ]
    ]
  },
  {
    "title": "Deadlock Handling Strategies",
    "headers": [
      "Strategy",
      "Approach",
      "Runtime Cost",
      "Key Tradeoff"
    ],
    "rows": [
      [
        "Deadlock Prevention",
        "Statically invalidate at least one Coffman condition",
        "Zero runtime check overhead",
        "Poor resource utilization and low throughput"
      ],
      [
        "Deadlock Avoidance",
        "Dynamically check Safe State before granting requests",
        "O(m * n^2) computation per request",
        "Requires advance knowledge of maximum resource demands"
      ],
      [
        "Deadlock Detection",
        "Allow allocations freely; periodically check for cycles",
        "O(n^2) cycle checks on WFG or matrix scans",
        "Must terminate or rollback victim processes when detected"
      ],
      [
        "Ostrich Algorithm",
        "Ignore the problem completely (assume deadlocks are rare)",
        "Zero CPU overhead",
        "System freezes if deadlock occurs; requires reboot"
      ]
    ]
  }
];
export const OS_REVISION_FLOWCHARTS = [
  {
    "title": "Process 5-State Lifecycle",
    "nodes": [
      "New (Created)",
      "Ready (Admitted to Queue)",
      "Running (Dispatched to CPU)",
      "Waiting (Blocked on I/O)",
      "Terminated (Exit)"
    ],
    "summary": "Scheduler dispatches Ready -> Running; I/O transitions Running -> Waiting; I/O completion moves Waiting -> Ready; Timer interrupt moves Running -> Ready."
  },
  {
    "title": "CPU Scheduling Pipeline",
    "nodes": [
      "Processes Arrive",
      "Ready Queue",
      "CPU Scheduler Dispatcher",
      "CPU Execution",
      "Gantt Chart",
      "Metrics: CT, TAT, WT, RT"
    ],
    "summary": "Scheduler selects process from Ready Queue; context switcher dispatches to CPU; execution tracked in Gantt Chart to calculate average turnaround and wait times."
  },
  {
    "title": "Banker's Algorithm Safety Validation",
    "nodes": [
      "Available Vector",
      "Scan: Need[i] <= Available?",
      "Process Pi Finishes",
      "Available += Allocation[i]",
      "Repeat until all Finish == true",
      "Safe Sequence Derived!"
    ],
    "summary": "If all processes can finish in at least one sequence, system is in SAFE STATE; granting request is safe."
  },
  {
    "title": "Page Fault Resolution Flow",
    "nodes": [
      "CPU Access (Valid bit = 0)",
      "Page Fault Exception Trap",
      "OS finds free frame in RAM",
      "Disk I/O reads page from Swap",
      "Page Table Updated (Valid = 1)",
      "Restart Trapped Instruction"
    ],
    "summary": "Hardware MMU traps to OS; OS reads page from secondary storage into free frame, updates page table, and restarts CPU instruction seamlessly."
  },
  {
    "title": "Disk Head Scheduling Sweep",
    "nodes": [
      "Disk Request Queue",
      "Algorithm: SSTF / SCAN / LOOK",
      "Head Seeks to Track Cylinder",
      "Rotational Latency to Sector",
      "Data Transferred",
      "Total Seek Movement Recorded"
    ],
    "summary": "Algorithm reorders I/O requests to minimize physical actuator arm seek movement across cylinder platters."
  }
];
export const OS_REVISION_TRAPS = [
  "Believing that an Unsafe State is already a Deadlock (an unsafe state merely carries risk of deadlock if processes request maximums).",
  "Assuming LRU can suffer from Belady's Anomaly (LRU is a stack algorithm and is mathematically immune to Belady's).",
  "Forgetting that single-level page tables must be allocated CONTIGUOUSLY in physical RAM (why multi-level paging is required).",
  "Adding Max resources instead of Allocation to Available when a process terminates in Banker's Algorithm.",
  "Applying disk scheduling elevator algorithms (SCAN/LOOK) to SSDs (SSDs have zero seek time and don't need elevator scheduling).",
  "Thinking a TLB Miss is identical to a Page Fault (TLB Miss searches RAM page table in ~100ns; Page Fault traps to SSD swap in ~10ms).",
  "Assuming disabling interrupts works on multi-core servers (disabling interrupts only affects the local core; peer cores can still access shared RAM).",
  "Confusing internal fragmentation with external fragmentation (paging has internal on the last page; variable partitioning has external).",
  "Believing strict alternation satisfies the Critical Section Progress requirement (it violates Progress if one thread halts outside CS).",
  "Thinking fork() returns 0 to the parent (fork returns 0 to the child and the child's PID to the parent).",
  "Traveling all the way to cylinder 0 or 199 in LOOK scheduling (LOOK stops at the last requested cylinder; only SCAN travels to the physical boundary).",
  "Treating Mutex and Binary Semaphore as completely identical (Mutex enforces thread ownership; Semaphore has no ownership and can be signaled by any thread)."
];
