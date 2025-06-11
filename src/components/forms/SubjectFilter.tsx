"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

import { subjects } from "@/constants/index";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSelectSubject = (subject: string) => {
    let newUrl = "";

    if (subject && subject !== "all") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject.toLowerCase(),
      });
    } else {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value) => onSelectSubject(value)}>
      <SelectTrigger className="w-full rounded-lg border border-black px-4 py-3">
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Subjects</SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject} className="capitalize">
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
