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

read -p "${orange}Delete all Propel generated data (y/n)? ${reset}"
if [ "$REPLY" == "y" ]
then
    # Delete all Propel generated data
    # @todo find and remove all third party bundle propel generated files
    rm -rf src/SNM/*Bundle/Propel/map
    rm -rf src/SNM/*Bundle/Propel/om
    rm -rf vendor/friendsofsymfony/user-bundle/FOS/UserBundle/Propel/map
    rm -rf vendor/friendsofsymfony/user-bundle/FOS/UserBundle/Propel/om
    echo "${underline}${green}All Propel generated data deleted!${reset}"
fi

read -p "${orange}Build all Propel generated data (y/n)? ${reset}"
if [ "$REPLY" == "y" ]
then
    app/console propel:build
    echo "${underline}${green}All Propel generated data created!${reset}"
fi

read -p "${orange}Recreate base db with Propel (y/n)? ${reset}"
if [ "$REPLY" == "y" ]
then
    # Create base db with propel
    #app/console propel:database:drop --force
    #app/console propel:database:create
    #app/console propel:sql:insert --force
    echo "${underline}${green}No! This is to dangerous! All data will be lost! Make sure you have a backup first and run the commands by hand!${reset}"
fi

#echo "${underline}${green}Loading fixtures... "
# Load fixtures
#app/console snm:base:fixtures:load --env=dev
# this will execute:
#php app/console propel:fixtures:load --yml --dir=app/fixtures/snm-api/loader --env=dev
#echo "DONE${reset}"

#echo "${underline}${green}Building SQL for test DB... "
# Build SQL for test DB
#app/console propel:build --env=test
#app/console propel:sql:insert --env=test --force
#echo "DONE${reset}"

read -p "${orange}Generating and installing assets (y/n)? ${reset}"
# Generate and install static files
./symfony_assets.sh
