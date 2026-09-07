import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/shared/api";

export function ProductCard({ product }: { product: Product }) {
  const price = Math.trunc(product.price - product.price * product.discount / 100);
  const href = `/products/${product.slug}`;
  return <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-black/[.06] bg-white shadow-[0_12px_40px_rgb(23_53_45/.07)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgb(23_53_45/.12)]">
    <Link href={href} className="relative block aspect-[3/4] overflow-hidden bg-[#edf3ef] focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#1f6b54]">
      {product.discount > 0 ? <span className="absolute left-4 top-4 z-10 rounded-full bg-[#df7457] px-3 py-1.5 text-xs font-extrabold text-white">−{product.discount}%</span> : null}
      <Image src={product.images[0] || "/images/logo.png"} alt={product.name} fill sizes="(max-width:640px) calc(100vw - 32px),(max-width:1024px) 50vw,(max-width:1280px) 33vw,25vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
      <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-[#17352d] shadow-sm backdrop-blur">В наличии</span>
    </Link>
    <div className="flex flex-1 flex-col p-4 sm:p-5 sm:pt-4">
      <p className="text-xs font-bold uppercase tracking-[.16em] text-[#cf684e]">Доктор Панг</p>
      <h3 className="mt-2 text-xl font-bold leading-7"><Link href={href} className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b54]">{product.name}</Link></h3>
      {product.shortDescription ? <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-black/55">{product.shortDescription}</p> : <p className="mt-1.5 text-sm leading-5 text-black/45">Морской биокомплекс из Владивостока</p>}
      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
        <div><strong className="block text-xl">{price.toLocaleString("ru-RU")} ₽</strong>{product.discount > 0 ? <span className="text-sm text-black/40 line-through">{product.price.toLocaleString("ru-RU")} ₽</span> : null}</div>
        <Link aria-label={`Подробнее: ${product.name}`} href={href} className="grid size-12 shrink-0 place-items-center rounded-full bg-[#dfeee7] transition-colors hover:bg-[#c8e1d6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b54]"><ArrowUpRight aria-hidden="true" size={20} /></Link>
      </div>
    </div>
  </article>;
}
