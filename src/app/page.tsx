import CompanionCard from "@/components/cards/CompanionCard";
import CompanionsList from "@/components/cards/CompanionsList";
import CTA from "@/components/cards/CTA";
import {
  getAllCompanions,
  getSessionHistory,
} from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const [companions, sessionHistory] = await Promise.all([
    getAllCompanions({ limit: 3 }),
    getSessionHistory(10),
  ]);

  return (
    <main>
      <h1 className="text-2xl">Popular Companions</h1>

      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={sessionHistory}
          className="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
