"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const favorites_1 = require("../controllers/favorites");
const auth_1 = require("../middlewares/auth");
exports.default = (router) => {
    router.get("/favorites", auth_1.auth, favorites_1.getFavorites);
    router.post("/launches/:flight_number/favorite", auth_1.auth, favorites_1.addFavorite);
    router.delete("/launches/:flight_number/favorite", auth_1.auth, favorites_1.removeFavorite);
};
