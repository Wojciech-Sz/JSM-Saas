import CompanionForm from "@/components/forms/CompanionForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const NewCompanionPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return (
    <main className="items-center justify-center md:w-2/3 lg:w-1/2 xl:w-1/3">
      <article className="flex w-full flex-col gap-4">
        <h1>Companion Builder</h1>
        <CompanionForm />
      </article>
    </main>
  );
};

export default NewCompanionPage;
