#!/bin/bash

# include bash base
. _base.sh

# Check the local Symfony configuration
if [ ! -f app/config/parameters_local.yml ]
then
    echo  "${bold}${magenta}Please create parameters_local.yml file from parameters_local.sample.yml at app/config/ directory and add your database connection data!${reset}"
    echo  "${bold}${magenta}Use for example: cp app/config/parameters_local.sample.yml app/config/parameters_local.yml${reset}"
    exit 1
fi

# Check the Symfony directories
if [ ! -d app/cache ] || [ ! -d app/logs ] || [ ! -d web ]
then
    echo "${underline}${green}Please setup the Symfony directories!${reset}"
fi
