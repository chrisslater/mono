const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

export class IsNotEmail extends Error {
    static message = 'Value does not match email pattern';

    constructor() {
        super(IsNotEmail.message);
    }
}

export class Email {   
    constructor (public value: string) {}
    static create(value: string) {
        return email(value);       
    }
}

export function email(value: string): Email {
    const result = emailPattern.test(value)
    console.log('result', result);
    if (!emailPattern.test(value)) {
        throw new IsNotEmail();
    }

    return new Email(value);
}