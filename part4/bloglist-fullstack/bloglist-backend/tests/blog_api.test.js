const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "test1",
        author: "author1",
        url: "url1",
        likes: 1
    },
    {
        title: "test2",
        author: "author2",
        url: "url2",
        likes: 2
    },
    {
        title: "test3",
        author: "author3",
        url: "url3",
        likes: 3
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})

    const blog1 = new Blog(initialBlogs[0])
    await blog1.save()

    const blog2 = new Blog(initialBlogs[1])
    await blog2.save()

    const blog3 = new Blog(initialBlogs[2])
    await blog3.save()
})

describe("Blog list tests, step1", () => {
    // Test to be JSON
    test('notes are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    // Test correct amount of posts
    test('all notes are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(3)
    })
})

describe("Blog list tests, step2", () => {
    // Test that the unique identifier property of the blog posts is named id
    test('id is defined', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})


describe("Blog list tests, step3", () => {
    // Test that number of blogs has increased by one
    test('Number of blogs has increased by one', async () => {
        const newBlog = {
            title: "test4",
            author: "author4",
            url: "url4",
            likes: 4
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length + 1)
    })
})


describe("Blog list tests, step4", () => {
    // Verify that if the likes property is missing from the request, it will default to 0
    test('Likes property is missing from the request', async () => {
        const newBlog = {
            title: "test4",
            author: "author4",
            url: "url4",
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })
})

describe("Blog list tests, step5", () => {
    // Verify that if the title or url properties are missing, the backend response with the status code 400
    test('Title or url properties are missing', async () => {
        const newBlog = {
            url: "url",
            likes: 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})