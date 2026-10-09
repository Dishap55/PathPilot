/**
 * OOPS PRACTICE DATA LAYER
 * 
 * Contains:
 * 1. OOPS MCQ Question Bank (113 Placement-Calibrated Questions: Easy -> Medium -> Hard)
 *    - All 20 canonical OOPS topics with >= 5 questions per topic
 *    - Conceptual definitions & differences
 *    - Code behavior & output prediction
 *    - Flowchart & case-study visual questions
 *    - Tricky conceptual traps & interview patterns
 *    - Progressive hints and step-by-step explanations
 * 2. OOPS Code Practice Challenges (7 Canonical OOP Coding Problems)
 *    - Class & Object, Encapsulation, Inheritance, Polymorphism, Abstraction, Overloading, Composition
 *    - Multi-language starter code (Java, Python, C++)
 *    - Concrete test cases & requirements
 */

export const OOPS_MCQ_QUESTIONS = [
  {
    "id": "oops_mcq_01",
    "topicId": "classes-and-objects",
    "title": "Class vs Object Fundamental Relationship",
    "prompt": "Which of the following statements best describes the relationship between a Class and an Object?",
    "options": [
      {
        "id": "A",
        "text": "An object is the blueprint, while a class is the physical instance in memory."
      },
      {
        "id": "B",
        "text": "A class is the blueprint, while an object is a real tangible instance created from that class."
      },
      {
        "id": "C",
        "text": "A class and an object are identical concepts with different naming conventions."
      },
      {
        "id": "D",
        "text": "An object consumes zero heap memory, whereas a class allocates heap memory."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Class & Object Definition",
    "estimatedTime": "30 sec",
    "companyTags": [
      "TCS",
      "Wipro"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Wipro",
    "hints": [
      "Hint 1: Think of an architect’s blueprint on paper versus an actual brick-and-mortar house.",
      "Hint 2: The class specifies the design; the object is the actual thing built from that design."
    ],
    "explanation": {
      "step1": "A Class defines the template, data members, and methods without allocating object heap memory.",
      "step2": "When you invoke new (or instantiate in Python), memory is allocated for an Object in the heap.",
      "summary": "Option B is correct: Class = Blueprint, Object = Real Instance.",
      "formula": "Class (Template) -> Instantiate -> Object (Memory Instance)",
      "quickTip": "You cannot live in a blueprint; you live in the house. You cannot execute on a class without an object instance."
    }
  },
  {
    "id": "oops_mcq_02",
    "topicId": "encapsulation",
    "title": "Mechanism to Achieve Encapsulation",
    "prompt": "How is Encapsulation primarily implemented in object-oriented programming languages?",
    "options": [
      {
        "id": "A",
        "text": "By declaring all variables public so all classes can collaborate freely."
      },
      {
        "id": "B",
        "text": "By declaring variables private and providing public getter/setter methods for controlled access."
      },
      {
        "id": "C",
        "text": "By inheriting every class from a global base object."
      },
      {
        "id": "D",
        "text": "By replacing all instance methods with static functions."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Data Hiding & Encapsulation",
    "estimatedTime": "30 sec",
    "companyTags": [
      "Cognizant",
      "Capgemini"
    ],
    "companyAttribution": "Reported in assessments at: Cognizant • Capgemini",
    "hints": [
      "Hint 1: Encapsulation is known as \"Data Hiding\". How do you hide data from outside tampering?",
      "Hint 2: Use the private access modifier on attributes, then expose controlled public methods."
    ],
    "explanation": {
      "step1": "Declaring member variables private shields them from unauthorized direct mutations from outside code.",
      "step2": "Providing public getters and setters allows validation checks (e.g. balance cannot be negative).",
      "summary": "Option B is correct.",
      "formula": "Encapsulation = Private Data + Public Accessors (Getters / Setters)",
      "quickTip": "Always remember: Encapsulation protects the internal invariant state of an object."
    }
  },
  {
    "id": "oops_mcq_03",
    "topicId": "inheritance",
    "title": "Detecting True Inheritance (Is-A vs Has-A)",
    "prompt": "Which of the following real-world relationships represents a valid \"Is-A\" Inheritance relationship rather than Composition (\"Has-A\")?",
    "options": [
      {
        "id": "A",
        "text": "Car and Engine"
      },
      {
        "id": "B",
        "text": "House and Bathroom"
      },
      {
        "id": "C",
        "text": "Sparrow and Bird"
      },
      {
        "id": "D",
        "text": "Computer and HardDrive"
      }
    ],
    "correctOption": "C",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Is-A vs Has-A Relationship",
    "estimatedTime": "35 sec",
    "companyTags": [
      "Accenture",
      "Infosys"
    ],
    "companyAttribution": "Reported in assessments at: Accenture • Infosys",
    "hints": [
      "Hint 1: Apply the sentence test: \"A [X] is a [Y]\". Does it sound natural and factually true?",
      "Hint 2: A Car is NOT an Engine (Car HAS an engine). But a Sparrow IS a Bird!"
    ],
    "explanation": {
      "step1": "Is-A represents Inheritance: A Sparrow is a specialized type of Bird, inheriting wings and feathers.",
      "step2": "Car has an Engine, House has a Bathroom, Computer has a HardDrive — these are Has-A (Composition).",
      "summary": "Option C is correct.",
      "formula": "Inheritance = Is-A Relationship; Composition = Has-A Relationship",
      "quickTip": "If X cannot be described as \"is a type of Y\", do NOT use inheritance!"
    }
  },
  {
    "id": "oops_mcq_04",
    "topicId": "abstraction",
    "title": "Core Purpose of Abstraction",
    "prompt": "Which of the following statements most accurately captures the primary goal of Abstraction?",
    "options": [
      {
        "id": "A",
        "text": "To maximize execution speed by compiling all classes into a single binary file."
      },
      {
        "id": "B",
        "text": "To hide complex internal mechanics and expose only essential, user-facing interfaces."
      },
      {
        "id": "C",
        "text": "To duplicate common code across all subclasses to avoid virtual table lookups."
      },
      {
        "id": "D",
        "text": "To prevent classes from inheriting from any other class."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Abstraction Concept",
    "estimatedTime": "30 sec",
    "companyTags": [
      "TCS",
      "Infosys"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Infosys",
    "hints": [
      "Hint 1: Think of driving a car: you step on the accelerator pedal without knowing fuel injection physics.",
      "Hint 2: Abstraction exposes WHAT an object does, while hiding HOW it works internally."
    ],
    "explanation": {
      "step1": "Abstraction hides internal implementation details and presents a clean interface.",
      "step2": "Users interact with high-level methods (e.g. car.start()) without managing complex internal engines.",
      "summary": "Option B is correct.",
      "formula": "Abstraction = Expose WHAT; Conceal HOW",
      "quickTip": "Abstraction reduces cognitive complexity for developers consuming the system."
    }
  },
  {
    "id": "oops_mcq_05",
    "topicId": "constructors",
    "title": "Constructor Return Type Rule",
    "prompt": "What is the return type of a constructor in Java and C++?",
    "options": [
      {
        "id": "A",
        "text": "void"
      },
      {
        "id": "B",
        "text": "int (indicating error codes)"
      },
      {
        "id": "C",
        "text": "Constructors have NO return type, not even void"
      },
      {
        "id": "D",
        "text": "Object"
      }
    ],
    "correctOption": "C",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Constructor Syntax",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Wipro",
      "Capgemini"
    ],
    "companyAttribution": "Reported in assessments at: Wipro • Capgemini",
    "hints": [
      "Hint 1: If you write `void Car()`, the compiler treats it as a regular method, NOT a constructor!",
      "Hint 2: Constructors initialize memory; they never declare any return type."
    ],
    "explanation": {
      "step1": "Constructors in Java and C++ do not specify any return type.",
      "step2": "If you add `void`, it becomes a normal instance method that will NOT be invoked automatically on new!",
      "summary": "Option C is correct.",
      "formula": "Constructor Syntax: ClassName(params) { ... } [Zero return type]",
      "quickTip": "Never put `void` on a constructor; doing so creates a regular method that is never auto-invoked!"
    }
  },
  {
    "id": "oops_mcq_06",
    "topicId": "polymorphism",
    "title": "Compile-Time vs Runtime Polymorphism",
    "prompt": "Which pairing correctly maps the types of polymorphism to their programming mechanisms?",
    "options": [
      {
        "id": "A",
        "text": "Compile-Time: Method Overriding | Runtime: Method Overloading"
      },
      {
        "id": "B",
        "text": "Compile-Time: Method Overloading | Runtime: Method Overriding"
      },
      {
        "id": "C",
        "text": "Compile-Time: Inheritance | Runtime: Encapsulation"
      },
      {
        "id": "D",
        "text": "Compile-Time: Abstraction | Runtime: Multiple Inheritance"
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Polymorphism Classification",
    "estimatedTime": "30 sec",
    "companyTags": [
      "TCS",
      "Cognizant"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Cognizant",
    "hints": [
      "Hint 1: Overloading is decided early by the compiler based on argument types.",
      "Hint 2: Overriding is decided late by the runtime based on the actual heap object."
    ],
    "explanation": {
      "step1": "Method Overloading is resolved at compile time (Static Polymorphism).",
      "step2": "Method Overriding is resolved at runtime via dynamic dispatch (Dynamic Polymorphism).",
      "summary": "Option B is correct.",
      "formula": "Compile-Time = Overloading; Runtime = Overriding",
      "quickTip": "Remember: Static/Early Binding = Overloading; Dynamic/Late Binding = Overriding."
    }
  },
  {
    "id": "oops_mcq_07",
    "topicId": "access-modifiers",
    "title": "Private Modifier Scope",
    "prompt": "A variable declared with the `private` access modifier in Java is accessible:",
    "options": [
      {
        "id": "A",
        "text": "Only within the declaring class itself"
      },
      {
        "id": "B",
        "text": "Within the declaring class and all its subclasses"
      },
      {
        "id": "C",
        "text": "Anywhere within the same package"
      },
      {
        "id": "D",
        "text": "Everywhere in the entire project"
      }
    ],
    "correctOption": "A",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Access Modifiers",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Infosys",
      "Accenture"
    ],
    "companyAttribution": "Reported in assessments at: Infosys • Accenture",
    "hints": [
      "Hint 1: Private is the most restrictive access modifier.",
      "Hint 2: Even child subclasses cannot directly access private parent variables."
    ],
    "explanation": {
      "step1": "`private` limits access strictly to the class where it is declared.",
      "step2": "Subclasses must use public/protected getters or setters to interact with private fields.",
      "summary": "Option A is correct.",
      "formula": "private = Enclosing class only",
      "quickTip": "Use private by default for all object state fields (Principle of Least Privilege)."
    }
  },
  {
    "id": "oops_mcq_08",
    "topicId": "static-members",
    "title": "Static Variable Memory Allocation",
    "prompt": "Where is memory for a `static` variable allocated and how many copies exist?",
    "options": [
      {
        "id": "A",
        "text": "Allocated on the Call Stack; one copy per function call."
      },
      {
        "id": "B",
        "text": "Allocated in Metaspace/Classloader area; exactly ONE shared copy exists across all instances."
      },
      {
        "id": "C",
        "text": "Allocated on the Heap; one new copy is duplicated every time `new` is called."
      },
      {
        "id": "D",
        "text": "Allocated in CPU registers; recreated on every thread cycle."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Static Members Memory",
    "estimatedTime": "30 sec",
    "companyTags": [
      "TCS",
      "Wipro"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Wipro",
    "hints": [
      "Hint 1: Static variables belong to the class, not to any individual object.",
      "Hint 2: If you instantiate 1,000 objects, only ONE copy of the static variable exists in memory."
    ],
    "explanation": {
      "step1": "Static members are loaded once when the class is initialized by the classloader.",
      "step2": "They are shared by all instances of the class, saving RAM for global counters and constants.",
      "summary": "Option B is correct.",
      "formula": "Static = 1 shared copy per Class",
      "quickTip": "Access static variables via ClassName.var rather than instance.var for clarity."
    }
  },
  {
    "id": "oops_mcq_09",
    "topicId": "inheritance",
    "title": "Constructor Chaining Execution Order",
    "prompt": "Given class B extends class A. When an object of class B is instantiated (`new B()`), what is the order of constructor execution?",
    "options": [
      {
        "id": "A",
        "text": "B constructor executes first, then A constructor."
      },
      {
        "id": "B",
        "text": "A constructor executes first, then B constructor."
      },
      {
        "id": "C",
        "text": "Only B constructor executes; A constructor is skipped completely."
      },
      {
        "id": "D",
        "text": "Both execute concurrently on separate threads."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Constructor Chaining",
    "estimatedTime": "35 sec",
    "companyTags": [
      "TCS",
      "Infosys"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Infosys",
    "hints": [
      "Hint 1: Can a child exist before the parent is created?",
      "Hint 2: The base class constructor is invoked (implicitly or explicitly via super()) before the derived constructor body runs."
    ],
    "explanation": {
      "step1": "When new B() is called, B constructor first delegates to A constructor (via super()).",
      "step2": "Class A initializes its base fields first. Then control returns to B constructor.",
      "summary": "Option B is correct: Parent (A) executes before Child (B).",
      "formula": "Base Constructor -> Derived Constructor",
      "quickTip": "Parent constructor always runs first so that inherited fields are valid before child code executes."
    }
  },
  {
    "id": "oops_mcq_10",
    "topicId": "interfaces",
    "title": "Multiple Inheritance Conflict Resolution in Java 8",
    "prompt": "If Class C implements Interface A and Interface B, and both interfaces declare a default method `void show()`, how does Java resolve this?",
    "options": [
      {
        "id": "A",
        "text": "Java randomly picks Interface A or B at runtime."
      },
      {
        "id": "B",
        "text": "The compiler throws an error unless Class C explicitly overrides `show()` and resolves the ambiguity."
      },
      {
        "id": "C",
        "text": "The interface declared first in the implements clause wins automatically."
      },
      {
        "id": "D",
        "text": "The method with the shorter name takes precedence."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Diamond Problem in Interfaces",
    "estimatedTime": "40 sec",
    "companyTags": [
      "Cognizant",
      "Capgemini"
    ],
    "companyAttribution": "PathPilot Practice — based on reported Cognizant pattern",
    "hints": [
      "Hint 1: Think of the Diamond Problem: ambiguity between two implementations.",
      "Hint 2: The compiler refuses to guess; it forces the programmer to override the method explicitly."
    ],
    "explanation": {
      "step1": "Two default methods with identical signatures in implemented interfaces cause an ambiguity conflict.",
      "step2": "Class C must override `show()` and can optionally call `InterfaceA.super.show()`.",
      "summary": "Option B is correct: Compiler error unless explicitly overridden in the child class.",
      "formula": "Default Conflict -> Must Override in Subclass (InterfaceA.super.show())",
      "quickTip": "Resolve default interface method collisions using `InterfaceName.super.method()`."
    }
  },
  {
    "id": "oops_mcq_11",
    "topicId": "polymorphism",
    "title": "Output Prediction: Dynamic Method Dispatch",
    "prompt": "What will be the output of the following Java program?\n\nclass Parent {\n    void print() { System.out.print(\"P \"); }\n}\nclass Child extends Parent {\n    void print() { System.out.print(\"C \"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        obj.print();\n    }\n}",
    "options": [
      {
        "id": "A",
        "text": "P "
      },
      {
        "id": "B",
        "text": "C "
      },
      {
        "id": "C",
        "text": "P C "
      },
      {
        "id": "D",
        "text": "Compilation Error"
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Output Prediction: Overriding",
    "estimatedTime": "35 sec",
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Infosys",
    "hints": [
      "Hint 1: What is the type of the reference? (Parent). What is the type of the actual object in the heap? (Child).",
      "Hint 2: In Java, method calls are resolved at runtime based on the actual object in the heap."
    ],
    "explanation": {
      "step1": "`obj` is declared as a Parent reference, but points to a `new Child()` object on the heap.",
      "step2": "Because `print()` is non-static, the JVM performs dynamic dispatch and executes Child.print().",
      "summary": "Option B is correct: prints \"C \".",
      "formula": "Heap Object Type determines overridden method execution",
      "quickTip": "Reference type decides what you CAN call; Heap object decides WHICH version runs."
    }
  },
  {
    "id": "oops_mcq_12",
    "topicId": "polymorphism",
    "title": "Output Prediction: Variable Shadowing vs Overriding",
    "prompt": "What will be the output of the following Java program?\n\nclass Parent {\n    int value = 10;\n}\nclass Child extends Parent {\n    int value = 20;\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent p = new Child();\n        System.out.println(p.value);\n    }\n}",
    "options": [
      {
        "id": "A",
        "text": "10"
      },
      {
        "id": "B",
        "text": "20"
      },
      {
        "id": "C",
        "text": "0"
      },
      {
        "id": "D",
        "text": "Compilation Error"
      }
    ],
    "correctOption": "A",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Variable Shadowing Trap",
    "estimatedTime": "40 sec",
    "companyTags": [
      "TCS",
      "Accenture"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Accenture",
    "hints": [
      "Hint 1: Are variables polymorphic in Java?",
      "Hint 2: Variable resolution is decided at compile-time by the reference type, NOT at runtime!"
    ],
    "explanation": {
      "step1": "Variables in Java do NOT participate in runtime polymorphism; only methods do.",
      "step2": "`p` is of reference type `Parent`, so `p.value` resolves to `Parent.value` (10).",
      "summary": "Option A is correct: 10.",
      "formula": "Variables = Compile-Time (Reference Type); Methods = Runtime (Heap Object)",
      "quickTip": "Never shadow instance variables in subclasses; it causes massive debugging confusion!"
    }
  },
  {
    "id": "oops_mcq_13",
    "topicId": "abstract-classes",
    "title": "Can an Abstract Class Have a Constructor?",
    "prompt": "Can an `abstract class` in Java or C++ have a constructor?",
    "options": [
      {
        "id": "A",
        "text": "No, because abstract classes cannot be instantiated, so constructors are illegal."
      },
      {
        "id": "B",
        "text": "Yes, and it is invoked by subclasses via `super()` during instantiation."
      },
      {
        "id": "C",
        "text": "Only if all methods in the abstract class are static."
      },
      {
        "id": "D",
        "text": "Only if the abstract class has zero member variables."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Abstract Class Trap",
    "estimatedTime": "35 sec",
    "companyTags": [
      "TCS",
      "Capgemini"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Capgemini",
    "hints": [
      "Hint 1: Can an abstract class have fields that need initialization when a subclass is created?",
      "Hint 2: Although you cannot call `new AbstractClass()`, child constructors call `super()`!"
    ],
    "explanation": {
      "step1": "Abstract classes can hold state (fields) that require initialization.",
      "step2": "Subclasses call the abstract class constructor via `super()` to initialize base fields.",
      "summary": "Option B is correct: Abstract classes CAN have constructors.",
      "formula": "Abstract Class Constructor -> Invoked by Subclass via super()",
      "quickTip": "This is one of the top 5 trick questions in campus placement technical rounds!"
    }
  },
  {
    "id": "oops_mcq_14",
    "topicId": "composition",
    "title": "Composition vs Aggregation Lifecycle Difference",
    "prompt": "What is the critical distinction between Composition and Aggregation?",
    "options": [
      {
        "id": "A",
        "text": "In Composition, child objects survive parent deletion; in Aggregation, they are destroyed."
      },
      {
        "id": "B",
        "text": "In Composition, child lifecycle is strictly owned by the parent; in Aggregation, children exist independently."
      },
      {
        "id": "C",
        "text": "Composition uses the `extends` keyword; Aggregation uses `implements`."
      },
      {
        "id": "D",
        "text": "There is no difference; they are synonymous terms in UML."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Composition vs Aggregation",
    "estimatedTime": "35 sec",
    "companyTags": [
      "Infosys",
      "Wipro"
    ],
    "companyAttribution": "Reported in assessments at: Infosys • Wipro",
    "hints": [
      "Hint 1: Think of House & Rooms (Composition) vs Department & Teachers (Aggregation).",
      "Hint 2: If the House is demolished, the rooms cease to exist. If the Department closes, teachers still exist."
    ],
    "explanation": {
      "step1": "Composition is strong ownership: the part cannot exist without the whole.",
      "step2": "Aggregation is weak association: the aggregated object has an independent lifecycle.",
      "summary": "Option B is correct.",
      "formula": "Composition = Strong Has-A (Tied Lifecycles); Aggregation = Weak Has-A (Independent)",
      "quickTip": "In UML: Filled diamond = Composition; Hollow diamond = Aggregation."
    }
  },
  {
    "id": "oops_mcq_15",
    "topicId": "static-members",
    "title": "Static Method Overriding Rules",
    "prompt": "What happens if a child class defines a static method with the exact same name and signature as a static method in its parent class?",
    "options": [
      {
        "id": "A",
        "text": "The child method overrides the parent method polymorphically."
      },
      {
        "id": "B",
        "text": "Compilation error: static methods cannot share the same name across parent and child."
      },
      {
        "id": "C",
        "text": "Method Hiding (Shadowing) occurs: the child method hides the parent method without dynamic dispatch."
      },
      {
        "id": "D",
        "text": "The JVM automatically converts both methods into abstract methods."
      }
    ],
    "correctOption": "C",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Method Hiding vs Overriding",
    "estimatedTime": "40 sec",
    "companyTags": [
      "TCS",
      "Cognizant"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Cognizant",
    "hints": [
      "Hint 1: Static methods belong to the class, not to instances in heap memory.",
      "Hint 2: Because they are resolved by the compiler using reference types, virtual dispatch does not occur."
    ],
    "explanation": {
      "step1": "Static methods belong to the class definition and cannot be overridden dynamically.",
      "step2": "Declaring the same static signature in a subclass hides the parent method (Method Hiding).",
      "summary": "Option C is correct: Method Hiding occurs.",
      "formula": "Static Same Signature = Method Hiding (Compile-time bind)",
      "quickTip": "Never attempt to override static methods; you are merely hiding them."
    }
  },
  {
    "id": "oops_mcq_16",
    "topicId": "polymorphism",
    "title": "Flowchart Case Study: Payment Processing Dispatch",
    "prompt": "Examine the architecture flow below:\n\n[User Checkout]\n      ↓\n[PaymentGateway (Interface)]\n      ↓ (Calls processPayment(amount))\n ┌────┴──────────────────────────┐\n ↓                               ↓\n[CreditCardPayment]        [UPIPayment]\n ↓ (Deducts via Visa API)   ↓ (Authenticates UPI PIN)\n\nWhich primary OOPS concept is demonstrated by having the checkout invoke a single interface method that branches into distinct vendor operations?",
    "options": [
      {
        "id": "A",
        "text": "Encapsulation with Private Setters"
      },
      {
        "id": "B",
        "text": "Runtime Polymorphism & Abstraction"
      },
      {
        "id": "C",
        "text": "Multiple Inheritance of Classes"
      },
      {
        "id": "D",
        "text": "Static Variable Shadowing"
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Case Study: Polymorphic Architecture",
    "estimatedTime": "45 sec",
    "companyTags": [
      "TCS",
      "Infosys"
    ],
    "companyAttribution": "Company Pattern: TCS Digital • Infosys DSE",
    "hints": [
      "Hint 1: The checkout interacts with a generic interface (PaymentGateway).",
      "Hint 2: Different concrete classes execute different code paths for the same method call."
    ],
    "explanation": {
      "step1": "PaymentGateway acts as an Abstraction layer concealing vendor-specific API complexity.",
      "step2": "Invoking processPayment() dynamically executes CreditCardPayment or UPIPayment (Runtime Polymorphism).",
      "summary": "Option B is correct: Runtime Polymorphism & Abstraction.",
      "formula": "Interface Contract + Dynamic Execution = Abstraction + Polymorphism",
      "quickTip": "This is the canonical Strategy / Gateway pattern used throughout enterprise software."
    }
  },
  {
    "id": "oops_mcq_17",
    "topicId": "inheritance",
    "title": "Diagram Case Study: Animal Kingdom Hierarchy",
    "prompt": "Analyze the class hierarchy diagram below:\n\n          Animal (breathe(), eat())\n             /            \\\n      Mammal (warmBlood)   Bird (layEggs())\n         /                     \\\n   Dog (bark())            Penguin (swim())\n\nIf an object of `Dog` is instantiated, which methods and attributes does it have access to?",
    "options": [
      {
        "id": "A",
        "text": "Only bark() defined inside Dog."
      },
      {
        "id": "B",
        "text": "bark(), warmBlood, breathe(), and eat()."
      },
      {
        "id": "C",
        "text": "All methods in the diagram, including layEggs() and swim()."
      },
      {
        "id": "D",
        "text": "Only breathe() and eat() from Animal."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Case Study: Inheritance Hierarchy",
    "estimatedTime": "35 sec",
    "companyTags": [
      "Wipro",
      "Capgemini"
    ],
    "companyAttribution": "Reported in assessments at: Wipro • Capgemini",
    "hints": [
      "Hint 1: Follow the ancestor branch for Dog: Dog extends Mammal, which extends Animal.",
      "Hint 2: Dog does NOT inherit from the sibling Bird branch!"
    ],
    "explanation": {
      "step1": "Dog inherits along its direct ancestor chain: Mammal and Animal.",
      "step2": "Dog acquires bark() (its own), warmBlood (from Mammal), and breathe() & eat() (from Animal).",
      "summary": "Option B is correct.",
      "formula": "Child inherits from direct ancestors only, never from sibling branches.",
      "quickTip": "Inheritance traverses upward to superclasses; sibling classes share no direct inheritance!"
    }
  },
  {
    "id": "oops_mcq_18",
    "topicId": "constructors",
    "title": "Tricky Output: Overridden Method Called in Constructor",
    "prompt": "What will be the output of the following Java program?\n\nclass Parent {\n    Parent() {\n        printName();\n    }\n    void printName() {\n        System.out.print(\"Parent \");\n    }\n}\nclass Child extends Parent {\n    String name = \"Child\";\n    void printName() {\n        System.out.print(name + \" \");\n    }\n}\npublic class Main {\n    public static void main(String[] args) {\n        new Child();\n    }\n}",
    "options": [
      {
        "id": "A",
        "text": "Parent "
      },
      {
        "id": "B",
        "text": "Child "
      },
      {
        "id": "C",
        "text": "null "
      },
      {
        "id": "D",
        "text": "Compilation Error"
      }
    ],
    "correctOption": "C",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Constructor Trap: Virtual Method Call",
    "estimatedTime": "50 sec",
    "companyTags": [
      "TCS",
      "Infosys"
    ],
    "companyAttribution": "Reported in assessments at: TCS Digital • Infosys Power Programmer",
    "hints": [
      "Hint 1: In Java, method calls are virtual. Calling printName() in Parent constructor invokes Child’s overridden method!",
      "Hint 2: Has Child’s field `name = \"Child\"` been initialized yet when Parent constructor is running?"
    ],
    "explanation": {
      "step1": "Parent constructor runs first. It invokes printName(), which dynamically resolves to Child.printName().",
      "step2": "However, Child’s instance fields have NOT yet initialized; `name` is still its default value: `null`!",
      "summary": "Option C is correct: prints \"null \".",
      "formula": "Never invoke overridable virtual methods inside constructors!",
      "quickTip": "Calling virtual methods inside constructors is a dangerous anti-pattern because child state is uninitialized."
    }
  },
  {
    "id": "oops_mcq_19",
    "topicId": "this-self",
    "title": "Constructor Chaining with this() Restrictions",
    "prompt": "In Java, which of the following rules strictly applies when using `this()` to invoke another constructor in the same class?",
    "options": [
      {
        "id": "A",
        "text": "`this()` can be called at any line inside the constructor body."
      },
      {
        "id": "B",
        "text": "`this()` must be the very first statement, and a constructor cannot call both `this()` and `super()`."
      },
      {
        "id": "C",
        "text": "A class can create a circular chain where Constructor A calls Constructor B and B calls A."
      },
      {
        "id": "D",
        "text": "`this()` can only be used inside static factory methods."
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Constructor Chaining Rules",
    "estimatedTime": "45 sec",
    "companyTags": [
      "Cognizant",
      "Accenture"
    ],
    "companyAttribution": "PathPilot Practice — based on reported Accenture pattern",
    "hints": [
      "Hint 1: Can you initialize superclass state twice in the same constructor?",
      "Hint 2: Either you delegate to another constructor via this(), or you call the parent via super(). You cannot do both on line 1!"
    ],
    "explanation": {
      "step1": "`this()` must be the first statement in a constructor.",
      "step2": "Because `super()` must also be first, you cannot call both in the same constructor. Recursive calls trigger compilation errors.",
      "summary": "Option B is correct.",
      "formula": "this(args) or super(args) -> Exactly one, must be Line 1.",
      "quickTip": "The delegated constructor will eventually call super(), ensuring the parent is properly initialized once."
    }
  },
  {
    "id": "oops_mcq_20",
    "topicId": "exception-handling",
    "title": "Finally Block Return Value Override",
    "prompt": "What is the return value of the following method?\n\nint compute() {\n    try {\n        return 10;\n    } catch (Exception e) {\n        return 20;\n    } finally {\n        return 30;\n    }\n}",
    "options": [
      {
        "id": "A",
        "text": "10"
      },
      {
        "id": "B",
        "text": "20"
      },
      {
        "id": "C",
        "text": "30"
      },
      {
        "id": "D",
        "text": "Compilation Error"
      }
    ],
    "correctOption": "C",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Exception Handling: Finally Override",
    "estimatedTime": "40 sec",
    "companyTags": [
      "TCS",
      "Wipro",
      "Capgemini"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Wipro",
    "hints": [
      "Hint 1: Does the finally block ALWAYS execute before a method finishes returning?",
      "Hint 2: A return statement in a finally block overwrites any pending return value from try or catch!"
    ],
    "explanation": {
      "step1": "The `try` block evaluates `return 10`, but execution pauses to run the mandatory `finally` block.",
      "step2": "The `finally` block executes `return 30`, which overrides the pending return and returns 30.",
      "summary": "Option C is correct: returns 30.",
      "formula": "finally block return overrides try/catch return statements.",
      "quickTip": "Never place return statements inside finally blocks; it suppresses exceptions and pending returns!"
    }
  },
  {
    "id": "oops_mcq_21",
    "topicId": "method-overloading",
    "title": "Method Overloading: Type Promotion & Ambiguity",
    "prompt": "Given the following overloaded methods in Java:\n\nvoid display(int x, long y) { System.out.println(\"int, long\"); }\nvoid display(long x, int y) { System.out.println(\"long, int\"); }\n\nWhat happens when calling display(10, 20)?",
    "options": [
      {
        "id": "A",
        "text": "Prints \"int, long\" because int matches first parameter."
      },
      {
        "id": "B",
        "text": "Compilation Error: Reference to display is ambiguous."
      },
      {
        "id": "C",
        "text": "Prints \"long, int\" by default compiler preference."
      },
      {
        "id": "D",
        "text": "Throws AmbiguousMethodInvocationException at runtime."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Overloading Ambiguity Resolution",
    "estimatedTime": "45 sec",
    "companyTags": [
      "TCS",
      "Infosys"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Infosys",
    "hints": [
      "Hint 1: Both 10 and 20 are integer literals (type int). Both methods require widening one int to long.",
      "Hint 2: The compiler sees two equally specific methods and cannot pick one over the other without ambiguity."
    ],
    "explanation": {
      "step1": "Literal 10 and 20 are ints. First method widens 20 to long. Second method widens 10 to long.",
      "step2": "Neither method is more specific than the other, resulting in a compiler error: reference to display is ambiguous.",
      "summary": "Option B is correct.",
      "formula": "Ambiguous Overloading -> Compile Error",
      "quickTip": "To resolve ambiguity, cast one argument explicitly: display(10, (long)20)."
    }
  },
  {
    "id": "oops_mcq_22",
    "topicId": "method-overriding",
    "title": "Method Overriding: Covariant Return Types",
    "prompt": "In method overriding, can a subclass method return a subtype of the return type declared in the superclass method (e.g., superclass returns Number, subclass returns Integer)?",
    "options": [
      {
        "id": "A",
        "text": "No, return types must be strictly identical in all object-oriented languages."
      },
      {
        "id": "B",
        "text": "Yes, this is known as a Covariant Return Type and is fully legal in Java and C++."
      },
      {
        "id": "C",
        "text": "Only if both methods are declared static."
      },
      {
        "id": "D",
        "text": "Only if the return type is a primitive numeric type."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Covariant Return Types",
    "estimatedTime": "40 sec",
    "companyTags": [
      "Wipro",
      "Cognizant"
    ],
    "companyAttribution": "Reported in assessments at: Wipro • Cognizant",
    "hints": [
      "Hint 1: If a client expects a Number from the superclass, can it safely receive an Integer (since Integer Is-A Number)?",
      "Hint 2: Since Java 5, returning a more specific subtype in an overriding method is allowed."
    ],
    "explanation": {
      "step1": "Covariant return type means the overriding method can return a subtype of the type declared in the parent method.",
      "step2": "This preserves the Liskov Substitution Principle because caller code expecting the parent type is guaranteed compatibility.",
      "summary": "Option B is correct: Covariant return types are permitted.",
      "formula": "Subclass Return Type <= Superclass Return Type (Narrowing allowed for object returns)",
      "quickTip": "Covariant returns only apply to non-primitive object reference return types."
    }
  },
  {
    "id": "oops_mcq_23",
    "topicId": "access-modifiers",
    "title": "Access Modifiers: Protected Visibility Across Packages",
    "prompt": "In Java, which classes can access a member declared with the protected access modifier?",
    "options": [
      {
        "id": "A",
        "text": "Only classes within the exact same package."
      },
      {
        "id": "B",
        "text": "Classes within the same package, plus subclasses in external packages through inheritance."
      },
      {
        "id": "C",
        "text": "Any class in any package without restriction."
      },
      {
        "id": "D",
        "text": "Only the declaring class itself."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Access Modifier Scope",
    "estimatedTime": "35 sec",
    "companyTags": [
      "Accenture",
      "Capgemini"
    ],
    "companyAttribution": "Reported in assessments at: Accenture • Capgemini",
    "hints": [
      "Hint 1: Protected is more accessible than package-private (default), but less accessible than public.",
      "Hint 2: What special relationship allows an external package class to access protected members? Inheritance!"
    ],
    "explanation": {
      "step1": "Protected members are visible to all classes in the same package (package-private privilege).",
      "step2": "Additionally, any subclass anywhere in the project can inherit and access the protected member.",
      "summary": "Option B is correct.",
      "formula": "protected = Same Package + Child Classes Worldwide",
      "quickTip": "Default (no modifier) is package-only. Protected adds cross-package subclass access."
    }
  },
  {
    "id": "oops_mcq_24",
    "topicId": "this-self",
    "title": "this / self Keyword: Resolving Variable Shadowing",
    "prompt": "What is the primary role of the this keyword when constructor parameter names match instance attribute names?",
    "options": [
      {
        "id": "A",
        "text": "To delete the instance variable and retain only the parameter in memory."
      },
      {
        "id": "B",
        "text": "To disambiguate and refer to the current object instance variable rather than the local parameter."
      },
      {
        "id": "C",
        "text": "To allocate brand new heap space for the parameter."
      },
      {
        "id": "D",
        "text": "To invoke the garbage collector on the current thread."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Variable Shadowing Disambiguation",
    "estimatedTime": "30 sec",
    "companyTags": [
      "TCS",
      "Cognizant"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Cognizant",
    "hints": [
      "Hint 1: If both a parameter and a field are named `age`, writing `age = age;` assigns the local variable to itself!",
      "Hint 2: `this.age = age;` clarifies that the left side is the instance variable on the current object."
    ],
    "explanation": {
      "step1": "When parameter names shadow instance fields, writing `field = field` produces a no-op self-assignment.",
      "step2": "Prefixing `this.` explicitly points to the current object instance in Heap memory.",
      "summary": "Option B is correct.",
      "formula": "this.attribute = parameter (Resolves Variable Shadowing)",
      "quickTip": "In Python, `self.attr = attr` fulfills the exact same role inside `__init__`."
    }
  },
  {
    "id": "oops_mcq_25",
    "topicId": "super-keyword",
    "title": "super Keyword: Ancestor Access Boundary",
    "prompt": "Can a subclass in Java write super.super.display() to directly bypass its immediate parent and invoke a grandparent method?",
    "options": [
      {
        "id": "A",
        "text": "Yes, Java allows chaining super keywords to any ancestor generation."
      },
      {
        "id": "B",
        "text": "No, Java strictly prohibits super.super to enforce encapsulation of the immediate parent."
      },
      {
        "id": "C",
        "text": "Yes, but only if the grandparent class is marked abstract."
      },
      {
        "id": "D",
        "text": "Yes, if the method is marked synchronized."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Inheritance Boundary Rules",
    "estimatedTime": "40 sec",
    "companyTags": [
      "Infosys",
      "Wipro"
    ],
    "companyAttribution": "Reported in assessments at: Infosys • Wipro",
    "hints": [
      "Hint 1: In OOP encapsulation, does a class have the right to know whether its parent changed its grandparent’s implementation?",
      "Hint 2: Allowing a child to reach past its direct parent violates the encapsulation contract of the hierarchy."
    ],
    "explanation": {
      "step1": "`super` always resolves to the immediate superclass.",
      "step2": "Java disallows `super.super` because the subclass should not bypass whatever contract the direct parent establishes.",
      "summary": "Option B is correct: `super.super` causes a compile-time syntax error in Java.",
      "formula": "super -> Immediate Parent Only (No grandparent skipping)",
      "quickTip": "In C++, you can use `Grandparent::display()` if needed, but in Java, `super.super` is strictly illegal."
    }
  },
  {
    "id": "oops_mcq_26",
    "topicId": "association",
    "title": "Association: Navigability & Independence",
    "prompt": "A Doctor treats multiple Patients, and a Patient visits multiple Doctors. If both entities exist independently and neither owns the lifecycle of the other, what relationship is this?",
    "options": [
      {
        "id": "A",
        "text": "Strong Composition"
      },
      {
        "id": "B",
        "text": "Bidirectional Association"
      },
      {
        "id": "C",
        "text": "Single Inheritance"
      },
      {
        "id": "D",
        "text": "Static Inner Class"
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Association Lifecycle Independence",
    "estimatedTime": "30 sec",
    "companyTags": [
      "TCS",
      "Capgemini"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Capgemini",
    "hints": [
      "Hint 1: If the clinic closes down, do the Doctors or Patients cease to exist? No, both survive independently.",
      "Hint 2: When both classes know about each other without owning lifecycle, it is a bidirectional association."
    ],
    "explanation": {
      "step1": "Association models a \"Uses-A\" relationship where both objects maintain independent lifecycles.",
      "step2": "Because Doctor references Patient and Patient references Doctor, it is a Bidirectional Association.",
      "summary": "Option B is correct.",
      "formula": "Association = Independent Lifecycles + \"Uses-A\" / \"Knows-A\" relationship",
      "quickTip": "Association is the broadest relationship category; Aggregation and Composition are specialized forms of Association."
    }
  },
  {
    "id": "oops_mcq_27",
    "topicId": "aggregation",
    "title": "Aggregation: UML Notation & Lifecycle",
    "prompt": "In UML Class Diagrams, how is an Aggregation relationship (weak Has-A where child survives parent destruction) visually represented?",
    "options": [
      {
        "id": "A",
        "text": "Solid filled black diamond (◆) at the container class end."
      },
      {
        "id": "B",
        "text": "Hollow / open diamond (◇) at the container class end."
      },
      {
        "id": "C",
        "text": "Dotted line with open triangle (▷)."
      },
      {
        "id": "D",
        "text": "Solid line with closed circle (●)."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "UML Notation: Aggregation vs Composition",
    "estimatedTime": "30 sec",
    "companyTags": [
      "Wipro",
      "HCLTech"
    ],
    "companyAttribution": "PathPilot Practice — based on reported Wipro pattern",
    "hints": [
      "Hint 1: Think of hollow (empty) as \"loose / weak binding\" and solid (filled) as \"tight / strong binding\".",
      "Hint 2: Composition uses the filled diamond; Aggregation uses the open diamond."
    ],
    "explanation": {
      "step1": "UML represents Aggregation (weak containment) with an open hollow diamond (◇).",
      "step2": "UML represents Composition (strong ownership) with a solid black diamond (◆).",
      "summary": "Option B is correct: Hollow diamond denotes Aggregation.",
      "formula": "◇ (Open) = Aggregation (Weak) | ◆ (Solid) = Composition (Strong)",
      "quickTip": "Department ◇── Teacher: If Department closes, Teachers still exist."
    }
  },
  {
    "id": "oops_mcq_28",
    "topicId": "composition",
    "title": "Composition: Cascading Lifecycle Management",
    "prompt": "In an e-commerce platform, an Order object contains multiple OrderItem objects. If a customer cancels and deletes the Order, what must happen to the OrderItem objects in true Composition?",
    "options": [
      {
        "id": "A",
        "text": "The OrderItem objects are preserved in a global orphan pool."
      },
      {
        "id": "B",
        "text": "The OrderItem objects must be destroyed with the Order, because they cannot exist without it."
      },
      {
        "id": "C",
        "text": "The OrderItem objects convert into base classes."
      },
      {
        "id": "D",
        "text": "The OrderItem objects are automatically promoted to independent singletons."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Composition Lifecycle Binding",
    "estimatedTime": "35 sec",
    "companyTags": [
      "Cognizant",
      "Accenture"
    ],
    "companyAttribution": "Reported in assessments at: Cognizant • Accenture",
    "hints": [
      "Hint 1: Can a line item from Order #1004 float around in a database without any parent order attached to it?",
      "Hint 2: Composition implies strong ownership: parent creates, owns, and disposes of child parts."
    ],
    "explanation": {
      "step1": "In Composition, the child object lifecycle is completely bounded by the parent container lifecycle.",
      "step2": "When the parent Order is deleted, all constituent OrderItem instances are cascade-deleted.",
      "summary": "Option B is correct: Child cannot exist without the parent.",
      "formula": "Composition: Lifetime(Child) <= Lifetime(Parent)",
      "quickTip": "Rule of thumb: \"If I demolish the house, do the rooms cease to exist?\" Yes -> Composition."
    }
  },
  {
    "id": "oops_mcq_29",
    "topicId": "exception-handling",
    "title": "Exception Hierarchy: Checked vs Unchecked",
    "prompt": "In Java’s OOP exception class hierarchy, classes inheriting from RuntimeException are classified as:",
    "options": [
      {
        "id": "A",
        "text": "Checked Exceptions (must be declared in throws or caught by try-catch)."
      },
      {
        "id": "B",
        "text": "Unchecked Exceptions (compiler does not mandate explicit try-catch handling)."
      },
      {
        "id": "C",
        "text": "Hardware-level errors that cannot be caught."
      },
      {
        "id": "D",
        "text": "Interface contracts for multithreading."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Exception Class Hierarchy",
    "estimatedTime": "35 sec",
    "companyTags": [
      "Infosys",
      "TCS"
    ],
    "companyAttribution": "Reported in assessments at: Infosys • TCS",
    "hints": [
      "Hint 1: Think of NullPointerException or ArithmeticException. Does the compiler force you to write try-catch for them?",
      "Hint 2: Exceptions extending RuntimeException are unchecked; other descendants of Exception are checked."
    ],
    "explanation": {
      "step1": "Throwable has two main subclasses: Error and Exception.",
      "step2": "Under Exception, RuntimeException and its descendants are Unchecked (compiler does not enforce handling). All other Exceptions are Checked.",
      "summary": "Option B is correct: Unchecked exceptions extend RuntimeException.",
      "formula": "Throwable -> Exception -> RuntimeException (Unchecked)",
      "quickTip": "Checked = external issues (IOException, SQLException); Unchecked = logic bugs (NullPointerException, ArrayIndexOutOfBounds)."
    }
  },
  {
    "id": "oops_mcq_30",
    "topicId": "interview-revision",
    "title": "Object Identity: == vs equals() Contract",
    "prompt": "In Java, what is the default behavior of obj1.equals(obj2) if the class does NOT override the equals() method from Object?",
    "options": [
      {
        "id": "A",
        "text": "It compares the values of all primitive fields in both objects."
      },
      {
        "id": "B",
        "text": "It falls back to obj1 == obj2, checking reference equality (same memory address)."
      },
      {
        "id": "C",
        "text": "It throws an UnsupportedOperationException."
      },
      {
        "id": "D",
        "text": "It generates a compiler warning and returns true."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "equals() vs == Contract",
    "estimatedTime": "35 sec",
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Infosys • Wipro",
    "hints": [
      "Hint 1: Look at the implementation in java.lang.Object: `public boolean equals(Object obj) { return (this == obj); }`",
      "Hint 2: Without an override, equals() provides zero content inspection; it checks purely whether both pointers match."
    ],
    "explanation": {
      "step1": "The base implementation in `java.lang.Object` compares memory addresses using `==`.",
      "step2": "To compare internal attributes (state equality), you must override both `equals()` and `hashCode()`.",
      "summary": "Option B is correct: default equals() checks reference identity.",
      "formula": "Default equals() == Reference Equality (Heap Memory Address)",
      "quickTip": "Always override hashCode() whenever you override equals(), otherwise HashSets and HashMaps break!"
    }
  },
  {
    "id": "oops_mcq_31",
    "topicId": "composition",
    "title": "Flowchart Case Study: Vehicle & Engine Composition",
    "prompt": "Study this UML Class Relationship diagram:\n\n┌──────────────┐          ┌──────────────┐\n│     Car      │◆─────────│    Engine    │\n│ - engine     │ 1      1 │ - horsepower │\n│ + startCar() │          │ + ignite()   │\n└──────────────┘          └──────────────┘\n\nWhat does the solid black diamond (◆) indicate about the Engine object?",
    "options": [
      {
        "id": "A",
        "text": "The Engine exists independently and can be shared among multiple cars (Aggregation)."
      },
      {
        "id": "B",
        "text": "The Engine is tightly owned by the Car; if the Car is destroyed, the Engine is also destroyed (Composition)."
      },
      {
        "id": "C",
        "text": "The Engine inherits all properties from the Car (Is-A)."
      },
      {
        "id": "D",
        "text": "The Car implements the Engine interface."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "UML Case Study: Composition Lifecycle",
    "estimatedTime": "40 sec",
    "companyTags": [
      "Accenture",
      "Cognizant"
    ],
    "companyAttribution": "PathPilot Practice — based on reported Accenture pattern",
    "hints": [
      "Hint 1: Notice the solid black diamond at the Car end.",
      "Hint 2: Solid diamond represents Composition (exclusive ownership and shared lifecycle)."
    ],
    "explanation": {
      "step1": "The filled black diamond indicates Strong Composition.",
      "step2": "The Car creates, owns, and controls the Engine. Destroying the Car destroys its Engine component.",
      "summary": "Option B is correct.",
      "formula": "◆ = Composition (Strong Ownership & Shared Destruction)",
      "quickTip": "If the diamond were hollow (◇), it would mean Aggregation (Engine could survive Car demolition)."
    }
  },
  {
    "id": "oops_mcq_32",
    "topicId": "polymorphism",
    "title": "Flowchart Case Study: Payment Strategy Dispatch",
    "prompt": "Consider this interface hierarchy:\n\n           PaymentMethod (Interface)\n               + pay(amount)\n             /       |       \\\n            /        |        \\\n       CreditCard   UPI     NetBanking\n        pay(...)   pay(...)  pay(...)\n\nA payment gateway executes:\nPaymentMethod pm = getSelectedPaymentMethod();\npm.pay(1500);\n\nWhich OOP principle guarantees the correct algorithm executes at runtime without if-else checks?",
    "options": [
      {
        "id": "A",
        "text": "Static Variable Scoping"
      },
      {
        "id": "B",
        "text": "Runtime Polymorphism (Dynamic Method Dispatch)"
      },
      {
        "id": "C",
        "text": "Compile-Time Method Overloading"
      },
      {
        "id": "D",
        "text": "Constructor Delegation"
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Dynamic Dispatch Case Study",
    "estimatedTime": "45 sec",
    "companyTags": [
      "TCS",
      "Wipro"
    ],
    "companyAttribution": "Reported in assessments at: TCS Digital • Wipro Turbo",
    "hints": [
      "Hint 1: The reference variable is of type PaymentMethod, but the actual object in memory is UPI, CreditCard, or NetBanking.",
      "Hint 2: The JVM looks at the runtime object in Heap memory to decide which pay() method to run."
    ],
    "explanation": {
      "step1": "At compile-time, the compiler only verifies that PaymentMethod has a `pay(amount)` method.",
      "step2": "At runtime, the JVM uses the object’s Virtual Method Table (VTable) to dynamically dispatch the call to the concrete subtype.",
      "summary": "Option B is correct: Dynamic Polymorphism eliminates monolithic if-else blocks.",
      "formula": "Interface Reference -> Runtime Concrete Object -> Dynamic Dispatch",
      "quickTip": "This is the foundation of the Strategy Design Pattern widely tested in technical interviews."
    }
  },
  {
    "id": "oops_mcq_33",
    "topicId": "polymorphism",
    "title": "Tricky Output: Polymorphic Field Hiding vs Overriding",
    "prompt": "What will be printed by the following code?\n\nclass Parent {\n    int value = 10;\n    void print() { System.out.print(value + \" \"); }\n}\nclass Child extends Parent {\n    int value = 20;\n    void print() { System.out.print(value + \" \"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent p = new Child();\n        System.out.print(p.value + \" \");\n        p.print();\n    }\n}",
    "options": [
      {
        "id": "A",
        "text": "20 20"
      },
      {
        "id": "B",
        "text": "10 20"
      },
      {
        "id": "C",
        "text": "10 10"
      },
      {
        "id": "D",
        "text": "20 10"
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Field Hiding vs Method Overriding Trap",
    "estimatedTime": "55 sec",
    "companyTags": [
      "Infosys",
      "Cognizant"
    ],
    "companyAttribution": "Reported in assessments at: Infosys Power Programmer • Cognizant GenC Next",
    "hints": [
      "Hint 1: Are variables polymorphic in Java/C++? NO! Variables do not use virtual dispatch.",
      "Hint 2: Variable access `p.value` is resolved by the reference type (Parent). Method call `p.print()` is resolved by runtime object (Child)."
    ],
    "explanation": {
      "step1": "`p.value` accesses the field based on the reference type (Parent), yielding 10 (Field Hiding, not overriding).",
      "step2": "`p.print()` is dynamically dispatched to Child.print() based on the actual object (Child), yielding 20.",
      "summary": "Option B is correct: prints \"10 20\".",
      "formula": "Methods are Polymorphic (Runtime Object) | Variables are NOT Polymorphic (Reference Type)",
      "quickTip": "Never declare instance fields in a subclass with the same name as a superclass field!"
    }
  },
  {
    "id": "oops_mcq_34",
    "topicId": "constructors",
    "title": "Conceptual Trap: Can a Constructor be Private?",
    "prompt": "Can a constructor be declared with the private access modifier? If yes, what is a primary real-world design pattern that relies on this?",
    "options": [
      {
        "id": "A",
        "text": "No, constructors must always be public; otherwise compilation fails."
      },
      {
        "id": "B",
        "text": "Yes, widely used in the Singleton Pattern to prevent direct external instantiation."
      },
      {
        "id": "C",
        "text": "Yes, but only in abstract classes."
      },
      {
        "id": "D",
        "text": "Yes, but the class cannot contain any static methods."
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Private Constructor & Singleton Pattern",
    "estimatedTime": "40 sec",
    "companyTags": [
      "TCS",
      "Accenture"
    ],
    "companyAttribution": "Reported in assessments at: TCS • Accenture",
    "hints": [
      "Hint 1: If a constructor is private, outside classes cannot call `new MyClass()`.",
      "Hint 2: How does a Singleton guarantee only one instance exists in the entire system? By hiding the constructor!"
    ],
    "explanation": {
      "step1": "Private constructors are completely valid in OOP.",
      "step2": "They prevent external classes from creating instances directly, enabling Singleton patterns and static utility classes (like java.lang.Math).",
      "summary": "Option B is correct.",
      "formula": "Private Constructor + Public Static getInstance() = Singleton Pattern",
      "quickTip": "A class with only private constructors also cannot be subclassed (subclass cannot call super())."
    }
  },
  {
    "id": "oops_mcq_35",
    "topicId": "encapsulation",
    "title": "Conceptual Trap: Final Reference vs Immutable Object",
    "prompt": "Does declaring an object reference final (e.g. final List<String> list = new ArrayList<>();) make the object itself immutable?",
    "options": [
      {
        "id": "A",
        "text": "Yes, neither the pointer nor the contents of the list can ever be changed."
      },
      {
        "id": "B",
        "text": "No, final only prevents reassigning the list variable to a new address; internal elements can still be added or removed!"
      },
      {
        "id": "C",
        "text": "Yes, but only if the class is in the java.util package."
      },
      {
        "id": "D",
        "text": "No, final allows reassignment if done inside a synchronized block."
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Final Reference vs Immutability",
    "estimatedTime": "45 sec",
    "companyTags": [
      "Wipro",
      "TCS"
    ],
    "companyAttribution": "Reported in assessments at: Wipro • TCS",
    "hints": [
      "Hint 1: Can you do `list.add(\"hello\");` on a final list? Test it in your mind!",
      "Hint 2: `final` locks the pointer variable, not the object residing at the end of the pointer."
    ],
    "explanation": {
      "step1": "`final` for reference variables means the variable cannot be reassigned to point to another memory address.",
      "step2": "The internal state of the referenced object remains completely mutable (unless the class itself is immutable like String).",
      "summary": "Option B is correct: final reference != immutable object.",
      "formula": "final reference = Constant Pointer | Object State may still be Mutable",
      "quickTip": "To create true immutability, make fields private final, provide no setters, and return defensive copies."
    }
  },
  {
    "id": "oops_mcq_36",
    "topicId": "interfaces",
    "title": "Placement Trap: Static Methods in Interfaces",
    "prompt": "Can static methods declared inside an interface in Java 8+ be inherited or called via an implementing class reference (e.g., ImplementingClass.staticMethod())?",
    "options": [
      {
        "id": "A",
        "text": "Yes, static methods in interfaces are inherited just like static methods in superclasses."
      },
      {
        "id": "B",
        "text": "No, interface static methods belong strictly to the interface and must be invoked as InterfaceName.staticMethod()."
      },
      {
        "id": "C",
        "text": "Yes, if the implementing class marks the method with @Override."
      },
      {
        "id": "D",
        "text": "Only if the interface has exactly one method."
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Interface Static Method Scope Rule",
    "estimatedTime": "45 sec",
    "companyTags": [
      "Infosys",
      "Cognizant"
    ],
    "companyAttribution": "Reported in assessments at: Infosys • Cognizant",
    "hints": [
      "Hint 1: If two interfaces both have a static method `log()`, and a class implements both, what would happen if they were inherited?",
      "Hint 2: To prevent multiple inheritance ambiguity, Java mandates that interface static methods are never inherited."
    ],
    "explanation": {
      "step1": "Unlike classes, static methods in interfaces are NOT part of the implementing class API.",
      "step2": "They can only be called using the interface name: `InterfaceName.methodName()`. They cannot be inherited or overridden.",
      "summary": "Option B is correct.",
      "formula": "InterfaceName.staticMethod() Only (Never ImplementingClass.staticMethod())",
      "quickTip": "Default methods ARE inherited; static methods in interfaces are NOT inherited!"
    }
  },
  {
    "id": "oops_mcq_37",
    "topicId": "intro-to-oops",
    "title": "Procedural vs Object-Oriented Paradigm",
    "prompt": "What is the primary architectural difference between Procedural Programming (such as C) and Object-Oriented Programming (such as Java or C++)?",
    "options": [
      {
        "id": "A",
        "text": "Procedural programming has no functions, whereas OOP relies exclusively on global procedures."
      },
      {
        "id": "B",
        "text": "Procedural programming structures code around sequential procedures and global data, whereas OOP bundles data and the operations that mutate it into cohesive objects."
      },
      {
        "id": "C",
        "text": "OOP does not support loops or conditionals, relying instead entirely on object instantiation."
      },
      {
        "id": "D",
        "text": "Procedural languages allocate memory dynamically on the heap, while OOP languages only use the stack."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Paradigm Shift: Procedural to OOP",
    "estimatedTime": "30 sec",
    "companyTags": [
      "TCS",
      "Infosys"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Think about where data resides: global records vs encapsulated within objects.",
      "Hint 2: OOP unites state (attributes) and behavior (methods) in a single conceptual entity."
    ],
    "explanation": {
      "step1": "In procedural paradigms, functions are separated from data structures, frequently leading to shared mutable state and coupling.",
      "step2": "OOP groups state (data fields) and behavior (functions/methods) together, enabling access control and modularity.",
      "summary": "Option B is correct: OOP unifies data and behavior within objects.",
      "formula": "Procedural = Procedures + Data Separated | OOP = Data + Behavior Bundled",
      "quickTip": "In procedural code, verbs are primary. In OOP, nouns (objects) take center stage."
    }
  },
  {
    "id": "oops_mcq_38",
    "topicId": "intro-to-oops",
    "title": "Real-World Modeling: State and Behavior",
    "prompt": "In Object-Oriented software design, a real-world entity such as a \"BankAccount\" or \"Student\" is modeled using which two fundamental components?",
    "options": [
      {
        "id": "A",
        "text": "Primary keys and Foreign keys"
      },
      {
        "id": "B",
        "text": "State (attributes/fields) and Behavior (methods/functions)"
      },
      {
        "id": "C",
        "text": "Stack frames and Pointers"
      },
      {
        "id": "D",
        "text": "Compilers and Interpreters"
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Entity Modeling: State & Behavior",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Wipro",
      "Capgemini"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: An object knows things about itself and can do things.",
      "Hint 2: What it knows is its state; what it can do is its behavior."
    ],
    "explanation": {
      "step1": "State represents the properties or characteristics of an entity (e.g. account balance, student name).",
      "step2": "Behavior represents the actions or operations that can be performed on or by the entity (e.g. deposit(), calculateGrade()).",
      "summary": "Option B is correct: State and Behavior form the core of any OOP model.",
      "formula": "Object = State (Data Fields) + Behavior (Methods)",
      "quickTip": "Attributes describe what an object IS; methods describe what an object DOES."
    }
  },
  {
    "id": "oops_mcq_39",
    "topicId": "intro-to-oops",
    "title": "Coupling Problem in Procedural Architectures",
    "prompt": "An airline reservation system written in a procedural language maintains a global array of flight structs. When the flight struct is modified to add a new security field, 40 unrelated passenger-manifest functions break. Which OOP principle directly prevents this cascading failure?",
    "options": [
      {
        "id": "A",
        "text": "Encapsulation with Access Modifiers"
      },
      {
        "id": "B",
        "text": "Multi-threaded Concurrency"
      },
      {
        "id": "C",
        "text": "Tail Call Optimization"
      },
      {
        "id": "D",
        "text": "Direct Pointer Arithmetic"
      }
    ],
    "correctOption": "A",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Loose Coupling & Maintenance",
    "estimatedTime": "45 sec",
    "companyTags": [
      "Cognizant",
      "TCS"
    ],
    "companyAttribution": "Company Pattern: Cognizant",
    "hints": [
      "Hint 1: If data fields were private and accessed only through public methods, struct modifications would remain internal.",
      "Hint 2: Hiding internal data representation shields external consumers from internal structural changes."
    ],
    "explanation": {
      "step1": "In procedural code with global structs, changes to field layouts force all consumers accessing those fields directly to be re-engineered.",
      "step2": "Encapsulation shields the internal representation behind a stable method interface (getters/setters/business methods).",
      "summary": "Option A is correct: Encapsulation prevents internal struct changes from propagating outward.",
      "formula": "Private Implementation + Public Contract = Insulated Changes",
      "quickTip": "Encapsulation is not just data hiding; it is change insulation for growing systems."
    }
  },
  {
    "id": "oops_mcq_40",
    "topicId": "intro-to-oops",
    "title": "The Four Pillars Collaboration",
    "prompt": "A graphics engine allows calling `shape.render()` on any object. At runtime, a Circle draws using vector curves, while a Rectangle draws using four line segments, without the caller knowing the specific shape type. Which two OOP pillars work together to enable this capability?",
    "options": [
      {
        "id": "A",
        "text": "Encapsulation and Multiple Inheritance"
      },
      {
        "id": "B",
        "text": "Abstraction and Polymorphism"
      },
      {
        "id": "C",
        "text": "Static Binding and Direct Compilation"
      },
      {
        "id": "D",
        "text": "Garbage Collection and Memory Allocation"
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Pillars Synergy: Abstraction + Polymorphism",
    "estimatedTime": "40 sec",
    "companyTags": [
      "Infosys",
      "Accenture"
    ],
    "companyAttribution": "Company Pattern: Infosys",
    "hints": [
      "Hint 1: Hiding how a shape is drawn is one pillar.",
      "Hint 2: Invoking the same method name but executing different shape-specific behaviors at runtime is another pillar."
    ],
    "explanation": {
      "step1": "Abstraction defines the common high-level contract (`render()`) without specifying internal algorithms.",
      "step2": "Polymorphism (specifically dynamic dispatch) resolves and runs the subclass-specific rendering logic at runtime.",
      "summary": "Option B is correct: Abstraction provides the contract, Polymorphism provides the dynamic behavior.",
      "formula": "Common Interface (Abstraction) + Runtime Dynamic Dispatch (Polymorphism)",
      "quickTip": "Abstraction defines \"what\", Polymorphism executes \"which one\" at runtime."
    }
  },
  {
    "id": "oops_mcq_41",
    "topicId": "intro-to-oops",
    "title": "Limitations & Appropriate Use of OOP",
    "prompt": "In software architecture, which of the following scenarios is LEAST suited for heavy object-oriented inheritance hierarchies and is often better modeled using procedural or functional pipelines?",
    "options": [
      {
        "id": "A",
        "text": "A GUI framework with Buttons, Windows, TextBoxes, and Dialogs"
      },
      {
        "id": "B",
        "text": "An RPG game with Player, Enemy, Warrior, and Mage characters"
      },
      {
        "id": "C",
        "text": "High-throughput stateless data transformation pipelines (such as ETL math streaming or image pixel filtering)"
      },
      {
        "id": "D",
        "text": "An enterprise banking domain model with Accounts, Transactions, and Customers"
      }
    ],
    "correctOption": "C",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Architectural Trade-offs: When NOT to use OOP",
    "estimatedTime": "60 sec",
    "companyTags": [
      "TCS Digital",
      "Google Pattern"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Think about state. Does a mathematical pixel transformation need stateful objects with identity and lifecycle?",
      "Hint 2: Deep inheritance trees add indirection, cache misses, and object allocation overhead to raw stream processing."
    ],
    "explanation": {
      "step1": "OOP shines when domain entities have rich persistent state, identity, and complex behavioral rules (GUIs, games, business domains).",
      "step2": "Stateless data processing (ETL, signal processing, pure mathematical transformation) suffers from object allocation overhead and pointer indirection, making pure functional pipelines superior.",
      "summary": "Option C is correct: Stateless streaming pipelines are better served by functional/procedural paradigms.",
      "formula": "Stateful Entities -> OOP | Stateless Data Flow -> Functional / Stream Pipeline",
      "quickTip": "Do not force OOP onto pure mathematical transforms where state is absent."
    }
  },
  {
    "id": "oops_mcq_42",
    "topicId": "classes-and-objects",
    "title": "Object Memory Allocation: Stack vs Heap",
    "prompt": "In Java, when the line `Customer c = new Customer(\"John\");` executes inside a method, where are the reference variable `c` and the actual `Customer` object data allocated?",
    "options": [
      {
        "id": "A",
        "text": "Both `c` and the `Customer` object data are allocated in the Heap."
      },
      {
        "id": "B",
        "text": "Both `c` and the `Customer` object data are allocated on the Call Stack."
      },
      {
        "id": "C",
        "text": "Reference variable `c` is stored in the Call Stack frame, while the `Customer` object is allocated on the Heap."
      },
      {
        "id": "D",
        "text": "Reference variable `c` is stored in Metaspace, while the object is stored in CPU registers."
      }
    ],
    "correctOption": "C",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Memory Architecture: Stack vs Heap",
    "estimatedTime": "30 sec",
    "companyTags": [
      "TCS",
      "Wipro"
    ],
    "companyAttribution": "Company Pattern: TCS",
    "hints": [
      "Hint 1: Local variables inside a method live in stack frames.",
      "Hint 2: Dynamic instances created with `new` are always allocated on the managed heap."
    ],
    "explanation": {
      "step1": "Local reference variables inside method frames are allocated on the Stack.",
      "step2": "The `new` keyword dynamically allocates heap memory for the object fields and returns the address to the stack reference.",
      "summary": "Option C is correct: Reference in Stack, Instance Data in Heap.",
      "formula": "Stack (Reference Pointer) -> Points To -> Heap (Actual Object Instance)",
      "quickTip": "If the reference variable falls out of scope, the heap object remains until Garbage Collection."
    }
  },
  {
    "id": "oops_mcq_43",
    "topicId": "classes-and-objects",
    "title": "Reference Equality vs Instance Independence",
    "prompt": "Consider the following Java code snippet:\n```java\nclass Point {\n    int x, y;\n    Point(int x, int y) { this.x = x; this.y = y; }\n}\nPoint p1 = new Point(10, 20);\nPoint p2 = new Point(10, 20);\nPoint p3 = p1;\nSystem.out.println((p1 == p2) + \" \" + (p1 == p3));\n```\nWhat is printed to the console?",
    "options": [
      {
        "id": "A",
        "text": "true true"
      },
      {
        "id": "B",
        "text": "false true"
      },
      {
        "id": "C",
        "text": "false false"
      },
      {
        "id": "D",
        "text": "true false"
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Code Analysis: Reference Equality (==)",
    "estimatedTime": "45 sec",
    "companyTags": [
      "Infosys",
      "Cognizant"
    ],
    "companyAttribution": "Company Pattern: Infosys",
    "hints": [
      "Hint 1: The `==` operator on object references compares memory addresses, not the internal field values.",
      "Hint 2: `p1` and `p2` were created via separate `new` calls, so they have different heap addresses."
    ],
    "explanation": {
      "step1": "`p1` and `p2` point to distinct memory addresses on the heap, so `p1 == p2` evaluates to `false`.",
      "step2": "`p3 = p1` copies the reference address, so both point to the exact same heap object; `p1 == p3` is `true`.",
      "summary": "Option B is correct: `false true`.",
      "formula": "Separate new Calls = Distinct Heap Addresses (== is false)",
      "quickTip": "To compare internal field values of two distinct objects, override `.equals()`, do not use `==`."
    }
  },
  {
    "id": "oops_mcq_44",
    "topicId": "classes-and-objects",
    "title": "Instance State Isolation",
    "prompt": "Two independent objects `acc1` and `acc2` are instantiated from class `Account`. If client code executes `acc1.deposit(1000)`, how is `acc2.balance` affected?",
    "options": [
      {
        "id": "A",
        "text": "`acc2.balance` increases by 1000 because both share the same class blueprint."
      },
      {
        "id": "B",
        "text": "`acc2.balance` is completely unaffected because each object maintains its own independent instance variables."
      },
      {
        "id": "C",
        "text": "`acc2.balance` becomes undefined until synchronized."
      },
      {
        "id": "D",
        "text": "`acc2.balance` increases by 500 due to load balancing."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Instance State Isolation",
    "estimatedTime": "30 sec",
    "companyTags": [
      "Capgemini",
      "Wipro"
    ],
    "companyAttribution": "PathPilot Practice",
    "hints": [
      "Hint 1: Are instance fields shared or isolated per instance?",
      "Hint 2: Only `static` variables are shared across all instances."
    ],
    "explanation": {
      "step1": "Non-static instance variables are allocated separately for each object created in heap memory.",
      "step2": "Modifying the state of `acc1` alters only `acc1` heap storage; `acc2` remains entirely untouched.",
      "summary": "Option B is correct: Each instance has isolated state.",
      "formula": "Instance Variable = Distinct per Object Instance",
      "quickTip": "Unless explicitly marked `static`, instance fields never bleed across objects."
    }
  },
  {
    "id": "oops_mcq_45",
    "topicId": "classes-and-objects",
    "title": "Object Reachability and Garbage Collection",
    "prompt": "In managed OOP runtime environments (like Java JVM or .NET CLR), what happens to an object in heap memory when all reference variables that previously pointed to it are set to `null` or go out of scope?",
    "options": [
      {
        "id": "A",
        "text": "The object is immediately deleted from memory in real-time within 0 microseconds."
      },
      {
        "id": "B",
        "text": "The program crashes with a NullPointerException."
      },
      {
        "id": "C",
        "text": "The object becomes unreachable and eligible for garbage collection during subsequent GC passes."
      },
      {
        "id": "D",
        "text": "The object is moved to read-only persistent storage automatically."
      }
    ],
    "correctOption": "C",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Lifecycle & Memory Reclamation",
    "estimatedTime": "50 sec",
    "companyTags": [
      "TCS Digital",
      "Accenture"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Automatic memory management relies on GC root reachability analysis.",
      "Hint 2: An unreachable object cannot be used again, so GC reclaims its memory when needed."
    ],
    "explanation": {
      "step1": "When no active reference path from GC roots (like thread stacks or static references) reaches a heap object, it is designated as unreachable.",
      "step2": "It is not necessarily reclaimed instantly; it is marked as eligible for GC and cleared during a GC cycle.",
      "summary": "Option C is correct: Unreachable objects become eligible for GC.",
      "formula": "Zero Active References -> Unreachable -> GC Eligible",
      "quickTip": "Setting a reference to null does not delete the object immediately; it merely severs the reference link."
    }
  },
  {
    "id": "oops_mcq_46",
    "topicId": "encapsulation",
    "title": "Why Class Fields Should Not Be Public",
    "prompt": "Why is it considered a major design flaw in object-oriented programming to declare class fields `public`?",
    "options": [
      {
        "id": "A",
        "text": "Public fields consume twice as much heap memory as private fields."
      },
      {
        "id": "B",
        "text": "Public fields prevent methods from executing concurrently in multi-threaded code."
      },
      {
        "id": "C",
        "text": "Public fields allow external code to bypass validation rules and arbitrarily corrupt the internal invariants of the object."
      },
      {
        "id": "D",
        "text": "Public fields cannot be compiled by standard modern compilers."
      }
    ],
    "correctOption": "C",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Data Protection & Invariant Defense",
    "estimatedTime": "30 sec",
    "companyTags": [
      "Wipro",
      "TCS"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: What if someone sets `bankAccount.balance = -999999` directly?",
      "Hint 2: Public fields eliminate the possibility of validation or guard checks."
    ],
    "explanation": {
      "step1": "If fields are public, any caller can assign illegal or corrupted values directly without the class knowing.",
      "step2": "Encapsulating fields behind methods ensures business invariants (like balance >= 0) are always upheld.",
      "summary": "Option C is correct: Public fields destroy invariant protection.",
      "formula": "Public Fields = No Validation = Broken Object Integrity",
      "quickTip": "Keep fields private, expose intentions via controlled methods."
    }
  },
  {
    "id": "oops_mcq_47",
    "topicId": "encapsulation",
    "title": "Guarded Mutator Logic (Setter Invariant)",
    "prompt": "Consider the following encapsulated class:\n```java\npublic class Thermometer {\n    private double tempC = 0.0;\n    public void setTemp(double t) {\n        if (t >= -273.15) {\n            this.tempC = t;\n        }\n    }\n    public double getTemp() { return tempC; }\n}\n```\nIf client code executes `t.setTemp(-300.0);`, what will `t.getTemp()` return?",
    "options": [
      {
        "id": "A",
        "text": "-300.0"
      },
      {
        "id": "B",
        "text": "0.0"
      },
      {
        "id": "C",
        "text": "-273.15"
      },
      {
        "id": "D",
        "text": "Throws a NullPointerException"
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Code Analysis: Setter Guard Invariants",
    "estimatedTime": "35 sec",
    "companyTags": [
      "Infosys",
      "Cognizant"
    ],
    "companyAttribution": "Company Pattern: Infosys",
    "hints": [
      "Hint 1: Check the `if` condition inside `setTemp()`.",
      "Hint 2: Is -300.0 >= -273.15? If false, `tempC` is not updated."
    ],
    "explanation": {
      "step1": "The setter guards against temperatures below absolute zero (-273.15°C).",
      "step2": "Because -300.0 < -273.15, the condition evaluates to false and the field retains its default 0.0 value.",
      "summary": "Option B is correct: 0.0 is retained.",
      "formula": "Failed Invariant Check -> Mutation Rejected",
      "quickTip": "Setters act as security checkpoints for object state."
    }
  },
  {
    "id": "oops_mcq_48",
    "topicId": "encapsulation",
    "title": "Encapsulation with Domain Invariants",
    "prompt": "In a production banking application, a `TransferService` must transfer funds between accounts. Which design best demonstrates pure Encapsulation?",
    "options": [
      {
        "id": "A",
        "text": "TransferService directly reads and writes `source.balance` and `dest.balance` public fields."
      },
      {
        "id": "B",
        "text": "`Account` class exposes `debit(amount)` and `credit(amount)` methods that validate positive amounts and sufficient balance internally."
      },
      {
        "id": "C",
        "text": "All account balances are stored in a public static global HashMap accessed by all services."
      },
      {
        "id": "D",
        "text": "Accounts have no balance field; balances are calculated by looping over all historical database logs every time."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Domain Modeling: Encapsulated Business Rules",
    "estimatedTime": "45 sec",
    "companyTags": [
      "TCS",
      "Capgemini"
    ],
    "companyAttribution": "PathPilot Practice",
    "hints": [
      "Hint 1: Who should be responsible for protecting the balance of an account?",
      "Hint 2: An object should enforce its own business rules through domain methods."
    ],
    "explanation": {
      "step1": "Letting external services manipulate raw balances violates encapsulation and scatters validation logic.",
      "step2": "Providing `debit()` and `credit()` methods on `Account` encapsulates the balance rules inside the entity itself.",
      "summary": "Option B is correct: The Account class owns and validates its own state transitions.",
      "formula": "Tell, Don’t Ask: Ask the object to perform the action, don’t take its data and do it outside.",
      "quickTip": "Apply the \"Tell, Don’t Ask\" principle to keep business logic properly encapsulated."
    }
  },
  {
    "id": "oops_mcq_49",
    "topicId": "abstraction",
    "title": "Abstraction vs Encapsulation Core Distinction",
    "prompt": "What is the precise conceptual difference between Abstraction and Encapsulation?",
    "options": [
      {
        "id": "A",
        "text": "Abstraction hides internal implementation details and shows only the essential contract (\"what\"), while Encapsulation binds data with methods and restricts direct access (\"how data is protected\")."
      },
      {
        "id": "B",
        "text": "Abstraction is for primitive variables, while Encapsulation is for objects."
      },
      {
        "id": "C",
        "text": "Abstraction requires private variables, while Encapsulation requires abstract methods."
      },
      {
        "id": "D",
        "text": "There is no difference; they are exact synonyms used in different programming languages."
      }
    ],
    "correctOption": "A",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Core Distinction: Abstraction vs Encapsulation",
    "estimatedTime": "35 sec",
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Abstraction is about hiding complexity. Encapsulation is about hiding data.",
      "Hint 2: Think of a car dashboard (Abstraction) vs the hood locking the engine components inside (Encapsulation)."
    ],
    "explanation": {
      "step1": "Abstraction focuses on external interface: what does the object do, hiding underlying complexity.",
      "step2": "Encapsulation focuses on internal protection: bundling state and restricting unauthorized direct mutation.",
      "summary": "Option A is correct: Abstraction hides complexity; Encapsulation hides and protects internal state.",
      "formula": "Abstraction = Complexity Hiding | Encapsulation = Data Hiding & Bundling",
      "quickTip": "Car pedals abstract engine mechanics; the locked car hood encapsulates the battery and engine."
    }
  },
  {
    "id": "oops_mcq_50",
    "topicId": "abstraction",
    "title": "Scenario: Payment Gateway Abstraction",
    "prompt": "An online marketplace needs to accept payments via Stripe, PayPal, and Razorpay. The order checkout service should not care which vendor is used. How should this be designed using Abstraction?",
    "options": [
      {
        "id": "A",
        "text": "Write a monolithic function with `if (vendor == \"stripe\") ... else if (vendor == \"paypal\")` checks."
      },
      {
        "id": "B",
        "text": "Define a `PaymentProcessor` interface with a `processPayment(double amount)` method, which each vendor class implements."
      },
      {
        "id": "C",
        "text": "Force all vendors to share the same MySQL database table."
      },
      {
        "id": "D",
        "text": "Make all vendor API secret keys public static constants."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Design Pattern: Interface Abstraction",
    "estimatedTime": "40 sec",
    "companyTags": [
      "Cognizant",
      "Capgemini"
    ],
    "companyAttribution": "Company Pattern: Cognizant",
    "hints": [
      "Hint 1: The checkout service should depend on a contract, not on vendor implementation details.",
      "Hint 2: An interface provides the abstract contract that decouples caller from provider."
    ],
    "explanation": {
      "step1": "Hardcoding vendor checks creates high coupling and violates the Open/Closed Principle.",
      "step2": "Introducing a `PaymentProcessor` interface abstracts away vendor-specific API formats behind a unified contract.",
      "summary": "Option B is correct: Abstract contract enables pluggable vendor implementations.",
      "formula": "Client -> Interacts with Interface -> Implemented by Concrete Vendor Classes",
      "quickTip": "Program to an interface, not an implementation."
    }
  },
  {
    "id": "oops_mcq_51",
    "topicId": "abstraction",
    "title": "Standard Library Abstraction in Practice",
    "prompt": "When a Java programmer writes `Collections.sort(userList);`, which of the following best exemplifies Abstraction?",
    "options": [
      {
        "id": "A",
        "text": "The programmer must manually choose between HeapSort and BubbleSort based on CPU clock speed."
      },
      {
        "id": "B",
        "text": "The programmer invokes a clean method contract without needing to know whether TimSort, QuickSort, or MergeSort is executing internally."
      },
      {
        "id": "C",
        "text": "The list elements are converted to static global strings."
      },
      {
        "id": "D",
        "text": "The sorting code runs directly in the operating system kernel."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "API Abstraction in Standard Libraries",
    "estimatedTime": "30 sec",
    "companyTags": [
      "Wipro",
      "TCS"
    ],
    "companyAttribution": "PathPilot Practice",
    "hints": [
      "Hint 1: Does the caller need to understand pivot partitioning or run-merging to sort a list?",
      "Hint 2: Abstraction exposes the outcome (\"sort this list\") and hides the internal sorting algorithm."
    ],
    "explanation": {
      "step1": "The caller uses `Collections.sort()` without needing to implement or manage low-level sorting mechanics.",
      "step2": "The internal algorithm (TimSort in Java) can be optimized by library maintainers without breaking client code.",
      "summary": "Option B is correct: Client relies on essential contract, implementation details are abstract.",
      "formula": "Public API Contract -> Internal Engine Optimized Transparently",
      "quickTip": "Good abstraction means the caller cares about the WHAT, not the HOW."
    }
  },
  {
    "id": "oops_mcq_52",
    "topicId": "abstraction",
    "title": "The \"Leaky Abstraction\" Anti-Pattern",
    "prompt": "In software engineering, what is the definition of a \"Leaky Abstraction\"?",
    "options": [
      {
        "id": "A",
        "text": "An abstraction that leaks memory heap buffers to the operating system."
      },
      {
        "id": "B",
        "text": "An abstraction whose implementation details inadvertently expose themselves, forcing callers to understand underlying mechanics to handle edge cases."
      },
      {
        "id": "C",
        "text": "An interface that contains only private variables."
      },
      {
        "id": "D",
        "text": "A class that does not compile on 64-bit systems."
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "System Design: Leaky Abstraction Phenomenon",
    "estimatedTime": "55 sec",
    "companyTags": [
      "Google Pattern",
      "TCS Digital"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Think of Joel Spolsky’s Law of Leaky Abstractions.",
      "Hint 2: E.g., when an ORM (like Hibernate) abstracts SQL, but slow queries force you to tune underlying SQL indexes."
    ],
    "explanation": {
      "step1": "As coined by Joel Spolsky: \"All non-trivial abstractions, to some degree, are leaky.\"",
      "step2": "When underlying details (network timeouts, SQL execution plans, file lock errors) pierce through the high-level interface, the abstraction is leaky.",
      "summary": "Option B is correct: A leaky abstraction forces users to grapple with underlying mechanics.",
      "formula": "High-Level Interface Broken by Low-Level Realities = Leaky Abstraction",
      "quickTip": "No abstraction is 100% airtight; real-world edge cases (network, memory, disk) always leak."
    }
  },
  {
    "id": "oops_mcq_53",
    "topicId": "inheritance",
    "title": "Method Resolution through Polymorphic Reference",
    "prompt": "Analyze the following Java code:\n```java\nclass Vehicle {\n    void drive() { System.out.print(\"V \"); }\n}\nclass SportsCar extends Vehicle {\n    void drive() { System.out.print(\"SC \"); }\n    void turbo() { System.out.print(\"T \"); }\n}\nVehicle v = new SportsCar();\nv.drive();\n```\nWhat is printed to the console?",
    "options": [
      {
        "id": "A",
        "text": "V "
      },
      {
        "id": "B",
        "text": "SC "
      },
      {
        "id": "C",
        "text": "V SC "
      },
      {
        "id": "D",
        "text": "Compilation Error: Cannot assign SportsCar to Vehicle"
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Code Analysis: Dynamic Method Dispatch",
    "estimatedTime": "40 sec",
    "companyTags": [
      "TCS",
      "Cognizant"
    ],
    "companyAttribution": "Company Pattern: Cognizant",
    "hints": [
      "Hint 1: The reference type is `Vehicle`, but the actual runtime object is `SportsCar`.",
      "Hint 2: In Java, overridden instance methods are dispatched based on the runtime object, not the reference type."
    ],
    "explanation": {
      "step1": "Assigning a subclass instance to a superclass reference (`Vehicle v = new SportsCar()`) is valid upcasting.",
      "step2": "When an overridden method is called, Java uses Dynamic Method Dispatch to execute the subclass version (`SportsCar.drive()`).",
      "summary": "Option B is correct: SC is printed.",
      "formula": "Runtime Object Determines Overridden Instance Method Execution",
      "quickTip": "Reference type decides what methods are VISIBLE at compile time; runtime object decides WHICH version RUNS."
    }
  },
  {
    "id": "oops_mcq_54",
    "topicId": "inheritance",
    "title": "Inheritance Misuse & The Liskov Violation",
    "prompt": "A programmer models `Stack` by inheriting directly from `ArrayList` (`class Stack extends ArrayList`). Why is this widely considered an inheritance anti-pattern?",
    "options": [
      {
        "id": "A",
        "text": "Because ArrayList is marked final in Java and cannot be extended."
      },
      {
        "id": "B",
        "text": "Because Stack exposes arbitrary index methods like `add(index, elem)` and `remove(index)`, destroying the strict LIFO invariant of a Stack."
      },
      {
        "id": "C",
        "text": "Because ArrayList cannot store objects."
      },
      {
        "id": "D",
        "text": "Because inheritance increases the heap memory usage by 10x."
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Design Principle: Favor Composition over Inheritance",
    "estimatedTime": "55 sec",
    "companyTags": [
      "Infosys",
      "TCS Digital"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: A Stack should only allow push, pop, and peek.",
      "Hint 2: By inheriting from ArrayList, anyone can insert into the middle of the Stack, violating its fundamental contract."
    ],
    "explanation": {
      "step1": "Inheritance exposes the ENTIRE public interface of the parent class to consumers of the child class.",
      "step2": "A Stack is NOT an ArrayList; it merely uses an array-based list internally. Using composition (`private ArrayList list`) protects the LIFO invariant.",
      "summary": "Option B is correct: Inheritance leaks arbitrary list operations into the Stack API.",
      "formula": "IS-A Relationship False -> Use Composition (HAS-A), NOT Inheritance",
      "quickTip": "Java's own legacy `java.util.Stack extends Vector` is widely considered an architectural mistake for this exact reason!"
    }
  },
  {
    "id": "oops_mcq_55",
    "topicId": "constructors",
    "title": "Constructor Chaining with this()",
    "prompt": "Examine the following code:\n```java\nclass Widget {\n    int width, height;\n    Widget() {\n        this(50, 50);\n        System.out.print(\"Default \");\n    }\n    Widget(int w, int h) {\n        this.width = w;\n        this.height = h;\n        System.out.print(\"Custom \");\n    }\n}\nWidget w = new Widget();\n```\nWhat is the console output?",
    "options": [
      {
        "id": "A",
        "text": "Default Custom "
      },
      {
        "id": "B",
        "text": "Custom Default "
      },
      {
        "id": "C",
        "text": "Default "
      },
      {
        "id": "D",
        "text": "Compilation Error: Recursive constructor call"
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Code Analysis: Constructor Chaining",
    "estimatedTime": "40 sec",
    "companyTags": [
      "TCS",
      "Capgemini"
    ],
    "companyAttribution": "Company Pattern: TCS",
    "hints": [
      "Hint 1: When `this(50, 50)` executes, control immediately jumps to the two-argument constructor.",
      "Hint 2: Once the target constructor completes, control returns to finish the remaining lines of the no-arg constructor."
    ],
    "explanation": {
      "step1": "`new Widget()` enters `Widget()`, which immediately delegates to `Widget(50, 50)` via `this(...)`.",
      "step2": "The parameterized constructor sets the fields and prints \"Custom \". Control returns to `Widget()` to print \"Default \".",
      "summary": "Option B is correct: \"Custom Default \" is printed.",
      "formula": "Target Chained Constructor Executes First -> Original Finishes",
      "quickTip": "`this()` must always be the first line of a constructor when chaining."
    }
  },
  {
    "id": "oops_mcq_56",
    "topicId": "constructors",
    "title": "Missing No-Arg Constructor in Superclass",
    "prompt": "Consider the following inheritance hierarchy:\n```java\nclass Base {\n    Base(int val) {\n        System.out.print(\"Base: \" + val);\n    }\n}\nclass Derived extends Base {\n    Derived() {\n        System.out.print(\"Derived\");\n    }\n}\n```\nWhat happens when attempting to compile this code?",
    "options": [
      {
        "id": "A",
        "text": "Compiles successfully and prints \"Base: 0Derived\" when instantiated."
      },
      {
        "id": "B",
        "text": "Compilation Error: The compiler automatically inserts `super()`, but `Base` has no default no-argument constructor."
      },
      {
        "id": "C",
        "text": "Runtime crash with NoSuchMethodError."
      },
      {
        "id": "D",
        "text": "Compiles successfully, skipping the Base constructor entirely."
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Constructor Trap: Implicit super() Failure",
    "estimatedTime": "50 sec",
    "companyTags": [
      "Wipro",
      "Infosys"
    ],
    "companyAttribution": "Company Pattern: Wipro",
    "hints": [
      "Hint 1: When you provide a parameterized constructor, does the compiler still generate a default no-arg constructor?",
      "Hint 2: If a subclass constructor does not explicitly call `super(...)`, what does the compiler insert by default?"
    ],
    "explanation": {
      "step1": "Because `Base` defined `Base(int)`, the compiler did NOT generate a default `Base()` constructor.",
      "step2": "`Derived()` implicitly begins with `super()`, which fails to find `Base()`, triggering a compile-time error.",
      "summary": "Option B is correct: Compilation fails because `super()` finds no matching parameterless constructor.",
      "formula": "Explicit Constructor in Base = No Default Base() = Subclass Must Call super(val)",
      "quickTip": "If base class lacks a no-arg constructor, subclass MUST explicitly call `super(args)`."
    }
  },
  {
    "id": "oops_mcq_57",
    "topicId": "method-overloading",
    "title": "Valid Criteria for Method Overloading",
    "prompt": "Which of the following changes to a method signature is SUFFICIENT to create a valid overloaded method in Java/C++?",
    "options": [
      {
        "id": "A",
        "text": "Changing only the return type from `int` to `double`."
      },
      {
        "id": "B",
        "text": "Changing only the parameter names (e.g. `int x` to `int y`)."
      },
      {
        "id": "C",
        "text": "Changing the number, types, or order of parameters in the argument list."
      },
      {
        "id": "D",
        "text": "Changing only the access modifier from `public` to `private`."
      }
    ],
    "correctOption": "C",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Overloading Rules: Parameter Signatures",
    "estimatedTime": "30 sec",
    "companyTags": [
      "Infosys",
      "TCS"
    ],
    "companyAttribution": "Company Pattern: Infosys",
    "hints": [
      "Hint 1: Can the compiler distinguish `calc(5)` if two methods differ only by return type?",
      "Hint 2: Overloading requires distinct argument parameter lists."
    ],
    "explanation": {
      "step1": "The compiler resolves overloaded methods based strictly on the parameter list (type, count, order).",
      "step2": "Return types and access modifiers are NOT part of the method signature used for overload resolution.",
      "summary": "Option C is correct: Distinct parameter lists are required.",
      "formula": "Method Signature = Method Name + Parameter Types/Count/Order",
      "quickTip": "Return type alone can NEVER differentiate an overloaded method."
    }
  },
  {
    "id": "oops_mcq_58",
    "topicId": "method-overloading",
    "title": "Compile-Time Resolution of Overloaded Methods",
    "prompt": "Why is Method Overloading classified as \"Compile-Time\" (Static) Polymorphism?",
    "options": [
      {
        "id": "A",
        "text": "Because the compiler generates bytecode only during runtime execution."
      },
      {
        "id": "B",
        "text": "Because the exact method to execute is determined at compile time based on the static types of the arguments passed."
      },
      {
        "id": "C",
        "text": "Because overloaded methods can only be declared static."
      },
      {
        "id": "D",
        "text": "Because it requires dynamic dispatch tables in heap memory."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Static vs Dynamic Binding",
    "estimatedTime": "30 sec",
    "companyTags": [
      "Wipro",
      "Cognizant"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Does the JVM need to inspect the runtime object to know which overloaded method matches `int` vs `String`?",
      "Hint 2: The compiler inspects the argument types directly from source code during compilation."
    ],
    "explanation": {
      "step1": "The compiler inspects argument types at compile time and binds the call to a specific method descriptor.",
      "step2": "No runtime lookup (vtable) is needed, making execution very fast (early/static binding).",
      "summary": "Option B is correct: Overloading is resolved entirely by the compiler.",
      "formula": "Compile-Time Type Matching -> Early Binding",
      "quickTip": "Overloading = Static/Compile-time; Overriding = Dynamic/Runtime."
    }
  },
  {
    "id": "oops_mcq_59",
    "topicId": "method-overloading",
    "title": "Type Widening vs Autoboxing in Overloading",
    "prompt": "Consider the following code:\n```java\nclass Calculator {\n    void compute(int a) { System.out.print(\"int \"); }\n    void compute(double a) { System.out.print(\"double \"); }\n}\nCalculator c = new Calculator();\nc.compute(10);\nc.compute(10.5f);\n```\nWhat is printed to the console?",
    "options": [
      {
        "id": "A",
        "text": "int double "
      },
      {
        "id": "B",
        "text": "int float "
      },
      {
        "id": "C",
        "text": "double double "
      },
      {
        "id": "D",
        "text": "Compilation Error: Float cannot be converted to double"
      }
    ],
    "correctOption": "A",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Code Analysis: Primitive Type Widening",
    "estimatedTime": "35 sec",
    "companyTags": [
      "TCS",
      "Capgemini"
    ],
    "companyAttribution": "Company Pattern: TCS",
    "hints": [
      "Hint 1: Literal `10` is an int literal. Literal `10.5f` is a float literal.",
      "Hint 2: There is no `compute(float)`. Can a `float` be widened to `double` automatically?"
    ],
    "explanation": {
      "step1": "`10` matches the exact `compute(int)` signature.",
      "step2": "`10.5f` is a `float`. With no exact float overload, primitive type widening automatically promotes `float` to `double`.",
      "summary": "Option A is correct: \"int double \" is printed.",
      "formula": "Exact Match First -> Primitive Widening Next (float -> double)",
      "quickTip": "Java prefers primitive widening over autoboxing or varargs."
    }
  },
  {
    "id": "oops_mcq_60",
    "topicId": "method-overloading",
    "title": "Most Specific Type Resolution with null",
    "prompt": "Analyze the following tricky interview question:\n```java\npublic class OverloadTrap {\n    void test(Object o) { System.out.print(\"Object \"); }\n    void test(String s) { System.out.print(\"String \"); }\n    public static void main(String[] args) {\n        new OverloadTrap().test(null);\n    }\n}\n```\nWhat is the outcome when this program runs?",
    "options": [
      {
        "id": "A",
        "text": "Object "
      },
      {
        "id": "B",
        "text": "String "
      },
      {
        "id": "C",
        "text": "Compilation Error: Ambiguous method call"
      },
      {
        "id": "D",
        "text": "Throws NullPointerException at runtime"
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Tricky Interview Pattern: Most Specific Overload",
    "estimatedTime": "50 sec",
    "companyTags": [
      "TCS Digital",
      "Infosys"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Both `Object` and `String` can accept a `null` reference.",
      "Hint 2: Java compiler picks the \"most specific\" type in the class inheritance hierarchy."
    ],
    "explanation": {
      "step1": "`null` is a valid literal for any reference type, so both `test(Object)` and `test(String)` are candidates.",
      "step2": "Because `String` is a subclass of `Object`, `String` is more specific. The compiler selects the most specific type without ambiguity.",
      "summary": "Option B is correct: \"String \" is printed.",
      "formula": "Candidate Overloads -> Select Subtype (Most Specific Type)",
      "quickTip": "If two candidate overloads are in unrelated hierarchies (e.g. String and Integer), passing null causes a compile error."
    }
  },
  {
    "id": "oops_mcq_61",
    "topicId": "method-overriding",
    "title": "Purpose of Method Overriding",
    "prompt": "What is the primary motivation for overriding a method in an object-oriented subclass?",
    "options": [
      {
        "id": "A",
        "text": "To delete the method from the parent class completely."
      },
      {
        "id": "B",
        "text": "To enable a subclass to provide its own specialized implementation of a method defined in the superclass."
      },
      {
        "id": "C",
        "text": "To convert an instance method into a static utility function."
      },
      {
        "id": "D",
        "text": "To reduce the execution speed for benchmarking."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Core Concept: Method Overriding",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Wipro",
      "TCS"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: A parent class might define a generic `draw()` or `calculatePay()`.",
      "Hint 2: A child class provides the specific behavior that matches its specialized role."
    ],
    "explanation": {
      "step1": "Subclasses inherit general behavior from parent classes, but often require specialized business logic.",
      "step2": "Overriding allows the child class to substitute the parent logic with its own while retaining the same method signature.",
      "summary": "Option B is correct: Specialized implementation in subclass.",
      "formula": "Same Method Name + Same Arguments = Child Replaces Parent Implementation",
      "quickTip": "Overriding gives specific behavior to an inherited general capability."
    }
  },
  {
    "id": "oops_mcq_62",
    "topicId": "method-overriding",
    "title": "The @Override Annotation Safety Guarantee",
    "prompt": "Why is it strongly recommended to annotate overriding methods with `@Override` in Java?",
    "options": [
      {
        "id": "A",
        "text": "Without `@Override`, the JVM refuses to execute any bytecode."
      },
      {
        "id": "B",
        "text": "It instructs the compiler to verify that a superclass method with the exact signature exists, preventing silent bugs from typos."
      },
      {
        "id": "C",
        "text": "It automatically makes the method thread-safe."
      },
      {
        "id": "D",
        "text": "It forces the method to run 50% faster by disabling security checks."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Compiler Safety: @Override Annotation",
    "estimatedTime": "30 sec",
    "companyTags": [
      "Cognizant",
      "Infosys"
    ],
    "companyAttribution": "PathPilot Practice",
    "hints": [
      "Hint 1: What happens if you accidentally type `hashcode()` instead of `hashCode()`?",
      "Hint 2: The compiler flags an error if `@Override` is present and no matching super method exists."
    ],
    "explanation": {
      "step1": "If you accidentally misspell the method name or mismatch parameter types, you accidentally overload instead of override.",
      "step2": "`@Override` causes the compiler to fail with an error if it does not find a corresponding superclass method.",
      "summary": "Option B is correct: It turns subtle runtime bugs into clear compile-time errors.",
      "formula": "@Override = Compiler Check for Signature Match",
      "quickTip": "Always annotate overridden methods with @Override in production code."
    }
  },
  {
    "id": "oops_mcq_63",
    "topicId": "method-overriding",
    "title": "Covariant Return Types in Java",
    "prompt": "In Java 5 and later, if a superclass defines `public Number getMetric()`, which of the following is a valid return type for an overriding method in a subclass?",
    "options": [
      {
        "id": "A",
        "text": "`Object`"
      },
      {
        "id": "B",
        "text": "`String`"
      },
      {
        "id": "C",
        "text": "`Integer`"
      },
      {
        "id": "D",
        "text": "`void`"
      }
    ],
    "correctOption": "C",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Covariant Return Types in Subclasses",
    "estimatedTime": "40 sec",
    "companyTags": [
      "TCS",
      "Capgemini"
    ],
    "companyAttribution": "Company Pattern: TCS",
    "hints": [
      "Hint 1: Can the overriding method return a narrower (more specific) subtype of the parent return type?",
      "Hint 2: `Integer` extends `Number`. Is `Integer` a valid covariant return type?"
    ],
    "explanation": {
      "step1": "Java supports Covariant Return Types: an overriding method may return a subtype of the return type declared in the parent method.",
      "step2": "Because `Integer` is a subtype of `Number`, declaring `public Integer getMetric()` in the subclass is completely valid.",
      "summary": "Option C is correct: Integer is a valid covariant return type for Number.",
      "formula": "Subclass Return Type <= Superclass Return Type (Narrower / Covariant)",
      "quickTip": "You can narrow the return type (covariant), but you can NEVER widen it (e.g. Object would be illegal)."
    }
  },
  {
    "id": "oops_mcq_64",
    "topicId": "method-overriding",
    "title": "Static Method Hiding vs Overriding",
    "prompt": "Look at the following code:\n```java\nclass SuperClass {\n    static void printMessage() { System.out.print(\"Super \"); }\n}\nclass SubClass extends SuperClass {\n    static void printMessage() { System.out.print(\"Sub \"); }\n}\nSuperClass obj = new SubClass();\nobj.printMessage();\n```\nWhat is output to the console?",
    "options": [
      {
        "id": "A",
        "text": "Super "
      },
      {
        "id": "B",
        "text": "Sub "
      },
      {
        "id": "C",
        "text": "Super Sub "
      },
      {
        "id": "D",
        "text": "Compilation Error: Static methods cannot have matching signatures"
      }
    ],
    "correctOption": "A",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Classic Interview Trap: Method Hiding vs Overriding",
    "estimatedTime": "45 sec",
    "companyTags": [
      "TCS Digital",
      "Infosys",
      "Cognizant"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Are static methods dispatched dynamically at runtime via vtable?",
      "Hint 2: Static methods belong to the class, not the instance. They are bound at compile time based on the reference type."
    ],
    "explanation": {
      "step1": "Static methods CANNOT be overridden; they are merely hidden (Method Hiding).",
      "step2": "Because `obj` is declared as type `SuperClass`, the call is resolved at compile time to `SuperClass.printMessage()`.",
      "summary": "Option A is correct: \"Super \" is printed.",
      "formula": "Static Methods = Compile-Time Binding (Reference Type Wins)",
      "quickTip": "Never call static methods via instance references; use `SuperClass.printMessage()` directly."
    }
  },
  {
    "id": "oops_mcq_65",
    "topicId": "interfaces",
    "title": "Interface as a Behavioral Contract",
    "prompt": "In object-oriented architecture, what does an Interface fundamentally represent?",
    "options": [
      {
        "id": "A",
        "text": "A physical memory buffer for caching database rows."
      },
      {
        "id": "B",
        "text": "A formal contract defining a set of capabilities that implementing classes agree to provide, completely detached from internal implementation."
      },
      {
        "id": "C",
        "text": "A class that must contain only private attributes."
      },
      {
        "id": "D",
        "text": "A wrapper around operating system sockets."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Core Concept: Interface as Contract",
    "estimatedTime": "30 sec",
    "companyTags": [
      "Wipro",
      "TCS"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Think of `Comparable` or `Runnable`. What do they promise?",
      "Hint 2: An interface specifies what a class CAN DO, not what it IS."
    ],
    "explanation": {
      "step1": "An interface establishes a clean boundary between service consumers and providers.",
      "step2": "Any class implementing the interface guarantees it satisfies that contract, enabling true plug-and-play architecture.",
      "summary": "Option B is correct: An interface is a pure behavioral contract.",
      "formula": "Interface = Public Specification of Capabilities",
      "quickTip": "Classes define structure and state; interfaces define capability contracts."
    }
  },
  {
    "id": "oops_mcq_66",
    "topicId": "interfaces",
    "title": "Implicit Modifiers for Interface Variables",
    "prompt": "In Java, when a variable is declared inside an interface without any explicit modifiers (e.g. `int MAX_SPEED = 120;`), what are its implicit modifiers?",
    "options": [
      {
        "id": "A",
        "text": "`private volatile`"
      },
      {
        "id": "B",
        "text": "`protected abstract`"
      },
      {
        "id": "C",
        "text": "`public static final`"
      },
      {
        "id": "D",
        "text": "`transient native`"
      }
    ],
    "correctOption": "C",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Interface Constants Specification",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Infosys",
      "Capgemini"
    ],
    "companyAttribution": "Company Pattern: Infosys",
    "hints": [
      "Hint 1: Can interfaces hold mutable instance state for objects?",
      "Hint 2: Any variable declared in an interface is a constant."
    ],
    "explanation": {
      "step1": "Interfaces cannot maintain mutable instance state.",
      "step2": "All fields declared in a Java interface are implicitly `public` (accessible anywhere), `static` (class-level), and `final` (constant).",
      "summary": "Option C is correct: All interface fields are public static final.",
      "formula": "Interface Field = Implicitly public static final Constant",
      "quickTip": "You cannot create an instance variable in an interface; they are always constants."
    }
  },
  {
    "id": "oops_mcq_67",
    "topicId": "interfaces",
    "title": "Resolving Conflicting Default Methods (Diamond Problem)",
    "prompt": "In Java 8+, if class `Manager` implements interfaces `A` and `B`, and both interfaces provide an identical default method `default void log()`, how is the collision resolved?",
    "options": [
      {
        "id": "A",
        "text": "The JVM picks interface `A` because it was listed first in the `implements` clause."
      },
      {
        "id": "B",
        "text": "Class `Manager` fails to compile unless it explicitly overrides `log()` to resolve the ambiguity."
      },
      {
        "id": "C",
        "text": "The program crashes at runtime with a NoSuchMethodException."
      },
      {
        "id": "D",
        "text": "Both default methods execute sequentially in alphabetical order."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Default Method Collision Resolution",
    "estimatedTime": "45 sec",
    "companyTags": [
      "TCS",
      "Cognizant"
    ],
    "companyAttribution": "Company Pattern: TCS",
    "hints": [
      "Hint 1: The compiler refuses to guess which default implementation the developer wanted.",
      "Hint 2: The implementing class must disambiguate the collision by providing its own implementation (e.g. calling `A.super.log()`)."
    ],
    "explanation": {
      "step1": "When two unrelated interfaces provide conflicting default method implementations, Java prevents ambiguous dispatch.",
      "step2": "The class will not compile until the programmer explicitly overrides the method and either provides custom code or delegates (e.g. `A.super.log()`).",
      "summary": "Option B is correct: Compiler requires explicit override to resolve conflict.",
      "formula": "Duplicate Default Methods = Mandatory Disambiguation via Override",
      "quickTip": "Remember the rule: Class implementations beat interface defaults; conflicting sibling defaults require explicit resolution."
    }
  },
  {
    "id": "oops_mcq_68",
    "topicId": "abstract-classes",
    "title": "Characteristics of Abstract Classes",
    "prompt": "Which of the following statements is TRUE regarding Abstract Classes in OOP?",
    "options": [
      {
        "id": "A",
        "text": "An abstract class can be directly instantiated with `new AbstractClass()`."
      },
      {
        "id": "B",
        "text": "An abstract class cannot be instantiated directly, but it can contain constructors called by subclasses."
      },
      {
        "id": "C",
        "text": "An abstract class must contain only abstract methods and zero concrete methods."
      },
      {
        "id": "D",
        "text": "Abstract classes cannot inherit from other classes."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Abstract Class Characteristics",
    "estimatedTime": "30 sec",
    "companyTags": [
      "TCS",
      "Wipro"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Can you instantiate a half-implemented class directly?",
      "Hint 2: When a child constructor runs, does it call the parent abstract class constructor via `super()`?"
    ],
    "explanation": {
      "step1": "Abstract classes are incomplete specifications and cannot be directly instantiated.",
      "step2": "However, they have constructors that are called when concrete subclasses are instantiated to initialize base state.",
      "summary": "Option B is correct: Cannot instantiate directly, but constructors exist for subclass chaining.",
      "formula": "Abstract Class = No Direct Instantiation + Can Have Base Constructors & State",
      "quickTip": "Abstract classes provide partial implementations for concrete subclasses to complete."
    }
  },
  {
    "id": "oops_mcq_69",
    "topicId": "abstract-classes",
    "title": "What is an Abstract Method?",
    "prompt": "What constitutes an Abstract Method in object-oriented programming?",
    "options": [
      {
        "id": "A",
        "text": "A method with an empty body `{}` that does nothing."
      },
      {
        "id": "B",
        "text": "A method declared without an implementation (body) that must be implemented by concrete subclasses."
      },
      {
        "id": "C",
        "text": "A method that can only be invoked by background daemon threads."
      },
      {
        "id": "D",
        "text": "A method that takes no arguments and returns `void`."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Abstract Method Definition",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Infosys",
      "Capgemini"
    ],
    "companyAttribution": "PathPilot Practice",
    "hints": [
      "Hint 1: In Java: `abstract void draw();` (ends in a semicolon, no curly braces).",
      "Hint 2: It is a contractual placeholder forcing subclasses to implement their own behavior."
    ],
    "explanation": {
      "step1": "An abstract method declares a signature without any code body.",
      "step2": "Any concrete subclass extending the abstract class is obligated to provide an implementation for that method.",
      "summary": "Option B is correct: Abstract methods declare the signature but leave implementation to subclasses.",
      "formula": "abstract returnType methodName(); (No implementation body)",
      "quickTip": "An empty body `{}` is NOT abstract; an abstract method has no curly braces at all."
    }
  },
  {
    "id": "oops_mcq_70",
    "topicId": "abstract-classes",
    "title": "Choosing Between Abstract Class and Interface",
    "prompt": "When should an object-oriented architect choose an Abstract Class instead of an Interface?",
    "options": [
      {
        "id": "A",
        "text": "When the classes are completely unrelated and only need to share a generic capability."
      },
      {
        "id": "B",
        "text": "When closely related classes need to share non-static instance state (fields) and common base constructor initialization logic in an IS-A hierarchy."
      },
      {
        "id": "C",
        "text": "When multiple inheritance of state is required."
      },
      {
        "id": "D",
        "text": "When the code must run in an embedded browser."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Design Decision: Abstract Class vs Interface",
    "estimatedTime": "45 sec",
    "companyTags": [
      "TCS",
      "Cognizant"
    ],
    "companyAttribution": "Company Pattern: TCS",
    "hints": [
      "Hint 1: Interfaces cannot hold non-static instance fields.",
      "Hint 2: Abstract classes represent genuine base types with shared internal state."
    ],
    "explanation": {
      "step1": "Interfaces define contracts without state. They are ideal for disparate classes sharing common capabilities (e.g. `Serializable`).",
      "step2": "Abstract classes provide base state and partial implementation for closely related classes in an IS-A hierarchy (e.g. `Vehicle` with `fuelCapacity`).",
      "summary": "Option B is correct: Shared state and base constructor logic require an Abstract Class.",
      "formula": "Shared Instance State + True IS-A Hierarchy = Abstract Class",
      "quickTip": "Use interfaces for capabilities (CAN-DO); use abstract classes for core identity (IS-A)."
    }
  },
  {
    "id": "oops_mcq_71",
    "topicId": "abstract-classes",
    "title": "Illegal Modifier Combinations on Abstract Methods",
    "prompt": "Which of the following modifier combinations on a method will trigger a compile-time error in Java?",
    "options": [
      {
        "id": "A",
        "text": "`public abstract void render();`"
      },
      {
        "id": "B",
        "text": "`protected abstract void render();`"
      },
      {
        "id": "C",
        "text": "`private abstract void render();`"
      },
      {
        "id": "D",
        "text": "`abstract void render();` (default/package-private)"
      }
    ],
    "correctOption": "C",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Compiler Trap: Illegal Abstract Modifiers",
    "estimatedTime": "45 sec",
    "companyTags": [
      "Infosys",
      "Wipro"
    ],
    "companyAttribution": "Company Pattern: Infosys",
    "hints": [
      "Hint 1: An abstract method MUST be overridden by a subclass.",
      "Hint 2: If a method is `private`, can a subclass see or override it?"
    ],
    "explanation": {
      "step1": "`private` methods are invisible to subclasses and cannot be overridden.",
      "step2": "An `abstract` method exists solely to be overridden. Combining `private` and `abstract` is a direct logical contradiction that the compiler rejects.",
      "summary": "Option C is correct: `private abstract` is illegal in Java.",
      "formula": "abstract (Must Override) + private (Cannot Override) = Compilation Error",
      "quickTip": "Similarly, `final abstract` and `static abstract` are strictly illegal for the exact same reason."
    }
  },
  {
    "id": "oops_mcq_72",
    "topicId": "access-modifiers",
    "title": "Default (Package-Private) Scope in Java",
    "prompt": "In Java, if a class member is declared without any access modifier (e.g. `int score = 100;`), what is its accessibility scope?",
    "options": [
      {
        "id": "A",
        "text": "Accessible to all classes across all packages (same as public)."
      },
      {
        "id": "B",
        "text": "Accessible only within the declaring class (same as private)."
      },
      {
        "id": "C",
        "text": "Accessible to any class within the same package, but inaccessible to classes in other packages (even subclasses)."
      },
      {
        "id": "D",
        "text": "Accessible only on Tuesdays and Thursdays."
      }
    ],
    "correctOption": "C",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Access Modifier Scope: Package-Private",
    "estimatedTime": "35 sec",
    "companyTags": [
      "TCS",
      "Capgemini"
    ],
    "companyAttribution": "Company Pattern: TCS",
    "hints": [
      "Hint 1: Java's default access is sometimes called package-private.",
      "Hint 2: Subclasses outside the package cannot access default members."
    ],
    "explanation": {
      "step1": "When no modifier is specified, Java defaults to package-private access.",
      "step2": "Only code residing within the identical package directory can access the member.",
      "summary": "Option C is correct: Package-private scope allows access only within the same package.",
      "formula": "No Modifier = Package-Private (Same Package Only)",
      "quickTip": "Remember the 4 levels in order of increasing visibility: private -> default -> protected -> public."
    }
  },
  {
    "id": "oops_mcq_73",
    "topicId": "access-modifiers",
    "title": "Protected Access for Subclasses in Different Packages",
    "prompt": "Package `com.core` has class `Parent` with a `protected void init()` method. Class `Child` in package `com.client` extends `Parent`. Can an instance of `Child` invoke `init()`?",
    "options": [
      {
        "id": "A",
        "text": "No, because `protected` members can never cross package boundaries."
      },
      {
        "id": "B",
        "text": "Yes, because `protected` members are accessible to subclasses even if they reside in different packages."
      },
      {
        "id": "C",
        "text": "Only if `Child` makes a JNI native system call."
      },
      {
        "id": "D",
        "text": "No, because only `public` methods can be inherited."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Protected Scope Across Packages",
    "estimatedTime": "40 sec",
    "companyTags": [
      "Infosys",
      "Cognizant"
    ],
    "companyAttribution": "Company Pattern: Infosys",
    "hints": [
      "Hint 1: What is the unique purpose of the `protected` modifier compared to package-private?",
      "Hint 2: `protected` grants access to same-package classes PLUS subclasses anywhere in the project."
    ],
    "explanation": {
      "step1": "`protected` gives access to any class in the same package, plus all subclasses regardless of package.",
      "step2": "Therefore, `Child` in `com.client` inherits and can call `init()` via its subclass inheritance chain.",
      "summary": "Option B is correct: Protected crosses packages through inheritance.",
      "formula": "Protected = Same Package + Subclasses in ANY Package",
      "quickTip": "`protected` was invented specifically to support inheritance across package boundaries."
    }
  },
  {
    "id": "oops_mcq_74",
    "topicId": "access-modifiers",
    "title": "Valid Modifiers for Top-Level Outer Classes",
    "prompt": "In standard Java, which access modifiers are permitted for top-level (outer) classes declared in a `.java` file?",
    "options": [
      {
        "id": "A",
        "text": "`public`, `private`, `protected`, and default"
      },
      {
        "id": "B",
        "text": "Only `public` and default (package-private)"
      },
      {
        "id": "C",
        "text": "Only `public` and `private`"
      },
      {
        "id": "D",
        "text": "Only `protected` and `private`"
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Outer Class Scope Restrictions",
    "estimatedTime": "45 sec",
    "companyTags": [
      "TCS Digital",
      "Wipro"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Can you declare `private class Student { ... }` as an outer class in a file?",
      "Hint 2: An outer class cannot be private or protected; only nested/inner classes can."
    ],
    "explanation": {
      "step1": "Top-level classes exist at the file/package level. A private top-level class would be invisible to everyone, making it useless.",
      "step2": "Hence, Java strictly permits only `public` and default (package-private) for top-level outer classes.",
      "summary": "Option B is correct: Only public and default are allowed for outer classes.",
      "formula": "Top-Level Outer Class = public OR package-private ONLY",
      "quickTip": "Inner (nested) classes can have all 4 modifiers, but outer classes can only have 2."
    }
  },
  {
    "id": "oops_mcq_75",
    "topicId": "static-members",
    "title": "Why Utility Methods Are Declared Static",
    "prompt": "Why are standard library methods such as `Math.sqrt()` and `Collections.sort()` declared `static`?",
    "options": [
      {
        "id": "A",
        "text": "Because static methods execute 100x faster by disabling CPU caching."
      },
      {
        "id": "B",
        "text": "Because they perform operations strictly on inputs provided without needing or mutating any instance state."
      },
      {
        "id": "C",
        "text": "Because they cannot accept primitive arguments."
      },
      {
        "id": "D",
        "text": "Because static methods can only be invoked by root administrators."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Stateless Utility Methods",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Wipro",
      "TCS"
    ],
    "companyAttribution": "PathPilot Practice",
    "hints": [
      "Hint 1: Do you need to create `new Math()` to calculate the square root of 25?",
      "Hint 2: When an operation depends only on its arguments, requiring an object instance is unnecessary ceremony."
    ],
    "explanation": {
      "step1": "`Math.sqrt(x)` requires no internal instance memory or state; it simply computes a mathematical function on `x`.",
      "step2": "Marking it `static` allows callers to invoke `Math.sqrt(x)` directly without instantiating an unnecessary object.",
      "summary": "Option B is correct: Pure utility operations do not need instance state.",
      "formula": "Pure Function on Arguments = Static Method",
      "quickTip": "If a method doesn’t use any instance variables, it can usually be made static."
    }
  },
  {
    "id": "oops_mcq_76",
    "topicId": "static-members",
    "title": "Static and Instance Initialization Order",
    "prompt": "Analyze the following code snippet:\n```java\nclass Tracker {\n    static int count = 0;\n    static { count += 5; }\n    { count += 2; }\n    Tracker() { count += 1; }\n}\nTracker t1 = new Tracker();\nTracker t2 = new Tracker();\nSystem.out.println(Tracker.count);\n```\nWhat is printed to the console?",
    "options": [
      {
        "id": "A",
        "text": "8"
      },
      {
        "id": "B",
        "text": "11"
      },
      {
        "id": "C",
        "text": "16"
      },
      {
        "id": "D",
        "text": "6"
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Code Analysis: Static vs Instance Init Order",
    "estimatedTime": "45 sec",
    "companyTags": [
      "TCS",
      "Infosys"
    ],
    "companyAttribution": "Company Pattern: TCS",
    "hints": [
      "Hint 1: How many times does a `static` block execute across the program lifecycle?",
      "Hint 2: How many times do instance initialization blocks `{ ... }` and constructors execute?"
    ],
    "explanation": {
      "step1": "The `static` block runs ONCE when the class is loaded into memory: `count` becomes 5.",
      "step2": "For `t1`, instance block (+2) and constructor (+1) run: count becomes 5 + 2 + 1 = 8.",
      "step3": "For `t2`, instance block (+2) and constructor (+1) run again: count becomes 8 + 2 + 1 = 11.",
      "summary": "Option B is correct: 11 is printed.",
      "formula": "Static Block (Runs Once on Load) + Instance Blocks/Constructor (Runs per Object)",
      "quickTip": "Static initializer runs once per class loader; instance blocks run on every `new`."
    }
  },
  {
    "id": "oops_mcq_77",
    "topicId": "static-members",
    "title": "Static Mutable State and Thread-Safety Hazards",
    "prompt": "In high-concurrency enterprise web applications, why is the use of `static` mutable fields (such as a static counter or static cache Map) considered hazardous unless synchronized?",
    "options": [
      {
        "id": "A",
        "text": "Because static variables consume the entire GPU video memory."
      },
      {
        "id": "B",
        "text": "Because static fields are shared across all concurrent request threads in the classloader, causing race conditions and dirty reads without synchronization."
      },
      {
        "id": "C",
        "text": "Because static variables are automatically destroyed after every HTTP response."
      },
      {
        "id": "D",
        "text": "Because Java forces all static methods to run on a single CPU core."
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Concurrency Hazard: Shared Static State",
    "estimatedTime": "50 sec",
    "companyTags": [
      "TCS Digital",
      "Cognizant"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: In web servers (like Tomcat/Spring), multiple threads execute simultaneous requests.",
      "Hint 2: If all threads read and write the exact same shared class variable without locks, race conditions occur."
    ],
    "explanation": {
      "step1": "Static variables reside in the class metadata space and are globally shared across all threads executing in that JVM.",
      "step2": "Without synchronization primitives (`AtomicInteger`, `ConcurrentHashMap`, locks), concurrent mutations cause data corruption and lost updates.",
      "summary": "Option B is correct: Shared static mutable state causes concurrency bugs.",
      "formula": "Static Mutable Field + Multiple Threads = Race Conditions without Locks",
      "quickTip": "Prefer immutable static constants (`static final`) or thread-safe atomic data structures."
    }
  },
  {
    "id": "oops_mcq_78",
    "topicId": "this-self",
    "title": "Core Definition of the this Keyword",
    "prompt": "In languages like Java, C++, and C#, what does the `this` keyword fundamentally represent?",
    "options": [
      {
        "id": "A",
        "text": "A pointer to the parent superclass in the hierarchy."
      },
      {
        "id": "B",
        "text": "An explicit reference to the current object instance whose method or constructor is currently executing."
      },
      {
        "id": "C",
        "text": "A reference to the compiled `.class` file on disk."
      },
      {
        "id": "D",
        "text": "A keyword used to free memory manually."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Core Concept: this Reference",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Wipro",
      "TCS"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: When you say `this.name`, whose name are you referring to?",
      "Hint 2: It is the implicit receiver object that was called (e.g. `obj.method()`)."
    ],
    "explanation": {
      "step1": "`this` is an implicit parameter passed to every non-static method and constructor.",
      "step2": "It holds the heap memory address of the specific object on which the method was called.",
      "summary": "Option B is correct: Reference to the current instance.",
      "formula": "this = Current Active Object Instance",
      "quickTip": "Static methods do not have a `this` reference because they belong to the class, not an object."
    }
  },
  {
    "id": "oops_mcq_79",
    "topicId": "this-self",
    "title": "Python self vs Java this",
    "prompt": "How does Python handle instance references (`self`) compared to Java (`this`) in method declarations?",
    "options": [
      {
        "id": "A",
        "text": "Python has no instance reference mechanism at all."
      },
      {
        "id": "B",
        "text": "In Python, `self` must be explicitly declared as the first parameter of every instance method, whereas in Java, `this` is passed implicitly by the compiler."
      },
      {
        "id": "C",
        "text": "Python `self` is a global static keyword identical to C++ namespace."
      },
      {
        "id": "D",
        "text": "Java `this` can only be used in main(), whereas Python `self` cannot."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Multi-Language Comparison: self vs this",
    "estimatedTime": "30 sec",
    "companyTags": [
      "Infosys",
      "Capgemini"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Look at Python syntax: `def drive(self, speed): ...`",
      "Hint 2: In Java you write `void drive(int speed)` and `this` is implicitly available."
    ],
    "explanation": {
      "step1": "In Python, the first argument of an instance method is explicitly received as `self` by convention.",
      "step2": "When calling `car.drive(60)`, Python translates it to `Car.drive(car, 60)` behind the scenes.",
      "summary": "Option B is correct: Python requires explicit self parameter, Java passes this implicitly.",
      "formula": "Python: def method(self, arg) | Java: void method(Type arg) [implicit this]",
      "quickTip": "Explicit is better than implicit in Python's philosophy, hence explicit `self`."
    }
  },
  {
    "id": "oops_mcq_80",
    "topicId": "this-self",
    "title": "Returning this for Method Chaining (Builder Pattern)",
    "prompt": "Consider the following class implementation:\n```java\npublic class RequestBuilder {\n    private String url;\n    private int timeout;\n    public RequestBuilder setUrl(String u) { this.url = u; return this; }\n    public RequestBuilder setTimeout(int t) { this.timeout = t; return this; }\n}\n```\nWhat software design capability is enabled by returning `this` from these mutator methods?",
    "options": [
      {
        "id": "A",
        "text": "Automatic memory deallocation on return."
      },
      {
        "id": "B",
        "text": "Method Chaining (Fluent Interface pattern), enabling calls like `new RequestBuilder().setUrl(\"api\").setTimeout(5000);`."
      },
      {
        "id": "C",
        "text": "Converting the object into a multi-threaded daemon thread."
      },
      {
        "id": "D",
        "text": "Preventing the class from ever being extended."
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Fluent Interface & Builder Pattern",
    "estimatedTime": "45 sec",
    "companyTags": [
      "TCS Digital",
      "Infosys"
    ],
    "companyAttribution": "Company Pattern: Infosys",
    "hints": [
      "Hint 1: If `setUrl()` returns the same object (`this`), what can you call immediately after it?",
      "Hint 2: You can chain the next method immediately: `builder.setUrl(...).setTimeout(...)`."
    ],
    "explanation": {
      "step1": "Returning `this` hands the original instance reference back to the caller.",
      "step2": "This enables fluent method cascading (e.g. `StringBuilder.append(\"a\").append(\"b\")` or Builder patterns).",
      "summary": "Option B is correct: Method chaining / Fluent Interface.",
      "formula": "return this -> Enables Fluent Method Chaining (a.b().c().d())",
      "quickTip": "Modern libraries (Stream API, StringBuilder, Mockito) heavily use `return this` for fluent readability."
    }
  },
  {
    "id": "oops_mcq_81",
    "topicId": "super-keyword",
    "title": "Primary Purpose of the super Keyword",
    "prompt": "What is the primary role of the `super` keyword in object-oriented programming?",
    "options": [
      {
        "id": "A",
        "text": "To elevate the current class permissions to operating system root."
      },
      {
        "id": "B",
        "text": "To refer to the immediate superclass members (methods, constructors, or fields) from within a subclass."
      },
      {
        "id": "C",
        "text": "To restart the program from `main()`."
      },
      {
        "id": "D",
        "text": "To allocate double heap memory for performance boosts."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Core Concept: super Reference",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Wipro",
      "TCS"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: `this` points to the current object. What points to the parent portion?",
      "Hint 2: `super` is used to access parent methods or invoke parent constructors."
    ],
    "explanation": {
      "step1": "`super` is a reference variable used in subclasses to interact with their immediate parent class.",
      "step2": "It allows invoking parent constructors (`super(...)`) or overridden parent methods (`super.doWork()`).",
      "summary": "Option B is correct: Accesses superclass members.",
      "formula": "super.method() / super(args) -> Directs call to immediate parent class",
      "quickTip": "Use `super` whenever subclass shadowing or overriding hides parent members."
    }
  },
  {
    "id": "oops_mcq_82",
    "topicId": "super-keyword",
    "title": "Placement Rule for super() in Constructors",
    "prompt": "If a subclass constructor explicitly invokes a parent constructor using `super(...)`, where MUST this statement be positioned?",
    "options": [
      {
        "id": "A",
        "text": "Anywhere within the constructor, as long as it is before any `return` statement."
      },
      {
        "id": "B",
        "text": "As the very first statement in the subclass constructor body."
      },
      {
        "id": "C",
        "text": "Inside the `finally` block of the constructor."
      },
      {
        "id": "D",
        "text": "As the last statement after all subclass fields have been initialized."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Constructor Invariant: First Statement Rule",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Infosys",
      "Capgemini"
    ],
    "companyAttribution": "Company Pattern: Infosys",
    "hints": [
      "Hint 1: Can child fields be safely processed before the parent object has finished building?",
      "Hint 2: Java mandates parent initialization occurs before child initialization starts."
    ],
    "explanation": {
      "step1": "A child object relies on inherited parent state being valid before child logic runs.",
      "step2": "Java strictly enforces that `super(...)` (or `this(...)`) must be line 1 of the constructor.",
      "summary": "Option B is correct: Must be the very first statement.",
      "formula": "Constructor First Line: super(...) OR this(...) ONLY",
      "quickTip": "Placing anything before `super()` results in a compile-time error."
    }
  },
  {
    "id": "oops_mcq_83",
    "topicId": "super-keyword",
    "title": "Delegating to Overridden Parent Method",
    "prompt": "Review the following code:\n```java\nclass Logger {\n    void log(String msg) { System.out.print(\"[INFO] \" + msg); }\n}\nclass TimestampLogger extends Logger {\n    void log(String msg) {\n        super.log(msg);\n        System.out.print(\" @Done\");\n    }\n}\nnew TimestampLogger().log(\"Save\");\n```\nWhat is output to the console?",
    "options": [
      {
        "id": "A",
        "text": "[INFO] Save"
      },
      {
        "id": "B",
        "text": "[INFO] Save @Done"
      },
      {
        "id": "C",
        "text": "@Done [INFO] Save"
      },
      {
        "id": "D",
        "text": "Infinite recursion / StackOverflowError"
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Code Analysis: super Method Invocation",
    "estimatedTime": "35 sec",
    "companyTags": [
      "TCS",
      "Cognizant"
    ],
    "companyAttribution": "PathPilot Practice",
    "hints": [
      "Hint 1: `super.log(msg)` calls `Logger.log()`, not `TimestampLogger.log()`.",
      "Hint 2: Parent logs \"[INFO] Save\", then child appends \" @Done\"."
    ],
    "explanation": {
      "step1": "`super.log(msg)` explicitly invokes the parent class implementation, printing \"[INFO] Save\".",
      "step2": "Control then continues to the next line in the subclass method, printing \" @Done\".",
      "summary": "Option B is correct: \"[INFO] Save @Done\".",
      "formula": "super.method() Re-uses Base Logic without Duplication",
      "quickTip": "`super.method()` is the standard pattern for extending (decorating) base functionality."
    }
  },
  {
    "id": "oops_mcq_84",
    "topicId": "super-keyword",
    "title": "super in Static Methods Trap",
    "prompt": "What happens if a developer writes `super.toString();` inside a `public static void main` method?",
    "options": [
      {
        "id": "A",
        "text": "It prints the superclass name to the console."
      },
      {
        "id": "B",
        "text": "It compiles successfully and calls `Object.toString()`."
      },
      {
        "id": "C",
        "text": "Compilation Error: Cannot use `super` in a static context."
      },
      {
        "id": "D",
        "text": "It runs normally and returns null."
      }
    ],
    "correctOption": "C",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Compiler Trap: Static Context Restrictions",
    "estimatedTime": "40 sec",
    "companyTags": [
      "TCS Digital",
      "Wipro"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Does a static method have an active object instance?",
      "Hint 2: Both `this` and `super` require an instance context and are illegal in static methods."
    ],
    "explanation": {
      "step1": "Static methods belong to the class and are executed without any object instance in memory.",
      "step2": "Because `super` refers to the parent of an active instance, using it inside a static context is a compile-time error.",
      "summary": "Option C is correct: Cannot use super in a static context.",
      "formula": "Static Context = NO this, NO super",
      "quickTip": "Remember: \"static\" has no idea what instance it belongs to; neither `this` nor `super` can exist there."
    }
  },
  {
    "id": "oops_mcq_85",
    "topicId": "association",
    "title": "Core Definition of Association",
    "prompt": "What is an Association relationship between two classes in object-oriented design?",
    "options": [
      {
        "id": "A",
        "text": "A parent-child inheritance relationship formed using the `extends` keyword."
      },
      {
        "id": "B",
        "text": "A general structural relationship where objects of one class interact with or hold references to objects of another class, without strict ownership."
      },
      {
        "id": "C",
        "text": "A relation where one class compiles the other class at runtime."
      },
      {
        "id": "D",
        "text": "A relation where one class must inherit all private fields of the other."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Core Concept: Association",
    "estimatedTime": "25 sec",
    "companyTags": [
      "TCS",
      "Wipro"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Think of Doctor and Patient, or Teacher and Student.",
      "Hint 2: They know each other and interact, but neither owns the lifecycle of the other."
    ],
    "explanation": {
      "step1": "Association represents a broad \"uses-a\" or \"knows-a\" relationship between independent objects.",
      "step2": "Both objects have their own independent lifecycles, and neither strictly owns or creates the other.",
      "summary": "Option B is correct: Structural relationship between independent objects.",
      "formula": "Association = Independent Objects Interacting (Neither Owns the Other)",
      "quickTip": "Association is the umbrella category; Aggregation and Composition are specialized sub-types."
    }
  },
  {
    "id": "oops_mcq_86",
    "topicId": "association",
    "title": "UML Notation for Basic Association",
    "prompt": "In a standard Unified Modeling Language (UML) class diagram, how is a basic Association relationship depicted between two classes?",
    "options": [
      {
        "id": "A",
        "text": "A solid line with a hollow triangle pointing to the parent."
      },
      {
        "id": "B",
        "text": "A plain solid line connecting the two classes, optionally with an arrow indicating navigation direction."
      },
      {
        "id": "C",
        "text": "A dashed line with an open diamond."
      },
      {
        "id": "D",
        "text": "A dotted circle enclosing both classes."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "UML Standards: Association Representation",
    "estimatedTime": "30 sec",
    "companyTags": [
      "Infosys",
      "Capgemini"
    ],
    "companyAttribution": "PathPilot Practice",
    "hints": [
      "Hint 1: Inheritance uses a hollow triangle arrow.",
      "Hint 2: Simple association is drawn as a simple solid connector line between two class boxes."
    ],
    "explanation": {
      "step1": "A basic association in UML is rendered as a solid line connecting Class A and Class B.",
      "step2": "If one class holds a reference to the other, an arrowhead indicates navigability (e.g. A -> B).",
      "summary": "Option B is correct: Solid line connecting classes.",
      "formula": "ClassA --------- ClassB (Solid Line in UML)",
      "quickTip": "Solid line = Association; Hollow Triangle = Inheritance; Diamond = Aggregation/Composition."
    }
  },
  {
    "id": "oops_mcq_87",
    "topicId": "association",
    "title": "Scenario: Doctor and Patient Multiplicity",
    "prompt": "In a hospital management system, a Doctor treats many Patients, and a Patient consults many Doctors. Both Doctor and Patient exist independently in the system. What relationship and multiplicity is this?",
    "options": [
      {
        "id": "A",
        "text": "One-to-One Composition"
      },
      {
        "id": "B",
        "text": "Many-to-Many Association"
      },
      {
        "id": "C",
        "text": "Hierarchical Multiple Inheritance"
      },
      {
        "id": "D",
        "text": "One-to-Many Aggregation"
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Multiplicity Analysis: Many-to-Many",
    "estimatedTime": "35 sec",
    "companyTags": [
      "Cognizant",
      "TCS"
    ],
    "companyAttribution": "Company Pattern: Cognizant",
    "hints": [
      "Hint 1: Can one doctor have many patients? Can one patient see many doctors?",
      "Hint 2: Since both sides have multiples and neither owns the other, it is a Many-to-Many Association."
    ],
    "explanation": {
      "step1": "Neither Doctor nor Patient lifecycle depends on the other (independent entities).",
      "step2": "Because both entities can relate to multiple instances of the other, multiplicity is Many-to-Many (M:N).",
      "summary": "Option B is correct: Many-to-Many Association.",
      "formula": "Doctor [*] --------- [*] Patient",
      "quickTip": "In code, M:N association is typically represented using Lists/Sets on both objects or a junction class."
    }
  },
  {
    "id": "oops_mcq_88",
    "topicId": "association",
    "title": "Association vs Dependency in Object Design",
    "prompt": "What is the key technical difference between an Association and a Dependency relationship in OOP?",
    "options": [
      {
        "id": "A",
        "text": "There is no difference; Dependency is just the C++ keyword for Association."
      },
      {
        "id": "B",
        "text": "In Association, class A maintains a persistent instance reference (field) to class B; in Dependency, class A merely uses class B temporarily (e.g. as a method parameter or local variable)."
      },
      {
        "id": "C",
        "text": "Association requires interfaces, while Dependency requires abstract classes."
      },
      {
        "id": "D",
        "text": "Dependency implies private inheritance in Java."
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "UML Architecture: Association vs Dependency",
    "estimatedTime": "50 sec",
    "companyTags": [
      "TCS Digital",
      "Infosys"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Does class A store class B in a member field (HAS-A)? That is Association.",
      "Hint 2: If class A only accepts class B as a parameter in a single method, that is a transient Dependency."
    ],
    "explanation": {
      "step1": "Association is structural: an object holds a reference to another object as an attribute over time.",
      "step2": "Dependency is transient (\"uses-a-temporarily\"): an object receives another as a method argument or instantiates it locally for a single calculation.",
      "summary": "Option B is correct: Association is persistent via fields; Dependency is temporary via method scope.",
      "formula": "Association = Field Reference | Dependency = Method Parameter / Local Scope (Dashed Arrow)",
      "quickTip": "Dependency is the weakest relationship in UML (represented by a dashed arrow `..>`)."
    }
  },
  {
    "id": "oops_mcq_89",
    "topicId": "aggregation",
    "title": "Core Definition of Aggregation",
    "prompt": "What is the defining characteristic of an Aggregation relationship?",
    "options": [
      {
        "id": "A",
        "text": "The child object cannot exist without the parent object."
      },
      {
        "id": "B",
        "text": "It is a weak \"Has-A\" relationship where the child object can exist independently of the parent container."
      },
      {
        "id": "C",
        "text": "It requires all classes to inherit from `java.util.Collection`."
      },
      {
        "id": "D",
        "text": "It is identical to multiple inheritance."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Core Concept: Aggregation (Weak Has-A)",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Wipro",
      "TCS"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Think of a Department and Teachers. If the department closes, do the teachers cease to exist?",
      "Hint 2: The container holds items, but does not own their biological lifecycles."
    ],
    "explanation": {
      "step1": "Aggregation is a specialized form of Association that denotes a whole/part relationship.",
      "step2": "Critically, the lifecycle of the part is independent of the whole (weak ownership).",
      "summary": "Option B is correct: Weak Has-A with independent lifecycles.",
      "formula": "Aggregation = Whole-Part Relationship + Independent Lifecycles",
      "quickTip": "Teachers exist before and after the Department exists -> Aggregation."
    }
  },
  {
    "id": "oops_mcq_90",
    "topicId": "aggregation",
    "title": "UML Symbol for Aggregation",
    "prompt": "In a UML class diagram, which graphical symbol is placed at the container (whole) end of an Aggregation relationship?",
    "options": [
      {
        "id": "A",
        "text": "A solid filled black diamond"
      },
      {
        "id": "B",
        "text": "A hollow (unfilled) white diamond"
      },
      {
        "id": "C",
        "text": "A hollow triangle"
      },
      {
        "id": "D",
        "text": "A dashed lightning bolt"
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "UML Standards: Aggregation Diamond",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Infosys",
      "Capgemini"
    ],
    "companyAttribution": "PathPilot Practice",
    "hints": [
      "Hint 1: A filled diamond is for strong Composition.",
      "Hint 2: An open/hollow diamond represents weak Aggregation."
    ],
    "explanation": {
      "step1": "UML uses an open (unfilled) diamond placed on the container/aggregate class.",
      "step2": "The hollow diamond visually signifies that the container does NOT completely encapsulate or destroy the part.",
      "summary": "Option B is correct: Hollow (unfilled) diamond.",
      "formula": "Container ◇----------- Part (Hollow Diamond = Aggregation)",
      "quickTip": "Hollow diamond = Aggregation (weak); Filled diamond = Composition (strong)."
    }
  },
  {
    "id": "oops_mcq_91",
    "topicId": "aggregation",
    "title": "Scenario: University Library and Books",
    "prompt": "A University Library contains 10,000 Books. If the library building is decommissioned and deleted from the database, the books are relocated to another college and continue to exist. This proves the relationship between Library and Book is:",
    "options": [
      {
        "id": "A",
        "text": "Composition"
      },
      {
        "id": "B",
        "text": "Aggregation"
      },
      {
        "id": "C",
        "text": "Inheritance"
      },
      {
        "id": "D",
        "text": "Static Dependency"
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Scenario Analysis: Lifecycle Independence",
    "estimatedTime": "30 sec",
    "companyTags": [
      "TCS",
      "Cognizant"
    ],
    "companyAttribution": "Company Pattern: TCS",
    "hints": [
      "Hint 1: When the container (Library) dies, do the parts (Books) die with it?",
      "Hint 2: Since the books survive independently, it cannot be Composition."
    ],
    "explanation": {
      "step1": "In Composition, destroying the whole destroys the parts (e.g. Car and Engine).",
      "step2": "Because Books survive the deletion of the Library, their lifecycles are decoupled, defining Aggregation.",
      "summary": "Option B is correct: Aggregation due to independent lifecycle.",
      "formula": "Parent Destroyed -> Child Survives = Aggregation",
      "quickTip": "Ask: \"If the parent is deleted, must the child also be destroyed?\" If NO -> Aggregation."
    }
  },
  {
    "id": "oops_mcq_92",
    "topicId": "aggregation",
    "title": "Code Pattern for Implementing Aggregation",
    "prompt": "How is an Aggregation relationship typically implemented in code to preserve lifecycle independence?",
    "options": [
      {
        "id": "A",
        "text": "By instantiating child objects directly inside the parent constructor using `new`."
      },
      {
        "id": "B",
        "text": "By passing already-instantiated child objects into the parent class via constructor parameters or setter methods (Dependency Injection)."
      },
      {
        "id": "C",
        "text": "By declaring all child variables inside a static block."
      },
      {
        "id": "D",
        "text": "By having the child class extend the parent class."
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Implementation Pattern: Dependency Injection for Aggregation",
    "estimatedTime": "45 sec",
    "companyTags": [
      "TCS Digital",
      "Infosys"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: If the parent creates the child with `this.child = new Child()`, the parent controls its lifecycle.",
      "Hint 2: If the child is created outside and passed in (`new Parent(existingChild)`), the child exists independently."
    ],
    "explanation": {
      "step1": "Creating the child inside the parent constructor tightly couples lifecycles (Composition).",
      "step2": "Passing an externally created child into the parent constructor or setter (Dependency Injection) ensures the child exists before and after the parent (Aggregation).",
      "summary": "Option B is correct: Passing pre-existing objects via constructor/setters implements Aggregation.",
      "formula": "Parent(Child c) { this.c = c; } -> Child created outside = Aggregation",
      "quickTip": "Constructor takes reference from outside = Aggregation; Constructor calls `new` inside = Composition."
    }
  },
  {
    "id": "oops_mcq_93",
    "topicId": "composition",
    "title": "Core Definition of Composition",
    "prompt": "What is the definitive characteristic that distinguishes Composition from basic Aggregation?",
    "options": [
      {
        "id": "A",
        "text": "In Composition, the child object cannot exist independently of the parent; its lifecycle is strictly tied to the parent container."
      },
      {
        "id": "B",
        "text": "Composition requires multiple inheritance of classes."
      },
      {
        "id": "C",
        "text": "Composition is only supported in Python, not in Java or C++."
      },
      {
        "id": "D",
        "text": "In Composition, the parent cannot have any methods."
      }
    ],
    "correctOption": "A",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Core Concept: Composition (Strong Has-A)",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Wipro",
      "TCS"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Think of a House and its Rooms, or a Human and their Heart.",
      "Hint 2: If the House is demolished, the rooms cannot exist on their own."
    ],
    "explanation": {
      "step1": "Composition is a strong \"death-relationship\" whole/part bond.",
      "step2": "The component (part) has no meaning or existence independent of the composite (whole).",
      "summary": "Option A is correct: Dependent lifecycle defines Composition.",
      "formula": "Composition = Strong Has-A + Co-Dependent Lifecycle",
      "quickTip": "Destroy the whole -> parts are automatically destroyed."
    }
  },
  {
    "id": "oops_mcq_94",
    "topicId": "composition",
    "title": "Real-World Example of True Composition",
    "prompt": "Which of the following real-world pairs is the clearest example of Composition rather than Aggregation?",
    "options": [
      {
        "id": "A",
        "text": "University and Professor"
      },
      {
        "id": "B",
        "text": "Order and OrderLineItems"
      },
      {
        "id": "C",
        "text": "Passenger and Airplane"
      },
      {
        "id": "D",
        "text": "Driver and Car"
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Real-World Modeling: Composition",
    "estimatedTime": "30 sec",
    "companyTags": [
      "Infosys",
      "Cognizant"
    ],
    "companyAttribution": "Company Pattern: Infosys",
    "hints": [
      "Hint 1: Can an OrderLineItem (e.g. \"Quantity: 2 of Item #402\") exist without an associated Order?",
      "Hint 2: If the Order is deleted, its line items are meaningless and deleted with it."
    ],
    "explanation": {
      "step1": "An OrderLineItem only exists within the scope of a specific Order transaction.",
      "step2": "Deleting the Order deletes its line items. Professors, Passengers, and Drivers all exist independently of their containers.",
      "summary": "Option B is correct: Order and OrderLineItems represent true Composition.",
      "formula": "Part Has No Meaning Without Whole -> Composition",
      "quickTip": "In e-commerce databases, Order and OrderItems use CASCADE DELETE because they form a Composition."
    }
  },
  {
    "id": "oops_mcq_95",
    "topicId": "exception-handling",
    "title": "throw vs throws Keywords in Java",
    "prompt": "What is the precise syntactic difference between the `throw` and `throws` keywords in Java?",
    "options": [
      {
        "id": "A",
        "text": "`throw` is used in method signatures, while `throws` is used inside method bodies."
      },
      {
        "id": "B",
        "text": "`throw` is used to explicitly instantiate and raise an exception object, while `throws` is used in a method declaration to indicate that the method may raise those exceptions."
      },
      {
        "id": "C",
        "text": "`throw` is for checked exceptions, while `throws` is for unchecked exceptions."
      },
      {
        "id": "D",
        "text": "They are identical and can be used interchangeably."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Syntax & Semantics: throw vs throws",
    "estimatedTime": "30 sec",
    "companyTags": [
      "TCS",
      "Wipro"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: `throw new IllegalArgumentException(\"Bad input\");` occurs inside code.",
      "Hint 2: `void readFile() throws IOException { ... }` is in the method signature."
    ],
    "explanation": {
      "step1": "`throw` is an action verb that raises an exception instance right now.",
      "step2": "`throws` is a declaration on a method signature warning callers of potential checked exceptions.",
      "summary": "Option B is correct: throw raises an exception; throws declares potential exceptions.",
      "formula": "throw new ExceptionObject(); (Inside body) vs void method() throws ExceptionType (Signature)",
      "quickTip": "throw takes an INSTANCE; throws takes a CLASS TYPE."
    }
  },
  {
    "id": "oops_mcq_96",
    "topicId": "exception-handling",
    "title": "Root Class of Java Exception Hierarchy",
    "prompt": "In Java's object-oriented exception hierarchy, what is the root superclass of all conditions that can be thrown using the `throw` keyword or caught in a `catch` block?",
    "options": [
      {
        "id": "A",
        "text": "`java.lang.Exception`"
      },
      {
        "id": "B",
        "text": "`java.lang.Throwable`"
      },
      {
        "id": "C",
        "text": "`java.lang.Error`"
      },
      {
        "id": "D",
        "text": "`java.lang.RuntimeException`"
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "OOP Class Hierarchy: Throwable Root",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Infosys",
      "Capgemini"
    ],
    "companyAttribution": "PathPilot Practice",
    "hints": [
      "Hint 1: Both `Exception` and `Error` inherit from this base class.",
      "Hint 2: Only instances of this class (or its subclasses) can be thrown by the JVM."
    ],
    "explanation": {
      "step1": "`java.lang.Throwable` is the root superclass of Java’s exception hierarchy.",
      "step2": "It branches into two main subclasses: `Error` (serious system failures like OutOfMemoryError) and `Exception` (conditions that applications can handle).",
      "summary": "Option B is correct: java.lang.Throwable is the root.",
      "formula": "Throwable -> (Error, Exception -> RuntimeException)",
      "quickTip": "Never catch Throwable in business code; catch specific Exception subclasses."
    }
  },
  {
    "id": "oops_mcq_97",
    "topicId": "exception-handling",
    "title": "Custom Domain Exceptions Best Practice",
    "prompt": "When modeling an enterprise banking system, why should you create a custom class `InsufficientFundsException extends Exception` rather than throwing a generic `RuntimeException(\"No money\")`?",
    "options": [
      {
        "id": "A",
        "text": "Because custom exceptions run faster in CPU registers."
      },
      {
        "id": "B",
        "text": "Because a custom exception provides domain-specific semantics, custom error codes, and allows callers to write specific catch blocks to trigger account recovery workflows."
      },
      {
        "id": "C",
        "text": "Because generic RuntimeExceptions are deprecated in modern Java."
      },
      {
        "id": "D",
        "text": "Because custom exceptions do not allocate memory."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Domain-Driven Design: Custom Exceptions",
    "estimatedTime": "40 sec",
    "companyTags": [
      "TCS",
      "Cognizant"
    ],
    "companyAttribution": "Company Pattern: TCS",
    "hints": [
      "Hint 1: Can client code distinguish between an invalid account format and insufficient funds if both throw generic RuntimeException?",
      "Hint 2: Custom exception classes allow precise error handling: `catch (InsufficientFundsException e) { ... }`."
    ],
    "explanation": {
      "step1": "Generic exceptions force callers to parse error string messages, which is brittle and error-prone.",
      "step2": "Custom typed exceptions leverage polymorphism, allowing callers to catch specific domain problems and handle recovery cleanly.",
      "summary": "Option B is correct: Domain semantics and targeted recovery workflows.",
      "formula": "Custom Exception Class = Clean Type-Safe Error Handling",
      "quickTip": "Use custom exceptions to represent meaningful business rule violations."
    }
  },
  {
    "id": "oops_mcq_98",
    "topicId": "interview-revision",
    "title": "The Four Pillars Core Synthesis",
    "prompt": "Which of the following correctly pairs each of the Four Pillars of OOP with its primary objective?",
    "options": [
      {
        "id": "A",
        "text": "Encapsulation = Multi-threading; Abstraction = SQL Queries; Inheritance = Compilation; Polymorphism = Memory Allocation"
      },
      {
        "id": "B",
        "text": "Encapsulation = Data Hiding & Bundling; Abstraction = Complexity Hiding; Inheritance = Code Reusability; Polymorphism = Dynamic Behavior"
      },
      {
        "id": "C",
        "text": "Encapsulation = Public Variables; Abstraction = Empty Files; Inheritance = Copy-Pasting; Polymorphism = Fixed Types"
      },
      {
        "id": "D",
        "text": "All four pillars represent the exact same concept in different languages."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Placement Rapid Fire: The Four Pillars",
    "estimatedTime": "25 sec",
    "companyTags": [
      "TCS",
      "Wipro",
      "Infosys"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Remember the quick definitions: Protect data, hide details, reuse code, adapt behavior.",
      "Hint 2: Encapsulation protects, Abstraction simplifies, Inheritance reuses, Polymorphism adapts."
    ],
    "explanation": {
      "step1": "Encapsulation shields and binds state and behavior.",
      "step2": "Abstraction exposes essential interfaces and hides complexity.",
      "step3": "Inheritance models IS-A hierarchies for reuse.",
      "step4": "Polymorphism allows one interface to take multiple forms at runtime.",
      "summary": "Option B is correct: Accurate mapping of all four pillars.",
      "formula": "4 Pillars: Encapsulate (Hide Data) | Abstract (Hide Details) | Inherit (Reuse) | Polymorph (Dynamic)",
      "quickTip": "In every technical interview, be ready to state these 4 one-line definitions with a real-world example."
    }
  },
  {
    "id": "oops_mcq_99",
    "topicId": "interview-revision",
    "title": "The Gang of Four (GoF) Golden Principle",
    "prompt": "What is the celebrated Gang of Four (GoF) design principle regarding object relationships in enterprise software?",
    "options": [
      {
        "id": "A",
        "text": "\"Favor class inheritance over object composition.\""
      },
      {
        "id": "B",
        "text": "\"Favor object composition over class inheritance.\""
      },
      {
        "id": "C",
        "text": "\"Avoid all interfaces and use only concrete classes.\""
      },
      {
        "id": "D",
        "text": "\"Always declare all fields public for maximum throughput.\""
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Design Principles: Composition over Inheritance",
    "estimatedTime": "25 sec",
    "companyTags": [
      "TCS",
      "Infosys"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Inheritance creates tight compile-time coupling (fragile base class problem).",
      "Hint 2: Composition allows swapping implementations dynamically at runtime."
    ],
    "explanation": {
      "step1": "Inheritance exposes parent internals and locks hierarchies at compile time.",
      "step2": "Composition allows flexible runtime assembly, avoids deep hierarchy bugs, and obeys the Single Responsibility Principle.",
      "summary": "Option B is correct: \"Favor object composition over class inheritance.\"",
      "formula": "Composition > Inheritance for Maintainability and Runtime Flexibility",
      "quickTip": "Ask yourself: \"Does it truly IS-A, or does it merely HAS-A?\" If HAS-A, use composition."
    }
  },
  {
    "id": "oops_mcq_100",
    "topicId": "interview-revision",
    "title": "Multiple Inheritance of State vs Behavior in Java",
    "prompt": "Why does Java disallow multiple inheritance of classes (state) but enthusiastically allow multiple inheritance of interfaces (behavior)?",
    "options": [
      {
        "id": "A",
        "text": "Because interfaces do not require memory allocation in RAM."
      },
      {
        "id": "B",
        "text": "Because inheriting state from multiple classes causes field collision, memory layout ambiguity, and constructor chaining conflicts (the Diamond of Death), while interfaces traditionally carry only contracts without mutable instance state."
      },
      {
        "id": "C",
        "text": "Because Java creators forgot to implement multiple class inheritance."
      },
      {
        "id": "D",
        "text": "Because multiple interfaces can only be implemented on 32-bit operating systems."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Placement Deep-Dive: Diamond Problem Rationale",
    "estimatedTime": "45 sec",
    "companyTags": [
      "TCS Digital",
      "Cognizant",
      "Infosys"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: If class D extends class B and class C, and both B and C have `int age`, which `age` does D get?",
      "Hint 2: Multiple state causes physical memory collision; multiple contracts merely mean fulfilling multiple promises."
    ],
    "explanation": {
      "step1": "Multiple inheritance of classes leads to ambiguity over which parent fields and constructors to initialize.",
      "step2": "Interfaces define behavioral contracts without mutable instance fields, avoiding memory layout collision entirely.",
      "summary": "Option B is correct: Multiple state creates physical ambiguity; multiple interfaces do not.",
      "formula": "Multiple State = Memory/Constructor Diamond Ambiguity | Multiple Interfaces = Multi-Contract Capability",
      "quickTip": "Interfaces give you the polymorphism of multiple inheritance without the diamond memory headaches of C++."
    }
  },
  {
    "id": "oops_mcq_101",
    "topicId": "interview-revision",
    "title": "Virtual Method Dispatch: Java vs C++ Default",
    "prompt": "How does the default method dispatch mechanism in Java differ fundamentally from C++?",
    "options": [
      {
        "id": "A",
        "text": "In C++, all methods are virtual by default; in Java, you must write `virtual void method()` explicitly."
      },
      {
        "id": "B",
        "text": "In Java, all non-static, non-final methods are virtual by default (polymorphic); in C++, methods are non-virtual by default and require the `virtual` keyword to enable dynamic dispatch."
      },
      {
        "id": "C",
        "text": "Neither Java nor C++ supports dynamic method dispatch."
      },
      {
        "id": "D",
        "text": "Java uses compile-time static dispatch for all instance methods."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Language Comparison: Virtual Methods Java vs C++",
    "estimatedTime": "40 sec",
    "companyTags": [
      "TCS",
      "Capgemini"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Does Java have a `virtual` keyword?",
      "Hint 2: In Java, dynamic dispatch is the default behavior unless marked `final` or `static`."
    ],
    "explanation": {
      "step1": "In Java, every instance method is polymorphic/virtual by default unless declared `final`, `private`, or `static`.",
      "step2": "In C++, adhering to the \"zero-overhead principle\", methods default to static binding; dynamic dispatch requires the explicit `virtual` keyword.",
      "summary": "Option B is correct: Java methods are virtual by default; C++ requires explicit `virtual`.",
      "formula": "Java: Virtual by Default | C++: Explicit \"virtual\" Required for Dynamic Dispatch",
      "quickTip": "If a C++ base class lacks `virtual ~Base()`, destroying a derived object via base pointer causes undefined behavior."
    }
  },
  {
    "id": "oops_mcq_102",
    "topicId": "interview-revision",
    "title": "Shallow Copy vs Deep Copy Placement Trap",
    "prompt": "In object cloning and copy construction, what is the critical difference between a Shallow Copy and a Deep Copy?",
    "options": [
      {
        "id": "A",
        "text": "A Shallow Copy duplicates the primitive fields and object reference addresses, so both objects share references to the same internal nested objects; a Deep Copy recursively clones all nested objects so both copies are fully independent."
      },
      {
        "id": "B",
        "text": "A Shallow Copy allocates heap memory, while a Deep Copy uses stack memory."
      },
      {
        "id": "C",
        "text": "A Shallow Copy is performed by garbage collection, while Deep Copy is done by the CPU."
      },
      {
        "id": "D",
        "text": "There is no difference; modern compilers convert all shallow copies to deep copies automatically."
      }
    ],
    "correctOption": "A",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Memory Invariant: Shallow vs Deep Copy",
    "estimatedTime": "50 sec",
    "companyTags": [
      "TCS Digital",
      "Infosys",
      "Wipro"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: If object A has a `List<Address> addresses` and you shallow copy A to B, what happens if B mutates `addresses`?",
      "Hint 2: Shallow copy copies reference pointers; deep copy clones the actual objects in memory."
    ],
    "explanation": {
      "step1": "Shallow copy copies fields as-is: primitives are copied by value, but object references still point to the original nested objects.",
      "step2": "Deep copy creates brand new heap instances for all nested objects, guaranteeing complete state isolation.",
      "summary": "Option A is correct: Shallow copies references; Deep clones nested objects recursively.",
      "formula": "Shallow = Copy Reference Pointers | Deep = Duplicate All Heap Objects Recursively",
      "quickTip": "Java's `Object.clone()` performs a shallow copy by default."
    }
  },
  {
    "id": "oops_mcq_103",
    "topicId": "classes-and-objects",
    "title": "Object State Mutation and Side Effects",
    "prompt": "Consider the following code snippet:\n```java\nclass Counter {\n    int val = 0;\n    void inc(Counter c) {\n        c.val++;\n    }\n}\nCounter c1 = new Counter();\nCounter c2 = c1;\nc1.inc(c2);\nSystem.out.println(c1.val + \" \" + c2.val);\n```\nWhat is printed to the console?",
    "options": [
      {
        "id": "A",
        "text": "0 0"
      },
      {
        "id": "B",
        "text": "1 0"
      },
      {
        "id": "C",
        "text": "1 1"
      },
      {
        "id": "D",
        "text": "2 2"
      }
    ],
    "correctOption": "C",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Code Analysis: Reference Aliasing & Mutation",
    "estimatedTime": "35 sec",
    "companyTags": [
      "TCS",
      "Infosys"
    ],
    "companyAttribution": "PathPilot Practice",
    "hints": [
      "Hint 1: `Counter c2 = c1;` does not create a second Counter in heap memory.",
      "Hint 2: `c1` and `c2` point to the identical object. Mutating `c.val` affects the single object."
    ],
    "explanation": {
      "step1": "`c1` and `c2` are aliases pointing to the exact same heap instance.",
      "step2": "`c1.inc(c2)` increments `val` from 0 to 1 on that single instance.",
      "step3": "Printing `c1.val` and `c2.val` reads the same field: 1 1.",
      "summary": "Option C is correct: 1 1 is printed.",
      "formula": "Aliased References (c1 == c2) -> Mutation Visible through Both References",
      "quickTip": "Assignment of reference variables copies the pointer, not the object."
    }
  },
  {
    "id": "oops_mcq_104",
    "topicId": "polymorphism",
    "title": "Runtime Polymorphic Array Processing",
    "prompt": "A game engine defines `abstract class Entity { abstract void update(); }` with subclasses `Player`, `Monster`, and `Projectile`. The game loop iterates over an array `Entity[] entities` calling `e.update()`. What is the primary software engineering advantage of this design?",
    "options": [
      {
        "id": "A",
        "text": "The game loop never needs to be modified or rewritten when new entity types (such as `NPC` or `Boss`) are added to the game."
      },
      {
        "id": "B",
        "text": "It forces all entities to move at the identical pixel speed."
      },
      {
        "id": "C",
        "text": "It prevents entities from allocating heap memory."
      },
      {
        "id": "D",
        "text": "It converts the game loop into multi-threaded GPU shaders automatically."
      }
    ],
    "correctOption": "A",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Open/Closed Principle via Polymorphism",
    "estimatedTime": "40 sec",
    "companyTags": [
      "Infosys",
      "Cognizant"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: This is the core manifestation of the Open/Closed Principle (Open for extension, Closed for modification).",
      "Hint 2: The consumer loop depends on the base abstraction, so new subclasses work seamlessly without changing caller code."
    ],
    "explanation": {
      "step1": "Polymorphic collections decouple the consumer (the game loop) from the concrete subclasses.",
      "step2": "New subclasses can be introduced without modifying existing client code, fulfilling the Open/Closed Principle.",
      "summary": "Option A is correct: Extensibility without modifying the consumer loop.",
      "formula": "Consumer -> Operates on Base Abstraction -> New Subclasses Added Seamlessly",
      "quickTip": "Polymorphism replaces brittle `switch(entityType)` statements with clean object behavior."
    }
  },
  {
    "id": "oops_mcq_105",
    "topicId": "intro-to-oops",
    "title": "Object Identity vs Equality in OOPS",
    "prompt": "What is the distinction between Object Identity and Object Equality in object-oriented programming?",
    "options": [
      {
        "id": "A",
        "text": "Identity refers to whether two references point to the exact same memory address (same object), whereas Equality refers to whether two distinct objects hold equivalent state data."
      },
      {
        "id": "B",
        "text": "Identity is for primitive types, while Equality is for objects."
      },
      {
        "id": "C",
        "text": "Identity is checked with `.equals()`, while Equality is checked with `==`."
      },
      {
        "id": "D",
        "text": "There is no distinction in languages with garbage collection."
      }
    ],
    "correctOption": "A",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Core Concept: Identity vs Equality",
    "estimatedTime": "30 sec",
    "companyTags": [
      "TCS",
      "Capgemini"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Think of identical twins: they have identical attributes (equality), but they are two distinct human beings (identity).",
      "Hint 2: In Java: `==` tests identity (memory address); `.equals()` tests semantic state equivalence."
    ],
    "explanation": {
      "step1": "Object Identity answers: \"Are these two variables pointing to the exact same physical instance in memory?\" (tested by `==`).",
      "step2": "Object Equality answers: \"Do these two instances contain the same internal values/state?\" (tested by `.equals()`).",
      "summary": "Option A is correct: Identity is memory uniqueness; Equality is state equivalence.",
      "formula": "Identity = Memory Address Match (==) | Equality = State/Field Equivalence (.equals())",
      "quickTip": "Two identical dollar bills have the same value ($1 = equality), but different serial numbers (identity)."
    }
  },
  {
    "id": "oops_mcq_106",
    "topicId": "polymorphism",
    "title": "Etymological Meaning of Polymorphism",
    "prompt": "What does the Greek root of the word \"Polymorphism\" literally mean in computer science?",
    "options": [
      {
        "id": "A",
        "text": "Many files or modules"
      },
      {
        "id": "B",
        "text": "Many forms (Poly = Many, Morph = Form)"
      },
      {
        "id": "C",
        "text": "Many processors or threads"
      },
      {
        "id": "D",
        "text": "Many variables on the stack"
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Core Concept: Etymology of Polymorphism",
    "estimatedTime": "20 sec",
    "companyTags": [
      "TCS",
      "Infosys"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: \"Poly\" means many (like polygon).",
      "Hint 2: \"Morph\" means shape or form (like metamorphosis)."
    ],
    "explanation": {
      "step1": "Polymorphism literally translates to \"many forms\".",
      "step2": "In OOP, it refers to the ability of a single interface or method call to take on multiple concrete forms depending on the underlying object.",
      "summary": "Option B is correct: Many forms.",
      "formula": "Poly (Many) + Morph (Form) = Polymorphism",
      "quickTip": "One interface, multiple implementations."
    }
  },
  {
    "id": "oops_mcq_107",
    "topicId": "constructors",
    "title": "Constructor Declaration Syntax Rules",
    "prompt": "Which of the following is a mandatory syntax rule for declaring a Constructor in Java and C++?",
    "options": [
      {
        "id": "A",
        "text": "The constructor must declare a return type of `void`."
      },
      {
        "id": "B",
        "text": "The constructor name must exactly match the class name, and it must NOT specify any return type (not even void)."
      },
      {
        "id": "C",
        "text": "The constructor must always be declared `static`."
      },
      {
        "id": "D",
        "text": "The constructor must accept at least two parameters."
      }
    ],
    "correctOption": "B",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Syntax Invariant: Constructor Declaration",
    "estimatedTime": "25 sec",
    "companyTags": [
      "Wipro",
      "TCS"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Does a constructor return a value to the caller, or does it initialize the newly allocated instance?",
      "Hint 2: If you specify `void ClassName()`, the compiler treats it as a regular method, not a constructor."
    ],
    "explanation": {
      "step1": "A constructor must match the exact name of the enclosing class and must not specify any return type.",
      "step2": "If `void` is accidentally added, the compiler treats it as a standard instance method that happens to share the class name.",
      "summary": "Option B is correct: Name matches class, no return type.",
      "formula": "ClassName(...) { /* No return type */ }",
      "quickTip": "Never specify void for a constructor; doing so turns it into a normal method."
    }
  },
  {
    "id": "oops_mcq_108",
    "topicId": "constructors",
    "title": "Role of a Copy Constructor",
    "prompt": "In C++ and object-oriented design patterns, what is the role of a Copy Constructor?",
    "options": [
      {
        "id": "A",
        "text": "To copy bytecode files from storage into JVM metaspace."
      },
      {
        "id": "B",
        "text": "To initialize a newly allocated object as a state copy of an existing object of the same class (e.g. `Point(Point other)`)."
      },
      {
        "id": "C",
        "text": "To duplicate static variables across threads."
      },
      {
        "id": "D",
        "text": "To convert an object into an encrypted hash string."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Object Construction: Copy Constructor",
    "estimatedTime": "35 sec",
    "companyTags": [
      "Cognizant",
      "Capgemini"
    ],
    "companyAttribution": "Company Pattern: Cognizant",
    "hints": [
      "Hint 1: Look at the parameter: it takes an object of the same class type.",
      "Hint 2: It copies the field values of the existing instance into the newly constructed instance."
    ],
    "explanation": {
      "step1": "A copy constructor takes an existing instance of its own class: `public Student(Student other)`.",
      "step2": "It copies field values to initialize the new instance, providing a clean, explicit alternative to `clone()`.",
      "summary": "Option B is correct: Initializes a new object by copying another object.",
      "formula": "ClassName(const ClassName& other) / ClassName(ClassName other)",
      "quickTip": "Copy constructors are safer and more explicit than Java's Object.clone()."
    }
  },
  {
    "id": "oops_mcq_109",
    "topicId": "access-modifiers",
    "title": "Highest Level of Data Hiding",
    "prompt": "Which access modifier provides the HIGHEST level of encapsulation and restriction in object-oriented programming?",
    "options": [
      {
        "id": "A",
        "text": "`public`"
      },
      {
        "id": "B",
        "text": "`protected`"
      },
      {
        "id": "C",
        "text": "`private`"
      },
      {
        "id": "D",
        "text": "`default` (package-private)"
      }
    ],
    "correctOption": "C",
    "difficulty": "Easy",
    "difficultyLevel": 1,
    "pattern": "Access Control: Maximum Encapsulation",
    "estimatedTime": "20 sec",
    "companyTags": [
      "TCS",
      "Infosys"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Which modifier hides the member from even subclasses and same-package classes?",
      "Hint 2: `private` restricts visibility exclusively to within the declaring class body."
    ],
    "explanation": {
      "step1": "`private` restricts access strictly to the class where the member is declared.",
      "step2": "Neither outside classes, nor same-package classes, nor subclasses can view or modify private members.",
      "summary": "Option C is correct: `private` offers the highest restriction.",
      "formula": "private < default < protected < public (Increasing Visibility)",
      "quickTip": "Always default to `private` unless broader access is explicitly required."
    }
  },
  {
    "id": "oops_mcq_110",
    "topicId": "this-self",
    "title": "Variable Shadowing Disambiguation with this",
    "prompt": "In Java, what occurs if constructor parameters have the same names as class fields without using `this` (e.g., `name = name;` instead of `this.name = name;`)?",
    "options": [
      {
        "id": "A",
        "text": "The compiler detects the intent and assigns to the field automatically."
      },
      {
        "id": "B",
        "text": "The parameter shadows the field, assigning the parameter value to itself while the instance field remains uninitialized (or default null/0)."
      },
      {
        "id": "C",
        "text": "A NullPointerException is thrown at runtime."
      },
      {
        "id": "D",
        "text": "The code fails to compile with an AmbiguousAssignmentError."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Code Analysis: Parameter Shadowing Bug",
    "estimatedTime": "35 sec",
    "companyTags": [
      "TCS",
      "Capgemini"
    ],
    "companyAttribution": "Company Pattern: TCS",
    "hints": [
      "Hint 1: Local parameters take precedence in scope (shadowing).",
      "Hint 2: `name = name` assigns the local variable to itself, leaving the object field untouched."
    ],
    "explanation": {
      "step1": "Local parameter names shadow class instance variables with the same name in their scope.",
      "step2": "Without `this.`, `name = name` assigns the parameter to itself, leaving the instance field at its default initial value.",
      "summary": "Option B is correct: Parameter shadows the field, leading to an uninitialized field bug.",
      "formula": "this.field = param (Overcomes Parameter Variable Shadowing)",
      "quickTip": "This is one of the most common beginner bugs in Java/C++!"
    }
  },
  {
    "id": "oops_mcq_111",
    "topicId": "association",
    "title": "Bidirectional Association and Memory Leaks",
    "prompt": "In a bidirectional Association between `Customer` and `Invoice` (each object holds a reference to the other), what issue can arise without proper lifecycle management?",
    "options": [
      {
        "id": "A",
        "text": "Bidirectional references cause immediate stack overflow upon compilation."
      },
      {
        "id": "B",
        "text": "Circular strong references make state synchronization prone to infinite loops if `.toString()` or `equals()` cross-reference each other recursively."
      },
      {
        "id": "C",
        "text": "Java refuses to compile classes that hold references to each other."
      },
      {
        "id": "D",
        "text": "The operating system terminates the process with an OutOfMemoryError immediately."
      }
    ],
    "correctOption": "B",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "System Design: Bidirectional Association Hazards",
    "estimatedTime": "40 sec",
    "companyTags": [
      "Infosys",
      "Cognizant"
    ],
    "companyAttribution": "PathPilot Practice",
    "hints": [
      "Hint 1: What happens if `Customer.toString()` calls `Invoice.toString()` which calls `Customer.toString()`?",
      "Hint 2: Circular references require careful handling in serialization, logging, and cyclic reference management."
    ],
    "explanation": {
      "step1": "Bidirectional associations create cyclic dependency chains between objects.",
      "step2": "If methods like `hashCode()`, `equals()`, or `toString()` traverse the link recursively without a termination check, infinite recursion (StackOverflowError) results.",
      "summary": "Option B is correct: Circular dependencies risk infinite recursion and state sync issues.",
      "formula": "Bidirectional Link -> Requires Careful Cycle Guards in toString/equals",
      "quickTip": "Prefer unidirectional associations whenever possible to reduce coupling."
    }
  },
  {
    "id": "oops_mcq_112",
    "topicId": "aggregation",
    "title": "Aggregation vs Simple Association in Code",
    "prompt": "How is an Aggregation relationship differentiated from a simple Association conceptually and structurally in code?",
    "options": [
      {
        "id": "A",
        "text": "Aggregation is a whole-part relationship where a container logically \"owns\" or groups a collection of parts, whereas Association is a peer-to-peer relationship without any whole-part hierarchy."
      },
      {
        "id": "B",
        "text": "Aggregation requires abstract classes, whereas Association requires interfaces."
      },
      {
        "id": "C",
        "text": "There is no difference; UML considers them identical in every way."
      },
      {
        "id": "D",
        "text": "Association consumes heap memory, while Aggregation only exists in documentation."
      }
    ],
    "correctOption": "A",
    "difficulty": "Medium",
    "difficultyLevel": 2,
    "pattern": "Relationship Semantics: Aggregation vs Association",
    "estimatedTime": "35 sec",
    "companyTags": [
      "TCS",
      "Wipro"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: Think about the semantics: Whole/Part vs Peer/Peer.",
      "Hint 2: A Department logically aggregates Professors (container/items), whereas a Doctor and Patient are peer associates."
    ],
    "explanation": {
      "step1": "Association represents any general connection between objects (peer-to-peer).",
      "step2": "Aggregation adds the semantic constraint of \"Whole/Part\": the container represents the whole, and the aggregated elements represent the parts.",
      "summary": "Option A is correct: Aggregation denotes whole-part semantics; Association is peer-to-peer.",
      "formula": "Aggregation = Whole-Part (Has-A) | Association = Peer-to-Peer Interaction",
      "quickTip": "All Aggregations are Associations, but not all Associations are Aggregations."
    }
  },
  {
    "id": "oops_mcq_113",
    "topicId": "composition",
    "title": "Preventing Escaping References in Composition",
    "prompt": "Consider a class `Car` that composites a private mutable `Engine` object (`private Engine engine;`). If `Car` provides `public Engine getEngine() { return this.engine; }`, why does this violate the integrity of Composition?",
    "options": [
      {
        "id": "A",
        "text": "It prevents the Car object from compiling on 64-bit platforms."
      },
      {
        "id": "B",
        "text": "It leaks an internal escaping reference, allowing external callers to directly mutate or reconfigure the internal Engine outside the Car's knowledge and control."
      },
      {
        "id": "C",
        "text": "It causes the garbage collector to immediately destroy the Engine."
      },
      {
        "id": "D",
        "text": "It converts the composition into multiple inheritance."
      }
    ],
    "correctOption": "B",
    "difficulty": "Hard",
    "difficultyLevel": 3,
    "pattern": "Advanced Invariant: Escaping References in Composition",
    "estimatedTime": "50 sec",
    "companyTags": [
      "TCS Digital",
      "Infosys",
      "Cognizant"
    ],
    "companyAttribution": "Common Interview Pattern",
    "hints": [
      "Hint 1: If someone gets the `Engine` reference and calls `engine.setHorsepower(-10)`, did the Car validate it?",
      "Hint 2: Returning direct references to mutable composited parts breaks encapsulation and ownership."
    ],
    "explanation": {
      "step1": "In Composition, the composite object (Car) strictly owns and manages the lifecycle and invariants of the component (Engine).",
      "step2": "Returning a direct reference to a mutable internal part allows external code to mutate it directly, violating encapsulation (Escaping Reference). To fix this, return a defensive copy or expose delegating methods.",
      "summary": "Option B is correct: Escaping references allow external code to bypass parent ownership.",
      "formula": "Composition Defense: Return Defensive Copy OR Delegate Methods (Avoid Escaping References)",
      "quickTip": "Never return direct references to internal mutable components; return defensive copies or unmodifiable views."
    }
  }
];

export const OOPS_CODE_CHALLENGES = [
  {
    id: 'oops_code_01',
    title: 'Student Grade Tracker Class Construction',
    topic: 'classes-and-objects',
    difficulty: 'Easy',
    estimatedTime: '10 mins',
    concept: 'Classes, Objects, Attributes, Methods',
    description: 'Implement a `Student` class that stores `name` (String) and `score` (integer). Provide a method `getGrade()` that returns "A" if score >= 90, "B" if score >= 75, "C" if score >= 50, and "F" otherwise. Provide a method `getSummary()` returning "<name>: Grade <grade>".',
    requirements: [
      'Constructor takes (name, score).',
      '`getGrade()` returns string "A", "B", "C", or "F" based on score thresholds.',
      '`getSummary()` returns "<name>: Grade <grade>".',
      'All attributes must be cleanly encapsulated with appropriate types.'
    ],
    starterCode: {
      Java: `public class Student {
    private String name;
    private int score;

    public Student(String name, int score) {
        // TODO: Initialize fields
        this.name = name;
        this.score = score;
    }

    public String getGrade() {
        // TODO: Return A (>=90), B (>=75), C (>=50), or F
        return "";
    }

    public String getSummary() {
        // TODO: Return "<name>: Grade <grade>"
        return "";
    }
}`,
      Python: `class Student:
    def __init__(self, name: str, score: int):
        self.name = name
        self.score = score

    def get_grade(self) -> str:
        # TODO: Return A (>=90), B (>=75), C (>=50), or F
        pass

    def get_summary(self) -> str:
        # TODO: Return "<name>: Grade <grade>"
        pass`,
      'C++': `#include <string>

class Student {
private:
    std::string name;
    int score;
public:
    Student(std::string n, int s) : name(n), score(s) {}

    std::string getGrade() const {
        // TODO: Return A, B, C, or F
        return "";
    }

    std::string getSummary() const {
        // TODO: Return "<name>: Grade <grade>"
        return "";
    }
};`
    },
    testCases: [
      { input: 'Student("Aman", 92).getSummary()', expectedOutput: 'Aman: Grade A', description: 'Score 92 -> Grade A' },
      { input: 'Student("Priya", 78).getSummary()', expectedOutput: 'Priya: Grade B', description: 'Score 78 -> Grade B' },
      { input: 'Student("Rohan", 45).getSummary()', expectedOutput: 'Rohan: Grade F', description: 'Score 45 -> Grade F' }
    ],
    hints: [
      'Hint 1: Use an if-else ladder starting from the highest threshold (>= 90).',
      'Hint 2: Call `getGrade()` inside `getSummary()` to construct the formatted string.'
    ],
    placementFocus: ['TCS', 'Wipro', 'Capgemini']
  },
  {
    id: 'oops_code_02',
    title: 'Encapsulated Bank Account with Invariants',
    topic: 'encapsulation',
    difficulty: 'Easy',
    estimatedTime: '12 mins',
    concept: 'Data Hiding, Guarded Mutators, Invariant Protection',
    description: 'Implement an encapsulated `BankAccount` class with private `balance`. Implement `deposit(amount)` and `withdraw(amount)`. Return `true` if operation succeeds and `false` if invalid (e.g. deposit <= 0, or withdraw > balance or <= 0). Provide `getBalance()`.',
    requirements: [
      'Field `balance` must be private.',
      '`deposit(amount)`: validates amount > 0, adds to balance, returns true. Else returns false.',
      '`withdraw(amount)`: validates amount > 0 and amount <= balance, subtracts, returns true. Else returns false.',
      '`getBalance()` returns current balance.'
    ],
    starterCode: {
      Java: `public class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance > 0 ? initialBalance : 0;
    }

    public boolean deposit(double amount) {
        // TODO: Validate amount > 0 and add to balance
        return false;
    }

    public boolean withdraw(double amount) {
        // TODO: Validate amount > 0 and amount <= balance
        return false;
    }

    public double getBalance() {
        return balance;
    }
}`,
      Python: `class BankAccount:
    def __init__(self, initial_balance: float):
        self.__balance = initial_balance if initial_balance > 0 else 0.0

    def deposit(self, amount: float) -> bool:
        # TODO: Validate amount > 0 and add to balance
        return False

    def withdraw(self, amount: float) -> bool:
        # TODO: Validate amount > 0 and amount <= balance
        return False

    def get_balance(self) -> float:
        return self.__balance`,
      'C++': `class BankAccount {
private:
    double balance;
public:
    BankAccount(double init) : balance(init > 0 ? init : 0) {}

    bool deposit(double amount) {
        // TODO: Validate and add
        return false;
    }

    bool withdraw(double amount) {
        // TODO: Validate and subtract
        return false;
    }

    double getBalance() const {
        return balance;
    }
};`
    },
    testCases: [
      { input: 'Account(1000).deposit(500)', expectedOutput: 'true, Balance: 1500', description: 'Valid deposit of 500' },
      { input: 'Account(1000).withdraw(1500)', expectedOutput: 'false, Balance: 1000', description: 'Withdraw exceeds balance' },
      { input: 'Account(500).withdraw(200)', expectedOutput: 'true, Balance: 300', description: 'Valid withdraw of 200' }
    ],
    hints: [
      'Hint 1: Check `if (amount <= 0) return false;` at the beginning of both methods.',
      'Hint 2: For withdraw, check `if (amount > balance) return false;` to protect against overdraft.'
    ],
    placementFocus: ['Cognizant', 'Capgemini', 'Accenture']
  },
  {
    id: 'oops_code_03',
    title: 'Inheritance Hierarchy with Super Delegation',
    topic: 'inheritance',
    difficulty: 'Medium',
    estimatedTime: '15 mins',
    concept: 'Inheritance, super keyword, Reusability',
    description: 'Create a base class `Employee` with attributes `name` and `baseSalary`. Create a derived subclass `Developer` that adds `programmingLanguage`. The `Developer` constructor must call the parent constructor using `super`. Implement `getDetails()` to return "<name> earns <baseSalary> and codes in <programmingLanguage>".',
    requirements: [
      'Base class `Employee` takes (name, baseSalary).',
      'Derived class `Developer` takes (name, baseSalary, programmingLanguage).',
      'Developer constructor must invoke super(name, baseSalary).',
      '`getDetails()` should return: "<name> earns <baseSalary> and codes in <programmingLanguage>".'
    ],
    starterCode: {
      Java: `class Employee {
    protected String name;
    protected int baseSalary;

    public Employee(String name, int baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }
}

public class Developer extends Employee {
    private String programmingLanguage;

    public Developer(String name, int baseSalary, String language) {
        // TODO: Call super constructor and initialize language
        super(name, baseSalary);
        this.programmingLanguage = language;
    }

    public String getDetails() {
        // TODO: Return "<name> earns <baseSalary> and codes in <programmingLanguage>"
        return "";
    }
}`,
      Python: `class Employee:
    def __init__(self, name: str, base_salary: int):
        self.name = name
        self.base_salary = base_salary

class Developer(Employee):
    def __init__(self, name: str, base_salary: int, language: str):
        # TODO: Call super().__init__ and store language
        super().__init__(name, base_salary)
        self.language = language

    def get_details(self) -> str:
        # TODO: Return formatted string
        pass`,
      'C++': `#include <string>

class Employee {
protected:
    std::string name;
    int baseSalary;
public:
    Employee(std::string n, int s) : name(n), baseSalary(s) {}
};

class Developer : public Employee {
private:
    std::string programmingLanguage;
public:
    Developer(std::string n, int s, std::string lang) : Employee(n, s), programmingLanguage(lang) {}

    std::string getDetails() const {
        // TODO: Return string
        return "";
    }
};`
    },
    testCases: [
      { input: 'Developer("Alice", 80000, "Java").getDetails()', expectedOutput: 'Alice earns 80000 and codes in Java', description: 'Alice Java developer' },
      { input: 'Developer("Bob", 95000, "Python").getDetails()', expectedOutput: 'Bob earns 95000 and codes in Python', description: 'Bob Python developer' }
    ],
    hints: [
      'Hint 1: In Java, call `super(name, baseSalary);` as the first statement in Developer constructor.',
      'Hint 2: In Python, call `super().__init__(name, base_salary)`.'
    ],
    placementFocus: ['TCS', 'Infosys', 'Wipro']
  },
  {
    id: 'oops_code_04',
    title: 'Runtime Polymorphism & Dynamic Dispatch',
    topic: 'polymorphism',
    difficulty: 'Medium',
    estimatedTime: '15 mins',
    concept: 'Runtime Polymorphism, Method Overriding, vtable',
    description: 'Implement a base `Notification` class with a method `send(message)`. Create two subclasses: `EmailNotification` and `SMSNotification` that override `send(message)`. Email should prepend "[EMAIL] ", and SMS should prepend "[SMS] ".',
    requirements: [
      'Base `Notification` class with `send(message)`.',
      '`EmailNotification` overrides `send(message)` to return "[EMAIL] " + message.',
      '`SMSNotification` overrides `send(message)` to return "[SMS] " + message.',
      'Methods must be dynamically dispatchable via a parent reference.'
    ],
    starterCode: {
      Java: `public class Notification {
    public String send(String message) {
        return message;
    }
}

class EmailNotification extends Notification {
    @Override
    public String send(String message) {
        // TODO: Return "[EMAIL] " + message
        return "";
    }
}

class SMSNotification extends Notification {
    @Override
    public String send(String message) {
        // TODO: Return "[SMS] " + message
        return "";
    }
}`,
      Python: `class Notification:
    def send(self, message: str) -> str:
        return message

class EmailNotification(Notification):
    def send(self, message: str) -> str:
        # TODO: Return "[EMAIL] " + message
        pass

class SMSNotification(Notification):
    def send(self, message: str) -> str:
        # TODO: Return "[SMS] " + message
        pass`,
      'C++': `#include <string>

class Notification {
public:
    virtual std::string send(std::string message) {
        return message;
    }
    virtual ~Notification() = default;
};

class EmailNotification : public Notification {
public:
    std::string send(std::string message) override {
        // TODO: Return "[EMAIL] " + message
        return "";
    }
};

class SMSNotification : public Notification {
public:
    std::string send(std::string message) override {
        // TODO: Return "[SMS] " + message
        return "";
    }
};`
    },
    testCases: [
      { input: 'EmailNotification().send("OTP is 1234")', expectedOutput: '[EMAIL] OTP is 1234', description: 'Email format' },
      { input: 'SMSNotification().send("OTP is 1234")', expectedOutput: '[SMS] OTP is 1234', description: 'SMS format' }
    ],
    hints: [
      'Hint 1: Use `@Override` in Java to verify signature matches parent.',
      'Hint 2: Return string concatenation: `"[EMAIL] " + message`.'
    ],
    placementFocus: ['Cognizant', 'Capgemini', 'TCS']
  },
  {
    id: 'oops_code_05',
    title: 'Interface Contract: Payment Gateway Processor',
    topic: 'interfaces',
    difficulty: 'Medium',
    estimatedTime: '18 mins',
    concept: 'Interfaces, Abstract Contracts, Multiple Implementations',
    description: 'Create an interface `PaymentGateway` with a method `String process(double amount)`. Implement two classes: `CreditCard` and `UPI`. `CreditCard.process(amount)` should return "Charged $<amount> via Card". `UPI.process(amount)` should return "Transferred $<amount> via UPI".',
    requirements: [
      'Interface `PaymentGateway` declares `String process(double amount)`.',
      '`CreditCard` implements `PaymentGateway` with "Charged $<amount> via Card".',
      '`UPI` implements `PaymentGateway` with "Transferred $<amount> via UPI".',
      'Both classes must implement the contract correctly.'
    ],
    starterCode: {
      Java: `interface PaymentGateway {
    String process(double amount);
}

public class CreditCard implements PaymentGateway {
    public String process(double amount) {
        // TODO: Return "Charged $" + amount + " via Card"
        return "";
    }
}

class UPI implements PaymentGateway {
    public String process(double amount) {
        // TODO: Return "Transferred $" + amount + " via UPI"
        return "";
    }
}`,
      Python: `from abc import ABC, abstractmethod

class PaymentGateway(ABC):
    @abstractmethod
    def process(self, amount: float) -> str: pass

class CreditCard(PaymentGateway):
    def process(self, amount: float) -> str:
        # TODO: Return string
        pass

class UPI(PaymentGateway):
    def process(self, amount: float) -> str:
        # TODO: Return string
        pass`,
      'C++': `#include <string>

class PaymentGateway {
public:
    virtual std::string process(double amount) = 0;
    virtual ~PaymentGateway() = default;
};

class CreditCard : public PaymentGateway {
public:
    std::string process(double amount) override {
        // TODO: Return string
        return "";
    }
};

class UPI : public PaymentGateway {
public:
    std::string process(double amount) override {
        // TODO: Return string
        return "";
    }
};`
    },
    testCases: [
      { input: 'CreditCard().process(150.0)', expectedOutput: 'Charged $150.0 via Card', description: 'Credit Card charge' },
      { input: 'UPI().process(75.5)', expectedOutput: 'Transferred $75.5 via UPI', description: 'UPI transfer' }
    ],
    hints: [
      'Hint 1: All interface methods in Java are public by default; implementing class must declare methods as public.',
      'Hint 2: Format double with amount concatenation.'
    ],
    placementFocus: ['TCS', 'Infosys', 'Accenture']
  },
  {
    id: 'oops_code_06',
    title: 'Method Overloading: Shape Area Utility',
    topic: 'method-overloading',
    difficulty: 'Easy',
    estimatedTime: '12 mins',
    concept: 'Compile-Time Polymorphism, Parameter Signatures',
    description: 'Implement a `Geometry` class with overloaded `calculateArea` methods: 1. `calculateArea(double radius)` for circle (3.14159 * r * r). 2. `calculateArea(double width, double height)` for rectangle (w * h). 3. `calculateArea(int side)` for square (side * side).',
    requirements: [
      '`calculateArea(double radius)` returns double.',
      '`calculateArea(double width, double height)` returns double.',
      '`calculateArea(int side)` returns int.',
      'All 3 methods share the exact same name with different parameter types/counts.'
    ],
    starterCode: {
      Java: `public class Geometry {
    // 1. Circle
    public double calculateArea(double radius) {
        // TODO: Return 3.14159 * radius * radius
        return 0.0;
    }
    // 2. Rectangle
    public double calculateArea(double width, double height) {
        // TODO: Return width * height
        return 0.0;
    }
    // 3. Square
    public int calculateArea(int side) {
        // TODO: Return side * side
        return 0;
    }
}`,
      Python: `class Geometry:
    # Simulated via arguments in Python
    def calculate_area_circle(self, radius: float) -> float:
        return 3.14159 * radius * radius

    def calculate_area_rect(self, width: float, height: float) -> float:
        return width * height

    def calculate_area_square(self, side: int) -> int:
        return side * side`,
      'C++': `class Geometry {
public:
    double calculateArea(double radius) {
        return 3.14159 * radius * radius;
    }
    double calculateArea(double width, double height) {
        return width * height;
    }
    int calculateArea(int side) {
        return side * side;
    }
};`
    },
    testCases: [
      { input: 'Geometry().calculateArea(5.0)', expectedOutput: '78.53975', description: 'Circle radius 5' },
      { input: 'Geometry().calculateArea(4.0, 6.0)', expectedOutput: '24.0', description: 'Rectangle 4x6' },
      { input: 'Geometry().calculateArea(5)', expectedOutput: '25', description: 'Square side 5' }
    ],
    hints: [
      'Hint 1: In Java, the compiler differentiates methods by argument count and type.',
      'Hint 2: Notice the square method takes an int and returns int.'
    ],
    placementFocus: ['Wipro', 'Capgemini', 'TCS']
  },
  {
    id: 'oops_code_07',
    title: 'Strong Composition: Car & Engine Lifecycle',
    topic: 'composition',
    difficulty: 'Hard',
    estimatedTime: '20 mins',
    concept: 'Composition, Strong Has-A, Object Ownership',
    description: 'Model an `Engine` class with `horsepower` and `start()`. Model a `Car` class that owns an `Engine` created inside the `Car` constructor. `Car` should provide `start()` which calls the engine’s `start()` and returns "Car started with <hp> HP engine".',
    requirements: [
      '`Engine` class takes horsepower in constructor and has `getHp()`.',
      '`Car` class instantiates `new Engine(hp)` inside its constructor (Strong Has-A ownership).',
      '`Car.start()` invokes `engine.getHp()` and returns "Car started with <hp> HP engine".',
      'The engine reference is private to Car.'
    ],
    starterCode: {
      Java: `class Engine {
    private int hp;
    public Engine(int hp) { this.hp = hp; }
    public int getHp() { return hp; }
}

public class Car {
    private Engine engine;

    public Car(int hp) {
        // TODO: Instantiate new Engine internally
        this.engine = new Engine(hp);
    }

    public String start() {
        // TODO: Return "Car started with " + engine.getHp() + " HP engine"
        return "";
    }
}`,
      Python: `class Engine:
    def __init__(self, hp: int):
        self.hp = hp

class Car:
    def __init__(self, hp: int):
        self.__engine = Engine(hp)

    def start(self) -> str:
        # TODO: Return formatted string
        return "Car started with " + str(self.__engine.hp) + " HP engine"`,
      'C++': `#include <string>

class Engine {
private:
    int hp;
public:
    Engine(int h) : hp(h) {}
    int getHp() const { return hp; }
};

class Car {
private:
    Engine engine;
public:
    Car(int h) : engine(h) {}
    std::string start() {
        // TODO: Return formatted string
        return "Car started with " + std::to_string(engine.getHp()) + " HP engine";
    }
};`
    },
    testCases: [
      { input: 'Car(400).start()', expectedOutput: 'Car started with 400 HP engine', description: 'Car with 400 HP' },
      { input: 'Car(650).start()', expectedOutput: 'Car started with 650 HP engine', description: 'Car with 650 HP' }
    ],
    hints: [
      'Hint 1: In Composition, the parent creates and owns the child object inside its constructor.',
      'Hint 2: Call `engine.getHp()` inside `start()` and concatenate the return string.'
    ],
    placementFocus: ['TCS Digital', 'Infosys Power Programmer', 'Accenture']
  }
];


