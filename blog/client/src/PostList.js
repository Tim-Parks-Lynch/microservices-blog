import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

const PostList = () => {
	const [posts, setPosts] = useState({})

	const fetchPosts = async () => {
		const res = await axios.get('http://posts.com/posts') // this used to be 4000, but we are switching it to the query service on 4002
		setPosts(res.data)
	}

	useEffect(() => {
		fetchPosts()
	}, []) // empty dependency array to only run useEffect onces

	// console.log(posts)

	// returns values in an array of the Object posts
	const renderedPosts = Object.values(posts).map((post) => {
		return (
			<div
				key={post.id}
				className='card'
				style={{ width: '30', marginBottom: '20px' }}
			>
				<div className='card-body'>
					<h3>{post.title}</h3>
					<CommentList comments={post.comments} />
					<CommentCreate postId={post.id} />
				</div>
			</div>
		)
	})
	return (
		<div className='d-flex flex-row flex-wrap justify-content-between'>
			{renderedPosts}
		</div>
	)
}

export default PostList
