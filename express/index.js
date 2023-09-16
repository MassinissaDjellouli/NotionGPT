import cors from 'cors';
import express from 'express';
const app = express()
app.use(express.json());
app.use(cors());
const port = 8000

app.post('/' ,async (req, res) => {
    console.log(req.body)
    // const url = req.body.url
    // const body = req.body.data
    // const method = req.body.method
    // const headers = req.body.headers
    if(body === undefined) {
        res.send(await fetch(url, {
            method: method,
            headers: headers
        }))
        return;
    }
    
    res.send(await fetch(url, {
        method: method,
        body: body,
        headers: headers
    }))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})