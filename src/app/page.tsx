import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import StorySection from "@/components/StorySection";
import CalendarIntegration from "@/components/CalendarIntegration";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Home({ searchParams }: HomeProps) {
  const guestName = typeof searchParams.name === 'string' ? searchParams.name : undefined;

  return (
    <main className="min-h-screen">
      <HeroSection name={guestName} />
      
      <div className="bg-navy relative z-10 -mt-10 pt-20 rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <CountdownTimer />
        <CalendarIntegration />
        <StorySection />
      </div>
      
      <footer className="py-8 text-center text-gray-500 font-light text-sm border-t border-white/5 bg-navy">
        &copy; {new Date().getFullYear()} Our Housewarming. Handcrafted with love.
      </footer>
    </main>
  );
}
