const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

app.use(express.json()) // body parser is included in express now, this is what you write instead
app.use(cors()) // for cors errors

// QUICK EXAMPLE OF WHAT POSTS WILL LOOK LIKE
/* posts === {
    'j123j42': {
      id: 'j123j42',
      title: 'post title',
      comments: [
        {id: 'klj3kl', content: 'comment!'}
      ]
    },
     'j123j43': {
      id: 'j123j43',
      title: 'post title',
      comments: [
        {id: 'klj4kl', content: 'comment!'}
      ]
    },
         'j123j44': {
      id: 'j123j44',
      title: 'post title',
      comments: [
        {id: 'klj5kl', content: 'comment!'}
      ]
    },
}*/

const posts = {}

const handleEvent = (type, data) => {
	if (type === 'PostCreated') {
		const { id, title } = data

		posts[id] = { id, title, comments: [] }
	}

	if (type === 'CommentCreated') {
		const { id, content, postId, status } = data

		const post = posts[postId]
		post.comments.push({ id, content, status })
	}

	if (type === 'CommentUpdated') {
		const { id, content, postId, status } = data

		const post = posts[postId]
		const comment = post.comments.find((comment) => {
			return comment.id === id
		})

		comment.status = status
		comment.content = content
		console.log(status)
	}
}

app.get('/posts', (req, res) => {
	res.send(posts)
})

app.post('/events', (req, res) => {
	const { type, data } = req.body

	handleEvent(type, data)

	res.send({})
})

app.listen(4002, async () => {
	console.log('Listening on 4002')

	const res = await axios.get('http://event-bus-srv:4005/events')

	for (let event of res.data) {
		console.log('Processing event', event.type)

		handleEvent(event.type, event.data)
	}
})
