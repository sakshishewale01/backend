import express from 'express'
const app = express()

app.get('/', (req, res) => {
    res.send('server is ready')
})

app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            title: 'a joke',
            content: 'This is a joke'
        },
        {
            id: 2,
            title: 'another joke',
            content: '2nd joke'
        },
        {
            id: 3,
            title: 'one more another joke ',
            content: '3rd joke'
        },
        {
            id: 4,
            title: 'another 4th joke',
            content: '4th joke'
        },
        {
            id: 5,
            title: 'another 5th joke',
            content: '5th joke'
        }
    ]
    res.send(jokes)
})

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`serve at localhost:${port}`);
})