#!/bin/bash
set -uo pipefail

echo "PR works!"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

EC_PR="$DIR/../ec-pr.yml"

buildkite-agent pipeline upload "$EC_PR"