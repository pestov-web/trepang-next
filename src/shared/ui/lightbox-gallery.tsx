"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Props = {
  images: string[];
  name: string;
  variant?: "product" | "documents";
};

export function LightboxGallery({ images, name, variant = "product" }: Props) {
  const [current, setCurrent] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current === null) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [current]);

  if (!images.length) return null;
  const isProduct = variant === "product";
  const move = (direction: number) => setCurrent(index => index === null ? 0 : (index + direction + images.length) % images.length);

  return <>
    <div className={isProduct ? "grid grid-cols-2 gap-3" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"}>
      {images.map((src, index) => <button type="button" onClick={() => setCurrent(index)} aria-label={`Увеличить: ${name}, изображение ${index + 1}`} className={`group relative aspect-[3/4] cursor-zoom-in overflow-hidden bg-[#edf3ef] text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6b54] ${isProduct && index === 0 ? "col-span-2 rounded-3xl" : "rounded-2xl"}`} key={src}>
        <Image src={src} alt={`${name}, изображение ${index + 1}`} fill sizes={isProduct && index === 0 ? "(max-width:1024px) 100vw,54vw" : "(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"} className="object-cover [transform:scaleY(1.08)]" preload={isProduct && index === 0} />
        <span className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-white/90 text-[#17352d] opacity-0 shadow-md backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"><ZoomIn aria-hidden="true" size={20} /></span>
      </button>)}
    </div>

    <dialog ref={dialogRef} onClose={() => setCurrent(null)} onClick={event => { if (event.target === event.currentTarget) setCurrent(null); }} aria-label={`Просмотр изображений: ${name}`} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none overflow-hidden bg-black/90 p-0 text-white backdrop:bg-black/80">
      {current !== null ? <div onClick={event => { if (event.target === event.currentTarget) setCurrent(null); }} className="relative flex h-full w-full items-center justify-center p-4 sm:p-10">
        <Image src={images[current]} alt={`${name}, увеличенное изображение ${current + 1}`} fill sizes="100vw" className="object-contain p-4 sm:p-10" />
        <button type="button" onClick={() => setCurrent(null)} aria-label="Закрыть изображение" className="absolute right-4 top-4 z-10 grid size-12 place-items-center rounded-full bg-white text-[#17352d] shadow-lg hover:bg-[#dfeee7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-7 sm:top-7"><X aria-hidden="true" size={22} /></button>
        {images.length > 1 ? <><button type="button" onClick={() => move(-1)} aria-label="Предыдущее изображение" className="absolute left-3 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#17352d] shadow-lg hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-7"><ChevronLeft aria-hidden="true" size={24} /></button><button type="button" onClick={() => move(1)} aria-label="Следующее изображение" className="absolute right-3 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#17352d] shadow-lg hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-7"><ChevronRight aria-hidden="true" size={24} /></button><p className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm font-bold backdrop-blur">{current + 1} / {images.length}</p></> : null}
      </div> : null}
    </dialog>
  </>;
}
