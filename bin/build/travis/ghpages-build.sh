#!/bin/bash

if git ls-remote --heads --exit-code https://github.com/$TRAVIS_REPO_SLUG.git gh-pages &> /dev/null; then
    echo "gh-pages exists - cloning ..."
    git clone --depth=50 --branch=gh-pages https://github.com/$TRAVIS_REPO_SLUG.git ./page_files

else
    echo "gh-pages does not exist!"
fi

mkdir -p page_files/$TRAVIS_COMMIT
npm run build
mv dist/* page_files/$TRAVIS_COMMIT
echo "" > page_files/index.html