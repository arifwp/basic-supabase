interface Props {
  name: string;
  content: string;
  created_at: Date;
}

export default function PostItem({ name, content, created_at }: Props) {
  return (
    <div className="w-full p-4 bg-dark-secondary rounded-lg">
      <p className="text-xs text-green-primary">{name}</p>

      <p className="mt-2 text-xs">{content}</p>

      <p className="mt-2 text-xs text-gray-400">{`${created_at || ""}`}</p>
    </div>
  );
}
