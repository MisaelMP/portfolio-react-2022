echo "VERCEL_ENV: '$VERCEL_ENV'"

if [ "$VERCEL_ENV" != "master" ] && [ "$VERCEL_ENV" != "development" ]; then
  echo "🛑 - Build cancelled"
  exit 0
fi