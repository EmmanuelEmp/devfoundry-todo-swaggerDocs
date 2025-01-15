import jwt from "jsonwebtoken"
import { Response } from "express"

const generateToken = (res:Response, userId: any) => {
 const token = jwt.sign(
    {userId}, process.env.SECRET_KEY as string, 
    {expiresIn: "30d"}
 )

 // store the token in cookie
 res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, //30days
 })

 return token
}

export default generateToken;