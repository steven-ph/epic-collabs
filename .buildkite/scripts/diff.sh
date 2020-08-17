#!/bin/bash
set -ueo pipefail

echo "Diff works!"

# Get Diff between the given commit and starting commit of the branch
# Usage: ./diff.sh $BUILDKITE_COMMIT

#PRE DIFF
aws s3 cp s3://sp-tools-buildkite-secrets/epic-collabs/private_ssh_key . > /dev/null 2>&1
chmod 600 private_ssh_key
GIT_SSH_COMMAND='ssh -i ./private_ssh_key' git fetch origin master:master
rm private_ssh_key

COMMIT="$1"

BRANCH_POINT_COMMIT=$(git merge-base master $COMMIT)

echo >&2 "Running diff between $COMMIT and $BRANCH_POINT_COMMIT"
diff=$(git diff --name-only "$COMMIT".."$BRANCH_POINT_COMMIT")
echo "$diff"
