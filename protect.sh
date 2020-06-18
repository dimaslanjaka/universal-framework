#grep -RPnDskip "(passthru|shell_exec|system|phpinfo|base64_decode|chmod|mkdir|fopen|fclose|readfile) *(" /root/htdocs/
cd /opt/lampp
grep -RnDskip "passthru *(" htdocs/

