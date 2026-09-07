import type { Metadata } from "next"; import Link from "next/link"; import { requireAdmin } from "@/shared/auth";
export const metadata:Metadata={robots:{index:false,follow:false,nocache:true}};
export default async function Layout({children}:{children:React.ReactNode}){await requireAdmin();return <><header className="border-b bg-white"><div className="container-page flex h-16 items-center justify-between"><Link href="/admin" className="font-extrabold">Доктор Панг · Admin</Link><Link href="/" target="_blank" className="text-sm font-bold">Открыть сайт ↗</Link></div></header>{children}</>}
