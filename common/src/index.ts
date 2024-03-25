import {z} from "zod";


export const signupInput = z.object({
    email: z.string().email().max(50),
    password: z.string().max(30),
    name: z.string().max(50)
})

export const signinInput = z.object({
    email: z.string().email().max(50),
    password: z.string().max(30)
})


export const createPostInput = z.object({
    title: z.string().max(200),
    content: z.string().max(2000)
})

export const updatePostInput = z.object({
    id: z.string().max(100),
    title: z.string().max(200).optional(),
    content: z.string().max(2000).optional()
})


export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreatePostInput = z.infer<typeof createPostInput>;
export type UpdatePostInput = z.infer<typeof updatePostInput>;