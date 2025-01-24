interface SectionProps {
  memeUrl: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function Section({ memeUrl, onClick, children }: SectionProps) {
  return (
    <section className="mb-12">
      <div 
        className="cursor-pointer"
        onClick={onClick}
      >
        <img 
          src={memeUrl} 
          alt="Cat meme explaining LLM capability" 
          className="rounded-lg shadow-md w-full max-w-2xl mx-auto hover:shadow-lg transition-shadow"
        />
      </div>
      {children}
    </section>
  );
}
