/**
 * OOPS OFFICIAL SUMMARY & CHEAT SHEET DATA
 * 
 * Official PathPilot Notes:
 * - 4 Pillars of OOPS Summary
 * - Overloading vs Overriding Comparison
 * - Abstract Class vs Interface Comparison
 * - Core Keywords & Access Modifiers Reference
 */

export const OOPS_OFFICIAL_SUMMARY = {
  title: 'Object-Oriented Programming — Official Placement Cheat Sheet',
  subtitle: 'Master the 4 core pillars, polymorphic dispatch rules, keyword behaviors, and design principles.',
  
  fourPillars: [
    {
      pillar: 'Encapsulation',
      tagline: 'Data Security & Hiding',
      rule: 'Declare variables private, provide public getters and setters with validation rules.',
      example: 'BankAccount: balance is private, deposit() verifies amount > 0 before updating.',
      benefit: 'Prevents corrupting internal object state from outside code.'
    },
    {
      pillar: 'Abstraction',
      tagline: 'Complexity Management',
      rule: 'Expose only essential interfaces and contracts, hiding internal implementation machinery.',
      example: 'Vehicle start() pedal: driver does not need to know fuel injection math.',
      benefit: 'Reduces cognitive load and decouples design from implementation.'
    },
    {
      pillar: 'Inheritance',
      tagline: 'Code Reusability & Hierarchy',
      rule: 'Child subclasses derive state and behavior from a generalized parent (Is-A relationship).',
      example: 'Car and Truck extend Vehicle (both inherit speed and wheels).',
      benefit: 'Eliminates redundant boilerplate code across related domains.'
    },
    {
      pillar: 'Polymorphism',
      tagline: 'Multiple Forms, One Interface',
      rule: 'Compile-time (Overloading) or Runtime (Overriding) to invoke specialized behavior through one signature.',
      example: 'shapes[i].draw(): circles draw round, rectangles draw 4 straight lines.',
      benefit: 'Enables open-ended extensibility without modifying existing client loops.'
    }
  ],

  overloadingVsOverriding: {
    title: 'Method Overloading vs Method Overriding',
    columns: ['Feature', 'Method Overloading', 'Method Overriding'],
    rows: [
      { feature: 'Location', overloading: 'Within the SAME class', overriding: 'Across PARENT and CHILD classes' },
      { feature: 'Binding Time', overloading: 'Compile-Time (Static Binding)', overriding: 'Runtime (Dynamic Binding)' },
      { feature: 'Method Name', overloading: 'Must be IDENTICAL', overriding: 'Must be IDENTICAL' },
      { feature: 'Parameters', overloading: 'Must be DIFFERENT (count, types, order)', overriding: 'Must be IDENTICAL' },
      { feature: 'Return Type', overloading: 'Can be same or different (cannot differ ALONE)', overriding: 'Must be same (or covariant subtype)' },
      { feature: 'Private/Static Methods', overloading: 'Can overload private & static methods', overriding: 'CANNOT override private or static methods' },
      { feature: 'Performance', overloading: 'Fastest (zero runtime overhead)', overriding: 'Slight vtable lookup overhead' }
    ]
  },

  abstractClassVsInterface: {
    title: 'Abstract Class vs Interface',
    columns: ['Feature', 'Abstract Class', 'Interface'],
    rows: [
      { feature: 'Core Intent', abstractClass: 'Partial blueprint for closely related classes', interface_: 'Pure contract behavior across unrelated classes' },
      { feature: 'Method Implementation', abstractClass: 'Can have both abstract & concrete methods', interface_: 'Historically abstract only (Java 8+ allows default/static)' },
      { feature: 'Instance Variables', abstractClass: 'Can have stateful instance variables', interface_: 'Variables are implicitly public static final (constants)' },
      { feature: 'Multiple Inheritance', abstractClass: 'Single inheritance (class extends 1 class)', interface_: 'Multiple inheritance (class implements many interfaces)' },
      { feature: 'Constructors', abstractClass: 'Has constructors called via super()', interface_: 'CANNOT have constructors' },
      { feature: 'Access Modifiers', abstractClass: 'Can be public, protected, private', interface_: 'Methods are implicitly public' }
    ]
  },

  keywordsCheatSheet: [
    {
      keyword: 'this (self in Python)',
      meaning: 'Refers to the current invoking object instance.',
      usage: 'Resolves variable shadowing between parameters and instance fields (e.g. this.name = name).'
    },
    {
      keyword: 'super (super() in Python)',
      meaning: 'Refers to the immediate parent superclass.',
      usage: 'Calls parent constructors (super(args)) or parent overridden methods (super.method()).'
    },
    {
      keyword: 'static',
      meaning: 'Belongs to the class itself rather than any individual object instance.',
      usage: 'Shared utility methods (Math.sqrt) or global counters incremented across all instances.'
    },
    {
      keyword: 'final (const in C++)',
      meaning: 'Immutability and restriction modifier.',
      usage: 'Final variable = constant. Final method = cannot be overridden. Final class = cannot be inherited.'
    },
    {
      keyword: 'abstract',
      meaning: 'Declares an incomplete class or method that must be implemented by subclasses.',
      usage: 'Cannot be instantiated directly with `new`.'
    }
  ]
};
