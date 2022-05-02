import * as Entities from '@snapperfish/entities'
import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { isAdmin, isCustomer } from './user';

const tryCatch = <T>(catchFn: (err: Error) => T) => (tryFn: () => T): T => {
  try {
    return tryFn()
  } catch (error) {
    return catchFn(error);
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':email')
  getWelcomeByRole(@Param('email') maybeEmail: string) {
    
    const email = tryCatch<Entities.Email>(
      (error) => {
        if (error instanceof Entities.IsNotEmail) {
          throw new HttpException('Not valid email syntax', HttpStatus.BAD_REQUEST);
        }

        throw error;
      }
    )
    (
      () => Entities.email(maybeEmail)
    );

    const user = this.appService.retrieveUserByEmail(email);

    if (isAdmin(user)) {
      return `Hello ${user.info.firstname}, command me my liege.`
    }

    if (isCustomer(user)) {
      return `Hello ${user.info.firstname}. Please buy something, we need the monies.`
    }

    return `Hello, please create a profile to be accepted into the clan`
  }
}
