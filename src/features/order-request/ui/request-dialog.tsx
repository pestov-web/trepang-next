'use client';
import { useActionState, useRef } from 'react';
import { Phone, X } from 'lucide-react';
import { createRequestAction } from '../api/create-request';
import { initialRequestState } from '../model/request-state';

export function RequestDialog({
  productName = '',
  label = 'Заказать звонок',
  className = 'btn-primary',
}: {
  productName?: string;
  label?: string;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [state, action, pending] = useActionState(createRequestAction, initialRequestState);
  return (
    <>
      <button type='button' className={className} onClick={() => dialog.current?.showModal()}>
        <Phone size={17} />
        {label}
      </button>
      <dialog
        ref={dialog}
        className='m-auto w-[min(460px,calc(100%-24px))] rounded-[28px] bg-white p-0 text-[#17352d] shadow-2xl backdrop:bg-[#17352d]/60'
      >
        <div className='p-7 sm:p-9'>
          <button
            type='button'
            aria-label='Закрыть'
            className='absolute right-5 top-5 grid size-9 place-items-center rounded-full bg-black/5'
            onClick={() => dialog.current?.close()}
          >
            <X size={18} />
          </button>
          {state.success ? (
            <div className='py-8 text-center'>
              <div className='mx-auto grid size-14 place-items-center rounded-full bg-[#dfeee7] text-2xl'>✓</div>
              <h2 className='mt-5 text-2xl font-extrabold'>Спасибо!</h2>
              <p className='mt-2 text-black/60'>{state.message}</p>
              <button type='button' className='btn-primary mt-6' onClick={() => dialog.current?.close()}>
                Закрыть
              </button>
            </div>
          ) : (
            <form action={action} className='grid gap-4'>
              <p className='text-sm font-bold uppercase tracking-[.15em] text-[#df7457]'>Свяжемся с вами</p>
              <h2 className='text-3xl font-extrabold'>
                {productName ? `Заказать «${productName}»` : 'Обратный звонок'}
              </h2>
              <input type='hidden' name='productName' value={productName} />
              <input className='hidden' name='website' tabIndex={-1} autoComplete='off' />
              <label className='label'>
                Ваше имя
                <input className='field' name='name' required autoComplete='name' />
                {state.errors?.name?.map((e) => (
                  <span className='text-xs text-red-600' key={e}>
                    {e}
                  </span>
                ))}
              </label>
              <label className='label'>
                Телефон
                <input
                  className='field'
                  name='telephone'
                  type='tel'
                  placeholder='+7 902 055-55-52'
                  required
                  autoComplete='tel'
                />
                {state.errors?.telephone?.map((e) => (
                  <span className='text-xs text-red-600' key={e}>
                    {e}
                  </span>
                ))}
              </label>
              <label className='label'>
                Комментарий
                <textarea className='field min-h-24' name='comment' />
              </label>
              {state.message ? (
                <p aria-live='polite' className='text-sm text-red-600'>
                  {state.message}
                </p>
              ) : null}
              <button disabled={pending} className='btn-primary mt-2'>
                {pending ? 'Отправляем…' : 'Отправить заявку'}
              </button>
              <p className='text-xs leading-5 text-black/40'>
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
              </p>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
