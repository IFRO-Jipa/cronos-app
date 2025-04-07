import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { IPageAdvancedElementsListItem } from "./interfaces/IPageAdvancedElementsListItem";
import { WeeksContext } from "../../Week/WeeksContext/WeeksContext";

export type IPageAdvancedContext = {
  selectedItems: IPageAdvancedElementsListItem[];
  isItemSelected: (id: string) => boolean;
  setItemSelectedState: (id: string, state: boolean) => void;
  setSelectedItemsIds: Dispatch<SetStateAction<string[]>>;

  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;

  resultItemsQuery: UseQueryResult<IPageAdvancedElementsListItem[], unknown>;
};

export const PageAdvancedContext = createContext({} as IPageAdvancedContext);

const FuseModule = import("fuse.js").then((mod) => mod.default);

export const PageAdvancedContextProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedItemsIds, setSelectedItemsIds] = useState<string[]>([]);

  const classesQuery = useContextSelector(
    WeeksContext,
    ({ weekClassesQuery }) => weekClassesQuery
  );

  const teachersQuery = useContextSelector(
    WeeksContext,
    ({ weekTeachersQuery }) => weekTeachersQuery
  );

  const classes = classesQuery.data;
  const teachers = teachersQuery.data;

  const classesItems: IPageAdvancedElementsListItem[] = useMemo(
    () =>
      (classes ?? []).map((data) => ({
        data: data,
        type: "class",
        id: `class-${data.id}`,
      })),
    [classes]
  );

  const teachersItems: IPageAdvancedElementsListItem[] = useMemo(
    () =>
      (teachers ?? []).map((teacher) => ({
        data: teacher,
        type: "teacher",
        id: `teacher-${teacher.id}`,
      })),
    [teachers]
  );

  const allItems = useMemo(
    () => [...classesItems, ...teachersItems],
    [classesItems, teachersItems]
  );

  const isItemSelected = useCallback(
    (id: string) => selectedItemsIds.includes(id),
    [selectedItemsIds]
  );

  const selectedItems = useMemo(
    () => allItems.filter((i) => isItemSelected(i.id)),
    [isItemSelected, allItems]
  );

  const setItemSelectedState = useCallback((id: string, state: boolean) => {
    setSelectedItemsIds((selectedItems) => {
      return selectedItems.includes(id)
        ? selectedItems.filter((i) => i !== id)
        : [...selectedItems, id];
    });
  }, []);

  const resultItemsQuery = useQuery(
    [allItems, "query", searchQuery],
    async () => {
      const Fuse = await FuseModule;

      if (!searchQuery.trim()) {
        return allItems;
      }

      const options = {
        distance: 100,
        threshold: 0.35,
        includeScore: true,
        keys: ["data.slugs.slug", "data.fullName"],
      };

      const fuse = new Fuse(allItems, options);

      return fuse.search(searchQuery).map((i) => i.item);
    }
  );

  return (
    <PageAdvancedContext.Provider
      value={{
        selectedItems,
        setSelectedItemsIds,
        isItemSelected,
        setItemSelectedState,

        searchQuery,
        setSearchQuery,

        resultItemsQuery,
      }}
    >
      {children}
    </PageAdvancedContext.Provider>
  );
};
