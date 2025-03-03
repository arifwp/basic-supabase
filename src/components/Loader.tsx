interface Props {
  title?: string;
  msg?: string;
}

export default function Loader({
  title = "Loading",
  msg = "Tunggu sebentar kami sedang menyiapkan untuk anda",
}: Props) {
  return (
    <div className="w-full p-4 gap-0 flex flex-col justify-center items-center">
      <div className="spinner-loader" />

      <p className="mt-2 text-sm font-semibold text-center">{title}</p>

      <p className="text-xs text-center text-gray-400">{msg}</p>
    </div>
  );
}
