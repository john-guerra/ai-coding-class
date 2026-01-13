# HW4: TDD + CI/CD + Evals Suite

**Weight:** 5% of final grade
**Due:** Week 10

## Objective

Build a comprehensive quality assurance system combining Test-Driven Development, CI/CD pipelines, and evaluation frameworks.

## Part 1: Test-Driven Development (20%)

Build a new feature using strict TDD:

1. Write failing tests first
2. Use AI to implement minimum code to pass
3. Refactor
4. Repeat for all acceptance criteria

**Requirements:**
- Tests written BEFORE implementation
- Git history shows TDD process
- Clear commit messages showing red-green-refactor

## Part 2: Evaluation Suite (35%)

Create comprehensive evals covering:

- **Unit tests** (80%+ coverage)
- **Integration tests**
- **E2E tests** (Playwright/Cypress)
- **Linting** (ESLint/Prettier)
- **Type checking** (TypeScript)
- **Security scanning** (npm audit)
- **Performance benchmarks**
- **At least 1 custom semantic eval**

## Part 3: CI/CD Pipeline (35%)

Set up complete pipeline with stages:

1. **Quality Checks** - lint, format, types
2. **Security Audit** - npm audit, dependency check
3. **Unit Tests** - with coverage report
4. **Integration Tests**
5. **E2E Tests**
6. **Build**
7. **Deploy Preview** (on PR)
8. **Deploy Production** (on merge to main)

## Part 4: Eval Dashboard (10%)

Create dashboard showing:
- Test results over time
- Coverage trends
- Performance metrics
- Security scan results
- Build success rate

## Deliverables

1. **Feature code** - Tests written first, TDD process evident
2. **Complete eval suite** - Runnable locally and in CI
3. **Working CI/CD pipeline** - GitHub Actions
4. **Eval dashboard** - Or comprehensive report
5. **Documentation** - "My TDD + CI/CD + Evals Guide"

## Rubric (50 points)

| Category | Weight | Description |
|----------|--------|-------------|
| **TDD Process** | 20% | Tests first, clear history, proper workflow |
| **Eval Comprehensiveness** | 35% | All eval types implemented, 80%+ coverage |
| **CI/CD Implementation** | 30% | All stages working, proper flow |
| **Dashboard Quality** | 10% | Useful visualizations, trends |
| **Documentation** | 5% | Clear guide for others |

### TDD (10 pts)
- Tests written first: 4 pts
- Git history shows process: 3 pts
- Refactoring evident: 3 pts

### Evals (17.5 pts)
- Unit tests (80%+): 5 pts
- Integration tests: 3 pts
- E2E tests: 3 pts
- Linting/types: 2 pts
- Security scanning: 2 pts
- Custom semantic eval: 2.5 pts

### CI/CD (15 pts)
- All stages present: 6 pts
- Stages run in order: 3 pts
- Deploy preview works: 3 pts
- Production deploy works: 3 pts

### Dashboard (5 pts)
- Metrics displayed: 3 pts
- Trends visible: 2 pts

### Documentation (2.5 pts)
- Clear and helpful: 2.5 pts

---

*For full course details, see [../COURSE_MEMORY.md](../COURSE_MEMORY.md)*
