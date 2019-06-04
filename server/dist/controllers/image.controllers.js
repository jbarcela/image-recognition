"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var ImageController = /** @class */ (function () {
    function ImageController() {
        this.path = "/image";
        this.router = express.Router();
        this.extractDataFromImage = function (req, res) {
            //get file image
            //call google
            //call watson
            //process response        
        };
        this.initializeRoutes();
    }
    ImageController.prototype.initializeRoutes = function () {
        this.router.post(this.path, this.extractDataFromImage);
    };
    return ImageController;
}());
exports.default = ImageController;
//# sourceMappingURL=image.controllers.js.map