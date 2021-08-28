const express = require('express');
const app = express();
const port = 8892;

const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
  instance: {
    instanceId: 'asku-image-service-8892',
    app: 'asku-image-service',
    hostName: 'asku-image-service',
    ipAddr: 'asku-image-service',
    statusPageUrl: 'http://asku-image-service:8892',
    status: `UP`,
    port: {
        $: 8892,
        "@enabled": true,
    },
    vipAddress: 'jq.test.something.com',
    dataCenterInfo: {
        "@class": 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
    },
  },
  eureka: {
    host: 'discovery',
    port: 8761,
    servicePath: '/eureka/apps/'
  },
});

client.start()

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

