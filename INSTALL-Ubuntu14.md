Deploy Ruby project 
on Ubuntu 14.0.4 server


Overview

This document is to guide how to deploy lrmi-tagger project on Ubuntu 14.0.4 server.
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

	Before installing RVM, you need to install curl.
		sudo apt-get install curl

	and then you need to install mpapis public key.
		gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
	sometimes you can get error, then you can use it.
		gpg2 --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
	now, you can install RVM.

	Installing the stable release version of RVM:
		\curl -sSL https://get.rvm.io | bash -s stable
	To get the latest development state for only RVM (recommended):
		\curl -sSL https://get.rvm.io | bash

	after installing RVM, to start it you need to run following command in all your open shall window,
		source /home/ruby-guy/.rvm/scripts/rvm	
	or in rare cases you need to reopen all shell windows.

 - Install Ruby 2.1.*

	To install release ruby version (Recommended) : 
		rvm install 2.1 (then 2.1.5 will be installed)
	To install specific ruby version (ex : 2.1.1) :
		rvm install 2.1.1




2. Get source

 - You need to install git first.

	sudo apt-get install git

 - Clone lrmi-tagger project to Ubuntu 14.0.4 server.

	git clone https://github.com/actualize-technology/lrmi-tagger [folder name]
   [folder name] is local holder on Ubuntu server. Lets do it “lrmi-tagger”
   then command is following :
	git clone https://github.com/actualize-technology/lrmi-tagger lrmi-tagger

 - bundle install

   go to lrmi-tagger directory and following command:
	bundle install


3. Install Passenger with Ngnix

 - Install Passenger

	gem install passenger

 - phusion passenger for Nginx

	rvmsudo passenger-install-nginx-module

   Passenger first checks that all of the dependancies it needs to work are   	installed.    
   If you are missing any, Passenger will let you know how to install them, either 	with the apt-get installer on Ubuntu.
   After you download any missing dependancies, restart the installation. Type: 	rvmsudo  passenger-install-nginx-module once more into the command line.
   (	
	You may need to run following :
   	To install Curl development headers with SSL support:
		sudo apt-get install libcurl4-openssl-dev 
   )

   and Ngnix install again, Passenger offers users the choice between an automated    	setup or a customized one. Press 1 and enter to choose the recommended, easy, 	installation.

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

	# Download nginx startup script
	sudo wget -O init-deb.sh https://www.linode.com/docs/assets/660-init-deb.sh

	# Move the script to the init.d directory & make executable
	sudo mv init-deb.sh /etc/init.d/nginx
	sudo chmod +x /etc/init.d/nginx

	# Add nginx to the system startup
	sudo /usr/sbin/update-rc.d -f nginx defaults

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

Then Project is deployed successfully, when you enter Ubuntu 14.0.4 server address on web browser, you can check lrmi-tagger web page.
