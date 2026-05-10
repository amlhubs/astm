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

The Abstract Syntax Tree Metamodel is the OMG specification that complements KDM by providing fine-grained, language-specific abstract-syntax representation of source code. ASTM is the AST sibling of KDM in the OMG Architecture-Driven Modernization (ADM) family — where KDM models *what a software system is at a coarse architectural level*, ASTM models *what every statement of source code looks like at the abstract-syntax-tree level*. GASTM (Generic ASTM) provides the language-independent core, factoring out the syntactic constructs common to every imperative and object-oriented programming language; SASTM specializations for C, Ada, COBOL, Fortran, and Java refine GASTM for each target language, capturing the syntactic features that are specific to each. ASTM 1.0 (formal/2011-01-05) is the consolidated OMG release that publishes the Core, GASTM, and the five SASTM annexes as a single, cohesive specification.

The `@amlhubs/astm` npm package projects the ASTM 1.0 metamodel into TypeScript as extensible interfaces and base classes covering the 7 ASTM packages: the **Core metamodel** supplying the universal AST-node machinery; the **GASTM (Generic) metamodel** representing the language-independent syntactic constructs (declarations, definitions, types, statements, expressions, control-flow, and data-flow elements); and the five **SASTM specializations** for C, Ada, COBOL, Fortran, and Java that refine GASTM with the syntactic features specific to each programming language. Every interface carries a JSDoc header citing the precise ASTM 1.0 §-section that defines it, making each symbol an auditable projection of the specification rather than an internal invention.

## Business Value — Why Extending This Metamodel Pays Off

ASTM is the standard substrate for every tool that needs to reason at the abstract-syntax-tree level across multiple programming languages — refactoring engines, transpilers, code-clone detectors, static analyzers, security scanners, and modernization tools that lift, shift, or restructure source code at fine granularity. Tools that parse legacy C / Ada / COBOL / Fortran / Java codebases into a normalized ASTM representation amortize the up-front parser-engineering cost across every downstream output the same model can drive: refactor automation, security-vulnerability detection, dead-code elimination, code-style enforcement, syntax-aware diff and merge, language migration, and compilation-target retargeting. A vendor that builds a multi-language refactoring offering directly against ASTM rather than against a per-language proprietary AST representation collapses N-language × M-transformation engineering work into a single matrix entry, and any ASTM-formatted model an upstream parser produces flows into every downstream analyzer without conversion.

The second business lever is agentic-runtime leverage. Ageni's Probabilistic Reduction Engine consumes ASTM as the deterministic substrate over which large-language-model reasoning operates at the source-code level — when an agent answers "what does this function actually do?", "is this code change safe?", "where is sensitive data read?", or "can I rewrite this control-flow without changing semantics?", the AST it traverses lives natively as ASTM model instances. The TypeScript compiler evaluates whether the agent's proposed syntactic transformation is structurally valid against the ASTM metamodel at the same moment it evaluates the code itself, collapsing structural correctness and semantic correctness into a single `tsc` pass. Hallucinated metaclasses, misattributed associations, and ill-formed AST traversals are caught at compile time.

The third lever is compounding reuse across the OMG ADM stack. ASTM coordinates with KDM (`@amlhubs/kdm`) — ASTM captures the fine-grained AST whose coarse architectural projection lives in KDM — and with SMM (`@amlhubs/smm`) for measuring code-quality metrics directly on ASTM models, with SBVR (`@amlhubs/sbvr`) for extracting the business rules encoded in legacy source, and with the broader OMG ADM portal. Every downstream ageni venture that touches source-code analysis, language migration, refactoring automation, or fine-grained software-assurance auditing transitively consumes the same metaclasses surfaced here.

## Scope — What the Package Surfaces

ASTM 1.0 partitions the metamodel into 7 packages: the Core, the language-independent GASTM, and the five SASTM language-specific specializations. The complete enumeration lives in `astm.ts`; the table below summarizes each package and cites the authoritative §-section. Metaclass counts will be filled in by the implementer waves.

| ASTM Package | §Section | Metaclasses Surfaced |
|---|---|---|
| ASTM Core | §6 | ASTMSyntaxElement, AggregateScope, SyntaxRelation, the universal AST-node spine |
| GASTM (Generic ASTM) | §7 | Declaration, Definition, Type, Statement, Expression, ControlFlow, DataFlow, NameReference, Annotation |
| SASTM for C | §8 | C-specific declarations (struct, union, enum), preprocessor directives, pointer types, storage classes |
| SASTM for Ada | §9 | Ada-specific package and tasking constructs, generic units, protected types, exception handlers |
| SASTM for COBOL | §10 | COBOL DIVISION/SECTION/PARAGRAPH structure, PIC clauses, REDEFINES, level-numbered records |
| SASTM for Fortran | §11 | Fortran module and subroutine constructs, array constructors, common blocks, format specifications |
| SASTM for Java | §12 | Java package and class constructs, annotations, generics, lambda expressions, inner classes |

Every interface is accompanied by an extensible base class with the same name minus the `I` prefix (e.g., `Declaration`, `Statement`, `Expression`). The full list and the JSDoc headers citing each §-section will live at [`astm.ts`](./astm.ts) once the implementer waves complete.

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
  IDeclaration,
  IStatement,
  IExpression,
  IType,
  IControlFlow,
  INameReference,
} from '@amlhubs/astm';

// Declare an ASTM AST slice as a typed metamodel instance.
declare const myDeclaration: IDeclaration;
declare const myStatement: IStatement;
declare const myExpression: IExpression;
```

The source artifact is [`astm.ts`](./astm.ts). Every interface JSDoc header declares `@standard OMG ASTM 1.0 -- formal/2011-01-05` and a `@section §x.y` reference.

## Provenance & Formal References

- [OMG ASTM 1.0 specification](https://www.omg.org/spec/ASTM/1.0/) — formal/2011-01-05
- Machine-readable XMI (TBD — populated in Phase 2 of the scaffold pipeline)
- [OMG ADM portal](https://www.omg.org/adm/) — Architecture-Driven Modernization initiative
- [Object Management Group home](https://www.omg.org/)
- Local mirror: `spec/` (text extracts used for §-section citations)

## Version History

| Version | Date | Change Summary |
|---|---|---|
| 0.0.1 | initial publish | Full ASTM 1.0 metamodel — Core, GASTM, SASTM for C, Ada, COBOL, Fortran, Java (7 packages) |

## License

UNLICENSED — restricted npm access under `@amlhubs` scope at [npm.pkg.github.com](https://npm.pkg.github.com).
