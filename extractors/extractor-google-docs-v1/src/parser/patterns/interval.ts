export const PATTERN_INTERVAL_RAW = /^(\d{2}:\d{2}) - (\d{2}:\d{2})$/;

export const isIntervalRaw = (payload: unknown) => {
  if (typeof payload === "string") {
    return payload.match(PATTERN_INTERVAL_RAW) !== null;
  }

  return false;
};

export type IParsedInterval = {
  startsAt: string;
  endsAt: string;
};

export const parseInterval = (payload: string): IParsedInterval => {
  if (isIntervalRaw(payload)) {
    const match = payload.match(PATTERN_INTERVAL_RAW);

    if (!match) throw new Error("wtf");

    const [, startsAt, endsAt] = match;

    if (!startsAt || !endsAt) throw new Error("wtf");

    return { startsAt, endsAt };
  }

  throw new Error("not a valid interval");
};
