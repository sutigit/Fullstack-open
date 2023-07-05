const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body


    if (!body.title || !body.author) {
        response.status(400).send("missing title or author").end()
        return
    }


    // It iis wad id iis for now
    const userId = "64a51e7ce3df191c6028efb3"

    const user = await User.findById(userId)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    if (!request.params.id) {
        response.status(400).end()
        return
    }

    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    response.json(deletedBlog)
})

// patch
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const oldBlog = await Blog.findById(request.params.id)

    const newBlog = {
        title: body.title || oldBlog.title,
        author: body.author || oldBlog.author,
        url: body.url || oldBlog.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(updatedBlog)
})



module.exports = blogsRouter