DATE=$(date +"%d-%b-%Y")
cd /root
tar --exclude='./htdocs/tmp' --exclude='./htdocs/src/Session/sessions' --exclude='./htdocs/vendor' --exclude='./htdocs/node_modules' -zcvf backup-$DATE.tgz htdocs