import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetPath = path.resolve(__dirname, '../client/src/data/os/osProblemSolvingData.js');

let content = fs.readFileSync(targetPath, 'utf-8');

// 1. Harmonize scheduling-basics practice questions
const oldBasicsPractice = `    // Practice Questions
    practiceQuestions: [
      {
        id: 'pb-1',
        difficulty: 'Easy',
        question: 'A process arrives at time t=3 and finishes execution at time t=11. Its burst time was 5 ms. Calculate its Turnaround Time and Waiting Time.',
        hints: ['TAT = CT - AT', 'WT = TAT - BT'],
        solution: 'CT = 11 ms, AT = 3 ms, BT = 5 ms.\\nTAT = CT - AT = 11 - 3 = 8 ms.\\nWT = TAT - BT = 8 - 5 = 3 ms.'
      },
      {
        id: 'pb-2',
        difficulty: 'Medium',
        question: 'Can Waiting Time ever be greater than Turnaround Time? Explain why or why not.',
        hints: ['Recall the formula: TAT = BT + WT.', 'Can Burst Time be negative?'],
        solution: 'No. Since TAT = WT + BT, and Burst Time (BT) is strictly positive (BT > 0), Turnaround Time must always be strictly greater than Waiting Time (TAT > WT).'
      }
    ]`;

const newBasicsPractice = `    // Practice Questions
    practiceQuestions: [
      {
        id: 'pb-1',
        title: 'Turnaround Time & Waiting Time Calculation',
        difficulty: 'Easy',
        scenario: 'A process arrives at time t=3 and finishes execution at time t=11. Its burst time was 5 ms. Calculate its Turnaround Time and Waiting Time.',
        question: 'A process arrives at time t=3 and finishes execution at time t=11. Its burst time was 5 ms. Calculate its Turnaround Time and Waiting Time.',
        hints: ['TAT = CT - AT', 'WT = TAT - BT'],
        solution: 'CT = 11 ms, AT = 3 ms, BT = 5 ms.\\nTAT = CT - AT = 11 - 3 = 8 ms.\\nWT = TAT - BT = 8 - 5 = 3 ms.'
      },
      {
        id: 'pb-2',
        title: 'Relationship Between WT and TAT',
        difficulty: 'Medium',
        scenario: 'Can Waiting Time ever be greater than Turnaround Time? Explain why or why not.',
        question: 'Can Waiting Time ever be greater than Turnaround Time? Explain why or why not.',
        hints: ['Recall the formula: TAT = BT + WT.', 'Can Burst Time be negative?'],
        solution: 'No. Since TAT = WT + BT, and Burst Time (BT) is strictly positive (BT > 0), Turnaround Time must always be strictly greater than Waiting Time (TAT > WT).'
      }
    ]`;

if (content.includes(oldBasicsPractice)) {
  content = content.replace(oldBasicsPractice, newBasicsPractice);
}

// 2. Add practiceQuestions to gantt-chart
const ganttEndMarker = `          'Always check if the end of the previous process is less than the arrival time of the next ready process.'
        ]
      }
    }
  },`;

const ganttWithPractice = `          'Always check if the end of the previous process is less than the arrival time of the next ready process.'
        ]
      }
    },
    practiceQuestions: [
      {
        id: 'gc-q1',
        title: 'Gantt Chart Idle Time Detection',
        difficulty: 'Easy',
        scenario: 'P1 arrives at t=0 with BT=4 ms. P2 arrives at t=7 with BT=3 ms. What is the total CPU idle time and at what interval does it occur?',
        question: 'P1 arrives at t=0 with BT=4 ms. P2 arrives at t=7 with BT=3 ms. What is the total CPU idle time and at what interval does it occur?',
        hints: ['P1 finishes at t=4.', 'When does P2 arrive?'],
        solution: 'P1 runs 0 to 4 ms. P2 arrives at t=7 ms. The CPU is idle from t=4 to t=7 ms. Total idle duration = 7 - 4 = 3 ms.'
      }
    ]
  },`;

if (content.includes(ganttEndMarker)) {
  content = content.replace(ganttEndMarker, ganttWithPractice);
}

// 3. Harmonize fcfs practice questions
const oldFcfsPractice = `    practiceQuestions: [
      {
        id: 'p-fcfs-1',
        difficulty: 'Easy',
        question: 'Three processes arrive at t=0 with bursts 24, 3, and 3 ms in order P1, P2, P3. Calculate average waiting time under FCFS.',
        hints: ['Gantt: P1(0-24), P2(24-27), P3(27-30)', 'WT = CT - AT - BT'],
        solution: 'P1 WT = 0 ms\\nP2 WT = 24 ms\\nP3 WT = 27 ms\\nAverage WT = (0 + 24 + 27) / 3 = 51 / 3 = 17.0 ms.\\n(Notice how P1 caused a Convoy Effect!).'
      },
      {
        id: 'p-fcfs-2',
        difficulty: 'Medium',
        question: 'In the above question, what would the average waiting time be if they arrived in reverse order P2, P3, P1 at t=0?',
        hints: ['Gantt: P2(0-3), P3(3-6), P1(6-30)', 'Compute new WT for each'],
        solution: 'P2 WT = 0 ms\\nP3 WT = 3 ms\\nP1 WT = 6 ms\\nAverage WT = (0 + 3 + 6) / 3 = 9 / 3 = 3.0 ms!\\n(Waiting time drops from 17ms to 3ms simply by changing arrival order!).'
      }
    ]`;

const newFcfsPractice = `    practiceQuestions: [
      {
        id: 'p-fcfs-1',
        title: 'Three Tasks with Staggered Bursts',
        difficulty: 'Easy',
        scenario: 'Three processes arrive at t=0 with bursts 24, 3, and 3 ms in order P1, P2, P3. Calculate average waiting time under FCFS.',
        question: 'Three processes arrive at t=0 with bursts 24, 3, and 3 ms in order P1, P2, P3. Calculate average waiting time under FCFS.',
        hints: ['Gantt: P1(0-24), P2(24-27), P3(27-30)', 'WT = CT - AT - BT'],
        solution: 'P1 WT = 0 ms\\nP2 WT = 24 ms\\nP3 WT = 27 ms\\nAverage WT = (0 + 24 + 27) / 3 = 51 / 3 = 17.0 ms.\\n(Notice how P1 caused a Convoy Effect!).'
      },
      {
        id: 'p-fcfs-2',
        title: 'Convoy Effect Order Reversal',
        difficulty: 'Medium',
        scenario: 'In the above question, what would the average waiting time be if they arrived in reverse order P2, P3, P1 at t=0?',
        question: 'In the above question, what would the average waiting time be if they arrived in reverse order P2, P3, P1 at t=0?',
        hints: ['Gantt: P2(0-3), P3(3-6), P1(6-30)', 'Compute new WT for each'],
        solution: 'P2 WT = 0 ms\\nP3 WT = 3 ms\\nP1 WT = 6 ms\\nAverage WT = (0 + 3 + 6) / 3 = 9 / 3 = 3.0 ms!\\n(Waiting time drops from 17ms to 3ms simply by changing arrival order!).'
      }
    ]`;

if (content.includes(oldFcfsPractice)) {
  content = content.replace(oldFcfsPractice, newFcfsPractice);
}

// 4. Add practiceQuestions to sjf-nonpreemptive
const sjfEndMarker = `          'Only compare bursts of processes that have ALREADY arrived.'
        ]
      }
    }
  },`;

const sjfWithPractice = `          'Only compare bursts of processes that have ALREADY arrived.'
        ]
      }
    },
    practiceQuestions: [
      {
        id: 'sjf-np-q1',
        title: 'SJF Optimal Average Waiting Time Proof',
        difficulty: 'Easy',
        scenario: 'Processes P1(AT=0, BT=6), P2(AT=0, BT=2), P3(AT=0, BT=8), P4(AT=0, BT=3) all arrive at t=0. Find the execution order that minimizes average waiting time.',
        question: 'Processes P1(AT=0, BT=6), P2(AT=0, BT=2), P3(AT=0, BT=8), P4(AT=0, BT=3) all arrive at t=0. Find the execution order that minimizes average waiting time.',
        hints: ['SJF is provably optimal for minimizing average waiting time when all processes arrive together.', 'Sort in ascending order of burst times.'],
        solution: 'Ascending order of bursts: P2 (2 ms), P4 (3 ms), P1 (6 ms), P3 (8 ms).\\nOrder: P2 -> P4 -> P1 -> P3.\\nWT: P2=0, P4=2, P1=5, P3=11.\\nAverage WT = (0 + 2 + 5 + 11)/4 = 18/4 = 4.5 ms.'
      }
    ]
  },`;

if (content.includes(sjfEndMarker)) {
  content = content.replace(sjfEndMarker, sjfWithPractice);
}

// 5. Add practiceQuestions to srtf
const srtfEndMarker = `          'Preemption check occurs ONLY when a new process arrives, NOT at every microsecond tick unless a clock interrupt is specifically modeled.'
        ]
      }
    }
  },`;

const srtfWithPractice = `          'Preemption check occurs ONLY when a new process arrives, NOT at every microsecond tick unless a clock interrupt is specifically modeled.'
        ]
      }
    },
    practiceQuestions: [
      {
        id: 'srtf-q1',
        title: 'SRTF Preemption Event Check',
        difficulty: 'Medium',
        scenario: 'P1 arrives at t=0 (BT=7). At t=2, P2 arrives (BT=4). Does P2 preempt P1? Calculate remaining burst of P1 at t=2.',
        question: 'P1 arrives at t=0 (BT=7). At t=2, P2 arrives (BT=4). Does P2 preempt P1? Calculate remaining burst of P1 at t=2.',
        hints: ['At t=2, P1 has executed for 2 ms.', 'Remaining burst of P1 = 7 - 2 = 5 ms.', 'Compare remaining P1 (5 ms) with P2 (4 ms).'],
        solution: 'At t=2, P1 remaining burst = 7 - 2 = 5 ms. P2 arrives with burst = 4 ms. Since 4 ms < 5 ms, P2 PREEMPTS P1 immediately.'
      }
    ]
  },`;

if (content.includes(srtfEndMarker)) {
  content = content.replace(srtfEndMarker, srtfWithPractice);
}

// 6. Add practiceQuestions to round-robin
const rrEndMarker = `          'Processes that finish early: P4 only needed 1ms, so CPU switched at 9ms instead of waiting for full quantum 2ms.'
        ]
      }
    }
  },`;

const rrWithPractice = `          'Processes that finish early: P4 only needed 1ms, so CPU switched at 9ms instead of waiting for full quantum 2ms.'
        ]
      }
    },
    practiceQuestions: [
      {
        id: 'rr-q1',
        title: 'Round Robin Quantum Boundary Behavior',
        difficulty: 'Medium',
        scenario: 'P1(AT=0, BT=5) and P2(AT=1, BT=3) run under RR with q=2. At t=2, P1 completes its first time slice. Who runs next on the CPU?',
        question: 'P1(AT=0, BT=5) and P2(AT=1, BT=3) run under RR with q=2. At t=2, P1 completes its first time slice. Who runs next on the CPU?',
        hints: ['At t=2, P2 is already in the ready queue (arrived at t=1).', 'P1 remaining burst is 3 ms.', 'P1 moves to the back of the queue.'],
        solution: 'At t=2, P2 is at the head of the ready queue. P1 is moved behind P2. Therefore, P2 is dispatched next on the CPU from t=2 to t=4.'
      }
    ]
  },`;

if (content.includes(rrEndMarker)) {
  content = content.replace(rrEndMarker, rrWithPractice);
}

// 7. Add practiceQuestions to bankers-algorithm
const bankerEndMarker = `          'Safe State is NOT a Deadlock State; an Unsafe State is NOT necessarily a Deadlock, but a state that MIGHT lead to deadlock if max demands are requested simultaneously.'
        ]
      }
    }
  },`;

const bankerWithPractice = `          'Safe State is NOT a Deadlock State; an Unsafe State is NOT necessarily a Deadlock, but a state that MIGHT lead to deadlock if max demands are requested simultaneously.'
        ]
      }
    },
    practiceQuestions: [
      {
        id: 'banker-q1',
        title: 'Banker Need Matrix Derivation',
        difficulty: 'Easy',
        scenario: 'Process P0 has Max = [7, 5, 3] and Allocation = [0, 1, 0]. Calculate the Need vector for P0.',
        question: 'Process P0 has Max = [7, 5, 3] and Allocation = [0, 1, 0]. Calculate the Need vector for P0.',
        hints: ['Need = Max - Allocation (element-wise subtraction)'],
        solution: 'Need = [7 - 0, 5 - 1, 3 - 0] = [7, 4, 3].'
      }
    ]
  },`;

if (content.includes(bankerEndMarker)) {
  content = content.replace(bankerEndMarker, bankerWithPractice);
}

// 8. Add practiceQuestions to page-replacement
const pageRepEndMarker = `          'In LRU, whenever a page hits, refresh its timestamp so it becomes the most recently used!'
        ]
      }
    }
  },`;

const pageRepWithPractice = `          'In LRU, whenever a page hits, refresh its timestamp so it becomes the most recently used!'
        ]
      }
    },
    practiceQuestions: [
      {
        id: 'pr-q1',
        title: 'Optimal Page Replacement Horizon',
        difficulty: 'Medium',
        scenario: 'Frames contain [2, 0, 1]. Next references are: 3, 0, 4, 2, 3, 0, 3, 2, 1. Under Optimal page replacement, which page in the frame is evicted for page 3?',
        question: 'Frames contain [2, 0, 1]. Next references are: 3, 0, 4, 2, 3, 0, 3, 2, 1. Under Optimal page replacement, which page in the frame is evicted for page 3?',
        hints: ['Next use of 2 is at index 3.', 'Next use of 0 is at index 1.', 'Next use of 1 is at index 8 (furthest in the future!).'],
        solution: 'Comparing future references: 0 is used at next step, 2 is used 3 steps later, 1 is used 8 steps later. Optimal evicts page 1 because its next use is furthest in the future.'
      }
    ]
  },`;

if (content.includes(pageRepEndMarker)) {
  content = content.replace(pageRepEndMarker, pageRepWithPractice);
}

// 9. Add practiceQuestions to disk-scheduling
const diskEndMarker = `          'C-SCAN vs C-LOOK: C-LOOK returns to the smallest request (14), not cylinder 0.'
        ]
      }
    }
  },`;

const diskWithPractice = `          'C-SCAN vs C-LOOK: C-LOOK returns to the smallest request (14), not cylinder 0.'
        ]
      }
    },
    practiceQuestions: [
      {
        id: 'disk-q1',
        title: 'SSTF Greedy Choice',
        difficulty: 'Easy',
        scenario: 'Head is at cylinder 50. Queue requests: [20, 60, 45, 80]. Which cylinder will SSTF service next, and what is the seek distance?',
        question: 'Head is at cylinder 50. Queue requests: [20, 60, 45, 80]. Which cylinder will SSTF service next, and what is the seek distance?',
        hints: ['SSTF chooses minimum |Request - Head|.'],
        solution: 'Distances: |20-50|=30, |60-50|=10, |45-50|=5, |80-50|=30.\\nMinimum distance is 5 (to cylinder 45). SSTF services cylinder 45 next.'
      }
    ]
  },`;

if (content.includes(diskEndMarker)) {
  content = content.replace(diskEndMarker, diskWithPractice);
}

// 10. Add practiceQuestions to memory-allocation
const memEndMarker = `          'External Fragmentation exists when total memory space exists to satisfy a request, but it is not contiguous.'
        ]
      }
    }
  },`;

const memWithPractice = `          'External Fragmentation exists when total memory space exists to satisfy a request, but it is not contiguous.'
        ]
      }
    },
    practiceQuestions: [
      {
        id: 'mem-q1',
        title: 'Internal Fragmentation Calculation',
        difficulty: 'Easy',
        scenario: 'A process of size 212 KB is allocated into a memory partition of size 500 KB. Calculate the resulting internal fragmentation.',
        question: 'A process of size 212 KB is allocated into a memory partition of size 500 KB. Calculate the resulting internal fragmentation.',
        hints: ['Internal Fragmentation = Partition Size - Process Size'],
        solution: 'Internal Fragmentation = 500 KB - 212 KB = 288 KB.'
      }
    ]
  },`;

if (content.includes(memEndMarker)) {
  content = content.replace(memEndMarker, memWithPractice);
}

// 11. Add practiceQuestions to paging-calculations
const pagingEndMarker = `          'Never multiply or divide in binary: just concatenate the frame number hex with the offset hex.'
        ]
      }
    }
  },`;

const pagingWithPractice = `          'Never multiply or divide in binary: just concatenate the frame number hex with the offset hex.'
        ]
      }
    },
    practiceQuestions: [
      {
        id: 'page-q1',
        title: 'Page Number and Offset Bits from Page Size',
        difficulty: 'Easy',
        scenario: 'In a 32-bit virtual memory system with 8 KB page size, find the number of offset bits and page number bits.',
        question: 'In a 32-bit virtual memory system with 8 KB page size, find the number of offset bits and page number bits.',
        hints: ['8 KB = 8 * 1024 bytes = 2^13 bytes.', 'Offset bits = 13.', 'Page number bits = 32 - 13.'],
        solution: 'Offset bits d = log2(8192) = 13 bits. Page number bits p = 32 - 13 = 19 bits.'
      }
    ]
  },`;

if (content.includes(pagingEndMarker)) {
  content = content.replace(pagingEndMarker, pagingWithPractice);
}

// 12. Add practiceQuestions to tlb-eat
const tlbEndMarker = `          'Do not forget the TLB search time in the miss path.'
        ]
      }
    }
  },`;

const tlbWithPractice = `          'Do not forget the TLB search time in the miss path.'
        ]
      }
    },
    practiceQuestions: [
      {
        id: 'tlb-q1',
        title: 'TLB Hit Ratio Sensitivity',
        difficulty: 'Medium',
        scenario: 'TLB lookup time = 20 ns, Memory access = 100 ns. Hit ratio increases from 80% to 90%. What is the improvement in Effective Access Time?',
        question: 'TLB lookup time = 20 ns, Memory access = 100 ns. Hit ratio increases from 80% to 90%. What is the improvement in Effective Access Time?',
        hints: ['Time_hit = 20 + 100 = 120 ns.', 'Time_miss = 20 + 100 + 100 = 220 ns.', 'Compute EAT at 80% and 90%.'],
        solution: 'EAT(80%) = 0.80*120 + 0.20*220 = 96 + 44 = 140 ns.\\nEAT(90%) = 0.90*120 + 0.10*220 = 108 + 22 = 130 ns.\\nImprovement = 140 - 130 = 10 ns faster.'
      }
    ]
  },`;

if (content.includes(tlbEndMarker)) {
  content = content.replace(tlbEndMarker, tlbWithPractice);
}

// 13. Add practiceQuestions to process-synchronization
const syncEndMarker = `          'Always acquire resource semaphores before the mutual exclusion lock.'
        ]
      }
    }
  }
};`;

const syncWithPractice = `          'Always acquire resource semaphores before the mutual exclusion lock.'
        ]
      }
    },
    practiceQuestions: [
      {
        id: 'sync-q1',
        title: 'Counting Semaphore Range Invariant',
        difficulty: 'Easy',
        scenario: 'A bounded buffer holds up to N=5 items. Semaphores are initialized: empty=5, full=0, mutex=1. What is the mathematical invariant between empty and full?',
        question: 'A bounded buffer holds up to N=5 items. Semaphores are initialized: empty=5, full=0, mutex=1. What is the mathematical invariant between empty and full?',
        hints: ['At any given time, every slot is either empty or full.'],
        solution: 'The invariant is: empty + full == N (always 5 in this system). When empty == 0, the buffer is full and producers block.'
      }
    ]
  }
};`;

if (content.includes(syncEndMarker)) {
  content = content.replace(syncEndMarker, syncWithPractice);
}

fs.writeFileSync(targetPath, content, 'utf-8');
console.log('Successfully patched practice questions!');
