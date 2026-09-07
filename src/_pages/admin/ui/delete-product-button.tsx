'use client';
import { Trash2 } from 'lucide-react';
export function DeleteProductButton({ action, name }: { action: () => void | Promise<void>; name: string }) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(`Удалить «${name}»? Это действие нельзя отменить.`)) event.preventDefault();
      }}
    >
      <button className='btn-secondary p-3 text-red-600' aria-label={`Удалить ${name}`}>
        <Trash2 size={17} />
      </button>
    </form>
  );
}
