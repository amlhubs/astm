# ASTM 1.0 — Authoritative Spec Artifacts

This directory contains every authoritative artifact for **OMG Architecture-Driven Modernization: Abstract Syntax Tree Metamodel (ASTM) 1.0**, OMG document number **formal/2011-01-05**, issued January 2011 by the OMG Architecture-Driven Modernization Task Force (ADMTF). The specification was authored by EDS, IBM, Tata Consultancy Services Ltd., and The Software Revolution, Inc.

The PDF carries the normative definitional prose. The two ZIP archives ship the EMOF-compliant XMI files (`ASTM-EMOF.xml`, `RDB-EMOF.xml`) and the per-package XSDs — the machine-consumable serialisations of the typed metamodel.

## Volume coverage

ASTM 1.0 publishes **one normative core** (GASTM) and **one non-normative annex SASTM** (RDB SASTM) inside a single PDF:

- **GASTM** (Generic ASTM) — the core metamodel that covers programming-language-independent abstractions (declarations, expressions, statements, types, directives, source positions, semantics).
- **RDB SASTM** (Annex A — *non-normative*, illustrative) — a Specialised ASTM extension for relational-database manipulation languages (e.g., SQL). Annex A states explicitly that this SASTM is "provided solely to illustrate how the GASTM is to be extended by SASTMs".

There are **no separate C / Ada / COBOL / Fortran / Java SASTM annexes** in v1.0. The spec text §1.5 notes that SASTMs for "procedural, declarative, functional, object-oriented, and rule-based languages will be added incrementally in the future by the supplementation of the ASTM with SASTMs". Those future supplements have not been issued by OMG as of 2026.

The PDF's compliance section (§2) defines four compliance points: **Syntactic GASTM**, **Semantic GASTM**, **Syntactic SASTM**, and **Semantic SASTM** — a Level-0 (syntactic) and Level-1 (semantic) compliance gate across the GASTM/SASTM dimensions.

---

## Inventory — Downloaded Artifacts (normative)

| File | OMG Doc # | Source URL | Bytes | Format | Coverage | Description |
|---|---|---|---|---|---|---|
| `formal-11-01-05.pdf` | formal/2011-01-05 | https://www.omg.org/cgi-bin/doc?formal/11-01-05.pdf | 9,395,521 | PDF | Core + GASTM + RDB SASTM (Annex A) | ASTM 1.0 normative specification, January 2011. Single PDF (134 pages of prose + annexes). 6,418 lines after `pdftotext` extraction. |
| `formal-11-01-05.txt` | — | (extracted) | 295,769 | text | — | Searchable text extract of the spec PDF, produced by `pdftotext -layout`. Implementer subagents grep this for definitional prose. |
| `ptc-09-09-06.zip` | ptc/2009-09-06 | https://www.omg.org/cgi-bin/doc?ptc/09-09-06.zip | 11,837 | ZIP | GASTM + RDB SASTM | **MOST IMPORTANT machine-readable artifact.** Archive containing the two EMOF-compliant XMI files (`ASTM-EMOF.xml`, `RDB-EMOF.xml`). |
| `ASTM-EMOF.xml` | ptc/2009-09-06 | (extracted from zip) | 69,387 | XMI 2.0 / EMOF | GASTM | Typed EMOF metamodel for **GASTM**. Root: `<emof:Package name="ASTMCore">` with four nested packages (`ASTMSemantics`, `ASTMSource`, `ASTMSyntax`, plus the root `GASTMObject` class). **193 `emof:Class` declarations.** This is the source of truth implementer subagents read first for the GASTM metaclasses. |
| `RDB-EMOF.xml` | ptc/2009-09-06 | (extracted from zip) | 89,007 | XMI 2.0 / EMOF | RDB SASTM | Typed EMOF metamodel for **RDB SASTM** (Annex A). Same root structure (`ASTMCore`) extended with RDB-specific classes. **249 `emof:Class` declarations.** Read second by implementers, after GASTM. |
| `ptc-09-07-08.zip` | ptc/2009-07-08 | https://www.omg.org/cgi-bin/doc?ptc/09-07-08.zip | 21,583 | ZIP | GASTM + RDB SASTM | Archive containing the two inner XSD zips (`ASTM-XSD.zip`, `RDB-XSD.zip`). All 18 individual XSDs are extracted to this directory alongside the outer zip. |

## Inventory — XML Schemas (XSDs, normative for instance interchange)

The eighteen XSDs split into nine **GASTM** schemas (extracted from `ASTM-XSD.zip`) and nine **RDB SASTM** schemas (extracted from `RDB-XSD.zip`). The OMG file casing is preserved verbatim — note that two RDB schemas ship with the uppercase `.XSD` extension (`RDBDeclAndDef.XSD`, `RDBStatement.XSD`).

### GASTM schemas (from `ASTM-XSD.zip`)

| File | Bytes | Package |
|---|---|---|
| `ASTMCore-EmofXMI.xsd` | 668 | Root EMOF wrapper |
| `ASTMCore.ASTMSemanticsXMI.xsd` | 3,567 | `ASTMSemantics` package |
| `ASTMCore.ASTMSourceXMI.xsd` | 3,352 | `ASTMSource` package |
| `ASTMCore.ASTMSyntaxXMI.xsd` | 1,757 | `ASTMSyntax` package (root) |
| `ASTMCore.ASTMSyntax.DeclarationAndDefinitionXMI.xsd` | 18,477 | `ASTMSyntax` ▸ declarations & definitions |
| `ASTMCore.ASTMSyntax.DirectivesXMI.xsd` | 2,409 | `ASTMSyntax` ▸ preprocessor directives |
| `ASTMCore.ASTMSyntax.ExpressionXMI.xsd` | 22,765 | `ASTMSyntax` ▸ expressions |
| `ASTMCore.ASTMSyntax.StatementXMI.xsd` | 13,831 | `ASTMSyntax` ▸ statements |
| `ASTMCore.ASTMSyntax.TypesXMI.xsd` | 14,939 | `ASTMSyntax` ▸ types |

### RDB SASTM schemas (from `RDB-XSD.zip`)

| File | Bytes | Package |
|---|---|---|
| `RDBCore.xsd` | 559 | RDB root |
| `RDBSemantics.xsd` | 3,061 | RDB semantics extension |
| `RDBSource.xsd` | 2,717 | RDB source extension |
| `RDBSyntax.xsd` | 1,582 | RDB syntax root |
| `RDBDeclAndDef.XSD` | 20,295 | RDB declarations & definitions |
| `RDBDirectives.xsd` | 2,056 | RDB directives |
| `RDBExpression.xsd` | 21,061 | RDB expressions |
| `RDBStatement.XSD` | 15,093 | RDB statements |
| `RDBType.xsd` | 17,343 | RDB types |

## Inventory — Informative / Predecessor

| File | OMG Doc # | Source URL | Bytes | Format | Coverage | Description |
|---|---|---|---|---|---|---|
| `ptc-08-11-05.pdf` | ptc/2008-11-05 | https://www.omg.org/cgi-bin/doc?ptc/08-11-05.pdf | 5,924,587 | PDF | Beta 1 (Core + GASTM + draft RDB SASTM) | **ASTM 1.0 Beta 1 PDF** (November 2008). Superseded by `formal-11-01-05.pdf`. Useful only for historical context — many academic and tooling references still cite the Beta 1 ID. 5,789 lines after extraction. |
| `ptc-08-11-05.txt` | — | (extracted) | 293,555 | text | — | Searchable text extract of the Beta 1 PDF. |
| `admtf-08-05-02.zip` | admtf/2008-05-02 | https://www.omg.org/cgi-bin/doc?admtf/08-05-02.zip | 10,070 | ZIP | Beta XSDs | **Beta 1 XSD archive** (May 2008). Ten draft XSDs (`ASTMCoreXMI.xsd`, `ASTMSemanticsXMI.xsd`, `ASTMSourceXMI.xsd`, `ASTMSyntaxXMI.xsd`, `DeclarationAndDefinitionXMI.xsd`, `DirectivesXMI.xsd`, `ExpressionXMI.xsd`, `StatementXMI.xsd`, `TypesXMI.xsd`, `XMI.xsd`) — superseded by `ptc-09-07-08.zip` and **not** unpacked into this directory to avoid mixing with the normative v1.0 XSDs. Implementer subagents do not consume these; the zip is retained only for provenance completeness. |

---

## Missing / Not Available

| Artifact | Reason |
|---|---|
| Standalone Ecore (`astm.ecore`) | The ASTM 1.0 spec page does not ship an Ecore/EMF projection. Unlike KDM 1.4 (which OMG publishes as `kdm.cmof` + `kdm.ecore`), OMG ASTM 1.0 ships only EMOF XMI. The two `*-EMOF.xml` files are the typed metamodel; no Ecore exists on omg.org for ASTM. |
| Standalone CMOF (`astm.cmof`) | Same as above. ASTM predates the KDM-era convention of shipping both an EMOF XMI and a CMOF. The XMI files in `ptc/09-09-06` use the EMOF 2.0 namespace (`http://schema.omg.org/spec/mof/2.0/emof.xmi`) — they are the source of truth. |
| MagicDraw `*.mdxml` | Not published by OMG for ASTM 1.0. KDM 1.4 included a MagicDraw `mdxml`; ASTM does not. |
| Errata / corrigenda (`formal/2011-01-06`+) | Probed adjacent OMG document IDs (`formal/2011-01-01`..`formal/2011-01-07`); none are ASTM. `formal/2011-01-01` and `formal/2011-01-02` are MOF QVT 1.1 (with and without changebars); `formal/2011-01-03` and `formal/2011-01-04` are BPMN 2.0 (with and without changebars); `formal/2011-01-06`+ return HTTP 500 (no document published). **No ASTM 1.0 corrigendum was issued.** |
| Future SASTMs (C, Ada, COBOL, Fortran, Java) | ASTM 1.0 §1.5 states procedural/declarative/functional/object-oriented/rule-based SASTMs "will be added incrementally in the future". No follow-on SASTM specification has been issued by OMG (verified against https://www.omg.org/spec/ — only ASTM 1.0 appears). |
| ISO equivalent | Unlike KDM (which is also ISO/IEC 19506:2012), ASTM 1.0 was **not** transposed into an ISO standard. The OMG-published `formal-11-01-05.pdf` is the sole authoritative artifact. |

---

## Reading map — which artifact for which job

| Implementer wave | Primary read | Secondary cross-references |
|---|---|---|
| **Wave 1 — GASTM root & ASTMCore foundation** (`GASTMObject`, `GASTMSourceObject`, `GASTMSemanticObject`, `GASTMSyntaxObject`) | `ASTM-EMOF.xml` root `<emof:Package name="ASTMCore">`; `formal-11-01-05.txt` §7.7–§7.11 (GASTM Core Concepts pages 44–47) | `ASTMCore-EmofXMI.xsd`, `ASTMCore.ASTMSyntaxXMI.xsd` for instance-document shape |
| **Wave 2 — GASTM Source & Semantics** (Scope, Aggregate, the runtime/static semantic objects) | `ASTM-EMOF.xml` `<nestedPackage name="ASTMSource">` and `<nestedPackage name="ASTMSemantics">`; `formal-11-01-05.txt` §8 (Low-Level GASTM Class Hierarchy, pages 78–112) | `ASTMCore.ASTMSourceXMI.xsd`, `ASTMCore.ASTMSemanticsXMI.xsd` |
| **Wave 3 — GASTM Syntax** (Declarations, Definitions, Directives, Expressions, Statements, Types) | `ASTM-EMOF.xml` `<nestedPackage name="ASTMSyntax">` with sub-packages; `formal-11-01-05.txt` §8.2 | `ASTMCore.ASTMSyntax.DeclarationAndDefinitionXMI.xsd`, `ASTMCore.ASTMSyntax.DirectivesXMI.xsd`, `ASTMCore.ASTMSyntax.ExpressionXMI.xsd`, `ASTMCore.ASTMSyntax.StatementXMI.xsd`, `ASTMCore.ASTMSyntax.TypesXMI.xsd` |
| **Wave 4 — RDB SASTM (Annex A, non-normative)** | `RDB-EMOF.xml`; `formal-11-01-05.txt` §8.3.1 (SASTM Extension for RDBMS Languages, page 113) and Annex A (page 115) | All `RDB*.xsd` / `RDB*.XSD` files |
| **Wave 5 — Compliance & XMI serialization** | `formal-11-01-05.txt` §2 (compliance points), Annex B (glossary, page 125), Annex C (ASTM Core Concept Bibliography, page 133) | All XSDs (instance-document validation) |

---

## Verification summary

- **Formal PDF magic byte**: `%PDF-1.4` — verified.
- **ASTM-EMOF.xml**: parses as well-formed XML; root tag `{http://schema.omg.org/spec/mof/2.0/emof.xmi}Package`; 4 top-level nested packages; **193** `xmi:type="emof:Class"` declarations.
- **RDB-EMOF.xml**: parses as well-formed XML; same root structure; **249** `xmi:type="emof:Class"` declarations.
- **Outer ZIP archives** (`ptc-09-07-08.zip`, `ptc-09-09-06.zip`, `admtf-08-05-02.zip`): all extract without error, contents match the inventory above.
- **PDF text extracts**: `pdftotext -layout` produced clean UTF-8 text for both PDFs (6,418 / 5,789 lines). Section markers `7.7`, `7.10`, `8.2`, `Annex A` confirmed grep-discoverable.
- **OMG citation of associated files** (from PDF page 1): `ptc/2009-09-06 -- http://www.omg.org/spec/ASTM/20090901` and `ptc/2009-07-08 -- http://www.omg.org/spec/ASTM/20090701` — match the two ZIPs downloaded.

---

## SHA-256 manifest

| File | Bytes | SHA-256 |
|---|---:|---|
| `formal-11-01-05.pdf` | 9,395,521 | `2640060a8fa68558da1e76e762384c07da424587060c7d3e304fdf2768a85a11` |
| `formal-11-01-05.txt` | 295,769 | `84f8eb7e9b3ca0c7182e247dc70a5985414eae8f278f9667e636a3ca794fe856` |
| `ptc-09-09-06.zip` | 11,837 | `7d73bcea9756794d5fc331aac8a4c11dc72a6434cfed13143f153e9b91bceba9` |
| `ASTM-EMOF.xml` | 69,387 | `0dacb933489a54eb12d937c23473fcef2af9c99c67f90887ccb126f20446d1d7` |
| `RDB-EMOF.xml` | 89,007 | `50e80468b9795e093b7090378efbdd3ac5132f50fd887cdd613d3f9f6cc6dc54` |
| `ptc-09-07-08.zip` | 21,583 | `1e43a289628189250fb174c03a0f32c8e742ec82dd737326a5ab6d46358973f7` |
| `ASTMCore-EmofXMI.xsd` | 668 | `3ee67dd218b3ae6d9b2212c1b27453780b3a44b0916530227c77ad4a6bfab77d` |
| `ASTMCore.ASTMSemanticsXMI.xsd` | 3,567 | `9de6006d513a8acd18944ba1d0aaa89330c4217360a261787c01210e2adc60ab` |
| `ASTMCore.ASTMSourceXMI.xsd` | 3,352 | `ba9c8e86c181ef9bc54bde4120461456192929c465a72cded0297ed8b16efb3b` |
| `ASTMCore.ASTMSyntaxXMI.xsd` | 1,757 | `df0f03a87c6436aabac0afaa99347d0a1c480126b6e2f6f1d41671c312191ba5` |
| `ASTMCore.ASTMSyntax.DeclarationAndDefinitionXMI.xsd` | 18,477 | `22c93a2cdcf50b097c81ebd51893d03b61fc376e717175daf1eab3e5ab9bc137` |
| `ASTMCore.ASTMSyntax.DirectivesXMI.xsd` | 2,409 | `c6a16c18c553ab26a9a5581b6622f1aa94a112775cb19754f6e20ea577b198d5` |
| `ASTMCore.ASTMSyntax.ExpressionXMI.xsd` | 22,765 | `ebb627ff32913949bc1308bdd82edb607384a5e6c6f006188ff6994c8a5eaf43` |
| `ASTMCore.ASTMSyntax.StatementXMI.xsd` | 13,831 | `c00e7ea6028c50a04ec590b018662362263c9a8538d16778cbe1702793567fd7` |
| `ASTMCore.ASTMSyntax.TypesXMI.xsd` | 14,939 | `06db1b984db9edec9f5359502a0a5e1868ad196a0bcfba62edf81ec709c281a1` |
| `RDBCore.xsd` | 559 | `2c3e233fda90b9dba4d643c5e0bcc90e67dce72a2008c1038c30ccc235118942` |
| `RDBSemantics.xsd` | 3,061 | `c6e8a5f1c511267f96339c570442874ba5bdd033454920a1c130219e2194bdbd` |
| `RDBSource.xsd` | 2,717 | `e7dd4f2be9b67df990865810c0629bf7cee14d5d2ff37fbd09fbd14e5d482407` |
| `RDBSyntax.xsd` | 1,582 | `c91037db897e939ae1c08da3e0bd19c34893591771f73711d0f940ace3aac10e` |
| `RDBDeclAndDef.XSD` | 20,295 | `ca2fa407f9344985ff651b2345d1c77b1ec6161a79eb072a186ee7768c3f8782` |
| `RDBDirectives.xsd` | 2,056 | `ba0dffab0914ca7de334d8bce6a1849073c2e888129fb96d30cf117f6a64e618` |
| `RDBExpression.xsd` | 21,061 | `32c87a1b9eb5565e0f0c95e9b0187098aba30e36042a86646d90c54d29a12a42` |
| `RDBStatement.XSD` | 15,093 | `9ba424ac46eb0a112e4f68aaf1802ac57a259f1d31d574a5daaa54b820eace4b` |
| `RDBType.xsd` | 17,343 | `359f3078b8e6e5ce8f7cd2f5066b5facc9ed3643a2feff0509ec00533992b830` |
| `ptc-08-11-05.pdf` | 5,924,587 | `593b44eb7b8055926501c5d9d91649ebb1d8aff16be425d7882105d21398a86c` |
| `ptc-08-11-05.txt` | 293,555 | `5559712b06662def1f8ae0b90523c8ad5f6ebb4bd03732eee7286f999977162e` |
| `admtf-08-05-02.zip` | 10,070 | `9edd3bf958d84d73ec0512b224b1fd2c65c18ad2e5134d9ec94c67f4144b9900` |
