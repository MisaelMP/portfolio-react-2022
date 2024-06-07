#!/bin/bash

# Define branches to ignore
IGNORED_BRANCHES=("development" "feature/*")

# Get the current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Check if the current branch should be ignored
for IGNORED_BRANCH in "${IGNORED_BRANCHES[@]}"; do
  if [[ "$BRANCH" == $IGNORED_BRANCH ]]; then
    echo "🛑 - Build cancelled"
    exit 0;
  fi
done

echo "✅ - Build can proceed"
exit 1;
