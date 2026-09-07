import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { RequestDialog } from "@/features/order-request";

const nav = [["Каталог", "/#catalog"], ["О трепанге", "/trepang"], ["О нас", "/about"], ["Доставка", "/delivery"]];

export function StoreShell({ children }: { children: React.ReactNode }) {
  return <>
    <a className="skip-link" href="#main-content">Перейти к содержанию</a>
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[#faf9f5]/90 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link href="/"><Image src="/images/logo.png" alt="Доктор Панг" width={250} height={30} className="h-auto w-44" preload /></Link>
        <nav className="hidden items-center gap-7 md:flex">{nav.map(([name, href]) => <Link className="text-sm font-semibold hover:text-[#df7457]" href={href} key={href}>{name}</Link>)}</nav>
        <div className="hidden md:block"><RequestDialog /></div>
        <details className="relative md:hidden">
          <summary aria-label="Открыть меню" className="grid size-11 cursor-pointer list-none place-items-center rounded-full bg-[#dfeee7]"><Menu aria-hidden="true" /></summary>
          <nav className="absolute right-0 top-14 grid w-64 gap-1 rounded-2xl border border-black/5 bg-white p-3 shadow-xl">{nav.map(([name, href]) => <Link className="rounded-xl px-4 py-3 font-semibold hover:bg-[#dfeee7]" href={href} key={href}>{name}</Link>)}<a href="tel:+79020555552" className="rounded-xl px-4 py-3 font-semibold">+7 902 055-55-52</a><div className="p-2"><RequestDialog className="btn-primary w-full" /></div></nav>
        </details>
      </div>
    </header>
    <div id="main-content" tabIndex={-1}>{children}</div>
    <footer className="mt-20 bg-[#17352d] py-12 text-white"><div className="container-page grid gap-8 md:grid-cols-2"><div><Link href="/" aria-label="Доктор Панг — на главную" className="inline-flex rounded-xl bg-[#faf9f5] px-4 py-3"><Image src="/images/logo.png" alt="" width={250} height={30} className="h-auto w-44" /></Link><p className="mt-5 max-w-lg text-sm text-white/70">Биологически активная добавка к пище. Не является лекарственным средством.</p></div><div className="text-sm md:text-right"><p>ИП Вороной С.В. Все права защищены.</p><p className="mt-2 text-white/60">СГР KZ.16.01.98.003.R.000098.03.23</p><Link className="mt-4 inline-block underline" href="/policy">Политика обработки данных</Link></div></div></footer>
  </>;
}
