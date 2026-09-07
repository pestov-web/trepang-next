import "server-only";
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import type { Product } from "@/shared/api";

mkdirSync(path.join(process.cwd(),"data"),{recursive:true});
const db=new DatabaseSync(path.join(process.cwd(),"data","trepang.sqlite"));
db.exec("PRAGMA busy_timeout=10000");
db.exec(`PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT,slug TEXT UNIQUE NOT NULL,name TEXT NOT NULL,short_description TEXT NOT NULL DEFAULT '',description TEXT NOT NULL DEFAULT '',price INTEGER NOT NULL DEFAULT 0,discount INTEGER NOT NULL DEFAULT 0,ozon_url TEXT NOT NULL DEFAULT '',wb_url TEXT NOT NULL DEFAULT '',active INTEGER NOT NULL DEFAULT 1,sort_order INTEGER NOT NULL DEFAULT 0,images TEXT NOT NULL DEFAULT '[]',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
const seed=[
["trepang-na-medu","Трепанг на меду",2800,"250511457",["dp1.webp","dp1-2.webp","dp1-3.webp","dp1-4.webp","dp1-5.webp"]],
["trepang-v-kapsulah","Трепанг в капсулах",5000,"256311216",["dp2.webp","dp2-2.webp","dp2-3.webp","dp2-4.webp","dp2-5.webp","dp2-6.webp"]],
["ekstrakt-trepanga","Экстракт трепанга",1200,"250540124",["dp3.webp","dp3-2.webp","dp3-3.webp","dp3-4.webp","dp3-5.webp"]],
["ikra-morskogo-ezha","Икра морского ежа",2700,"256315343",["dp4.webp","dp4-2.webp","dp4-3.webp","dp4-4.webp","dp4-5.webp"]],
["trepang-susheniy","Трепанг сушеный",30500,"268048494",["dp5.webp","dp5-2.webp"]],
["morskoy-kollagen","Морской коллаген",2200,"250076234",["dp6.webp","dp6-2.webp","dp6-3.webp","dp6-4.webp"]],
["ekstrakt-ploskogo-ezha","Экстракт плоского ежа",2500,"261663755",["dp7-1.webp","dp7-2.webp","dp7-3.webp","dp7-4.webp"]],
["medvezhya-zhelch","Медвежья желчь",2800,"292690610",["j1.webp","j2.webp","j3.webp","j4.webp","j5.webp","j6.webp","j7.webp","j8.webp"]],
["laminariya","Ламинария",500,"296801682",["l1.webp","l2.webp","l3.webp","l4.webp","l5.webp","l6.webp","l7.webp"]],
["vosstanovlenie-pecheni","Восстановление печени",2500,"304738901",["p1.webp","p2.webp","p3.webp","p4.webp","p5.webp","p6.webp"]],
["biokompleks-dlya-zheludka","Биокомплекс для желудка",2500,"302473681",["g1.webp","g2.webp","g3.webp","g4.webp","g5.webp","g6.webp"]],
["ascidiya","Асцидия",2500,"",["a1.webp","a2.webp","a3.webp","a4.webp"]]] as const;
if((db.prepare("SELECT count(*) count FROM products").get() as {count:number}).count===0){const q=db.prepare("INSERT INTO products(slug,name,price,wb_url,images,sort_order) VALUES(?,?,?,?,?,?)");seed.forEach((p,i)=>q.run(p[0],p[1],p[2],p[3]?`https://www.wildberries.ru/catalog/${p[3]}/detail.aspx`:"",JSON.stringify(p[4].map(x=>`/images/goods/${x}`)),i))}
type Row=Record<string,string|number>;
const map=(r:Row):Product=>({id:+r.id,slug:""+r.slug,name:""+r.name,shortDescription:""+r.short_description,description:""+r.description,price:+r.price,discount:+r.discount,ozonUrl:""+r.ozon_url,wbUrl:""+r.wb_url,active:Boolean(r.active),sortOrder:+r.sort_order,images:JSON.parse(""+r.images),createdAt:""+r.created_at,updatedAt:""+r.updated_at});
export const getProducts=(all=false)=>(db.prepare(`SELECT * FROM products ${all?"":"WHERE active=1"} ORDER BY sort_order,id`).all() as Row[]).map(map);
export const getProductBySlug=(slug:string)=>{const r=db.prepare("SELECT * FROM products WHERE slug=? AND active=1").get(slug) as Row|undefined;return r?map(r):null};
export const getProductById=(id:number)=>{const r=db.prepare("SELECT * FROM products WHERE id=?").get(id) as Row|undefined;return r?map(r):null};
export function saveProduct(p:Omit<Product,"id"|"createdAt"|"updatedAt">,id?:number){const v=[p.slug,p.name,p.shortDescription,p.description,p.price,p.discount,p.ozonUrl,p.wbUrl,+p.active,p.sortOrder,JSON.stringify(p.images)];if(id){db.prepare("UPDATE products SET slug=?,name=?,short_description=?,description=?,price=?,discount=?,ozon_url=?,wb_url=?,active=?,sort_order=?,images=?,updated_at=CURRENT_TIMESTAMP WHERE id=?").run(...v,id);return id}return Number(db.prepare("INSERT INTO products(slug,name,short_description,description,price,discount,ozon_url,wb_url,active,sort_order,images) VALUES(?,?,?,?,?,?,?,?,?,?,?)").run(...v).lastInsertRowid)}
export const deleteProduct=(id:number)=>db.prepare("DELETE FROM products WHERE id=?").run(id);
