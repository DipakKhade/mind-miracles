"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRouter = void 0;
const express_1 = require("express");
exports.clientRouter = (0, express_1.Router)();
const db_1 = require("../db/db");
exports.clientRouter.post('/contact', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const { name, phone, email, subject, message } = data;
    try {
        const data = yield db_1.db.contact.create({
            data: {
                name, phone, email, subject, message
            }
        });
        console.log(data);
        return res.status(200).json({
            "success": true,
            data
        });
    }
    catch (e) {
        console.log(e);
    }
}));
exports.clientRouter.post('/inquiry', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = req.body;
    const { name, age, gmail, place, whatsappno } = data;
    try {
        const data = yield db_1.db.inquiry.create({
            data: {
                name, place, age, gmail, whatsappno
            }
        });
        console.log(data);
        return res.status(200).json({
            "success": true,
            data
        });
    }
    catch (e) {
        console.log(e);
    }
}));
