import { IGetWeekClassResourceResponseDto } from "../horarios-ifro-data-v2-client/api/resources/weeks/interfaces/IGetWeekClassResourceResponseDto";
import { getFixedSubjectSlug } from "./utils/getFixedSubjectSlug";

export const getReportTableDataColumnFromWeekClass = (
  data: IGetWeekClassResourceResponseDto
) => {
  return {
    header: data.klass.slugs[0].slug,

    items: data.items.map((item) => ({
      order: item.order,

      weekDay: item.weekDayOrder,

      text: [
        item.subject?.name ?? getFixedSubjectSlug(item.subject?.slugs[0].slug!),
        item.teacher?.slugs[0].slug,
      ].join(" - "),
    })),
  };
};
