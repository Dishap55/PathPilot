false = False
true = True
null = None
# OS 10-Card Suites - Part 2 (Topics 5 - 10 of new topics)

PART2_CARDS = {
    # 6. PCB and Context Switching
    "pcb-context-switching": [
        {
            "cardNumber": 1,
            "badge": "1. Core Definition",
            "title": "What is PCB & Context Switching?",
            "definition": "A Process Control Block (PCB) is the kernel data structure holding all metadata of a process. A Context Switch is the procedure of saving the CPU state of the running process in its PCB and loading another process's PCB.",
            "simpleWords": "The PCB is the ID card and bookmark of a process. When the CPU switches tasks, it bookmarks where it stopped (PCB) so it can resume later without forgetting anything.",
            "whyInOS": "Enables multi-tasking and time-sharing: without saving registers, switching between programs would corrupt calculation values.",
            "keyTerms": ["Process Control Block (PCB)", "Context Switch Latency", "Program Counter (PC)", "Register File", "TLB Flush"]
        },
        {
            "cardNumber": 2,
            "badge": "2. System Necessity",
            "title": "Why is Context Switching Expensive?",
            "problemStatement": "During a context switch, the CPU performs pure operating system overhead: no user program makes any progress.",
            "whatGoesWrong": "If the context switch occurs too frequently (e.g. every 10 microseconds), the CPU spends 90% of its time swapping registers rather than executing useful work (thrashing).",
            "osSolution": "Schedulers tune time slices (e.g., 10-50 ms in desktop OS) so context switch latency accounts for less than 1% of CPU cycles.",
            "realWorldAnalogy": "A chef cooking 5 complex recipes: every time they switch dishes, they must wash tools, clear counter space, and reread recipe notes."
        },
        {
            "cardNumber": 3,
            "badge": "3. Core Mechanism",
            "title": "Hardware Steps in Context Switching",
            "mechanism": "Triggered by timer interrupt or I/O block, the kernel saves the active CPU register file into PCB_A and restores PCB_B into physical CPU registers.",
            "diagramType": "context-switch-flow",
            "stateTransitions": [
                "1. Timer interrupt fires or Process A invokes blocking system call (e.g. read())",
                "2. CPU switches to Kernel Mode (Ring 0)",
                "3. Kernel pushes general registers (RAX, RBX, RCX...) and Program Counter into PCB_A",
                "4. Scheduler selects Process B from the Ready Queue",
                "5. Memory Management Unit (MMU) page table register (CR3 on x86) updated to Process B page directory",
                "6. CPU restores register values from PCB_B into physical hardware registers",
                "7. Executes 'IRET' or 'SYSRET' -> switches to User Mode, jumps to saved PC of Process B"
            ],
            "steps": [
                {"step": 1, "title": "Interrupt Trigger", "desc": "Hardware timer raises IRQ; CPU enters kernel mode."},
                {"step": 2, "title": "Save State A", "desc": "Hardware registers written to PCB memory structure."},
                {"step": 3, "title": "Scheduler Dispatch", "desc": "Queue algorithm selects next eligible process."},
                {"step": 4, "title": "Restore State B", "desc": "Target registers and memory space pointer restored."}
            ]
        },
        {
            "cardNumber": 4,
            "badge": "4. Internal Architecture",
            "title": "Structure of a Process Control Block (PCB)",
            "diagramType": "pcb-structure-diagram",
            "structureDetails": {
                "Process Identification (PID)": "Unique integer assigned by kernel to track process hierarchy.",
                "Process State": "Current execution status: New, Ready, Running, Waiting, or Terminated.",
                "Program Counter (PC)": "Address of the next assembly instruction to execute.",
                "CPU Registers": "Accumulators, index registers, stack pointer (ESP/RSP), and condition codes.",
                "Memory Management Info": "Pointers to page tables, segment tables, and base/limit registers.",
                "Accounting & I/O Info": "Cumulative CPU time used, time limits, open file descriptor table."
            },
            "componentRoles": "The PCB maintains the complete executable environment needed to pause and resume a process safely."
        },
        {
            "cardNumber": 5,
            "badge": "5. Step-by-Step Flow",
            "title": "Context Switch Trace: P1 to P2",
            "scenario": "Process P1 exhausts its time slice; scheduler dispatches Process P2.",
            "challenge": "State must be preserved without losing a single bit of calculation or register status.",
            "flowSteps": [
                {"num": 1, "action": "Timer Tick", "detail": "APIC timer fires interrupt IRQ0."},
                {"num": 2, "action": "Save P1 Context", "detail": "Kernel pushes RAX, RBX, RSP, RBP, RIP to PCB_1."},
                {"num": 3, "action": "State Transition", "detail": "P1 state changed from Running to Ready; enqueued."},
                {"num": 4, "action": "Scheduler Pick", "detail": "Scheduler extracts P2 from head of Ready queue."},
                {"num": 5, "action": "Page Table Swap", "detail": "CR3 register loaded with P2 page table base address (flushes non-global TLB)."},
                {"num": 6, "action": "Restore P2 Context", "detail": "Kernel pops saved registers from PCB_2; CPU resumes P2 at saved RIP."}
            ],
            "resolution": "Process P2 resumes execution from the exact assembly instruction where it was last paused."
        },
        {
            "cardNumber": 6,
            "badge": "6. Technical Walkthrough",
            "title": "Numerical Example: Context Switch CPU Overhead",
            "isNumerical": true,
            "question": "A system has a time quantum Q = 10 ms. Context switch latency is S = 100 microseconds (0.1 ms). Calculate the percentage of CPU time wasted on context switching.",
            "givenData": {
                "Time Quantum (Q)": "10 ms",
                "Context Switch Time (S)": "0.1 ms (100 microseconds)"
            },
            "workedSteps": [
                "1. Total time per scheduling cycle = Quantum + Context Switch Time.",
                "2. Total Cycle = Q + S = 10 ms + 0.1 ms = 10.1 ms.",
                "3. CPU Overhead Fraction = S / (Q + S) = 0.1 / 10.1 = 0.0099 (0.99%).",
                "4. Now consider an extreme case where Q = 0.5 ms: Overhead = 0.1 / (0.5 + 0.1) = 0.1 / 0.6 = 16.67% wasted CPU!",
                "5. If Q = 0.1 ms: Overhead = 0.1 / (0.1 + 0.1) = 50% of CPU time wasted swapping tasks!"
            ],
            "finalAnswer": "Context switch overhead is 0.99% when Q=10ms, but skyrockets to 50% if time quantum is reduced to the context switch duration."
        },
        {
            "cardNumber": 7,
            "badge": "7. Visual Simulation",
            "title": "Context Switching Animation",
            "vfxType": "process-lifecycle-sim",
            "simulationData": {
                "p1": "Running -> Save to PCB 1 -> Ready",
                "cpu": "Direct Register Swap + CR3 Page Table Pointer",
                "p2": "Ready -> Restore from PCB 2 -> Running"
            }
        },
        {
            "cardNumber": 8,
            "badge": "8. Common Pitfalls & Traps",
            "title": "Exam Traps & Beginner Mistakes",
            "traps": [
                {
                    "mistake": "Thinking PCB is stored in the process's own user memory stack.",
                    "reality": "The PCB resides exclusively in protected Kernel Memory to prevent user programs from tampering with their own priority or credentials."
                },
                {
                    "mistake": "Ignoring the indirect cost of a context switch.",
                    "reality": "The direct cost is swapping registers (~1-5 us). The indirect cost is CPU L1/L2 cache invalidation and TLB misses, which degrades memory access speed for thousands of cycles afterwards."
                }
            ]
        },
        {
            "cardNumber": 9,
            "badge": "9. Interview & Placement Angle",
            "title": "Interview Top Questions",
            "interviewQuestions": [
                {
                    "q": "What data is stored in a Process Control Block (PCB)?",
                    "a": "PID, Process State, Program Counter, CPU registers, CPU scheduling info (priority), Memory management info (page tables), Accounting info, and I/O status (open file table)."
                },
                {
                    "q": "Why is thread context switching faster than process context switching?",
                    "a": "Threads in the same process share the same virtual address space. Therefore, a thread context switch does NOT require swapping page tables (CR3 register) or flushing the Translation Lookaside Buffer (TLB)."
                }
            ]
        },
        {
            "cardNumber": 10,
            "badge": "10. Quick Revision Sheet",
            "title": "Cheat Sheet: PCB & Context Switching",
            "cheatSheet": {
                "keyRule": "A context switch saves current CPU registers to PCB_A and restores CPU registers from PCB_B.",
                "coreFormulas": [
                    "CPU Efficiency = Q / (Q + S)",
                    "Direct Latency: Register Save/Restore (~microseconds)",
                    "Indirect Latency: Cache & TLB Cold Misses"
                ]
            },
            "summaryPoints": [
                "PCBs live in protected kernel memory.",
                "Context switch time is pure un-billable system overhead.",
                "Thread switch retains memory mapping; process switch swaps memory address space.",
                "Time quantum must be significantly larger than context switch latency."
            ]
        }
    ],

    # 8. Inter-Process Communication (IPC)
    "ipc": [
        {
            "cardNumber": 1,
            "badge": "1. Core Definition",
            "title": "What is Inter-Process Communication (IPC)?",
            "definition": "Inter-Process Communication (IPC) is the set of programming interfaces and mechanisms provided by the operating system allowing separate processes to share data and synchronize operations.",
            "simpleWords": "Because the OS strictly separates process memory so they don't corrupt each other, processes need special telephone lines (IPC) like pipes, message queues, or shared memory to talk.",
            "whyInOS": "Processes are isolated by default; IPC enables modularity, computation speedup, and client-server architectures.",
            "keyTerms": ["Shared Memory", "Message Passing", "Anonymous Pipe", "Named Pipe (FIFO)", "UNIX Domain Socket"]
        },
        {
            "cardNumber": 2,
            "badge": "2. System Necessity",
            "title": "Why do Processes Need IPC?",
            "problemStatement": "Modern software (like Chrome browser, microservices, database engines) splits work across multiple cooperating processes for crash isolation and security sandboxing.",
            "whatGoesWrong": "Without IPC, processes could only communicate by writing to slow physical disk files, causing massive latency and race condition corruptions.",
            "osSolution": "The kernel provides high-speed in-memory IPC channels: zero-copy Shared Memory and synchronized Message Passing queues.",
            "realWorldAnalogy": "Shared memory is like a shared whiteboard in an office. Message passing is like sending text messages."
        },
        {
            "cardNumber": 3,
            "badge": "3. Core Mechanism",
            "title": "Shared Memory vs Message Passing",
            "mechanism": "Shared memory maps the same physical RAM frame into virtual address spaces of both processes; Message passing routes data packets through kernel buffers.",
            "diagramType": "ipc-shared-memory-flow",
            "stateTransitions": [
                "1. Shared Memory: Process A creates shm segment via shmget()/mmap()",
                "2. Process B attaches to shm segment via shmat()",
                "3. Communication occurs at memory bus speeds with zero kernel intervention",
                "4. Message Passing: Process A calls msgsnd(queue_id, &msg, size)",
                "5. Kernel copies buffer from User Space A into Kernel Buffer",
                "6. Process B calls msgrcv(queue_id, &msg, size) -> Kernel copies data to User Space B"
            ],
            "steps": [
                {"step": 1, "title": "Setup Phase", "desc": "Kernel establishes shared segment or message mailbox."},
                {"step": 2, "title": "Transfer", "desc": "Data written to shared RAM or sent as kernel message."},
                {"step": 3, "title": "Synchronization", "desc": "Semaphores ensure reader doesn't read partial writes."},
                {"step": 4, "title": "Teardown", "desc": "Processes detach; kernel deallocates segment."}
            ]
        },
        {
            "cardNumber": 4,
            "badge": "4. Internal Architecture",
            "title": "UNIX Pipes Architecture",
            "diagramType": "pipe-architecture",
            "structureDetails": {
                "Circular Kernel Buffer": "Typically 64 KB memory ring buffer managed by kernel VFS.",
                "File Descriptors": "Pipe provides two descriptors: fd[0] for read, fd[1] for write.",
                "Blocking Semantics": "Reading from empty pipe blocks reader; writing to full pipe blocks writer.",
                "Atomic Write Limit (PIPE_BUF)": "Writes <= 4096 bytes are guaranteed atomic without interleaving."
            },
            "componentRoles": "Pipes implement the classic producer-consumer stream abstraction between processes."
        },
        {
            "cardNumber": 5,
            "badge": "5. Step-by-Step Flow",
            "title": "Executing 'ls | grep txt' via Pipes",
            "scenario": "A user runs 'ls | grep txt' in the bash shell.",
            "challenge": "Standard output of 'ls' must be piped directly into standard input of 'grep' without temporary disk files.",
            "flowSteps": [
                {"num": 1, "action": "Pipe Creation", "detail": "Shell executes pipe(p_fd); creates kernel buffer with read p_fd[0] and write p_fd[1]."},
                {"num": 2, "action": "Forking Children", "detail": "Shell forks Child 1 (for ls) and Child 2 (for grep)."},
                {"num": 3, "action": "Dup2 Redirection", "detail": "Child 1 calls dup2(p_fd[1], STDOUT_FILENO); Child 2 calls dup2(p_fd[0], STDIN_FILENO)."},
                {"num": 4, "action": "Close Unused FDs", "detail": "Each child closes unused ends of pipe."},
                {"num": 5, "action": "Execve", "detail": "Child 1 runs ls, writes filenames to pipe buffer. Child 2 runs grep, reads from pipe."},
                {"num": 6, "action": "EOF Handling", "detail": "When ls terminates, pipe write end closes; grep receives EOF and terminates."}
            ],
            "resolution": "Data streams seamlessly between independent processes via in-memory kernel ring buffer."
        },
        {
            "cardNumber": 6,
            "badge": "6. Technical Walkthrough",
            "title": "Technical Comparison: IPC Trade-offs",
            "isNumerical": false,
            "question": "Compare Shared Memory vs Message Passing across Speed, Synchronization Responsibility, and Scalability.",
            "givenData": {
                "Shared Memory": "Two processes read and write to same physical RAM addresses.",
                "Message Passing": "Processes send discrete messages routed through kernel mailboxes."
            },
            "workedSteps": [
                "1. Speed: Shared memory is much faster because kernel is bypassed after initial setup (zero-copy memory writes).",
                "2. Synchronization: Shared memory requires programmers to manage synchronization (using mutex/semaphores) to avoid race conditions. Message passing provides built-in kernel synchronization.",
                "3. Safety: Message passing is safer because process address spaces remain completely isolated.",
                "4. Distributed Systems: Message passing scales across physical network machines (e.g. MPI / Sockets); shared memory is restricted to a single host motherboard."
            ],
            "finalAnswer": "Shared memory is optimal for high-throughput local data sharing; message passing is optimal for modular and distributed communication."
        },
        {
            "cardNumber": 7,
            "badge": "7. Visual Architecture",
            "title": "IPC Mechanisms Visualizer",
            "vfxType": "ipc-visual-flow",
            "simulationData": {
                "sharedMem": "Process A <--- Direct RAM Frame ---> Process B (Zero Kernel)",
                "messagePass": "Process A -> [Kernel Buffer / Mailbox] -> Process B (2 Copies)"
            }
        },
        {
            "cardNumber": 8,
            "badge": "8. Common Pitfalls & Traps",
            "title": "Exam Traps & Beginner Mistakes",
            "traps": [
                {
                    "mistake": "Believing anonymous pipes can connect any two random processes on a computer.",
                    "reality": "Anonymous pipes require a common ancestor (parent-child relationship established via fork). For unrelated processes, Named Pipes (FIFOs) or Sockets must be used."
                },
                {
                    "mistake": "Forgetting to close the write end of a pipe in the parent process.",
                    "reality": "If the parent does not close its copy of the write descriptor, the reader will never receive EOF and will hang forever in a blocked read state!"
                }
            ]
        },
        {
            "cardNumber": 9,
            "badge": "9. Interview & Placement Angle",
            "title": "Interview Top Questions",
            "interviewQuestions": [
                {
                    "q": "What is the difference between an Anonymous Pipe and a Named Pipe (FIFO)?",
                    "a": "An anonymous pipe is unnamed and exists only in RAM between related processes that share file descriptors via fork(). A Named Pipe (FIFO) has a path in the file system namespace and allows unrelated processes on the same machine to communicate."
                },
                {
                    "q": "Why is synchronization required when using shared memory?",
                    "a": "Because the kernel does not intermediate reads and writes in shared memory. Without semaphores or mutexes, concurrent updates by two processes will produce race conditions and data corruption."
                }
            ]
        },
        {
            "cardNumber": 10,
            "badge": "10. Quick Revision Sheet",
            "title": "Cheat Sheet: IPC Mechanisms",
            "cheatSheet": {
                "keyRule": "Shared memory delivers maximum speed; message passing provides built-in synchronization.",
                "coreFormulas": [
                    "pipe(fd[2]) -> fd[0] is read, fd[1] is write",
                    "shmget() -> shmat() -> shmdt() -> shmctl()"
                ]
            },
            "summaryPoints": [
                "Anonymous pipes are unidirectional and require parent-child relationship.",
                "Named pipes (FIFOs) appear in the filesystem directory tree.",
                "Message queues store formatted packet structures with priority types.",
                "Sockets provide bidirectional communication across machines via IP/port."
            ]
        }
    ],

    # 14. Multilevel Queue and Multilevel Feedback Queue
    "mlq-mlfq-scheduling": [
        {
            "cardNumber": 1,
            "badge": "1. Core Definition",
            "title": "What are MLQ & MLFQ Schedulers?",
            "definition": "Multilevel Queue (MLQ) partitions the ready queue into discrete priority queues with static assignments. Multilevel Feedback Queue (MLFQ) dynamically moves processes between queues based on observed CPU burst behavior.",
            "simpleWords": "MLQ is like airport boarding lines (First Class, Business, Economy) where you stay in your line. MLFQ is an adaptive system: if you take too long at the counter, you get moved to a slower queue to let quick passengers through.",
            "whyInOS": "Real systems run both interactive tasks (short bursts, need low latency) and batch tasks (long bursts, need throughput) simultaneously.",
            "keyTerms": ["Multilevel Queue (MLQ)", "Multilevel Feedback Queue (MLFQ)", "Time Slice", "Priority Demotion", "Priority Boost / Aging"]
        },
        {
            "cardNumber": 2,
            "badge": "2. System Necessity",
            "title": "Why Simple Schedulers Fail in Real Systems?",
            "problemStatement": "A pure FCFS scheduler ruins interactive user experience (mouse clicks lag). A pure Round Robin scheduler causes excessive context switches for large batch jobs.",
            "whatGoesWrong": "In strict MLQ, if interactive processes keep arriving in Queue 0, processes in lower queues (Queue 1, 2) starve completely.",
            "osSolution": "MLFQ solves this without needing prior knowledge of burst times by observing behavior: I/O-bound jobs stay at top; CPU-bound jobs sink to bottom; aging boosts starving jobs.",
            "realWorldAnalogy": "A hospital triage room: emergency critical trauma patients are treated immediately; stable patients wait, but are never neglected forever."
        },
        {
            "cardNumber": 3,
            "badge": "3. Core Mechanism",
            "title": "The 5 Governing Rules of MLFQ",
            "mechanism": "Designed by Fernando Corbató, MLFQ prioritizes short interactive jobs while preventing starvation using dynamic queue demotion and periodic aging.",
            "diagramType": "mlfq-queue-flow",
            "stateTransitions": [
                "Rule 1: If Priority(A) > Priority(B), Process A runs (B waits).",
                "Rule 2: If Priority(A) == Priority(B), A and B run in Round Robin using queue's time quantum.",
                "Rule 3: When a job enters the system, it is placed in the topmost queue (highest priority).",
                "Rule 4: Once a job uses up its allotted time budget at a given level, it is demoted to the next lower queue.",
                "Rule 5: After some time period S, move ALL jobs in the system to the topmost queue (Priority Boost)."
            ],
            "steps": [
                {"step": 1, "title": "Top Queue Q0", "desc": "Short quantum (e.g. 8 ms). High priority for interactive clicks."},
                {"step": 2, "title": "Middle Queue Q1", "desc": "Medium quantum (e.g. 16 ms). For moderate burst processes."},
                {"step": 3, "title": "Bottom Queue Q2", "desc": "FCFS or large quantum (e.g. 64 ms) for heavy batch computing."},
                {"step": 4, "title": "Aging Reset", "desc": "Periodic timer boosts all tasks back to Q0 to cure starvation."}
            ]
        },
        {
            "cardNumber": 4,
            "badge": "4. Internal Architecture",
            "title": "Anti-Gaming Accounting in MLFQ",
            "diagramType": "mlfq-accounting-architecture",
            "structureDetails": {
                "Primitive MLFQ Vulnerability": "A process could run 99% of its quantum, issue an I/O request, and retain its top queue priority forever (gaming the scheduler).",
                "Solaris / Modern OS Fix": "Keep cumulative time accounting. Once a process consumes its total time allotment at a level (even across multiple yields), demote it.",
                "Queue Quantum Progression": "Top queues have shorter quanta (8 ms); bottom queues have longer quanta (64 ms).",
                "Priority Boost Period (S)": "Guarantees that a CPU-bound job that turns interactive gets a chance to run at high priority."
            },
            "componentRoles": "Cumulative accounting prevents malicious programs from monopolizing high-priority queues."
        },
        {
            "cardNumber": 5,
            "badge": "5. Step-by-Step Flow",
            "title": "Tracing a CPU-Bound Process in MLFQ",
            "scenario": "Process P1 with a long 30 ms CPU burst enters a 3-queue MLFQ (Q0: q=8 ms, Q1: q=16 ms, Q2: FCFS).",
            "challenge": "Observe how MLFQ dynamically discovers that P1 is CPU-bound and demotes it.",
            "flowSteps": [
                {"num": 1, "action": "Entry at Q0", "detail": "P1 arrives; enters Q0 with quantum = 8 ms."},
                {"num": 2, "action": "Q0 Execution", "detail": "P1 executes for full 8 ms. Remaining burst = 30 - 8 = 22 ms."},
                {"num": 3, "action": "Demotion to Q1", "detail": "P1 exhausted Q0 quantum; demoted to Q1 with quantum = 16 ms."},
                {"num": 4, "action": "Q1 Execution", "detail": "P1 runs for full 16 ms in Q1. Remaining burst = 22 - 16 = 6 ms."},
                {"num": 5, "action": "Demotion to Q2", "detail": "P1 exhausted Q1 quantum; demoted to Q2 (FCFS)."},
                {"num": 6, "action": "Completion in Q2", "detail": "P1 runs remaining 6 ms in Q2 and terminates."}
            ],
            "resolution": "Long jobs automatically sink to lower queues, leaving high-priority queues empty for interactive responses."
        },
        {
            "cardNumber": 6,
            "badge": "6. Technical Walkthrough",
            "title": "Numerical Example: MLQ vs MLFQ",
            "isNumerical": true,
            "question": "A system has Q1 (RR q=2 ms) and Q2 (FCFS). P1 (Q1, BT=4) and P2 (Q2, BT=3) arrive at t=0. At t=2, P3 (Q1, BT=2) arrives. Calculate Completion Times if Q1 has absolute priority.",
            "givenData": {
                "Queue 1": "Round Robin (q=2 ms) - Absolute Priority over Q2",
                "Queue 2": "FCFS - Runs only when Q1 is empty",
                "Arrivals": "P1(Q1, AT=0, BT=4), P2(Q2, AT=0, BT=3), P3(Q1, AT=2, BT=2)"
            },
            "workedSteps": [
                "1. t=0 to 2 ms: P1 runs in Q1 for quantum 2 ms. P1 remaining = 2 ms.",
                "2. At t=2 ms: P3 arrives in Q1. Q1 ready queue has [P3, P1].",
                "3. t=2 to 4 ms: P3 runs in Q1 for 2 ms. P3 finishes at t=4 ms! (CT_P3 = 4 ms).",
                "4. t=4 to 6 ms: P1 runs in Q1 for its remaining 2 ms. P1 finishes at t=6 ms! (CT_P1 = 6 ms).",
                "5. t=6 to 9 ms: Q1 is now empty. P2 finally gets CPU from Q2! Runs 3 ms. CT_P2 = 9 ms."
            ],
            "finalAnswer": "CT_P3 = 4 ms, CT_P1 = 6 ms, CT_P2 = 9 ms. Notice P2 was starved until t=6 ms because Q1 had absolute priority."
        },
        {
            "cardNumber": 7,
            "badge": "7. Visual Architecture",
            "title": "MLFQ Queue Migration Visualizer",
            "vfxType": "mlfq-sim",
            "simulationData": {
                "q0": "Q0 (RR q=8ms) -> Exceeded? Demote to Q1",
                "q1": "Q1 (RR q=16ms) -> Exceeded? Demote to Q2",
                "q2": "Q2 (FCFS) -> Batch execution",
                "boost": "Periodic Boost: All jobs reset to Q0"
            }
        },
        {
            "cardNumber": 8,
            "badge": "8. Common Pitfalls & Traps",
            "title": "Exam Traps & Beginner Mistakes",
            "traps": [
                {
                    "mistake": "Confusing Multilevel Queue (MLQ) with Multilevel Feedback Queue (MLFQ).",
                    "reality": "In MLQ, a process is permanently tied to its initial queue. In MLFQ, processes dynamically move between queues."
                },
                {
                    "mistake": "Assuming MLFQ requires knowing the burst time in advance like SJF.",
                    "reality": "MLFQ approximates SJF dynamically based on past history without needing advance burst knowledge."
                }
            ]
        },
        {
            "cardNumber": 9,
            "badge": "9. Interview & Placement Angle",
            "title": "Interview Top Questions",
            "interviewQuestions": [
                {
                    "q": "How does MLFQ prevent process starvation?",
                    "a": "Through Rule 5 (Priority Boost): After a fixed period S, the OS moves all processes from lower queues back to the top queue (Q0), ensuring starved batch jobs get CPU time."
                },
                {
                    "q": "How can a program game a naive MLFQ scheduler, and how is it fixed?",
                    "a": "A program can execute 99% of its quantum and issue an unneeded I/O call to yield the CPU, remaining in Q0 forever. Fixed by cumulative accounting: tracking total CPU time consumed at that priority level."
                }
            ]
        },
        {
            "cardNumber": 10,
            "badge": "10. Quick Revision Sheet",
            "title": "Cheat Sheet: MLQ & MLFQ",
            "cheatSheet": {
                "keyRule": "MLFQ dynamically discovers burst length: interactive jobs stay high; CPU-bound jobs drop low.",
                "coreFormulas": [
                    "Q_top: Short Quantum (High responsiveness)",
                    "Q_bottom: Long Quantum / FCFS (High throughput)",
                    "Priority Boost: Periodic reset to cure starvation"
                ]
            },
            "summaryPoints": [
                "MLQ has fixed queues; MLFQ has adaptive feedback migration.",
                "New jobs start at topmost priority queue.",
                "Exhausting time slice causes demotion to next lower queue.",
                "Modern OS schedulers (Linux CFS, Windows) are inspired by MLFQ concepts."
            ]
        }
    ]
}

print(f"Loaded Part 2 cards: {len(PART2_CARDS)} topics")
