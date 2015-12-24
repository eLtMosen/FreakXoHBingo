#!/bin/sh

_dirBackup="backup"

#echo
#echo -e "$(tput bold) reg  bld  und   tput-command-colors$(tput sgr0)"
#for i in $(seq 1 7); do
#  echo " $(tput setaf $i)Text$(tput sgr0) $(tput bold)$(tput setaf $i)Text$(tput sgr0) $(tput sgr 0 1)$(tput setaf $i)Text$(tput sgr0)  \$(tput setaf $i)"
#done
#echo ' Bold            $(tput bold)'
#echo ' Underline       $(tput sgr 0 1)'
#echo ' Reset           $(tput sgr0)'
#echo

# Set colors
# https://github.com/lucasrizoli/dotfiles/blob/master/bash/.bash_prompt
# if the term has tput colours...
if tput setaf 1 &> /dev/null; then
    # return to base styling (not bold, not italic, not underlined)
    tput sgr0

    # store tput colours & styles as human-friendly variables
    if [[ $(tput colors) -ge 256 ]] 2>/dev/null; then
        red=$(tput setaf 1)
        magenta=$(tput setaf 9)
        purple=$(tput setaf 141)
        blue=$(tput setaf 153)
        orange=$(tput setaf 172)
        green=$(tput setaf 190)
        grey=$(tput setaf 238)
        white=$(tput setaf 255)
    else
        magenta=$(tput setaf 1)
        green=$(tput setaf 2)
        orange=$(tput setaf 3)
        red=$(tput setaf 3)
        blue=$(tput setaf 4)
        purple=$(tput setaf 5)
        grey=$(tput setaf 6)
        white=$(tput setaf 7)
    fi

    bold=$(tput bold)
    underline=$(tput smul)
    nounderline=$(tput rmul)
    reset=$(tput sgr0)
else
    # http://linuxtidbits.wordpress.com/2008/08/13/output-color-on-bash-scripts-advanced/
    red="\033[1;31m"
    blue="\033[1;31m"
    magenta="\033[1;31m"
    orange="\033[1;33m"
    green="\033[1;32m"
    purple="\033[1;35m"
    grey="\033[1;30m"
    white="\033[1;37m"
    reset="\033[m"
fi
