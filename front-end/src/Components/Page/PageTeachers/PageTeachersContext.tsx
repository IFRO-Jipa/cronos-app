import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { IListWeekTeachersResourceResponseDto } from "../../../Features/horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IListWeekTeachersResourceResponseDto";
import { WeeksContext } from "../../Week/WeeksContext/WeeksContext";

const FuseModule = import("fuse.js").then((mod) => mod.default);

export type IPageTeachersContext = {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;

  resultTeachers: IListWeekTeachersResourceResponseDto;

  resultTeachersQuery: UseQueryResult<
    IListWeekTeachersResourceResponseDto,
    unknown
  >;

  isLoading: boolean;
};

export const PageTeachersContext = createContext({} as IPageTeachersContext);

export const PageTeachersContextProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const teachersQuery = useContextSelector(
    WeeksContext,
    ({ weekTeachersQuery }) => weekTeachersQuery,
  );

  const allTeachers = useMemo(
    () => teachersQuery.data ?? [],
    [teachersQuery.data],
  );

  const resultTeachersQuery = useQuery({
    queryKey: [allTeachers, "query", searchQuery],
    queryFn: async () => {
      const Fuse = await FuseModule;

      if (!searchQuery.trim()) {
        return allTeachers;
      }

      const options = {
        includeScore: true,
        distance: 100,
        threshold: 0.35,
        keys: ["slugs.slug", "fullName"],
      };

      const fuse = new Fuse(allTeachers, options);

      return fuse.search(searchQuery).map((i) => i.item);
    },
  });

  const resultTeachers = useMemo(
    () => resultTeachersQuery.data ?? [],
    [resultTeachersQuery.data],
  );

  return (
    <PageTeachersContext.Provider
      value={{
        searchQuery,
        setSearchQuery,

        resultTeachers,
        resultTeachersQuery,

        isLoading: teachersQuery.isLoading || resultTeachersQuery.isLoading,
      }}
    >
      {children}
    </PageTeachersContext.Provider>
  );
};
