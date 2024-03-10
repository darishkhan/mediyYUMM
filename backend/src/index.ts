import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
// import { crypto } from '@cloudflare/workers-types';
import { decode, sign, verify } from 'hono/jwt';




const app = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
    userId: String
  }
}>()


app.post('/api/v1/user/signup', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const bodyPass = new TextEncoder().encode(body.password)
  const bodyPassword = await crypto.subtle.digest({
    name: 'SHA-256'
  },
  bodyPass
  );
  const hashedPassword = new TextDecoder("utf-8").decode(bodyPassword);
  try {
    const user = await prisma.user.create({
      data:{
        name: body.name,
        email: body.email,
        password: hashedPassword
      }
    });

    const token = await sign({id:user.id}, c.env.JWT_SECRET);
    return c.json({token});
    
  } catch (error) {
    c.status(403);
    return c.json({error: "Error while signing up!"});    
  } 
});

app.post('/api/v1/user/signin', async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const bodyPass = new TextEncoder().encode(body.password)
  const bodyPassword = await crypto.subtle.digest({
    name: 'SHA-256'
  },
  bodyPass
  );
  const hashedPassword = new TextDecoder("utf-8").decode(bodyPassword);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: hashedPassword
      }
    })    
    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const token = await sign({id:user.id}, c.env.JWT_SECRET);
    return c.json({token});


  } catch (error) {
    c.status(403);
    return c.json({ error: "Error while logging in" }); 
  } 
});

app.use('/api/v1/blog', async(c, next)=>{
  const jwt = c.req.header('Authorization');
  if(!jwt)
  {
    c.status(401);
    return c.json({error: "Unauthorized!"});
  }
  const token = jwt.split(' ')[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if(!payload)
  {
    c.status(401);
    return c.json({error:"Unauthorized!"})
  }
  c.set('userId', payload);
  await next();
})

app.post('/api/v1/blog', (c)=>{
  return c.text("he");
});

app.put('/api/v1/blog', (c)=>{
  return c.text("he");
});


app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id');
  console.log(id);
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text('Hello Hono!')
})

export default app
