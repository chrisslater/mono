import * as Entities from '@snapperfish/entities';
import { Injectable } from '@nestjs/common';
import * as User from './user';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  retrieveUserByEmail(email: Entities.Email): User.User {
    const admins = [
      'admin@snapper.fish'
    ]

    const customers = [
      'customer@snapper.fish'
    ]
    
    const users = {
      admin: {
        firstname: 'John',
        lastname: 'doe'
      },
      
      customer: {
        firstname: 'jack',
        lastname: 'sparrow'
      } 
    }

    if (admins.includes(email.value)) {
      return User.Admin.create(
        User.PersonalInfo.create(
          email,
          users.admin.firstname,
          users.admin.lastname,
        )
      );
    } else if (customers.includes(email.value)) {
      return User.Admin.create(
        User.PersonalInfo.create(
          email,
          users.admin.firstname,
          users.admin.lastname,
        )
      );
    } else {
      return User.Unauthorised.create()
    }
  }
}
