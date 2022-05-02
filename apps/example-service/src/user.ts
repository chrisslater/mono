import type { Email } from '@snapperfish/entities';

export class PersonalInfo {
    constructor(
        readonly email: Email,
        readonly firstname: string,
        readonly lastname: string,
    ) {}

    static create(email: Email, firstname: string, lastname: string): PersonalInfo {
        return new PersonalInfo(email, firstname, lastname);
    }
}

export class Customer {
    constructor(
        readonly info: PersonalInfo
    ) {}

    static create(info: PersonalInfo): Customer {
        return new Customer(info);
    }
}

export class Admin {
    constructor(
        readonly info: PersonalInfo
    ) {}

    static create(info: PersonalInfo): Admin {
        return new Admin(info);
    }
}

export class Unauthorised {
    static create(): Unauthorised {
        return new Unauthorised();
    }
}

export type User = Customer | Admin | Unauthorised

export const isCustomer = (user: User): user is Customer  => 
    user instanceof Customer

export const isAdmin = (user: User): user is Admin =>
    user instanceof Admin

export const isUnauthorized = (user: User): user is Unauthorised =>
    user instanceof Unauthorised