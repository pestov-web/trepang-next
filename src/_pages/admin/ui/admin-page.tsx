import Image from 'next/image';
import Link from 'next/link';
import { Check, Pencil, Plus, RotateCcw } from 'lucide-react';
import { getCustomerRequests, getProducts } from '@/shared/db';
import { deleteProductAction, logoutAction, toggleRequestAction } from '../model/admin-actions';
import { DeleteProductButton } from './delete-product-button';
export function AdminPage() {
  const products = getProducts(true),
    requests = getCustomerRequests();
  return (
    <main className='container-page py-10'>
      <div className='flex flex-wrap items-center justify-between gap-4'>
        <div>
          <p className='text-sm font-bold text-[#df7457]'>УПРАВЛЕНИЕ КАТАЛОГОМ</p>
          <h1 className='text-4xl font-extrabold'>
            Товары <span className='text-black/30'>{products.length}</span>
          </h1>
        </div>
        <div className='flex gap-3'>
          <Link className='btn-primary' href='/admin/products/new'>
            <Plus size={18} />
            Новый товар
          </Link>
          <form action={logoutAction}>
            <button className='btn-secondary'>Выйти</button>
          </form>
        </div>
      </div>
      <div className='mt-8 overflow-hidden rounded-3xl bg-white shadow-sm'>
        {products.map((p) => (
          <div
            key={p.id}
            className='grid grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-black/5 p-4 last:border-0'
          >
            <Image
              src={p.images[0] || '/images/logo.png'}
              alt=''
              width={64}
              height={64}
              className='size-16 rounded-xl object-cover'
            />
            <div>
              <p className='font-bold'>{p.name}</p>
              <p className='text-sm text-black/45'>
                {p.price.toLocaleString('ru-RU')} ₽ · {p.active ? 'Опубликован' : 'Скрыт'}
              </p>
            </div>
            <div className='flex gap-2'>
              <Link href={`/admin/products/${p.id}`} className='btn-secondary p-3' aria-label='Редактировать'>
                <Pencil size={17} />
              </Link>
              <DeleteProductButton action={deleteProductAction.bind(null, p.id)} name={p.name} />
            </div>
          </div>
        ))}
      </div>
      <section className='mt-14'>
        <div>
          <p className='text-sm font-bold text-[#df7457]'>ОБРАТНАЯ СВЯЗЬ</p>
          <h2 className='text-4xl font-extrabold'>
            Заявки <span className='text-black/30'>{requests.filter((r) => !r.processed).length}</span>
          </h2>
        </div>
        <div className='mt-7 grid gap-3'>
          {requests.length === 0 ? (
            <p className='rounded-3xl bg-white p-8 text-black/45'>Заявок пока нет</p>
          ) : (
            requests.map((r) => (
              <article
                className={`grid gap-4 rounded-3xl p-5 shadow-sm md:grid-cols-[1fr_auto] ${r.processed ? 'bg-white/50 opacity-60' : 'bg-white'}`}
                key={r.id}
              >
                <div>
                  <div className='flex flex-wrap items-center gap-3'>
                    <h3 className='text-lg font-bold'>{r.name}</h3>
                    <a className='font-bold text-[#1f6b54]' href={`tel:${r.telephone}`}>
                      {r.telephone}
                    </a>
                    <time className='text-xs text-black/40'>{new Date(r.createdAt + 'Z').toLocaleString('ru-RU')}</time>
                  </div>
                  {r.productName ? (
                    <p className='mt-2 text-sm'>
                      <b>Товар:</b> {r.productName}
                    </p>
                  ) : null}
                  {r.comment ? <p className='mt-1 text-sm text-black/60'>{r.comment}</p> : null}
                </div>
                <form action={toggleRequestAction.bind(null, r.id, !r.processed)}>
                  <button className='btn-secondary text-sm'>
                    {r.processed ? (
                      <>
                        <RotateCcw size={16} />
                        Вернуть
                      </>
                    ) : (
                      <>
                        <Check size={16} />
                        Обработано
                      </>
                    )}
                  </button>
                </form>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
