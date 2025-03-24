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
exports.processLaunches = void 0;
/* eslint-disable camelcase */
const favorites_1 = require("./favorites");
const processLaunches = (userId, launches, rockets) => __awaiter(void 0, void 0, void 0, function* () {
    const userFavorites = yield (0, favorites_1.getUserFavorites)(userId);
    const launchesProccessedData = launches.map(launch => {
        const rocketData = rockets.find(rocket => rocket.rocket_id === launch.rocket.rocket_id);
        return {
            flight_number: launch.flight_number,
            mission_name: launch.mission_name,
            mission_patch: launch.links.mission_patch,
            details: launch.details,
            launch_date_unix: launch.launch_date_unix,
            rocket: {
                rocket_id: launch.rocket.rocket_id,
                rocket_name: rocketData.name,
                active: rocketData.active,
                cost_per_launch: rocketData.cost_per_launch,
                company: rocketData.company,
            },
            favorite: !!userFavorites.filter(favorite => favorite.flight_number === launch.flight_number).length,
        };
    });
    return launchesProccessedData;
});
exports.processLaunches = processLaunches;
