#!/bin/bash

# include bash base
. _base.sh

echo "${underline}${green}Clearing all caches... ${reset}"
# Clear all caches
rm -rf app/cache/
#app/console cache:clear
#app/console cache:clear --env=dev
echo "${underline}${green}DONE${reset}"

echo "${underline}${green}Deleting all Propel generated data... ${reset}"
# Delete all Propel generated data
# @todo find and remove all third party bundle propel generated files
rm -rf **/Propel/map/**
rm -rf **/Propel/om/**
#rm -rf vendor/friendsofsymfony/user-bundle/FOS/UserBundle/Propel/map
#rm -rf vendor/friendsofsymfony/user-bundle/FOS/UserBundle/Propel/om
echo "${underline}${green}DONE${reset}"

echo "${underline}${green}Creating base db with propel... ${reset}"
# Create base db with propel
app/console propel:build
#app/console propel:database:drop --force
#app/console propel:database:create
app/console propel:sql:insert --force
echo "${underline}${green}DONE${reset}"

echo "${underline}${green}Loading fixtures... ${reset}"
# Load fixtures
app/console snm:base:fixtures:load --env=dev
# this will execute:
#php app/console propel:fixtures:load --yml --dir=app/fixtures/snm-api/loader --env=dev
echo "${underline}${green}DONE${reset}"
