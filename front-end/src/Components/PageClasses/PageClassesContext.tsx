import { createContext } from "use-context-selector";
import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAvailableClasses } from "./useAvailableClasses";
import { COURSES_ID_LABELS } from "./utils/COURSES_ID_LABELS";
import { COURSES_YEAR_LABELS } from "./utils/COURSES_YEAR_LABELS";
import PageLoading from "../PageLoading/PageLoading";
import { useNavigate } from "react-router-dom";
import { COURSES_LABEL_LABELS } from "./utils/COURSES_LABEL_LABELS";
import { COURSES_ID_EMOJIS } from "./utils/COURSES_ID_EMOJIS";

export type IPageClassesContext = {
  selectedCourse: string | null;
  setSelectedCourse: Dispatch<SetStateAction<string | null>>;

  selectedPeriod: string | null;
  setSelectedPeriod: Dispatch<SetStateAction<string | null>>;

  selectedLabel: string | null;
  setSelectedLabel: Dispatch<SetStateAction<string | null>>;

  availableCourses: { id: string; label: string; emoji: string }[];
  availablePeriods: { id: string; label: string }[];
  availableLabels: { id: string; label: string }[];
};

export const PageClassesContext = createContext({} as IPageClassesContext);

export const PageClassesContextProvider: FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const navigate = useNavigate();

  const { availableClasses, isLoading } = useAvailableClasses();

  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const availableCourses = useMemo(
    () =>
      Object.keys(availableClasses).map((id) => ({
        id,
        label: COURSES_ID_LABELS[id],
        emoji: COURSES_ID_EMOJIS[id],
      })),
    [availableClasses]
  );

  const availablePeriods = useMemo(() => {
    if (availableCourses.length === 0) {
      return [];
    }

    const targetCourse = selectedCourse ?? availableCourses[0].id;

    return Object.keys(availableClasses[targetCourse]).map((id) => ({
      id,
      label: COURSES_YEAR_LABELS[id],
    }));
  }, [availableClasses, availableCourses, selectedCourse]);

  const availableLabels = useMemo(() => {
    if (availableCourses.length === 0) {
      return [];
    }

    const targetCourse = selectedCourse ?? availableCourses[0].id;

    const targetPeriod = selectedPeriod
      ? String(selectedPeriod)
      : Object.keys(availableClasses[targetCourse])[0];

    return Object.values(availableClasses[targetCourse][targetPeriod]).map(
      (id) => ({ id, label: COURSES_LABEL_LABELS[id.toLocaleUpperCase()] })
    );
  }, [availableClasses, availableCourses, selectedCourse, selectedPeriod]);

  useEffect(() => {
    if (selectedCourse && selectedPeriod && selectedLabel) {
      navigate(`${selectedCourse}-${selectedPeriod}-${selectedLabel}`);
    }
  }, [selectedCourse, selectedPeriod, selectedLabel]);

  if (isLoading) {
    return <PageLoading />;
  }

  return (
    <PageClassesContext.Provider
      value={{
        selectedCourse,
        setSelectedCourse,
        selectedPeriod,
        setSelectedPeriod,
        selectedLabel,
        setSelectedLabel,
        availableCourses,
        availablePeriods,
        availableLabels,
      }}
    >
      {children}
    </PageClassesContext.Provider>
  );
};
