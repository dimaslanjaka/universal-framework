#!/bin/bash

EDITOR=vim
PASSWD=/etc/passwd
RED='\033[0;41;30m'
STD='\033[0;0;39m'

node libs/compiler/git.js
read -p "Press [Enter] key to continue..." fackEnterKey

:'
pause() {
    read -p "Press [Enter] key to continue..." fackEnterKey
}

# function to display menus
show_menus() {
    clear
    echo "~~~~~~~~~~~~~~~~~~~~~"
    echo "   Library builder   "
    echo "~~~~~~~~~~~~~~~~~~~~~"
    echo "1. Single compiler"
    echo "2. Watch Compile JS src/MVC/themes/assets/js/{app.js,app.min.js}"
    echo "3. Exit"
}
# read input from the keyboard and take a action
# invoke the one() when the user select 1 from the menu option.
# invoke the two() when the user select 2 from the menu option.
# Exit when user the user select 3 form the menu option.
read_options() {
    local choice
    read -p "Enter choice [ 1 - 3] " choice
    case $choice in
    1)
        node libs/compiler/single.js
        read -p "Press [Enter] key to continue..."
        ;;
    2)
        npm run index
        read -p "Press [Enter] key to continue..."
        ;;
    3) exit 0 ;;
    *) echo -e "${RED}Error...${STD}" && sleep 2 ;;
    esac
}

# ----------------------------------------------
# Step #3: Trap CTRL+C, CTRL+Z and quit singles
# ----------------------------------------------
trap '' SIGINT SIGQUIT SIGTSTP

# -----------------------------------
# Step #4: Main logic - infinite loop
# ------------------------------------
while true; do
    show_menus
    read_options
done
'
