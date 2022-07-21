const express = require('express')
const axios = require('axios')

const app = express()
app.use(express.json())

const events = []

app.post('/events', (req, res) => {
	try {
		const event = req.body

		events.push(event)

		axios
			.post('http://posts-clusterip-srv:4000/events', event)
			.catch((err) => console.log(err.message))
		axios
			.post('http://comments-srv:4001/events', event)
			.catch((err) => console.log(err.message))
		axios
			.post('http://query-srv:4002/events', event)
			.catch((err) => console.log(err.message))
		axios
			.post('http://moderation-srv:4003/events', event)
			.catch((err) => console.log(err.message))

		res.send({ status: 'OK' })
	} catch (e) {
		console.error(e)
	}
})

app.get('/events', (req, res) => {
	try {
		res.send(events)
	} catch (e) {
		console.log(e)
	}
})

app.listen(4005, () => {
	console.log('Listening on 4005')
})
