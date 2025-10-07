```markdown
<!--
Sync Impact Report
Version change: UNSET -> 0.1.0
Modified principles:
	- [PRINCIPLE_1_NAME] -> I. API Contract First
	- [PRINCIPLE_2_NAME] -> II. Test-First (NON-NEGOTIABLE)
	- [PRINCIPLE_3_NAME] -> III. Observability & Debuggability
	- [PRINCIPLE_4_NAME] -> IV. Semantic Versioning & Release Discipline
	- [PRINCIPLE_5_NAME] -> V. Security & Least Privilege
Added sections:
	- Additional Constraints
	- Development Workflow
Removed sections: none
Templates reviewed/updated:
	- .specify/templates/plan-template.md ✅ updated
	- .specify/templates/spec-template.md ⚠ reviewed (no changes required)
	- .specify/templates/tasks-template.md ⚠ reviewed (no changes required)
	- .specify/templates/commands/*.md ⚠ pending (directory not present)
Follow-up TODOs:
	- TODO(RATIFICATION_DATE): original ratification date unknown; please provide
	- Confirm preferred runtime/language in Additional Constraints (see TODOs in file)
	- Update any command templates if/when `.specify/templates/commands/` is added
-->

# roadmap-service Constitution

## Core Principles

### I. API Contract First
All public behaviour MUST be defined by a versioned API contract (OpenAPI, gRPC
proto, or an agreed contract document) before implementation begins. Contracts
MUST include request/response schemas, error formats, and acceptable stability
guarantees. Any change that modifies the contract MUST be evaluated for
compatibility and follow the Versioning & Release Discipline (Principle IV).

Rationale: Clear contracts enable parallel development, automated contract
tests, and reduce accidental breaking changes across consumers.

### II. Test-First (NON-NEGOTIABLE)
Unit tests, contract tests, and acceptance tests MUST be defined and added to
the codebase before the corresponding implementation is merged. CI pipelines
MUST run tests and block merges on failures. Important flows and public APIs
MUST have automated integration or contract tests.

Rationale: Test-first practices produce safer refactors, reliable CI, and make
the project's behaviour explicit and verifiable.

### III. Observability & Debuggability
Every service and public endpoint MUST emit structured logs, key metrics, and
health/readiness probes. New features that affect runtime behaviour MUST add
relevant metrics and tracing spans. Logging MUST be machine-parseable (JSON or
similar) for production tooling.

Rationale: Observability is required to operate reliably, diagnose issues, and
measure success criteria described in feature specs.

### IV. Semantic Versioning & Release Discipline
The project MUST follow semantic versioning (MAJOR.MINOR.PATCH). Backwards-
incompatible changes to public contracts require a MAJOR bump and a published
migration plan. Deprecations MUST be communicated in changelogs and supported
for at least two minor releases before removal.

Rationale: Predictable versioning makes upgrades safer for consumers and
supports disciplined release planning.

### V. Security & Least Privilege
Security reviews and threat modelling MUST be performed for public APIs and any
change that expands attack surface. Secrets MUST never be stored in the repo.
Services MUST adopt least-privilege access for credentials and data access; any
exception requires explicit justification and an approval record.

Rationale: Protect users and data; make security decisions explicit and
auditable.

## Additional Constraints
Technology choices are intentionally lightweight and documented per-plan. Default
expectation for new work in this repository:

- Preferred runtime: Python 3.11 (confirm if another language is required)  
- Testing: pytest (unit/contract), integration tests as appropriate  
- Storage: PostgreSQL or other ACID store where persistent state is required  
- Observability: OpenTelemetry-compatible metrics/tracing; structured JSON
	logging  

TODO(LANGUAGE): Confirm the primary implementation language/runtime for the
project if not Python 3.11.

## Development Workflow

- All changes go through PRs with at least one approving maintainer review.  
- PRs that change public contracts MUST include updated contract specs and
	contract tests.  
- CI must run lint, type checks (when applicable), unit tests, and contract
	tests.  
- Small, focused PRs are preferred; large migrations should be split behind
	feature flags and accompanied by a migration/rollout plan.  
- Releases MUST include a changelog entry summarising API changes and any
	migration steps.

## Governance

Amendments to this Constitution must be proposed as a repository PR that:

1. Updates `.specify/memory/constitution.md` with the proposed text.  
2. Includes a rationale and a migration plan for any changes that affect
	 templates, automation, or public contracts.  
3. Lists required follow-up work (tests, template updates, documentation).

Approval: A constitution amendment requires approval from the set of project
maintainers listed in the repository's governance file or, if not present, a
majority of active collaborators with write access. If no maintainers list is
available, approval MUST be recorded in the PR discussion (explicit +1s).

Versioning policy: Bump MAJOR for incompatible governance or principle
removals/redefinitions; bump MINOR for addition of principles or material
expansions; bump PATCH for wording clarifications, typos, or non-semantic
refinements.

Compliance review: PRs touching infra, public APIs, or security-sensitive
areas MUST include a compliance checklist and be marked for review by at least
one security or operations reviewer.

**Version**: 0.1.0 | **Ratified**: TODO(RATIFICATION_DATE): original adoption
date unknown | **Last Amended**: 2025-10-07
```