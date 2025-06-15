import CompanionForm from "@/components/forms/CompanionForm";
import { ROUTES } from "@/constants/routes";
import { newCompanionPermissions } from "@/lib/actions/companion.action";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewCompanionPage = async () => {
  const { userId } = await auth();

  if (!userId) return redirect(ROUTES.SIGN_IN);

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="items-center justify-center md:w-2/3 lg:w-1/2 xl:w-1/3">
      {canCreateCompanion ? (
        <article className="flex w-full flex-col gap-4">
          <h1>Companion Builder</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit">
          <Image
            src="/images/limit.svg"
            alt="Companion limit reached"
            width={350}
            height={230}
          />

          <div className="cta-badge">Upgrade your plan</div>

          <h1>You have reached your limit</h1>
          <p>
            You have reached your limit of active companions. Upgrade your plan
            to create more companions.
          </p>

          <Link
            className="btn-primary w-full justify-center"
            href={ROUTES.SUBSCRIPTION}
          >
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanionPage;
