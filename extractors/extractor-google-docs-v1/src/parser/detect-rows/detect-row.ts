import type { ITableRow } from "../../utils/core/interfaces/ITableRow";
import {
  isIntervalRaw,
  parseInterval,
  type IParsedInterval,
} from "../patterns/interval";
import { isRegionHeaderTitle } from "../patterns/region-header";

export enum DetectedRowKind {
  REGION_HEADER,
  SCHEDULE,
  REGION_CLASSSES_HEADER,
}

export type IDetectedRowRegionHeader = {
  kind: DetectedRowKind.REGION_HEADER;
  values: (string | null)[];
  meta: {
    title: string;
    daysRangeHeader: string;
  };
};

export type IDetectedRowRegionClassesHeader = {
  kind: DetectedRowKind.REGION_CLASSSES_HEADER;
  meta: { studentClassesSlugs: string[] };
  values: (string | null)[];
};

export type IDetectedRowRegionClassesSchedule = {
  kind: DetectedRowKind.SCHEDULE;
  values: (string | null)[];

  meta: {
    day: string | null;
    dayRaw: string | null;
    intervalRaw: string;
    interval: IParsedInterval;
  };
};

export type IDetectedRow =
  | IDetectedRowRegionHeader
  | IDetectedRowRegionClassesHeader
  | IDetectedRowRegionClassesSchedule;

export const detectRow = function (tableRow: ITableRow) {
  const values = tableRow.values.map((rawValue) => {
    if (typeof rawValue == "string") {
      const value = rawValue.trim();

      if (value.length > 0 && value !== "-") {
        return value;
      }
    }

    return null;
  });

  const validValues = values.filter((value) => Boolean(value)) as string[];

  if (validValues.length === 0) return null;

  if (values.slice(0, 3).every((i) => i === null)) return null;

  if (typeof values[0] === "string" && isRegionHeaderTitle(values[0])) {
    const header = validValues[0];
    const daysRangeHeader = validValues[1];

    const detectedRow = <IDetectedRowRegionHeader>{
      kind: DetectedRowKind.REGION_HEADER,
      values,
      meta: { title: header, daysRangeHeader },
    };

    return detectedRow;
  } else if (
    values[0] === "Dia" &&
    values[1] === "Data" &&
    values[2] === "Horário"
  ) {
    const classes = validValues.slice(3);

    const detectedRow = {
      kind: DetectedRowKind.REGION_CLASSSES_HEADER,
      meta: { studentClassesSlugs: classes },
      values,
    } satisfies IDetectedRowRegionClassesHeader;

    return detectedRow;
  } else if (typeof values[2] === "string" && isIntervalRaw(values[2])) {
    const dayRaw = values[1] ?? null;
    const day = dayRaw && dayRaw.split("/").reverse().join("-");

    const intervalRaw = values[2];
    const interval = parseInterval(intervalRaw);

    const detectedRow = {
      kind: DetectedRowKind.SCHEDULE,

      values,

      meta: {
        day,
        dayRaw,
        interval,
        intervalRaw,
      },
    } satisfies IDetectedRowRegionClassesSchedule;

    return detectedRow;
  } else {
    console.warn(JSON.stringify({ values, validValues }, null, 2));
    throw new Error("unhandled row");
  }
};
