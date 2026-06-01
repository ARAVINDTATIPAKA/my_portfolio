#!/bin/bash
# Auto-commit and push all changes to Develop + main
cd "/Users/aravindtatipaka/Desktop/Code files/Antigravity"

MSG=${1:-"chore: update from Claude chat session"}

git add -A
git commit -m "$MSG" || echo "Nothing to commit"
git push origin Develop

# Sync main
git checkout main
git merge Develop --no-edit
git push origin main
git checkout Develop

echo "✅ Pushed to Develop + main"
