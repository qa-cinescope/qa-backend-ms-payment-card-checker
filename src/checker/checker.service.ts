import { Injectable } from "@nestjs/common";
import { CardCheckerDto } from "./dto";
import { ConfigService } from "@nestjs/config";
import { CheckerResponse } from "./responses";
import { Status } from "./types";

@Injectable()
export class CheckerService {
  constructor(private readonly configService: ConfigService) {}

  private CARD_SUCCESS_NUMBER = this.configService.get("CARD_SUCCESS_NUMBER", "1111111111111111");
  private CARD_SUCCESS_EXPIRATION_DATE = this.configService.get(
    "CARD_SUCCESS_EXPIRATION_DATE",
    "01/22",
  );
  private CARD_SUCCESS_CODE = +this.configService.get<number>("CARD_SUCCESS_CODE", 123);

  checkCard(dto: CardCheckerDto): CheckerResponse {
    if (
      !dto.card ||
      !dto.card.cardNumber ||
      !dto.card.securityCode ||
      !dto.card.expirationDate ||
      !dto.total
    ) {
      return {
        status: Status.ERROR,
      };
    }

    if (
      dto.card.cardNumber === this.CARD_SUCCESS_NUMBER &&
      dto.card.securityCode === this.CARD_SUCCESS_CODE &&
      dto.card.expirationDate === this.CARD_SUCCESS_EXPIRATION_DATE
    ) {
      return {
        status: Status.SUCCESS,
      };
    } else {
      return {
        status: Status.INVALID_CARD,
      };
    }
  }
}
