import { Injectable } from '@nestjs/common';
import { connect, MqttClient } from 'mqtt/*';

@Injectable()
export class MqttService {
    public readonly mqtt: MqttClient;

    constructor() {
        this.mqtt = connect(process.env.connectUrl, {
            clientId: process.env.clientId || null,
            clean: true,
            connectTimeout: parseInt(process.env.connectTimeout, 10),
            username: process.env.username,
            password: process.env.password,
            reconnectPeriod: parseInt(process.env.reconnectPeriod, 10)
        });

        this.mqtt.on('connect', () => console.log('Connected to MQTT Server.'));

        this.mqtt.subscribe('/from-device', {qos: 1});

        this.mqtt.on('message', (topic, message) => {
            console.log('New message received !');
            console.log(message.toString());
        });
    }
}
