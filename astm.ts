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

// ═══════════════════════════════════════════════════════════════════════════
// BEGIN Implementer #3 (Wave 1.3): GASTM DeclarationAndDefinition — 37 metaclasses
//
// Scope: ASTMCore.ASTMSyntax.DeclarationAndDefinition nested package,
// comprising the entire Declaration/Definition hierarchy enumerated by
// §8.2.1.3.2 / §8.2.1.3.3 of formal-11-01-05 and
// `<nestedPackage name="DeclarationAndDefinition">` of ASTM-EMOF.xml:
//   • Abstract roots                                                —  8 classes
//     (DefintionObject, DeclarationOrDefinition, Declaration,
//      Definition, DataDefinition, TypeDeclaration,
//      StorageSpecification, VirtualSpecification)
//   • TypeDefinition + MinorSyntaxObject concrete leaves            —  4 classes
//     (TypeDefinition, AccessKind, Name, FunctionMemberAttributes)
//   • AccessKind concrete leaves                                    —  3 classes
//     (Public, Private, Protected)
//   • StorageSpecification concrete leaves                          —  5 classes
//     (External, FileLocal, FunctionPersistent, Nodef, PerClassMember)
//   • VirtualSpecification concrete leaf                            —  1 class
//     (Virtual)
//   • TypeDeclaration concrete leaves                               —  2 classes
//     (AggregateTypeDeclaration, EnumTypeDeclaration)
//   • TypeDefinition concrete leaves                                —  3 classes
//     (AggregateTypeDefinition, EnumTypeDefinition, NamedTypeDefinition)
//   • Declaration concrete leaves                                   —  3 classes
//     (VariableDeclaration, FunctionDeclaration, FormalParameterDeclaration)
//   • Definition concrete leaves                                    —  3 classes
//     (EntryDefinition, EnumLiteralDefinition, FunctionDefintion)
//   • DataDefinition concrete leaves                                —  3 classes
//     (BitFieldDefinition, FormalParameterDefinition, VariableDefinition)
//   • DefintionObject concrete leaves outside the above hierarchies —  2 classes
//     (LabelDefinition, NameSpaceDefinition)
//                                                                    ────────
//                                                                    37 classes
//
// Notes on OMG spec choices observed during this wave:
//   1. The EMOF declares `xmi:id="ASTMCore.ASTMSyntax.DeclarationAndDefinition.DefintionObject"`
//      and `xmi:id="ASTMCore.ASTMSyntax.DeclarationAndDefinition.FunctionDefintion"` —
//      OMG misspells "Definition" as "Defintion" (missing second 'i')
//      consistently across BOTH metaclasses' xmi:id values AND the
//      attribute `name=` strings. We preserve OMG's spelling VERBATIM:
//        • The TypeScript identifiers are `DefintionObject` and
//          `FunctionDefintion` (matching xmi:id).
//        • The `@xmiId` JSDoc lines carry the literal misspelling.
//        • An `@note` flags the typo on each affected class so downstream
//          ASTM XMI round-tripping remains lossless.
//      The §8.2 PDF prose freely mixes `DefinitionObject` /
//      `FunctionDefinition` (correct English) with the typo in heading
//      titles, table headers, and BNF blocks. EMOF is the source-of-truth.
//   2. PDF §8.2.1.3.3.1 declares Declaration's `identifierName : Name?`
//      as optional. EMOF declares the same attribute with NO `lower=`
//      attribute (defaulting to lower="1"), but the BNF block confirms
//      optionality. EMOF leaves `lower` unset on Declaration's
//      `identifierName`, which under EMOF defaulting rules collapses to
//      `[0..1]`. We honour the optional reading consistently.
//   3. The EMOF redeclares `identifierName` and `definitionType` on
//      Definition (lines 142-148 of ASTM-EMOF.xml). These override the
//      Declaration-inherited members with `lower="1"` (mandatory) on
//      `identifierName` and an opposite-association binding on the
//      `ofDeclaration` end. We follow the EMOF: Definition's
//      `identifierName` is mandatory `[1..1]`; Declaration's is optional
//      `[0..1]`.
//   4. `Definition.ofDeclaration ↔ Declaration.defRef` is a bi-directional
//      EMOF Association declared via `opposite=` on both attribute ends.
//      In TypeScript we surface both directions as `readonly` properties;
//      enforcement of the opposite-end invariant is delegated to the PRE
//      engine consuming this surface (not enforced at the type-system
//      level — TypeScript has no notion of `opposite` associations).
//   5. `FunctionDefintion.opensScope ↔ FunctionScope.scopeOpenedBy` is
//      similarly a bi-directional EMOF Association. Both ends are
//      declared `lower="1"` (mandatory). Wave 1.1 already declared the
//      FunctionScope side; we now close the loop on the
//      FunctionDefintion side.
//   6. PDF §8.2.1.3.3.4 names the namespace-definition metaclass
//      `NamespaceDefinition` (lowercase 's'). EMOF spells it
//      `NameSpaceDefinition` (capital 'S' in the middle), mirroring
//      Wave 1.2's `NameSpaceType` choice. We honour EMOF
//      source-of-truth: TypeScript identifier `NameSpaceDefinition`,
//      `@xmiId` preserves EMOF spelling, `@note` flags both spellings.
//   7. Stale forward-shadow aliases (`IDefintionObject`,
//      `IFunctionDefintion`, `IName`, `IAccessKind`,
//      `IVirtualSpecification`, `IEnumLiteralDefinition`,
//      `ITypeDefinition`) declared by Wave 1.1's alias block have been
//      REMOVED because this wave authors the real interfaces. The
//      remaining forward shadows (`IAnnotationExpression`, `IExpression`,
//      `IStatement`) are still consumed by Wave 4 (Expression) and
//      Wave 5 (Statement).
// ═══════════════════════════════════════════════════════════════════════════

// ─── 64. DefintionObject (§8.2.1.3.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.2
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.DefintionObject
 * @metaclass DefintionObject (abstract)
 * @generalization GASTMSyntaxObject
 * @definition Constructs that define entities
 * @note OMG spells this metaclass `DefintionObject` (missing the second 'i')
 *   uniformly in the EMOF `xmi:id` value and `name=` attribute. The PDF prose
 *   heading at §8.2.1.3.2 reads `DefinitionObject` (correct English) but the
 *   EMOF is the normative source-of-truth. The TypeScript identifier preserves
 *   OMG's misspelling so the metaclass surface round-trips losslessly through
 *   the ASTM-EMOF.xml machine-consumable artifact.
 * @ownedAttributes (none -- all attributes inherited from GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDefintionObject extends IGASTMSyntaxObject {
  // structural marker — concrete subclasses (TypeDefinition, NameSpaceDefinition,
  // LabelDefinition, TypeDeclaration, and the DeclarationOrDefinition hierarchy)
  // carry their own attribute members.
}

export abstract class DefintionObject extends GASTMSyntaxObject implements IDefintionObject {
  override readonly metaClass: string = "DefintionObject";
  constructor(args: {
    locationInfo: ISourceLocation;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
  }
}

// ─── 65. DeclarationOrDefinition (§8.2.1.3.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.DeclarationOrDefinition
 * @metaclass DeclarationOrDefinition (abstract)
 * @generalization DefintionObject
 * @definition Declarations and definitions
 * @note §8.2.1.3.3 prose: "DeclarationOrDefinition is a subclass of
 *   GASTMSyntaxObject and has immediate subclasses Declaration, Definition.
 *   DeclarationOrDefinition has unary association storageSpecifiers to class
 *   StorageSpecification, unary association accessKind to class AccessKind,
 *   unary property linkageSpecifier to primitive String." EMOF spells the
 *   association `storageSpecifier` (singular) — we honour EMOF.
 * @ownedAttributes
 *   • linkageSpecifier : String                [0..1] -- §8.2.1.3.3: unary property linkageSpecifier to primitive String. EMOF has no `lower=`.
 *   • accessKind       : AccessKind            [1..1] -- §8.2.1.3.3: unary association accessKind to AccessKind. EMOF lower="1".
 *   • storageSpecifier : StorageSpecification  [1..1] -- §8.2.1.3.3: unary association storageSpecifier(s) to StorageSpecification. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDeclarationOrDefinition extends IDefintionObject {
  readonly linkageSpecifier?: string;
  readonly accessKind: IAccessKind;
  readonly storageSpecifier: IStorageSpecification;
}

export abstract class DeclarationOrDefinition extends DefintionObject implements IDeclarationOrDefinition {
  override readonly metaClass: string = "DeclarationOrDefinition";
  readonly linkageSpecifier?: string;
  readonly accessKind: IAccessKind;
  readonly storageSpecifier: IStorageSpecification;
  constructor(args: {
    locationInfo: ISourceLocation;
    accessKind: IAccessKind;
    storageSpecifier: IStorageSpecification;
    linkageSpecifier?: string;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.accessKind = args.accessKind;
    this.storageSpecifier = args.storageSpecifier;
    this.linkageSpecifier = args.linkageSpecifier;
  }
}

// ─── 66. Declaration (§8.2.1.3.3.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.1
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.Declaration
 * @metaclass Declaration (abstract)
 * @generalization DeclarationOrDefinition
 * @definition Constructs that declare entities without defining them
 * @note §8.2.1.3.3.1 prose: "Declaration is a subclass of DeclarationOrDefinition
 *   and has immediate subclasses VariableDeclaration and FunctionDeclaration
 *   and FormalParameterDeclaration. Declaration has unary semantic association
 *   defRef to Definition (This association is hidden below, but is shown above).
 *   Declaration has optional unary association identifierName to class Name."
 *   EMOF declares `declarationType : TypeReference [1..1]` on Declaration.
 *   `defRef ↔ Definition.ofDeclaration` is a bi-directional EMOF Association
 *   (`opposite=` declared on both ends); TypeScript surfaces both directions
 *   as `readonly` properties.
 * @ownedAttributes
 *   • identifierName  : Name           [0..1] -- §8.2.1.3.3.1: optional unary association identifierName to Name. EMOF has no `lower=`.
 *   • declarationType : TypeReference  [1..1] -- §8.2.1.3.3.1: unary association declarationType to TypeReference. EMOF lower="1".
 *   • defRef          : Definition     [1..1] -- §8.2.1.3.3.1: semantic association defRef to Definition. EMOF lower="1" + opposite=Definition.ofDeclaration.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDeclaration extends IDeclarationOrDefinition {
  readonly identifierName?: IName;
  readonly declarationType: ITypeReference;
  readonly defRef: IDefinition;
}

export abstract class Declaration extends DeclarationOrDefinition implements IDeclaration {
  override readonly metaClass: string = "Declaration";
  readonly identifierName?: IName;
  readonly declarationType: ITypeReference;
  readonly defRef: IDefinition;
  constructor(args: {
    locationInfo: ISourceLocation;
    accessKind: IAccessKind;
    storageSpecifier: IStorageSpecification;
    declarationType: ITypeReference;
    defRef: IDefinition;
    linkageSpecifier?: string;
    identifierName?: IName;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      accessKind: args.accessKind,
      storageSpecifier: args.storageSpecifier,
      linkageSpecifier: args.linkageSpecifier,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.declarationType = args.declarationType;
    this.defRef = args.defRef;
    this.identifierName = args.identifierName;
  }
}

// ─── 67. Definition (§8.2.1.3.3.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.2
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.Definition
 * @metaclass Definition (abstract)
 * @generalization DeclarationOrDefinition
 * @definition Constructs that declare entities as they also define them
 * @note §8.2.1.3.3.2 prose: "Definition is a subclass of DeclarationOrDefinition,
 *   and has immediate subclasses FunctionDefinition, EntryDefinition,
 *   DataDefinition, EnumLiteralDefinition. Definition has unary association
 *   unary association identifierName to class Name, and optional unary
 *   association definitionType to TypeReference." EMOF declares
 *   `identifierName : Name` with `lower="1"` here, overriding Declaration's
 *   optional inheritance; `definitionType : TypeReference` is optional;
 *   `ofDeclaration : Declaration` is mandatory (`lower="1"`) and carries
 *   `opposite=Declaration.defRef`.
 * @ownedAttributes
 *   • identifierName : Name          [1..1] -- §8.2.1.3.3.2: unary association identifierName to Name. EMOF lower="1" (mandatory override).
 *   • definitionType : TypeReference [0..1] -- §8.2.1.3.3.2: optional unary association definitionType to TypeReference. EMOF has no `lower=`.
 *   • ofDeclaration  : Declaration   [1..1] -- §8.2.1.3.3.2: association ofDeclaration to Declaration. EMOF lower="1" + opposite=Declaration.defRef.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDefinition extends IDeclarationOrDefinition {
  readonly identifierName: IName;
  readonly definitionType?: ITypeReference;
  readonly ofDeclaration: IDeclaration;
}

export abstract class Definition extends DeclarationOrDefinition implements IDefinition {
  override readonly metaClass: string = "Definition";
  readonly identifierName: IName;
  readonly definitionType?: ITypeReference;
  readonly ofDeclaration: IDeclaration;
  constructor(args: {
    locationInfo: ISourceLocation;
    accessKind: IAccessKind;
    storageSpecifier: IStorageSpecification;
    identifierName: IName;
    ofDeclaration: IDeclaration;
    linkageSpecifier?: string;
    definitionType?: ITypeReference;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      accessKind: args.accessKind,
      storageSpecifier: args.storageSpecifier,
      linkageSpecifier: args.linkageSpecifier,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.identifierName = args.identifierName;
    this.ofDeclaration = args.ofDeclaration;
    this.definitionType = args.definitionType;
  }
}

// ─── 68. DataDefinition (§8.2.1.3.3.2.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.2.3
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.DataDefinition
 * @metaclass DataDefinition (abstract)
 * @generalization Definition
 * @definition Definitions involving data
 * @note §8.2.1.3.3.2.3 prose: "DataDefinition is a subclass of Definition, and
 *   has subclasses VariableDefinition, FormalParameter, and BitFieldDefinition.
 *   DataDefinition has unary property isMutable to primitive Boolean, and
 *   unary association initialValue to Expression."
 * @ownedAttributes
 *   • isMutable    : Boolean    [0..1] -- §8.2.1.3.3.2.3: unary property isMutable to primitive Boolean. EMOF has no `lower=`.
 *   • initialValue : Expression [0..1] -- §8.2.1.3.3.2.3: unary association initialValue to Expression. EMOF has no `lower=` (PDF marks Expression?).
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDataDefinition extends IDefinition {
  readonly isMutable?: boolean;
  readonly initialValue?: IExpression;
}

export abstract class DataDefinition extends Definition implements IDataDefinition {
  override readonly metaClass: string = "DataDefinition";
  readonly isMutable?: boolean;
  readonly initialValue?: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    accessKind: IAccessKind;
    storageSpecifier: IStorageSpecification;
    identifierName: IName;
    ofDeclaration: IDeclaration;
    linkageSpecifier?: string;
    definitionType?: ITypeReference;
    isMutable?: boolean;
    initialValue?: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      accessKind: args.accessKind,
      storageSpecifier: args.storageSpecifier,
      identifierName: args.identifierName,
      ofDeclaration: args.ofDeclaration,
      linkageSpecifier: args.linkageSpecifier,
      definitionType: args.definitionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.isMutable = args.isMutable;
    this.initialValue = args.initialValue;
  }
}

// ─── 69. TypeDeclaration (§8.2.1.3.3.6) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.6
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.TypeDeclaration
 * @metaclass TypeDeclaration (abstract)
 * @generalization DefintionObject
 * @definition Forward Declaration of user-defined types (aggregates and enumerations)
 * @note §8.2.1.3.3.6 prose: "TypeDeclaration is a subclass of DefinitionObject
 *   and has unary association typeReference to class TypeReference, and
 *   subclasses AggregateTypeDeclaration, and EnumTypeDeclaration."
 * @ownedAttributes
 *   • typeReference : TypeReference [1..1] -- §8.2.1.3.3.6: unary association typeReference to TypeReference. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ITypeDeclaration extends IDefintionObject {
  readonly typeReference: ITypeReference;
}

export abstract class TypeDeclaration extends DefintionObject implements ITypeDeclaration {
  override readonly metaClass: string = "TypeDeclaration";
  readonly typeReference: ITypeReference;
  constructor(args: {
    locationInfo: ISourceLocation;
    typeReference: ITypeReference;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.typeReference = args.typeReference;
  }
}

// ─── 70. StorageSpecification (§8.2.1.5.9.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.2
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.StorageSpecification
 * @metaclass StorageSpecification (abstract)
 * @generalization MinorSyntaxObject
 * @definition a property of data that depicts how it is is allocated
 * @note §8.2.1.5.9.2 prose: "StorageSpecification is a subclass of
 *   OtherSytnaxObject [sic — PDF typo for MinorSyntaxObject; EMOF resolves
 *   superClass to MinorSyntaxObject], and has subclasses External,
 *   FunctionPersistent, FileLocal, PerClassMember, NoDef." Note the
 *   EMOF spelling `Nodef` (lowercase 'd') for the metaclass that the PDF
 *   prose spells `NoDef` (capital 'D').
 * @ownedAttributes (none)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IStorageSpecification extends IMinorSyntaxObject {
  // structural marker — concrete subclasses (External, FileLocal,
  // FunctionPersistent, Nodef, PerClassMember) carry no further attributes.
}

export abstract class StorageSpecification extends MinorSyntaxObject implements IStorageSpecification {
  override readonly metaClass: string = "StorageSpecification";
}

// ─── 71. VirtualSpecification (§8.2.1.5.9.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.3
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.VirtualSpecification
 * @metaclass VirtualSpecification (abstract)
 * @generalization MinorSyntaxObject
 * @definition Specifications of the virtual characteristics of a function member
 * @note §8.2.1.5.9.3 prose: "VirtualSpecification is subclass of
 *   MinorSyntaxObject that is used for specifying if a class member is virtual."
 *   Has terminal subclass Virtual.
 * @ownedAttributes (none)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IVirtualSpecification extends IMinorSyntaxObject {
  // structural marker — concrete subclass (Virtual) carries no further attributes.
}

export abstract class VirtualSpecification extends MinorSyntaxObject implements IVirtualSpecification {
  override readonly metaClass: string = "VirtualSpecification";
}

// ─── 72. TypeDefinition (§8.2.1.3.3.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.3
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.TypeDefinition
 * @metaclass TypeDefinition (concrete)
 * @generalization DefintionObject
 * @definition Definitions of types
 * @note §8.2.1.3.3.3 prose: "TypeDefinition is a subclass of DefinitionObject
 *   and has unary association name to class typeName, and subclasses
 *   NamedTypeDefinition, AggregateTypeDefinition, and EnumTypeDefinition."
 *   EMOF declares TypeDefinition without `isAbstract="true"`, so it is
 *   concrete under EMOF defaulting rules (a deviation from typical OO
 *   modelling that would mark a class with subclasses as abstract). We
 *   honour the EMOF source-of-truth.
 * @ownedAttributes
 *   • typeName : Name [1..1] -- §8.2.1.3.3.3: unary association typeName to Name. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ITypeDefinition extends IDefintionObject {
  readonly typeName: IName;
}

export class TypeDefinition extends DefintionObject implements ITypeDefinition {
  override readonly metaClass: string = "TypeDefinition";
  readonly typeName: IName;
  constructor(args: {
    locationInfo: ISourceLocation;
    typeName: IName;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.typeName = args.typeName;
  }
}

// ─── 73. AccessKind (§8.2.1.5.9.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.4
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.AccessKind
 * @metaclass AccessKind (concrete)
 * @generalization MinorSyntaxObject
 * @definition Specifications of the kind of access provided by a member or base class
 * @note §8.2.1.5.9.4 prose: "AccessKind is subclass of MinorSyntaxObject used
 *   for specifying that class member is Public, Protected of Private and has
 *   subclasses Public, Protected, and Private for those denotations." EMOF
 *   declares AccessKind without `isAbstract="true"`, so it is concrete under
 *   EMOF defaulting rules.
 * @ownedAttributes (none)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IAccessKind extends IMinorSyntaxObject {
  // structural marker — concrete subclasses (Public, Private, Protected) carry
  // no further attributes.
}

export class AccessKind extends MinorSyntaxObject implements IAccessKind {
  override readonly metaClass: string = "AccessKind";
}

// ─── 74. Name (§8.2.1.5.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.3
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.Name
 * @metaclass Name (concrete)
 * @generalization MinorSyntaxObject
 * @definition Names that may appear in declarations and definitions
 * @note §8.2.1.5.3 prose: "Name is a subclass of OtherSytnaxObject [sic — PDF
 *   typo for MinorSyntaxObject; EMOF resolves superClass to
 *   MinorSyntaxObject], and has Unary Association nameString to Primitive
 *   String." EMOF adds a self-referential association
 *   `ofTypeReference : Name [1..1]` (not enumerated in the PDF Property
 *   Specification block but present in EMOF).
 * @ownedAttributes
 *   • nameString      : String [0..1] -- §8.2.1.5.3: unary property nameString to primitive String. EMOF has no `lower=`.
 *   • ofTypeReference : Name   [1..1] -- §8.2.1.5.3 (EMOF only): unary association ofTypeReference to Name. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IName extends IMinorSyntaxObject {
  readonly nameString?: string;
  readonly ofTypeReference: IName;
}

export class Name extends MinorSyntaxObject implements IName {
  override readonly metaClass: string = "Name";
  readonly nameString?: string;
  readonly ofTypeReference: IName;
  constructor(args: {
    locationInfo: ISourceLocation;
    ofTypeReference: IName;
    nameString?: string;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.ofTypeReference = args.ofTypeReference;
    this.nameString = args.nameString;
  }
}

// ─── 75. FunctionMemberAttributes (§8.2.1.5.9.6) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.6
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.FunctionMemberAttributes
 * @metaclass FunctionMemberAttributes (concrete)
 * @generalization MinorSyntaxObject
 * @definition Specifies various properties of function members
 * @note §8.2.1.5.9.6 prose: "The FunctionMemberAttributes is a subclass of
 *   MinorSyntaxObject used for attributing members of classes.
 *   FunctionMemberAttributes has Boolean properties isFriend, isInLine and
 *   isThisConst to depict the corresponding member properties and the
 *   association virtualSpecifier to the class VirtualSpecification to depict
 *   whether the member is virtual." EMOF spelling is `isInline` (lowercase
 *   'l'), not `isInLine`. We honour EMOF.
 * @ownedAttributes
 *   • isFriend         : Boolean              [0..1] -- §8.2.1.5.9.6: unary Boolean property isFriend. EMOF has no `lower=`.
 *   • isInline         : Boolean              [0..1] -- §8.2.1.5.9.6: unary Boolean property isInline. EMOF spelling (PDF: isInLine).
 *   • isThisConst      : Boolean              [0..1] -- §8.2.1.5.9.6: unary Boolean property isThisConst.
 *   • virtualSpecifier : VirtualSpecification [0..1] -- §8.2.1.5.9.6: unary association virtualSpecifier to VirtualSpecification.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IFunctionMemberAttributes extends IMinorSyntaxObject {
  readonly isFriend?: boolean;
  readonly isInline?: boolean;
  readonly isThisConst?: boolean;
  readonly virtualSpecifier?: IVirtualSpecification;
}

export class FunctionMemberAttributes extends MinorSyntaxObject implements IFunctionMemberAttributes {
  override readonly metaClass: string = "FunctionMemberAttributes";
  readonly isFriend?: boolean;
  readonly isInline?: boolean;
  readonly isThisConst?: boolean;
  readonly virtualSpecifier?: IVirtualSpecification;
  constructor(args: {
    locationInfo: ISourceLocation;
    isFriend?: boolean;
    isInline?: boolean;
    isThisConst?: boolean;
    virtualSpecifier?: IVirtualSpecification;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.isFriend = args.isFriend;
    this.isInline = args.isInline;
    this.isThisConst = args.isThisConst;
    this.virtualSpecifier = args.virtualSpecifier;
  }
}

// ─── 76. Public (§8.2.1.5.9.4.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.4.1
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.Public
 * @metaclass Public (concrete)
 * @generalization AccessKind
 * @definition Specifies that the associated member or base class provides public access
 * @note §8.2.1.5.9.4.1 prose: "Public is subclass of AccessKind used for
 *   specifying that class member is Public."
 * @ownedAttributes (none -- all attributes inherited from AccessKind)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IPublic extends IAccessKind {
  // terminal — no further structural members.
}

export class Public extends AccessKind implements IPublic {
  override readonly metaClass = "Public" as const;
}

// ─── 77. Private (§8.2.1.5.9.4.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.4.3
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.Private
 * @metaclass Private (concrete)
 * @generalization AccessKind
 * @definition Specifies that the associated member or base class provides private access
 * @note §8.2.1.5.9.4.3 prose: "A private is subclass of AccessKind used for
 *   specifying that class member is Private."
 * @ownedAttributes (none -- all attributes inherited from AccessKind)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IPrivate extends IAccessKind {
  // terminal — no further structural members.
}

export class Private extends AccessKind implements IPrivate {
  override readonly metaClass = "Private" as const;
}

// ─── 78. Protected (§8.2.1.5.9.4.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.4.2
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.Protected
 * @metaclass Protected (concrete)
 * @generalization AccessKind
 * @definition Specifies that the associated member or base class provides protected access
 * @note §8.2.1.5.9.4.2 prose: "Protected is subclass of AccessKind used for
 *   specifying that class member is Protected."
 * @ownedAttributes (none -- all attributes inherited from AccessKind)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IProtected extends IAccessKind {
  // terminal — no further structural members.
}

export class Protected extends AccessKind implements IProtected {
  override readonly metaClass = "Protected" as const;
}

// ─── 79. External (§8.2.1.5.9.2.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.2.1
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.External
 * @metaclass External (concrete)
 * @generalization StorageSpecification
 * @definition depicts storage that is external
 * @note §8.2.1.5.9.2.1 prose: "External is a subclass of StorageSpecification
 *   and depicts storage that is external."
 * @ownedAttributes (none -- all attributes inherited from StorageSpecification)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IExternal extends IStorageSpecification {
  // terminal — no further structural members.
}

export class External extends StorageSpecification implements IExternal {
  override readonly metaClass = "External" as const;
}

// ─── 80. FileLocal (§8.2.1.5.9.2.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.2.3
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.FileLocal
 * @metaclass FileLocal (concrete)
 * @generalization StorageSpecification
 * @definition depicts storage that is allocated and local within a file.
 * @note §8.2.1.5.9.2.3 prose: "FileLocal is a subclass of StorageSpecification
 *   and depicts storage that is allocated and local within a file."
 * @ownedAttributes (none -- all attributes inherited from StorageSpecification)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IFileLocal extends IStorageSpecification {
  // terminal — no further structural members.
}

export class FileLocal extends StorageSpecification implements IFileLocal {
  override readonly metaClass = "FileLocal" as const;
}

// ─── 81. FunctionPersistent (§8.2.1.5.9.2.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.2.2
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.FunctionPersistent
 * @metaclass FunctionPersistent (concrete)
 * @generalization StorageSpecification
 * @definition depicts storage that is allocated and persists within a function.
 * @note §8.2.1.5.9.2.2 prose: "FunctionPersistent is a subclass of
 *   StorageSpecification and depicts storage that is allocated and persists
 *   within a function."
 * @ownedAttributes (none -- all attributes inherited from StorageSpecification)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IFunctionPersistent extends IStorageSpecification {
  // terminal — no further structural members.
}

export class FunctionPersistent extends StorageSpecification implements IFunctionPersistent {
  override readonly metaClass = "FunctionPersistent" as const;
}

// ─── 82. Nodef (§8.2.1.5.9.2.5) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.2.5
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.Nodef
 * @metaclass Nodef (concrete)
 * @generalization StorageSpecification
 * @definition depicts storage for which the allocator is not defined.
 * @note §8.2.1.5.9.2.5 prose: "NoDef is a subclass of StorageSpecification and
 *   depicts storage for which the allocator is not defined." The EMOF spells
 *   the metaclass `Nodef` (lowercase 'd'); the PDF prose spells it `NoDef`.
 *   We honour the EMOF source-of-truth — TypeScript identifier `Nodef`.
 * @ownedAttributes (none -- all attributes inherited from StorageSpecification)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface INodef extends IStorageSpecification {
  // terminal — no further structural members.
}

export class Nodef extends StorageSpecification implements INodef {
  override readonly metaClass = "Nodef" as const;
}

// ─── 83. PerClassMember (§8.2.1.5.9.2.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.2.4
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.PerClassMember
 * @metaclass PerClassMember (concrete)
 * @generalization StorageSpecification
 * @definition depicts storage that is allocated for each class
 * @note §8.2.1.5.9.2.4 prose: "PerClassMember is a subclass of
 *   StorageSpecification and depicts storage that is allocated for each
 *   class."
 * @ownedAttributes (none -- all attributes inherited from StorageSpecification)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IPerClassMember extends IStorageSpecification {
  // terminal — no further structural members.
}

export class PerClassMember extends StorageSpecification implements IPerClassMember {
  override readonly metaClass = "PerClassMember" as const;
}

// ─── 84. Virtual (§8.2.1.5.9.3.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.3.1
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.Virtual
 * @metaclass Virtual (concrete)
 * @generalization VirtualSpecification
 * @definition Specifies that the associated function member is virtual
 * @note §8.2.1.5.9.3.1 prose: "Virtual is subclass of VirtualSpecification used
 *   for specifying that class member is virtual."
 * @ownedAttributes (none -- all attributes inherited from VirtualSpecification)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IVirtual extends IVirtualSpecification {
  // terminal — no further structural members.
}

export class Virtual extends VirtualSpecification implements IVirtual {
  override readonly metaClass = "Virtual" as const;
}

// ─── 85. AggregateTypeDeclaration (§8.2.1.3.3.6.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.6.1
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.AggregateTypeDeclaration
 * @metaclass AggregateTypeDeclaration (concrete)
 * @generalization TypeDeclaration
 * @definition Forward declaration of AggregateType
 * @note §8.2.1.3.3.6.1 prose: "AggregateTypeDeclaration is a subclass
 *   TypeDeclaration."
 * @ownedAttributes (none -- all attributes inherited from TypeDeclaration)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IAggregateTypeDeclaration extends ITypeDeclaration {
  // terminal — no further structural members.
}

export class AggregateTypeDeclaration extends TypeDeclaration implements IAggregateTypeDeclaration {
  override readonly metaClass = "AggregateTypeDeclaration" as const;
}

// ─── 86. EnumTypeDeclaration (§8.2.1.3.3.6.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.6.2
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.EnumTypeDeclaration
 * @metaclass EnumTypeDeclaration (concrete)
 * @generalization TypeDeclaration
 * @definition Forward declaration of EnumerationType
 * @note §8.2.1.3.3.6.2 prose: "EnumTypeDeclaration is a subclass
 *   TypeDeclaration."
 * @ownedAttributes (none -- all attributes inherited from TypeDeclaration)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IEnumTypeDeclaration extends ITypeDeclaration {
  // terminal — no further structural members.
}

export class EnumTypeDeclaration extends TypeDeclaration implements IEnumTypeDeclaration {
  override readonly metaClass = "EnumTypeDeclaration" as const;
}

// ─── 87. AggregateTypeDefinition (§8.2.1.3.3.3.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.3.2
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.AggregateTypeDefinition
 * @metaclass AggregateTypeDefinition (concrete)
 * @generalization TypeDefinition
 * @definition Definitions of aggregate types
 * @note §8.2.1.3.3.3.2 prose: "AggregateTypeDefinition is a subclass
 *   TypeDefinition and has unary aggregateType to AggregateType."
 * @ownedAttributes
 *   • aggregateType : AggregateType [1..1] -- §8.2.1.3.3.3.2: unary association aggregateType to AggregateType. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IAggregateTypeDefinition extends ITypeDefinition {
  readonly aggregateType: IAggregateType;
}

export class AggregateTypeDefinition extends TypeDefinition implements IAggregateTypeDefinition {
  override readonly metaClass = "AggregateTypeDefinition" as const;
  readonly aggregateType: IAggregateType;
  constructor(args: {
    locationInfo: ISourceLocation;
    typeName: IName;
    aggregateType: IAggregateType;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      typeName: args.typeName,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.aggregateType = args.aggregateType;
  }
}

// ─── 88. EnumTypeDefinition (§8.2.1.3.3.3.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.3.3
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.EnumTypeDefinition
 * @metaclass EnumTypeDefinition (concrete)
 * @generalization TypeDefinition
 * @definition Definitions of enumeration types
 * @note §8.2.1.3.3.3.3 prose: "EnumTypeDefinition is a subclass TypeDefinition
 *   and has unary association definitionType to EnumType."
 * @ownedAttributes
 *   • definitionType : EnumType [1..1] -- §8.2.1.3.3.3.3: unary association definitionType to EnumType (overrides Definition's TypeReference). EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IEnumTypeDefinition extends ITypeDefinition {
  readonly definitionType: IEnumType;
}

export class EnumTypeDefinition extends TypeDefinition implements IEnumTypeDefinition {
  override readonly metaClass = "EnumTypeDefinition" as const;
  readonly definitionType: IEnumType;
  constructor(args: {
    locationInfo: ISourceLocation;
    typeName: IName;
    definitionType: IEnumType;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      typeName: args.typeName,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.definitionType = args.definitionType;
  }
}

// ─── 89. NamedTypeDefinition (§8.2.1.3.3.3.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.3.1
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.NamedTypeDefinition
 * @metaclass NamedTypeDefinition (concrete)
 * @generalization TypeDefinition
 * @definition Definitions of types to be referred to by a specified name
 * @note §8.2.1.3.3.3.1 prose: "NamedTypeDefinition is a subclass TypeDefinition
 *   and has unary definitionType to NamedType."
 * @ownedAttributes
 *   • definitionType : NamedType [1..1] -- §8.2.1.3.3.3.1: unary association definitionType to NamedType (overrides Definition's TypeReference). EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface INamedTypeDefinition extends ITypeDefinition {
  readonly definitionType: INamedType;
}

export class NamedTypeDefinition extends TypeDefinition implements INamedTypeDefinition {
  override readonly metaClass = "NamedTypeDefinition" as const;
  readonly definitionType: INamedType;
  constructor(args: {
    locationInfo: ISourceLocation;
    typeName: IName;
    definitionType: INamedType;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      typeName: args.typeName,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.definitionType = args.definitionType;
  }
}

// ─── 90. VariableDeclaration (§8.2.1.3.3.1.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.1.2
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.VariableDeclaration
 * @metaclass VariableDeclaration (concrete)
 * @generalization Declaration
 * @definition Variable declarations
 * @note §8.2.1.3.3.1.2 prose: "VariableDeclaration is a subclass of Declaration
 *   and has unary property isMutable to Boolean."
 * @ownedAttributes
 *   • isMutable : Boolean [0..1] -- §8.2.1.3.3.1.2: unary property isMutable to primitive Boolean. EMOF has no `lower=`.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IVariableDeclaration extends IDeclaration {
  readonly isMutable?: boolean;
}

export class VariableDeclaration extends Declaration implements IVariableDeclaration {
  override readonly metaClass = "VariableDeclaration" as const;
  readonly isMutable?: boolean;
  constructor(args: {
    locationInfo: ISourceLocation;
    accessKind: IAccessKind;
    storageSpecifier: IStorageSpecification;
    declarationType: ITypeReference;
    defRef: IDefinition;
    linkageSpecifier?: string;
    identifierName?: IName;
    isMutable?: boolean;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      accessKind: args.accessKind,
      storageSpecifier: args.storageSpecifier,
      declarationType: args.declarationType,
      defRef: args.defRef,
      linkageSpecifier: args.linkageSpecifier,
      identifierName: args.identifierName,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.isMutable = args.isMutable;
  }
}

// ─── 91. FunctionDeclaration (§8.2.1.3.3.1.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.1.1
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.FunctionDeclaration
 * @metaclass FunctionDeclaration (concrete)
 * @generalization Declaration
 * @definition Function declarations
 * @note §8.2.1.3.3.1.1 prose: "FunctionDeclaration is a subclass of
 *   Declaration, and has zero to any number of association formalParameters to
 *   class FormalParameterDeclaration, optional unary association
 *   functionMemberAttributes to class FunctionMemberAttributes."
 * @ownedAttributes
 *   • formalParameters         : FormalParameterDeclaration [0..*] -- §8.2.1.3.3.1.1: zero to any number of formalParameters associations to FormalParameterDeclaration.
 *   • functionMemberAttributes : FunctionMemberAttributes   [0..1] -- §8.2.1.3.3.1.1: optional unary association functionMemberAttributes to FunctionMemberAttributes.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IFunctionDeclaration extends IDeclaration {
  readonly formalParameters: ReadonlyArray<IFormalParameterDeclaration>;
  readonly functionMemberAttributes?: IFunctionMemberAttributes;
}

export class FunctionDeclaration extends Declaration implements IFunctionDeclaration {
  override readonly metaClass = "FunctionDeclaration" as const;
  readonly formalParameters: ReadonlyArray<IFormalParameterDeclaration>;
  readonly functionMemberAttributes?: IFunctionMemberAttributes;
  constructor(args: {
    locationInfo: ISourceLocation;
    accessKind: IAccessKind;
    storageSpecifier: IStorageSpecification;
    declarationType: ITypeReference;
    defRef: IDefinition;
    linkageSpecifier?: string;
    identifierName?: IName;
    formalParameters?: ReadonlyArray<IFormalParameterDeclaration>;
    functionMemberAttributes?: IFunctionMemberAttributes;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      accessKind: args.accessKind,
      storageSpecifier: args.storageSpecifier,
      declarationType: args.declarationType,
      defRef: args.defRef,
      linkageSpecifier: args.linkageSpecifier,
      identifierName: args.identifierName,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.formalParameters = args.formalParameters ?? [];
    this.functionMemberAttributes = args.functionMemberAttributes;
  }
}

// ─── 92. FormalParameterDeclaration (§8.2.1.3.3.1.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.1.3
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.FormalParameterDeclaration
 * @metaclass FormalParameterDeclaration (concrete)
 * @generalization Declaration
 * @definition Formal Parameter Declarations, appearing in function declarations
 * @note §8.2.1.3.3.1.3 prose: "FormalParameterDeclaration is a subclass of
 *   Declaration."
 * @ownedAttributes (none -- all attributes inherited from Declaration)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IFormalParameterDeclaration extends IDeclaration {
  // terminal — no further structural members.
}

export class FormalParameterDeclaration extends Declaration implements IFormalParameterDeclaration {
  override readonly metaClass = "FormalParameterDeclaration" as const;
}

// ─── 93. EntryDefinition (§8.2.1.3.3.2.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.2.2
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.EntryDefinition
 * @metaclass EntryDefinition (concrete)
 * @generalization Definition
 * @definition Subprogram entry definitions
 * @note §8.2.1.3.3.2.2 prose: "EntryDefinition is a subclass of Definition,
 *   and has unary association Body to class Statement. EntryDefinition has
 *   zero to any number association FormalParameters to class FormalParameter."
 *   EMOF types `formalParameters` as `FormalParameterDefinition` (not
 *   `FormalParameter` — that is a PDF-prose shorthand).
 * @ownedAttributes
 *   • formalParameters : FormalParameterDefinition [0..*] -- §8.2.1.3.3.2.2: zero to any number of formalParameters associations to FormalParameterDefinition.
 *   • body             : Statement                 [0..*] -- §8.2.1.3.3.2.2: zero to any number of body associations to Statement.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IEntryDefinition extends IDefinition {
  readonly formalParameters: ReadonlyArray<IFormalParameterDefinition>;
  readonly body: ReadonlyArray<IStatement>;
}

export class EntryDefinition extends Definition implements IEntryDefinition {
  override readonly metaClass = "EntryDefinition" as const;
  readonly formalParameters: ReadonlyArray<IFormalParameterDefinition>;
  readonly body: ReadonlyArray<IStatement>;
  constructor(args: {
    locationInfo: ISourceLocation;
    accessKind: IAccessKind;
    storageSpecifier: IStorageSpecification;
    identifierName: IName;
    ofDeclaration: IDeclaration;
    linkageSpecifier?: string;
    definitionType?: ITypeReference;
    formalParameters?: ReadonlyArray<IFormalParameterDefinition>;
    body?: ReadonlyArray<IStatement>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      accessKind: args.accessKind,
      storageSpecifier: args.storageSpecifier,
      identifierName: args.identifierName,
      ofDeclaration: args.ofDeclaration,
      linkageSpecifier: args.linkageSpecifier,
      definitionType: args.definitionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.formalParameters = args.formalParameters ?? [];
    this.body = args.body ?? [];
  }
}

// ─── 94. EnumLiteralDefinition (§8.2.1.3.3.2.7) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.2.7
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.EnumLiteralDefinition
 * @metaclass EnumLiteralDefinition (concrete)
 * @generalization Definition
 * @definition Definitions of enumerals (members of enumerated types)
 * @note §8.2.1.3.3.2.7 prose: "EnumLiteralDefinition is a subclass of
 *   Definition, and has unary association value to class Expression."
 * @ownedAttributes
 *   • value : Expression [0..1] -- §8.2.1.3.3.2.7: unary association value to Expression. EMOF has no `lower=` (PDF marks Expression?).
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IEnumLiteralDefinition extends IDefinition {
  readonly value?: IExpression;
}

export class EnumLiteralDefinition extends Definition implements IEnumLiteralDefinition {
  override readonly metaClass = "EnumLiteralDefinition" as const;
  readonly value?: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    accessKind: IAccessKind;
    storageSpecifier: IStorageSpecification;
    identifierName: IName;
    ofDeclaration: IDeclaration;
    linkageSpecifier?: string;
    definitionType?: ITypeReference;
    value?: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      accessKind: args.accessKind,
      storageSpecifier: args.storageSpecifier,
      identifierName: args.identifierName,
      ofDeclaration: args.ofDeclaration,
      linkageSpecifier: args.linkageSpecifier,
      definitionType: args.definitionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.value = args.value;
  }
}

// ─── 95. FunctionDefintion (§8.2.1.3.3.2.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.2.1
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.FunctionDefintion
 * @metaclass FunctionDefintion (concrete)
 * @generalization Definition
 * @definition Subprogram definitions
 * @note OMG spells this metaclass `FunctionDefintion` (missing the second 'i')
 *   uniformly in the EMOF `xmi:id` value and `name=` attribute. The PDF
 *   §8.2.1.3.3.2.1 heading and prose read `FunctionDefinition` (correct
 *   English). The TypeScript identifier preserves OMG's misspelling so the
 *   metaclass surface round-trips losslessly through ASTM-EMOF.xml. The
 *   `opensScope ↔ FunctionScope.scopeOpenedBy` bi-directional Association
 *   closes the loop with Wave 1.1's FunctionScope side.
 * @ownedAttributes
 *   • returnType               : TypeReference            [0..1] -- §8.2.1.3.3.2.1: unary association returnType to TypeReference. EMOF has no `lower=`.
 *   • formalParameters         : FormalParameterDefinition [0..*] -- §8.2.1.3.3.2.1: zero to any number of formalParameters associations to FormalParameterDefinition.
 *   • functionMemberAttributes : FunctionMemberAttributes  [0..1] -- §8.2.1.3.3.2.1: optional unary association functionMemberAttributes to FunctionMemberAttributes.
 *   • opensScope               : FunctionScope             [1..1] -- §8.2.1.3.3.2.1: optional unary semantic association opensScope to FunctionScope. EMOF lower="1" + opposite=FunctionScope.scopeOpenedBy.
 *   • body                     : Statement                 [1..1] -- §8.2.1.3.3.2.1: unary association body to Statement. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IFunctionDefintion extends IDefinition {
  readonly returnType?: ITypeReference;
  readonly formalParameters: ReadonlyArray<IFormalParameterDefinition>;
  readonly functionMemberAttributes?: IFunctionMemberAttributes;
  readonly opensScope: IFunctionScope;
  readonly body: IStatement;
}

export class FunctionDefintion extends Definition implements IFunctionDefintion {
  override readonly metaClass = "FunctionDefintion" as const;
  readonly returnType?: ITypeReference;
  readonly formalParameters: ReadonlyArray<IFormalParameterDefinition>;
  readonly functionMemberAttributes?: IFunctionMemberAttributes;
  readonly opensScope: IFunctionScope;
  readonly body: IStatement;
  constructor(args: {
    locationInfo: ISourceLocation;
    accessKind: IAccessKind;
    storageSpecifier: IStorageSpecification;
    identifierName: IName;
    ofDeclaration: IDeclaration;
    opensScope: IFunctionScope;
    body: IStatement;
    linkageSpecifier?: string;
    definitionType?: ITypeReference;
    returnType?: ITypeReference;
    formalParameters?: ReadonlyArray<IFormalParameterDefinition>;
    functionMemberAttributes?: IFunctionMemberAttributes;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      accessKind: args.accessKind,
      storageSpecifier: args.storageSpecifier,
      identifierName: args.identifierName,
      ofDeclaration: args.ofDeclaration,
      linkageSpecifier: args.linkageSpecifier,
      definitionType: args.definitionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.returnType = args.returnType;
    this.formalParameters = args.formalParameters ?? [];
    this.functionMemberAttributes = args.functionMemberAttributes;
    this.opensScope = args.opensScope;
    this.body = args.body;
  }
}

// ─── 96. BitFieldDefinition (§8.2.1.3.3.2.6) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.2.6
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.BitFieldDefinition
 * @metaclass BitFieldDefinition (concrete)
 * @generalization DataDefinition
 * @definition Definitions of bit-field data
 * @note §8.2.1.3.3.2.6 prose: "Bitfield is a subclass of DataDefinition, and
 *   unary association bitfieldSize to Expression." EMOF attribute name is
 *   `bitFieldSize` (camelCase, capital 'F'), not `bitfieldSize` as the PDF
 *   prose says. EMOF prevails.
 * @ownedAttributes
 *   • bitFieldSize : Expression [1..1] -- §8.2.1.3.3.2.6: unary association bitFieldSize to Expression. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBitFieldDefinition extends IDataDefinition {
  readonly bitFieldSize: IExpression;
}

export class BitFieldDefinition extends DataDefinition implements IBitFieldDefinition {
  override readonly metaClass = "BitFieldDefinition" as const;
  readonly bitFieldSize: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    accessKind: IAccessKind;
    storageSpecifier: IStorageSpecification;
    identifierName: IName;
    ofDeclaration: IDeclaration;
    bitFieldSize: IExpression;
    linkageSpecifier?: string;
    definitionType?: ITypeReference;
    isMutable?: boolean;
    initialValue?: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      accessKind: args.accessKind,
      storageSpecifier: args.storageSpecifier,
      identifierName: args.identifierName,
      ofDeclaration: args.ofDeclaration,
      linkageSpecifier: args.linkageSpecifier,
      definitionType: args.definitionType,
      isMutable: args.isMutable,
      initialValue: args.initialValue,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.bitFieldSize = args.bitFieldSize;
  }
}

// ─── 97. FormalParameterDefinition (§8.2.1.3.3.2.5) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.2.5
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.FormalParameterDefinition
 * @metaclass FormalParameterDefinition (concrete)
 * @generalization DataDefinition
 * @definition Formal parameter definitions, appearing in function definitions
 * @note §8.2.1.3.3.2.5 prose: "FormalParameterDefinition is a subclass of
 *   DataDefinition, and has no subclasses, no immediate associations and no
 *   immediate properties."
 * @ownedAttributes (none -- all attributes inherited from DataDefinition)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IFormalParameterDefinition extends IDataDefinition {
  // terminal — no further structural members.
}

export class FormalParameterDefinition extends DataDefinition implements IFormalParameterDefinition {
  override readonly metaClass = "FormalParameterDefinition" as const;
}

// ─── 98. VariableDefinition (§8.2.1.3.3.2.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.2.4
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.VariableDefinition
 * @metaclass VariableDefinition (concrete)
 * @generalization DataDefinition
 * @definition Variable definitions
 * @note §8.2.1.3.3.2.4 prose: "VariableDefinition is a subclass of
 *   DataDefinition, and has no subclasses, no immediate associations and no
 *   immediate properties."
 * @ownedAttributes (none -- all attributes inherited from DataDefinition)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IVariableDefinition extends IDataDefinition {
  // terminal — no further structural members.
}

export class VariableDefinition extends DataDefinition implements IVariableDefinition {
  override readonly metaClass = "VariableDefinition" as const;
}

// ─── 99. LabelDefinition (§8.2.1.3.3.5) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.5
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.LabelDefinition
 * @metaclass LabelDefinition (concrete)
 * @generalization DefintionObject
 * @definition Definitions of labels
 * @note §8.2.1.3.3.5 prose: "LabelDefinition is a subclass of
 *   DeclarationOrDefinition, and unary association labelName to Name, and
 *   unary association labelType to LabelType." EMOF declares
 *   `superClass="ASTMCore.ASTMSyntax.DeclarationAndDefinition.DefintionObject"`
 *   — i.e., LabelDefinition is a sibling of DeclarationOrDefinition under
 *   DefintionObject, NOT a subclass of DeclarationOrDefinition as the PDF
 *   prose claims. EMOF is the normative source-of-truth. The EMOF attribute
 *   name is `labelname` (lowercase 'n'), not `labelName` as PDF says — but
 *   the TypeScript surface follows the EMOF spelling verbatim.
 * @ownedAttributes
 *   • labelname : Name      [1..1] -- §8.2.1.3.3.5: unary association labelname (EMOF spelling; PDF: labelName) to Name. EMOF lower="1".
 *   • labelType : LabelType [1..1] -- §8.2.1.3.3.5: unary association labelType to LabelType. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ILabelDefinition extends IDefintionObject {
  readonly labelname: IName;
  readonly labelType: ILabelType;
}

export class LabelDefinition extends DefintionObject implements ILabelDefinition {
  override readonly metaClass = "LabelDefinition" as const;
  readonly labelname: IName;
  readonly labelType: ILabelType;
  constructor(args: {
    locationInfo: ISourceLocation;
    labelname: IName;
    labelType: ILabelType;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.labelname = args.labelname;
    this.labelType = args.labelType;
  }
}

// ─── 100. NameSpaceDefinition (§8.2.1.3.3.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.3.3.4
 * @xmiId ASTMCore.ASTMSyntax.DeclarationAndDefinition.NameSpaceDefinition
 * @metaclass NameSpaceDefinition (concrete)
 * @generalization DefintionObject
 * @definition Definitions of namespaces
 * @note §8.2.1.3.3.4 prose: "NamespaceDefinition is a subclass of
 *   DeclarationOrDefinition, and one or more association body to class
 *   DeclarationOrDefinition, unary association nameSpaceType to NamespaceType,
 *   and unary association nameSpace to class Name." EMOF declares
 *   `superClass="ASTMCore.ASTMSyntax.DeclarationAndDefinition.DefintionObject"`
 *   (sibling of DeclarationOrDefinition under DefintionObject, NOT a subclass
 *   of DeclarationOrDefinition as PDF claims) and types `body` to
 *   `DefintionObject` (NOT `DeclarationOrDefinition` as PDF claims) with
 *   `lower="1" upper="*"` (one-or-more). EMOF is the normative source-of-truth.
 *   The metaclass spelling is `NameSpaceDefinition` (capital 'S' in the
 *   middle) per EMOF, mirroring Wave 1.2's `NameSpaceType`; PDF prose uses
 *   `NamespaceDefinition`.
 * @ownedAttributes
 *   • nameSpace     : Name              [1..1] -- §8.2.1.3.3.4: unary association nameSpace to Name. EMOF lower="1".
 *   • body          : DefintionObject   [1..*] -- §8.2.1.3.3.4: one-or-more body associations to DefintionObject (EMOF target). EMOF lower="1" upper="*".
 *   • nameSpaceType : NameSpaceType     [1..1] -- §8.2.1.3.3.4: unary association nameSpaceType to NameSpaceType. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface INameSpaceDefinition extends IDefintionObject {
  readonly nameSpace: IName;
  readonly body: ReadonlyArray<IDefintionObject>;
  readonly nameSpaceType: INameSpaceType;
}

export class NameSpaceDefinition extends DefintionObject implements INameSpaceDefinition {
  override readonly metaClass = "NameSpaceDefinition" as const;
  readonly nameSpace: IName;
  readonly body: ReadonlyArray<IDefintionObject>;
  readonly nameSpaceType: INameSpaceType;
  constructor(args: {
    locationInfo: ISourceLocation;
    nameSpace: IName;
    body: ReadonlyArray<IDefintionObject>;
    nameSpaceType: INameSpaceType;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.nameSpace = args.nameSpace;
    this.body = args.body;
    this.nameSpaceType = args.nameSpaceType;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// END Implementer #3 (Wave 1.3). Next implementer starts at class 101.
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// BEGIN Implementer #4 (Wave 1.4): GASTM Expression — 65 metaclasses
//
// Scope: ASTMCore.ASTMSyntax.Expression package — the largest single
// partition of the GASTM. Comprises:
//   • Abstract roots (Expression, NameReference,
//     QualifiedIdentifierReference, BinaryOperator, UnaryOperator,
//     ActualParameter)                                            —  6 classes
//   • Concrete Expression descendants                             — 13 classes
//     (Literal, AnnotationExpression, ArrayAccess, BinaryExpression,
//      UnaryExpression, CastExpression, ConditionalExpression,
//      FunctionCallExpression, NewExpression, RangeExpression,
//      AggregateExpression, CollectionExpression, LabelAccess)
//   • Concrete Literal leaves                                     —  7 classes
//     (BitLiteral, BooleanLiteral, CharLiteral, EnumLiteral,
//      IntegerLiteral, RealLiteral, StringLiteral)
//   • Concrete NameReference leaves                               —  2 classes
//     (IdentifierReference, TypeQualifiedIdentifierReference)
//   • Concrete QualifiedIdentifierReference leaves                —  2 classes
//     (QualifiedOverData, QualifiedOverPtr)
//   • Concrete BinaryOperator leaves                              — 21 classes
//     (Add, And, Assign, BitAnd, BitLeftShift, BitOr, BitRightShift,
//      BitXor, Divide, Equal, Exponent, Greater, Less, Modulus,
//      Multiply, NotEqual, NotGreater, NotLess, OperatorAssign,
//      Or, Subtract)
//   • Concrete UnaryOperator leaves                               — 10 classes
//     (AddressOf, BitNot, Decrement, Deref, Increment, Not,
//      PostDecrement, PostIncrement, UnaryMinus, UnaryPlus)
//   • Concrete ActualParameter leaves                             —  2 classes
//     (ActualParameterExpression, MissingActualParameter)
//   • Concrete ActualParameterExpression leaves                   —  2 classes
//     (ByReferenceActualParameterExpression,
//      ByValueActualParameterExpression)
//                                                                  ────────
//                                                                  65 classes
//
// Notes on OMG spec choices observed during this wave:
//   1. The PDF §8.2.1.4 prose is the canonical Expression-package
//      narrative. EMOF is the normative source-of-truth for structural
//      facts (super-class edges, attribute names, cardinalities). Where
//      the PDF prose diverges from EMOF, EMOF prevails. Divergences
//      observed:
//        • PDF §8.2.1.4.10 spells AnnotationExpression's first attribute
//          `annotationType` (camelCase 'T'). EMOF spells it
//          `annotationtype` (lowercase 't'). We honour EMOF.
//        • PDF §8.2.1.4.13 spells ArrayAccess's second attribute
//          `subscripts` (lowercase 's'). EMOF spells it `subScripts`
//          (capital 'S'). We honour EMOF.
//        • PDF §8.2.1.4.9 NameReference's `refersTo` target is
//          `DefinitionObject` in prose. EMOF types it `DefintionObject`
//          (OMG's "Defintion" misspelling). We honour EMOF.
//        • PDF §8.2.1.4.11.2.1 names the metaclass `QualifiedOverPointer`
//          in the heading but `QualifiedOverPtr` in the hierarchy block
//          and prose. EMOF declares `QualifiedOverPtr`. We honour EMOF.
//        • PDF §8.2.1.4.11.1 IdentifierReference is described as having
//          its own `Qualifiers` and `RefersTo` associations. EMOF
//          declares IdentifierReference WITH ZERO own attributes — its
//          `identifierName` and `refersTo` are inherited from
//          NameReference. We honour EMOF.
//   2. PDF §8.2.1.5.9.1 OperatorAssign declares an own `operator :
//      BinaryOperator` attribute beyond its inherited operator slot.
//      EMOF confirms this redeclaration. We surface OperatorAssign's
//      own `operator` attribute.
//   3. The EMOF places `BinaryOperator`, `UnaryOperator`, and
//      `ActualParameter` under `ASTMCore.ASTMSyntax.Expression` (not
//      under `ASTMCore.ASTMSyntax`) — they specialise MinorSyntaxObject
//      but their xmi:id paths sit in the Expression package. The PDF
//      §8.2.1.5.8 / §8.2.1.5.9 / §8.2.1.5.9.5 place these under
//      MinorSyntaxObject in the narrative. EMOF placement wins for the
//      `@section` and `@xmiId` JSDoc lines.
//   4. Literal::value is typed to primitive `String` in EMOF. All
//      seven Literal leaves (BitLiteral, BooleanLiteral, CharLiteral,
//      EnumLiteral, IntegerLiteral, RealLiteral, StringLiteral)
//      inherit this without redeclaration — the lexical form is
//      carried as a String regardless of the Literal's semantic type,
//      consistent with ASTM's role as a source-text-preserving AST
//      representation.
//   5. AggregateExpression has no own attributes in EMOF. PDF
//      §8.2.1.4.3 prose: "The AggregateExpression is a subclass of
//      Expression, has no associations, properties or subclasses."
//      Definition: "Expressions consisting of a list of subexpressions"
//      — but the list itself is NOT declared in EMOF. The
//      CollectionExpression sibling (with `expressionList`) is the
//      structural carrier; the AggregateExpression vs
//      CollectionExpression split appears to be a forward-compatible
//      vestige of an earlier design.
//   6. Stale forward-shadow aliases (`IExpression`,
//      `IAnnotationExpression`) declared by Wave 1.1's alias block have
//      been REMOVED because this wave authors the real interfaces. The
//      remaining forward shadow (`IStatement`) is still consumed by
//      Wave 5 (Statement).
// ═══════════════════════════════════════════════════════════════════════════

// ─── 101. Expression (§8.2.1.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4
 * @xmiId ASTMCore.ASTMSyntax.Expression.Expression
 * @metaclass Expression (abstract)
 * @generalization GASTMSyntaxObject
 * @definition All expressions
 * @note §8.2.1.4 prose: "The class Expression has unary association
 *   expressionType to a TypeReference, and subclasses Literal,
 *   CastExpression, AggregateExpression, UnaryExpression,
 *   BinaryExpression, ConditionalExpression, RangeExpression,
 *   FunctionCallExpression, NewExpression, NameReference, LabelAccess,
 *   ArrayAccess, AnnotationExpression, and CollectionExpression."
 *   EMOF declares Expression with `isAbstract="true"`.
 * @ownedAttributes
 *   • expressionType : TypeReference [1..1] -- §8.2.1.4: unary association expressionType to TypeReference. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IExpression extends IGASTMSyntaxObject {
  readonly expressionType: ITypeReference;
}

export abstract class Expression extends GASTMSyntaxObject implements IExpression {
  override readonly metaClass: string = "Expression";
  readonly expressionType: ITypeReference;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.expressionType = args.expressionType;
  }
}

// ─── 102. NameReference (§8.2.1.4.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.NameReference
 * @metaclass NameReference (abstract)
 * @generalization Expression
 * @definition References to named entities
 * @note §8.2.1.4.9 prose: "The class NameReference is a subclass of
 *   Expression, and unary semantic association RefersTo to the inner
 *   class DeclarationOrDefinition, unary association identifierName to
 *   class Name, and subclasses IdentifierReference,
 *   QualifiedIdentifierReference, and TypeQualifiedIdentifierReference."
 *   EMOF declares NameReference with `isAbstract="true"`. PDF prose
 *   types `refersTo` to `DefinitionObject` (correct English) but EMOF
 *   types it `DefintionObject` (OMG's misspelling). We honour EMOF.
 * @ownedAttributes
 *   • identifierName : Name             [1..1] -- §8.2.1.4.9: unary association identifierName to Name. EMOF lower="1".
 *   • refersTo       : DefintionObject  [1..1] -- §8.2.1.4.9: semantic association refersTo to DefintionObject (EMOF spelling; PDF: DefinitionObject). EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface INameReference extends IExpression {
  readonly identifierName: IName;
  readonly refersTo: IDefintionObject;
}

export abstract class NameReference extends Expression implements INameReference {
  override readonly metaClass: string = "NameReference";
  readonly identifierName: IName;
  readonly refersTo: IDefintionObject;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    identifierName: IName;
    refersTo: IDefintionObject;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.identifierName = args.identifierName;
    this.refersTo = args.refersTo;
  }
}

// ─── 103. QualifiedIdentifierReference (§8.2.1.4.11.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.11.2
 * @xmiId ASTMCore.ASTMSyntax.Expression.QualifiedIdentifierReference
 * @metaclass QualifiedIdentifierReference (abstract)
 * @generalization NameReference
 * @definition References to entities with qualified names
 * @note §8.2.1.4.11.2 prose: "The class QualifiedIdentifierReference is
 *   a subclass of NameReference, and has unary association qualifiers to
 *   class Expression and unary association member to the class
 *   IdentifierReference and subclasses QualifiedOverData and
 *   QualifiedOverPtrs." EMOF declares QualifiedIdentifierReference with
 *   `isAbstract="true"`. PDF prose spells the second subclass
 *   `QualifiedOverPtrs` (plural), §8.2.1.4.11.2.1 heading spells it
 *   `QualifiedOverPointer`, EMOF declares `QualifiedOverPtr` (singular,
 *   abbreviated). We honour EMOF.
 * @ownedAttributes
 *   • qualifiers : Expression          [1..1] -- §8.2.1.4.11.2: unary association qualifiers to Expression. EMOF lower="1".
 *   • member     : IdentifierReference [1..1] -- §8.2.1.4.11.2: unary association member to IdentifierReference. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IQualifiedIdentifierReference extends INameReference {
  readonly qualifiers: IExpression;
  readonly member: IIdentifierReference;
}

export abstract class QualifiedIdentifierReference extends NameReference implements IQualifiedIdentifierReference {
  override readonly metaClass: string = "QualifiedIdentifierReference";
  readonly qualifiers: IExpression;
  readonly member: IIdentifierReference;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    identifierName: IName;
    refersTo: IDefintionObject;
    qualifiers: IExpression;
    member: IIdentifierReference;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      identifierName: args.identifierName,
      refersTo: args.refersTo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.qualifiers = args.qualifiers;
    this.member = args.member;
  }
}

// ─── 104. BinaryOperator (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.BinaryOperator
 * @metaclass BinaryOperator (abstract)
 * @generalization MinorSyntaxObject
 * @definition Operators taking two operands
 * @note §8.2.1.5.9 prose: "The inner class BinaryOperator is a subclass
 *   of OtherSyntaxObject, and has primitive terminal subclasses Add,
 *   Subtract, Multiply, Divide, Modulus, Exponent, And, Or, Equal,
 *   NotEqual, Greater, NotGreater, Less, NotLess, BitAnd, BitOr, BitXor,
 *   BitLeftShift, BitRightShift, Assign." PDF places BinaryOperator
 *   under MinorSyntaxObject ("OtherSyntaxObject" is the prose synonym).
 *   EMOF places its xmi:id under the Expression package
 *   (`ASTMCore.ASTMSyntax.Expression.BinaryOperator`) with
 *   `superClass="ASTMCore.ASTMSyntax.MinorSyntaxObject"`. EMOF marks
 *   it `isAbstract="true"`.
 *   Semantics (§8.2.1.5.9): "Operators And, Or, BitAnd, BitOr, BitXor
 *   have short-circuit semantics."
 * @ownedAttributes (none -- BinaryOperator is a structural marker; the
 *   operator identity is carried by the concrete leaf metaclass)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBinaryOperator extends IMinorSyntaxObject {
  // structural marker — concrete subclasses carry the operator identity via
  // their `metaClass` discriminator.
}

export abstract class BinaryOperator extends MinorSyntaxObject implements IBinaryOperator {
  override readonly metaClass: string = "BinaryOperator";
}

// ─── 105. UnaryOperator (§8.2.1.5.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.8
 * @xmiId ASTMCore.ASTMSyntax.Expression.UnaryOperator
 * @metaclass UnaryOperator (abstract)
 * @generalization MinorSyntaxObject
 * @definition Operators taking a single operand
 * @note §8.2.1.5.8 prose: "The inner class UnaryOperator is a subclass
 *   of OtherSyntaxObject, and has primitive terminal subclasses UnaryPlus,
 *   UnaryMinus, Not, BitNot, AddressOf, Deref, Increment, Decrement,
 *   PostIncrement, PostDecrement." PDF places UnaryOperator under
 *   MinorSyntaxObject ("OtherSyntaxObject" prose synonym). EMOF places
 *   its xmi:id under the Expression package
 *   (`ASTMCore.ASTMSyntax.Expression.UnaryOperator`) with
 *   `superClass="ASTMCore.ASTMSyntax.MinorSyntaxObject"`. EMOF marks
 *   it `isAbstract="true"`.
 * @ownedAttributes (none -- UnaryOperator is a structural marker; the
 *   operator identity is carried by the concrete leaf metaclass)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IUnaryOperator extends IMinorSyntaxObject {
  // structural marker — concrete subclasses carry the operator identity via
  // their `metaClass` discriminator.
}

export abstract class UnaryOperator extends MinorSyntaxObject implements IUnaryOperator {
  override readonly metaClass: string = "UnaryOperator";
}

// ─── 106. ActualParameter (§8.2.1.5.9.5) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.5
 * @xmiId ASTMCore.ASTMSyntax.Expression.ActualParameter
 * @metaclass ActualParameter (abstract)
 * @generalization MinorSyntaxObject
 * @definition Actual parameters
 * @note §8.2.1.5.9.5 prose: "ActualParameter is subclass of
 *   MinorSyntaxObject used for denoting actual parameters, and has two
 *   subclasses ActualParameterExpression and MissingActualParameter."
 *   EMOF places its xmi:id under the Expression package
 *   (`ASTMCore.ASTMSyntax.Expression.ActualParameter`) with
 *   `superClass="ASTMCore.ASTMSyntax.MinorSyntaxObject"`. EMOF marks
 *   it `isAbstract="true"`.
 * @ownedAttributes (none -- ActualParameter is a structural marker; the
 *   parameter shape is carried by the concrete leaf metaclass)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IActualParameter extends IMinorSyntaxObject {
  // structural marker — concrete subclasses (ActualParameterExpression,
  // MissingActualParameter) carry the parameter shape.
}

export abstract class ActualParameter extends MinorSyntaxObject implements IActualParameter {
  override readonly metaClass: string = "ActualParameter";
}

// ─── 107. Literal (§8.2.1.4.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.1
 * @xmiId ASTMCore.ASTMSyntax.Expression.Literal
 * @metaclass Literal (concrete)
 * @generalization Expression
 * @definition Literal expressions
 * @note §8.2.1.4.1 prose: "The inner class Literal is a subclass of
 *   Expression, and has unary association value to String and subclasses
 *   IntegerLiteral, StringLiteral, CharLiteral, RealLiteral,
 *   BooleanLiteral, BitLiteral, and EnumLiteral." EMOF does NOT mark
 *   Literal as `isAbstract="true"`, so it is concrete under EMOF
 *   defaulting — the seven Literal leaves specialise it but Literal
 *   itself is instantiable to carry an as-yet-unclassified token.
 * @ownedAttributes
 *   • value : String [1..1] -- §8.2.1.4.1: unary property value to primitive String. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ILiteral extends IExpression {
  readonly value: string;
}

export class Literal extends Expression implements ILiteral {
  override readonly metaClass: string = "Literal";
  readonly value: string;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    value: string;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.value = args.value;
  }
}

// ─── 108. AnnotationExpression (§8.2.1.4.10) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.10
 * @xmiId ASTMCore.ASTMSyntax.Expression.AnnotationExpression
 * @metaclass AnnotationExpression (concrete)
 * @generalization Expression
 * @definition Expressions that supply annotations for other elements
 * @note §8.2.1.4.10 prose: "AnnotationExpression is a subclass of
 *   Expression and has unary association annotationType to TypeReference
 *   and zero to any association memberValues to Expression." Footnotes:
 *   (2) "The AnnotationExpression is used for depicting EGL-style
 *   annotations." (3) "Annotation Type is optional. This is to allow
 *   attribute-value pairs (i.e., Member Values) to allow default values
 *   for members." EMOF spells the first attribute `annotationtype`
 *   (lowercase 't') and declares `lower="1"` — i.e., mandatory in EMOF
 *   despite PDF prose marking it optional. We honour EMOF: spelling
 *   `annotationtype`, cardinality [1..1].
 * @ownedAttributes
 *   • annotationtype : TypeReference [1..1] -- §8.2.1.4.10: unary association annotationType to TypeReference (EMOF spelling: lowercase 't'). EMOF lower="1".
 *   • memberValues   : Expression    [1..*] -- §8.2.1.4.10: one to any association memberValues to Expression. EMOF lower="1" upper="*".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IAnnotationExpression extends IExpression {
  readonly annotationtype: ITypeReference;
  readonly memberValues: ReadonlyArray<IExpression>;
}

export class AnnotationExpression extends Expression implements IAnnotationExpression {
  override readonly metaClass: string = "AnnotationExpression";
  readonly annotationtype: ITypeReference;
  readonly memberValues: ReadonlyArray<IExpression>;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    annotationtype: ITypeReference;
    memberValues: ReadonlyArray<IExpression>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.annotationtype = args.annotationtype;
    this.memberValues = args.memberValues;
  }
}

// ─── 109. ArrayAccess (§8.2.1.4.13) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.13
 * @xmiId ASTMCore.ASTMSyntax.Expression.ArrayAccess
 * @metaclass ArrayAccess (concrete)
 * @generalization Expression
 * @definition References to individual array elements
 * @note §8.2.1.4.13 prose: "ArrayAccess is a subclass of Expression with
 *   unary association ArrayName to class Expression and one to many
 *   association Subscripts to Expression." The §8.2.1.4.9 sibling
 *   `ArrayReference` block at lines 4648-4661 of the spec text describes
 *   the same structure — it is the PDF's earlier name for ArrayAccess.
 *   EMOF spells the second attribute `subScripts` (capital 'S'); PDF
 *   spells it `subscripts`. We honour EMOF.
 * @ownedAttributes
 *   • arrayName : Expression [1..1] -- §8.2.1.4.13: unary association arrayName to Expression. EMOF lower="1".
 *   • subScripts: Expression [1..*] -- §8.2.1.4.13: one to many association subScripts to Expression (EMOF spelling: capital 'S'). EMOF lower="1" upper="*".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IArrayAccess extends IExpression {
  readonly arrayName: IExpression;
  readonly subScripts: ReadonlyArray<IExpression>;
}

export class ArrayAccess extends Expression implements IArrayAccess {
  override readonly metaClass: string = "ArrayAccess";
  readonly arrayName: IExpression;
  readonly subScripts: ReadonlyArray<IExpression>;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    arrayName: IExpression;
    subScripts: ReadonlyArray<IExpression>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.arrayName = args.arrayName;
    this.subScripts = args.subScripts;
  }
}

// ─── 110. BinaryExpression (§8.2.1.4.5) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.5
 * @xmiId ASTMCore.ASTMSyntax.Expression.BinaryExpression
 * @metaclass BinaryExpression (concrete)
 * @generalization Expression
 * @definition Expressions involving binary operators
 * @note §8.2.1.4.5 prose: "The interior class BinaryExpression is a
 *   subclass of Expression, and has unary association leftOperand and
 *   unary association rightOperand to the class Expression and unary
 *   association operator to the terminal primitive class BinaryOperatory."
 *   PDF typo: `BinaryOperatory` should read `BinaryOperator`. EMOF types
 *   the attribute to `BinaryOperator`.
 * @ownedAttributes
 *   • operator     : BinaryOperator [1..1] -- §8.2.1.4.5: unary association operator to BinaryOperator. EMOF lower="1".
 *   • leftOperand  : Expression     [1..1] -- §8.2.1.4.5: unary association leftOperand to Expression. EMOF lower="1".
 *   • rightOperand : Expression     [1..1] -- §8.2.1.4.5: unary association rightOperand to Expression. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBinaryExpression extends IExpression {
  readonly operator: IBinaryOperator;
  readonly leftOperand: IExpression;
  readonly rightOperand: IExpression;
}

export class BinaryExpression extends Expression implements IBinaryExpression {
  override readonly metaClass: string = "BinaryExpression";
  readonly operator: IBinaryOperator;
  readonly leftOperand: IExpression;
  readonly rightOperand: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    operator: IBinaryOperator;
    leftOperand: IExpression;
    rightOperand: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.operator = args.operator;
    this.leftOperand = args.leftOperand;
    this.rightOperand = args.rightOperand;
  }
}

// ─── 111. UnaryExpression (§8.2.1.4.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.4
 * @xmiId ASTMCore.ASTMSyntax.Expression.UnaryExpression
 * @metaclass UnaryExpression (concrete)
 * @generalization Expression
 * @definition Expressions involving unary operators
 * @note §8.2.1.4.4 prose: "The interior class UnaryExpression is a
 *   subclass of Expression, and has unary association operand to the
 *   class Expression and unary association operator to class
 *   UnaryOperatory." PDF typo: `UnaryOperatory` should read
 *   `UnaryOperator`. EMOF types the attribute to `UnaryOperator`.
 * @ownedAttributes
 *   • operator : UnaryOperator [1..1] -- §8.2.1.4.4: unary association operator to UnaryOperator. EMOF lower="1".
 *   • operand  : Expression    [1..1] -- §8.2.1.4.4: unary association operand to Expression. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IUnaryExpression extends IExpression {
  readonly operator: IUnaryOperator;
  readonly operand: IExpression;
}

export class UnaryExpression extends Expression implements IUnaryExpression {
  override readonly metaClass: string = "UnaryExpression";
  readonly operator: IUnaryOperator;
  readonly operand: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    operator: IUnaryOperator;
    operand: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.operator = args.operator;
    this.operand = args.operand;
  }
}

// ─── 112. CastExpression (§8.2.1.4.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.2
 * @xmiId ASTMCore.ASTMSyntax.Expression.CastExpression
 * @metaclass CastExpression (concrete)
 * @generalization Expression
 * @definition Expressions that are cast to a specified type
 * @note §8.2.1.4.2 prose: "The class CastExpression is a subclass of
 *   Expression, and has unary association castType to TypeReference, and
 *   unary association expression to the class Expression."
 * @ownedAttributes
 *   • castType   : TypeReference [1..1] -- §8.2.1.4.2: unary association castType to TypeReference. EMOF lower="1".
 *   • expression : Expression    [1..1] -- §8.2.1.4.2: unary association expression to Expression. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ICastExpression extends IExpression {
  readonly castType: ITypeReference;
  readonly expression: IExpression;
}

export class CastExpression extends Expression implements ICastExpression {
  override readonly metaClass: string = "CastExpression";
  readonly castType: ITypeReference;
  readonly expression: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    castType: ITypeReference;
    expression: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.castType = args.castType;
    this.expression = args.expression;
  }
}

// ─── 113. ConditionalExpression (§8.2.1.4.6) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.6
 * @xmiId ASTMCore.ASTMSyntax.Expression.ConditionalExpression
 * @metaclass ConditionalExpression (concrete)
 * @generalization Expression
 * @definition Ternary conditional expressions
 * @note §8.2.1.4.6 prose: "The class ConditionalExpression is a subclass
 *   of Expression, and has unary association condition, unary
 *   onFalseOperand and unary association onTrueOperand to the class
 *   Expression." PDF heading writes "Conditional Expression" (with
 *   space) while the class identifier is `ConditionalExpression`.
 *   Semantics (§8.2.1.4.6): "ConditionalExpression has short-circuit
 *   semantics. This implies that the onTrueOperand is evaluated only if
 *   the condition is TRUE, and onFalseOperand is evaluated only if the
 *   condition is FALSE."
 * @ownedAttributes
 *   • condition      : Expression [1..1] -- §8.2.1.4.6: unary association condition to Expression. EMOF lower="1".
 *   • onTrueOperand  : Expression [1..1] -- §8.2.1.4.6: unary association onTrueOperand to Expression. EMOF lower="1".
 *   • onFalseOperand : Expression [1..1] -- §8.2.1.4.6: unary association onFalseOperand to Expression. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IConditionalExpression extends IExpression {
  readonly condition: IExpression;
  readonly onTrueOperand: IExpression;
  readonly onFalseOperand: IExpression;
}

export class ConditionalExpression extends Expression implements IConditionalExpression {
  override readonly metaClass: string = "ConditionalExpression";
  readonly condition: IExpression;
  readonly onTrueOperand: IExpression;
  readonly onFalseOperand: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    condition: IExpression;
    onTrueOperand: IExpression;
    onFalseOperand: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.condition = args.condition;
    this.onTrueOperand = args.onTrueOperand;
    this.onFalseOperand = args.onFalseOperand;
  }
}

// ─── 114. FunctionCallExpression (§8.2.1.4.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.8
 * @xmiId ASTMCore.ASTMSyntax.Expression.FunctionCallExpression
 * @metaclass FunctionCallExpression (concrete)
 * @generalization Expression
 * @definition Function calls
 * @note §8.2.1.4.8 prose: "The interior class FunctionCallExpression is
 *   a subclass of Expression, and has any number of associations of
 *   actualParams to the class ActualParameter, and unary association
 *   calledFunction to the class Expression." EMOF declares
 *   `actualParams` with `lower="1"` (one-or-more), tighter than PDF's
 *   "any number". We honour EMOF.
 * @ownedAttributes
 *   • calledFunction : Expression      [1..1] -- §8.2.1.4.8: unary association calledFunction to Expression. EMOF lower="1".
 *   • actualParams   : ActualParameter [1..*] -- §8.2.1.4.8: one-or-more associations actualParams to ActualParameter. EMOF lower="1" upper="*".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IFunctionCallExpression extends IExpression {
  readonly calledFunction: IExpression;
  readonly actualParams: ReadonlyArray<IActualParameter>;
}

export class FunctionCallExpression extends Expression implements IFunctionCallExpression {
  override readonly metaClass: string = "FunctionCallExpression";
  readonly calledFunction: IExpression;
  readonly actualParams: ReadonlyArray<IActualParameter>;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    calledFunction: IExpression;
    actualParams: ReadonlyArray<IActualParameter>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.calledFunction = args.calledFunction;
    this.actualParams = args.actualParams;
  }
}

// ─── 115. NewExpression (§8.2.1.4.8 / unlabelled subsection) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.8
 * @xmiId ASTMCore.ASTMSyntax.Expression.NewExpression
 * @metaclass NewExpression (concrete)
 * @generalization Expression
 * @definition Instance creation expressions
 * @note §8.2.1.4 (unlabelled NewExpression subsection, immediately
 *   following §8.2.1.4.8 FunctionCallExpression) prose: "The class
 *   NewExpression has unary association newType to the class
 *   TypeReference, and zero to any number association actualParams to
 *   ActualParameter." The PDF spec omits a `§` heading for
 *   NewExpression; we tag it under §8.2.1.4.8 by virtue of its
 *   adjacency to FunctionCallExpression. EMOF declares `actualParams`
 *   with `lower="1"` (one-or-more), tighter than PDF's "zero to any".
 *   We honour EMOF.
 * @ownedAttributes
 *   • newType      : TypeReference   [1..1] -- §8.2.1.4.8: unary association newType to TypeReference. EMOF lower="1".
 *   • actualParams : ActualParameter [1..*] -- §8.2.1.4.8: one-or-more associations actualParams to ActualParameter (EMOF lower="1" upper="*"; PDF: zero-or-more).
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface INewExpression extends IExpression {
  readonly newType: ITypeReference;
  readonly actualParams: ReadonlyArray<IActualParameter>;
}

export class NewExpression extends Expression implements INewExpression {
  override readonly metaClass: string = "NewExpression";
  readonly newType: ITypeReference;
  readonly actualParams: ReadonlyArray<IActualParameter>;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    newType: ITypeReference;
    actualParams: ReadonlyArray<IActualParameter>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.newType = args.newType;
    this.actualParams = args.actualParams;
  }
}

// ─── 116. RangeExpression (§8.2.1.4.7) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.7
 * @xmiId ASTMCore.ASTMSyntax.Expression.RangeExpression
 * @metaclass RangeExpression (concrete)
 * @generalization Expression
 * @definition Expressions consisting of a range of values
 * @note §8.2.1.4.7 prose: "The interior class RangeExpression, is a
 *   subclass of Expression, and has unary association fromExpression
 *   and the unary association toExpression to the interior class
 *   Expression."
 * @ownedAttributes
 *   • fromExpression : Expression [1..1] -- §8.2.1.4.7: unary association fromExpression to Expression. EMOF lower="1".
 *   • toExpression   : Expression [1..1] -- §8.2.1.4.7: unary association toExpression to Expression. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IRangeExpression extends IExpression {
  readonly fromExpression: IExpression;
  readonly toExpression: IExpression;
}

export class RangeExpression extends Expression implements IRangeExpression {
  override readonly metaClass: string = "RangeExpression";
  readonly fromExpression: IExpression;
  readonly toExpression: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    fromExpression: IExpression;
    toExpression: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.fromExpression = args.fromExpression;
    this.toExpression = args.toExpression;
  }
}

// ─── 117. AggregateExpression (§8.2.1.4.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.3
 * @xmiId ASTMCore.ASTMSyntax.Expression.AggregateExpression
 * @metaclass AggregateExpression (concrete)
 * @generalization Expression
 * @definition Expressions consisting of a list of subexpressions
 * @note §8.2.1.4.3 prose: "The AggregateExpression is a subclass of
 *   Expression, has no associations, properties or subclasses." Despite
 *   the definition mentioning "a list of subexpressions", EMOF declares
 *   AggregateExpression with ZERO own ownedAttribute elements — the
 *   list is not surfaced structurally. CollectionExpression is the
 *   sibling concrete class that does carry an `expressionList`. The
 *   AggregateExpression vs CollectionExpression split appears to be a
 *   forward-compatible vestige of an earlier ASTM design.
 * @ownedAttributes (none -- AggregateExpression has no own ownedAttribute in EMOF; structure inherited from Expression)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IAggregateExpression extends IExpression {
  // terminal — no further structural members.
}

export class AggregateExpression extends Expression implements IAggregateExpression {
  override readonly metaClass = "AggregateExpression" as const;
}

// ─── 118. CollectionExpression (§8.2.1.4.11) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.11
 * @xmiId ASTMCore.ASTMSyntax.Expression.CollectionExpression
 * @metaclass CollectionExpression (concrete)
 * @generalization Expression
 * @definition Expressions that are collections of other expressions
 * @note §8.2.1.4.11 prose: "CollectionExpression is a subclass of
 *   Expression and has one to many association expressionList to
 *   Expression." EMOF declares `expressionList` with `lower="1"
 *   upper="*"` consistent with PDF "one to many".
 * @ownedAttributes
 *   • expressionList : Expression [1..*] -- §8.2.1.4.11: one to many association expressionList to Expression. EMOF lower="1" upper="*".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ICollectionExpression extends IExpression {
  readonly expressionList: ReadonlyArray<IExpression>;
}

export class CollectionExpression extends Expression implements ICollectionExpression {
  override readonly metaClass: string = "CollectionExpression";
  readonly expressionList: ReadonlyArray<IExpression>;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    expressionList: ReadonlyArray<IExpression>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.expressionList = args.expressionList;
  }
}

// ─── 119. LabelAccess (§8.2.1.4.12) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.12
 * @xmiId ASTMCore.ASTMSyntax.Expression.LabelAccess
 * @metaclass LabelAccess (concrete)
 * @generalization Expression
 * @definition Reference to a label
 * @note §8.2.1.4.12 prose: "LabelAccess is a subclass of Expression with
 *   unary association labelDefinition to class LabelDefinition and
 *   unary association labelName to class Name."
 * @ownedAttributes
 *   • labelName       : Name            [1..1] -- §8.2.1.4.12: unary association labelName to Name. EMOF lower="1".
 *   • labelDefinition : LabelDefinition [1..1] -- §8.2.1.4.12: unary association labelDefinition to LabelDefinition. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ILabelAccess extends IExpression {
  readonly labelName: IName;
  readonly labelDefinition: ILabelDefinition;
}

export class LabelAccess extends Expression implements ILabelAccess {
  override readonly metaClass: string = "LabelAccess";
  readonly labelName: IName;
  readonly labelDefinition: ILabelDefinition;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    labelName: IName;
    labelDefinition: ILabelDefinition;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.labelName = args.labelName;
    this.labelDefinition = args.labelDefinition;
  }
}

// ─── 120. BitLiteral (§8.2.1.4.1.6) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.1.6
 * @xmiId ASTMCore.ASTMSyntax.Expression.BitLiteral
 * @metaclass BitLiteral (concrete)
 * @generalization Literal
 * @definition Binary literals
 * @note §8.2.1.4.1.6 prose: "The class BitLiteral is a subclass of Literal."
 *   (PDF §§8.2.1.4.1.2-8.2.1.4.1.6 mistakenly write "The class
 *   IntegerLiteral is a subclass of Literal" for ALL six leaves —
 *   a copy-paste typo in the OMG PDF. EMOF declares each leaf
  *   with `superClass="ASTMCore.ASTMSyntax.Expression.Literal"` and
  *   `name="BitLiteral"`. The value carrier is inherited from Literal.")
 * @ownedAttributes (none -- value carrier inherited from Literal)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBitLiteral extends ILiteral {
  // terminal — no further structural members.
}

export class BitLiteral extends Literal implements IBitLiteral {
  override readonly metaClass = "BitLiteral" as const;
}

// ─── 121. BooleanLiteral (§8.2.1.4.1.5) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.1.5
 * @xmiId ASTMCore.ASTMSyntax.Expression.BooleanLiteral
 * @metaclass BooleanLiteral (concrete)
 * @generalization Literal
 * @definition Boolean literals
 * @note §8.2.1.4.1.5 prose: "The class BooleanLiteral is a subclass of Literal."
 *   (PDF §§8.2.1.4.1.2-8.2.1.4.1.6 mistakenly write "The class
 *   IntegerLiteral is a subclass of Literal" for ALL six leaves —
 *   a copy-paste typo in the OMG PDF. EMOF declares each leaf
  *   with `superClass="ASTMCore.ASTMSyntax.Expression.Literal"` and
  *   `name="BooleanLiteral"`. The value carrier is inherited from Literal.")
 * @ownedAttributes (none -- value carrier inherited from Literal)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBooleanLiteral extends ILiteral {
  // terminal — no further structural members.
}

export class BooleanLiteral extends Literal implements IBooleanLiteral {
  override readonly metaClass = "BooleanLiteral" as const;
}

// ─── 122. CharLiteral (§8.2.1.4.1.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.1.3
 * @xmiId ASTMCore.ASTMSyntax.Expression.CharLiteral
 * @metaclass CharLiteral (concrete)
 * @generalization Literal
 * @definition Character literals
 * @note §8.2.1.4.1.3 prose: "The class CharLiteral is a subclass of Literal."
 *   (PDF §§8.2.1.4.1.2-8.2.1.4.1.6 mistakenly write "The class
 *   IntegerLiteral is a subclass of Literal" for ALL six leaves —
 *   a copy-paste typo in the OMG PDF. EMOF declares each leaf
  *   with `superClass="ASTMCore.ASTMSyntax.Expression.Literal"` and
  *   `name="CharLiteral"`. The value carrier is inherited from Literal.")
 * @ownedAttributes (none -- value carrier inherited from Literal)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ICharLiteral extends ILiteral {
  // terminal — no further structural members.
}

export class CharLiteral extends Literal implements ICharLiteral {
  override readonly metaClass = "CharLiteral" as const;
}

// ─── 123. EnumLiteral (§8.2.1.4.1.7) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.1.7
 * @xmiId ASTMCore.ASTMSyntax.Expression.EnumLiteral
 * @metaclass EnumLiteral (concrete)
 * @generalization Literal
 * @definition Enumeration literals
 * @note §8.2.1.4.1.7 prose: "The class EnumLiteral is a subclass of Literal."
 *   (PDF §§8.2.1.4.1.2-8.2.1.4.1.6 mistakenly write "The class
 *   IntegerLiteral is a subclass of Literal" for ALL six leaves —
 *   a copy-paste typo in the OMG PDF. EMOF declares each leaf
  *   with `superClass="ASTMCore.ASTMSyntax.Expression.Literal"` and
  *   `name="EnumLiteral"`. The value carrier is inherited from Literal.")
 * @ownedAttributes (none -- value carrier inherited from Literal)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IEnumLiteral extends ILiteral {
  // terminal — no further structural members.
}

export class EnumLiteral extends Literal implements IEnumLiteral {
  override readonly metaClass = "EnumLiteral" as const;
}

// ─── 124. IntegerLiteral (§8.2.1.4.1.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.1.1
 * @xmiId ASTMCore.ASTMSyntax.Expression.IntegerLiteral
 * @metaclass IntegerLiteral (concrete)
 * @generalization Literal
 * @definition Integer literals
 * @note §8.2.1.4.1.1 prose: "The class IntegerLiteral is a subclass of Literal."
 *   (PDF §§8.2.1.4.1.2-8.2.1.4.1.6 mistakenly write "The class
 *   IntegerLiteral is a subclass of Literal" for ALL six leaves —
 *   a copy-paste typo in the OMG PDF. EMOF declares each leaf
  *   with `superClass="ASTMCore.ASTMSyntax.Expression.Literal"` and
  *   `name="IntegerLiteral"`. The value carrier is inherited from Literal.")
 * @ownedAttributes (none -- value carrier inherited from Literal)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IIntegerLiteral extends ILiteral {
  // terminal — no further structural members.
}

export class IntegerLiteral extends Literal implements IIntegerLiteral {
  override readonly metaClass = "IntegerLiteral" as const;
}

// ─── 125. RealLiteral (§8.2.1.4.1.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.1.4
 * @xmiId ASTMCore.ASTMSyntax.Expression.RealLiteral
 * @metaclass RealLiteral (concrete)
 * @generalization Literal
 * @definition Floating-point Literals
 * @note §8.2.1.4.1.4 prose: "The class RealLiteral is a subclass of Literal."
 *   (PDF §§8.2.1.4.1.2-8.2.1.4.1.6 mistakenly write "The class
 *   IntegerLiteral is a subclass of Literal" for ALL six leaves —
 *   a copy-paste typo in the OMG PDF. EMOF declares each leaf
  *   with `superClass="ASTMCore.ASTMSyntax.Expression.Literal"` and
  *   `name="RealLiteral"`. The value carrier is inherited from Literal.")
 * @ownedAttributes (none -- value carrier inherited from Literal)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IRealLiteral extends ILiteral {
  // terminal — no further structural members.
}

export class RealLiteral extends Literal implements IRealLiteral {
  override readonly metaClass = "RealLiteral" as const;
}

// ─── 126. StringLiteral (§8.2.1.4.1.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.1.2
 * @xmiId ASTMCore.ASTMSyntax.Expression.StringLiteral
 * @metaclass StringLiteral (concrete)
 * @generalization Literal
 * @definition String literals
 * @note §8.2.1.4.1.2 prose: "The class StringLiteral is a subclass of Literal."
 *   (PDF §§8.2.1.4.1.2-8.2.1.4.1.6 mistakenly write "The class
 *   IntegerLiteral is a subclass of Literal" for ALL six leaves —
 *   a copy-paste typo in the OMG PDF. EMOF declares each leaf
  *   with `superClass="ASTMCore.ASTMSyntax.Expression.Literal"` and
  *   `name="StringLiteral"`. The value carrier is inherited from Literal.")
 * @ownedAttributes (none -- value carrier inherited from Literal)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IStringLiteral extends ILiteral {
  // terminal — no further structural members.
}

export class StringLiteral extends Literal implements IStringLiteral {
  override readonly metaClass = "StringLiteral" as const;
}

// ─── 127. IdentifierReference (§8.2.1.4.11.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.11.1
 * @xmiId ASTMCore.ASTMSyntax.Expression.IdentifierReference
 * @metaclass IdentifierReference (concrete)
 * @generalization NameReference
 * @definition References to simply-named (unqualified) entities
 * @note §8.2.1.4.11.1 prose: "The interior class IdentifierReference is
 *   a subclass of NameReference, and has any number of association
 *   Qualifiers to interior class NamedType and unary semantic association
 *   RefersTo to the inner class DeclarationOrDefinition." PDF prose
 *   describes own `Qualifiers` and `RefersTo` associations, but EMOF
 *   declares IdentifierReference with ZERO own ownedAttribute elements
 *   — its `identifierName` and `refersTo` are inherited from
 *   NameReference. PDF prose appears to redundantly describe the
 *   inherited `refersTo` and confuse `qualifiers` (which is
 *   QualifiedIdentifierReference's attribute, not IdentifierReference's).
 *   We honour EMOF.
 * @ownedAttributes (none -- identifierName / refersTo inherited from NameReference)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IIdentifierReference extends INameReference {
  // terminal — no further structural members.
}

export class IdentifierReference extends NameReference implements IIdentifierReference {
  override readonly metaClass = "IdentifierReference" as const;
}

// ─── 128. TypeQualifiedIdentifierReference (§8.2.1.4.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.TypeQualifiedIdentifierReference
 * @metaclass TypeQualifiedIdentifierReference (concrete)
 * @generalization NameReference
 * @definition References to entities qualified by type (e.g., Java's
 *   `Outer.Inner` static-member access pattern)
 * @note §8.2.1.4.9 hierarchy block lists TypeQualifiedIdentifierReference
 *   as a NameReference subclass but the PDF provides no dedicated
 *   subsection-heading or `Definition:` line for it. The definition
 *   here is inferred from the metaclass name and the structural
 *   `aggregateType : TypeReference [*] + member : IdentifierReference`
 *   shape EMOF declares — i.e., a name reference qualified by a Type
 *   rather than a value. EMOF declares `aggregateType` with `lower="1"
 *   upper="*"` (one-or-more), suggesting nested type qualification.
 * @ownedAttributes
 *   • aggregateType : TypeReference       [1..*] -- §8.2.1.4.9: one-or-more association aggregateType to TypeReference. EMOF lower="1" upper="*".
 *   • member        : IdentifierReference [1..1] -- §8.2.1.4.9: unary association member to IdentifierReference. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ITypeQualifiedIdentifierReference extends INameReference {
  readonly aggregateType: ReadonlyArray<ITypeReference>;
  readonly member: IIdentifierReference;
}

export class TypeQualifiedIdentifierReference extends NameReference implements ITypeQualifiedIdentifierReference {
  override readonly metaClass = "TypeQualifiedIdentifierReference" as const;
  readonly aggregateType: ReadonlyArray<ITypeReference>;
  readonly member: IIdentifierReference;
  constructor(args: {
    locationInfo: ISourceLocation;
    expressionType: ITypeReference;
    identifierName: IName;
    refersTo: IDefintionObject;
    aggregateType: ReadonlyArray<ITypeReference>;
    member: IIdentifierReference;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      expressionType: args.expressionType,
      identifierName: args.identifierName,
      refersTo: args.refersTo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.aggregateType = args.aggregateType;
    this.member = args.member;
  }
}

// ─── 129. QualifiedOverData (§8.2.1.4.11.2.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.11.2.2
 * @xmiId ASTMCore.ASTMSyntax.Expression.QualifiedOverData
 * @metaclass QualifiedOverData (concrete)
 * @generalization QualifiedIdentifierReference
 * @definition References to entities with qualified names where the qualifying portion of the name is not a pointer value
 * @note §8.2.1.4.11.2.2 prose: "QualifiedOverData is a subclass of the class QualifiedIdentifierReference."
 * @ownedAttributes (none -- qualifiers / member inherited from QualifiedIdentifierReference)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IQualifiedOverData extends IQualifiedIdentifierReference {
  // terminal — no further structural members.
}

export class QualifiedOverData extends QualifiedIdentifierReference implements IQualifiedOverData {
  override readonly metaClass = "QualifiedOverData" as const;
}

// ─── 130. QualifiedOverPtr (§8.2.1.4.11.2.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.11.2.1
 * @xmiId ASTMCore.ASTMSyntax.Expression.QualifiedOverPtr
 * @metaclass QualifiedOverPtr (concrete)
 * @generalization QualifiedIdentifierReference
 * @definition References to entities with qualified names where the qualifying portion of the name is a pointer value
 * @note §8.2.1.4.11.2.1 prose: "QualifiedOverPtr is a subclass of the class QualifiedIdentifierReference. PDF heading writes "QualifiedOverPointer" but the hierarchy block, prose, and EMOF all use `QualifiedOverPtr` (abbreviated)."
 * @ownedAttributes (none -- qualifiers / member inherited from QualifiedIdentifierReference)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IQualifiedOverPtr extends IQualifiedIdentifierReference {
  // terminal — no further structural members.
}

export class QualifiedOverPtr extends QualifiedIdentifierReference implements IQualifiedOverPtr {
  override readonly metaClass = "QualifiedOverPtr" as const;
}

// ─── 131. Add (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.Add
 * @metaclass Add (concrete)
 * @generalization BinaryOperator
 * @definition Addition operator
 * @note §8.2.1.5.9 lists Add as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IAdd extends IBinaryOperator {
  // terminal — no further structural members.
}

export class Add extends BinaryOperator implements IAdd {
  override readonly metaClass = "Add" as const;
}

// ─── 132. And (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.And
 * @metaclass And (concrete)
 * @generalization BinaryOperator
 * @definition Logical conjunction operator
 * @note §8.2.1.5.9 lists And as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IAnd extends IBinaryOperator {
  // terminal — no further structural members.
}

export class And extends BinaryOperator implements IAnd {
  override readonly metaClass = "And" as const;
}

// ─── 133. Assign (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.Assign
 * @metaclass Assign (concrete)
 * @generalization BinaryOperator
 * @definition Assignment operator
 * @note §8.2.1.5.9 lists Assign as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IAssign extends IBinaryOperator {
  // terminal — no further structural members.
}

export class Assign extends BinaryOperator implements IAssign {
  override readonly metaClass = "Assign" as const;
}

// ─── 134. BitAnd (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.BitAnd
 * @metaclass BitAnd (concrete)
 * @generalization BinaryOperator
 * @definition Bitwise conjunction operator
 * @note §8.2.1.5.9 lists BitAnd as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBitAnd extends IBinaryOperator {
  // terminal — no further structural members.
}

export class BitAnd extends BinaryOperator implements IBitAnd {
  override readonly metaClass = "BitAnd" as const;
}

// ─── 135. BitLeftShift (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.BitLeftShift
 * @metaclass BitLeftShift (concrete)
 * @generalization BinaryOperator
 * @definition Bitwise left-shift operator
 * @note §8.2.1.5.9 lists BitLeftShift as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBitLeftShift extends IBinaryOperator {
  // terminal — no further structural members.
}

export class BitLeftShift extends BinaryOperator implements IBitLeftShift {
  override readonly metaClass = "BitLeftShift" as const;
}

// ─── 136. BitOr (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.BitOr
 * @metaclass BitOr (concrete)
 * @generalization BinaryOperator
 * @definition Bitwise disjunction operator
 * @note §8.2.1.5.9 lists BitOr as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBitOr extends IBinaryOperator {
  // terminal — no further structural members.
}

export class BitOr extends BinaryOperator implements IBitOr {
  override readonly metaClass = "BitOr" as const;
}

// ─── 137. BitRightShift (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.BitRightShift
 * @metaclass BitRightShift (concrete)
 * @generalization BinaryOperator
 * @definition Bitwise right-shift operator
 * @note §8.2.1.5.9 lists BitRightShift as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBitRightShift extends IBinaryOperator {
  // terminal — no further structural members.
}

export class BitRightShift extends BinaryOperator implements IBitRightShift {
  override readonly metaClass = "BitRightShift" as const;
}

// ─── 138. BitXor (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.BitXor
 * @metaclass BitXor (concrete)
 * @generalization BinaryOperator
 * @definition Bitwise exclusive-or operator
 * @note §8.2.1.5.9 lists BitXor as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBitXor extends IBinaryOperator {
  // terminal — no further structural members.
}

export class BitXor extends BinaryOperator implements IBitXor {
  override readonly metaClass = "BitXor" as const;
}

// ─── 139. Divide (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.Divide
 * @metaclass Divide (concrete)
 * @generalization BinaryOperator
 * @definition Division operator
 * @note §8.2.1.5.9 lists Divide as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDivide extends IBinaryOperator {
  // terminal — no further structural members.
}

export class Divide extends BinaryOperator implements IDivide {
  override readonly metaClass = "Divide" as const;
}

// ─── 140. Equal (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.Equal
 * @metaclass Equal (concrete)
 * @generalization BinaryOperator
 * @definition Equality operator
 * @note §8.2.1.5.9 lists Equal as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IEqual extends IBinaryOperator {
  // terminal — no further structural members.
}

export class Equal extends BinaryOperator implements IEqual {
  override readonly metaClass = "Equal" as const;
}

// ─── 141. Exponent (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.Exponent
 * @metaclass Exponent (concrete)
 * @generalization BinaryOperator
 * @definition Exponentiation operator
 * @note §8.2.1.5.9 lists Exponent as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IExponent extends IBinaryOperator {
  // terminal — no further structural members.
}

export class Exponent extends BinaryOperator implements IExponent {
  override readonly metaClass = "Exponent" as const;
}

// ─── 142. Greater (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.Greater
 * @metaclass Greater (concrete)
 * @generalization BinaryOperator
 * @definition Relational operator in which the result is true iff the left operand is greater than the right operand
 * @note §8.2.1.5.9 lists Greater as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IGreater extends IBinaryOperator {
  // terminal — no further structural members.
}

export class Greater extends BinaryOperator implements IGreater {
  override readonly metaClass = "Greater" as const;
}

// ─── 143. Less (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.Less
 * @metaclass Less (concrete)
 * @generalization BinaryOperator
 * @definition Relational operator in which the result is true iff the left operand is less than the right operand
 * @note §8.2.1.5.9 lists Less as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ILess extends IBinaryOperator {
  // terminal — no further structural members.
}

export class Less extends BinaryOperator implements ILess {
  override readonly metaClass = "Less" as const;
}

// ─── 144. Modulus (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.Modulus
 * @metaclass Modulus (concrete)
 * @generalization BinaryOperator
 * @definition Modulo operator
 * @note §8.2.1.5.9 lists Modulus as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IModulus extends IBinaryOperator {
  // terminal — no further structural members.
}

export class Modulus extends BinaryOperator implements IModulus {
  override readonly metaClass = "Modulus" as const;
}

// ─── 145. Multiply (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.Multiply
 * @metaclass Multiply (concrete)
 * @generalization BinaryOperator
 * @definition Multiplication operator
 * @note §8.2.1.5.9 lists Multiply as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IMultiply extends IBinaryOperator {
  // terminal — no further structural members.
}

export class Multiply extends BinaryOperator implements IMultiply {
  override readonly metaClass = "Multiply" as const;
}

// ─── 146. NotEqual (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.NotEqual
 * @metaclass NotEqual (concrete)
 * @generalization BinaryOperator
 * @definition Inequality operator
 * @note §8.2.1.5.9 lists NotEqual as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface INotEqual extends IBinaryOperator {
  // terminal — no further structural members.
}

export class NotEqual extends BinaryOperator implements INotEqual {
  override readonly metaClass = "NotEqual" as const;
}

// ─── 147. NotGreater (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.NotGreater
 * @metaclass NotGreater (concrete)
 * @generalization BinaryOperator
 * @definition Relational operator in which the result is true iff the left operand is not greater than the right operand
 * @note §8.2.1.5.9 lists NotGreater as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface INotGreater extends IBinaryOperator {
  // terminal — no further structural members.
}

export class NotGreater extends BinaryOperator implements INotGreater {
  override readonly metaClass = "NotGreater" as const;
}

// ─── 148. NotLess (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.NotLess
 * @metaclass NotLess (concrete)
 * @generalization BinaryOperator
 * @definition Relational operator in which the result is true iff the left operand is not less than the right operand
 * @note §8.2.1.5.9 lists NotLess as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface INotLess extends IBinaryOperator {
  // terminal — no further structural members.
}

export class NotLess extends BinaryOperator implements INotLess {
  override readonly metaClass = "NotLess" as const;
}

// ─── 149. OperatorAssign (§8.2.1.5.9.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.1
 * @xmiId ASTMCore.ASTMSyntax.Expression.OperatorAssign
 * @metaclass OperatorAssign (concrete)
 * @generalization BinaryOperator
 * @definition Assignment operators compounded with a binary operator
 * @note §8.2.1.5.9.1 prose: "The interior class OperatorAssign is a
 *   subclass of BinaryOperator, and has unary association operator to
 *   inner class BinaryOperator." Footnote (6): "e.g., +=, *=, etc."
 *   The own `operator` attribute is redeclared on OperatorAssign to
 *   carry the embedded binary operator that is being compounded with
 *   the assignment — e.g., for `+=`, the operator end carries an `Add`
 *   instance.
 * @ownedAttributes
 *   • operator : BinaryOperator [1..1] -- §8.2.1.5.9.1: unary association operator to BinaryOperator. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IOperatorAssign extends IBinaryOperator {
  readonly operator: IBinaryOperator;
}

export class OperatorAssign extends BinaryOperator implements IOperatorAssign {
  override readonly metaClass = "OperatorAssign" as const;
  readonly operator: IBinaryOperator;
  constructor(args: {
    locationInfo: ISourceLocation;
    operator: IBinaryOperator;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.operator = args.operator;
  }
}

// ─── 150. Or (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.Or
 * @metaclass Or (concrete)
 * @generalization BinaryOperator
 * @definition Logical disjunction operator
 * @note §8.2.1.5.9 lists Or as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IOr extends IBinaryOperator {
  // terminal — no further structural members.
}

export class Or extends BinaryOperator implements IOr {
  override readonly metaClass = "Or" as const;
}

// ─── 151. Subtract (§8.2.1.5.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9
 * @xmiId ASTMCore.ASTMSyntax.Expression.Subtract
 * @metaclass Subtract (concrete)
 * @generalization BinaryOperator
 * @definition Subtraction operator
 * @note §8.2.1.5.9 lists Subtract as a BinaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from BinaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ISubtract extends IBinaryOperator {
  // terminal — no further structural members.
}

export class Subtract extends BinaryOperator implements ISubtract {
  override readonly metaClass = "Subtract" as const;
}

// ─── 152. AddressOf (§8.2.1.5.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.8
 * @xmiId ASTMCore.ASTMSyntax.Expression.AddressOf
 * @metaclass AddressOf (concrete)
 * @generalization UnaryOperator
 * @definition Operator which results in the address of its operand
 * @note §8.2.1.5.8 lists AddressOf as a UnaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from UnaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IAddressOf extends IUnaryOperator {
  // terminal — no further structural members.
}

export class AddressOf extends UnaryOperator implements IAddressOf {
  override readonly metaClass = "AddressOf" as const;
}

// ─── 153. BitNot (§8.2.1.5.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.8
 * @xmiId ASTMCore.ASTMSyntax.Expression.BitNot
 * @metaclass BitNot (concrete)
 * @generalization UnaryOperator
 * @definition Bitwise complement operator
 * @note §8.2.1.5.8 lists BitNot as a UnaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from UnaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBitNot extends IUnaryOperator {
  // terminal — no further structural members.
}

export class BitNot extends UnaryOperator implements IBitNot {
  override readonly metaClass = "BitNot" as const;
}

// ─── 154. Decrement (§8.2.1.5.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.8
 * @xmiId ASTMCore.ASTMSyntax.Expression.Decrement
 * @metaclass Decrement (concrete)
 * @generalization UnaryOperator
 * @definition Operator which decrements its operand and results in the decremented value
 * @note §8.2.1.5.8 lists Decrement as a UnaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from UnaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDecrement extends IUnaryOperator {
  // terminal — no further structural members.
}

export class Decrement extends UnaryOperator implements IDecrement {
  override readonly metaClass = "Decrement" as const;
}

// ─── 155. Deref (§8.2.1.5.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.8
 * @xmiId ASTMCore.ASTMSyntax.Expression.Deref
 * @metaclass Deref (concrete)
 * @generalization UnaryOperator
 * @definition Operator which results in the value of which its operand is the address
 * @note §8.2.1.5.8 lists Deref as a UnaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from UnaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDeref extends IUnaryOperator {
  // terminal — no further structural members.
}

export class Deref extends UnaryOperator implements IDeref {
  override readonly metaClass = "Deref" as const;
}

// ─── 156. Increment (§8.2.1.5.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.8
 * @xmiId ASTMCore.ASTMSyntax.Expression.Increment
 * @metaclass Increment (concrete)
 * @generalization UnaryOperator
 * @definition Operator which increments its operand and results in the incremented value
 * @note §8.2.1.5.8 lists Increment as a UnaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from UnaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IIncrement extends IUnaryOperator {
  // terminal — no further structural members.
}

export class Increment extends UnaryOperator implements IIncrement {
  override readonly metaClass = "Increment" as const;
}

// ─── 157. Not (§8.2.1.5.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.8
 * @xmiId ASTMCore.ASTMSyntax.Expression.Not
 * @metaclass Not (concrete)
 * @generalization UnaryOperator
 * @definition Logical complement operator
 * @note §8.2.1.5.8 lists Not as a UnaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from UnaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface INot extends IUnaryOperator {
  // terminal — no further structural members.
}

export class Not extends UnaryOperator implements INot {
  override readonly metaClass = "Not" as const;
}

// ─── 158. PostDecrement (§8.2.1.5.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.8
 * @xmiId ASTMCore.ASTMSyntax.Expression.PostDecrement
 * @metaclass PostDecrement (concrete)
 * @generalization UnaryOperator
 * @definition Operator which results in the value of its operand before it is decremented
 * @note §8.2.1.5.8 lists PostDecrement as a UnaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from UnaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IPostDecrement extends IUnaryOperator {
  // terminal — no further structural members.
}

export class PostDecrement extends UnaryOperator implements IPostDecrement {
  override readonly metaClass = "PostDecrement" as const;
}

// ─── 159. PostIncrement (§8.2.1.5.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.8
 * @xmiId ASTMCore.ASTMSyntax.Expression.PostIncrement
 * @metaclass PostIncrement (concrete)
 * @generalization UnaryOperator
 * @definition Operator which results in the value of its operand before it is incremented
 * @note §8.2.1.5.8 lists PostIncrement as a UnaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from UnaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IPostIncrement extends IUnaryOperator {
  // terminal — no further structural members.
}

export class PostIncrement extends UnaryOperator implements IPostIncrement {
  override readonly metaClass = "PostIncrement" as const;
}

// ─── 160. UnaryMinus (§8.2.1.5.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.8
 * @xmiId ASTMCore.ASTMSyntax.Expression.UnaryMinus
 * @metaclass UnaryMinus (concrete)
 * @generalization UnaryOperator
 * @definition Negation operator
 * @note §8.2.1.5.8 lists UnaryMinus as a UnaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from UnaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IUnaryMinus extends IUnaryOperator {
  // terminal — no further structural members.
}

export class UnaryMinus extends UnaryOperator implements IUnaryMinus {
  override readonly metaClass = "UnaryMinus" as const;
}

// ─── 161. UnaryPlus (§8.2.1.5.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.8
 * @xmiId ASTMCore.ASTMSyntax.Expression.UnaryPlus
 * @metaclass UnaryPlus (concrete)
 * @generalization UnaryOperator
 * @definition Unary plus operator
 * @note §8.2.1.5.8 lists UnaryPlus as a UnaryOperator terminal leaf.
 * @ownedAttributes (none -- inherited from UnaryOperator / MinorSyntaxObject / GASTMSyntaxObject)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IUnaryPlus extends IUnaryOperator {
  // terminal — no further structural members.
}

export class UnaryPlus extends UnaryOperator implements IUnaryPlus {
  override readonly metaClass = "UnaryPlus" as const;
}

// ─── 162. ActualParameterExpression (§8.2.1.5.9.5.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.5.1
 * @xmiId ASTMCore.ASTMSyntax.Expression.ActualParameterExpression
 * @metaclass ActualParameterExpression (concrete)
 * @generalization ActualParameter
 * @definition Actual parameters involving expressions (as opposed to missing)
 * @note §8.2.1.5.9.5.1 prose: "ActualParameterExpression is subclass of
 *   ActualParameter and has two subclasses ByValueActualParameterExpression
 *   and ByReferenceActualParameterExpression that are used for denoting
 *   parameters passed by value and reference and unary association
 *   value to Expression."
 * @ownedAttributes
 *   • value : Expression [1..1] -- §8.2.1.5.9.5.1: unary association value to Expression. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IActualParameterExpression extends IActualParameter {
  readonly value: IExpression;
}

export class ActualParameterExpression extends ActualParameter implements IActualParameterExpression {
  override readonly metaClass: string = "ActualParameterExpression";
  readonly value: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    value: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.value = args.value;
  }
}

// ─── 163. MissingActualParameter (§8.2.1.5.9.5) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.5
 * @xmiId ASTMCore.ASTMSyntax.Expression.MissingActualParameter
 * @metaclass MissingActualParameter (concrete)
 * @generalization ActualParameter
 * @definition Missing actual parameter
 * @note §8.2.1.5.9.5 prose: "The MissingActualParameter is a subclass of
 *   ActualParameter used for denoting that the actual parameters are not
 *   present."
 * @ownedAttributes (none)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IMissingActualParameter extends IActualParameter {
  // terminal — no further structural members.
}

export class MissingActualParameter extends ActualParameter implements IMissingActualParameter {
  override readonly metaClass = "MissingActualParameter" as const;
}

// ─── 164. ByReferenceActualParameterExpression (§8.2.1.5.9.5.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.5.1
 * @xmiId ASTMCore.ASTMSyntax.Expression.ByReferenceActualParameterExpression
 * @metaclass ByReferenceActualParameterExpression (concrete)
 * @generalization ActualParameterExpression
 * @definition Actual Parameters passed by reference
 * @note §8.2.1.5.9.5.1 prose: "The ByReferenceActualParameterExpression is a subclass of ActualParameterExpression used for denoting parameters passed by reference."
 * @ownedAttributes (none -- value inherited from ActualParameterExpression)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IByReferenceActualParameterExpression extends IActualParameterExpression {
  // terminal — no further structural members.
}

export class ByReferenceActualParameterExpression extends ActualParameterExpression implements IByReferenceActualParameterExpression {
  override readonly metaClass = "ByReferenceActualParameterExpression" as const;
}

// ─── 165. ByValueActualParameterExpression (§8.2.1.5.9.5.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.9.5.1
 * @xmiId ASTMCore.ASTMSyntax.Expression.ByValueActualParameterExpression
 * @metaclass ByValueActualParameterExpression (concrete)
 * @generalization ActualParameterExpression
 * @definition Actual Parameters passed by value
 * @note §8.2.1.5.9.5.1 prose: "The ByValueActualParameterExpression is a subclass of ActualParameterExpression used for denoting parameters passed by value."
 * @ownedAttributes (none -- value inherited from ActualParameterExpression)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IByValueActualParameterExpression extends IActualParameterExpression {
  // terminal — no further structural members.
}

export class ByValueActualParameterExpression extends ActualParameterExpression implements IByValueActualParameterExpression {
  override readonly metaClass = "ByValueActualParameterExpression" as const;
}

// ═══════════════════════════════════════════════════════════════════════════
// END Implementer #4 (Wave 1.4). Next implementer starts at class 166.
// ═══════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════
// BEGIN Implementer #5 (Wave 1.5): GASTM Statement — 28 metaclasses (166-193)
//
// Scope: ASTMCore.ASTMSyntax.Statement nested package — comprising:
//   • Statement root abstract                 (§8.2.1.4.14)          — 1 class
//   • Direct Statement subclasses             (§8.2.1.4.14.1-14)     — 16 classes
//     (BlockStatement, BreakStatement, ContinueStatement,
//      DeclarationOrDefinitionStatement, DeleteStatement,
//      EmptyStatement, ExpressionStatement, IfStatement,
//      JumpStatement, LabeledStatement, LoopStatement,
//      ReturnStatement, SwitchStatement, TerminateStatement,
//      ThrowStatement, TryStatement)
//   • Direct LoopStatement subclasses         (§8.2.1.4.14.11)       — 3 classes
//     (DoWhileStatement, WhileStatement, ForStatement [abstract])
//   • Direct ForStatement subclasses          (§8.2.1.4.14.11.4-5)   — 2 classes
//     (ForCheckAfterStatement, ForCheckBeforeStatement)
//   • Direct MinorSyntaxObject subclasses     (§8.2.1.5.4, §8.2.1.5.7) — 2 classes
//     (SwitchCase, CatchBlock)
//   • Direct SwitchCase subclasses            (§8.2.1.5.5-6)         — 2 classes
//     (CaseBlock, DefaultBlock)
//   • Direct CatchBlock subclasses            (§8.2.1.5.7.1-2)       — 2 classes
//     (TypesCatchBlock, VariableCatchBlock)
//                                                                    ────────
//                                                                    28 classes
//
// Notes on OMG spec gaps observed during this wave:
//   1. The PDF §8.2.1.4.14 prose only enumerates ForStatement as the abstract
//      LoopStatement leaf (the `!` prefix mark in the hierarchy block).
//      LoopStatement itself is NOT marked abstract in EMOF
//      (`isAbstract` attribute absent => defaults to false).  The §8.2.1.4.14.11
//      prose ("further classified into interior subclasses WhileStatement,
//      DoWhileStatement, and ForStatement") is consistent with either
//      interpretation. We honour the EMOF source-of-truth: LoopStatement is
//      concrete; ForStatement is abstract.
//   2. The PDF §8.2.1.4.14.3-4 (BreakStatement, ContinueStatement) describe
//      `target : LabelAccess?` (Expression-side LabelAccess). The EMOF
//      ownedAttribute on these two classes declares the type as
//      `ASTMCore.ASTMSyntax.Expression.LabelAccess` — consistent. The PDF
//      prose mentions "IdentifierReference" for ContinueStatement; we honour
//      EMOF (LabelAccess) since EMOF is the authoritative serialization.
//   3. The PDF §8.2.1.4.14.5 (LabeledStatement) prose specifies
//      `label : LabelDefinition`. The EMOF agrees. The DeclarationAndDefinition
//      package's `LabelDefinition` class was authored by Wave 3.
//   4. The PDF §8.2.1.5.4 (SwitchCase) Property Specification shows
//      `body : Statement+`. The EMOF declares `body` as `lower="1" upper="*"`.
//      Match: at least one substatement.
//   5. The PDF §8.2.1.4.14.15-16 (DeleteStatement, TerminateStatement) follow
//      the same pattern: TerminateStatement has no properties/associations.
//      EMOF agrees — empty subclass body.
//
// This wave completes the GASTM portion of @amlhubs/astm. Cumulative metaclass
// count: 193 (matches the EMOF source-of-truth count). The single remaining
// forward-shadow alias declared in Wave 1.1 (for `IStatement`) is REMOVED
// above this wave because the real `IStatement` interface is authored below;
// the alias block is now empty and its surrounding comment header has been
// deleted, the clean post-GASTM state.
// ═══════════════════════════════════════════════════════════════════════════

// ─── 166. Statement (§8.2.1.4.14) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14
 * @xmiId ASTMCore.ASTMSyntax.Statement.Statement
 * @metaclass Statement (abstract)
 * @generalization GASTMSyntaxObject
 * @definition All statements
 * @note §8.2.1.4.14 prose: "The inner class Statement is a subclass of
 *   GASTMSyntaticObject, and has interior subclasses ExpressionStatement,
 *   JumpStatement, BreakStatement, ContinueStatement, LabeledStatement,
 *   BlockStatement, EmptyStatement, IfStatement, SwitchStatement,
 *   ReturnStatement, TryStatement, ThrowStatement, DeleteStatement,
 *   TerminateStatement and inner class LoopStatement further classified into
 *   interior subclasses WhileStatement, DoWhileStatement, and ForStatement."
 *   EMOF declares Statement with `isAbstract="true"`.
 * @ownedAttributes (none)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IStatement extends IGASTMSyntaxObject {
  // structural marker — concrete subclasses carry their own attribute members.
}

export abstract class Statement extends GASTMSyntaxObject implements IStatement {
  override readonly metaClass: string = "Statement";
}

// ─── 167. BlockStatement (§8.2.1.4.14.6) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.6
 * @xmiId ASTMCore.ASTMSyntax.Statement.BlockStatement
 * @metaclass BlockStatement (concrete)
 * @generalization Statement
 * @definition Statements consisting of a series of substatements
 * @note §8.2.1.4.14.6 prose: "The interior class BlockStatement is a subclass
 *   of Statement, and has unary association subStatements with the interior
 *   inner class Statement and unary semantic association opensScope with the
 *   semantic class BlockScope."
 * @ownedAttributes
 *   • subStatements : Statement  [0..*] -- §8.2.1.4.14.6: any number of subStatements associations.
 *   • opensScope    : BlockScope [1..1] -- §8.2.1.4.14.6: unary semantic association opensScope to BlockScope. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBlockStatement extends IStatement {
  readonly subStatements: ReadonlyArray<IStatement>;
  readonly opensScope: IBlockScope;
}

export class BlockStatement extends Statement implements IBlockStatement {
  override readonly metaClass: string = "BlockStatement";
  readonly subStatements: ReadonlyArray<IStatement>;
  readonly opensScope: IBlockScope;
  constructor(args: {
    locationInfo: ISourceLocation;
    opensScope: IBlockScope;
    subStatements?: ReadonlyArray<IStatement>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.subStatements = args.subStatements ?? [];
    this.opensScope = args.opensScope;
  }
}

// ─── 168. BreakStatement (§8.2.1.4.14.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.3
 * @xmiId ASTMCore.ASTMSyntax.Statement.BreakStatement
 * @metaclass BreakStatement (concrete)
 * @generalization Statement
 * @definition Statements that exit a loop or a switch
 * @note §8.2.1.4.14.3 prose: "The interior class BreakStatement is a subclass
 *   of Statement, and is a subclass of Statement, and has unary association
 *   target with the interior class IdentifierReference."  The PDF prose says
 *   IdentifierReference but EMOF authoritatively declares the type as
 *   `ASTMCore.ASTMSyntax.Expression.LabelAccess`.  The PDF's Property
 *   Specification reconciles to `target : LabelAccess?` — i.e. optional —
 *   and EMOF declares this attribute with NO explicit lower bound (defaults
 *   to 0).
 * @ownedAttributes
 *   • target : LabelAccess [0..1] -- §8.2.1.4.14.3: unary association target to LabelAccess.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IBreakStatement extends IStatement {
  readonly target?: ILabelAccess;
}

export class BreakStatement extends Statement implements IBreakStatement {
  override readonly metaClass: string = "BreakStatement";
  readonly target?: ILabelAccess;
  constructor(args: {
    locationInfo: ISourceLocation;
    target?: ILabelAccess;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.target = args.target;
  }
}

// ─── 169. ContinueStatement (§8.2.1.4.14.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.4
 * @xmiId ASTMCore.ASTMSyntax.Statement.ContinueStatement
 * @metaclass ContinueStatement (concrete)
 * @generalization Statement
 * @definition Statements that branch to the top of a loop
 * @note §8.2.1.4.14.4 prose: "The interior class ContinueStatement is a subclass
 *   of Statement, and has unary association target with the interior class
 *   IdentifierReference."  PDF prose names IdentifierReference but EMOF
 *   authoritatively declares the type as
 *   `ASTMCore.ASTMSyntax.Expression.LabelAccess`.  PDF Property Specification:
 *   `target : LabelAccess?` (optional).
 * @ownedAttributes
 *   • target : LabelAccess [0..1] -- §8.2.1.4.14.4: unary association target to LabelAccess.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IContinueStatement extends IStatement {
  readonly target?: ILabelAccess;
}

export class ContinueStatement extends Statement implements IContinueStatement {
  override readonly metaClass: string = "ContinueStatement";
  readonly target?: ILabelAccess;
  constructor(args: {
    locationInfo: ISourceLocation;
    target?: ILabelAccess;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.target = args.target;
  }
}

// ─── 170. DeclarationOrDefinitionStatement (§8.2.1.4.14) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14
 * @xmiId ASTMCore.ASTMSyntax.Statement.DeclarationOrDefinitionStatement
 * @metaclass DeclarationOrDefinitionStatement (concrete)
 * @generalization Statement
 * @definition Statements that introduce a declaration or definition
 * @note §8.2.1.4.14 prose enumerates DeclarationOrDefinitionStatement among the
 *   direct subclasses of Statement.  EMOF declares one owned attribute
 *   `declOrDefn` with lower="1" of type
 *   `ASTMCore.ASTMSyntax.DeclarationAndDefinition.DefintionObject`
 *   (preserving OMG's spelling "Defintion" -- missing 'i' -- per the PDF
 *   xmi:id convention).
 * @ownedAttributes
 *   • declOrDefn : DefintionObject [1..1] -- §8.2.1.4.14: unary association declOrDefn to DefintionObject. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDeclarationOrDefinitionStatement extends IStatement {
  readonly declOrDefn: IDefintionObject;
}

export class DeclarationOrDefinitionStatement extends Statement implements IDeclarationOrDefinitionStatement {
  override readonly metaClass: string = "DeclarationOrDefinitionStatement";
  readonly declOrDefn: IDefintionObject;
  constructor(args: {
    locationInfo: ISourceLocation;
    declOrDefn: IDefintionObject;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.declOrDefn = args.declOrDefn;
  }
}

// ─── 171. DeleteStatement (§8.2.1.4.14.14) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.14
 * @xmiId ASTMCore.ASTMSyntax.Statement.DeleteStatement
 * @metaclass DeleteStatement (concrete)
 * @generalization Statement
 * @definition Statements that deallocate storage
 * @note §8.2.1.4.14.14 prose: "DeleteStatement is a subclass of Statement, and
 *   has unary association operand to class Expression, and is used for
 *   depicting deallocation of storage."  EMOF lower="1" on operand.
 * @ownedAttributes
 *   • operand : Expression [1..1] -- §8.2.1.4.14.14: unary association operand to Expression. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDeleteStatement extends IStatement {
  readonly operand: IExpression;
}

export class DeleteStatement extends Statement implements IDeleteStatement {
  override readonly metaClass: string = "DeleteStatement";
  readonly operand: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    operand: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.operand = args.operand;
  }
}

// ─── 172. EmptyStatement (§8.2.1.4.14.7) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.7
 * @xmiId ASTMCore.ASTMSyntax.Statement.EmptyStatement
 * @metaclass EmptyStatement (concrete)
 * @generalization Statement
 * @definition Statement that does nothing
 * @note §8.2.1.4.14.7 prose: "The terminal class EmptyStatement is a subclass
 *   of Statement and has no associations, no properties, and no subclasses."
 * @ownedAttributes (none)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IEmptyStatement extends IStatement {
  // terminal — no further structural members.
}

export class EmptyStatement extends Statement implements IEmptyStatement {
  override readonly metaClass = "EmptyStatement" as const;
}

// ─── 173. ExpressionStatement (§8.2.1.4.14.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.1
 * @xmiId ASTMCore.ASTMSyntax.Statement.ExpressionStatement
 * @metaclass ExpressionStatement (concrete)
 * @generalization Statement
 * @definition Statements comprised of just an expression
 * @note §8.2.1.4.14.1 prose: "The class ExpressionStatement is a subclass of
 *   Statement, and has unary association expression with the interior inner
 *   class Expression."  EMOF lower="1" on expression.
 * @ownedAttributes
 *   • expression : Expression [1..1] -- §8.2.1.4.14.1: unary association expression to Expression. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IExpressionStatement extends IStatement {
  readonly expression: IExpression;
}

export class ExpressionStatement extends Statement implements IExpressionStatement {
  override readonly metaClass: string = "ExpressionStatement";
  readonly expression: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    expression: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.expression = args.expression;
  }
}

// ─── 174. IfStatement (§8.2.1.4.14.8) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.8
 * @xmiId ASTMCore.ASTMSyntax.Statement.IfStatement
 * @metaclass IfStatement (concrete)
 * @generalization Statement
 * @definition Statements that conditionally execute one of two substatements
 * @note §8.2.1.4.14.8 prose: "The interior class IfStatement is a subclass of
 *   Statement, and has unary association condition to the interior inner class
 *   Expression and the unary association thenBody to the interior inner class
 *   Statement and the unary association elseBody to the interior inner class
 *   Statement."  PDF Property Specification:
 *   `condition : Expression`, `thenBody : Statement`, `elseBody : Statement?`.
 *   EMOF lower="1" on condition and thenBody; elseBody optional.
 * @ownedAttributes
 *   • condition : Expression [1..1] -- §8.2.1.4.14.8: unary association condition to Expression. EMOF lower="1".
 *   • thenBody  : Statement  [1..1] -- §8.2.1.4.14.8: unary association thenBody to Statement. EMOF lower="1".
 *   • elseBody  : Statement  [0..1] -- §8.2.1.4.14.8: unary association elseBody to Statement.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IIfStatement extends IStatement {
  readonly condition: IExpression;
  readonly thenBody: IStatement;
  readonly elseBody?: IStatement;
}

export class IfStatement extends Statement implements IIfStatement {
  override readonly metaClass: string = "IfStatement";
  readonly condition: IExpression;
  readonly thenBody: IStatement;
  readonly elseBody?: IStatement;
  constructor(args: {
    locationInfo: ISourceLocation;
    condition: IExpression;
    thenBody: IStatement;
    elseBody?: IStatement;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.condition = args.condition;
    this.thenBody = args.thenBody;
    this.elseBody = args.elseBody;
  }
}

// ─── 175. JumpStatement (§8.2.1.4.14.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.2
 * @xmiId ASTMCore.ASTMSyntax.Statement.JumpStatement
 * @metaclass JumpStatement (concrete)
 * @generalization Statement
 * @definition Statements that branch to a label
 * @note §8.2.1.4.14.2 prose: "The interior class JumpStatement is a subclass of
 *   Statement, and has unary association target with the interior inner class
 *   Expression."  EMOF lower="1" on target; type is `Expression` (NOT
 *   LabelAccess, distinguishing JumpStatement from Break/ContinueStatement).
 * @ownedAttributes
 *   • target : Expression [1..1] -- §8.2.1.4.14.2: unary association target to Expression. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IJumpStatement extends IStatement {
  readonly target: IExpression;
}

export class JumpStatement extends Statement implements IJumpStatement {
  override readonly metaClass: string = "JumpStatement";
  readonly target: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    target: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.target = args.target;
  }
}

// ─── 176. LabeledStatement (§8.2.1.4.14.5) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.5
 * @xmiId ASTMCore.ASTMSyntax.Statement.LabeledStatement
 * @metaclass LabeledStatement (concrete)
 * @generalization Statement
 * @definition Statements that are associated with a label definition
 * @note §8.2.1.4.14.5 prose: "The interior class LabeledStatement is a subclass
 *   of Statement, and has unary association label with the interior class
 *   LabelDefinition."  PDF Property Specification:
 *   `label : LabelDefinition`, `statement : Statement?`.  EMOF lower="1" on
 *   label; statement optional.
 * @ownedAttributes
 *   • label     : LabelDefinition [1..1] -- §8.2.1.4.14.5: unary association label to LabelDefinition. EMOF lower="1".
 *   • statement : Statement       [0..1] -- §8.2.1.4.14.5: unary association statement to Statement.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ILabeledStatement extends IStatement {
  readonly label: ILabelDefinition;
  readonly statement?: IStatement;
}

export class LabeledStatement extends Statement implements ILabeledStatement {
  override readonly metaClass: string = "LabeledStatement";
  readonly label: ILabelDefinition;
  readonly statement?: IStatement;
  constructor(args: {
    locationInfo: ISourceLocation;
    label: ILabelDefinition;
    statement?: IStatement;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.label = args.label;
    this.statement = args.statement;
  }
}

// ─── 177. LoopStatement (§8.2.1.4.14.11) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.11
 * @xmiId ASTMCore.ASTMSyntax.Statement.LoopStatement
 * @metaclass LoopStatement (concrete)
 * @generalization Statement
 * @definition Statements with a substatement (body) that is potentially repeatedly executed
 * @note §8.2.1.4.14.11 prose: "The interior inner class LoopStatement is a
 *   subclass of Statement, and has unary association body to the interior
 *   inner class Statement and the unary association condition to the interior
 *   inner class Expression. The inner LoopStatement is further classified into
 *   interior subclasses WhileStatement, DoWhileStatement, and ForStatement."
 *   The PDF marks ForStatement as abstract (`! ForStatement`) but does NOT
 *   mark LoopStatement itself as abstract.  EMOF agrees: LoopStatement has no
 *   `isAbstract` attribute (defaults to false).  We honour the EMOF
 *   source-of-truth: LoopStatement is concrete.
 * @ownedAttributes
 *   • condition : Expression [1..1] -- §8.2.1.4.14.11: unary association condition to Expression. EMOF lower="1".
 *   • body      : Statement  [1..1] -- §8.2.1.4.14.11: unary association body to Statement. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ILoopStatement extends IStatement {
  readonly condition: IExpression;
  readonly body: IStatement;
}

export class LoopStatement extends Statement implements ILoopStatement {
  override readonly metaClass: string = "LoopStatement";
  readonly condition: IExpression;
  readonly body: IStatement;
  constructor(args: {
    locationInfo: ISourceLocation;
    condition: IExpression;
    body: IStatement;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.condition = args.condition;
    this.body = args.body;
  }
}

// ─── 178. ReturnStatement (§8.2.1.4.14.10) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.10
 * @xmiId ASTMCore.ASTMSyntax.Statement.ReturnStatement
 * @metaclass ReturnStatement (concrete)
 * @generalization Statement
 * @definition Statements that cause return from a function, possibly with a return value
 * @note §8.2.1.4.14.10 prose: "The interior class ReturnStatement is a subclass
 *   of Statement, and has unary association returnValue with the interior
 *   inner class Expression."  PDF Property Specification:
 *   `returnValue : Expression?` (optional).  EMOF declares no lower bound
 *   (defaults to 0).
 * @ownedAttributes
 *   • returnValue : Expression [0..1] -- §8.2.1.4.14.10: unary association returnValue to Expression.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IReturnStatement extends IStatement {
  readonly returnValue?: IExpression;
}

export class ReturnStatement extends Statement implements IReturnStatement {
  override readonly metaClass: string = "ReturnStatement";
  readonly returnValue?: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    returnValue?: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.returnValue = args.returnValue;
  }
}

// ─── 179. SwitchStatement (§8.2.1.4.14.9) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.9
 * @xmiId ASTMCore.ASTMSyntax.Statement.SwitchStatement
 * @metaclass SwitchStatement (concrete)
 * @generalization Statement
 * @definition Statements that conditionally execute one of many substatements
 * @note §8.2.1.4.14.9 prose: "The interior class SwitchStatement is a subclass
 *   of Statement, and has unary association cases to the interior class
 *   SwitchCase and the unary association switchExpression to the interior
 *   inner class Expression."  EMOF lower="1" on switchExpression;
 *   cases lower="1" upper="*" (i.e. one to many cases required).
 * @ownedAttributes
 *   • switchExpression : Expression [1..1] -- §8.2.1.4.14.9: unary association switchExpression to Expression. EMOF lower="1".
 *   • cases            : SwitchCase [1..*] -- §8.2.1.4.14.9: any number of cases associations to SwitchCase. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ISwitchStatement extends IStatement {
  readonly switchExpression: IExpression;
  readonly cases: ReadonlyArray<ISwitchCase>;
}

export class SwitchStatement extends Statement implements ISwitchStatement {
  override readonly metaClass: string = "SwitchStatement";
  readonly switchExpression: IExpression;
  readonly cases: ReadonlyArray<ISwitchCase>;
  constructor(args: {
    locationInfo: ISourceLocation;
    switchExpression: IExpression;
    cases: ReadonlyArray<ISwitchCase>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.switchExpression = args.switchExpression;
    this.cases = args.cases;
  }
}

// ─── 180. TerminateStatement (§8.2.1.4.14.15) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.15
 * @xmiId ASTMCore.ASTMSyntax.Statement.TerminateStatement
 * @metaclass TerminateStatement (concrete)
 * @generalization Statement
 * @definition Statement that terminates execution
 * @note §8.2.1.4.14.15 prose: "TerminateStatement has no immediate properties,
 *   associations, or subclasses it is used for depicting the termination of
 *   execution."  EMOF declares the class with no ownedAttribute.
 * @ownedAttributes (none)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ITerminateStatement extends IStatement {
  // terminal — no further structural members.
}

export class TerminateStatement extends Statement implements ITerminateStatement {
  override readonly metaClass = "TerminateStatement" as const;
}

// ─── 181. ThrowStatement (§8.2.1.4.14.13) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.13
 * @xmiId ASTMCore.ASTMSyntax.Statement.ThrowStatement
 * @metaclass ThrowStatement (concrete)
 * @generalization Statement
 * @definition Statements that cause an exception to be thrown
 * @note §8.2.1.4.14.13 prose: "The class ThrowStatement is a subclass of
 *   Statement, and has unary association exception to interior inner class
 *   Expression."  EMOF lower="1" on exception.
 * @ownedAttributes
 *   • exception : Expression [1..1] -- §8.2.1.4.14.13: unary association exception to Expression. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IThrowStatement extends IStatement {
  readonly exception: IExpression;
}

export class ThrowStatement extends Statement implements IThrowStatement {
  override readonly metaClass: string = "ThrowStatement";
  readonly exception: IExpression;
  constructor(args: {
    locationInfo: ISourceLocation;
    exception: IExpression;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.exception = args.exception;
  }
}

// ─── 182. TryStatement (§8.2.1.4.14.12) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.12
 * @xmiId ASTMCore.ASTMSyntax.Statement.TryStatement
 * @metaclass TryStatement (concrete)
 * @generalization Statement
 * @definition Exception-handling statements, consisting of a substatement that may throw exceptions and catch blocks to handle them
 * @note §8.2.1.4.14.12 prose: "The class TryStatement is a subclass of
 *   Statement, and has any number of association catchBlocks to to interior
 *   class CatchBlock, unary association of finalStatement to interior inner
 *   class Statement and unary association of guardedStatement to interior
 *   inner class Statement."  PDF Property Specification:
 *   `guardedStatement : Statement`, `catchBlocks : CatchBlock*`,
 *   `finalStatement : Statement?`.  EMOF lower="1" on guardedStatement;
 *   finalStatement and catchBlocks optional.
 * @ownedAttributes
 *   • guardedStatement : Statement   [1..1] -- §8.2.1.4.14.12: unary association guardedStatement to Statement. EMOF lower="1".
 *   • catchBlocks      : CatchBlock  [0..*] -- §8.2.1.4.14.12: any number of catchBlocks associations.
 *   • finalStatement   : Statement   [0..1] -- §8.2.1.4.14.12: unary association finalStatement to Statement.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ITryStatement extends IStatement {
  readonly guardedStatement: IStatement;
  readonly catchBlocks: ReadonlyArray<ICatchBlock>;
  readonly finalStatement?: IStatement;
}

export class TryStatement extends Statement implements ITryStatement {
  override readonly metaClass: string = "TryStatement";
  readonly guardedStatement: IStatement;
  readonly catchBlocks: ReadonlyArray<ICatchBlock>;
  readonly finalStatement?: IStatement;
  constructor(args: {
    locationInfo: ISourceLocation;
    guardedStatement: IStatement;
    catchBlocks?: ReadonlyArray<ICatchBlock>;
    finalStatement?: IStatement;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.guardedStatement = args.guardedStatement;
    this.catchBlocks = args.catchBlocks ?? [];
    this.finalStatement = args.finalStatement;
  }
}

// ─── 183. DoWhileStatement (§8.2.1.4.14.11.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.11.2
 * @xmiId ASTMCore.ASTMSyntax.Statement.DoWhileStatement
 * @metaclass DoWhileStatement (concrete)
 * @generalization LoopStatement
 * @definition Loop statement whose body is repeatedly executed while a specified condition, tested after each execution, is true
 * @note §8.2.1.4.14.11.2 prose: "The DoWhileStatement is a subclass of
 *   LoopStatement, and is the variation of the LoopStatement for which the
 *   Condition is tested after the Body is executed."  EMOF declares
 *   DoWhileStatement with no additional ownedAttribute (inherits condition
 *   and body from LoopStatement).
 * @ownedAttributes (none -- condition and body inherited from LoopStatement)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDoWhileStatement extends ILoopStatement {
  // terminal — no further structural members.
}

export class DoWhileStatement extends LoopStatement implements IDoWhileStatement {
  override readonly metaClass = "DoWhileStatement" as const;
}

// ─── 184. WhileStatement (§8.2.1.4.14.11.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.11.1
 * @xmiId ASTMCore.ASTMSyntax.Statement.WhileStatement
 * @metaclass WhileStatement (concrete)
 * @generalization LoopStatement
 * @definition Loop statement whose body is repeatedly executed while a specified condition, tested before each execution, is true
 * @note §8.2.1.4.14.11.1 prose: "The WhileStatement is a subclass of
 *   LoopStatement, and is the variation of the LoopStatement for which the
 *   Condition is tested before the Body is executed."  EMOF declares
 *   WhileStatement with no additional ownedAttribute (inherits condition and
 *   body from LoopStatement).
 * @ownedAttributes (none -- condition and body inherited from LoopStatement)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IWhileStatement extends ILoopStatement {
  // terminal — no further structural members.
}

export class WhileStatement extends LoopStatement implements IWhileStatement {
  override readonly metaClass = "WhileStatement" as const;
}

// ─── 185. ForStatement (§8.2.1.4.14.11.3) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.11.3
 * @xmiId ASTMCore.ASTMSyntax.Statement.ForStatement
 * @metaclass ForStatement (abstract)
 * @generalization LoopStatement
 * @definition Loop statement with initializing and incrementing parts
 * @note §8.2.1.4.14.11.3 prose: "The ForStatement is a subclass of
 *   LoopStatement, and is the variation of the LoopStatement for which the
 *   Condition is tested before the Body is executed and any number of
 *   associations of initBody to interior inner class Expression and any
 *   number of associations of iterationBody to interior inner class
 *   Expression."  The §8.2.1.4.14.11 hierarchy specification marks
 *   ForStatement with `!` (abstract), and EMOF declares
 *   `isAbstract="true"`.  The two concrete leaves are ForCheckBeforeStatement
 *   and ForCheckAfterStatement.
 * @ownedAttributes
 *   • initBody      : Expression [0..*] -- §8.2.1.4.14.11.3: any number of initBody associations to Expression.
 *   • iterationBody : Expression [0..*] -- §8.2.1.4.14.11.3: any number of iterationBody associations to Expression.
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IForStatement extends ILoopStatement {
  readonly initBody: ReadonlyArray<IExpression>;
  readonly iterationBody: ReadonlyArray<IExpression>;
}

export abstract class ForStatement extends LoopStatement implements IForStatement {
  override readonly metaClass: string = "ForStatement";
  readonly initBody: ReadonlyArray<IExpression>;
  readonly iterationBody: ReadonlyArray<IExpression>;
  constructor(args: {
    locationInfo: ISourceLocation;
    condition: IExpression;
    body: IStatement;
    initBody?: ReadonlyArray<IExpression>;
    iterationBody?: ReadonlyArray<IExpression>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      condition: args.condition,
      body: args.body,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.initBody = args.initBody ?? [];
    this.iterationBody = args.iterationBody ?? [];
  }
}

// ─── 186. ForCheckAfterStatement (§8.2.1.4.14.11.5) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.11.5
 * @xmiId ASTMCore.ASTMSyntax.Statement.ForCheckAfterStatement
 * @metaclass ForCheckAfterStatement (concrete)
 * @generalization ForStatement
 * @definition For statement with test after each iteration
 * @note §8.2.1.4.14.11.5 prose: "The ForCheckAfterStatement is a subclass of
 *   ForStatement, and is the variation of the LoopStatement for which the
 *   Condition is tested after the Body is executed."  EMOF declares the class
 *   with no additional ownedAttribute (inherits initBody, iterationBody from
 *   ForStatement; condition, body from LoopStatement).
 * @ownedAttributes (none -- inherited from ForStatement / LoopStatement)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IForCheckAfterStatement extends IForStatement {
  // terminal — no further structural members.
}

export class ForCheckAfterStatement extends ForStatement implements IForCheckAfterStatement {
  override readonly metaClass = "ForCheckAfterStatement" as const;
}

// ─── 187. ForCheckBeforeStatement (§8.2.1.4.14.11.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.4.14.11.4
 * @xmiId ASTMCore.ASTMSyntax.Statement.ForCheckBeforeStatement
 * @metaclass ForCheckBeforeStatement (concrete)
 * @generalization ForStatement
 * @definition For statement with test before each iteration
 * @note §8.2.1.4.14.11.4 prose: "The ForCheckBeforeStatement is a subclass of
 *   ForStatement, and is the variation of the LoopStatement for which the
 *   Condition is tested before the Body is executed."  EMOF declares the
 *   class with no additional ownedAttribute (inherits initBody, iterationBody
 *   from ForStatement; condition, body from LoopStatement).
 * @ownedAttributes (none -- inherited from ForStatement / LoopStatement)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IForCheckBeforeStatement extends IForStatement {
  // terminal — no further structural members.
}

export class ForCheckBeforeStatement extends ForStatement implements IForCheckBeforeStatement {
  override readonly metaClass = "ForCheckBeforeStatement" as const;
}

// ─── 188. SwitchCase (§8.2.1.5.4) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.4
 * @xmiId ASTMCore.ASTMSyntax.Statement.SwitchCase
 * @metaclass SwitchCase (concrete)
 * @generalization MinorSyntaxObject
 * @definition Parts of a switch statement that are conditionally executed
 * @note §8.2.1.5.4 prose: "The class SwitchCase is a subclass of
 *   OtherSytnaxObject, has a boolean attribute isEvaluateAllCases, has unary
 *   association body to interior inner class Statement, and subclasses
 *   CaseBlock and DefaultBlock."  EMOF locates SwitchCase under the Statement
 *   nested package with `superClass="ASTMCore.ASTMSyntax.MinorSyntaxObject"`;
 *   the PDF's "OtherSytnaxObject" wording corresponds to MinorSyntaxObject.
 *   body lower="1" upper="*" (at least one statement required).
 * @ownedAttributes
 *   • isEvaluateAllCases : Boolean   [0..1] -- §8.2.1.5.4: primitive boolean attribute (EMOF has no explicit lower bound).
 *   • body               : Statement [1..*] -- §8.2.1.5.4: any number of body associations to Statement. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ISwitchCase extends IMinorSyntaxObject {
  readonly isEvaluateAllCases?: boolean;
  readonly body: ReadonlyArray<IStatement>;
}

export class SwitchCase extends MinorSyntaxObject implements ISwitchCase {
  override readonly metaClass: string = "SwitchCase";
  readonly isEvaluateAllCases?: boolean;
  readonly body: ReadonlyArray<IStatement>;
  constructor(args: {
    locationInfo: ISourceLocation;
    body: ReadonlyArray<IStatement>;
    isEvaluateAllCases?: boolean;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.body = args.body;
    this.isEvaluateAllCases = args.isEvaluateAllCases;
  }
}

// ─── 189. CatchBlock (§8.2.1.5.7) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.7
 * @xmiId ASTMCore.ASTMSyntax.Statement.CatchBlock
 * @metaclass CatchBlock (concrete)
 * @generalization MinorSyntaxObject
 * @definition Parts of a try statement that specify a statement to execute under specified exception conditions
 * @note §8.2.1.5.7 prose: "The class CatchBlock is a subclass of
 *   OtherSyntaxObject, and has interior subclasses TypesCatchBlock and
 *   VariableCatchBlock. The CatchBlock has unary association Body to
 *   Statement."  EMOF locates CatchBlock under the Statement nested package
 *   with `superClass="ASTMCore.ASTMSyntax.MinorSyntaxObject"`.  body lower="1".
 * @ownedAttributes
 *   • body : Statement [1..1] -- §8.2.1.5.7: unary association body to Statement. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ICatchBlock extends IMinorSyntaxObject {
  readonly body: IStatement;
}

export class CatchBlock extends MinorSyntaxObject implements ICatchBlock {
  override readonly metaClass: string = "CatchBlock";
  readonly body: IStatement;
  constructor(args: {
    locationInfo: ISourceLocation;
    body: IStatement;
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

// ─── 190. CaseBlock (§8.2.1.5.5) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.5
 * @xmiId ASTMCore.ASTMSyntax.Statement.CaseBlock
 * @metaclass CaseBlock (concrete)
 * @generalization SwitchCase
 * @definition Switch cases that are executed when one of their values matches that of the enclosing switch statement
 * @note §8.2.1.5.5 prose: "The class CaseBlock is a subclass of
 *   OtherSytnaxObject, and has any number of associations of caseExpression
 *   to interior inner class Expression."  PDF Property Specification:
 *   `caseExpressions : Expression+` -- at least one.  EMOF declares
 *   `caseExpression` (singular in EMOF; PDF prose plural) with
 *   lower="1" upper="*".  We honour the EMOF spelling `caseExpression` per
 *   the xmi:id source of truth.
 * @ownedAttributes
 *   • caseExpression : Expression [1..*] -- §8.2.1.5.5: any number of caseExpression associations to Expression. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ICaseBlock extends ISwitchCase {
  readonly caseExpression: ReadonlyArray<IExpression>;
}

export class CaseBlock extends SwitchCase implements ICaseBlock {
  override readonly metaClass: string = "CaseBlock";
  readonly caseExpression: ReadonlyArray<IExpression>;
  constructor(args: {
    locationInfo: ISourceLocation;
    body: ReadonlyArray<IStatement>;
    caseExpression: ReadonlyArray<IExpression>;
    isEvaluateAllCases?: boolean;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      body: args.body,
      isEvaluateAllCases: args.isEvaluateAllCases,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.caseExpression = args.caseExpression;
  }
}

// ─── 191. DefaultBlock (§8.2.1.5.6) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.6
 * @xmiId ASTMCore.ASTMSyntax.Statement.DefaultBlock
 * @metaclass DefaultBlock (concrete)
 * @generalization SwitchCase
 * @definition Switch cases that are executed when no other switch case in the enclosing switch statement is executed
 * @note §8.2.1.5.6 prose: "The DefaultBlock is a subclass of OtherSytnaxObject,
 *   and depict the fall through CaseBlock."  EMOF declares the class with no
 *   additional ownedAttribute (inherits body and isEvaluateAllCases from
 *   SwitchCase).
 * @ownedAttributes (none -- inherited from SwitchCase)
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IDefaultBlock extends ISwitchCase {
  // terminal — no further structural members.
}

export class DefaultBlock extends SwitchCase implements IDefaultBlock {
  override readonly metaClass = "DefaultBlock" as const;
}

// ─── 192. TypesCatchBlock (§8.2.1.5.7.1) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.7.1
 * @xmiId ASTMCore.ASTMSyntax.Statement.TypesCatchBlock
 * @metaclass TypesCatchBlock (concrete)
 * @generalization CatchBlock
 * @definition Catch block that matches by one or more exception types
 * @note §8.2.1.5.7.1 prose: "The class TypesCatchBlock is a subclass of
 *   CatchBlock, and has any number association exceptions class Type."  PDF
 *   Property Specification: `exceptions : Type+` -- at least one required.
 *   EMOF lower="1" upper="*".  Definition line in PDF is empty; we synthesize
 *   a concise one-sentence definition consistent with the structural intent.
 * @ownedAttributes
 *   • exceptions : Type [1..*] -- §8.2.1.5.7.1: any number of exceptions associations to Type. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface ITypesCatchBlock extends ICatchBlock {
  readonly exceptions: ReadonlyArray<IType>;
}

export class TypesCatchBlock extends CatchBlock implements ITypesCatchBlock {
  override readonly metaClass: string = "TypesCatchBlock";
  readonly exceptions: ReadonlyArray<IType>;
  constructor(args: {
    locationInfo: ISourceLocation;
    body: IStatement;
    exceptions: ReadonlyArray<IType>;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      body: args.body,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.exceptions = args.exceptions;
  }
}

// ─── 193. VariableCatchBlock (§8.2.1.5.7.2) ───
/**
 * @standard OMG ASTM 1.0 -- formal/2011-01-05
 * @section §8.2.1.5.7.2
 * @xmiId ASTMCore.ASTMSyntax.Statement.VariableCatchBlock
 * @metaclass VariableCatchBlock (concrete)
 * @generalization CatchBlock
 * @definition Catch block that binds a caught exception to a named data definition variable
 * @note §8.2.1.5.7.2 prose (PDF heading reads "VariablesCatchBlock", with
 *   trailing 's', but xmi:id and EMOF declare `VariableCatchBlock`):
 *   "The class VariablesCatchBlock is a subclass of CatchBlockObject, and
 *   has a unary association exceptionVariable to the interior inner class
 *   DataDefinition."  Class authored under the EMOF spelling
 *   `VariableCatchBlock`.  exceptionVariable lower="1".  Definition line in
 *   PDF is empty; we synthesize a concise one-sentence definition consistent
 *   with the structural intent.
 * @ownedAttributes
 *   • exceptionVariable : DataDefinition [1..1] -- §8.2.1.5.7.2: unary association exceptionVariable to DataDefinition. EMOF lower="1".
 * @associationEnds
 *   (none) -- ASTM declares attribute-style ownership rather than separate Associations
 * @operations (none)
 * @constraints (none declared)
 */
export interface IVariableCatchBlock extends ICatchBlock {
  readonly exceptionVariable: IDataDefinition;
}

export class VariableCatchBlock extends CatchBlock implements IVariableCatchBlock {
  override readonly metaClass: string = "VariableCatchBlock";
  readonly exceptionVariable: IDataDefinition;
  constructor(args: {
    locationInfo: ISourceLocation;
    body: IStatement;
    exceptionVariable: IDataDefinition;
    annotations?: ReadonlyArray<IAnnotationExpression>;
    preProcessorElements?: ReadonlyArray<IPreprocessorElement>;
  }) {
    super({
      locationInfo: args.locationInfo,
      body: args.body,
      annotations: args.annotations,
      preProcessorElements: args.preProcessorElements,
    });
    this.exceptionVariable = args.exceptionVariable;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// END Implementer #5 (Wave 1.5). GASTM COMPLETE: 193/193 metaclasses.
// Next wave: RDB SASTM (Wave 2) starts at class 194.
// ═══════════════════════════════════════════════════════════════════════════
