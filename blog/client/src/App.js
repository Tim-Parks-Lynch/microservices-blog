import React from 'react'
import PostCreate from './PostCreate'
import PostList from './PostList'
// import ReactDOM from 'react-dom'

const App = () => {
	return (
		<div className='container'>
			<h1> Create Post </h1>
			<PostCreate />
			<hr />
			{/* <hr /> // a horizontal rule that draws a line between screens */}
			<h1> Posts </h1>
			<PostList />
		</div>
	)
}

export default App
