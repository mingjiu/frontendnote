### Mac OS
#### add
#### delete
#### change
> route add -net remote_net_ip gateway_ip -netmask netmask  
> route add -host host_ip local_interface_ip -interface

> eg:
sudo route add -net 10.18.8.104 172.20.200.157 -netmask netmask  
将 10.18.8.104 代理到 172.20.200.157, 即访问 10.18.8.104 时：
本地 => 172.20.20.157 => 10.18.8.104

#### 查看路由表
> netstat -nr
