"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entries_1 = __importDefault(require("../../data/entries"));
const getEntries = () => {
    return entries_1.default;
};
const getNonSensitiveDiaries = () => {
    return entries_1.default.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};
const addDiary = () => {
    return [];
};
exports.default = {
    getEntries,
    addDiary,
    getNonSensitiveDiaries
};
