import axios from "axios";


export class WebTorrentHelper {

    config = {
        host: "",
        port: "3000"
    }

    constructor(config) {
        this.config = config
        this.axios = axios.create({
            baseURL: this.config.host + ":" + this.config.port,
            timeout: 1000,
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

}
