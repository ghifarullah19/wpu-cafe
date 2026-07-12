# Agent Instructions

## Project Context

This project follows Spec Driven Development.

## Steering Rules

Before making any changes, read:

- .kiro/steering/product.md
- .kiro/steering/tech.md
- .kiro/steering/structure.md


These files define:
- product goals
- technical decisions
- coding standards
- architecture constraints


## Development Workflow

For every feature:

1. Read related specification inside `.kiro/specs`
2. Review requirements.md
3. Review design.md
4. Follow tasks.md
5. Implement only approved tasks


## Modification Rules

- Do not violate architecture.md
- Do not introduce new dependencies without justification
- Update documentation if architecture changes
- Keep implementation aligned with requirements

## Task Status Rules

The checkbox status in `.kiro/specs/*/tasks.md` represents implementation progress.

Rules:
- [x] = completed, do not redo
- [ ] = pending, candidate for implementation
- [ ]* = optional task, implement only if requested

# Feature Development Workflow

When the user requests a new feature, do NOT immediately write code.

Follow this workflow:

## Phase 1 - Feature Analysis

Analyze:
- User goal
- Existing system architecture
- Potential impact
- Required changes

Then provide:
1. Feature summary
2. Recommended approach
3. Possible risks
4. Ask user whether to proceed

---

## Phase 2 - Specification Creation

If the user approves:

Create:

.kiro/specs/<feature-name>/

with:

- requirements.md
- design.md
- tasks.md


requirements.md:
- user stories
- acceptance criteria
- functional requirements

design.md:
- architecture
- data flow
- components affected
- implementation decisions

tasks.md:
- small incremental implementation steps

---

## Phase 3 - Implementation

Only start coding after:
- requirements approved
- design approved
- tasks created

---

# Existing Task Workflow

When the user requests implementation of an existing task:

Follow this workflow.

## Phase 1 - Task Analysis

Before coding:

Read:

- requirements.md
- design.md
- tasks.md


Verify:

- requested task exists
- task status is [ ]
- previous required tasks are completed


Analyze:

- task objective
- affected files
- relationship with requirements and design


Provide:

1. Implementation plan
2. Files to modify
3. Technical considerations


Wait for user approval.


## Phase 2 - Implementation

After approval:

Rules:

- Implement only requested task.
- Do not modify unrelated files.
- Follow requirements.md and design.md.
- Preserve completed tasks.


## Phase 3 - Completion

After implementation:

Provide:

1. Summary of changes
2. Modified files
3. Test/build result if available


Update tasks.md checkbox.

---

# Update Specification Workflow

Use this workflow when changing:

- requirements.md
- design.md
- tasks.md


## Phase 1 - Impact Analysis

Before modifying specification:

Analyze:

- reason for change
- affected documents
- impact on existing implementation


Provide:

1. Current specification
2. Proposed change
3. Implementation impact


Wait for approval.


## Phase 2 - Update Specification

After approval:

Update only required files.

Rules:

- Maintain consistency between requirements.md, design.md, tasks.md.
- Do not remove completed decisions without explanation.
- Update task dependencies if required.


## Phase 3 - Implementation Sync

After specification changes:

Identify whether:

- existing code requires modification
- migration is required
- no implementation change is needed

---

# Update Steering Workflow

Use this workflow when changing:

- product.md
- structure.md
- tech.md


Before updating:

Analyze:

1. Current rule
2. Reason for change
3. Impact on project


Provide:

- Current state
- Proposed change
- Migration impact


Wait for approval.


After approval:

Update steering files.

Ensure:

- Existing specifications remain consistent.
- No contradiction exists between steering and specs.

---

# Review Workflow

When the user requests a review:

Do not modify code immediately.


Analyze:

1. Requirement compliance
2. Design compliance
3. Code quality
4. Architecture consistency


Provide:

## Review Summary

## Requirement Validation

## Design Validation

## Issues Found

## Recommendations


Only modify code after approval.

---

# Refactoring Workflow

When refactoring existing code:

Before implementation:

Analyze:

- reason for refactor
- affected files
- expected improvement
- risks


Rules:

- Do not change functionality unless requested.
- Preserve existing behavior.
- Update design.md if architecture changes.


Provide plan before coding.

---

# Command Interpretation

When user says:

"lanjutkan task"
→ Use Existing Task Workflow.


"buat fitur"
→ Use Feature Development Workflow.


"update spec"
→ Use Update Specification Workflow.


"update steering"
→ Use Update Steering Workflow.


"review"
→ Use Review Workflow.


"refactor"
→ Use Refactoring Workflow.


"implement"
→ Execute approved implementation plan.

---

# Specification Writing Rules

When creating `.kiro/specs`, do not create high-level product requirements.

Specifications must be implementation-ready.

Every requirement MUST contain:

1. User Story
2. Functional Requirement
3. Acceptance Criteria

Acceptance Criteria must:

- Be testable
- Define exact behavior
- Mention affected files/components when possible
- Include constraints
- Include edge cases
- Include verification method

Avoid vague statements:

Bad:
"Create modern UI"

Good:
"THE Dashboard_Page SHALL display order summary cards with..."

# SDD Specification Standard

When generating requirements.md:

Use this structure:

# Requirements Document

## Introduction

Explain:
- project context
- goal
- scope
- limitations


## Glossary

Define:
- components
- technical terms


## Requirements

For each requirement:

### Requirement X: Name

User Story:
"As a ... I want ... so that ..."

Acceptance Criteria:

1. THE [Component] SHALL...
2. WHEN [condition], THE [component] SHALL...
3. IF [error condition], THEN THE [system] SHALL...


Acceptance criteria should be measurable.

When creating design.md, include:

1. Current architecture impact
2. Component changes
3. File structure changes
4. Data flow
5. UI layout specification
6. Styling decisions
7. Responsive behavior
8. Technical constraints

When creating tasks.md:

Tasks must:

- Be ordered by dependency
- Be small enough to implement independently
- Reference requirement IDs
- Mention exact files
- Include implementation details

Example:

Good:

- [ ] 3. Update Login page styling
  - Modify Login.module.css
  - Replace hardcoded spacing with design tokens
  - Add responsive breakpoint <=768px
  - Requirements: 6.1, 6.2


Bad:

- [ ] Improve Login page

---

Never skip approval checkpoints.

Ask confirmation before:
- creating specifications
- changing architecture
- implementing major features