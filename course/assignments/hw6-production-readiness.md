# HW6: Production Readiness Checklist

**Weight:** 4% of final grade
**Due:** Week 14

## Objective

Transform any application into production-grade software.

## Setup

**Provided:** Working application (can be your own or provided)

## Tasks

### 1. Security Audit (25%)

- Fix all vulnerabilities found
- Add proper authentication
- Input validation everywhere
- Environment variables for secrets
- Rate limiting
- HTTPS enforcement
- Security headers (CSP, etc.)

**Tools to use:**
- npm audit
- OWASP ZAP (optional)
- Manual code review

### 2. Performance Optimization (25%)

- Database indexing
- Query optimization
- Caching strategy (Redis/in-memory)
- Code splitting / lazy loading
- Image optimization
- Bundle size optimization
- Load testing results

**Benchmarks required:**
- Lighthouse score (aim for 90+)
- Time to first byte
- Bundle size before/after

### 3. Monitoring & Observability (25%)

Set up:
- Error tracking (Sentry or similar)
- Analytics
- Health checks
- Logging strategy
- Uptime monitoring
- Performance monitoring

### 4. CI/CD Enhancement (15%)

Upgrade pipeline to include:
- Multi-environment (dev/staging/prod)
- Performance gates
- Automated security scanning
- Rollback capability
- Blue-green OR canary deployment

### 5. Documentation (10%)

Create:
- README with setup instructions
- API documentation
- Architecture diagram
- Deployment guide
- Runbook for incidents

## Deliverables

1. **Before/after comparison document** - What you changed
2. **Completed production readiness checklist** - All items addressed
3. **Deployed application with monitoring** - Live and observable
4. **Documentation package** - All required docs
5. **Guide** - "How I Made It Production-Ready"

## Rubric (40 points)

| Category | Weight | Description |
|----------|--------|-------------|
| **Security** | 25% | Vulnerabilities fixed, auth working, headers set |
| **Performance** | 25% | Measurable improvements, caching implemented |
| **Monitoring** | 25% | Error tracking, logging, health checks |
| **CI/CD** | 15% | Enhanced pipeline, multiple environments |
| **Documentation** | 10% | Complete and useful docs |

### Security (10 pts)
- Vulnerabilities fixed: 3 pts
- Auth/authorization: 3 pts
- Security headers: 2 pts
- Rate limiting: 2 pts

### Performance (10 pts)
- Lighthouse 90+: 3 pts
- Caching implemented: 3 pts
- Bundle optimized: 2 pts
- Load testing done: 2 pts

### Monitoring (10 pts)
- Error tracking: 4 pts
- Health checks: 3 pts
- Logging: 3 pts

### CI/CD (6 pts)
- Multi-environment: 3 pts
- Rollback capability: 3 pts

### Documentation (4 pts)
- Complete and clear: 4 pts

---

*For full course details, see [../COURSE_MEMORY.md](../COURSE_MEMORY.md)*
