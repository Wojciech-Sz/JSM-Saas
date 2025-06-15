import CompanionsList from "@/components/cards/CompanionsList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ROUTES } from "@/constants/routes";
import {
  getUserCompanions,
  getUserSessionHistory,
} from "@/lib/actions/companion.action";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const user = await currentUser();

  if (!user) return redirect(ROUTES.SIGN_IN);

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessionHistory({ userId: user.id });

  return (
    <main className="lg:w-3/4">
      <section className="flex items-center justify-between gap-4 max-sm:flex-col">
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl}
            alt={user.firstName ?? "User"}
            width={110}
            height={110}
            className="rounded-sm"
          />

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-muted-foreground text-sm">
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex h-fit flex-col gap-2 rounded-lg border border-black p-3">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/check.svg"
                alt="check"
                width={22}
                height={22}
              />
              <p className="text-2xl font-bold">{sessionHistory.length}</p>
            </div>
            <p className="text-muted-foreground text-sm">Lessons Completed</p>
          </div>

          <div className="flex h-fit flex-col gap-2 rounded-lg border border-black p-3">
            <div className="flex items-center gap-2">
              <Image src="/icons/cap.svg" alt="cap" width={22} height={22} />
              <p className="text-2xl font-bold">{companions.length}</p>
            </div>
            <p className="text-muted-foreground text-sm">Companions Created</p>
          </div>
        </div>
      </section>
      <Accordion type="multiple">
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title="Recent Sessions"
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions ({companions.length})
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default ProfilePage;
