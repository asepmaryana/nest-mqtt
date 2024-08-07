import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MqttService } from './mqtt/mqtt.service';

@Controller()
export class AppController {

  constructor(private readonly mqttService: MqttService) {}

  @Post()
  getHello(): string {
    this.mqttService.mqtt.publish(
      '/from-device',
      'This is our message',
      { qos: 1, retain: true },
      (error) => console.log(error)
    );

    return 'message sent !';
  }
}
