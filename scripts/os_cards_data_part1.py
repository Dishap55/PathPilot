false = False
true = True
null = None
# OS 10-Card Suites - Part 1 (Topics 1 - 10)

PART1_CARDS = {
    # 1. Introduction to Operating Systems
    "intro-to-os": [
        {
            "cardNumber": 1,
            "badge": "1. Core Definition",
            "title": "What is an Operating System?",
            "definition": "An Operating System (OS) is system software that acts as an intermediary between computer hardware and user applications, serving as both an extended machine and resource allocator.",
            "simpleWords": "The OS is the master manager of your computer. Without it, you would have to write raw machine code to operate the screen, keyboard, disk, and CPU.",
            "whyInOS": "Coordinates concurrent access to scarce hardware resources while shielding programmers from low-level register and bus complexities.",
            "keyTerms": ["Kernel", "Bootstrap Loader", "Resource Allocator", "System Call"]
        },
        {
            "cardNumber": 2,
            "badge": "2. System Necessity",
            "title": "Why do Computers Need an OS?",
            "problemStatement": "Without an OS, application programs would have to directly manipulate memory addresses, handle disk seek sectors, and prevent peer programs from overwriting RAM.",
            "whatGoesWrong": "Any buggy program could corrupt kernel memory, steal passwords, or freeze the CPU in an un-interruptible infinite loop.",
            "osSolution": "The OS introduces privileged hardware modes (Ring 0 vs Ring 3), virtual memory isolation, and preemption timers.",
            "realWorldAnalogy": "The OS is like an air traffic control tower: planes (programs) don't negotiate with each other for runways (CPU/RAM); the tower coordinates everything safely."
        },
        {
            "cardNumber": 3,
            "badge": "3. Core Mechanism",
            "title": "How does an OS Boot and Run?",
            "mechanism": "When power turns on, the CPU executes the BIOS/UEFI firmware in ROM, which loads the bootloader from sector 0 of disk, loading the kernel into physical RAM.",
            "diagramType": "os-boot-architecture",
            "stateTransitions": [
                "1. Power On -> CPU initializes in Real Mode (16-bit)",
                "2. BIOS/UEFI POST (Power-On Self-Test) validates RAM, motherboard, disks",
                "3. Master Boot Record (MBR) / EFI partition reads Stage 1 Bootloader (GRUB)",
                "4. Kernel executable (vmlinuz) loaded into high RAM addresses",
                "5. CPU switches to Protected Mode (32-bit) / Long Mode (64-bit)",
                "6. Kernel mounts root file system, spawns PID 1 (systemd/init), enters User Mode"
            ],
            "steps": [
                {"step": 1, "title": "Hardware Init", "desc": "BIOS/UEFI tests hardware registers and memory lines."},
                {"step": 2, "title": "Kernel Load", "desc": "Bootloader transfers kernel code from SSD/disk into RAM."},
                {"step": 3, "title": "Driver Initialization", "desc": "Kernel initializes scheduler, virtual memory, and device drivers."},
                {"step": 4, "title": "Userspace Launch", "desc": "First user process (PID 1) started; system calls enabled."}
            ]
        },
        {
            "cardNumber": 4,
            "badge": "4. Internal Structure",
            "title": "Internal Architecture of an OS",
            "diagramType": "os-kernel-architecture",
            "structureDetails": {
                "Kernel Space (Ring 0)": "Highest privilege mode with unrestricted access to CPU instructions, MMU, and hardware devices.",
                "User Space (Ring 3)": "Restricted execution sandbox where applications run without direct device access.",
                "System Call Interface": "The controlled gateway translating user requests into privileged kernel routines.",
                "Subsystems": "Process Scheduler, Virtual Memory Manager, Virtual File System (VFS), Device Drivers, and Network Stack."
            },
            "componentRoles": "Hardware protection rings guarantee that user code cannot compromise core system stability."
        },
        {
            "cardNumber": 5,
            "badge": "5. Step-by-Step Flow",
            "title": "A Program Execution Lifecycle",
            "scenario": "A student types './my_app' in the terminal and presses Enter.",
            "challenge": "The OS must transform a static ELF executable on disk into an active executing process in RAM.",
            "flowSteps": [
                {"num": 1, "action": "Shell System Call", "detail": "Terminal calls fork() to create child process."},
                {"num": 2, "action": "Execve Invocation", "detail": "Child calls execve('./my_app'), passing executable path."},
                {"num": 3, "action": "Memory Allocation", "detail": "Kernel reads ELF header, maps text, data, BSS, and stack pages."},
                {"num": 4, "action": "Page Table Binding", "detail": "MMU page table initialized with user permissions."},
                {"num": 5, "action": "Entry Point Jump", "detail": "CPU registers loaded, Program Counter set to main(), mode set to Ring 3."},
                {"num": 6, "action": "Process Execution", "detail": "my_app runs instructions concurrently with background system services."}
            ],
            "resolution": "Safe isolation allows multiple programs to run concurrently without memory collisions."
        },
        {
            "cardNumber": 6,
            "badge": "6. Technical Walkthrough",
            "title": "Technical Example: Monolithic vs Microkernel",
            "isNumerical": false,
            "question": "Compare Monolithic Kernel (Linux) vs Microkernel (Mach/QNX) when a device driver crashes.",
            "givenData": {
                "Monolithic Architecture": "VFS, IPC, Memory, Network, and Device Drivers all run inside Ring 0 kernel space.",
                "Microkernel Architecture": "Only IPC, basic scheduling, and virtual memory run in Ring 0. Device drivers and file systems run as user-space daemons."
            },
            "workedSteps": [
                "1. Monolithic: Device driver executes inside Ring 0 with full kernel privileges.",
                "2. A null-pointer dereference in the driver triggers a Kernel Panic, crashing the entire machine (BSOD / Kernel Crash).",
                "3. Microkernel: Device driver runs in user space (Ring 3) communicating via IPC messages.",
                "4. A crash in the driver terminates only that driver daemon. Microkernel restarts the driver daemon; OS never crashes.",
                "5. Tradeoff: Microkernel incurs ~10-20% IPC context-switch latency overhead compared to Monolithic direct function calls."
            ],
            "finalAnswer": "Microkernel achieves superior fault tolerance and security at the cost of IPC message-passing performance."
        },
        {
            "cardNumber": 7,
            "badge": "7. Visual Architecture",
            "title": "OS Layered Architecture Visualizer",
            "vfxType": "os-architecture-flow",
            "simulationData": {
                "layers": ["User Applications", "System Call API", "OS Kernel Subsystems", "Device Drivers & HAL", "Physical Hardware"],
                "securityBoundary": "Ring 3 (User) vs Ring 0 (Kernel)"
            }
        },
        {
            "cardNumber": 8,
            "badge": "8. Common Pitfalls & Traps",
            "title": "Exam Traps & Beginner Mistakes",
            "traps": [
                {
                    "mistake": "Believing the OS kernel runs continuously on a dedicated CPU core.",
                    "reality": "The kernel only executes when an interrupt, exception/trap, or system call pauses the running user thread."
                },
                {
                    "mistake": "Confusing an Operating System with a Graphical User Interface (GUI).",
                    "reality": "The GUI (like GNOME, Windows Explorer) is merely a user-space application communicating with the underlying kernel."
                }
            ]
        },
        {
            "cardNumber": 9,
            "badge": "9. Interview & Placement Angle",
            "title": "Interview Top Questions",
            "interviewQuestions": [
                {
                    "q": "What is the difference between a Monolithic kernel and a Microkernel?",
                    "a": "In a monolithic kernel, all OS services (scheduling, memory, drivers, file systems) reside in kernel space. In a microkernel, only core primitives (IPC, low-level memory, threads) live in kernel space, while drivers and file systems run as user-space servers."
                },
                {
                    "q": "What happens during a computer's bootstrap sequence?",
                    "a": "CPU executes BIOS/UEFI in ROM -> POST hardware validation -> MBR/GPT reads stage 1 bootloader -> Bootloader loads kernel image into RAM -> Kernel initializes subsystems and launches init/systemd (PID 1)."
                }
            ]
        },
        {
            "cardNumber": 10,
            "badge": "10. Quick Revision Sheet",
            "title": "Cheat Sheet: OS Fundamentals",
            "cheatSheet": {
                "keyRule": "An OS is a resource allocator and control program executing between user programs and physical hardware.",
                "coreFormulas": [
                    "User Mode = Ring 3 (Restricted, mode bit = 1)",
                    "Kernel Mode = Ring 0 (Privileged, mode bit = 0)"
                ]
            },
            "summaryPoints": [
                "Kernel is the only program running at all times on the computer.",
                "System calls are software interrupts used to cross from Ring 3 to Ring 0.",
                "Dual mode operation protects hardware and peer processes from crash or takeover.",
                "PID 1 is the ancestor of all userspace processes in modern operating systems."
            ]
        }
    ],

    # 2. OS Services and System Calls
    "os-services-system-calls": [
        {
            "cardNumber": 1,
            "badge": "1. Core Definition",
            "title": "What are System Calls?",
            "definition": "A System Call is the programmatic interface provided by the operating system kernel that allows user-space programs to request privileged kernel operations.",
            "simpleWords": "A system call is the official helpline an application calls when it needs the OS to do something it cannot do alone, like read a file or send data over WiFi.",
            "whyInOS": "Hardware access (disk, network, screen) is restricted to Kernel Mode; system calls ensure safe, validated access.",
            "keyTerms": ["System Call", "POSIX API", "Mode Switch", "sys_call_table", "Trap"]
        },
        {
            "cardNumber": 2,
            "badge": "2. System Necessity",
            "title": "Why Can't User Programs Access Hardware Directly?",
            "problemStatement": "If user programs had direct read/write access to disk sectors, two programs saving files simultaneously would scramble disk sectors and corrupt data.",
            "whatGoesWrong": "Malicious code could read private data pages of peer processes directly from physical memory without access control checks.",
            "osSolution": "The CPU enforces memory segmentation and paging permissions. Ring 3 user code cannot execute privileged I/O instructions (like 'in', 'out', 'cli').",
            "realWorldAnalogy": "A bank vault teller: customers don't walk into the vault to grab money; they hand a deposit slip (system call) to the teller (kernel)."
        },
        {
            "cardNumber": 3,
            "badge": "3. Core Mechanism",
            "title": "How Does a System Call Execute?",
            "mechanism": "The application issues a software interrupt or specialized machine instruction (e.g., 'syscall' on x86-64), switching CPU mode bit from 1 to 0.",
            "diagramType": "system-call-flow",
            "stateTransitions": [
                "1. User calls library function (e.g. read(fd, buf, n))",
                "2. Library places system call number in register (e.g. RAX = 0 for sys_read)",
                "3. Executes 'syscall' instruction -> CPU mode switches to Ring 0",
                "4. Hardware saves user Program Counter and Stack Pointer to kernel stack",
                "5. Kernel looks up function in sys_call_table[RAX] and executes sys_read()",
                "6. Result placed in register (RAX), executes 'sysret' -> returns to User Mode (Ring 3)"
            ],
            "steps": [
                {"step": 1, "title": "API Wrapper", "desc": "C runtime (glibc) sets up registers with arguments."},
                {"step": 2, "title": "Hardware Trap", "desc": "CPU transitions from User Mode to Kernel Mode."},
                {"step": 3, "title": "Kernel Table Lookup", "desc": "sys_call_table indexes handler function."},
                {"step": 4, "title": "Return & Mode Drop", "desc": "Kernel drops privilege back to User Mode."}
            ]
        },
        {
            "cardNumber": 4,
            "badge": "4. Internal Architecture",
            "title": "Parameter Passing Architecture",
            "diagramType": "syscall-parameter-architecture",
            "structureDetails": {
                "CPU Registers": "Fastest method; stores parameters directly in RDI, RSI, RDX, R10, R8, R9 on x86-64.",
                "Memory Block / Table": "Used when parameters exceed register count; address of block passed in register.",
                "System Stack": "Parameters pushed onto user stack and popped off by kernel handler.",
                "sys_call_table": "Array of function pointers indexed by system call opcode."
            },
            "componentRoles": "Registers provide sub-microsecond parameter handoff between user and kernel spaces."
        },
        {
            "cardNumber": 5,
            "badge": "5. Step-by-Step Flow",
            "title": "Tracing 'printf' to Screen Output",
            "scenario": "A program executes printf('Hello OS\\n').",
            "challenge": "printf is a user library function that cannot communicate with the terminal display directly.",
            "flowSteps": [
                {"num": 1, "action": "Buffer Formatting", "detail": "printf formats string into internal user-space buffer."},
                {"num": 2, "action": "write() Invocation", "detail": "Calls write(1, 'Hello OS\\n', 9) where 1 is stdout."},
                {"num": 3, "action": "Opcode Setup", "detail": "Registers loaded: RAX=1 (sys_write), RDI=1, RSI=&buf, RDX=9."},
                {"num": 4, "action": "syscall Trap", "detail": "CPU enters kernel mode; executes sys_write()."},
                {"num": 5, "action": "TTY Driver Output", "detail": "Kernel copies buffer to terminal device buffer."},
                {"num": 6, "action": "Return Value", "detail": "Returns 9 bytes written; CPU returns to user space."}
            ],
            "resolution": "Library functions buffer data to minimize expensive system call context switches."
        },
        {
            "cardNumber": 6,
            "badge": "6. Technical Walkthrough",
            "title": "Technical Example: System Call Overhead",
            "isNumerical": true,
            "question": "A program writes 1 MB of data using write(). Compare elapsed time if writing 1 byte per system call vs 4096 bytes per system call (assume 1 system call takes 1 microsecond).",
            "givenData": {
                "Total Payload": "1 MB = 1,048,576 bytes",
                "System Call Latency": "1 microsecond (1000 ns) per invocation"
            },
            "workedSteps": [
                "1. Case 1 (1 byte per call): Total calls = 1,048,576 invocations.",
                "2. Overhead = 1,048,576 * 1 microsecond = 1.048 seconds of pure CPU mode-switch overhead!",
                "3. Case 2 (4096 bytes per call): Total calls = 1,048,576 / 4096 = 256 invocations.",
                "4. Overhead = 256 * 1 microsecond = 0.000256 seconds (0.25 ms).",
                "5. Speedup factor = 1.048 s / 0.000256 s = 4,096x faster!"
            ],
            "finalAnswer": "Buffered I/O (like stdio fread/fwrite) groups small writes into block-sized chunks to eliminate millions of redundant system call traps."
        },
        {
            "cardNumber": 7,
            "badge": "7. Visual Simulation",
            "title": "System Call Trap Visualizer",
            "vfxType": "syscall-flow",
            "simulationData": {
                "userSpace": "App -> C Library Wrapper -> Load RAX=1",
                "hardwareBoundary": "syscall instruction -> Trap -> Mode Bit 1 -> 0",
                "kernelSpace": "sys_call_table[1] -> sys_write() -> Driver -> sysret"
            }
        },
        {
            "cardNumber": 8,
            "badge": "8. Common Pitfalls & Traps",
            "title": "Exam Traps & Beginner Mistakes",
            "traps": [
                {
                    "mistake": "Thinking library functions like printf() or malloc() are system calls.",
                    "reality": "printf() and malloc() are C library functions. printf calls write(); malloc calls brk() or mmap()."
                },
                {
                    "mistake": "Confusing a context switch with a mode switch.",
                    "reality": "A mode switch (User -> Kernel) changes CPU privilege levels within the same process. A context switch swaps execution from one process to another."
                }
            ]
        },
        {
            "cardNumber": 9,
            "badge": "9. Interview & Placement Angle",
            "title": "Interview Top Questions",
            "interviewQuestions": [
                {
                    "q": "What is the difference between a system call and a library function?",
                    "a": "A system call is handled directly by the OS kernel in Ring 0 to access privileged hardware. A library function runs in user mode Ring 3 and may or may not invoke system calls underneath."
                },
                {
                    "q": "How are parameters passed to a system call in modern architectures?",
                    "a": "On x86-64, parameters are passed in general-purpose registers (RDI, RSI, RDX, R10, R8, R9) with the syscall number in RAX. If parameters exceed available registers, a memory block address is passed."
                }
            ]
        },
        {
            "cardNumber": 10,
            "badge": "10. Quick Revision Sheet",
            "title": "Cheat Sheet: System Calls",
            "cheatSheet": {
                "keyRule": "System calls are the only safe doorway from User Mode into Kernel Mode.",
                "coreFormulas": [
                    "write(fd, buf, count) -> Returns bytes written or -1",
                    "fork() -> Returns 0 in child, child_PID in parent"
                ]
            },
            "summaryPoints": [
                "System calls switch hardware mode bit from 1 (User) to 0 (Kernel).",
                "sys_call_table maps system call numbers to kernel C functions.",
                "Standard C library wraps raw system calls for portability across platforms.",
                "Buffered I/O minimizes system call overhead by batching small byte transfers."
            ]
        }
    ],

    # 3. OS Structures and Architectures
    "os-structures-architectures": [
        {
            "cardNumber": 1,
            "badge": "1. Core Definition",
            "title": "What is OS Structure?",
            "definition": "OS Structure refers to the internal organization and partitioning of kernel software components, defining how subsystems communicate and enforce security boundaries.",
            "simpleWords": "OS structure is the architectural blueprint of the operating system: deciding whether to put everything into one big room (monolithic) or build separate small offices (microkernel).",
            "whyInOS": "Dictates system performance, crash resilience, driver development, and security isolation.",
            "keyTerms": ["Monolithic", "Microkernel", "Layered OS", "Hybrid Kernel", "Modular OS"]
        },
        {
            "cardNumber": 2,
            "badge": "2. System Necessity",
            "title": "Why Does Kernel Architecture Matter?",
            "problemStatement": "An OS kernel manages millions of lines of code. If structured poorly, a single typo in a third-party printer driver can corrupt memory and crash the entire system.",
            "whatGoesWrong": "Monolithic systems risk catastrophic failures when buggy device drivers run in Ring 0.",
            "osSolution": "Architectures balance raw execution speed with isolation: Monolithic maximizes speed; Microkernel maximizes stability; Modular/Hybrid balances both.",
            "realWorldAnalogy": "A submarine with sealed compartments: if one compartment floods (a driver crashes), sealed doors prevent the whole vessel from sinking."
        },
        {
            "cardNumber": 3,
            "badge": "3. Core Mechanism",
            "title": "Comparative Kernel Mechanisms",
            "mechanism": "Monolithic kernels invoke subsystems via fast C function calls; Microkernels communicate via IPC messages exchanged across user-space servers.",
            "diagramType": "kernel-comparison-architecture",
            "stateTransitions": [
                "1. Monolithic: App -> System Call -> Direct function pointer in Ring 0 -> Fast Return",
                "2. Microkernel: App -> IPC to Microkernel -> Microkernel relays to File Server (User Mode)",
                "3. File Server processes request -> Sends reply message back through Microkernel",
                "4. App receives result after multiple context and mode switches"
            ],
            "steps": [
                {"step": 1, "title": "Monolithic Design", "desc": "All drivers, file systems, and scheduler run in Ring 0."},
                {"step": 2, "title": "Microkernel Design", "desc": "Only basic IPC and memory in Ring 0; rest in user servers."},
                {"step": 3, "title": "Hybrid Design", "desc": "Windows and macOS run microkernel structure inside monolithic address space."},
                {"step": 4, "title": "Loadable Kernel Modules", "desc": "Linux loads drivers dynamically without rebooting."}
            ]
        },
        {
            "cardNumber": 4,
            "badge": "4. Internal Architecture",
            "title": "Loadable Kernel Modules (LKM)",
            "diagramType": "lkm-architecture",
            "structureDetails": {
                "Core Kernel": "Lean base image containing fundamental scheduling, memory, and interrupt logic.",
                "Module Loader": "insmod / modprobe utilities that resolve dynamic symbols at runtime.",
                "Symbol Table": "Exported kernel functions (EXPORT_SYMBOL) callable by loaded modules.",
                "Driver Sandboxing": "Hardware modules linked directly into Ring 0 address space on demand."
            },
            "componentRoles": "LKM allows monolithic kernels to add new hardware support without recompiling the operating system."
        },
        {
            "cardNumber": 5,
            "badge": "5. Step-by-Step Flow",
            "title": "Dynamically Loading a USB Driver in Linux",
            "scenario": "A user inserts a USB flash drive into a running Linux computer.",
            "challenge": "The OS must detect the hardware, load the driver module, and mount the filesystem without restarting.",
            "flowSteps": [
                {"num": 1, "action": "USB Bus Interrupt", "detail": "Hardware USB controller detects voltage change, fires IRQ."},
                {"num": 2, "action": "Udev Detection", "detail": "Kernel udev daemon reads device Vendor and Product ID."},
                {"num": 3, "action": "Modprobe Trigger", "detail": "Kernel invokes modprobe usb-storage."},
                {"num": 4, "action": "Dynamic Linking", "detail": "Module object (.ko) linked into running kernel memory."},
                {"num": 5, "action": "Device Registration", "detail": "Driver registers block device /dev/sdb in /dev filesystem."},
                {"num": 6, "action": "VFS Mount", "detail": "User can now read and write files on the flash drive."}
            ],
            "resolution": "Modular kernel combines monolithic speed with microkernel flexibility."
        },
        {
            "cardNumber": 6,
            "badge": "6. Technical Walkthrough",
            "title": "Technical Comparison Matrix",
            "isNumerical": false,
            "question": "Evaluate Monolithic vs Microkernel across Speed, Crash Isolation, Code Size, and Modularity.",
            "givenData": {
                "Monolithic (Linux)": "All services inside Ring 0 kernel space.",
                "Microkernel (QNX, Minix)": "Minimal Ring 0 core; servers run in Ring 3."
            },
            "workedSteps": [
                "1. Speed: Monolithic wins. Subsystems communicate via in-memory C function calls with zero IPC overhead.",
                "2. Crash Isolation: Microkernel wins. A crashed device driver crashes only that user-space daemon; kernel survives.",
                "3. Code Size: Microkernel kernel code is tiny (~10,000 lines vs Linux ~30,000,000 lines), enabling formal mathematical verification.",
                "4. Modularity: Microkernel servers can be upgraded or restarted without touching kernel core."
            ],
            "finalAnswer": "Linux uses a monolithic kernel with Loadable Kernel Modules (LKM); Windows uses a hybrid kernel."
        },
        {
            "cardNumber": 7,
            "badge": "7. Visual Architecture",
            "title": "Monolithic vs Microkernel Architecture",
            "vfxType": "os-architecture-flow",
            "simulationData": {
                "monolithic": "Apps -> [VFS, IPC, Memory, Scheduler, Drivers in Ring 0] -> Hardware",
                "microkernel": "Apps -> [File Server, Driver Server in Ring 3] -> [Microkernel in Ring 0] -> Hardware"
            }
        },
        {
            "cardNumber": 8,
            "badge": "8. Common Pitfalls & Traps",
            "title": "Exam Traps & Beginner Mistakes",
            "traps": [
                {
                    "mistake": "Assuming Windows is a pure microkernel.",
                    "reality": "Windows NT was designed with microkernel principles, but graphics drivers and subsystems were moved into Ring 0 for performance, making it a Hybrid kernel."
                },
                {
                    "mistake": "Thinking Linux requires a full reboot to install new hardware drivers.",
                    "reality": "Linux uses Loadable Kernel Modules (LKMs) that insert and link dynamically at runtime."
                }
            ]
        },
        {
            "cardNumber": 9,
            "badge": "9. Interview & Placement Angle",
            "title": "Interview Top Questions",
            "interviewQuestions": [
                {
                    "q": "Why did Tanenbaum and Torvalds have a famous debate regarding microkernels?",
                    "a": "Tanenbaum argued that monolithic kernels were obsolete due to lack of crash isolation. Linus Torvalds argued that microkernels suffered unacceptable IPC performance penalties for general-purpose OS tasks."
                },
                {
                    "q": "What is a Hybrid Kernel?",
                    "a": "A hybrid kernel adopts microkernel modular design principles (server-like organization) but runs most subsystems in the same kernel address space to avoid IPC context-switch latency."
                }
            ]
        },
        {
            "cardNumber": 10,
            "badge": "10. Quick Revision Sheet",
            "title": "Cheat Sheet: OS Architectures",
            "cheatSheet": {
                "keyRule": "Monolithic = Fast & Unified; Microkernel = Safe & Modular; Hybrid = Practical Engineering Compromise.",
                "coreFormulas": [
                    "Monolithic IPC Cost = ~0 ns (Direct C function call)",
                    "Microkernel IPC Cost = 2x Mode Switch + 2x Context Switch"
                ]
            },
            "summaryPoints": [
                "Linux is a Monolithic kernel enhanced with dynamic Loadable Kernel Modules.",
                "QNX and Minix are true microkernels used in aerospace, medical, and automotive ECUs.",
                "Layered architecture (THE OS) enforces strict one-way downward invocation.",
                "Modern desktop OSes prioritize performance while utilizing module signing for driver safety."
            ]
        }
    ],

    # 4. Interrupts, Traps and Dual Mode
    "interrupts-traps-dual-mode": [
        {
            "cardNumber": 1,
            "badge": "1. Core Definition",
            "title": "What are Interrupts, Traps & Dual Mode?",
            "definition": "An Interrupt is an asynchronous hardware signal notifying the CPU of an event. A Trap is a synchronous software exception. Dual Mode is hardware enforcement of User Mode (Ring 3) vs Kernel Mode (Ring 0).",
            "simpleWords": "An interrupt is a doorbell ringing from hardware. A trap is an alarm going off because a program did something illegal (like divide by zero). Dual mode is the security badge determining where you can go.",
            "whyInOS": "Enables the CPU to multitask without constantly polling slow hardware devices, while preventing software from compromising the computer.",
            "keyTerms": ["Hardware Interrupt", "Trap / Exception", "Interrupt Vector Table", "ISR", "Dual Mode"]
        },
        {
            "cardNumber": 2,
            "badge": "2. System Necessity",
            "title": "Why is Polling Worse than Interrupts?",
            "problemStatement": "Without interrupts, the CPU would have to constantly ask (poll) the keyboard, mouse, and disk in a busy loop: 'Do you have data yet? Do you have data yet?'.",
            "whatGoesWrong": "Polling wastes 99.9% of CPU clock cycles checking idle devices, causing extreme lag and battery drain.",
            "osSolution": "Interrupts let the CPU execute other tasks. When a device is ready, its hardware controller sends an electrical pulse to the CPU Interrupt Request (IRQ) pin.",
            "realWorldAnalogy": "Waiting for a package: Polling is opening your front door every 10 seconds to check. Interrupt is letting the courier ring your doorbell."
        },
        {
            "cardNumber": 3,
            "badge": "3. Core Mechanism",
            "title": "How the Interrupt Vector Table (IVT) Works",
            "mechanism": "When an interrupt occurs, the CPU halts current instruction execution, saves state, and looks up the Interrupt Service Routine (ISR) address in the IVT.",
            "diagramType": "interrupt-vector-table-flow",
            "stateTransitions": [
                "1. Device raises electrical signal on IRQ line -> Advanced Programmable Interrupt Controller (APIC)",
                "2. APIC translates IRQ to Interrupt Vector Number (e.g., Vector 14 for Page Fault)",
                "3. CPU finishes current micro-instruction, pushes EFLAGS, CS, EIP to kernel stack",
                "4. CPU switches mode bit to 0 (Kernel Mode) and masks further interrupts (CLI)",
                "5. CPU jumps to address stored in Interrupt Descriptor Table (IDT) [Vector Number]",
                "6. Interrupt Service Routine (ISR) executes, services hardware, sends End of Interrupt (EOI)",
                "7. Executes 'IRET' instruction -> pops registers, restores User Mode, resumes user program"
            ],
            "steps": [
                {"step": 1, "title": "Hardware Signal", "desc": "Device signals APIC chip via interrupt line."},
                {"step": 2, "title": "State Preservation", "desc": "Hardware pushes PC, stack pointer, and flags."},
                {"step": 3, "title": "ISR Execution", "desc": "OS driver executes specific handler code."},
                {"step": 4, "title": "IRET Return", "desc": "Hardware restores original registers and user mode."}
            ]
        },
        {
            "cardNumber": 4,
            "badge": "4. Internal Architecture",
            "title": "Top Half vs Bottom Half Processing",
            "diagramType": "interrupt-half-architecture",
            "structureDetails": {
                "Top Half (Hard IRQ)": "Time-critical section executed immediately with interrupts disabled. Acknowledges device and saves raw data.",
                "Bottom Half (Soft IRQ / Tasklet)": "Deferred work executed asynchronously with interrupts re-enabled to prevent dropping other hardware events.",
                "Interrupt Vector Table (IVT)": "Memory array mapping 256 vector numbers to 64-bit kernel handler pointers.",
                "Mode Bit": "CPU hardware flip-flop: 0 = Kernel Mode (Ring 0), 1 = User Mode (Ring 3)."
            },
            "componentRoles": "Splitting interrupt handling into Top and Bottom halves prevents hardware latency spikes."
        },
        {
            "cardNumber": 5,
            "badge": "5. Step-by-Step Flow",
            "title": "Handling a Division by Zero Exception",
            "scenario": "A C program executes int x = 5 / 0; in user mode.",
            "challenge": "Division by zero cannot produce a valid mathematical result; hardware arithmetic logic unit (ALU) traps.",
            "flowSteps": [
                {"num": 1, "action": "ALU Trap Generation", "detail": "ALU raises Vector 0 exception (Divide Error)."},
                {"num": 2, "action": "Hardware Save", "detail": "CPU pushes instruction pointer of crashing instruction to kernel stack."},
                {"num": 3, "action": "Mode Switch", "detail": "CPU mode bit switches from 1 to 0; jumps to IDT[0]."},
                {"num": 4, "action": "Signal Translation", "detail": "Kernel ISR translates exception into POSIX signal SIGFPE."},
                {"num": 5, "action": "Process Termination", "detail": "Process has no custom handler; kernel dumps core and terminates process."},
                {"num": 6, "action": "Parent Notification", "detail": "Parent shell notified with exit status 136 (Floating Point Exception)."}
            ],
            "resolution": "Operating system safely terminates the errant process while the rest of the computer continues unaffected."
        },
        {
            "cardNumber": 6,
            "badge": "6. Technical Walkthrough",
            "title": "Technical Comparison: Interrupt vs Trap",
            "isNumerical": false,
            "question": "Distinguish between a Hardware Interrupt, a Trap, and a Software Fault.",
            "givenData": {
                "Interrupt": "Asynchronous; caused by external hardware independent of CPU instruction stream.",
                "Trap / Exception": "Synchronous; caused directly by the execution of a specific CPU instruction."
            },
            "workedSteps": [
                "1. Origin: Interrupts come from external controllers (timer, NIC, disk). Traps come from the CPU ALU or software instructions (int 0x80, divide by zero).",
                "2. Timing: Interrupts are asynchronous (can occur between any two instructions). Traps are synchronous (re-executing the same instruction will trigger the trap again).",
                "3. Purpose: Interrupts notify I/O completion. Traps handle errors (page faults, division by zero) or request OS services (system calls).",
                "4. Resumption: Hardware interrupts resume at the NEXT instruction. Page faults restart the SAME instruction after loading the page."
            ],
            "finalAnswer": "Interrupts handle asynchronous hardware events; traps handle synchronous instruction events."
        },
        {
            "cardNumber": 7,
            "badge": "7. Visual Architecture",
            "title": "Interrupt & Trap Lifecycle Flowchart",
            "vfxType": "interrupt-flow",
            "simulationData": {
                "trigger": "Hardware IRQ or Software Exception",
                "mmu": "Mode Bit: 1 -> 0",
                "handler": "IDT Lookup -> ISR Top Half -> EOI -> ISR Bottom Half -> IRET"
            }
        },
        {
            "cardNumber": 8,
            "badge": "8. Common Pitfalls & Traps",
            "title": "Exam Traps & Beginner Mistakes",
            "traps": [
                {
                    "mistake": "Thinking all interrupts terminate the running program.",
                    "reality": "Normal hardware interrupts (like timer tick or keyboard press) are completely transparent to the user program; it resumes unaware it was paused."
                },
                {
                    "mistake": "Believing interrupts can never be disabled.",
                    "reality": "Kernel code can disable maskable interrupts using 'CLI' (Clear Interrupt Flag) during critical data updates. Non-Maskable Interrupts (NMI) for fatal hardware errors cannot be disabled."
                }
            ]
        },
        {
            "cardNumber": 9,
            "badge": "9. Interview & Placement Angle",
            "title": "Interview Top Questions",
            "interviewQuestions": [
                {
                    "q": "What is the difference between an interrupt and a polling mechanism?",
                    "a": "In polling, the CPU repeatedly reads device status registers in a busy wait loop. With interrupts, the device signals the CPU via an IRQ line only when data is ready, allowing the CPU to perform useful work in the meantime."
                },
                {
                    "q": "What is the role of the Timer Interrupt in operating systems?",
                    "a": "The hardware timer generates periodic interrupts (e.g., every 1-10 ms). This ensures the OS scheduler periodically regains control of the CPU, preventing any user process from monopolizing the processor."
                }
            ]
        },
        {
            "cardNumber": 10,
            "badge": "10. Quick Revision Sheet",
            "title": "Cheat Sheet: Interrupts & Dual Mode",
            "cheatSheet": {
                "keyRule": "Interrupts are asynchronous hardware signals; traps are synchronous CPU instruction events.",
                "coreFormulas": [
                    "Vector Number = APIC IRQ index",
                    "ISR Address = IDT[Vector Number]"
                ]
            },
            "summaryPoints": [
                "Dual mode is enforced by a hardware CPU mode bit (0 = Kernel, 1 = User).",
                "Interrupt Vector Table stores pointers to kernel Interrupt Service Routines.",
                "Timer interrupts form the backbone of preemptive multitasking.",
                "IRET restores saved processor flags, stack pointers, and program counters."
            ]
        }
    ]
}

print(f"Loaded Part 1 cards: {len(PART1_CARDS)} topics")
