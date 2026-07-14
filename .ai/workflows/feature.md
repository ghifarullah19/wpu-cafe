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

## Phase 3 - Implementation

Only start coding after:

- requirements approved
- design approved
- tasks created
