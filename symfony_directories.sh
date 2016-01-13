#!/bin/bash

# include bash base
. _base.sh

# Symfony directories
if [ ! -d app/cache ]
then
    mkdir -p app/cache
    chmod 777 app/cache
    echo "${underline}${green}The Symfony cache directory created${reset}"
fi

if [ ! -d app/logs ]
then
    mkdir -p app/logs
    chmod 777 app/logs
    echo "${underline}${green}The Symfony logs directory created${reset}"
fi

if [ ! -d bin ]
then
    mkdir bin
    echo "${underline}${green}The Symfony bin directory created${reset}"
fi

if [ ! -d build ]
then
    mkdir build
    echo "${underline}${green}The Symfony build directory created${reset}"
fi

# Public directories
if [ ! -d web ]
then
    mkdir web
    mkdir web/bundles
    mkdir web/css
    mkdir web/fonts
    mkdir web/img
    mkdir web/images
    mkdir web/js
    echo "${underline}${green}Public directories are created${reset}"
fi
