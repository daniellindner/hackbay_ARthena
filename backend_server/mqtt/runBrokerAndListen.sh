#!/bin/sh

sudo mosquitto -c /etc/mosquitto/mosquitto.conf &
mosquitto_sub -h localhost -t machine_events/#
disown