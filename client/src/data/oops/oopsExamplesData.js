/**
 * SOLVED OOPS BENCHMARK PROBLEM EXAMPLES
 * 
 * Beginner-friendly solved problems covering the 10 canonical OOPS entity archetypes:
 * 1. Car (Class & Object)
 * 2. Bank Account (Encapsulation)
 * 3. Vehicle (Inheritance & Super)
 * 4. Animal (Polymorphism)
 * 5. Payment (Abstraction & Interface)
 * 6. Student (Access Modifiers & Invariants)
 * 7. Car & Engine (Composition - Strong Has-A)
 * 8. Shape & Calculator (Method Overloading)
 * 9. Notification (Method Overriding)
 * 10. Department & Teacher (Aggregation - Weak Has-A)
 * 
 * Each example follows the structured pedagogical format:
 * PROBLEM → WHAT DO WE NEED? → CONCEPT USED → SMALL CODE / DIAGRAM → OUTPUT → WHY IT WORKS
 */

export const OOPS_PROBLEM_EXAMPLES = [
  {
    id: 'oops-ex-1',
    topicId: 'classes-and-objects',
    title: 'Class & Object: Car Blueprint Instantiation',
    difficulty: 'Easy',
    levelNum: 1,
    concept: 'Classes & Objects',
    scenario: 'Create a Car class to store a vehicle’s brand and current speed, then instantiate an object and invoke its accelerate action.',
    whatWeNeed: 'A Car class holding brand and speed, and an accelerate() method to increase speed safely.',
    conceptUsed: 'Class (Blueprint in memory) and Object (Physical instance in Heap RAM).',
    visualType: 'class-vs-object',
    codeSnippets: {
      Java: `class Car {
    String brand;
    int speed;

    void accelerate(int increase) {
        speed += increase;
        System.out.println(brand + " is now going at " + speed + " km/h.");
    }
}

public class Main {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.brand = "Tesla";
        myCar.speed = 40;
        myCar.accelerate(30);
    }
}`,
      Python: `class Car:
    def __init__(self, brand, speed):
        self.brand = brand
        self.speed = speed

    def accelerate(self, increase):
        self.speed += increase
        print(f"{self.brand} is now going at {self.speed} km/h.")

my_car = Car("Tesla", 40)
my_car.accelerate(30)`,
      'C++': `#include <iostream>
using namespace std;

class Car {
public:
    string brand;
    int speed;

    void accelerate(int increase) {
        speed += increase;
        cout << brand << " is now going at " << speed << " km/h." << endl;
    }
};

int main() {
    Car myCar;
    myCar.brand = "Tesla";
    myCar.speed = 40;
    myCar.accelerate(30);
    return 0;
}`
    },
    expectedOutput: 'Tesla is now going at 70 km/h.',
    whyItWorks: 'The class defines the template once. When myCar is instantiated with new, independent heap memory is reserved for its brand and speed, which accelerate() manipulates cleanly.',
    steps: [
      { step: 'Step 1: Declare the Blueprint', desc: 'Define class Car with attributes (brand, speed) and behavior accelerate().' },
      { step: 'Step 2: Allocate Memory', desc: 'Instantiate the object using new. The reference variable points to a fresh heap block.' },
      { step: 'Step 3: Invoke Behavior', desc: 'Call accelerate(30) to update internal speed from 40 to 70 and display status.' }
    ],
    quickTip: 'Each object gets its own copy of instance variables (brand, speed) independent of any other car object.'
  },
  {
    id: 'oops-ex-2',
    topicId: 'encapsulation',
    title: 'Encapsulation: Protected Bank Account Vault',
    difficulty: 'Easy',
    levelNum: 1,
    concept: 'Encapsulation',
    scenario: 'Protect a bank account’s balance from unauthorized negative mutations by making it private and providing validated deposit and withdraw methods.',
    whatWeNeed: 'Private balance field, public getBalance(), and a withdraw() method that verifies funds before debiting.',
    conceptUsed: 'Data Hiding & Encapsulation with Guarded Mutators.',
    visualType: 'encapsulation-vault',
    codeSnippets: {
      Java: `class BankAccount {
    private double balance; // Hidden private state

    public BankAccount(double initialBalance) {
        if (initialBalance >= 0) this.balance = initialBalance;
    }

    public double getBalance() {
        return balance;
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrew: $" + amount + " | Remaining: $" + balance);
        } else {
            System.out.println("Transaction declined: Insufficient funds.");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount acc = new BankAccount(500);
        acc.withdraw(200);
        acc.withdraw(400); // Exceeds balance!
    }
}`,
      Python: `class BankAccount:
    def __init__(self, initial_balance):
        self.__balance = initial_balance if initial_balance >= 0 else 0

    def get_balance(self):
        return self.__balance

    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            print("Withdrew: $" + str(amount) + " | Remaining: $" + str(self.__balance))
        else:
            print("Transaction declined: Insufficient funds.")

acc = BankAccount(500)
acc.withdraw(200)
acc.withdraw(400)`,
      'C++': `#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance;
public:
    BankAccount(double init) : balance(init >= 0 ? init : 0) {}

    double getBalance() const { return balance; }

    void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            cout << "Withdrew: $" << amount << " | Remaining: $" << balance << endl;
        } else {
            cout << "Transaction declined: Insufficient funds." << endl;
        }
    }
};

int main() {
    BankAccount acc(500);
    acc.withdraw(200);
    acc.withdraw(400);
    return 0;
}`
    },
    expectedOutput: "Withdrew: $200 | Remaining: $300\nTransaction declined: Insufficient funds.",
    whyItWorks: 'Private access modifier prevents outside code from setting balance to arbitrary values. All transactions must pass through validation logic.',
    steps: [
      { step: 'Step 1: Private Isolation', desc: 'balance variable cannot be modified directly from outside code (acc.balance = -100 is rejected by compiler).' },
      { step: 'Step 2: Business Logic Validation', desc: 'withdraw() enforces amount > 0 and amount <= balance before debiting.' },
      { step: 'Step 3: State Integrity', desc: 'Invalid transactions fail gracefully without corrupting account balance.' }
    ],
    quickTip: 'Always validate parameters inside setter/mutator methods to protect internal invariants.'
  },
  {
    id: 'oops-ex-3',
    topicId: 'inheritance',
    title: 'Inheritance: Vehicle to ElectricCar Hierarchy',
    difficulty: 'Medium',
    levelNum: 2,
    concept: 'Inheritance',
    scenario: 'Create a base Vehicle class with brand, and derive an ElectricCar child class that adds batteryCapacity and invokes the parent constructor using super.',
    whatWeNeed: 'Base Vehicle class with brand attribute, and derived ElectricCar calling super(brand) with batteryCapacity.',
    conceptUsed: 'Is-A Inheritance & Constructor Delegation (super keyword).',
    visualType: 'inheritance-chain',
    codeSnippets: {
      Java: `class Vehicle {
    protected String brand;

    public Vehicle(String brand) {
        this.brand = brand;
    }
}

class ElectricCar extends Vehicle {
    private int batteryCapacity;

    public ElectricCar(String brand, int battery) {
        super(brand); // Invoke parent constructor
        this.batteryCapacity = battery;
    }

    public void displaySpecs() {
        System.out.println("Brand: " + brand + " | Battery: " + batteryCapacity + " kWh");
    }
}

public class Main {
    public static void main(String[] args) {
        ElectricCar tesla = new ElectricCar("Tesla", 85);
        tesla.displaySpecs();
    }
}`,
      Python: `class Vehicle:
    def __init__(self, brand):
        self.brand = brand

class ElectricCar(Vehicle):
    def __init__(self, brand, battery):
        super().__init__(brand) # Call parent constructor
        self.battery_capacity = battery

    def display_specs(self):
        print(f"Brand: {self.brand} | Battery: {self.battery_capacity} kWh")

tesla = ElectricCar("Tesla", 85)
tesla.display_specs()`,
      'C++': `#include <iostream>
using namespace std;

class Vehicle {
protected:
    string brand;
public:
    Vehicle(string b) : brand(b) {}
};

class ElectricCar : public Vehicle {
private:
    int batteryCapacity;
public:
    ElectricCar(string b, int bat) : Vehicle(b), batteryCapacity(bat) {}

    void displaySpecs() {
        cout << "Brand: " << brand << " | Battery: " << batteryCapacity << " kWh" << endl;
    }
};

int main() {
    ElectricCar tesla("Tesla", 85);
    tesla.displaySpecs();
    return 0;
}`
    },
    expectedOutput: 'Brand: Tesla | Battery: 85 kWh',
    whyItWorks: 'ElectricCar inherits brand from Vehicle without re-declaring it. The super() call guarantees the parent portion of the object is initialized first.',
    steps: [
      { step: 'Step 1: Protected Access in Base', desc: 'protected allows derived subclasses to access brand while keeping it hidden from unrelated external code.' },
      { step: 'Step 2: Forwarding to Base Constructor', desc: 'super(brand) initializes the parent fields before child attributes are assigned.' },
      { step: 'Step 3: Specialized Child State', desc: 'ElectricCar cleanly adds batteryCapacity without duplicating brand declaration.' }
    ],
    quickTip: 'In constructor execution order: Parent constructor ALWAYS executes BEFORE the child constructor body.'
  },
  {
    id: 'oops-ex-4',
    topicId: 'polymorphism',
    title: 'Polymorphism: Animal Sound Dynamic Dispatch',
    difficulty: 'Medium',
    levelNum: 2,
    concept: 'Polymorphism',
    scenario: 'Model an Animal sound system where a base Animal reference executes Dog.sound() and Cat.sound() dynamically at runtime.',
    whatWeNeed: 'Base Animal class with sound(), overridden by Dog and Cat, called through an Animal array.',
    conceptUsed: 'Runtime Polymorphism (Dynamic Method Dispatch via vtable).',
    visualType: 'polymorphism-forms',
    codeSnippets: {
      Java: `class Animal {
    void sound() { System.out.println("Animal makes a sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Dog barks: Woof woof!"); }
}
class Cat extends Animal {
    @Override
    void sound() { System.out.println("Cat meows: Meow meow!"); }
}

public class Main {
    public static void main(String[] args) {
        Animal[] pets = { new Dog(), new Cat() };
        for (Animal a : pets) {
            a.sound(); // Dynamically dispatched!
        }
    }
}`,
      Python: `class Animal:
    def sound(self): print("Animal makes a sound")
class Dog(Animal):
    def sound(self): print("Dog barks: Woof woof!")
class Cat(Animal):
    def sound(self): print("Cat meows: Meow meow!")

pets = [Dog(), Cat()]
for a in pets:
    a.sound()`,
      'C++': `#include <iostream>
using namespace std;

class Animal {
public:
    virtual void sound() { cout << "Animal makes a sound" << endl; }
    virtual ~Animal() = default;
};
class Dog : public Animal {
public:
    void sound() override { cout << "Dog barks: Woof woof!" << endl; }
};
class Cat : public Animal {
public:
    void sound() override { cout << "Cat meows: Meow meow!" << endl; }
};

int main() {
    Animal* pets[] = { new Dog(), new Cat() };
    for (Animal* a : pets) a->sound();
    delete pets[0]; delete pets[1];
    return 0;
}`
    },
    expectedOutput: "Dog barks: Woof woof!\nCat meows: Meow meow!",
    whyItWorks: 'The loop only knows it holds Animal references. At runtime, the JVM looks up the vtable of the real heap object to call the overridden Dog and Cat methods.',
    steps: [
      { step: 'Step 1: Declare Base Virtual Method', desc: 'Define sound() in Animal so all animals share a uniform interface.' },
      { step: 'Step 2: Subclass Specialization', desc: 'Dog and Cat override sound() with their distinctive noises.' },
      { step: 'Step 3: Uniform Polymorphic Loop', desc: '`a.sound()` executes the child behavior dynamically without any if-else checks.' }
    ],
    quickTip: 'Polymorphism replaces brittle if-else / switch cascades with clean, extensible object-oriented classes.'
  },
  {
    id: 'oops-ex-5',
    topicId: 'abstraction',
    title: 'Abstraction: Pluggable Payment Gateway',
    difficulty: 'Medium',
    levelNum: 2,
    concept: 'Abstraction',
    scenario: 'Implement a payment processing system where checkout interacts with a Payment interface, supporting CreditCard and UPI without coupling.',
    whatWeNeed: 'Payment interface with pay(amount), implemented by CreditCardPayment and UPIPayment.',
    conceptUsed: 'Pure Abstraction & Interface Contracts (Loose Coupling).',
    visualType: 'abstraction-screen',
    codeSnippets: {
      Java: `interface PaymentGateway {
    void pay(double amount);
}

class CreditCardPayment implements PaymentGateway {
    public void pay(double amount) {
        System.out.println("Processing Credit Card payment of $" + amount);
    }
}

class UPIPayment implements PaymentGateway {
    public void pay(double amount) {
        System.out.println("Processing UPI payment of $" + amount);
    }
}

public class Main {
    public static void main(String[] args) {
        PaymentGateway gateway1 = new CreditCardPayment();
        PaymentGateway gateway2 = new UPIPayment();
        gateway1.pay(150.0);
        gateway2.pay(45.0);
    }
}`,
      Python: `from abc import ABC, abstractmethod

class PaymentGateway(ABC):
    @abstractmethod
    def pay(self, amount): pass

class CreditCardPayment(PaymentGateway):
    def pay(self, amount):
        print(f"Processing Credit Card payment of \${amount}")

class UPIPayment(PaymentGateway):
    def pay(self, amount):
        print(f"Processing UPI payment of \${amount}")

gateway1 = CreditCardPayment()
gateway2 = UPIPayment()
gateway1.pay(150.0)
gateway2.pay(45.0)`,
      'C++': `#include <iostream>
using namespace std;

class PaymentGateway {
public:
    virtual void pay(double amount) = 0; // Pure virtual
    virtual ~PaymentGateway() = default;
};

class CreditCardPayment : public PaymentGateway {
public:
    void pay(double amount) override {
        cout << "Processing Credit Card payment of $" << amount << endl;
    }
};

class UPIPayment : public PaymentGateway {
public:
    void pay(double amount) override {
        cout << "Processing UPI payment of $" << amount << endl;
    }
};

int main() {
    PaymentGateway* g1 = new CreditCardPayment();
    PaymentGateway* g2 = new UPIPayment();
    g1->pay(150.0);
    g2->pay(45.0);
    delete g1; delete g2;
    return 0;
}`
    },
    expectedOutput: "Processing Credit Card payment of $150\nProcessing UPI payment of $45",
    whyItWorks: 'The e-commerce system is decoupled from specific payment vendors. Adding CryptoPayment requires zero changes to existing checkout code.',
    steps: [
      { step: 'Step 1: Define Interface Contract', desc: 'PaymentGateway specifies pay(amount) without any implementation details.' },
      { step: 'Step 2: Concrete Vendors', desc: 'CreditCardPayment and UPIPayment implement bank protocols independently.' },
      { step: 'Step 3: Pluggable Calling Code', desc: 'Callers only reference PaymentGateway, achieving complete decoupling.' }
    ],
    quickTip: 'Program to an interface, not an implementation (Dependency Inversion Principle).'
  },
  {
    id: 'oops-ex-6',
    topicId: 'access-modifiers',
    title: 'Access Modifiers: Student Grade Management',
    difficulty: 'Easy',
    levelNum: 1,
    concept: 'Access Modifiers',
    scenario: 'Manage student scores with private GPA (0.0 to 10.0), public name, and protected rollNumber.',
    whatWeNeed: 'Student class with private gpa and validation in setGpa() to prevent invalid marks.',
    conceptUsed: 'Access Modifiers (private, protected, public) & State Invariants.',
    visualType: 'encapsulation-capsule',
    codeSnippets: {
      Java: `class Student {
    public String name;
    private double gpa; // Encapsulated

    public void setGpa(double val) {
        if (val >= 0.0 && val <= 10.0) {
            this.gpa = val;
        }
    }
    public double getGpa() { return gpa; }
}
public class Main {
    public static void main(String[] args) {
        Student s = new Student();
        s.name = "Aman";
        s.setGpa(9.4);
        s.setGpa(15.0); // Invalid! Ignored by validator
        System.out.println(s.name + " GPA: " + s.getGpa());
    }
}`,
      Python: `class Student:
    def __init__(self, name):
        self.name = name
        self.__gpa = 0.0

    def set_gpa(self, val):
        if 0.0 <= val <= 10.0:
            self.__gpa = val

    def get_gpa(self):
        return self.__gpa

s = Student("Aman")
s.set_gpa(9.4)
s.set_gpa(15.0) # Invalid!
print(f"{s.name} GPA: {s.get_gpa()}")`,
      'C++': `#include <iostream>
using namespace std;

class Student {
public:
    string name;
private:
    double gpa = 0.0;
public:
    void setGpa(double val) {
        if (val >= 0.0 && val <= 10.0) gpa = val;
    }
    double getGpa() const { return gpa; }
};

int main() {
    Student s;
    s.name = "Aman";
    s.setGpa(9.4);
    s.setGpa(15.0); // Invalid!
    cout << s.name << " GPA: " << s.getGpa() << endl;
    return 0;
}`
    },
    expectedOutput: 'Aman GPA: 9.4',
    whyItWorks: 'The gpa field is protected from direct tampering. Setting gpa to 15.0 fails validation, preserving data correctness.',
    steps: [
      { step: 'Step 1: Declare Visibility', desc: 'Make gpa private to block direct assignment from outside.' },
      { step: 'Step 2: Add Guarded Setter', desc: 'setGpa() checks that the score falls strictly between 0.0 and 10.0.' },
      { step: 'Step 3: Verification', desc: 'Invalid values are rejected, preserving data invariants.' }
    ],
    quickTip: 'Never leave critical state variables public without validation guards.'
  },
  {
    id: 'oops-ex-7',
    topicId: 'composition',
    title: 'Composition: Car and Engine System',
    difficulty: 'Hard',
    levelNum: 3,
    concept: 'Composition',
    scenario: 'Model a Car that has an Engine. The Engine is created inside the Car and destroyed when the Car is destroyed (Strong Has-A).',
    whatWeNeed: 'Engine class and Car class holding a private Engine instance created in Car constructor.',
    conceptUsed: 'Composition (Strong Has-A Ownership & Lifecycle Coupling).',
    visualType: 'class-vs-object',
    codeSnippets: {
      Java: `class Engine {
    private int horsepower;
    public Engine(int hp) { this.horsepower = hp; }
    public void start() { System.out.println("V8 Engine (" + horsepower + " HP) roaring!"); }
}

class Car {
    private final Engine engine; // Car OWNS the Engine

    public Car(int hp) {
        this.engine = new Engine(hp); // Lifecycle tied to Car
    }
    public void startCar() {
        engine.start();
        System.out.println("Car is moving smoothly.");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car(450);
        car.startCar();
    }
}`,
      Python: `class Engine:
    def __init__(self, hp):
        self.horsepower = hp
    def start(self):
        print(f"V8 Engine ({self.horsepower} HP) roaring!")

class Car:
    def __init__(self, hp):
        self.__engine = Engine(hp) # Car owns Engine
    def start_car(self):
        self.__engine.start()
        print("Car is moving smoothly.")

car = Car(450)
car.start_car()`,
      'C++': `#include <iostream>
using namespace std;

class Engine {
private:
    int horsepower;
public:
    Engine(int hp) : horsepower(hp) {}
    void start() { cout << "V8 Engine (" << horsepower << " HP) roaring!" << endl; }
};

class Car {
private:
    Engine engine; // Value member: destroyed with Car
public:
    Car(int hp) : engine(hp) {}
    void startCar() {
        engine.start();
        cout << "Car is moving smoothly." << endl;
    }
};

int main() {
    Car car(450);
    car.startCar();
    return 0;
}`
    },
    expectedOutput: "V8 Engine (450 HP) roaring!\nCar is moving smoothly.",
    whyItWorks: 'Car HAS an Engine, rather than Car IS an Engine. The Engine object is created internally by Car and cannot outlive the car.',
    steps: [
      { step: 'Step 1: Define Part Class', desc: 'Engine encapsulates internal combustion horsepower and start logic.' },
      { step: 'Step 2: Internal Ownership', desc: 'Car instantiates its own Engine in its constructor rather than accepting a loose external reference.' },
      { step: 'Step 3: Delegated Execution', desc: 'car.startCar() delegates engine ignition to its internal Engine component.' }
    ],
    quickTip: 'Favor Composition over Inheritance: A Car HAS an Engine, so use composition!'
  },
  {
    id: 'oops-ex-8',
    topicId: 'method-overloading',
    title: 'Method Overloading: Geometry Calculator',
    difficulty: 'Easy',
    levelNum: 1,
    concept: 'Method Overloading',
    scenario: 'Create a MathUtility class with overloaded calculateArea() methods for circles (radius) and rectangles (width, height).',
    whatWeNeed: 'Overloaded calculateArea(double r) and calculateArea(double w, double h) methods.',
    conceptUsed: 'Compile-Time Polymorphism (Method Overloading).',
    visualType: 'overloading-fork',
    codeSnippets: {
      Java: `class GeometryCalculator {
    // Area of Circle
    public double calculateArea(double radius) {
        return 3.14159 * radius * radius;
    }
    // Area of Rectangle
    public double calculateArea(double width, double height) {
        return width * height;
    }
}

public class Main {
    public static void main(String[] args) {
        GeometryCalculator calc = new GeometryCalculator();
        System.out.printf("Circle Area: %.1f%n", calc.calculateArea(5.0));
        System.out.printf("Rectangle Area: %.1f%n", calc.calculateArea(4.0, 6.0));
    }
}`,
      Python: `class GeometryCalculator:
    # Simulated via argument count in Python
    def calculate_area(self, a, b=None):
        if b is None:
            return 3.14159 * a * a
        return a * b

calc = GeometryCalculator()
print(f"Circle Area: {calc.calculate_area(5.0):.1f}")
print(f"Rectangle Area: {calc.calculate_area(4.0, 6.0):.1f}")`,
      'C++': `#include <iostream>
#include <iomanip>
using namespace std;

class GeometryCalculator {
public:
    double calculateArea(double radius) {
        return 3.14159 * radius * radius;
    }
    double calculateArea(double width, double height) {
        return width * height;
    }
};

int main() {
    GeometryCalculator calc;
    cout << fixed << setprecision(1);
    cout << "Circle Area: " << calc.calculateArea(5.0) << endl;
    cout << "Rectangle Area: " << calc.calculateArea(4.0, 6.0) << endl;
    return 0;
}`
    },
    expectedOutput: "Circle Area: 78.5\nRectangle Area: 24.0",
    whyItWorks: 'The compiler resolves which method to invoke at compile time based on parameter count and types. Clean, intuitive API without separate function names.',
    steps: [
      { step: 'Step 1: Same Method Name', desc: 'Both methods share the intuitive calculateArea name.' },
      { step: 'Step 2: Different Signatures', desc: 'One takes 1 parameter (circle radius), the other takes 2 parameters (width, height).' },
      { step: 'Step 3: Early Binding', desc: 'Compiler binds the exact method address directly during compilation.' }
    ],
    quickTip: 'Overloading is decided at compile time by argument count, types, and sequence.'
  },
  {
    id: 'oops-ex-9',
    topicId: 'method-overriding',
    title: 'Method Overriding: Notification Dispatcher',
    difficulty: 'Medium',
    levelNum: 2,
    concept: 'Method Overriding',
    scenario: 'Implement a Notification base class with send(msg), overridden by EmailNotification and SMSNotification subclasses.',
    whatWeNeed: 'Notification base class with send(), overridden by Email and SMS subclasses with distinctive prefixes.',
    conceptUsed: 'Runtime Polymorphism & Method Overriding (@Override).',
    visualType: 'polymorphism-forms',
    codeSnippets: {
      Java: `class Notification {
    public void send(String msg) {
        System.out.println("Alert: " + msg);
    }
}

class EmailNotification extends Notification {
    @Override
    public void send(String msg) {
        System.out.println("[EMAIL] Sent to inbox: " + msg);
    }
}

class SMSNotification extends Notification {
    @Override
    public void send(String msg) {
        System.out.println("[SMS] Sent to phone: " + msg);
    }
}

public class Main {
    public static void main(String[] args) {
        Notification n1 = new EmailNotification();
        Notification n2 = new SMSNotification();
        n1.send("OTP is 8492");
        n2.send("Your delivery has arrived!");
    }
}`,
      Python: `class Notification:
    def send(self, msg): print("Alert: " + msg)

class EmailNotification(Notification):
    def send(self, msg): print("[EMAIL] Sent to inbox: " + msg)

class SMSNotification(Notification):
    def send(self, msg): print("[SMS] Sent to phone: " + msg)

n1 = EmailNotification()
n2 = SMSNotification()
n1.send("OTP is 8492")
n2.send("Your delivery has arrived!")`,
      'C++': `#include <iostream>
using namespace std;

class Notification {
public:
    virtual void send(string msg) { cout << "Alert: " << msg << endl; }
    virtual ~Notification() = default;
};

class EmailNotification : public Notification {
public:
    void send(string msg) override { cout << "[EMAIL] Sent to inbox: " << msg << endl; }
};

class SMSNotification : public Notification {
public:
    void send(string msg) override { cout << "[SMS] Sent to phone: " << msg << endl; }
};

int main() {
    Notification* n1 = new EmailNotification();
    Notification* n2 = new SMSNotification();
    n1->send("OTP is 8492");
    n2->send("Your delivery has arrived!");
    delete n1; delete n2;
    return 0;
}`
    },
    expectedOutput: "[EMAIL] Sent to inbox: OTP is 8492\n[SMS] Sent to phone: Your delivery has arrived!",
    whyItWorks: 'Subclasses provide customized delivery protocols while matching the base method signature. The runtime selects the appropriate delivery mechanism dynamically.',
    steps: [
      { step: 'Step 1: Declare Base Virtual Method', desc: 'Notification defines the generic send(msg) contract.' },
      { step: 'Step 2: Subclasses Override', desc: 'EmailNotification and SMSNotification provide specialized channel implementations.' },
      { step: 'Step 3: Dynamic Resolution', desc: 'Invoking send() on base reference executes the correct subclass logic.' }
    ],
    quickTip: 'Use @Override to guarantee your method signature matches the parent method exactly.'
  },
  {
    id: 'oops-ex-10',
    topicId: 'aggregation',
    title: 'Aggregation: Department and Teacher System',
    difficulty: 'Medium',
    levelNum: 2,
    concept: 'Aggregation',
    scenario: 'Model a University Department that has Teachers. If the Department closes down, the Teachers still exist (Weak Has-A).',
    whatWeNeed: 'Teacher class and Department class holding a list of Teacher references passed via constructor.',
    conceptUsed: 'Aggregation (Weak Has-A Relationship & Independent Lifecycles).',
    visualType: 'class-vs-object',
    codeSnippets: {
      Java: `import java.util.ArrayList;
import java.util.List;

class Teacher {
    String name;
    Teacher(String name) { this.name = name; }
}

class Department {
    String deptName;
    List<Teacher> teachers; // Weak Has-A (Aggregation)

    Department(String name, List<Teacher> t) {
        this.deptName = name;
        this.teachers = t;
    }

    void printFaculty() {
        System.out.println(deptName + " Faculty Count: " + teachers.size());
    }
}

public class Main {
    public static void main(String[] args) {
        Teacher t1 = new Teacher("Dr. Sharma");
        Teacher t2 = new Teacher("Prof. Verma");
        List<Teacher> faculty = new ArrayList<>();
        faculty.add(t1); faculty.add(t2);

        Department csDept = new Department("Computer Science", faculty);
        csDept.printFaculty();
        // If csDept is deleted, t1 and t2 still exist safely!
    }
}`,
      Python: `class Teacher:
    def __init__(self, name):
        self.name = name

class Department:
    def __init__(self, name, teachers):
        self.name = name
        self.teachers = teachers # Weak Has-A

    def print_faculty(self):
        print(f"{self.name} Faculty Count: {len(self.teachers)}")

t1 = Teacher("Dr. Sharma")
t2 = Teacher("Prof. Verma")
cs_dept = Department("Computer Science", [t1, t2])
cs_dept.print_faculty()`,
      'C++': `#include <iostream>
#include <vector>
using namespace std;

class Teacher {
public:
    string name;
    Teacher(string n) : name(n) {}
};

class Department {
public:
    string deptName;
    vector<Teacher*> teachers; // Pointers: independent lifecycle

    Department(string name, vector<Teacher*> t) : deptName(name), teachers(t) {}

    void printFaculty() {
        cout << deptName << " Faculty Count: " << teachers.size() << endl;
    }
};

int main() {
    Teacher t1("Dr. Sharma");
    Teacher t2("Prof. Verma");
    vector<Teacher*> faculty = { &t1, &t2 };
    Department csDept("Computer Science", faculty);
    csDept.printFaculty();
    return 0;
}`
    },
    expectedOutput: 'Computer Science Faculty Count: 2',
    whyItWorks: 'Teachers exist independently in memory and are simply referenced by Department. Destroying Department leaves the Teacher objects completely intact.',
    steps: [
      { step: 'Step 1: Independent Object Lifecycle', desc: 'Teacher objects are created outside the Department.' },
      { step: 'Step 2: Aggregate Reference', desc: 'Department stores a list of existing Teacher references.' },
      { step: 'Step 3: Lifecycle Safety', desc: 'Department lifecycle ending does not deallocate or destroy Teacher instances.' }
    ],
    quickTip: 'In Aggregation: Child object survives parent destruction (Weak Has-A).'
  },
  {
    id: 'oops-ex-11',
    topicId: 'intro-to-oops',
    title: 'Introduction to OOPS: Procedural vs Object Paradigm',
    difficulty: 'Easy',
    levelNum: 1,
    concept: 'Introduction to OOPS',
    scenario: 'Model a bank customer with encapsulated name and balance instead of loose, unassociated variables.',
    whatWeNeed: 'Customer class that groups state (name, balance) with behavior (deposit) into a unified object.',
    conceptUsed: 'Object-Oriented Paradigm (Packaging State & Behavior into Cohesive Objects).',
    visualType: 'oops-paradigm',
    codeSnippets: {
      Java: `class Customer {
    private String name;
    private double balance;

    public Customer(String name, double initialBalance) {
        this.name = name;
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public void display() {
        System.out.println("Customer " + name + " has balance: $" + balance);
    }
}

public class Main {
    public static void main(String[] args) {
        Customer c = new Customer("Rahul", 1000.0);
        c.deposit(200.0);
        c.display();
    }
}`,
      Python: `class Customer:
    def __init__(self, name, balance):
        self.name = name
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount

    def display(self):
        print(f"Customer {self.name} has balance: \${self.balance:.1f}")

c = Customer("Rahul", 1000.0)
c.deposit(200.0)
c.display()`,
      'C++': `#include <iostream>
using namespace std;

class Customer {
private:
    string name;
    double balance;
public:
    Customer(string n, double b) : name(n), balance(b) {}

    void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    void display() {
        cout << "Customer " << name << " has balance: $" << balance << endl;
    }
};

int main() {
    Customer c("Rahul", 1000.0);
    c.deposit(200.0);
    c.display();
    return 0;
}`
    },
    expectedOutput: 'Customer Rahul has balance: $1200.0',
    whyItWorks: 'In procedural code, variables can be corrupted by any function. In OOPS, the Customer object owns its state and controls how mutations occur.',
    steps: [
      { step: 'Step 1: Declare Class', desc: 'Define Customer with private state (name, balance) and public deposit() method.' },
      { step: 'Step 2: Instantiate Object', desc: 'Create a new Customer instance in heap memory with initial funds.' },
      { step: 'Step 3: State Mutation', desc: 'Invoke deposit() to validate and modify balance safely through object methods.' }
    ],
    quickTip: 'OOPS shifts thinking from "which functions execute sequentially" to "which objects collaborate and own their data".'
  },
  {
    id: 'oops-ex-12',
    topicId: 'constructors',
    title: 'Constructors: Overloaded Student Record Initializers',
    difficulty: 'Easy',
    levelNum: 1,
    concept: 'Constructors',
    scenario: 'Initialize student objects using default constructor, parameterized constructor, and copy constructor.',
    whatWeNeed: 'Student class with multiple constructor overloads initializing name and roll number.',
    conceptUsed: 'Constructors (Default, Parameterized, and Copy Constructor).',
    visualType: 'oops-constructors-diagram',
    codeSnippets: {
      Java: `class Student {
    String name;
    int rollNo;

    // Default Constructor
    Student() {
        this.name = "Unknown";
        this.rollNo = 0;
    }

    // Parameterized Constructor
    Student(String name, int rollNo) {
        this.name = name;
        this.rollNo = rollNo;
    }

    void printRecord() {
        System.out.println("Student: " + name + " (Roll: " + rollNo + ")");
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student();
        Student s2 = new Student("Priya", 101);
        s1.printRecord();
        s2.printRecord();
    }
}`,
      Python: `class Student:
    # Python unified constructor with default parameters
    def __init__(self, name="Unknown", roll_no=0):
        self.name = name
        self.roll_no = roll_no

    def print_record(self):
        print(f"Student: {self.name} (Roll: {self.roll_no})")

s1 = Student()
s2 = Student("Priya", 101)
s1.print_record()
s2.print_record()`,
      'C++': `#include <iostream>
using namespace std;

class Student {
public:
    string name;
    int rollNo;

    // Default Constructor
    Student() : name("Unknown"), rollNo(0) {}

    // Parameterized Constructor
    Student(string n, int r) : name(n), rollNo(r) {}

    void printRecord() {
        cout << "Student: " << name << " (Roll: " << rollNo << ")" << endl;
    }
};

int main() {
    Student s1;
    Student s2("Priya", 101);
    s1.printRecord();
    s2.printRecord();
    return 0;
}`
    },
    expectedOutput: "Student: Unknown (Roll: 0)\nStudent: Priya (Roll: 101)",
    whyItWorks: 'Constructors guarantee that objects never start in an uninitialized or corrupt state upon memory allocation in Heap RAM.',
    steps: [
      { step: 'Step 1: Declare Default Constructor', desc: 'Initializes default baseline values for unconfigured student instances.' },
      { step: 'Step 2: Declare Parameterized Constructor', desc: 'Allows callers to pass concrete identity data at creation time.' },
      { step: 'Step 3: Object Instantiation', desc: 'Constructor runs automatically during memory allocation, ensuring immediate valid state.' }
    ],
    quickTip: 'If you define ANY parameterized constructor, the compiler no longer creates a default zero-argument constructor automatically.'
  },
  {
    id: 'oops-ex-13',
    topicId: 'interfaces',
    title: 'Interfaces: Pluggable PaymentGateway Contract',
    difficulty: 'Medium',
    levelNum: 2,
    concept: 'Interfaces',
    scenario: 'Design a PaymentProcessor that accepts any payment gateway conforming to a PaymentGateway interface.',
    whatWeNeed: 'Interface PaymentGateway with processPayment(amount) and concrete classes CreditCardPayment and UPIPayment.',
    conceptUsed: 'Interface (Pure Contract & 100% Behavioral Abstraction).',
    visualType: 'oops-interfaces-diagram',
    codeSnippets: {
      Java: `interface PaymentGateway {
    void processPayment(double amount);
}

class CreditCardPayment implements PaymentGateway {
    public void processPayment(double amount) {
        System.out.println("Processing Credit Card payment: $" + amount);
    }
}

class UPIPayment implements PaymentGateway {
    public void processPayment(double amount) {
        System.out.println("Processing UPI payment: $" + amount);
    }
}

public class Main {
    public static void main(String[] args) {
        PaymentGateway g1 = new CreditCardPayment();
        PaymentGateway g2 = new UPIPayment();
        g1.processPayment(150.0);
        g2.processPayment(75.0);
    }
}`,
      Python: `from abc import ABC, abstractmethod

class PaymentGateway(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass

class CreditCardPayment(PaymentGateway):
    def process_payment(self, amount):
        print(f"Processing Credit Card payment: \${amount:.1f}")

class UPIPayment(PaymentGateway):
    def process_payment(self, amount):
        print(f"Processing UPI payment: \${amount:.1f}")

g1 = CreditCardPayment()
g2 = UPIPayment()
g1.process_payment(150.0)
g2.process_payment(75.0)`,
      'C++': `#include <iostream>
using namespace std;

// Pure abstract interface in C++
class PaymentGateway {
public:
    virtual void processPayment(double amount) = 0;
    virtual ~PaymentGateway() {}
};

class CreditCardPayment : public PaymentGateway {
public:
    void processPayment(double amount) override {
        cout << "Processing Credit Card payment: $" << amount << endl;
    }
};

class UPIPayment : public PaymentGateway {
public:
    void processPayment(double amount) override {
        cout << "Processing UPI payment: $" << amount << endl;
    }
};

int main() {
    PaymentGateway* g1 = new CreditCardPayment();
    PaymentGateway* g2 = new UPIPayment();
    g1->processPayment(150.0);
    g2->processPayment(75.0);
    delete g1; delete g2;
    return 0;
}`
    },
    expectedOutput: "Processing Credit Card payment: $150.0\nProcessing UPI payment: $75.0",
    whyItWorks: 'The caller depends entirely on the PaymentGateway abstraction, enabling new payment providers to be plugged in without changing client code.',
    steps: [
      { step: 'Step 1: Define Interface Contract', desc: 'Declare processPayment(amount) without any implementation body.' },
      { step: 'Step 2: Implement Interface', desc: 'CreditCardPayment and UPIPayment fulfill the contract with specific protocols.' },
      { step: 'Step 3: Polymorphic Invocation', desc: 'Clients interact through the PaymentGateway interface reference cleanly.' }
    ],
    quickTip: 'Interfaces define WHAT a class must do, not HOW it does it. A class can implement multiple interfaces.'
  },
  {
    id: 'oops-ex-14',
    topicId: 'abstract-classes',
    title: 'Abstract Classes: Appliance Template Pattern',
    difficulty: 'Medium',
    levelNum: 2,
    concept: 'Abstract Classes',
    scenario: 'Create an abstract Appliance class with concrete turnOn()/turnOff() state and an abstract operate() behavior for WashingMachine.',
    whatWeNeed: 'Abstract class Appliance holding brand and powerState with abstract operate() method implemented by WashingMachine.',
    conceptUsed: 'Abstract Class (Partial Abstraction with Shared State and Abstract Methods).',
    visualType: 'abstract-class-vs-interface-spectrum',
    codeSnippets: {
      Java: `abstract class Appliance {
    protected String brand;

    public Appliance(String brand) {
        this.brand = brand;
    }

    public void turnOn() {
        System.out.println("Appliance " + brand + " powered on.");
    }

    public abstract void operate();
}

class WashingMachine extends Appliance {
    public WashingMachine(String brand) {
        super(brand);
    }

    public void operate() {
        System.out.println("WashingMachine spinning at 1200 RPM.");
    }
}

public class Main {
    public static void main(String[] args) {
        Appliance wm = new WashingMachine("Samsung");
        wm.turnOn();
        wm.operate();
    }
}`,
      Python: `from abc import ABC, abstractmethod

class Appliance(ABC):
    def __init__(self, brand):
        self.brand = brand

    def turn_on(self):
        print(f"Appliance {self.brand} powered on.")

    @abstractmethod
    def operate(self):
        pass

class WashingMachine(Appliance):
    def operate(self):
        print("WashingMachine spinning at 1200 RPM.")

wm = WashingMachine("Samsung")
wm.turn_on()
wm.operate()`,
      'C++': `#include <iostream>
using namespace std;

class Appliance {
protected:
    string brand;
public:
    Appliance(string b) : brand(b) {}
    virtual ~Appliance() {}

    void turnOn() {
        cout << "Appliance " << brand << " powered on." << endl;
    }

    virtual void operate() = 0; // Pure virtual
};

class WashingMachine : public Appliance {
public:
    WashingMachine(string b) : Appliance(b) {}
    void operate() override {
        cout << "WashingMachine spinning at 1200 RPM." << endl;
    }
};

int main() {
    Appliance* wm = new WashingMachine("Samsung");
    wm->turnOn();
    wm->operate();
    delete wm;
    return 0;
}`
    },
    expectedOutput: "Appliance Samsung powered on.\nWashingMachine spinning at 1200 RPM.",
    whyItWorks: 'Abstract classes provide shared concrete implementation while forcing subclasses to provide mandatory specialized behaviors.',
    steps: [
      { step: 'Step 1: Declare Abstract Base', desc: 'Appliance provides concrete turnOn() and declares abstract operate().' },
      { step: 'Step 2: Subclass Overrides Contract', desc: 'WashingMachine overrides operate() with specific spinning behavior.' },
      { step: 'Step 3: Polymorphic Base Reference', desc: 'Appliance reference drives both shared concrete logic and overridden behavior.' }
    ],
    quickTip: 'You cannot instantiate an abstract class directly with "new Appliance()"; you must instantiate a concrete subclass.'
  },
  {
    id: 'oops-ex-15',
    topicId: 'static-members',
    title: 'Static Members: Global Object Counter & Utility',
    difficulty: 'Easy',
    levelNum: 1,
    concept: 'Static Members',
    scenario: 'Track the total number of User objects created in the application using a shared static counter variable.',
    whatWeNeed: 'User class with static int userCount incremented in the constructor, and a static getUserCount() helper.',
    conceptUsed: 'Static Members (Class-Level Memory Allocation Shared Across All Instances).',
    visualType: 'concept-comparison-box',
    codeSnippets: {
      Java: `class User {
    private String username;
    private static int userCount = 0; // Shared across all instances

    public User(String username) {
        this.username = username;
        userCount++;
        System.out.println("Created user: " + username);
    }

    public static int getUserCount() {
        return userCount;
    }
}

public class Main {
    public static void main(String[] args) {
        User u1 = new User("Alice");
        User u2 = new User("Bob");
        System.out.println("Total Active Users: " + User.getUserCount());
    }
}`,
      Python: `class User:
    user_count = 0 # Class variable

    def __init__(self, username):
        self.username = username
        User.user_count += 1
        print(f"Created user: {username}")

    @classmethod
    def get_user_count(cls):
        return cls.user_count

u1 = User("Alice")
u2 = User("Bob")
print(f"Total Active Users: {User.get_user_count()}")`,
      'C++': `#include <iostream>
using namespace std;

class User {
private:
    string username;
    static int userCount;
public:
    User(string u) : username(u) {
        userCount++;
        cout << "Created user: " << username << endl;
    }

    static int getUserCount() {
        return userCount;
    }
};

int User::userCount = 0; // Static member definition

int main() {
    User u1("Alice");
    User u2("Bob");
    cout << "Total Active Users: " << User::getUserCount() << endl;
    return 0;
}`
    },
    expectedOutput: "Created user: Alice\nCreated user: Bob\nTotal Active Users: 2",
    whyItWorks: 'Static variables belong to the Class itself in Metaspace/Class RAM, not individual heap instances. Every instance shares the same counter.',
    steps: [
      { step: 'Step 1: Declare Static Member', desc: 'static int userCount is allocated once when the class is loaded.' },
      { step: 'Step 2: Increment on Construction', desc: 'Each new User() execution increments the shared class counter.' },
      { step: 'Step 3: Access via Class Name', desc: 'User.getUserCount() reads the global count without needing an instance reference.' }
    ],
    quickTip: 'Static methods cannot access non-static instance variables or use "this" because static methods execute without any object context.'
  },
  {
    id: 'oops-ex-16',
    topicId: 'this-self',
    title: 'this / self Keyword: Disambiguating Shadowed Fields',
    difficulty: 'Easy',
    levelNum: 1,
    concept: 'this / self Keyword',
    scenario: 'Use this/self to assign constructor arguments to instance fields when parameter names shadow class attribute names.',
    whatWeNeed: 'Employee class with attributes id and name, using this.id = id to differentiate parameter from field.',
    conceptUsed: 'this / self Reference (Implicit Pointer to Current Object Instance).',
    visualType: 'concept-cheat-sheet',
    codeSnippets: {
      Java: `class Employee {
    private int id;
    private String name;

    public Employee(int id, String name) {
        // 'this' refers to current instance variable
        this.id = id;
        this.name = name;
    }

    public void display() {
        System.out.println("Employee [ID: " + this.id + ", Name: " + this.name + "]");
    }
}

public class Main {
    public static void main(String[] args) {
        Employee emp = new Employee(501, "Ananya");
        emp.display();
    }
}`,
      Python: `class Employee:
    def __init__(self, id, name):
        # 'self' explicitly binds arguments to instance
        self.id = id
        self.name = name

    def display(self):
        print(f"Employee [ID: {self.id}, Name: {self.name}]")

emp = Employee(501, "Ananya")
emp.display()`,
      'C++': `#include <iostream>
using namespace std;

class Employee {
private:
    int id;
    string name;
public:
    Employee(int id, string name) {
        // 'this->' is a pointer to the current instance
        this->id = id;
        this->name = name;
    }

    void display() {
        cout << "Employee [ID: " << this->id << ", Name: " << this->name << "]" << endl;
    }
};

int main() {
    Employee emp(501, "Ananya");
    emp.display();
    return 0;
}`
    },
    expectedOutput: 'Employee [ID: 501, Name: Ananya]',
    whyItWorks: 'When parameter name matches field name, parameter shadows field. Using this.fieldName tells compiler to update the heap instance variable.',
    steps: [
      { step: 'Step 1: Parameter Shadowing', desc: 'Constructor arguments id and name hide the object fields of the same name.' },
      { step: 'Step 2: Disambiguation with this', desc: 'this.id explicitly references the instance variable in heap memory.' },
      { step: 'Step 3: Safe Initialization', desc: 'Values are accurately assigned without accidental self-assignment bugs.' }
    ],
    quickTip: 'In Java/C++, "this" is a hidden implicit pointer passed to non-static methods. In Python, "self" is passed explicitly as the first argument.'
  },
  {
    id: 'oops-ex-17',
    topicId: 'super-keyword',
    title: 'super Keyword: Invoking Base Constructor & Methods',
    difficulty: 'Medium',
    levelNum: 2,
    concept: 'super Keyword',
    scenario: 'A Manager class inherits from Employee and uses super() to initialize base employee details before configuring manager department.',
    whatWeNeed: 'Base class Employee with constructor and getDetails(), and derived Manager invoking super(name, salary).',
    conceptUsed: 'super Keyword (Accessing Parent Class Constructors and Overridden Methods).',
    visualType: 'constructor-chain-flow',
    codeSnippets: {
      Java: `class Employee {
    protected String name;
    protected double salary;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public String getDetails() {
        return name + " | Salary: $" + salary;
    }
}

class Manager extends Employee {
    private String department;

    public Manager(String name, double salary, String department) {
        super(name, salary); // Invoke parent constructor
        this.department = department;
    }

    public void display() {
        System.out.println("Manager: " + super.getDetails() + " | Dept: " + department);
    }
}

public class Main {
    public static void main(String[] args) {
        Manager mgr = new Manager("Vikram", 90000.0, "Engineering");
        mgr.display();
    }
}`,
      Python: `class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def get_details(self):
        return f"{self.name} | Salary: \${self.salary:.1f}"

class Manager(Employee):
    def __init__(self, name, salary, department):
        super().__init__(name, salary)
        self.department = department

    def display(self):
        print(f"Manager: {super().get_details()} | Dept: {self.department}")

mgr = Manager("Vikram", 90000.0, "Engineering")
mgr.display()`,
      'C++': `#include <iostream>
using namespace std;

class Employee {
protected:
    string name;
    double salary;
public:
    Employee(string n, double s) : name(n), salary(s) {}

    string getDetails() {
        return name + " | Salary: $" + to_string((int)salary) + ".0";
    }
};

class Manager : public Employee {
private:
    string department;
public:
    Manager(string n, double s, string dept) : Employee(n, s), department(dept) {}

    void display() {
        cout << "Manager: " << Employee::getDetails() << " | Dept: " << department << endl;
    }
};

int main() {
    Manager mgr("Vikram", 90000.0, "Engineering");
    mgr.display();
    return 0;
}`
    },
    expectedOutput: 'Manager: Vikram | Salary: $90000.0 | Dept: Engineering',
    whyItWorks: 'Before subclass heap space is initialized, parent class constructor must execute first via super() to establish base invariants.',
    steps: [
      { step: 'Step 1: Super Constructor Call', desc: 'super(name, salary) delegates initialization of base state to parent class.' },
      { step: 'Step 2: Subclass Extension', desc: 'Manager initializes its specialized department attribute.' },
      { step: 'Step 3: Base Method Access', desc: 'super.getDetails() reuses parent formatting logic without duplication.' }
    ],
    quickTip: 'super() call MUST be the first statement in a derived class constructor in Java and C++.'
  },
  {
    id: 'oops-ex-18',
    topicId: 'association',
    title: 'Association: Independent Teacher and Student Relationship',
    difficulty: 'Easy',
    levelNum: 1,
    concept: 'Association',
    scenario: 'Model Teacher and Student classes where a Teacher teaches students, but both exist completely independently (Uses-A / Has-A).',
    whatWeNeed: 'Teacher class and Student class interacting through methods without ownership lifecycles.',
    conceptUsed: 'Association (Independent Entity Relationship with No Ownership Dependency).',
    visualType: 'oops-association-diagram',
    codeSnippets: {
      Java: `class Student {
    private String name;
    public Student(String name) { this.name = name; }
    public String getName() { return name; }
}

class Teacher {
    private String name;
    public Teacher(String name) { this.name = name; }

    // Association via method parameter (Uses-A)
    public void teach(Student student) {
        System.out.println("Professor " + name + " is teaching Student " + student.getName() + ".");
    }
}

public class Main {
    public static void main(String[] args) {
        Teacher teacher = new Teacher("Mehta");
        Student student = new Student("Rohan");
        teacher.teach(student);
    }
}`,
      Python: `class Student:
    def __init__(self, name):
        self.name = name

class Teacher:
    def __init__(self, name):
        self.name = name

    def teach(self, student):
        print(f"Professor {self.name} is teaching Student {student.name}.")

teacher = Teacher("Mehta")
student = Student("Rohan")
teacher.teach(student)`,
      'C++': `#include <iostream>
using namespace std;

class Student {
public:
    string name;
    Student(string n) : name(n) {}
};

class Teacher {
public:
    string name;
    Teacher(string n) : name(n) {}

    void teach(const Student& student) {
        cout << "Professor " << name << " is teaching Student " << student.name << "." << endl;
    }
};

int main() {
    Teacher teacher("Mehta");
    Student student("Rohan");
    teacher.teach(student);
    return 0;
}`
    },
    expectedOutput: 'Professor Mehta is teaching Student Rohan.',
    whyItWorks: 'Neither Teacher owns Student nor Student owns Teacher. Their lifecycles are completely decoupled.',
    steps: [
      { step: 'Step 1: Independent Lifecycles', desc: 'Teacher and Student are instantiated independently without containment.' },
      { step: 'Step 2: Method Association', desc: 'Teacher associates with Student by receiving Student reference in teach().' },
      { step: 'Step 3: Lifecycle Decoupling', desc: 'Destruction of teacher does not affect student instance in any way.' }
    ],
    quickTip: 'Association is the most general relationship: "Object A uses / communicates with Object B".'
  },
  {
    id: 'oops-ex-19',
    topicId: 'exception-handling',
    title: 'Exception Handling: Guarding Invariants with Custom Exceptions',
    difficulty: 'Hard',
    levelNum: 3,
    concept: 'Exception Handling in OOPS',
    scenario: 'Throw and catch a custom InsufficientFundsException when withdrawal exceeds bank account balance.',
    whatWeNeed: 'Custom Exception class InsufficientFundsException and BankAccount withdraw() method that throws it.',
    conceptUsed: 'Exception Handling in OOPS (Encapsulated Error Objects & Clean Recovery).',
    visualType: 'concept-pipeline-flow',
    codeSnippets: {
      Java: `class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

class Account {
    private double balance;

    public Account(double balance) { this.balance = balance; }

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Withdrawal of $" + amount + " exceeds available balance $" + balance);
        }
        balance -= amount;
    }
}

public class Main {
    public static void main(String[] args) {
        Account acc = new Account(200.0);
        try {
            acc.withdraw(500.0);
        } catch (InsufficientFundsException e) {
            System.out.println("Exception Caught: " + e.getMessage());
        }
    }
}`,
      Python: `class InsufficientFundsException(Exception):
    pass

class Account:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsException(f"Withdrawal of \${amount:.1f} exceeds available balance \${self.balance:.1f}")
        self.balance -= amount

acc = Account(200.0)
try:
    acc.withdraw(500.0)
except InsufficientFundsException as e:
    print(f"Exception Caught: {e}")`,
      'C++': `#include <iostream>
#include <exception>
using namespace std;

class InsufficientFundsException : public exception {
private:
    string msg;
public:
    InsufficientFundsException(string m) : msg(m) {}
    const char* what() const noexcept override {
        return msg.c_str();
    }
};

class Account {
private:
    double balance;
public:
    Account(double b) : balance(b) {}
    void withdraw(double amount) {
        if (amount > balance) {
            throw InsufficientFundsException("Withdrawal of $500.0 exceeds available balance $200.0");
        }
        balance -= amount;
    }
};

int main() {
    Account acc(200.0);
    try {
        acc.withdraw(500.0);
    } catch (const InsufficientFundsException& e) {
        cout << "Exception Caught: " << e.what() << endl;
    }
    return 0;
}`
    },
    expectedOutput: 'Exception Caught: Withdrawal of $500.0 exceeds available balance $200.0',
    whyItWorks: 'Exceptions in OOPS are objects carrying diagnostic metadata. Throwing prevents the object from entering an illegal or corrupted state.',
    steps: [
      { step: 'Step 1: Custom Exception Class', desc: 'Define domain-specific InsufficientFundsException inheriting from standard Exception base.' },
      { step: 'Step 2: Guard Clause & Throw', desc: 'withdraw() checks invariant; if violated, instantiates and throws the exception object.' },
      { step: 'Step 3: Catch & Handle', desc: 'Calling code catches exception and displays informative recovery feedback.' }
    ],
    quickTip: 'Never suppress exceptions with empty catch blocks. Always log or wrap them in descriptive domain exceptions.'
  },
  {
    id: 'oops-ex-20',
    topicId: 'interview-revision',
    title: 'OOPS Interview Benchmark: Full 4-Pillar Order Processing System',
    difficulty: 'Hard',
    levelNum: 3,
    concept: 'OOPS Interview Revision',
    scenario: 'Synthesize Encapsulation, Abstraction, Inheritance, and Polymorphism in an E-Commerce Order and Discount processing pipeline.',
    whatWeNeed: 'Abstract Order class, VIPOrder subclass, Encapsulated items, and Polymorphic applyDiscount() calculation.',
    conceptUsed: 'Comprehensive 4 Pillars Synergy in Placement System Design.',
    visualType: 'oops-four-pillars',
    codeSnippets: {
      Java: `// 1. Abstraction
abstract class Order {
    // 2. Encapsulation
    private double baseAmount;

    public Order(double baseAmount) { this.baseAmount = baseAmount; }
    public double getBaseAmount() { return baseAmount; }

    // 4. Polymorphic method contract
    public abstract double calculateFinalTotal();
}

// 3. Inheritance
class StandardOrder extends Order {
    public StandardOrder(double baseAmount) { super(baseAmount); }
    public double calculateFinalTotal() { return getBaseAmount(); }
}

class VIPOrder extends Order {
    public VIPOrder(double baseAmount) { super(baseAmount); }
    public double calculateFinalTotal() {
        return getBaseAmount() * 0.80; // 20% Discount
    }
}

public class Main {
    public static void main(String[] args) {
        Order o1 = new StandardOrder(100.0);
        Order o2 = new VIPOrder(100.0);
        System.out.println("Standard Order Total: $" + o1.calculateFinalTotal());
        System.out.println("VIP Order Total (20% Off): $" + o2.calculateFinalTotal());
    }
}`,
      Python: `from abc import ABC, abstractmethod

class Order(ABC):
    def __init__(self, base_amount):
        self._base_amount = base_amount

    def get_base_amount(self):
        return self._base_amount

    @abstractmethod
    def calculate_final_total(self):
        pass

class StandardOrder(Order):
    def calculate_final_total(self):
        return self.get_base_amount()

class VIPOrder(Order):
    def calculate_final_total(self):
        return self.get_base_amount() * 0.80

o1 = StandardOrder(100.0)
o2 = VIPOrder(100.0)
print(f"Standard Order Total: \${o1.calculate_final_total():.1f}")
print(f"VIP Order Total (20% Off): \${o2.calculate_final_total():.1f}")`,
      'C++': `#include <iostream>
using namespace std;

class Order {
private:
    double baseAmount;
public:
    Order(double b) : baseAmount(b) {}
    virtual ~Order() {}
    double getBaseAmount() const { return baseAmount; }
    virtual double calculateFinalTotal() = 0;
};

class StandardOrder : public Order {
public:
    StandardOrder(double b) : Order(b) {}
    double calculateFinalTotal() override { return getBaseAmount(); }
};

class VIPOrder : public Order {
public:
    VIPOrder(double b) : Order(b) {}
    double calculateFinalTotal() override { return getBaseAmount() * 0.80; }
};

int main() {
    Order* o1 = new StandardOrder(100.0);
    Order* o2 = new VIPOrder(100.0);
    cout << "Standard Order Total: $" << o1->calculateFinalTotal() << endl;
    cout << "VIP Order Total (20% Off): $" << o2->calculateFinalTotal() << endl;
    delete o1; delete o2;
    return 0;
}`
    },
    expectedOutput: "Standard Order Total: $100.0\nVIP Order Total (20% Off): $80.0",
    whyItWorks: 'Encapsulation guards order lines, Abstraction exposes a clean checkout contract, Inheritance reuses order state, and Polymorphism computes custom discounts.',
    steps: [
      { step: 'Step 1: Encapsulate State', desc: 'baseAmount is stored privately with accessor.' },
      { step: 'Step 2: Abstract Contract', desc: 'Order base class defines abstract calculateFinalTotal().' },
      { step: 'Step 3: Polymorphic Extension', desc: 'StandardOrder and VIPOrder compute final prices according to customer tier.' }
    ],
    quickTip: 'In placement interviews, always articulate which pillar is solving which problem: data integrity -> encapsulation, reusability -> inheritance, flexibility -> polymorphism.'
  }
];
