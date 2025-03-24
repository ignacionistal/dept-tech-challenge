import { addFavorite, getFavorites, removeFavorite } from "../controllers/favorites";
import { auth } from "../middlewares/auth";

export default (router) => {
  router.get("/favorites", auth, getFavorites);
  router.post("/launches/:flight_number/favorite", auth, addFavorite);
  router.delete("/launches/:flight_number/favorite", auth, removeFavorite);
};
