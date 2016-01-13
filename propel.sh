#!/bin/bash

# include bash base
. _base.sh

#echo $PWD
#echo "${PWD##*/}"

read -p "${orange}Delete all Propel generated data (y/n)? ${reset}"
if [ "$REPLY" == "y" ]
then
    # Delete all Propel generated data
    # @todo find and remove all third party bundle propel generated files
    rm -rf src/*Bundle/Propel/Base/**
    rm -rf src/*Bundle/Propel/Map/**
    echo "${underline}${green}All Propel generated data deleted!${reset}"
fi

read -p "${orange}Build all Propel generated data (y/n)? ${reset}"
if [ "$REPLY" == "y" ]
then
    rm app/propel/sql/sqldb.map
    app/console propel:build
    echo "${underline}${green}All Propel generated data created!${reset}"
fi
