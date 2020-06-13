Very Simple VPN Gate Script
===================


This is an extremly simple script to connect to a VPN from the vpngate.net service. The script currently only runs on Linux,requires openvpn, and `sudo` in order to run.

Example usage to connect to a specific country (South Korea, in this case):


```php
sudo php vpngate.php -c kr
Attempting to connect to KR - 218.152.74.243...
Connected to KR - 218.152.74.243 successfully.
```

Example usage to check the status of any current VPN connection on the system (this is interactive)

```php
sudo php vpngate.php -c kr -s
VPN is running. Kill it? [y/yes/n/no]: y
VPN is not running. Start one? [y/yes/n/no]: y
Attempting to connect to KR - 218.152.74.243...
Connected to KR - 218.152.74.243 successfully.
```

You can opt to leave off a country, in that case the script will try the very first VPN in the list.

If the script is unable to connect to a VPN it will continue throughout the list until it runs out of options for either the selected country or every entry returned from the vpngate.net service.
