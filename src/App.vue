<script setup>
import { useLedStore, usePotStore } from './stores/stores.js'
import { mqtt } from 'aws-iot-device-sdk-v2'
import { iot } from 'aws-iot-device-sdk-v2'

const led = useLedStore()
const pot = usePotStore()

var endpoint = "a1rxjqrwt89eaj-ats.iot.eu-central-1.amazonaws.com"

function build_connection() {
    let config_builder = iot.AwsIotMqttConnectionConfigBuilder.new_default_builder();
    config_builder.with_custom_authorizer(
      "test-browser",
      "",
      "",
      "test"
    )
    config_builder.with_clean_session(true)
    config_builder.with_client_id(`custom_authorizer_connect_sample(${new Date()})`)
    config_builder.with_endpoint(endpoint)
    config_builder.with_keep_alive_seconds(30)
    const config = config_builder.build()

    const client = new mqtt.MqttClient()
    return client.new_connection(config)
}

var client = build_connection()
var pot_value
client.on("connect", (session_present) => {
    console.log("connected")
    client.subscribe( 
      "/filter/PotSubPubLED",
      mqtt.QoS.AtLeastOnce,
      (topic, payload, dup, qos, retain) => {
        const decoder = new TextDecoder("utf8");
        let message = decoder.decode(new Uint8Array(payload));
        let message_json = JSON.parse(message)
        console.log(`potValue ${message_json.potSensor.potValue}`)
        pot_value = message_json.potSensor.potValue
        pot.value_percent = pot_value
      })
    });
client.on("interrupt", (error) => {
  console.log(`Connection interrupted: error=${error}`);
});
client.on("resume", (return_code, session_present) => {
  console.log(`Resumed: rc: ${return_code} existing session: ${session_present}`);
});
client.on("disconnect", () => {
  console.log("Disconnected");
});
client.on("error", (error) => {
  console.log(error)
});

function update_led(value)
{
  let led_json = JSON.parse('{' +
    '"led": {' +
    '"power": '+ Number(value).toString() + 
    '}'+ 
    '}')
  client.publish(
    "/filter/PotSubPubLED", led_json, mqtt.QoS.AtLeastOnce
  )
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
    <v-switch label="LED" v-model="led.cond" v-on:update:model-value="update_led" thumb-label="always"></v-switch>
    <h3>led value: {{led.cond}}</h3>
    <v-slider
    max="100"
    min="0"
    readonly
    v-model="pot.value_percent"
    ></v-slider>
    <h3>pot value: {{pot.value_round}}</h3>
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