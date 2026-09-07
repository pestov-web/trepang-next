import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "./product-card";
import { HeroProductSlider } from "./hero-product-slider";
import { getProducts } from "@/shared/db";

export const metadata: Metadata = { title: { absolute: "Купить трепанг и морские биокомплексы — Доктор Панг" }, description: "Трепанг на меду, экстракты и морские биокомплексы собственного производства во Владивостоке. Каталог с доставкой по России.", alternates: { canonical: "/" }, openGraph: { url: "/", title: "Трепанг и морские биокомплексы — Доктор Панг", description: "Продукция из морских биоресурсов собственного производства во Владивостоке." } };

export function HomePage() {
  const products = getProducts();
  return <main>
    <section className="relative min-h-[650px] overflow-hidden bg-[#dfeee7] sm:min-h-[680px]">
      <div className="container-page grid min-h-[650px] items-center gap-4 py-14 sm:min-h-[680px] lg:grid-cols-[.92fr_1.08fr] lg:py-16">
        <div className="relative z-10 self-start pt-5 sm:self-center sm:pt-0">
          <p className="font-bold uppercase tracking-[.18em] text-[#cf684e]">Сила дальневосточного моря</p>
          <h1 className="mt-5 max-w-2xl text-5xl font-extrabold leading-[.98] sm:text-7xl">Природные ресурсы для вашего здоровья</h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-[#17352d]/70">Трепанг и морские биокомплексы собственного производства из Владивостока.</p>
          <div className="mt-9 flex flex-wrap gap-3"><Link href="#catalog" className="btn-primary">Выбрать продукт</Link><Link href="/trepang" className="btn-secondary bg-white/70">Узнать о трепанге</Link></div>
        </div>
        <HeroProductSlider products={products.slice(0, 4)} />
      </div>
    </section>
    <section id="catalog" className="container-page scroll-mt-24 py-20">
      <div className="flex items-end justify-between"><div><p className="font-bold uppercase tracking-[.18em] text-[#cf684e]">Каталог</p><h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">Наши продукты</h2></div><p className="hidden max-w-sm text-right text-sm text-black/55 md:block">Выберите продукт и закажите на маркетплейсе</p></div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map(product => <ProductCard key={product.id} product={product} />)}</div>
    </section>
  </main>;
}
