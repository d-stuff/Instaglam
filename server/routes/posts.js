const { 
    getAllPosts,
    getPost,
    createPost,
    removePost,
    removeAllPosts,
    updatePost,
} = require('../services/post-services.js');
module.exports = function(app) {
    //get all posts
    app.get('/api/posts/:email', async (req, res) => {
        try{
        const user = await getAllPosts(req.params.email);
        if (!user) {
            return res
            .status(404)
            .json({ message: 'there are no posts with requested email'})
            .end();
        }
        res.status(200).json(user).end();
        } catch (e) {
            res
                .status(500)
                .json({ message: `internal error while trying to get posts`})
                .end();
        }
    });

    //get one post of a user
    app.get('/api/posts/:id', async (req, res) => {
        try{
			const user = await getPost(req.body.user, req.params.id);

			if (!user) {
				return res
					.status(404)
					.json({ message: 'no post with requested id' })
					.end();
			}
			res.status(200).json(user).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to find user` })
				.end();
		}
	});

    //create a post
    app.post('/api/posts', async (req, res) => {
		if (!req.body) {
			return res
				.status(400)
				.json({ message: `request is invalid` })
				.end();
		}
		const post = { ...req.body };
		try {
			const newPost = await createPost(post);
			res.status(200).json(newPost).end();
		} catch (e) {
			res
				.status(500)
				.json({ message: `internal error while trying to create user` })
				.end();
		}
    });

    //remove a post
    app.delete('/api/posts/:id', async (req, res) => {
        try{
            const post = await removePost(req.params.id);
            res.status(200).json(post).end();

        } catch(e){
            res
            .status(500)
            .json({ message: `internal error while trying to delete a post` })
            .end();
        }
    });

    // remove all posts
    app.delete('/api/posts/:email', async (req, res) => {
        try{
            const post = await removeAllPosts(req.params.email);
            res.status(200).json(post).end();

        } catch(e){
            res
            .status(500)
            .json({ message: `internal error while trying to delete all posts` })
            .end();
        }
    });

    //update a post
    app.put('/api/posts/:id', async (req, res){
        try{
            const post = await updatePost(req.params.id, req.body)
            res.status(200).json(user).end();
        } catch (e) {
            res
                .status(500)
                .json({ message: `internal error while trying to update post})
                .end();

        }
    });

}