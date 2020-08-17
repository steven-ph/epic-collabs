#!/bin/bash
set -uo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

PR="$DIR/../pr.yml"

buildkite-agent pipeline upload "$PR"