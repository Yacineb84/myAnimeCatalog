function api() {
    const getTopAnime = async () => {
        return await fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity").then((res) => res.json());
    };

    const getAnimeByName = (name) => {
        return fetch("https://api.jikan.moe/v4/anime?q=" + name).then((res) => res.json());
    };

    const getAnimeById =  (id) => {
        return  fetch("https://api.jikan.moe/v4/anime/" + id + "/full").then((res) => res.json());
    };

    const getAllAnime = () => {
        return fetch("https://api.jikan.moe/v4/anime").then((res) => res.json());
    };

    const getAnimeEpisodes = (id,page) => {
        return fetch("https://api.jikan.moe/v4/anime/" + id + "/episodes?page="+page).then((res) => res.json());
    };

    const getGenres = () => {
        return fetch("https://api.jikan.moe/v4/genres/anime").then((res) => res.json());
    };

    const getAnimeByPage = (page) => {
        return fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity&page=" + page).then((res) => res.json());
    };

    const getAnimeByGenre = (genreId,page) => {
        return fetch("https://api.jikan.moe/v4/anime?genres=" + genreId + "&page="+ page).then((res) => res.json());
    };


    return {
        getTopAnime,
        getAnimeByName,
        getAllAnime,
        getAnimeEpisodes,
        getAnimeById,
        getGenres,
        getAnimeByPage,
        getAnimeByGenre
    };
}

export default api();