import Hero from '@/components/Hero'

export default function Home() {
  return (
    <div
      className={
        "flex size-full flex-col items-center gap-32 overflow-hidden py-32"
      }
    >
      <Hero />
    </div>
  );
}
