import { z } from "zod";
const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
export const checkoutSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    lastName: z.string().min(2, { message: "First name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().regex(phoneRegex, 'Invalid Number!'),
    passport: z.string().min(10, { message: "Passport number must be at least 10 characters" }),
    comment: z.string().optional()
})
export type CheckoutSchemaT = z.infer<typeof checkoutSchema>