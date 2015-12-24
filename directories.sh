#!/bin/bash

# include bash base
. _base.sh

# Web-Server log directory
if [ ! -d .log ]
then
    mkdir -p .log
    chmod 777 .log
    echo "${underline}${green}The Web-Server log directory was created${reset}"
fi

# Web-Server temp directory
if [ ! -d .tmp ]
then
    mkdir -p .tmp
    chmod 777 .tmp
    echo "${underline}${green}The Web-Server temp directory was created${reset}"
fi
