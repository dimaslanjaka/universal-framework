create()
{
echo "$1 Global Root GC CA\n===============================" > "$1.pem"
openssl s_client -showcerts -connect $1:443 </dev/null 2>/dev/null|openssl x509 -outform PEM >> "$1.pem"
}
rm cacert.pem
curl --output curl.pem "https://curl.haxx.se/ca/cacert.pem"
curl --remote-name --time-cond curl.pem https://curl.haxx.se/ca/cacert.pem 
create "www.google.com"
create "www.instagram.com"
create "www.facebook.com"
create "translate.google.co.id"
create "api.facebook.com"
create "graph.facebook.com"
create "graph.beta.facebook.com"
create "developers.facebook.com"
create "facebook.com"

cat *.pem > cacert.pem