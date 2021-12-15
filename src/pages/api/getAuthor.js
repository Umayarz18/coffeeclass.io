// a Next.js api route that gets the author profile

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default async function getAuthor(req, res) {
    // const { authorSlug } = req.body
    const authorSlug = req.query.authorSlug

    if (!authorSlug) {
        return res.status(400).json({ error: 'Author Slug is required!' })
    }

    const AUTHORS_PATH = path.join(process.cwd(), "content/authors")

    const authorsFilePaths = fs
        .readdirSync(AUTHORS_PATH)
        .filter((path) => /\.mdx?$/.test(path))

    let authorData = {}

    // find the mdx file where the name is the same as authorSlug. Ex: if authorSlug is "benjamin-carlson", find the file "benjamin-carlson.mdx"
    const authorFilePath = authorsFilePaths.find((path) => {
        const authorName = path.replace(/\.mdx?$/, "")
        return authorName === authorSlug
    })

    const source = fs.readFileSync(path.join(AUTHORS_PATH, authorFilePath))
    const { content, data } = matter(source)

    authorData = {
        data,
        content,
    }

    res.status(200).json({ data: authorData })
}