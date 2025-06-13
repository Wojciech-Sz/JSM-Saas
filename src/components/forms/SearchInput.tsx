"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("topic") ?? "";

  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });

        router.push(newUrl, {
          scroll: false,
        });
      } else {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["topic"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [router, searchParams, pathname, searchQuery]);

  return (
    <div className="relative flex h-9 items-center gap-2 rounded-lg border border-black px-2 py-1">
      <Search size={15} absoluteStrokeWidth />
      <input
        placeholder="Search companions..."
        className="outline-none focus-visible:ring-0"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;
