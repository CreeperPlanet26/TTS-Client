/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get("api")
    getHello(): string {
        return this.appService.getHello();
    }
}
