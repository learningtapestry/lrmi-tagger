Deploy Ruby project 
on RHEL 6 server


Overview

This document is to guide how to deploy lrmi-tagger project on RHEL 6 server.
Lrmi-tagger project use Ruby 2.1.* and Nginx and Passenger integration.
The project is on “https://github.com/actualize-technology/lrmi-tagger”.

To deploy it you need to follow these steps :

1. Install Ruby 2.1.* using RVM
2. Get source code from git.
3. Install Passenger with Nginx.
4. Configure Nginx and start service.
5. Configure prject.


1. Install Ruby 2.1.* using RVM

 - You need to install RVM first.

	Installing the stable release version of RVM:
		\curl -sSL https://get.rvm.io | bash -s stable
	To get the latest development state for only RVM (recommended):
		\curl -sSL https://get.rvm.io | bash

	( if you get error, then please install following pakages.
		sudo yum install curl
		sudo yum install gcc-c++ patch readline readline-devel zlib zlib-devel 
		sudo yum install libyaml-devel libffi-devel openssl-devel make 
		sudo yum install bzip2 autoconf automake libtool bison iconv-devel
	)

	after installing RVM, to start it you need to run following command in all 	your open shall window.
		source ~/.profile	


 - Install Ruby 2.1.*

	To install release ruby version (Recommended) : 
		rvm install 2.1 (then 2.1.5 will be installed)
	To install specific ruby version (ex : 2.1.1) :
		rvm install 2.1.1

	If you get message to ask username and password, then you can ignore it by 	clicking ctrl+C.



2. Get source

 - You need to install git first.

	sudo yum install git

 - Clone lrmi-tagger project to RHEL 6 server.

	sudo git clone https://github.com/actualize-technology/lrmi-tagger [folder 	name]
   [folder name] is local holder on Ubuntu server. Lets do it “lrmi-tagger”
   then command is following :
	sudo git clone https://github.com/actualize-technology/lrmi-tagger lrmi-	tagger

 - bundle install

   go to lrmi-tagger directory and following command:
	bundle install


3. Install Passenger with Ngnix

 - Install Passenger

	gem install passenger

 - phusion passenger for Nginx

	rvmsudo passenger-install-nginx-module

   It is recommended that you relax permissions as follows: click ctrl+c and following command.
	sudo chmod o+x "/home/[your account]"

  run “rvmsudo passenger-install-nginx-module” again
  
  and according to the install guide,
   * To install Curl development headers with SSL support:
   	sudo yum install libcurl-devel

   * To install Ruby development headers:
   	sudo yum install ruby-devel

  if your virtual memory is small than 1024M, then you can set swap.
	sudo dd if=/dev/zero of=/swap bs=1M count=1024
  	sudo mkswap /swap
	sudo swapon /swap

  and Ngnix install again, Passenger offers users the choice between an automated setup or a customized one. Press 1 and enter to choose the recommended, easy, installation.




4. Config Nginx and start service

 - open config file

	 sudo nano /opt/nginx/conf/nginx.conf

 - Configuration Nginx conf file.


 	You can refer attached nginx.conf file, improtant area is following :
	server {
        listen 80;
        server_name lrmitagger.org www.lrmitagger.org;
	  root /home/ruby-guy/lrmi-tagger/public;
        passenger_enabled on;
        passenger_friendly_error_pages on;
        rails_env production;
    }

  you need to set root directory as full path of your lrmi-tagger/public directory on Ubuntu server

- Run Ngnix server

  	sudo service nginx start 

if there is "nginx: unrecognized service" error, it means that the startup scripts need to be created. Here are commands for it.

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

##################################################################################3



	sudo chmod +x /etc/init.d/nginx


then you can control Ngnix service now.
	sudo service nginx stop 
	sudo service nginx start 
	sudo service nginx restart
	sudo service nginx reload

if there is “Starting nginx: nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)” error, then you can do as following :
	sudo service nginx stop
	sudo fuser -k 80/tcp
	sudo service nginx start

if there is “Starting nginx: nginx.”, then it is completed successfully.


	

5. Configure lrmi-tagger project

you need to go to lrmi-tagger/config directory and copy learning_registry-sample.yml and rename it as learning_registry.yml.


Then Project is deployed successfully,
when you enter the RHEL 6 server address on web browser, you can check lrmi-tagger web page.



