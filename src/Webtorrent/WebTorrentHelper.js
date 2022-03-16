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
    fileStreamLink = (id, fileName) => {
        return this.config.baseUrl + "/file/stream/" + fileName + "?fileid=" + id;
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
}
