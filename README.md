# IOT Device Webpage

## Overview
This repo contains a test website for a IoT device webpage. It is built with node, uses the vue framework and packaged for browser using vite. The Vuetify component framework is used for buttons etc. Pinia is used for keeping track of states but is not necessary. Connecting to AWS IoT uses the aws-iot-device-sdk-v2 package. More info on this package can be found [here](https://github.com/aws/aws-iot-device-sdk-js-v2/tree/main).

## Structure

Set up for the various libraries is contained in `main.js`. A favicon for the Amava logo is kept in components and added to `index.html`. The bulk of the important functionality is contained in `src/App.vue`. In `src/stores/stores.js` a small example of a store is used for a reactive variables.

### App.vue
Here a connection is made to the AWS IoT endpoint (obtained in the AWS IoT console). It connects to the IoT Core servers and authenticates through the default custom authorizer (authorizer is not specified). For more info on authorizers please see [this](https://docs.aws.amazon.com/iot/latest/developerguide/custom-authorizer.html). Custom authorizer connect using the sdk examples can be found [here](https://github.com/aws/aws-iot-device-sdk-js-v2/tree/main/samples/browser/custom_authorizer_connect). To ensure better security usernames, a stronger password and signed tokens can be set up or an even better approach would be to use AWS Cognito instead of a custom authorizer. 

After connecting to IoT Core it subscribes to the topic where the Pot values are published and updates a slider component. It also creates a switch and when the switch is triggered publishes to the same topic which will update the Led. In future a device shadow should be created for keeping track of the current state of the device.

Further examples for aws-iot-device-sdk-v2 for browser (NB: browser examples must be used and not node examples since this is intended to run on browser only) can be found [here] (https://github.com/aws/aws-iot-device-sdk-js-v2/tree/main/samples/browser). 


### stores.js
The state of some variables are kept track of using the Pinia framework in this file. It is not necessary however to use pinia and this can be replaced using vue reacitivity fundementals inside a given file. More info on Pinia and Vue can be found on their respective websites. Stores are useful however as variable states can be accessed across multiple files with ease.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```