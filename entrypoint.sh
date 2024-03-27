#!/bin/bash
#
# entrypoint strongswan ubuntu doker image
printf "
********************************
* \x1b[32mtemplate render config files\x1b[0m *
********************************
"
for FILE in '/etc/strongswan.template.conf' '/etc/swanctl/swanctl.template.conf';
  do
    printf "\nrender $FILE...\n"
    cat $FILE | envsubst | tee $(echo $FILE | sed -e 's/\.template//');
done;

printf "
************************
* \x1b[32mapply iptables rules\x1b[0m *
************************
"
iptables -t nat -A POSTROUTING -s ${NETWORK_CIDR} -o eth0 -m policy --dir out --pol ipsec -j ACCEPT
iptables -t nat -A POSTROUTING -s ${NETWORK_CIDR} -o eth0 -j MASQUERADE
iptables -L -t nat

printf "
***********************
* \x1b[32mstart charon daemon\x1b[0m *
***********************
"
charon-systemd
