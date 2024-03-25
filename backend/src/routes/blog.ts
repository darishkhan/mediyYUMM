import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@darishkhan/mediyyumm-common/dist";



export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();


blogRouter.use(async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "Unauthorized!" });
  }
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "Unauthorized!" });
  }
  c.set("userId", payload.id);
  await next();
  console.log("//")
});


blogRouter.get("/bulk", async (c) => {

    console.log(".....");
    try {
        
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());

        const posts = await prisma.post.findMany();
        return c.json(posts)
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error in fetching post!" });
    }
});

blogRouter.put("/", async (c) => {
    try {
      const userId = c.get("userId");
      const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
      }).$extends(withAccelerate());
  
      const body = await c.req.json();
      const success = createPostInput.safeParse(body);
        if(!success)
        {
            c.status(403);
            return c.json({ error: "Error while updating post!" });
        }
      const postUpdate = await prisma.post.update({
        where: {
          id: body.id,
          authorId: userId,
        },
        data: {
          title: body.title,
          content: body.content,
        },
      });
  
      return c.json({ message: "Post updated!" });
    } catch (error) {
      c.status(500);
      return c.json({ error: "Error in updating post!" });
    }
  });


blogRouter.post("/", async (c) => {
  try {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const success = updatePostInput.safeParse(body);
  if(!success)
  {
    c.status(403);
    return c.json({ error: "Error while posting!" });
  }
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    console.log(post);

    return c.json({
      id: post.id,
    });
  } catch (error) {
    console.log(error);
    c.status(500);
    return c.json({ error: "Error in creating post!" });
  }
});



blogRouter.get("/:id", async (c) => {
    try {
        
        const id = c.req.param("id");
        const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
      
        const post = await prisma.post.findUnique({
          where:{
              id
          }
        });
        return c.json(post);
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error in fetching post!" });
    }
});

