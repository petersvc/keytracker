export class Password {
  constructor(
    private _application: string,
    private _passphrase: string,
    private _description: string,
    private readonly _userId: string,
  ) {}

  get passphrase(): string {
    return this._passphrase;
  }

  set passphrase(value: string) {
    this._passphrase = value;
  }

  get application(): string {
    return this._application;
  }

  set application(value: string) {
    this._application = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get userId(): string {
    return this._userId;
  }
}
