import { ROUTES } from "@/constants/routes";
import { Bookmark, Clock } from "lucide-react";
import Link from "next/link";
interface CompanionCardProps {
  id: string;
  name: string;
  topic: string;
  duration: number;
  subject: string;
  color: string;
}

const CompanionCard = ({
  id,
  name,
  topic,
  duration,
  subject,
  color,
}: CompanionCardProps) => {
  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex items-center justify-between">
        <p className="subject-badge">{subject}</p>
        <button className="companion-bookmark">
          <Bookmark color="white" className="h-5 w-5" />
        </button>
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <p className="text-sm">{duration} minutes</p>
      </div>

      <Link href={ROUTES.COMPANION_SESSION(id)} className="w-full">
        <button className="btn-primary w-full justify-center">
          Launch Lesson
        </button>
      </Link>
    </article>
  );
};

export default CompanionCard;
