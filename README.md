LRMI Tagger
===========

### Overview

This tool allows for the evaluation of digital web-based resources and tagging those resources for educational alignment according to the LRMI specification (see: http://www.lrmi.net/).  The purpose of tagging resources using LRMI is to broaden the discovery into other educational portals either via open content networks such as the Learning Registry (see: http://learningregistry.org) or search engine inclusion using RDFa.

### System Requirements

* **OS:** This tool has been tested using Ubuntu 12 and 14.  It is assumed to run under any modern Linux environment including CentOS and RedHat.
* **Language:**  Ruby 2.1.x (most recent, stable version)
* **Web Server (proxy):**  Nginx.org 1.7.x
* **Web Server (Ruby):**  Phusion Passenger is recommended, however should work with any Rack compatible server (Thin, Unicorn, etc)
* **Gems:**  Sinatra, Sinantra-Contrib and OAuth

### Installation

Please see the following installation instructions for Ubuntu or RHEL

* INSTALL-RHEL6.md - RedHat Enterprise Linux version 6
* INSTALL-Ubuntu14.md - Ubuntu 14
