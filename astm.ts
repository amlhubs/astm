// ═══════════════════════════════════════════════════════════════════════════
// astm.ts
// OMG Abstract Syntax Tree Metamodel (ASTM) v1.0 (formal/2011-01-05)
//
// Scope: Pure ASTM 1.0 metaclasses covering the entire ASTM specification —
// the conceptual entities defined by the OMG Architecture-Driven
// Modernization (ADM) Abstract Syntax Tree Metamodel:
//
//   • GASTM (Generic ASTM, normative) — 193 language-independent metaclasses
//     across 9 nested packages: ASTMCore (root), ASTMCore.ASTMSemantics,
//     ASTMCore.ASTMSource, ASTMCore.ASTMSyntax (Directives, Types,
//     DeclarationAndDefinition, Expression, Statement).
//   • RDB SASTM (Annex A, non-normative illustrative) — 56 RDB-prefixed
//     extension classes (e.g. RDBSelectStatement, RDBTableDefinition,
//     RDBColumnReference) demonstrating the canonical GASTM → SASTM
//     specialisation pattern.
//
// Total: 249 metaclasses.
//
// Note on missing SASTMs: ASTM 1.0 §1.5 defers procedural / declarative /
// functional / object-oriented / rule-based language SASTMs to future
// supplements. As of 2026, OMG has issued none. There is therefore NO
// SASTM-for-C / SASTM-for-Ada / SASTM-for-COBOL / SASTM-for-Fortran /
// SASTM-for-Java in OMG ASTM 1.0 — those volumes do not exist.
//
// Architectural ordering:
//   ASTM (this file) is PURE ASTM 1.0. It imports NOTHING from any other
//   @amlhubs metamodel. Downstream consumers extend the interfaces and
//   base classes exported from this file through standard TypeScript
//   inheritance.
//
// @standard      OMG ASTM 1.0 — formal/2011-01-05
// @specification https://www.omg.org/spec/ASTM/1.0/
// @authority     Object Management Group (https://www.omg.org/)
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// BEGIN Implementer #1 (Wave 1.1): GASTM Foundation — 21 metaclasses
//
// Scope: ASTM Core foundation framework, comprising:
//   • The single GASTM root        (§7.7-§7.8, §8.2.1)        — 1 class
//   • Semantic root + 6 leaves     (§7.10, §8.2.1.2)          — 7 classes
//   • Source root + 4 leaves       (§7.9, §8.2.1.1)           — 5 classes
//   • Syntax root + minor abstract (§7.11, §8.2.1.3)          — 2 classes
//   • Directives abstract + 4 leaves (§7.11.3, §8.2.1.3.1)    — 5 classes
//   • Compilation unit relocated   (CompilationUnit ⊂ Source) — 1 class
//                                                              ────────
//                                                              21 classes
//
// Note on OMG spec gaps observed during this wave:
//   1. The brief's planning notes named a class "Directive" between
//      PreprocessorElement and Comment/IncludeUnit/MacroCall. The EMOF
//      (spec/ASTM-EMOF.xml) does NOT declare any class named "Directive".
//      §7.11.3 / §8.2.1.3.1 explicitly enumerate PreprocessorElement's
//      direct children as { IncludeUnit, MacroCall, MacroDefinition,
//      Comment } with NO intermediate `Directive` layer. We honour the
//      EMOF source-of-truth: substitute MacroDefinition (a real EMOF
//      class) for the planning-document "Directive" placeholder so the
//      Wave 1.1 surface still ships exactly 21 real ASTM metaclasses.
//   2. The EMOF declares `xmi:id="ASTMCore.GASTMObject"` with NO
//      `isAbstract` attribute, which defaults to `false` per EMOF
//      conventions. The §3458 prose ("The root of the GASTM class
//      hierarchy") is consistent with either interpretation. We honour
//      the EMOF: GASTMObject is concrete.
//   3. The PDF uses the spelling `DefintionObject` and `FunctionDefintion`
//      (missing the second 'i') uniformly in EMOF xmi:id values. We
//      preserve OMG's spelling VERBATIM in `@xmiId` JSDoc lines and
//      forward-shadow alias names; the corrected TypeScript identifiers
//      will be supplied by Wave 3 (DeclarationAndDefinition implementer).
//
// Cross-package forward references resolved as `unknown`-aliased shadow
// types below — every shadow is consumed by a later wave that supplies
// the structural type.
// ═══════════════════════════════════════════════════════════════════════════

// ─── Forward-shadow types (resolved by later implementer waves) ───
// Each alias widens a cross-package reference type to `unknown` so the
// Wave 1.1 compilation succeeds before later waves are merged. Once all
// waves are loaded as a single compilation unit, downstream code may
// downcast through the eventual structural interfaces.

/** Resolved by Wave 3 (DeclarationAndDefinition). OMG xmi:id spelling: `DefintionObject`. */
type IDefintionObject = unknown;
/** Resolved by Wave 3 (DeclarationAndDefinition). OMG xmi:id spelling: `FunctionDefintion`. */
type IFunctionDefintion = unknown;
/** Resolved by Wave 4 (Expression). xmi:id: `ASTMCore.ASTMSyntax.Expression.AnnotationExpression`. */
type IAnnotationExpression = unknown;

// ─── 1. GASTMObject (§7.7 - §7.8, §8.2.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.8, §8.2.1
 * @xmiId ASTMCore.GASTMObject
 * @metaclass GASTMObject (concrete)
 * @generalization (root)
 * @definition The root of the GASTM class hierarchy.
 * @note §7.8 prose: "The core of the GASTM consists of three abstract classes
 *   (denoted with a ! prefix) for depicting the syntactic, semantic, and
 *   source properties of programming language elements." The EMOF declares
 *   GASTMObject WITHOUT an `isAbstract="true"` attribute, so it is concrete
 *   under EMOF defaulting rules. The three direct subclasses
 *   (GASTMSourceObject, GASTMSemanticObject, GASTMSyntaxObject) are the ones
 *   marked abstract in EMOF — consistent with the §7.8 narrative.
 * @ownedAttributes (none)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IGASTMObject {
  // pure marker interface — GASTMObject is the root of every ASTM metaclass.
  // Concrete subclasses contribute structure further down.
}

export class GASTMObject implements IGASTMObject {
  readonly metaClass: string = "GASTMObject";
}

// ─── 2. GASTMSemanticObject (§7.10, §8.2.1.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.10, §8.2.1.2
 * @xmiId ASTMCore.ASTMSemantics.GASTMSemanticObject
 * @metaclass GASTMSemanticObject (abstract)
 * @generalization GASTMObject
 * @definition Objects related to semantic artifacts of the modeled/analyzed system.
 * @ownedAttributes (none)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IGASTMSemanticObject extends IGASTMObject {
  // structural marker — concrete subclasses (Project, Scope) carry their own
  // attribute members.
}

export abstract class GASTMSemanticObject extends GASTMObject implements IGASTMSemanticObject {
  override readonly metaClass: string = "GASTMSemanticObject";
}

// ─── 3. GASTMSourceObject (§7.9, §8.2.1.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.9, §8.2.1.1
 * @xmiId ASTMCore.ASTMSource.GASTMSourceObject
 * @metaclass GASTMSourceObject (abstract)
 * @generalization GASTMObject
 * @definition Objects related to specifying locations within source files.
 * @ownedAttributes (none)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IGASTMSourceObject extends IGASTMObject {
  // structural marker — concrete subclasses (SourceFile, SourceLocation) carry
  // their own attribute members.
}

export abstract class GASTMSourceObject extends GASTMObject implements IGASTMSourceObject {
  override readonly metaClass: string = "GASTMSourceObject";
}

// ─── 4. GASTMSyntaxObject (§7.11, §8.2.1.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.11, §8.2.1.3
 * @xmiId ASTMCore.ASTMSyntax.GASTMSyntaxObject
 * @metaclass GASTMSyntaxObject (abstract)
 * @generalization GASTMObject
 * @definition All syntactic constructs.
 * @note §7.11 prose: "The topmost syntactical object in the ASTM model hierarchy
 *   is the GASTMSyntaxObject. PreProcessorElements associates GASTMSyntaxObject
 *   with preprocessor elements (PreprocessorElement) with source co-ordinates
 *   in the preprocessor element denoting whether they appear before or after the
 *   GASTMSyntaxObject. … Preprocessor, Annotations and SourceLocation can be
 *   attached to any syntax object."
 * @ownedAttributes
 *   • locationInfo         : SourceLocation             [1..1] -- §7.11: optional unary association to SourceLocation. (EMOF declares lower="1".)
 *   • annotations          : AnnotationExpression       [0..*] -- §7.11: zero to any number of AnnotationExpression annotations.
 *   • preProcessorElements : PreprocessorElement        [0..*] -- §7.11: zero to any number of PreprocessorElement associations.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IGASTMSyntaxObject extends IGASTMObject {
  readonly locationInfo: ISourceLocation;
  readonly annotations: ReadonlyArray<IAnnotationExpression>;
  readonly preProcessorElements: ReadonlyArray<IPreprocessorElement>;
}

export abstract class GASTMSyntaxObject extends GASTMObject implements IGASTMSyntaxObject {
  override readonly metaClass: string = "GASTMSyntaxObject";
  readonly locationInfo: ISourceLocation;
  readonly annotations: ReadonlyArray<IAnnotationExpression>;
  readonly preProcessorElements: ReadonlyArray<IPreprocessorElement>;
  constructor(args: {
    locationInfo: ISourceLocation;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super();
    this.locationInfo = args.locationInfo;
    this.annotations = args.annotations ?? [];
    this.preProcessorElements = args.preProcessorElements ?? [];
  }
}

// ─── 5. MinorSyntaxObject (§7.11.1, §8.2.1.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.11.1, §8.2.1.3
 * @xmiId ASTMCore.ASTMSyntax.MinorSyntaxObject
 * @metaclass MinorSyntaxObject (abstract)
 * @generalization GASTMSyntaxObject
 * @definition (spec is silent on an explicit `Definition:` paragraph for
 *   MinorSyntaxObject; §7.11.1 enumerates its concrete leaves — Dimension, Name,
 *   SwitchCase, CatchBlock, UnaryOperator, BinaryOperator, StorageSpecification,
 *   VirtualSpecification, AccessKind, ActualParameter, FunctionMemberAttributes,
 *   DerivesFrom, MemberObject — and §8.1.6 / Figure 8.12 group these as
 *   "MinorSyntaxObject (subclasses belonging to DeclarationAndDefinition)".)
 * @ownedAttributes (none)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IMinorSyntaxObject extends IGASTMSyntaxObject {
  // structural marker — concrete subclasses (Dimension, Name, SwitchCase, …)
  // are declared in later waves.
}

export abstract class MinorSyntaxObject extends GASTMSyntaxObject implements IMinorSyntaxObject {
  override readonly metaClass: string = "MinorSyntaxObject";
}

// ─── 6. SourceLocation (§7.9, §8.2.1.1.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.9, §8.2.1.1.1
 * @xmiId ASTMCore.ASTMSource.SourceLocation
 * @metaclass SourceLocation (concrete)
 * @generalization GASTMSourceObject
 * @definition Start/end line/column position information, part of a source location specification.
 * @ownedAttributes
 *   • startLine     : Integer        [0..1] -- §7.9 / §8.2.1.1.1: unary Integer valued property.
 *   • startPosition : Integer        [0..1] -- §7.9 / §8.2.1.1.1: unary Integer valued property.
 *   • endLine       : Integer        [0..1] -- §7.9 / §8.2.1.1.1: unary Integer valued property.
 *   • endPosition   : Integer        [0..1] -- §7.9 / §8.2.1.1.1: unary Integer valued property.
 *   • inSourceFile  : SourceFile     [1..1] -- §7.9 / §8.2.1.1.1: unary association inSourceFile to SourceFile.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ISourceLocation extends IGASTMSourceObject {
  readonly startLine?: number;
  readonly startPosition?: number;
  readonly endLine?: number;
  readonly endPosition?: number;
  readonly inSourceFile: ISourceFile;
}

export class SourceLocation extends GASTMSourceObject implements ISourceLocation {
  override readonly metaClass = "SourceLocation" as const;
  readonly startLine?: number;
  readonly startPosition?: number;
  readonly endLine?: number;
  readonly endPosition?: number;
  readonly inSourceFile: ISourceFile;
  constructor(args: {
    inSourceFile: ISourceFile;
    startLine?: number;
    startPosition?: number;
    endLine?: number;
    endPosition?: number;
  }) {
    super();
    this.inSourceFile = args.inSourceFile;
    this.startLine = args.startLine;
    this.startPosition = args.startPosition;
    this.endLine = args.endLine;
    this.endPosition = args.endPosition;
  }
}

// ─── 7. SourceFile (§7.9, §8.2.1.1.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.9, §8.2.1.1.2
 * @xmiId ASTMCore.ASTMSource.SourceFile
 * @metaclass SourceFile (concrete)
 * @generalization GASTMSourceObject
 * @definition The source file part of a source location specification.
 * @ownedAttributes
 *   • path : String [0..1] -- §7.9 / §8.2.1.1.2: unary property path to String.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ISourceFile extends IGASTMSourceObject {
  readonly path?: string;
}

export class SourceFile extends GASTMSourceObject implements ISourceFile {
  override readonly metaClass: string = "SourceFile";
  readonly path?: string;
  constructor(args: { path?: string } = {}) {
    super();
    this.path = args.path;
  }
}

// ─── 8. SourceFileReference (§7.9, §8.2.1.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.9, §8.2.1.1 (Table 7.7 row + §7.9 BNF block)
 * @xmiId ASTMCore.ASTMSource.SourceFileReference
 * @metaclass SourceFileReference (concrete)
 * @generalization SourceFile
 * @definition The reference to a source file; reference is contained in another source file.
 * @note Table 7.7 row verbatim: "SourceFileReference -- The reference to a
 *   source file; reference is contained in another source file." §7.9 BNF
 *   block: "SourceFileReference -> locationInfo : SourceLocation [ ofSourceFile : SourceFile ] ;"
 *   Note that EMOF declares both `locationInfo` and `ofSourceFile` with
 *   `lower="1"` (mandatory), whereas the §7.9 BNF marks `ofSourceFile` as
 *   `[ ... ]` (optional). We honour the EMOF source-of-truth.
 * @ownedAttributes
 *   • locationInfo  : SourceLocation [1..1] -- §7.9: unary association locationInfo to SourceLocation. EMOF lower="1".
 *   • ofSourceFile  : SourceFile     [1..1] -- §7.9: association to SourceFile. EMOF lower="1" (PDF BNF marks optional; EMOF prevails).
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ISourceFileReference extends ISourceFile {
  readonly locationInfo: ISourceLocation;
  readonly ofSourceFile: ISourceFile;
}

export class SourceFileReference extends SourceFile implements ISourceFileReference {
  override readonly metaClass = "SourceFileReference" as const;
  readonly locationInfo: ISourceLocation;
  readonly ofSourceFile: ISourceFile;
  constructor(args: {
    locationInfo: ISourceLocation;
    ofSourceFile: ISourceFile;
    path?: string;
  }) {
    super({ path: args.path });
    this.locationInfo = args.locationInfo;
    this.ofSourceFile = args.ofSourceFile;
  }
}

// ─── 9. CompilationUnit (§7.9, §8.2.1.1, §8.1.6) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.9, §8.1.6
 * @xmiId ASTMCore.ASTMSource.CompilationUnit
 * @metaclass CompilationUnit (concrete)
 * @generalization SourceFile
 * @definition (spec is silent on an explicit `Definition:` paragraph for
 *   CompilationUnit at §8; §8.1.6 narrative: "Project is a container for a
 *   collection of Compilation Units that contain the source code that is
 *   modeled. Scope and its subclasses are containers for Definitions that are
 *   defined in CompilationUnits." Table 7.6 / §7.7 row 2 implicitly:
 *   "compilation units to be modeled/analyzed as a whole.")
 * @note CompilationUnit extends SourceFile so it inherits the optional `path`
 *   property declared on SourceFile (§7.9 BNF: `SourceFile -> < path : String >`).
 * @ownedAttributes
 *   • language    : String           [0..1] -- §7.9: unary property language to String.
 *   • fragments   : DefintionObject  [0..*] -- §7.9: zero to any number of DefintionObject fragments. EMOF xmi:id preserves OMG typo "Defintion".
 *   • opensScope  : ProgramScope     [0..1] -- §7.9: optional unary association opensScope to ProgramScope.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ICompilationUnit extends ISourceFile {
  readonly language?: string;
  readonly fragments: ReadonlyArray<IDefintionObject>;
  readonly opensScope?: IProgramScope;
}

export class CompilationUnit extends SourceFile implements ICompilationUnit {
  override readonly metaClass = "CompilationUnit" as const;
  readonly language?: string;
  readonly fragments: ReadonlyArray<IDefintionObject>;
  readonly opensScope?: IProgramScope;
  constructor(args: {
    path?: string;
    language?: string;
    fragments?: ReadonlyArray<IDefintionObject>;
    opensScope?: IProgramScope;
  } = {}) {
    super({ path: args.path });
    this.language = args.language;
    this.fragments = args.fragments ?? [];
    this.opensScope = args.opensScope;
  }
}

// ─── 10. Scope (§7.10, §8.2.1.2.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.10, §8.2.1.2.2
 * @xmiId ASTMCore.ASTMSemantics.Scope
 * @metaclass Scope (concrete)
 * @generalization GASTMSemanticObject
 * @definition Declaration context in which names declared must be unique.
 * @note §8.2.1.2.2 prose: "Scope is a subclass of GASTMSemanticObject and has
 *   0 to any number associations childScope to Scope. Scope has 0 to any
 *   number association definitionObject to DefinitionObject. Scope has
 *   subclasses ProgramScope, AggregateScope, FunctionScope, GlobalScope, and
 *   BlockScope, which inherit the DeclDefn and ChildScope associations from
 *   Scope. Scope and its subclasses are optional derivable semantic
 *   annotations." The EMOF attribute name is `declOrDefn` (matching the BNF
 *   `definitionObject : DefinitionObject *` association).
 * @ownedAttributes
 *   • declOrDefn  : DefintionObject [0..*] -- §7.10 / §8.2.1.2.2: zero to any number of DefinitionObject associations. EMOF xmi:id preserves OMG typo "Defintion".
 *   • childScope  : Scope           [0..*] -- §7.10 / §8.2.1.2.2: zero to any number of childScope associations to Scope. (Two-way semantic association per §8.2.1.2.2.)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IScope extends IGASTMSemanticObject {
  readonly declOrDefn: ReadonlyArray<IDefintionObject>;
  readonly childScope: ReadonlyArray<IScope>;
}

export class Scope extends GASTMSemanticObject implements IScope {
  override readonly metaClass: string = "Scope";
  readonly declOrDefn: ReadonlyArray<IDefintionObject>;
  readonly childScope: ReadonlyArray<IScope>;
  constructor(args: {
    declOrDefn?: ReadonlyArray<IDefintionObject>;
    childScope?: ReadonlyArray<IScope>;
  } = {}) {
    super();
    this.declOrDefn = args.declOrDefn ?? [];
    this.childScope = args.childScope ?? [];
  }
}

// ─── 11. AggregateScope (§7.10, §8.2.1.2.2.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.10, §8.2.1.2.2.2
 * @xmiId ASTMCore.ASTMSemantics.AggregateScope
 * @metaclass AggregateScope (concrete)
 * @generalization Scope
 * @definition The scope introduced by an aggregate type.
 * @note §8.2.1.2.2.2 prose: "AggregateScope inherits the definitionObject and
 *   ChildScope associations. AggregateScope is an optional derivable semantic
 *   annotation."
 * @ownedAttributes (none — all attributes inherited from Scope)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IAggregateScope extends IScope {
  // pure marker interface — AggregateScope inherits declOrDefn and childScope
  // from Scope without contributing additional structure.
}

export class AggregateScope extends Scope implements IAggregateScope {
  override readonly metaClass = "AggregateScope" as const;
}

// ─── 12. BlockScope (§7.10, §8.2.1.2.2.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.10, §8.2.1.2.2.3
 * @xmiId ASTMCore.ASTMSemantics.BlockScope
 * @metaclass BlockScope (concrete)
 * @generalization Scope
 * @definition The scope introduced by a block statement.
 * @note §8.2.1.2.2.3 prose: "BlockScope inherits the definitionObject and
 *   ChildScope associations. BlockScope is an option [sic] derivable semantic
 *   annotation."
 * @ownedAttributes (none — all attributes inherited from Scope)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBlockScope extends IScope {
  // pure marker interface — BlockScope inherits declOrDefn and childScope
  // from Scope without contributing additional structure.
}

export class BlockScope extends Scope implements IBlockScope {
  override readonly metaClass = "BlockScope" as const;
}

// ─── 13. FunctionScope (§7.10, §8.2.1.2.2.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.10, §8.2.1.2.2.1
 * @xmiId ASTMCore.ASTMSemantics.FunctionScope
 * @metaclass FunctionScope (concrete)
 * @generalization Scope
 * @definition The scope introduced by a function definition.
 * @note §8.2.1.2.2.1 prose: "FunctionScope inherits the definitionObject and
 *   childScope associations. FunctionScope is an optional derivable semantic
 *   annotation."
 * @ownedAttributes
 *   • scopeOpenedBy : FunctionDefintion [1..1] -- EMOF attribute: opposite end of `FunctionDefintion.opensScope`. OMG xmi:id preserves the OMG typo "FunctionDefintion".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IFunctionScope extends IScope {
  readonly scopeOpenedBy: IFunctionDefintion;
}

export class FunctionScope extends Scope implements IFunctionScope {
  override readonly metaClass = "FunctionScope" as const;
  readonly scopeOpenedBy: IFunctionDefintion;
  constructor(args: {
    scopeOpenedBy: IFunctionDefintion;
    declOrDefn?: ReadonlyArray<IDefintionObject>;
    childScope?: ReadonlyArray<IScope>;
  }) {
    super({ declOrDefn: args.declOrDefn, childScope: args.childScope });
    this.scopeOpenedBy = args.scopeOpenedBy;
  }
}

// ─── 14. GlobalScope (§7.10, §8.2.1.2.2.5) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.10, §8.2.1.2.2.5
 * @xmiId ASTMCore.ASTMSemantics.GlobalScope
 * @metaclass GlobalScope (concrete)
 * @generalization Scope
 * @definition The outermost scope, surrounding all compilation units of a project.
 * @note §8.2.1.2.2.5 prose: "GlobalScope inherits the definitionObject and
 *   ChildScope associations. ProgramScope Scope is an optional derivable
 *   semantic annotation." [PDF errata: §8.2.1.2.2.5 paragraph mistakenly
 *   names "ProgramScope" where "GlobalScope" was intended; the §-heading
 *   and Definition line are authoritative.]
 * @ownedAttributes (none — all attributes inherited from Scope)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IGlobalScope extends IScope {
  // pure marker interface — GlobalScope inherits declOrDefn and childScope
  // from Scope without contributing additional structure.
}

export class GlobalScope extends Scope implements IGlobalScope {
  override readonly metaClass = "GlobalScope" as const;
}

// ─── 15. ProgramScope (§7.10, §8.2.1.2.2.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.10, §8.2.1.2.2.4
 * @xmiId ASTMCore.ASTMSemantics.ProgramScope
 * @metaclass ProgramScope (concrete)
 * @generalization Scope
 * @definition The scope introduced by a compilation unit.
 * @note §8.2.1.2.2.4 prose: "ProgramScope inherits the definitionObject and
 *   ChildScope associations. ProgramScope Scope is an optional derivable
 *   semantic annotation."
 * @ownedAttributes (none — all attributes inherited from Scope)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IProgramScope extends IScope {
  // pure marker interface — ProgramScope inherits declOrDefn and childScope
  // from Scope without contributing additional structure.
}

export class ProgramScope extends Scope implements IProgramScope {
  override readonly metaClass = "ProgramScope" as const;
}

// ─── 16. Project (§7.10, §8.2.1.2.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.10, §8.2.1.2.1
 * @xmiId ASTMCore.ASTMSemantics.Project
 * @metaclass Project (concrete)
 * @generalization GASTMSemanticObject
 * @definition The collection of compilation units to be modeled/analyzed as a whole.
 * @note §8.2.1.2.1 prose: "Project is a subclass of GASTMSemanticObject and
 *   has optional unary semantic association outerScope to GlobalScope. The
 *   Project one or more associations files to CompilationUnit."
 * @ownedAttributes
 *   • outerScope : GlobalScope     [0..1] -- §7.10 / §8.2.1.2.1: optional unary association outerScope to GlobalScope.
 *   • files      : CompilationUnit [1..*] -- §7.10 / §8.2.1.2.1: one or more associations files to CompilationUnit.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IProject extends IGASTMSemanticObject {
  readonly outerScope?: IGlobalScope;
  readonly files: ReadonlyArray<ICompilationUnit>;
}

export class Project extends GASTMSemanticObject implements IProject {
  override readonly metaClass = "Project" as const;
  readonly outerScope?: IGlobalScope;
  readonly files: ReadonlyArray<ICompilationUnit>;
  constructor(args: {
    files: ReadonlyArray<ICompilationUnit>;
    outerScope?: IGlobalScope;
  }) {
    super();
    this.files = args.files;
    this.outerScope = args.outerScope;
  }
}

// ─── 17. PreprocessorElement (§7.11.3, §8.2.1.3.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.11.3, §8.2.1.3.1
 * @xmiId ASTMCore.ASTMSyntax.Directives.PreprocessorElement
 * @metaclass PreprocessorElement (abstract)
 * @generalization GASTMSyntaxObject
 * @definition Constructs involved in preprocessing.
 * @note §8.2.1.3.1 prose: "PreprocessorElement is a subclass of
 *   GASTMSyntaxObject and has subclasses IncludeUnit, MacroCall,
 *   MacroDefinition and Comment." §8.1.5 narrative: "Preprocessor elements
 *   model source code that is typically processed by a preprocessor and
 *   converted into the code that is to be processed by a parser or a
 *   compiler." The EMOF declares PreprocessorElement WITH `isAbstract="true"`.
 *   The brief's planning notes named an intermediate class "Directive" between
 *   PreprocessorElement and its concrete leaves — no such class exists in the
 *   EMOF or in §7.11.3 / §8.2.1.3.1; PreprocessorElement directly parents
 *   IncludeUnit, MacroCall, MacroDefinition, and Comment.
 * @ownedAttributes (none — all attributes inherited from GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IPreprocessorElement extends IGASTMSyntaxObject {
  // structural marker — concrete subclasses (IncludeUnit, MacroCall,
  // MacroDefinition, Comment) carry their own attribute members.
}

export abstract class PreprocessorElement extends GASTMSyntaxObject implements IPreprocessorElement {
  override readonly metaClass: string = "PreprocessorElement";
}

// ─── 18. MacroDefinition (§7.11.3, §8.2.1.3.1.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.11.3, §8.2.1.3.1.3
 * @xmiId ASTMCore.ASTMSyntax.Directives.MacroDefinition
 * @metaclass MacroDefinition (concrete)
 * @generalization PreprocessorElement
 * @definition Definition of a preprocessor macro.
 * @note §8.2.1.3.1.3 prose: "MacroDefinition is a subclass of
 *   PreprocessorElement and has unary property macroName to String and unary
 *   property body to String." MacroDefinition is the OMG-defined PreprocessorElement
 *   leaf that the brief's planning notes mistakenly omitted in favour of an
 *   intermediate "Directive" placeholder; honouring the EMOF source-of-truth,
 *   this slot in Wave 1.1 is occupied by the real MacroDefinition class.
 * @ownedAttributes
 *   • macroName : String [0..1] -- §7.11.3 / §8.2.1.3.1.3: unary property to String.
 *   • body      : String [0..1] -- §7.11.3 / §8.2.1.3.1.3: unary property to String.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IMacroDefinition extends IPreprocessorElement {
  readonly macroName?: string;
  readonly body?: string;
}

export class MacroDefinition extends PreprocessorElement implements IMacroDefinition {
  override readonly metaClass = "MacroDefinition" as const;
  readonly macroName?: string;
  readonly body?: string;
  constructor(args: {
    locationInfo: ISourceLocation;
    macroName?: string;
    body?: string;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.macroName = args.macroName;
    this.body = args.body;
  }
}

// ─── 19. Comment (§7.11.3, §8.2.1.3.1.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.11.3, §8.2.1.3.1.4
 * @xmiId ASTMCore.ASTMSyntax.Directives.Comment
 * @metaclass Comment (concrete)
 * @generalization PreprocessorElement
 * @definition Comments appearing in source files.
 * @note §8.2.1.3.1.4 prose: "Comment is a subclass of PreprocessorElement and
 *   has unary property body to String."
 * @ownedAttributes
 *   • body : String [0..1] -- §7.11.3 / §8.2.1.3.1.4: unary property to String.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IComment extends IPreprocessorElement {
  readonly body?: string;
}

export class Comment extends PreprocessorElement implements IComment {
  override readonly metaClass = "Comment" as const;
  readonly body?: string;
  constructor(args: {
    locationInfo: ISourceLocation;
    body?: string;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.body = args.body;
  }
}

// ─── 20. IncludeUnit (§7.11.3, §8.2.1.3.1.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.11.3, §8.2.1.3.1.1
 * @xmiId ASTMCore.ASTMSyntax.Directives.IncludeUnit
 * @metaclass IncludeUnit (concrete)
 * @generalization PreprocessorElement
 * @definition Inclusion of a file during preprocessing.
 * @note §8.2.1.3.1.1 prose: "IncludeUnit is a subclass of PreprocessorElement
 *   and has unary association file to SourceFile." (§7.11.3 BNF shows the
 *   target as SourceFileReference, and EMOF confirms `type=ASTMCore.ASTMSource.SourceFileReference`.)
 * @ownedAttributes
 *   • file : SourceFileReference [1..1] -- §7.11.3 / §8.2.1.3.1.1: unary association file to SourceFileReference.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IIncludeUnit extends IPreprocessorElement {
  readonly file: ISourceFileReference;
}

export class IncludeUnit extends PreprocessorElement implements IIncludeUnit {
  override readonly metaClass = "IncludeUnit" as const;
  readonly file: ISourceFileReference;
  constructor(args: {
    locationInfo: ISourceLocation;
    file: ISourceFileReference;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.file = args.file;
  }
}

// ─── 21. MacroCall (§7.11.3, §8.2.1.3.1.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §7.11.3, §8.2.1.3.1.2
 * @xmiId ASTMCore.ASTMSyntax.Directives.MacroCall
 * @metaclass MacroCall (concrete)
 * @generalization PreprocessorElement
 * @definition Invocation of a preprocessor macro.
 * @note §8.2.1.3.1.2 prose: "A MacroCall is a subclass of PreprocesorElement
 *   [sic] and has unary association RefersTo to a MacroDefinition." EMOF
 *   attribute name `refersTo` (lowercase first letter).
 * @ownedAttributes
 *   • refersTo : MacroDefinition [1..1] -- §7.11.3 / §8.2.1.3.1.2: unary association refersTo to MacroDefinition.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IMacroCall extends IPreprocessorElement {
  readonly refersTo: IMacroDefinition;
}

export class MacroCall extends PreprocessorElement implements IMacroCall {
  override readonly metaClass = "MacroCall" as const;
  readonly refersTo: IMacroDefinition;
  constructor(args: {
    locationInfo: ISourceLocation;
    refersTo: IMacroDefinition;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.refersTo = args.refersTo;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// END Implementer #1 (Wave 1.1). Next implementer starts at class 22.
// ═══════════════════════════════════════════════════════════════════════════
