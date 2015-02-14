# Installation Instructions for Ubuntu 14 Server

## Overview

This document is to guide how to deploy lrmi-tagger project on an Ubuntu 14 server.  The LRMI Tagger project uses Ruby 2.1.x and Nginx/Passenger as a web server.

To install it you need to follow these steps:

1. Install Ruby 2.1.* using RVM
2. Obtain source code from git.
3. Install Passenger with Nginx.
4. Configure Nginx and start service.
5. Configure project.

## Installation

### 1. Install Ruby 2.1.x using RVM

*Install RVM*

Before installing RVM, you need to install curl.

```sudo apt-get install curl```

and then you need to install mpapis public key.

```gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3```

If you receive an error, use gpg2:

```gpg2 --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3```

Now, install RVM:

Installing the stable release version of RVM:

```\curl -sSL https://get.rvm.io | bash -s stable```
	
After installing RVM, to start it you need to run following command:

```source ~/.rvm/scripts/rvm```	

*Install Ruby 2.1.x*

To install release Ruby version: 

```rvm install 2.1 (the current release of 2.1.x will be installed)```

### 2. Obtain source code

Install git tools and curl development headers with SSL support:

```sudo apt-get install git libcurl4-openssl-dev```

Clone lrmi-tagger project to Ubuntu 14.0.4 server.

```git clone https://github.com/actualize-technology/lrmi-tagger```

Run bundle install

Go to lrmi-tagger directory and following command:

```bundle install```

### 3. Install Passenger with Ngnix

Install Passenger

```gem install passenger```

Configure Phusion Passenger for Nginx

```rvmsudo passenger-install-nginx-module```

Passenger checks that all dependancies are installed.  If any are missing, Passenger will let you know how to install them, either with the apt-get installer on Ubuntu.  After you download any missing dependancies, restart the installation. Type: ```rvmsudo passenger-install-nginx-module``` once more into the command line.

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

If there is "nginx: unrecognized service" error, it means that the startup scripts need to be created. Here are commands for it.

Download nginx startup script
```sudo wget -O init-deb.sh https://www.linode.com/docs/assets/660-init-deb.sh```

Move the script to the init.d directory & make executable
```
sudo mv init-deb.sh /etc/init.d/nginx
sudo chmod +x /etc/init.d/nginx
```
Add nginx to the system startup
```sudo /usr/sbin/update-rc.d -f nginx defaults```

You can control Ngnix service using:
```
	sudo service nginx stop 
	sudo service nginx start 
	sudo service nginx restart
	sudo service nginx reload
```

### 5. Configure lrmi-tagger project

You need to go to lrmi-tagger/config directory and copy learning_registry-sample.yml and rename it as learning_registry.yml.

The project should be deployed successfully, when you enter http://[server-address] on web browser, the LRMI Tagger home page should show.
