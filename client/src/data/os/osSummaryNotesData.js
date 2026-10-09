/**
 * MASTER OPERATING SYSTEMS (OS) SECTION 5: SUMMARY & NOTES DATA
 * 
 * Provides concise revision notes for ALL 30 canonical OS syllabus topics:
 * - Definition
 * - Key Rule
 * - High-Yield Summary Points
 * - Essential Formulas / Invariants
 * - Core Algorithm Steps
 * - Common Traps & Edge Cases
 */

export const OS_SUMMARY_NOTES_DATA = {
  "intro-to-os": {
    "topicId": "intro-to-os",
    "title": "an Operating System",
    "definition": "An Operating System (OS) is system software that acts as an intermediary between computer hardware and user applications, serving as both an extended machine and resource allocator.",
    "keyRule": "An OS is a resource allocator and control program executing between user programs and physical hardware.",
    "keyPoints": [
      "The OS is the master manager of your computer. Without it, you would have to write raw machine code to operate the screen, keyboard, disk, and CPU."
    ],
    "formulas": [
      "An OS is a resource allocator and control program executing between user programs and physical hardware."
    ],
    "algorithmSteps": [
      "Hardware Init: BIOS/UEFI tests hardware registers and memory lines.",
      "Kernel Load: Bootloader transfers kernel code from SSD/disk into RAM.",
      "Driver Initialization: Kernel initializes scheduler, virtual memory, and device drivers.",
      "Userspace Launch: First user process (PID 1) started; system calls enabled."
    ],
    "commonTraps": [
      "\u274c Believing the OS kernel runs continuously on a dedicated CPU core. -> \u2705 ",
      "\u274c Confusing an Operating System with a Graphical User Interface (GUI). -> \u2705 "
    ]
  },
  "os-services-system-calls": {
    "topicId": "os-services-system-calls",
    "title": "System Calls",
    "definition": "A System Call is the programmatic interface provided by the operating system kernel that allows user-space programs to request privileged kernel operations.",
    "keyRule": "System calls are the only safe doorway from User Mode into Kernel Mode.",
    "keyPoints": [
      "A system call is the official helpline an application calls when it needs the OS to do something it cannot do alone, like read a file or send data over WiFi."
    ],
    "formulas": [
      "System calls are the only safe doorway from User Mode into Kernel Mode."
    ],
    "algorithmSteps": [
      "API Wrapper: C runtime (glibc) sets up registers with arguments.",
      "Hardware Trap: CPU transitions from User Mode to Kernel Mode.",
      "Kernel Table Lookup: sys_call_table indexes handler function.",
      "Return & Mode Drop: Kernel drops privilege back to User Mode."
    ],
    "commonTraps": [
      "\u274c Thinking library functions like printf() or malloc() are system calls. -> \u2705 ",
      "\u274c Confusing a context switch with a mode switch. -> \u2705 "
    ]
  },
  "os-structures-architectures": {
    "topicId": "os-structures-architectures",
    "title": "OS Structure",
    "definition": "OS Structure refers to the internal organization and partitioning of kernel software components, defining how subsystems communicate and enforce security boundaries.",
    "keyRule": "Monolithic = Fast & Unified; Microkernel = Safe & Modular; Hybrid = Practical Engineering Compromise.",
    "keyPoints": [
      "OS structure is the architectural blueprint of the operating system: deciding whether to put everything into one big room (monolithic) or build separate small offices (microkernel)."
    ],
    "formulas": [
      "Monolithic = Fast & Unified; Microkernel = Safe & Modular; Hybrid = Practical Engineering Compromise."
    ],
    "algorithmSteps": [
      "Monolithic Design: All drivers, file systems, and scheduler run in Ring 0.",
      "Microkernel Design: Only basic IPC and memory in Ring 0; rest in user servers.",
      "Hybrid Design: Windows and macOS run microkernel structure inside monolithic address space.",
      "Loadable Kernel Modules: Linux loads drivers dynamically without rebooting."
    ],
    "commonTraps": [
      "\u274c Assuming Windows is a pure microkernel. -> \u2705 ",
      "\u274c Thinking Linux requires a full reboot to install new hardware drivers. -> \u2705 "
    ]
  },
  "interrupts-traps-dual-mode": {
    "topicId": "interrupts-traps-dual-mode",
    "title": "Interrupts, Traps & Dual Mode",
    "definition": "An Interrupt is an asynchronous hardware signal notifying the CPU of an event. A Trap is a synchronous software exception. Dual Mode is hardware enforcement of User Mode (Ring 3) vs Kernel Mode (Ring 0).",
    "keyRule": "Interrupts are asynchronous hardware signals; traps are synchronous CPU instruction events.",
    "keyPoints": [
      "An interrupt is a doorbell ringing from hardware. A trap is an alarm going off because a program did something illegal (like divide by zero). Dual mode is the security badge determining where you can go."
    ],
    "formulas": [
      "Interrupts are asynchronous hardware signals; traps are synchronous CPU instruction events."
    ],
    "algorithmSteps": [
      "Hardware Signal: Device signals APIC chip via interrupt line.",
      "State Preservation: Hardware pushes PC, stack pointer, and flags.",
      "ISR Execution: OS driver executes specific handler code.",
      "IRET Return: Hardware restores original registers and user mode."
    ],
    "commonTraps": [
      "\u274c Thinking all interrupts terminate the running program. -> \u2705 ",
      "\u274c Believing interrupts can never be disabled. -> \u2705 "
    ]
  },
  "processes-process-states": {
    "topicId": "processes-process-states",
    "title": "a Process",
    "definition": "A Process is an active program in execution. While a program is a passive binary file on disk, a process is dynamic with an allocated address space, stack, heap, and registers.",
    "keyRule": "Process = Program in Execution. PCB = Kernel identity of process. Context Switch = Pure CPU overhead.",
    "keyPoints": [
      "5 States: New, Ready, Running, Waiting, Terminated.",
      "PCB contains PID, Program Counter, registers, memory limits, and open files.",
      "fork() returns 0 to Child, Child PID to Parent, -1 on failure.",
      "Zombie: Process dead, parent has not waited. Orphan: Parent dead, adopted by PID 1.",
      "Context switch duration: 1 to 10 microseconds."
    ],
    "formulas": [
      "Child Process Count after n consecutive forks = 2^n - 1 children (2^n total processes)"
    ],
    "algorithmSteps": [
      "New: Process is being created; OS allocates PID and PCB.",
      "Ready: Loaded in RAM, waiting for CPU assignment.",
      "Running: Instructions being executed on the CPU core.",
      "Waiting (Blocked): Waiting for an external event or I/O completion."
    ],
    "commonTraps": [
      "\u274c Confusing Zombie Process with Orphan Process -> \u2705 A Zombie has finished executing (exit called) but still occupies an entry in the process table because its parent hasn't called wait(). An Orphan has a parent that died before it; it is adopted by init/systemd (PID 1).",
      "\u274c Believing fork() creates a thread -> \u2705 fork() creates a completely separate process with its own PID, independent virtual memory space, and separate file descriptor tables.",
      "\u274c Assuming context switch performs useful application work -> \u2705 Context switch is pure system overhead. During the switch, no user instructions execute."
    ]
  },
  "pcb-context-switching": {
    "topicId": "pcb-context-switching",
    "title": "PCB & Context Switching",
    "definition": "A Process Control Block (PCB) is the kernel data structure holding all metadata of a process. A Context Switch is the procedure of saving the CPU state of the running process in its PCB and loading another process's PCB.",
    "keyRule": "A context switch saves current CPU registers to PCB_A and restores CPU registers from PCB_B.",
    "keyPoints": [
      "The PCB is the ID card and bookmark of a process. When the CPU switches tasks, it bookmarks where it stopped (PCB) so it can resume later without forgetting anything."
    ],
    "formulas": [
      "A context switch saves current CPU registers to PCB_A and restores CPU registers from PCB_B."
    ],
    "algorithmSteps": [
      "Interrupt Trigger: Hardware timer raises IRQ; CPU enters kernel mode.",
      "Save State A: Hardware registers written to PCB memory structure.",
      "Scheduler Dispatch: Queue algorithm selects next eligible process.",
      "Restore State B: Target registers and memory space pointer restored."
    ],
    "commonTraps": [
      "\u274c Thinking PCB is stored in the process's own user memory stack. -> \u2705 ",
      "\u274c Ignoring the indirect cost of a context switch. -> \u2705 "
    ]
  },
  "threads-multithreading": {
    "topicId": "threads-multithreading",
    "title": "a Thread",
    "definition": "A Thread is the smallest schedulable execution unit of CPU activity within a process. Multiple threads inside the same process share the text, data, heap, and open files, while keeping private stacks and registers.",
    "keyRule": "Threads share Heap & Code, but keep private Stacks. Lock order must avoid inversion and deadlock.",
    "keyPoints": [
      "Threads are lightweight: fast creation, cheap context switch compared to processes.",
      "Critical Section requires: Mutual Exclusion, Progress, Bounded Waiting.",
      "Counting Semaphore initialized to N; Binary Semaphore initialized to 1.",
      "wait() decrements; signal() increments.",
      "Producer-Consumer: wait(empty) BEFORE wait(mutex) to prevent deadlock."
    ],
    "formulas": [
      "Peterson's Flags: flag[i] = true; turn = j;\nwhile (flag[j] && turn == j) { /* busy wait */ }"
    ],
    "algorithmSteps": [
      "Acquire Permit: Thread calls wait(sem); if token count > 0, decrements and enters.",
      "Safe Access: Thread reads/writes shared memory without interference.",
      "Release Permit: Thread calls signal(sem); increments counter and wakes next sleeper."
    ],
    "commonTraps": [
      "\u274c Reversing wait() operations in Producer-Consumer (Deadlock trap) -> \u2705 Calling wait(mutex) BEFORE wait(empty) causes DEADLOCK if the buffer is full! The producer holds the mutex and sleeps waiting for empty, while the consumer cannot acquire the mutex to free an empty slot.",
      "\u274c Confusing Mutex with Binary Semaphore -> \u2705 A Mutex has OWNERSHIP: only the thread that locked the mutex can unlock it. A Binary Semaphore has no ownership: Thread A can wait() and Thread B can signal().",
      "\u274c Assuming spinlocks are always worse than sleeping mutexes -> \u2705 On multi-core systems, if the critical section is extremely short (< few microseconds), a spinlock is FASTER than a mutex because it avoids the heavy overhead of two context switches."
    ]
  },
  "ipc": {
    "topicId": "ipc",
    "title": "Inter-Process Communication (IPC)",
    "definition": "Inter-Process Communication (IPC) is the set of programming interfaces and mechanisms provided by the operating system allowing separate processes to share data and synchronize operations.",
    "keyRule": "Shared memory delivers maximum speed; message passing provides built-in synchronization.",
    "keyPoints": [
      "Because the OS strictly separates process memory so they don't corrupt each other, processes need special telephone lines (IPC) like pipes, message queues, or shared memory to talk."
    ],
    "formulas": [
      "Shared memory delivers maximum speed; message passing provides built-in synchronization."
    ],
    "algorithmSteps": [
      "Setup Phase: Kernel establishes shared segment or message mailbox.",
      "Transfer: Data written to shared RAM or sent as kernel message.",
      "Synchronization: Semaphores ensure reader doesn't read partial writes.",
      "Teardown: Processes detach; kernel deallocates segment."
    ],
    "commonTraps": [
      "\u274c Believing anonymous pipes can connect any two random processes on a computer. -> \u2705 ",
      "\u274c Forgetting to close the write end of a pipe in the parent process. -> \u2705 "
    ]
  },
  "cpu-scheduling-fundamentals": {
    "topicId": "cpu-scheduling-fundamentals",
    "title": "CPU Scheduling",
    "definition": "CPU Scheduling is the OS mechanism by which the Short-Term Scheduler selects one process from the Ready Queue and allocates the CPU core for execution.",
    "keyRule": "SJF gives minimum average waiting time. Round Robin guarantees bounded response time.",
    "keyPoints": [
      "Preemptive: CPU can be taken away involuntarily (SRTF, Round Robin, Preemptive Priority).",
      "Non-Preemptive: Process holds CPU until it voluntarily terminates or calls I/O (FCFS, Non-preemptive SJF).",
      "TAT = Completion Time - Arrival Time (CT - AT).",
      "WT = Turnaround Time - Burst Time (TAT - BT).",
      "Aging fixes starvation by gradually increasing process priority as it waits."
    ],
    "formulas": [
      "Turnaround Time (TAT) = CT - AT\nWaiting Time (WT) = TAT - BT"
    ],
    "algorithmSteps": [
      "Arrival in Ready Queue: New or unblocked processes enter the queue.",
      "Algorithm Evaluation: Criteria like burst time, priority, or time quantum evaluated.",
      "Dispatch & Context Switch: Registers, Program Counter, and stack pointers swapped.",
      "Execution Slice: Selected process runs until timer expires, I/O wait, or completion."
    ],
    "commonTraps": [
      "\u274c Confusing Waiting Time (WT) with Turnaround Time (TAT) -> \u2705 Turnaround Time is the total lifetime in the system (CT - AT). Waiting Time is only the time spent idling in the ready queue (TAT - BT).",
      "\u274c Assuming Response Time equals Waiting Time in all algorithms -> \u2705 In non-preemptive algorithms (FCFS), RT == WT. In preemptive algorithms (Round Robin, SRTF), RT is strictly (First Time CPU Allocated - AT), which is much smaller than WT.",
      "\u274c Believing Shortest Job First (SJF) is practically implementable as-is -> \u2705 Exact SJF cannot be implemented in general-purpose OS because the kernel cannot know the future CPU burst of a user program in advance. It is approximated using exponential moving averages."
    ]
  },
  "fcfs-scheduling": {
    "topicId": "fcfs-scheduling",
    "title": "First-Come, First-Served (FCFS)",
    "definition": "FCFS is the simplest non-preemptive CPU scheduling algorithm where the process requesting the CPU first is allocated the CPU first using a FIFO (First-In, First-Out) queue.",
    "keyRule": "FCFS: Non-preemptive, FIFO arrival order, zero starvation, prone to Convoy Effect.",
    "keyPoints": [
      "Non-preemptive: Process runs until burst completes.",
      "Convoy Effect: Big CPU job blocks multiple small I/O jobs.",
      "Response Time == Waiting Time.",
      "Gantt chart must account for CPU idle gaps."
    ],
    "formulas": [
      "TAT = CT - AT\nWT = TAT - BT"
    ],
    "algorithmSteps": [
      "Queue Arrival: Timestamp recorded as Arrival Time (AT).",
      "Non-preemptive Run: Runs uninterrupted for duration BT.",
      "Completion: Hands off CPU to next ready process."
    ],
    "commonTraps": [
      "\u274c Scheduling processes in numerical PID order (P1, P2, P3) instead of Arrival Time order -> \u2705 Always sort processes by Arrival Time (AT) first! If P2 arrives at t=0 and P1 arrives at t=2, P2 runs first.",
      "\u274c Assuming Response Time is different from Waiting Time in FCFS -> \u2705 Because FCFS is strictly non-preemptive, Response Time (First Run - AT) is mathematically identical to Waiting Time."
    ]
  },
  "sjf-srtf-scheduling": {
    "topicId": "sjf-srtf-scheduling",
    "title": "SJF & SRTF Scheduling",
    "definition": "Shortest Job First (SJF) selects the waiting process with the smallest CPU burst. Shortest Remaining Time First (SRTF) is the preemptive variant where a running process is preempted if a newly arrived process has a shorter remaining burst time.",
    "keyRule": "SJF/SRTF: Provably optimal average waiting time; susceptible to starvation of long jobs.",
    "keyPoints": [
      "SJF is non-preemptive; SRTF is preemptive.",
      "Preemption condition: New Arrival BT < Running Process Remaining BT.",
      "Burst prediction: tau_{n+1} = alpha * t_n + (1 - alpha) * tau_n.",
      "Cure for starvation: Aging."
    ],
    "formulas": [
      "TAT = CT - AT\nWT = TAT - BT"
    ],
    "algorithmSteps": [
      "Arrival Evaluation: Triggered whenever a new process enters the ready queue.",
      "Remaining Time Check: Smallest remaining burst wins the CPU.",
      "Context Switch: Preempts running process if incoming process is shorter."
    ],
    "commonTraps": [
      "\u274c Comparing original Burst Time instead of REMAINING Burst Time during SRTF preemption -> \u2705 Always compare the incoming burst against the remaining burst of the currently running process (NOT its original burst).",
      "\u274c Claiming SJF is completely starvation-free -> \u2705 SJF and SRTF suffer from severe STARVATION for long processes if a steady stream of short processes keeps arriving."
    ]
  },
  "priority-scheduling-algo": {
    "topicId": "priority-scheduling-algo",
    "title": "Priority Scheduling",
    "definition": "Priority Scheduling is a CPU scheduling algorithm where each process is assigned a numerical priority rank, and the CPU is allocated to the process with the highest priority. It can be either preemptive or non-preemptive.",
    "keyRule": "Highest priority runs first. Starvation cured by Aging. Check numerical convention!",
    "keyPoints": [
      "Preemptive: Higher priority arrival interrupts running process.",
      "Non-preemptive: Running process finishes burst before priority check.",
      "Aging gradually increases priority of waiting tasks over time.",
      "Equal priority broken by FCFS arrival order."
    ],
    "formulas": [
      "TAT = CT - AT\nWT = TAT - BT"
    ],
    "algorithmSteps": [
      "Rank Check: Compare priority ranks of available processes.",
      "Tie-Breaker: Processes with equal priority are scheduled using FCFS.",
      "Aging Step: Periodically increment priority of waiting jobs."
    ],
    "commonTraps": [
      "\u274c Failing to check whether lower or higher number represents higher priority -> \u2705 ALWAYS read the question! In UNIX and GATE exams, 0 is often highest priority; in other contexts, 10 is highest. Never assume without checking.",
      "\u274c Forgetting that SJF is simply Priority Scheduling where priority = 1 / Burst Time -> \u2705 SJF is a special mathematical case of priority scheduling where priority is inversely proportional to burst time."
    ]
  },
  "round-robin-scheduling": {
    "topicId": "round-robin-scheduling",
    "title": "Round Robin (RR) Scheduling",
    "definition": "Round Robin is a preemptive CPU scheduling algorithm designed for time-sharing systems where each ready process is assigned a fixed time slice called a Time Quantum (q). When the quantum expires, the process is preempted and moved to the tail of the ready queue.",
    "keyRule": "Round Robin: Preemptive, time-sliced, starvation-free, optimal for interactive systems.",
    "keyPoints": [
      "Preemption triggered by timer interrupt after Time Quantum q.",
      "Arrival tie-breaker: New arrival enters queue BEFORE preempted process.",
      "Response time is bounded: at most (n-1)*q before a process gets CPU.",
      "If q is very large -> FCFS; if q is very small -> high overhead."
    ],
    "formulas": [
      "TAT = CT - AT\nWT = TAT - BT"
    ],
    "algorithmSteps": [
      "Dispatch: Allocate CPU to queue head.",
      "Quantum Execution: Runs for min(Remaining_Burst, Quantum).",
      "Re-queue: Preempted process added to tail; next process runs."
    ],
    "commonTraps": [
      "\u274c Putting the preempted process before the new arrival in the ready queue -> \u2705 Always put newly arriving processes into the queue BEFORE appending the preempted process whose quantum just expired.",
      "\u274c Assuming Round Robin always gives lower average waiting time than FCFS -> \u2705 If all processes have identical burst times equal to the quantum, Round Robin gives the WORST possible average turnaround time because all processes finish together at the very end."
    ]
  },
  "mlq-mlfq-scheduling": {
    "topicId": "mlq-mlfq-scheduling",
    "title": "MLQ & MLFQ Schedulers",
    "definition": "Multilevel Queue (MLQ) partitions the ready queue into discrete priority queues with static assignments. Multilevel Feedback Queue (MLFQ) dynamically moves processes between queues based on observed CPU burst behavior.",
    "keyRule": "MLFQ dynamically discovers burst length: interactive jobs stay high; CPU-bound jobs drop low.",
    "keyPoints": [
      "MLQ is like airport boarding lines (First Class, Business, Economy) where you stay in your line. MLFQ is an adaptive system: if you take too long at the counter, you get moved to a slower queue to let quick passengers through."
    ],
    "formulas": [
      "MLFQ dynamically discovers burst length: interactive jobs stay high; CPU-bound jobs drop low."
    ],
    "algorithmSteps": [
      "Top Queue Q0: Short quantum (e.g. 8 ms). High priority for interactive clicks.",
      "Middle Queue Q1: Medium quantum (e.g. 16 ms). For moderate burst processes.",
      "Bottom Queue Q2: FCFS or large quantum (e.g. 64 ms) for heavy batch computing.",
      "Aging Reset: Periodic timer boosts all tasks back to Q0 to cure starvation."
    ],
    "commonTraps": [
      "\u274c Confusing Multilevel Queue (MLQ) with Multilevel Feedback Queue (MLFQ). -> \u2705 ",
      "\u274c Assuming MLFQ requires knowing the burst time in advance like SJF. -> \u2705 "
    ]
  },
  "sync-critical-section": {
    "topicId": "sync-critical-section",
    "title": "Process Synchronization & Critical Section",
    "definition": "Process Synchronization is the mechanism that ensures orderly execution of cooperating concurrent processes sharing a memory address space to maintain data consistency. A Critical Section (CS) is a segment of code where shared resources (e.g., variables, files, tables) are accessed.",
    "keyRule": "Every Critical Section solution MUST satisfy Mutual Exclusion, Progress, and Bounded Waiting without assumptions on CPU speeds.",
    "keyPoints": [
      "Race Condition: Non-deterministic output caused by concurrent un-synchronized memory writes.",
      "Peterson's Algorithm: Software solution for 2 processes using flag[2] and turn.",
      "Hardware support: TestAndSet and CompareAndSwap provide indivisible atomic operations.",
      "Progress Failure: Occurs when a non-competing process blocks a competing process from entering CS."
    ],
    "formulas": [
      "Every Critical Section solution MUST satisfy Mutual Exclusion, Progress, and Bounded Waiting without assumptions on CPU speeds."
    ],
    "algorithmSteps": [
      "Entry Section: Process executes flag[i]=true; turn=j; while(flag[j] && turn==j);",
      "Critical Section: Executes sensitive shared state updates with exclusivity.",
      "Exit Section: Sets flag[i]=false to allow peer process to proceed.",
      "Remainder Section: Performs independent non-critical CPU computations."
    ],
    "commonTraps": [
      "\u274c Believing disabling interrupts solves critical section issues on modern multi-core servers. -> \u2705 Disabling interrupts only disables them on the local core; peer cores can still concurrently access shared RAM.",
      "\u274c Thinking Peterson's algorithm runs safely on modern Out-of-Order CPUs without memory barriers. -> \u2705 CPUs reorder stores (Store-Store, Store-Load). Without memory barriers (fence), Peterson's can fail on x86/ARM.",
      "\u274c Confusing Progress with Mutual Exclusion. -> \u2705 Mutual Exclusion stops two inside at once; Progress ensures that if none are inside, those waiting can enter without arbitrary blockage."
    ]
  },
  "mutex-semaphores": {
    "topicId": "mutex-semaphores",
    "title": "Mutexes and Semaphores",
    "definition": "A Mutex (Mutual Exclusion lock) is a binary locking mechanism owned by a single thread at a time. A Semaphore is a signaling variable (Dijkstra, 1965) containing an integer value manipulated solely by two atomic operations: wait() (P) and signal() (V).",
    "keyRule": "Mutex = Ownership + Locking; Semaphore = Signaling + Resource Counting.",
    "keyPoints": [
      "Binary Semaphore: value is 0 or 1; acts like a signaling lock.",
      "Counting Semaphore: value is 0 to N; controls access to pool of N resources.",
      "Negative Semaphore value: |S| represents the exact count of threads sleeping in wait queue.",
      "Priority Inheritance: Required on real-time systems to solve priority inversion on mutexes."
    ],
    "formulas": [
      "Number of Waiting Processes = |S| when S < 0; Available Units = S when S >= 0"
    ],
    "algorithmSteps": [
      "wait(S) Invocation: Process checks semaphore availability and decrements count.",
      "Sleep / Block: If count was negative, OS suspends process without consuming CPU.",
      "signal(S) Invocation: Active thread completes task and increments count.",
      "Wakeup Dispatch: OS scheduler transfers the sleeper from wait queue to ready queue."
    ],
    "commonTraps": [
      "\u274c Claiming that Mutex and Binary Semaphore are 100% identical. -> \u2705 A Mutex enforces strict thread ownership (only acquiring thread can release). A Semaphore can be signaled by ANY thread.",
      "\u274c Inverting wait() and signal() sequence: signal(S) before CS, wait(S) after CS. -> \u2705 This completely destroys mutual exclusion, allowing infinite processes into the critical section simultaneously.",
      "\u274c Assuming semaphore values can never be negative. -> \u2705 In modern OS blocking implementations, a negative value (e.g. S = -3) explicitly signifies that 3 processes are sleeping."
    ]
  },
  "classical-sync-problems": {
    "topicId": "classical-sync-problems",
    "title": "Classical Synchronization Problems",
    "definition": "Classical Synchronization Problems are benchmark concurrency paradigms used to test, evaluate, and validate synchronization primitives. The three canonical problems are: 1) Producer-Consumer (Bounded Buffer), 2) Readers-Writers, and 3) Dining Philosophers.",
    "keyRule": "Acquire resource semaphore before mutex lock. Release mutex lock before resource semaphore.",
    "keyPoints": [
      "Producer-Consumer: mutex(1), empty(N), full(0).",
      "Readers-Writers (Reader Preference): readCount, mutex(1), rw_mutex(1); risk of writer starvation.",
      "Dining Philosophers: 5 forks; break circular wait via asymmetric order or 4-seat limit.",
      "Starvation vs Deadlock: In starvation, someone makes progress; in deadlock, NO ONE makes progress."
    ],
    "formulas": [
      "Acquire resource semaphore before mutex lock. Release mutex lock before resource semaphore."
    ],
    "algorithmSteps": [
      "Check Capacity: Producer calls wait(empty); blocks if buffer is full.",
      "Lock Critical Section: wait(mutex) ensures only one thread alters buffer pointers.",
      "Unlock Critical Section: signal(mutex) releases buffer access.",
      "Signal Consumer: signal(full) notifies waiting consumers that an item is ready."
    ],
    "commonTraps": [
      "\u274c Putting wait(mutex) before wait(empty/full) in Bounded Buffer. -> \u2705 Resource semaphores must be decremented first, mutex lock second.",
      "\u274c Claiming Reader-Preference Readers-Writers is completely fair to all threads. -> \u2705 First Readers-Writers problem causes Writer Starvation if a continuous stream of readers keeps readCount > 0.",
      "\u274c Allowing all 5 philosophers to sit and pick up left chopsticks at the same time. -> \u2705 Must either limit to 4 philosophers at the table, pick both chopsticks atomically, or use asymmetric pickup."
    ]
  },
  "deadlock-prevention-avoidance": {
    "topicId": "deadlock-prevention-avoidance",
    "title": "Deadlock Prevention vs Deadlock Avoidance",
    "definition": "Deadlock Prevention is a static design approach that invalidates at least one of the 4 Coffman conditions at compile/system design time. Deadlock Avoidance is a dynamic runtime approach where the OS inspects every resource request and only grants it if the resulting state remains SAFE.",
    "keyRule": "Prevention = Break 1 Coffman condition statically; Avoidance = Keep system in Safe State dynamically.",
    "keyPoints": [
      "Safe State: A safe sequence <P1, P2, ... Pn> exists.",
      "Unsafe State != Deadlock, but deadlock can only occur within an unsafe state.",
      "Circular Wait prevention: Resource ordering F(R) strictly increasing.",
      "Formula: Minimum resources R >= sum(Max_i - 1) + 1."
    ],
    "formulas": [
      "Minimum Resources R >= sum(Max_i - 1) + 1  OR  R > n * (k - 1)"
    ],
    "algorithmSteps": [
      "Resource Request: Process requests additional resource units at runtime.",
      "Simulated Allocation: Avoidance algorithm pretends to allocate resources temporarily.",
      "Safe State Validation: Executes Safety Algorithm to find a valid termination sequence.",
      "Decision: If safe, grant request; if unsafe, force process to wait."
    ],
    "commonTraps": [
      "\u274c Equating an Unsafe State directly with Deadlock. -> \u2705 An Unsafe State is NOT necessarily deadlocked. It merely means the OS cannot guarantee avoiding deadlock if all processes demand maximums.",
      "\u274c Claiming Deadlock Avoidance requires no prior knowledge of process behavior. -> \u2705 Deadlock Avoidance STRICTLY requires every process to declare its maximum resource demands in advance.",
      "\u274c Using (n * k) as the formula for minimum deadlock-free resources. -> \u2705 The formula is n * (k - 1) + 1, not n * k."
    ]
  },
  "bankers-algorithm-safe-state": {
    "topicId": "bankers-algorithm-safe-state",
    "title": "Dijkstra's Banker's Algorithm",
    "definition": "The Banker's Algorithm (Edsger Dijkstra, 1965) is a classic deadlock avoidance algorithm for systems with multiple instances of each resource type. It tests for safety by simulating the allocation for predetermined maximum possible amounts of all resources, verifying if a Safe Sequence exists.",
    "keyRule": "Need = Max - Allocation. If Need <= Available, execute process and Available += Allocation.",
    "keyPoints": [
      "Complexity: O(m * n^2) where n=processes, m=resource types.",
      "Safe State: At least one safe sequence exists where all processes finish.",
      "Resource Request Algorithm: Temporarily allocate, check safety, commit or rollback.",
      "Available vector grows monotonically during the safety check."
    ],
    "formulas": [
      "Need[i][j] = Max[i][j] - Allocation[i][j]; New_Available = Available + Allocation[i]"
    ],
    "algorithmSteps": [
      "Compute Need: Subtract Allocation matrix from Max matrix for each process.",
      "Match Available: Scan for process whose worst-case needs can be fulfilled by Work vector.",
      "Reclaim Resources: When process finishes, its allocated resources are added back to Work.",
      "Safe Sequence: Order of completed processes forms the guaranteed execution path."
    ],
    "commonTraps": [
      "\u274c Adding Max resources instead of Allocation to Available when process finishes. -> \u2705 When Pi finishes, Available increases by Allocation[i], NOT Max[i].",
      "\u274c Assuming there is only ONE unique safe sequence. -> \u2705 Multiple valid safe sequences often exist for the same system state (e.g. <P1, P3...> or <P3, P1...>).",
      "\u274c Evaluating Need <= Available on a single resource type instead of ALL resource types simultaneously. -> \u2705 The condition must hold for every resource type j: Need[i][j] <= Work[j] for ALL j."
    ]
  },
  "deadlock-detection-recovery": {
    "topicId": "deadlock-detection-recovery",
    "title": "Deadlock Detection & Recovery",
    "definition": "Deadlock Detection is an optimistic strategy where the OS allows resource allocation without restrictions, periodically running a detection algorithm to identify circular waits. Deadlock Recovery is the mechanism to break the detected deadlock via process termination or resource preemption.",
    "keyRule": "Single instance: Cycle in Wait-For Graph = Deadlock. Multi-instance: Run Detection Algorithm.",
    "keyPoints": [
      "Wait-For Graph: O(n^2) cycle detection via DFS/Tarjan.",
      "Detection Matrix: Uses current Request matrix instead of Max matrix.",
      "Recovery strategies: Process termination (abort one-by-one) or Resource preemption with rollback.",
      "Starvation avoidance: Factor rollback count into victim selection cost function."
    ],
    "formulas": [
      "If Request_i <= Work, set Work = Work + Allocation_i, Finish_i = true. If any Finish_i == false => DEADLOCK."
    ],
    "algorithmSteps": [
      "Graph Construction: Maintain active process wait-for edges in kernel state table.",
      "Cycle Check: Periodically run Depth-First Search for back-edges.",
      "Victim Selection: Pick process with lowest cost / runtime to terminate.",
      "Rollback: Restore victim process to earlier checkpoint and release locks."
    ],
    "commonTraps": [
      "\u274c Believing a cycle in a Resource Allocation Graph ALWAYS means deadlock. -> \u2705 In multi-instance resources, a cycle is a NECESSARY but NOT SUFFICIENT condition for deadlock.",
      "\u274c Always choosing to abort ALL deadlocked processes simultaneously. -> \u2705 This is overkill and causes immense re-computation costs; abort one victim at a time until the cycle breaks.",
      "\u274c Ignoring Starvation during victim selection. -> \u2705 If cost-metric victim selection always chooses the same process, that process starves."
    ]
  },
  "fragmentation-allocation-strategies": {
    "topicId": "fragmentation-allocation-strategies",
    "title": "Memory Allocation Strategies & Fragmentation",
    "definition": "Contiguous memory allocation assigns processes to contiguous memory holes. The 4 classical strategies are First Fit, Best Fit, Worst Fit, and Next Fit. Fragmentation is the wasted memory phenomenon categorized into Internal Fragmentation (wasted inside allocated partition) and External Fragmentation (wasted total free space fragmented into useless small holes).",
    "keyRule": "First Fit: Fastest. Best Fit: Smallest suitable hole. Worst Fit: Largest hole. Paging: Eliminates external fragmentation.",
    "keyPoints": [
      "Internal Fragmentation: Wasted space inside allocated partition (Paging/Fixed).",
      "External Fragmentation: Free space exists in total, but no single hole is big enough (Segmentation/Variable).",
      "Compaction: Defragments memory by shifting occupied blocks, requires dynamic relocation.",
      "Buddy System: Fast power-of-2 allocation technique balancing internal and external fragmentation."
    ],
    "formulas": [
      "Internal Fragmentation = Partition Size - Process Size; External = Sum of free holes (when request > any single hole)"
    ],
    "algorithmSteps": [
      "Memory Request: Process asks for S kilobytes of contiguous RAM.",
      "Hole Search: Traverse linked list of free memory blocks.",
      "Partition Split: Split chosen hole into allocated block and smaller residual free hole.",
      "List Update: Update free list pointers and bounds registers."
    ],
    "commonTraps": [
      "\u274c Assuming Best Fit is always faster and produces less fragmentation than First Fit. -> \u2705 First Fit is generally faster because it stops searching at the first match. Best Fit must search the ENTIRE list unless sorted by size.",
      "\u274c Confusing Internal Fragmentation with External Fragmentation. -> \u2705 Internal is inside an allocated block (fixed partitions/paging). External is between blocks (variable partitions).",
      "\u274c Believing Compaction is free and can be executed at any time. -> \u2705 Compaction requires copying megabytes/gigabytes of RAM and is only possible if address binding is dynamic (execution time)."
    ]
  },
  "paging-page-tables": {
    "topicId": "paging-page-tables",
    "title": "Paging and Page Tables",
    "definition": "Paging is a memory management scheme that eliminates the need for contiguous allocation of physical memory. Logical memory is divided into fixed-size blocks called Pages, and physical memory is divided into blocks of the same size called Frames. The Page Table maps logical Page Numbers (p) to physical Frame Numbers (f).",
    "keyRule": "Logical Address = [ Page Number (p) | Offset (d) ]. Physical Address = [ Frame Number (f) | Offset (d) ].",
    "keyPoints": [
      "Page size is always a power of 2 (e.g. 4KB = 2^12 bytes => 12 offset bits).",
      "Paging eliminates External Fragmentation, but has Internal Fragmentation on the last page.",
      "Page Table Entry includes: Frame number, Valid/Invalid, Dirty, Referenced, Protection bits.",
      "Offset d never changes during translation."
    ],
    "formulas": [
      "Offset bits d = log2(Page Size); Page bits p = Logical Address bits - d; Page Table Size = 2^p * PTE Size"
    ],
    "algorithmSteps": [
      "Address Split: Offset bits d = log2(page_size); remaining bits = page number p.",
      "Table Lookup: Base register (CR3 / PTBR) points to start of Page Table in RAM.",
      "Frame Retrieval: Read frame number f and access control bits (R/W, Valid, Dirty).",
      "Bus Fetch: Send physical address (f || d) to memory controller."
    ],
    "commonTraps": [
      "\u274c Altering the Offset (d) during address translation. -> \u2705 The Offset d is NEVER modified during paging translation; it is copied bit-for-bit directly from logical to physical address.",
      "\u274c Believing a 4MB page table is small and harmless. -> \u2705 If 100 processes run simultaneously, 4MB * 100 = 400MB of physical RAM is consumed JUST for page tables! This requires Hierarchical Paging or Inverted Page Tables.",
      "\u274c Confusing Virtual Memory size with Physical RAM size. -> \u2705 Virtual address space is determined solely by CPU address bus bits (32-bit CPU = 4GB virtual space), regardless of whether the PC has 512MB or 16GB of physical RAM."
    ]
  },
  "segmentation": {
    "topicId": "segmentation",
    "title": "Memory Segmentation",
    "definition": "Segmentation is a memory management scheme that supports the user's view of memory. A program is viewed as a collection of variable-length logical units called Segments (e.g., Code segment, Stack segment, Data segment, Subroutines, Symbol table). The Segment Table maps logical address <s, d> to physical memory.",
    "keyRule": "Condition for valid access: Offset < Limit. Physical Address = Base + Offset.",
    "keyPoints": [
      "User-centric logical view: Code, Stack, Data, Heap.",
      "Segment Table stores Base (physical start) and Limit (length).",
      "Offset >= Limit triggers hardware SIGSEGV (Segmentation Fault).",
      "Suffers from External Fragmentation; solved by Paged Segmentation."
    ],
    "formulas": [
      "Physical Address = Base + Offset (Condition: 0 <= Offset < Limit)"
    ],
    "algorithmSteps": [
      "Index Table: Segment number s indexes into the Segment Table.",
      "Limit Validation: Hardware comparator validates that offset d does not overflow segment size.",
      "Base Addition: Physical base address is added to offset d.",
      "Memory Fetch: Fetch target memory byte from RAM."
    ],
    "commonTraps": [
      "\u274c Assuming Offset bits in segmentation have a fixed bit width like in paging. -> \u2705 In segmentation, segments have variable lengths; the offset length depends on the segment limit.",
      "\u274c Claiming Segmentation eliminates External Fragmentation. -> \u2705 Segmentation SUFFERS from External Fragmentation because segments of varying sizes are allocated contiguously.",
      "\u274c Confusing Base addition in segmentation with Frame concatenation in paging. -> \u2705 In paging: Frame and Offset are concatenated (bitwise OR). In segmentation: Base and Offset are ARITHMETICALLY ADDED."
    ]
  },
  "virtual-memory-demand-paging": {
    "topicId": "virtual-memory-demand-paging",
    "title": "Virtual Memory and Demand Paging",
    "definition": "Virtual Memory is a storage allocation scheme that allows the execution of processes that are not completely loaded in physical RAM. Demand Paging is the mechanism of loading a page into physical memory ONLY when it is referenced during execution (lazy swapper).",
    "keyRule": "Demand Paging loads pages only when referenced. High page fault rate causes Thrashing.",
    "keyPoints": [
      "Page Fault: MMU traps to OS when Valid Bit = 0.",
      "6-step handler: Trap -> Check validity -> Free frame -> Read disk -> Update table -> Restart.",
      "Thrashing: CPU utilization drops while disk paging queue saturates.",
      "Fix for thrashing: Suspend processes to reduce degree of multiprogramming."
    ],
    "formulas": [
      "EAT = (1 - p) * ma + p * (Page Fault Service Time)"
    ],
    "algorithmSteps": [
      "Hardware Trap: MMU catches invalid bit and switches CPU to kernel mode.",
      "Locate Free Frame: Check OS free-frame list; if none free, invoke Page Replacement.",
      "Disk I/O: DMA transfers 4KB page from SSD swap file into physical RAM frame.",
      "Instruction Restart: Reset program counter and re-execute instruction that triggered the fault."
    ],
    "commonTraps": [
      "\u274c Thinking Page Fault means a fatal program crash. -> \u2705 A Page Fault is a standard hardware exception that the OS handles seamlessly in the background to load data.",
      "\u274c Believing adding more physical RAM always cures Thrashing. -> \u2705 Adding RAM helps, but if multiprogramming degree increases without bounds, thrashing returns. Local page replacement and working set controls are mandatory.",
      "\u274c Neglecting instruction restart difficulties in CISC CPUs. -> \u2705 Instructions like block-copy (MVC) can modify memory and fault midway, requiring architectural microcode rollback."
    ]
  },
  "page-replacement-algorithms": {
    "topicId": "page-replacement-algorithms",
    "title": "Page Replacement Algorithms",
    "definition": "When a page fault occurs and all physical memory frames are occupied, the OS must select an existing victim frame to evict to disk swap. Page Replacement Algorithms decide WHICH page to evict. The primary algorithms are FIFO (First-In, First-Out), Optimal (OPT / MIN), LRU (Least Recently Used), and Clock / Second-Chance.",
    "keyRule": "Optimal: Look farthest into future. LRU: Look farthest into past. FIFO: Evict oldest arrival.",
    "keyPoints": [
      "Optimal (OPT): Lowest theoretical fault rate, impossible in practice (benchmark only).",
      "LRU: Stack algorithm, immune to Belady's Anomaly, approximated by Clock/Second-Chance.",
      "FIFO: Queue-based, simple, suffers from Belady's Anomaly.",
      "Clock Algorithm: Circular scan clearing reference bits; gives 1 second chance."
    ],
    "formulas": [
      "Fault Rate = Faults / Total References; Hit Ratio = 1 - Fault Rate"
    ],
    "algorithmSteps": [
      "Check Frame Hits: Hardware scans active frames for match.",
      "Victim Selection: Run FIFO pointer, LRU stack, or Clock hand search.",
      "Dirty Writeback: If victim was modified, flush to swap file.",
      "Load New Page: Read incoming page into evicted frame slot."
    ],
    "commonTraps": [
      "\u274c Believing that LRU can suffer from Belady's Anomaly. -> \u2705 LRU is a mathematically proven Stack Algorithm and CANNOT suffer from Belady's Anomaly.",
      "\u274c Assuming Optimal Page Replacement can be implemented in a general-purpose OS. -> \u2705 Optimal requires knowing future references, which is impossible for interactive operating systems. It serves only as a benchmark.",
      "\u274c Ignoring the Dirty (Modified) Bit during page eviction. -> \u2705 Evicting a clean page costs 0 disk writes (discard immediately); evicting a dirty page requires 1 disk write (flush to swap)."
    ]
  },
  "tlb-effective-access-time": {
    "topicId": "tlb-effective-access-time",
    "title": "a TLB and Effective Access Time (EAT)",
    "definition": "A Translation Lookaside Buffer (TLB) is a high-speed associative hardware cache built directly into the MMU to store recent virtual-to-physical address mappings. Effective Access Time (EAT) is the weighted average time required to access a memory location, accounting for TLB hits, TLB misses, and multi-level page table traversals.",
    "keyRule": "EAT = h * (Hit Time) + (1 - h) * (Miss Time). On miss, traverse page table(s) + fetch data.",
    "keyPoints": [
      "TLB is an associative hardware cache inside the MMU.",
      "Hit: tlb + ma. Miss (single level): tlb + 2*ma. Miss (k levels): tlb + (k+1)*ma.",
      "TLB Miss != Page Fault: Miss searches RAM page table; Fault goes to disk swap.",
      "ASID / PCID prevents expensive TLB flushes during context switches."
    ],
    "formulas": [
      "Single Level: EAT = h * (tlb + ma) + (1 - h) * (tlb + 2 * ma); Multi-Level (k levels): EAT = h * (tlb + ma) + (1 - h) * (tlb + (k + 1) * ma)"
    ],
    "algorithmSteps": [
      "Parallel Search: Hardware compares page tag against all TLB lines concurrently.",
      "TLB Hit: Extract frame number directly; zero main memory page table overhead.",
      "TLB Miss: Trap/hardware page table walker traverses PTEs in physical RAM.",
      "TLB Update: Update TLB cache line so subsequent accesses hit."
    ],
    "commonTraps": [
      "\u274c Forgetting that on a TLB miss, the actual data access STILL requires reading RAM. -> \u2705 On a miss in single-level paging, total memory accesses = 2 (1 for Page Table + 1 for Data).",
      "\u274c Neglecting the TLB lookup time in the miss formula. -> \u2705 A miss takes tlb_time + (k + 1) * ma (or tlb_time + k * ma if parallel search is assumed; read exam specification carefully).",
      "\u274c Assuming TLB misses trigger a disk read. -> \u2705 A TLB miss merely means the translation wasn't cached in the TLB; the page is almost always already in physical RAM page table."
    ]
  },
  "disk-structure-scheduling": {
    "topicId": "disk-structure-scheduling",
    "title": "Disk Structure and Disk Scheduling",
    "definition": "A magnetic disk consists of platters, tracks, and sectors spun on a spindle. Disk Scheduling algorithms decide the order in which pending I/O requests are serviced by the read/write head to minimize Seek Time. The classic algorithms are FCFS, SSTF (Shortest Seek Time First), SCAN (Elevator), C-SCAN (Circular SCAN), LOOK, and C-LOOK.",
    "keyRule": "SCAN/C-SCAN go to the physical disk boundary (0 or Max). LOOK/C-LOOK stop at the last request.",
    "keyPoints": [
      "Total Access Time = Seek Time + Rotational Latency + Transfer Time.",
      "Rotational Latency = 0.5 * (60 / RPM) seconds.",
      "SSTF: Shortest seek distance, but risks starvation.",
      "C-LOOK: Services in one direction only, returns to smallest request without servicing.",
      "SSDs do not use disk scheduling algorithms due to zero seek time."
    ],
    "formulas": [
      "Total Head Movement = sum(|Current_Head - Next_Target|)"
    ],
    "algorithmSteps": [
      "Queue Ordering: Sort queue according to current head position and algorithm rules.",
      "Head Movement: Actuator arm sweeps to target cylinder track.",
      "Sector Read: Wait for sector to spin beneath read head and transfer bits.",
      "Repeat: Advance to next scheduled request in sequence."
    ],
    "commonTraps": [
      "\u274c Travelling all the way to 0 or Max_Cylinder (e.g. 199) in LOOK or C-LOOK. -> \u2705 LOOK and C-LOOK only go as far as the FINAL REQUEST in that direction; they NEVER touch cylinder 0 or 199 unless explicitly requested.",
      "\u274c Counting head movement during the return jump in C-SCAN or C-LOOK as 0. -> \u2705 The return jump moves the physical arm from the highest request to the lowest request; this distance MUST be added to total head movement.",
      "\u274c Claiming SSTF is optimal and fair. -> \u2705 SSTF can cause severe Starvation for requests far away from the head if a steady stream of close requests keeps arriving."
    ]
  },
  "deadlock-fundamentals": {
    "topicId": "deadlock-fundamentals",
    "title": "a Deadlock",
    "definition": "A Deadlock is a permanent freeze condition in which a set of concurrent processes are blocked forever because every process holds at least one resource and waits to acquire another resource held by another process in the set.",
    "keyRule": "Deadlock requires all 4 Coffman conditions. Break 1 condition = 0 deadlocks.",
    "keyPoints": [
      "4 Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.",
      "Single-instance RAG: Cycle <=> Deadlock.",
      "Multi-instance RAG: Cycle is a necessary condition, but NOT sufficient.",
      "Banker's Formula: Need = Max - Allocation. If Need <= Available, execute and add Allocation.",
      "Safe State guarantees at least one safe sequence exists."
    ],
    "formulas": [
      "Need Matrix = Max Matrix - Allocation Matrix\nSafety Check: If Need_i <= Available, Process i executes and releases: Available = Available + Allocation_i"
    ],
    "algorithmSteps": [
      "Mutual Exclusion: Only one process can use resource at a time (e.g. Mutex).",
      "Hold & Wait: Process holds lock R1 while requesting lock R2.",
      "No Preemption: OS will not snatch R1 from Process until it finishes.",
      "Circular Wait: Cycle of requests and allocations forms an unbreakable ring."
    ],
    "commonTraps": [
      "\u274c Assuming a cycle in a Resource Allocation Graph ALWAYS implies deadlock -> \u2705 A cycle guarantees deadlock ONLY if all resources have single instances. With multiple instances per resource, a cycle does NOT guarantee deadlock because an unaffected process may release instances.",
      "\u274c Equating Unsafe State with Deadlock -> \u2705 An Unsafe State is NOT guaranteed deadlock; it merely means the OS cannot guarantee avoiding deadlock if all processes simultaneously demand their maximum claims.",
      "\u274c Thinking Deadlock Prevention and Deadlock Avoidance are identical -> \u2705 Prevention invalidates 1 of 4 conditions statically at design time (e.g. lock ordering). Avoidance tracks runtime state dynamically using Banker's algorithm."
    ]
  },
  "main-memory-allocation": {
    "topicId": "main-memory-allocation",
    "title": "Virtual Memory & Paging",
    "definition": "Paging is a memory management scheme that eliminates the need for contiguous allocation of physical memory by dividing logical memory into fixed-size Pages and physical RAM into Frames of the same size.",
    "keyRule": "Paging cures External Fragmentation. Stack algorithms (LRU, Optimal) never suffer Belady's Anomaly.",
    "keyPoints": [
      "Page Size = Frame Size (typically 4 KB = 2^12 bytes).",
      "Offset bits d = log2(Page Size). Remaining bits = Page Number p.",
      "Physical Address = (Frame Number * Page Size) + Offset.",
      "Internal fragmentation occurs only on the last page (average = Page Size / 2).",
      "EAT = h * (c + m) + (1 - h) * (c + 2m)."
    ],
    "formulas": [
      "Offset Bits = log2(Page Size)\nPage Number Bits = Address Bits - Offset Bits\nEAT = h * (c + m) + (1 - h) * (c + 2*m)"
    ],
    "algorithmSteps": [
      "Address Split: Given page size 4KB (2^12), lowest 12 bits are offset (d); remaining bits are page number (p).",
      "Table Lookup: Index into Page Table at row p to read Frame Number f and valid bit.",
      "Frame Concat: Physical Frame Number combined with unchanged Offset d to access RAM."
    ],
    "commonTraps": [
      "\u274c Confusing Page Fault with Segmentation Fault -> \u2705 A Page Fault is a normal hardware interrupt when a valid page is on disk instead of RAM. A Segmentation Fault (SIGSEGV) is an illegal memory access violation (e.g. dereferencing NULL or writing to read-only code).",
      "\u274c Believing Belady's Anomaly occurs in LRU and Optimal algorithms -> \u2705 Belady's Anomaly (more frames resulting in MORE page faults) occurs ONLY in FIFO. Stack algorithms like LRU and Optimal are mathematically immune to Belady's Anomaly.",
      "\u274c Forgetting that single-level page tables for 32-bit systems require 4MB of RAM per process -> \u2705 2^20 pages * 4 bytes per PTE = 4 MB per page table. For 100 processes, that is 400 MB wasted! This is why modern OS uses Multi-Level Paging or Inverted Page Tables."
    ]
  },
  "file-systems-allocation": {
    "topicId": "file-systems-allocation",
    "title": "a File System & Inode",
    "definition": "A File System is the OS subsystem that translates abstract file operations (open, read, write) into physical block reads/writes on non-volatile secondary storage (SSDs, HDDs).",
    "keyRule": "Inodes store metadata and block pointers; Directories map filenames to Inode numbers.",
    "keyPoints": [
      "Inode contains permissions, size, timestamps, and 15 block pointers (Direct, Single, Double, Triple).",
      "Disk Scheduling: LOOK stops at highest request; SCAN goes all the way to disk edge (199).",
      "C-SCAN only services requests in one direction, returning to start.",
      "Hard Link shares Inode; Soft Link stores target path string.",
      "Contiguous allocation has external fragmentation; Indexed allocation (Inodes) eliminates it."
    ],
    "formulas": [
      "Total Head Movement = Sum of |Current Cylinder - Next Cylinder|"
    ],
    "algorithmSteps": [
      "Direct Access: First 12 blocks read in 1 disk operation each.",
      "Indirect Expansion: Large files expand dynamically into indirect pointer trees.",
      "No Reallocation: Files can grow to gigabytes without moving existing blocks."
    ],
    "commonTraps": [
      "\u274c Confusing Hard Link with Soft (Symbolic) Link -> \u2705 A Hard Link points directly to the SAME Inode number (cannot cross filesystems; deleting original file keeps data intact). A Soft Link is a separate file containing the PATH string of the target (can cross filesystems; deleting original creates a broken link).",
      "\u274c Assuming SCAN and LOOK both visit the end of the disk (cylinder 0 and 199) -> \u2705 SCAN travels all the way to the boundary cylinder (0 or 199) regardless of whether a request exists there. LOOK reverses immediately after servicing the final pending request in that direction.",
      "\u274c Thinking file content is deleted when rm is called -> \u2705 rm only removes the directory entry and decrements the inode link count. If another process holds the file open, blocks remain allocated until the file descriptor is closed."
    ]
  }
};

/**
 * Accessor returning concise summary notes for any topic ID or alias
 */
export function getOSTopicSummary(topicId) {
  if (!topicId) return OS_SUMMARY_NOTES_DATA['intro-to-os'];
  const clean = String(topicId).toLowerCase().trim().replace(/_/g, '-');

  if (OS_SUMMARY_NOTES_DATA[clean]) {
    return OS_SUMMARY_NOTES_DATA[clean];
  }

  // Alias fallback
  const aliasMap = {
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
  };

  const mapped = aliasMap[clean];
  if (mapped && OS_SUMMARY_NOTES_DATA[mapped]) {
    return OS_SUMMARY_NOTES_DATA[mapped];
  }

  return OS_SUMMARY_NOTES_DATA['intro-to-os'];
}
