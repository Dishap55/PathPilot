/**
 * MASTER OPERATING SYSTEMS (OS) SECTION 7: NUMERICALS
 * 
 * Teaches HOW to solve OS numericals step-by-step with the complete 12-stage framework:
 * 1. What is the problem?
 * 2. What information is given?
 * 3. What do we need to find?
 * 4. Which formula/rule is required?
 * 5. How do we start?
 * 6. Step-by-step calculation
 * 7. Update the table/visual
 * 8. Continue until problem is complete
 * 9. Final calculation
 * 10. Final answer
 * 11. Verify the answer
 * 12. Common mistake
 * 
 * 13 Canonical Numerical Topics:
 * 1. CPU Scheduling Basics
 * 2. FCFS Scheduling
 * 3. SJF (Non-Preemptive)
 * 4. SRTF (Preemptive SJF)
 * 5. Priority Scheduling
 * 6. Round Robin
 * 7. MLQ / MLFQ
 * 8. Banker's Algorithm
 * 9. Memory Allocation (First, Best, Worst Fit)
 * 10. Paging & Address Translation
 * 11. Page Replacement (FIFO, LRU, Optimal)
 * 12. TLB & Effective Access Time
 * 13. Disk Scheduling (FCFS, SSTF, SCAN, LOOK)
 */

export const OS_NUMERICAL_TOPICS = [
  // 1. CPU SCHEDULING BASICS
  {
    id: 'cpu-scheduling-basics',
    title: '1. CPU Scheduling Basics',
    shortTitle: 'Scheduling Basics',
    category: 'CPU Scheduling',
    domainId: 'scheduling',
    badge: 'Core Foundation',
    summary: 'Master every fundamental scheduling term: Arrival Time (AT), Burst Time (BT), Completion Time (CT), Turnaround Time (TAT), Waiting Time (WT), and Response Time (RT) with exact formulas and Gantt timeline construction.',
    problem: 'Given a set of 3 processes with arrival times and burst times, understand all core metrics, construct the execution Gantt chart step-by-step, and compute CT, TAT, WT, RT, and averages.',
    givenData: [
      { process: 'P1', at: 0, bt: 4, notes: 'Arrives at start (t=0)' },
      { process: 'P2', at: 1, bt: 3, notes: 'Arrives while P1 executes (t=1)' },
      { process: 'P3', at: 2, bt: 2, notes: 'Arrives while P1 executes (t=2)' }
    ],
    whatToFind: [
      'Completion Time (CT) for P1, P2, P3',
      'Turnaround Time (TAT) for P1, P2, P3',
      'Waiting Time (WT) for P1, P2, P3',
      'Response Time (RT) for P1, P2, P3',
      'Average Turnaround Time & Average Waiting Time'
    ],
    formulas: [
      { name: 'Turnaround Time (TAT)', formula: 'TAT = CT - AT', desc: 'Total time spent inside the system from arrival to completion.' },
      { name: 'Waiting Time (WT)', formula: 'WT = TAT - BT', desc: 'Total time spent waiting idle in the Ready Queue wanting the CPU.' },
      { name: 'Response Time (RT)', formula: 'RT = First CPU Start Time - AT', desc: 'Delay from arrival until CPU touches the process for the very first time.' },
      { name: 'Average Metric', formula: 'Average = (Sum of metric across all N processes) / N', desc: 'System-wide performance average.' }
    ],
    initialState: {
      time: 0,
      readyQueue: ['P1 (BT=4)'],
      cpu: 'Idle -> Ready to allocate to P1',
      gantt: []
    },
    steps: [
      {
        step: 1,
        time: 't = 0 ms',
        action: 'Dispatch P1 to CPU',
        why: 'P1 is the only arrived process at t=0. Its first start time is t=0.',
        calculation: 'Runs for its full burst of 4 ms: 0 to 4 ms. P1 completes at t=4.',
        readyQueue: ['P2 (arrived t=1)', 'P3 (arrived t=2)'],
        gantt: [{ process: 'P1', start: 0, end: 4 }],
        tableState: [
          { process: 'P1', at: 0, bt: 4, firstStart: 0, ct: 4, tat: 4, wt: 0, rt: 0, status: 'Completed' },
          { process: 'P2', at: 1, bt: 3, firstStart: '-', ct: '-', tat: '-', wt: '-', rt: '-', status: 'Ready' },
          { process: 'P3', at: 2, bt: 2, firstStart: '-', ct: '-', tat: '-', wt: '-', rt: '-', status: 'Ready' }
        ]
      },
      {
        step: 2,
        time: 't = 4 ms',
        action: 'Dispatch P2 to CPU',
        why: 'P2 arrived at t=1, before P3 at t=2. Under sequential queue order, P2 gets the CPU at t=4.',
        calculation: 'First start time = 4 ms. Runs for 3 ms: 4 to 7 ms. P2 completes at t=7.',
        readyQueue: ['P3 (arrived t=2)'],
        gantt: [{ process: 'P1', start: 0, end: 4 }, { process: 'P2', start: 4, end: 7 }],
        tableState: [
          { process: 'P1', at: 0, bt: 4, firstStart: 0, ct: 4, tat: 4, wt: 0, rt: 0, status: 'Completed' },
          { process: 'P2', at: 1, bt: 3, firstStart: 4, ct: 7, tat: 6, wt: 3, rt: 3, status: 'Completed' },
          { process: 'P3', at: 2, bt: 2, firstStart: '-', ct: '-', tat: '-', wt: '-', rt: '-', status: 'Ready' }
        ]
      },
      {
        step: 3,
        time: 't = 7 ms',
        action: 'Dispatch P3 to CPU',
        why: 'P3 is the sole remaining process in the Ready Queue.',
        calculation: 'First start time = 7 ms. Runs for 2 ms: 7 to 9 ms. P3 completes at t=9.',
        readyQueue: ['(Empty)'],
        gantt: [{ process: 'P1', start: 0, end: 4 }, { process: 'P2', start: 4, end: 7 }, { process: 'P3', start: 7, end: 9 }],
        tableState: [
          { process: 'P1', at: 0, bt: 4, firstStart: 0, ct: 4, tat: 4, wt: 0, rt: 0, status: 'Completed' },
          { process: 'P2', at: 1, bt: 3, firstStart: 4, ct: 7, tat: 6, wt: 3, rt: 3, status: 'Completed' },
          { process: 'P3', at: 2, bt: 2, firstStart: 7, ct: 9, tat: 7, wt: 5, rt: 5, status: 'Completed' }
        ]
      }
    ],
    finalCalculations: [
      { metric: 'P1 Calculations', formula: 'CT = 4 | TAT = 4 - 0 = 4 ms | WT = 4 - 4 = 0 ms | RT = 0 - 0 = 0 ms' },
      { metric: 'P2 Calculations', formula: 'CT = 7 | TAT = 7 - 1 = 6 ms | WT = 6 - 3 = 3 ms | RT = 4 - 1 = 3 ms' },
      { metric: 'P3 Calculations', formula: 'CT = 9 | TAT = 9 - 2 = 7 ms | WT = 7 - 2 = 5 ms | RT = 7 - 2 = 5 ms' },
      { metric: 'Average Turnaround Time (TAT)', formula: '(4 + 6 + 7) / 3 = 17 / 3 = 5.67 ms' },
      { metric: 'Average Waiting Time (WT)', formula: '(0 + 3 + 5) / 3 = 8 / 3 = 2.67 ms' },
      { metric: 'Average Response Time (RT)', formula: '(0 + 3 + 5) / 3 = 8 / 3 = 2.67 ms' }
    ],
    finalAnswer: {
      headers: ['Process', 'Arrival (AT)', 'Burst (BT)', 'First Start', 'Completion (CT)', 'Turnaround (TAT)', 'Waiting (WT)', 'Response (RT)'],
      rows: [
        ['P1', '0 ms', '4 ms', '0 ms', '4 ms', '4 ms', '0 ms', '0 ms'],
        ['P2', '1 ms', '3 ms', '4 ms', '7 ms', '6 ms', '3 ms', '3 ms'],
        ['P3', '2 ms', '2 ms', '7 ms', '9 ms', '7 ms', '5 ms', '5 ms']
      ],
      summary: 'Average TAT = 5.67 ms | Average WT = 2.67 ms | Average RT = 2.67 ms'
    },
    verification: [
      'Total Gantt timeline length (9 ms) matches the sum of bursts (4 + 3 + 2 = 9 ms) with zero idle gaps.',
      'TAT is greater than or equal to BT for every process (TAT >= BT holds true).',
      'Because scheduling is non-preemptive here, Waiting Time equals Response Time for each process (WT == RT).'
    ],
    commonMistake: 'Subtracting Burst Time instead of Arrival Time when finding Turnaround Time (TAT = CT - AT, NOT CT - BT). Also confusing Response Time with Waiting Time in preemptive environments.'
  },

  // 2. FCFS SCHEDULING
  {
    id: 'fcfs-numerical',
    title: '2. FCFS Scheduling',
    shortTitle: 'FCFS',
    category: 'CPU Scheduling',
    domainId: 'scheduling',
    badge: 'Non-Preemptive',
    summary: 'First-Come, First-Served schedules processes in strict order of arrival timestamp. Learn how Convoy Effect manifests and compute complete Gantt charts.',
    problem: 'Four processes arrive with staggered arrival times. Draw the step-by-step Gantt chart and calculate CT, TAT, WT, RT, and average times under FCFS scheduling.',
    givenData: [
      { process: 'P1', at: 0, bt: 5, notes: 'Arrives at t=0' },
      { process: 'P2', at: 1, bt: 3, notes: 'Arrives at t=1' },
      { process: 'P3', at: 2, bt: 8, notes: 'Arrives at t=2 (Long burst - convoy source)' },
      { process: 'P4', at: 3, bt: 6, notes: 'Arrives at t=3' }
    ],
    whatToFind: [
      'Gantt Chart timeline from t=0 to completion',
      'Completion Time (CT) for all 4 processes',
      'Turnaround Time (TAT) and Waiting Time (WT)',
      'System Average Waiting Time and Average Turnaround Time'
    ],
    formulas: [
      { name: 'FCFS Dispatch Rule', formula: 'Dispatch process with minimum Arrival Time (min AT)', desc: 'Pure FIFO queue order.' },
      { name: 'TAT Formula', formula: 'TAT = CT - AT', desc: 'Exit clock minus arrival clock.' },
      { name: 'WT Formula', formula: 'WT = TAT - BT', desc: 'Turnaround minus execution time.' }
    ],
    initialState: {
      time: 0,
      readyQueue: ['P1 (rem=5)'],
      cpu: 'Dispatches P1 at t=0',
      gantt: []
    },
    steps: [
      {
        step: 1,
        time: 't = 0 ms',
        action: 'Dispatch P1 (0 to 5 ms)',
        why: 'P1 is the earliest arrival at t=0. Runs for 5 ms to completion.',
        calculation: 'CT for P1 = 5 ms.',
        readyQueue: ['P2 (at=1)', 'P3 (at=2)', 'P4 (at=3)'],
        gantt: [{ process: 'P1', start: 0, end: 5 }],
        tableState: [
          { process: 'P1', at: 0, bt: 5, ct: 5, tat: 5, wt: 0, rt: 0, status: 'Completed' },
          { process: 'P2', at: 1, bt: 3, ct: '-', tat: '-', wt: '-', rt: '-', status: 'Ready' },
          { process: 'P3', at: 2, bt: 8, ct: '-', tat: '-', wt: '-', rt: '-', status: 'Ready' },
          { process: 'P4', at: 3, bt: 6, ct: '-', tat: '-', wt: '-', rt: '-', status: 'Ready' }
        ]
      },
      {
        step: 2,
        time: 't = 5 ms',
        action: 'Dispatch P2 (5 to 8 ms)',
        why: 'P2 has the earliest arrival time among ready processes (AT=1).',
        calculation: 'CT for P2 = 5 + 3 = 8 ms. First start = 5 ms.',
        readyQueue: ['P3 (at=2)', 'P4 (at=3)'],
        gantt: [{ process: 'P1', start: 0, end: 5 }, { process: 'P2', start: 5, end: 8 }],
        tableState: [
          { process: 'P1', at: 0, bt: 5, ct: 5, tat: 5, wt: 0, rt: 0, status: 'Completed' },
          { process: 'P2', at: 1, bt: 3, ct: 8, tat: 7, wt: 4, rt: 4, status: 'Completed' },
          { process: 'P3', at: 2, bt: 8, ct: '-', tat: '-', wt: '-', rt: '-', status: 'Ready' },
          { process: 'P4', at: 3, bt: 6, ct: '-', tat: '-', wt: '-', rt: '-', status: 'Ready' }
        ]
      },
      {
        step: 3,
        time: 't = 8 ms',
        action: 'Dispatch P3 (8 to 16 ms)',
        why: 'P3 arrived at t=2 (before P4 at t=3). Runs for 8 ms.',
        calculation: 'CT for P3 = 8 + 8 = 16 ms. First start = 8 ms.',
        readyQueue: ['P4 (at=3)'],
        gantt: [{ process: 'P1', start: 0, end: 5 }, { process: 'P2', start: 5, end: 8 }, { process: 'P3', start: 8, end: 16 }],
        tableState: [
          { process: 'P1', at: 0, bt: 5, ct: 5, tat: 5, wt: 0, rt: 0, status: 'Completed' },
          { process: 'P2', at: 1, bt: 3, ct: 8, tat: 7, wt: 4, rt: 4, status: 'Completed' },
          { process: 'P3', at: 2, bt: 8, ct: 16, tat: 14, wt: 6, rt: 6, status: 'Completed' },
          { process: 'P4', at: 3, bt: 6, ct: '-', tat: '-', wt: '-', rt: '-', status: 'Ready' }
        ]
      },
      {
        step: 4,
        time: 't = 16 ms',
        action: 'Dispatch P4 (16 to 22 ms)',
        why: 'P4 is the final remaining process. Runs for 6 ms.',
        calculation: 'CT for P4 = 16 + 6 = 22 ms. First start = 16 ms.',
        readyQueue: ['(Empty)'],
        gantt: [{ process: 'P1', start: 0, end: 5 }, { process: 'P2', start: 5, end: 8 }, { process: 'P3', start: 8, end: 16 }, { process: 'P4', start: 16, end: 22 }],
        tableState: [
          { process: 'P1', at: 0, bt: 5, ct: 5, tat: 5, wt: 0, rt: 0, status: 'Completed' },
          { process: 'P2', at: 1, bt: 3, ct: 8, tat: 7, wt: 4, rt: 4, status: 'Completed' },
          { process: 'P3', at: 2, bt: 8, ct: 16, tat: 14, wt: 6, rt: 6, status: 'Completed' },
          { process: 'P4', at: 3, bt: 6, ct: 22, tat: 19, wt: 13, rt: 13, status: 'Completed' }
        ]
      }
    ],
    finalCalculations: [
      { metric: 'P1', formula: 'CT = 5 ms | TAT = 5 - 0 = 5 ms | WT = 5 - 5 = 0 ms' },
      { metric: 'P2', formula: 'CT = 8 ms | TAT = 8 - 1 = 7 ms | WT = 7 - 3 = 4 ms' },
      { metric: 'P3', formula: 'CT = 16 ms | TAT = 16 - 2 = 14 ms | WT = 14 - 8 = 6 ms' },
      { metric: 'P4', formula: 'CT = 22 ms | TAT = 22 - 3 = 19 ms | WT = 19 - 6 = 13 ms' },
      { metric: 'Average TAT', formula: '(5 + 7 + 14 + 19) / 4 = 52 / 4 = 13.0 ms' },
      { metric: 'Average WT', formula: '(0 + 4 + 6 + 13) / 4 = 26 / 4 = 6.5 ms' }
    ],
    finalAnswer: {
      headers: ['Process', 'AT', 'BT', 'CT', 'TAT', 'WT', 'RT'],
      rows: [
        ['P1', '0', '5', '5', '5', '0', '0'],
        ['P2', '1', '3', '8', '7', '4', '4'],
        ['P3', '2', '8', '16', '14', '6', '6'],
        ['P4', '3', '6', '22', '19', '13', '13']
      ],
      summary: 'Average TAT = 13.0 ms | Average WT = 6.5 ms'
    },
    verification: [
      'Total execution span = 22 ms == sum of bursts (5 + 3 + 8 + 6 = 22 ms).',
      'P4 arrived at t=3 but had to wait until t=16 due to long execution of P3 (Convoy Effect demonstrator).'
    ],
    commonMistake: 'Sorting by process ID (P1, P2, P3, P4) instead of arrival time AT when arrival times are given out of order.'
  },

  // 3. SJF (NON-PREEMPTIVE)
  {
    id: 'sjf-numerical',
    title: '3. SJF (Shortest Job First - Non-Preemptive)',
    shortTitle: 'SJF',
    category: 'CPU Scheduling',
    domainId: 'scheduling',
    badge: 'Optimal WT',
    summary: 'Among arrived processes, schedule the one with the smallest Burst Time. Once started, runs uninterrupted to completion.',
    problem: 'Processes arrive at non-zero timestamps: P1(AT=1, BT=7), P2(AT=2, BT=4), P3(AT=3, BT=1), P4(AT=4, BT=4). Trace non-preemptive SJF and compute averages.',
    givenData: [
      { process: 'P1', at: 1, bt: 7, notes: 'Arrives at t=1 (Only arrived job at t=1)' },
      { process: 'P2', at: 2, bt: 4, notes: 'Arrives at t=2' },
      { process: 'P3', at: 3, bt: 1, notes: 'Arrives at t=3 (Shortest job)' },
      { process: 'P4', at: 4, bt: 4, notes: 'Arrives at t=4' }
    ],
    whatToFind: [
      'CPU Idle periods (if any)',
      'Order of process execution under non-preemptive SJF',
      'Completion Time (CT), Turnaround Time (TAT), Waiting Time (WT)',
      'Average Waiting Time and Average Turnaround Time'
    ],
    formulas: [
      { name: 'SJF Selection Rule', formula: 'Select process with min(BT) among all arrived processes (AT <= currentTime)', desc: 'Non-preemptive run to completion.' },
      { name: 'Tie-Breaker Rule', formula: 'If two processes have equal BT, dispatch earlier arrival (FCFS)', desc: 'Deterministic tie-breaking.' }
    ],
    initialState: {
      time: 0,
      readyQueue: [],
      cpu: 'IDLE (No processes arrived at t=0)',
      gantt: [{ process: 'IDLE', start: 0, end: 1 }]
    },
    steps: [
      {
        step: 1,
        time: 't = 0 to 1 ms',
        action: 'CPU Idle Gap (0 to 1 ms)',
        why: 'First process P1 does not arrive until t=1. CPU remains idle for 1 ms.',
        calculation: 'CPU idle from 0 to 1 ms.',
        readyQueue: ['P1 (at=1) arrives at t=1'],
        gantt: [{ process: 'IDLE', start: 0, end: 1 }],
        tableState: []
      },
      {
        step: 2,
        time: 't = 1 to 8 ms',
        action: 'Dispatch P1 (1 to 8 ms)',
        why: 'At t=1, P1 is the ONLY arrived process in the system. Even though its BT=7 is large, it must run non-preemptively.',
        calculation: 'P1 runs 1 to 8 ms. CT = 8 ms. During this execution, P2, P3, and P4 all arrive in the Ready Queue!',
        readyQueue: ['P2 (bt=4)', 'P3 (bt=1)', 'P4 (bt=4)'],
        gantt: [{ process: 'IDLE', start: 0, end: 1 }, { process: 'P1', start: 1, end: 8 }],
        tableState: [
          { process: 'P1', at: 1, bt: 7, ct: 8, tat: 7, wt: 0, status: 'Completed' }
        ]
      },
      {
        step: 3,
        time: 't = 8 to 9 ms',
        action: 'Dispatch P3 (8 to 9 ms)',
        why: 'At t=8, ready queue has P2(4), P3(1), P4(4). Smallest burst is P3 with BT=1!',
        calculation: 'P3 runs 8 to 9 ms. CT = 9 ms.',
        readyQueue: ['P2 (bt=4)', 'P4 (bt=4)'],
        gantt: [{ process: 'IDLE', start: 0, end: 1 }, { process: 'P1', start: 1, end: 8 }, { process: 'P3', start: 8, end: 9 }],
        tableState: [
          { process: 'P1', at: 1, bt: 7, ct: 8, tat: 7, wt: 0, status: 'Completed' },
          { process: 'P3', at: 3, bt: 1, ct: 9, tat: 6, wt: 5, status: 'Completed' }
        ]
      },
      {
        step: 4,
        time: 't = 9 to 13 ms',
        action: 'Dispatch P2 (9 to 13 ms)',
        why: 'Tie between P2(BT=4) and P4(BT=4). FCFS tie breaker selects P2 because it arrived earlier (AT=2 vs AT=4).',
        calculation: 'P2 runs 9 to 13 ms. CT = 13 ms.',
        readyQueue: ['P4 (bt=4)'],
        gantt: [{ process: 'IDLE', start: 0, end: 1 }, { process: 'P1', start: 1, end: 8 }, { process: 'P3', start: 8, end: 9 }, { process: 'P2', start: 9, end: 13 }],
        tableState: [
          { process: 'P1', at: 1, bt: 7, ct: 8, tat: 7, wt: 0, status: 'Completed' },
          { process: 'P3', at: 3, bt: 1, ct: 9, tat: 6, wt: 5, status: 'Completed' },
          { process: 'P2', at: 2, bt: 4, ct: 13, tat: 11, wt: 7, status: 'Completed' }
        ]
      },
      {
        step: 5,
        time: 't = 13 to 17 ms',
        action: 'Dispatch P4 (13 to 17 ms)',
        why: 'P4 is the final remaining process.',
        calculation: 'P4 runs 13 to 17 ms. CT = 17 ms.',
        readyQueue: ['(Empty)'],
        gantt: [{ process: 'IDLE', start: 0, end: 1 }, { process: 'P1', start: 1, end: 8 }, { process: 'P3', start: 8, end: 9 }, { process: 'P2', start: 9, end: 13 }, { process: 'P4', start: 13, end: 17 }],
        tableState: [
          { process: 'P1', at: 1, bt: 7, ct: 8, tat: 7, wt: 0, status: 'Completed' },
          { process: 'P3', at: 3, bt: 1, ct: 9, tat: 6, wt: 5, status: 'Completed' },
          { process: 'P2', at: 2, bt: 4, ct: 13, tat: 11, wt: 7, status: 'Completed' },
          { process: 'P4', at: 4, bt: 4, ct: 17, tat: 13, wt: 9, status: 'Completed' }
        ]
      }
    ],
    finalCalculations: [
      { metric: 'P1', formula: 'CT = 8 ms | TAT = 8 - 1 = 7 ms | WT = 7 - 7 = 0 ms' },
      { metric: 'P3', formula: 'CT = 9 ms | TAT = 9 - 3 = 6 ms | WT = 6 - 1 = 5 ms' },
      { metric: 'P2', formula: 'CT = 13 ms | TAT = 13 - 2 = 11 ms | WT = 11 - 4 = 7 ms' },
      { metric: 'P4', formula: 'CT = 17 ms | TAT = 17 - 4 = 13 ms | WT = 13 - 4 = 9 ms' },
      { metric: 'Average TAT', formula: '(7 + 6 + 11 + 13) / 4 = 37 / 4 = 9.25 ms' },
      { metric: 'Average WT', formula: '(0 + 5 + 7 + 9) / 4 = 21 / 4 = 5.25 ms' }
    ],
    finalAnswer: {
      headers: ['Process', 'AT', 'BT', 'CT', 'TAT', 'WT', 'RT'],
      rows: [
        ['P1', '1', '7', '8', '7', '0', '0'],
        ['P2', '2', '4', '13', '11', '7', '7'],
        ['P3', '3', '1', '9', '6', '5', '5'],
        ['P4', '4', '4', '17', '13', '9', '9']
      ],
      summary: 'Average TAT = 9.25 ms | Average WT = 5.25 ms | Total timeline = 17 ms'
    },
    verification: [
      'Total Gantt timeline = 17 ms == 1 ms idle + (7 + 4 + 1 + 4 = 16 ms) = 17 ms.',
      'P3 (BT=1) ran before P2 and P4 once P1 completed, minimizing queue waiting latency.'
    ],
    commonMistake: 'Scheduling P3 at t=0 or t=1 before it arrives. You can NEVER schedule a process before its Arrival Time!'
  },

  // 4. SRTF (SHORTEST REMAINING TIME FIRST)
  {
    id: 'srtf-numerical',
    title: '4. SRTF (Preemptive SJF)',
    shortTitle: 'SRTF',
    category: 'CPU Scheduling',
    domainId: 'scheduling',
    badge: 'Preemptive Optimization',
    summary: 'Preemptive SJF evaluates the remaining burst time whenever a new process arrives. If a newcomer has a strictly shorter remaining burst, the running process is preempted.',
    problem: 'Four processes arrive: P1(AT=0, BT=8), P2(AT=1, BT=4), P3(AT=2, BT=9), P4(AT=3, BT=5). Check every arrival timestamp, build the preemptive Gantt chart, and compute all metrics.',
    givenData: [
      { process: 'P1', at: 0, bt: 8, notes: 'Arrives at t=0 (Starts, gets preempted at t=1)' },
      { process: 'P2', at: 1, bt: 4, notes: 'Arrives at t=1 with BT=4 < P1 remaining 7' },
      { process: 'P3', at: 2, bt: 9, notes: 'Arrives at t=2' },
      { process: 'P4', at: 3, bt: 5, notes: 'Arrives at t=3' }
    ],
    whatToFind: [
      'Checkpoints at each arrival timestamp (t=0, 1, 2, 3)',
      'Preemptions and multi-segment Gantt timeline',
      'First CPU Start time vs final Completion Time for each process',
      'CT, TAT, WT, RT and system averages'
    ],
    formulas: [
      { name: 'SRTF Preemption Rule', formula: 'At any arrival: if New_Job_BT < Running_Job_Remaining_BT, Preempt running process', desc: 'Preemptive dynamic check.' },
      { name: 'Response Time in Preemption', formula: 'RT = First_Start - AT', desc: 'Read the very first start block, not later resume blocks.' }
    ],
    initialState: {
      time: 0,
      readyQueue: ['P1 (rem=8)'],
      cpu: 'P1 starts at t=0',
      gantt: []
    },
    steps: [
      {
        step: 1,
        time: 't = 0 to 1 ms',
        action: 'P1 starts execution (0 to 1 ms)',
        why: 'P1 is the sole arrival at t=0. First start time = 0 ms.',
        calculation: 'At t=1, P1 has run 1 ms -> Remaining burst = 8 - 1 = 7 ms.',
        readyQueue: ['P2 (bt=4) arrives at t=1'],
        gantt: [{ process: 'P1', start: 0, end: 1 }],
        tableState: []
      },
      {
        step: 2,
        time: 't = 1 ms checkpoint',
        action: 'PREEMPTION: P2 preempts P1!',
        why: 'P2 arrives with BT=4. Running P1 has remaining burst 7. Because 4 < 7, P1 is PREEMPTED and returned to Ready Queue!',
        calculation: 'P2 dispatched at t=1. First start of P2 = 1 ms.',
        readyQueue: ['P1 (rem=7)'],
        gantt: [{ process: 'P1', start: 0, end: 1 }],
        tableState: []
      },
      {
        step: 3,
        time: 't = 1 to 5 ms',
        action: 'P2 runs to completion (1 to 5 ms)',
        why: 'At t=2, P3 arrives (BT=9 > P2 rem=3). At t=3, P4 arrives (BT=5 > P2 rem=2). P2 retains the CPU and finishes at t=5.',
        calculation: 'P2 finishes at t=5 ms. CT = 5 ms.',
        readyQueue: ['P4 (rem=5)', 'P1 (rem=7)', 'P3 (rem=9)'],
        gantt: [{ process: 'P1', start: 0, end: 1 }, { process: 'P2', start: 1, end: 5 }],
        tableState: [{ process: 'P2', at: 1, bt: 4, firstStart: 1, ct: 5, tat: 4, wt: 0, rt: 0, status: 'Completed' }]
      },
      {
        step: 4,
        time: 't = 5 to 10 ms',
        action: 'Dispatch P4 (5 to 10 ms)',
        why: 'At t=5, ready queue has P4(rem=5), P1(rem=7), P3(rem=9). Smallest remaining burst is P4 with 5 ms.',
        calculation: 'P4 runs 5 to 10 ms. First start = 5 ms. CT = 10 ms.',
        readyQueue: ['P1 (rem=7)', 'P3 (rem=9)'],
        gantt: [{ process: 'P1', start: 0, end: 1 }, { process: 'P2', start: 1, end: 5 }, { process: 'P4', start: 5, end: 10 }],
        tableState: [{ process: 'P4', at: 3, bt: 5, firstStart: 5, ct: 10, tat: 7, wt: 2, rt: 2, status: 'Completed' }]
      },
      {
        step: 5,
        time: 't = 10 to 17 ms',
        action: 'Resume P1 (10 to 17 ms)',
        why: 'Between P1(rem=7) and P3(rem=9), P1 has smaller remaining burst. Runs for 7 ms.',
        calculation: 'P1 completes at t=17 ms. CT = 17 ms.',
        readyQueue: ['P3 (rem=9)'],
        gantt: [{ process: 'P1', start: 0, end: 1 }, { process: 'P2', start: 1, end: 5 }, { process: 'P4', start: 5, end: 10 }, { process: 'P1', start: 10, end: 17 }],
        tableState: [{ process: 'P1', at: 0, bt: 8, firstStart: 0, ct: 17, tat: 17, wt: 9, rt: 0, status: 'Completed' }]
      },
      {
        step: 6,
        time: 't = 17 to 26 ms',
        action: 'Dispatch P3 (17 to 26 ms)',
        why: 'P3 is the final process. Runs for 9 ms to completion.',
        calculation: 'P3 completes at t=26 ms. First start = 17 ms. CT = 26 ms.',
        readyQueue: ['(Empty)'],
        gantt: [
          { process: 'P1', start: 0, end: 1 },
          { process: 'P2', start: 1, end: 5 },
          { process: 'P4', start: 5, end: 10 },
          { process: 'P1', start: 10, end: 17 },
          { process: 'P3', start: 17, end: 26 }
        ],
        tableState: [{ process: 'P3', at: 2, bt: 9, firstStart: 17, ct: 26, tat: 24, wt: 15, rt: 15, status: 'Completed' }]
      }
    ],
    finalCalculations: [
      { metric: 'P1', formula: 'CT = 17 | TAT = 17 - 0 = 17 ms | WT = 17 - 8 = 9 ms | RT = 0 - 0 = 0 ms' },
      { metric: 'P2', formula: 'CT = 5 | TAT = 5 - 1 = 4 ms | WT = 4 - 4 = 0 ms | RT = 1 - 1 = 0 ms' },
      { metric: 'P3', formula: 'CT = 26 | TAT = 26 - 2 = 24 ms | WT = 24 - 9 = 15 ms | RT = 17 - 2 = 15 ms' },
      { metric: 'P4', formula: 'CT = 10 | TAT = 10 - 3 = 7 ms | WT = 7 - 5 = 2 ms | RT = 5 - 3 = 2 ms' },
      { metric: 'Average TAT', formula: '(17 + 4 + 24 + 7) / 4 = 52 / 4 = 13.0 ms' },
      { metric: 'Average WT', formula: '(9 + 0 + 15 + 2) / 4 = 26 / 4 = 6.5 ms' },
      { metric: 'Average RT', formula: '(0 + 0 + 15 + 2) / 4 = 17 / 4 = 4.25 ms' }
    ],
    finalAnswer: {
      headers: ['Process', 'AT', 'BT', 'First Start', 'CT', 'TAT', 'WT', 'RT'],
      rows: [
        ['P1', '0', '8', '0', '17', '17', '9', '0'],
        ['P2', '1', '4', '1', '5', '4', '0', '0'],
        ['P3', '2', '9', '17', '26', '24', '15', '15'],
        ['P4', '3', '5', '5', '10', '7', '2', '2']
      ],
      summary: 'Average TAT = 13.0 ms | Average WT = 6.5 ms | Average RT = 4.25 ms'
    },
    verification: [
      'Total execution span = 26 ms == sum of original bursts (8 + 4 + 9 + 5 = 26 ms).',
      'P1 is split across two Gantt slices (0 to 1 and 10 to 17). Its CT is 17 ms (end of LAST block).',
      'Response Time for P1 is 0 ms because it first touched CPU at t=0, despite waiting 9 ms total.'
    ],
    commonMistake: 'Reading the end of the first block (1 ms) as Completion Time for P1 instead of the final block boundary (17 ms).'
  },

  // 5. PRIORITY SCHEDULING
  {
    id: 'priority-numerical',
    title: '5. Priority Scheduling',
    shortTitle: 'Priority',
    category: 'CPU Scheduling',
    domainId: 'scheduling',
    badge: 'Priority-Based',
    summary: 'Each process is assigned a priority integer. Learn standard conventions (lower integer = higher priority), preemptive vs non-preemptive variants, and starvation prevention.',
    problem: 'Four processes arrive: P1(AT=0, BT=4, Pri=3), P2(AT=1, BT=3, Pri=1), P3(AT=2, BT=1, Pri=4), P4(AT=3, BT=5, Pri=2). Convention: Lower number = HIGHER priority. Trace preemptive priority scheduling.',
    givenData: [
      { process: 'P1', at: 0, bt: 4, pri: 3, notes: 'Priority 3' },
      { process: 'P2', at: 1, bt: 3, pri: 1, notes: 'Priority 1 (HIGHEST priority)' },
      { process: 'P3', at: 2, bt: 1, pri: 4, notes: 'Priority 4 (LOWEST priority)' },
      { process: 'P4', at: 3, bt: 5, pri: 2, notes: 'Priority 2' }
    ],
    whatToFind: [
      'Preemptive dispatch decisions based on priority rankings',
      'Gantt timeline from t=0 to completion',
      'Completion Time, Turnaround Time, Waiting Time, Response Time',
      'Starvation analysis and Aging technique explanation'
    ],
    formulas: [
      { name: 'Priority Ranking Rule', formula: 'Higher Priority = Lower numerical rank (1 > 2 > 3 > 4)', desc: 'Preemptive preemption occurs when newcomer has strictly lower priority number.' },
      { name: 'TAT Formula', formula: 'TAT = CT - AT', desc: 'Clock exit minus arrival.' },
      { name: 'WT Formula', formula: 'WT = TAT - BT', desc: 'Turnaround minus burst.' }
    ],
    initialState: {
      time: 0,
      readyQueue: ['P1 (pri=3, rem=4)'],
      cpu: 'P1 starts at t=0',
      gantt: []
    },
    steps: [
      {
        step: 1,
        time: 't = 0 to 1 ms',
        action: 'P1 executes (0 to 1 ms)',
        why: 'P1 is the sole arrival at t=0. Runs for 1 ms.',
        calculation: 'At t=1, P1 remaining burst = 4 - 1 = 3 ms.',
        readyQueue: ['P2 (pri=1) arrives at t=1'],
        gantt: [{ process: 'P1', start: 0, end: 1 }],
        tableState: []
      },
      {
        step: 2,
        time: 't = 1 ms checkpoint',
        action: 'PREEMPTION: P2 preempts P1!',
        why: 'P2 arrives with Priority 1. P1 has Priority 3. Because Priority 1 is higher than Priority 3, P1 is preempted immediately!',
        calculation: 'P2 starts at t=1. First start = 1 ms.',
        readyQueue: ['P1 (pri=3, rem=3)'],
        gantt: [{ process: 'P1', start: 0, end: 1 }],
        tableState: []
      },
      {
        step: 3,
        time: 't = 1 to 4 ms',
        action: 'P2 executes to completion (1 to 4 ms)',
        why: 'During 1 to 4 ms, P3(pri=4) and P4(pri=2) arrive. None have priority higher than P2(pri=1). P2 completes at t=4.',
        calculation: 'P2 CT = 4 ms.',
        readyQueue: ['P4 (pri=2, rem=5)', 'P1 (pri=3, rem=3)', 'P3 (pri=4, rem=1)'],
        gantt: [{ process: 'P1', start: 0, end: 1 }, { process: 'P2', start: 1, end: 4 }],
        tableState: [{ process: 'P2', at: 1, bt: 3, ct: 4, tat: 3, wt: 0, rt: 0, status: 'Completed' }]
      },
      {
        step: 4,
        time: 't = 4 to 9 ms',
        action: 'Dispatch P4 (4 to 9 ms)',
        why: 'Among ready processes [P4(pri=2), P1(pri=3), P3(pri=4)], P4 has highest priority (pri=2). Runs for 5 ms.',
        calculation: 'P4 completes at t=9 ms. First start = 4 ms.',
        readyQueue: ['P1 (pri=3, rem=3)', 'P3 (pri=4, rem=1)'],
        gantt: [{ process: 'P1', start: 0, end: 1 }, { process: 'P2', start: 1, end: 4 }, { process: 'P4', start: 4, end: 9 }],
        tableState: [{ process: 'P4', at: 3, bt: 5, ct: 9, tat: 6, wt: 1, rt: 1, status: 'Completed' }]
      },
      {
        step: 5,
        time: 't = 9 to 12 ms',
        action: 'Resume P1 (9 to 12 ms)',
        why: 'Between P1(pri=3) and P3(pri=4), P1 has higher priority. Runs for remaining 3 ms.',
        calculation: 'P1 completes at t=12 ms. CT = 12 ms.',
        readyQueue: ['P3 (pri=4, rem=1)'],
        gantt: [{ process: 'P1', start: 0, end: 1 }, { process: 'P2', start: 1, end: 4 }, { process: 'P4', start: 4, end: 9 }, { process: 'P1', start: 9, end: 12 }],
        tableState: [{ process: 'P1', at: 0, bt: 4, ct: 12, tat: 12, wt: 8, rt: 0, status: 'Completed' }]
      },
      {
        step: 6,
        time: 't = 12 to 13 ms',
        action: 'Dispatch P3 (12 to 13 ms)',
        why: 'P3 is the last process. Runs for 1 ms.',
        calculation: 'P3 completes at t=13 ms. First start = 12 ms.',
        readyQueue: ['(Empty)'],
        gantt: [
          { process: 'P1', start: 0, end: 1 },
          { process: 'P2', start: 1, end: 4 },
          { process: 'P4', start: 4, end: 9 },
          { process: 'P1', start: 9, end: 12 },
          { process: 'P3', start: 12, end: 13 }
        ],
        tableState: [{ process: 'P3', at: 2, bt: 1, ct: 13, tat: 11, wt: 10, rt: 10, status: 'Completed' }]
      }
    ],
    finalCalculations: [
      { metric: 'P1', formula: 'CT = 12 | TAT = 12 - 0 = 12 ms | WT = 12 - 4 = 8 ms | RT = 0 - 0 = 0 ms' },
      { metric: 'P2', formula: 'CT = 4 | TAT = 4 - 1 = 3 ms | WT = 3 - 3 = 0 ms | RT = 1 - 1 = 0 ms' },
      { metric: 'P4', formula: 'CT = 9 | TAT = 9 - 3 = 6 ms | WT = 6 - 5 = 1 ms | RT = 4 - 3 = 1 ms' },
      { metric: 'P3', formula: 'CT = 13 | TAT = 13 - 2 = 11 ms | WT = 11 - 1 = 10 ms | RT = 12 - 2 = 10 ms' },
      { metric: 'Average TAT', formula: '(12 + 3 + 6 + 11) / 4 = 32 / 4 = 8.0 ms' },
      { metric: 'Average WT', formula: '(8 + 0 + 1 + 10) / 4 = 19 / 4 = 4.75 ms' }
    ],
    finalAnswer: {
      headers: ['Process', 'AT', 'BT', 'Pri', 'First Start', 'CT', 'TAT', 'WT', 'RT'],
      rows: [
        ['P1', '0', '4', '3', '0', '12', '12', '8', '0'],
        ['P2', '1', '3', '1', '1', '4', '3', '0', '0'],
        ['P4', '3', '5', '2', '4', '9', '6', '1', '1'],
        ['P3', '2', '1', '4', '12', '13', '11', '10', '10']
      ],
      summary: 'Average TAT = 8.0 ms | Average WT = 4.75 ms | Starvation risk solved by Aging'
    },
    verification: [
      'Total Gantt timeline = 13 ms == 4 + 3 + 1 + 5 = 13 ms.',
      'Lowest priority process P3 had to wait 10 ms (until all higher priority processes finished).'
    ],
    commonMistake: 'Assuming higher number = higher priority without reading the question instructions. In standard UNIX/POSIX, lower number represents higher priority (nice -20 is highest).'
  },

  // 6. ROUND ROBIN
  {
    id: 'round-robin-numerical',
    title: '6. Round Robin',
    shortTitle: 'Round Robin',
    category: 'CPU Scheduling',
    domainId: 'scheduling',
    badge: 'Time-Sharing',
    summary: 'Master round-robin time-slicing with Time Quantum q=2. Watch step-by-step queue rotations, new arrival prioritization at slice boundaries, and multi-slice completion.',
    problem: 'Four processes arrive: P1(AT=0, BT=5), P2(AT=1, BT=4), P3(AT=2, BT=2), P4(AT=4, BT=1). Time Quantum q = 2 ms. When a process slice expires at the same moment a new process arrives, the new arrival enters the queue FIRST. Build the complete Gantt chart.',
    givenData: [
      { process: 'P1', at: 0, bt: 5, notes: 'Quantum q=2' },
      { process: 'P2', at: 1, bt: 4, notes: 'Quantum q=2' },
      { process: 'P3', at: 2, bt: 2, notes: 'Quantum q=2 (Finishes in 1 slice)' },
      { process: 'P4', at: 4, bt: 1, notes: 'Quantum q=2 (Finishes in 1 slice)' }
    ],
    whatToFind: [
      'Ready queue state after every single time quantum slice',
      'Multi-segment Gantt timeline for each process',
      'Completion Time, Turnaround Time, Waiting Time, Response Time',
      'System averages under Time Quantum q=2'
    ],
    formulas: [
      { name: 'Time Quantum Rule', formula: 'Execution Slice = min(Remaining Burst, Time Quantum)', desc: 'Run for at most q ms.' },
      { name: 'Boundary Queue Rule', formula: 'New arrival at timestamp t is enqueued BEFORE the preempted process', desc: 'Prevents newly arrived processes from being starved behind long jobs.' }
    ],
    initialState: {
      time: 0,
      readyQueue: ['P1 (rem=5)'],
      cpu: 'P1 dispatched for quantum 2 ms',
      gantt: []
    },
    steps: [
      {
        step: 1,
        time: 't = 0 to 2 ms',
        action: 'P1 executes slice (0 to 2 ms)',
        why: 'P1 is at head of queue. Quantum = 2 ms. First start = 0 ms.',
        calculation: 'During 0 to 2 ms, P2 arrives at t=1, P3 arrives at t=2. P1 remaining burst = 5 - 2 = 3 ms. P1 preempted.',
        readyQueue: ['P2 (rem=4)', 'P3 (rem=2)', 'P1 (rem=3)'],
        gantt: [{ process: 'P1', start: 0, end: 2 }],
        tableState: []
      },
      {
        step: 2,
        time: 't = 2 to 4 ms',
        action: 'P2 executes slice (2 to 4 ms)',
        why: 'P2 is at head of queue. Runs for 2 ms. First start = 2 ms.',
        calculation: 'At t=4, P4 arrives! P4 is enqueued BEFORE preempted P2 (rem=2). Queue: [P3, P1, P4, P2].',
        readyQueue: ['P3 (rem=2)', 'P1 (rem=3)', 'P4 (rem=1)', 'P2 (rem=2)'],
        gantt: [{ process: 'P1', start: 0, end: 2 }, { process: 'P2', start: 2, end: 4 }],
        tableState: []
      },
      {
        step: 3,
        time: 't = 4 to 6 ms',
        action: 'P3 executes slice (4 to 6 ms) and FINISHES!',
        why: 'P3 is at head. Its remaining burst is exactly 2 ms! Runs 4 to 6 ms and terminates.',
        calculation: 'P3 finishes at t=6 ms. CT = 6 ms. Not re-added to queue.',
        readyQueue: ['P1 (rem=3)', 'P4 (rem=1)', 'P2 (rem=2)'],
        gantt: [{ process: 'P1', start: 0, end: 2 }, { process: 'P2', start: 2, end: 4 }, { process: 'P3', start: 4, end: 6 }],
        tableState: [{ process: 'P3', at: 2, bt: 2, firstStart: 4, ct: 6, tat: 4, wt: 2, rt: 2, status: 'Completed' }]
      },
      {
        step: 4,
        time: 't = 6 to 8 ms',
        action: 'P1 executes slice (6 to 8 ms)',
        why: 'P1 is at head. Runs for 2 ms. Remaining burst = 3 - 2 = 1 ms.',
        calculation: 'P1 re-added to queue: [P4, P2, P1].',
        readyQueue: ['P4 (rem=1)', 'P2 (rem=2)', 'P1 (rem=1)'],
        gantt: [{ process: 'P1', start: 0, end: 2 }, { process: 'P2', start: 2, end: 4 }, { process: 'P3', start: 4, end: 6 }, { process: 'P1', start: 6, end: 8 }],
        tableState: []
      },
      {
        step: 5,
        time: 't = 8 to 9 ms',
        action: 'P4 executes slice (8 to 9 ms) and FINISHES!',
        why: 'P4 is at head with burst 1 ms. Only needs 1 ms (less than quantum 2 ms). First start = 8 ms.',
        calculation: 'P4 finishes at t=9 ms. CT = 9 ms.',
        readyQueue: ['P2 (rem=2)', 'P1 (rem=1)'],
        gantt: [
          { process: 'P1', start: 0, end: 2 },
          { process: 'P2', start: 2, end: 4 },
          { process: 'P3', start: 4, end: 6 },
          { process: 'P1', start: 6, end: 8 },
          { process: 'P4', start: 8, end: 9 }
        ],
        tableState: [{ process: 'P4', at: 4, bt: 1, firstStart: 8, ct: 9, tat: 5, wt: 4, rt: 4, status: 'Completed' }]
      },
      {
        step: 6,
        time: 't = 9 to 11 ms',
        action: 'P2 executes slice (9 to 11 ms) and FINISHES!',
        why: 'P2 is at head with remaining burst 2 ms. Runs to completion.',
        calculation: 'P2 finishes at t=11 ms. CT = 11 ms.',
        readyQueue: ['P1 (rem=1)'],
        gantt: [
          { process: 'P1', start: 0, end: 2 },
          { process: 'P2', start: 2, end: 4 },
          { process: 'P3', start: 4, end: 6 },
          { process: 'P1', start: 6, end: 8 },
          { process: 'P4', start: 8, end: 9 },
          { process: 'P2', start: 9, end: 11 }
        ],
        tableState: [{ process: 'P2', at: 1, bt: 4, firstStart: 2, ct: 11, tat: 10, wt: 6, rt: 1, status: 'Completed' }]
      },
      {
        step: 7,
        time: 't = 11 to 12 ms',
        action: 'P1 executes final slice (11 to 12 ms) and FINISHES!',
        why: 'P1 is the sole process remaining with burst 1 ms. Runs and completes.',
        calculation: 'P1 finishes at t=12 ms. CT = 12 ms.',
        readyQueue: ['(Empty)'],
        gantt: [
          { process: 'P1', start: 0, end: 2 },
          { process: 'P2', start: 2, end: 4 },
          { process: 'P3', start: 4, end: 6 },
          { process: 'P1', start: 6, end: 8 },
          { process: 'P4', start: 8, end: 9 },
          { process: 'P2', start: 9, end: 11 },
          { process: 'P1', start: 11, end: 12 }
        ],
        tableState: [{ process: 'P1', at: 0, bt: 5, firstStart: 0, ct: 12, tat: 12, wt: 7, rt: 0, status: 'Completed' }]
      }
    ],
    finalCalculations: [
      { metric: 'P1', formula: 'CT = 12 | TAT = 12 - 0 = 12 ms | WT = 12 - 5 = 7 ms | RT = 0 - 0 = 0 ms' },
      { metric: 'P2', formula: 'CT = 11 | TAT = 11 - 1 = 10 ms | WT = 10 - 4 = 6 ms | RT = 2 - 1 = 1 ms' },
      { metric: 'P3', formula: 'CT = 6 | TAT = 6 - 2 = 4 ms | WT = 4 - 2 = 2 ms | RT = 4 - 2 = 2 ms' },
      { metric: 'P4', formula: 'CT = 9 | TAT = 9 - 4 = 5 ms | WT = 5 - 1 = 4 ms | RT = 8 - 4 = 4 ms' },
      { metric: 'Average TAT', formula: '(12 + 10 + 4 + 5) / 4 = 31 / 4 = 7.75 ms' },
      { metric: 'Average WT', formula: '(7 + 6 + 2 + 4) / 4 = 19 / 4 = 4.75 ms' },
      { metric: 'Average RT', formula: '(0 + 1 + 2 + 4) / 4 = 7 / 4 = 1.75 ms' }
    ],
    finalAnswer: {
      headers: ['Process', 'AT', 'BT', 'First Start', 'CT', 'TAT', 'WT', 'RT'],
      rows: [
        ['P1', '0', '5', '0', '12', '12', '7', '0'],
        ['P2', '1', '4', '2', '11', '10', '6', '1'],
        ['P3', '2', '2', '4', '6', '4', '2', '2'],
        ['P4', '4', '1', '8', '9', '5', '4', '4']
      ],
      summary: 'Average TAT = 7.75 ms | Average WT = 4.75 ms | Average RT = 1.75 ms'
    },
    verification: [
      'Total Gantt timeline = 12 ms == 5 + 4 + 2 + 1 = 12 ms.',
      'Excellent response times across all processes (Avg RT = 1.75 ms vs 4.25+ in FCFS/SRTF).'
    ],
    commonMistake: 'Enqueuing the preempted process before the newly arriving process at the exact boundary timestamp. Always insert newly arriving processes into the queue before the returning process!'
  },

  // 7. MLQ / MLFQ
  {
    id: 'mlq-mlfq-numerical',
    title: '7. MLQ / MLFQ',
    shortTitle: 'MLQ / MLFQ',
    category: 'CPU Scheduling',
    domainId: 'scheduling',
    badge: 'Multi-Level Feedback',
    summary: 'Multi-Level Feedback Queue dynamically adapts process priority based on CPU burst history. Trace process aging, queue demotion (Q1 -> Q2 -> Q3), and starvation avoidance.',
    problem: 'A Multi-Level Feedback Queue system has 3 priority queues: Q1 (Round Robin, q=4 ms), Q2 (Round Robin, q=8 ms), Q3 (FCFS). A CPU-bound process P1 arrives with burst 20 ms. Trace its path through the queues.',
    givenData: [
      { process: 'P1', at: 0, bt: 20, notes: 'Starts in Q1' },
      { queue: 'Q1 (Top Priority)', algo: 'Round Robin', quantum: '4 ms' },
      { queue: 'Q2 (Medium Priority)', algo: 'Round Robin', quantum: '8 ms' },
      { queue: 'Q3 (Lowest Priority)', algo: 'FCFS', quantum: 'Run to finish' }
    ],
    whatToFind: [
      'Time spent in Q1 before demotion',
      'Time spent in Q2 before demotion',
      'Remaining burst executed in Q3',
      'Total completion timeline and queue migration trace'
    ],
    formulas: [
      { name: 'Demotion Rule', formula: 'If process consumes full quantum without finishing, demote to next lower priority queue', desc: 'Separates I/O-bound jobs from CPU hogs.' },
      { name: 'Starvation Prevention', formula: 'Periodic Priority Boost moves all processes back to Q1', desc: 'Prevents starvation of lower queues.' }
    ],
    initialState: {
      time: 0,
      currentQueue: 'Q1',
      p1Rem: 20,
      gantt: []
    },
    steps: [
      {
        step: 1,
        time: 't = 0 to 4 ms',
        action: 'P1 executes in Q1 (Quantum = 4 ms)',
        why: 'All new processes start in top queue Q1 to maximize interactive responsiveness.',
        calculation: 'P1 runs 4 ms. Remaining burst = 20 - 4 = 16 ms. Quantum exhausted -> Demoted to Q2!',
        readyQueue: ['Q2: [P1 (rem=16)]'],
        gantt: [{ process: 'P1 (Q1)', start: 0, end: 4 }],
        tableState: []
      },
      {
        step: 2,
        time: 't = 4 to 12 ms',
        action: 'P1 executes in Q2 (Quantum = 8 ms)',
        why: 'In Q2, P1 gets a larger slice of 8 ms.',
        calculation: 'P1 runs 8 ms: 4 to 12 ms. Remaining burst = 16 - 8 = 8 ms. Quantum exhausted -> Demoted to Q3!',
        readyQueue: ['Q3: [P1 (rem=8)]'],
        gantt: [{ process: 'P1 (Q1)', start: 0, end: 4 }, { process: 'P1 (Q2)', start: 4, end: 12 }],
        tableState: []
      },
      {
        step: 3,
        time: 't = 12 to 20 ms',
        action: 'P1 executes in Q3 (FCFS to completion)',
        why: 'Q3 is FCFS. P1 runs for its remaining 8 ms uninterrupted.',
        calculation: 'P1 runs 12 to 20 ms. P1 completes at t=20 ms.',
        readyQueue: ['(Empty)'],
        gantt: [
          { process: 'P1 (Q1)', start: 0, end: 4 },
          { process: 'P1 (Q2)', start: 4, end: 12 },
          { process: 'P1 (Q3)', start: 12, end: 20 }
        ],
        tableState: [{ process: 'P1', at: 0, bt: 20, ct: 20, tat: 20, wt: 0, status: 'Completed' }]
      }
    ],
    finalCalculations: [
      { metric: 'Q1 Execution', formula: '4 ms (0 to 4 ms) -> 16 ms remaining -> demoted to Q2' },
      { metric: 'Q2 Execution', formula: '8 ms (4 to 12 ms) -> 8 ms remaining -> demoted to Q3' },
      { metric: 'Q3 Execution', formula: '8 ms (12 to 20 ms) -> 0 ms remaining -> Completed at t=20 ms' },
      { metric: 'Total TAT', formula: '20 - 0 = 20 ms' }
    ],
    finalAnswer: {
      headers: ['Queue Level', 'Algorithm', 'Quantum', 'Execution Window', 'P1 Burst Consumed', 'Remaining Burst'],
      rows: [
        ['Q1', 'Round Robin', '4 ms', '0 to 4 ms', '4 ms', '16 ms (Demoted)'],
        ['Q2', 'Round Robin', '8 ms', '4 to 12 ms', '8 ms', '8 ms (Demoted)'],
        ['Q3', 'FCFS', 'Unlimited', '12 to 20 ms', '8 ms', '0 ms (Completed)']
      ],
      summary: 'Completion Time = 20 ms | Q1 (4 ms) + Q2 (8 ms) + Q3 (8 ms) = 20 ms'
    },
    verification: [
      'Short interactive jobs finishing within 4 ms never leave Q1, getting rapid response.',
      'Long CPU-intensive jobs naturally sink to lower queues where they receive larger time slices without penalizing short jobs.'
    ],
    commonMistake: 'Confusing MLQ (fixed non-migrating queues) with MLFQ (dynamic feedback where processes move between queues).'
  },

  // 8. BANKER'S ALGORITHM
  {
    id: 'bankers-algorithm-numerical',
    title: "8. Banker's Algorithm",
    shortTitle: "Banker's Algorithm",
    category: 'Deadlocks',
    domainId: 'deadlocks',
    badge: 'Deadlock Avoidance',
    summary: "Dijkstra's Banker's Algorithm avoids deadlock by evaluating resource allocation safety. Calculate the Need Matrix, verify Available vector updates, and determine safe execution sequences.",
    problem: 'A system has 5 processes (P0 to P4) and 3 resource types (A, B, C) with total instances: A=10, B=5, C=7. Given current Allocation, Max, and Available=[3, 3, 2], determine if system is in a safe state and compute the safe sequence.',
    givenData: [
      { process: 'P0', alloc: [0, 1, 0], max: [7, 5, 3] },
      { process: 'P1', alloc: [2, 0, 0], max: [3, 2, 2] },
      { process: 'P2', alloc: [3, 0, 2], max: [9, 0, 2] },
      { process: 'P3', alloc: [2, 1, 1], max: [2, 2, 2] },
      { process: 'P4', alloc: [0, 0, 2], max: [4, 3, 3] }
    ],
    whatToFind: [
      'Need Matrix (Need = Max - Allocation)',
      'Step-by-step process satisfaction check (Need <= Available)',
      'Available vector updates when a process terminates and releases resources',
      'Safe Sequence confirming deadlock-free execution'
    ],
    formulas: [
      { name: 'Need Matrix Formula', formula: 'Need[i][j] = Max[i][j] - Allocation[i][j]', desc: 'Remaining resources each process could demand.' },
      { name: 'Safety Condition', formula: 'Process Pi can run if Need[i] <= Available', desc: 'Guarantees process can run to completion.' },
      { name: 'Resource Release', formula: 'Available = Available + Allocation[i]', desc: 'Process releases its allocated resources upon termination.' }
    ],
    initialState: {
      available: [3, 3, 2],
      needMatrix: [
        { process: 'P0', need: [7, 4, 3] },
        { process: 'P1', need: [1, 2, 2] },
        { process: 'P2', need: [6, 0, 0] },
        { process: 'P3', need: [0, 1, 1] },
        { process: 'P4', need: [4, 3, 1] }
      ],
      safeSeq: []
    },
    steps: [
      {
        step: 1,
        action: 'Calculate Need Matrix',
        why: 'Need represents remaining resources each process may still request before completion.',
        calculation: 'P0: [7-0, 5-1, 3-0]=[7,4,3] | P1: [3-2, 2-0, 2-0]=[1,2,2] | P2: [9-3, 0-0, 2-2]=[6,0,0] | P3: [2-2, 2-1, 2-1]=[0,1,1] | P4: [4-0, 3-0, 3-2]=[4,3,1]',
        available: [3, 3, 2],
        safeSeq: []
      },
      {
        step: 2,
        action: 'Test P0 & Dispatch P1',
        why: 'P0 Need [7,4,3] <= [3,3,2]? FALSE (Cannot allocate). P1 Need [1,2,2] <= [3,3,2]? TRUE! P1 executes safely.',
        calculation: 'P1 finishes and releases Allocation [2, 0, 0]. New Available = [3+2, 3+0, 2+0] = [5, 3, 2].',
        available: [5, 3, 2],
        safeSeq: ['P1']
      },
      {
        step: 3,
        action: 'Dispatch P3',
        why: 'With Available=[5,3,2], check P3 Need [0,1,1] <= [5,3,2]? TRUE! P3 executes.',
        calculation: 'P3 finishes and releases Allocation [2, 1, 1]. New Available = [5+2, 3+1, 2+1] = [7, 4, 3].',
        available: [7, 4, 3],
        safeSeq: ['P1', 'P3']
      },
      {
        step: 4,
        action: 'Dispatch P4',
        why: 'With Available=[7,4,3], check P4 Need [4,3,1] <= [7,4,3]? TRUE! P4 executes.',
        calculation: 'P4 finishes and releases Allocation [0, 0, 2]. New Available = [7+0, 4+0, 3+2] = [7, 4, 5].',
        available: [7, 4, 5],
        safeSeq: ['P1', 'P3', 'P4']
      },
      {
        step: 5,
        action: 'Dispatch P0',
        why: 'With Available=[7,4,5], check P0 Need [7,4,3] <= [7,4,5]? TRUE! (7<=7, 4<=4, 3<=5). P0 executes.',
        calculation: 'P0 finishes and releases Allocation [0, 1, 0]. New Available = [7+0, 4+1, 5+0] = [7, 5, 5].',
        available: [7, 5, 5],
        safeSeq: ['P1', 'P3', 'P4', 'P0']
      },
      {
        step: 6,
        action: 'Dispatch P2',
        why: 'With Available=[7,5,5], check P2 Need [6,0,0] <= [7,5,5]? TRUE! P2 executes.',
        calculation: 'P2 finishes and releases Allocation [3, 0, 2]. Final Available = [7+3, 5+0, 5+2] = [10, 5, 7].',
        available: [10, 5, 7],
        safeSeq: ['P1', 'P3', 'P4', 'P0', 'P2']
      }
    ],
    finalCalculations: [
      { metric: 'Initial Available', formula: '[3, 3, 2]' },
      { metric: 'After P1 terminates', formula: '[3, 3, 2] + [2, 0, 0] = [5, 3, 2]' },
      { metric: 'After P3 terminates', formula: '[5, 3, 2] + [2, 1, 1] = [7, 4, 3]' },
      { metric: 'After P4 terminates', formula: '[7, 4, 3] + [0, 0, 2] = [7, 4, 5]' },
      { metric: 'After P0 terminates', formula: '[7, 4, 5] + [0, 1, 0] = [7, 5, 5]' },
      { metric: 'After P2 terminates', formula: '[7, 5, 5] + [3, 0, 2] = [10, 5, 7]' }
    ],
    finalAnswer: {
      headers: ['Process', 'Allocation (A B C)', 'Max (A B C)', 'Need (A B C)', 'Available at Step', 'Safe Sequence Position'],
      rows: [
        ['P1', '2 0 0', '3 2 2', '1 2 2', '3 3 2', '1st in Safe Sequence'],
        ['P3', '2 1 1', '2 2 2', '0 1 1', '5 3 2', '2nd in Safe Sequence'],
        ['P4', '0 0 2', '4 3 3', '4 3 1', '7 4 3', '3rd in Safe Sequence'],
        ['P0', '0 1 0', '7 5 3', '7 4 3', '7 4 5', '4th in Safe Sequence'],
        ['P2', '3 0 2', '9 0 2', '6 0 0', '7 5 5', '5th in Safe Sequence']
      ],
      summary: 'SAFE STATE CONFIRMED: Safe Sequence = <P1, P3, P4, P0, P2>'
    },
    verification: [
      'Final Available [10, 5, 7] exactly equals total system hardware capacity (A=10, B=5, C=7).',
      'All 5 processes were able to terminate without entering a circular wait deadlock condition.'
    ],
    commonMistake: 'Adding Max instead of Allocation to Available when a process completes. A process holds its ALLOCATION; it releases only what it currently holds!'
  },

  // 9. MEMORY ALLOCATION
  {
    id: 'memory-allocation-numerical',
    title: '9. Memory Allocation',
    shortTitle: 'Memory Allocation',
    category: 'Memory Management',
    domainId: 'memory',
    badge: 'Contiguous Allocation',
    summary: 'Compare First Fit, Best Fit, and Worst Fit contiguous memory allocation strategies. Trace partition selection, compute remaining holes, and calculate internal vs external fragmentation.',
    problem: 'Five memory partitions exist in physical order: 100 KB, 500 KB, 200 KB, 300 KB, 600 KB. Four process requests arrive in order: P1(212 KB), P2(417 KB), P3(112 KB), P4(426 KB). Trace Best Fit vs First Fit and compute fragmentation.',
    givenData: [
      { partition: 'Block 1', size: 100, state: 'Free' },
      { partition: 'Block 2', size: 500, state: 'Free' },
      { partition: 'Block 3', size: 200, state: 'Free' },
      { partition: 'Block 4', size: 300, state: 'Free' },
      { partition: 'Block 5', size: 600, state: 'Free' }
    ],
    whatToFind: [
      'Partition assigned to each process under Best Fit and First Fit',
      'Remaining unused sliver (fragmentation) in each partition',
      'Unallocated processes (if any)',
      'Total internal fragmentation'
    ],
    formulas: [
      { name: 'First Fit', formula: 'Allocate to FIRST hole from start of memory that is >= Process Size', desc: 'Fastest search time.' },
      { name: 'Best Fit', formula: 'Allocate to SMALLEST hole that is >= Process Size (min(Hole - Size))', desc: 'Minimizes wasted leftover space in chosen block.' },
      { name: 'Worst Fit', formula: 'Allocate to LARGEST available hole (max(Hole))', desc: 'Leaves largest remaining hole.' }
    ],
    initialState: {
      blocks: [100, 500, 200, 300, 600],
      processes: [
        { name: 'P1', size: 212 },
        { name: 'P2', size: 417 },
        { name: 'P3', size: 112 },
        { name: 'P4', size: 426 }
      ]
    },
    steps: [
      {
        step: 1,
        action: 'Best Fit: Allocate P1 (212 KB)',
        why: 'Candidate blocks >= 212: 500, 300, 600. Smallest is 300 KB (Block 4)!',
        calculation: 'Allocated to Block 4 (300 KB). Remaining fragment = 300 - 212 = 88 KB.',
        blocksState: [
          { block: 'B1 (100K)', status: 'Free' },
          { block: 'B2 (500K)', status: 'Free' },
          { block: 'B3 (200K)', status: 'Free' },
          { block: 'B4 (300K)', status: 'P1 (212K) | 88K free' },
          { block: 'B5 (600K)', status: 'Free' }
        ]
      },
      {
        step: 2,
        action: 'Best Fit: Allocate P2 (417 KB)',
        why: 'Candidate blocks >= 417: 500, 600. Smallest is 500 KB (Block 2)!',
        calculation: 'Allocated to Block 2 (500 KB). Remaining fragment = 500 - 417 = 83 KB.',
        blocksState: [
          { block: 'B1 (100K)', status: 'Free' },
          { block: 'B2 (500K)', status: 'P2 (417K) | 83K free' },
          { block: 'B3 (200K)', status: 'Free' },
          { block: 'B4 (300K)', status: 'P1 (212K) | 88K free' },
          { block: 'B5 (600K)', status: 'Free' }
        ]
      },
      {
        step: 3,
        action: 'Best Fit: Allocate P3 (112 KB)',
        why: 'Candidate free blocks >= 112: 200, 600. Smallest is 200 KB (Block 3)!',
        calculation: 'Allocated to Block 3 (200 KB). Remaining fragment = 200 - 112 = 88 KB.',
        blocksState: [
          { block: 'B1 (100K)', status: 'Free' },
          { block: 'B2 (500K)', status: 'P2 (417K) | 83K free' },
          { block: 'B3 (200K)', status: 'P3 (112K) | 88K free' },
          { block: 'B4 (300K)', status: 'P1 (212K) | 88K free' },
          { block: 'B5 (600K)', status: 'Free' }
        ]
      },
      {
        step: 4,
        action: 'Best Fit: Allocate P4 (426 KB)',
        why: 'Block 5 (600 KB) is free and 600 >= 426.',
        calculation: 'Allocated to Block 5 (600 KB). Remaining fragment = 600 - 426 = 174 KB. ALL 4 ALLOCATED!',
        blocksState: [
          { block: 'B1 (100K)', status: 'Free (100K)' },
          { block: 'B2 (500K)', status: 'P2 (417K) | 83K free' },
          { block: 'B3 (200K)', status: 'P3 (112K) | 88K free' },
          { block: 'B4 (300K)', status: 'P1 (212K) | 88K free' },
          { block: 'B5 (600K)', status: 'P4 (426K) | 174K free' }
        ]
      }
    ],
    finalCalculations: [
      { metric: 'Best Fit Allocations', formula: 'P1 -> B4(300K) | P2 -> B2(500K) | P3 -> B3(200K) | P4 -> B5(600K)' },
      { metric: 'First Fit Outcome', formula: 'P1 -> B2(500K) | P2 -> B5(600K) | P3 -> B3(200K) | P4(426K) CANNOT BE ALLOCATED (Must wait!)' },
      { metric: 'Best Fit Total Fragment Wasted', formula: '88 + 83 + 88 + 174 = 433 KB internal fragments' }
    ],
    finalAnswer: {
      headers: ['Algorithm', 'P1 (212K)', 'P2 (417K)', 'P3 (112K)', 'P4 (426K)', 'Result'],
      rows: [
        ['Best Fit', 'Block 4 (300K)', 'Block 2 (500K)', 'Block 3 (200K)', 'Block 5 (600K)', 'ALL 4 ALLOCATED'],
        ['First Fit', 'Block 2 (500K)', 'Block 5 (600K)', 'Block 3 (200K)', 'CANNOT ALLOCATE', 'P4 FAILS / WAITS'],
        ['Worst Fit', 'Block 5 (600K)', 'Block 2 (500K)', 'Block 5 (388K left)', 'CANNOT ALLOCATE', 'P4 FAILS / WAITS']
      ],
      summary: 'Best Fit is the ONLY strategy that successfully accommodates all 4 processes.'
    },
    verification: [
      'In First Fit, P1 grabbed the 500K block and P2 grabbed the 600K block, leaving no single block large enough for P4(426K).',
      'Best Fit preserved the 600K block for the large process P4.'
    ],
    commonMistake: 'Assuming Best Fit always produces less overall fragmentation. Best Fit creates tiny, unusable leftover slivers that can cause severe external fragmentation over time.'
  },

  // 10. PAGING & ADDRESS TRANSLATION
  {
    id: 'paging-numerical',
    title: '10. Paging & Address Translation',
    shortTitle: 'Paging',
    category: 'Memory Management',
    domainId: 'memory',
    badge: 'Hardware Translation',
    summary: 'Understand hardware paging bit splits. Compute page number (p), offset (d), look up frame numbers in the page table, and synthesize physical memory addresses in hexadecimal.',
    problem: 'A system uses 32-bit logical addresses with a 4 KB page size. Given logical address 0x00001A40 and a Page Table where Page 1 maps to Frame 7 (0x00007), calculate the Page Number, Offset, and final Physical Address in hexadecimal.',
    givenData: [
      { param: 'Logical Address Space', value: '32 bits (4 GB)' },
      { param: 'Page Size', value: '4 KB = 4096 bytes = 2^12 bytes' },
      { param: 'Given Logical Address', value: '0x00001A40 (Hexadecimal)' },
      { param: 'Page Table Entry', value: 'Page 1 -> Frame 7' }
    ],
    whatToFind: [
      'Number of Offset bits (d)',
      'Number of Page Number bits (p)',
      'Page Number (p) from given address in hex and decimal',
      'Offset (d) from given address in hex and decimal',
      'Physical Address generated for RAM'
    ],
    formulas: [
      { name: 'Offset Bits', formula: 'd = log2(Page Size) = log2(4096) = 12 bits', desc: 'Least significant bits represent offset within page.' },
      { name: 'Page Bits', formula: 'p = Address_Bits - d = 32 - 12 = 20 bits', desc: 'Most significant bits index the Page Table.' },
      { name: 'Physical Address', formula: 'Physical Address = (Frame Number << d) | Offset', desc: 'In hexadecimal: Replace page bits with frame bits, offset remains IDENTICAL.' }
    ],
    initialState: {
      addressHex: '0x00001A40',
      pageSize: '4 KB',
      pageTable: { 0: 'Frame 3', 1: 'Frame 7', 2: 'Frame 12', 3: 'Frame 1' }
    },
    steps: [
      {
        step: 1,
        action: 'Determine Bit Partitioning',
        why: 'Page size dictates offset bits. Address width minus offset bits yields page number bits.',
        calculation: 'Page Size = 4 KB = 2^12 bytes -> Offset d = 12 bits (3 hex digits). Total address = 32 bits (8 hex digits). Page Number p = 32 - 12 = 20 bits (5 hex digits).',
        diagram: 'Logical Address [20 bits: Page Number (p) | 12 bits: Offset (d)]'
      },
      {
        step: 2,
        action: 'Split Logical Address 0x00001A40',
        why: 'Last 3 hex characters (12 bits) represent offset. Remaining 5 hex characters represent page number.',
        calculation: 'Offset (d) = 0xA40 = (10 * 16^2) + (4 * 16) + 0 = 2624 bytes. Page Number (p) = 0x00001 = 1.',
        diagram: 'Page Number = 1 | Offset = 0xA40'
      },
      {
        step: 3,
        action: 'Page Table Lookup',
        why: 'Hardware MMU uses page number p=1 as index into the process Page Table.',
        calculation: 'Page Table[1] = Frame 7 (0x00007).',
        diagram: 'Page Table[Page 1] -> Frame 7'
      },
      {
        step: 4,
        action: 'Synthesize Physical Address',
        why: 'Physical address combines Frame Number with the unchanged Offset.',
        calculation: 'Physical Address = (Frame 7 << 12) + Offset 0xA40 = 0x00007000 + 0x00000A40 = 0x00007A40.',
        diagram: 'Physical Address = 0x00007A40'
      }
    ],
    finalCalculations: [
      { metric: 'Offset (d)', formula: '12 bits = 0xA40 = 2624' },
      { metric: 'Page Number (p)', formula: '20 bits = 0x00001 = Page 1' },
      { metric: 'Frame Number (f)', formula: 'Frame 7 = 0x00007' },
      { metric: 'Physical Address', formula: '0x00007A40' }
    ],
    finalAnswer: {
      headers: ['Component', 'Bits', 'Hex Value', 'Decimal Value'],
      rows: [
        ['Offset (d)', '12 bits', '0xA40', '2624 bytes'],
        ['Page Number (p)', '20 bits', '0x00001', 'Page 1'],
        ['Frame Number (f)', '20 bits', '0x00007', 'Frame 7'],
        ['Physical Address', '32 bits', '0x00007A40', '49,856 bytes']
      ],
      summary: 'Physical Address = 0x00007A40'
    },
    verification: [
      'The offset (0xA40) is identical in both logical and physical addresses because paging only translates the base page to a frame.',
      'Offset (2624) is strictly less than page size (4096), proving offset is valid.'
    ],
    commonMistake: 'Modifying the offset during address translation. The offset is NEVER modified; only the page number is replaced by the frame number!'
  },

  // 11. PAGE REPLACEMENT (FIFO, LRU, OPTIMAL)
  {
    id: 'page-replacement-numerical',
    title: '11. Page Replacement',
    shortTitle: 'Page Replacement',
    category: 'Memory Management',
    domainId: 'memory',
    badge: 'Virtual Memory',
    summary: 'Trace demand paging page replacements across a reference string for 3 physical frames under FIFO, LRU, and Optimal. Watch frame table updates and calculate hit and fault ratios.',
    problem: 'A process references memory pages in order: [7, 0, 1, 2, 0, 3, 0, 4, 2, 3] with 3 physical frames initially empty. Trace LRU page replacement step-by-step and calculate Total Page Faults and Hit Ratio.',
    givenData: [
      { param: 'Reference String', value: '7, 0, 1, 2, 0, 3, 0, 4, 2, 3' },
      { param: 'Physical Frames', value: '3 frames (all initially empty)' },
      { param: 'Algorithm', value: 'LRU (Least Recently Used)' }
    ],
    whatToFind: [
      'Resident frame contents after each page reference',
      'Page Hit vs Page Fault identification',
      'Victim page evicted on each replacement',
      'Total Page Faults, Total Hits, and Hit Ratio'
    ],
    formulas: [
      { name: 'LRU Eviction Rule', formula: 'Evict the page whose last access timestamp is FURTHEST in the past', desc: 'Exploits temporal locality.' },
      { name: 'Hit Ratio', formula: 'Hit Ratio = (Total Page Hits / Total References) * 100%', desc: 'Cache effectiveness.' },
      { name: 'Fault Ratio', formula: 'Fault Ratio = (Total Page Faults / Total References) * 100%', desc: 'Disk I/O penalty.' }
    ],
    initialState: {
      frames: ['-', '-', '-'],
      refString: [7, 0, 1, 2, 0, 3, 0, 4, 2, 3]
    },
    steps: [
      { step: 1, ref: 7, frames: [7, '-', '-'], status: 'Fault', why: 'Frame empty. Page 7 loaded into Frame 0.' },
      { step: 2, ref: 0, frames: [7, 0, '-'], status: 'Fault', why: 'Frame empty. Page 0 loaded into Frame 1.' },
      { step: 3, ref: 1, frames: [7, 0, 1], status: 'Fault', why: 'Frame empty. Page 1 loaded into Frame 2.' },
      { step: 4, ref: 2, frames: [2, 0, 1], status: 'Fault (Replacement)', why: 'Frames full. Past accesses: 1(t=3), 0(t=2), 7(t=1). Page 7 was used furthest in past -> Evict 7, load 2.' },
      { step: 5, ref: 0, frames: [2, 0, 1], status: 'HIT!', why: 'Page 0 is already resident in Frame 1! Refresh access clock for Page 0.' },
      { step: 6, ref: 3, frames: [2, 0, 3], status: 'Fault (Replacement)', why: 'Past accesses: 0(t=5), 2(t=4), 1(t=3). Page 1 used furthest in past -> Evict 1, load 3.' },
      { step: 7, ref: 0, frames: [2, 0, 3], status: 'HIT!', why: 'Page 0 is already resident in Frame 1!' },
      { step: 8, ref: 4, frames: [4, 0, 3], status: 'Fault (Replacement)', why: 'Past accesses: 0(t=7), 3(t=6), 2(t=4). Page 2 used furthest in past -> Evict 2, load 4.' },
      { step: 9, ref: 2, frames: [4, 0, 2], status: 'Fault (Replacement)', why: 'Past accesses: 4(t=8), 0(t=7), 3(t=6). Page 3 used furthest in past -> Evict 3, load 2.' },
      { step: 10, ref: 3, frames: [4, 3, 2], status: 'Fault (Replacement)', why: 'Past accesses: 2(t=9), 4(t=8), 0(t=7). Page 0 used furthest in past -> Evict 0, load 3.' }
    ],
    finalCalculations: [
      { metric: 'Total References', formula: '10' },
      { metric: 'Total Page Faults', formula: '8 faults (3 compulsory/cold + 5 capacity replacements)' },
      { metric: 'Total Page Hits', formula: '2 hits (references 5 and 7)' },
      { metric: 'Hit Ratio', formula: '(2 / 10) * 100% = 20.0%' },
      { metric: 'Fault Ratio', formula: '(8 / 10) * 100% = 80.0%' }
    ],
    finalAnswer: {
      headers: ['Ref #', 'Page Ref', 'Frame 0', 'Frame 1', 'Frame 2', 'Hit / Fault', 'Evicted'],
      rows: [
        ['1', '7', '7', '-', '-', 'Fault (Cold)', 'None'],
        ['2', '0', '7', '0', '-', 'Fault (Cold)', 'None'],
        ['3', '1', '7', '0', '1', 'Fault (Cold)', 'None'],
        ['4', '2', '2', '0', '1', 'Fault', 'Page 7'],
        ['5', '0', '2', '0', '1', 'HIT!', 'None'],
        ['6', '3', '2', '0', '3', 'Fault', 'Page 1'],
        ['7', '0', '2', '0', '3', 'HIT!', 'None'],
        ['8', '4', '4', '0', '3', 'Fault', 'Page 2'],
        ['9', '2', '4', '0', '2', 'Fault', 'Page 3'],
        ['10', '3', '4', '3', '2', 'Fault', 'Page 0']
      ],
      summary: 'Total Faults = 8 | Total Hits = 2 | Hit Ratio = 20.0%'
    },
    verification: [
      'Cold/compulsory faults = 3 (first access to pages 7, 0, 1 into empty frames).',
      'Optimal algorithm on same string yields only 6 faults (benchmark lower bound).'
    ],
    commonMistake: "Belady's Anomaly occurs ONLY in FIFO, never in LRU or Optimal. Also, whenever a page hits in LRU, don't forget to refresh its access timestamp!"
  },

  // 12. TLB & EFFECTIVE ACCESS TIME
  {
    id: 'tlb-eat-numerical',
    title: '12. TLB & Effective Access Time',
    shortTitle: 'TLB / EAT',
    category: 'Memory Management',
    domainId: 'memory',
    badge: 'Memory Hierarchy',
    summary: 'Calculate Effective Access Time (EAT) for paging systems equipped with a Translation Lookaside Buffer (TLB). Compare memory performance with and without TLB caching.',
    problem: 'A paging system has a TLB access time of 20 ns and a Main Memory access time of 100 ns. The TLB hit ratio is 80% (alpha = 0.80). Calculate the Effective Access Time (EAT) and compute the speedup compared to a system with no TLB.',
    givenData: [
      { param: 'TLB Search Time (t_tlb)', value: '20 ns' },
      { param: 'Main Memory Access Time (t_m)', value: '100 ns' },
      { param: 'TLB Hit Ratio (alpha)', value: '80% = 0.80' },
      { param: 'TLB Miss Ratio (1 - alpha)', value: '20% = 0.20' }
    ],
    whatToFind: [
      'Latency on a TLB Hit',
      'Latency on a TLB Miss',
      'Effective Access Time (EAT)',
      'Access time without TLB and system speedup'
    ],
    formulas: [
      { name: 'EAT Formula', formula: 'EAT = alpha * (t_tlb + t_m) + (1 - alpha) * (t_tlb + 2 * t_m)', desc: 'Weighted average latency across hits and misses.' },
      { name: 'TLB Hit Latency', formula: 'Hit Latency = t_tlb + t_m', desc: 'TLB lookup + 1 physical memory access.' },
      { name: 'TLB Miss Latency', formula: 'Miss Latency = t_tlb + t_m (page table) + t_m (data) = t_tlb + 2 * t_m', desc: 'TLB lookup + Page Table RAM access + Data RAM access.' },
      { name: 'No-TLB Latency', formula: 'No_TLB = 2 * t_m', desc: 'Every memory access requires 2 RAM cycles.' }
    ],
    initialState: {
      tlbSearch: 20,
      memAccess: 100,
      hitRatio: 0.80
    },
    steps: [
      {
        step: 1,
        action: 'Calculate TLB Hit Path Latency',
        why: 'On a TLB Hit (probability alpha=0.80), the frame number is found in the TLB cache. Only ONE main memory access is needed for actual data.',
        calculation: 'Hit Latency = t_tlb + t_m = 20 ns + 100 ns = 120 ns.'
      },
      {
        step: 2,
        action: 'Calculate TLB Miss Path Latency',
        why: 'On a TLB Miss (probability 1-alpha=0.20), TLB lookup misses. MMU must read Page Table from RAM, then read the actual data from RAM.',
        calculation: 'Miss Latency = t_tlb + t_m(page table) + t_m(data) = 20 ns + 100 ns + 100 ns = 220 ns.'
      },
      {
        step: 3,
        action: 'Compute Weighted EAT',
        why: 'Combine hit and miss cases by their respective probabilities.',
        calculation: 'EAT = (0.80 * 120 ns) + (0.20 * 220 ns) = 96 ns + 44 ns = 140 ns.'
      },
      {
        step: 4,
        action: 'Compare with No-TLB Baseline',
        why: 'Without a TLB, every single access requires reading Page Table from RAM + reading data from RAM.',
        calculation: 'No-TLB Access Time = 2 * 100 ns = 200 ns. Speedup = (200 - 140) / 200 = 60 / 200 = 30% reduction in memory latency (1.43x speedup).'
      }
    ],
    finalCalculations: [
      { metric: 'TLB Hit Path (80%)', formula: '0.80 * (20 + 100) = 0.80 * 120 = 96.0 ns' },
      { metric: 'TLB Miss Path (20%)', formula: '0.20 * (20 + 100 + 100) = 0.20 * 220 = 44.0 ns' },
      { metric: 'Effective Access Time (EAT)', formula: '96.0 + 44.0 = 140.0 ns' },
      { metric: 'Baseline without TLB', formula: '2 * 100 ns = 200.0 ns' },
      { metric: 'Speedup', formula: '200 ns / 140 ns = 1.43x faster' }
    ],
    finalAnswer: {
      headers: ['Scenario', 'Probability', 'Lookup Steps', 'Total Latency'],
      rows: [
        ['TLB Hit', '80%', 'TLB (20ns) + Data RAM (100ns)', '120 ns'],
        ['TLB Miss', '20%', 'TLB (20ns) + Page Table RAM (100ns) + Data RAM (100ns)', '220 ns'],
        ['Overall EAT', '100%', 'Weighted Average', '140.0 ns'],
        ['System without TLB', '100%', 'Page Table RAM (100ns) + Data RAM (100ns)', '200.0 ns']
      ],
      summary: 'Effective Access Time (EAT) = 140.0 ns (30% latency reduction over No-TLB)'
    },
    verification: [
      'EAT (140 ns) falls strictly between the hit time (120 ns) and the miss time (220 ns), confirming mathematical bounds.',
      'If hit ratio was 100%, EAT would be 120 ns. If hit ratio was 0%, EAT would be 220 ns.'
    ],
    commonMistake: 'Forgetting that on a TLB miss, we STILL paid the initial TLB search time t_tlb (20 ns). Miss latency is t_tlb + 2*t_m, NOT simply 2*t_m.'
  },

  // 13. DISK SCHEDULING
  {
    id: 'disk-scheduling-numerical',
    title: '13. Disk Scheduling',
    shortTitle: 'Disk Scheduling',
    category: 'Storage Management',
    domainId: 'storage',
    badge: 'I/O Head Movement',
    summary: 'Calculate Total Head Movement (seek distance) across disk cylinders for FCFS, SSTF, SCAN, and LOOK algorithms. Understand elevator head turnaround rules.',
    problem: 'A disk queue contains cylinder requests: [98, 183, 37, 122, 14, 124, 65, 67]. Read/write head is currently at cylinder 53 moving toward higher cylinder numbers (UP). Total disk size is 200 cylinders (0 to 199). Calculate Total Head Movement under the LOOK algorithm.',
    givenData: [
      { param: 'Request Queue', value: '98, 183, 37, 122, 14, 124, 65, 67' },
      { param: 'Initial Head Position', value: 'Cylinder 53' },
      { param: 'Initial Arm Direction', value: 'UP (towards cylinder 199)' },
      { param: 'Disk Cylinder Range', value: '0 to 199 (200 cylinders total)' },
      { param: 'Algorithm', value: 'LOOK (Elevator without traveling to empty edges)' }
    ],
    whatToFind: [
      'Order of requests serviced under ascending sweep',
      'Turnaround point (highest cylinder requested)',
      'Order of requests serviced under descending sweep',
      'Total Head Movement (seek distance) in cylinders'
    ],
    formulas: [
      { name: 'LOOK Algorithm Rule', formula: 'Move in current direction servicing requests until highest requested cylinder (183), then reverse to lowest requested cylinder (14)', desc: 'Does NOT travel to physical disk boundary 199.' },
      { name: 'LOOK Formula Shortcut', formula: 'Total Head Movement = |Max_Request - Start_Head| + |Max_Request - Min_Request|', desc: 'Valid when head starts between min and max and reverses once.' }
    ],
    initialState: {
      currentHead: 53,
      direction: 'UP',
      queue: [14, 37, 65, 67, 98, 122, 124, 183] // sorted for clarity
    },
    steps: [
      { step: 1, from: 53, to: 65, move: 12, dir: 'UP', why: 'Starting at 53 moving UP, 65 is the nearest pending request.' },
      { step: 2, from: 65, to: 67, move: 2, dir: 'UP', why: 'Next closest request continuing UP is 67.' },
      { step: 3, from: 67, to: 98, move: 31, dir: 'UP', why: 'Next closest request continuing UP is 98.' },
      { step: 4, from: 98, to: 122, move: 24, dir: 'UP', why: 'Next closest request continuing UP is 122.' },
      { step: 5, from: 122, to: 124, move: 2, dir: 'UP', why: 'Next closest request continuing UP is 124.' },
      { step: 6, from: 124, to: 183, move: 59, dir: 'UP (Peak reached)', why: '183 is the highest request in the queue. LOOK reverses here without going to 199!' },
      { step: 7, from: 183, to: 37, move: 146, dir: 'DOWN (Reversed)', why: 'Reverses to DOWN direction. Next request in queue below 53 is 37.' },
      { step: 8, from: 37, to: 14, move: 23, dir: 'DOWN', why: 'Final pending request is 14. All 8 requests serviced!' }
    ],
    finalCalculations: [
      { metric: 'Ascending Leg (53 to 183)', formula: '|183 - 53| = 130 cylinders' },
      { metric: 'Descending Leg (183 to 14)', formula: '|183 - 14| = 169 cylinders' },
      { metric: 'Total Head Movement (LOOK)', formula: '130 + 169 = 299 cylinders' },
      { metric: 'Comparison with SCAN', formula: 'SCAN goes to 199: (199 - 53) + (199 - 14) = 146 + 185 = 331 cylinders (LOOK saves 32 cylinders)' }
    ],
    finalAnswer: {
      headers: ['Hop #', 'From Cylinder', 'To Cylinder', 'Seek Distance', 'Direction', 'Cumulative Movement'],
      rows: [
        ['1', '53', '65', '12', 'UP', '12 cylinders'],
        ['2', '65', '67', '2', 'UP', '14 cylinders'],
        ['3', '67', '98', '31', 'UP', '45 cylinders'],
        ['4', '98', '122', '24', 'UP', '69 cylinders'],
        ['5', '122', '124', '2', 'UP', '71 cylinders'],
        ['6', '124', '183', '59', 'UP (Peak)', '130 cylinders'],
        ['7', '183', '37', '146', 'DOWN', '276 cylinders'],
        ['8', '37', '14', '23', 'DOWN', '299 cylinders']
      ],
      summary: 'Total Head Movement = 299 cylinders (LOOK) vs 331 cylinders (SCAN)'
    },
    verification: [
      'LOOK shortcut formula: |183 - 53| + |183 - 14| = 130 + 169 = 299 cylinders exactly matches step-by-step sum.',
      'All 8 requests in the queue were serviced.'
    ],
    commonMistake: 'Confusing LOOK with SCAN. In SCAN, the head travels all the way to physical cylinder 199 before reversing. In LOOK, the head reverses immediately at the highest requested cylinder (183).'
  }
];

export function getOSNumericalTopic(id) {
  if (!id) return OS_NUMERICAL_TOPICS[0];
  const clean = String(id).toLowerCase().trim();
  const match = OS_NUMERICAL_TOPICS.find(
    (t) => t.id === clean || t.shortTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') === clean || t.id.includes(clean)
  );
  return match || OS_NUMERICAL_TOPICS[0];
}
