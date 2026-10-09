/**
 * MASTER OPERATING SYSTEMS (OS) PRACTICE QUESTIONS
 * 
 * Comprehensive question bank covering ALL 30 canonical OS syllabus topics
 * across all 7 domains: MCQs, conceptual, trace, numerical, and placement-style.
 * Total questions: 30
 */

export const OS_PRACTICE_QUESTIONS = [
  {
    "id": "q-os-1",
    "topicId": "intro-to-os",
    "domainId": "fundamentals",
    "domainName": "Domain 1 \u2014 OS Fundamentals",
    "type": "conceptual",
    "difficulty": "Easy",
    "company": "Infosys",
    "question": "Which of the following describes the dual operational role of an Operating System?",
    "options": [
      "Compiler and Interpreter",
      "Extended Machine (Abstraction) and Resource Allocator",
      "Hardware Controller and Network Gateway",
      "File Compressor and Thread Dispatcher"
    ],
    "correctAnswer": 1,
    "explanation": "An OS provides user abstractions (Extended Machine) and arbitrates hardware devices among concurrent programs (Resource Allocator)."
  },
  {
    "id": "q-os-2",
    "topicId": "os-services-system-calls",
    "domainId": "fundamentals",
    "domainName": "Domain 1 \u2014 OS Fundamentals",
    "type": "placement",
    "difficulty": "Medium",
    "company": "Amazon",
    "question": "In Linux, how does a user-space program request a privileged OS service from the kernel?",
    "options": [
      "By directly invoking the function pointer to sys_call in Ring 0",
      "By executing a software interrupt or trap instruction (e.g., syscall / int 0x80)",
      "By modifying the Program Counter to point to low RAM address 0x0000",
      "By setting the CPU mode bit in user registers"
    ],
    "correctAnswer": 1,
    "explanation": "Software traps (syscall) cause an atomic hardware switch from User Mode (Ring 3) to Kernel Mode (Ring 0) via predefined interrupt vectors."
  },
  {
    "id": "q-os-3",
    "topicId": "os-structures-architectures",
    "domainId": "fundamentals",
    "domainName": "Domain 1 \u2014 OS Fundamentals",
    "type": "conceptual",
    "difficulty": "Medium",
    "company": "Google",
    "question": "What is the primary architectural advantage of a Microkernel over a Monolithic Kernel?",
    "options": [
      "Faster execution speed for file I/O operations",
      "Fault isolation, high modularity, and a smaller Trusted Computing Base (TCB)",
      "Zero context switches during system calls",
      "Automatic elimination of CPU paging"
    ],
    "correctAnswer": 1,
    "explanation": "Microkernels move drivers and filesystems to user space; a driver crash does not crash the entire operating system."
  },
  {
    "id": "q-os-4",
    "topicId": "interrupts-traps-dual-mode",
    "domainId": "fundamentals",
    "domainName": "Domain 1 \u2014 OS Fundamentals",
    "type": "conceptual",
    "difficulty": "Medium",
    "company": "Microsoft",
    "question": "Which of the following events is an asynchronous hardware interrupt rather than a synchronous trap?",
    "options": [
      "Division by zero error",
      "System call (read())",
      "Page fault exception",
      "Keyboard keypress or NIC network packet arrival"
    ],
    "correctAnswer": 3,
    "explanation": "External hardware events (keystrokes, NIC packet arrivals, timer ticks) generate asynchronous hardware interrupts."
  },
  {
    "id": "q-os-5",
    "topicId": "processes-process-states",
    "domainId": "processes",
    "domainName": "Domain 2 \u2014 Processes & Threads",
    "type": "trace",
    "difficulty": "Easy",
    "company": "TCS",
    "question": "When a running process issues a blocking disk I/O request, what is its state transition?",
    "options": [
      "Running -> Ready",
      "Running -> Waiting (Blocked)",
      "Waiting -> Ready",
      "Running -> Terminated"
    ],
    "correctAnswer": 1,
    "explanation": "A process yielding the CPU while waiting for an external event transitions from Running to Waiting."
  },
  {
    "id": "q-os-6",
    "topicId": "pcb-context-switching",
    "domainId": "processes",
    "domainName": "Domain 2 \u2014 Processes & Threads",
    "type": "conceptual",
    "difficulty": "Medium",
    "company": "Cisco",
    "question": "Which of the following data elements is NOT stored in the Process Control Block (PCB)?",
    "options": [
      "Process ID (PID) and Program Counter (PC)",
      "CPU General Registers and Stack Pointer",
      "Local loop counter variables allocated on user stack",
      "Memory management page table base register"
    ],
    "correctAnswer": 2,
    "explanation": "Local variables reside in process user memory (stack/registers), not inside the kernel PCB struct."
  },
  {
    "id": "q-os-7",
    "topicId": "threads-multithreading",
    "domainId": "processes",
    "domainName": "Domain 2 \u2014 Processes & Threads",
    "type": "placement",
    "difficulty": "Medium",
    "company": "Amazon",
    "question": "Which resource is privately owned by each thread within a multi-threaded process?",
    "options": [
      "Heap memory space",
      "Global variable data segment",
      "Open file descriptors",
      "CPU Registers and Call Stack"
    ],
    "correctAnswer": 3,
    "explanation": "Threads share heap, code, data, and open files, but keep private registers, program counter, and stack for independent execution."
  },
  {
    "id": "q-os-8",
    "topicId": "ipc",
    "domainId": "processes",
    "domainName": "Domain 2 \u2014 Processes & Threads",
    "type": "conceptual",
    "difficulty": "Medium",
    "company": "Flipkart",
    "question": "Why is Shared Memory IPC faster than Message Passing IPC?",
    "options": [
      "Shared Memory eliminates all need for synchronization locks",
      "Shared Memory avoids intermediate data copying into kernel address space",
      "Message passing cannot be used between processes on the same machine",
      "Shared Memory is handled exclusively by hardware L1 cache"
    ],
    "correctAnswer": 1,
    "explanation": "Shared memory maps the same physical RAM to both processes, enabling zero-copy data transfer at bus speeds."
  },
  {
    "id": "q-os-9",
    "topicId": "cpu-scheduling-fundamentals",
    "domainId": "scheduling",
    "domainName": "Domain 3 \u2014 CPU Scheduling",
    "type": "numerical",
    "difficulty": "Easy",
    "company": "Wipro",
    "question": "A process arrives at Arrival Time AT=3, starts execution at Start Time ST=5, and finishes at Completion Time CT=12 with Burst Time BT=7. What is its Waiting Time (WT)?",
    "options": [
      "2",
      "5",
      "9",
      "12"
    ],
    "correctAnswer": 0,
    "explanation": "TAT = CT - AT = 12 - 3 = 9. Waiting Time WT = TAT - BT = 9 - 7 = 2."
  },
  {
    "id": "q-os-10",
    "topicId": "fcfs-scheduling",
    "domainId": "scheduling",
    "domainName": "Domain 3 \u2014 CPU Scheduling",
    "type": "conceptual",
    "difficulty": "Easy",
    "company": "Accenture",
    "question": "What is the primary drawback of First-Come, First-Served (FCFS) scheduling?",
    "options": [
      "Frequent context switching overhead",
      "Convoy effect where short I/O bound jobs wait behind long CPU bound jobs",
      "Complex implementation requiring min-heaps",
      "Starvation of high-priority processes"
    ],
    "correctAnswer": 1,
    "explanation": "The Convoy Effect occurs when a CPU-intensive job holds the processor, stalling many short I/O-bound processes."
  },
  {
    "id": "q-os-11",
    "topicId": "sjf-srtf-scheduling",
    "domainId": "scheduling",
    "domainName": "Domain 3 \u2014 CPU Scheduling",
    "type": "numerical",
    "difficulty": "Hard",
    "company": "Microsoft",
    "question": "Processes P1(AT=0, BT=7) and P2(AT=2, BT=4) run under Shortest Remaining Time First (SRTF). At t=2, what is the scheduling decision?",
    "options": [
      "P1 continues executing because non-preemption is enforced",
      "P1 is preempted because P2 remaining burst (4) is less than P1 remaining burst (5)",
      "P2 is rejected and added to the back of the queue",
      "CPU context-switches to an idle state"
    ],
    "correctAnswer": 1,
    "explanation": "At t=2, P1 has executed 2 units (rem 5). P2 arrives with burst 4. Since 4 < 5, P1 is preempted and P2 runs."
  },
  {
    "id": "q-os-12",
    "topicId": "priority-scheduling-algo",
    "domainId": "scheduling",
    "domainName": "Domain 3 \u2014 CPU Scheduling",
    "type": "conceptual",
    "difficulty": "Medium",
    "company": "Adobe",
    "question": "What technique is universally used in priority scheduling to prevent indefinite blocking (starvation)?",
    "options": [
      "Compaction",
      "Aging (gradually increasing the priority of waiting processes)",
      "Belady's technique",
      "Round-robin time slicing only"
    ],
    "correctAnswer": 1,
    "explanation": "Aging increases process priority as it waits in the ready queue, guaranteeing eventual execution."
  },
  {
    "id": "q-os-13",
    "topicId": "round-robin-scheduling",
    "domainId": "scheduling",
    "domainName": "Domain 3 \u2014 CPU Scheduling",
    "type": "placement",
    "difficulty": "Medium",
    "company": "Oracle",
    "question": "What happens if the Time Quantum Q in Round Robin scheduling is set to an extremely large value (Q -> infinity)?",
    "options": [
      "Processor sharing occurs with zero latency",
      "The algorithm degenerates into First-Come, First-Served (FCFS)",
      "Every process encounters a deadlock",
      "Average turnaround time drops to zero"
    ],
    "correctAnswer": 1,
    "explanation": "If Q exceeds the burst of all processes, each process runs to completion on its first turn, behaving like FCFS."
  },
  {
    "id": "q-os-14",
    "topicId": "mlq-mlfq-scheduling",
    "domainId": "scheduling",
    "domainName": "Domain 3 \u2014 CPU Scheduling",
    "type": "conceptual",
    "difficulty": "Medium",
    "company": "Uber",
    "question": "How does Multilevel Feedback Queue (MLFQ) determine process behavior without advance knowledge?",
    "options": [
      "It queries user compiler metadata flags",
      "It observes CPU burst behavior: processes using full quanta are demoted; processes yielding for I/O stay high",
      "It uses Dijkstra's Banker's algorithm",
      "It randomizes priority assignments"
    ],
    "correctAnswer": 1,
    "explanation": "MLFQ dynamically infers process nature: CPU-intensive jobs consume full slices and sink; interactive jobs yield early and stay at high priority."
  },
  {
    "id": "q-os-15",
    "topicId": "sync-critical-section",
    "domainId": "synchronization",
    "domainName": "Domain 4 \u2014 Synchronization",
    "type": "conceptual",
    "difficulty": "Hard",
    "company": "Goldman Sachs",
    "question": "Which of the following is NOT one of the 3 required criteria for a valid solution to the Critical Section problem?",
    "options": [
      "Mutual Exclusion",
      "Progress",
      "Bounded Waiting",
      "Strict Alternation"
    ],
    "correctAnswer": 3,
    "explanation": "Strict Alternation is a flawed mechanism that violates the Progress criterion."
  },
  {
    "id": "q-os-16",
    "topicId": "mutex-semaphores",
    "domainId": "synchronization",
    "domainName": "Domain 4 \u2014 Synchronization",
    "type": "numerical",
    "difficulty": "Medium",
    "company": "Qualcomm",
    "question": "A counting semaphore S is initialized to 7. A sequence of 15 wait(S) and 10 signal(S) operations is executed. What is the final value of S?",
    "options": [
      "2",
      "-2",
      "7",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "Final value = Initial - wait + signal = 7 - 15 + 10 = 2."
  },
  {
    "id": "q-os-17",
    "topicId": "classical-sync-problems",
    "domainId": "synchronization",
    "domainName": "Domain 4 \u2014 Synchronization",
    "type": "placement",
    "difficulty": "Hard",
    "company": "Morgan Stanley",
    "question": "In the Dining Philosophers problem, what simple asymmetric strategy prevents circular wait deadlock?",
    "options": [
      "Making all philosophers pick their left chopstick first",
      "An odd-numbered philosopher picks left then right; an even-numbered philosopher picks right then left",
      "Allowing philosophers to eat with only 1 chopstick",
      "Spooling chopsticks to disk"
    ],
    "correctAnswer": 1,
    "explanation": "Asymmetry breaks the circular chain: at least one philosopher will not compete for the same initial chopstick, guaranteeing progress."
  },
  {
    "id": "q-os-18",
    "topicId": "deadlock-fundamentals",
    "domainId": "deadlocks",
    "domainName": "Domain 5 \u2014 Deadlocks",
    "type": "conceptual",
    "difficulty": "Easy",
    "company": "Samsung",
    "question": "What are the 4 Coffman conditions required for a deadlock to occur?",
    "options": [
      "FIFO, LRU, Optimal, Clock",
      "Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait",
      "Paging, Segmentation, TLB, Cache",
      "Read, Write, Execute, Modify"
    ],
    "correctAnswer": 1,
    "explanation": "All four Coffman conditions must hold simultaneously for a deadlock to occur."
  },
  {
    "id": "q-os-19",
    "topicId": "deadlock-prevention-avoidance",
    "domainId": "deadlocks",
    "domainName": "Domain 5 \u2014 Deadlocks",
    "type": "numerical",
    "difficulty": "Medium",
    "company": "Directi",
    "question": "A system has 3 processes, each requiring a maximum of 4 units of resource R. What is the minimum number of units of R to guarantee deadlock will never occur?",
    "options": [
      "9",
      "10",
      "12",
      "13"
    ],
    "correctAnswer": 1,
    "explanation": "Formula: R >= n * (k - 1) + 1 = 3 * (4 - 1) + 1 = 3 * 3 + 1 = 10."
  },
  {
    "id": "q-os-20",
    "topicId": "bankers-algorithm-safe-state",
    "domainId": "deadlocks",
    "domainName": "Domain 5 \u2014 Deadlocks",
    "type": "numerical",
    "difficulty": "Hard",
    "company": "Google",
    "question": "In Banker's algorithm: Process P1 has Max=[5, 3, 2] and Allocation=[2, 1, 1]. Available vector is [2, 1, 1]. Can P1's maximum demand be satisfied immediately?",
    "options": [
      "Yes, because Available matches Allocation",
      "No, because Need = [3, 2, 1] which is greater than Available [2, 1, 1]",
      "Yes, because Need = [2, 1, 1] matches Available",
      "System immediately halts in deadlock"
    ],
    "correctAnswer": 1,
    "explanation": "Need = Max - Allocation = [5-2, 3-1, 2-1] = [3, 2, 1]. Available is [2, 1, 1]. Since Need > Available, P1 cannot finish immediately."
  },
  {
    "id": "q-os-21",
    "topicId": "deadlock-detection-recovery",
    "domainId": "deadlocks",
    "domainName": "Domain 5 \u2014 Deadlocks",
    "type": "conceptual",
    "difficulty": "Medium",
    "company": "Intuit",
    "question": "What is the primary difference between a Resource Allocation Graph (RAG) and a Wait-For Graph (WFG)?",
    "options": [
      "WFG is used for multi-instance resources while RAG is single-instance",
      "WFG collapses all resource nodes, containing only process nodes and dependency edges",
      "WFG detects starvation while RAG detects thrashing",
      "There is no difference"
    ],
    "correctAnswer": 1,
    "explanation": "A Wait-For Graph eliminates resource nodes: a directed edge Pi -> Pj exists if Pi waits for a resource held by Pj."
  },
  {
    "id": "q-os-22",
    "topicId": "main-memory-allocation",
    "domainId": "memory",
    "domainName": "Domain 6 \u2014 Memory Management",
    "type": "numerical",
    "difficulty": "Easy",
    "company": "Cognizant",
    "question": "A system uses base and limit registers. Base = 5000, Limit = 2000. Is logical address 1800 valid, and what is its physical address?",
    "options": [
      "Invalid (Trap)",
      "Valid; Physical Address = 6800",
      "Valid; Physical Address = 7000",
      "Valid; Physical Address = 3200"
    ],
    "correctAnswer": 1,
    "explanation": "1800 < 2000 (Valid). Physical Address = Base + Offset = 5000 + 1800 = 6800."
  },
  {
    "id": "q-os-23",
    "topicId": "fragmentation-allocation-strategies",
    "domainId": "memory",
    "domainName": "Domain 6 \u2014 Memory Management",
    "type": "conceptual",
    "difficulty": "Medium",
    "company": "Paytm",
    "question": "Which dynamic memory allocation strategy searches the entire free list to find the hole with minimum residual size?",
    "options": [
      "First Fit",
      "Best Fit",
      "Worst Fit",
      "Next Fit"
    ],
    "correctAnswer": 1,
    "explanation": "Best Fit allocates the smallest hole that is large enough, which creates tiny residual holes."
  },
  {
    "id": "q-os-24",
    "topicId": "paging-page-tables",
    "domainId": "memory",
    "domainName": "Domain 6 \u2014 Memory Management",
    "type": "numerical",
    "difficulty": "Medium",
    "company": "Amazon",
    "question": "In a 32-bit logical address space with 8KB page size, how many bits are allocated for: 1) Page Offset, 2) Page Number?",
    "options": [
      "Offset = 12 bits, Page = 20 bits",
      "Offset = 13 bits, Page = 19 bits",
      "Offset = 10 bits, Page = 22 bits",
      "Offset = 16 bits, Page = 16 bits"
    ],
    "correctAnswer": 1,
    "explanation": "Page size 8KB = 8 * 1024 = 8192 bytes = 2^13 bytes => Offset = 13 bits. Page Number = 32 - 13 = 19 bits."
  },
  {
    "id": "q-os-25",
    "topicId": "segmentation",
    "domainId": "memory",
    "domainName": "Domain 6 \u2014 Memory Management",
    "type": "conceptual",
    "difficulty": "Medium",
    "company": "Intel",
    "question": "Why does pure Segmentation suffer from External Fragmentation while pure Paging does not?",
    "options": [
      "Segments are fixed size while pages are variable size",
      "Segments are variable-sized contiguous blocks, creating irregular unallocated gaps between allocations",
      "Segmentation uses inverted page tables",
      "Segmentation disables dynamic address binding"
    ],
    "correctAnswer": 1,
    "explanation": "Because segments vary in size to match logical program structures, freeing segments leaves non-uniform holes (external fragmentation)."
  },
  {
    "id": "q-os-26",
    "topicId": "virtual-memory-demand-paging",
    "domainId": "memory",
    "domainName": "Domain 6 \u2014 Memory Management",
    "type": "placement",
    "difficulty": "Hard",
    "company": "Google",
    "question": "What is Thrashing in virtual memory, and what metric reveals it?",
    "options": [
      "High CPU utilization with high disk seek rates",
      "CPU utilization drops to near zero while paging device queue length is saturated",
      "All page tables fitting in the TLB cache",
      "Zero page faults occurring"
    ],
    "correctAnswer": 1,
    "explanation": "Thrashing occurs when processes spend more time swapping pages than executing, leading to collapsed CPU utilization and pegged disk I/O."
  },
  {
    "id": "q-os-27",
    "topicId": "page-replacement-algorithms",
    "domainId": "memory",
    "domainName": "Domain 6 \u2014 Memory Management",
    "type": "placement",
    "difficulty": "Hard",
    "company": "Microsoft",
    "question": "Which of the following page replacement algorithms is a Stack Algorithm and therefore GUARANTEED immune to Belady's Anomaly?",
    "options": [
      "FIFO (First-In, First-Out)",
      "LRU (Least Recently Used)",
      "Second-Chance (Clock)",
      "Random Replacement"
    ],
    "correctAnswer": 1,
    "explanation": "LRU and Optimal are stack algorithms: the set of pages in n frames is always a subset of pages in n+1 frames."
  },
  {
    "id": "q-os-28",
    "topicId": "tlb-effective-access-time",
    "domainId": "memory",
    "domainName": "Domain 6 \u2014 Memory Management",
    "type": "numerical",
    "difficulty": "Medium",
    "company": "NVIDIA",
    "question": "TLB lookup time is 10ns. Main memory access time is 80ns. TLB hit ratio is 90%. What is the Effective Access Time (EAT) for single-level paging?",
    "options": [
      "89ns",
      "98ns",
      "100ns",
      "170ns"
    ],
    "correctAnswer": 1,
    "explanation": "Hit time = 10 + 80 = 90ns. Miss time = 10 + 80 + 80 = 170ns. EAT = 0.90 * 90 + 0.10 * 170 = 81 + 17 = 98ns."
  },
  {
    "id": "q-os-29",
    "topicId": "file-systems-allocation",
    "domainId": "storage",
    "domainName": "Domain 7 \u2014 Storage",
    "type": "placement",
    "difficulty": "Medium",
    "company": "Red Hat",
    "question": "In a Unix Inode file system, why are direct block pointers paired with indirect block pointers?",
    "options": [
      "To force all files to be exactly 4KB",
      "To provide fast O(1) access for small files without consuming memory for large multi-level pointer trees",
      "To encrypt root user passwords",
      "To eliminate the Virtual File System abstraction"
    ],
    "correctAnswer": 1,
    "explanation": "Most files on a filesystem are tiny; direct pointers keep small file access blazing fast while indirect pointers support multi-gigabyte files."
  },
  {
    "id": "q-os-30",
    "topicId": "disk-structure-scheduling",
    "domainId": "storage",
    "domainName": "Domain 7 \u2014 Storage",
    "type": "numerical",
    "difficulty": "Medium",
    "company": "Western Digital",
    "question": "Disk head is at cylinder 50. Requests are 60 and 40. Using SSTF, what is the total head movement?",
    "options": [
      "10 cylinders",
      "30 cylinders",
      "50 cylinders",
      "60 cylinders"
    ],
    "correctAnswer": 1,
    "explanation": "From 50, either 40 or 60 is distance 10. Service 60 (movement 10), then service 40 (|60 - 40| = 20). Total = 10 + 20 = 30 cylinders."
  }
];

/**
 * Accessor returning questions filtered by topic or domain
 */
export function getOSPsectionQuestions(topicId, domainId) {
  if (topicId) {
    const clean = String(topicId).toLowerCase().trim().replace(/_/g, '-');
    const matched = OS_PRACTICE_QUESTIONS.filter(q => q.topicId === clean || q.topicId.includes(clean));
    if (matched.length > 0) return matched;
  }
  if (domainId) {
    const matched = OS_PRACTICE_QUESTIONS.filter(q => q.domainId === domainId);
    if (matched.length > 0) return matched;
  }
  return OS_PRACTICE_QUESTIONS;
}
