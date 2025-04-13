export const REGION_HEADER_TITLE_PREFIX = "HORÁRIO DE AULAS - ";

export const isRegionHeaderTitle = (payload: unknown) => {
  if (typeof payload === "string") {
    return payload.startsWith(REGION_HEADER_TITLE_PREFIX);
  }

  return false;
};

export type IParsedRegionHeaderTitle = {
  course: string;
  fullHeader: string;
};

export const parseRegionHeaderTitle = (
  payload: string
): IParsedRegionHeaderTitle => {
  if (!isRegionHeaderTitle(payload)) {
    return {
      course: payload,
      fullHeader: payload,
    };
  }

  return {
    course: payload.slice(REGION_HEADER_TITLE_PREFIX.length),
    fullHeader: payload,
  };
};
