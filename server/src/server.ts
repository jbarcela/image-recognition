import App from './app';

import ImageController from './controllers/image.controller'
 
const app = new App(
  [
    new ImageController(),
  ],
  5000,
);
 
app.listen();