"use strict";
/**
 * This file was auto-generated by Fern from our API Definition.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
function register(expressApp, services) {
    expressApp.use("/", services.folderA.service.toRouter());
    expressApp.use("/", services.foo.toRouter());
}
exports.register = register;