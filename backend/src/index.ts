import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify,decode } from 'hono/jwt'
import {userRouter} from "./routes/user"
import { blogRouter} from "./routes/blog"

const app = new Hono()

app.route("api/v1/user",userRouter)
app.route("api/v1/blog",blogRouter)








export default app
