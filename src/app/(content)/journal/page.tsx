import Link from 'next/link';

export const metadata = {
  title: 'Journal | The ArtNook',
  description: 'Behind the scenes, resin tips, and studio updates.',
};

export default function JournalPage() {
  const posts = [
    {
      slug: 'the-art-of-demoulding',
      title: 'The satisfying art of demoulding',
      excerpt: 'There is nothing quite like peeling back silicone to reveal a shiny new piece. Here is a look at my demoulding process and why it is the best part of the job.',
      category: 'Behind the Scenes',
      readTime: '3 min read',
      date: 'Oct 1, 2026'
    },
    {
      slug: 'colour-mixing-101',
      title: 'How I achieve the perfect ocean blue',
      excerpt: 'It takes exactly three different pigments to get that deep sea color. Let\'s break down the recipe.',
      category: 'Process',
      readTime: '5 min read',
      date: 'Sep 15, 2026'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="font-fraunces text-5xl md:text-6xl text-ink mb-6">The Studio Journal</h1>
        <p className="font-sans text-xl text-ink/80 max-w-2xl mx-auto">
          Thoughts, tips, and behind-the-scenes glimpses into the resin life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className="group block h-full">
            <div className="bg-paper p-8 rounded-[24px] border-2 border-ink h-full flex flex-col transition-transform group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0px_#2B1B3D]">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-teal/10 text-teal px-3 py-1 rounded-full text-xs font-bold border-2 border-teal/20">
                  {post.category}
                </span>
                <span className="font-sans text-xs text-ink/50">{post.date}</span>
              </div>
              <h2 className="font-fraunces text-2xl text-ink mb-4 group-hover:text-coral transition-colors">{post.title}</h2>
              <p className="font-sans text-ink/80 flex-grow mb-6">{post.excerpt}</p>
              <div className="font-mono text-sm text-ink/60 font-bold">
                {post.readTime}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
