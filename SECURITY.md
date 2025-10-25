# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

The security of this project is taken seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via GitHub's Security Advisory feature:

1. Go to the [Security tab](https://github.com/stanlemon/who-can-my-daughter-date/security) of this repository
2. Click on "Report a vulnerability"
3. Fill out the form with as much detail as possible

Alternatively, you can email the maintainer directly at the email address found in the git commit history.

### What to Include in Your Report

Please include the following information in your report:

- Type of vulnerability
- Full paths of source file(s) related to the manifestation of the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the vulnerability, including how an attacker might exploit it

### What to Expect

- You should receive an acknowledgment within 48 hours
- We will investigate the issue and provide an estimated timeline for a fix
- We will keep you informed about the progress toward a fix
- Once the vulnerability is fixed, we will publicly disclose it (unless you request otherwise)

## Security Best Practices

This project follows these security practices:

- Dependencies are regularly updated to patch known vulnerabilities
- All code is reviewed before being merged
- CI/CD pipeline includes security checks
- TypeScript strict mode helps catch potential issues at compile time
- No sensitive data is stored in the codebase

## Security Updates

Security updates will be released as patch versions and announced in:

- GitHub Security Advisories
- Release notes
- Repository README (if critical)

## Acknowledgments

We appreciate the security research community's efforts in responsibly disclosing vulnerabilities to us. Contributors who report valid security issues will be acknowledged in the release notes (unless they prefer to remain anonymous).
