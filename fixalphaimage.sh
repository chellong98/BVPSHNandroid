#!/bin/bash
cd ios/$1
find ./ -name "icon-*.png" -exec convert "{}" -alpha off "{}" \;