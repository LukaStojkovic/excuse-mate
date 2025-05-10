import { Footer } from "./_components/Footer";
import { Navbar } from "./_components/Navbar";

export default function MarketingLayout({ children }) {
  return (
    <div className="h-full bg-slate-100 dark:bg-[#2C2C2C]">
      <Navbar />
      <main className="dark:bg-[#2C2C2C] pt-40 pb-20 bg-slate-100">
        {children}
      </main>
      <Footer />
    </div>
  );
}
