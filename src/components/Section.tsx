interface SectionProps {
  title: string;
  children: React.ReactNode;
  memeUrl?: string;
}

export function Section({ title, children, memeUrl }: SectionProps) {
  return (
    <section className="mb-12">
      <div className="flex flex-col items-center mb-6">
        {memeUrl && (
          <img 
            src={memeUrl} 
            alt={`${title} cat meme`} 
            className="rounded-lg shadow-md mb-4 h-48 w-auto object-contain"
          />
        )}
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className="prose max-w-none">{children}</div>
    </section>
  );
}
