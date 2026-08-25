const express = require('express');
const app = express();
const port = 4000;
require('dotenv').config();

const githubdata = {
  "login": "sakshishewale01",
  "id": 230725329,
  "node_id": "U_kgDODcCW0Q",
  "avatar_url": "https://avatars.githubusercontent.com/u/230725329?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/sakshishewale01",
  "html_url": "https://github.com/sakshishewale01",
  "followers_url": "https://api.github.com/users/sakshishewale01/followers",
  "following_url": "https://api.github.com/users/sakshishewale01/following{/other_user}",
  "gists_url": "https://api.github.com/users/sakshishewale01/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/sakshishewale01/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/sakshishewale01/subscriptions",
  "organizations_url": "https://api.github.com/users/sakshishewale01/orgs",
  "repos_url": "https://api.github.com/users/sakshishewale01/repos",
  "events_url": "https://api.github.com/users/sakshishewale01/events{/privacy}",
  "received_events_url": "https://api.github.com/users/sakshishewale01/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": "Sakshi Shewale",
  "company": null,
  "blog": "",
  "location": "India",
  "email": null,
  "hireable": null,
  "bio": "Computer Engineering Student | Java Developer | Open to Opportunities\r\n",
  "twitter_username": null,
  "public_repos": 30,
  "public_gists": 0,
  "followers": 2,
  "following": 1,
  "created_at": "2025-09-06T13:22:51Z",
  "updated_at": "2026-07-08T04:33:27Z"
}

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/about', (req,res) => {
  res.send('<h1>I am Sakshi Shewale.A Btech Student studying at MITAOE,Pune.</h1>');
});

app.get('/contact',(req,res) =>{
  res.send('<h2> 677980234</h2>')
});

app.get('/instagram',(req,res) => {
    res.send('<h1>Welcome to Instagram</h1>');
});

app.get('/github',(req,res)=> {
  res.send(githubdata);
})

app.get('/github',(req,res) => {
  res.json(githubdata);

})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`);
});