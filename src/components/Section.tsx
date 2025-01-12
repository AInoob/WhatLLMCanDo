interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="prose max-w-none">{children}</div>
    </section>
  );
}
