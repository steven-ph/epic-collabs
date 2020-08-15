#!/bin/bash
set -uo pipefail

echo "It works"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

MERGE="$DIR/../merge.yml"

buildkite-agent pipeline upload "$MERGE"