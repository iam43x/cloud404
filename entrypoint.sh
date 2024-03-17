#!/bin/bash
#
# entrypoint strongswan ubuntu doker image
echo "
****************************************
* template render config files *
****************************************"
for FILE in '/etc/strongswan.conf.eval' '/etc/swanctl/swanctl.conf.eval';
  do eval echo -e `<$FILE` >>> ${FILE:0:-5};
done;

echo "
************************
* apply iptables rules *
************************"
iptables -t nat -A POSTROUTING -s ${NETWORK_CIDR} -o eth0 -m policy --dir out --pol ipsec -j ACCEPT
iptables -t nat -A POSTROUTING -s ${NETWORK_CIDR} -o eth0 -j MASQUERADE
iptables -L -t nat

echo "
***********************
* start charon daemon *
***********************"
charon-systemd
