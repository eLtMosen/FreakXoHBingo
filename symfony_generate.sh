#!/bin/bash

# include bash base
. _base.sh

read -p "${orange}Clearing all caches (y/n)? ${reset}"
if [ "$REPLY" == "y" ]
then
    # Clear all caches
    rm -rf app/cache/**
    #app/console cache:clear
    #app/console cache:clear --env=test
    echo "${underline}${green}All caches cleared!${reset}"
fi
echo "DONE${reset}"

# Generate Propel Base and Map Files...
./propel.sh

#read -p "${orange}Recreate base db with Propel (y/n)? ${reset}"
#if [ "$REPLY" == "y" ]
#then
#    # Create base db with propel
#    #app/console propel:database:drop --force
#    #app/console propel:database:create
#    #app/console propel:sql:insert --force
#    echo "${underline}${green}No! This is to dangerous! All data will be lost! Make sure you have a backup first and run the commands by hand!${reset}"
#fi

read -p "${orange}Generating and installing assets (y/n)? ${reset}"
# Generate and install static files
./symfony_assets.sh
