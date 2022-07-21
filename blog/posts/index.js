const express = require('express')
const { randomBytes } = require('crypto') //used to create a random Id
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(express.json()) // body parser is included in express now, this is what you write instead
app.use(cors()) // for cors errors
// app.use(express.urlencoded())

const posts = {}

// app.get('/posts', (req, res) => {
// 	res.send(posts)
// })

app.post('/posts/create', async (req, res) => {
	const id = randomBytes(4).toString('hex') // 4 bytes of numbers converted over to a hex string // a198bc846388f864864e example, so we have an id

	// we are assuming that the req is gonna have a title property
	const { title } = req.body

	posts[id] = { id, title } // creates a new post in our posts object up above, since we are storing in memory

	await axios
		.post('http://event-bus-srv:4005/events', {
			type: 'PostCreated',
			data: {
				id,
				title,
			},
		})
		.catch((err) => {
			console.log.err.message
		})

	res.status(201).send(posts[id])
})

app.post('/events', (req, res) => {
	console.log('Received Event', req.body.type)
	res.send({})
})

app.listen(4000, () => {
	console.log('v55')
	console.log('Listening on 4000')
})
