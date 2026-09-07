import { getProducts } from "@/shared/db";
export { ProductPage as default, generateProductMetadata as generateMetadata } from "@/_pages/product";
export function generateStaticParams(){return getProducts().map(product=>({slug:product.slug}))}
