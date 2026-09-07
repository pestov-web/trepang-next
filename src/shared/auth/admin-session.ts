import "server-only"; import { createHmac,timingSafeEqual } from "node:crypto"; import { cookies } from "next/headers"; import { redirect } from "next/navigation";
const COOKIE="trepang_admin"; const secret=()=>process.env.ADMIN_SESSION_SECRET||"dev-only-change-this-secret"; const sign=(v:string)=>createHmac("sha256",secret()).update(v).digest("hex");
export async function isAdmin(){const token=(await cookies()).get(COOKIE)?.value;if(!token)return false;const [expires,sig]=token.split(".");if(!expires||!sig||Date.now()>Number(expires))return false;const expected=sign(expires);return sig.length===expected.length&&timingSafeEqual(Buffer.from(sig),Buffer.from(expected))}
export async function requireAdmin(){if(!await isAdmin())redirect("/admin/login")}
export async function createAdminSession(){const expires=String(Date.now()+7*864e5);(await cookies()).set(COOKIE,`${expires}.${sign(expires)}`,{httpOnly:true,sameSite:"strict",secure:process.env.NODE_ENV==="production",path:"/",maxAge:604800})}
export async function clearAdminSession(){(await cookies()).delete(COOKIE)}
export const validPassword=(value:string)=>{const wanted=process.env.ADMIN_PASSWORD||(process.env.NODE_ENV==="development"?"admin":"");if(!wanted||value.length!==wanted.length)return false;return timingSafeEqual(Buffer.from(value),Buffer.from(wanted))}
