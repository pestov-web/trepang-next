"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/shared/api";

export function HeroProductSlider({ products }: { products: Product[] }) {
  const [active, setActive] = useState(0);
  if (!products.length) return null;
  const product = products[active];
  const price = Math.trunc(product.price - product.price * product.discount / 100);
  const slideNumber = String(active + 1).padStart(2, "0");
  const slideCount = String(products.length).padStart(2, "0");
  const go = (direction: number) => setActive(current => (current + direction + products.length) % products.length);

  return <div className="relative self-end pb-2 sm:pb-8 lg:self-center lg:pb-0" aria-roledescription="карусель" aria-label="Популярные товары">
    <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_28px_80px_rgb(24_64_52/.14)]">
      <Link href={`/products/${product.slug}`} className="group grid min-h-[260px] grid-cols-[1fr_1.05fr] focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#1f6b54] sm:min-h-[360px] lg:min-h-[470px] lg:grid-cols-[56fr_44fr]" aria-label={`Открыть товар: ${product.name}`}>
        <div className="relative min-h-[260px] w-full overflow-hidden bg-[#edf3ef] sm:min-h-[360px] lg:min-h-[470px]">
          <Image key={product.images[0]} src={product.images[0] || "/images/logo.png"} alt={product.name} fill preload={active === 0} sizes="(max-width:1024px) 48vw,25vw" className="object-cover [transform:scaleY(1.04)] transition-transform duration-500 group-hover:[transform:scale(1.025,1.066)] motion-reduce:transition-none" />
          {product.discount > 0 ? <span className="absolute left-4 top-4 rounded-full bg-[#df7457] px-3 py-1.5 text-xs font-extrabold text-white">−{product.discount}%</span> : null}
        </div>
        <div className="flex min-w-0 flex-col bg-[#f4f8f5] p-5 sm:p-7">
          <div className="hidden items-center justify-between text-xs font-bold uppercase tracking-[.14em] text-[#1f6b54]/55 sm:flex" aria-hidden="true">
            <span>Доктор Панг</span>
            <span className="tabular-nums">{slideNumber} / {slideCount}</span>
          </div>
          <div className="my-auto py-4 sm:py-8">
            <p className="text-xs font-bold uppercase tracking-[.16em] text-[#cf684e]">Популярный продукт</p>
            <h2 className="mt-2 text-balance text-xl font-extrabold leading-tight sm:text-2xl">{product.name}</h2>
            <p className="mt-3 text-xl font-extrabold tabular-nums">{price.toLocaleString("ru-RU")} ₽</p>
            <div className="mt-5 hidden flex-wrap gap-2 sm:flex">
              <span className="rounded-full border border-[#1f6b54]/10 bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#17352d]/70">В наличии</span>
              <span className="rounded-full border border-[#1f6b54]/10 bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#17352d]/70">Из Владивостока</span>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-2 border-b border-[#1f6b54]/20 pb-1 text-sm font-bold text-[#1f6b54] transition-colors group-hover:border-[#1f6b54]">Подробнее <ArrowUpRight aria-hidden="true" size={18} /></span>
        </div>
      </Link>
    </div>
    <div className="mt-4 flex items-center justify-between gap-4">
      <div className="flex gap-2" aria-label="Выбрать товар">{products.map((item, index) => <button key={item.id} type="button" onClick={() => setActive(index)} aria-label={`Показать: ${item.name}`} aria-current={index === active ? "true" : undefined} className={`h-2.5 rounded-full transition-[width,background-color] ${index === active ? "w-8 bg-[#1f6b54]" : "w-2.5 bg-[#1f6b54]/25 hover:bg-[#1f6b54]/50"}`} />)}</div>
      <div className="flex gap-2"><button type="button" onClick={() => go(-1)} aria-label="Предыдущий товар" className="grid size-11 place-items-center rounded-full border border-[#1f6b54]/15 bg-white/70 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b54]"><ArrowLeft aria-hidden="true" size={19} /></button><button type="button" onClick={() => go(1)} aria-label="Следующий товар" className="grid size-11 place-items-center rounded-full bg-[#1f6b54] text-white hover:bg-[#174f3f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b54]"><ArrowRight aria-hidden="true" size={19} /></button></div>
    </div>
  </div>;
}
