"use server";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { z } from "zod";
import { createCustomerRequest } from "@/shared/db";
import { sendEmail } from "@/shared/lib";
import type { RequestState } from "../model/request-state";

const requestSchema = z.object({
  name: z.string().trim().min(2, "Введите имя"),
  telephone: z.string().trim().regex(/^(?:\+7|8)[\s()-]*\d{3}[\s()-]*\d{3}[\s-]*\d{2}[\s-]*\d{2}$/, "Проверьте номер телефона"),
  productName: z.string().trim().max(200), comment: z.string().trim().max(1000), website: z.string().max(0),
});
export async function createRequestAction(_state: RequestState, formData: FormData): Promise<RequestState> {
  const parsed = requestSchema.safeParse({ name: formData.get("name"), telephone: formData.get("telephone"), productName: formData.get("productName") || "", comment: formData.get("comment") || "", website: formData.get("website") || "" });
  if (!parsed.success) return { success: false, message: "Проверьте заполнение формы", errors: parsed.error.flatten().fieldErrors };
  const requestId = createCustomerRequest(parsed.data); revalidatePath("/admin");
  after(async () => {
    try {
      await sendEmail({ subject: `Новая заявка №${requestId} — Доктор Панг`, text: [`Имя: ${parsed.data.name}`, `Телефон: ${parsed.data.telephone}`, `Товар: ${parsed.data.productName || "Обратный звонок"}`, `Комментарий: ${parsed.data.comment || "—"}`].join("\n") });
    } catch (error) {
      console.error("Не удалось отправить уведомление о заявке", error);
    }
  });
  return { success: true, message: "Заявка принята. Мы скоро вам позвоним." };
}
