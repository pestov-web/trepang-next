import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { RequestDialog } from "@/features/order-request";
import { getProductBySlug, getProducts } from "@/shared/db";
import { absoluteUrl, SITE } from "@/shared/config/site";
import { getProductSeoDescription } from "@/shared/lib/product-seo";
import { LightboxGallery } from "@/shared/ui/lightbox-gallery";

export async function generateProductMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Товар не найден" };
  const description = product.shortDescription.trim().length >= 40 ? product.shortDescription : getProductSeoDescription(product.slug, product.name);
  const canonical = `/products/${product.slug}`;
  return { title: `${product.name}: купить, цена и описание`, description, alternates:{canonical}, openGraph: { type:"website",url:canonical,title:`${product.name} — Доктор Панг`,description,images:product.images.slice(0,1).map(image=>({url:image,alt:product.name})) },twitter:{card:"summary_large_image",title:`${product.name} — Доктор Панг`,description,images:product.images.slice(0,1)} };
}

export async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const price = Math.trunc(product.price - product.price * product.discount / 100);
  const description = product.shortDescription.trim().length >= 40 ? product.shortDescription : product.description.trim().length >= 40 ? product.description : getProductSeoDescription(product.slug, product.name);
  const productUrl=absoluteUrl(`/products/${product.slug}`);
  const structured = { "@context": "https://schema.org", "@type": "Product", "@id":`${productUrl}#product`,url:productUrl,name: product.name, image: product.images.map(absoluteUrl), description,sku:String(product.id),brand:{"@type":"Brand",name:SITE.name},manufacturer:{"@id":`${SITE.url}/#organization`}, offers: { "@type": "Offer",url:productUrl, price, priceCurrency: "RUB",itemCondition:"https://schema.org/NewCondition", availability: "https://schema.org/InStock",seller:{"@id":`${SITE.url}/#organization`} } };
  const breadcrumbs={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Главная",item:SITE.url},{"@type":"ListItem",position:2,name:"Каталог",item:`${SITE.url}/#catalog`},{"@type":"ListItem",position:3,name:product.name,item:productUrl}]};
  const related=getProducts().filter(item=>item.id!==product.id).slice(0,3);
  return <main className="container-page py-10 sm:py-12">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structured).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }} />
    <nav aria-label="Хлебные крошки" className="flex flex-wrap items-center gap-2 text-sm text-black/50"><Link href="/" className="hover:text-[#df7457]">Главная</Link><span aria-hidden="true">/</span><Link href="/#catalog" className="hover:text-[#df7457]">Каталог</Link><span aria-hidden="true">/</span><span aria-current="page" className="text-[#17352d]">{product.name}</span></nav>
    <div className="mt-7 grid gap-10 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
      <LightboxGallery images={product.images} name={product.name} />
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="flex flex-wrap items-center gap-3"><p className="font-bold uppercase tracking-[.16em] text-[#cf684e]">Доктор Панг</p><span className="rounded-full bg-[#dfeee7] px-3 py-1 text-xs font-bold">В наличии</span></div>
        <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">{product.name}</h1>
        <p className="mt-5 text-lg leading-8 text-black/60">{description}</p>
        <div className="mt-8 flex items-baseline gap-3"><p className="text-3xl font-extrabold">{price.toLocaleString("ru-RU")} ₽</p>{product.discount > 0 ? <><span className="text-lg text-black/35 line-through">{product.price.toLocaleString("ru-RU")} ₽</span><span className="rounded-full bg-[#df7457] px-2.5 py-1 text-xs font-bold text-white">−{product.discount}%</span></> : null}</div>
        <div className="mt-8 grid gap-3">
          {product.wbUrl ? <a href={product.wbUrl} target="_blank" rel="noreferrer" className="btn-primary">Купить на Wildberries <ExternalLink aria-hidden="true" size={17} /></a> : null}
          {product.ozonUrl ? <a href={product.ozonUrl} target="_blank" rel="noreferrer" className="btn-secondary">Купить на Ozon <ExternalLink aria-hidden="true" size={17} /></a> : null}
          <RequestDialog productName={product.name} label="Заказать напрямую" className="btn-secondary" />
        </div>
        {product.description ? <div className="mt-10 whitespace-pre-line leading-7 text-black/65">{product.description}</div> : null}
      </div>
    </div>
    {related.length ? <section className="mt-20 border-t border-black/10 pt-12"><p className="font-bold uppercase tracking-[.16em] text-[#cf684e]">Каталог</p><h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Другие морские продукты</h2><div className="mt-7 grid gap-5 sm:grid-cols-3">{related.map(item=><Link key={item.id} href={`/products/${item.slug}`} className="group overflow-hidden rounded-3xl bg-white shadow-[0_10px_35px_rgb(23_53_45/.07)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b54]"><div className="relative aspect-[3/4] overflow-hidden"><Image src={item.images[0]||"/images/logo.png"} alt={item.name} fill sizes="(max-width:640px) 100vw,33vw" className="object-cover [transform:scaleY(1.04)] transition-transform duration-500 group-hover:[transform:scale(1.025,1.066)] motion-reduce:transition-none"/></div><div className="p-5"><h3 className="text-lg font-extrabold">{item.name}</h3><p className="mt-2 font-bold">{Math.trunc(item.price-item.price*item.discount/100).toLocaleString("ru-RU")} ₽</p></div></Link>)}</div></section>:null}
  </main>;
}
