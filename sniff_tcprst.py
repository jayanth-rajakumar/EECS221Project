import pyshark
import subprocess
import time

prev=''
prevtime=0
camera_ip='192.168.0.26'
allowed_ips=['192.168.0.11','192.168.0.28']

capture=pyshark.LiveCapture(interface='enp0s3',display_filter='ip.dst==' + camera_ip)
capture.sniff(timeout=50)
for packet in capture.sniff_continuously():
    if(str(packet.ip.src) not in allowed_ips and (str(packet.ip.src)!=prev or int(time.time())-prevtime>5)):
        prev=packet.ip.src
        prevtime=int(time.time())
        cmd='sudo timeout 3 netwox 78 --filter \"src host ' + str(packet.ip.src) + ' and dst host ' + camera_ip + '\" -i ' + str(packet.ip.src)
        print(cmd)
        try:
            subprocess.check_output(cmd,shell=True)
        except:
            pass
    




