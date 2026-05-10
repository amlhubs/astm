# @amlhubs/astm — ASTM 1.0 as a Typed Metamodel

## Identity

| Field | Value |
|---|---|
| Standard | Abstract Syntax Tree Metamodel (ASTM) 1.0 |
| OMG Formal Document | [formal/2011-01-05](https://www.omg.org/spec/ASTM/1.0/) |
| OMG Specification | [omg.org/spec/ASTM/1.0](https://www.omg.org/spec/ASTM/1.0/) |
| Authority | [Object Management Group](https://www.omg.org/) |
| npm Package | `@amlhubs/astm` |
| npm Version | `0.0.1` |
| Peer Dependencies | None — pure ASTM, zero downstream dependencies |
| License | UNLICENSED |

## Abstract

The Abstract Syntax Tree Metamodel is the OMG specification that complements KDM by providing fine-grained abstract-syntax representation of source code. ASTM is the AST sibling of KDM in the OMG Architecture-Driven Modernization (ADM) family — where KDM models *what a software system is at a coarse architectural level*, ASTM models *what every statement of source code looks like at the abstract-syntax-tree level*. GASTM (Generic ASTM) is the normative core: a language-independent metamodel that factors out the syntactic constructs common to imperative, object-oriented, declarative, functional, and rule-based languages. Annex A publishes a single **non-normative, illustrative** Specialised ASTM (SASTM) for **Relational-Database manipulation languages (RDB SASTM)** to demonstrate the canonical pattern by which any future SASTM specializes GASTM. ASTM 1.0 (formal/2011-01-05) is the consolidated OMG release; it consists of the GASTM core plus the RDB SASTM annex inside one PDF, with two machine-readable EMOF XMI files (`ASTM-EMOF.xml`, `RDB-EMOF.xml`).

ASTM 1.0 §1.5 explicitly states that procedural / declarative / functional / object-oriented / rule-based language SASTMs (e.g., SASTM-for-C, SASTM-for-Java) "will be added incrementally in the future by the supplementation of the ASTM with SASTMs". As of 2026, OMG has **not** issued any such supplement; the `@amlhubs/astm` package therefore covers only what the formal spec actually publishes: GASTM (normative) + RDB SASTM (illustrative).

The `@amlhubs/astm` npm package projects the ASTM 1.0 metamodel into TypeScript as extensible interfaces and base classes covering **249 metaclasses**: **193 GASTM classes** (the normative language-independent core) plus **56 `RDB*`-prefixed extension classes** that constitute the RDB SASTM annex. The metaclasses partition into 9 nested packages: `ASTMCore` (root: GASTMObject), `ASTMCore.ASTMSemantics` (Scope, Project, semantic objects), `ASTMCore.ASTMSource` (CompilationUnit, SourceFile, SourceLocation), and `ASTMCore.ASTMSyntax` with five sub-packages (`Directives`, `Types`, `DeclarationAndDefinition`, `Expression`, `Statement`). RDB SASTM extends GASTM in place — its 56 new classes (`RDBTableDefinition`, `RDBColumnReference`, `RDBSelectStatement`, …) reuse the same package paths without collision because every RDB-introduced class carries the `RDB` prefix. Every interface carries a JSDoc header citing the precise ASTM 1.0 §-section and the EMOF `xmi:id` that defines it, making each symbol an auditable projection of the specification rather than an internal invention.

## Business Value — Why Extending This Metamodel Pays Off

ASTM is the standard substrate for every tool that needs to reason at the abstract-syntax-tree level across multiple programming languages — refactoring engines, transpilers, code-clone detectors, static analyzers, security scanners, and modernization tools that lift, shift, or restructure source code at fine granularity. Tools that parse legacy C / Ada / COBOL / Fortran / Java codebases into a normalized ASTM representation amortize the up-front parser-engineering cost across every downstream output the same model can drive: refactor automation, security-vulnerability detection, dead-code elimination, code-style enforcement, syntax-aware diff and merge, language migration, and compilation-target retargeting. A vendor that builds a multi-language refactoring offering directly against ASTM rather than against a per-language proprietary AST representation collapses N-language × M-transformation engineering work into a single matrix entry, and any ASTM-formatted model an upstream parser produces flows into every downstream analyzer without conversion.

The second business lever is agentic-runtime leverage. Ageni's Probabilistic Reduction Engine consumes ASTM as the deterministic substrate over which large-language-model reasoning operates at the source-code level — when an agent answers "what does this function actually do?", "is this code change safe?", "where is sensitive data read?", or "can I rewrite this control-flow without changing semantics?", the AST it traverses lives natively as ASTM model instances. The TypeScript compiler evaluates whether the agent's proposed syntactic transformation is structurally valid against the ASTM metamodel at the same moment it evaluates the code itself, collapsing structural correctness and semantic correctness into a single `tsc` pass. Hallucinated metaclasses, misattributed associations, and ill-formed AST traversals are caught at compile time.

The third lever is compounding reuse across the OMG ADM stack. ASTM coordinates with KDM (`@amlhubs/kdm`) — ASTM captures the fine-grained AST whose coarse architectural projection lives in KDM — and with SMM (`@amlhubs/smm`) for measuring code-quality metrics directly on ASTM models, with SBVR (`@amlhubs/sbvr`) for extracting the business rules encoded in legacy source, and with the broader OMG ADM portal. Every downstream ageni venture that touches source-code analysis, language migration, refactoring automation, or fine-grained software-assurance auditing transitively consumes the same metaclasses surfaced here.

## Scope — What the Package Surfaces

ASTM 1.0 publishes **one normative core (GASTM)** and **one non-normative annex SASTM (RDB SASTM)** inside a single PDF. The 249 metaclasses live in 9 nested packages, partitioned as follows:

| Nested Package | GASTM (normative) | + RDB SASTM | Coverage |
|---|---:|---:|---|
| `ASTMCore` | 1 | 0 | `GASTMObject` — the abstract root of every ASTM metaclass. |
| `ASTMCore.ASTMSemantics` | 8 | 0 | `Scope`, `AggregateScope`, `BlockScope`, `FunctionScope`, `GlobalScope`, `ProgramScope`, `Project`, `GASTMSemanticObject`. |
| `ASTMCore.ASTMSource` | 5 | 0 | `CompilationUnit`, `SourceFile`, `SourceFileReference`, `SourceLocation`, `GASTMSourceObject`. |
| `ASTMCore.ASTMSyntax` | 2 | 0 | `GASTMSyntaxObject`, `MinorSyntaxObject`. |
| `ASTMCore.ASTMSyntax.Directives` | 5 | 0 | `Comment`, `Directive`, `IncludeUnit`, `MacroCall`, `PreprocessorElement`. |
| `ASTMCore.ASTMSyntax.Types` | 42 | +26 | Primitive types, aggregate types, array, class, enum, member objects, type qualifiers — plus 26 RDB column / cursor / database types. |
| `ASTMCore.ASTMSyntax.DeclarationAndDefinition` | 37 | +14 | Declarations and definitions of data, functions, types — plus 14 RDB table / column / cursor / view definitions. |
| `ASTMCore.ASTMSyntax.Expression` | 65 | +6 | Operators (arithmetic, logical, bitwise, relational), literals, references, calls, casts, assignments — plus 6 RDB host-variable / column reference expressions. |
| `ASTMCore.ASTMSyntax.Statement` | 28 | +10 | `IfStatement`, `LoopStatement`, `ReturnStatement`, exception handling — plus 10 RDB DML statements (SELECT, INSERT, UPDATE, DELETE, cursor statements). |
| **TOTAL** | **193** | **+56** | **249 metaclasses** |

Every concrete metaclass is surfaced as a co-located **interface + extensible base class** pair (e.g., `IGASTMObject` + `GASTMObject`, `IRDBSelectStatement` + `RDBSelectStatement`). Abstract metaclasses (those carrying `isAbstract="true"` in the EMOF XMI — e.g., `GASTMSemanticObject`, `Declaration`, `Statement`, `Type`, `Expression`) are projected as `abstract class` declarations following the spec's `isAbstract` flag verbatim. The full list and the JSDoc headers citing each §-section and `xmi:id` will live at [`astm.ts`](./astm.ts).

## Dependency Topology

`@amlhubs/astm` is a leaf metamodel in the `@amlhubs` stack. It depends on nothing and projects the OMG ASTM 1.0 specification with no transitive import surface — the ASTM specification itself is self-contained and defines its own Core infrastructure layer rather than reusing UML or MOF.

```
@amlhubs/astm  (this package — leaf, zero dependencies)
```

Downstream agentic-runtime packages may extend any ASTM interface or class through ordinary TypeScript inheritance. The `index.ts` namespace barrel re-exports every symbol so consumers may `import { IDeclaration, IStatement, IExpression } from '@amlhubs/astm'` without addressing internal file structure.

## Installation & Usage

```bash
npm install @amlhubs/astm
```

```typescript
import type {
  IGASTMObject,
  ICompilationUnit,
  IScope,
  IDeclaration,
  IStatement,
  IExpression,
  IType,
  IRDBSelectStatement,
} from '@amlhubs/astm';

// Declare an ASTM AST slice as a typed metamodel instance.
declare const myProject: IGASTMObject;
declare const myUnit: ICompilationUnit;
declare const myStatement: IStatement;
declare const mySql: IRDBSelectStatement;
```

The source artifact is [`astm.ts`](./astm.ts). Every interface JSDoc header declares `@standard OMG ASTM 1.0 -- formal/2011-01-05` plus a `@section §x.y` PDF reference AND a `@xmiId ASTMCore.…` reference to the typed EMOF XMI.

## Provenance & Formal References

- [OMG ASTM 1.0 specification](https://www.omg.org/spec/ASTM/1.0/) — formal/2011-01-05
- [Machine-readable EMOF XMI archive](https://www.omg.org/cgi-bin/doc?ptc/09-09-06.zip) — ptc/2009-09-06 (contains `ASTM-EMOF.xml` + `RDB-EMOF.xml`)
- [XSD schemas archive](https://www.omg.org/cgi-bin/doc?ptc/09-07-08.zip) — ptc/2009-07-08 (9 GASTM + 9 RDB XSDs)
- [OMG ADM portal](https://www.omg.org/adm/) — Architecture-Driven Modernization initiative
- [Object Management Group home](https://www.omg.org/)
- Local mirror: `spec/` (PDF + extracted text + EMOF XMI + XSDs; SHA-256 manifest in `spec/sources.md`)

ASTM 1.0 was **not** transposed into an ISO standard (unlike KDM 1.4 / ISO/IEC 19506:2012). The OMG-published `formal/2011-01-05` is the sole authoritative artifact.

## Version History

| Version | Date | Change Summary |
|---|---|---|
| 0.0.1 | initial publish | Full ASTM 1.0 metamodel — 193 GASTM classes + 56 RDB SASTM classes = 249 metaclasses across 9 nested packages |

## License

UNLICENSED — restricted npm access under `@amlhubs` scope at [npm.pkg.github.com](https://npm.pkg.github.com).
