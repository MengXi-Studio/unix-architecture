# AI-Assisted Development

This template distills "how an AI assistant should work within this architecture" into executable rules and skills, stored in the `.trae/` directory and evolving alongside the code.

## Composition

| Item | Path | Responsibility |
| --- | --- | --- |
| Architecture development rules | `.trae/rules/architecture.md` | The **machine-enforced constraint layer** of the architecture: layered call chain and prohibitions, plugin inventory (single source of truth for import paths), standard implementation order, type organization criteria, UTS red lines, unique assembly points, verification DoD |
| AI behavior protocol | `.trae/rules/core-protocol.md` | Critical execution, work modes (interactive / unattended / plan-first), DoD checklist, lessons-learned records |
| Document-driven workflow | `.trae/rules/workflow.md` | Mandatory feature implementation flow: create task document → wait for and read answers → implement and verify → backfill implementation records, all persisted to disk across sessions |
| General convention distillation | `.trae/rules/project_rules.md` | Excerpts of uni-app x / UTS / uvue / ucss general constraints |
| New feature skill | `.trae/skills/arch-feature/SKILL.md` | Six-step implementation: requirement confirmation → DTO → api → store → pages/components → assembly point check → verification loop |
| Task document archive | `.trae/documents/` | Two-level archive by "requirement type / date"; `implementation-log.md` is the project-wide task index |
| MCP config | `.trae/mcp.json` | uni-app-x MCP server for querying plugin and API platform compatibility |

## Design Principles

- **Principle layer and enforcement layer separated**: the repository homepage architecture document explains "why it is designed this way", while `.trae/rules/architecture.md` specifies "how the AI must write" — the two share the same origin and evolve in sync;
- **Red lines never drift**: AI-generated code is constrained within the layering; the UTS red-line checklist is injected directly into context, catching compile-level pitfalls at generation time;
- **Document-driven**: requirement analysis, pseudocode, questions and answers are all persisted to task documents, iterating across sessions; conversation only handles notification and execution.

## Practical Benefit

The biggest benefit is not "writing faster" but **architecture conventions enforced by machines**: the AI does not bypass layering for "brevity", does not write plugin import paths from faulty memory, does not fall into the pitfalls catalogued in the UTS red-line checklist — precisely the parts of human-machine collaboration that are easiest to lose control of.
