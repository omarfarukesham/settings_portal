# Steps to start

```bash
git clone https://fahimalpha@bitbucket.org/restoreit/frontend_admin.git
git checkout -b <your-branch-name>
```

**Branch Naming Convention**:
`feature-<jira-card-name>`
`feature-<jira-card-name-additional-component>`

Examples:
feature-jira-card-jms-35
feature-jira-card-jms-35-additional-component

# For regular coding:

Always sync with `development` branch.

- Before starting coding every time:

```bash
git pull origin development
```

- After coding:

```bash
git add .
git commit -m "<your-message>"
git pull origin development (resolve conflict if there is any)
git push
```
