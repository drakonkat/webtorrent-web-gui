# Webtorrent web gui

### This project need an associated "[Webtorrent express api](https://gitlab.com/t5257/webtorrent-express-api)" to work

### Prop Types

| Property | Type   | Required? | Description                                                                                    |
|:---------|:-------|:---------:|:-----------------------------------------------------------------------------------------------|
| host     | String |   true    | The host where you run the service. If you start the other project locally is http://localhost |
| port     | Number |   true    | The port where you run the service. If you start the other project locally is 3000             |

### Examples

Here is an example of the use of the component

```javascript
<WebTorrentGui host={"http://localhost"} port={3000}/>
```

### Run locally

1. Start the project "[Webtorrent express api](https://gitlab.com/t5257/webtorrent-express-api)"
2. Run ```npm install```
3. Run ```npm run dev```

