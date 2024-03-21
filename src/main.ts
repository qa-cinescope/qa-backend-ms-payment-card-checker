import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: `checker-${Math.floor(Math.random() * 1000)}`,
        brokers: [configService.get<string>("KAFKA_BROKER", "localhost:9092")],
      },
      consumer: {
        groupId: "checker-consumer",
      },
    },
  });

  await app.startAllMicroservices();
  console.log("Card checker service is listening...");
}
bootstrap();
