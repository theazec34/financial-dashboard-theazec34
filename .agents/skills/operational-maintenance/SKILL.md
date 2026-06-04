---
name: operational-maintenance
description: Keep the project operational over time by preventing regressions, catching errors early, and removing obsolete code or docs. Use when asked for maintenance, stabilization, cleanup, hardening, or keeping code reliable.
license: MIT
metadata:
  author: project-local
  version: "1.0.0"
---

# Operational Maintenance

Stabilization workflow to keep the codebase running, testable, and easy to evolve.

## When to apply

Use this skill for:

- Project health checks and preventive maintenance
- "Make it more stable", "cleanup", or "remove obsolete code"
- Pre-release hardening
- Routine quality gates after refactors

## Core policy

Prefer small, verifiable changes over large rewrites.

For every maintenance pass:

1. Detect issues with automated checks.
2. Fix highest-impact issues first.
3. Remove obsolete code and stale documentation.
4. Re-run checks to confirm no regressions.

## Maintenance checklist

### 1) Baseline validation

Run quality checks before editing:

```bash
cd frontend && npm run lint && npm run test && npm run build
cd /workspaces/financial-dashboard-theazec34 && pytest -q
```

### 2) Reliability pass

Prioritize:

- Runtime or build errors
- Broken API/error handling paths
- Accessibility blockers (keyboard, focus, labels, alerts)
- Performance anti-patterns in hot paths

### 3) Obsolete content cleanup

Remove or update:

- Dead imports, unused helpers, unreachable branches
- Stale docs that reference missing files/commands
- Duplicated UI snippets that should be shared components

### 4) Regression safety

After each set of changes:

- Re-run impacted tests
- Re-run lint/build for changed app surface
- Ensure user-facing behavior is unchanged unless intended

## Project-specific guidance

For this repository:

- Keep data fetch logic in `frontend/src/api` and `frontend/src/hooks`
- Keep dashboard components presentational in `frontend/src/components/dashboard`
- Log user-safe errors in UI and real errors in console for diagnostics
- Record meaningful frontend changes in `frontend/README.md` changelog table

## Exit criteria

A maintenance task is complete only when:

- Lint, tests, and build pass
- No known stale references remain in touched files
- Documentation reflects current behavior
- Changes are minimal and reversible
