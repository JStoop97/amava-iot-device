<script setup>
import { useLedStore } from './stores/stores.js'
// import { JSON }
// import { Buffer } from 'util'
const led = useLedStore()

import { IoTDataPlaneClient, PublishCommand } from "@aws-sdk/client-iot-data-plane"; // ES Modules import


const creds = {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
};

const client = new IoTDataPlaneClient({
  tls: true,
  region: "eu-central-1",
  credentials: creds
});


function update_led(value)
{
  console.log("update_led")
  // if (value == 0)
  // {
    let led_json = JSON.parse('{' +
    '"led": {' +
    '"power": '+ Number(value).toString() + 
    '}'+ 
    '}')
    console.log("sending json: " + JSON.stringify(led_json))
    var payload = new TextEncoder().encode(JSON.stringify(led_json))
    var payload = new TextEncoder().encode(JSON.stringify(led_json))
        const input = { // PublishRequest
      topic: "/filter/PotSubPubLED", // required
      qos: 0,
      retain: false,
      payload: payload, // e.g. Buffer.from("") or new TextEncoder().encode("")
      payloadFormatIndicator: "UTF8_DATA",
    };
    const command = new PublishCommand(input)
    client.send(command)

}

</script>

<template>
  <header>
    <img alt="Amava logo" class="logo" src="./assets/amava-logo.png" width="125" height="125" />
    <div class="wrapper">
      <div class="greetings">
        <h1 class="yellow">Amava Projects testing</h1>
        <h3>
          Remote device testing
        </h3>
      </div>
    </div>
  </header>

  <main>
    <v-switch label="LED" v-model="led.cond" v-on:update:model-value="update_led"></v-switch>
    <h3>led value: {{led.cond}}</h3>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
@/stores/stores