/**
 * MASTER OOPS 10-CARD DEEP LEARNING CURRICULUM
 * 
 * Provides EXACTLY 10 visual learning steps for EVERY canonical OOPS topic:
 * Card 1: What is it? (Beginner definition, one-line meaning, analogy, visual, in simple words)
 * Card 2: Why do we need it? (Problem first: Without vs With concept comparison)
 * Card 3: How does it work? (Visual flow, step-by-step pipeline)
 * Card 4: Syntax (Concise code in Java, Python, C++, highlighted parts)
 * Card 5: Real-World Example (Memorable everyday scenario)
 * Card 6: Types / Variations (Hierarchy, variations, relationships)
 * Card 7: Working Example (Complete small example, execution trace, output)
 * Card 8: Common Mistakes (❌ Mistake vs ✅ Correct, Interview trap)
 * Card 9: Interview & Placement (Questions, MCQ pattern, quick answer, company reporting tags)
 * Card 10: Quick Revision Cheat Sheet (WHAT, WHY, HOW, KEY POINT, COMMON TRAP, INTERVIEW TIP, SYNTAX)
 */

import { resolveOOPSTopicId } from './oopsTopicDataRegistry.js';

export const OOPS_TOPIC_CARDS = {
  // =========================================================================
  // 1. INTRODUCTION TO OOPS (What is OOPS?)
  // =========================================================================
  'intro-to-oops': [
    {
      cardNumber: 1,
      stepKey: 'what-is-it',
      title: 'What is OOPS?',
      subtitle: 'The Real-World Object Paradigm',
      iconType: 'paradigm',
      simpleDef: 'OOPS is a programming paradigm that models software around real-world objects that package state (data) and behavior (methods) together.',
      oneLineMeaning: 'Software designed as interacting objects that mirror real-world entities.',
      inSimpleWords: 'Instead of loose variables and separate functions floating everywhere, OOPS packages them together inside cohesive capsules called Objects.',
      realWorldAnalogy: {
        concept: 'Real Smartphone vs Loose Components',
        example: 'A smartphone packages its battery level, storage, and screen together with calling and texting actions into one handheld phone, instead of keeping bare loose circuits on your desk.'
      },
      visualType: 'oops-paradigm',
      highlights: {
        quickRemember: 'OOPS = State (Attributes) + Behavior (Methods) packed in an Object.',
        interviewTip: 'Interviewers ask: "Why OOPS over Procedural?" Answer: OOPS binds data directly to the functions that operate on it, preventing unauthorized global tampering.',
        commonMistake: 'Thinking OOPS is just syntax sugar for structs. OOPS provides encapsulation, abstraction, inheritance, and dynamic polymorphism.'
      }
    },
    {
      cardNumber: 2,
      stepKey: 'why-need-it',
      title: 'Why Do We Need OOPS?',
      subtitle: 'Procedural Chaos vs Object Harmony',
      iconType: 'shield',
      simpleDef: 'In procedural code, global variables can be modified by any function from anywhere, causing untraceable bugs and zero data security.',
      withoutVsWith: {
        withoutTitle: 'WITHOUT OOPS (Procedural)',
        withoutPoints: [
          'Global variables accessible to any rogue function',
          'Data and functions are disconnected and scattered',
          'A change to a data structure breaks every function in the codebase',
          'High risk of corrupted data (e.g. balance = -5000 allowed anywhere)'
        ],
        withTitle: 'WITH OOPS (Object-Oriented)',
        withPoints: [
          'Data is private and protected inside object boundaries',
          'Only authorized methods can modify an object’s state',
          'Reusable blueprints (Classes) eliminate code duplication',
          'Software scales gracefully as complex systems grow'
        ]
      },
      visualType: 'procedural-vs-oops',
      highlights: {
        quickRemember: 'Without OOPS: Data is exposed. With OOPS: Data is shielded behind methods.',
        interviewTip: 'Highlight "High Cohesion and Low Coupling" when explaining why modern systems prefer OOPS.',
        commonMistake: 'Writing classes where every field is public. That turns your OOPS code right back into procedural code with classes!'
      }
    },
    {
      cardNumber: 3,
      stepKey: 'how-it-works',
      title: 'How Does OOPS Work?',
      subtitle: 'From Blueprint to Running Software',
      iconType: 'flow',
      simpleDef: 'OOPS programs work through classes defining blueprints, objects instantiating in memory, and message passing between methods.',
      flowSteps: [
        { step: 1, label: 'Define Class', desc: 'Design the blueprint declaring attributes (data) and methods (behavior).' },
        { step: 2, label: 'Instantiate Object', desc: 'Use new (or constructor) to allocate memory on the heap for a live instance.' },
        { step: 3, label: 'Store State', desc: 'The object holds its own isolated values in memory (e.g. brand="BMW", speed=0).' },
        { step: 4, label: 'Message Passing', desc: 'Call methods (car.accelerate()) to inspect or mutate state under strict rules.' }
      ],
      visualType: 'oops-lifecycle-flow',
      highlights: {
        quickRemember: 'Blueprint (Class) → Instantiation (new) → Live State (Object in Heap) → Invocation (Method Call).',
        interviewTip: 'Objects communicate through "message passing" — calling methods on each other rather than tampering with internals.',
        commonMistake: 'Confusing class loading (reading bytecode) with object instantiation (allocating heap memory).'
      }
    },
    {
      cardNumber: 4,
      stepKey: 'syntax',
      title: 'OOPS Core Syntax',
      subtitle: 'Writing Classes and Objects Cleanly',
      iconType: 'code',
      simpleDef: 'A class declaration with fields, constructor, and methods across our supported languages.',
      codeSnippets: {
        Java: `class Car {
    String brand; // State
    int speed;

    void drive() { // Behavior
        System.out.println(brand + " drives at " + speed + " km/h");
    }
}
Car myCar = new Car(); // Object creation`,
        Python: `class Car:
    def __init__(self, brand, speed):
        self.brand = brand # State
        self.speed = speed

    def drive(self): # Behavior
        print(f"{self.brand} drives at {self.speed} km/h")

my_car = Car("Tesla", 80) # Object creation`,
        'C++': `class Car {
public:
    string brand; // State
    int speed;

    void drive() { // Behavior
        cout << brand << " drives at " << speed << " km/h" << endl;
    }
};
Car myCar; // Object creation`
      },
      syntaxNotes: [
        'Class name: PascalCase convention (e.g. Car, BankAccount).',
        'State: Attributes/fields holding data inside the class.',
        'Behavior: Member functions operating on the attributes.'
      ],
      highlights: {
        quickRemember: 'Class keyword defines structure; instantiation creates the active memory entity.',
        interviewTip: 'In C++, stack-allocated objects (Car c) are destroyed automatically; heap objects (new Car()) require deletion or smart pointers.',
        commonMistake: 'Forgetting the semicolon at the end of class declaration in C++: `class Car { };`.'
      }
    },
    {
      cardNumber: 5,
      stepKey: 'real-world-example',
      title: 'Real-World Example: Smart Home Devices',
      subtitle: 'Modeling Everyday Technology',
      iconType: 'home',
      simpleDef: 'A SmartLight class models real light bulbs with state (isOn, brightnessLevel, color) and actions (turnOn, dim, setColor).',
      realWorldScenario: {
        entity: 'Smart Light Bulb',
        attributes: ['isOn (boolean: true/false)', 'brightness (int: 0 to 100%)', 'color (string: "Warm White")'],
        behaviors: ['turnOn() - activates light', 'dim(amount) - safely throttles percentage', 'toggle() - switches power state'],
        instances: ['livingRoomLight = new SmartLight("Warm White", 80)', 'bedroomLight = new SmartLight("Soft Blue", 40)']
      },
      visualType: 'smart-device-object',
      highlights: {
        quickRemember: 'Every object has identity, state, and behavior.',
        interviewTip: 'In object modeling interviews, always identify state first, then the invariants, then the public operations.',
        commonMistake: 'Putting unrelated operations inside an entity (violating Single Responsibility Principle).'
      }
    },
    {
      cardNumber: 6,
      stepKey: 'types-variations',
      title: 'The 4 Pillars of OOPS',
      subtitle: 'The Four Foundational Cornerstones',
      iconType: 'layers',
      simpleDef: 'All object-oriented software rests on four fundamental pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism.',
      typesList: [
        { name: '1. Encapsulation', desc: 'Data Hiding: Bundles data & methods into a protective capsule with controlled access.', icon: 'Lock' },
        { name: '2. Abstraction', desc: 'Hiding Complexity: Shows only essential controls and conceals complex internal mechanics.', icon: 'Eye' },
        { name: '3. Inheritance', desc: 'Reusability: Subclasses derive attributes and methods from superclasses (Is-A).', icon: 'GitFork' },
        { name: '4. Polymorphism', desc: 'Multiple Forms: One uniform interface behaving differently across distinct objects.', icon: 'Boxes' }
      ],
      visualType: 'oops-four-pillars',
      highlights: {
        quickRemember: 'Encapsulation = Hide Data. Abstraction = Hide Complexity. Inheritance = Code Reuse. Polymorphism = Multiple Behaviors.',
        interviewTip: 'Memorize this exact one-line differentiation — interviewers at TCS and Infosys test this first!',
        commonMistake: 'Mixing up Encapsulation (data security) with Abstraction (design simplification).'
      }
    },
    {
      cardNumber: 7,
      stepKey: 'working-example',
      title: 'Working Example: End-to-End Execution',
      subtitle: 'From Instantiation to Method Output',
      iconType: 'play',
      simpleDef: 'Watch a complete OOPS program instantiate two independent objects with separate state and execute actions.',
      codeSnippets: {
        Java: `class Student {
    String name;
    int score;

    void displayStatus() {
        System.out.println(name + " score: " + score);
    }
}
public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        s1.name = "Aman"; s1.score = 92;

        Student s2 = new Student();
        s2.name = "Priya"; s2.score = 98;

        s1.displayStatus(); // Aman score: 92
        s2.displayStatus(); // Priya score: 98
    }
}`,
        Python: `class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def display_status(self):
        print(f"{self.name} score: {self.score}")

s1 = Student("Aman", 92)
s2 = Student("Priya", 98)
s1.display_status() # Aman score: 92
s2.display_status() # Priya score: 98`,
        'C++': `#include <iostream>
using namespace std;

class Student {
public:
    string name;
    int score;

    void displayStatus() {
        cout << name << " score: " << score << endl;
    }
};

int main() {
    Student s1; s1.name = "Aman"; s1.score = 92;
    Student s2; s2.name = "Priya"; s2.score = 98;
    s1.displayStatus();
    s2.displayStatus();
    return 0;
}`
      },
      expectedOutput: "Aman score: 92\nPriya score: 98",
      executionTrace: [
        's1 is allocated on the heap with memory for name="Aman" and score=92.',
        's2 is allocated on a completely separate heap address with its own memory.',
        'Modifying s1 never touches or corrupts s2.'
      ],
      highlights: {
        quickRemember: 'Multiple objects derived from one class hold completely independent memory states.',
        interviewTip: 'In multi-threaded programs, state isolation per object prevents thread collisions on instance data.',
        commonMistake: 'Making fields `static` when each student needs their own score! Static shares one variable across all instances.'
      }
    },
    {
      cardNumber: 8,
      stepKey: 'common-mistakes',
      title: 'Common Mistakes & Traps',
      subtitle: 'What Beginners Get Wrong',
      iconType: 'alert',
      simpleDef: 'Avoid these classic conceptual misconceptions when learning object-oriented paradigms.',
      mistakesList: [
        {
          mistake: '❌ Confusing a Class with an Object',
          correct: '✅ A Class is just code text (blueprint); an Object is live allocated RAM memory.'
        },
        {
          mistake: '❌ Thinking OOPS means everything must be in one giant class',
          correct: '✅ OOPS works best when each class has ONE clear, focused responsibility.'
        },
        {
          mistake: '❌ Believing all languages implement OOPS identically',
          correct: '✅ Java uses class-based inheritance; Python uses dynamic typing; C++ supports multiple inheritance.'
        }
      ],
      interviewTrap: '⚠️ Interview Trap: "Is Java a pure Object-Oriented language?" Answer: No, because it supports primitive types (int, float, char) and static members that do not inherit from Object.',
      highlights: {
        quickRemember: 'Class = Template. Object = Instance in RAM.',
        interviewTip: 'Smalltalk and Ruby are pure OOP languages; Java and C++ are hybrid OOP languages.',
        commonMistake: 'Believing an object exists before `new` is invoked.'
      }
    },
    {
      cardNumber: 9,
      stepKey: 'interview-placement',
      title: 'Interview & Placement Patterns',
      subtitle: 'Reported Patterns from Campus Drives',
      iconType: 'award',
      simpleDef: 'Core OOPS questions reported frequently in campus placements and technical interviews.',
      interviewQuestions: [
        {
          q: 'What are the main advantages of OOPS over Procedural Programming?',
          a: 'Data hiding/security, code reusability through inheritance, modularity via classes, and extensibility via polymorphism.'
        },
        {
          q: 'What is message passing in OOPS?',
          a: 'The mechanism where one object triggers a method execution on another object to request information or actions.'
        }
      ],
      companyTags: ['TCS', 'Infosys', 'Wipro', 'Cognizant'],
      companyAttribution: 'Reported in assessments at: TCS • Infosys • Wipro',
      highlights: {
        quickRemember: 'Interviewers prioritize: 4 Pillars, Pure vs Hybrid OOP, and Real-World Modeling.',
        interviewTip: 'Always give a real-world example (Car, Bank, Student) before giving theoretical definitions.',
        commonMistake: 'Giving 5-minute textbook answers without explaining why the concept actually helps developers.'
      }
    },
    {
      cardNumber: 10,
      stepKey: 'quick-revision',
      title: 'Quick Revision Cheat Sheet',
      subtitle: '60-Second Placement Summary',
      iconType: 'check',
      simpleDef: 'Rapid memory anchors for Introduction to OOPS.',
      cheatSheet: {
        WHAT: 'Programming paradigm modeling software around real-world objects containing data and behavior.',
        WHY: 'Protects state, stops global variable bugs, makes code reusable and modular.',
        HOW: 'Define Class → Instantiate Object via new → Call methods on instance.',
        KEY_POINT: 'An Object has Identity, State (Attributes), and Behavior (Methods).',
        COMMON_TRAP: 'Java is NOT pure OOP due to primitive types (int, boolean, char).',
        INTERVIEW_TIP: 'Use the Blueprint vs Car analogy to instantly answer Class vs Object in interviews.',
        SYNTAX: 'class Name { type field; void method() { ... } }'
      },
      visualType: 'oops-cheat-sheet',
      highlights: {
        quickRemember: 'Review this card right before stepping into your technical interview.',
        interviewTip: 'Recite: "State + Behavior in a cohesive capsule = Object."',
        commonMistake: 'Skipping the real-world analogy in the first 10 seconds of your interview answer.'
      }
    }
  ],

  // =========================================================================
  // 2. CLASS AND OBJECT
  // =========================================================================
  'classes-and-objects': [
    {
      cardNumber: 1,
      stepKey: 'what-is-it',
      title: 'What is Class & Object?',
      subtitle: 'The Architectural Blueprint vs Concrete House',
      iconType: 'car-blueprint',
      simpleDef: 'A Class is the user-defined blueprint. An Object is the real instance created in memory from that blueprint.',
      oneLineMeaning: 'Class = Design on paper. Object = Actual physical thing in RAM.',
      inSimpleWords: 'You cannot live inside the architectural blueprint of a house. You build real brick houses from the blueprint and live in them!',
      realWorldAnalogy: {
        concept: 'Cookie Cutter vs Delicious Cookies',
        example: 'The metal cookie cutter is the Class (defines the shape). Each baked cookie cut out of the dough is an Object (it has weight, chocolate chips, and can be eaten).'
      },
      visualType: 'class-vs-object',
      highlights: {
        quickRemember: 'Class = Template (0 bytes heap). Object = Real Instance (allocated in heap RAM).',
        interviewTip: 'When asked: "Does a class take memory?" Answer: Class metadata is stored in Metaspace/Method Area, but object attribute memory is allocated on the heap only when instantiated.',
        commonMistake: 'Trying to store instance values in the class definition instead of creating an object instance.'
      }
    },
    {
      cardNumber: 2,
      stepKey: 'why-need-it',
      title: 'Why Do We Need Classes & Objects?',
      subtitle: 'Single Template, Infinite Independent Copies',
      iconType: 'shield',
      simpleDef: 'Classes allow you to write the design once and create thousands of independent objects without duplicating code.',
      withoutVsWith: {
        withoutTitle: 'WITHOUT Classes & Objects',
        withoutPoints: [
          'Duplicate code: Declare car1_brand, car1_speed, car2_brand, car2_speed...',
          'Massive repetitive functions for every single entity',
          'Impossible to manage 10,000 users or 500 bank accounts',
          'High risk of variable naming typos and out-of-sync state'
        ],
        withTitle: 'WITH Classes & Objects',
        withPoints: [
          'Write one `class User` blueprint',
          'Instantiate 10,000 independent users with one line: `new User()`',
          'Every user has their own private memory space',
          'Adding a new feature to the Class instantly upgrades all objects'
        ]
      },
      visualType: 'class-need-comparison',
      highlights: {
        quickRemember: 'Write the template once; instantiate as many independent objects as needed.',
        interviewTip: 'Emphasize that classes provide a standard type definition, enabling strong type safety.',
        commonMistake: 'Creating a new separate class for every single individual user or car.'
      }
    },
    {
      cardNumber: 3,
      stepKey: 'how-it-works',
      title: 'How Class & Object Work in Memory',
      subtitle: 'Stack Reference vs Heap Allocation',
      iconType: 'flow',
      simpleDef: 'The object reference variable lives on the Call Stack; the actual object data resides in Heap Memory.',
      flowSteps: [
        { step: 1, label: 'Declaration', desc: 'Car myCar reserves a reference pointer on the thread’s Call Stack.' },
        { step: 2, label: 'Allocation (new)', desc: 'The JVM/Runtime allocates memory blocks on the Heap for brand and speed.' },
        { step: 3, label: 'Constructor Call', desc: 'Constructor initializes default or passed values inside the heap memory.' },
        { step: 4, label: 'Reference Binding', desc: 'The memory address (e.g. 0x40A2) is stored inside myCar on the Stack.' }
      ],
      visualType: 'stack-vs-heap-memory',
      highlights: {
        quickRemember: 'Reference on Stack → Points to Object in Heap.',
        interviewTip: 'If two references point to the same heap address (`Car c2 = c1`), changing c2 modifies c1!',
        commonMistake: 'Confusing passing an object reference with deep copying the object.'
      }
    },
    {
      cardNumber: 4,
      stepKey: 'syntax',
      title: 'Syntax: Declaring & Instantiating',
      subtitle: 'Writing Clean Class Definitions',
      iconType: 'code',
      simpleDef: 'How to declare attributes, methods, and create objects in Java, Python, and C++.',
      codeSnippets: {
        Java: `class Car {
    String color; // Instance variable
    void honk() { // Instance method
        System.out.println("Beep beep!");
    }
}
Car car1 = new Car(); // Instantiation
car1.color = "Red";
car1.honk();`,
        Python: `class Car:
    def __init__(self, color):
        self.color = color # Instance variable
    def honk(self):        # Instance method
        print("Beep beep!")

car1 = Car("Red") # Instantiation
car1.honk()`,
        'C++': `class Car {
public:
    string color; // Instance variable
    void honk() { // Instance method
        cout << "Beep beep!" << endl;
    }
};
Car car1; // Stack instantiation
car1.color = "Red";
car1.honk();`
      },
      syntaxNotes: [
        'new keyword: Allocates memory dynamically on the heap (Java, C++).',
        'self in Python: Explicit reference to the current invoking instance.',
        'Dot operator (.): Accesses fields and methods of an object.'
      ],
      highlights: {
        quickRemember: 'ClassName varName = new ClassName(); allocates and returns the heap reference.',
        interviewTip: 'In Python, `__init__` acts as the initializer, and every instance method must take `self`.',
        commonMistake: 'Forgetting `()` when instantiating: `Car c = new Car` is a compilation error in Java!'
      }
    },
    {
      cardNumber: 5,
      stepKey: 'real-world-example',
      title: 'Real-World Example: Bank Customer Account',
      subtitle: 'From Blueprint to Multiple Independent Accounts',
      iconType: 'bank',
      simpleDef: 'A BankAccount class defines accountNumber, holderName, and balance, with deposit() and withdraw() behaviors.',
      realWorldScenario: {
        entity: 'BankAccount Blueprint',
        instances: [
          'acc1: Account #101, "Rahul Sharma", Balance: ₹50,000',
          'acc2: Account #102, "Sneha Patel", Balance: ₹85,000'
        ],
        interaction: 'Rahul deposits ₹10,000 → acc1 balance becomes ₹60,000. Sneha’s balance remains completely unchanged at ₹85,000!'
      },
      visualType: 'bank-account-instances',
      highlights: {
        quickRemember: 'Each bank account object is completely isolated from all other customer accounts.',
        interviewTip: 'Use bank accounts to illustrate data isolation and encapsulation in placement interviews.',
        commonMistake: 'Thinking methods are duplicated in memory for each object. Methods are shared in code space; only data is duplicated per object!'
      }
    },
    {
      cardNumber: 6,
      stepKey: 'types-variations',
      title: 'Anatomy of a Class',
      subtitle: 'Members, Methods, and Modifiers',
      iconType: 'layers',
      simpleDef: 'A robust class contains attributes, constructors, methods, access modifiers, and nested members.',
      typesList: [
        { name: '1. Fields / Attributes', desc: 'Hold state data for each object instance.', icon: 'Boxes' },
        { name: '2. Constructors', desc: 'Special blocks called automatically to initialize new objects.', icon: 'Sparkles' },
        { name: '3. Methods', desc: 'Define operations, computations, and business logic.', icon: 'Code' },
        { name: '4. Getters / Setters', desc: 'Provide controlled reading and validated mutating of fields.', icon: 'Shield' }
      ],
      visualType: 'class-anatomy-diagram',
      highlights: {
        quickRemember: 'State (Fields) + Initialization (Constructors) + Behavior (Methods) = Class.',
        interviewTip: 'State should almost always be private; behavior should be selectively public.',
        commonMistake: 'Writing classes without constructors when mandatory parameters are required.'
      }
    },
    {
      cardNumber: 7,
      stepKey: 'working-example',
      title: 'Working Example: Car Factory in Action',
      subtitle: 'Instantiating and Mutating Objects',
      iconType: 'play',
      simpleDef: 'Observe how two cars accelerate at different rates without interfering with each other.',
      codeSnippets: {
        Java: `class Car {
    String model;
    int speed = 0;

    void accelerate(int delta) {
        speed += delta;
        System.out.println(model + " speed: " + speed + " km/h");
    }
}
public class Main {
    public static void main(String[] args) {
        Car tesla = new Car(); tesla.model = "Tesla Model 3";
        Car bmw = new Car();   bmw.model = "BMW M3";

        tesla.accelerate(40); // 40 km/h
        bmw.accelerate(65);   // 65 km/h
        tesla.accelerate(20); // 60 km/h
    }
}`,
        Python: `class Car:
    def __init__(self, model):
        self.model = model
        self.speed = 0

    def accelerate(self, delta):
        self.speed += delta
        print(f"{self.model} speed: {self.speed} km/h")

tesla = Car("Tesla Model 3")
bmw = Car("BMW M3")
tesla.accelerate(40) # 40 km/h
bmw.accelerate(65)   # 65 km/h
tesla.accelerate(20) # 60 km/h`,
        'C++': `#include <iostream>
using namespace std;

class Car {
public:
    string model;
    int speed = 0;

    void accelerate(int delta) {
        speed += delta;
        cout << model << " speed: " << speed << " km/h" << endl;
    }
};

int main() {
    Car tesla; tesla.model = "Tesla Model 3";
    Car bmw;   bmw.model = "BMW M3";
    tesla.accelerate(40);
    bmw.accelerate(65);
    tesla.accelerate(20);
    return 0;
}`
      },
      expectedOutput: "Tesla Model 3 speed: 40 km/h\nBMW M3 speed: 65 km/h\nTesla Model 3 speed: 60 km/h",
      highlights: {
        quickRemember: 'Method invocations update only the invoking object’s local fields.',
        interviewTip: '`this` keyword inside the method resolves to the specific invoking object.',
        commonMistake: 'Assuming `tesla` and `bmw` share the `speed` variable. They each have an independent `speed`.'
      }
    },
    {
      cardNumber: 8,
      stepKey: 'common-mistakes',
      title: 'Common Mistakes & Traps',
      subtitle: 'Pitfalls in Class & Object Usage',
      iconType: 'alert',
      simpleDef: 'Common errors made during object declaration, initialization, and reference copying.',
      mistakesList: [
        {
          mistake: '❌ NullPointerException (using uninstantiated reference)',
          correct: '✅ `Car c; c.honk();` crashes! You MUST initialize with `c = new Car();` before invoking.'
        },
        {
          mistake: '❌ Believing `c2 = c1` creates a new copy of the object',
          correct: '✅ `c2 = c1` copies the reference address, NOT the object! Both variables point to the SAME object.'
        },
        {
          mistake: '❌ Calling instance methods without an object',
          correct: '✅ Non-static methods require an active instance: `Car.honk()` is invalid; `myCar.honk()` is correct.'
        }
      ],
      interviewTrap: '⚠️ Interview Trap: "What happens when you do Car c1 = new Car(); Car c2 = c1; c2.speed = 100;?" Answer: Both c1.speed and c2.speed are 100 because only one object exists in the heap!',
      highlights: {
        quickRemember: 'Reference variables hold memory addresses, NOT object contents.',
        interviewTip: 'To create an actual independent copy, implement a Copy Constructor or clone method.',
        commonMistake: 'Comparing objects with `==` instead of `.equals()`. `==` checks reference addresses!'
      }
    },
    {
      cardNumber: 9,
      stepKey: 'interview-placement',
      title: 'Interview & Placement Patterns',
      subtitle: 'Top Questions on Class and Object',
      iconType: 'award',
      simpleDef: 'Core interview questions asked at TCS, Accenture, Capgemini, and Cognizant.',
      interviewQuestions: [
        {
          q: 'Differentiate between a Class and an Object.',
          a: 'A class is a logical blueprint with zero heap allocation; an object is a physical instance in RAM consuming heap memory.'
        },
        {
          q: 'What is an anonymous object?',
          a: 'An object instantiated without assigning it to a named reference variable (e.g. `new Car().honk();`), used for one-time operations.'
        }
      ],
      companyTags: ['TCS', 'Accenture', 'Capgemini'],
      companyAttribution: 'Reported in assessments at: TCS • Accenture • Capgemini',
      highlights: {
        quickRemember: 'Class = Template. Object = Tangible entity in Heap.',
        interviewTip: 'Be prepared to draw a simple Stack vs Heap memory diagram on the whiteboard.',
        commonMistake: 'Failing to mention that a class can exist without objects, but an object cannot exist without a class.'
      }
    },
    {
      cardNumber: 10,
      stepKey: 'quick-revision',
      title: 'Quick Revision Cheat Sheet',
      subtitle: '60-Second Class & Object Summary',
      iconType: 'check',
      simpleDef: 'Key points to review right before your placement round.',
      cheatSheet: {
        WHAT: 'Class is the blueprint; Object is the real instance in heap RAM.',
        WHY: 'Eliminates redundant variable declarations and enables infinite independent copies.',
        HOW: 'Define `class X {}` → instantiate `X obj = new X()` → access `obj.field`.',
        KEY_POINT: 'Reference variable lives on Stack; Object contents live on Heap.',
        COMMON_TRAP: 'Copying reference (`b = a`) copies address, not the object!',
        INTERVIEW_TIP: 'Use Cookie Cutter (Class) vs Baked Cookie (Object) analogy.',
        SYNTAX: 'Car myCar = new Car();'
      },
      visualType: 'class-cheat-sheet',
      highlights: {
        quickRemember: 'Review Stack reference vs Heap instance right before entering your interview.',
        interviewTip: 'Memorize: "An object is an instance of a class that encapsulates state and behavior."',
        commonMistake: 'Confusing object reference copying with deep cloning.'
      }
    }
  ],

  // =========================================================================
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
          'Any external function can write: `account.balance = -50000;` directly.',
          'Zero boundary checks, validation, or business rules enforced.',
          'No audit trail or logging when an object’s state changes.',
          'Changing an internal variable name breaks every external file in the project.'
        ],
        withTitle: 'WITH ENCAPSULATION (Private Fields + Controlled Methods)',
        withPoints: [
          'Fields are private: `private double balance;` prevents unauthorized writes.',
          '`deposit(amount)` and `withdraw(amount)` validate rules (e.g. amount > 0, amount <= balance).',
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
        Java: `class BankAccount {
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
}`,
        Python: `class BankAccount:
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
        return self.__balance`,
        'C++': `class BankAccount {
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
};`
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
          code: 'private double balance;\npublic void deposit(double amt) { ... }'
        },
        {
          name: '2. Getter / Setter Access Control',
          desc: 'Granular access control where individual fields are accessed through dedicated getField() and setField() methods with validation.',
          badge: 'Accessors',
          code: 'public int getAge() { return age; }\npublic void setAge(int a) { if (a > 0) age = a; }'
        },
        {
          name: '3. Read-Only Encapsulation',
          desc: 'Exposes only getter methods and completely omits setters. State is set once during construction and cannot be mutated externally.',
          badge: 'Read-Only',
          code: 'private final long accountId;\npublic long getAccountId() { return accountId; } // No setter!'
        },
        {
          name: '4. Validation-Based Setter',
          desc: 'Setters that strictly reject out-of-range, null, or logically illegal values before assigning to internal fields.',
          badge: 'Guarded',
          code: 'public void setScore(int s) {\n    if (s < 0 || s > 100) throw new IllegalArgumentException();\n    this.score = s;\n}'
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
        Java: `class BankAccount {
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
}`,
        Python: `class BankAccount:
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
print(f"Final balance: {int(account.get_balance())}")`,
        'C++': `#include <iostream>
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
}`
      },
      expectedOutput: "Initial balance: 1000\nDeposit 500: Success (Balance: 1500)\nWithdraw 300: Success (Balance: 1200)\nWithdraw 2000: Declined (Insufficient funds)\nFinal balance: 1200",
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
        HOW: 'Declare fields `private` → expose guarded `public` methods with strict validation.',
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
  ],

  // =========================================================================
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
        example: 'When you drive a car, you interact with three simple controls: the steering wheel, accelerator pedal, and brake pedal. You don\'t need to know fuel injection timing, combustion cylinder pressures, or ECU microcontroller voltages to drive. The complex mechanical and electronic execution is abstracted away behind a clean pedal interface.'
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
          'Callers invoke a clean 1-line contract: `payment.pay(500);` with zero protocol clutter.',
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
        Java: `// Interface: 100% Pure Abstract Contract
interface Payment {
    void pay(double amount); // abstract by default
}

// Concrete Implementation
class UPIPayment implements Payment {
    public void pay(double amount) {
        System.out.println("Processing UPI payment: Rs. " + (int)amount + " paid successfully via UPI ID.");
    }
}`,
        Python: `from abc import ABC, abstractmethod

# Abstract Base Class Contract
class Payment(ABC):
    @abstractmethod
    def pay(self, amount):
        pass # Abstract method: no implementation

# Concrete Implementation
class UPIPayment(Payment):
    def pay(self, amount):
        print(f"Processing UPI payment: Rs. {int(amount)} paid successfully via UPI ID.")`,
        'C++': `// Abstract Base Class with Pure Virtual Function
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
};`
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
          code: 'abstract class BasePayment {\n    String txId;\n    void logTx() { ... }\n    abstract void pay(double amt);\n}'
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
        Java: `interface Payment {
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
}`,
        Python: `from abc import ABC, abstractmethod

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
print("Payment completed: Checkout successful.")`,
        'C++': `#include <iostream>
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
}`
      },
      expectedOutput: "Processing UPI payment: Rs. 500 paid successfully via UPI ID.\nProcessing Card payment: Rs. 1200 paid successfully via Credit Card.\nPayment completed: Checkout successful.",
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
  ],

  // =========================================================================
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
        example: 'A Dog is an Animal. A Dog automatically inherits biological functions (breathing, eating, sleeping) from the general Animal category, but specializes by barking. You don\'t redefine breathing for every animal species!'
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
          'Violates the DRY (Don\'t Repeat Yourself) principle.'
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
        interviewTip: 'Private members of a parent class ARE in the child\'s memory footprint, but are NOT directly accessible by name (accessible only via parent public/protected methods).',
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
        Java: `// Superclass / Parent
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
}`,
        Python: `# Superclass / Parent
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
        print(f"{self.name} says: Woof Woof!")`,
        'C++': `#include <iostream>
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
};`
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
        commonMistake: 'Adding batteryCapacity to the base Vehicle class when petrol cars and bicycles don\'t have large propulsion batteries!'
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
          code: 'class Dog extends Animal { ... }\nclass Cat extends Animal { ... }'
        },
        {
          name: '4. Multiple Inheritance',
          desc: 'A single child class inherits from multiple parent classes (A, B → C). Supported in C++ and Python. FORBIDDEN for classes in Java to prevent Diamond Problem ambiguity.',
          badge: 'A, B → C',
          code: 'class SmartPhone(Camera, Phone): # Python\nclass Smartphone : public Camera, public Phone { }; // C++'
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
        Java: `class Animal {
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
}`,
        Python: `class Animal:
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
a1.fetch()`,
        'C++': `#include <iostream>
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
}`
      },
      expectedOutput: "Buddy says: Woof Woof!\nWhiskers says: Meow Meow!\nBuddy is fetching the tennis ball!",
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
          correct: '✅ In Java, always use @Override. If your parameter types or counts don\'t match the parent method exactly, you created an overload by mistake!'
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
        HOW: 'Declare `class Child extends Parent` → call `super()` in child constructor.',
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
  ],

  // =========================================================================
  // 6. POLYMORPHISM
  // =========================================================================
  'polymorphism': [
    {
      cardNumber: 1,
      stepKey: 'what-is-it',
      title: 'What is Polymorphism?',
      subtitle: 'Many Forms, Single Interface',
      iconType: 'shapes',
      simpleDef: 'Polymorphism (Greek for "many forms") is the ability of a single interface or method call to execute different behaviors depending on the actual object.',
      oneLineMeaning: 'One interface, multiple implementations.',
      inSimpleWords: 'You tell different animals to "speak()". A Dog barks, a Cat meows, a Cow moos. The command is identical (`speak()`), but the behavior adapts to each animal!',
      realWorldAnalogy: {
        concept: 'Smartphone Power Button',
        example: 'One single power button does different things: press once = sleep screen; long press = shutdown menu; double tap = launch camera. Same button, multiple behaviors!'
      },
      visualType: 'polymorphism-forms',
      highlights: {
        quickRemember: 'One message/interface → Different behaviors depending on object type.',
        interviewTip: 'Polymorphism allows you to write generic code that works on base types while triggering specialized subclass behaviors automatically.',
        commonMistake: 'Thinking polymorphism is only method overriding. Polymorphism includes compile-time (overloading) and runtime (overriding).'
      }
    },
    {
      cardNumber: 2,
      stepKey: 'why-need-it',
      title: 'Why Do We Need Polymorphism?',
      subtitle: 'Eliminating Ugly If-Else Cascades',
      iconType: 'shield',
      simpleDef: 'Without polymorphism, code is littered with brittle `if-else` or `switch` statements checking object types.',
      withoutVsWith: {
        withoutTitle: 'WITHOUT Polymorphism (Brittle If-Else)',
        withoutPoints: [
          'Messy code: `if (shape == "CIRCLE") drawCircle() else if (shape == "RECT") drawRect()...`',
          'Adding a new Triangle shape requires modifying every single if-else statement across the codebase!',
          'High risk of forgetting to update a switch case',
          'Violates Open/Closed Principle'
        ],
        withTitle: 'WITH Polymorphism (Clean Dynamic Dispatch)',
        withPoints: [
          'One clean line: `shape.draw();`',
          'The runtime automatically calls `Circle.draw()` or `Rectangle.draw()`',
          'Adding `Triangle` requires ZERO edits to existing loops or functions',
          'Extremely scalable, robust, and clean architecture'
        ]
      },
      visualType: 'polymorphism-need-comparison',
      highlights: {
        quickRemember: 'Polymorphism replaces brittle if-else switch cascades with extensible class hierarchies.',
        interviewTip: 'Quote: "Polymorphism makes code open for extension but closed for modification (Open/Closed Principle)."',
        commonMistake: 'Writing manual `instanceof` checks when a virtual method call does the job cleanly.'
      }
    },
    {
      cardNumber: 3,
      stepKey: 'how-it-works',
      title: 'How Runtime Polymorphism Works: The V-Table',
      subtitle: 'Dynamic Method Dispatch Behind the Scenes',
      iconType: 'flow',
      simpleDef: 'The runtime resolves which method to invoke based on the actual object in Heap memory, using a Virtual Method Table (vtable).',
      flowSteps: [
        { step: 1, label: 'Base Reference', desc: '`Animal a = new Dog();` declares a reference of type Animal.' },
        { step: 2, label: 'Method Call', desc: 'Compiler checks that Animal has a `speak()` method.' },
        { step: 3, label: 'V-Table Lookup', desc: 'At runtime, the JVM looks up the vtable of the real heap object (`Dog`).' },
        { step: 4, label: 'Dynamic Execution', desc: 'Dog’s `bark()` implementation executes, NOT Animal’s generic method!' }
      ],
      visualType: 'vtable-dispatch-diagram',
      highlights: {
        quickRemember: 'Reference type decides what you CAN call; Object type in Heap decides WHICH version executes.',
        interviewTip: 'Virtual Method Table (vtable) contains function pointers to overridden methods for dynamic dispatch.',
        commonMistake: 'Thinking variables are polymorphic. Variables in Java are resolved at compile-time by reference type, NOT dynamically!'
      }
    },
    {
      cardNumber: 4,
      stepKey: 'syntax',
      title: 'Compile-Time vs Runtime Polymorphism',
      subtitle: 'The Two Major Branches',
      iconType: 'code',
      simpleDef: 'Compile-Time Polymorphism (Method Overloading) vs Runtime Polymorphism (Method Overriding).',
      codeSnippets: {
        Java: `// 1. Compile-Time (Overloading): Same method name, different parameters
class MathUtil {
    int add(int a, int b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}

// 2. Runtime (Overriding): Child replaces parent implementation
class Animal {
    void speak() { System.out.println("Animal sound"); }
}
class Dog extends Animal {
    @Override
    void speak() { System.out.println("Bark!"); }
}`,
        Python: `# Runtime Polymorphism in Python
class Dog:
    def speak(self): return "Bark!"
class Cat:
    def speak(self): return "Meow!"

for animal in [Dog(), Cat()]:
    print(animal.speak()) # Duck typing in action`,
        'C++': `// In C++, virtual keyword is required for runtime polymorphism
class Animal {
public:
    virtual void speak() { cout << "Animal sound" << endl; }
    virtual ~Animal() = default;
};
class Dog : public Animal {
public:
    void speak() override { cout << "Bark!" << endl; }
};`
      },
      syntaxNotes: [
        'Method Overloading: Resolved at compile time based on parameter types.',
        'Method Overriding: Resolved at runtime based on actual heap object.',
        'C++ requires `virtual` keyword; in Java, all non-static, non-final methods are virtual by default.'
      ],
      highlights: {
        quickRemember: 'Overloading = Static / Compile-Time. Overriding = Dynamic / Runtime.',
        interviewTip: 'In C++, if you omit `virtual`, the base class method runs instead of the derived version!',
        commonMistake: 'Forgetting `@Override` annotation in Java. The annotation catches spelling errors at compile-time.'
      }
    },
    {
      cardNumber: 5,
      stepKey: 'real-world-example',
      title: 'Real-World Example: Shape Drawing Studio',
      subtitle: 'Unified Drawing Canvas',
      iconType: 'shapes',
      simpleDef: 'A graphic canvas holds a list of shapes (`Shape[]`). When `canvas.render()` runs, it calls `s.draw()` on each shape.',
      realWorldScenario: {
        collection: 'Shape[] shapes = { new Circle(5), new Rectangle(4, 6), new Triangle(3, 8) };',
        loop: 'for (Shape s : shapes) { s.draw(); }',
        result: [
          'Circle calculates radius and renders curve (πr²)',
          'Rectangle renders 4 right angles (w × h)',
          'Triangle renders 3 connected vertices'
        ],
        takeaway: 'The canvas loop knows nothing about circles or rectangles — it simply calls `draw()` on the Shape interface!'
      },
      visualType: 'polymorphic-shapes-matrix',
      highlights: {
        quickRemember: 'Single loop renders circles, rectangles, and triangles uniformly.',
        interviewTip: 'Use the Shape Area or Notification Dispatcher example in technical interviews.',
        commonMistake: 'Writing shape-specific rendering code inside the main canvas loop.'
      }
    },
    {
      cardNumber: 6,
      stepKey: 'types-variations',
      title: 'Types of Polymorphism',
      subtitle: 'Static vs Dynamic Polymorphism',
      iconType: 'layers',
      simpleDef: 'Categorization into Static (Compile-time) and Dynamic (Runtime) polymorphism.',
      typesList: [
        { name: '1. Static / Compile-Time', desc: 'Method Overloading & Operator Overloading (resolved by compiler).', icon: 'Code' },
        { name: '2. Dynamic / Runtime', desc: 'Method Overriding via Virtual Dispatch (resolved by JVM/runtime vtable).', icon: 'RotateCw' },
        { name: '3. Parametric Polymorphism', desc: 'Generics / Templates (e.g. `List<T>`, `vector<T>`).', icon: 'Boxes' }
      ],
      visualType: 'polymorphism-types-diagram',
      highlights: {
        quickRemember: 'Compile-Time = Fast, early binding. Runtime = Flexible, late binding.',
        interviewTip: 'Java does NOT support user-defined operator overloading (unlike C++ and Python).',
        commonMistake: 'Calling static method overriding "polymorphic". Static methods are shadowed, NOT overridden!'
      }
    },
    {
      cardNumber: 7,
      stepKey: 'working-example',
      title: 'Working Example: Dynamic Dispatch in Action',
      subtitle: 'Parent Reference, Child Execution',
      iconType: 'play',
      simpleDef: 'A base Animal reference invoking overridden methods across an array of varied animals.',
      codeSnippets: {
        Java: `class Animal {
    void sound() { System.out.println("Animal sound"); }
}
class Dog extends Animal {
    void sound() { System.out.println("Bark!"); }
}
class Cat extends Animal {
    void sound() { System.out.println("Meow!"); }
}
public class Main {
    public static void main(String[] args) {
        Animal[] pets = { new Dog(), new Cat(), new Animal() };
        for (Animal a : pets) {
            a.sound(); // Dynamically dispatched!
        }
    }
}`,
        Python: `class Animal:
    def sound(self): print("Animal sound")
class Dog(Animal):
    def sound(self): print("Bark!")
class Cat(Animal):
    def sound(self): print("Meow!")

pets = [Dog(), Cat(), Animal()]
for a in pets:
    a.sound()`,
        'C++': `#include <iostream>
#include <vector>
using namespace std;

class Animal {
public:
    virtual void sound() { cout << "Animal sound" << endl; }
    virtual ~Animal() = default;
};
class Dog : public Animal {
public:
    void sound() override { cout << "Bark!" << endl; }
};
class Cat : public Animal {
public:
    void sound() override { cout << "Meow!" << endl; }
};
int main() {
    vector<Animal*> pets = { new Dog(), new Cat(), new Animal() };
    for (auto a : pets) a->sound();
    for (auto a : pets) delete a;
    return 0;
}`
      },
      expectedOutput: "Bark!\nMeow!\nAnimal sound",
      highlights: {
        quickRemember: 'Even though array type is `Animal[]`, the output executes Dog and Cat sounds.',
        interviewTip: 'Notice the third element is a plain `Animal`, so it prints "Animal sound". Polymorphism adapts dynamically.',
        commonMistake: 'Forgetting virtual destructors in C++ when deleting base pointers.'
      }
    },
    {
      cardNumber: 8,
      stepKey: 'common-mistakes',
      title: 'Common Mistakes & Traps',
      subtitle: 'Static Methods & Variable Shadowing',
      iconType: 'alert',
      simpleDef: 'Tricky traps where polymorphism does NOT apply as beginners expect.',
      mistakesList: [
        {
          mistake: '❌ Believing Variables are Polymorphic',
          correct: '✅ `Animal a = new Dog(); System.out.println(a.age);` prints Animal’s age, NOT Dog’s! Variables do not use virtual dispatch.'
        },
        {
          mistake: '❌ Trying to override `static` methods',
          correct: '✅ Static methods belong to the class, not instances. A subclass with same static signature SHADOWS/HIDES the parent method, but does not override it.'
        },
        {
          mistake: '❌ Trying to override `private` or `final` methods',
          correct: '✅ `final` prevents overriding; `private` is not visible to the child class.'
        }
      ],
      interviewTrap: '⚠️ Interview Trap: "Can we override static methods in Java?" Answer: NO! Static methods are resolved at compile-time by reference type (Method Hiding), not via dynamic virtual dispatch.',
      highlights: {
        quickRemember: 'Only non-static, non-private, non-final methods participate in runtime polymorphism.',
        interviewTip: 'Remember: Variables cannot be overridden; they are shadowed!',
        commonMistake: 'Answering "Yes" when asked if static methods can be overridden.'
      }
    },
    {
      cardNumber: 9,
      stepKey: 'interview-placement',
      title: 'Interview & Placement Patterns',
      subtitle: 'Top Questions on Polymorphism',
      iconType: 'award',
      simpleDef: 'Questions asked in TCS Ninja/Digital, Infosys DSE, and Wipro assessments.',
      interviewQuestions: [
        {
          q: 'What is Upcasting vs Downcasting?',
          a: 'Upcasting is assigning a child object to a parent reference (safe, automatic: `Animal a = new Dog()`). Downcasting is casting back to the child type (`Dog d = (Dog)a`, requires instanceof check to avoid ClassCastException).'
        },
        {
          q: 'What is the return type rule for method overriding?',
          a: 'The overriding method can return the same type or a subtype (Covariant Return Type).'
        }
      ],
      companyTags: ['TCS', 'Infosys', 'Cognizant'],
      companyAttribution: 'Reported in assessments at: TCS • Infosys • Cognizant',
      highlights: {
        quickRemember: 'Upcasting = Safe. Downcasting = Needs safety check.',
        interviewTip: 'Mention Covariant Return Types to show advanced language depth to placement interviewers.',
        commonMistake: 'Downcasting without verifying `instanceof`, leading to runtime ClassCastException.'
      }
    },
    {
      cardNumber: 10,
      stepKey: 'quick-revision',
      title: 'Quick Revision Cheat Sheet',
      subtitle: '60-Second Polymorphism Summary',
      iconType: 'check',
      simpleDef: 'Instant memory anchors for Polymorphism.',
      cheatSheet: {
        WHAT: 'Single interface/call triggering different behaviors depending on object type.',
        WHY: 'Eliminates if-else cascades; open for extension, closed for modification.',
        HOW: 'Subclasses override base methods → invoke via base class reference.',
        KEY_POINT: 'Methods are resolved dynamically (Heap object); Variables are resolved statically (Reference type).',
        COMMON_TRAP: 'Static, private, and final methods CANNOT be overridden.',
        INTERVIEW_TIP: 'Differentiate Overloading (Compile-Time) vs Overriding (Runtime) in under 10 seconds.',
        SYNTAX: 'Animal a = new Dog(); a.sound(); // Barks!'
      },
      visualType: 'polymorphism-cheat-sheet',
      highlights: {
        quickRemember: 'One Interface, Many Forms.',
        interviewTip: 'Say: "Polymorphism enables dynamic method dispatch via virtual tables at runtime."',
        commonMistake: 'Thinking variables are overridden dynamically.'
      }
    }
  ],

  // =========================================================================
  // 7. CONSTRUCTORS (Object Initialization Lifecycle)
  // =========================================================================
  'constructors': [
    {
      cardNumber: 1,
      stepKey: 'what-is-it',
      title: 'What is a Constructor?',
      subtitle: 'The Object Initialization Mechanism',
      iconType: 'zap',
      simpleDef: 'A constructor is a special member method automatically invoked when an object is instantiated using the `new` keyword, designed specifically to allocate memory and initialize the object’s starting state.',
      oneLineMeaning: 'A dedicated initialization method that executes automatically upon object creation.',
      inSimpleWords: 'When you purchase a brand-new smartphone, the factory setup initializes storage, loads the OS, and configures default settings before handing it to you. A constructor does the exact same thing for a digital object in memory!',
      realWorldAnalogy: {
        concept: 'New Smartphone Factory Initialization',
        example: 'A factory installs the operating system, configures regional settings, and checks battery health before packing the phone. You never receive an uninitialized phone with raw unformatted memory.'
      },
      visualType: 'oops-constructors-diagram',
      highlights: {
        quickRemember: 'Constructor = Automatic setup runner. Executes once per object creation.',
        interviewTip: 'Always state: "A constructor is NOT an ordinary method: it shares the class name and has NO return type (not even void)."',
        commonMistake: 'Adding a return type like `void Student()` — this converts it into an ordinary method that will NEVER be called automatically during `new Student()`!'
      }
    },
    {
      cardNumber: 2,
      stepKey: 'why-need-it',
      title: 'Why Do We Need Constructors?',
      subtitle: 'Uninitialized Garbage vs Guaranteed Valid State',
      iconType: 'shield',
      simpleDef: 'Without constructors, every newly allocated object contains null, zero, or garbage values. Developers must manually call custom setup functions, risking catastrophic crashes from uninitialized objects.',
      withoutVsWith: {
        withoutTitle: 'WITHOUT Constructors (Manual & Dangerous)',
        withoutPoints: [
          'Fields hold garbage or null values upon allocation',
          'Developers must remember to manually call `init()` on every object',
          'Forgetting to call `init()` causes NullPointerExceptions or corrupt balances',
          'Immutability is impossible: private final fields cannot be initialized cleanly'
        ],
        withTitle: 'WITH Constructors (Guaranteed Safety)',
        withPoints: [
          'Object is guaranteed to start in a fully valid, verified state',
          'Mandatory parameters (e.g. Account Number, Name) enforced at compile-time',
          'Enables `final` immutable fields to be set once and locked forever',
          'Constructor fails immediately with an exception if initial parameters are invalid'
        ]
      },
      visualType: 'constructor-need-comparison',
      highlights: {
        quickRemember: 'Without: Broken objects with null/garbage data. With: Instant valid invariants.',
        interviewTip: 'Explain that constructors enforce business invariants (e.g. initial bank deposit must be >= 500) before any caller can touch the object.',
        commonMistake: 'Leaving fields public and setting them after creation instead of using parameterized constructors.'
      }
    },
    {
      cardNumber: 3,
      stepKey: 'how-it-works',
      title: 'How Constructors Work: The Object Creation Lifecycle',
      subtitle: 'From `new` Keyword to Valid Heap Instance',
      iconType: 'flow',
      simpleDef: 'When `new Student("Aman", 101)` executes, memory is first allocated on the Heap, default zero values are placed, the matching constructor is invoked to assign values, and finally the memory reference address is returned.',
      flowSteps: [
        { step: 1, label: 'Memory Allocation', desc: '`new` keyword requests bytes on the Heap for all instance variables.' },
        { step: 2, label: 'Default Initialization', desc: 'JVM/runtime zeroes memory (numbers become 0/0.0, booleans false, references null).' },
        { step: 3, label: 'Parent Constructor Execution', desc: '`super()` executes first, initializing inherited base class properties.' },
        { step: 4, label: 'Constructor Body & Reference', desc: 'User constructor body runs (`this.name = name`), and the Heap reference address is returned.' }
      ],
      visualType: 'constructor-lifecycle-flow',
      highlights: {
        quickRemember: 'Allocation → Zero fill → super() call → Constructor body → Address returned.',
        interviewTip: 'Remember: In Java, `super()` is always the first statement executed in any constructor, either explicitly or implicitly by the compiler.',
        commonMistake: 'Thinking constructor allocates the memory. The `new` keyword allocates memory; the constructor only initializes that memory!'
      }
    },
    {
      cardNumber: 4,
      stepKey: 'syntax',
      title: 'Constructor Syntax across Languages',
      subtitle: 'Java, Python `__init__`, and C++ Initialization Lists',
      iconType: 'code',
      simpleDef: 'Constructors share the class name in Java and C++, while Python uses the special `__init__(self)` dunder method.',
      codeSnippets: {
        Java: `class Student {
    private String name;
    private int rollNo;

    // 1. Default (no-arg) Constructor
    public Student() {
        this.name = "Unknown";
        this.rollNo = 0;
    }

    // 2. Parameterized Constructor
    public Student(String name, int rollNo) {
        this.name = name;
        this.rollNo = rollNo;
    }
}`,
        Python: `class Student:
    # Python uses __init__ as its constructor initializer
    def __init__(self, name="Unknown", roll_no=0):
        self.name = name
        self.roll_no = roll_no

# Parameterized or default via default arguments
s1 = Student()
s2 = Student("Aman", 101)`,
        'C++': `#include <string>
using namespace std;

class Student {
private:
    string name;
    int rollNo;
public:
    // C++ Member Initializer List (preferred for efficiency)
    Student() : name("Unknown"), rollNo(0) {}
    Student(string n, int r) : name(n), rollNo(r) {}
};`
      },
      syntaxNotes: [
        'In Java and C++, constructor name MUST exactly match the class name.',
        'Python does NOT have traditional multiple constructor overloads; it uses `__init__` with default arguments or classmethods.',
        'C++ member initializer lists (`: name(n), rollNo(r)`) construct fields directly rather than default-constructing then reassigning.'
      ],
      highlights: {
        quickRemember: 'Java/C++: Same name as class, no return type. Python: `def __init__(self, ...)`.',
        interviewTip: 'In C++, explain why member initializer lists are faster: they avoid calling a default constructor followed by copy assignment.',
        commonMistake: 'Writing `def Student(self)` in Python instead of `def __init__(self)`. Python will treat `Student` as an ordinary method!'
      }
    },
    {
      cardNumber: 5,
      stepKey: 'real-world-example',
      title: 'Real-World Example: Student Admission Desk',
      subtitle: 'Guaranteeing Verified Enrollment Data',
      iconType: 'home',
      simpleDef: 'An admission desk never enrolls a student with empty blank paperwork. The registration constructor validates name, roll number, and department upon admission.',
      realWorldScenario: {
        domain: 'College University ERP',
        description: 'When an admission officer registers a candidate, the system calls `new Student("Priya Sharma", 202401, "Computer Science")`. The constructor validates the roll number format and assigns a starting GPA of 0.0.',
        takeaway: 'Constructors act as digital gatekeepers: invalid input is rejected before an illegal student record can enter the database.'
      },
      visualType: 'student-registration-diagram',
      highlights: {
        quickRemember: 'Constructor = Gatekeeper. Validates inputs before the object is allowed into the system.',
        interviewTip: 'Use a Bank Account or Student Admission model when asked to design a clean OOP class in interviews.',
        commonMistake: 'Leaving constructor parameters unvalidated (e.g. allowing negative age or empty student name).'
      }
    },
    {
      cardNumber: 6,
      stepKey: 'types-variations',
      title: 'Types of Constructors',
      subtitle: 'Default, Parameterized, Copy & Constructor Chaining',
      iconType: 'layers',
      simpleDef: 'Constructors come in distinct varieties tailored to different initialization needs: Default, Parameterized, Copy, and Chained.',
      typesList: [
        { name: '1. Default Constructor', desc: 'Takes zero parameters. Provided automatically by compiler ONLY if no custom constructors are declared.', icon: 'CheckCircle2' },
        { name: '2. Parameterized Constructor', desc: 'Accepts explicit arguments to initialize instance fields with caller-provided values.', icon: 'Sliders' },
        { name: '3. Copy Constructor', desc: 'Initializes a new object using an existing object of the same class (vital in C++ for deep copies).', icon: 'Copy' },
        { name: '4. Constructor Overloading', desc: 'Defining multiple constructors with different parameter signatures in the same class.', icon: 'GitFork' },
        { name: '5. Constructor Chaining (`this()`)', desc: 'Calling one constructor from another inside the same class using `this(...)` to avoid duplicate logic.', icon: 'Workflow' }
      ],
      visualType: 'constructor-types-diagram',
      highlights: {
        quickRemember: 'Default = 0 args. Parameterized = custom args. Copy = clone. Chained = `this()`.',
        interviewTip: 'If you declare ANY parameterized constructor in Java/C++, the compiler will REMOVE its automatic default constructor!',
        commonMistake: 'Forgetting that `this()` or `super()` must be the very FIRST line in a constructor body.'
      }
    },
    {
      cardNumber: 7,
      stepKey: 'working-example',
      title: 'Complete Working Example: Student Initialization',
      subtitle: 'Constructor Chaining and Verification',
      iconType: 'play',
      simpleDef: 'A complete, fully runnable program demonstrating default constructor, parameterized constructor, and constructor chaining with verified output.',
      codeSnippets: {
        Java: `class Student {
    private String name;
    private int rollNo;
    private int score;

    // Overloaded Constructor 1: Default
    public Student() {
        this("Guest Student", 999, 0); // Constructor Chaining via this()
    }

    // Overloaded Constructor 2: Parameterized
    public Student(String name, int rollNo, int score) {
        this.name = name;
        this.rollNo = rollNo;
        this.score = score;
    }

    public void display() {
        System.out.println("Roll " + rollNo + ": " + name + " | Score: " + score);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Aman Gupta", 101, 92);
        Student s2 = new Student("Priya Verma", 102, 98);
        Student s3 = new Student(); // Chained default

        s1.display();
        s2.display();
        s3.display();
    }
}`,
        Python: `class Student:
    def __init__(self, name="Guest Student", roll_no=999, score=0):
        self.name = name
        self.roll_no = roll_no
        self.score = score

    def display(self):
        print(f"Roll {self.roll_no}: {self.name} | Score: {self.score}")

# Object instantiation with arguments and defaults
s1 = Student("Aman Gupta", 101, 92)
s2 = Student("Priya Verma", 102, 98)
s3 = Student()

s1.display()
s2.display()
s3.display()`,
        'C++': `#include <iostream>
#include <string>
using namespace std;

class Student {
private:
    string name;
    int rollNo;
    int score;
public:
    // Delegating Constructor in C++11
    Student() : Student("Guest Student", 999, 0) {}

    Student(string name, int rollNo, int score) 
        : name(name), rollNo(rollNo), score(score) {}

    void display() const {
        cout << "Roll " << rollNo << ": " << name << " | Score: " << score << endl;
    }
};

int main() {
    Student s1("Aman Gupta", 101, 92);
    Student s2("Priya Verma", 102, 98);
    Student s3;

    s1.display();
    s2.display();
    s3.display();
    return 0;
}`
      },
      expectedOutput: "Roll 101: Aman Gupta | Score: 92\nRoll 102: Priya Verma | Score: 98\nRoll 999: Guest Student | Score: 0",
      executionTrace: [
        { step: 1, action: 'new Student("Aman Gupta", 101, 92)', state: 'Heap allocates s1 → fields set to Aman Gupta, 101, 92' },
        { step: 2, action: 'new Student("Priya Verma", 102, 98)', state: 'Heap allocates s2 → fields set to Priya Verma, 102, 98' },
        { step: 3, action: 'new Student()', state: 'Default constructor delegates via this() to set Guest Student, 999, 0' }
      ],
      highlights: {
        quickRemember: 'Both custom arguments and delegated defaults result in completely initialized objects.',
        interviewTip: 'Demonstrate constructor chaining (`this(...)`) to show clean code and zero logic duplication.',
        commonMistake: 'Duplicating field assignment code across multiple constructors instead of chaining.'
      }
    },
    {
      cardNumber: 8,
      stepKey: 'common-mistakes',
      title: 'Constructor Mistakes & Traps',
      subtitle: 'Compiler Secrets & Hidden Bugs',
      iconType: 'alert',
      simpleDef: 'Classic traps involving return types, default constructors, and chaining restrictions.',
      mistakesList: [
        {
          mistake: '❌ Adding a return type (e.g. `public void Student()`)',
          correct: '✅ Constructors NEVER have a return type, not even `void`! Adding `void` converts it into an ordinary method that is never called during `new Student()`.'
        },
        {
          mistake: '❌ Assuming compiler always provides a default constructor',
          correct: '✅ The moment you declare ANY constructor (e.g. `Student(String n)`), the compiler strictly withdraws the automatic default constructor. Calling `new Student()` will fail compilation!'
        },
        {
          mistake: '❌ Placing code before `this()` or `super()` call',
          correct: '✅ In Java, `this(...)` or `super(...)` MUST be the very first statement on line 1 of the constructor body, otherwise a compile-time error occurs.'
        }
      ],
      interviewTrap: '⚠️ Interview Trap: "Can a constructor be private in Java?" Answer: YES! A private constructor prevents external instantiation with `new`. It is the foundational pattern for Singleton classes (e.g. `Runtime.getRuntime()`) and Utility classes with only static methods (e.g. `java.lang.Math`).',
      highlights: {
        quickRemember: 'No return type. Compiler default vanishes once you write any constructor. `this()` on line 1.',
        interviewTip: 'Be ready to explain how Singleton uses a private constructor.',
        commonMistake: 'Thinking private constructors are useless or illegal.'
      }
    },
    {
      cardNumber: 9,
      stepKey: 'interview-placement',
      title: 'Constructor Placement Focus',
      subtitle: 'Top Technical Questions from Campus Recruitment',
      iconType: 'award',
      simpleDef: 'High-frequency constructor questions reported across TCS, Infosys, Wipro, and Cognizant technical rounds.',
      interviewQuestions: [
        {
          q: 'Can constructors be inherited or overridden in Java/C++?',
          a: 'NO! Constructors cannot be inherited or overridden because they belong exclusively to the class that declares them. A child class can only INVOKE a parent constructor using `super()` or a base initializer list, never override it.'
        },
        {
          q: 'What is constructor chaining and how is it achieved in Java vs C++?',
          a: 'Constructor chaining is the process of calling one constructor from another. Within the same class, Java uses `this(args)` on line 1; to call a parent constructor, it uses `super(args)`. C++11 achieves this via delegating constructors in the member initializer list.'
        },
        {
          q: 'What happens if a class defines only a parameterized constructor and you execute `new MyClass()`?',
          a: 'Compilation Error! Because a parameterized constructor exists, the compiler does not generate a default no-argument constructor. You must explicitly define a no-arg constructor if you wish to instantiate without arguments.'
        }
      ],
      companyTags: ['TCS', 'Infosys', 'Wipro', 'Cognizant'],
      companyAttribution: 'Reported in technical rounds at: TCS • Infosys • Wipro • Cognizant',
      highlights: {
        quickRemember: 'Constructors cannot be overridden or inherited; they can only be invoked.',
        interviewTip: 'Always mention that `super()` runs implicitly if not written explicitly.',
        commonMistake: 'Confusing constructor overloading (legal) with constructor overriding (illegal).'
      }
    },
    {
      cardNumber: 10,
      stepKey: 'quick-revision',
      title: 'Constructor Quick Revision Cheat Sheet',
      subtitle: '60-Second Mastery Anchor',
      iconType: 'check',
      simpleDef: 'Everything you need to recall about Constructors in under 60 seconds.',
      cheatSheet: {
        WHAT: 'Special method with class name and NO return type, invoked automatically on `new`.',
        WHY: 'Guarantees objects start in a safe, fully initialized, invariant-protected state.',
        HOW: 'Memory allocated on Heap → `super()` runs → constructor body initializes fields → reference returned.',
        KEY_POINT: 'Defining any custom constructor removes the automatic default constructor.',
        COMMON_TRAP: 'Adding `void` makes it a regular method; `this()` and `super()` must be line 1.',
        INTERVIEW_TIP: 'Constructors CAN be overloaded and chained, but CANNOT be overridden or inherited.',
        SYNTAX: 'public Student(String name, int roll) { this.name = name; this.roll = roll; }'
      },
      visualType: 'constructors-cheat-sheet',
      highlights: {
        quickRemember: 'Special method. Initializes state. Runs on `new`. Overloadable, not overridable.',
        interviewTip: 'Review the 5 types: Default, Parameterized, Copy, Overloaded, Chained.',
        commonMistake: 'Calling `Student()` directly like an ordinary function without `new`.'
      }
    }
  ],

  // =========================================================================
  // 8. METHOD OVERLOADING (Compile-Time Polymorphism)
  // =========================================================================
  'method-overloading': [
    {
      cardNumber: 1,
      stepKey: 'what-is-it',
      title: 'What is Method Overloading?',
      subtitle: 'Same Name, Distinct Signatures',
      iconType: 'git-fork',
      simpleDef: 'Method Overloading is a compile-time polymorphism feature where multiple methods within the same class share the EXACT same name but have DIFFERENT parameter lists (count, types, or order).',
      oneLineMeaning: 'Multiple methods sharing the same name but accepting different parameter signatures.',
      inSimpleWords: 'Imagine a calculator button labeled `calculateArea`. If you provide 1 number, it computes circle area (πr²). If you provide 2 numbers, it computes rectangle area (w × h). Same button name, different inputs!',
      realWorldAnalogy: {
        concept: 'Multi-Tool Swiss Army Knife',
        example: 'A Swiss Army Knife has multiple tools under the same "knife" casing. You pull out the blade for carving, scissors for paper, or corkscrew for a bottle. Same tool handle, different jobs depending on your need.'
      },
      visualType: 'overloading-fork',
      highlights: {
        quickRemember: 'Overloading = Same method name + Different parameter list in same class.',
        interviewTip: 'State clearly: "Method Overloading is Compile-Time (Static) Polymorphism because the compiler selects the target method before the program ever runs."',
        commonMistake: 'Thinking changing return type overloads a method. The parameter list MUST differ!'
      }
    },
    {
      cardNumber: 2,
      stepKey: 'why-need-it',
      title: 'Why Do We Need Method Overloading?',
      subtitle: 'API Cleanliness vs Naming Pollution',
      iconType: 'shield',
      simpleDef: 'Without method overloading, developers are forced to invent awkward, redundant method names for essentially the same logical operation on different data types.',
      withoutVsWith: {
        withoutTitle: 'WITHOUT Overloading (Cluttered API)',
        withoutPoints: [
          'Forced clunky names: `addTwoInts()`, `addThreeInts()`, `addDoubles()`, `addFloats()`',
          'Developers must remember dozens of different names for the same core task',
          'Code is rigid and unintuitive to read and consume',
          'Changing an argument type breaks caller code everywhere'
        ],
        withTitle: 'WITH Overloading (Clean & Intuitive API)',
        withPoints: [
          'One clean, memorable method name: `add(2, 3)` and `add(2.5, 3.5)`',
          'Intuitive API design like `System.out.println()` which accepts int, String, boolean, etc.',
          'Compiler handles signature matching automatically',
          'Improves readability and eliminates mental cognitive load'
        ]
      },
      visualType: 'overloading-need-comparison',
      highlights: {
        quickRemember: 'Overloading eliminates clunky names like `printInt`, `printString`, `printFloat`.',
        interviewTip: 'Mention standard library examples like `Math.max(int, int)` and `Math.max(double, double)`.',
        commonMistake: 'Overloading methods that perform completely unrelated actions just to reuse a name.'
      }
    },
    {
      cardNumber: 3,
      stepKey: 'how-it-works',
      title: 'How Overload Resolution Works: Compile-Time Binding',
      subtitle: 'The Compiler Signature Matching Pipeline',
      iconType: 'flow',
      simpleDef: 'When you call `multiply(10, 20)`, the compiler inspects method name, argument count, data types, and type promotions at compile time to bind the exact function address into bytecode.',
      flowSteps: [
        { step: 1, label: 'Identify Method Name', desc: 'Compiler filters all methods in the class matching the invoked name (e.g. `multiply`).' },
        { step: 2, label: 'Exact Signature Match', desc: 'Checks for identical parameter count and exact matching types: `multiply(int, int)`.' },
        { step: 3, label: 'Type Promotion / Widening', desc: 'If no exact match, promotes primitive types (e.g. `byte` → `short` → `int` → `long` → `float` → `double`).' },
        { step: 4, label: 'Static Early Binding', desc: 'Compiler emits an `invokestatic` or `invokevirtual` opcode directly targeted to the chosen signature.' }
      ],
      visualType: 'overload-resolution-pipeline',
      highlights: {
        quickRemember: 'Exact Match → Type Widening → Autoboxing → Varargs → Early Binding.',
        interviewTip: 'Emphasize that overload resolution happens at COMPILE TIME (Early Binding). Zero runtime overhead!',
        commonMistake: 'Expecting runtime dynamic dispatch for overloaded methods. Overloading is static.'
      }
    },
    {
      cardNumber: 4,
      stepKey: 'syntax',
      title: 'Method Overloading Syntax across Languages',
      subtitle: 'Java/C++ True Overloading vs Python Idiomatic Alternatives',
      iconType: 'code',
      simpleDef: 'Java and C++ natively support method overloading by signature. Python does NOT support traditional overloading and instead uses default arguments, variable arguments (`*args`), or `functools.singledispatch`.',
      codeSnippets: {
        Java: `class Calculator {
    // Overload 1: Two integers
    public int add(int a, int b) {
        return a + b;
    }

    // Overload 2: Three integers (different count)
    public int add(int a, int b, int c) {
        return a + b + c;
    }

    // Overload 3: Two doubles (different type)
    public double add(double a, double b) {
        return a + b;
    }
}`,
        Python: `class Calculator:
    # Python does NOT support Java-style method overloading!
    # Writing two def add() functions will simply overwrite the first one.
    # Idiomatic Python solution: default arguments or *args
    def add(self, a, b, c=None):
        if c is not None:
            return a + b + c
        return a + b

calc = Calculator()
print(calc.add(2, 3))       # 5
print(calc.add(2, 3, 4))    # 9`,
        'C++': `#include <iostream>
using namespace std;

class Calculator {
public:
    int add(int a, int b) {
        return a + b;
    }
    int add(int a, int b, int c) {
        return a + b + c;
    }
    double add(double a, double b) {
        return a + b;
    }
};`
      },
      syntaxNotes: [
        'In Java and C++, signatures differ by parameter count, parameter types, or sequence of types.',
        'In Python, redefining a method with the same name replaces the earlier definition. Use default parameters or `*args` instead.',
        'Return type does NOT participate in signature matching: `int f()` and `double f()` cannot coexist!'
      ],
      highlights: {
        quickRemember: 'Java/C++ = Native compile-time overloading. Python = Default args or `*args`.',
        interviewTip: 'Always clarify: "Python does not support traditional method overloading by signature because it is dynamically typed."',
        commonMistake: 'Declaring multiple `def add()` in Python and wondering why only the last one exists.'
      }
    },
    {
      cardNumber: 5,
      stepKey: 'real-world-example',
      title: 'Real-World Example: Shopping Cart `addItem()`',
      subtitle: 'Flexible E-Commerce Item Registration',
      iconType: 'home',
      simpleDef: 'An online shopping cart allows users to add items simply by product code, or specify quantity, or apply a special promo discount code.',
      realWorldScenario: {
        domain: 'E-Commerce Platform',
        description: 'The cart class provides three overloaded methods: `addItem(productId)` for a quick single purchase, `addItem(productId, quantity)` for bulk orders, and `addItem(productId, quantity, couponCode)` for promotional campaigns.',
        takeaway: 'Callers interact with a clean, cohesive `addItem` interface without needing awkward separate function names.'
      },
      visualType: 'shopping-cart-overload-diagram',
      highlights: {
        quickRemember: '`addItem(id)`, `addItem(id, qty)`, `addItem(id, qty, coupon)`. One logical operation.',
        interviewTip: 'Use this e-commerce checkout or a logging utility (`log(msg)`, `log(level, msg)`) in system design questions.',
        commonMistake: 'Creating different method names like `addItemWithQuantityAndDiscount`.'
      }
    },
    {
      cardNumber: 6,
      stepKey: 'types-variations',
      title: 'Rules & Valid Variations of Overloading',
      subtitle: 'What Qualifies as a Valid Overload?',
      iconType: 'layers',
      simpleDef: 'The compiler recognizes an overload ONLY if the parameter count, types, or order differ. Return type and access modifiers alone do not qualify.',
      typesList: [
        { name: '1. Different Number of Parameters', desc: '`add(int a, int b)` vs `add(int a, int b, int c)`. Distinct argument count.', icon: 'CheckCircle2' },
        { name: '2. Different Data Types', desc: '`print(int x)` vs `print(String s)`. Completely different parameter types.', icon: 'CheckCircle2' },
        { name: '3. Different Sequence / Order', desc: '`format(int id, String name)` vs `format(String name, int id)`. Valid signature difference.', icon: 'CheckCircle2' },
        { name: '4. INVALID: Return Type Alone ❌', desc: '`int get()` vs `double get()`. Compile Error! Calling `get();` leaves compiler unable to decide.', icon: 'XCircle' },
        { name: '5. Automatic Type Promotion', desc: 'Passing `char` or `byte` will promote to `int`, then `long`, then `float`, then `double`.', icon: 'ArrowRight' }
      ],
      visualType: 'overloading-variations-diagram',
      highlights: {
        quickRemember: 'Valid: Count, Type, Order. Invalid: Return type alone, parameter names alone.',
        interviewTip: 'Explain why return type alone fails: when someone writes `calc();` without capturing the return value, the compiler has no clue which one to call!',
        commonMistake: 'Trying to overload by changing parameter names: `add(int x, int y)` vs `add(int a, int b)` is duplicate code!'
      }
    },
    {
      cardNumber: 7,
      stepKey: 'working-example',
      title: 'Complete Working Example: Math Operations',
      subtitle: 'Multi-Signature Overloading Execution',
      iconType: 'play',
      simpleDef: 'A complete, fully runnable program demonstrating 2-parameter integer addition, 3-parameter integer addition, and floating-point addition with verified deterministic output.',
      codeSnippets: {
        Java: `class MathOperations {
    // Overload 1: Two ints
    public int multiply(int a, int b) {
        return a * b;
    }

    // Overload 2: Three ints
    public int multiply(int a, int b, int c) {
        return a * b * c;
    }

    // Overload 3: Two doubles
    public double multiply(double a, double b) {
        return a * b;
    }
}

public class Main {
    public static void main(String[] args) {
        MathOperations math = new MathOperations();

        int res1 = math.multiply(4, 5);
        int res2 = math.multiply(2, 3, 4);
        double res3 = math.multiply(2.5, 4.0);

        System.out.println("2 ints: " + res1);
        System.out.println("3 ints: " + res2);
        System.out.println("2 doubles: " + res3);
    }
}`,
        Python: `class MathOperations:
    def multiply(self, a, b, c=None):
        if c is not None:
            return a * b * c
        return a * b

math = MathOperations()
res1 = math.multiply(4, 5)
res2 = math.multiply(2, 3, 4)
res3 = math.multiply(2.5, 4.0)

print(f"2 ints: {res1}")
print(f"3 ints: {res2}")
print(f"2 doubles: {res3}")`,
        'C++': `#include <iostream>
using namespace std;

class MathOperations {
public:
    int multiply(int a, int b) {
        return a * b;
    }
    int multiply(int a, int b, int c) {
        return a * b * c;
    }
    double multiply(double a, double b) {
        return a * b;
    }
};

int main() {
    MathOperations math;
    int res1 = math.multiply(4, 5);
    int res2 = math.multiply(2, 3, 4);
    double res3 = math.multiply(2.5, 4.0);

    cout << "2 ints: " << res1 << endl;
    cout << "3 ints: " << res2 << endl;
    cout << "2 doubles: " << res3 << endl;
    return 0;
}`
      },
      expectedOutput: "2 ints: 20\n3 ints: 24\n2 doubles: 10.0",
      executionTrace: [
        { step: 1, action: 'math.multiply(4, 5)', state: 'Compiler binds to multiply(int, int) → returns 20' },
        { step: 2, action: 'math.multiply(2, 3, 4)', state: 'Compiler binds to multiply(int, int, int) → returns 24' },
        { step: 3, action: 'math.multiply(2.5, 4.0)', state: 'Compiler binds to multiply(double, double) → returns 10.0' }
      ],
      highlights: {
        quickRemember: 'The compiler matches argument types before executing code. Output matches exactly.',
        interviewTip: 'Point out how C++ and Java emit exact method references into the compiled symbol table.',
        commonMistake: 'Assuming the double overload runs for `multiply(4, 5)`. The exact `int, int` match takes priority.'
      }
    },
    {
      cardNumber: 8,
      stepKey: 'common-mistakes',
      title: 'Overloading Mistakes & Traps',
      subtitle: 'Return Type Pitfalls & Ambiguity Errors',
      iconType: 'alert',
      simpleDef: 'Classic errors involving return types, type promotion ambiguity, and varargs.',
      mistakesList: [
        {
          mistake: '❌ Trying to overload by changing ONLY the return type',
          correct: '✅ In Java and C++, methods cannot be overloaded by return type alone! `int sum(int a, int b)` and `double sum(int a, int b)` will cause a "method already defined" compile error.'
        },
        {
          mistake: '❌ Ambiguous Type Promotion: `test(int, double)` and `test(double, int)`',
          correct: '✅ Calling `test(10, 20)` causes a compile error: "Reference to test is ambiguous" because both arguments can be promoted equally.'
        },
        {
          mistake: '❌ Confusing Overloading with Overriding',
          correct: '✅ Overloading happens in the SAME class at COMPILE-TIME (signatures must differ). Overriding happens between PARENT and CHILD at RUNTIME (signatures must match).'
        }
      ],
      interviewTrap: '⚠️ Interview Trap: "Can we overload the `main()` method in Java?" Answer: YES! You can define `public static void main(int a)` or `public static void main(String s)`. However, the JVM will strictly invoke only `main(String[] args)` as the program entry point.',
      highlights: {
        quickRemember: 'Return type alone does not overload. Ambiguous promotions fail compilation. `main()` can be overloaded.',
        interviewTip: 'Mention the `main()` method overload question — it is an extremely common campus trap!',
        commonMistake: 'Answering "No" when asked if `main()` can be overloaded in Java.'
      }
    },
    {
      cardNumber: 9,
      stepKey: 'interview-placement',
      title: 'Method Overloading Placement Patterns',
      subtitle: 'Core Questions Asked in Tech Interviews',
      iconType: 'award',
      simpleDef: 'Frequently asked technical questions on compile-time polymorphism across IT services and product firms.',
      interviewQuestions: [
        {
          q: 'Why can method overloading NOT be achieved by changing return type alone?',
          a: 'Because a method can be invoked without assigning its result to a variable (e.g. `doWork();`). If two methods differ only by return type, the compiler cannot know which implementation the developer intended to call, creating syntactic ambiguity.'
        },
        {
          q: 'What is Compile-Time Polymorphism and why is it called Static Binding?',
          a: 'It is called compile-time polymorphism because the decision of which overloaded method to execute is resolved by the compiler during compilation, based on parameter types. It is called static binding because the method address is fixed early in bytecode before program execution.'
        },
        {
          q: 'What happens when calling an overloaded method with `null` when both `String` and `Object` overloads exist?',
          a: 'The compiler selects the MORE SPECIFIC type! Since `String` is a child class of `Object`, `test(String s)` executes. If two sibling types exist (e.g. `String` and `Integer`), calling `test(null)` triggers an ambiguous compilation error.'
        }
      ],
      companyTags: ['TCS', 'Infosys', 'Cognizant', 'Capgemini'],
      companyAttribution: 'Reported in assessments at: TCS • Infosys • Cognizant • Capgemini',
      highlights: {
        quickRemember: 'Compile-time resolution → Early static binding → Zero runtime overhead.',
        interviewTip: 'The `test(null)` specificity rule is a favorite interview riddle. Explain subtype specificity confidently!',
        commonMistake: 'Stating that overloading incurs runtime performance penalties.'
      }
    },
    {
      cardNumber: 10,
      stepKey: 'quick-revision',
      title: 'Method Overloading Revision Cheat Sheet',
      subtitle: '60-Second Memory Anchor',
      iconType: 'check',
      simpleDef: 'Instant memory anchors for Method Overloading.',
      cheatSheet: {
        WHAT: 'Multiple methods in the same class with the same name but different parameters.',
        WHY: 'Provides clean, intuitive APIs without naming clutter (`add` instead of `addInt`, `addDouble`).',
        HOW: 'Compiler inspects argument types at compile-time and statically binds to the best matching signature.',
        KEY_POINT: 'Parameter count, types, or order MUST differ. Return type alone DOES NOT overload.',
        COMMON_TRAP: 'Ambiguous calls (e.g. `test(int, double)` vs `test(double, int)` with `test(5, 5)`) fail compilation.',
        INTERVIEW_TIP: 'Overloading = Same class, compile-time, different params. Overriding = Inheritance, runtime, same params.',
        SYNTAX: 'int add(int a, int b) { return a+b; } | double add(double a, double b) { return a+b; }'
      },
      visualType: 'overloading-cheat-sheet',
      highlights: {
        quickRemember: 'Compile-time. Same class. Same name. Different parameters.',
        interviewTip: 'Always contrast overloading with overriding on four axes: Scope, Resolution Time, Signature, and Polymorphism type.',
        commonMistake: 'Forgetting that Python uses default arguments rather than compile-time overloads.'
      }
    }
  ],

  // =========================================================================
  // 9. METHOD OVERRIDING (Runtime Polymorphism)
  // =========================================================================
  'method-overriding': [
    {
      cardNumber: 1,
      stepKey: 'what-is-it',
      title: 'What is Method Overriding?',
      subtitle: 'Specialized Behavior in Subclasses',
      iconType: 'layers',
      simpleDef: 'Method Overriding is a runtime polymorphism feature where a subclass provides a specific, specialized implementation of a method that is already declared in its parent class.',
      oneLineMeaning: 'A child class redefining an inherited parent method with specialized logic.',
      inSimpleWords: 'A parent `Animal` class declares a generic `sound()` method. A `Dog` child class overrides `sound()` to bark, while a `Cat` overrides it to meow. Both share the exact same method contract, but execute specialized actions!',
      realWorldAnalogy: {
        concept: 'Upgrading a Family Cookie Recipe',
        example: 'Your family has a traditional cookie recipe named `bakeCookies()`. You inherit the recipe name, but you override the preparation step by replacing refined sugar with organic honey to make it your own!'
      },
      visualType: 'method-overriding-dispatch',
      highlights: {
        quickRemember: 'Overriding = Same method signature in child class replacing parent behavior at runtime.',
        interviewTip: 'Always emphasize: "Method Overriding is Runtime (Dynamic) Polymorphism because the method invoked is determined by the actual object in Heap memory, not the reference type."',
        commonMistake: 'Changing the parameter list in the child class. Changing parameters creates an overload, NOT an override!'
      }
    },
    {
      cardNumber: 2,
      stepKey: 'why-need-it',
      title: 'Why Do We Need Method Overriding?',
      subtitle: 'Generic Abstraction vs Specialized Execution',
      iconType: 'shield',
      simpleDef: 'Without method overriding, child classes would be trapped with rigid, generic parent logic and could never customize their behavior under a shared interface.',
      withoutVsWith: {
        withoutTitle: 'WITHOUT Method Overriding (Rigid & Brittle)',
        withoutPoints: [
          'Child classes trapped with generic, non-specialized parent behavior',
          'Forced to create awkward custom methods like `dogBark()`, `catMeow()`, `cowMoo()`',
          'Polymorphic collections (`List<Animal>`) impossible: cannot iterate and call uniform `.sound()`',
          'Requires massive, fragile `instanceof` and if-else ladders to check object types'
        ],
        withTitle: 'WITH Method Overriding (Dynamic Extensibility)',
        withPoints: [
          'Subclasses provide tailored, specialized implementations seamlessly',
          'Callers interact strictly with generic base types: `animal.sound()`',
          'Adding a new `Lion` class with `sound()` requires ZERO changes to existing loops or callers',
          'Satisfies the Open/Closed Principle: open for extension, closed for modification'
        ]
      },
      visualType: 'overriding-need-comparison',
      highlights: {
        quickRemember: 'Overriding allows generic base references to trigger specialized subclass behaviors.',
        interviewTip: 'Quote: "Overriding enables late dynamic binding, allowing new subclasses to be plugged in without modifying existing client code."',
        commonMistake: 'Writing manual `if (obj instanceof Dog)` checks instead of letting virtual dispatch handle it.'
      }
    },
    {
      cardNumber: 3,
      stepKey: 'how-it-works',
      title: 'How Overriding Works: Dynamic Method Dispatch',
      subtitle: 'The Virtual Method Table (V-Table) in Heap Memory',
      iconType: 'flow',
      simpleDef: 'When `Animal a = new Dog(); a.sound();` runs, the compiler only verifies that `Animal` has a `sound()` method. At runtime, the JVM checks the actual heap object (`Dog`) and resolves the call via its Virtual Table (vtable).',
      flowSteps: [
        { step: 1, label: 'Reference vs Object', desc: '`Animal a = new Dog();` Reference `a` is type Animal, but the live object in Heap memory is Dog.' },
        { step: 2, label: 'Compile-Time Check', desc: 'Compiler verifies that the declared class `Animal` contains a `sound()` method.' },
        { step: 3, label: 'Runtime V-Table Lookup', desc: 'At runtime, JVM inspects the object’s class header and consults the Dog vtable.' },
        { step: 4, label: 'Dynamic Execution', desc: 'The function pointer points directly to `Dog.sound()`, printing "Bark!" instead of the parent method.' }
      ],
      visualType: 'vtable-dispatch-diagram',
      highlights: {
        quickRemember: 'Reference type decides WHAT you can call; Object type in Heap decides WHICH version executes.',
        interviewTip: 'Explain the Virtual Table (vtable): an array of function pointers maintained per class for dynamic dispatch.',
        commonMistake: 'Believing Java variables are overridden dynamically. Variables in Java do NOT use virtual tables; they are resolved statically by reference type!'
      }
    },
    {
      cardNumber: 4,
      stepKey: 'syntax',
      title: 'Method Overriding Syntax across Languages',
      subtitle: 'Java `@Override`, C++ `virtual`/`override`, Python Dynamic Inheritance',
      iconType: 'code',
      simpleDef: 'Java uses `@Override` annotation, C++ requires `virtual` in the base class and `override` in derived, while Python overrides dynamically through inheritance.',
      codeSnippets: {
        Java: `class Animal {
    void sound() {
        System.out.println("Generic animal sound");
    }
}

class Dog extends Animal {
    // @Override annotation catches spelling & signature errors at compile time
    @Override
    void sound() {
        System.out.println("Bark!");
    }
}`,
        Python: `class Animal:
    def sound(self):
        print("Generic animal sound")

class Dog(Animal):
    # Overrides parent method directly
    def sound(self):
        print("Bark!")

a = Dog()
a.sound() # Prints "Bark!"`,
        'C++': `#include <iostream>
using namespace std;

class Animal {
public:
    // virtual keyword enables runtime dynamic dispatch in C++
    virtual void sound() {
        cout << "Generic animal sound" << endl;
    }
    virtual ~Animal() = default; // Essential virtual destructor
};

class Dog : public Animal {
public:
    void sound() override { // override keyword ensures valid signature
        cout << "Bark!" << endl;
    }
};`
      },
      syntaxNotes: [
        'In Java, all non-static, non-private, non-final methods are virtual by default.',
        'In C++, methods are NOT virtual by default! You MUST explicitly declare `virtual` in the base class to enable runtime polymorphism.',
        'The `@Override` annotation in Java is technically optional, but strongly recommended to prevent accidental signature mismatch.'
      ],
      highlights: {
        quickRemember: 'Java: All non-static methods virtual by default. C++: Explicit `virtual` required.',
        interviewTip: 'Always explain that omitting `virtual` in C++ causes early compile-time binding to the base class method!',
        commonMistake: 'Misspelling the method name without `@Override` in Java, which accidentally creates a new method instead of overriding.'
      }
    },
    {
      cardNumber: 5,
      stepKey: 'real-world-example',
      title: 'Real-World Example: Multi-Channel Notification Service',
      subtitle: 'Polymorphic Message Dispatch',
      iconType: 'home',
      simpleDef: 'An alert service triggers notifications across Email, SMS, and Push channels. Each channel overrides the base `send()` method with provider-specific API logic.',
      realWorldScenario: {
        domain: 'Cloud Notification System',
        description: 'The base class `Notification` defines `send(String msg)`. `EmailNotification` overrides it using SMTP, `SMSNotification` overrides it via Twilio API, and `PushNotification` overrides it via Firebase. An array `Notification[] queue` processes all alerts uniformly.',
        takeaway: 'The dispatch loop never checks whether an alert is email or SMS — it simply calls `notif.send(msg)` and polymorphic overriding routes the message correctly.'
      },
      visualType: 'notification-overriding-diagram',
      highlights: {
        quickRemember: 'Base `Notification.send()` overridden by Email, SMS, and Push channels.',
        interviewTip: 'Use Payment Gateway (`Payment.process()` → PayPal, Stripe, UPI) or Notification Service in system design interviews.',
        commonMistake: 'Putting switch statements inside the base class to handle different notification types.'
      }
    },
    {
      cardNumber: 6,
      stepKey: 'types-variations',
      title: 'Strict Rules of Method Overriding',
      subtitle: 'Access Modifiers, Return Types & Exceptions',
      iconType: 'layers',
      simpleDef: 'To successfully override a parent method, specific contractual rules regarding signatures, visibility, return types, and exceptions must be respected.',
      typesList: [
        { name: '1. Exact Method Signature', desc: 'Method name, parameter count, and parameter types must be identical to parent method.', icon: 'CheckCircle2' },
        { name: '2. Cannot Narrow Access Modifier', desc: 'Child method CANNOT be more restrictive! If parent is `protected`, child can be `protected` or `public`, but NEVER `private`.', icon: 'ShieldCheck' },
        { name: '3. Covariant Return Types', desc: 'Child can return the exact parent return type OR a subclass of that return type (e.g. `Animal` → `Dog`).', icon: 'ArrowRight' },
        { name: '4. Exception Rules', desc: 'Child method cannot throw newer or broader CHECKED exceptions than declared by the parent method.', icon: 'AlertTriangle' },
        { name: '5. Non-Overridable Methods', desc: '`private` methods (invisible), `static` methods (shadowed), and `final` methods (locked) CANNOT be overridden!', icon: 'XCircle' }
      ],
      visualType: 'overriding-rules-diagram',
      highlights: {
        quickRemember: 'Same signature. Same or wider access. Covariant return. Cannot override private, static, or final.',
        interviewTip: 'Access modifier rule: "Access can be widened (protected → public), but never narrowed (public → private)."',
        commonMistake: 'Thinking narrowing access is allowed. Restricting access breaks the Liskov Substitution Principle!'
      }
    },
    {
      cardNumber: 7,
      stepKey: 'working-example',
      title: 'Complete Working Example: Polymorphic Dispatch',
      subtitle: 'Base Reference Invoking Derived Behavior',
      iconType: 'play',
      simpleDef: 'A complete, fully runnable program demonstrating parent references invoking overridden child methods with deterministic output.',
      codeSnippets: {
        Java: `class Vehicle {
    public void start() {
        System.out.println("Vehicle engine starts");
    }
}

class Car extends Vehicle {
    @Override
    public void start() {
        System.out.println("Car starts with key ignition");
    }
}

class ElectricCar extends Car {
    @Override
    public void start() {
        System.out.println("ElectricCar powers on silently via push button");
    }
}

public class Main {
    public static void main(String[] args) {
        // Polymorphic references: Vehicle reference holding different objects
        Vehicle v1 = new Vehicle();
        Vehicle v2 = new Car();
        Vehicle v3 = new ElectricCar();

        v1.start();
        v2.start(); // Dynamic Dispatch -> Car.start()
        v3.start(); // Dynamic Dispatch -> ElectricCar.start()
    }
}`,
        Python: `class Vehicle:
    def start(self):
        print("Vehicle engine starts")

class Car(Vehicle):
    def start(self):
        print("Car starts with key ignition")

class ElectricCar(Car):
    def start(self):
        print("ElectricCar powers on silently via push button")

fleet = [Vehicle(), Car(), ElectricCar()]
for v in fleet:
    v.start()`,
        'C++': `#include <iostream>
#include <vector>
using namespace std;

class Vehicle {
public:
    virtual void start() {
        cout << "Vehicle engine starts" << endl;
    }
    virtual ~Vehicle() = default;
};

class Car : public Vehicle {
public:
    void start() override {
        cout << "Car starts with key ignition" << endl;
    }
};

class ElectricCar : public Car {
public:
    void start() override {
        cout << "ElectricCar powers on silently via push button" << endl;
    }
};

int main() {
    vector<Vehicle*> fleet = { new Vehicle(), new Car(), new ElectricCar() };
    for (auto v : fleet) {
        v->start();
    }
    for (auto v : fleet) delete v;
    return 0;
}`
      },
      expectedOutput: "Vehicle engine starts\nCar starts with key ignition\nElectricCar powers on silently via push button",
      executionTrace: [
        { step: 1, action: 'v1.start()', state: 'Vehicle object in heap → invokes Vehicle.start()' },
        { step: 2, action: 'v2.start()', state: 'Car object in heap → VTable directs call to Car.start()' },
        { step: 3, action: 'v3.start()', state: 'ElectricCar object in heap → VTable directs call to ElectricCar.start()' }
      ],
      highlights: {
        quickRemember: 'All three variables are declared as `Vehicle`, but execute three completely distinct behaviors.',
        interviewTip: 'Demonstrate multi-level inheritance overriding (`Vehicle` → `Car` → `ElectricCar`) to prove deep understanding.',
        commonMistake: 'Forgetting to delete dynamically allocated objects or declare virtual destructor in C++.'
      }
    },
    {
      cardNumber: 8,
      stepKey: 'common-mistakes',
      title: 'Overriding Mistakes & Traps',
      subtitle: 'Method Hiding, Access Rules & Covariance',
      iconType: 'alert',
      simpleDef: 'Subtle traps where developers think a method is overridden, but it is actually hidden or causing compile errors.',
      mistakesList: [
        {
          mistake: '❌ Believing `static` methods can be overridden',
          correct: '✅ Static methods CANNOT be overridden! If a child defines the same static signature, it is METHOD HIDING. The method called is determined by reference type at compile-time, not the heap object.'
        },
        {
          mistake: '❌ Narrowing the access modifier in the child class',
          correct: '✅ In Java, you cannot reduce visibility (e.g. changing parent `public` to child `protected`). Child visibility must be equal to or greater than the parent method.'
        },
        {
          mistake: '❌ Accidental Overloading due to slight parameter mismatch',
          correct: '✅ If parent has `set(double d)` and child writes `set(int d)`, this is an OVERLOAD, not an override! Always use `@Override` so the compiler catches this mistake.'
        }
      ],
      interviewTrap: '⚠️ Interview Trap: "Can we override private methods in Java?" Answer: NO! Private methods are completely invisible outside their declaring class. A subclass writing a method with the same name simply creates an entirely unrelated, isolated new method, NOT an override.',
      highlights: {
        quickRemember: 'Static = Hidden (not overridden). Private = Invisible (cannot override). Final = Locked.',
        interviewTip: 'Whenever asked about static methods, immediately use the term "Method Hiding" to impress interviewers.',
        commonMistake: 'Thinking `@Override` will compile when applied to a static method.'
      }
    },
    {
      cardNumber: 9,
      stepKey: 'interview-placement',
      title: 'Method Overriding Placement Patterns',
      subtitle: 'High-Yield Questions from Technical Rounds',
      iconType: 'award',
      simpleDef: 'Crucial questions on dynamic polymorphism, method hiding, and covariance asked by top campus recruiters.',
      interviewQuestions: [
        {
          q: 'What is the difference between Method Overloading and Method Overriding?',
          a: 'Overloading: Same class, same name, different parameters, resolved at compile-time (static binding). Overriding: Subclass vs parent, same signature, resolved at runtime via heap object vtable (dynamic dispatch).'
        },
        {
          q: 'What is Method Hiding in Java?',
          a: 'When a subclass defines a static method with the exact same signature as a static method in its superclass. Because static methods belong to classes and not instances, the version called depends strictly on the compile-time reference type, not the runtime object.'
        },
        {
          q: 'What is a Covariant Return Type?',
          a: 'Since Java 5, an overriding method in a subclass is allowed to return a subtype of the return type declared in the parent method. For example, if parent returns `Vehicle`, the child override is legally permitted to return `Car`.'
        }
      ],
      companyTags: ['TCS', 'Infosys', 'Accenture', 'Cognizant'],
      companyAttribution: 'Reported in technical rounds at: TCS • Infosys • Accenture • Cognizant',
      highlights: {
        quickRemember: 'Runtime dispatch. VTable. Method Hiding vs Overriding. Covariant return types.',
        interviewTip: 'Be ready to write a 4-line example comparing reference type behavior on static vs instance methods.',
        commonMistake: 'Confusing Method Hiding with Method Shadowing or Method Overriding.'
      }
    },
    {
      cardNumber: 10,
      stepKey: 'quick-revision',
      title: 'Method Overriding Revision Cheat Sheet',
      subtitle: '60-Second Memory Anchor',
      iconType: 'check',
      simpleDef: 'Instant memory anchors for Method Overriding.',
      cheatSheet: {
        WHAT: 'Subclass providing a custom, specialized implementation of an inherited parent method.',
        WHY: 'Enables runtime polymorphism: callers invoke generic interfaces, specialized child logic executes.',
        HOW: 'JVM checks Heap object vtable at runtime and dynamically dispatches to the child implementation.',
        KEY_POINT: 'Signature must be identical. Access modifier can be widened, never narrowed.',
        COMMON_TRAP: 'Static methods are HIDDEN, private methods are INVISIBLE, final methods CANNOT be overridden.',
        INTERVIEW_TIP: 'Overloading = Compile-Time (no inheritance required). Overriding = Runtime (inheritance mandatory).',
        SYNTAX: 'class Child extends Parent { @Override void show() { ... } }'
      },
      visualType: 'overriding-cheat-sheet',
      highlights: {
        quickRemember: 'Runtime polymorphism. Inheritance required. Same signature. Dynamic vtable dispatch.',
        interviewTip: 'Memorize the Overloading vs Overriding comparison table before every technical interview.',
        commonMistake: 'Forgetting that variables are never polymorphic in Java.'
      }
    }
  ]
};

/**
 * Universal Topic Card Factory
 * Generates an array of exactly 10 cards for any OOPS topic based on canonical structure.
 */
function createTopic10Cards(topicId) {
  const normId = resolveOOPSTopicId(topicId);

  // Return custom crafted topic if already in registry
  if (OOPS_TOPIC_CARDS[normId]) {
    return OOPS_TOPIC_CARDS[normId];
  }

  // Topic Metadata config for remaining topics
  const TOPIC_METADATA = {
    'constructors': {
      name: 'Constructors',
      analogy: 'Factory Setup Robot',
      analogyEx: 'When you purchase a brand new smartphone, the factory initialization robot pre-loads the operating system, sets default language, and checks battery before handing it to you.',
      what: 'A Constructor is a special method automatically invoked when an object is instantiated, used to allocate memory and initialize object attributes.',
      whyWithout: 'Fields hold garbage or null values; developers must manually call init() on every object, risking uninitialized object crashes.',
      whyWith: 'Object is guaranteed to be in a valid, initialized state immediately upon creation.',
      how: 'new Keyword → Allocates Heap RAM → Matches parameter signature → Executes constructor body → Returns object reference.',
      syntaxJava: `class User {\n    String name;\n    User(String n) { this.name = n; } // Constructor\n}\nUser u = new User("Rahul");`,
      syntaxPy: `class User:\n    def __init__(self, name): # Constructor\n        self.name = name\nu = User("Rahul")`,
      syntaxCpp: `class User {\npublic:\n    string name;\n    User(string n) : name(n) {} // Constructor\n};\nUser u("Rahul");`,
      realWorld: 'Bank Account with mandatory initial deposit and account number assignment.',
      types: 'Default (No-arg) Constructor, Parameterized Constructor, Copy Constructor.',
      mistake: '❌ Thinking constructors have a return type like void.\n✅ Constructors NEVER specify a return type, not even void!',
      trap: 'Can a constructor be private? YES! Used in Singleton Pattern to prevent external instantiation.',
      cheatWhat: 'Special initialization method executed automatically upon object creation.',
      cheatWhy: 'Guarantees objects start in a safe, fully initialized state.',
      tags: ['TCS', 'Infosys', 'Wipro']
    },
    'method-overloading': {
      name: 'Method Overloading',
      analogy: 'Multi-tool Swiss Army Knife',
      analogyEx: 'A Swiss Army Knife has multiple tools with the same knife label: pull out blade for slicing, scissors for cutting paper, or corkscrew for opening bottles.',
      what: 'Method Overloading is having multiple methods in the same class with the EXACT same name but DIFFERENT parameter lists.',
      whyWithout: 'You would need clunky names: addTwoInts(a, b), addThreeInts(a, b, c), addDoubles(a, b) cluttering the API.',
      whyWith: 'Clean, intuitive API: `add(a, b)` and `add(a, b, c)` share the same memorable name.',
      how: 'Compiler inspects argument count, types, and sequence at compile-time to bind the exact method address directly.',
      syntaxJava: `class MathUtil {\n    int add(int a, int b) { return a + b; }\n    double add(double a, double b) { return a + b; }\n}`,
      syntaxPy: `class MathUtil:\n    # Simulated via default/keyword arguments\n    def add(self, a, b, c=0):\n        return a + b + c`,
      syntaxCpp: `class MathUtil {\npublic:\n    int add(int a, int b) { return a + b; }\n    double add(double a, double b) { return a + b; }\n};`,
      realWorld: 'Printer printing text document, photo image, or double-sided paper with a single `print()` call.',
      types: 'Different parameter count, Different parameter types, Different parameter sequence.',
      mistake: '❌ Changing ONLY the return type.\n✅ Overloading CANNOT be achieved by changing only the return type! Parameter signature MUST differ.',
      trap: 'Can we overload the main() method in Java? YES! But the JVM calls only `main(String[] args)`.',
      cheatWhat: 'Same method name, different parameter signature in the same class (Compile-time).',
      cheatWhy: 'Provides clean, intuitive method names without redundant naming clutter.',
      tags: ['Cognizant', 'Capgemini', 'TCS']
    },
    'method-overriding': {
      name: 'Method Overriding',
      analogy: 'Child Modifying a Family Recipe',
      analogyEx: 'Your mother has a secret cookie recipe. You inherit the recipe name "bakeCookies()", but you substitute sugar with honey to give your own special flavor.',
      what: 'Method Overriding is when a subclass provides a specific implementation of a method that is already declared in its parent class.',
      whyWithout: 'Subclasses would be trapped with rigid, generic parent behavior and unable to customize actions.',
      whyWith: 'Enables runtime polymorphism: callers invoke generic parent methods while specialized child logic executes.',
      how: 'Parent declares method → Child declares same signature → JVM resolves call dynamically via vtable at runtime.',
      syntaxJava: `class Parent {\n    void show() { System.out.println("Parent"); }\n}\nclass Child extends Parent {\n    @Override\n    void show() { System.out.println("Child"); }\n}`,
      syntaxPy: `class Parent:\n    def show(self): print("Parent")\nclass Child(Parent):\n    def show(self): print("Child")`,
      syntaxCpp: `class Parent {\npublic:\n    virtual void show() { cout << "Parent" << endl; }\n};\nclass Child : public Parent {\npublic:\n    void show() override { cout << "Child" << endl; }\n};`,
      realWorld: 'Payment base class overrides `process()` for PayPal (redirect) vs Stripe (credit card token).',
      types: 'Standard Override, Abstract Method Implementation, Interface Implementation.',
      mistake: '❌ Narrowing the access modifier.\n✅ Child method CANNOT have more restrictive access than parent (e.g. cannot change public to protected).',
      trap: 'Can we override private or static methods? NO! Private is invisible; static is shadowed, not overridden.',
      cheatWhat: 'Subclass provides custom implementation for an inherited parent method (Runtime).',
      cheatWhy: 'Enables specialized behaviors under a uniform base interface.',
      tags: ['TCS', 'Infosys', 'Accenture']
    },
    'interfaces': {
      name: 'Interfaces',
      analogy: 'Standard Electrical Wall Socket',
      analogyEx: 'A 3-pin wall socket defines the standard interface: 220V, 3 pins. A laptop charger, refrigerator, and microwave can all plug into it without the socket knowing what appliance is connected.',
      what: 'An Interface is a completely abstract contract that defines WHAT a class must do, but not HOW.',
      whyWithout: 'Classes cannot achieve multiple inheritance; systems are tightly coupled to concrete classes.',
      whyWith: '100% loose coupling; classes can implement multiple interfaces safely.',
      how: 'Define interface contract → classes implement contract → callers reference interface type.',
      syntaxJava: `interface Drivable {\n    void drive(); // Implicitly public abstract\n}\nclass Car implements Drivable {\n    public void drive() { System.out.println("Driving..."); }\n}`,
      syntaxPy: `from abc import ABC, abstractmethod\nclass Drivable(ABC):\n    @abstractmethod\n    def drive(self): pass`,
      syntaxCpp: `class Drivable {\npublic:\n    virtual void drive() = 0; // Pure virtual\n    virtual ~Drivable() = default;\n};`,
      realWorld: 'Remote Control buttons interacting with Sony, Samsung, or LG TVs identically.',
      types: 'Normal Interface, Single Abstract Method (Functional) Interface, Marker Interface (empty).',
      mistake: '❌ Forgetting `public` when implementing interface methods.\n✅ In Java, interface methods are public; the implementing class MUST specify public!',
      trap: 'Can an interface have method bodies? Since Java 8, YES: using `default` and `static` methods.',
      cheatWhat: 'Pure contract blueprint containing method signatures (100% loose coupling).',
      cheatWhy: 'Enables multiple inheritance and plug-and-play architectural components.',
      tags: ['TCS', 'Wipro', 'Infosys']
    },
    'abstract-classes': {
      name: 'Abstract Classes',
      analogy: 'Semi-finished Modular House',
      analogyEx: 'A builder erects the concrete foundation, pillars, and plumbing (shared concrete code), but leaves the interior walls and paint color to be finished by the buyer (abstract methods).',
      what: 'An Abstract Class is an incomplete blueprint that cannot be instantiated directly, designed to be subclassed.',
      whyWithout: 'You either make the parent concrete (risking accidental instantiation of generic "Vehicle") or write duplicated code.',
      whyWith: 'Provides shared default code while forcing subclasses to implement specific critical methods.',
      how: '`abstract class` declaration → Contains concrete & abstract methods → Subclass extends and completes.',
      syntaxJava: `abstract class Shape {\n    int color;\n    abstract double area(); // Must be implemented by child\n}`,
      syntaxPy: `from abc import ABC, abstractmethod\nclass Shape(ABC):\n    @abstractmethod\n    def area(self): pass`,
      syntaxCpp: `class Shape {\npublic:\n    virtual double area() const = 0;\n};`,
      realWorld: 'Document reader base class with shared open/close file handling, but abstract parse() method for PDF vs Word.',
      types: 'Partial Abstraction (0% to 100% abstract methods).',
      mistake: '❌ Attempting to instantiate directly: `new Shape()`.\n✅ Abstract classes cannot be instantiated with new; only derived subclasses can.',
      trap: 'Can an abstract class have a constructor? YES! Called by subclasses via `super()`.',
      cheatWhat: 'Incomplete blueprint class combining concrete methods with abstract contracts.',
      cheatWhy: 'Shares common code while enforcing mandatory subclass implementation.',
      tags: ['Cognizant', 'Capgemini', 'TCS']
    },
    'access-modifiers': {
      name: 'Access Modifiers',
      analogy: 'Levels of Building Security',
      analogyEx: 'Public = sidewalk outside (anyone can enter); Protected = company cafeteria (employees & guests); Default = office floor (department only); Private = CEO personal safe (CEO only).',
      what: 'Access Modifiers specify the scope, visibility, and accessibility of classes, constructors, methods, and variables.',
      whyWithout: 'All variables would be globally accessible, destroying encapsulation and data security.',
      whyWith: 'Granular access control prevents unauthorized modifications and tightly guards internal invariants.',
      how: 'Compiler enforces access rules during compilation; unauthorized access triggers compilation errors.',
      syntaxJava: `public int a;    // Everywhere\nprotected int b; // Package + Subclasses\nint c;           // Package-private (default)\nprivate int d;   // Same class only`,
      syntaxPy: `self.public_var = 1\nself._protected_var = 2 # Convention\nself.__private_var = 3  # Name mangling`,
      syntaxCpp: `public: int a;\nprotected: int b;\nprivate: int c;`,
      realWorld: 'Social media profile: Public posts (everyone), Friends-only photos (protected), Private drafts (private).',
      types: 'Private, Default (Package-Private), Protected, Public.',
      mistake: '❌ Thinking `protected` is only for child classes.\n✅ In Java, `protected` also allows access to all classes in the same package!',
      trap: 'Can a top-level outer class be declared `private` or `protected`? In Java, NO! Only public or package-private.',
      cheatWhat: 'Keywords controlling visibility: private, default, protected, public.',
      cheatWhy: 'Enforces data hiding and structural security across packages and modules.',
      tags: ['TCS', 'Infosys', 'Accenture']
    },
    'static-members': {
      name: 'Static Members',
      analogy: 'School Classroom Whiteboard',
      analogyEx: 'Each student has their own personal notebook (instance variable). The whiteboard on the wall is shared by the entire class (static variable). When the teacher writes on it, all students see the same update.',
      what: 'Static variables and methods belong to the CLASS itself rather than any individual object instance.',
      whyWithout: 'Every object would duplicate shared global values (e.g. collegeName), wasting massive RAM memory.',
      whyWith: 'One shared copy in memory, accessible directly via `ClassName.member` without creating objects.',
      how: 'Allocated once in Metaspace/Classloader when class is loaded → Shared across all instances.',
      syntaxJava: `class Student {\n    static String college = "IIT"; // Shared\n    static void announce() { System.out.println("Holiday!"); }\n}\nStudent.announce(); // Called without new!`,
      syntaxPy: `class Student:\n    college = "IIT" # Class-level variable\n    @staticmethod\n    def announce(): print("Holiday!")`,
      syntaxCpp: `class Student {\npublic:\n    static int count;\n    static void announce() { cout << "Holiday!" << endl; }\n};`,
      realWorld: 'Math utility methods (`Math.sqrt()`, `Math.PI`) and global object instance counters.',
      types: 'Static Variables, Static Methods, Static Blocks, Static Nested Classes.',
      mistake: '❌ Using `this` keyword inside a static method.\n✅ Static methods have no instance context! `this` does not exist in static methods.',
      trap: 'Can static methods access non-static instance variables? NO! Because no instance exists.',
      cheatWhat: 'Class-level members shared by all instances, loaded once in memory.',
      cheatWhy: 'Saves memory for shared data and provides utility methods without object instantiation.',
      tags: ['TCS', 'Cognizant', 'Wipro']
    },
    'this-self': {
      name: 'this / self Keyword',
      analogy: 'Saying "Me" or "Myself"',
      analogyEx: 'When you say "My name is Priya", "My" refers specifically to yourself, distinguishing your name from someone else named Priya.',
      what: '`this` (Java/C++) or `self` (Python) is a reference variable that refers to the current invoking object instance.',
      whyWithout: 'Shadowing occurs: local parameter `name` shadows instance field `name`, leading to unassigned variables.',
      whyWith: '`this.name = name;` clearly differentiates the instance variable from the constructor parameter.',
      how: 'Implicitly passed as the hidden first argument to all non-static member functions.',
      syntaxJava: `class User {\n    String name;\n    User(String name) {\n        this.name = name; // Resolves variable shadowing\n    }\n}`,
      syntaxPy: `class User:\n    def __init__(self, name):\n        self.name = name # Explicit instance reference`,
      syntaxCpp: `class User {\n    string name;\n    User(string name) {\n        this->name = name; // Pointer to current object\n    }\n};`,
      realWorld: 'Method chaining in Builder Pattern: `person.setName("Aman").setAge(21).build();`.',
      types: 'Differentiating shadowed fields, Constructor chaining (`this()`), Passing current instance as argument.',
      mistake: '❌ Using `this` in static methods.\n✅ Static methods belong to the class, not an object instance!',
      trap: 'Can `this()` be called multiple times in a constructor? NO! In Java, `this()` can only be called once, and on line 1.',
      cheatWhat: 'Reference pointer to the current invoking object instance.',
      cheatWhy: 'Resolves variable shadowing and allows constructor chaining.',
      tags: ['TCS', 'Infosys', 'Capgemini']
    },
    'super-keyword': {
      name: 'super Keyword',
      analogy: 'Calling Your Parents for Backup',
      analogyEx: 'When an employee needs to approve an expense above their limit, they refer up to their immediate manager for authorization.',
      what: 'The `super` keyword is a reference variable used to explicitly access immediate parent class members, constructors, and overridden methods.',
      whyWithout: 'Subclasses cannot invoke parent constructors or access overridden parent methods when names collide.',
      whyWith: 'Enables clean constructor chaining and extending parent method behaviors.',
      how: 'Resolves up the inheritance chain to the immediate superclass at compile-time/runtime.',
      syntaxJava: `class Child extends Parent {\n    Child() {\n        super(); // Calls parent constructor\n    }\n    void display() {\n        super.display(); // Calls overridden parent method\n    }\n}`,
      syntaxPy: `class Child(Parent):\n    def __init__(self):\n        super().__init__()`,
      syntaxCpp: `// In C++, use Base::member syntax\nclass Child : public Parent {\n    Child() : Parent() {}\n};`,
      realWorld: 'Custom GUI button extending base Button: `super.paint();` paints the base button, then adds a custom badge.',
      types: 'Invoking parent constructor (`super()`), Accessing parent field (`super.x`), Calling parent method (`super.m()`).',
      mistake: '❌ Calling `super()` after initializing child fields in Java.\n✅ `super()` MUST be the first statement in a constructor!',
      trap: 'Can `super` access grandparent methods directly (`super.super`)? NO! Java enforces strict encapsulation of ancestors.',
      cheatWhat: 'Reference to immediate parent class members and constructors.',
      cheatWhy: 'Enables constructor delegation and accessing overridden base implementations.',
      tags: ['TCS', 'Accenture', 'Wipro']
    },
    'association': {
      name: 'Association',
      analogy: 'Doctor and Patient',
      analogyEx: 'A Doctor treats multiple Patients. A Patient visits multiple Doctors. Both exist independently; if the clinic closes, both doctor and patient still exist.',
      what: 'Association is a generic relationship between two independent classes with completely separate object lifecycles.',
      whyWithout: 'Classes would either be completely disconnected or tightly glued via improper inheritance.',
      whyWith: 'Models flexible real-world relationships without coupling lifecycles.',
      how: 'Class A holds a reference to Class B as an attribute or method parameter.',
      syntaxJava: `class Doctor {\n    void treat(Patient p) { p.prescribeMedicine(); }\n}`,
      syntaxPy: `class Doctor:\n    def treat(self, patient):\n        patient.prescribe_medicine()`,
      syntaxCpp: `class Doctor {\npublic:\n    void treat(Patient* p) { p->prescribeMedicine(); }\n};`,
      realWorld: 'Driver and Car, Student and Course, Customer and Store.',
      types: 'One-to-One, One-to-Many, Many-to-One, Many-to-Many; Unidirectional vs Bidirectional.',
      mistake: '❌ Using Inheritance when classes merely associate.\n✅ A Doctor is NOT a Patient. They simply associate (Uses-A).',
      trap: 'Is Association a "Has-A" relationship? Yes, Association is the broad umbrella covering Aggregation and Composition.',
      cheatWhat: 'Broad relationship between independent classes with independent lifecycles.',
      cheatWhy: 'Models real-world interactions without tight coupling.',
      tags: ['Infosys', 'TCS', 'Cognizant']
    },
    'aggregation': {
      name: 'Aggregation',
      analogy: 'College Department and Teachers',
      analogyEx: 'A Computer Science Department aggregates Teachers. If the Department is shut down, the Teachers do NOT die — they simply move to another department or university.',
      what: 'Aggregation is a weak "Has-A" relationship where child objects can exist independently of the parent container.',
      whyWithout: 'Deleting a container would inadvertently destroy independent entities.',
      whyWith: 'Accurately models non-owning relationships with independent object lifecycles.',
      how: 'Parent container receives child reference via constructor or setter (shallow reference).',
      syntaxJava: `class Department {\n    List<Teacher> teachers; // Weak Has-A\n    Department(List<Teacher> t) { this.teachers = t; }\n}`,
      syntaxPy: `class Department:\n    def __init__(self, teachers):\n        self.teachers = teachers`,
      syntaxCpp: `class Department {\n    vector<Teacher*> teachers; // Pointers: independent lifecycle\n};`,
      realWorld: 'Shopping Cart and Products (products exist even if cart is emptied), Team and Players.',
      types: 'Weak Has-A relationship, independent object lifecycles.',
      mistake: '❌ Confusing Aggregation with Composition.\n✅ Aggregation: Child survives parent deletion. Composition: Child dies with parent.',
      trap: 'How is aggregation represented in UML? An OPEN / HOLLOW diamond (◇).',
      cheatWhat: 'Weak Has-A relationship where child objects survive parent destruction.',
      cheatWhy: 'Protects independent entities from container lifecycle deletion.',
      tags: ['TCS', 'Capgemini', 'Wipro']
    },
    'composition': {
      name: 'Composition',
      analogy: 'House and Rooms, Car and Engine',
      analogyEx: 'A House is composed of Rooms. If the house is demolished to the ground, the rooms cease to exist. A room cannot float in the air without a house!',
      what: 'Composition is a strong "Has-A" relationship where child objects cannot exist independently of their parent container.',
      whyWithout: 'Orphaned objects and broken structural dependencies.',
      whyWith: 'Enforces complete lifecycle ownership: parent creates, owns, and destroys the child.',
      how: 'Parent creates child object internally inside its own constructor.',
      syntaxJava: `class Car {\n    private final Engine engine; // Strong Has-A\n    Car() { this.engine = new Engine(); }\n}`,
      syntaxPy: `class Car:\n    def __init__(self):\n        self.engine = Engine() # Owned internally`,
      syntaxCpp: `class Car {\n    Engine engine; // Value member: destroyed with Car\n};`,
      realWorld: 'Human and Heart, Computer and Motherboard, Invoice and LineItems.',
      types: 'Strong Has-A ownership, unified lifecycle.',
      mistake: '❌ Using inheritance when composition is cleaner.\n✅ Favor Composition over Inheritance to achieve modular, pluggable components!',
      trap: 'How is composition represented in UML? A FILLED / SOLID black diamond (◆).',
      cheatWhat: 'Strong Has-A relationship where child lifecycle is strictly tied to parent.',
      cheatWhy: 'Guarantees complete ownership and lifecycle encapsulation.',
      tags: ['TCS', 'Infosys', 'Accenture']
    },
    'exception-handling': {
      name: 'Exception Handling in OOPS',
      analogy: 'Circuit Breaker in Your Home',
      analogyEx: 'When an electrical surge occurs, the circuit breaker trips safely, preventing your refrigerator and TV from burning down. You fix the fault and reset the switch.',
      what: 'Exception Handling in OOPS is an object-oriented mechanism for intercepting runtime errors using an exception class hierarchy.',
      whyWithout: 'Runtime errors crash the entire application instantly, leaving corrupt files and angry users.',
      whyWith: 'Gracefully catches errors, logs diagnostic information, and recovers without crashing.',
      how: '`try` block monitors code → `throw new Exception()` creates exception object → `catch` block handles it.',
      syntaxJava: `try {\n    int res = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println("Cannot divide by zero!");\n} finally {\n    System.out.println("Always runs.");\n}`,
      syntaxPy: `try:\n    res = 10 / 0\nexcept ZeroDivisionError as e:\n    print("Cannot divide by zero!")\nfinally:\n    print("Always runs.")`,
      syntaxCpp: `try {\n    throw runtime_error("Error occurred");\n} catch (const exception& e) {\n    cout << e.what() << endl;\n}`,
      realWorld: 'Network timeout retrying 3 times before displaying a friendly message instead of a crash.',
      types: 'Checked Exceptions (compile-time in Java), Unchecked / Runtime Exceptions, Custom Exceptions.',
      mistake: '❌ Catching generic `Exception` and leaving the block empty (swallowing exceptions).\n✅ Always log the error or handle it meaningfully!',
      trap: 'Does the `finally` block run if `try` has a `return` statement? YES! `finally` always executes before returning.',
      cheatWhat: 'Object-oriented error handling via try-catch-finally and exception class hierarchy.',
      cheatWhy: 'Prevents sudden crashes and ensures critical resources (files, sockets) close safely.',
      tags: ['TCS', 'Cognizant', 'Infosys']
    },
    'interview-revision': {
      name: 'OOPS Interview Revision',
      analogy: 'The Placement Flight Checklist',
      analogyEx: 'Before taking off, pilots review their pre-flight checklist item by item to ensure zero errors. Review this cheat sheet before your technical round!',
      what: 'Comprehensive synthesis of all 4 pillars, core differences, placement traps, and rapid interview soundbites.',
      whyWithout: 'Entering an interview with scattered memories leads to stammering and incomplete answers.',
      whyWith: 'Sharp, confident, bulletproof answers that impress technical interviewers.',
      how: 'Synthesizes definitions, real-world analogies, code syntax, and tricky edge cases into immediate recalls.',
      syntaxJava: `// Core 4 Pillars in 4 lines\nclass Capsule { private int x; }     // Encapsulation\nabstract class Plan { abstract void f(); } // Abstraction\nclass Child extends Plan { void f(){} }   // Inheritance\nPlan p = new Child(); p.f();              // Polymorphism`,
      syntaxPy: `# Clean OOP in Python\nclass Human:\n    def __init__(self, name): self.name = name`,
      syntaxCpp: `// Clean OOP in C++\nclass Base { public: virtual ~Base() = default; };`,
      realWorld: 'Complete Bank & ATM system combining all 4 pillars in one architecture.',
      types: 'Encapsulation, Abstraction, Inheritance, Polymorphism, Design Patterns.',
      mistake: '❌ Giving textbook definitions without concrete real-world examples.\n✅ Always start with a 1-sentence plain definition + everyday analogy!',
      trap: 'Top 3 Placement Traps: 1. Can constructor be private? (Yes) 2. Are variables polymorphic? (No) 3. Can static methods be overridden? (No).',
      cheatWhat: 'Complete rapid revision checklist for campus placement technical interviews.',
      cheatWhy: 'Maximizes clarity, confidence, and placement offer conversion.',
      tags: ['TCS', 'Infosys', 'Wipro', 'Accenture', 'Cognizant']
    }
  };

  const meta = TOPIC_METADATA[normId] || TOPIC_METADATA['constructors'];

  return [
    {
      cardNumber: 1,
      stepKey: 'what-is-it',
      title: `What is ${meta.name}?`,
      subtitle: `Core Concept & Everyday Analogy`,
      iconType: 'paradigm',
      simpleDef: meta.what,
      oneLineMeaning: meta.what.split('.')[0] + '.',
      inSimpleWords: meta.what,
      realWorldAnalogy: {
        concept: meta.analogy,
        example: meta.analogyEx
      },
      visualType: `oops-${normId}-diagram`,
      highlights: {
        quickRemember: `${meta.name}: ${meta.cheatWhat}`,
        interviewTip: `Always open with the ${meta.analogy} analogy in your interview.`,
        commonMistake: `Confusing ${meta.name} with related paradigm concepts.`
      }
    },
    {
      cardNumber: 2,
      stepKey: 'why-need-it',
      title: `Why Do We Need ${meta.name}?`,
      subtitle: 'The Problem & The Solution',
      iconType: 'shield',
      simpleDef: `Understanding why ${meta.name} was created to solve software engineering challenges.`,
      withoutVsWith: {
        withoutTitle: `WITHOUT ${meta.name}`,
        withoutPoints: [meta.whyWithout, 'Increased code fragility', 'Prone to human error and unexpected runtime bugs'],
        withTitle: `WITH ${meta.name}`,
        withPoints: [meta.whyWith, 'Clean modularity and readability', 'Scalable, enterprise-ready code architecture']
      },
      visualType: 'concept-comparison-box',
      highlights: {
        quickRemember: `Without: Fragile and error-prone. With: Robust and modular.`,
        interviewTip: 'Interviewers care more about WHY we use a concept than just memorized syntax.',
        commonMistake: 'Ignoring the architectural motivation behind the feature.'
      }
    },
    {
      cardNumber: 3,
      stepKey: 'how-it-works',
      title: `How ${meta.name} Works`,
      subtitle: 'Execution Flow & Mechanics',
      iconType: 'flow',
      simpleDef: meta.how,
      flowSteps: [
        { step: 1, label: 'Declaration', desc: `Define the ${meta.name} structure in code.` },
        { step: 2, label: 'Compilation', desc: 'Compiler verifies syntax, constraints, and visibility access.' },
        { step: 3, label: 'Runtime Resolution', desc: 'Memory is allocated and instructions execute as planned.' },
        { step: 4, label: 'Completion', desc: 'State is updated cleanly without side-effect corruption.' }
      ],
      visualType: 'concept-pipeline-flow',
      highlights: {
        quickRemember: meta.how,
        interviewTip: 'Trace the lifecycle step-by-step when explaining to interviewers.',
        commonMistake: 'Assuming operations happen simultaneously without sequence order.'
      }
    },
    {
      cardNumber: 4,
      stepKey: 'syntax',
      title: `${meta.name} Syntax`,
      subtitle: 'Idiomatic Multi-Language Code',
      iconType: 'code',
      simpleDef: `Writing clean, standard ${meta.name} in Java, Python, and C++.`,
      codeSnippets: {
        Java: meta.syntaxJava,
        Python: meta.syntaxPy,
        'C++': meta.syntaxCpp
      },
      syntaxNotes: [
        `Strict typing rules apply in Java and C++.`,
        `Python follows dynamic and expressive syntax conventions.`,
        `Follow language-specific naming standards.`
      ],
      highlights: {
        quickRemember: `Keep syntax minimal and focused on the core concept.`,
        interviewTip: 'Write small, working snippets on paper or whiteboard during technical rounds.',
        commonMistake: 'Writing pseudo-code with syntax errors when simple clean code is expected.'
      }
    },
    {
      cardNumber: 5,
      stepKey: 'real-world-example',
      title: `Real-World Example: ${meta.name}`,
      subtitle: 'Practical Real-Life Application',
      iconType: 'home',
      simpleDef: meta.realWorld,
      realWorldScenario: {
        domain: 'Real-World System',
        description: meta.realWorld,
        takeaway: `Applying ${meta.name} makes complex real-world modeling natural and intuitive.`
      },
      visualType: 'real-world-scenario-diagram',
      highlights: {
        quickRemember: meta.realWorld,
        interviewTip: 'Connect code directly to a tangible real-world business entity.',
        commonMistake: 'Using abstract math variables (foo, bar, x, y) instead of meaningful entity names.'
      }
    },
    {
      cardNumber: 6,
      stepKey: 'types-variations',
      title: `Types & Variations of ${meta.name}`,
      subtitle: 'Taxonomy and Classifications',
      iconType: 'layers',
      simpleDef: meta.types,
      typesList: meta.types.split(', ').map((t, idx) => ({
        name: `${idx + 1}. ${t}`,
        desc: `Key structural variation of ${meta.name}.`,
        icon: 'Layers'
      })),
      visualType: 'concept-variations-grid',
      highlights: {
        quickRemember: meta.types,
        interviewTip: 'Enumerate the types clearly (e.g. "There are 3 main types...").',
        commonMistake: 'Mixing up variations or missing standard industry categories.'
      }
    },
    {
      cardNumber: 7,
      stepKey: 'working-example',
      title: `Working Example: ${meta.name}`,
      subtitle: 'End-to-End Code & Output',
      iconType: 'play',
      simpleDef: `A complete, executable program demonstrating ${meta.name} in action.`,
      codeSnippets: {
        Java: meta.syntaxJava + `\n// Output verified during execution`,
        Python: meta.syntaxPy + `\n# Output verified during execution`,
        'C++': meta.syntaxCpp + `\n// Output verified during execution`
      },
      expectedOutput: 'Program executes successfully with expected state.',
      highlights: {
        quickRemember: 'Test code execution mentally before running.',
        interviewTip: 'Trace each line of execution and state variable values in order.',
        commonMistake: 'Failing to predict output correctly when edge cases occur.'
      }
    },
    {
      cardNumber: 8,
      stepKey: 'common-mistakes',
      title: 'Common Mistakes & Traps',
      subtitle: 'Pitfalls to Avoid',
      iconType: 'alert',
      simpleDef: 'Classic traps that fail compilation or break runtime expectations.',
      mistakesList: [
        {
          mistake: meta.mistake.split('\n')[0],
          correct: meta.mistake.split('\n')[1] || 'Follow proper language rules.'
        }
      ],
      interviewTrap: `⚠️ Interview Trap: ${meta.trap}`,
      highlights: {
        quickRemember: meta.trap,
        interviewTip: 'Mentioning common pitfalls proactively proves deep experience.',
        commonMistake: 'Falling for classic interview trick questions.'
      }
    },
    {
      cardNumber: 9,
      stepKey: 'interview-placement',
      title: 'Interview & Placement Focus',
      subtitle: 'Reported Patterns from Campus Drives',
      iconType: 'award',
      simpleDef: `How ${meta.name} is assessed in recruitment drives.`,
      interviewQuestions: [
        {
          q: `Explain ${meta.name} in simple terms.`,
          a: meta.what
        },
        {
          q: `What is a common interview trap related to ${meta.name}?`,
          a: meta.trap
        }
      ],
      companyTags: meta.tags,
      companyAttribution: `Reported in assessments at: ${meta.tags.join(' • ')}`,
      highlights: {
        quickRemember: `${meta.name} is a high-frequency question in placement interviews.`,
        interviewTip: 'Structure your answer: 1. Definition 2. Real-world example 3. Code snippet 4. Trap avoided.',
        commonMistake: 'Speaking too fast or omitting the core rationale.'
      }
    },
    {
      cardNumber: 10,
      stepKey: 'quick-revision',
      title: 'Quick Revision Cheat Sheet',
      subtitle: '60-Second Memory Anchor',
      iconType: 'check',
      simpleDef: `Instant summary card for ${meta.name}.`,
      cheatSheet: {
        WHAT: meta.cheatWhat,
        WHY: meta.cheatWhy,
        HOW: meta.how,
        KEY_POINT: meta.analogy,
        COMMON_TRAP: meta.trap,
        INTERVIEW_TIP: `Remember: ${meta.cheatWhat}`,
        SYNTAX: meta.syntaxJava.split('\n')[0]
      },
      visualType: 'concept-cheat-sheet',
      highlights: {
        quickRemember: `Quickly review right before your technical interview.`,
        interviewTip: 'Keep these 7 cheat sheet points top-of-mind.',
        commonMistake: 'Forgetting key differences right before the interview.'
      }
    }
  ];
}

/**
 * Universal Card Getter
 * Returns exactly 10 cards for ANY OOPS topic.
 */
export function getOOPSTopicCards(topicId) {
  const normId = resolveOOPSTopicId(topicId);
  if (OOPS_TOPIC_CARDS[normId]) {
    return OOPS_TOPIC_CARDS[normId];
  }
  return createTopic10Cards(normId);
}
