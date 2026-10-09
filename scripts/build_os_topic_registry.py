import json
import os

target_path = os.path.join(os.path.dirname(__file__), '..', 'client', 'src', 'data', 'os', 'osTopicDataRegistry.js')

topics = [
    # DOMAIN 1 — OS FUNDAMENTALS
    {
        "id": "intro-to-os",
        "slug": "intro-to-os",
        "order": 1,
        "domainId": "fundamentals",
        "domainName": "Domain 1 — OS Fundamentals",
        "title": "Introduction to Operating Systems",
        "shortTitle": "Intro to OS",
        "level": "Fundamental",
        "icon": "Cpu",
        "accentColor": "#6574C4",
        "badge": "Core Foundation",
        "summary": "Operating system as resource allocator, extended machine, bootstrap process, and kernel types.",
        "explanation": "An Operating System is system software that manages computer hardware, software resources, and provides common services for computer programs. It acts as an intermediary between users and hardware.",
        "keyPoints": [
            "Acts as extended machine (abstraction) and resource allocator (CPU, RAM, I/O).",
            "Kernel is the core program resident in memory at all times after bootstrap.",
            "Monolithic vs Microkernel: Monolithic runs all services in kernel space; Microkernel moves non-essential services to user space.",
            "Bootstrap loader located in ROM/BIOS loads kernel into RAM during power-on."
        ],
        "aliases": ["introduction-to-os", "os-introduction"]
    },
    {
        "id": "os-services-system-calls",
        "slug": "os-services-system-calls",
        "order": 2,
        "domainId": "fundamentals",
        "domainName": "Domain 1 — OS Fundamentals",
        "title": "OS Services and System Calls",
        "shortTitle": "Services & System Calls",
        "level": "Fundamental",
        "icon": "Terminal",
        "accentColor": "#3B82F6",
        "badge": "User-Kernel API",
        "summary": "System call interface, software interrupts, parameter passing, and POSIX vs Win32 standards.",
        "explanation": "System calls provide the programmatic interface between a running program and the operating system kernel, enabling user programs to request privileged hardware operations.",
        "keyPoints": [
            "System calls transition execution from User Mode (Ring 3) to Kernel Mode (Ring 0).",
            "Parameter passing mechanisms: Registers, Memory Block/Table (pointer passed in register), and System Stack.",
            "Key system call categories: Process Control (fork, exec), File Manipulation (open, read), Device Management (ioctl), and Information Maintenance.",
            "Standard C Library wrappers (e.g. read(), printf()) encapsulate raw system call instructions."
        ],
        "aliases": ["system-calls", "os-services"]
    },
    {
        "id": "os-structures-architectures",
        "slug": "os-structures-architectures",
        "order": 3,
        "domainId": "fundamentals",
        "domainName": "Domain 1 — OS Fundamentals",
        "title": "OS Structures and Architectures",
        "shortTitle": "OS Architectures",
        "level": "Architecture",
        "icon": "Layers",
        "accentColor": "#10B981",
        "badge": "System Design",
        "summary": "Monolithic, Layered, Microkernel, Hybrid, and Modular operating system designs.",
        "explanation": "OS architecture dictates how kernel components, device drivers, and system services interact with hardware and user space applications.",
        "keyPoints": [
            "Monolithic (Linux): Fast function calls within kernel space, but a driver bug can crash entire OS.",
            "Microkernel (Mach, QNX): High reliability and modularity; IPC message passing overhead impacts throughput.",
            "Layered (THE OS): Strict N-tier hierarchy where layer N only invokes layer N-1.",
            "Modular (Solaris/Linux LKM): Dynamic loadable kernel modules combine monolithic speed with microkernel flexibility."
        ],
        "aliases": ["os-architectures", "os-structures"]
    },
    {
        "id": "interrupts-traps-dual-mode",
        "slug": "interrupts-traps-dual-mode",
        "order": 4,
        "domainId": "fundamentals",
        "domainName": "Domain 1 — OS Fundamentals",
        "title": "Interrupts, Traps and Dual Mode",
        "shortTitle": "Interrupts & Dual Mode",
        "level": "Hardware-OS Bridge",
        "icon": "Zap",
        "accentColor": "#F59E0B",
        "badge": "Hardware Protection",
        "summary": "Hardware interrupts, software traps, Interrupt Vector Table (IVT), Mode Bit, and timer interrupts.",
        "explanation": "Dual-mode hardware operation (User Mode vs Kernel Mode) supported by hardware mode bit and interrupt mechanisms guarantees operating system self-protection.",
        "keyPoints": [
            "Hardware Interrupt: Asynchronous signal from I/O devices or timer to CPU.",
            "Trap (Software Interrupt): Synchronous event triggered by software (system call, division by zero, page fault).",
            "Interrupt Vector Table (IVT) contains addresses of Interrupt Service Routines (ISRs).",
            "Hardware timer periodically interrupts CPU to prevent user processes from monopolizing system."
        ],
        "aliases": ["dual-mode", "interrupts-traps"]
    },

    # DOMAIN 2 — PROCESSES & THREADS
    {
        "id": "processes-process-states",
        "slug": "processes-process-states",
        "order": 5,
        "domainId": "processes",
        "domainName": "Domain 2 — Processes & Threads",
        "title": "Processes and Process States",
        "shortTitle": "Process States",
        "level": "Fundamental",
        "icon": "Workflow",
        "accentColor": "#3B82F6",
        "badge": "Core Placement",
        "summary": "Process concept, 5-state and 7-state lifecycle models, state transitions, and process hierarchy.",
        "explanation": "A process is a program in execution. The OS manages process lifecycle across New, Ready, Running, Waiting, and Terminated states.",
        "keyPoints": [
            "5-State Model: New -> Ready -> Running -> Waiting/Blocked -> Terminated.",
            "7-State Model adds Ready-Suspended and Blocked-Suspended when RAM is thrashing.",
            "CPU Dispatcher transitions process from Ready to Running.",
            "Process memory image layout: Text/Code (static), Data/BSS (globals), Heap (dynamic allocations), Stack (local variables/frames)."
        ],
        "aliases": ["processes", "process-states"]
    },
    {
        "id": "pcb-context-switching",
        "slug": "pcb-context-switching",
        "order": 6,
        "domainId": "processes",
        "domainName": "Domain 2 — Processes & Threads",
        "title": "PCB and Context Switching",
        "shortTitle": "PCB & Context Switch",
        "level": "Core Placement",
        "icon": "Activity",
        "accentColor": "#8B5CF6",
        "badge": "Kernel Internals",
        "summary": "Process Control Block (PCB) structure, context switch latency, hardware state preservation, and cache invalidation.",
        "explanation": "Context switching is the mechanism of saving the state of the active process in its PCB and restoring the state of another process, enabling multi-tasking.",
        "keyPoints": [
            "PCB contains PID, Program Counter (PC), CPU registers, memory management limits, priority, and open file tables.",
            "Context Switch is pure overhead: CPU performs no useful user work during state preservation.",
            "Direct costs: Saving/restoring register state, updating kernel structures.",
            "Indirect costs: Cold CPU cache, Translation Lookaside Buffer (TLB) flushing, and pipeline stalls."
        ],
        "aliases": ["pcb", "context-switching"]
    },
    {
        "id": "threads-multithreading",
        "slug": "threads-multithreading",
        "order": 7,
        "domainId": "processes",
        "domainName": "Domain 2 — Processes & Threads",
        "title": "Threads and Multithreading",
        "shortTitle": "Threads & Models",
        "level": "Intermediate",
        "icon": "Share2",
        "accentColor": "#EC4899",
        "badge": "Concurrency",
        "summary": "Lightweight processes, User-level vs Kernel-level threads, Many-to-One, One-to-One, and Many-to-Many models.",
        "explanation": "A thread is the basic unit of CPU utilization. Peer threads in the same process share code, data, heap, and OS resources while maintaining their own stack, registers, and PC.",
        "keyPoints": [
            "Thread Private State: Stack pointer, Program Counter, register file, thread-local storage.",
            "Thread Shared State: Code segment, Data segment (globals), Heap, and open file descriptors.",
            "One-to-One model (Linux NPTL, Windows): 1 user thread maps to 1 kernel thread; true multi-core concurrency.",
            "Thread context switch is significantly faster than process switch because memory mapping (page table) is retained."
        ],
        "aliases": ["threads", "multithreading"]
    },
    {
        "id": "ipc",
        "slug": "ipc",
        "order": 8,
        "domainId": "processes",
        "domainName": "Domain 2 — Processes & Threads",
        "title": "Inter-Process Communication (IPC)",
        "shortTitle": "Inter-Process Comm",
        "level": "System Internals",
        "icon": "Radio",
        "accentColor": "#06B6D4",
        "badge": "Distributed & Systems",
        "summary": "Shared Memory vs Message Passing, Pipes, Named Pipes (FIFOs), Message Queues, Sockets, and Signals.",
        "explanation": "IPC mechanisms allow cooperating processes to exchange data and synchronize actions without memory corruption.",
        "keyPoints": [
            "Shared Memory: Fastest IPC; requires synchronization (semaphores) since kernel is bypassed after setup.",
            "Message Passing (send/receive): Kernel-mediated; safer for distributed or isolated processes.",
            "Anonymous Pipes: Unidirectional communication between parent and child processes on same host.",
            "Named Pipes (FIFO) and UNIX Domain Sockets enable IPC between unrelated processes."
        ],
        "aliases": ["inter-process-communication"]
    },

    # DOMAIN 3 — CPU SCHEDULING
    {
        "id": "cpu-scheduling-fundamentals",
        "slug": "cpu-scheduling-fundamentals",
        "order": 9,
        "domainId": "scheduling",
        "domainName": "Domain 3 — CPU Scheduling",
        "title": "CPU Scheduling Fundamentals",
        "shortTitle": "Scheduling Basics",
        "level": "Core Placement",
        "icon": "Cpu",
        "accentColor": "#8B5CF6",
        "badge": "Core Foundation",
        "summary": "CPU-I/O burst cycle, preemptive vs non-preemptive scheduling, dispatch latency, criteria (Throughput, TAT, WT, RT).",
        "explanation": "CPU scheduling selects a process from ready queue when CPU becomes idle, optimizing utilization, throughput, turnaround time, waiting time, and response time.",
        "keyPoints": [
            "Preemptive: Scheduler can interrupt running process (e.g. higher priority arrival, timer quantum).",
            "Non-Preemptive: Process holds CPU until it voluntarily terminates or blocks for I/O.",
            "Turnaround Time (TAT) = Completion Time (CT) - Arrival Time (AT).",
            "Waiting Time (WT) = Turnaround Time (TAT) - Burst Time (BT).",
            "Response Time (RT) = First CPU Allocation Time - Arrival Time (AT)."
        ],
        "aliases": ["cpu-scheduling", "scheduling-basics"]
    },
    {
        "id": "fcfs-scheduling",
        "slug": "fcfs-scheduling",
        "order": 10,
        "domainId": "scheduling",
        "domainName": "Domain 3 — CPU Scheduling",
        "title": "FCFS Scheduling",
        "shortTitle": "FCFS Scheduling",
        "level": "Fundamental",
        "icon": "Clock",
        "accentColor": "#6574C4",
        "badge": "Non-Preemptive Baseline",
        "summary": "First-Come First-Served algorithm, FIFO ready queue, Convoy Effect analysis, and Gantt chart construction.",
        "explanation": "FCFS allocates CPU to processes in the exact order of their arrival. Simple to implement with FIFO queue, but vulnerable to Convoy Effect.",
        "keyPoints": [
            "Non-preemptive algorithm: Order determined by Arrival Time (AT).",
            "Convoy Effect: Short I/O-bound jobs wait behind a massive CPU-bound job, dropping overall device utilization.",
            "In FCFS, Response Time is always identical to Waiting Time (RT == WT).",
            "Average waiting time is typically poor and highly sensitive to arrival sequence."
        ],
        "aliases": ["fcfs"]
    },
    {
        "id": "sjf-srtf-scheduling",
        "slug": "sjf-srtf-scheduling",
        "order": 11,
        "domainId": "scheduling",
        "domainName": "Domain 3 — CPU Scheduling",
        "title": "SJF and SRTF Scheduling",
        "shortTitle": "SJF & SRTF",
        "level": "Core Placement",
        "icon": "Zap",
        "accentColor": "#10B981",
        "badge": "Optimal Waiting Time",
        "summary": "Shortest Job First (non-preemptive) vs Shortest Remaining Time First (preemptive), exponential smoothing for burst prediction, starvation risk.",
        "explanation": "SJF is provably optimal for minimizing average waiting time by scheduling the shortest burst first. SRTF preempts when a newly arrived job has smaller remaining burst.",
        "keyPoints": [
            "SJF Theorem: Provably minimizes average waiting time for a given set of processes arriving together.",
            "SRTF Preemption: If BT(new_job) < Remaining_BT(running_job), CPU is preempted immediately.",
            "Starvation / Indefinite Blocking: Long jobs may starve if short jobs arrive continuously.",
            "Burst Prediction: Practical OS uses exponential smoothing: tau_{n+1} = alpha * t_n + (1 - alpha) * tau_n."
        ],
        "aliases": ["sjf-srtf", "sjf", "srtf", "sjf-nonpreemptive"]
    },
    {
        "id": "priority-scheduling-algo",
        "slug": "priority-scheduling-algo",
        "order": 12,
        "domainId": "scheduling",
        "domainName": "Domain 3 — CPU Scheduling",
        "title": "Priority Scheduling",
        "shortTitle": "Priority Scheduling",
        "level": "Core Placement",
        "icon": "ShieldAlert",
        "accentColor": "#EF4444",
        "badge": "Placement High-Yield",
        "summary": "Preemptive and non-preemptive priority dispatch, priority inversion, and Aging solution.",
        "explanation": "CPU is allocated to the process with highest priority rank. Indefinite blocking of low priority processes is cured using Aging.",
        "keyPoints": [
            "Convention Rule: Problem statement dictates whether lower number represents higher priority (UNIX nice values) or vice versa.",
            "Starvation Solution: Aging progressively increases priority of waiting processes over time.",
            "Priority Inversion: High-priority task blocked on a mutex held by low-priority task while medium task runs.",
            "Priority Inheritance Protocol prevents priority inversion by temporarily elevating lock holder's priority."
        ],
        "aliases": ["priority-scheduling", "priority-nonpreemptive"]
    },
    {
        "id": "round-robin-scheduling",
        "slug": "round-robin-scheduling",
        "order": 13,
        "domainId": "scheduling",
        "domainName": "Domain 3 — CPU Scheduling",
        "title": "Round Robin Scheduling",
        "shortTitle": "Round Robin",
        "level": "Core Placement",
        "icon": "Repeat",
        "accentColor": "#3B82F6",
        "badge": "Time-Sharing Classic",
        "summary": "Circular ready queue, Time Quantum (q) selection, context switch trade-offs, and fair-share response time.",
        "explanation": "Designed for time-sharing systems, Round Robin assigns each process a fixed time slice (quantum q). When quantum expires, process is preempted to queue tail.",
        "keyPoints": [
            "Quantum q too large -> Degenerates into FCFS.",
            "Quantum q too small -> High context switch overhead degrades throughput.",
            "Rule of Thumb: 80% of CPU bursts should be shorter than time quantum q.",
            "Guarantees bounded response time: No process waits longer than (n-1)*q time units."
        ],
        "aliases": ["round-robin"]
    },
    {
        "id": "mlq-mlfq-scheduling",
        "slug": "mlq-mlfq-scheduling",
        "order": 14,
        "domainId": "scheduling",
        "domainName": "Domain 3 — CPU Scheduling",
        "title": "Multilevel Queue and Multilevel Feedback Queue",
        "shortTitle": "MLQ & MLFQ",
        "level": "Advanced",
        "icon": "Layers",
        "accentColor": "#8B5CF6",
        "badge": "Modern OS Scheduler",
        "summary": "Queue partitioning, intra-queue vs inter-queue scheduling, dynamic priority demotion, and starvation prevention.",
        "explanation": "MLQ partitions ready processes into static priority queues. MLFQ allows processes to migrate between queues based on their observed CPU behavior.",
        "keyPoints": [
            "Multilevel Queue (MLQ): Static queues (e.g. Foreground Interactive RR, Background Batch FCFS); starvation possible without time slicing.",
            "MLFQ Rule 1: High queue runs before lower queue.",
            "MLFQ Rule 2: Job enters highest queue upon arrival.",
            "MLFQ Demotion: If job exhausts full quantum without yielding, it is demoted to lower priority queue.",
            "MLFQ Priority Boost: Periodically boost all processes to top queue to prevent starvation."
        ],
        "aliases": ["multilevel-queue", "mlfq"]
    },

    # DOMAIN 4 — SYNCHRONIZATION
    {
        "id": "sync-critical-section",
        "slug": "sync-critical-section",
        "order": 15,
        "domainId": "synchronization",
        "domainName": "Domain 4 — Synchronization",
        "title": "Process Synchronization and Critical Section",
        "shortTitle": "Critical Section",
        "level": "Core Pillar",
        "icon": "Lock",
        "accentColor": "#EF4444",
        "badge": "Core Concurrency",
        "summary": "Race conditions, 3 Critical Section criteria (Mutual Exclusion, Progress, Bounded Waiting), Peterson's Algorithm, and TestAndSet hardware primitives.",
        "explanation": "Critical section is the code segment accessing shared resources that cannot be executed concurrently by multiple processes without causing race conditions.",
        "keyPoints": [
            "Race Condition: Outcome depends on non-deterministic order of thread execution.",
            "3 Mandatory Requirements: 1. Mutual Exclusion, 2. Progress, 3. Bounded Waiting.",
            "Peterson's Algorithm: Software two-process solution utilizing flag array and turn variable.",
            "Hardware Atomic Instructions: Test-And-Set (TAS) and Compare-And-Swap (CAS) execute atomically."
        ],
        "aliases": ["synchronization", "critical-section", "process-synchronization"]
    },
    {
        "id": "mutex-semaphores",
        "slug": "mutex-semaphores",
        "order": 16,
        "domainId": "synchronization",
        "domainName": "Domain 4 — Synchronization",
        "title": "Mutex and Semaphores",
        "shortTitle": "Mutex & Semaphores",
        "level": "Core Pillar",
        "icon": "ShieldAlert",
        "accentColor": "#F59E0B",
        "badge": "Placement Essential",
        "summary": "Binary vs Counting semaphores, spinlocks, sleep/wake semaphores, wait() and signal() atomic semantics.",
        "explanation": "Semaphores and Mutexes are synchronization primitives providing atomic wait (P) and signal (V) operations to manage shared resources without busy waiting.",
        "keyPoints": [
            "Mutex: Binary lock with ownership semantics (only thread that locks can unlock).",
            "Counting Semaphore: Value represents number of available resource instances.",
            "wait(S) / P(S): Decrements S; if S < 0, thread sleeps in waiting queue.",
            "signal(S) / V(S): Increments S; wakes up one waiting thread.",
            "Spinlock vs Sleep Lock: Spinlock polls CPU (busy wait); ideal for very short lock hold times."
        ],
        "aliases": ["semaphores", "mutex"]
    },
    {
        "id": "classical-sync-problems",
        "slug": "classical-sync-problems",
        "order": 17,
        "domainId": "synchronization",
        "domainName": "Domain 4 — Synchronization",
        "title": "Classical Synchronization Problems",
        "shortTitle": "Classical Sync Problems",
        "level": "Core Placement",
        "icon": "Workflow",
        "accentColor": "#10B981",
        "badge": "FAANG Benchmark",
        "summary": "Producer-Consumer bounded buffer, Readers-Writers problem (reader vs writer priority), and Dining Philosophers deadlock prevention.",
        "explanation": "Benchmark synchronization challenges used to evaluate concurrency protocols against deadlock, race conditions, and starvation.",
        "keyPoints": [
            "Producer-Consumer: Semaphores empty=N, full=0, mutex=1. Deadlock if wait(mutex) is called before wait(empty)!",
            "Readers-Writers: Multiple readers can read simultaneously; writer requires exclusive access. Risk of writer starvation.",
            "Dining Philosophers: 5 philosophers, 5 chopsticks. Circular wait causes deadlock if all grab left chopstick simultaneously.",
            "Asymmetric solution: Odd philosophers pick left first; even philosophers pick right first."
        ],
        "aliases": ["classical-sync", "producer-consumer", "dining-philosophers"]
    },

    # DOMAIN 5 — DEADLOCKS
    {
        "id": "deadlock-fundamentals",
        "slug": "deadlock-fundamentals",
        "order": 18,
        "domainId": "deadlocks",
        "domainName": "Domain 5 — Deadlocks",
        "title": "Deadlock Fundamentals",
        "shortTitle": "Deadlock Fundamentals",
        "level": "Core Pillar",
        "icon": "ShieldAlert",
        "accentColor": "#EF4444",
        "badge": "Core Theory",
        "summary": "The 4 Coffman conditions, Resource Allocation Graphs (RAG), single vs multiple instance cycle rules.",
        "explanation": "Deadlock occurs when every process in a set is waiting for an event that only another process in the set can cause.",
        "keyPoints": [
            "4 Coffman Conditions: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.",
            "All 4 conditions must hold simultaneously for deadlock to occur.",
            "Resource Allocation Graph (RAG): Directed edges process->resource (request) and resource->process (assignment).",
            "Cycle Rule: Single instance per resource type -> Cycle implies Deadlock. Multiple instances -> Cycle is necessary but NOT sufficient."
        ],
        "aliases": ["deadlocks", "deadlock-concept"]
    },
    {
        "id": "deadlock-prevention-avoidance",
        "slug": "deadlock-prevention-avoidance",
        "order": 19,
        "domainId": "deadlocks",
        "domainName": "Domain 5 — Deadlocks",
        "title": "Deadlock Prevention and Avoidance",
        "shortTitle": "Prevention & Avoidance",
        "level": "Core Placement",
        "icon": "Lock",
        "accentColor": "#6574C4",
        "badge": "System Strategies",
        "summary": "Invalidating Coffman conditions (Prevention) vs Safe State analysis and dynamic resource limits (Avoidance).",
        "explanation": "Deadlock Prevention eliminates at least one Coffman condition statically. Deadlock Avoidance dynamically analyzes resource requests to ensure system stays in Safe State.",
        "keyPoints": [
            "Prevent Hold & Wait: Require process to request all resources upfront, or release held before new requests.",
            "Prevent No Preemption: Preempt held resources if a new request cannot be allocated immediately.",
            "Prevent Circular Wait: Impose global total ordering on all resource types; processes request in strictly increasing order.",
            "Avoidance Principle: Never grant a request if transition moves system from Safe State to Unsafe State."
        ],
        "aliases": ["deadlock-prevention", "deadlock-avoidance"]
    },
    {
        "id": "bankers-algorithm-safe-state",
        "slug": "bankers-algorithm-safe-state",
        "order": 20,
        "domainId": "deadlocks",
        "domainName": "Domain 5 — Deadlocks",
        "title": "Banker's Algorithm and Safe State",
        "shortTitle": "Banker's Algorithm",
        "level": "Core Placement",
        "icon": "Binary",
        "accentColor": "#10B981",
        "badge": "Placement High-Yield",
        "summary": "Allocation, Max, Need, and Available matrices, Dijkstra's Safety Algorithm, Safe Sequence derivation, and resource request algorithm.",
        "explanation": "Dijkstra's Banker's Algorithm simulates resource allocation to verify whether granting a request maintains a Safe Sequence where all processes can terminate.",
        "keyPoints": [
            "Need Matrix Formula: Need[i][j] = Max[i][j] - Allocation[i][j].",
            "Safety Condition: Find Pi such that Need_i <= Available. Assume Pi completes and releases Allocation: Available += Allocation_i.",
            "Safe Sequence exists -> System is in SAFE STATE (Deadlock Free).",
            "Unsafe State != Deadlock, but an unsafe state carries risk of deadlock if all processes demand maximum needs."
        ],
        "aliases": ["bankers-algorithm", "banker"]
    },
    {
        "id": "deadlock-detection-recovery",
        "slug": "deadlock-detection-recovery",
        "order": 21,
        "domainId": "deadlocks",
        "domainName": "Domain 5 — Deadlocks",
        "title": "Deadlock Detection and Recovery",
        "shortTitle": "Detection & Recovery",
        "level": "System Internals",
        "icon": "Repeat",
        "accentColor": "#F59E0B",
        "badge": "Production Recovery",
        "summary": "Wait-for graphs, deadlock detection algorithms, process termination vs resource preemption, checkpointing and rollback.",
        "explanation": "When deadlock is neither prevented nor avoided (Ostrich algorithm), the OS must periodically detect deadlocked cycles and execute recovery.",
        "keyPoints": [
            "Wait-For Graph: Collapses resource nodes in single-instance systems; cycle detection using DFS running in O(V^2).",
            "Process Termination Recovery: Abort all deadlocked processes, or abort one at a time until cycle breaks.",
            "Resource Preemption Recovery: Preempt resources, rollback victim process to safe checkpoint, restart.",
            "Victim Selection: Minimize cost based on process runtime, priority, and resources held."
        ],
        "aliases": ["deadlock-detection", "deadlock-recovery"]
    },

    # DOMAIN 6 — MEMORY MANAGEMENT
    {
        "id": "main-memory-allocation",
        "slug": "main-memory-allocation",
        "order": 22,
        "domainId": "memory",
        "domainName": "Domain 6 — Memory Management",
        "title": "Main Memory and Memory Allocation",
        "shortTitle": "Memory Allocation",
        "level": "Fundamental",
        "icon": "Layers",
        "accentColor": "#10B981",
        "badge": "Core Foundation",
        "summary": "Logical vs physical address space, Base and Limit registers, contiguous memory allocation, fixed vs variable partitions.",
        "explanation": "Main memory is the central storage directly accessible by the CPU. The Memory Management Unit (MMU) translates logical addresses generated by CPU to physical addresses in RAM.",
        "keyPoints": [
            "Logical Address (Virtual Address): Generated by CPU; seen by program.",
            "Physical Address: Loaded into memory address register (MAR); refers to physical RAM chip.",
            "Base Register holds smallest legal physical address; Limit Register specifies size.",
            "Contiguous Allocation: Each process is contained in a single contiguous section of physical memory."
        ],
        "aliases": ["memory-management", "contiguous-memory"]
    },
    {
        "id": "fragmentation-allocation-strategies",
        "slug": "fragmentation-allocation-strategies",
        "order": 23,
        "domainId": "memory",
        "domainName": "Domain 6 — Memory Management",
        "title": "Fragmentation and Allocation Strategies",
        "shortTitle": "Fragmentation & Fits",
        "level": "Core Placement",
        "icon": "Binary",
        "accentColor": "#6574C4",
        "badge": "Placement High-Yield",
        "summary": "Internal vs External fragmentation, First Fit, Best Fit, Worst Fit, Next Fit algorithms, compaction.",
        "explanation": "Techniques for placing processes into dynamic memory holes while mitigating internal fragmentation (unused space inside partition) and external fragmentation (unusable free space scattered outside partitions).",
        "keyPoints": [
            "Internal Fragmentation: Allocated memory partition is larger than process request (e.g. 500 KB block for 212 KB process leaves 288 KB wasted).",
            "External Fragmentation: Total free memory is sufficient to satisfy request, but non-contiguous.",
            "First Fit: Allocates first hole that fits; fastest search.",
            "Best Fit: Allocates smallest hole that fits; leaves smallest leftover slivers.",
            "Worst Fit: Allocates largest hole; leaves largest leftover holes."
        ],
        "aliases": ["memory-allocation", "fragmentation"]
    },
    {
        "id": "paging-page-tables",
        "slug": "paging-page-tables",
        "order": 24,
        "domainId": "memory",
        "domainName": "Domain 6 — Memory Management",
        "title": "Paging and Page Tables",
        "shortTitle": "Paging & Page Tables",
        "level": "Core Pillar",
        "icon": "Layers",
        "accentColor": "#3B82F6",
        "badge": "Placement Benchmark",
        "summary": "Non-contiguous allocation, Page Number (p) and Offset (d), Physical Frames (f), Page Table structure, multi-level paging.",
        "explanation": "Paging breaks physical memory into fixed-size frames and logical memory into same-sized pages, eliminating external fragmentation entirely.",
        "keyPoints": [
            "Page Size must be power of 2 (typically 4 KB = 2^12 bytes -> 12-bit offset).",
            "Logical Address = Page Number (p) + Offset (d).",
            "Physical Address = (Frame Number * Page Size) + Offset.",
            "Page Table maps page numbers to frame numbers. Resides in RAM (PTBR points to it).",
            "Multi-Level Paging breaks page table into smaller pages to prevent storing massive contiguous page tables in RAM."
        ],
        "aliases": ["paging", "paging-calculations"]
    },
    {
        "id": "segmentation",
        "slug": "segmentation",
        "order": 25,
        "domainId": "memory",
        "domainName": "Domain 6 — Memory Management",
        "title": "Segmentation",
        "shortTitle": "Segmentation",
        "level": "Architecture",
        "icon": "FolderTree",
        "accentColor": "#F59E0B",
        "badge": "Logical View",
        "summary": "User view of memory, Segment Table (Base + Limit), protection bits, and segmented paging architectures.",
        "explanation": "Segmentation supports user logical view of memory by dividing address space into variable-sized semantic segments (Code, Data, Stack, Symbol Table).",
        "keyPoints": [
            "Logical address format: <segment-number s, offset d>.",
            "Segment Table contains Base address and Limit (length) of each segment.",
            "Hardware check: If offset d >= Limit -> Trap to OS (Addressing Error).",
            "Suffers from External Fragmentation because segments are variable in length."
        ],
        "aliases": ["segment-memory"]
    },
    {
        "id": "virtual-memory-demand-paging",
        "slug": "virtual-memory-demand-paging",
        "order": 26,
        "domainId": "memory",
        "domainName": "Domain 6 — Memory Management",
        "title": "Virtual Memory and Demand Paging",
        "shortTitle": "Virtual Memory",
        "level": "Core Pillar",
        "icon": "Cpu",
        "accentColor": "#8B5CF6",
        "badge": "Core Architecture",
        "summary": "Separation of logical and physical memory, Demand Paging, Valid/Invalid bit, Page Fault handling lifecycle, Thrashing and Working Set model.",
        "explanation": "Virtual memory permits execution of processes whose address space exceeds physical RAM by loading pages on demand from secondary swap storage.",
        "keyPoints": [
            "Demand Paging: Pages are loaded into RAM only when referenced during execution.",
            "Page Fault Trap: CPU attempts to access page with Invalid bit in page table.",
            "Page Fault Handling: 1. Trap to OS, 2. Save registers, 3. Find free frame, 4. Read page from disk, 5. Update page table to Valid, 6. Restart instruction.",
            "Thrashing: High paging activity where CPU spends more time swapping pages than executing user code."
        ],
        "aliases": ["virtual-memory", "demand-paging"]
    },
    {
        "id": "page-replacement-algorithms",
        "slug": "page-replacement-algorithms",
        "order": 27,
        "domainId": "memory",
        "domainName": "Domain 6 — Memory Management",
        "title": "Page Replacement Algorithms",
        "shortTitle": "Page Replacement",
        "level": "Core Placement",
        "icon": "Repeat",
        "accentColor": "#EF4444",
        "badge": "Placement High-Yield",
        "summary": "FIFO, Belady's Anomaly, LRU (stack & counter implementations), Optimal (OPT/MIN) algorithm, and Clock/Second-Chance approximation.",
        "explanation": "When a page fault occurs and all memory frames are allocated, page replacement algorithms choose which existing resident page to evict.",
        "keyPoints": [
            "FIFO: Replaces oldest loaded page. Vulnerable to Belady's Anomaly (more frames result in more page faults!).",
            "Optimal (OPT): Replaces page that will not be used for longest time in future. Unachievable in real-time, used as theoretical benchmark.",
            "LRU: Replaces page not referenced for longest time in past. Never suffers from Belady's Anomaly (stack algorithm).",
            "Second Chance (Clock): Uses reference bit to approximate LRU with low hardware overhead."
        ],
        "aliases": ["page-replacement", "fifo-lru-optimal"]
    },
    {
        "id": "tlb-effective-access-time",
        "slug": "tlb-effective-access-time",
        "order": 28,
        "domainId": "memory",
        "domainName": "Domain 6 — Memory Management",
        "title": "TLB and Effective Access Time",
        "shortTitle": "TLB & EAT",
        "level": "Core Placement",
        "icon": "Zap",
        "accentColor": "#10B981",
        "badge": "Hardware MMU Math",
        "summary": "Translation Lookaside Buffer (TLB) associative cache, TLB hit vs miss paths, and Effective Access Time (EAT) formulas.",
        "explanation": "TLB is a fast hardware associative cache inside the MMU storing recent virtual-to-physical page mappings, avoiding repeated RAM page table lookups.",
        "keyPoints": [
            "Without TLB: Every memory reference requires 2 RAM accesses (1 for Page Table + 1 for Data).",
            "TLB Hit Path: Access Time = TLB_time + Memory_time.",
            "TLB Miss Path (Single Level): Access Time = TLB_time + 2 * Memory_time.",
            "Effective Access Time formula: EAT = h * (c + m) + (1 - h) * (c + 2m).",
            "Multi-level paging extends miss penalty: EAT = h * (c + m) + (1 - h) * (c + (levels + 1) * m)."
        ],
        "aliases": ["tlb-eat", "tlb"]
    },

    # DOMAIN 7 — STORAGE
    {
        "id": "file-systems-allocation",
        "slug": "file-systems-allocation",
        "order": 29,
        "domainId": "storage",
        "domainName": "Domain 7 — Storage",
        "title": "File Systems and File Allocation",
        "shortTitle": "File Systems",
        "level": "System Internals",
        "icon": "HardDrive",
        "accentColor": "#6574C4",
        "badge": "Storage Architecture",
        "summary": "Inodes, superblock, Contiguous vs Linked vs Indexed allocation, Free space management (Bitmaps, Linked Lists), Virtual File System (VFS).",
        "explanation": "File system provides persistent hierarchical data storage. Allocation methods determine how physical disk sectors are assigned to file byte streams.",
        "keyPoints": [
            "Contiguous Allocation: Fast sequential & direct access; suffers from external fragmentation and static file growth issues.",
            "Linked Allocation: No external fragmentation; slow random access; pointer overhead in blocks.",
            "Indexed Allocation (UNIX Inode): Dedicated index block stores pointers to data blocks; supports fast direct access.",
            "UNIX Inode structure: 12 direct pointers, 1 single indirect, 1 double indirect, 1 triple indirect pointer."
        ],
        "aliases": ["file-systems", "file-allocation"]
    },
    {
        "id": "disk-structure-scheduling",
        "slug": "disk-structure-scheduling",
        "order": 30,
        "domainId": "storage",
        "domainName": "Domain 7 — Storage",
        "title": "Disk Structure and Disk Scheduling",
        "shortTitle": "Disk Scheduling",
        "level": "Core Placement",
        "icon": "Clock",
        "accentColor": "#3B82F6",
        "badge": "Mechanical Latency",
        "summary": "Magnetic disk geometry (Cylinder, Track, Sector), Seek Time, Rotational Latency, Transfer Time, and FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK algorithms.",
        "explanation": "Disk scheduling reorders pending I/O track requests to minimize mechanical arm seek time (the dominant component of disk latency).",
        "keyPoints": [
            "Access Time = Seek Time (arm movement) + Rotational Latency (platter spin to sector) + Transfer Time.",
            "SSTF (Shortest Seek Time First): Greedy choice; causes starvation of distant requests.",
            "SCAN (Elevator): Arm sweeps from one disk edge to other (0 to Max), servicing requests along the way.",
            "LOOK: Reverses direction at the last request in that direction without traveling to physical edge.",
            "C-SCAN / C-LOOK: Unidirectional sweep; returns immediately to opposite end to ensure uniform wait times."
        ],
        "aliases": ["disk-scheduling", "disk-structure"]
    }
]

domains = [
    {"id": "fundamentals", "title": "Domain 1 — OS Fundamentals", "domainNum": 1, "description": "Core kernel roles, system call interfaces, OS architectures, and dual-mode hardware safety."},
    {"id": "processes", "title": "Domain 2 — Processes & Threads", "domainNum": 2, "description": "Process lifecycles, PCB state preservation, thread models, and inter-process communication."},
    {"id": "scheduling", "title": "Domain 3 — CPU Scheduling", "domainNum": 3, "description": "Preemptive & non-preemptive scheduling algorithms, Gantt charts, throughput, and latency metrics."},
    {"id": "synchronization", "title": "Domain 4 — Synchronization", "domainNum": 4, "description": "Critical sections, mutex locks, semaphores, race conditions, and classical concurrency benchmarks."},
    {"id": "deadlocks", "title": "Domain 5 — Deadlocks", "domainNum": 5, "description": "Coffman conditions, Resource Allocation Graphs, Banker's safety checks, and detection/recovery."},
    {"id": "memory", "title": "Domain 6 — Memory Management", "domainNum": 6, "description": "Address translation, paging, segmentation, demand paging, page replacement, and TLB speedup."},
    {"id": "storage", "title": "Domain 7 — Storage", "domainNum": 7, "description": "File system inodes, allocation mechanisms, disk geometries, and arm seek scheduling."}
]

js_content = """/**
 * MASTER OPERATING SYSTEMS (OS) TOPIC REGISTRY
 * 
 * Defines the canonical 30 curriculum topics grouped into 7 domains
 * for PathPilot's Operating Systems module.
 * 
 * DOMAIN 1 — OS FUNDAMENTALS (Topics 1 - 4)
 * DOMAIN 2 — PROCESSES & THREADS (Topics 5 - 8)
 * DOMAIN 3 — CPU SCHEDULING (Topics 9 - 14)
 * DOMAIN 4 — SYNCHRONIZATION (Topics 15 - 17)
 * DOMAIN 5 — DEADLOCKS (Topics 18 - 21)
 * DOMAIN 6 — MEMORY MANAGEMENT (Topics 22 - 28)
 * DOMAIN 7 — STORAGE (Topics 29 - 30)
 */

import {
  Cpu,
  Layers,
  ShieldAlert,
  HardDrive,
  Workflow,
  FolderTree,
  Activity,
  Clock,
  Zap,
  Repeat,
  Binary,
  Lock,
  Share2,
  FileCode,
  Terminal,
  Server,
  Radio,
  CheckCircle2,
  BookOpen,
  Sparkles
} from 'lucide-react';

const ICON_MAP = {
  Cpu,
  Layers,
  ShieldAlert,
  HardDrive,
  Workflow,
  FolderTree,
  Activity,
  Clock,
  Zap,
  Repeat,
  Binary,
  Lock,
  Share2,
  FileCode,
  Terminal,
  Server,
  Radio,
  CheckCircle2,
  BookOpen,
  Sparkles
};

export const OS_DOMAINS = """ + json.dumps(domains, indent=2) + """;

export const OS_TOPICS_LIST = [
"""

for t in topics:
    icon_name = t["icon"]
    js_content += f"""  {{
    topicId: '{t["id"]}',
    slug: '{t["slug"]}',
    order: {t["order"]},
    domainId: '{t["domainId"]}',
    domainName: '{t["domainName"]}',
    topicName: '{t["title"]}',
    title: '{t["title"]}',
    shortTitle: '{t["shortTitle"]}',
    shortName: '{t["shortTitle"]}',
    level: '{t["level"]}',
    badge: '{t["badge"]}',
    icon: ICON_MAP['{icon_name}'] || Cpu,
    accentColor: '{t["accentColor"]}',
    summary: {json.dumps(t["summary"])},
    explanation: {json.dumps(t["explanation"])},
    keyPoints: {json.dumps(t["keyPoints"])},
    aliases: {json.dumps(t.get("aliases", []))}
  }},
"""

js_content += """];

// Build keyed dictionary by topicId and all backward-compatible aliases
export const OS_TOPIC_REGISTRY = {};

OS_TOPICS_LIST.forEach((t) => {
  OS_TOPIC_REGISTRY[t.topicId] = t;
  if (t.aliases && Array.isArray(t.aliases)) {
    t.aliases.forEach((alias) => {
      OS_TOPIC_REGISTRY[alias] = t;
    });
  }
});

// Backward-compatible primary pillars list (re-exported for existing imports)
export const OS_PRIMARY_PILLARS = OS_TOPICS_LIST;

/**
 * Resolves any legacy slug, shorthand alias, or partial name to the canonical topicId
 */
export function resolveOSTopicId(rawInput) {
  if (!rawInput) return 'intro-to-os';
  const clean = String(rawInput).toLowerCase().trim().replace(/_/g, '-');

  if (OS_TOPIC_REGISTRY[clean]) {
    return OS_TOPIC_REGISTRY[clean].topicId;
  }

  // Common keyword routing
  const keywordMap = {
    'intro': 'intro-to-os',
    'system-call': 'os-services-system-calls',
    'architecture': 'os-structures-architectures',
    'dual-mode': 'interrupts-traps-dual-mode',
    'interrupt': 'interrupts-traps-dual-mode',
    'process': 'processes-process-states',
    'state': 'processes-process-states',
    'pcb': 'pcb-context-switching',
    'context': 'pcb-context-switching',
    'thread': 'threads-multithreading',
    'ipc': 'ipc',
    'scheduling': 'cpu-scheduling-fundamentals',
    'fcfs': 'fcfs-scheduling',
    'sjf': 'sjf-srtf-scheduling',
    'srtf': 'sjf-srtf-scheduling',
    'priority': 'priority-scheduling-algo',
    'round-robin': 'round-robin-scheduling',
    'rr': 'round-robin-scheduling',
    'mlq': 'mlq-mlfq-scheduling',
    'mlfq': 'mlq-mlfq-scheduling',
    'critical-section': 'sync-critical-section',
    'sync': 'sync-critical-section',
    'mutex': 'mutex-semaphores',
    'semaphore': 'mutex-semaphores',
    'classical': 'classical-sync-problems',
    'philosopher': 'classical-sync-problems',
    'producer': 'classical-sync-problems',
    'deadlock': 'deadlock-fundamentals',
    'prevention': 'deadlock-prevention-avoidance',
    'avoidance': 'deadlock-prevention-avoidance',
    'banker': 'bankers-algorithm-safe-state',
    'safe-state': 'bankers-algorithm-safe-state',
    'detection': 'deadlock-detection-recovery',
    'recovery': 'deadlock-detection-recovery',
    'memory': 'main-memory-allocation',
    'allocation': 'main-memory-allocation',
    'fragmentation': 'fragmentation-allocation-strategies',
    'best-fit': 'fragmentation-allocation-strategies',
    'first-fit': 'fragmentation-allocation-strategies',
    'worst-fit': 'fragmentation-allocation-strategies',
    'paging': 'paging-page-tables',
    'page-table': 'paging-page-tables',
    'segmentation': 'segmentation',
    'virtual-memory': 'virtual-memory-demand-paging',
    'demand-paging': 'virtual-memory-demand-paging',
    'page-replacement': 'page-replacement-algorithms',
    'lru': 'page-replacement-algorithms',
    'fifo': 'page-replacement-algorithms',
    'optimal': 'page-replacement-algorithms',
    'tlb': 'tlb-effective-access-time',
    'eat': 'tlb-effective-access-time',
    'file': 'file-systems-allocation',
    'inode': 'file-systems-allocation',
    'disk': 'disk-structure-scheduling',
    'scan': 'disk-structure-scheduling',
    'look': 'disk-structure-scheduling'
  };

  for (const [kw, canonical] of Object.entries(keywordMap)) {
    if (clean.includes(kw)) {
      return canonical;
    }
  }

  // Fallback to substring matching on topic list
  const match = OS_TOPICS_LIST.find(
    (t) => t.topicId.includes(clean) || t.slug.includes(clean) || t.topicName.toLowerCase().includes(clean)
  );

  return match ? match.topicId : 'intro-to-os';
}

/**
 * Accessor returning canonical topic object
 */
export function getOSTopic(topicId) {
  const canonicalId = resolveOSTopicId(topicId);
  return OS_TOPIC_REGISTRY[canonicalId] || OS_TOPICS_LIST[0];
}

/**
 * Accessor returning all topics for a domain
 */
export function getOSTopicsByDomain(domainId) {
  return OS_TOPICS_LIST.filter((t) => t.domainId === domainId);
}
"""

with open(target_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated {len(topics)} canonical OS topics in {target_path}")
