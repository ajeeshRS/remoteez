export default function ErrorMessage({ err }: any) {
  return (
    <>
      {err && (
        <p className="text-xs text-red-500">{err.message}</p>
      )}
    </>
  );
}
