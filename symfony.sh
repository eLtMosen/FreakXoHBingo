#!/bin/bash

# include bash base
. _base.sh

# Create the Symfony needed directories
./symfony_directories.sh

# Check the needed config files and directories
# @note With Symfony 2.7 we don't need to check the config!
#./symfony_check.sh

# Install or update composer
./composer.sh

# Set or reset the generated data
./symfony_generate.sh
