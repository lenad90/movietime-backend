import FavoritesDAO from '../dao/favoritesDAO.js'
import MoviesDAO from '../dao/moviesDAO.js';

export default class FavoritesListController {

    static async apiGetFavoriteMovies(req, res, next) {
        try {
            let id = req.params.userId;
            let favorites = await FavoritesDAO.getFavorites(id);
            if (!favorites) {
                res.status(404).json({ error: "not found" });
                return;
            }
            let movies = [];
            for (let i = 0; i < favorites.favorites.length; i++) {
                let movie = await MoviesDAO.getMovieById(favorites.favorites[i])
                let data = {
                    id: movie._id,
                    text: movie.title,
                    poster: movie.poster
                }
                if (data !== null) {
                    movies.push(data);
                }
            }
            if (!movies) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(movies);
        } catch(e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}