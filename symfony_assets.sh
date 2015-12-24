#!/bin/bash

# include bash base
. _base.sh

# get the env
env="$1"

rm web/bundles/** -rf
rm web/css/** -rf
rm web/fonts/** -rf
rm web/images/** -rf
rm web/img/** -rf
rm web/js/** -rf

if [ "$1" == "prod" ] || [ "$1" == "dev" ] || [ "$1" == "test" ]
then
    env="$1"
else
    # Ask for the environment until the answer is right :)
    while read -p "${orange}Chose a environment like prod, dev or test: ${reset}" answer; do
        if [ $answer == "prod" ] || [ $answer == "dev" ] || [ $answer == "test" ]
        then
            env=$answer
            echo "${underline}${green}The $env environment will be used!${reset}"
            break
        else
            echo "${magenta}Wrong environment $answer given. Please chose a environment like prod, dev or test!${reset}"
        fi
    done
fi

php app/console cache:clear --env="$env" --no-warmup
php app/console cache:warmup --env="$env" --no-debug
php app/console assets:install --env="$env"
php app/console assetic:dump --env="$env"

find app/cache -type d -exec chmod -v 775 {} \;
find app/logs -type f -exec chmod -v 664 {} \;
