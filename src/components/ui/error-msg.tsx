import { FieldError } from 'react-hook-form';

export default function ErrorMessage({ err }: { err: FieldError | undefined  }) {
  return <>{err && <p className="text-xs text-red-500">{err.message}</p>}</>;
}
