#!/usr/bin/env bash

echo "modified:" > _data/modified.yml
git ls-tree \
    -r --name-only HEAD | \
    grep -E "^(workbooks|pages)/.*\.(md|html)$" | \
    grep -v "^workbooks/_drafts/" | \
    while read filename; do
    echo "$(git log -1 --pretty=format:'  - commit: %H
    modified: %ad
    authored: %aI
    committed: %cI
    filename: ' -- $filename) $filename" >> _data/modified.yml
done