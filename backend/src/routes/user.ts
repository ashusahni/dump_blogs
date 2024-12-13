import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify,decode } from 'hono/jwt'
import { signupInput } from './zod'


export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
    }
  }>()

// const app = new Hono()

userRouter.post('/signup', async (c) => {
    const body = await c.req.json()
    const {success} = signupInput.safeParse(body)
    if(!success){
      c.status(411);
      return c.json({
        msg:'Input not correct'
      })
    }
    
    // Create Prisma client outside of the route handlers
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try {
      const user = await prisma.user.create({
        data: {
          username: body.username,
          name: body.name,
          password: body.password,
        }
      })
      const jwt = await sign({
        id: user.id
      }, c.env.JWT_SECRET)
      return c.text(jwt)
    } catch (error) {
      console.error(error)
      c.status(411)
      return c.json({ error: "Error creating user" })
    }
  })
  
  userRouter.post("/signin",async(c)=>{
    const body = c.req.json()
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
      const user = await prisma.user.findFirst({
        where: {
          username: (await body).username,
          password: (await body).password,
        }
      })
    if(!user){
      c.status(404)
      return c.text("unathorized")
    }
  
  const jwt = await sign({
    id: user.id
  }, c.env.JWT_SECRET)
  return c.text(jwt)
  
    }catch(e){
      console.log(e)
      c.status(411)
      return c.text('invalid')
    }
  })
    