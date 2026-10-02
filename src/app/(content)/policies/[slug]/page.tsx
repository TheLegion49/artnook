import { notFound } from 'next/navigation';
import { policies } from '@/data/policies';

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const policy = policies[params.slug as keyof typeof policies];
  
  if (!policy) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="bg-marigold/20 text-ink p-4 rounded-lg mb-8 border-2 border-marigold text-center font-sans text-sm">
        These are template policies for the owner to review with a professional. They are not legal advice.
      </div>
      
      <div className="prose prose-lg prose-headings:font-fraunces prose-p:font-sans prose-a:text-coral mx-auto text-ink">
        {/* Simple markdown parser for demo since we can't guarantee react-markdown is installed */}
        {policy.content.split('\\n\\n').map((paragraph, i) => {
          if (paragraph.startsWith('# ')) {
            return <h1 key={i} className="text-4xl font-fraunces mb-6">{paragraph.replace('# ', '')}</h1>;
          }
          if (paragraph.startsWith('## ')) {
            return <h2 key={i} className="text-2xl font-fraunces mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
          }
          if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
            return <p key={i} className="italic text-ink/70 mb-4">{paragraph.replace(/\\*/g, '')}</p>;
          }
          return <p key={i} className="mb-4">{paragraph}</p>;
        })}
      </div>
    </div>
  );
}
