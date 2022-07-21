const express = require('express')
// const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const { default: axios } = require('axios')
const app = express()

app.use(express.json())
app.use(cors()) // how do you secure this?
// see 3_CommentsByPostId example.jpg for example of what this should look like

// '35b5ab':{   // ID of a post
//id: 'hexstring', //'j325'    // id of a comment
//content: 'string' // 'neat' // content of a comment
//}

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
	res.status(200).send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
	const commentId = randomBytes(4).toString('hex') // commentId, not post
	const { content } = req.body

	const comments = commentsByPostId[req.params.id] || [] // if undefined give me an empty array
	comments.push({ id: commentId, content, status: 'pending' }) // commentId we created using randomBytes, and content user provided

	commentsByPostId[req.params.id] = comments // adds new comment to it's correct post

	await axios.post('http://event-bus-srv:4005/events', {
		type: 'CommentCreated',
		data: {
			id: commentId,
			content,
			postId: req.params.id,
			status: 'pending',
		},
	})

	res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
	console.log('Event Received:', req.body.type)

	const { type, data } = req.body

	if (type === 'CommentModerated') {
		const { postId, id, status, content } = data

		const comments = commentsByPostId[postId]

		const comment = comments.find((comment) => {
			return comment.id === id
		})

		comment.status = status

		await axios.post('http://event-bus-srv:4005/events', {
			type: 'CommentUpdated',
			data: {
				id,
				status,
				postId,
				content,
			},
		})
	}

	res.send({})
})

app.listen(4001, () => {
	console.log('Listening on 4001')
})
