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
