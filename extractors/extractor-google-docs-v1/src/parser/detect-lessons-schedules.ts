import type { IDetectedRow } from "./detect-rows";
import { detectScheduleRegions } from "./detect-schedule-regions";

export const detectLessonsSchedules = function* (
  detectedRows: Iterable<IDetectedRow>
) {
  for (const region of detectScheduleRegions(detectedRows)) {
    yield* region.lessonsSchedules;
  }
};
