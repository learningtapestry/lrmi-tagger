# Installation Instructions for RedHat Enterprise Linux 6

## Overview

This document is to guide how to deploy lrmi-tagger project on RHEL 6 server. The LRMI Tagger uses Ruby 2.1.x and Nginx/Passenger as a web server.

To deploy it you need to follow these steps :

1. Install Ruby 2.1.* using RVM
2. Get source code from git.
3. Install Passenger with Nginx.
4. Configure Nginx and start service.
5. Configure prject.

## Installation

### 1. Install Ruby 2.1.x using RVM

*Install RVM*

Install the following required prerequisite packages:

```
sudo yum install curl
sudo yum install gcc-c++ patch readline readline-devel zlib zlib-devel 
sudo yum install libyaml-devel libffi-devel openssl-devel make 
sudo yum install bzip2 autoconf automake libtool bison iconv-devel
```

Installing the stable release version of RVM:

```\curl -sSL https://get.rvm.io | bash -s stable```

After installing RVM, to start it you need to run following command:

```source ~/.profile```

*Install Ruby 2.1.x*

To install release ruby version (Recommended) : 

```rvm install 2.1 (the current release of 2.1.x will be installed)```

### 2. Obtain source code

Install git tools, curl development headers with SSL support and Ruby development headers

```sudo yum install git libcurl-devel ruby-devel```

Clone lrmi-tagger project to RHEL 6 server.

```sudo git clone https://github.com/actualize-technology/lrmi-tagger```

Run bundle install for required gems:

Go to lrmi-tagger directory and following command:

```bundle install```

### 3. Install Passenger with Ngnix

Install Passenger

```gem install passenger```

Configure Phusion Passenger for Nginx

```rvmsudo passenger-install-nginx-module```

It is recommended that you modify permissions as follows:

```sudo chmod o+x "/opt/[lrmi-tagger location]"```


If your virtual memory is small than 1024M, then you can set swap.

```
sudo dd if=/dev/zero of=/swap bs=1M count=1024
sudo mkswap /swap
sudo swapon /swap
```

Passenger offers users the choice between an automated setup or a customized one. Press 1 and enter to choose the recommended "easy installation".

### 4. Config Nginx and start service

Open the configuration file

```sudo nano /opt/nginx/conf/nginx.conf```

The configuration file should be set as:

```
server {
        listen 80;
        server_name lrmitagger.org www.lrmitagger.org;
	  root /opt/lrmi-tagger/public;
        passenger_enabled on;
        passenger_friendly_error_pages on;
        rails_env production;
    }
```

Start the Ngnix server

```sudo service nginx start```

If there is "nginx: unrecognized service" error, it means that the startup scripts need to be created. Here are commands for it:

```
# Creat nginx startup script
sudo nano /etc/init.d/nginx
# Copy following scripts to the file and save.


################################  Nginx  ##########################################

#!/bin/sh
#
# nginx - this script starts and stops the nginx daemin
#
# chkconfig:   - 85 15
# description:  Nginx is an HTTP(S) server, HTTP(S) reverse \
#               proxy and IMAP/POP3 proxy server
# processname: nginx
# config:      /opt/nginx/conf/nginx.conf
# pidfile:     /opt/nginx/logs/nginx.pid

# Source function library.
. /etc/rc.d/init.d/functions

# Source networking configuration.
. /etc/sysconfig/network

# Check that networking is up.
[ "$NETWORKING" = "no" ] && exit 0

nginx="/opt/nginx/sbin/nginx"
prog=$(basename $nginx)

NGINX_CONF_FILE="/opt/nginx/conf/nginx.conf"

lockfile=/var/lock/subsys/nginx

start() {
    [ -x $nginx ] || exit 5
    [ -f $NGINX_CONF_FILE ] || exit 6
    echo -n $"Starting $prog: "
    daemon $nginx -c $NGINX_CONF_FILE
    retval=$?
    echo
    [ $retval -eq 0 ] && touch $lockfile
    return $retval
}

stop() {
    echo -n $"Stopping $prog: "
    killproc $prog -QUIT
    retval=$?
    echo
    [ $retval -eq 0 ] && rm -f $lockfile
    return $retval
}

restart() {
    configtest || return $?
    stop
    start
}

reload() {
    configtest || return $?
    echo -n $"Reloading $prog: "
    killproc $nginx -HUP
    RETVAL=$?
    echo
}

force_reload() {
    restart
}

configtest() {
  $nginx -t -c $NGINX_CONF_FILE
}

rh_status() {
    status $prog
}

rh_status_q() {
    rh_status >/dev/null 2>&1
}

case "$1" in
    start)
	rh_status_q && exit 0
        $1
	;;
    stop)
	rh_status_q || exit 0
        $1
	;;
    restart|configtest)
        $1
	;;
    reload)
        rh_status_q || exit 7
        $1
	;;
    force-reload)
        force_reload
        ;;
    status)
	rh_status
        ;;
    condrestart|try-restart)
        rh_status_q || exit 0
            ;;
    *)
      	echo $"Usage: $0 {start|stop|status|restart|condrestart|try-restart|rel$
        exit 2
esac

##################################################################################
```

Make the script executable:

```sudo chmod +x /etc/init.d/nginx```


You can control Ngnix service using:

```
	sudo service nginx stop 
	sudo service nginx start 
	sudo service nginx restart
	sudo service nginx reload
```

If you encounter an errir "Starting nginx: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)" error, then you can do as following :

```
	sudo service nginx stop
	sudo fuser -k 80/tcp
	sudo service nginx start
```

### 5. Configure lrmi-tagger project

You need to go to lrmi-tagger/config directory and copy learning_registry-sample.yml and rename it as learning_registry.yml.

The project should be deployed successfully, when you enter http://[server-address] on web browser, the LRMI Tagger home page should show.



