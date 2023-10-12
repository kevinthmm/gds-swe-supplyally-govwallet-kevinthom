"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "./ui/form.tsx";
import {Button} from "./ui/button.tsx";
import {Input} from "./ui/input.tsx";

const formSchema = z.object({
    staff_pass_id: z.string().min(1, {"message": "Please enter your staff Pass ID."})
})

export function RedemptionForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            staff_pass_id: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="staff_pass_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Staff Pass</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Staff Pass ID" {...field} />
                            </FormControl>
                            <FormDescription>
                                One redemption per team only.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className={"bg-christmas-green w-full hover:brightness-110 hover:bg-christmas-green text-character-inverse"}>Redeem it!</Button>
            </form>
        </Form>
    )
}
