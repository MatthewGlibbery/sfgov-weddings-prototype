#!/bin/bash
out=public/storybook

# delete it if it's a directory
[[ -d $out ]] && rm -rf $out

# go up into the storybook package and build the static dir if doesn't exist
pushd ../storybook
npm run build
popd

# symlink the storybook build directory to public/storybook
ln -sf ../storybook/storybook-static $out
