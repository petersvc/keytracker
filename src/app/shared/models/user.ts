export interface User {
    id: string;
    name: string;
    username: string;
    masterPassword: string;
}

// export class User {
//
//   constructor(
//     private readonly _userId: string,
//     private _name: string,
//     private _username: string,
//     private _masterPassword: string,
//   ) {}
//
//   get userId(): string {
//     return this._userId;
//   }
//
//   get name(): string {
//     return this._name;
//   }
//
//   set name(value: string) {
//     this._name = value;
//   }
//
//   get username(): string {
//     return this._username;
//   }
//
//   set username(value: string) {
//     this._username = value;
//   }
//
//   get masterPassword(): string {
//     return this._masterPassword;
//   }
//
//   set masterPassword(value: string) {
//     this._masterPassword = value;
//   }
//
// }
