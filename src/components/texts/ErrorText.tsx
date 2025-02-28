interface Props {
  msg?: string;
}

export default function ErrorText({ msg }: Props) {
  if (!msg) return;

  return <p className="text-red-400 text-sm mt-2">{msg}</p>;
}
