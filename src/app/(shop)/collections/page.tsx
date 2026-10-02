import Link from 'next/link';

export const metadata = {
  title: 'Collections | The ArtNook',
  description: 'Curated collections of handmade resin art.',
};

export default function CollectionsPage() {
  const collections = [
    {
      slug: 'ocean-whispers',
      name: 'Ocean Whispers',
      description: 'Inspired by the deep blue, featuring layers of teal, cobalt, and gold leaf waves.',
      color: 'bg-deep-sea',
      textColor: 'text-paper'
    },
    {
      slug: 'botanical-dreams',
      name: 'Botanical Dreams',
      description: 'Real pressed flowers preserved forever in crystal clear resin.',
      color: 'bg-mint',
      textColor: 'text-ink'
    },
    {
      slug: 'midnight-magic',
      name: 'Midnight Magic',
      description: 'Dark, moody pieces with iridescent shifts and starry glitter.',
      color: 'bg-ink',
      textColor: 'text-paper'
    },
    {
      slug: 'sunrise-glow',
      name: 'Sunrise Glow',
      description: 'Warm marigold, coral, and rose hues to brighten your everyday.',
      color: 'bg-marigold',
      textColor: 'text-ink'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="font-fraunces text-4xl md:text-5xl text-ink mb-4">Curated Collections</h1>
        <p className="font-sans text-lg text-ink/80 max-w-xl mx-auto">
          Explore our pieces grouped by mood, color story, and inspiration. Which one calls to you?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map(collection => (
          <Link key={collection.slug} href={`/collections/${collection.slug}`} className="group block">
            <div className={`p-8 md:p-12 h-80 rounded-[24px] border-2 border-ink flex flex-col justify-end transition-transform group-hover:-translate-y-2 group-hover:shadow-[8px_8px_0px_#2B1B3D] ${collection.color}`}>
              <h2 className={`font-fraunces text-3xl mb-4 ${collection.textColor}`}>{collection.name}</h2>
              <p className={`font-sans text-lg ${collection.textColor} opacity-90 line-clamp-3`}>
                {collection.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
