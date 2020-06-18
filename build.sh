#!/bin/sh

dir=$(
    cd "${0%[/\\]*}" >/dev/null
    pwd
)

if [ -d /proc/cygdrive ]; then
    case $(which php) in
    $(readlink -n /proc/cygdrive)/*)
        # We are in Cygwin using Windows php, so the path must be translated
        dir=$(cygpath -m "$dir")
        ;;
    esac
fi

EDITOR=vim
PASSWD=/etc/passwd
RED='\033[0;41;30m'
STD='\033[0;0;39m'

clean_git_history() {
    git checkout --orphan latest_branch
    git add -A
    git commit -am "Clean Commit"
    git branch -D master
    git branch -m master
    git push -f origin master
}

update() {
    composer update -o
    npm update
    types-installer install
}

backup() {
    DATE=$(date +"%d-%b-%Y")
    cd /root
    tar --exclude='./htdocs/tmp' --exclude='./htdocs/src/Session/sessions' --exclude='./htdocs/vendor' --exclude='./htdocs/node_modules' --exclude='./htdocs/processed' -zcvf backup-$DATE.tgz /root/htdocs
}

install() {
    npm install -g javascript-obfuscator typescript terser nodemon sass typac types-installer
    npm install
    composer install
}

pause() {
    read -p "Press [Enter] key to continue..." fackEnterKey
}

show_menus() {
    clear
    echo "~~~~~~~~~~~~~~~~~~~~~"
    echo "   Library builder   "
    echo "~~~~~~~~~~~~~~~~~~~~~"
    echo "1. Single compiler"
    echo "2. clean git commit history (Required Big Internet Data)"
    echo "3. Exit"
}

read_options() {
    local choice
    read -p "Enter choice [ 1 - 3] " choice
    case $choice in
    1)
        node libs/compiler/git.js
        ;;
    2)
        clean_git_history
        ;;
    3) exit 0 ;;
    *) echo -e "${RED}Error...${STD}" && sleep 2 ;;
    esac
}

# ----------------------------------------------
# Trap CTRL+C, CTRL+Z and quit singles
# ----------------------------------------------
trap '' SIGINT SIGQUIT SIGTSTP

# -----------------------------------
# Step #4: Main logic - infinite loop
# ------------------------------------
:'while true; do
    show_menus
    read_options
done'
