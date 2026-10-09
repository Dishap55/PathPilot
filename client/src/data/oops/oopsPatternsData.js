/**
 * OOPS COMMON PATTERNS DATA
 * 
 * Reusable design patterns, structural heuristics, visual diagrams,
 * multi-language code snippets, recognition triggers, and common pitfalls.
 */

export const OOPS_COMMON_PATTERNS = [
  {
    id: 'pattern-1',
    name: 'Class to Object Instantiation Pattern',
    category: 'Foundational',
    visualType: 'pattern-class-object',
    explanation: 'Separating structural template definition (Class) from stateful instances (Objects) to allow multiple independent entities with isolated memory.',
    codeSnippets: {
      Java: `Car car1 = new Car("Red");
Car car2 = new Car("Blue");
// car1 and car2 hold independent colors`,
      Python: `car1 = Car("Red")
car2 = Car("Blue")
# car1 and car2 hold independent colors`,
      'C++': `Car car1("Red");
Car car2("Blue");
// car1 and car2 hold independent colors`
    },
    whenToRecognize: 'Whenever your application needs multiple distinct entities that share identical behaviors (e.g. Users, Products, Bank Accounts).',
    commonMistake: 'Storing state directly inside the class definition as static or global variables instead of instance fields, causing one object to accidentally overwrite another.'
  },
  {
    id: 'pattern-2',
    name: 'Encapsulation with Guarded Mutators',
    category: 'Data Protection',
    visualType: 'pattern-encapsulation-guard',
    explanation: 'Hiding internal state variables behind private access modifiers, providing guarded public getters and setters to protect invariants.',
    codeSnippets: {
      Java: `private int age;
public void setAge(int age) {
    if (age >= 0 && age <= 120) this.age = age;
}`,
      Python: `def set_age(self, age):
    if 0 <= age <= 120:
        self.__age = age`,
      'C++': `private: int age;
public: void setAge(int a) {
    if (a >= 0 && a <= 120) age = a;
}`
    },
    whenToRecognize: 'Whenever an attribute has logical constraints (e.g. age cannot be -5, bank balance cannot drop below zero, password must be hashed).',
    commonMistake: 'Providing public setters for every single private field without any validation logic, completely defeating the purpose of encapsulation.'
  },
  {
    id: 'pattern-3',
    name: 'Is-A Inheritance Hierarchy',
    category: 'Code Reusability',
    visualType: 'pattern-inheritance-tree',
    explanation: 'Extracting shared properties and behaviors into a generalized parent superclass to eliminate duplicate code across specialized child classes.',
    codeSnippets: {
      Java: `class Vehicle { int speed; }
class Car extends Vehicle { int airbags; }`,
      Python: `class Vehicle: speed = 0
class Car(Vehicle): airbags = 4`,
      'C++': `class Vehicle { int speed; };
class Car : public Vehicle { int airbags; };`
    },
    whenToRecognize: 'When two or more classes share 70%+ of the same logic and satisfy the sentence: "Child IS-A Parent".',
    commonMistake: 'Forcing inheritance when the relationship is actually "Has-A" (e.g. making Car inherit from Engine instead of Car holding an Engine).'
  },
  {
    id: 'pattern-4',
    name: 'Polymorphic Collection & Dynamic Dispatch',
    category: 'Extensibility',
    visualType: 'pattern-polymorphic-dispatch',
    explanation: 'Treating a diverse group of derived objects through a shared base reference, dispatching the correct method implementation dynamically at runtime.',
    codeSnippets: {
      Java: `List<Shape> shapes = List.of(new Circle(), new Square());
for (Shape s : shapes) s.draw(); // Calls specific draw()`,
      Python: `shapes = [Circle(), Square()]
for s in shapes: s.draw() # Calls specific draw()`,
      'C++': `vector<Shape*> shapes = { new Circle(), new Square() };
for (auto* s : shapes) s->draw(); // Virtual lookup`
    },
    whenToRecognize: 'When your system needs to support new types (e.g. new Payment methods, new Notification channels) without altering client processing loops.',
    commonMistake: 'Using `instanceof` or type-checking switch statements inside loops instead of relying on polymorphic virtual method dispatch.'
  },
  {
    id: 'pattern-5',
    name: 'Compile-Time Method Overloading',
    category: 'API Flexibility',
    visualType: 'pattern-overloading-fork',
    explanation: 'Providing convenient variations of the same operation with different parameter types or counts, resolved with zero runtime performance cost.',
    codeSnippets: {
      Java: `int print(int x) { ... }
int print(String s) { ... }
int print(int x, int y) { ... }`,
      Python: `# Python uses default or *args:
def print_data(x, y=None): ...`,
      'C++': `void print(int x);
void print(string s);
void print(int x, int y);`
    },
    whenToRecognize: 'When a function performs the same conceptual task on different data formats (e.g. logging integers, strings, or dates).',
    commonMistake: 'Attempting to overload methods by changing only the return type, which results in a compile-time error.'
  },
  {
    id: 'pattern-6',
    name: 'Composition over Inheritance (Has-A)',
    category: 'Design Architecture',
    visualType: 'pattern-composition-block',
    explanation: 'Building complex functionality by assembling loosely coupled components rather than inheriting from rigid, deep class hierarchies.',
    codeSnippets: {
      Java: `class Car {
    private Engine engine = new V8Engine(); // Has-A
}`,
      Python: `class Car:
    def __init__(self):
        self.engine = V8Engine() # Has-A`,
      'C++': `class Car {
    Engine engine; // Has-A composition
};`
    },
    whenToRecognize: 'When components can be swapped dynamically at runtime, or when a class merely uses the behavior of another class rather than specializing it.',
    commonMistake: 'Creating a 5-level deep inheritance tree that becomes impossible to refactor when requirements change.'
  }
];
