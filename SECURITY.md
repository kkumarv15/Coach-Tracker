# Security Policy

## Supported Versions

We actively support and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.x.x   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within this application, please send an e-mail to the maintainers. All security vulnerabilities will be promptly addressed.

Please include the following information:
- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Security Scanning Tools

This project uses the following security scanning tools:

### CodeQL
- GitHub's static analysis engine
- Runs on every push and pull request
- Detects security vulnerabilities and coding errors
- Configuration: `codeql.config.yml`

### npm Audit
- Built-in Node.js security audit
- Checks for known vulnerabilities in dependencies
- Runs on CI and pre-commit hooks

### ESLint Security
- Static analysis with security-focused rules
- Detects common security patterns
- Uses `eslint-plugin-security`

### Snyk (Optional)
- Advanced dependency vulnerability scanning
- Requires SNYK_TOKEN secret
- Runs in CI pipeline

## Security Best Practices

1. **Dependency Management**
   - Run `npm audit` regularly
   - Keep dependencies up to date
   - Review security advisories

2. **Code Quality**
   - ESLint runs on every commit
   - Fix warnings and errors promptly
   - Use secure coding patterns

3. **Secrets Management**
   - Never commit secrets to repository
   - Use environment variables
   - Rotate credentials regularly

4. **CI/CD Security**
   - All scans must pass before merging
   - Review security findings
   - Address high/medium severity issues

## Pre-commit Checks

Before committing, ensure:
- [ ] ESLint passes without errors
- [ ] No high/medium vulnerabilities in npm audit
- [ ] No secrets detected in changes

## Installation

To install security dependencies:

```bash
npm install
```

To set up pre-commit hooks:

```bash
npm run prepare
```

## Running Security Scans Locally

```bash
# Run ESLint with security rules
npm run lint

# Run npm audit
npm run security:audit

# Run all security checks
npm run security:check
```
