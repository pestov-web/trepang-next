import Image from 'next/image';
import type { Product } from '@/shared/api';
import { saveProductAction } from '../model/admin-actions';
export function ProductForm({ product }: { product?: Product }) {
  const action = saveProductAction.bind(null, product?.id);
  return (
    <form action={action} className='grid gap-6 rounded-3xl bg-white p-6 shadow-sm md:p-9'>
      <div className='grid gap-5 md:grid-cols-2'>
        <label className='label'>
          Название
          <input className='field' name='name' defaultValue={product?.name} required />
        </label>
        <label className='label'>
          Slug (латиницей)
          <input className='field' name='slug' defaultValue={product?.slug} pattern='[a-z0-9-]+' required />
        </label>
        <label className='label'>
          Цена, ₽
          <input className='field' name='price' type='number' min='0' defaultValue={product?.price || 0} required />
        </label>
        <label className='label'>
          Скидка, %
          <input
            className='field'
            name='discount'
            type='number'
            min='0'
            max='100'
            defaultValue={product?.discount || 0}
          />
        </label>
        <label className='label'>
          Ссылка Wildberries
          <input className='field' name='wbUrl' type='url' defaultValue={product?.wbUrl} />
        </label>
        <label className='label'>
          Ссылка Ozon
          <input className='field' name='ozonUrl' type='url' defaultValue={product?.ozonUrl} />
        </label>
        <label className='label'>
          Порядок
          <input className='field' name='sortOrder' type='number' defaultValue={product?.sortOrder || 0} />
        </label>
        <label className='flex items-center gap-3 self-end pb-3 font-semibold'>
          <input type='checkbox' name='active' defaultChecked={product?.active ?? true} /> Показывать на сайте
        </label>
      </div>
      <label className='label'>
        Краткое описание
        <input className='field' name='shortDescription' defaultValue={product?.shortDescription} />
      </label>
      <label className='label'>
        Полное описание
        <textarea className='field min-h-36' name='description' defaultValue={product?.description} />
      </label>
      {product?.images.length ? (
        <div>
          <p className='mb-3 text-sm font-bold'>Текущие изображения</p>
          <div className='flex flex-wrap gap-3'>
            {product.images.map((src) => (
              <label className='relative' key={src}>
                <Image src={src} alt='' width={100} height={100} className='size-24 rounded-xl object-cover' />
                <span className='mt-1 flex gap-1 text-xs'>
                  <input type='checkbox' name='removeImage' value={src} /> удалить
                </span>
              </label>
            ))}
          </div>
        </div>
      ) : null}
      <label className='label'>
        Добавить изображения
        <input className='field' name='images' type='file' accept='image/*' multiple />
      </label>
      <button className='btn-primary justify-self-start' type='submit'>
        Сохранить карточку
      </button>
    </form>
  );
}
