<<<<<<< HEAD
import { Hono } from 'hono'
import { PrismaClient } from "@prisma/client"
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify,decode } from 'hono/jwt'
import {userRouter} from "./routes/user"
import { blogRouter} from "./routes/blog"

const app = new Hono()

app.route("api/v1/user",userRouter)
app.route("api/v1/blog",blogRouter)
=======
// import { Hono } from 'hono'
// import { PrismaClient } from '@prisma/client/edge'
// import { withAccelerate } from '@prisma/extension-accelerate'
// import { decode, jwt, sign, verify } from 'hono/jwt'
// import { cors } from 'hono/cors';
>>>>>>> fe464b8e384512e678d91164141a6b4e5d1e4254




<<<<<<< HEAD




export default app
=======
// const app = new Hono ()
// app.use('*', cors());

// app.post('/api/v1/signup',async (c) => {
//   const prisma = new PrismaClient({
//     //@ts-ignore
//     db: env.DATABASE_URL,
//   }).$extends(withAccelerate())

//   const body = await c.req.json();

//  const user = await prisma.user.create({
//     data: {
//       email: body.email,
//       password: body.password,
//     },
//   })
//   // @ts-ignore
//     const token = await sign({id: user.id},c.env.JWT.SECRET)
//   return c.json({
//     jwt:token
//   })
// })
// app.post('/api/v1/signin', (c) => {
//   return c.text('Hello Hono!')
// })
// app.post('/api/v1/blog', (c) => {
//   return c.text('Hello Hono!')
// })
// app.post('/api/v1/blog', (c) => {
//   return c.text('Hello Hono!')
// })
// app.post('/api/v1/blog/:id', (c) => {
//   return c.text('Hello Hono!')
// })
 

// export default app


import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { cors } from 'hono/cors';

const app = new Hono();

const prisma = new PrismaClient().$extends(withAccelerate());

// Middleware for CORS
app.use('*', cors());

app.post('/api/v1/signup', async (c) => {
  const body = await c.req.json();

  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password,
    },
  });
  // @ts-ignore
  const token = await sign({ id: user.id }, c.env.JWT.SECRET);
console.log('hot')
  return c.json({
    jwt: token,
  });
});

app.post('/api/v1/signin', (c) => {
  return c.text('Hello Hono!');
});

app.post('/api/v1/blog', (c) => {
  return c.text('Blog Endpoint');
});

export default app;
>>>>>>> fe464b8e384512e678d91164141a6b4e5d1e4254
