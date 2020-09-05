#!/bin/bash

set -euo pipefail

echo "---> Deploying epic-collabs to STAGE: $STAGE"

yarn --silent vercel --prod \
-b STAGE="$STAGE" \
-b ORG_ID="$VERCEL_ORG_ID" \
-b PROJECT_ID="$VERCEL_PROJECT_ID" \
-b COMMIT_HASH="$BUILDKITE_COMMIT" \
-b BUILD_NUMBER="$BUILDKITE_BUILD_NUMBER" \
--token "$VERCEL_TOKEN"

echo "---> Deployment complete"
