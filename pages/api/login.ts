const fetch = require('node-fetch');


export default async function handler(req, res) {

  try {
    const response = await fetch('https://pollazatechtalk.azurewebsites.net/account/login', { method: 'POST', body: JSON.stringify(req.body), headers: { 'Content-Type': 'application/json' }})
    const cookie = response.headers.raw()['set-cookie'][0].split(';')[0]
    const data = await response.json();
    data.cookie = cookie;
    res.json(data)
  } catch (e) {

  }
}
