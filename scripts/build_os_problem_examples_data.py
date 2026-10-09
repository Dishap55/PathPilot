# -*- coding: utf-8 -*-
"""
Generator for client/src/data/os/osProblemExamplesData.js
Creates 2-3 short, easy, crisp worked examples for all 30 OS topics.
Structure per example:
- id
- title
- problem
- given
- flowchart: list of nodes/flow transitions
- steps: [{ step, action, result }]
- answer
- quickExplanation
"""

import json
import os

target_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'client', 'src', 'data', 'os', 'osProblemExamplesData.js'))

EXAMPLES_DATA = {
    # 1. Introduction to Operating Systems
    "intro-to-os": [
        {
            "id": "os-intro-ex1",
            "title": "Example 1: Dual Purpose of an OS",
            "problem": "Identify whether allocating CPU time to Word and Chrome is acting as an Extended Machine or a Resource Manager.",
            "given": "Two user apps (Word, Chrome) competing for a single CPU core.",
            "flowchart": ["User Applications", "OS Resource Manager", "CPU Core Allocation", "Isolated Execution"],
            "steps": [
                {"step": 1, "action": "Analyze role", "result": "The OS arbitrates access to the scarce hardware CPU core."},
                {"step": 2, "action": "Classify function", "result": "Managing CPU, RAM, and I/O devices is the Resource Allocator role."}
            ],
            "answer": "Resource Allocator (Resource Manager).",
            "quickExplanation": "Extended Machine provides abstract APIs like write(); Resource Allocator manages hardware queues and slices."
        },
        {
            "id": "os-intro-ex2",
            "title": "Example 2: Cold Boot Sequence Trace",
            "problem": "Trace which component loads the Linux kernel into RAM upon power on.",
            "given": "System powered on; CPU starts executing firmware at reset vector.",
            "flowchart": ["Power On", "BIOS / UEFI POST", "MBR / Bootloader (GRUB)", "Kernel Loaded into RAM", "PID 1 (init/systemd)"],
            "steps": [
                {"step": 1, "action": "CPU executes BIOS/UEFI", "result": "POST test verifies RAM and disk."},
                {"step": 2, "action": "Bootloader executed", "result": "GRUB reads vmlinuz from SSD into RAM."}
            ],
            "answer": "Bootloader (e.g. GRUB / Windows Boot Manager).",
            "quickExplanation": "BIOS initializes hardware and loads the bootloader; the bootloader loads the OS kernel into physical memory."
        }
    ],

    # 2. OS Services and System Calls
    "os-services-system-calls": [
        {
            "id": "syscall-ex1",
            "title": "Example 1: Tracing the printf() System Call",
            "problem": "How many mode switches occur when C program calls printf(\"Hello\")?",
            "given": "User program calls printf(\"Hello\"), which invokes write(1, buf, 5).",
            "flowchart": ["User App: printf()", "C Library: write()", "Software Trap (syscall)", "Kernel Mode: sys_write()", "Display Driver", "Return to User Mode"],
            "steps": [
                {"step": 1, "action": "printf() calls write()", "result": "Prepares syscall parameters in CPU registers."},
                {"step": 2, "action": "Executes trap (int 0x80 / syscall)", "result": "Mode switch 1: User Mode -> Kernel Mode."},
                {"step": 3, "action": "sys_write executes and returns", "result": "Mode switch 2: Kernel Mode -> User Mode."}
            ],
            "answer": "2 mode switches (User -> Kernel -> User).",
            "quickExplanation": "System calls safely transition the CPU to Ring 0 via a hardware trap and restore Ring 3 on return."
        },
        {
            "id": "syscall-ex2",
            "title": "Example 2: fork() Return Value Differentiation",
            "problem": "Given pid_t pid = fork(); how does the code distinguish parent from child?",
            "given": "fork() called once in a running process.",
            "flowchart": ["Parent Process: fork()", "OS Clones Address Space", "Parent gets child PID (>0)", "Child gets return value 0"],
            "steps": [
                {"step": 1, "action": "Check return in child", "result": "Child receives 0."},
                {"step": 2, "action": "Check return in parent", "result": "Parent receives positive PID of child."}
            ],
            "answer": "pid == 0 is Child; pid > 0 is Parent; pid < 0 is Error.",
            "quickExplanation": "fork() returns twice from a single call: 0 to the child and the child's PID to the parent."
        }
    ],

    # 3. OS Structures and Architectures
    "os-structures-architectures": [
        {
            "id": "arch-ex1",
            "title": "Example 1: Monolithic vs Microkernel Failure Domain",
            "problem": "If a printer driver crashes in a Monolithic OS vs a Microkernel OS, what happens to the system?",
            "given": "Printer device driver encounters a null-pointer kernel panic.",
            "flowchart": ["Driver Crash Event", "Monolithic: Entire Kernel Panics", "Microkernel: Only User Driver Restarts"],
            "steps": [
                {"step": 1, "action": "Monolithic test", "result": "Driver runs in Ring 0; crash causes Blue Screen of Death (BSOD)."},
                {"step": 2, "action": "Microkernel test", "result": "Driver runs in user space; OS simply restarts the driver process."}
            ],
            "answer": "Monolithic: Complete system crash; Microkernel: Only the printer service restarts.",
            "quickExplanation": "Microkernels move drivers and filesystems to user space, reducing the Trusted Computing Base (TCB)."
        },
        {
            "id": "arch-ex2",
            "title": "Example 2: IPC Overhead in Microkernels",
            "problem": "Why does a Monolithic kernel have higher throughput than a Microkernel for I/O?",
            "given": "Application reads 100 blocks from disk.",
            "flowchart": ["App", "User-Kernel Switch", "IPC Message to VFS", "IPC to Disk Driver", "Return"],
            "steps": [
                {"step": 1, "action": "Monolithic path", "result": "Simple direct function call in kernel space."},
                {"step": 2, "action": "Microkernel path", "result": "Multiple context switches and message-passing IPC overhead."}
            ],
            "answer": "Microkernels require message passing and multiple context switches.",
            "quickExplanation": "Microkernels trade message-passing latency for modularity and fault isolation."
        }
    ],

    # 4. Interrupts, Traps and Dual Mode
    "interrupts-traps-dual-mode": [
        {
            "id": "interrupt-ex1",
            "title": "Example 1: Interrupt vs Trap Identification",
            "problem": "Classify: 1) Division by zero, 2) Keystroke pressed, 3) System call.",
            "given": "Three CPU event occurrences.",
            "flowchart": ["Event Occurs", "Hardware / External -> Interrupt", "Software / Instruction -> Trap / Exception"],
            "steps": [
                {"step": 1, "action": "Division by zero", "result": "Synchronous software error -> Trap (Exception)."},
                {"step": 2, "action": "Keystroke pressed", "result": "Asynchronous hardware line -> Interrupt."},
                {"step": 3, "action": "System call", "result": "Software-generated programmed trap -> Trap."}
            ],
            "answer": "1) Trap, 2) Hardware Interrupt, 3) Software Trap.",
            "quickExplanation": "Interrupts are asynchronous hardware signals; Traps are synchronous software-generated events."
        },
        {
            "id": "interrupt-ex2",
            "title": "Example 2: Dual Mode Protection Violation",
            "problem": "What happens if a user application tries to execute CLI (Clear Interrupts)?",
            "given": "CPU is running in User Mode (Mode Bit = 1). Program executes privileged instruction CLI.",
            "flowchart": ["User Mode (Mode Bit = 1)", "Execute Privileged Instruction", "MMU / Hardware Checks Mode", "Trap: General Protection Fault"],
            "steps": [
                {"step": 1, "action": "Hardware checks mode bit", "result": "Mode bit is 1 (User mode)."},
                {"step": 2, "action": "Evaluate instruction privilege", "result": "CLI requires Ring 0 (Mode bit = 0)."}
            ],
            "answer": "CPU traps to kernel with General Protection Fault; OS terminates application.",
            "quickExplanation": "Privileged instructions cannot be executed in User Mode to protect system integrity."
        }
    ],

    # 5. Processes and Process States
    "processes-process-states": [
        {
            "id": "proc-ex1",
            "title": "Example 1: 5-State Transition on I/O Request",
            "problem": "A running process needs to read data from SSD. Trace its state changes.",
            "given": "Process P1 is in the RUNNING state on CPU.",
            "flowchart": ["New", "Ready", "Running", "Waiting (I/O Blocked)", "Ready", "Running", "Terminated"],
            "steps": [
                {"step": 1, "action": "Process executes read() syscall", "result": "Transitions from RUNNING -> WAITING (BLOCKED)."},
                {"step": 2, "action": "SSD controller finishes read", "result": "Hardware interrupt: Transitions WAITING -> READY."},
                {"step": 3, "action": "CPU Scheduler selects P1", "result": "Transitions READY -> RUNNING."}
            ],
            "answer": "Running -> Waiting -> Ready -> Running.",
            "quickExplanation": "Processes wait for I/O in the Waiting queue, moving to Ready when data is in buffer."
        },
        {
            "id": "proc-ex2",
            "title": "Example 2: Counting Processes Created by fork()",
            "problem": "How many total child processes are created if fork() is executed 3 times in a row?",
            "given": "Code: fork(); fork(); fork(); with no conditionals.",
            "flowchart": ["Main Process", "fork() 1 -> 2 processes", "fork() 2 -> 4 processes", "fork() 3 -> 8 processes", "7 Children Created"],
            "steps": [
                {"step": 1, "action": "Apply fork formula", "result": "Total processes = 2^n = 2^3 = 8."},
                {"step": 2, "action": "Calculate child processes", "result": "Child processes = 2^n - 1 = 8 - 1 = 7."}
            ],
            "answer": "7 child processes created (8 total processes including parent).",
            "quickExplanation": "n consecutive fork() calls create 2^n total processes, of which 2^n - 1 are newly spawned children."
        }
    ],

    # 6. PCB and Context Switching
    "pcb-context-switching": [
        {
            "id": "pcb-ex1",
            "title": "Example 1: Context Switch State Preservation",
            "problem": "When timer interrupt preempts P1 for P2, what must be saved and restored?",
            "given": "P1 is running on CPU; timer interrupt fires.",
            "flowchart": ["P1 Running", "Timer Interrupt", "Save P1 State to PCB 1", "Load P2 State from PCB 2", "P2 Running"],
            "steps": [
                {"step": 1, "action": "Save P1 registers", "result": "PC, SP, general registers saved into PCB 1."},
                {"step": 2, "action": "Switch page tables", "result": "Reload CR3 register with P2's page directory."},
                {"step": 3, "action": "Restore P2 registers", "result": "Load PC, SP from PCB 2 into hardware registers."}
            ],
            "answer": "P1 CPU registers and stack pointer saved to PCB 1; P2 registers restored from PCB 2.",
            "quickExplanation": "Context switching is pure CPU overhead—no useful user work is performed during the switch."
        },
        {
            "id": "pcb-ex2",
            "title": "Example 2: Context Switch Overhead Calculation",
            "problem": "If context switch takes 10 microseconds and quantum is 1 millisecond, what % of CPU is wasted?",
            "given": "Context switch time = 10 us (0.01 ms), Time slice quantum = 1 ms (1000 us).",
            "flowchart": ["Run Process: 1000 us", "Context Switch: 10 us", "Total Slot: 1010 us", "Overhead = 10 / 1010"],
            "steps": [
                {"step": 1, "action": "Calculate slot duration", "result": "1000 us + 10 us = 1010 us."},
                {"step": 2, "action": "Compute ratio", "result": "Overhead = (10 / 1010) * 100% ~= 0.99%."}
            ],
            "answer": "~0.99% (approx 1%) CPU overhead.",
            "quickExplanation": "Keeping quantum large relative to context switch time ensures high CPU efficiency."
        }
    ],

    # 7. Threads and Multithreading
    "threads-multithreading": [
        {
            "id": "thread-ex1",
            "title": "Example 1: Thread Shared vs Private Resources",
            "problem": "In a process with 3 threads, which memory regions are shared and which are private?",
            "given": "3 peer threads running within Process P.",
            "flowchart": ["Process Address Space", "Shared: Code, Data, Heap, Files", "Private: Registers, Program Counter, Stack"],
            "steps": [
                {"step": 1, "action": "Identify shared memory", "result": "Code segment, Data segment, Heap, Open file descriptors."},
                {"step": 2, "action": "Identify private per-thread items", "result": "Program Counter (PC), Register set, Call Stack."}
            ],
            "answer": "Shared: Heap, Data, Code, Files. Private: Stack, Registers, Program Counter.",
            "quickExplanation": "Each thread needs its own stack and registers for independent execution flow."
        },
        {
            "id": "thread-ex2",
            "title": "Example 2: Many-to-One Model Blocking Flaw",
            "problem": "Why does a blocking system call freeze all user threads in a Many-to-One multithreading model?",
            "given": "User threads T1, T2, T3 mapped to a single Kernel thread K1. T1 calls read().",
            "flowchart": ["User Thread T1 (read)", "Single Kernel Thread K1", "Kernel Blocks K1 on I/O", "T2 and T3 Frozen!"],
            "steps": [
                {"step": 1, "action": "T1 calls blocking I/O", "result": "Kernel sees only K1 making the request."},
                {"step": 2, "action": "Kernel suspends K1", "result": "Since K1 is asleep, T2 and T3 cannot get CPU time."}
            ],
            "answer": "The entire process blocks because the kernel manages only one single thread for all user threads.",
            "quickExplanation": "Modern OSes use One-to-One threading so that one blocking thread does not halt peer threads."
        }
    ],

    # 8. Inter-Process Communication (IPC)
    "ipc": [
        {
            "id": "ipc-ex1",
            "title": "Example 1: Shared Memory vs Message Passing Tradeoff",
            "problem": "Which IPC model is faster for transferring a 500MB video frame between processes?",
            "given": "Process A produces 500MB frame; Process B consumes it on the same machine.",
            "flowchart": ["Process A (Producer)", "Option 1: Shared RAM (Zero-Copy)", "Option 2: Message Passing (Kernel Copy x2)", "Process B (Consumer)"],
            "steps": [
                {"step": 1, "action": "Analyze Shared Memory", "result": "Both processes map the same physical RAM. Zero kernel copying!"},
                {"step": 2, "action": "Analyze Message Passing", "result": "Requires copying 500MB into kernel, then copying out to Process B."}
            ],
            "answer": "Shared Memory is vastly faster (zero-copy memory speed).",
            "quickExplanation": "Shared Memory provides maximum speed; Message Passing provides simpler synchronization."
        },
        {
            "id": "ipc-ex2",
            "title": "Example 2: Anonymous Unix Pipe Data Direction",
            "problem": "Why must a pipe descriptor be closed in child and parent when setting up unidirectional communication?",
            "given": "pipe(fd) creates fd[0] (read) and fd[1] (write). Parent writes to Child.",
            "flowchart": ["pipe() creates fd[0] & fd[1]", "Parent closes fd[0] (Read)", "Child closes fd[1] (Write)", "Parent writes -> Child reads"],
            "steps": [
                {"step": 1, "action": "Parent role", "result": "Parent only writes -> close fd[0]."},
                {"step": 2, "action": "Child role", "result": "Child only reads -> close fd[1] to properly detect EOF."}
            ],
            "answer": "Parent closes fd[0]; Child closes fd[1].",
            "quickExplanation": "Closing unused write ends allows the reader to receive EOF when the writer finishes."
        }
    ],

    # 9. CPU Scheduling Fundamentals
    "cpu-scheduling-fundamentals": [
        {
            "id": "sched-fund-ex1",
            "title": "Example 1: Preemptive vs Non-Preemptive Scheduling",
            "problem": "Process P1 is executing. Higher priority P2 arrives. What happens under preemptive vs non-preemptive?",
            "given": "P1 running (priority 1), P2 arrives (priority 10, higher).",
            "flowchart": ["P2 Arrives (Higher Priority)", "Preemptive: P1 Interrupted -> P2 Runs", "Non-Preemptive: P1 Finishes Burst -> P2 Runs"],
            "steps": [
                {"step": 1, "action": "Preemptive decision", "result": "CPU immediately halts P1, moves it to Ready, and dispatches P2."},
                {"step": 2, "action": "Non-preemptive decision", "result": "P1 keeps CPU until it terminates or blocks for I/O."}
            ],
            "answer": "Preemptive: P1 is stopped immediately. Non-preemptive: P1 runs to burst completion.",
            "quickExplanation": "Preemption allows immediate response to urgent events at the expense of context-switch overhead."
        },
        {
            "id": "sched-fund-ex2",
            "title": "Example 2: Metrics Formulas Verification",
            "problem": "Process arrives at AT=2, starts at ST=2, finishes at CT=8. Calculate TAT, WT, and RT.",
            "given": "AT = 2, ST = 2, CT = 8, Burst Time BT = 6.",
            "flowchart": ["AT = 2", "Start = 2", "End = 8", "TAT = CT - AT", "WT = TAT - BT", "RT = ST - AT"],
            "steps": [
                {"step": 1, "action": "Calculate TAT", "result": "TAT = CT - AT = 8 - 2 = 6."},
                {"step": 2, "action": "Calculate WT", "result": "WT = TAT - BT = 6 - 6 = 0."},
                {"step": 3, "action": "Calculate RT", "result": "RT = ST - AT = 2 - 2 = 0."}
            ],
            "answer": "Turnaround Time = 6, Waiting Time = 0, Response Time = 0.",
            "quickExplanation": "TAT measures total life in system; WT measures time spent waiting in Ready queue."
        }
    ],

    # 10. FCFS Scheduling
    "fcfs-scheduling": [
        {
            "id": "fcfs-ex1",
            "title": "Example 1: FCFS Convoy Effect Demonstration",
            "problem": "P1 (BT=20) arrives at 0. P2 (BT=2) and P3 (BT=2) arrive at 0. Calculate Average WT.",
            "given": "P1: BT=20, P2: BT=2, P3: BT=2. All arrive at AT=0.",
            "flowchart": ["P1: 0 to 20", "P2: 20 to 22", "P3: 22 to 24", "WT P1=0, P2=20, P3=22"],
            "steps": [
                {"step": 1, "action": "Gantt Chart", "result": "[0 P1 20] [20 P2 22] [22 P3 24]"},
                {"step": 2, "action": "Calculate Waiting Times", "result": "P1 = 0, P2 = 20, P3 = 22."},
                {"step": 3, "action": "Average WT", "result": "(0 + 20 + 22) / 3 = 42 / 3 = 14."}
            ],
            "answer": "Average Waiting Time = 14.",
            "quickExplanation": "Convoy Effect: Short processes P2 and P3 wait 20 units behind the long CPU hog P1."
        },
        {
            "id": "fcfs-ex2",
            "title": "Example 2: FCFS with CPU Idle Gap",
            "problem": "P1 (AT=0, BT=3) and P2 (AT=5, BT=4). What happens between time 3 and 5?",
            "given": "P1 finishes at t=3; P2 does not arrive until t=5.",
            "flowchart": ["0 [P1] 3", "3 [CPU IDLE] 5", "5 [P2] 9"],
            "steps": [
                {"step": 1, "action": "P1 runs", "result": "t=0 to 3."},
                {"step": 2, "action": "No process in Ready queue", "result": "CPU stays IDLE for 2 units (t=3 to 5)."},
                {"step": 3, "action": "P2 arrives and runs", "result": "t=5 to 9."}
            ],
            "answer": "CPU is Idle for 2 units from t=3 to t=5.",
            "quickExplanation": "Gantt charts must record idle gaps whenever the ready queue is empty."
        }
    ],

    # 11. SJF and SRTF Scheduling
    "sjf-srtf-scheduling": [
        {
            "id": "sjf-ex1",
            "title": "Example 1: Non-Preemptive SJF Minimizing WT",
            "problem": "P1(BT=6), P2(BT=8), P3(BT=3), P4(BT=4) all arrive at t=0. What is optimal order?",
            "given": "4 processes available at t=0.",
            "flowchart": ["P3 (BT=3)", "P4 (BT=4)", "P1 (BT=6)", "P2 (BT=8)"],
            "steps": [
                {"step": 1, "action": "Sort by Burst Time", "result": "P3 (3) < P4 (4) < P1 (6) < P2 (8)."},
                {"step": 2, "action": "Gantt Chart", "result": "[0 P3 3] [3 P4 7] [7 P1 13] [13 P2 21]."},
                {"step": 3, "action": "Calculate WT", "result": "P3=0, P4=3, P1=7, P2=13. Avg = 23 / 4 = 5.75."}
            ],
            "answer": "Order: P3 -> P4 -> P1 -> P2. Average WT = 5.75.",
            "quickExplanation": "SJF is provably optimal for minimizing average waiting time among non-preemptive algorithms."
        },
        {
            "id": "sjf-ex2",
            "title": "Example 2: SRTF Preemption on Shorter Arrival",
            "problem": "P1(AT=0, BT=8). At t=1, P2(AT=1, BT=2) arrives. Does preemption occur?",
            "given": "P1 has remaining burst 7 at t=1. P2 has burst 2.",
            "flowchart": ["0 [P1] 1", "P2 Arrives (BT=2 < 7)", "P1 Preempted", "1 [P2] 3", "3 [P1] 10"],
            "steps": [
                {"step": 1, "action": "Compare remaining bursts at t=1", "result": "P2 remaining (2) < P1 remaining (7)."},
                {"step": 2, "action": "Preempt CPU", "result": "P1 moves to Ready; P2 gets CPU from t=1 to 3."}
            ],
            "answer": "Yes, P1 is preempted by P2 at t=1.",
            "quickExplanation": "SRTF preempts whenever a newly arrived process has a shorter remaining burst than the running process."
        }
    ],

    # 12. Priority Scheduling
    "priority-scheduling-algo": [
        {
            "id": "priority-ex1",
            "title": "Example 1: Non-Preemptive Priority Order",
            "problem": "P1(Pri=2, BT=4), P2(Pri=1, BT=3), P3(Pri=3, BT=1). Higher number = higher priority. Order at t=0?",
            "given": "Higher number represents higher priority. All arrive at t=0.",
            "flowchart": ["P3 (Pri=3)", "P1 (Pri=2)", "P2 (Pri=1)"],
            "steps": [
                {"step": 1, "action": "Order by Priority", "result": "P3 (3) > P1 (2) > P2 (1)."},
                {"step": 2, "action": "Gantt Chart", "result": "[0 P3 1] [1 P1 5] [5 P2 8]."}
            ],
            "answer": "Execution Order: P3 -> P1 -> P2.",
            "quickExplanation": "Always check whether the problem defines higher numerical value as higher or lower priority!"
        },
        {
            "id": "priority-ex2",
            "title": "Example 2: Curing Starvation via Aging",
            "problem": "Low-priority process P_low (priority 1) has waited 100 seconds. How does Aging rescue it?",
            "given": "Aging rule: increase process priority by 1 for every 10 seconds waited.",
            "flowchart": ["t=0: Priority 1", "t=10: Priority 2", "...", "t=100: Priority 11 (Top Priority!)", "Runs on CPU"],
            "steps": [
                {"step": 1, "action": "Apply aging increments", "result": "100s / 10s = 10 priority boosts."},
                {"step": 2, "action": "Final priority", "result": "1 + 10 = 11. Process now outranks new arrivals and runs."}
            ],
            "answer": "Priority increases from 1 to 11, guaranteeing eventual execution.",
            "quickExplanation": "Aging gradually elevates the priority of long-waiting processes to prevent starvation."
        }
    ],

    # 13. Round Robin Scheduling
    "round-robin-scheduling": [
        {
            "id": "rr-ex1",
            "title": "Example 1: Round Robin with Quantum = 2",
            "problem": "P1(BT=5), P2(BT=3) arrive at t=0. Time Quantum Q = 2. Trace execution.",
            "given": "Q = 2. Initial ready queue: [P1, P2].",
            "flowchart": ["0 [P1: rem 3] 2", "2 [P2: rem 1] 4", "4 [P1: rem 1] 6", "6 [P2: DONE] 7", "7 [P1: DONE] 8"],
            "steps": [
                {"step": 1, "action": "t=0 to 2", "result": "P1 runs 2 units (rem 3). Re-queued behind P2."},
                {"step": 2, "action": "t=2 to 4", "result": "P2 runs 2 units (rem 1). Re-queued behind P1."},
                {"step": 3, "action": "t=4 to 6", "result": "P1 runs 2 units (rem 1)."},
                {"step": 4, "action": "t=6 to 7", "result": "P2 runs 1 unit and completes! CT_P2 = 7."},
                {"step": 5, "action": "t=7 to 8", "result": "P1 runs remaining 1 unit and completes! CT_P1 = 8."}
            ],
            "answer": "Gantt: P1(0-2) -> P2(2-4) -> P1(4-6) -> P2(6-7) -> P1(7-8).",
            "quickExplanation": "When a process finishes with time remaining in its quantum, the CPU is immediately given to the next process."
        },
        {
            "id": "rr-ex2",
            "title": "Example 2: Extremes of Time Quantum Q",
            "problem": "What happens if Time Quantum Q is: 1) Very large (Q -> infinity), 2) Extremely small (Q -> 0)?",
            "given": "Round Robin scheduling algorithm.",
            "flowchart": ["Q -> Infinity: Degenerates to FCFS", "Q -> 0: Processor Sharing (High Context Switch Overhead)"],
            "steps": [
                {"step": 1, "action": "Q -> infinity", "result": "Every process finishes in its first quantum -> FCFS."},
                {"step": 2, "action": "Q -> 0", "result": "Severe thrashing; CPU spends 90%+ time in context switching."}
            ],
            "answer": "Large Q: Degenerates into FCFS; Tiny Q: Massive context switch overhead.",
            "quickExplanation": "Optimal quantum rule of thumb: 80% of CPU bursts should be shorter than Q."
        }
    ],

    # 14. Multilevel Queue and Multilevel Feedback Queue
    "mlq-mlfq-scheduling": [
        {
            "id": "mlfq-ex1",
            "title": "Example 1: MLFQ Priority Demotion",
            "problem": "A CPU-bound job runs in Queue 0 (Q=4ms). It consumes the full 4ms without I/O. What happens?",
            "given": "3-level MLFQ: Q0 (Q=4ms, RR), Q1 (Q=8ms, RR), Q2 (FCFS).",
            "flowchart": ["Job Enters Q0 (Quantum = 4ms)", "Consumes Full 4ms Burst", "Demoted to Queue 1 (Quantum = 8ms)"],
            "steps": [
                {"step": 1, "action": "Monitor burst consumption", "result": "Process used entire time slice without yielding."},
                {"step": 2, "action": "Classify behavior", "result": "Process is identified as CPU-bound rather than interactive I/O."},
                {"step": 3, "action": "Apply demotion rule", "result": "Process is moved down to Queue 1 with larger quantum."}
            ],
            "answer": "Demoted to Queue 1.",
            "quickExplanation": "MLFQ favors short interactive jobs at top queues and demotes long CPU hogs to lower queues."
        },
        {
            "id": "mlfq-ex2",
            "title": "Example 2: Priority Boost to Prevent Starvation",
            "problem": "How does MLFQ prevent CPU hogs in the bottom queue from starving?",
            "given": "High-priority interactive jobs continuously occupy Queue 0 and Queue 1.",
            "flowchart": ["Processes stuck in Queue 2", "Periodic Timer (e.g. every 1 sec)", "Priority Boost: Move ALL to Queue 0"],
            "steps": [
                {"step": 1, "action": "Identify starvation risk", "result": "Queue 2 processes receive zero CPU time."},
                {"step": 2, "action": "Trigger Priority Boost", "result": "After time period S, all processes in system are moved to top Queue 0."}
            ],
            "answer": "Priority Boost resets all processes to top priority periodically.",
            "quickExplanation": "Priority Boost guarantees that every process gets CPU time and can re-prove its interactive nature."
        }
    ],

    # 15. Process Synchronization and Critical Section
    "sync-critical-section": [
        {
            "id": "sync-ex1",
            "title": "Example 1: Race Condition on Shared Counter",
            "problem": "Counter = 5. Thread A executes count++; Thread B executes count-- concurrently. What are possible values?",
            "given": "Two concurrent threads without synchronization.",
            "flowchart": ["Read count (5)", "Thread A calculates 6", "Thread B calculates 4", "Write-back race", "Possible: 4, 5, or 6!"],
            "steps": [
                {"step": 1, "action": "Both read 5", "result": "RegA=5, RegB=5."},
                {"step": 2, "action": "Modify in registers", "result": "RegA=6, RegB=4."},
                {"step": 3, "action": "Interleaved writebacks", "result": "If A writes last -> 6. If B writes last -> 4. If synchronized -> 5."}
            ],
            "answer": "Possible final values of count: 4, 5, or 6.",
            "quickExplanation": "Without mutual exclusion, register store instructions can overwrite each other non-deterministically."
        },
        {
            "id": "sync-ex2",
            "title": "Example 2: Why Strict Alternation Fails Progress",
            "problem": "In strict alternation (turn = 0 or 1), P0 exits and sets turn=1. P1 does not want to enter CS. What happens to P0?",
            "given": "turn = 1; P0 wants to enter CS; P1 is in an infinite loop in remainder section.",
            "flowchart": ["P0 wants to enter CS", "Checks while(turn != 0)", "turn is 1 (P1 not interested)", "P0 blocked indefinitely!"],
            "steps": [
                {"step": 1, "action": "P0 checks turn", "result": "while(turn != 0) loops forever because turn is 1."},
                {"step": 2, "action": "Evaluate CS condition", "result": "CS is empty, yet P0 cannot enter because of P1 -> Progress VIOLATED!"}
            ],
            "answer": "P0 is blocked; Progress condition is violated.",
            "quickExplanation": "A process outside the critical section must not block another process from entering an empty CS."
        }
    ],

    # 16. Mutex and Semaphores
    "mutex-semaphores": [
        {
            "id": "mutex-ex1",
            "title": "Example 1: Counting Semaphore Queue Depth",
            "problem": "Semaphore S initialized to 4. System executes 10 wait(S) and 3 signal(S). What is S and queue count?",
            "given": "Initial S = 4, 10 wait(), 3 signal().",
            "flowchart": ["Initial S = 4", "Subtract 10 waits -> S = -6", "Add 3 signals -> S = -3", "Queue length = |-3| = 3"],
            "steps": [
                {"step": 1, "action": "Apply formula", "result": "S_final = 4 - 10 + 3 = -3."},
                {"step": 2, "action": "Interpret negative value", "result": "When S < 0, exactly |S| processes are sleeping in the wait queue."}
            ],
            "answer": "Semaphore Value = -3; 3 processes are sleeping in the queue.",
            "quickExplanation": "Negative semaphore value directly indicates the number of blocked processes awaiting resources."
        },
        {
            "id": "mutex-ex2",
            "title": "Example 2: Mutex Ownership Rule",
            "problem": "Thread 1 locks Mutex M. Can Thread 2 unlock M? Can Thread 2 signal Semaphore S locked by Thread 1?",
            "given": "Mutex M held by Thread 1; Semaphore S held by Thread 1.",
            "flowchart": ["Mutex M: Owned by Thread 1 -> Thread 2 unlock ERROR", "Semaphore S: No Ownership -> Thread 2 signal ALLOWED"],
            "steps": [
                {"step": 1, "action": "Check Mutex ownership", "result": "Mutex enforces strict thread ownership. Thread 2 unlock throws error."},
                {"step": 2, "action": "Check Semaphore ownership", "result": "Semaphores have no ownership concept; any thread can signal."}
            ],
            "answer": "Mutex: NO (error); Semaphore: YES (valid signaling).",
            "quickExplanation": "Mutexes are locks with ownership; Semaphores are signaling primitives without ownership."
        }
    ],

    # 17. Classical Synchronization Problems
    "classical-sync-problems": [
        {
            "id": "classic-ex1",
            "title": "Example 1: Producer-Consumer Deadlock Order Bug",
            "problem": "Why does wait(mutex) followed by wait(empty) cause deadlock when the buffer is full?",
            "given": "Buffer size = 3, currently full (empty = 0). Producer attempts to add item.",
            "flowchart": ["Buffer is Full (empty = 0)", "Producer calls wait(mutex) -> Acquires Mutex", "Producer calls wait(empty) -> BLOCKED (Sleeps with Mutex!)", "Consumer calls wait(mutex) -> BLOCKED on Mutex -> DEADLOCK!"],
            "steps": [
                {"step": 1, "action": "Producer acquires mutex", "result": "Mutex = 0."},
                {"step": 2, "action": "Producer checks empty", "result": "empty = 0 => Producer goes to sleep holding mutex!"},
                {"step": 3, "action": "Consumer tries to read", "result": "Consumer blocks on mutex held by sleeping Producer. Deadlock!"}
            ],
            "answer": "Deadlock: Producer sleeps holding mutex; Consumer cannot enter to free a slot.",
            "quickExplanation": "Always acquire counting/resource semaphores before mutual exclusion locks."
        },
        {
            "id": "classic-ex2",
            "title": "Example 2: Dining Philosophers Asymmetric Fix",
            "problem": "5 philosophers, 5 chopsticks. How does an asymmetric rule break circular wait?",
            "given": "Philosophers 0 to 4 sitting around circular table.",
            "flowchart": ["Phil 0-3: Pick Left first, then Right", "Phil 4: Pick Right first, then Left", "Circular Wait Broken!"],
            "steps": [
                {"step": 1, "action": "Identify symmetric flaw", "result": "All pick left -> cycle of 5 waiting for right."},
                {"step": 2, "action": "Asymmetric rule", "result": "Phil 4 competes with Phil 0 for fork 0; at least one philosopher gets both forks!"}
            ],
            "answer": "Circular wait is eliminated; at least one philosopher eats and releases forks.",
            "quickExplanation": "Breaking symmetry prevents all threads from acquiring identical partial resources simultaneously."
        }
    ],

    # 18. Deadlock Fundamentals
    "deadlock-fundamentals": [
        {
            "id": "dl-fund-ex1",
            "title": "Example 1: 4 Coffman Conditions Checklist",
            "problem": "State whether deadlock can occur if any ONE of the Coffman conditions is broken.",
            "given": "4 conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.",
            "flowchart": ["Mutual Exclusion", "Hold & Wait", "No Preemption", "Circular Wait", "ALL 4 MUST HOLD for Deadlock!"],
            "steps": [
                {"step": 1, "action": "Test condition requirement", "result": "Deadlock REQUIRES all 4 conditions to hold simultaneously."},
                {"step": 2, "action": "Break one condition", "result": "If even 1 condition is prevented, deadlock is mathematically impossible."}
            ],
            "answer": "NO. Deadlock cannot occur if any single condition is eliminated.",
            "quickExplanation": "Deadlock prevention algorithms work by statically invalidating at least one of these four conditions."
        },
        {
            "id": "dl-fund-ex2",
            "title": "Example 2: Single vs Multi-Instance Cycle in RAG",
            "problem": "Does a cycle in a Resource Allocation Graph always mean deadlock?",
            "given": "A directed cycle exists in a Resource Allocation Graph.",
            "flowchart": ["Cycle Detected in RAG", "Single-instance resources? -> YES: DEFINITE DEADLOCK", "Multi-instance resources? -> NO: MAYBE (Depends on other instances)"],
            "steps": [
                {"step": 1, "action": "Check resource instances", "result": "Single instance per resource: Cycle == Deadlock."},
                {"step": 2, "action": "Multi-instance case", "result": "Other processes holding that resource type can finish and break the cycle."}
            ],
            "answer": "Single-instance: YES (Definite). Multi-instance: NO (Cycle is necessary, not sufficient).",
            "quickExplanation": "In multi-instance systems, cycles do not guarantee deadlock; safety matrices must be analyzed."
        }
    ],

    # 19. Deadlock Prevention and Avoidance
    "deadlock-prevention-avoidance": [
        {
            "id": "dl-prev-ex1",
            "title": "Example 1: Minimum Resources to Prevent Deadlock",
            "problem": "5 processes each need at most 2 tape drives. Minimum tape drives to prevent deadlock?",
            "given": "n = 5 processes, k = 2 max demand per process.",
            "flowchart": ["Worst Case: Give everyone (k - 1) = 1 drive", "Total Held = 5 * 1 = 5 drives", "Add 1 drive = 6 drives", "Deadlock Impossible!"],
            "steps": [
                {"step": 1, "action": "Formula", "result": "R >= n * (k - 1) + 1."},
                {"step": 2, "action": "Calculate", "result": "R >= 5 * (2 - 1) + 1 = 5 + 1 = 6."}
            ],
            "answer": "Minimum 6 tape drives required.",
            "quickExplanation": "With 6 drives, at least one process gets 2 drives, finishes, and frees its drives for the rest."
        },
        {
            "id": "dl-prev-ex2",
            "title": "Example 2: Total Resource Ordering to Break Circular Wait",
            "problem": "Resources ordered: Tape=1, Disk=2, Printer=3. Can a process holding Printer request Disk?",
            "given": "Global ordering function F(Tape)=1, F(Disk)=2, F(Printer)=3. Rule: F(Next) > F(Current).",
            "flowchart": ["Holds Printer (3)", "Requests Disk (2)", "Check: 2 > 3? FALSE!", "Request REJECTED"],
            "steps": [
                {"step": 1, "action": "Evaluate rule", "result": "Must request in strictly increasing order of rank."},
                {"step": 2, "action": "Compare ranks", "result": "F(Disk)=2 is NOT greater than F(Printer)=3."}
            ],
            "answer": "NO. The process must release Printer before requesting Disk.",
            "quickExplanation": "Strict increasing resource ordering makes circular wait cycles mathematically impossible."
        }
    ],

    # 20. Banker's Algorithm and Safe State
    "bankers-algorithm-safe-state": [
        {
            "id": "banker-ex1",
            "title": "Example 1: Need Matrix Calculation",
            "problem": "Process P1 has Max = [7, 5, 3] and Allocation = [2, 1, 1]. What is Need?",
            "given": "Max = [7, 5, 3], Allocation = [2, 1, 1].",
            "flowchart": ["Max: [7, 5, 3]", "Allocation: [2, 1, 1]", "Need = Max - Allocation", "Need: [5, 4, 2]"],
            "steps": [
                {"step": 1, "action": "Subtract element-wise", "result": "A: 7-2=5, B: 5-1=4, C: 3-1=2."}
            ],
            "answer": "Need = [5, 4, 2].",
            "quickExplanation": "Need matrix represents the remaining maximum resources the process may request before terminating."
        },
        {
            "id": "banker-ex2",
            "title": "Example 2: Safe Sequence Verification",
            "problem": "Available = [3, 2]. P1 needs [2, 1] (Alloc=[1, 1]). P2 needs [4, 3] (Alloc=[2, 0]). Find Safe Sequence.",
            "given": "Available = [3, 2]. P1: Need=[2,1], Alloc=[1,1]. P2: Need=[4,3], Alloc=[2,0].",
            "flowchart": ["Available: [3, 2]", "Check P1 Need [2, 1] <= [3, 2] -> TRUE", "P1 finishes -> Avail += [1, 1] -> [4, 3]", "Check P2 Need [4, 3] <= [4, 3] -> TRUE", "P2 finishes -> SAFE!"],
            "steps": [
                {"step": 1, "action": "Check P1", "result": "Need [2, 1] <= Avail [3, 2] -> P1 runs and finishes."},
                {"step": 2, "action": "Update Available", "result": "Avail = [3, 2] + [1, 1] = [4, 3]."},
                {"step": 3, "action": "Check P2", "result": "Need [4, 3] <= Avail [4, 3] -> P2 runs and finishes."}
            ],
            "answer": "Safe Sequence: <P1, P2> (System is in SAFE STATE).",
            "quickExplanation": "A safe state guarantees that all processes can finish in at least one sequence without deadlock."
        }
    ],

    # 21. Deadlock Detection and Recovery
    "deadlock-detection-recovery": [
        {
            "id": "dl-det-ex1",
            "title": "Example 1: Wait-For Graph Cycle Trace",
            "problem": "P1 waits for P2; P2 waits for P3; P3 waits for P1. All single-instance. Is system deadlocked?",
            "given": "Directed edges: P1 -> P2 -> P3 -> P1.",
            "flowchart": ["P1", "-> P2", "-> P3", "-> P1 (Cycle!)", "Deadlock Exists!"],
            "steps": [
                {"step": 1, "action": "Construct graph", "result": "Process nodes P1, P2, P3 form a closed directed loop."},
                {"step": 2, "action": "Apply single-instance rule", "result": "A cycle in a Wait-For Graph with single instances is a DEFINITE deadlock."}
            ],
            "answer": "YES, Deadlock exists among {P1, P2, P3}.",
            "quickExplanation": "Single-instance resource systems can use Depth-First Search on Wait-For Graphs to detect deadlocks."
        },
        {
            "id": "dl-det-ex2",
            "title": "Example 2: Victim Selection Metric",
            "problem": "P1 (computed 5 hours) and P2 (computed 3 seconds) are deadlocked. Which should be aborted?",
            "given": "P1: 5 hours CPU time; P2: 3 seconds CPU time. Aborting either breaks deadlock.",
            "flowchart": ["Deadlock Detected", "Compare Costs: P1 (5 hrs) vs P2 (3 sec)", "Pick Minimum Cost Victim -> Abort P2"],
            "steps": [
                {"step": 1, "action": "Evaluate wasted work", "result": "Aborting P1 wastes 5 hours; aborting P2 wastes 3 seconds."},
                {"step": 2, "action": "Select victim", "result": "Terminate P2 to minimize system recomputation cost."}
            ],
            "answer": "Abort P2 (lowest computation cost victim).",
            "quickExplanation": "Victim selection balances consumed CPU time, held resources, and priority to minimize rollback cost."
        }
    ],

    # 22. Main Memory and Memory Allocation
    "main-memory-allocation": [
        {
            "id": "mem-ex1",
            "title": "Example 1: Dynamic Relocation via Base and Limit Registers",
            "problem": "Base register = 3000, Limit register = 1200. Is logical address 850 valid? What is physical address?",
            "given": "Base = 3000, Limit = 1200. Logical address = 850.",
            "flowchart": ["CPU Logical Address: 850", "Check: 850 < Limit (1200)? -> YES", "Physical Address = Base (3000) + 850", "Physical Address = 3850"],
            "steps": [
                {"step": 1, "action": "Validate address", "result": "850 < 1200 -> VALID (within process bounds)."},
                {"step": 2, "action": "Translate address", "result": "Physical = 3000 + 850 = 3850."}
            ],
            "answer": "Valid. Physical Address = 3850.",
            "quickExplanation": "Hardware base/limit registers provide both memory relocation and memory protection between processes."
        },
        {
            "id": "mem-ex2",
            "title": "Example 2: Limit Violation Hardware Trap",
            "problem": "Base = 3000, Limit = 1200. Logical address = 1500. What happens?",
            "given": "Base = 3000, Limit = 1200. Logical address = 1500.",
            "flowchart": ["Logical Address: 1500", "Check: 1500 < Limit (1200)? -> FALSE!", "Hardware Trap -> SIGSEGV"],
            "steps": [
                {"step": 1, "action": "Check boundary", "result": "1500 >= 1200 -> Exceeds process memory limits!"},
                {"step": 2, "action": "Trigger protection", "result": "MMU hardware fires an illegal address trap to OS kernel."}
            ],
            "answer": "Illegal address trap (Segmentation Fault); process terminated.",
            "quickExplanation": "The CPU prevents processes from accessing or corrupting memory outside their allocated partition."
        }
    ],

    # 23. Fragmentation and Allocation Strategies
    "fragmentation-allocation-strategies": [
        {
            "id": "frag-ex1",
            "title": "Example 1: First Fit vs Best Fit Placement",
            "problem": "Free holes in order: 200KB, 500KB, 100KB, 300KB. Where does process of 180KB go in: 1) First Fit, 2) Best Fit?",
            "given": "Holes: [200, 500, 100, 300]. Process request = 180KB.",
            "flowchart": ["Request: 180KB", "First Fit: Scans from start -> Picks 200KB hole (first >= 180)", "Best Fit: Scans all -> Picks 200KB hole (smallest >= 180)"],
            "steps": [
                {"step": 1, "action": "First Fit", "result": "Hole 1 is 200KB >= 180KB -> Allocates in 200KB hole."},
                {"step": 2, "action": "Best Fit", "result": "Smallest suitable hole is 200KB -> Allocates in 200KB hole."}
            ],
            "answer": "Both First Fit and Best Fit choose the 200KB hole.",
            "quickExplanation": "First Fit picks the first match; Best Fit picks the smallest hole that satisfies the request."
        },
        {
            "id": "frag-ex2",
            "title": "Example 2: Internal vs External Fragmentation",
            "problem": "P1 of size 28KB is placed in a fixed partition of 32KB. Calculate internal and external fragmentation.",
            "given": "Fixed partition = 32KB, Process size = 28KB.",
            "flowchart": ["Partition: 32KB", "Allocated: 28KB", "Unused inside partition = 32 - 28 = 4KB", "Internal Frag = 4KB"],
            "steps": [
                {"step": 1, "action": "Internal calculation", "result": "32KB - 28KB = 4KB wasted inside partition."},
                {"step": 2, "action": "External calculation", "result": "0KB (external fragmentation applies to variable partitioning)."}
            ],
            "answer": "Internal Fragmentation = 4KB; External Fragmentation = 0.",
            "quickExplanation": "Internal fragmentation is memory wasted inside an allocated partition."
        }
    ],

    # 24. Paging and Page Tables
    "paging-page-tables": [
        {
            "id": "paging-ex1",
            "title": "Example 1: Calculating Page and Offset Bits",
            "problem": "32-bit logical address space with 4KB page size. How many bits for: 1) Offset, 2) Page Number?",
            "given": "Address width = 32 bits, Page size = 4KB = 2^12 bytes.",
            "flowchart": ["Page Size: 4KB = 2^12 bytes", "Offset (d) = 12 bits", "Page Number (p) = 32 - 12 = 20 bits"],
            "steps": [
                {"step": 1, "action": "Offset bits", "result": "log2(4KB) = log2(4096) = 12 bits."},
                {"step": 2, "action": "Page number bits", "result": "32 - 12 = 20 bits."}
            ],
            "answer": "Offset = 12 bits; Page Number = 20 bits (2^20 = 1,048,576 pages).",
            "quickExplanation": "Page size determines offset bits; remaining address bits designate the page number."
        },
        {
            "id": "paging-ex2",
            "title": "Example 2: Address Translation with Page Table",
            "problem": "Page size is 1KB (10 bits). Logical address is <Page 3, Offset 250>. Page 3 maps to Frame 8. What is physical address?",
            "given": "Page size = 1KB = 1024 bytes. Page 3 -> Frame 8. Offset = 250.",
            "flowchart": ["Logical: <Page 3, Offset 250>", "Page Table: Page 3 -> Frame 8", "Physical = (Frame * PageSize) + Offset", "Physical = (8 * 1024) + 250 = 8442"],
            "steps": [
                {"step": 1, "action": "Frame base", "result": "8 * 1024 = 8192."},
                {"step": 2, "action": "Add offset", "result": "8192 + 250 = 8442."}
            ],
            "answer": "Physical Address = 8442.",
            "quickExplanation": "The offset is appended directly to the physical frame base address."
        }
    ],

    # 25. Segmentation
    "segmentation": [
        {
            "id": "seg-ex1",
            "title": "Example 1: Segmentation Address Translation",
            "problem": "Segment Table: Seg 2 has Base = 4000, Limit = 500. Translate logical address <Seg 2, Offset 350>.",
            "given": "Segment = 2, Offset = 350, Base = 4000, Limit = 500.",
            "flowchart": ["Logical: <Seg 2, Offset 350>", "Check: Offset (350) < Limit (500)? -> YES", "Physical = Base (4000) + Offset (350)", "Physical = 4350"],
            "steps": [
                {"step": 1, "action": "Check limit", "result": "350 < 500 -> VALID."},
                {"step": 2, "action": "Calculate physical address", "result": "4000 + 350 = 4350."}
            ],
            "answer": "Physical Address = 4350.",
            "quickExplanation": "In segmentation, physical address is Base + Offset (provided Offset < Limit)."
        },
        {
            "id": "seg-ex2",
            "title": "Example 2: Segmentation Fault Detection",
            "problem": "Segment Table: Seg 1 has Base = 2000, Limit = 300. Translate <Seg 1, Offset 350>.",
            "given": "Segment = 1, Offset = 350, Base = 2000, Limit = 300.",
            "flowchart": ["Logical: <Seg 1, Offset 350>", "Check: Offset (350) < Limit (300)? -> FALSE!", "Hardware Trap -> SIGSEGV"],
            "steps": [
                {"step": 1, "action": "Compare offset with limit", "result": "350 >= 300 -> Offset exceeds segment limit!"},
                {"step": 2, "action": "MMU action", "result": "Raises limit violation trap (Segmentation Fault)."}
            ],
            "answer": "Illegal access trap (Segmentation Fault); address invalid.",
            "quickExplanation": "Accessing beyond the limit register triggers an immediate hardware protection trap."
        }
    ],

    # 26. Virtual Memory and Demand Paging
    "virtual-memory-demand-paging": [
        {
            "id": "vm-ex1",
            "title": "Example 1: Page Fault Trap Sequence",
            "problem": "CPU attempts to access Page 4. Valid bit in page table is 0. Trace the OS reaction.",
            "given": "PTE for Page 4 has Valid/Invalid bit = 0.",
            "flowchart": ["CPU Accesses Page 4", "Valid Bit == 0 -> Page Fault Trap", "OS finds free frame in RAM", "Disk reads Page 4 into Frame", "PTE updated (Valid=1)", "Restart Instruction"],
            "steps": [
                {"step": 1, "action": "Hardware trap", "result": "MMU generates Page Fault Exception to OS kernel."},
                {"step": 2, "action": "Disk read", "result": "OS schedules disk I/O to fetch page from swap file."},
                {"step": 3, "action": "Table update & restart", "result": "Sets valid=1 and re-executes instruction seamlessly."}
            ],
            "answer": "Page Fault Exception -> Swap I/O -> Update PTE -> Restart instruction.",
            "quickExplanation": "Demand paging brings pages into physical RAM only when referenced by the CPU."
        },
        {
            "id": "vm-ex2",
            "title": "Example 2: Effective Access Time with Page Faults",
            "problem": "Memory access = 100ns. Page fault time = 10ms (10,000,000ns). Fault rate p = 0.001. Find EAT.",
            "given": "ma = 100ns, fault_time = 10,000,000ns, p = 0.001 (0.1%).",
            "flowchart": ["EAT = (1 - p)*ma + p*fault_time", "EAT = 0.999 * 100 + 0.001 * 10,000,000", "EAT = 99.9 + 10,000 = 10,099.9ns"],
            "steps": [
                {"step": 1, "action": "Normal access contribution", "result": "(1 - 0.001) * 100 = 99.9ns."},
                {"step": 2, "action": "Page fault contribution", "result": "0.001 * 10,000,000 = 10,000ns."},
                {"step": 3, "action": "Total EAT", "result": "99.9 + 10,000 = 10,099.9ns (~10 microseconds)."}
            ],
            "answer": "EAT = 10,099.9ns (100x slowdown!).",
            "quickExplanation": "Even a 0.1% page fault rate degrades memory access speed by a factor of 100."
        }
    ],

    # 27. Page Replacement Algorithms
    "page-replacement-algorithms": [
        {
            "id": "pr-ex1",
            "title": "Example 1: FIFO vs LRU on Reference String",
            "problem": "Reference string: 1, 2, 3, 1, 4 with 3 frames. Compare page faults for FIFO vs LRU.",
            "given": "3 frames, initially empty. References: 1, 2, 3, 1, 4.",
            "flowchart": ["Ref 1, 2, 3: Frames [1, 2, 3] (3 faults)", "Ref 1: HIT in both algorithms", "Ref 4:", "FIFO evicts oldest (1) -> [4, 2, 3] (4 faults)", "LRU evicts least recently used (2) -> [1, 4, 3] (4 faults)"],
            "steps": [
                {"step": 1, "action": "Load 1, 2, 3", "result": "Both have [1, 2, 3] (3 cold faults)."},
                {"step": 2, "action": "Access 1", "result": "Page Hit in both! LRU marks 1 as most recent."},
                {"step": 3, "action": "Access 4", "result": "FIFO evicts 1 (oldest arrival). LRU evicts 2 (least recently used)."}
            ],
            "answer": "Both encounter 4 page faults, but evict different victim pages (FIFO evicts 1; LRU evicts 2).",
            "quickExplanation": "LRU rewards recently accessed pages; FIFO strictly follows arrival order."
        },
        {
            "id": "pr-ex2",
            "title": "Example 2: Optimal Page Replacement Benchmark",
            "problem": "Reference: 1, 2, 3, 4, 1, 2 with 3 frames. Which page does Optimal evict when 4 arrives?",
            "given": "Frames currently hold [1, 2, 3]. Incoming page is 4. Future references: 1, 2.",
            "flowchart": ["Frames: [1, 2, 3]", "Incoming: 4", "Future: 1 (at t+1), 2 (at t+2), 3 (NEVER)", "Optimal evicts Page 3"],
            "steps": [
                {"step": 1, "action": "Look ahead in string", "result": "Page 1 is used next; Page 2 is used after that; Page 3 is never used again."},
                {"step": 2, "action": "Select victim", "result": "Evict Page 3 (farthest in future)."}
            ],
            "answer": "Page 3 is evicted.",
            "quickExplanation": "Optimal replaces the page that will not be used for the longest period of time in the future."
        }
    ],

    # 28. TLB and Effective Access Time
    "tlb-effective-access-time": [
        {
            "id": "tlb-ex1",
            "title": "Example 1: Single-Level Paging EAT Calculation",
            "problem": "TLB search time = 10ns, Memory access = 100ns, TLB Hit ratio = 95%. Calculate EAT.",
            "given": "tlb = 10ns, ma = 100ns, h = 0.95.",
            "flowchart": ["Hit (95%): TLB (10) + RAM (100) = 110ns", "Miss (5%): TLB (10) + PageTable (100) + RAM (100) = 210ns", "EAT = 0.95*110 + 0.05*210 = 104.5 + 10.5 = 115ns"],
            "steps": [
                {"step": 1, "action": "Hit time", "result": "10 + 100 = 110ns."},
                {"step": 2, "action": "Miss time", "result": "10 + 100 + 100 = 210ns."},
                {"step": 3, "action": "Calculate EAT", "result": "0.95 * 110 + 0.05 * 210 = 104.5 + 10.5 = 115ns."}
            ],
            "answer": "EAT = 115ns.",
            "quickExplanation": "With a 95% hit ratio, average access takes only 115ns instead of 200ns without a TLB."
        },
        {
            "id": "tlb-ex2",
            "title": "Example 2: 2-Level Paging EAT on TLB Miss",
            "problem": "In 2-level paging, how many memory accesses occur on: 1) TLB Hit, 2) TLB Miss?",
            "given": "2-level paging system with TLB.",
            "flowchart": ["TLB Hit: 1 Memory Access (Direct to Data)", "TLB Miss: 3 Memory Accesses (Outer Table + Inner Table + Data)"],
            "steps": [
                {"step": 1, "action": "TLB Hit", "result": "TLB provides frame directly -> 1 RAM access (Data)."},
                {"step": 2, "action": "TLB Miss", "result": "Level 1 table + Level 2 table + Data = 3 RAM accesses."}
            ],
            "answer": "Hit = 1 RAM access; Miss = 3 RAM accesses.",
            "quickExplanation": "On a TLB miss in k-level paging, the CPU must make k + 1 memory accesses."
        }
    ],

    # 29. File Systems and File Allocation
    "file-systems-allocation": [
        {
            "id": "fs-ex1",
            "title": "Example 1: Contiguous vs Linked vs Indexed Allocation",
            "problem": "Compare Contiguous, Linked, and Indexed allocation for Random Access performance.",
            "given": "Need to read block 50 of a 100-block file.",
            "flowchart": ["Contiguous: Direct access (Start + 50) -> O(1)", "Linked: Must traverse 50 pointers -> O(N)", "Indexed: Index block maps block 50 directly -> O(1)"],
            "steps": [
                {"step": 1, "action": "Contiguous", "result": "Direct math: Start + 50. Super fast O(1), but suffers external fragmentation."},
                {"step": 2, "action": "Linked", "result": "Must read blocks 1 through 49 sequentially. Terrible random access O(N)."},
                {"step": 3, "action": "Indexed", "result": "Read index block, lookup block 50 pointer directly O(1)."}
            ],
            "answer": "Contiguous and Indexed support O(1) random access; Linked is slow O(N).",
            "quickExplanation": "Indexed allocation (used in Unix Inodes) provides fast random access without external fragmentation."
        },
        {
            "id": "fs-ex2",
            "title": "Example 2: Unix Inode Maximum File Size",
            "problem": "An Inode has 12 direct blocks, 1 single indirect, 1 double indirect. Block size = 4KB. Block pointer = 4B. Max file size?",
            "given": "Block = 4KB, Pointer = 4B => Pointers per block = 4096 / 4 = 1024.",
            "flowchart": ["Direct: 12 blocks * 4KB = 48KB", "Single Indirect: 1024 blocks * 4KB = 4MB", "Double Indirect: 1024^2 blocks * 4KB = 4GB", "Total = ~4GB"],
            "steps": [
                {"step": 1, "action": "Calculate pointer capacity", "result": "4096 bytes / 4 bytes = 1024 pointers per block."},
                {"step": 2, "action": "Direct blocks", "result": "12 * 4KB = 48KB."},
                {"step": 3, "action": "Single indirect", "result": "1024 * 4KB = 4MB."},
                {"step": 4, "action": "Double indirect", "result": "1024 * 1024 * 4KB = 4GB."}
            ],
            "answer": "Maximum File Size ~= 4.004 GB.",
            "quickExplanation": "Unix Inodes combine direct pointers for small files with multi-level indirect pointers for huge files."
        }
    ],

    # 30. Disk Structure and Disk Scheduling
    "disk-structure-scheduling": [
        {
            "id": "disk-ex1",
            "title": "Example 1: FCFS vs SSTF Seek Distance",
            "problem": "Queue: 50, 100, 10. Head at 40. Calculate total head movement for: 1) FCFS, 2) SSTF.",
            "given": "Initial head = 40. Requests = 50, 100, 10.",
            "flowchart": ["FCFS: 40 -> 50 (10) -> 100 (50) -> 10 (90) = 150 cylinders", "SSTF: 40 -> 50 (10) -> 10 (40) -> 100 (90) = 140 cylinders"],
            "steps": [
                {"step": 1, "action": "FCFS Path", "result": "|50-40| + |100-50| + |10-100| = 10 + 50 + 90 = 150."},
                {"step": 2, "action": "SSTF Path", "result": "From 40, closest is 50 (|10|). From 50, closest is 10 (|40| vs |50|). Then 100 (|90|). Total = 10 + 40 + 90 = 140."}
            ],
            "answer": "FCFS = 150 cylinders; SSTF = 140 cylinders.",
            "quickExplanation": "SSTF greedily services the closest cylinder to minimize seek distance."
        },
        {
            "id": "disk-ex2",
            "title": "Example 2: SCAN vs LOOK Boundary Movement",
            "problem": "Queue: 10, 80, 150. Disk range 0-199. Head at 50 moving upward. Does LOOK touch cylinder 199?",
            "given": "Head at 50, moving upward. Max request is 150. Disk boundary is 199.",
            "flowchart": ["SCAN: 50 -> 80 -> 150 -> 199 (GOES TO END) -> 10", "LOOK: 50 -> 80 -> 150 (REVERSES AT 150) -> 10"],
            "steps": [
                {"step": 1, "action": "SCAN rule", "result": "SCAN travels all the way to physical boundary 199 before reversing."},
                {"step": 2, "action": "LOOK rule", "result": "LOOK reverses immediately at the highest requested cylinder (150)."}
            ],
            "answer": "NO. LOOK reverses at cylinder 150; only SCAN travels to 199.",
            "quickExplanation": "LOOK saves seek time by not traveling to the physical disk edge unless requested."
        }
    ]
}

js_content = f"""/**
 * MASTER OPERATING SYSTEMS (OS) SECTION 3: PROBLEM EXAMPLES
 * 
 * Provides 2-3 short, easy, structured worked examples for ALL 30 canonical OS syllabus topics.
 * Format per example:
 * Problem -> Given -> Flowchart Nodes -> Steps -> Answer -> Quick Explanation
 */

export const OS_PROBLEM_EXAMPLES_DATA = {json.dumps(EXAMPLES_DATA, indent=2)};

/**
 * Accessor returning problem examples for any topic ID or alias
 */
export function getOSTopicExamples(topicId) {{
  if (!topicId) return OS_PROBLEM_EXAMPLES_DATA['intro-to-os'];
  const clean = String(topicId).toLowerCase().trim().replace(/_/g, '-');
  
  if (OS_PROBLEM_EXAMPLES_DATA[clean]) {{
    return OS_PROBLEM_EXAMPLES_DATA[clean];
  }}

  // Alias lookup fallback
  const aliasMap = {{
    'processes': 'processes-process-states',
    'threads': 'threads-multithreading',
    'cpu-scheduling': 'cpu-scheduling-fundamentals',
    'fcfs': 'fcfs-scheduling',
    'sjf-srtf': 'sjf-srtf-scheduling',
    'priority-scheduling': 'priority-scheduling-algo',
    'round-robin': 'round-robin-scheduling',
    'deadlocks': 'deadlock-fundamentals',
    'bankers-algorithm': 'bankers-algorithm-safe-state',
    'memory-management': 'main-memory-allocation',
    'paging': 'paging-page-tables',
    'file-systems': 'file-systems-allocation',
    'disk-scheduling': 'disk-structure-scheduling'
  }};

  const mapped = aliasMap[clean];
  if (mapped && OS_PROBLEM_EXAMPLES_DATA[mapped]) {{
    return OS_PROBLEM_EXAMPLES_DATA[mapped];
  }}

  return OS_PROBLEM_EXAMPLES_DATA['intro-to-os'];
}}
"""

with open(target_path, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully wrote {target_path} covering {len(EXAMPLES_DATA)} canonical topics!")
