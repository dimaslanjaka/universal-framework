#!/bin/bash
#clean page cache
#sync
#echo 1 >/proc/sys/vm/drop_caches
#clean dentries and inodes
#sync
#echo 2 >/proc/sys/vm/drop_caches
#clean page cache and dentries inodes, but it is not recommended in production instead use "echo 1"
#sync
#echo 3 >/proc/sys/vm/drop_caches

##################
# begin refresh script
##################

sync
if [ $(dpkg-query -W -f='${Status}' polipo 2>/dev/null | grep -c "ok installed") -eq 0 ]; then
  apt-get install polipo -y
fi
polipo -x
echo 3 >/proc/sys/vm/drop_caches
swapoff -a && swapon -a
printf '\n%s\n\n' 'Ram-cache and Swap Cleared'
if [ -f /opt/lampp/xampp ]; then
    /opt/lampp/xampp restart
fi
free -h
