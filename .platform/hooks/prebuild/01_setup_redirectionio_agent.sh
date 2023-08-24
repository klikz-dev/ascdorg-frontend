#!/bin/sh

wget -qO- https://packages.redirection.io/gpg.key -O /tmp/redirectionio-gpg.key && sudo rpm --import /tmp/redirectionio-gpg.key && sudo rm -f /tmp/redirectionio-gpg.key
sudo yum-config-manager --add-repo https://packages.redirection.io/rpm/stable/2/any
sudo yum install redirectionio-agent -y
echo "instance_name: ASCD-$HOSTNAME" | sudo tee /etc/redirectionio/agent.yml
sudo systemctl --system daemon-reload
sudo systemctl start redirectionio-agent
