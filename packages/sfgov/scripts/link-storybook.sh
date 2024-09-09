#!/bin/bash
out=public/storybook
static_dir=storybook-static

# delete it if it's a directory
[[ -d $out ]] && rm -rf $out

# go up into the storybook package and build the static dir if doesn't exist
cd ../storybook
if [[ ! -d $static_dir ]]; then
    npm run build
fi
cd -

# this needs to reach up from the public dir, hence the ../..
ln -sf ../../storybook/$static_dir $out
