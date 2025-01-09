interface SectionTitleProps {
  label: string;
}
export default function SectionTitle({ label }: SectionTitleProps) {
  return (
    <div className="flex gap-2">
      <div className="h-8 w-2 rounded-lg bg-yellow-500" />
      <h2 className="mb-4 mt-0 text-2xl font-bold text-white">{label}</h2>
    </div>
  );
}
