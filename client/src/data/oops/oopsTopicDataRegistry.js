/**
 * MASTER OOPS TOPIC REGISTRY
 * 
 * Provides topic definitions and curriculum progression for PathPilot's OOPS Learning Studio:
 * 20 Canonical OOPS Topics covering fundamentals to interview mastery:
 * 1. Introduction to OOPS
 * 2. Class and Object
 * 3. Encapsulation
 * 4. Abstraction
 * 5. Inheritance
 * 6. Polymorphism
 * 7. Constructors
 * 8. Method Overloading
 * 9. Method Overriding
 * 10. Interfaces
 * 11. Abstract Classes
 * 12. Access Modifiers
 * 13. Static Members
 * 14. this / self Keyword
 * 15. super Keyword
 * 16. Association
 * 17. Aggregation
 * 18. Composition
 * 19. Exception Handling in OOPS
 * 20. OOPS Interview Revision
 */

export const OOPS_TOPIC_REGISTRY = {
  'intro-to-oops': {
    topicId: 'intro-to-oops',
    topicName: 'Introduction to OOPS',
    level: 'Fundamental',
    questionCount: '25 Problems',
    description: 'Core paradigm shift from procedural to object-oriented programming. Real-world modeling, state & behavior.'
  },
  'classes-and-objects': {
    topicId: 'classes-and-objects',
    topicName: 'Class and Object',
    level: 'Fundamental',
    questionCount: '30 Problems',
    description: 'Classes as blueprints and objects as real tangible instances in memory. State (attributes) and behavior (methods).'
  },
  'encapsulation': {
    topicId: 'encapsulation',
    topicName: 'Encapsulation',
    level: 'Core Pillar',
    questionCount: '25 Problems',
    description: 'Bundling data and methods together while restricting direct access. Data hiding, getters, setters, and invariants.'
  },
  'abstraction': {
    topicId: 'abstraction',
    topicName: 'Abstraction',
    level: 'Core Pillar',
    questionCount: '25 Problems',
    description: 'Hiding complex internal implementation details and exposing only essential interfaces to the outside world.'
  },
  'inheritance': {
    topicId: 'inheritance',
    topicName: 'Inheritance',
    level: 'Core Pillar',
    questionCount: '30 Problems',
    description: 'Reusability mechanism where child class derives properties and behaviors from a parent class (Is-A relationship).'
  },
  'polymorphism': {
    topicId: 'polymorphism',
    topicName: 'Polymorphism',
    level: 'Core Pillar',
    questionCount: '30 Problems',
    description: 'One interface, multiple implementations. Compile-time (static) vs Runtime (dynamic) method dispatching.'
  },
  'constructors': {
    topicId: 'constructors',
    topicName: 'Constructors',
    level: 'Core Pattern',
    questionCount: '25 Problems',
    description: 'Special methods invoked upon object creation. Default, parameterized, copy constructors, and constructor chaining.'
  },
  'method-overloading': {
    topicId: 'method-overloading',
    topicName: 'Method Overloading',
    level: 'Core Pattern',
    questionCount: '20 Problems',
    description: 'Compile-time polymorphism where methods share the same name with different parameter signatures.'
  },
  'method-overriding': {
    topicId: 'method-overriding',
    topicName: 'Method Overriding',
    level: 'Core Pattern',
    questionCount: '25 Problems',
    description: 'Runtime polymorphism where subclass provides a specific implementation of a method already declared in superclass.'
  },
  'interfaces': {
    topicId: 'interfaces',
    topicName: 'Interfaces',
    level: 'Intermediate',
    questionCount: '25 Problems',
    description: 'Pure blueprint contracts specifying what a class must do, not how. Achieving multiple inheritance and loose coupling.'
  },
  'abstract-classes': {
    topicId: 'abstract-classes',
    topicName: 'Abstract Classes',
    level: 'Intermediate',
    questionCount: '20 Problems',
    description: 'Incomplete blueprints that cannot be instantiated directly. Containing both abstract and concrete implemented methods.'
  },
  'access-modifiers': {
    topicId: 'access-modifiers',
    topicName: 'Access Modifiers',
    level: 'Fundamental',
    questionCount: '20 Problems',
    description: 'Controlling visibility of classes, attributes, and methods: private, protected, public, and default/package-private.'
  },
  'static-members': {
    topicId: 'static-members',
    topicName: 'Static Members',
    level: 'Intermediate',
    questionCount: '20 Problems',
    description: 'Class-level variables and methods shared across all instances. Memory allocation once in classloader/method area.'
  },
  'this-self': {
    topicId: 'this-self',
    topicName: 'this / self Keyword',
    level: 'Fundamental',
    questionCount: '15 Problems',
    description: 'Reference to current invoking object instance. Resolving variable shadowing and passing current object as argument.'
  },
  'super-keyword': {
    topicId: 'super-keyword',
    topicName: 'super Keyword',
    level: 'Intermediate',
    questionCount: '20 Problems',
    description: 'Explicit reference to immediate parent class. Invoking parent constructors, accessing overridden parent methods.'
  },
  'association': {
    topicId: 'association',
    topicName: 'Association',
    level: 'Advanced',
    questionCount: '15 Problems',
    description: 'Generic relationship between two independent classes (Has-A / Uses-A) with independent object lifecycles.'
  },
  'aggregation': {
    topicId: 'aggregation',
    topicName: 'Aggregation',
    level: 'Advanced',
    questionCount: '15 Problems',
    description: 'Weak Has-A relationship where child object can exist independently of parent container (e.g. Department and Teacher).'
  },
  'composition': {
    topicId: 'composition',
    topicName: 'Composition',
    level: 'Advanced',
    questionCount: '20 Problems',
    description: 'Strong Has-A relationship where child object cannot exist without parent (e.g. House and Rooms, Car and Engine).'
  },
  'exception-handling': {
    topicId: 'exception-handling',
    topicName: 'Exception Handling in OOPS',
    level: 'Advanced',
    questionCount: '20 Problems',
    description: 'OOP class hierarchy of Exceptions and Errors. Custom exception classes, try-catch-finally, and checked vs unchecked.'
  },
  'interview-revision': {
    topicId: 'interview-revision',
    topicName: 'OOPS Interview Revision',
    level: 'Placement Master',
    questionCount: '35 Problems',
    description: 'Top placement questions for TCS, Infosys, Cognizant, Wipro, Capgemini, and product companies with rapid cheat sheets.'
  }
};

export const OOPS_TOPICS_LIST = Object.values(OOPS_TOPIC_REGISTRY);

export const OOPS_TOPIC_ALIASES = {
  'what-is-oops': 'intro-to-oops',
  'what_is_oops': 'intro-to-oops',
  'what-is-oop': 'intro-to-oops',
  'what-is-object-oriented-programming': 'intro-to-oops',
  'intro': 'intro-to-oops',
  'introduction': 'intro-to-oops',
  'introduction-to-oops': 'intro-to-oops',
  'oops': 'intro-to-oops',
  'class-and-object': 'classes-and-objects',
  'class-and-objects': 'classes-and-objects',
  'classes': 'classes-and-objects',
  'objects': 'classes-and-objects',
  'classes-objects': 'classes-and-objects',
  'classes-and-objects-in-oops': 'classes-and-objects',
  'abstract-class': 'abstract-classes',
  'interface': 'interfaces',
  'constructor': 'constructors',
  'access-modifier': 'access-modifiers',
  'static-member': 'static-members',
  'this': 'this-self',
  'self': 'this-self',
  'this-keyword': 'this-self',
  'self-keyword': 'this-self',
  'this-self-keyword': 'this-self',
  'super': 'super-keyword',
  'super-keyword': 'super-keyword',
  'exception-handling-in-oops': 'exception-handling',
  'exception-handling': 'exception-handling',
  'oops-interview-revision': 'interview-revision',
  'interview-revision': 'interview-revision'
};

export function resolveOOPSTopicId(topicId) {
  if (!topicId) return 'intro-to-oops';
  let str = String(topicId).toLowerCase().trim();
  str = str.replace(/&/g, 'and');
  str = str.replace(/[_\s/]+/g, '-');
  str = str.replace(/[^a-z0-9-]+/g, '');
  str = str.replace(/--+/g, '-');
  str = str.replace(/^-|-$/g, '');

  if (OOPS_TOPIC_REGISTRY[str]) return str;
  if (OOPS_TOPIC_ALIASES[str]) return OOPS_TOPIC_ALIASES[str];

  for (const key of Object.keys(OOPS_TOPIC_REGISTRY)) {
    if (str === key || str.includes(key) || key.includes(str)) return key;
  }

  return 'intro-to-oops';
}

export function getOOPSTopic(topicId) {
  if (!topicId) return OOPS_TOPIC_REGISTRY['intro-to-oops'];
  const resolved = resolveOOPSTopicId(topicId);
  return OOPS_TOPIC_REGISTRY[resolved] || OOPS_TOPIC_REGISTRY['intro-to-oops'];
}

/**
 * 5 Canonical OOPS Topic Groups for Grouped Selector
 * References canonical OOPS_TOPIC_REGISTRY keys in canonical pedagogical order
 */
export const OOPS_TOPIC_GROUPS = [
  {
    category: 'Core Concepts',
    topicIds: [
      'intro-to-oops',
      'classes-and-objects',
      'encapsulation',
      'abstraction',
      'inheritance',
      'polymorphism'
    ]
  },
  {
    category: 'Object Construction & Methods',
    topicIds: [
      'constructors',
      'method-overloading',
      'method-overriding'
    ]
  },
  {
    category: 'Advanced OOPS',
    topicIds: [
      'interfaces',
      'abstract-classes',
      'access-modifiers',
      'static-members',
      'this-self',
      'super-keyword'
    ]
  },
  {
    category: 'Object Relationships',
    topicIds: [
      'association',
      'aggregation',
      'composition'
    ]
  },
  {
    category: 'Other',
    topicIds: [
      'exception-handling',
      'interview-revision'
    ]
  }
];

