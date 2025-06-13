import { NextRequest, NextResponse } from "next/server";
import { sampleFormSchema } from "@/lib/formSchemas/sampleFormSchema";


export async function POST(req: NextRequest) {
    const data = await req.json();
    const parsed = sampleFormSchema.safeParse(data);
    
    if (parsed.success) {
        //HANDLE THE DATA
        return NextResponse.json({ message: "Form submitted Yo.", res_data: parsed.data})
    } else {

    return NextResponse.json(
        { message: "Bad Data Yo.", error: parsed.error },
        { status: 400 }
    );
    }
}