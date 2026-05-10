// ═══════════════════════════════════════════════════════════════════════════
// astm.ts
// OMG Abstract Syntax Tree Metamodel (ASTM) v1.0 (formal/2011-01-05)
//
// Scope: Pure ASTM 1.0 metaclasses covering the full ASTM specification —
// the conceptual entities defined by the OMG Architecture-Driven
// Modernization (ADM) Abstract Syntax Tree Metamodel:
//
//   • ASTM Core metamodel
//   • GASTM (Generic ASTM) — language-independent metaclasses
//   • SASTM specializations:
//       - SASTM for C
//       - SASTM for Ada
//       - SASTM for COBOL
//       - SASTM for Fortran
//       - SASTM for Java
//
// Metaclass count: TODO (filled by the implementer subagents during the
// implementation wave). Initial scaffold authors only the top-banner header;
// metaclass declarations are inserted in subsequent commits.
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
