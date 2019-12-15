#!/usr/bin/expect

set index_bak_js "http://192.168.43.226:81/index_bak.js"
set index_bak_html "http://192.168.43.226:81/index_bak.html"
spawn telnet 192.168.43.13
expect "login: "
send "root\n"
expect "Password: "
send "cat1029\n"

expect "# "
send "cd /bin/vs/web\r"
expect "# "

send "rm index.html\r"
expect "# "

send "wget -O index.html $index_bak_html\r"

expect "# "

send "cd /bin/vs/web/js\r"
expect "# "
send "rm index.js\r"
expect "# "
send "wget -O index.js $index_bak_js\r"

expect "# "
send "exit\r"

interact 

