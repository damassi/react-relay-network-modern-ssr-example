import express from 'express'
import server from './server'

const app = express()
export default app
app.use(server)
