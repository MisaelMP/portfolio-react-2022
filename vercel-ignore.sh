echo "VITE_VERCEL_GIT_COMMIT_REF: '$VITE_VERCEL_GIT_COMMIT_REF'"

if [ "$VITE_VERCEL_GIT_COMMIT_REF" != "master" ] && [ "$VITE_VERCEL_GIT_COMMIT_REF" != "development" ]; then
  echo "🛑 - Build cancelled"
  exit 0
fi