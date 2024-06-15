echo "VERCEL_GIT_COMMIT_REF: '$VERCEL_GIT_COMMIT_REF'"

if [ "$VERCEL_GIT_COMMIT_REF" != "master" ] && [ "$VERCEL_GIT_COMMIT_REF" != "development" ]; then
  echo "🛑 - Build cancelled"
  exit 0
fi