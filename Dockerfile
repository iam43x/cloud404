FROM ubuntu:22.04
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod u+x /usr/local/bin/entrypoint.sh
RUN apt update && apt upgrade -y
RUN apt install -y \
  gettext \
  iptables \
  libcharon-extra-plugins \
  charon-systemd
ENTRYPOINT entrypoint.sh
EXPOSE 500:500/udp 4500:4500/udp
