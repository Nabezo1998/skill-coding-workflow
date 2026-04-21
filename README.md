# Coding Workflow Skill

A Claude Code skill that implements a structured 7-step workflow for coding tasks. This skill enforces two review gates to ensure quality and user approval before implementation.

## Features

- **Design Document Gate**: Review and approve the design before implementation starts
- **TODO List Gate**: Review and approve the task breakdown before coding begins
- **Structured Output**: Clear separation between planning and implementation phases
- **File Tracking**: Automatic listing of all created and modified files

## Workflow Steps

1. **Receive User Instruction** - Accept the coding task
2. **Create Design Document** - Plan the implementation in markdown
3. **Design Review Gate** - User must approve the design
4. **Create TODO List** - Break down into specific implementation tasks
5. **TODO Approval Gate** - User must approve the task breakdown
6. **Implementation** - Execute the approved plan
7. **File Listing** - Display all created/modified files

## Usage

This skill automatically triggers when the user provides a coding instruction such as:
- "Implement a new user registration API"
- "Fix the undefined error in Login.tsx"
- "Refactor the date helper functions"

The skill will guide you through the entire workflow, pausing at checkpoints for user approval.

## Evaluation Results

The `evaluation-results/` directory contains comprehensive test data including:
- Benchmark metrics (pass rate, execution time, token usage)
- Qualitative outputs from test runs
- Assertion grading results

Key findings:
- **With Skill**: 100% pass rate on gate enforcement
- **Without Skill**: 86.7% pass rate (gates often skipped)
- Gate enforcement is the primary value driver

## Files

- `SKILL.md` - The skill definition and instructions
- `evaluation-results/` - Test case results and benchmarks
- `README.md` - This file
