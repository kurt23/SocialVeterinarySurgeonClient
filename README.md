
# VeterinarySurgeon

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.3.

## How to run

To run client you need:
1)[Node.js](https://nodejs.org/en/)
2)[Angular CLI](https://cli.angular.io/) (after Node.js installation run  `npm install -g @angular/cli`)
Run `npm update`, then run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

By default working with server running on 5000 port, if you run server on different port, for example 5050, change it in environment.ts:

export const environment = {
  production: false,
  appUrl: 'http://localhost:5050/'
};
