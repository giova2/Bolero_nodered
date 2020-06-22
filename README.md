# Bowling project using node-red Vuejs and gsap

The docker-compose.yml is included

Do this:

in this directory execute:
## 1.

from console execute: docker-compose up

this will put up and running the docker server on port 1880

## 2.

Go to Manage palette and install the next packages:

- cn-dashboard-nodes
- node-red
- node-red-contrib-mqtt-broker
- node-red-contrib-uibuilder
- node-red-dashboard
- node-red-node-rbe
- node-red-node-tail

## 3.

Inside the uibuilder node (double click on uibuilder node in the flow "Comunicacion"):
go to manage front-end libraries and install:

- vue
- bootstrap
- bootstrap-vue
- jquery
- gsap

## 4.

go to localhost:1880 and import flows.json

## 5.

from console execute: docker cp BOLERO_PATH/src NAME_OF_YOUR_CONTAINER:/data/uibuilder/uibuilder

## 6.

Visit localhost:1880/uibuilder/



