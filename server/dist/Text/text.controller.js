"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var _ = require('lodash');
var TextController = /** @class */ (function () {
    function TextController() {
        var _this = this;
        this.path = '/text';
        this.router = express.Router();
        this.dataFromImage = function (req, res) {
            _this.extractTextFromImage()
                .then(_this.understandingText)
                .then(function (entities) {
                res.json({
                    entities: entities,
                });
            });
        };
        this.understandingText = function (text) { return __awaiter(_this, void 0, void 0, function () {
            var language, client, document, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        language = require('@google-cloud/language');
                        client = new language.LanguageServiceClient();
                        document = {
                            content: text,
                            type: 'PLAIN_TEXT'
                        };
                        return [4 /*yield*/, client.analyzeEntities({ document: document })];
                    case 1:
                        result = (_a.sent())[0];
                        console.log("Entidades encontradas no texto: ");
                        console.log(result.entities);
                        return [2 /*return*/, result.entities];
                }
            });
        }); };
        this.extractTextFromImage = function () { return __awaiter(_this, void 0, void 0, function () {
            var vision, client, result, text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vision = require('@google-cloud/vision');
                        client = new vision.ImageAnnotatorClient();
                        return [4 /*yield*/, client.documentTextDetection('./../images/doc2.jpeg')];
                    case 1:
                        result = (_a.sent())[0];
                        text = result.fullTextAnnotation.text;
                        console.log("Texto encontrado na imagem: ");
                        console.log(text);
                        return [2 /*return*/, text];
                }
            });
        }); };
        this.initializeRoutes();
    }
    TextController.prototype.initializeRoutes = function () {
        this.router.post(this.path, this.dataFromImage);
    };
    return TextController;
}());
exports.default = TextController;
//# sourceMappingURL=text.controller.js.map