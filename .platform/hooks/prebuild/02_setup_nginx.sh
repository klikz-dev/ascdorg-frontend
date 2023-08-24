#!/bin/sh

# sudo rpm --import https://packages.redirection.io/gpg.key
# sudo yum-config-manager --add-repo https://packages.redirection.io/rpm/stable/2/centos_7
# sudo yum install libnginx-mod-redirectionio -y
# sudo systemctl restart nginx

sudo su -

yum -y update && \
    yum -y install --setopt=tsflags=nodocs \
        automake \
        epel-release \
        curl \
        gawk \
        gcc \
        make \
        nginx \
        unzip \
        wget && \
    yum clean all

# install rust toolchain
RUSTUP_HOME=/opt/rust
CARGO_HOME=/opt/rust
curl https://sh.rustup.rs -sSf | sh -s -- --default-toolchain 1.67.1 -y --no-modify-path
source $HOME/.cargo/env
PATH=/opt/rust/bin:$PATH
mkdir -p /opt/rust/registry

# get libredirectionio sources and build it
cd /tmp
wget -O libredirectionio-master.zip https://github.com/redirectionio/libredirectionio/archive/master.zip
unzip libredirectionio-master.zip
cd /tmp/libredirectionio-master
autoreconf -i && \
    ./configure && \
    make clean && \
    make && \
    make install

# get nginx sources
cd /root
NGINX_VERSION=`nginx -v 2>&1 | gawk 'match($0,/nginx version: nginx\/([0-9\.]+?)/,a) {print a[1]}'` && \
    echo $NGINX_VERSION && \
    wget http://nginx.org/download/nginx-$NGINX_VERSION.tar.gz && \
    tar -xzvf nginx-$NGINX_VERSION.tar.gz && \
    mv /root/nginx-$NGINX_VERSION /root/nginx && \
    rm -f nginx-$NGINX_VERSION.tar.gz

# install RHEL nginx deps
yum -y --setopt=tsflags=nodocs install \
        redhat-rpm-config \
        gd-devel \
        libxml2-devel \
        libxslt-devel \
        openssl-devel \
        pcre-devel \
        perl-ExtUtils-Embed && \
    yum clean all

# download nginx redirection.io module sources
cd /tmp
wget -O libnginx-mod-redirectionio-master.zip https://github.com/redirectionio/libnginx-mod-redirectionio/archive/master.zip
unzip libnginx-mod-redirectionio-master.zip

# build the module
cd /root/nginx
yum -y install geoip-devel
yum -y install gperftools-devel
NGINX_CONFIGURE_ARGUMENTS=`nginx -V 2>&1 | grep 'configure arguments:' | cut -d\  -f3- | sed "s/ --with-cc-opt='/ --with-cc-opt='-I\/tmp\/libredirectionio-master\/target /" | sed "s/ --with-ld-opt='/ --with-ld-opt='-L\/tmp\/libredirectionio-master\/target\/release /"` && \
    NGINX_MODULES_PATH=`nginx -V 2>&1 | gawk 'match($0,/--modules-path=(\S+?)/,a) {print a[1]}'` && \
    eval "CFLAGS=-Wno-error ./configure $NGINX_CONFIGURE_ARGUMENTS --add-dynamic-module=/tmp/libnginx-mod-redirectionio-master" && \
    make -j modules && \
    cp objs/ngx_http_redirectionio_module.so $NGINX_MODULES_PATH/ngx_http_redirectionio_module.so

systemctl restart nginx
