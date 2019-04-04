#!/bin/bash

if [ "$TRAVIS_REPO_SLUG" == "fgpv-vpgf/plugins" ]; then
    openssl aes-256-cbc -K $encrypted_acf2fcf52a75_key -iv $encrypted_acf2fcf52a75_iv -in bin/build/cloud_rsa.enc -out /tmp/cloud_rsa -d
    chmod 600 /tmp/cloud_rsa

    if [ ! "$TRAVIS_TAG" ]; then
        npm version prerelease
        CURRENT_VERSION=$(node -p "require('./package.json').version")
        git push "https://$GITHUB_TOKEN@github.com/fgpv-vpgf/plugins.git" "v$CURRENT_VERSION" HEAD:$TRAVIS_BRANCH
    fi
else
    bash bin/build/travis/ghpages-build.sh
fi