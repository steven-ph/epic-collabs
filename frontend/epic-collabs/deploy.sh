#!/bin/bash

set -euo pipefail

echo "Deploying epic-collabs..."
echo "STAGE: $STAGE"

yarn vercel --prod \
-b STAGE="$STAGE" \
-b ORG_ID="$ORG_ID" \
-b PROJECT_ID="$PROJECT_ID" \
-b COMMIT_HASH="$BUILDKITE_COMMIT" \
-b BUILD_NUMBER="$BUILDKITE_BUILD_NUMBER" \
--token "$VERCEL_TOKEN"

echo "Deployment complete"
