"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MATERIAL_CONFIG = exports.Material = void 0;
var Material;
(function (Material) {
    Material["WOOD"] = "WOOD";
    Material["BRONZE"] = "BRONZE";
    Material["PLATINUM"] = "PLATINUM";
})(Material || (exports.Material = Material = {}));
exports.MATERIAL_CONFIG = (_a = {},
    _a[Material.WOOD] = {
        weightMultiplier: 1,
        priceMultiplier: 1,
    },
    _a[Material.BRONZE] = {
        weightMultiplier: 12.4,
        priceMultiplier: 2,
    },
    _a[Material.PLATINUM] = {
        weightMultiplier: 30.3,
        priceMultiplier: 18
    },
    _a);
