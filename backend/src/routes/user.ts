import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@darishkhan/mediyyumm-common/dist"

export  const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const success = signupInput.safeParse(body);
  if(!success)
  {
    c.status(403);
    return c.json({ error: "Error while signing up!" });
  }
  const bodyPass = new TextEncoder().encode(body.password);
  const bodyPassword = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    bodyPass
  );
  const hashedPassword = new TextDecoder("utf-8").decode(bodyPassword);
  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    console.log(error);
    c.status(403);
    return c.json({ error: "Error while signing up!" });
  }
});



userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const success = signupInput.safeParse(body);
  if(!success)
  {
    c.status(403);
    return c.json({ error: "Error while signing in!" });
  }

  const bodyPass = new TextEncoder().encode(body.password);
  const bodyPassword = await crypto.subtle.digest(
    {
      name: "SHA-256",
    },
    bodyPass
  );
  const hashedPassword = new TextDecoder("utf-8").decode(bodyPassword);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: hashedPassword,
      },
    });
    if (!user) {
      c.status(403);
      return c.json({ error: "user not found" });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    c.status(403);
    return c.json({ error: "Error while logging in" });
  }
});


