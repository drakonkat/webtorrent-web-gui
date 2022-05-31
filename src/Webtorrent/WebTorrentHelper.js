import axios from "axios";


export class WebTorrentHelper {

    config = {
        baseUrl: ""
    }

    constructor(config) {
        this.config = config
        this.axios = axios.create({
            baseURL: this.config.baseUrl,
            timeout: 120000,
            headers: {'X-Custom-Header': 'foobar'}
        });
    }

    addTorrent = (data) => {
        return this.axios({
            method: "post",
            url: "/torrent/add",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        });
    }
    pauseTorrent = (data) => {
        return this.axios({
            method: "post",
            url: "/torrent/pause",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        });
    }
    removeTorrent = (data) => {
        return this.axios({
            method: "post",
            url: "/torrent/remove",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        });
    }
    destroyTorrent = (data) => {
        return this.axios({
            method: "post",
            url: "/torrent/destroy",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        });
    }
    checkStatus = () => {
        return this.axios({
            method: "get",
            url: "/torrent/check-status",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    getConf = () => {
        return this.axios({
            method: "get",
            url: "/config/",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    saveConf = (data) => {
        return this.axios({
            method: "post",
            url: "/config/edit",
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        });
    }
    listFiles = () => {
        return this.axios({
            method: "get",
            url: "/file/list",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    fileOpen = (id) => {
        return this.axios({
            method: "get",
            url: "/file/open?fileid=" + id,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    fileStream = (id) => {
        return this.axios({
            method: "get",
            url: "/file/stream?fileid=" + id,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    fileStreamLink = (id, fileName, remote) => {
        let url = "file/stream/" + fileName + "?fileid=" + id;
        if (!remote || this.config.baseUrl.includes("http")) {
            return this.config.baseUrl + "/" + url;
        } else {
            let protocol = window.location.protocol;
            let domain = window.location.hostname;
            let port = window.location.port;
            return `${protocol}//${domain}${port ? (":" + port) : ""}` + url
        }
    }
    getTorrentFile = (id, fileName, remote) => {
        let url = "torrent/get-file/" + fileName + "?torrentId=" + id;
        if (!remote || this.config.baseUrl.includes("http")) {
            return this.config.baseUrl + "/" + url;
        } else {
            let protocol = window.location.protocol;
            let domain = window.location.hostname;
            let port = window.location.port;
            return `${protocol}//${domain}${port ? (":" + port) : ""}` + url
        }
    }
    search = (q) => {
        if (!q) {
            q = "2022";
        }
        return this.axios({
            method: "get",
            url: "/file/search?q=" + q,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    searchMovie = (q) => {
        if (!q) {
            q = "2022";
        }
        return this.axios({
            method: "get",
            url: "/file/movie?q=" + q,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    searchTv = (q) => {
        if (!q) {
            q = "2022";
        }
        return this.axios({
            method: "get",
            url: "/file/tvshow?q=" + q,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    searchGames = (q) => {
        return this.axios({
            method: "get",
            url: "/file/games/fitgirl/?q=" + q,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


    getIndexer = () => {
        return this.axios({
            method: "get",
            url: "/indexer",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    getCategory = () => {
        return this.axios({
            method: "get",
            url: "/category",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    addCategory = (data) => {
        return this.axios({
            method: "post",
            url: "/category",
            headers: {
                'Content-Type': 'application/json'
            },
            data
        });
    }

    restoreCategory = () => {
        return this.axios({
            method: "patch",
            url: "/category",
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    editCategory = (id, data) => {
        return this.axios({
            method: "PUT",
            url: "/category/" + id,
            headers: {
                'Content-Type': 'application/json'
            },
            data
        });
    }

    deleteCategory = (id) => {
        return this.axios({
            method: "DELETE",
            url: "/category/" + id,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    searchIndexer = (type, q = " ") => {
        return this.axios({
            method: "get",
            url: "/indexer/" + type + "?q=" + q,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

