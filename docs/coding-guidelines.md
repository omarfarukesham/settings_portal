## 1. Introduction

Following coding guidelines is an important aspect of maintaining code quality and ensuring consistency. So always keep in mind the following guidelines and revisit if necessary.

## 2. Project Structure

```
project/
├─ node_modules/
├─ src/
│  ├─ assets/
│  ├─ components/
│  ├─ styles/
├─ .gitignore
├─ package.json
├─ README.md
├─ ...
```

## 3. Naming Conventions

Components should follow the PascalCase naming convention.
For example, a reusable button component can be named `Button`, while a specific component for rendering user details can be named `UserDetails`.

Folder names should be in small letter and hyphen-separated. For example: `form`, `user-details`.

Utility functions should be follow camel case. For example: `useOutsideClick`

## 4. Code Formatting

Please go through the `.eslintrc.cjs` and `.prettierrc.cjs` carefully.
