import SpotifyWebApi from "spotify-web-api-node"
import { SpotifyApi } from '@spotify/web-api-ts-sdk'
import express from "express"
import querystring from "querystring"
import request from "request"
import crypto from "crypto"

let clientId = 'e868a1740c0447b88341c1af8dfeeb69'
let clientSecret = "9c3d9a9dc0f440d3a30d758cf249304d"
const spotifyWebApi = new SpotifyWebApi({
   clientId: 'e868a1740c0447b88341c1af8dfeeb69',
   clientSecret: "9c3d9a9dc0f440d3a30d758cf249304d",
   redirectUri : 'http://localhost:3001/callback'
    }
)

function generateRandomString(value : number){
    return crypto.randomBytes(60).toString('hex').slice(0, value);
}



const app = express();


app.use(express.json());




app.get("/login", (req, res) => {
    const state = generateRandomString(16)
    let scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
        response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: 'http://localhost:3001/callback',
      state : state

    }))
})

app.get("/callback", async (req, res) => {
    const code = req.query.code!;
    const state = req.query.state;
   if(typeof code !== "string"){
    return
   }
    console.log(code);

    let authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: "http://localhost:3001/callback",
          grant_type: 'authorization_code'
        },
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
        },
        json: true
      };
  
       request.post(authOptions, function(err, response, body){
        let accessToken = body.access_token;
        let refreshToken = body.refresh_token;
        spotifyWebApi.setAccessToken(accessToken)
        const data = searchMyTrack('Wavy');
      })

    
})



// async function getToken() {
    
// }

async function searchMyTrack(track : string){
    const data = await spotifyWebApi.searchTracks(track);
    console.log("The data is ",data)
    return data
}


// searchMyTrack("Wavy")

app.listen(3001)