import { getOOPSTopicCards, OOPS_TOPIC_CARDS } from './oopsTopicCardsData.js';

export { getOOPSTopicCards, OOPS_TOPIC_CARDS };

export const OOPS_10_CARDS = [
  {
    cardNumber: 1,
    title: 'What is OOPS?',
    subtitle: 'The Real-World Programming Paradigm',
    iconType: 'paradigm',
    simpleDef: 'OOPS is a way of writing software by modeling real-world things as digital objects that contain both data and behavior.',
    realWorldAnalogy: {
      concept: 'Real World vs Code',
      example: 'In the real world, a Car has data (color, fuel, speed) and actions (accelerate, brake). OOPS lets you package them together instead of keeping scattered loose variables and functions.'
    },
    visualType: 'oops-paradigm',
    syntaxHighlight: {
      Java: 'public class Main { ... }',
      Python: 'class App: pass',
      'C++': 'class App { };'
    },
    codeSnippets: {
      Java: `// Real-world entity modeled as an Object
class Phone {
    String brand = "Apple"; // Data (State)

    void call() {            // Action (Behavior)
        System.out.println("Calling friend...");
    }
}`,
      Python: `# Real-world entity modeled as an Object
class Phone:
    brand = "Apple"         # Data (State)

    def call(self):         # Action (Behavior)
        print("Calling friend...")`,
      'C++': `// Real-world entity modeled as an Object
#include <iostream>
using namespace std;

class Phone {
public:
    string brand = "Apple"; // Data (State)

    void call() {           // Action (Behavior)
        cout << "Calling friend..." << endl;
    }
};`
    },
    codeLineExplanations: {
      Java: [
        { line: 'Line 2', note: 'Defines the blueprint named Phone.' },
        { line: 'Line 3', note: 'Holds data (brand attribute).' },
        { line: 'Line 5', note: 'Defines the behavior (call method).' }
      ],
      Python: [
        { line: 'Line 2', note: 'Defines the blueprint named Phone.' },
        { line: 'Line 3', note: 'Class attribute storing data.' },
        { line: 'Line 5', note: 'Method taking self to define behavior.' }
      ],
      'C++': [
        { line: 'Line 4', note: 'Defines the Phone class.' },
        { line: 'Line 5', note: 'public specifier makes members accessible.' },
        { line: 'Line 8', note: 'Defines the call behavior member function.' }
      ]
    },
    highlights: {
      quickRemember: 'Class = Blueprint. Object = Actual thing made from the blueprint.',
      interviewTip: 'Interviewers often ask: "Why OOPS over procedural?" Answer: OOPS bundles data with its functions, preventing accidental global data corruption.',
      commonMistake: 'Thinking OOPS is just about classes. OOPS is about modularity, data protection, and reusability.'
    }
  },
  {
    cardNumber: 2,
    title: 'Class & Object',
    subtitle: 'Blueprint vs Physical Real Thing',
    iconType: 'car-blueprint',
    simpleDef: 'A Class is the architectural blueprint. An Object is the actual real car built in memory using that blueprint.',
    realWorldAnalogy: {
      concept: 'Car Blueprint vs Real Cars',
      example: 'The blueprint on paper specifies that a car has wheels and can drive. You cannot drive a blueprint! You build actual cars (BMW X5, BMW M4) from that blueprint and drive them.'
    },
    visualType: 'class-vs-object',
    codeSnippets: {
      Java: `// 1. Blueprint (Class)
class Car {
    String color;
    void drive() {
        System.out.println(color + " car is driving!");
    }
}

// 2. Creating Real Objects
public class Main {
    public static void main(String[] args) {
        Car car1 = new Car(); // Object 1
        car1.color = "Red";
        car1.drive();
    }
}`,
      Python: `# 1. Blueprint (Class)
class Car:
    def __init__(self, color):
        self.color = color

    def drive(self):
        print(f"{self.color} car is driving!")

# 2. Creating Real Objects
car1 = Car("Red") # Object 1
car1.drive()`,
      'C++': `// 1. Blueprint (Class)
#include <iostream>
using namespace std;

class Car {
public:
    string color;
    void drive() {
        cout << color << " car is driving!" << endl;
    }
};

// 2. Creating Real Objects
int main() {
    Car car1; // Object 1
    car1.color = "Red";
    car1.drive();
    return 0;
}`
    },
    codeLineExplanations: {
      Java: [
        { line: 'Line 2', note: 'Class Car defines what every car has (color) and does (drive).' },
        { line: 'Line 11', note: 'new Car() allocates real memory for Object 1 on the Heap.' },
        { line: 'Line 13', note: 'Calls the drive method for this specific car1 instance.' }
      ],
      Python: [
        { line: 'Line 2', note: 'class Car defines the blueprint.' },
        { line: 'Line 3', note: '__init__ sets initial color when a real car is created.' },
        { line: 'Line 10', note: 'car1 = Car("Red") creates the real object in memory.' }
      ],
      'C++': [
        { line: 'Line 4', note: 'class Car declared with public access.' },
        { line: 'Line 13', note: 'Car car1; instantiates the object directly on the stack.' },
        { line: 'Line 15', note: 'Invokes member function on car1.' }
      ]
    },
    highlights: {
      quickRemember: 'A class consumes no heap memory for attributes until an object is instantiated!',
      interviewTip: 'When asked "What is an instance?", say: "An instance is just another word for an object created from a class."',
      commonMistake: 'Modifying a class definition does NOT alter existing instantiated objects without recompiling/re-instantiating.'
    }
  },
  {
    cardNumber: 3,
    title: 'Encapsulation',
    subtitle: 'Data Hiding & Security Shield',
    iconType: 'lock',
    simpleDef: 'Wrapping data (variables) and code (methods) together as a single unit, and hiding internal variables behind private shields.',
    realWorldAnalogy: {
      concept: 'Bank Account & ATM',
      example: 'A bank never lets customers walk into the vault and change their balance directly! Your balance is private. You must use the ATM method (withdraw/deposit) which validates your PIN and rules.'
    },
    visualType: 'encapsulation-capsule',
    codeSnippets: {
      Java: `class BankAccount {
    private double balance = 1000; // Protected data

    // Safe Public Getter
    public double getBalance() {
        return balance;
    }

    // Safe Public Setter with validation
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}`,
      Python: `class BankAccount:
    def __init__(self):
        self.__balance = 1000 # Private with __ prefix

    def get_balance(self):
        return self.__balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount`,
      'C++': `class BankAccount {
private:
    double balance = 1000; // Hidden from outside

public:
    double getBalance() const {
        return balance;
    }

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
};`
    },
    codeLineExplanations: {
      Java: [
        { line: 'Line 2', note: 'private keyword blocks direct access: account.balance = -9999 fails!' },
        { line: 'Line 5', note: 'getBalance() allows safe read-only access.' },
        { line: 'Line 10', note: 'deposit() enforces the rule: only positive amounts allowed.' }
      ],
      Python: [
        { line: 'Line 3', note: 'Double underscore __balance invokes Python name mangling.' },
        { line: 'Line 5', note: 'Controlled getter function.' },
        { line: 'Line 8', note: 'Validates before mutating internal state.' }
      ],
      'C++': [
        { line: 'Line 2', note: 'private access specifier isolates balance.' },
        { line: 'Line 6', note: 'const member function guarantees no mutation during read.' },
        { line: 'Line 10', note: 'Controlled access via public method.' }
      ]
    },
    highlights: {
      quickRemember: 'Keep variables private, and provide public getters and setters with validation rules.',
      interviewTip: 'Encapsulation is achieved by combining Access Modifiers (private) with Getters and Setters.',
      commonMistake: 'Making private variables public just to save writing getter/setter methods ruins encapsulation.'
    }
  },
  {
    cardNumber: 4,
    title: 'Abstraction',
    subtitle: 'Hiding Complexity, Showing Essentials',
    iconType: 'tv-remote',
    simpleDef: 'Showing only the essential features of an object while hiding the complex inner machinery.',
    realWorldAnalogy: {
      concept: 'TV Remote / Car Accelerator',
      example: 'To drive a car, you only need to press the gas pedal. You do NOT need to know how the fuel injectors, spark plugs, or engine cylinders fire internal combustion!'
    },
    visualType: 'abstraction-screen',
    codeSnippets: {
      Java: `// Abstract Contract
abstract class Vehicle {
    abstract void start(); // Essential action
}

class Car extends Vehicle {
    void start() {
        // Complex internal combustion hidden here
        System.out.println("Engine ignited & fuel injected.");
    }
}`,
      Python: `from abc import ABC, abstractmethod

class Vehicle(ABC):
    @abstractmethod
    def start(self): # Essential action
        pass

class Car(Vehicle):
    def start(self):
        # Complex internal combustion hidden here
        print("Engine ignited & fuel injected.")`,
      'C++': `// Abstract class with Pure Virtual Function
class Vehicle {
public:
    virtual void start() = 0; // Essential interface
};

class Car : public Vehicle {
public:
    void start() override {
        // Complex internal combustion hidden here
        cout << "Engine ignited & fuel injected." << endl;
    }
};`
    },
    codeLineExplanations: {
      Java: [
        { line: 'Line 2', note: 'abstract class cannot be instantiated directly with new Vehicle().' },
        { line: 'Line 3', note: 'abstract void start() declares what to do, not how to do it.' },
        { line: 'Line 7', note: 'Subclass Car provides the concrete implementation.' }
      ],
      Python: [
        { line: 'Line 1', note: 'Imports Python ABC (Abstract Base Class) module.' },
        { line: 'Line 4', note: '@abstractmethod decorator enforces mandatory subclass implementation.' },
        { line: 'Line 8', note: 'Car satisfies the abstract contract.' }
      ],
      'C++': [
        { line: 'Line 4', note: 'virtual void start() = 0 makes it a pure virtual function.' },
        { line: 'Line 8', note: 'override keyword ensures correct signature matching.' }
      ]
    },
    highlights: {
      quickRemember: 'Encapsulation is about Data Security (hiding data). Abstraction is about Design Simplicity (hiding implementation complexity).',
      interviewTip: 'In interviews: "What is the difference between Abstraction and Encapsulation?" Say: Encapsulation hides data inside capsules; Abstraction hides implementation details behind interfaces.',
      commonMistake: 'Confusing abstract class with interfaces. An abstract class can have partial code; an interface is traditionally a 100% pure contract.'
    }
  },
  {
    cardNumber: 5,
    title: 'Inheritance',
    subtitle: 'Code Reusability & Is-A Hierarchy',
    iconType: 'tree-hierarchy',
    simpleDef: 'A child class inherits all non-private attributes and methods from a parent class, eliminating redundant code.',
    realWorldAnalogy: {
      concept: 'Family Genes / Vehicle Hierarchy',
      example: 'A Vehicle has wheels and a speed. A Car is a Vehicle. A Truck is a Vehicle. Instead of re-writing wheels and speed code in Car and Truck, they simply inherit from Vehicle!'
    },
    visualType: 'inheritance-tree',
    codeSnippets: {
      Java: `// Parent Superclass
class Animal {
    void eat() {
        System.out.println("Eating food...");
    }
}

// Child Subclass inherits Animal
class Dog extends Animal {
    void bark() {
        System.out.println("Woof woof!");
    }
}`,
      Python: `# Parent Superclass
class Animal:
    def eat(self):
        print("Eating food...")

# Child Subclass inherits Animal
class Dog(Animal):
    def bark(self):
        print("Woof woof!")`,
      'C++': `// Parent Superclass
class Animal {
public:
    void eat() {
        cout << "Eating food..." << endl;
    }
};

// Child Subclass inherits Animal
class Dog : public Animal {
public:
    void bark() {
        cout << "Woof woof!" << endl;
    }
};`
    },
    codeLineExplanations: {
      Java: [
        { line: 'Line 2', note: 'Parent Animal defines shared logic like eat().' },
        { line: 'Line 9', note: 'extends keyword establishes the Dog Is-A Animal relationship.' },
        { line: 'Dog instance', note: 'Can call both dog.eat() and dog.bark(). Zero duplicated code!' }
      ],
      Python: [
        { line: 'Line 2', note: 'Parent class definition.' },
        { line: 'Line 7', note: 'class Dog(Animal): passes parent class inside parentheses.' },
        { line: 'Dog instance', note: 'Inherits all parent methods seamlessly.' }
      ],
      'C++': [
        { line: 'Line 2', note: 'Parent class with public method.' },
        { line: 'Line 10', note: ': public Animal inherits all public members of Animal.' }
      ]
    },
    highlights: {
      quickRemember: 'Use Inheritance when you have a true "Is-A" relationship: A Dog IS-A Animal. A Car IS-A Vehicle.',
      interviewTip: 'Java and C# do NOT allow multiple inheritance with classes to avoid the Diamond Problem! They use Interfaces instead. C++ allows it directly.',
      commonMistake: 'Forcing inheritance when relationships are Has-A: A Car HAS-A Engine, it is not an Engine! Use composition for Has-A.'
    }
  },
  {
    cardNumber: 6,
    title: 'Polymorphism',
    subtitle: 'Many Forms, One Common Interface',
    iconType: 'shapes',
    simpleDef: 'Poly (many) + Morph (forms). The ability for different classes to respond to the exact same method call in their own unique way.',
    realWorldAnalogy: {
      concept: 'The "Draw" or "Speak" Command',
      example: 'You tell a Circle, Square, and Triangle to "draw()". You give the same single command, but a circle draws round and a square draws 4 straight lines!'
    },
    visualType: 'polymorphism-forms',
    codeSnippets: {
      Java: `class Shape {
    void draw() {
        System.out.println("Drawing generic shape");
    }
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("Drawing a Circle ⭕");
    }
}`,
      Python: `class Shape:
    def draw(self):
        print("Drawing generic shape")

class Circle(Shape):
    def draw(self):
        print("Drawing a Circle ⭕")`,
      'C++': `class Shape {
public:
    virtual void draw() {
        cout << "Drawing generic shape" << endl;
    }
};

class Circle : public Shape {
public:
    void draw() override {
        cout << "Drawing a Circle ⭕" << endl;
    }
};`
    },
    codeLineExplanations: {
      Java: [
        { line: 'Line 2', note: 'Base class declares generic draw().' },
        { line: 'Line 8', note: 'Circle provides its own specific implementation.' },
        { line: 'Runtime dispatch', note: 'Shape s = new Circle(); s.draw(); prints the circle version!' }
      ],
      Python: [
        { line: 'Line 2', note: 'Base draw method.' },
        { line: 'Line 6', note: 'Circle overrides draw dynamically via duck-typing.' }
      ],
      'C++': [
        { line: 'Line 3', note: 'virtual keyword tells compiler to look up vtable for runtime polymorphism.' },
        { line: 'Line 10', note: 'override guarantees subclass overrides parent virtual function correctly.' }
      ]
    },
    highlights: {
      quickRemember: '2 Types of Polymorphism: 1. Compile-Time (Overloading). 2. Runtime (Overriding with virtual/inheritance).',
      interviewTip: 'Polymorphism allows you to treat specialized subclasses uniformly through their common parent reference type.',
      commonMistake: 'In C++, forgetting the `virtual` keyword in the parent class disables dynamic runtime dispatch!'
    }
  },
  {
    cardNumber: 7,
    title: 'Constructors',
    subtitle: 'Automatic Object Initialization',
    iconType: 'gear-constructor',
    simpleDef: 'A special method having the same name as the class, invoked automatically the exact moment an object is instantiated.',
    realWorldAnalogy: {
      concept: 'Factory Setup on Assembly Line',
      example: 'When a new smartphone comes off the assembly line, the factory must install the battery, configure storage, and set initial language. A constructor does this initial setup!'
    },
    visualType: 'constructor-init',
    codeSnippets: {
      Java: `class Student {
    String name;

    // Parameterized Constructor
    Student(String name) {
        this.name = name; // Initial setup
        System.out.println("Student created: " + name);
    }
}`,
      Python: `class Student:
    # Constructor in Python
    def __init__(self, name):
        self.name = name # Initial setup
        print(f"Student created: {name}")`,
      'C++': `class Student {
public:
    string name;

    // Parameterized Constructor
    Student(string n) : name(n) {
        cout << "Student created: " << name << endl;
    }
};`
    },
    codeLineExplanations: {
      Java: [
        { line: 'Line 5', note: 'Constructor has no return type (not even void) and matches class name.' },
        { line: 'Line 6', note: 'this.name sets the instance variable from parameter.' }
      ],
      Python: [
        { line: 'Line 3', note: '__init__ is Python’s standard constructor method called on creation.' },
        { line: 'Line 4', note: 'self.name assigns name to the newly allocated instance.' }
      ],
      'C++': [
        { line: 'Line 6', note: ': name(n) is an initializer list, faster than assignment inside body.' }
      ]
    },
    highlights: {
      quickRemember: 'Constructors NEVER have a return type. If you write `void Student()`, it becomes a normal method, not a constructor!',
      interviewTip: 'If you do not define any constructor, compiler automatically generates an empty Default Constructor for you.',
      commonMistake: 'If you create a parameterized constructor, the default no-arg constructor is no longer provided automatically.'
    }
  },
  {
    cardNumber: 8,
    title: 'Method Overloading',
    subtitle: 'Same Name, Different Parameters',
    iconType: 'overloading',
    simpleDef: 'Multiple methods in the SAME class having the EXACT SAME name, but differentiated by their parameter count, types, or order.',
    realWorldAnalogy: {
      concept: 'Paying at a Store',
      example: 'You can "pay(cash)", "pay(creditCardNumber, cvv)", or "pay(upiId)". The action is always "pay", but the parameters you hand over change!'
    },
    visualType: 'overloading-fork',
    codeSnippets: {
      Java: `class Calculator {
    // Version 1: 2 integers
    int add(int a, int b) {
        return a + b;
    }

    // Version 2: 3 integers
    int add(int a, int b, int c) {
        return a + b + c;
    }
}`,
      Python: `# Python does NOT natively support method overloading
# by signature. We use default arguments instead:
class Calculator:
    def add(self, a, b, c = 0):
        return a + b + c`,
      'C++': `class Calculator {
public:
    // Version 1: 2 integers
    int add(int a, int b) {
        return a + b;
    }

    // Version 2: 3 integers
    int add(int a, int b, int c) {
        return a + b + c;
    }
};`
    },
    codeLineExplanations: {
      Java: [
        { line: 'Line 3', note: 'add method taking 2 parameters.' },
        { line: 'Line 8', note: 'add method taking 3 parameters. Same name, different signature!' },
        { line: 'Compiler', note: 'Decides which method to call at compile time (Static Binding).' }
      ],
      Python: [
        { line: 'Line 4', note: 'Uses default value c = 0 to handle both 2 and 3 argument additions.' }
      ],
      'C++': [
        { line: 'Line 4', note: '2-parameter overload resolved during compile time.' },
        { line: 'Line 9', note: '3-parameter overload resolved with zero runtime overhead.' }
      ]
    },
    highlights: {
      quickRemember: 'Overloading is Compile-Time Polymorphism. Changing ONLY the return type does NOT count as overloading and will cause a compiler error!',
      interviewTip: 'Why does return type alone not overload? Because when you call `calc.add(2, 3);` without storing the result, the compiler cannot tell which one you meant.',
      commonMistake: 'Thinking Python has method overloading like Java. In Python, the last defined method simply overwrites previous ones.'
    }
  },
  {
    cardNumber: 9,
    title: 'Method Overriding',
    subtitle: 'Child Redefining Parent Behavior',
    iconType: 'overriding',
    simpleDef: 'A child class provides a new, custom implementation of a method that is already defined in its parent class with the exact same signature.',
    realWorldAnalogy: {
      concept: 'Smartphone Ringtone',
      example: 'All phones have a default "ring()" method. But your personal phone overrides that default sound with your favorite customized song!'
    },
    visualType: 'overriding-layer',
    codeSnippets: {
      Java: `class Parent {
    void advice() {
        System.out.println("Use traditional landline.");
    }
}

class Child extends Parent {
    @Override
    void advice() {
        System.out.println("Use instant messaging!");
    }
}`,
      Python: `class Parent:
    def advice(self):
        print("Use traditional landline.")

class Child(Parent):
    def advice(self):
        print("Use instant messaging!")`,
      'C++': `class Parent {
public:
    virtual void advice() {
        cout << "Use traditional landline." << endl;
    }
};

class Child : public Parent {
public:
    void advice() override {
        cout << "Use instant messaging!" << endl;
    }
};`
    },
    codeLineExplanations: {
      Java: [
        { line: 'Line 2', note: 'Parent provides the initial implementation.' },
        { line: 'Line 8', note: '@Override tells compiler to verify method signature matches parent.' },
        { line: 'Line 9', note: 'Child replaces behavior completely at runtime.' }
      ],
      Python: [
        { line: 'Line 2', note: 'Parent method definition.' },
        { line: 'Line 6', note: 'Child replaces advice() implementation directly.' }
      ],
      'C++': [
        { line: 'Line 3', note: 'virtual enables dynamic lookup via vtable pointer.' },
        { line: 'Line 10', note: 'override confirms signature matches virtual parent function.' }
      ]
    },
    highlights: {
      quickRemember: 'Overriding happens across PARENT and CHILD classes. The method signature and return type must match.',
      interviewTip: 'Overriding is Runtime Polymorphism (Dynamic Binding). Resolved when program runs based on the actual object created in memory.',
      commonMistake: 'Trying to override a `static` or `final` (or `private`) method. Static methods belong to the class, so they are HIDDEN, not overridden.'
    }
  },
  {
    cardNumber: 10,
    title: 'Why Use OOPS?',
    subtitle: 'The 4 Superpowers of Modern Software',
    iconType: 'trophy-clean',
    simpleDef: 'OOPS makes massive software projects modular, maintainable, secure against bugs, and easily reusable through 4 core pillars.',
    realWorldAnalogy: {
      concept: 'Building with LEGO Blocks',
      example: 'Procedural code is like sculpting from a single block of fragile clay. OOPS is building with standardized LEGO blocks: if one brick breaks, you swap that single block without knocking down the entire castle!'
    },
    visualType: 'oops-four-pillars',
    codeSnippets: {
      Java: `// The 4 Pillars in a Single Architecture:
// 1. Encapsulation: private data
// 2. Abstraction: abstract interface
// 3. Inheritance: extends Base
// 4. Polymorphism: dynamic override
abstract class Service {
    abstract void execute();
}`,
      Python: `# The 4 Pillars in a Single Architecture:
# 1. Encapsulation: __data
# 2. Abstraction: ABC & @abstractmethod
# 3. Inheritance: class Child(Parent)
# 4. Polymorphism: duck typing & overrides
from abc import ABC, abstractmethod
class Service(ABC):
    @abstractmethod
    def execute(self): pass`,
      'C++': `// The 4 Pillars in a Single Architecture:
// 1. Encapsulation: private/protected
// 2. Abstraction: pure virtual functions
// 3. Inheritance: : public Base
// 4. Polymorphism: virtual & override
class Service {
public:
    virtual void execute() = 0;
};`
    },
    codeLineExplanations: {
      Java: [
        { line: 'Encapsulation', note: 'Keeps each service’s internal state protected and clean.' },
        { line: 'Abstraction', note: 'Users interact with Service without caring about internal drivers.' },
        { line: 'Inheritance & Poly', note: 'New services can be plugged in instantly without breaking existing client code.' }
      ],
      Python: [
        { line: 'Clean architecture', note: 'Promotes modular enterprise software development.' }
      ],
      'C++': [
        { line: 'Zero cost abstraction', note: 'High performance object design with strict compile-time checking.' }
      ]
    },
    highlights: {
      quickRemember: 'The 4 Pillars: A-P-I-E -> Abstraction, Polymorphism, Inheritance, Encapsulation.',
      interviewTip: 'Memorize the acronym "APIE" or "A PIE" to instantly name all 4 pillars under interview pressure!',
      commonMistake: 'Claiming OOPS is always faster than procedural code. OOPS prioritizes maintainability and scale over micro-level memory overhead.'
    }
  }
];

export const OOPS_SYNTAX_CARDS = {
  Java: {
    language: 'Java',
    extension: '.java',
    style: 'Strongly Typed & Object Pure',
    classDeclaration: 'public class Car { ... }',
    objectCreation: 'Car myCar = new Car();',
    inheritanceSyntax: 'class ElectricCar extends Car { ... }',
    interfaceSyntax: 'class Tesla implements Drivable { ... }',
    accessKeywords: ['private', 'protected', 'public', '(default)'],
    constructorSyntax: 'public Car(String model) { this.model = model; }'
  },
  Python: {
    language: 'Python',
    extension: '.py',
    style: 'Dynamic & Concise',
    classDeclaration: 'class Car:\n    def __init__(self, model):\n        self.model = model',
    objectCreation: 'my_car = Car("Model S")',
    inheritanceSyntax: 'class ElectricCar(Car): ...',
    interfaceSyntax: 'from abc import ABC, abstractmethod',
    accessKeywords: ['_protected (convention)', '__private (mangled)'],
    constructorSyntax: 'def __init__(self, model):\n    self.model = model'
  },
  'C++': {
    language: 'C++',
    extension: '.cpp',
    style: 'High Performance & Explicit Memory',
    classDeclaration: 'class Car {\npublic:\n    string model;\n};',
    objectCreation: 'Car myCar;\n// or heap: Car* c = new Car();',
    inheritanceSyntax: 'class ElectricCar : public Car { ... };',
    interfaceSyntax: 'virtual void drive() = 0; // Pure virtual',
    accessKeywords: ['private:', 'protected:', 'public:'],
    constructorSyntax: 'Car(string m) : model(m) { }'
  }
};
