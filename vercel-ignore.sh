#!/bin/bash

# Define branches to ignore
IGNORED_BRANCHES=("develop" "feature/*")

# Get the current branch name from Vercel's environment variable
BRANCH=$VERCEL_GIT_COMMIT_REF

echo "Current branch: $BRANCH"

# Function to check if the branch matches any pattern in the IGNORED_BRANCHES array
should_ignore() {
  for IGNORED_BRANCH in "${IGNORED_BRANCHES[@]}"; do
    if [[ "$IGNORED_BRANCH" == *"/*" ]]; then
      # If the pattern is a wildcard, use a glob pattern match
      if [[ "$BRANCH" == ${IGNORED_BRANCH/\*/}* ]]; then
        return 0
      fi
    else
      # Otherwise, use exact match
      if [[ "$BRANCH" == "$IGNORED_BRANCH" ]]; then
        return 0
      fi
    fi
  done
  return 1
}

# Check if the current branch should be ignored
if should_ignore; then
  echo "🛑 - Build cancelled"
  exit 0
else
  echo "✅ - Build can proceed"
  exit 1
fi
