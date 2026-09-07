import "server-only";
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import type { CustomerRequest } from "@/shared/api";

const db = new DatabaseSync(path.join(process.cwd(), "data", "trepang.sqlite"));
db.exec(`CREATE TABLE IF NOT EXISTS customer_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  telephone TEXT NOT NULL,
  product_name TEXT NOT NULL DEFAULT '',
  comment TEXT NOT NULL DEFAULT '',
  processed INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
)`);

type RequestRow = Record<string, string | number>;
const mapRequest = (row: RequestRow): CustomerRequest => ({
  id: Number(row.id), name: String(row.name), telephone: String(row.telephone),
  productName: String(row.product_name), comment: String(row.comment),
  processed: Boolean(row.processed), createdAt: String(row.created_at),
});

export function createCustomerRequest(input: Pick<CustomerRequest, "name" | "telephone" | "productName" | "comment">) {
  return Number(db.prepare("INSERT INTO customer_requests(name,telephone,product_name,comment) VALUES(?,?,?,?)").run(input.name, input.telephone, input.productName, input.comment).lastInsertRowid);
}
export const getCustomerRequests = () => (db.prepare("SELECT * FROM customer_requests ORDER BY processed, id DESC").all() as RequestRow[]).map(mapRequest);
export const markCustomerRequest = (id: number, processed: boolean) => db.prepare("UPDATE customer_requests SET processed=? WHERE id=?").run(Number(processed), id);
