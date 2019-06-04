"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var image_controller_1 = require("./controllers/image.controller");
var app = new app_1.default([
    new image_controller_1.default(),
], 5000);
app.listen();
//# sourceMappingURL=server.js.map