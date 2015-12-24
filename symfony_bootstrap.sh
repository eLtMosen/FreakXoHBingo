#!/bin/bash

# include bash base
. _base.sh

# Assign the current work directory to the bash script variable 'CWD'.
CWD=$(pwd)

echo "Linking $CWD/vendor/twbs/bootstrap to $CWD/vendor/mopa/bootstrap-bundle/Mopa/Bundle/BootstrapBundle/Resources/public/bootstrap"

ln -s $CWD/vendor/twbs/bootstrap $CWD/vendor/mopa/bootstrap-bundle/Mopa/Bundle/BootstrapBundle/Resources/public/bootstrap
