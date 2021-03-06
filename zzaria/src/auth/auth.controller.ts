/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, HttpException, HttpStatus, Query, Req, Res } from "@nestjs/common";
import { UserResponseObject } from "axeroni";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

@Controller("api")
export class AuthController {
    constructor(private service: AuthService) {}

    @Get("login")
    // @UseGuards(LoginAuthGuard)
    public async login(@Res() res: Response): Promise<void> {
        return this.service.login(res);
    }

    @Get("login/redirect")
    // @UseGuards(LoginAuthGuard)
    public async redirect(@Req() req: Request, @Res() res: Response): Promise<void> {
        return this.service.redirect(req, res);
    }

    @Get("me")
    public async me(@Req() req: Request): Promise<UserResponseObject> {
        if (!req.header("X-Access-Token") || !req.header("X-Refresh-Token"))
            throw new HttpException("No credentials provided", HttpStatus.BAD_REQUEST);

        try {
            return <UserResponseObject>(
                (await this.service.me(req.header("X-Access-Token"), req.header("X-Refresh-Token"))).user
            );
        } catch {
            throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }
    }

    @Get("test/login")
    public testLogin(
        @Query("type") type: "tokens",
        @Res() res: Response
    ): Promise<void | { accessToken: string; refreshToken: string }> {
        console.log(type);
        return this.service.loginWithTestUser(type, res);
    }
}
