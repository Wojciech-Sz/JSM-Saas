/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ROUTES } from "@/constants/routes";
import { getCompanionById } from "@/lib/actions/companion.action";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const CompanionSessionPage = async ({ params }: CompanionSessionPageProps) => {
  const { id } = await params;

  const companion = await getCompanionById(id);

  const { name, topic, subject, duration } = companion;

  const user = await currentUser();

  if (!user) return redirect("/sign-in");

  if (!companion) return redirect(ROUTES.COMPANIONS);

  return (
    <main>
      <article className="rounded-border flex justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="flex size-18 items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{name}</p>
              <div className="subject-badge max-sm:hidden">{subject}</div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {duration} minutes
        </div>
      </article>
    </main>
  );
};

export default CompanionSessionPage;
