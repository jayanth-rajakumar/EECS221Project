# EECS221Project
Scripts related to EECS 221 - Advanced System Security project

## Phishing Files
Directory containing files to be hosted on to a web server accessible from the camera. In phishing_attack.zip/Google/login.html, the action attribute in the form needs to be changed to the valid webserver IP address and port.
Google page source: https://github.com/Manina123/GOOGLE-Phishing-Page

## phishing_attack.sh
Script that deploys the attack files from the web server to the camera using the expect utility. phishing_attack_zip and the camera IP address may need to be changed.

Dependencies: expect

## phishing_restore.sh
Script to restore the default camera web page. Paths of index.js and index.html may need to be updated.

Dependencies: expect

## phishing_server.py
Python HTTP server to listen for the credentials from the fake Google login page. Port can be changed as required.

## sniff_tcprst.py
Python script to sniff packets and send TCP RST to unauthorized devices trying to connect to the camera. The camera IP and list of allowed IPs need to be updated.

Dependencies: pyshark, netwox