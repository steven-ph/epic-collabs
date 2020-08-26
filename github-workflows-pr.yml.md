```
name: Trigger Buildkite PR Pipeline
on:
  push:
    branches:
      - "*"
      - "*/*"
      - "!master"

jobs:
  build:
    name: Pull Request
    runs-on: ubuntu-latest
    steps:
      - name: Trigger pull request pipeline
        uses: buildkite/trigger-pipeline-action@v1.2.0
        env:
          PIPELINE: sp/pr
          MESSAGE: ":github: ${{github.event.head_commit.message}}"
          BUILDKITE_API_ACCESS_TOKEN: ${{ secrets.BUILDKITE_API_ACCESS_TOKEN }}
```
