import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, verify } from "hono/jwt";



export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_SECRET: string
    },
    Variables:{
        userId: string;
    }
  }>()

  blogRouter.use("/*",async(c,next)=>{
    const authHeader = c.req.header('Authorization') || " "
    const user = verify(authHeader, c.env.JWT_SECRET)
    if (user) {
        c.set('userId',user.id)
        await next()
    } else{
        c.status(403)
       return c.json({
            msg: "you are not logged in"
        })
    }
})


  blogRouter.post('/',async(c)=>{
    const body = await c.req.json();
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    await prisma.blog.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })

    return c.text("flame")
  })

  
  blogRouter.put('/',async(c)=>{
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id
    })
  })
  


  blogRouter.get('/',async(c)=>{
    const body = await c.req.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

try{
    const blog = await prisma.blog.findFirst({
        where:{
            id: body.id
        },
    })
    return c.json({
        blog
    })
} catch (e){
    c.status(411);
    return c.json({
        msg:"error while fetching blog post"
    })
}

  })

  // pagination

  blogRouter.get('/bulk',async(c)=>{
    const prisma = await PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const blog = await prisma.blog.findmany()
    return c.json({blog})
  })