import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    }),
    email: z.string().email(),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    })
})

export const OtpSchema = z.object({
    code: z.string().min(6, {
        message: "Code must be 6-digits long"
    })
})

export const TaskSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    priority: z.string().min(1, {
        message: "Priority is required"
    }),
    dueDate: z.date()
})