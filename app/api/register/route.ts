import { request } from "http"
import brcypt from "bcrypt"
import prisma from '@/app/libs/prismadb'

export async funtion POST({request: Request}) {
    const body = await request.json()

    const {email, name, password} = body

    const hashedPassword = await brcypt.hash(password, 12)

    const user = await prisma 
}