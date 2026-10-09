import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetFile = path.join(__dirname, '../client/src/data/oops/oopsTopicCardsData.js');
let fileContent = fs.readFileSync(targetFile, 'utf-8');

// Bespoke 10 cards for Encapsulation
const ENCAPSULATION_CARDS = `  // =========================================================================
  // 3. ENCAPSULATION
  // =========================================================================
  'encapsulation': [
    {
      cardNumber: 1,
      stepKey: 'what-is-it',
      title: 'What is Encapsulation?',
      subtitle: 'Bundling State & Controlled Access',
      iconType: 'lock',
      simpleDef: 'Encapsulation is the fundamental OOPS principle of bundling data (fields) and the methods that operate on that data into a single protective container (Class), while restricting direct outside access to internal state.',
      oneLineMeaning: 'Data and methods bundled together behind a guarded public interface.',
      inSimpleWords: 'In simple words: You never let external code touch your raw variables directly. Instead, you keep your data private and provide controlled public methods (like deposit, withdraw, and checkBalance in an ATM) to inspect or modify the state safely.',
      realWorldAnalogy: {
        concept: 'Bank ATM Machine',
        example: 'When you need cash from a bank account, you cannot walk into the bank vault and pull bills out of the safe. Instead, you interact with the ATM interface: you insert your card, enter your PIN, and call withdraw(500). The ATM verifies your balance and dispenses cash while keeping the raw cash vault safely locked inside.'
      },
      visualType: 'atm-vault-diagram',
      highlights: {
        quickRemember: 'Outside User → Public Methods (Guards) → Private Data.',
        interviewTip: 'Interviewers look for 3 pillars: 1. Bundling data + methods, 2. Restricting direct access (data hiding), and 3. Exposing a controlled public interface with validation.',
        commonMistake: 'Thinking encapsulation is just declaring private variables. Without a cohesive public interface and validation logic, data hiding alone is not complete encapsulation.'
      }
    },
    {
      cardNumber: 2,
      stepKey: 'why-need-it',
      title: 'Why Do We Need Encapsulation?',
      subtitle: 'The Danger of Unprotected Public State',
      iconType: 'shield',
      simpleDef: 'Without encapsulation, any rogue or buggy line of code in a large system can directly overwrite internal state with invalid values, causing silent data corruption and impossible-to-trace bugs.',
      withoutVsWith: {
        withoutTitle: 'WITHOUT ENCAPSULATION (Public Fields)',
        withoutPoints: [
          'Any external function can write: \`account.balance = -50000;\` directly.',
          'Zero boundary checks, validation, or business rules enforced.',
          'No audit trail or logging when an object’s state changes.',
          'Changing an internal variable name breaks every external file in the project.'
        ],
        withTitle: 'WITH ENCAPSULATION (Private Fields + Controlled Methods)',
        withPoints: [
          'Fields are private: \`private double balance;\` prevents unauthorized writes.',
          '\`deposit(amount)\` and \`withdraw(amount)\` validate rules (e.g. amount > 0, amount <= balance).',
          'Invalid actions (e.g. withdrawing $50,000 with a $1,000 balance) are safely rejected.',
          'Internal implementation can change freely without breaking external callers.'
        ]
      },
      visualType: 'encapsulation-need-diagram',
      highlights: {
        quickRemember: 'Without: balance = -50000 allowed anywhere. With: Guarded methods enforce business invariants.',
        interviewTip: 'Use the term "Invariant Protection" — encapsulation ensures an object can never transition into an invalid or illegal state.',
        commonMistake: 'Writing getters and setters with zero validation. If setBalance(val) blindly assigns this.balance = val, it offers no more protection than a public field!'
      }
    },
    {
      cardNumber: 3,
      stepKey: 'how-it-works',
      title: 'How Does Encapsulation Work?',
      subtitle: 'The 6-Step Controlled Access Mechanism',
      iconType: 'flow',
      simpleDef: 'Encapsulation works as a strict security checkpoint between outside callers and internal state, routing every state interaction through validating methods.',
      flowSteps: [
        { step: 1, label: 'Encapsulate Data', desc: 'Bundle attributes and behaviors inside a class container.' },
        { step: 2, label: 'Restrict Visibility', desc: 'Mark fields with private so outside code cannot tamper with them directly.' },
        { step: 3, label: 'Expose Methods', desc: 'Provide public methods (deposit(), withdraw(), getBalance()) as the official API.' },
        { step: 4, label: 'Validate Input', desc: 'Methods check business rules (e.g. if (amount <= 0 || amount > balance) return false;).' },
        { step: 5, label: 'Update State', desc: 'Only after validation succeeds is the private internal balance modified.' },
        { step: 6, label: 'Return Safe Info', desc: 'Return confirmation, success flags, or defensive copies to the caller.' }
      ],
      visualType: 'encapsulation-vault',
      highlights: {
        quickRemember: 'Client → Public Method → Validation Guard → State Update → Safe Result.',
        interviewTip: 'Encapsulation is not just data hiding; it is controlled access to state.',
        commonMistake: 'Returning direct references to mutable internal objects (like Date or ArrayList) in getters.'
      }
    },
    {
      cardNumber: 4,
      stepKey: 'syntax',
      title: 'Syntax: Writing Encapsulated Classes',
      subtitle: 'Private Fields & Guarded Methods in Java, Python, C++',
      iconType: 'code',
      simpleDef: 'Standard syntax patterns for private member variables, validated mutators, and accessors in Java, Python, and C++.',
      codeSnippets: {
        Java: \`class BankAccount {
    private double balance; // Hidden internal state

    public BankAccount(double initialBalance) {
        if (initialBalance >= 0) this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount; // Validated state update
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false; // Rejected
    }

    public double getBalance() {
        return balance; // Safe read access
    }
}\`,
        Python: \`class BankAccount:
    def __init__(self, initial_balance=0.0):
        self.__balance = initial_balance if initial_balance >= 0 else 0.0

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            return True
        return False

    def get_balance(self):
        return self.__balance\`,
        'C++': \`class BankAccount {
private:
    double balance; // Hidden state

public:
    BankAccount(double initialBalance = 0.0) {
        balance = (initialBalance >= 0) ? initialBalance : 0.0;
    }

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }

    double getBalance() const {
        return balance;
    }
};\`
      },
      syntaxNotes: [
        'private in Java & C++: Restricts visibility strictly to member functions of the declaring class.',
        '__ (double underscore) in Python: Activates name mangling (renames __balance to _BankAccount__balance) to signal private state.',
        'const member functions in C++: Signals that the getter does not mutate any class member variables.',
        'Constructor validation ensures objects cannot even be instantiated with illegal initial values.'
      ],
      highlights: {
        quickRemember: 'Private keyword prevents direct access; public methods validate and mutate.',
        interviewTip: 'In Python, explain how @property and @setter provide idiomatic getter/setter syntax while still maintaining encapsulation.',
        commonMistake: 'Forgetting to initialize private fields in the constructor.'
      }
    },
    {
      cardNumber: 5,
      stepKey: 'real-world-example',
      title: 'Real-World Model: Bank Account & ATM Interface',
      subtitle: 'Customer Interface vs Vault Implementation',
      iconType: 'bank',
      simpleDef: 'In modern banking, customers never touch cash reserves or database tables directly. They interact with an ATM keypad that mediates every transaction.',
      realWorldScenario: {
        domain: 'Retail Banking & ATM Network',
        setup: 'A customer visits an ATM machine to manage their savings account.',
        roles: [
          { role: 'Customer', responsibility: 'Initiates transactions via ATM keypad (calls deposit, withdraw, checkBalance)' },
          { role: 'ATM Interface', responsibility: 'Public boundary: captures PIN, validates requested amounts, routes commands' },
          { role: 'BankAccount', responsibility: 'Core domain entity holding protected funds and ledger invariants' }
        ],
        attributes: [
          'accountNumber (String: unique identifier)',
          'private balance (double: internal vault state, never publicly exposed)',
          'dailyWithdrawalLimit (double: fixed safety ceiling)'
        ],
        behaviors: [
          { action: 'deposit(amount)', result: 'Verifies amount > 0, adds to balance, logs transaction' },
          { action: 'withdraw(amount)', result: 'Verifies amount > 0, amount <= balance, and amount <= dailyLimit' },
          { action: 'getBalance()', result: 'Returns current verified balance without exposing memory pointer' }
        ],
        privateData: 'private double balance = 1000.0; // Strictly protected against direct tampering',
        interaction: 'Customer calls withdraw(500). ATM checks PIN and balance. Because 500 <= 1000, 500 is dispensed and balance updates to 500. A subsequent attempt to withdraw 2000 is rejected.',
        takeaway: 'Users interact with a controlled interface, not internal data.'
      },
      visualType: 'atm-vault-diagram',
      highlights: {
        quickRemember: 'The ATM screen is the Public Interface; the cash vault is the Private State.',
        interviewTip: 'Always use Bank Account or ATM when asked for an encapsulation real-world model in interviews.',
        commonMistake: 'Failing to explain what happens when validation fails (declined transaction vs silent failure).'
      }
    },
    {
      cardNumber: 6,
      stepKey: 'types-variations',
      title: 'Encapsulation Patterns & Variations',
      subtitle: 'Practical Implementations in Real-World Code',
      iconType: 'layers',
      simpleDef: 'Encapsulation is a design principle rather than a rigid formula. Depending on system requirements, developers apply distinct encapsulation patterns to protect state.',
      typesList: [
        {
          name: '1. Private Fields + Public Methods',
          desc: 'The standard pattern: internal fields are private; operations are exposed through public domain methods (e.g. deposit, withdraw).',
          badge: 'Standard',
          code: 'private double balance;\\npublic void deposit(double amt) { ... }'
        },
        {
          name: '2. Getter / Setter Access Control',
          desc: 'Granular access control where individual fields are accessed through dedicated getField() and setField() methods with validation.',
          badge: 'Accessors',
          code: 'public int getAge() { return age; }\\npublic void setAge(int a) { if (a > 0) age = a; }'
        },
        {
          name: '3. Read-Only Encapsulation',
          desc: 'Exposes only getter methods and completely omits setters. State is set once during construction and cannot be mutated externally.',
          badge: 'Read-Only',
          code: 'private final long accountId;\\npublic long getAccountId() { return accountId; } // No setter!'
        },
        {
          name: '4. Validation-Based Setter',
          desc: 'Setters that strictly reject out-of-range, null, or logically illegal values before assigning to internal fields.',
          badge: 'Guarded',
          code: 'public void setScore(int s) {\\n    if (s < 0 || s > 100) throw new IllegalArgumentException();\\n    this.score = s;\\n}'
        },
        {
          name: '5. Immutable Object Protection',
          desc: 'Complete encapsulation where all fields are private and final, no setters exist, and getters return defensive copies of mutable objects.',
          badge: 'Immutable',
          code: 'public final class User { private final String id; ... }'
        }
      ],
      visualType: 'encapsulation-levels',
      highlights: {
        quickRemember: 'Read-Only: omit setter. Write-Only: omit getter. Immutable: all fields private final.',
        interviewTip: 'Clarify to the interviewer that these are practical implementation patterns, not formal OOPS keywords.',
        commonMistake: 'Thinking an object is immutable just because fields are private. If a getter returns an internal mutable Date or List, external callers can mutate it!'
      }
    },
    {
      cardNumber: 7,
      stepKey: 'working-example',
      title: 'Complete Working Example: BankAccount',
      subtitle: 'Runnable Deposit, Withdrawal, & Balance Verification',
      iconType: 'play',
      simpleDef: 'A complete, self-contained program demonstrating private state, valid deposits, successful withdrawals, rejected invalid requests, and verified final balances.',
      codeSnippets: {
        Java: \`class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        if (initialBalance >= 0) {
            this.balance = initialBalance;
        } else {
            this.balance = 0.0;
        }
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposit 500: Success (Balance: " + (int)balance + ")");
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdraw " + (int)amount + ": Success (Balance: " + (int)balance + ")");
            return true;
        } else {
            System.out.println("Withdraw " + (int)amount + ": Declined (Insufficient funds)");
            return false;
        }
    }

    public double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount(1000);
        System.out.println("Initial balance: " + (int)account.getBalance());
        account.deposit(500);
        account.withdraw(300);
        account.withdraw(2000);
        System.out.println("Final balance: " + (int)account.getBalance());
    }
}\`,
        Python: \`class BankAccount:
    def __init__(self, initial_balance):
        self.__balance = initial_balance if initial_balance >= 0 else 0.0

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposit {int(amount)}: Success (Balance: {int(self.__balance)})")

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            print(f"Withdraw {int(amount)}: Success (Balance: {int(self.__balance)})")
            return True
        else:
            print(f"Withdraw {int(amount)}: Declined (Insufficient funds)")
            return False

    def get_balance(self):
        return self.__balance

account = BankAccount(1000)
print(f"Initial balance: {int(account.get_balance())}")
account.deposit(500)
account.withdraw(300)
account.withdraw(2000)
print(f"Final balance: {int(account.get_balance())}")\`,
        'C++': \`#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance;

public:
    BankAccount(double initialBalance) {
        balance = (initialBalance >= 0) ? initialBalance : 0.0;
    }

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "Deposit 500: Success (Balance: " << (int)balance << ")" << endl;
        }
    }

    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            cout << "Withdraw " << (int)amount << ": Success (Balance: " << (int)balance << ")" << endl;
            return true;
        } else {
            cout << "Withdraw " << (int)amount << ": Declined (Insufficient funds)" << endl;
            return false;
        }
    }

    double getBalance() const {
        return balance;
    }
};

int main() {
    BankAccount account(1000);
    cout << "Initial balance: " << (int)account.getBalance() << endl;
    account.deposit(500);
    account.withdraw(300);
    account.withdraw(2000);
    cout << "Final balance: " << (int)account.getBalance() << endl;
    return 0;
}\`
      },
      expectedOutput: "Initial balance: 1000\\nDeposit 500: Success (Balance: 1500)\\nWithdraw 300: Success (Balance: 1200)\\nWithdraw 2000: Declined (Insufficient funds)\\nFinal balance: 1200",
      executionTrace: [
        { step: 1, action: "new BankAccount(1000)", state: "Heap allocates object, constructor sets private balance = 1000.0." },
        { step: 2, action: "account.deposit(500)", state: "Method validates 500 > 0; updates private balance to 1500.0." },
        { step: 3, action: "account.withdraw(300)", state: "Validation passes (300 <= 1500); balance decrements to 1200.0, returns true." },
        { step: 4, action: "account.withdraw(2000)", state: "Validation fails (2000 > 1200); transaction declined, balance untouched at 1200.0." },
        { step: 5, action: "account.getBalance()", state: "Reads and prints final safe balance of 1200.0." }
      ],
      highlights: {
        quickRemember: 'Private state is protected: invalid withdrawal fails without corrupting funds.',
        interviewTip: 'Walk the interviewer through the trace: demonstrate how validation prevents negative balance.',
        commonMistake: 'Allowing negative withdrawal amounts (e.g. withdraw(-100) adding money to the balance!).'
      }
    },
    {
      cardNumber: 8,
      stepKey: 'common-mistakes',
      title: 'Encapsulation Mistakes & Pitfalls',
      subtitle: 'Subtle Flaws that Breach Data Security',
      iconType: 'alert',
      simpleDef: 'Common architectural traps where code appears encapsulated on the surface but leaks mutable state or violates business invariants.',
      mistakesList: [
        {
          mistake: '❌ Making fields public for convenience or less typing',
          correct: '✅ Always declare fields private. Public fields allow any external class to assign illegal values directly without validation.'
        },
        {
          mistake: '❌ Writing setters that perform no validation',
          correct: '✅ If setAge(int a) simply does this.age = a; without checking a > 0, it offers zero protection over a public field.'
        },
        {
          mistake: '❌ Returning mutable internal references in getters',
          correct: '✅ Returning an internal List or Date object allows callers to modify it directly. Always return a defensive copy or unmodifiable wrapper.'
        },
        {
          mistake: "❌ Assuming 'private' means cryptographically inaccessible",
          correct: '✅ Private is a compiler-enforced access boundary, not encryption. Java Reflection or Python name mangling (_Class__var) can technically access private state.'
        },
        {
          mistake: '❌ Confusing Encapsulation with Abstraction',
          correct: '✅ Encapsulation is DATA HIDING (capsule boundary protecting state). Abstraction is COMPLEXITY HIDING (interface showing what instead of how).'
        }
      ],
      interviewTrap: "⚠️ Interview Trap: 'Does encapsulation guarantee 100% security against all access?' Answer: NO! Reflection in Java can call setAccessible(true) to inspect private fields, and Python uses name mangling rather than hard memory locks. Encapsulation is an engineering design boundary for correctness and maintainability, not cryptographic security.",
      highlights: {
        quickRemember: 'Never expose mutable references. Always validate in setters. Encapsulation ≠ Cryptography.',
        interviewTip: 'Explain defensive copying: return new ArrayList<>(this.items); prevents external list tampering.',
        commonMistake: 'Confusing data hiding (encapsulation) with implementation hiding (abstraction).'
      }
    },
    {
      cardNumber: 9,
      stepKey: 'interview-placement',
      title: 'Encapsulation Placement Patterns',
      subtitle: 'High-Frequency Campus & Technical Interview Questions',
      iconType: 'award',
      simpleDef: 'Placement questions, technical viva answers, and recruiter assessment patterns on encapsulation.',
      interviewQuestions: [
        {
          q: 'What is encapsulation, and why are fields typically declared private?',
          a: 'Encapsulation bundles state and methods into a single class while restricting direct external access. Fields are declared private to enforce data hiding, preventing unauthorized or accidental corruption, and allowing the class to enforce validation rules before state changes.'
        },
        {
          q: 'Can encapsulation exist without getters and setters?',
          a: "YES! Encapsulation is about controlled behavior, not getters and setters. In fact, true object-oriented design follows the 'Tell, Don't Ask' principle: instead of getting balance and setting balance, you call meaningful domain methods like deposit() and withdraw()."
        },
        {
          q: 'What is the difference between Encapsulation and Abstraction?',
          a: 'Encapsulation is data hiding and protection: it bundles variables and methods inside a capsule and hides internal state. Abstraction is complexity hiding: it exposes WHAT an object does through an interface while hiding HOW it accomplishes it internally.'
        },
        {
          q: 'How does Python implement encapsulation compared to Java or C++?',
          a: "Java and C++ enforce access control at compile time via keywords (private, protected, public). Python relies on convention: a single underscore _var indicates 'protected/internal', while a double underscore __var triggers name mangling to _ClassName__var."
        }
      ],
      companyTags: ['TCS', 'Infosys', 'Cognizant', 'Capgemini', 'Wipro'],
      companyAttribution: 'Reported in technical assessment rounds at: TCS • Infosys • Cognizant • Capgemini • Wipro',
      highlights: {
        quickRemember: "Tell, Don't Ask principle. Private fields + domain methods = robust encapsulation.",
        interviewTip: 'Highlight that encapsulation enables classes to change internal storage (e.g. array to hashmap) without breaking callers.',
        commonMistake: "Saying encapsulation is 'just generating getters and setters in Eclipse or IntelliJ'."
      }
    },
    {
      cardNumber: 10,
      stepKey: 'quick-revision',
      title: 'Encapsulation Revision Cheat Sheet',
      subtitle: '60-Second Memory Anchor',
      iconType: 'check',
      simpleDef: 'Instant memory anchors for Encapsulation right before technical interviews.',
      cheatSheet: {
        WHAT: 'Bundling data (fields) and methods into a single unit (Class) with restricted access.',
        WHY: 'Prevents unauthorized state tampering, protects business invariants, eases maintenance.',
        HOW: 'Declare fields \`private\` → expose guarded \`public\` methods with strict validation.',
        KEY_POINT: 'Users interact with a controlled public interface, never internal memory directly.',
        COMMON_TRAP: 'Blind getters/setters without validation offer zero protection over public fields.',
        INTERVIEW_TIP: 'Encapsulation = Hide Data (capsule). Abstraction = Hide Complexity (interface).',
        SYNTAX: 'class BankAccount { private double balance; public void deposit(double a) { ... } }'
      },
      visualType: 'encapsulation-cheat-sheet',
      highlights: {
        quickRemember: 'Private Data + Public Methods + Validation = Rock-solid Encapsulation.',
        interviewTip: 'Use the ATM/Bank Account model to clearly distinguish the public keypad from the private cash vault.',
        commonMistake: 'Forgetting defensive copying when returning mutable objects from getters.'
      }
    }
  ],`;

// Bespoke 10 cards for Abstraction
const ABSTRACTION_CARDS = `  // =========================================================================
  // 4. ABSTRACTION
  // =========================================================================
  'abstraction': [
    {
      cardNumber: 1,
      stepKey: 'what-is-it',
      title: 'What is Abstraction?',
      subtitle: 'Focusing on WHAT Rather Than HOW',
      iconType: 'tv-remote',
      simpleDef: 'Abstraction is the core OOPS principle of hiding unnecessary internal implementation details and exposing only the essential interface to the user.',
      oneLineMeaning: 'Expose WHAT an entity does; hide HOW it achieves it.',
      inSimpleWords: 'In simple words: You use an object through a simple contract without needing to understand or care about the complicated machinery running under the hood.',
      realWorldAnalogy: {
        concept: 'Driving a Modern Car',
        example: 'When you drive a car, you interact with three simple controls: the steering wheel, accelerator pedal, and brake pedal. You don\\'t need to know fuel injection timing, combustion cylinder pressures, or ECU microcontroller voltages to drive. The complex mechanical and electronic execution is abstracted away behind a clean pedal interface.'
      },
      visualType: 'abstraction-screen',
      highlights: {
        quickRemember: 'Interface shows WHAT; Hidden engine does HOW.',
        interviewTip: 'State: "Abstraction reduces mental complexity for callers and decouples clients from implementation mechanics."',
        commonMistake: 'Confusing abstraction with encapsulation. Encapsulation hides state (data); Abstraction hides implementation (behavior complexity).'
      }
    },
    {
      cardNumber: 2,
      stepKey: 'why-need-it',
      title: 'Why Do We Need Abstraction?',
      subtitle: 'Taming Enterprise Software Complexity',
      iconType: 'shield',
      simpleDef: 'Without abstraction, every caller in a software system would need to understand millions of lines of low-level hardware, network protocols, and database queries just to trigger a simple business action.',
      withoutVsWith: {
        withoutTitle: 'WITHOUT ABSTRACTION (Coupled to Concrete Details)',
        withoutPoints: [
          'Callers must write low-level socket, driver, and protocol code directly.',
          'Tight coupling: changing database vendor or payment provider breaks the entire codebase.',
          'Huge mental overhead: developers cannot reason about high-level business features.',
          'Impossible to unit-test or swap components with mock implementations.'
        ],
        withTitle: 'WITH ABSTRACTION (Contract-Based Architecture)',
        withPoints: [
          'Callers invoke a clean 1-line contract: \`payment.pay(500);\` with zero protocol clutter.',
          'Underlying mechanism (Stripe, UPI, PayPal, Cash) can be swapped without touching caller code.',
          'Loose coupling: internal refactoring has zero impact on consumer modules.',
          'Enables modular, plug-and-play architecture adhering to the Open/Closed Principle.'
        ]
      },
      visualType: 'abstraction-need-diagram',
      highlights: {
        quickRemember: 'Without: client tangled in engine wires. With: client uses a clean dashboard.',
        interviewTip: 'Emphasize loose coupling and Dependency Inversion: high-level modules should depend on abstractions, not concrete details.',
        commonMistake: 'Exposing internal SQL queries or protocol buffers in high-level service interfaces.'
      }
    },
    {
      cardNumber: 3,
      stepKey: 'how-it-works',
      title: 'How Abstraction Works in Architecture',
      subtitle: 'Contracts, Concrete Classes, & Caller Boundaries',
      iconType: 'flow',
      simpleDef: 'Abstraction works by creating a clear boundary between an abstract contract and its concrete implementations.',
      flowSteps: [
        { step: 1, label: 'Declare Contract', desc: 'Define an Interface or Abstract Class declaring WHAT must be done (e.g. pay(amount)).' },
        { step: 2, label: 'Hide Implementation', desc: 'Concrete classes (UPIPayment, CreditCardPayment) write the specialized HOW logic.' },
        { step: 3, label: 'Reference Abstraction', desc: 'Caller code holds a reference to the abstract type: Payment payment = getMethod();.' },
        { step: 4, label: 'Polymorphic Call', desc: 'Caller calls payment.pay(500). The correct concrete execution runs with zero caller coupling.' }
      ],
      visualType: 'abstraction-contract-flow',
      highlights: {
        quickRemember: 'Abstract Contract (WHAT) → Concrete Class (HOW) → Caller stays decoupled.',
        interviewTip: 'Point out that callers only depend on the interface, fulfilling the Dependency Inversion Principle.',
        commonMistake: 'Writing implementation details inside pure interfaces (violating separation of concerns).'
      }
    },
    {
      cardNumber: 4,
      stepKey: 'syntax',
      title: 'Syntax: Interfaces & Abstract Classes',
      subtitle: 'Defining Contracts in Java, Python, and C++',
      iconType: 'code',
      simpleDef: 'Syntax for abstract methods and contracts across Java, Python, and C++.',
      codeSnippets: {
        Java: \`// Interface: 100% Pure Abstract Contract
interface Payment {
    void pay(double amount); // abstract by default
}

// Concrete Implementation
class UPIPayment implements Payment {
    public void pay(double amount) {
        System.out.println("Processing UPI payment: Rs. " + (int)amount + " paid successfully via UPI ID.");
    }
}\`,
        Python: \`from abc import ABC, abstractmethod

# Abstract Base Class Contract
class Payment(ABC):
    @abstractmethod
    def pay(self, amount):
        pass # Abstract method: no implementation

# Concrete Implementation
class UPIPayment(Payment):
    def pay(self, amount):
        print(f"Processing UPI payment: Rs. {int(amount)} paid successfully via UPI ID.")\`,
        'C++': \`// Abstract Base Class with Pure Virtual Function
class Payment {
public:
    virtual void pay(double amount) = 0; // Pure virtual function (= 0)
    virtual ~Payment() = default;
};

// Concrete Implementation
class UPIPayment : public Payment {
public:
    void pay(double amount) override {
        cout << "Processing UPI payment: Rs. " << (int)amount << " paid successfully via UPI ID." << endl;
    }
};\`
      },
      syntaxNotes: [
        'Java interface: Declares abstract method contracts; implemented using implements keyword.',
        'Python abc module: Inherit from ABC and decorate methods with @abstractmethod.',
        'C++ Pure Virtual Function: virtual void func() = 0; forces the class to be abstract.',
        'An abstract class or interface CANNOT be instantiated directly using new!'
      ],
      highlights: {
        quickRemember: 'Java: interface | Python: @abstractmethod | C++: virtual ... = 0.',
        interviewTip: 'Explain why C++ requires a virtual destructor in abstract base classes (prevents memory leaks when deleting through base pointer).',
        commonMistake: 'Trying to instantiate an abstract type: new Payment() is a compile-time error!'
      }
    },
    {
      cardNumber: 5,
      stepKey: 'real-world-example',
      title: 'Real-World Model: Payment Processing System',
      subtitle: 'Unified Checkout Across Pluggable Gateways',
      iconType: 'credit-card',
      simpleDef: 'An e-commerce checkout system provides a unified "Pay Now" button. Whether a user chooses UPI, Credit Card, or Cash on Delivery, the checkout workflow calls the exact same pay() method.',
      realWorldScenario: {
        domain: 'E-Commerce Checkout & Payment Gateway',
        setup: 'A customer completes a shopping cart purchase and clicks "Pay Now".',
        roles: [
          { role: 'Checkout Service', responsibility: 'Caller: depends strictly on the Payment abstraction; does not know specific gateway details' },
          { role: 'Payment Interface', responsibility: 'Contract: declares pay(double amount)' },
          { role: 'UPIPayment', responsibility: 'HOW: handles VPA resolution, UPI PIN authentication, bank switch' },
          { role: 'CreditCardPayment', responsibility: 'HOW: handles CVV verification, 3D Secure OTP, card network routing' }
        ],
        attributes: [
          'transactionId (String: reference id)',
          'amount (double: payment total)'
        ],
        behaviors: [
          { action: 'pay(amount)', result: 'Executes gateway-specific payment protocol under unified interface' }
        ],
        hiddenComplexity: [
          '256-bit SSL handshakes with acquiring bank servers',
          'PCI-DSS compliant tokenization of sensitive credentials',
          'Bank protocol message formatting (ISO 8583 standards)',
          'Webhook retry logic and idempotency key management'
        ],
        interaction: 'Checkout service calls payment.pay(500). If UPI is selected, UPIPayment executes; if Card is selected, CreditCardPayment executes. Checkout service code never changes.',
        takeaway: 'The caller only knows WHAT to trigger; the underlying gateway executes HOW.'
      },
      visualType: 'oops-interfaces-diagram',
      highlights: {
        quickRemember: 'Caller sees pay(amount). Bank protocols, encryption, and servers remain hidden.',
        interviewTip: 'Cite Payment Gateways or JDBC / Database Drivers (Connection, Statement) as classic industrial abstraction examples.',
        commonMistake: 'Writing messy if (mode == "UPI") ... else if (mode == "CARD") blocks in your business logic.'
      }
    },
    {
      cardNumber: 6,
      stepKey: 'types-variations',
      title: 'Mechanisms to Achieve Abstraction',
      subtitle: 'Interfaces vs Abstract Classes in Practice',
      iconType: 'layers',
      simpleDef: 'Abstraction is a high-level design concept. In programming languages, it is implemented through distinct language constructs.',
      typesList: [
        {
          name: '1. Interface-Based Abstraction (100% Pure Contract)',
          desc: 'Specifies purely WHAT an entity does without storing state or constructor logic. Classes implement multiple interfaces freely.',
          badge: '100% Pure',
          code: 'interface Payment { void pay(double amt); }'
        },
        {
          name: '2. Abstract-Class-Based Abstraction (Partial Abstraction)',
          desc: 'Combines abstract methods (to be implemented by children) with concrete methods (shared default code) and member fields.',
          badge: '0% - 100%',
          code: 'abstract class BasePayment {\\n    String txId;\\n    void logTx() { ... }\\n    abstract void pay(double amt);\\n}'
        },
        {
          name: '3. Abstract Method Declaration',
          desc: 'A method signature declared without an implementation body, forcing every non-abstract subclass to provide its own logic.',
          badge: 'Signature Only',
          code: 'abstract void execute(); // No body'
        },
        {
          name: '4. Polymorphic Contract Binding',
          desc: 'Programming to an interface: client code holds abstract references (Payment p) and binds to concrete heap instances dynamically.',
          badge: 'Dynamic Binding',
          code: 'Payment p = new UPIPayment(); p.pay(100);'
        }
      ],
      visualType: 'abstract-class-vs-interface-spectrum',
      highlights: {
        quickRemember: 'Interface = Pure Behavior Contract. Abstract Class = Shared Base + Partial Contract.',
        interviewTip: 'Rule of thumb: Use an interface when unrelated classes share a capability (e.g. Printable, Payment). Use an abstract class for closely related family classes sharing state.',
        commonMistake: 'Assuming abstract classes cannot have constructors. Abstract classes CAN have constructors invoked via super()!'
      }
    },
    {
      cardNumber: 7,
      stepKey: 'working-example',
      title: 'Complete Working Example: Payment System',
      subtitle: 'Pluggable UPI & Credit Card Execution',
      iconType: 'play',
      simpleDef: 'A complete runnable program demonstrating interface declaration, concrete UPI and Card implementations, and polymorphic caller dispatch with deterministic output.',
      codeSnippets: {
        Java: \`interface Payment {
    void pay(double amount);
}

class UPIPayment implements Payment {
    public void pay(double amount) {
        System.out.println("Processing UPI payment: Rs. " + (int)amount + " paid successfully via UPI ID.");
    }
}

class CreditCardPayment implements Payment {
    public void pay(double amount) {
        System.out.println("Processing Card payment: Rs. " + (int)amount + " paid successfully via Credit Card.");
    }
}

public class Main {
    public static void processOrder(Payment payment, double amount) {
        payment.pay(amount); // Caller depends purely on abstraction
    }

    public static void main(String[] args) {
        Payment upi = new UPIPayment();
        Payment card = new CreditCardPayment();

        processOrder(upi, 500);
        processOrder(card, 1200);
        System.out.println("Payment completed: Checkout successful.");
    }
}\`,
        Python: \`from abc import ABC, abstractmethod

class Payment(ABC):
    @abstractmethod
    def pay(self, amount):
        pass

class UPIPayment(Payment):
    def pay(self, amount):
        print(f"Processing UPI payment: Rs. {int(amount)} paid successfully via UPI ID.")

class CreditCardPayment(Payment):
    def pay(self, amount):
        print(f"Processing Card payment: Rs. {int(amount)} paid successfully via Credit Card.")

def process_order(payment: Payment, amount: float):
    payment.pay(amount)

upi = UPIPayment()
card = CreditCardPayment()

process_order(upi, 500)
process_order(card, 1200)
print("Payment completed: Checkout successful.")\`,
        'C++': \`#include <iostream>
using namespace std;

class Payment {
public:
    virtual void pay(double amount) = 0; // Pure virtual function
    virtual ~Payment() = default;
};

class UPIPayment : public Payment {
public:
    void pay(double amount) override {
        cout << "Processing UPI payment: Rs. " << (int)amount << " paid successfully via UPI ID." << endl;
    }
};

class CreditCardPayment : public Payment {
public:
    void pay(double amount) override {
        cout << "Processing Card payment: Rs. " << (int)amount << " paid successfully via Credit Card." << endl;
    }
};

void processOrder(Payment* payment, double amount) {
    payment->pay(amount);
}

int main() {
    Payment* upi = new UPIPayment();
    Payment* card = new CreditCardPayment();

    processOrder(upi, 500);
    processOrder(card, 1200);
    cout << "Payment completed: Checkout successful." << endl;

    delete upi;
    delete card;
    return 0;
}\`
      },
      expectedOutput: "Processing UPI payment: Rs. 500 paid successfully via UPI ID.\\nProcessing Card payment: Rs. 1200 paid successfully via Credit Card.\\nPayment completed: Checkout successful.",
      executionTrace: [
        { step: 1, action: "processOrder(upi, 500)", state: "Passes UPIPayment instance; method invokes pay() through Payment interface contract." },
        { step: 2, action: "upi.pay(500)", state: "Executes UPIPayment implementation: outputs 'Rs. 500 paid successfully via UPI ID'." },
        { step: 3, action: "processOrder(card, 1200)", state: "Passes CreditCardPayment instance; processOrder needs zero changes to handle new card type." },
        { step: 4, action: "card.pay(1200)", state: "Executes CreditCardPayment implementation: outputs 'Rs. 1200 paid successfully via Credit Card'." },
        { step: 5, action: "Checkout summary", state: "Prints 'Payment completed: Checkout successful'." }
      ],
      highlights: {
        quickRemember: 'processOrder() knows WHAT (pay()), not HOW (UPI vs Card). Output matches exactly.',
        interviewTip: 'Highlight how easily CryptoPayment could be added without modifying processOrder().',
        commonMistake: 'Failing to mark classes as implementing the interface.'
      }
    },
    {
      cardNumber: 8,
      stepKey: 'common-mistakes',
      title: 'Abstraction Mistakes & Pitfalls',
      subtitle: 'Where Architecture Breaks Down',
      iconType: 'alert',
      simpleDef: 'Common conceptual confusions and compilation traps encountered with abstraction.',
      mistakesList: [
        {
          mistake: '❌ Confusing Abstraction with Encapsulation',
          correct: '✅ Abstraction is COMPLEXITY HIDING (interface showing what). Encapsulation is DATA HIDING (capsule protecting state with private modifiers).'
        },
        {
          mistake: '❌ Thinking abstraction means making all variables private',
          correct: '✅ Making variables private is encapsulation. Abstraction is designing contracts (interfaces/abstract classes) to hide implementation logic.'
        },
        {
          mistake: '❌ Creating an abstract class with no abstract methods and no subclassing',
          correct: '✅ An abstract class should represent a generic concept meant to be extended and specialized by subclasses.'
        },
        {
          mistake: '❌ Non-abstract subclass forgetting to implement an inherited abstract method',
          correct: '✅ Any concrete subclass MUST implement every inherited abstract method, or it will fail compilation with "must be declared abstract".'
        },
        {
          mistake: '❌ Over-abstracting: creating an interface for every single 2-line helper class',
          correct: '✅ Abstraction should simplify systems, not inflate them with unnecessary layers of empty interfaces.'
        },
        {
          mistake: '❌ Confusing Interface with Abstract Class',
          correct: '✅ An interface is a pure behavioral contract. An abstract class is an incomplete base class that can hold shared state and constructors.'
        }
      ],
      interviewTrap: "⚠️ Interview Trap: 'Can an abstract class have a constructor?' Answer: YES! Although you cannot instantiate it with new AbstractClass(), the constructor exists to initialize parent fields when invoked by child constructors via super().",
      highlights: {
        quickRemember: 'Abstract class has constructors; Interfaces do not. Subclasses must implement all abstract methods.',
        interviewTip: 'Remember: "Interface specifies WHAT; Subclass implements HOW."',
        commonMistake: 'Saying abstract classes cannot have constructors.'
      }
    },
    {
      cardNumber: 9,
      stepKey: 'interview-placement',
      title: 'Abstraction Placement Patterns',
      subtitle: 'Top Placement Questions on Abstraction & Contracts',
      iconType: 'award',
      simpleDef: 'Frequently asked technical interview questions on abstraction across product and service companies.',
      interviewQuestions: [
        {
          q: 'What is abstraction, and how is it different from encapsulation?',
          a: 'Abstraction hides implementation complexity and exposes only essential features through interfaces or abstract classes (focusing on WHAT). Encapsulation bundles data and methods together and protects internal state using access modifiers (focusing on HOW data is guarded).'
        },
        {
          q: 'What is the difference between an Interface and an Abstract Class in Java?',
          a: 'An interface is a pure contract supporting multiple inheritance with no instance fields or constructors. An abstract class is an incomplete class that can maintain instance variables, constructors, and concrete method implementations, but supports only single class inheritance.'
        },
        {
          q: 'Can an abstract class have concrete (implemented) methods?',
          a: 'YES! An abstract class can have anywhere from 0% to 100% abstract methods. It can provide fully functional concrete helper methods alongside abstract method declarations.'
        },
        {
          q: 'What is a Pure Virtual Function in C++?',
          a: 'A pure virtual function is a virtual function declared with = 0 syntax (e.g. virtual void draw() = 0;). It has no body in the base class and makes the containing class abstract, requiring derived classes to provide an override.'
        },
        {
          q: 'Why do we program to an interface rather than a concrete implementation?',
          a: 'Programming to an interface decouples caller code from specific vendor implementations, allowing new features or mocks to be plugged in seamlessly without breaking existing business logic.'
        }
      ],
      companyTags: ['Amazon', 'TCS', 'Infosys', 'Cognizant', 'Wipro'],
      companyAttribution: 'Reported in technical interview assessments at: Amazon • TCS • Infosys • Cognizant • Wipro',
      highlights: {
        quickRemember: 'Abstraction = Loose coupling + Dependency Inversion + Interchangeable implementations.',
        interviewTip: 'Be ready to write a quick interface and two implementations on a whiteboard within 2 minutes.',
        commonMistake: 'Failing to explain that interfaces enable multiple inheritance in Java.'
      }
    },
    {
      cardNumber: 10,
      stepKey: 'quick-revision',
      title: 'Abstraction Revision Cheat Sheet',
      subtitle: '60-Second Memory Anchor',
      iconType: 'check',
      simpleDef: 'Instant memory anchors for Abstraction right before technical interviews.',
      cheatSheet: {
        WHAT: 'Hiding unnecessary implementation details and exposing only essential behavior.',
        WHY: 'Reduces complexity, decouples modules, enables interchangeable implementations.',
        HOW: 'Declare Interfaces or Abstract Classes (WHAT) → Subclasses implement behavior (HOW).',
        KEY_POINT: 'Callers depend on the abstract contract; specific execution is decoupled.',
        COMMON_TRAP: 'Abstract classes CAN have constructors (invoked via super); Interfaces cannot.',
        INTERVIEW_TIP: 'Abstraction = WHAT (interface). Encapsulation = HOW DATA IS GUARDED (capsule).',
        SYNTAX: 'interface Payment { void pay(double amt); } class UPI implements Payment { ... }'
      },
      visualType: 'abstraction-cheat-sheet',
      highlights: {
        quickRemember: 'Expose WHAT, Hide HOW. Program to interfaces, not concrete classes.',
        interviewTip: 'Use the Car pedal or Payment Gateway analogy for an immediate, crystal-clear explanation.',
        commonMistake: 'Confusing abstract methods with concrete default methods.'
      }
    }
  ],`;

// Bespoke 10 cards for Inheritance
const INHERITANCE_CARDS = `  // =========================================================================
  // 5. INHERITANCE
  // =========================================================================
  'inheritance': [
    {
      cardNumber: 1,
      stepKey: 'what-is-it',
      title: 'What is Inheritance?',
      subtitle: 'The "Is-A" Reusability & Hierarchy Mechanism',
      iconType: 'tree-hierarchy',
      simpleDef: 'Inheritance is the mechanism where a new class (subclass/child) derives attributes and behaviors from an existing class (superclass/parent), establishing an "is-a" relationship.',
      oneLineMeaning: 'A specialized child class acquiring properties and methods from a parent class.',
      inSimpleWords: 'In simple words: Just as a child inherits biological traits from their parents, a Dog class inherits common animal traits (name, eat, sleep) from Animal, while adding its own unique behaviors like bark() and fetch().',
      realWorldAnalogy: {
        concept: 'Biological Taxonomy & Family Traits',
        example: 'A Dog is an Animal. A Dog automatically inherits biological functions (breathing, eating, sleeping) from the general Animal category, but specializes by barking. You don\\'t redefine breathing for every animal species!'
      },
      visualType: 'inheritance-tree',
      highlights: {
        quickRemember: 'Subclass Is-A Superclass. Reuses code and creates specialization.',
        interviewTip: 'Always test the relationship: "Is-A" indicates inheritance (Dog Is-A Animal). "Has-A" indicates composition (Car Has-A Engine).',
        commonMistake: 'Using inheritance when the relationship is Has-A (e.g. Car extends Engine — a car is NOT an engine!).'
      }
    },
    {
      cardNumber: 2,
      stepKey: 'why-need-it',
      title: 'Why Do We Need Inheritance?',
      subtitle: 'Eliminating Code Duplication & Enabling Polymorphism',
      iconType: 'shield',
      simpleDef: 'Without inheritance, every new class must re-declare and re-implement identical attributes and methods from scratch, leading to massive duplication and fragile software.',
      withoutVsWith: {
        withoutTitle: 'WITHOUT INHERITANCE (Redundant Code Repetition)',
        withoutPoints: [
          'Dog, Cat, and Bird each rewrite duplicate name, age, and eat() logic.',
          'Fixing a bug in eat() requires tracking down and editing 15 different animal classes.',
          'No common base type: cannot create a single array holding all animals.',
          'Violates the DRY (Don\\'t Repeat Yourself) principle.'
        ],
        withTitle: 'WITH INHERITANCE (Centralized Superclass)',
        withPoints: [
          'Common state and methods live once in the parent Animal class.',
          'Subclasses (Dog, Cat) inherit common members automatically.',
          'A bug fix in parent Animal instantly updates all subclasses.',
          'Polymorphic collections: Animal[] pets = { new Dog(), new Cat() }; is fully valid.'
        ]
      },
      visualType: 'inheritance-need-comparison',
      highlights: {
        quickRemember: 'Write once in Parent → Inherited by all Children. Enables DRY code and polymorphism.',
        interviewTip: 'Explain that inheritance provides two distinct benefits: 1. Code reuse, and 2. Subtype polymorphism.',
        commonMistake: 'Creating deep 8-level inheritance hierarchies. Keep trees shallow (2-3 levels maximum).'
      }
    },
    {
      cardNumber: 3,
      stepKey: 'how-it-works',
      title: 'How Inheritance Works: Mechanics & Access Rules',
      subtitle: 'Member Accessibility & Constructor Execution Flow',
      iconType: 'flow',
      simpleDef: 'When a class inherits another, it gains access to parent members according to strict access modifier rules, with parent constructors executing before child constructors.',
      flowSteps: [
        { step: 1, label: 'Extend Parent', desc: 'Child class declares class Dog extends Animal.' },
        { step: 2, label: 'Access Rules', desc: 'Child inherits public and protected members. Private members exist in memory but CANNOT be accessed directly.' },
        { step: 3, label: 'Parent Constructor', desc: 'Child constructor invokes super() first; parent constructor allocates and initializes base state.' },
        { step: 4, label: 'Child Constructor', desc: 'Control returns to child constructor body to initialize specialized child fields.' },
        { step: 5, label: 'Specialization', desc: 'Child can introduce brand new methods (fetch()) or override inherited ones (makeSound()).' }
      ],
      visualType: 'constructor-chain-flow',
      highlights: {
        quickRemember: 'Parent constructor executes FIRST, then child constructor runs.',
        interviewTip: 'Private members of a parent class ARE in the child\\'s memory footprint, but are NOT directly accessible by name (accessible only via parent public/protected methods).',
        commonMistake: 'Calling super() after child statements in Java. super() MUST be the first statement in a constructor!'
      }
    },
    {
      cardNumber: 4,
      stepKey: 'syntax',
      title: 'Syntax: Extending Classes',
      subtitle: 'Inheritance Keywords in Java, Python, and C++',
      iconType: 'code',
      simpleDef: 'Syntax for declaring parent and child classes across our supported programming languages.',
      codeSnippets: {
        Java: \`// Superclass / Parent
class Animal {
    protected String name;
    public Animal(String name) { this.name = name; }
    public void eat() { System.out.println(name + " is eating."); }
}

// Subclass / Child
class Dog extends Animal {
    public Dog(String name) {
        super(name); // Must be first statement!
    }
    public void bark() { System.out.println(name + " says: Woof Woof!"); }
}\`,
        Python: \`# Superclass / Parent
class Animal:
    def __init__(self, name):
        self.name = name
    def eat(self):
        print(f"{self.name} is eating.")

# Subclass / Child
class Dog(Animal):
    def __init__(self, name):
        super().__init__(name) # Call parent constructor
    def bark(self):
        print(f"{self.name} says: Woof Woof!")\`,
        'C++': \`#include <iostream>
using namespace std;

// Superclass / Parent
class Animal {
protected:
    string name;
public:
    Animal(string n) : name(n) {}
    void eat() { cout << name << " is eating." << endl; }
};

// Subclass / Child
class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {} // Call parent constructor
    void bark() { cout << name << " says: Woof Woof!" << endl; }
};\`
      },
      syntaxNotes: [
        'Java uses extends keyword. Java supports SINGLE class inheritance only (no multiple class inheritance).',
        'Python uses class Child(Parent): syntax and supports multiple inheritance directly.',
        'C++ uses : public Parent syntax. If you omit public, C++ defaults to private inheritance!',
        'protected modifier: Accessible within the package and by subclasses, but hidden from outside classes.'
      ],
      highlights: {
        quickRemember: 'Java: extends | Python: class Child(Parent) | C++: : public Parent.',
        interviewTip: 'Explain why protected is commonly used in base classes: it grants subclasses direct access while shielding state from the public.',
        commonMistake: 'Forgetting public in C++ inheritance (class Dog : Animal makes everything private!).'
      }
    },
    {
      cardNumber: 5,
      stepKey: 'real-world-example',
      title: 'Real-World Model: Vehicle Hierarchy',
      subtitle: 'Shared Base Attributes & Specialized Derivatives',
      iconType: 'car',
      simpleDef: 'In transportation systems, Cars, Bikes, and ElectricCars are all Vehicles. They share common properties like brand and speed, while specializing their own domain features.',
      realWorldScenario: {
        domain: 'Automotive Fleet & Transportation',
        setup: 'An automotive management system models multiple vehicle classes.',
        parent: 'Vehicle (brand, maxSpeed, startEngine(), drive())',
        children: [
          'Car (doorsCount, airConditioning, openTrunk())',
          'Bike (hasCarrier, isHelmetRequired(), doWheelie())',
          'ElectricCar (batteryCapacity, currentCharge, chargeBattery())'
        ],
        attributes: [
          'brand (String: manufacturer name, inherited from Vehicle)',
          'maxSpeed (int: top speed in km/h, inherited from Vehicle)',
          'doorsCount (int: specific to Car)',
          'batteryCapacity (int: specific to ElectricCar)'
        ],
        behaviors: [
          { action: 'startEngine()', result: 'Inherited by Car and Bike from Vehicle' },
          { action: 'chargeBattery()', result: 'Specialized method existing only on ElectricCar' },
          { action: 'openTrunk()', result: 'Specialized method existing only on Car' }
        ],
        takeaway: 'Every specialized vehicle "Is-A" Vehicle. Common code lives in the base class; specific features live in child subclasses.'
      },
      visualType: 'inheritance-tree',
      highlights: {
        quickRemember: 'Car Is-A Vehicle. ElectricCar Is-A Car (multilevel). Shared attributes stay in base.',
        interviewTip: 'Cite Vehicle → Car / Bike when explaining the "Is-A" relationship in design interviews.',
        commonMistake: 'Adding batteryCapacity to the base Vehicle class when petrol cars and bicycles don\\'t have large propulsion batteries!'
      }
    },
    {
      cardNumber: 6,
      stepKey: 'types-variations',
      title: '5 Types of Inheritance & Language Support',
      subtitle: 'Single, Multilevel, Hierarchical, Multiple, & Hybrid',
      iconType: 'layers',
      simpleDef: 'Object-oriented languages support distinct topological inheritance patterns, with important language-specific design differences.',
      typesList: [
        {
          name: '1. Single Inheritance',
          desc: 'A single derived class inherits from a single base class (A → B). Fully supported in Java, Python, and C++.',
          badge: 'A → B',
          code: 'class Dog extends Animal { ... }'
        },
        {
          name: '2. Multilevel Inheritance',
          desc: 'A class inherits from a derived class, forming a chain: Grandparent → Parent → Child (A → B → C). E.g. Vehicle → Car → ElectricCar.',
          badge: 'A → B → C',
          code: 'class ElectricCar extends Car { ... }'
        },
        {
          name: '3. Hierarchical Inheritance',
          desc: 'Multiple child classes inherit from a single common parent class (A → B and A → C). E.g. Animal → Dog and Animal → Cat.',
          badge: 'A → B, A → C',
          code: 'class Dog extends Animal { ... }\\nclass Cat extends Animal { ... }'
        },
        {
          name: '4. Multiple Inheritance',
          desc: 'A single child class inherits from multiple parent classes (A, B → C). Supported in C++ and Python. FORBIDDEN for classes in Java to prevent Diamond Problem ambiguity.',
          badge: 'A, B → C',
          code: 'class SmartPhone(Camera, Phone): # Python\\nclass Smartphone : public Camera, public Phone { }; // C++'
        },
        {
          name: '5. Hybrid Inheritance',
          desc: 'A combination of two or more inheritance types (e.g. Hierarchical + Multiple, forming a Diamond pattern: A → B, C → D).',
          badge: 'Diamond',
          code: 'In Java: achieved via multiple Interfaces.'
        }
      ],
      visualType: 'inheritance-types-grid',
      highlights: {
        quickRemember: 'Java classes support Single, Multilevel, Hierarchical. Multiple class inheritance is disallowed (avoiding the Diamond Problem).',
        interviewTip: 'Clarify: Java does NOT support multiple class inheritance, but DOES support multiple interface inheritance!',
        commonMistake: 'Claiming Java has zero support for multiple inheritance. It supports multiple interface implementation.'
      }
    },
    {
      cardNumber: 7,
      stepKey: 'working-example',
      title: 'Complete Working Example: Animal Hierarchy',
      subtitle: 'Base Class, Method Overriding, & Polymorphic Invocation',
      iconType: 'play',
      simpleDef: 'A complete runnable program demonstrating base Animal class, Dog and Cat subclasses overriding makeSound(), specialized methods, and polymorphic collection calls.',
      codeSnippets: {
        Java: \`class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public void makeSound() {
        System.out.println(name + " makes a generic animal sound.");
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }

    @Override
    public void makeSound() {
        System.out.println(name + " says: Woof Woof!");
    }

    public void fetch() {
        System.out.println(name + " is fetching the tennis ball!");
    }
}

class Cat extends Animal {
    public Cat(String name) {
        super(name);
    }

    @Override
    public void makeSound() {
        System.out.println(name + " says: Meow Meow!");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a1 = new Dog("Buddy");
        Animal a2 = new Cat("Whiskers");

        a1.makeSound(); // Polymorphic dispatch -> Dog's method
        a2.makeSound(); // Polymorphic dispatch -> Cat's method

        Dog dog = (Dog) a1;
        dog.fetch(); // Specialized child method
    }
}\`,
        Python: \`class Animal:
    def __init__(self, name):
        self.name = name

    def make_sound(self):
        print(f"{self.name} makes a generic animal sound.")

class Dog(Animal):
    def __init__(self, name):
        super().__init__(name)

    def make_sound(self):
        print(f"{self.name} says: Woof Woof!")

    def fetch(self):
        print(f"{self.name} is fetching the tennis ball!")

class Cat(Animal):
    def __init__(self, name):
        super().__init__(name)

    def make_sound(self):
        print(f"{self.name} says: Meow Meow!")

a1 = Dog("Buddy")
a2 = Cat("Whiskers")

a1.make_sound()
a2.make_sound()
a1.fetch()\`,
        'C++': \`#include <iostream>
using namespace std;

class Animal {
protected:
    string name;

public:
    Animal(string n) : name(n) {}

    virtual void makeSound() {
        cout << name << " makes a generic animal sound." << endl;
    }

    virtual ~Animal() = default;
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}

    void makeSound() override {
        cout << name << " says: Woof Woof!" << endl;
    }

    void fetch() {
        cout << name << " is fetching the tennis ball!" << endl;
    }
};

class Cat : public Animal {
public:
    Cat(string n) : Animal(n) {}

    void makeSound() override {
        cout << name << " says: Meow Meow!" << endl;
    }
};

int main() {
    Animal* a1 = new Dog("Buddy");
    Animal* a2 = new Cat("Whiskers");

    a1->makeSound();
    a2->makeSound();

    Dog* dog = dynamic_cast<Dog*>(a1);
    if (dog) dog->fetch();

    delete a1;
    delete a2;
    return 0;
}\`
      },
      expectedOutput: "Buddy says: Woof Woof!\\nWhiskers says: Meow Meow!\\nBuddy is fetching the tennis ball!",
      executionTrace: [
        { step: 1, action: "new Dog('Buddy')", state: "Invokes Dog constructor, which forwards 'Buddy' to Animal super() constructor to set protected name." },
        { step: 2, action: "new Cat('Whiskers')", state: "Invokes Cat constructor, initializing base Animal name to 'Whiskers'." },
        { step: 3, action: "a1.makeSound()", state: "Dynamic dispatch inspects runtime heap object (Dog); executes Dog.makeSound() -> prints 'Buddy says: Woof Woof!'." },
        { step: 4, action: "a2.makeSound()", state: "Dynamic dispatch inspects runtime heap object (Cat); executes Cat.makeSound() -> prints 'Whiskers says: Meow Meow!'." },
        { step: 5, action: "dog.fetch()", state: "Downcast to Dog type invokes specialized subclass method -> prints 'Buddy is fetching the tennis ball!'." }
      ],
      highlights: {
        quickRemember: 'Inheritance shares base code; overriding customizes child behavior; dynamic dispatch picks the right method.',
        interviewTip: 'Clearly distinguish inheritance (acquiring members) from overriding (redefining implementation).',
        commonMistake: 'Forgetting virtual in C++ base classes, which causes static binding instead of dynamic dispatch!'
      }
    },
    {
      cardNumber: 8,
      stepKey: 'common-mistakes',
      title: 'Inheritance Mistakes & Pitfalls',
      subtitle: 'The Fragile Base Class & Diamond Problem',
      iconType: 'alert',
      simpleDef: 'Classic blunders when designing inheritance hierarchies, including composition confusion and constructor traps.',
      mistakesList: [
        {
          mistake: '❌ Using inheritance when the relationship is NOT "Is-A"',
          correct: '✅ A Car is NOT an Engine! Do not do class Car extends Engine. A Car HAS an Engine — use Composition (class Car { private Engine engine; }).'
        },
        {
          mistake: '❌ Creating excessively deep inheritance hierarchies (5+ levels)',
          correct: '✅ Fragile Base Class Problem: modifying a grandparent class unintentionally breaks dozens of subclasses down the chain. Keep hierarchies shallow.'
        },
        {
          mistake: '❌ Assuming private parent members are directly accessible in child classes',
          correct: '✅ Private parent fields exist in memory but CANNOT be accessed by name in subclasses. Declare them protected or provide public getters.'
        },
        {
          mistake: '❌ Accidental overloading instead of overriding (parameter mismatch)',
          correct: '✅ In Java, always use @Override. If your parameter types or counts don\\'t match the parent method exactly, you created an overload by mistake!'
        },
        {
          mistake: '❌ Forgetting that constructors are NOT inherited',
          correct: '✅ Constructors are never inherited! Subclasses must declare their own constructors, which call parent constructors via super().'
        }
      ],
      interviewTrap: "⚠️ Interview Trap: 'Why does Java not support multiple class inheritance?' Answer: The Diamond Problem! If Class D extends both Class B and Class C, and both override makeSound() from Class A, which method should D inherit? The ambiguity causes compiler conflict. Java avoids this by allowing single class inheritance and multiple interface implementation.",
      highlights: {
        quickRemember: 'Favor Composition over Inheritance when relationship is Has-A, not Is-A.',
        interviewTip: 'Explain the Diamond Problem with A, B, C, D classes on a whiteboard.',
        commonMistake: 'Thinking private members are excluded from subclass heap allocation. They are allocated, but hidden from direct code access.'
      }
    },
    {
      cardNumber: 9,
      stepKey: 'interview-placement',
      title: 'Inheritance Placement Patterns',
      subtitle: 'Top Placement Questions on Inheritance & Class Hierarchies',
      iconType: 'award',
      simpleDef: 'Core technical viva and campus placement questions asked by top IT recruiters on inheritance.',
      interviewQuestions: [
        {
          q: 'What is an "Is-A" relationship versus a "Has-A" relationship?',
          a: '"Is-A" represents inheritance (e.g. Dog Is-A Animal, Apple Is-A Fruit). "Has-A" represents composition/aggregation (e.g. Car Has-A Engine, House Has-A Room). If two entities do not pass the "Is-A" test, never use inheritance.'
        },
        {
          q: 'Are constructors inherited by subclasses in Java or C++?',
          a: 'NO! Constructors are never inherited. Subclasses must define their own constructors. However, the subclass constructor must call a parent constructor (implicitly or explicitly via super()) before initializing its own state.'
        },
        {
          q: 'What is the Diamond Problem, and how does Java resolve it?',
          a: 'The Diamond Problem occurs in multiple inheritance when a class inherits from two parent classes that share a common grandparent. If both parents override a method, the child has ambiguity regarding which method to call. Java solves this by prohibiting multiple inheritance of classes, allowing multiple inheritance only through interfaces.'
        },
        {
          q: 'What is the role of the super keyword in Java?',
          a: 'The super keyword is used in subclasses to: 1. Invoke the parent class constructor (super(args)), 2. Call an overridden parent method (super.makeSound()), and 3. Access a hidden parent field.'
        },
        {
          q: 'Can a subclass access private members of its parent class?',
          a: 'No. Private members are visible strictly inside the declaring class. Subclasses can only access them indirectly through inherited public or protected getter/setter methods.'
        }
      ],
      companyTags: ['TCS', 'Infosys', 'Accenture', 'Cognizant', 'Wipro'],
      companyAttribution: 'Reported in technical interview assessments at: TCS • Infosys • Accenture • Cognizant • Wipro',
      highlights: {
        quickRemember: 'Is-A = Inheritance. Has-A = Composition. Constructors are NOT inherited.',
        interviewTip: 'State the initialization order clearly: Static blocks → Instance initialization blocks → Parent constructor → Child constructor.',
        commonMistake: 'Saying constructors are inherited.'
      }
    },
    {
      cardNumber: 10,
      stepKey: 'quick-revision',
      title: 'Inheritance Revision Cheat Sheet',
      subtitle: '60-Second Memory Anchor',
      iconType: 'check',
      simpleDef: 'Instant memory anchors for Inheritance right before technical interviews.',
      cheatSheet: {
        WHAT: 'Child class acquires state and methods from parent class (Is-A relationship).',
        WHY: 'Code reuse, elimination of duplication (DRY), and subtype runtime polymorphism.',
        HOW: 'Declare \`class Child extends Parent\` → call \`super()\` in child constructor.',
        KEY_POINT: 'Parent constructor ALWAYS executes before the child constructor body.',
        COMMON_TRAP: 'Java does NOT support multiple class inheritance (avoids Diamond Problem ambiguity).',
        INTERVIEW_TIP: 'Constructors are NEVER inherited! Favor Composition over Inheritance when Has-A.',
        SYNTAX: 'class Dog extends Animal { public Dog(String n) { super(n); } }'
      },
      visualType: 'inheritance-cheat-sheet',
      highlights: {
        quickRemember: 'Inheritance = Is-A Relationship. Code reuse + subtype polymorphism.',
        interviewTip: 'Always remember: Constructors are not inherited; super() links the chain.',
        commonMistake: 'Confusing inheritance with composition.'
      }
    }
  ],`;

const combinedReplacement = `${ENCAPSULATION_CARDS}\n\n${ABSTRACTION_CARDS}\n\n${INHERITANCE_CARDS}`;

// Locate from '  // =========================================================================\n  // 3. ENCAPSULATION'
// to right before '  // =========================================================================\n  // 6. POLYMORPHISM'
const startMarker = "  // =========================================================================\n  // 3. ENCAPSULATION";
const endMarker = "  // =========================================================================\n  // 6. POLYMORPHISM";

const startIndex = fileContent.indexOf(startMarker);
const endIndex = fileContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error("Failed to find start or end marker!");
  process.exit(1);
}

const newContent = fileContent.slice(0, startIndex) + combinedReplacement + "\n\n" + fileContent.slice(endIndex);

fs.writeFileSync(targetFile, newContent, 'utf-8');
console.log("Successfully replaced encapsulation, abstraction, and inheritance in oopsTopicCardsData.js!");
