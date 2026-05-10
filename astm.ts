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
/** Resolved by Wave 4 (Expression). xmi:id: `ASTMCore.ASTMSyntax.Expression.Expression`. */
type IExpression = unknown;
/** Resolved by Wave 3 (DeclarationAndDefinition). xmi:id: `ASTMCore.ASTMSyntax.DeclarationAndDefinition.Name`. */
type IName = unknown;
/** Resolved by Wave 3 (DeclarationAndDefinition). xmi:id: `ASTMCore.ASTMSyntax.DeclarationAndDefinition.AccessKind`. */
type IAccessKind = unknown;
/** Resolved by Wave 3 (DeclarationAndDefinition). xmi:id: `ASTMCore.ASTMSyntax.DeclarationAndDefinition.VirtualSpecification`. */
type IVirtualSpecification = unknown;
/** Resolved by Wave 3 (DeclarationAndDefinition). xmi:id: `ASTMCore.ASTMSyntax.DeclarationAndDefinition.EnumLiteralDefinition`. */
type IEnumLiteralDefinition = unknown;
/** Resolved by Wave 3 (DeclarationAndDefinition). xmi:id: `ASTMCore.ASTMSyntax.DeclarationAndDefinition.TypeDefinition`. */
type ITypeDefinition = unknown;

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

// ═══════════════════════════════════════════════════════════════════════════
// BEGIN Implementer #2 (Wave 1.2): GASTM Types — 42 metaclasses
//
// Scope: ASTMCore.ASTMSyntax.Types nested package, comprising the entire
// Type hierarchy enumerated by §8.2.1.3.4 of formal-11-01-05 and
// `<nestedPackage name="Types">` of ASTM-EMOF.xml:
//   • Abstract roots                                                — 10 classes
//     (Type, DataType, AggregateType, ConstructedType,
//      FormalParameterType, PrimitiveType, NumberType,
//      IntegralType, RealType, TypeReference)
//   • MinorSyntaxObject leaves living in Types package              —  3 classes
//     (DerivesFrom, Dimension, MemberObject)
//   • AggregateType concrete leaves                                 —  4 classes
//     (AnnotationType, ClassType, StructureType, UnionType)
//   • ConstructedType concrete leaves                               —  5 classes
//     (ArrayType, CollectionType, PointerType, RangeType,
//      ReferenceType)
//   • FormalParameterType concrete leaves                           —  2 classes
//     (ByReferenceFormalParameterType, ByValueFormalParameterType)
//   • PrimitiveType + NumberType + IntegralType + RealType leaves   — 10 classes
//     (Boolean, Void, Byte, Character, Integer, LongInteger,
//      ShortInteger, Double, LongDouble, Real)
//   • Remaining DataType concrete leaves                            —  3 classes
//     (EnumType, ExceptionType, NamedType)
//   • Type concrete leaves                                          —  3 classes
//     (FunctionType, LabelType, NameSpaceType)
//   • TypeReference concrete leaves                                 —  2 classes
//     (NamedTypeReference, UnnamedTypeReference)
//                                                                    ────────
//                                                                    42 classes
//
// Notes on OMG spec choices observed during this wave:
//   1. The EMOF declares the namespace-type metaclass with the spelling
//      `NameSpaceType` (capital S in the middle). The PDF §8.2.1.3.4.4
//      prose spells it `NamespaceType` (lowercase s). We honour the EMOF
//      source-of-truth and use `NameSpaceType` as the TypeScript
//      identifier; the @xmiId and @note tags preserve both spellings.
//   2. The class `Boolean` (§8.2.1.3.4.2.1) shadows the global
//      TypeScript/JavaScript `Boolean` constructor. Inside an ES module
//      this is permitted — TypeScript permits exporting a class named
//      `Boolean` that shadows the global within its module scope. We use
//      the unqualified ASTM spec name `Boolean` and `Void`.
//   3. PDF §8.2.1.3.4.2.9 narrative says "FormalParameterType ... has
//      unary association type to interior class Type" — the EMOF
//      attribute types this as `ASTMCore.ASTMSyntax.Types.TypeReference`
//      (matching the Property Specification line `type : TypeReference`).
//      We honour the EMOF (TypeReference).
//   4. NamedTypeReference: PDF Property Specification gives
//      `type : TypeDefinition` and `typeName : Name`. EMOF preserves both:
//      `typeName -> Name`, `type -> TypeDefinition`. Both shadow-aliased.
//   5. PDF Property Specification for ConstructedType writes `baseType :
//      TypeReference`. EMOF attribute name is `baseType` (lowercase b),
//      not `BaseType` as the PDF narrative line says. EMOF prevails.
//   6. DerivesFrom: PDF prose says "association className to class
//      NamedType" but the Property Specification line and EMOF agree on
//      `className : NamedTypeReference` (plural `[1..*]`). EMOF prevails.
// ═══════════════════════════════════════════════════════════════════════════

// ─── 22. Type (§8.2.1.3.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4
 * @xmiId ASTMCore.ASTMSyntax.Types.Type
 * @metaclass Type (abstract)
 * @generalization GASTMSyntaxObject
 * @definition All types
 * @note §8.2.1.3.4 prose: "Type is a subclass of GASTMSyntaxObject, and has
 *   subclasses DataType, FunctionType, LabelType and NamespaceType and
 *   TypeReference that are used for depicting categories of Type, and unary
 *   property isConst to the primitive Boolean."
 * @ownedAttributes
 *   • isConst : Boolean [1..1] -- §8.2.1.3.4: unary property isConst to the primitive Boolean. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IType extends IGASTMSyntaxObject {
  readonly isConst: boolean;
}

export abstract class Type extends GASTMSyntaxObject implements IType {
  override readonly metaClass: string = "Type";
  readonly isConst: boolean;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.isConst = args.isConst;
  }
}

// ─── 23. DataType (§8.2.1.3.4.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2
 * @xmiId ASTMCore.ASTMSyntax.Types.DataType
 * @metaclass DataType (abstract)
 * @generalization Type
 * @definition Types involving data
 * @note §8.2.1.3.4.2 prose: "DataType is a subclass of Type, and has subclasses
 *   PrimitiveType, EnumType, ConstructedType, AggregateType, ExceptionType,
 *   FormalParameterType, NamedType that are used for depicting kinds of
 *   datatypes."
 * @ownedAttributes (none -- all attributes inherited from Type)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDataType extends IType {
  // structural marker -- concrete subclasses (PrimitiveType, EnumType,
  // ConstructedType, AggregateType, ExceptionType, FormalParameterType,
  // NamedType) carry their own attribute members.
}

export abstract class DataType extends Type implements IDataType {
  override readonly metaClass: string = "DataType";
}

// ─── 24. AggregateType (§8.2.1.3.4.2.7) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.7
 * @xmiId ASTMCore.ASTMSyntax.Types.AggregateType
 * @metaclass AggregateType (abstract)
 * @generalization DataType
 * @definition Types composed of heterogenous subtypes
 * @note §8.2.1.3.4.2.7 prose: "The class AggregateType is a subclass of
 *   DataType and has one or more association members to class MemberObject
 *   and the optional unary semantic property opensScope to the semantic
 *   class AggregateScope. The AggregateType has subclasses StructureType,
 *   UnionType, ClassType, AnnotationType."
 * @ownedAttributes
 *   • members    : MemberObject   [1..*] -- §8.2.1.3.4.2.7: one or more association members to class MemberObject.
 *   • opensScope : AggregateScope [1..1] -- §8.2.1.3.4.2.7: optional unary semantic property opensScope. EMOF lower="1" (PDF marks optional; EMOF prevails).
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IAggregateType extends IDataType {
  readonly members: ReadonlyArray<IMemberObject>;
  readonly opensScope: IAggregateScope;
}

export abstract class AggregateType extends DataType implements IAggregateType {
  override readonly metaClass: string = "AggregateType";
  readonly members: ReadonlyArray<IMemberObject>;
  readonly opensScope: IAggregateScope;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    members: ReadonlyArray<IMemberObject>;
    opensScope: IAggregateScope;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      isConst: args.isConst,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.members = args.members;
    this.opensScope = args.opensScope;
  }
}

// ─── 25. ConstructedType (§8.2.1.3.4.2.6) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.6
 * @xmiId ASTMCore.ASTMSyntax.Types.ConstructedType
 * @metaclass ConstructedType (abstract)
 * @generalization DataType
 * @definition Types constructed from a specified base type
 * @note §8.2.1.3.4.2.6 prose: "ConstructedType is a subclass of DataType, has
 *   unary property BaseType to class TypeReference, and subclasses PointerType,
 *   ArrayType, ReferenceType, CollectionType and RangeType for depicting types
 *   of these respective kinds." EMOF attribute name is `baseType` (lowercase b).
 * @ownedAttributes
 *   • baseType : TypeReference [1..1] -- §8.2.1.3.4.2.6: unary property baseType to class TypeReference.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IConstructedType extends IDataType {
  readonly baseType: ITypeReference;
}

export abstract class ConstructedType extends DataType implements IConstructedType {
  override readonly metaClass: string = "ConstructedType";
  readonly baseType: ITypeReference;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    baseType: ITypeReference;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      isConst: args.isConst,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.baseType = args.baseType;
  }
}

// ─── 26. FormalParameterType (§8.2.1.3.4.2.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.9
 * @xmiId ASTMCore.ASTMSyntax.Types.FormalParameterType
 * @metaclass FormalParameterType (abstract)
 * @generalization DataType
 * @definition Specifies the by-value/reference nature of formal parameters
 * @note §8.2.1.3.4.2.9 prose: "FormalParameterType is a subclass of DataType
 *   has unary association type to interior class Type and has subclasses
 *   ByReferenceFormalParameterType and ByValueParameterType. These two
 *   subclasses have no immediate properties or associations and are used for
 *   depicting the kind of FormalParameterType." Property Specification line
 *   in §8.2.1.3.4.2.9 and EMOF agree the target is TypeReference (not Type).
 * @ownedAttributes
 *   • type : TypeReference [1..1] -- §8.2.1.3.4.2.9: unary association type. EMOF target=TypeReference.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IFormalParameterType extends IDataType {
  readonly type: ITypeReference;
}

export abstract class FormalParameterType extends DataType implements IFormalParameterType {
  override readonly metaClass: string = "FormalParameterType";
  readonly type: ITypeReference;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    type: ITypeReference;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      isConst: args.isConst,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.type = args.type;
  }
}

// ─── 27. PrimitiveType (§8.2.1.3.4.2.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.1
 * @xmiId ASTMCore.ASTMSyntax.Types.PrimitiveType
 * @metaclass PrimitiveType (abstract)
 * @generalization DataType
 * @definition Void and Boolean are primitive types (not further decomposable), Represents all other signed and unsigned primitive types also.
 * @note §8.2.1.3.4.2.1 prose: "PrimitiveType is a subclass of DataType, and
 *   has terminal subclasses Boolean and Void, and subclass NumberType that
 *   is used to represent all signed types."
 * @ownedAttributes (none -- all attributes inherited from DataType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IPrimitiveType extends IDataType {
  // structural marker -- concrete subclasses (Boolean, Void) and abstract
  // sub-hierarchy NumberType carry their own attribute members.
}

export abstract class PrimitiveType extends DataType implements IPrimitiveType {
  override readonly metaClass: string = "PrimitiveType";
}

// ─── 28. NumberType (§8.2.1.3.4.2.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.2
 * @xmiId ASTMCore.ASTMSyntax.Types.NumberType
 * @metaclass NumberType (abstract)
 * @generalization PrimitiveType
 * @definition Byte and Character are primitive types (not further decomposable), Represents all other signed and unsigned numeral types also.
 * @note §8.2.1.3.4.2.2 prose: "NumberType is a subclass of PrimitiveType, and
 *   has terminal subclasses Byte, and Character, and subclasses IntegralType
 *   and RealType that is used to represent numeral types, and has property
 *   isSigned to primitive Boolean."
 * @ownedAttributes
 *   • isSigned : Boolean [1..1] -- §8.2.1.3.4.2.2: unary property isSigned to primitive Boolean. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface INumberType extends IPrimitiveType {
  readonly isSigned: boolean;
}

export abstract class NumberType extends PrimitiveType implements INumberType {
  override readonly metaClass: string = "NumberType";
  readonly isSigned: boolean;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    isSigned: boolean;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      isConst: args.isConst,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.isSigned = args.isSigned;
  }
}

// ─── 29. IntegralType (§8.2.1.3.4.2.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.3
 * @xmiId ASTMCore.ASTMSyntax.Types.IntegralType
 * @metaclass IntegralType (abstract)
 * @generalization NumberType
 * @definition ShortInteger, Integer, LongInteger are primitive types (not further decomposable). Enables to specify their sizes.
 * @note §8.2.1.3.4.2.3 prose: "IntegralType is a subclass of NumberType, and
 *   has terminal subclasses ShortInteger, Integer and LongInteger, and has
 *   optional semantic property size of type Integer." EMOF declares
 *   `size` with `lower="1"` (mandatory); PDF marks optional. EMOF prevails.
 * @ownedAttributes
 *   • size : Integer [1..1] -- §8.2.1.3.4.2.3: optional semantic property size of type Integer. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IIntegralType extends INumberType {
  readonly size: number;
}

export abstract class IntegralType extends NumberType implements IIntegralType {
  override readonly metaClass: string = "IntegralType";
  readonly size: number;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    isSigned: boolean;
    size: number;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      isConst: args.isConst,
      isSigned: args.isSigned,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.size = args.size;
  }
}

// ─── 30. RealType (§8.2.1.3.4.2.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.4
 * @xmiId ASTMCore.ASTMSyntax.Types.RealType
 * @metaclass RealType (abstract)
 * @generalization NumberType
 * @definition Real, Double, LongDouble are primitive types (not further decomposable). Optionally, precision can be specified.
 * @note §8.2.1.3.4.2.4 prose: "RealType is a subclass of NumberType, has
 *   terminal subclasses Real, Double and LongDouble, and has an optional
 *   semantic attribute precision of type Integer." EMOF declares `precision`
 *   with `lower="1"` (mandatory); PDF marks optional. EMOF prevails.
 * @ownedAttributes
 *   • precision : Integer [1..1] -- §8.2.1.3.4.2.4: optional semantic attribute precision of type Integer. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IRealType extends INumberType {
  readonly precision: number;
}

export abstract class RealType extends NumberType implements IRealType {
  override readonly metaClass: string = "RealType";
  readonly precision: number;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    isSigned: boolean;
    precision: number;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      isConst: args.isConst,
      isSigned: args.isSigned,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.precision = args.precision;
  }
}

// ─── 31. TypeReference (§8.2.1.3.4.5) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.5
 * @xmiId ASTMCore.ASTMSyntax.Types.TypeReference
 * @metaclass TypeReference (abstract)
 * @generalization Type
 * @definition References to types
 * @note §8.2.1.3.4.5 prose: "TypeReference is a subclass of Type with
 *   subclasses UnnamedTypeReference and NamedTypeReference."
 * @ownedAttributes (none -- all attributes inherited from Type)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ITypeReference extends IType {
  // structural marker -- concrete subclasses (UnnamedTypeReference,
  // NamedTypeReference) carry their own attribute members.
}

export abstract class TypeReference extends Type implements ITypeReference {
  override readonly metaClass: string = "TypeReference";
}

// ─── 32. DerivesFrom (§8.2.1.5.9.7) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.7
 * @xmiId ASTMCore.ASTMSyntax.Types.DerivesFrom
 * @metaclass DerivesFrom (concrete)
 * @generalization MinorSyntaxObject
 * @definition Specifies relationships between class types and the types from which they are derived
 * @note §8.2.1.5.9.7 prose: "DerivesFrom is a subclass of MinorSyntaxObject
 *   used for depicting the derived properties of a class. Derives from has
 *   optional association virtualSpecifier to class VirtualSpecification,
 *   association AccessKind to class accessKind, and association className to
 *   class NamedType." Property Specification line and EMOF target
 *   `className` to `NamedTypeReference` with upper="*"; EMOF prevails.
 * @ownedAttributes
 *   • accessKind       : AccessKind            [1..1] -- §8.2.1.5.9.7: association accessKind to class AccessKind.
 *   • virtualSpecifier : VirtualSpecification  [1..1] -- §8.2.1.5.9.7: optional association virtualSpecifier. EMOF lower="1" (PDF marks optional; EMOF prevails).
 *   • className        : NamedTypeReference    [1..*] -- §8.2.1.5.9.7: association className to NamedTypeReference. EMOF upper="*".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDerivesFrom extends IMinorSyntaxObject {
  readonly accessKind: IAccessKind;
  readonly virtualSpecifier: IVirtualSpecification;
  readonly className: ReadonlyArray<INamedTypeReference>;
}

export class DerivesFrom extends MinorSyntaxObject implements IDerivesFrom {
  override readonly metaClass = "DerivesFrom" as const;
  readonly accessKind: IAccessKind;
  readonly virtualSpecifier: IVirtualSpecification;
  readonly className: ReadonlyArray<INamedTypeReference>;
  constructor(args: {
    locationInfo: ISourceLocation;
    accessKind: IAccessKind;
    virtualSpecifier: IVirtualSpecification;
    className: ReadonlyArray<INamedTypeReference>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.accessKind = args.accessKind;
    this.virtualSpecifier = args.virtualSpecifier;
    this.className = args.className;
  }
}

// ─── 33. Dimension (§8.2.1.5.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.1
 * @xmiId ASTMCore.ASTMSyntax.Types.Dimension
 * @metaclass Dimension (concrete)
 * @generalization MinorSyntaxObject
 * @definition Range of subscript values for one dimension of an array type
 * @note §8.2.1.5.1 prose: "The interior class Dimension is a subclass of
 *   OtherSytnaxObject, and has unary associations highBound and lowBound to
 *   interior class Expression." (PDF spells "OtherSytnaxObject"; the EMOF
 *   superclass is MinorSyntaxObject. EMOF prevails.) EMOF declares both
 *   `lowBound` and `highBound` with `lower="1"`. PDF marks `lowBound`
 *   optional; EMOF prevails.
 * @ownedAttributes
 *   • lowBound  : Expression [1..1] -- §8.2.1.5.1: unary association lowBound to Expression. EMOF lower="1".
 *   • highBound : Expression [1..1] -- §8.2.1.5.1: unary association highBound to Expression. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDimension extends IMinorSyntaxObject {
  readonly lowBound: IExpression;
  readonly highBound: IExpression;
}

export class Dimension extends MinorSyntaxObject implements IDimension {
  override readonly metaClass = "Dimension" as const;
  readonly lowBound: IExpression;
  readonly highBound: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    lowBound: IExpression;
    highBound: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.lowBound = args.lowBound;
    this.highBound = args.highBound;
  }
}

// ─── 34. MemberObject (§8.2.1.5.9.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.8
 * @xmiId ASTMCore.ASTMSyntax.Types.MemberObject
 * @metaclass MemberObject (concrete)
 * @generalization MinorSyntaxObject
 * @definition Specifies members of an aggregate type. Optionally, allows specification of offset for each member.
 * @note §8.2.1.5.9.8 prose: "MemberObject is a subclass of MinorSyntaxObject
 *   used for depicting the members of an aggregate type. MemberObject has
 *   optional Integer property offset., and an assocation member to
 *   DefinitionObject." EMOF target preserves OMG xmi:id typo `DefintionObject`.
 * @ownedAttributes
 *   • offset : Integer         [1..1] -- §8.2.1.5.9.8: optional Integer property offset. EMOF lower="1" (PDF marks optional; EMOF prevails).
 *   • member : DefintionObject [1..1] -- §8.2.1.5.9.8: association member to DefinitionObject. EMOF xmi:id preserves OMG typo "Defintion".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IMemberObject extends IMinorSyntaxObject {
  readonly offset: number;
  readonly member: IDefintionObject;
}

export class MemberObject extends MinorSyntaxObject implements IMemberObject {
  override readonly metaClass = "MemberObject" as const;
  readonly offset: number;
  readonly member: IDefintionObject;
  constructor(args: {
    locationInfo: ISourceLocation;
    offset: number;
    member: IDefintionObject;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.offset = args.offset;
    this.member = args.member;
  }
}

// ─── 35. AnnotationType (§8.2.1.3.4.2.7) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.7
 * @xmiId ASTMCore.ASTMSyntax.Types.AnnotationType
 * @metaclass AnnotationType (concrete)
 * @generalization AggregateType
 * @definition Denotations that complete or extend the definitions of other types
 * @note §8.2.1.3.4.2.7 prose: "AnnotationType is a subclass of AggregateType,
 *   and used for denoting annotation types."
 * @ownedAttributes (none -- all attributes inherited from AggregateType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IAnnotationType extends IAggregateType {
  // pure marker interface -- AnnotationType inherits members and opensScope
  // from AggregateType without contributing additional structure.
}

export class AnnotationType extends AggregateType implements IAnnotationType {
  override readonly metaClass = "AnnotationType" as const;
}

// ─── 36. ClassType (§8.2.1.3.4.2.7) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.7
 * @xmiId ASTMCore.ASTMSyntax.Types.ClassType
 * @metaclass ClassType (concrete)
 * @generalization AggregateType
 * @definition Class types
 * @note §8.2.1.3.4.2.7 prose: "ClassType is a subclass of AggregateType, and
 *   has unary association derivesFrom to class DerivesFrom, and is used for
 *   denoting class types." EMOF declares `derivesFrom` with `upper="*"`.
 * @ownedAttributes
 *   • derivesFrom : DerivesFrom [1..*] -- §8.2.1.3.4.2.7: unary association derivesFrom. EMOF upper="*" (PDF Property Specification gives unary; EMOF prevails).
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IClassType extends IAggregateType {
  readonly derivesFrom: ReadonlyArray<IDerivesFrom>;
}

export class ClassType extends AggregateType implements IClassType {
  override readonly metaClass = "ClassType" as const;
  readonly derivesFrom: ReadonlyArray<IDerivesFrom>;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    members: ReadonlyArray<IMemberObject>;
    opensScope: IAggregateScope;
    derivesFrom: ReadonlyArray<IDerivesFrom>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      isConst: args.isConst,
      members: args.members,
      opensScope: args.opensScope,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.derivesFrom = args.derivesFrom;
  }
}

// ─── 37. StructureType (§8.2.1.3.4.2.7) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.7
 * @xmiId ASTMCore.ASTMSyntax.Types.StructureType
 * @metaclass StructureType (concrete)
 * @generalization AggregateType
 * @definition Simple structure types (no inheritance or function members)
 * @note §8.2.1.3.4.2.7 prose: "StructureType is a subclass of AggregateType
 *   and is used for denoting structured types."
 * @ownedAttributes (none -- all attributes inherited from AggregateType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IStructureType extends IAggregateType {
  // pure marker interface -- StructureType inherits members and opensScope
  // from AggregateType without contributing additional structure.
}

export class StructureType extends AggregateType implements IStructureType {
  override readonly metaClass = "StructureType" as const;
}

// ─── 38. UnionType (§8.2.1.3.4.2.7) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.7
 * @xmiId ASTMCore.ASTMSyntax.Types.UnionType
 * @metaclass UnionType (concrete)
 * @generalization AggregateType
 * @definition Union types (like structures but each data member occupies the same location)
 * @note §8.2.1.3.4.2.7 prose: "UnionType is a subclass of AggregateType and
 *   is used for denoting aggregate types."
 * @ownedAttributes (none -- all attributes inherited from AggregateType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IUnionType extends IAggregateType {
  // pure marker interface -- UnionType inherits members and opensScope
  // from AggregateType without contributing additional structure.
}

export class UnionType extends AggregateType implements IUnionType {
  override readonly metaClass = "UnionType" as const;
}

// ─── 39. ArrayType (§8.2.1.3.4.2.6) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.6
 * @xmiId ASTMCore.ASTMSyntax.Types.ArrayType
 * @metaclass ArrayType (concrete)
 * @generalization ConstructedType
 * @definition Array types
 * @note §8.2.1.3.4.2.6 prose: "ArrayType -- Definition: Array types." EMOF
 *   declares the `ranks` attribute (one or more Dimension associations) under
 *   ArrayType — matching the PDF Property Specification block: "ArrayType ->
 *   ranks : Dimension+".
 * @ownedAttributes
 *   • ranks : Dimension [1..*] -- §8.2.1.3.4.2.6 / EMOF: one or more associations ranks to class Dimension.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IArrayType extends IConstructedType {
  readonly ranks: ReadonlyArray<IDimension>;
}

export class ArrayType extends ConstructedType implements IArrayType {
  override readonly metaClass = "ArrayType" as const;
  readonly ranks: ReadonlyArray<IDimension>;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    baseType: ITypeReference;
    ranks: ReadonlyArray<IDimension>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      isConst: args.isConst,
      baseType: args.baseType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.ranks = args.ranks;
  }
}

// ─── 40. CollectionType (§8.2.1.3.4.2.6) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.6
 * @xmiId ASTMCore.ASTMSyntax.Types.CollectionType
 * @metaclass CollectionType (concrete)
 * @generalization ConstructedType
 * @definition Types characterized as collections (lists, sets, bags, ...)
 * @note §8.2.1.3.4.2.6 prose: "Collection Type -- Definition: Types
 *   characterized as collections (lists, sets, bags, ...)."
 * @ownedAttributes (none -- all attributes inherited from ConstructedType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ICollectionType extends IConstructedType {
  // pure marker interface -- CollectionType inherits baseType from
  // ConstructedType without contributing additional structure.
}

export class CollectionType extends ConstructedType implements ICollectionType {
  override readonly metaClass = "CollectionType" as const;
}

// ─── 41. PointerType (§8.2.1.3.4.2.6) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.6
 * @xmiId ASTMCore.ASTMSyntax.Types.PointerType
 * @metaclass PointerType (concrete)
 * @generalization ConstructedType
 * @definition Types whose values are pointers. Optionally, the size of the pointer can be specified.
 * @note §8.2.1.3.4.2.6 prose: "The class PointerType is a subclass of
 *   ConstructedType and has an optional semantic attribute size of type
 *   Integer." EMOF declares `size` with `lower="1"`; PDF marks optional.
 *   EMOF prevails.
 * @ownedAttributes
 *   • size : Integer [1..1] -- §8.2.1.3.4.2.6: optional semantic attribute size. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IPointerType extends IConstructedType {
  readonly size: number;
}

export class PointerType extends ConstructedType implements IPointerType {
  override readonly metaClass = "PointerType" as const;
  readonly size: number;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    baseType: ITypeReference;
    size: number;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      isConst: args.isConst,
      baseType: args.baseType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.size = args.size;
  }
}

// ─── 42. RangeType (§8.2.1.3.4.2.6) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.6
 * @xmiId ASTMCore.ASTMSyntax.Types.RangeType
 * @metaclass RangeType (concrete)
 * @generalization ConstructedType
 * @definition Types whose values are ranges
 * @note §8.2.1.3.4.2.6 prose: "Range Type -- Definition: Types whose values
 *   are ranges."
 * @ownedAttributes (none -- all attributes inherited from ConstructedType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IRangeType extends IConstructedType {
  // pure marker interface -- RangeType inherits baseType from ConstructedType
  // without contributing additional structure.
}

export class RangeType extends ConstructedType implements IRangeType {
  override readonly metaClass = "RangeType" as const;
}

// ─── 43. ReferenceType (§8.2.1.3.4.2.6) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.6
 * @xmiId ASTMCore.ASTMSyntax.Types.ReferenceType
 * @metaclass ReferenceType (concrete)
 * @generalization ConstructedType
 * @definition Types whose values are references
 * @note §8.2.1.3.4.2.6 prose: "Reference Type -- Definition: Types whose
 *   values are references."
 * @ownedAttributes (none -- all attributes inherited from ConstructedType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IReferenceType extends IConstructedType {
  // pure marker interface -- ReferenceType inherits baseType from
  // ConstructedType without contributing additional structure.
}

export class ReferenceType extends ConstructedType implements IReferenceType {
  override readonly metaClass = "ReferenceType" as const;
}

// ─── 44. ByReferenceFormalParameterType (§8.2.1.3.4.2.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.9
 * @xmiId ASTMCore.ASTMSyntax.Types.ByReferenceFormalParameterType
 * @metaclass ByReferenceFormalParameterType (concrete)
 * @generalization FormalParameterType
 * @definition Specifies that a formal parameter is to be passed by reference
 * @note §8.2.1.3.4.2.9 prose: "ByReferenceFormalParameterType -- Definition:
 *   Specifies that a formal parameter is to be passed by reference."
 * @ownedAttributes (none -- all attributes inherited from FormalParameterType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IByReferenceFormalParameterType extends IFormalParameterType {
  // pure marker interface -- ByReferenceFormalParameterType inherits the
  // `type` association from FormalParameterType without contributing
  // additional structure.
}

export class ByReferenceFormalParameterType extends FormalParameterType implements IByReferenceFormalParameterType {
  override readonly metaClass = "ByReferenceFormalParameterType" as const;
}

// ─── 45. ByValueFormalParameterType (§8.2.1.3.4.2.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.9
 * @xmiId ASTMCore.ASTMSyntax.Types.ByValueFormalParameterType
 * @metaclass ByValueFormalParameterType (concrete)
 * @generalization FormalParameterType
 * @definition Specifies that a formal parameter is to be passed by value
 * @note §8.2.1.3.4.2.9 prose: "ByValueFormalParameterType -- Definition:
 *   Specifies that a formal parameter is to be passed by value." PDF
 *   narrative spells the class "ByValueParameterType" in one place; the
 *   §-heading, the Definition line and the EMOF xmi:id all confirm
 *   `ByValueFormalParameterType`.
 * @ownedAttributes (none -- all attributes inherited from FormalParameterType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IByValueFormalParameterType extends IFormalParameterType {
  // pure marker interface -- ByValueFormalParameterType inherits the
  // `type` association from FormalParameterType without contributing
  // additional structure.
}

export class ByValueFormalParameterType extends FormalParameterType implements IByValueFormalParameterType {
  override readonly metaClass = "ByValueFormalParameterType" as const;
}

// ─── 46. Boolean (§8.2.1.3.4.2.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.1
 * @xmiId ASTMCore.ASTMSyntax.Types.Boolean
 * @metaclass Boolean (concrete)
 * @generalization PrimitiveType
 * @definition Boolean type
 * @note §8.2.1.3.4.2.1 prose: "Boolean -- Definition: Boolean type." The
 *   ASTM metaclass `Boolean` is one of the two terminal subclasses of
 *   PrimitiveType (the other being Void). The class name shadows the global
 *   `Boolean` constructor inside this module — TypeScript permits this in
 *   ES module scope and downstream consumers should refer to the metaclass
 *   via the qualified module import.
 * @ownedAttributes (none -- all attributes inherited from PrimitiveType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBoolean extends IPrimitiveType {
  // pure marker interface -- Boolean has no additional structure.
}

// eslint-disable-next-line @typescript-eslint/no-shadow
export class Boolean extends PrimitiveType implements IBoolean {
  override readonly metaClass = "Boolean" as const;
}

// ─── 47. Void (§8.2.1.3.4.2.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.1
 * @xmiId ASTMCore.ASTMSyntax.Types.Void
 * @metaclass Void (concrete)
 * @generalization PrimitiveType
 * @definition Void type
 * @note §8.2.1.3.4.2.1 prose: "Void -- Definition: Void type." The lower-case
 *   `void` is a TypeScript reserved keyword; capitalised `Void` is permitted
 *   as an identifier and preserves the OMG spec spelling verbatim.
 * @ownedAttributes (none -- all attributes inherited from PrimitiveType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IVoid extends IPrimitiveType {
  // pure marker interface -- Void has no additional structure.
}

export class Void extends PrimitiveType implements IVoid {
  override readonly metaClass = "Void" as const;
}

// ─── 48. Byte (§8.2.1.3.4.2.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.2
 * @xmiId ASTMCore.ASTMSyntax.Types.Byte
 * @metaclass Byte (concrete)
 * @generalization NumberType
 * @definition Byte type
 * @note §8.2.1.3.4.2.2 prose: "Byte -- Definition: Byte type." Terminal
 *   subclass of NumberType per §8.2.1.3.4.2.2 hierarchy specification.
 * @ownedAttributes (none -- all attributes inherited from NumberType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IByte extends INumberType {
  // pure marker interface -- Byte has no additional structure.
}

export class Byte extends NumberType implements IByte {
  override readonly metaClass = "Byte" as const;
}

// ─── 49. Character (§8.2.1.3.4.2.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.2
 * @xmiId ASTMCore.ASTMSyntax.Types.Character
 * @metaclass Character (concrete)
 * @generalization NumberType
 * @definition Character type
 * @note §8.2.1.3.4.2.2 prose: "Character -- Definition: Character type.
 *   Sematics: Character is denoted by the variable length character encoding
 *   for Unicode (UTF16)." Terminal subclass of NumberType per §8.2.1.3.4.2.2
 *   hierarchy specification.
 * @ownedAttributes (none -- all attributes inherited from NumberType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ICharacter extends INumberType {
  // pure marker interface -- Character has no additional structure.
}

export class Character extends NumberType implements ICharacter {
  override readonly metaClass = "Character" as const;
}

// ─── 50. Integer (§8.2.1.3.4.2.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.3
 * @xmiId ASTMCore.ASTMSyntax.Types.Integer
 * @metaclass Integer (concrete)
 * @generalization IntegralType
 * @definition Integer type
 * @note §8.2.1.3.4.2.3 prose: "Integer -- Definition: Integer type." Terminal
 *   subclass of IntegralType per §8.2.1.3.4.2.3 hierarchy specification.
 * @ownedAttributes (none -- all attributes inherited from IntegralType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IInteger extends IIntegralType {
  // pure marker interface -- Integer has no additional structure.
}

export class Integer extends IntegralType implements IInteger {
  override readonly metaClass = "Integer" as const;
}

// ─── 51. LongInteger (§8.2.1.3.4.2.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.3
 * @xmiId ASTMCore.ASTMSyntax.Types.LongInteger
 * @metaclass LongInteger (concrete)
 * @generalization IntegralType
 * @definition Long integer type
 * @note §8.2.1.3.4.2.3 prose: "LongInteger -- Definition: Long integer type."
 *   Terminal subclass of IntegralType per §8.2.1.3.4.2.3 hierarchy
 *   specification.
 * @ownedAttributes (none -- all attributes inherited from IntegralType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ILongInteger extends IIntegralType {
  // pure marker interface -- LongInteger has no additional structure.
}

export class LongInteger extends IntegralType implements ILongInteger {
  override readonly metaClass = "LongInteger" as const;
}

// ─── 52. ShortInteger (§8.2.1.3.4.2.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.3
 * @xmiId ASTMCore.ASTMSyntax.Types.ShortInteger
 * @metaclass ShortInteger (concrete)
 * @generalization IntegralType
 * @definition Short integer type
 * @note §8.2.1.3.4.2.3 prose: "ShortInteger -- Definition: Short integer
 *   type." Terminal subclass of IntegralType per §8.2.1.3.4.2.3 hierarchy
 *   specification.
 * @ownedAttributes (none -- all attributes inherited from IntegralType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IShortInteger extends IIntegralType {
  // pure marker interface -- ShortInteger has no additional structure.
}

export class ShortInteger extends IntegralType implements IShortInteger {
  override readonly metaClass = "ShortInteger" as const;
}

// ─── 53. Double (§8.2.1.3.4.2.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.4
 * @xmiId ASTMCore.ASTMSyntax.Types.Double
 * @metaclass Double (concrete)
 * @generalization RealType
 * @definition Floating-point type
 * @note §8.2.1.3.4.2.4 prose: "Double -- Definition: Floating-point type."
 *   Terminal subclass of RealType per §8.2.1.3.4.2.4 hierarchy specification.
 * @ownedAttributes (none -- all attributes inherited from RealType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDouble extends IRealType {
  // pure marker interface -- Double has no additional structure.
}

export class Double extends RealType implements IDouble {
  override readonly metaClass = "Double" as const;
}

// ─── 54. LongDouble (§8.2.1.3.4.2.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.4
 * @xmiId ASTMCore.ASTMSyntax.Types.LongDouble
 * @metaclass LongDouble (concrete)
 * @generalization RealType
 * @definition Long floating-point type
 * @note §8.2.1.3.4.2.4 prose: "LongDouble -- Definition: Long floating-point
 *   type." Terminal subclass of RealType per §8.2.1.3.4.2.4 hierarchy
 *   specification.
 * @ownedAttributes (none -- all attributes inherited from RealType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ILongDouble extends IRealType {
  // pure marker interface -- LongDouble has no additional structure.
}

export class LongDouble extends RealType implements ILongDouble {
  override readonly metaClass = "LongDouble" as const;
}

// ─── 55. Real (§8.2.1.3.4.2.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.4
 * @xmiId ASTMCore.ASTMSyntax.Types.Real
 * @metaclass Real (concrete)
 * @generalization RealType
 * @definition Short floating-point type
 * @note §8.2.1.3.4.2.4 prose: "Real -- Definition: Short floating-point
 *   type." Terminal subclass of RealType per §8.2.1.3.4.2.4 hierarchy
 *   specification.
 * @ownedAttributes (none -- all attributes inherited from RealType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IReal extends IRealType {
  // pure marker interface -- Real has no additional structure.
}

export class Real extends RealType implements IReal {
  override readonly metaClass = "Real" as const;
}

// ─── 56. EnumType (§8.2.1.3.4.2.5) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.5
 * @xmiId ASTMCore.ASTMSyntax.Types.EnumType
 * @metaclass EnumType (concrete)
 * @generalization DataType
 * @definition Enumerated types
 * @note §8.2.1.3.4.2.5 prose: "EnumType is a subclass of DataType, and has
 *   one to many association enumLiterals to EnumLiteralDefinition."
 * @ownedAttributes
 *   • enumLiterals : EnumLiteralDefinition [1..*] -- §8.2.1.3.4.2.5: one to many association enumLiterals to EnumLiteralDefinition.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IEnumType extends IDataType {
  readonly enumLiterals: ReadonlyArray<IEnumLiteralDefinition>;
}

export class EnumType extends DataType implements IEnumType {
  override readonly metaClass = "EnumType" as const;
  readonly enumLiterals: ReadonlyArray<IEnumLiteralDefinition>;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    enumLiterals: ReadonlyArray<IEnumLiteralDefinition>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      isConst: args.isConst,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.enumLiterals = args.enumLiterals;
  }
}

// ─── 57. ExceptionType (§8.2.1.3.4.2.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.8
 * @xmiId ASTMCore.ASTMSyntax.Types.ExceptionType
 * @metaclass ExceptionType (concrete)
 * @generalization DataType
 * @definition Types used in the context of exception generation/handling
 * @note §8.2.1.3.4.2.8 prose: "ExceptionType is a subclass of DataType used
 *   for denoting exception types."
 * @ownedAttributes (none -- all attributes inherited from DataType)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IExceptionType extends IDataType {
  // pure marker interface -- ExceptionType has no additional structure.
}

export class ExceptionType extends DataType implements IExceptionType {
  override readonly metaClass = "ExceptionType" as const;
}

// ─── 58. NamedType (§8.2.1.3.4.2.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.2.9
 * @xmiId ASTMCore.ASTMSyntax.Types.NamedType
 * @metaclass NamedType (concrete)
 * @generalization DataType
 * @definition Uses of named types
 * @note §8.2.1.3.4.2.9 prose: "NamedType is a subclass of DataType, and has
 *   zero to any number association body to class Type. (the typeDef body)"
 *   EMOF declares `body` with `lower="1"`, `upper="1"` (unary); the PDF
 *   Property Specification says `body : Type` (unary). EMOF prevails.
 * @ownedAttributes
 *   • body : Type [1..1] -- §8.2.1.3.4.2.9: association body to class Type. EMOF lower="1" upper="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface INamedType extends IDataType {
  readonly body: IType;
}

export class NamedType extends DataType implements INamedType {
  override readonly metaClass = "NamedType" as const;
  readonly body: IType;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    body: IType;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      isConst: args.isConst,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.body = args.body;
  }
}

// ─── 59. FunctionType (§8.2.1.3.4.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.1
 * @xmiId ASTMCore.ASTMSyntax.Types.FunctionType
 * @metaclass FunctionType (concrete)
 * @generalization Type
 * @definition Function types
 * @note §8.2.1.3.4.1 prose: "FunctionType is a subclass of Type, and has zero
 *   to any association parameterTypes to class FormalParameterType and unary
 *   association returnType to class Type." EMOF target of `returnType` is
 *   `TypeReference` (matching Property Specification line). EMOF `parameterTypes`
 *   declared with `upper="*"` and `lower="1"`. EMOF prevails.
 * @ownedAttributes
 *   • returnType     : TypeReference        [1..1] -- §8.2.1.3.4.1: unary association returnType. EMOF target=TypeReference.
 *   • parameterTypes : FormalParameterType  [1..*] -- §8.2.1.3.4.1: association parameterTypes to FormalParameterType. EMOF upper="*".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IFunctionType extends IType {
  readonly returnType: ITypeReference;
  readonly parameterTypes: ReadonlyArray<IFormalParameterType>;
}

export class FunctionType extends Type implements IFunctionType {
  override readonly metaClass = "FunctionType" as const;
  readonly returnType: ITypeReference;
  readonly parameterTypes: ReadonlyArray<IFormalParameterType>;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    returnType: ITypeReference;
    parameterTypes: ReadonlyArray<IFormalParameterType>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      isConst: args.isConst,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.returnType = args.returnType;
    this.parameterTypes = args.parameterTypes;
  }
}

// ─── 60. LabelType (§8.2.1.3.4.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.3
 * @xmiId ASTMCore.ASTMSyntax.Types.LabelType
 * @metaclass LabelType (concrete)
 * @generalization Type
 * @definition The type of a label.
 * @note §8.2.1.3.4.3 prose: "LabelType is a subclass of Type, used for
 *   depicting that the type of an element is a label."
 * @ownedAttributes (none -- all attributes inherited from Type)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ILabelType extends IType {
  // pure marker interface -- LabelType has no additional structure.
}

export class LabelType extends Type implements ILabelType {
  override readonly metaClass = "LabelType" as const;
}

// ─── 61. NameSpaceType (§8.2.1.3.4.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.4
 * @xmiId ASTMCore.ASTMSyntax.Types.NameSpaceType
 * @metaclass NameSpaceType (concrete)
 * @generalization Type
 * @definition The type of a namespace.
 * @note §8.2.1.3.4.4 prose (spelled "NamespaceType" in narrative):
 *   "NamespaceType is a subclass of Type used for depicting that the type of
 *   an element is a namespace." The EMOF declares the metaclass with the
 *   spelling `NameSpaceType` (capital S in middle); we honour the EMOF
 *   source-of-truth.
 * @ownedAttributes (none -- all attributes inherited from Type)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface INameSpaceType extends IType {
  // pure marker interface -- NameSpaceType has no additional structure.
}

export class NameSpaceType extends Type implements INameSpaceType {
  override readonly metaClass = "NameSpaceType" as const;
}

// ─── 62. NamedTypeReference (§8.2.1.3.4.5.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.5.2
 * @xmiId ASTMCore.ASTMSyntax.Types.NamedTypeReference
 * @metaclass NamedTypeReference (concrete)
 * @generalization TypeReference
 * @definition References to types via the name of the referenced type
 * @note §8.2.1.3.4.5.2 prose: "NamedTypeReference is a subclass of
 *   TypeReference with unary association type to Type and unary association
 *   typeName to Name." Property Specification line gives
 *   `typeName : Name` and `type : TypeDefinition` (EMOF target of `type`
 *   resolves to `ASTMCore.ASTMSyntax.DeclarationAndDefinition.TypeDefinition`).
 *   EMOF prevails.
 * @ownedAttributes
 *   • typeName : Name           [1..1] -- §8.2.1.3.4.5.2: unary association typeName to Name.
 *   • type     : TypeDefinition [1..1] -- §8.2.1.3.4.5.2: association type to TypeDefinition (EMOF target).
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface INamedTypeReference extends ITypeReference {
  readonly typeName: IName;
  readonly type: ITypeDefinition;
}

export class NamedTypeReference extends TypeReference implements INamedTypeReference {
  override readonly metaClass = "NamedTypeReference" as const;
  readonly typeName: IName;
  readonly type: ITypeDefinition;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    typeName: IName;
    type: ITypeDefinition;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      isConst: args.isConst,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.typeName = args.typeName;
    this.type = args.type;
  }
}

// ─── 63. UnnamedTypeReference (§8.2.1.3.4.5.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.4.5.1
 * @xmiId ASTMCore.ASTMSyntax.Types.UnnamedTypeReference
 * @metaclass UnnamedTypeReference (concrete)
 * @generalization TypeReference
 * @definition References to types without the use of a name for the referenced type
 * @note §8.2.1.3.4.5.1 prose: "UnnamedTypeReference is a subclass of
 *   TypeReference with unary association type to Type."
 * @ownedAttributes
 *   • type : Type [1..1] -- §8.2.1.3.4.5.1: unary association type to Type.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IUnnamedTypeReference extends ITypeReference {
  readonly type: IType;
}

export class UnnamedTypeReference extends TypeReference implements IUnnamedTypeReference {
  override readonly metaClass = "UnnamedTypeReference" as const;
  readonly type: IType;
  constructor(args: {
    locationInfo: ISourceLocation;
    isConst: boolean;
    type: IType;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      isConst: args.isConst,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.type = args.type;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// END Implementer #2 (Wave 1.2). Next implementer starts at class 64.
// ═══════════════════════════════════════════════════════════════════════════
