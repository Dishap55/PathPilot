import React, { useState } from 'react';
import {
  Boxes,
  Lock,
  Unlock,
  Eye,
  GitFork,
  Layers,
  Sparkles,
  ShieldCheck,
  Cpu,
  Car,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  RotateCw,
  Zap,
  Award,
  Play,
  HelpCircle,
  Code2,
  Sliders,
  Power,
  Workflow,
  BookOpen,
  AlertTriangle,
  FileText,
  CreditCard,
  Building,
  GraduationCap,
  Users,
  Smartphone,
  Check,
  X,
  Copy,
  Mail,
  MessageSquare,
  Bell,
  ShoppingCart,
  Calculator,
  RefreshCw
} from 'lucide-react';

/**
 * Master OOPS Visual Diagram Component
 * 
 * Provides interactive, beginner-friendly, visual learning moments for:
 * 1. OOPS Paradigm (State + Behavior Capsule)
 * 2. Class vs Object (Blueprint vs Live Heap Instances)
 * 3. Encapsulation (Vault with Guarded Mutators)
 * 4. Abstraction (Cockpit Dashboard vs Hidden Mechanical Engine)
 * 5. Inheritance (Is-A Hierarchy Tree)
 * 6. Polymorphism (Dynamic Dispatcher & Matrix)
 * 7. Method Overloading (Compile-Time Fork & Pipeline)
 * 8. 4 Pillars Interactive Mind Map
 * 9. Reusable Visual Renderers:
 *    - concept-comparison-box (Without vs With)
 *    - concept-pipeline-flow (Step 1 -> Step 2 -> Step 3 -> Step 4)
 *    - concept-variations-grid (Responsive Variations Cards)
 *    - concept-cheat-sheet (Definition, Syntax, Key Point, Common Trap)
 * 10. OOPS-Specific Diagrams:
 *    - oops-constructors-diagram (Default, Parameterized, Copy)
 *    - student-registration-diagram (Interactive Constructor Flow)
 *    - constructor-types-diagram (Visualizing 5 Constructor Forms)
 *    - constructors-cheat-sheet (Constructor vs Method Matrix)
 *    - overload-resolution-pipeline (4-Stage Compile-Time Matching)
 *    - shopping-cart-overload-diagram (Interactive Overloaded Cart)
 *    - overloading-variations-diagram (Valid Variations vs Return Trap)
 *    - overloading-cheat-sheet (Overloading Rules Summary)
 *    - method-overriding-dispatch (Dynamic VTable Dispatcher)
 *    - notification-overriding-diagram (Multi-Channel Polymorphism)
 *    - overriding-rules-diagram (Access, Covariance, Exception Rules)
 *    - overriding-cheat-sheet (Overloading vs Overriding 5-Point Matrix)
 *    - atm-vault-diagram (ATM Interface -> Validation -> Private Vault -> Transaction)
 *    - oops-interfaces-diagram (Interface -> implements -> Class -> Object)
 *    - UML Association diagram (Teacher ───── teaches ───── Student)
 *    - UML Aggregation diagram (Department ◇──── Teacher)
 *    - UML Composition diagram (Car ◆──── Engine)
 * 11. Safe Fallback: Never renders blank whitespace or undefined.
 */
export default function OOPSVisualDiagram({
  type,
  data = null,
  card = null,
  title = '',
  className = '',
  language = 'Java'
}) {
  // Shared interactive states
  const [selectedEntity, setSelectedEntity] = useState('both');
  const [isLocked, setIsLocked] = useState(true);
  const [activeShape, setActiveShape] = useState('circle');
  const [isEngineRunning, setIsEngineRunning] = useState(false);
  const [selectedOverload, setSelectedOverload] = useState(2);
  const [activePillar, setActivePillar] = useState('encapsulation');
  const [microTooltip, setMicroTooltip] = useState(null);

  // OOPS-Specific interactive states
  const [activeConstructorType, setActiveConstructorType] = useState('parameterized');
  const [atmMode, setAtmMode] = useState('valid'); // 'valid' | 'rogue'
  const [activeInterfaceImpl, setActiveInterfaceImpl] = useState('creditcard');
  const [activeUmlRel, setActiveUmlRel] = useState(() => {
    if (type?.includes('association')) return 'association';
    if (type?.includes('aggregation')) return 'aggregation';
    if (type?.includes('composition')) return 'composition';
    return 'composition';
  });

  // Phase 1 interactive states for Constructors, Overloading, Overriding
  const [activeCartOverload, setActiveCartOverload] = useState('single'); // 'single' | 'bulk' | 'coupon'
  const [activeNotificationType, setActiveNotificationType] = useState('email'); // 'email' | 'sms' | 'push'
  const [activeAnimalDispatch, setActiveAnimalDispatch] = useState('dog'); // 'dog' | 'cat' | 'animal'
  const [activeOverloadVariation, setActiveOverloadVariation] = useState('count'); // 'count' | 'type' | 'order' | 'return_trap'
  const [activeStudentRegSubmitted, setActiveStudentRegSubmitted] = useState(false);
  const [activeOverridingRuleTab, setActiveOverridingRuleTab] = useState('access'); // 'access' | 'return' | 'exceptions' | 'non_override'
  const [activeConstructorVariation, setActiveConstructorVariation] = useState('default'); // 'default' | 'param' | 'copy' | 'chain'

  const handleMicroClick = (term, def) => {
    setMicroTooltip((prev) => (prev?.term === term ? null : { term, def }));
  };

  switch (type) {
    // =======================================================================
    // 1. PARADIGM: State + Behavior in Object Capsule
    // =======================================================================
    case 'oops-paradigm':
    case 'smart-device-object':
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px]">
              Interactive Object Capsule:
            </span>
            <span className="text-[11px] text-[#6574C4] font-bold">
              Click elements to inspect
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* State Box */}
            <div
              onClick={() => handleMicroClick('State (Data)', 'Instance variables holding internal values (brand, speed).')}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer shadow-2xs ${
                microTooltip?.term === 'State (Data)'
                  ? 'bg-indigo-100/80 border-indigo-400 scale-105'
                  : 'bg-white border-[#D9D1C7] hover:border-[#6574C4]'
              }`}
            >
              <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider block">
                State (Data)
              </span>
              <div className="font-mono text-xs text-[#0F172A] mt-1 space-y-0.5">
                <div>brand = &quot;Tesla&quot;</div>
                <div>speed = 65 km/h</div>
              </div>
            </div>

            <div className="font-black text-[#6574C4] text-lg">+</div>

            {/* Behavior Box */}
            <div
              onClick={() => handleMicroClick('Behavior (Methods)', 'Member functions that manipulate or inspect state safely.')}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer shadow-2xs ${
                microTooltip?.term === 'Behavior (Methods)'
                  ? 'bg-emerald-100/80 border-emerald-400 scale-105'
                  : 'bg-white border-[#D9D1C7] hover:border-[#6574C4]'
              }`}
            >
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider block">
                Behavior (Methods)
              </span>
              <div className="font-mono text-xs text-[#0F172A] mt-1 space-y-0.5">
                <div>accelerate(30)</div>
                <div>applyBrakes()</div>
              </div>
            </div>

            <ArrowRight size={18} className="text-[#6574C4] hidden sm:block shrink-0" />
            <ArrowDown size={18} className="text-[#6574C4] sm:hidden shrink-0" />

            {/* Packaged Object Capsule */}
            <div
              onClick={() => handleMicroClick('Object in Heap', 'The actual tangible instance residing in Heap RAM memory.')}
              className={`p-3.5 rounded-2xl bg-[#6574C4] text-white text-center shadow-xs cursor-pointer transition-all ${
                microTooltip?.term === 'Object in Heap' ? 'scale-105 ring-2 ring-indigo-400' : 'hover:scale-[1.02]'
              }`}
            >
              <span className="text-[10px] font-extrabold uppercase tracking-wider block text-indigo-200">
                Packaged Object
              </span>
              <span className="font-black text-sm">myCar Instance</span>
              <span className="block text-[10px] text-indigo-100 font-mono mt-0.5">Heap Address: 0x40A2</span>
            </div>
          </div>

          {/* Educational Micro-Popup */}
          {microTooltip && (
            <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-950 text-xs flex items-center justify-between animate-fadeIn">
              <div>
                <strong className="font-bold text-indigo-900">{microTooltip.term}:</strong> {microTooltip.def}
              </div>
              <button
                type="button"
                onClick={() => setMicroTooltip(null)}
                className="text-indigo-600 hover:text-indigo-900 font-bold ml-2 underline text-[11px]"
              >
                Close
              </button>
            </div>
          )}
        </div>
      );

    // =======================================================================
    // 2. CLASS VS OBJECT: Blueprint -> Multiple Live Instances
    // =======================================================================
    case 'class-vs-object':
    case 'bank-account-instances':
    case 'pattern-class-object':
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px]">
              Blueprint vs Real Instances:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedEntity('blueprint')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  selectedEntity === 'blueprint'
                    ? 'bg-[#6574C4] text-white shadow-2xs'
                    : 'bg-white text-[#475569] border border-[#D9D1C7]'
                }`}
              >
                Blueprint (Class)
              </button>
              <button
                type="button"
                onClick={() => setSelectedEntity('instances')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  selectedEntity === 'instances'
                    ? 'bg-[#6574C4] text-white shadow-2xs'
                    : 'bg-white text-[#475569] border border-[#D9D1C7]'
                }`}
              >
                Real Cars (Objects)
              </button>
              <button
                type="button"
                onClick={() => setSelectedEntity('both')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  selectedEntity === 'both'
                    ? 'bg-[#6574C4] text-white shadow-2xs'
                    : 'bg-white text-[#475569] border border-[#D9D1C7]'
                }`}
              >
                View Both
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Blueprint Column */}
            {(selectedEntity === 'blueprint' || selectedEntity === 'both') && (
              <div
                className={`p-3.5 rounded-xl border-2 border-dashed border-amber-400 bg-amber-50/70 text-center space-y-1 shadow-2xs ${
                  selectedEntity === 'blueprint' ? 'sm:col-span-12' : 'sm:col-span-5'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 text-amber-900 font-extrabold text-xs">
                  <Car size={15} className="text-amber-700" />
                  <span>Class: Car (Blueprint)</span>
                </div>
                <div className="font-mono text-[11px] text-amber-950 font-semibold bg-white/80 p-2 rounded-lg border border-amber-200">
                  <div>String brand;</div>
                  <div>int speed;</div>
                  <div>void accelerate() &#123;...&#125;</div>
                </div>
                <p className="text-[10px] text-amber-800 font-medium pt-1">
                  Lives in Metaspace / Code definition. Allocates <strong>0 bytes</strong> of heap memory!
                </p>
              </div>
            )}

            {selectedEntity === 'both' && (
              <div className="hidden sm:flex sm:col-span-2 items-center justify-center flex-col text-[#6574C4] font-black text-xs">
                <span>new Car()</span>
                <ArrowRight size={20} />
              </div>
            )}

            {/* Objects Column */}
            {(selectedEntity === 'instances' || selectedEntity === 'both') && (
              <div className={`space-y-2 ${selectedEntity === 'instances' ? 'sm:col-span-12' : 'sm:col-span-5'}`}>
                <div className="p-2.5 rounded-xl bg-white border border-[#D9D1C7] shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center">
                      1
                    </span>
                    <div>
                      <span className="font-extrabold text-xs text-[#0F172A] block">car1: Tesla Model 3</span>
                      <span className="text-[10px] text-slate-500 font-mono">speed: 60 km/h &bull; Heap: 0x40A</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    Live Object
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#D9D1C7] shadow-2xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 font-black text-xs flex items-center justify-center">
                      2
                    </span>
                    <div>
                      <span className="font-extrabold text-xs text-[#0F172A] block">car2: BMW M4</span>
                      <span className="text-[10px] text-slate-500 font-mono">speed: 95 km/h &bull; Heap: 0x40B</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-800 text-[10px] font-bold border border-indigo-200">
                    Live Object
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      );

    // =======================================================================
    // 3. ENCAPSULATION: The Vault with Guarded Mutators
    // =======================================================================
    case 'encapsulation-capsule':
    case 'encapsulation-vault':
    case 'pattern-encapsulation-guard':
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px]">
              Interactive Encapsulation Vault:
            </span>
            <button
              type="button"
              onClick={() => setIsLocked((prev) => !prev)}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isLocked
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-emerald-600 text-white shadow-xs'
              }`}
            >
              {isLocked ? <Lock size={12} /> : <Unlock size={12} />}
              <span>{isLocked ? 'State Protected (Private)' : 'Direct Access Allowed (Buggy!)'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            {/* External Client Code */}
            <div className="p-3 bg-white border border-[#D9D1C7] rounded-xl space-y-2">
              <span className="text-[10px] font-black text-[#475569] uppercase tracking-wider block">
                External Client Request
              </span>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="p-1.5 rounded bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-between">
                  <span>acc.deposit(500)</span>
                  <span className="text-emerald-700 font-bold text-[10px]">✓ Valid</span>
                </div>
                <div className={`p-1.5 rounded border flex items-center justify-between ${
                  isLocked ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  <span>acc.balance = -9999</span>
                  <span className="font-bold text-[10px]">
                    {isLocked ? '❌ Blocked by Private' : '⚠️ Corruption Occurred!'}
                  </span>
                </div>
              </div>
            </div>

            {/* The Capsule Shield Core */}
            <div className="p-3.5 bg-white border-2 border-emerald-500 rounded-2xl shadow-xs space-y-2">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-1.5">
                <span className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-600" /> Public Interface Gateway
                </span>
                <span className="font-mono text-[10px] text-emerald-700">deposit() &bull; getBalance()</span>
              </div>

              {/* Private Core */}
              <div className={`p-3 rounded-xl border text-center transition-all ${
                isLocked
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                <div className="flex items-center justify-center gap-1.5 font-mono font-bold text-xs">
                  {isLocked ? <Lock size={13} className="text-rose-600" /> : <Unlock size={13} className="text-emerald-600" />}
                  <span>private double balance = $1,500.00;</span>
                </div>
                <p className="text-[10px] text-slate-600 mt-1">
                  {isLocked
                    ? 'Guarded by validation rules. Direct outside tampering is impossible.'
                    : 'Fields exposed publicly! Any code can set invalid negative numbers.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    // =======================================================================
    // 4. ABSTRACTION: Cockpit Button vs Hidden Complex Engine
    // =======================================================================
    case 'abstraction-screen':
    case 'tv-remote-diagram':
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px]">
              Car Dashboard Abstraction:
            </span>
            <button
              type="button"
              onClick={() => setIsEngineRunning((prev) => !prev)}
              className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isEngineRunning
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-700 text-white shadow-xs'
              }`}
            >
              <Power size={13} />
              <span>{isEngineRunning ? 'Engine: RUNNING (Press to Stop)' : 'Engine: OFF (Press to Start)'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            {/* Exposed Simple Interface */}
            <div className="p-3.5 bg-sky-600 text-white rounded-xl shadow-xs space-y-2">
              <span className="text-[10px] font-black uppercase text-sky-200 block">
                Exposed Simple Interface
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEngineRunning(true)}
                  className="px-3 py-2 bg-white text-sky-950 font-black rounded-lg text-xs shadow-2xs hover:bg-sky-50 cursor-pointer"
                >
                  START ENGINE
                </button>
                <span className="font-mono text-xs">car.start();</span>
              </div>
              <p className="text-[11px] text-sky-100 leading-snug">
                One simple button. The driver needs zero knowledge of thermodynamics or electronic fuel injection!
              </p>
            </div>

            {/* Hidden Engine Mechanics */}
            <div className="p-3 bg-white border border-[#D9D1C7] rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#475569] uppercase tracking-wider">
                  Hidden Behind the Scenes
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isEngineRunning ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {isEngineRunning ? 'Active Combustion' : 'Standby'}
                </span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isEngineRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                  <span>Electronic Fuel Injection (EFI) pulse timing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isEngineRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                  <span>Spark plug 20,000V ignition sequence</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isEngineRunning ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                  <span>Oxygen sensor closed-loop voltage feedback</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    // =======================================================================
    // 5. INHERITANCE: Animal & Vehicle Hierarchy
    // =======================================================================
    case 'inheritance-tree':
    case 'inheritance-chain':
    case 'employee-hierarchy-tree':
    case 'pattern-inheritance-tree':
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px]">
              Is-A Inheritance Tree:
            </span>
            <span className="text-[11px] text-[#6574C4] font-bold">
              Subclasses inherit all parent non-private members
            </span>
          </div>

          <div className="flex flex-col items-center space-y-2">
            {/* Superclass */}
            <div className="px-5 py-2.5 rounded-xl bg-purple-700 text-white font-extrabold text-xs text-center shadow-xs">
              <span className="text-[10px] text-purple-200 uppercase tracking-wider block">Superclass</span>
              Vehicle (brand, speed, start(), stop())
            </div>

            <ArrowDown size={18} className="text-purple-600" />

            {/* Derived Subclasses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
              <div className="p-3 rounded-xl bg-white border border-purple-300 text-center shadow-2xs space-y-1">
                <span className="text-xs font-black text-purple-900 block">Car (Is-A Vehicle)</span>
                <span className="text-[10px] text-slate-500 block">Inherits brand, speed, start()</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 text-[10px] font-bold inline-block border border-purple-200">
                  + airbags, openTrunk()
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white border border-purple-300 text-center shadow-2xs space-y-1">
                <span className="text-xs font-black text-purple-900 block">Bike (Is-A Vehicle)</span>
                <span className="text-[10px] text-slate-500 block">Inherits brand, speed, start()</span>
                <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 text-[10px] font-bold inline-block border border-purple-200">
                  + kickstand()
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    // =======================================================================
    // 6. POLYMORPHISM: Dynamic Method Dispatch Matrix
    // =======================================================================
    case 'polymorphism-forms':
    case 'polymorphic-shapes-matrix':
    case 'pattern-polymorphic-dispatch':
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px]">
              Dynamic Method Dispatcher:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveShape('circle')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                  activeShape === 'circle' ? 'bg-rose-600 text-white' : 'bg-white border border-[#D9D1C7]'
                }`}
              >
                Circle
              </button>
              <button
                type="button"
                onClick={() => setActiveShape('rectangle')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                  activeShape === 'rectangle' ? 'bg-indigo-600 text-white' : 'bg-white border border-[#D9D1C7]'
                }`}
              >
                Rectangle
              </button>
              <button
                type="button"
                onClick={() => setActiveShape('triangle')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                  activeShape === 'triangle' ? 'bg-emerald-600 text-white' : 'bg-white border border-[#D9D1C7]'
                }`}
              >
                Triangle
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Polymorphic Call */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-white text-center shadow-xs">
              <span className="text-[10px] uppercase font-black text-rose-300 block">Single Uniform Call</span>
              <span className="font-mono font-bold text-xs">shape.draw();</span>
            </div>

            <ArrowRight size={18} className="text-[#6574C4] hidden sm:block shrink-0" />
            <ArrowDown size={18} className="text-[#6574C4] sm:hidden shrink-0" />

            {/* Dynamic Result Card */}
            <div className="p-3.5 rounded-xl bg-white border border-[#D9D1C7] shadow-2xs space-y-1 min-w-[220px]">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                V-Table Dynamic Execution:
              </span>
              {activeShape === 'circle' && (
                <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                  <span className="w-5 h-5 rounded-full border-2 border-rose-600 inline-block" />
                  <span>Circle.draw() → Renders curve (Area: πr²)</span>
                </div>
              )}
              {activeShape === 'rectangle' && (
                <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs">
                  <span className="w-6 h-4 border-2 border-indigo-600 inline-block" />
                  <span>Rectangle.draw() → 4 right angles (Area: w × h)</span>
                </div>
              )}
              {activeShape === 'triangle' && (
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                  <span className="w-5 h-4 border-b-2 border-r-2 border-emerald-600 inline-block" />
                  <span>Triangle.draw() → 3 connected vertices</span>
                </div>
              )}
            </div>
          </div>
        </div>
      );

    // =======================================================================
    // 7. METHOD OVERLOADING: Same Name, Different Parameters
    // =======================================================================
    case 'overloading-fork':
    case 'pattern-overloading-fork':
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px]">
              Compile-Time Method Overloading:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedOverload(2)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                  selectedOverload === 2 ? 'bg-[#6574C4] text-white' : 'bg-white border border-[#D9D1C7]'
                }`}
              >
                add(a, b)
              </button>
              <button
                type="button"
                onClick={() => setSelectedOverload(3)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                  selectedOverload === 3 ? 'bg-[#6574C4] text-white' : 'bg-white border border-[#D9D1C7]'
                }`}
              >
                add(a, b, c)
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-xl bg-[#6574C4] text-white font-black text-xs text-center shadow-xs">
              add()
            </div>

            <GitFork size={22} className="text-[#6574C4] rotate-90 shrink-0" />

            <div className="space-y-1.5 font-mono text-[11px]">
              <div className={`px-3 py-1.5 rounded-lg border transition-all ${
                selectedOverload === 2
                  ? 'bg-indigo-100 border-indigo-400 text-indigo-900 font-bold scale-105'
                  : 'bg-white border-[#D9D1C7] text-slate-600'
              }`}>
                add(int a, int b) → 2 parameters
              </div>
              <div className={`px-3 py-1.5 rounded-lg border transition-all ${
                selectedOverload === 3
                  ? 'bg-indigo-100 border-indigo-400 text-indigo-900 font-bold scale-105'
                  : 'bg-white border-[#D9D1C7] text-slate-600'
              }`}>
                add(int a, int b, int c) → 3 parameters
              </div>
            </div>
          </div>
        </div>
      );

    // =======================================================================
    // 8. 4 PILLARS INTERACTIVE MIND MAP
    // =======================================================================
    case 'oops-four-pillars':
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px]">
              Interactive 4 Pillars Mind Map:
            </span>
            <span className="text-[11px] text-[#6574C4] font-bold">
              Click any pillar to inspect definition
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            {/* Encapsulation */}
            <div
              onClick={() => setActivePillar('encapsulation')}
              className={`p-3 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                activePillar === 'encapsulation'
                  ? 'bg-indigo-100/80 border-indigo-400 ring-2 ring-indigo-300'
                  : 'bg-white border-[#D9D1C7] hover:border-[#6574C4]'
              }`}
            >
              <Lock size={16} className="mx-auto text-indigo-600 mb-1" />
              <span className="font-black text-xs block text-[#0F172A]">Encapsulation</span>
              <span className="text-[10px] text-slate-500 font-semibold">Data Hiding & Capsule</span>
            </div>

            {/* Abstraction */}
            <div
              onClick={() => setActivePillar('abstraction')}
              className={`p-3 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                activePillar === 'abstraction'
                  ? 'bg-sky-100/80 border-sky-400 ring-2 ring-sky-300'
                  : 'bg-white border-[#D9D1C7] hover:border-[#6574C4]'
              }`}
            >
              <Eye size={16} className="mx-auto text-sky-600 mb-1" />
              <span className="font-black text-xs block text-[#0F172A]">Abstraction</span>
              <span className="text-[10px] text-slate-500 font-semibold">Hiding Complexity</span>
            </div>

            {/* Inheritance */}
            <div
              onClick={() => setActivePillar('inheritance')}
              className={`p-3 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                activePillar === 'inheritance'
                  ? 'bg-purple-100/80 border-purple-400 ring-2 ring-purple-300'
                  : 'bg-white border-[#D9D1C7] hover:border-[#6574C4]'
              }`}
            >
              <GitFork size={16} className="mx-auto text-purple-600 mb-1" />
              <span className="font-black text-xs block text-[#0F172A]">Inheritance</span>
              <span className="text-[10px] text-slate-500 font-semibold">Code Reusability (Is-A)</span>
            </div>

            {/* Polymorphism */}
            <div
              onClick={() => setActivePillar('polymorphism')}
              className={`p-3 rounded-xl border transition-all cursor-pointer shadow-2xs ${
                activePillar === 'polymorphism'
                  ? 'bg-rose-100/80 border-rose-400 ring-2 ring-rose-300'
                  : 'bg-white border-[#D9D1C7] hover:border-[#6574C4]'
              }`}
            >
              <Layers size={16} className="mx-auto text-rose-600 mb-1" />
              <span className="font-black text-xs block text-[#0F172A]">Polymorphism</span>
              <span className="text-[10px] text-slate-500 font-semibold">Multiple Forms</span>
            </div>
          </div>

          {/* Active Pillar Drill-Down Explanation */}
          <div className="p-3 bg-white border border-[#D9D1C7] rounded-xl text-xs space-y-1">
            {activePillar === 'encapsulation' && (
              <div>
                <strong className="text-indigo-900 font-black">Encapsulation Summary:</strong> Keeping internal data private and providing controlled getter and setter methods with validation.
              </div>
            )}
            {activePillar === 'abstraction' && (
              <div>
                <strong className="text-sky-900 font-black">Abstraction Summary:</strong> Hiding internal mechanical complexity behind simple, clean interfaces (e.g. Car Start button).
              </div>
            )}
            {activePillar === 'inheritance' && (
              <div>
                <strong className="text-purple-900 font-black">Inheritance Summary:</strong> Deriving properties from superclasses to eliminate duplicate code (Is-A relationship).
              </div>
            )}
            {activePillar === 'polymorphism' && (
              <div>
                <strong className="text-rose-900 font-black">Polymorphism Summary:</strong> Triggering different behaviors via a single uniform method call depending on object type.
              </div>
            )}
          </div>
        </div>
      );

    // =======================================================================
    // 9. REUSABLE A: CONCEPT COMPARISON BOX (Without vs With)
    // =======================================================================
    case 'concept-comparison-box':
    case 'class-need-comparison':
    case 'inheritance-need-comparison':
    case 'polymorphism-need-comparison':
    case 'abstraction-need-diagram':
    case 'encapsulation-need-diagram':
    case 'procedural-vs-oops':
    case 'constructor-need-comparison':
    case 'overloading-need-comparison':
    case 'overriding-need-comparison': {
      const withoutTitle =
        card?.withoutVsWith?.withoutTitle ||
        data?.withoutVsWith?.withoutTitle ||
        'Without Concept (Procedural Problem)';
      const withoutPoints =
        card?.withoutVsWith?.withoutPoints ||
        data?.withoutVsWith?.withoutPoints || [
          'Scattered loose variables and disconnected functions',
          'Rogue modifications can corrupt data from anywhere in the codebase',
          'Difficult to maintain, reuse, or scale as complexity grows'
        ];
      const withTitle =
        card?.withoutVsWith?.withTitle ||
        data?.withoutVsWith?.withTitle ||
        'With Concept (Object-Oriented Solution)';
      const withPoints =
        card?.withoutVsWith?.withPoints ||
        data?.withoutVsWith?.withPoints || [
          'State and behavior encapsulated into cohesive, protected units',
          'Invariants enforced via guarded methods and clean boundaries',
          'High modularity, robust reusability, and safe team development'
        ];

      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Boxes size={13} className="text-[#6574C4]" />
              <span>Comparative Architectural Analysis:</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
              Problem vs Solution
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
            {/* Left: Without Concept */}
            <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/60 flex flex-col justify-between space-y-2">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-rose-900 font-extrabold text-xs">
                  <X size={14} className="text-rose-600 shrink-0" />
                  <span>{withoutTitle}</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-rose-950 font-medium leading-relaxed">
                  {withoutPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold mt-0.5">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-rose-200/80 text-[10px] font-bold text-rose-800 uppercase tracking-wider">
                Risk: Fragile State & Bugs
              </div>
            </div>

            {/* Right: With Concept */}
            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 flex flex-col justify-between space-y-2">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-900 font-extrabold text-xs">
                  <Check size={14} className="text-emerald-600 shrink-0" />
                  <span>{withTitle}</span>
                </div>
                <ul className="space-y-1.5 text-[11px] text-emerald-950 font-medium leading-relaxed">
                  {withPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-emerald-200/80 text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                Advantage: Clean & Protected Code
              </div>
            </div>
          </div>
        </div>
      );
    }

    // =======================================================================
    // 10. REUSABLE B: CONCEPT PIPELINE FLOW (Step 1 -> Step 2 -> ...)
    // =======================================================================
    case 'concept-pipeline-flow':
    case 'oops-lifecycle-flow':
    case 'constructor-chain-flow':
    case 'abstraction-contract-flow':
    case 'vtable-dispatch-diagram':
    case 'overload-resolution-pipeline': {
      const pipelineSteps = card?.flowPipeline || card?.flowSteps || data?.steps || [
        { step: 1, label: 'Declaration', desc: 'Define class template, attributes, and method signatures in code.' },
        { step: 2, label: 'Memory Allocation', desc: 'Runtime requests memory space in Heap RAM for new object instance.' },
        { step: 3, label: 'Initialization', desc: 'Constructor assigns starting state and validates initial invariants.' },
        { step: 4, label: 'Object Execution', desc: 'Reference variable accesses methods and manipulates encapsulated state.' }
      ];

      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Workflow size={13} className="text-[#6574C4]" />
              <span>Execution Pipeline Flow:</span>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">Sequential Execution Order</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            {pipelineSteps.map((st, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white border border-[#D9D1C7] shadow-2xs space-y-1.5 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="w-5 h-5 rounded-md bg-[#6574C4] text-white font-black text-[10px] flex items-center justify-center">
                      {st.step || idx + 1}
                    </span>
                    {idx < pipelineSteps.length - 1 && (
                      <ArrowRight size={13} className="text-slate-400 hidden sm:block" />
                    )}
                  </div>
                  <span className="text-xs font-black text-[#0F172A] block pt-0.5">
                    {st.label || st.step}
                  </span>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // =======================================================================
    // 11. REUSABLE C: CONCEPT VARIATIONS GRID
    // =======================================================================
    case 'concept-variations-grid':
    case 'inheritance-types-grid':
    case 'polymorphism-types-diagram':
    case 'encapsulation-levels': {
      let variationsList = card?.variations || data?.variations || null;

      if (!variationsList) {
        if (type?.includes('encapsulation')) {
          variationsList = [
            { type: 'Private', name: 'private', desc: 'Restricted strictly to the declaring class body. Hidden from all outside code.' },
            { type: 'Protected', name: 'protected', desc: 'Accessible within package and any child subclass through inheritance.' },
            { type: 'Public', name: 'public', desc: 'Openly accessible to any calling code or external module across the application.' }
          ];
        } else if (type?.includes('inheritance')) {
          variationsList = [
            { type: 'Single', name: 'Single Inheritance', desc: 'Class B extends Class A directly (1 Parent -> 1 Child).' },
            { type: 'Multilevel', name: 'Multilevel Inheritance', desc: 'Class C extends Class B which extends Class A in a linear hierarchy.' },
            { type: 'Hierarchical', name: 'Hierarchical Inheritance', desc: 'Multiple classes (B and C) both extend the same Parent Class A.' },
            { type: 'Multiple (Interfaces)', name: 'Multiple via Interface', desc: 'Class implements multiple interface contracts safely without diamond ambiguity.' }
          ];
        } else {
          variationsList = [
            { type: 'Compile-Time', name: 'Static Polymorphism', desc: 'Resolved early by compiler (e.g. Method Overloading & Operator Overloading).' },
            { type: 'Runtime', name: 'Dynamic Polymorphism', desc: 'Resolved dynamically at execution time via virtual table dispatch (Method Overriding).' }
          ];
        }
      }

      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Layers size={13} className="text-[#6574C4]" />
              <span>Core Variations & Forms:</span>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">{variationsList.length} Variations</span>
          </div>

          <div className={`grid grid-cols-1 gap-2.5 ${variationsList.length > 2 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
            {variationsList.map((v, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white border border-[#D9D1C7] shadow-2xs space-y-1.5 hover:border-[#6574C4]/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-900 border border-indigo-200 text-[10px] font-bold">
                    {v.type || `Variation ${idx + 1}`}
                  </span>
                </div>
                <strong className="text-xs text-[#0F172A] block">{v.name}</strong>
                <p className="text-[11px] text-slate-600 leading-snug">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // =======================================================================
    // 12. REUSABLE D: CONCEPT CHEAT SHEET
    // =======================================================================
    case 'concept-cheat-sheet':
    case 'oops-cheat-sheet':
    case 'class-cheat-sheet':
    case 'encapsulation-cheat-sheet':
    case 'abstraction-cheat-sheet':
    case 'inheritance-cheat-sheet':
    case 'polymorphism-cheat-sheet': {
      const sheet = card?.cheatSheet || {};
      const def = sheet.definition || card?.simpleDef || 'Fundamental object-oriented building block.';
      const syn = sheet.syntax || 'class ClassName { ... }';
      const keyPt = sheet.keyPoint || card?.highlights?.quickRemember || 'Binds state and behavior into coherent objects.';
      const trap = sheet.commonTrap || card?.highlights?.commonMistake || 'Bypassing access mutators or tight coupling.';

      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FileText size={13} className="text-[#6574C4]" />
              <span>Rapid Revision Cheat Sheet:</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Exam & Placement Essentials
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Definition Box */}
            <div className="p-3 rounded-xl bg-white border border-[#D9D1C7] shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider flex items-center gap-1">
                <BookOpen size={12} /> Definition
              </span>
              <p className="text-[11px] text-[#0F172A] font-medium leading-snug">{def}</p>
            </div>

            {/* Syntax Box */}
            <div className="p-3 rounded-xl bg-white border border-[#D9D1C7] shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase text-purple-700 tracking-wider flex items-center gap-1">
                <Code2 size={12} /> Core Syntax
              </span>
              <pre className="font-mono text-[10px] text-purple-950 bg-purple-50/70 p-1.5 rounded-md border border-purple-200 overflow-x-auto whitespace-pre-wrap">
                {syn}
              </pre>
            </div>

            {/* Key Point Box */}
            <div className="p-3 rounded-xl bg-white border border-[#D9D1C7] shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider flex items-center gap-1">
                <Sparkles size={12} /> Key Takeaway
              </span>
              <p className="text-[11px] text-[#0F172A] font-medium leading-snug">{keyPt}</p>
            </div>

            {/* Common Trap Box */}
            <div className="p-3 rounded-xl bg-white border border-[#D9D1C7] shadow-2xs space-y-1">
              <span className="text-[10px] font-black uppercase text-rose-700 tracking-wider flex items-center gap-1">
                <AlertTriangle size={12} /> Common Trap
              </span>
              <p className="text-[11px] text-[#0F172A] font-medium leading-snug">{trap}</p>
            </div>
          </div>
        </div>
      );
    }

    // =======================================================================
    // 13. OOPS SPECIFIC: CONSTRUCTORS DIAGRAM
    // =======================================================================
    case 'oops-constructors-diagram':
    case 'constructors-diagram': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Zap size={13} className="text-[#6574C4]" />
              <span>Constructor Object Lifecycle:</span>
            </span>

            {/* Constructor Type Selector */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveConstructorType('default')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  activeConstructorType === 'default'
                    ? 'bg-[#6574C4] text-white'
                    : 'bg-white text-slate-600 border border-[#D9D1C7]'
                }`}
              >
                Default
              </button>
              <button
                type="button"
                onClick={() => setActiveConstructorType('parameterized')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  activeConstructorType === 'parameterized'
                    ? 'bg-[#6574C4] text-white'
                    : 'bg-white text-slate-600 border border-[#D9D1C7]'
                }`}
              >
                Parameterized
              </button>
              <button
                type="button"
                onClick={() => setActiveConstructorType('copy')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  activeConstructorType === 'copy'
                    ? 'bg-[#6574C4] text-white'
                    : 'bg-white text-slate-600 border border-[#D9D1C7]'
                }`}
              >
                Copy
              </button>
            </div>
          </div>

          {/* Visual Lifecycle Steps: Class -> Constructor -> Heap Allocation -> Initialized Object */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-center text-center">
            {/* 1. Class Blueprint */}
            <div className="p-3 bg-white border border-[#D9D1C7] rounded-xl space-y-1 shadow-2xs">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Step 1</span>
              <strong className="text-xs text-[#0F172A] block">Class Blueprint</strong>
              <span className="font-mono text-[10px] text-slate-600 block">class Student &#123; ... &#125;</span>
            </div>

            {/* 2. Constructor Call */}
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1 shadow-2xs">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider block">Step 2</span>
              <strong className="text-xs text-indigo-950 block">Constructor Invoked</strong>
              <span className="font-mono text-[10px] text-indigo-800 block">
                {activeConstructorType === 'default' && 'new Student()'}
                {activeConstructorType === 'parameterized' && 'new Student("Priya", 101)'}
                {activeConstructorType === 'copy' && 'new Student(original)'}
              </span>
            </div>

            {/* 3. Heap RAM Allocation */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1 shadow-2xs">
              <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider block">Step 3</span>
              <strong className="text-xs text-amber-950 block">Memory Reserved</strong>
              <span className="font-mono text-[10px] text-amber-800 block">Heap: 0x51B0 (24 bytes)</span>
            </div>

            {/* 4. Initialized Object */}
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl space-y-1 shadow-2xs">
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider block">Step 4</span>
              <strong className="text-xs text-emerald-950 block">Initialized Object</strong>
              <span className="font-mono text-[10px] text-emerald-900 block">
                {activeConstructorType === 'default' && '{ name: null, roll: 0 }'}
                {activeConstructorType === 'parameterized' && '{ name: "Priya", roll: 101 }'}
                {activeConstructorType === 'copy' && '{ clone of original }'}
              </span>
            </div>
          </div>

          {/* Constructor Type Details */}
          <div className="p-3 bg-white border border-[#D9D1C7] rounded-xl text-xs space-y-1">
            <strong className="text-indigo-950 block font-bold">
              {activeConstructorType === 'default' && 'Default Constructor (Zero Parameters):'}
              {activeConstructorType === 'parameterized' && 'Parameterized Constructor (Custom Parameters):'}
              {activeConstructorType === 'copy' && 'Copy Constructor (Clones another instance):'}
            </strong>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {activeConstructorType === 'default' &&
                'Provided by compiler if no constructors are declared. Initializes fields to default zero/null values.'}
              {activeConstructorType === 'parameterized' &&
                'Accepts initial arguments directly upon instantiation. Prevents objects from ever starting in an invalid state.'}
              {activeConstructorType === 'copy' &&
                'Creates a new independent heap copy by reading attributes from an existing object reference.'}
            </p>
          </div>
        </div>
      );
    }

    // =======================================================================
    // 14. OOPS SPECIFIC: ATM VAULT DIAGRAM
    // =======================================================================
    case 'atm-vault-diagram':
    case 'atm-diagram':
    case 'bank-vault-diagram': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>ATM Encapsulation Security Vault:</span>
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setAtmMode('valid')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  atmMode === 'valid'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-[#D9D1C7]'
                }`}
              >
                Test Valid Withdrawal ($200)
              </button>
              <button
                type="button"
                onClick={() => setAtmMode('rogue')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  atmMode === 'rogue'
                    ? 'bg-rose-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-[#D9D1C7]'
                }`}
              >
                Test Direct Theft (acc.balance = -999)
              </button>
            </div>
          </div>

          {/* ATM Pipeline: User -> ATM Interface -> Validation Guard -> Protected Data -> Transaction */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center text-center">
            {/* 1. User */}
            <div className="p-3 bg-white border border-[#D9D1C7] rounded-xl space-y-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">1. Client</span>
              <strong className="text-xs text-[#0F172A] block">Account Holder</strong>
              <span className="text-[10px] text-slate-500 block">Inserts card & enters PIN</span>
            </div>

            {/* 2. ATM Interface */}
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl space-y-1">
              <span className="text-[10px] font-black text-sky-700 uppercase tracking-wider block">2. Public API</span>
              <strong className="text-xs text-sky-950 block">ATM Interface</strong>
              <span className="font-mono text-[10px] text-sky-800 block">withdraw(200)</span>
            </div>

            {/* 3. Validation */}
            <div className={`p-3 rounded-xl border space-y-1 ${
              atmMode === 'valid' ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'
            }`}>
              <span className="text-[10px] font-black uppercase tracking-wider block">3. Invariant Check</span>
              <strong className="text-xs block">
                {atmMode === 'valid' ? 'Validation PASSED' : 'Direct Mutation BLOCKED'}
              </strong>
              <span className="text-[10px] block">
                {atmMode === 'valid' ? 'PIN correct & funds >= $200' : 'private modifier denies outside access'}
              </span>
            </div>

            {/* 4. Vault Data */}
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl space-y-1">
              <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider block">4. Data Vault</span>
              <strong className="text-xs text-amber-950 block">Protected State</strong>
              <span className="font-mono text-[10px] text-amber-900 block">private double balance</span>
            </div>

            {/* 5. Transaction Output */}
            <div className={`p-3 rounded-xl border space-y-1 ${
              atmMode === 'valid' ? 'bg-emerald-100/70 border-emerald-400 text-emerald-950' : 'bg-rose-100/70 border-rose-400 text-rose-950'
            }`}>
              <span className="text-[10px] font-black uppercase tracking-wider block">5. Result</span>
              <strong className="text-xs block">
                {atmMode === 'valid' ? 'Cash Dispensed: $200' : 'Security Alert: Access Denied'}
              </strong>
              <span className="text-[10px] block">
                {atmMode === 'valid' ? 'Remaining: $1,300' : 'Balance remains unharmed'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-600 text-center leading-snug">
            <strong>Key Insight:</strong> Internal state (bank balance) is NEVER directly exposed. External actors can only interact through validated public methods.
          </p>
        </div>
      );
    }

    // =======================================================================
    // 15. OOPS SPECIFIC: INTERFACES DIAGRAM
    // =======================================================================
    case 'oops-interfaces-diagram':
    case 'interfaces-diagram':
    case 'interface-contract': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CreditCard size={13} className="text-[#6574C4]" />
              <span>Interface Contract Implementation Flow:</span>
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveInterfaceImpl('creditcard')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  activeInterfaceImpl === 'creditcard'
                    ? 'bg-[#6574C4] text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-[#D9D1C7]'
                }`}
              >
                Credit Card Impl
              </button>
              <button
                type="button"
                onClick={() => setActiveInterfaceImpl('upi')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  activeInterfaceImpl === 'upi'
                    ? 'bg-[#6574C4] text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-[#D9D1C7]'
                }`}
              >
                UPI Impl
              </button>
            </div>
          </div>

          {/* Interface -> implements -> Class -> Object */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 items-center text-center">
            {/* 1. Interface Contract */}
            <div className="p-3 bg-purple-50 border-2 border-dashed border-purple-300 rounded-xl space-y-1 shadow-2xs">
              <span className="text-[10px] font-black text-purple-700 uppercase tracking-wider block">
                &laquo;interface&raquo;
              </span>
              <strong className="text-xs text-purple-950 block">PaymentGateway</strong>
              <span className="font-mono text-[10px] text-purple-800 block">+pay(double amount)</span>
            </div>

            {/* Implements arrow */}
            <div className="hidden sm:flex items-center justify-center flex-col text-slate-400 font-bold text-[10px]">
              <span>implements</span>
              <ArrowRight size={18} className="text-[#6574C4]" />
            </div>

            {/* 2. Concrete Class */}
            <div className="p-3 bg-white border border-[#D9D1C7] rounded-xl space-y-1 shadow-2xs">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Concrete Class</span>
              <strong className="text-xs text-[#0F172A] block">
                {activeInterfaceImpl === 'creditcard' ? 'CreditCardPayment' : 'UPIPayment'}
              </strong>
              <span className="font-mono text-[10px] text-emerald-700 block">
                {activeInterfaceImpl === 'creditcard' ? 'pay() { authCard(); }' : 'pay() { scanQR(); }'}
              </span>
            </div>

            {/* 3. Live Object Call */}
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1 shadow-2xs">
              <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider block">Polymorphic Call</span>
              <strong className="text-xs text-indigo-950 block">gateway.pay(150.0);</strong>
              <span className="text-[10px] text-indigo-800 block">
                {activeInterfaceImpl === 'creditcard' ? 'Charged VISA card' : 'Transferred via UPI ID'}
              </span>
            </div>
          </div>

          <div className="p-2.5 bg-white rounded-lg border border-[#D9D1C7] text-[11px] text-slate-600">
            <strong>Key Benefit:</strong> Client code depends only on <code>PaymentGateway</code>, allowing new payment methods to be added with zero changes to existing checkout logic.
          </div>
        </div>
      );
    }

    // =======================================================================
    // 16. OOPS SPECIFIC: UML RELATIONSHIPS (Association, Aggregation, Composition)
    // =======================================================================
    case 'oops-association-diagram':
    case 'uml-association':
    case 'oops-aggregation-diagram':
    case 'uml-aggregation':
    case 'oops-composition-diagram':
    case 'uml-composition':
    case 'pattern-composition-block': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <GitFork size={13} className="text-[#6574C4]" />
              <span>UML Object Relationships:</span>
            </span>

            {/* Relationship Type Selector */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveUmlRel('association')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  activeUmlRel === 'association'
                    ? 'bg-[#6574C4] text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-[#D9D1C7]'
                }`}
              >
                Association (Uses-A)
              </button>
              <button
                type="button"
                onClick={() => setActiveUmlRel('aggregation')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  activeUmlRel === 'aggregation'
                    ? 'bg-[#6574C4] text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-[#D9D1C7]'
                }`}
              >
                Aggregation (Has-A ◇)
              </button>
              <button
                type="button"
                onClick={() => setActiveUmlRel('composition')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  activeUmlRel === 'composition'
                    ? 'bg-[#6574C4] text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-[#D9D1C7]'
                }`}
              >
                Composition (Owns-A ◆)
              </button>
            </div>
          </div>

          {/* Visual Relationship Diagram */}
          <div className="p-4 bg-white border border-[#D9D1C7] rounded-xl flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            {/* Entity A */}
            <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/70 min-w-[140px] space-y-1">
              <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider block">Parent / Container</span>
              <strong className="text-sm font-black text-indigo-950 block">
                {activeUmlRel === 'association' && 'Teacher'}
                {activeUmlRel === 'aggregation' && 'Department'}
                {activeUmlRel === 'composition' && 'Car'}
              </strong>
            </div>

            {/* Relationship Connector */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-xs text-[#6574C4]">
                {activeUmlRel === 'association' && (
                  <>
                    <span className="font-mono text-slate-400">─────</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">teaches</span>
                    <span className="font-mono text-slate-400">─────</span>
                  </>
                )}
                {activeUmlRel === 'aggregation' && (
                  <>
                    <span className="text-amber-600 font-mono text-base">◇─────</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px]">has-a (weak)</span>
                    <span className="font-mono text-slate-400">─────</span>
                  </>
                )}
                {activeUmlRel === 'composition' && (
                  <>
                    <span className="text-rose-600 font-mono text-base">◆─────</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 text-[10px]">owns-a (strong)</span>
                    <span className="font-mono text-slate-400">─────</span>
                  </>
                )}
              </div>
              <span className="text-[10px] text-slate-500 font-medium">
                {activeUmlRel === 'association' && 'Independent Lifecycles'}
                {activeUmlRel === 'aggregation' && 'Open Diamond (Weak Ownership)'}
                {activeUmlRel === 'composition' && 'Filled Diamond (Strong Ownership)'}
              </span>
            </div>

            {/* Entity B */}
            <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/70 min-w-[140px] space-y-1">
              <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider block">Child / Associated</span>
              <strong className="text-sm font-black text-emerald-950 block">
                {activeUmlRel === 'association' && 'Student'}
                {activeUmlRel === 'aggregation' && 'Teacher'}
                {activeUmlRel === 'composition' && 'Engine'}
              </strong>
            </div>
          </div>

          {/* Detailed Relationship Explanation */}
          <div className="p-3 bg-white border border-[#D9D1C7] rounded-xl text-xs space-y-1">
            {activeUmlRel === 'association' && (
              <div>
                <strong className="text-indigo-900 block font-bold">Association (Teacher — Student):</strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Both entities are completely independent in memory. If a Teacher resigns, the Student continues to exist. No entity owns the lifecycle of the other.
                </p>
              </div>
            )}
            {activeUmlRel === 'aggregation' && (
              <div>
                <strong className="text-amber-900 block font-bold">Aggregation (Department ◇— Teacher):</strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  A University Department <strong>HAS</strong> Teachers, but Teachers can exist without a Department. If the Department is closed down, the Teacher objects survive intact.
                </p>
              </div>
            )}
            {activeUmlRel === 'composition' && (
              <div>
                <strong className="text-rose-900 block font-bold">Composition (Car ◆— Engine):</strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  A Car <strong>OWNS</strong> its Engine. The Engine is created inside the Car and cannot exist independently. If the Car is scrapped/destroyed, its Engine is destroyed with it.
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    // =======================================================================
    // 17. MEMORY: STACK VS HEAP ALLOCATION
    // =======================================================================
    case 'stack-vs-heap-memory':
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Cpu size={13} className="text-[#6574C4]" />
              <span>Stack vs Heap Memory Model:</span>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">Pointer Reference Binding</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
            {/* Stack Frame */}
            <div className="p-3.5 rounded-xl border border-sky-300 bg-sky-50/70 space-y-1.5 shadow-2xs">
              <span className="text-[10px] font-black uppercase text-sky-700 tracking-wider block">
                Stack Memory (Local References)
              </span>
              <div className="p-2 bg-white rounded-lg border border-sky-200 font-mono text-xs text-sky-950 space-y-0.5">
                <div>Car myCar = 0x40A2;</div>
                <div className="text-[10px] text-slate-500">// Stores 64-bit reference address</div>
              </div>
            </div>

            {/* Heap RAM Object */}
            <div className="p-3.5 rounded-xl border border-emerald-300 bg-emerald-50/70 space-y-1.5 shadow-2xs">
              <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider block">
                Heap Memory (Actual Object Instance)
              </span>
              <div className="p-2 bg-white rounded-lg border border-emerald-200 font-mono text-xs text-emerald-950 space-y-0.5">
                <div>[0x40A2] brand = &quot;Tesla&quot;</div>
                <div>[0x40A2] speed = 40</div>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 text-center">
            Reference variable lives on Stack; actual object instance with state resides in Heap RAM.
          </p>
        </div>
      );

    // =======================================================================
    // 18. ABSTRACT CLASS VS INTERFACE SPECTRUM
    // =======================================================================
    case 'abstract-class-vs-interface-spectrum':
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sliders size={13} className="text-[#6574C4]" />
              <span>Abstract Class vs Interface Spectrum:</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
              Contract vs Shared State
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
            {/* Abstract Class */}
            <div className="p-3.5 rounded-xl border border-purple-300 bg-purple-50/60 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase text-purple-800 tracking-wider block">
                  Abstract Class (0% to 100% Abstract)
                </span>
                <ul className="space-y-1 text-[11px] text-purple-950 font-medium">
                  <li>• Can have instance fields and constructors</li>
                  <li>• Provides shared concrete methods</li>
                  <li>• Single inheritance (extends 1 class)</li>
                </ul>
              </div>
              <span className="text-[10px] font-bold text-purple-700 block pt-1 border-t border-purple-200">
                Best For: Shared state and code reuse in strong hierarchies
              </span>
            </div>

            {/* Interface */}
            <div className="p-3.5 rounded-xl border border-indigo-300 bg-indigo-50/60 space-y-2 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[10px] font-black uppercase text-indigo-800 tracking-wider block">
                  Interface (100% Pure Contract)
                </span>
                <ul className="space-y-1 text-[11px] text-indigo-950 font-medium">
                  <li>• Only method signatures (public static final constants)</li>
                  <li>• No instance fields or constructors</li>
                  <li>• Multiple inheritance (implements multiple interfaces)</li>
                </ul>
              </div>
              <span className="text-[10px] font-bold text-indigo-700 block pt-1 border-t border-indigo-200">
                Best For: Pluggable contracts and loose architectural coupling
              </span>
            </div>
          </div>
        </div>
      );

    // =======================================================================
    // 19. CLASS ANATOMY DIAGRAM
    // =======================================================================
    case 'class-anatomy-diagram':
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Code2 size={13} className="text-[#6574C4]" />
              <span>Class Anatomy & Internal Structure:</span>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">Anatomy of a Class</span>
          </div>

          <div className="p-3.5 bg-white border border-[#D9D1C7] rounded-xl space-y-2">
            <div className="p-2 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-950">1. Member Variables (State)</span>
              <span className="font-mono text-[10px] text-indigo-800">private String brand;</span>
            </div>
            <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-between">
              <span className="text-xs font-bold text-amber-950">2. Constructor (Initialization)</span>
              <span className="font-mono text-[10px] text-amber-800">public Car(String brand) &#123; ... &#125;</span>
            </div>
            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-950">3. Member Methods (Behavior)</span>
              <span className="font-mono text-[10px] text-emerald-800">public void accelerate() &#123; ... &#125;</span>
            </div>
          </div>
        </div>
      );

    // =======================================================================
    // 20. CONSTRUCTOR LIFECYCLE FLOW (Step 1 -> 4)
    // =======================================================================
    case 'constructor-lifecycle-flow': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Zap size={13} className="text-[#6574C4]" />
              <span>Object Creation & Constructor Lifecycle:</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
              Student s = new Student("Aman", 101);
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-white border border-[#D9D1C7] shadow-2xs space-y-1">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider block">1. new Keyword</span>
              <strong className="text-xs text-[#0F172A] block">Heap Allocation</strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                Requests 24 bytes in Heap RAM for <code className="text-indigo-700">name</code> and <code className="text-indigo-700">rollNo</code>.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#D9D1C7] shadow-2xs space-y-1">
              <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider block">2. Zero Fill</span>
              <strong className="text-xs text-[#0F172A] block">Default Values</strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                JVM zeroes bytes: <code className="text-amber-800">name = null</code>, <code className="text-amber-800">rollNo = 0</code>.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#D9D1C7] shadow-2xs space-y-1">
              <span className="text-[10px] font-black text-purple-600 uppercase tracking-wider block">3. super() Chain</span>
              <strong className="text-xs text-[#0F172A] block">Parent Init</strong>
              <p className="text-[11px] text-slate-600 leading-snug">
                Implicitly calls <code className="text-purple-800">Object()</code> super-constructor first.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-emerald-300 bg-emerald-50/50 shadow-2xs space-y-1">
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider block">4. Body & Return</span>
              <strong className="text-xs text-emerald-950 block">Assigned & Ready</strong>
              <p className="text-[11px] text-emerald-900 leading-snug">
                <code className="text-emerald-800">this.name = "Aman"</code>; returns address <code className="text-emerald-800">@0x51B0</code> to <code className="text-emerald-800">s</code>.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // =======================================================================
    // 21. STUDENT REGISTRATION CONSTRUCTOR SIMULATOR
    // =======================================================================
    case 'student-registration-diagram': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <GraduationCap size={13} className="text-[#6574C4]" />
              <span>Student Admission Desk Constructor:</span>
            </span>
            <button
              type="button"
              onClick={() => setActiveStudentRegSubmitted(!activeStudentRegSubmitted)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#6574C4] text-white cursor-pointer hover:bg-[#5362B0] transition-colors"
            >
              {activeStudentRegSubmitted ? 'Reset Input' : 'Execute new Student(...) '}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-stretch">
            {/* Input Arguments */}
            <div className="p-3 bg-white border border-[#D9D1C7] rounded-xl space-y-1.5 shadow-2xs">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Constructor Arguments</span>
              <div className="space-y-1 font-mono text-[11px]">
                <div className="p-1.5 rounded bg-slate-50 border border-slate-200">name: "Priya Sharma"</div>
                <div className="p-1.5 rounded bg-slate-50 border border-slate-200">rollNo: 202401</div>
                <div className="p-1.5 rounded bg-slate-50 border border-slate-200">branch: "Computer Science"</div>
              </div>
            </div>

            {/* Constructor Gatekeeper */}
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1.5 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider block">Constructor Gatekeeper</span>
                <strong className="text-xs text-indigo-950 block">Invariant Validation</strong>
                <p className="text-[11px] text-indigo-900 mt-1 leading-snug">
                  Checks <code className="font-mono text-indigo-800">rollNo &gt; 0</code> and <code className="font-mono text-indigo-800">name != null</code>. Rejects invalid admissions immediately.
                </p>
              </div>
              <div className="pt-1.5 border-t border-indigo-200 font-mono text-[10px] text-indigo-700">
                Status: {activeStudentRegSubmitted ? 'Validated & Instantiated ✓' : 'Awaiting Instantiation...'}
              </div>
            </div>

            {/* Heap Instance */}
            <div className={`p-3 rounded-xl border transition-all shadow-2xs space-y-1.5 ${
              activeStudentRegSubmitted
                ? 'bg-emerald-50 border-emerald-300 scale-102 ring-2 ring-emerald-400/20'
                : 'bg-white border-[#D9D1C7]'
            }`}>
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider block">Heap Object Instance</span>
              <strong className="text-xs text-emerald-950 block">Ready in RAM</strong>
              <div className="font-mono text-[10px] space-y-0.5 text-slate-700">
                <div>address: <span className="text-emerald-700 font-bold">@0x4A2F</span></div>
                <div>name: "Priya Sharma"</div>
                <div>rollNo: 202401</div>
                <div>branch: "Computer Science"</div>
                <div>gpa: 0.0 (default init)</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // =======================================================================
    // 22. CONSTRUCTOR TYPES TAXONOMY
    // =======================================================================
    case 'constructor-types-diagram': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px]">
              Constructor Varieties & Chaining:
            </span>
            <div className="flex items-center gap-1">
              {[
                { id: 'default', label: 'Default' },
                { id: 'param', label: 'Parameterized' },
                { id: 'copy', label: 'Copy' },
                { id: 'chain', label: 'Chaining this()' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveConstructorVariation(tab.id)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                    activeConstructorVariation === tab.id
                      ? 'bg-[#6574C4] text-white'
                      : 'bg-white text-slate-600 border border-[#D9D1C7]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#D9D1C7] rounded-xl space-y-2">
            {activeConstructorVariation === 'default' && (
              <div className="space-y-1.5">
                <strong className="text-xs text-[#0F172A] block font-black">1. Default Constructor (No Arguments)</strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Generated by the compiler ONLY when zero constructors are written. Sets primitive numbers to 0, booleans to false, and object references to null.
                </p>
                <div className="p-2 bg-slate-900 rounded-lg text-emerald-300 font-mono text-[11px]">
                  Student s = new Student(); // Compiler provides Student() &#123; &#125;
                </div>
              </div>
            )}
            {activeConstructorVariation === 'param' && (
              <div className="space-y-1.5">
                <strong className="text-xs text-[#0F172A] block font-black">2. Parameterized Constructor</strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Accepts arguments to initialize fields with explicit values. Once defined, the compiler removes the automatic default constructor.
                </p>
                <div className="p-2 bg-slate-900 rounded-lg text-emerald-300 font-mono text-[11px]">
                  public Student(String name, int roll) &#123; this.name = name; this.roll = roll; &#125;
                </div>
              </div>
            )}
            {activeConstructorVariation === 'copy' && (
              <div className="space-y-1.5">
                <strong className="text-xs text-[#0F172A] block font-black">3. Copy Constructor</strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Initializes a new object by cloning the values of another existing object of the same class. Crucial in C++ for deep memory copying.
                </p>
                <div className="p-2 bg-slate-900 rounded-lg text-emerald-300 font-mono text-[11px]">
                  Student(const Student &amp;s) &#123; this-&gt;name = s.name; this-&gt;roll = s.roll; &#125;
                </div>
              </div>
            )}
            {activeConstructorVariation === 'chain' && (
              <div className="space-y-1.5">
                <strong className="text-xs text-[#0F172A] block font-black">4. Constructor Chaining (`this()`)</strong>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Calls an overloaded constructor within the same class using <code className="font-mono text-indigo-700">this(args)</code> on line 1. Eliminates duplicate initialization logic!
                </p>
                <div className="p-2 bg-slate-900 rounded-lg text-emerald-300 font-mono text-[11px]">
                  public Student() &#123; this("Guest", 0); &#125; // Delegates to parameterized constructor
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // =======================================================================
    // 23. CONSTRUCTORS CHEAT SHEET (Comparison Matrix)
    // =======================================================================
    case 'constructors-cheat-sheet': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[#6574C4]" />
              <span>Constructor vs Regular Method Comparison:</span>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">Technical Matrix</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] border border-[#D9D1C7] rounded-lg bg-white overflow-hidden">
              <thead className="bg-[#FAF8F5] border-b border-[#D9D1C7] font-bold text-[#0F172A]">
                <tr>
                  <th className="p-2 border-r border-[#D9D1C7]">Dimension</th>
                  <th className="p-2 border-r border-[#D9D1C7] text-indigo-900">Constructor</th>
                  <th className="p-2 text-slate-700">Regular Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D9]">
                <tr>
                  <td className="p-2 font-bold bg-[#FAF8F5] border-r border-[#D9D1C7]">Name</td>
                  <td className="p-2 border-r border-[#D9D1C7] text-indigo-900 font-mono">Must match Class Name exactly</td>
                  <td className="p-2 text-slate-700">Any valid identifier</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold bg-[#FAF8F5] border-r border-[#D9D1C7]">Return Type</td>
                  <td className="p-2 border-r border-[#D9D1C7] text-rose-800 font-bold">NONE (Not even void!)</td>
                  <td className="p-2 text-slate-700">Mandatory (type or void)</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold bg-[#FAF8F5] border-r border-[#D9D1C7]">Invocation</td>
                  <td className="p-2 border-r border-[#D9D1C7] text-indigo-900">Automatic upon `new` operator</td>
                  <td className="p-2 text-slate-700">Explicit method call (`obj.func()`)</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold bg-[#FAF8F5] border-r border-[#D9D1C7]">Inheritance</td>
                  <td className="p-2 border-r border-[#D9D1C7] text-rose-800 font-bold">NEVER inherited or overridden</td>
                  <td className="p-2 text-slate-700">Inherited and can be overridden</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold bg-[#FAF8F5] border-r border-[#D9D1C7]">Delegation</td>
                  <td className="p-2 border-r border-[#D9D1C7] text-indigo-900">`this()` or `super()` on line 1</td>
                  <td className="p-2 text-slate-700">Any line in method body</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // =======================================================================
    // 24. SHOPPING CART OVERLOADING SIMULATOR
    // =======================================================================
    case 'shopping-cart-overload-diagram': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShoppingCart size={13} className="text-[#6574C4]" />
              <span>Overloaded addItem() Shopping Cart Dispatch:</span>
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveCartOverload('single')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  activeCartOverload === 'single' ? 'bg-[#6574C4] text-white' : 'bg-white text-slate-600 border border-[#D9D1C7]'
                }`}
              >
                1 Arg: addItem(id)
              </button>
              <button
                type="button"
                onClick={() => setActiveCartOverload('bulk')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  activeCartOverload === 'bulk' ? 'bg-[#6574C4] text-white' : 'bg-white text-slate-600 border border-[#D9D1C7]'
                }`}
              >
                2 Args: addItem(id, qty)
              </button>
              <button
                type="button"
                onClick={() => setActiveCartOverload('coupon')}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  activeCartOverload === 'coupon' ? 'bg-[#6574C4] text-white' : 'bg-white text-slate-600 border border-[#D9D1C7]'
                }`}
              >
                3 Args: addItem(id, qty, code)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-white border border-[#D9D1C7] rounded-xl space-y-1.5 shadow-2xs">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Caller Invocation</span>
              <div className="p-2 bg-slate-900 rounded-lg text-emerald-300 font-mono text-xs">
                {activeCartOverload === 'single' && 'cart.addItem(101);'}
                {activeCartOverload === 'bulk' && 'cart.addItem(101, 5);'}
                {activeCartOverload === 'coupon' && 'cart.addItem(101, 5, "SAVE20");'}
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                {activeCartOverload === 'single' && 'Adds exactly 1 quantity of product #101 at retail price.'}
                {activeCartOverload === 'bulk' && 'Adds specified 5 quantity with standard bulk inventory validation.'}
                {activeCartOverload === 'coupon' && 'Adds 5 quantity and calculates immediate 20% promotional discount.'}
              </p>
            </div>

            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1.5 shadow-2xs">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider block">Compiler Signature Binding</span>
              <div className="font-mono text-[11px] text-indigo-900 font-bold">
                {activeCartOverload === 'single' && 'addItem(int id)'}
                {activeCartOverload === 'bulk' && 'addItem(int id, int qty)'}
                {activeCartOverload === 'coupon' && 'addItem(int id, int qty, String coupon)'}
              </div>
              <div className="pt-1 border-t border-indigo-200 text-[11px] text-indigo-800">
                <span className="font-bold">Compile-Time Resolution:</span> Signature selected before execution with zero runtime lookup penalty!
              </div>
            </div>
          </div>
        </div>
      );
    }

    // =======================================================================
    // 25. OVERLOADING VARIATIONS & RETURN TYPE TRAP
    // =======================================================================
    case 'overloading-variations-diagram': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px]">
              Overloading Rules &amp; Traps:
            </span>
            <div className="flex items-center gap-1">
              {[
                { id: 'count', label: '1. Param Count' },
                { id: 'type', label: '2. Param Types' },
                { id: 'order', label: '3. Param Sequence' },
                { id: 'return_trap', label: '4. Return Trap ❌' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveOverloadVariation(tab.id)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                    activeOverloadVariation === tab.id
                      ? tab.id === 'return_trap' ? 'bg-rose-600 text-white' : 'bg-[#6574C4] text-white'
                      : 'bg-white text-slate-600 border border-[#D9D1C7]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#D9D1C7] rounded-xl space-y-2">
            {activeOverloadVariation === 'count' && (
              <div className="space-y-1">
                <span className="text-emerald-700 font-black text-xs">✓ Valid Overload: Different Parameter Count</span>
                <p className="text-slate-600 text-[11px]">
                  <code className="font-mono text-indigo-800">add(int a, int b)</code> vs <code className="font-mono text-indigo-800">add(int a, int b, int c)</code>. Distinct signatures (2 vs 3 parameters).
                </p>
              </div>
            )}
            {activeOverloadVariation === 'type' && (
              <div className="space-y-1">
                <span className="text-emerald-700 font-black text-xs">✓ Valid Overload: Different Data Types</span>
                <p className="text-slate-600 text-[11px]">
                  <code className="font-mono text-indigo-800">print(int x)</code> vs <code className="font-mono text-indigo-800">print(String s)</code>. Compiler matches on primitive int vs String object.
                </p>
              </div>
            )}
            {activeOverloadVariation === 'order' && (
              <div className="space-y-1">
                <span className="text-emerald-700 font-black text-xs">✓ Valid Overload: Different Sequence / Order</span>
                <p className="text-slate-600 text-[11px]">
                  <code className="font-mono text-indigo-800">log(int code, String msg)</code> vs <code className="font-mono text-indigo-800">log(String msg, int code)</code>. Types sequence differs.
                </p>
              </div>
            )}
            {activeOverloadVariation === 'return_trap' && (
              <div className="space-y-1 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                <span className="text-rose-700 font-black text-xs">❌ INVALID OVERLOAD: Return Type Alone</span>
                <p className="text-rose-950 text-[11px] leading-relaxed">
                  <code className="font-mono text-rose-800 font-bold">int get()</code> and <code className="font-mono text-rose-800 font-bold">double get()</code> cause a <strong>Compile Error</strong>! When a caller writes <code className="font-mono">get();</code> without storing the result, the compiler cannot determine which one to run.
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    // =======================================================================
    // 26. OVERLOADING CHEAT SHEET
    // =======================================================================
    case 'overloading-cheat-sheet': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[#6574C4]" />
              <span>Overloading Quick Rules Summary:</span>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">Compile-Time Anchor</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
            <div className="p-2.5 bg-white border border-[#D9D1C7] rounded-xl space-y-1">
              <strong className="text-indigo-900 block font-bold">1. Mandatory Signature</strong>
              <p className="text-slate-600 leading-snug">Must differ in parameter count, parameter types, or sequence.</p>
            </div>
            <div className="p-2.5 bg-white border border-[#D9D1C7] rounded-xl space-y-1">
              <strong className="text-rose-900 block font-bold">2. Return Type Trap</strong>
              <p className="text-slate-600 leading-snug">Return type alone never overloads a method. Compile error occurs.</p>
            </div>
            <div className="p-2.5 bg-white border border-[#D9D1C7] rounded-xl space-y-1">
              <strong className="text-emerald-900 block font-bold">3. Early Binding</strong>
              <p className="text-slate-600 leading-snug">Resolved completely at compile-time with zero runtime virtual dispatch overhead.</p>
            </div>
          </div>
        </div>
      );
    }

    // =======================================================================
    // 27. METHOD OVERRIDING DYNAMIC DISPATCHER
    // =======================================================================
    case 'method-overriding-dispatch': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Workflow size={13} className="text-[#6574C4]" />
              <span>Runtime Polymorphic Dynamic Dispatch:</span>
            </span>
            <div className="flex items-center gap-1">
              {['dog', 'cat', 'animal'].map((typeKey) => (
                <button
                  key={typeKey}
                  type="button"
                  onClick={() => setActiveAnimalDispatch(typeKey)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                    activeAnimalDispatch === typeKey ? 'bg-[#6574C4] text-white' : 'bg-white text-slate-600 border border-[#D9D1C7]'
                  }`}
                >
                  {typeKey === 'dog' ? 'new Dog()' : typeKey === 'cat' ? 'new Cat()' : 'new Animal()'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-center text-center">
            {/* 1. Base Reference */}
            <div className="p-3 bg-white border border-[#D9D1C7] rounded-xl space-y-1 shadow-2xs">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Stack Reference</span>
              <strong className="text-xs text-[#0F172A] block">Animal a</strong>
              <span className="font-mono text-[10px] text-indigo-700 block">Type: Animal</span>
            </div>

            {/* 2. Runtime Heap Object */}
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1 shadow-2xs">
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider block">Live Heap Object</span>
              <strong className="text-xs text-indigo-950 block">
                {activeAnimalDispatch === 'dog' && 'Dog Object in Heap'}
                {activeAnimalDispatch === 'cat' && 'Cat Object in Heap'}
                {activeAnimalDispatch === 'animal' && 'Animal Object in Heap'}
              </strong>
              <span className="font-mono text-[10px] text-indigo-800 block">
                {activeAnimalDispatch === 'dog' && 'VTable -> Dog.sound()'}
                {activeAnimalDispatch === 'cat' && 'VTable -> Cat.sound()'}
                {activeAnimalDispatch === 'animal' && 'VTable -> Animal.sound()'}
              </span>
            </div>

            {/* 3. Output Dispatched */}
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl space-y-1 shadow-2xs">
              <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider block">Dynamic Execution</span>
              <strong className="text-xs text-emerald-950 block">
                {activeAnimalDispatch === 'dog' && '"Bark!"'}
                {activeAnimalDispatch === 'cat' && '"Meow!"'}
                {activeAnimalDispatch === 'animal' && '"Animal sound"'}
              </strong>
              <span className="font-mono text-[10px] text-emerald-900 block">a.sound()</span>
            </div>
          </div>
        </div>
      );
    }

    // =======================================================================
    // 28. NOTIFICATION OVERRIDING SERVICE
    // =======================================================================
    case 'notification-overriding-diagram': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Bell size={13} className="text-[#6574C4]" />
              <span>Multi-Channel Notification Dispatcher:</span>
            </span>
            <div className="flex items-center gap-1">
              {[
                { id: 'email', label: 'Email', icon: Mail },
                { id: 'sms', label: 'SMS', icon: MessageSquare },
                { id: 'push', label: 'Push', icon: Bell }
              ].map((ch) => {
                const Icon = ch.icon;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setActiveNotificationType(ch.id)}
                    className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors flex items-center gap-1 ${
                      activeNotificationType === ch.id
                        ? 'bg-[#6574C4] text-white'
                        : 'bg-white text-slate-600 border border-[#D9D1C7]'
                    }`}
                  >
                    <Icon size={11} />
                    <span>{ch.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-white border border-[#D9D1C7] rounded-xl space-y-2">
            <div className="font-mono text-xs text-indigo-950 font-bold">
              Notification notif = new {activeNotificationType === 'email' ? 'EmailNotification' : activeNotificationType === 'sms' ? 'SMSNotification' : 'PushNotification'}();
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg text-emerald-300 font-mono text-[11px]">
              notif.send("System maintenance alert at 10 PM");
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              {activeNotificationType === 'email' && 'Routes via SMTP email gateway with HTML styling and attachment support.'}
              {activeNotificationType === 'sms' && 'Routes via Twilio SMS API with phone number normalization and carrier failover.'}
              {activeNotificationType === 'push' && 'Routes via Firebase Cloud Messaging (FCM) to active mobile device tokens.'}
            </p>
          </div>
        </div>
      );
    }

    // =======================================================================
    // 29. OVERRIDING RULES CHECKER
    // =======================================================================
    case 'overriding-rules-diagram': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px]">
              Strict Overriding Rules:
            </span>
            <div className="flex items-center gap-1">
              {[
                { id: 'access', label: '1. Access' },
                { id: 'return', label: '2. Covariance' },
                { id: 'exceptions', label: '3. Exceptions' },
                { id: 'non_override', label: '4. Non-Overridables' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveOverridingRuleTab(tab.id)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                    activeOverridingRuleTab === tab.id
                      ? 'bg-[#6574C4] text-white'
                      : 'bg-white text-slate-600 border border-[#D9D1C7]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#D9D1C7] rounded-xl space-y-1.5 text-[11px]">
            {activeOverridingRuleTab === 'access' && (
              <div className="space-y-1">
                <strong className="text-indigo-900 block font-bold text-xs">Cannot Narrow Access Modifiers:</strong>
                <p className="text-slate-600 leading-relaxed">
                  Child method cannot be more restrictive than parent! If parent is <code className="font-mono text-indigo-700">protected</code>, child can be <code className="font-mono text-emerald-700">protected</code> or <code className="font-mono text-emerald-700">public</code>, but NEVER <code className="font-mono text-rose-700">private</code>. Widening is allowed; narrowing is forbidden.
                </p>
              </div>
            )}
            {activeOverridingRuleTab === 'return' && (
              <div className="space-y-1">
                <strong className="text-indigo-900 block font-bold text-xs">Covariant Return Types (Java 5+):</strong>
                <p className="text-slate-600 leading-relaxed">
                  The overriding method can return the exact parent return type OR any subclass of it. If parent returns <code className="font-mono text-indigo-700">Vehicle</code>, child can return <code className="font-mono text-emerald-700">Car</code>!
                </p>
              </div>
            )}
            {activeOverridingRuleTab === 'exceptions' && (
              <div className="space-y-1">
                <strong className="text-indigo-900 block font-bold text-xs">Checked Exception Hierarchy:</strong>
                <p className="text-slate-600 leading-relaxed">
                  Child method cannot throw newer or broader CHECKED exceptions than declared by the parent method. It can throw fewer, narrower, or unchecked exceptions freely.
                </p>
              </div>
            )}
            {activeOverridingRuleTab === 'non_override' && (
              <div className="space-y-1 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                <strong className="text-amber-950 block font-bold text-xs">Methods that CANNOT be Overridden:</strong>
                <ul className="space-y-1 text-slate-700 mt-1">
                  <li>• <strong className="text-rose-800">private:</strong> Invisible outside declaring class (subclass creates a new isolated method).</li>
                  <li>• <strong className="text-rose-800">static:</strong> Belongs to the class, not instances (Method Hiding, not overriding).</li>
                  <li>• <strong className="text-rose-800">final:</strong> Explicitly locked against overriding by compiler.</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      );
    }

    // =======================================================================
    // 30. OVERRIDING CHEAT SHEET (Overloading vs Overriding Master Matrix)
    // =======================================================================
    case 'overriding-cheat-sheet': {
      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[#6574C4]" />
              <span>Overloading vs Overriding Comparison Matrix:</span>
            </span>
            <span className="text-[10px] text-slate-500 font-semibold">Campus Placement Classic</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px] border border-[#D9D1C7] rounded-lg bg-white overflow-hidden">
              <thead className="bg-[#FAF8F5] border-b border-[#D9D1C7] font-bold text-[#0F172A]">
                <tr>
                  <th className="p-2 border-r border-[#D9D1C7]">Dimension</th>
                  <th className="p-2 border-r border-[#D9D1C7] text-indigo-900">Method Overloading</th>
                  <th className="p-2 text-emerald-900">Method Overriding</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D9]">
                <tr>
                  <td className="p-2 font-bold bg-[#FAF8F5] border-r border-[#D9D1C7]">Scope</td>
                  <td className="p-2 border-r border-[#D9D1C7] text-indigo-900">Same Class</td>
                  <td className="p-2 text-emerald-900 font-bold">Inheritance (Parent vs Child)</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold bg-[#FAF8F5] border-r border-[#D9D1C7]">Resolution</td>
                  <td className="p-2 border-r border-[#D9D1C7] text-indigo-900 font-bold">Compile-Time (Static Binding)</td>
                  <td className="p-2 text-emerald-900 font-bold">Runtime (Dynamic VTable Dispatch)</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold bg-[#FAF8F5] border-r border-[#D9D1C7]">Parameters</td>
                  <td className="p-2 border-r border-[#D9D1C7] text-rose-800 font-bold">MUST BE DIFFERENT</td>
                  <td className="p-2 text-emerald-900 font-bold">MUST BE IDENTICAL</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold bg-[#FAF8F5] border-r border-[#D9D1C7]">Return Type</td>
                  <td className="p-2 border-r border-[#D9D1C7]">Can be same or different</td>
                  <td className="p-2 text-emerald-900">Must be same or covariant</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold bg-[#FAF8F5] border-r border-[#D9D1C7]">Private / Static</td>
                  <td className="p-2 border-r border-[#D9D1C7] text-emerald-700">CAN be overloaded</td>
                  <td className="p-2 text-rose-700 font-bold">CANNOT be overridden</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    // =======================================================================
    // 31. MANDATORY SAFE FALLBACK (Never render empty whitespace or undefined)
    // =======================================================================
    default: {
      const displayTitle = card?.title || title || data?.title || 'Concept Architecture Visual';
      const keyIdea =
        card?.highlights?.quickRemember ||
        card?.oneLineMeaning ||
        card?.simpleDef ||
        data?.scenario ||
        'Core object-oriented concept modeling state and behavior together.';
      const secondPoint =
        card?.highlights?.interviewTip ||
        card?.whyItWorks ||
        'Encapsulates complexity, enforces invariants, and eliminates brittle procedural dependencies.';

      return (
        <div className={`p-4 bg-[#F8F5EE] border border-[#D9D1C7] rounded-xl text-xs space-y-3 ${className}`}>
          <div className="flex items-center justify-between pb-2 border-b border-[#E2D9CC]">
            <span className="font-extrabold text-[#475569] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#6574C4]" />
              <span>Concept Visual:</span>
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200">
              {type ? type.replace(/-/g, ' ') : 'OOPS Architecture'}
            </span>
          </div>

          <div className="p-3.5 bg-white border border-[#D9D1C7] rounded-xl space-y-2.5 shadow-2xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8EFF8] text-[#3E5575] font-black text-xs flex items-center justify-center border border-[#CAD9EA]">
                <Boxes size={14} className="text-[#6574C4]" />
              </div>
              <h4 className="text-xs sm:text-sm font-black text-[#0F172A]">
                {displayTitle}
              </h4>
            </div>

            {/* Diagrammatic Conceptual Flow */}
            <div className="p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E8E2D9] flex flex-wrap items-center justify-center gap-2 text-center text-[11px]">
              <span className="px-2.5 py-1 rounded-md bg-white border border-[#D9D1C7] font-bold text-[#0F172A] shadow-2xs">
                Object Blueprint
              </span>
              <ArrowRight size={13} className="text-[#6574C4] shrink-0" />
              <span className="px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200 font-bold text-indigo-900 shadow-2xs">
                Encapsulated State
              </span>
              <ArrowRight size={13} className="text-[#6574C4] shrink-0" />
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200 font-bold text-emerald-900 shadow-2xs">
                Safe Method Execution
              </span>
            </div>

            {/* Key Bullet Points */}
            <div className="space-y-1 pt-1 text-[11px] text-slate-700">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                <span className="leading-snug">{keyIdea}</span>
              </div>
              <div className="flex items-start gap-1.5">
                <Sparkles size={13} className="text-[#6574C4] mt-0.5 shrink-0" />
                <span className="leading-snug">{secondPoint}</span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
