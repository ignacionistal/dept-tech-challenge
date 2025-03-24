/* eslint-disable camelcase */
import { getUserFavorites } from "./favorites";

export const processLaunches = async (userId, launches, rockets) => {
  const userFavorites = await getUserFavorites(userId);
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
    }
  });
  return launchesProccessedData;
};
