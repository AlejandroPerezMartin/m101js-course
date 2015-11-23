#!/usr/bin/env bash

mkdir -p /data/db/rs1 /data/db/rs2 /data/db/rs3
mongod --replSet replica_Set --logpath "1.log" --dbpath /data/db/rs1 --port 30001 --oplogSize 64 --fork --smallfiles
mongod --replSet replica_Set --logpath "2.log" --dbpath /data/db/rs2 --port 30002 --oplogSize 64 --smallfiles --fork
mongod --replSet replica_Set --logpath "3.log" --dbpath /data/db/rs3 --port 30003 --oplogSize 64 --smallfiles --fork
