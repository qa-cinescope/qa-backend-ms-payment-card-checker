import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CheckerService } from "./checker.service";
import { CardCheckerDto } from "./dto";

@Controller()
export class CheckerController {
  constructor(private readonly checkerService: CheckerService) {}

  @MessagePattern("create.payment")
  createNewPayment(@Payload() message: CardCheckerDto) {
    return this.checkerService.checkCard(message);
  }
}
