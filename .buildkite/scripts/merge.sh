#!/bin/bash
set -uo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

EC_MERGE="$DIR/../ec-merge.yml"

buildkite-agent pipeline upload "$EC_MERGE"