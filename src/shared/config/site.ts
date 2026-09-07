export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://trepang.online").replace(/\/$/, "");

export const SITE = {
  name: "Доктор Панг",
  url: SITE_URL,
  description: "Трепанг и морские биокомплексы собственного производства из Владивостока с доставкой по России.",
  phone: "+79020555552",
  email: "info@trepang.online",
} as const;

export const absoluteUrl = (path = "") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
