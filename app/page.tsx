import { connection } from "next/server";
import ScrollExperience from "@/src/components/portfolio/ScrollExperience";
import PortfolioContent from "@/src/components/portfolio/PortfolioContent";
import { getPortfolio } from "@/src/lib/portfolio/portfolio.service";

export default async function Home() {
  await connection();
  const result = await getPortfolio();
  return <main className="mx-auto max-w-7xl px-6 pb-16 text-slate-300 sm:px-10">
    <ScrollExperience hasContent={result.status === "ready"}>
      {result.status === "ready" ? <PortfolioContent data={result.data} /> : <section id="hero" className="py-24">
        <h1 className="text-4xl font-semibold text-white">Developer portfolio</h1>
        <p className="mt-5 max-w-xl text-lg">{result.status === "empty" ? "Nội dung portfolio chưa được xuất bản." : "Nội dung portfolio tạm thời chưa khả dụng. Vui lòng quay lại sau."}</p>
      </section>}
    </ScrollExperience>
  </main>;
}
