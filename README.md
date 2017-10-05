## Linux Setup
##### Install Mongodb and create/grant permission to data/db directory
```sh
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
```
```sh
$ echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
```
```sh
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
```
```sh
$ sudo apt-get update
```
```sh
$ sudo apt-get -y install mongodb-org
```
```sh
$ sudo sudo mkdir -p /data/db
```
```sh
$ sudo chown `id -u` /data/db
```
