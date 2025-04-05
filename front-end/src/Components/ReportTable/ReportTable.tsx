import { FC, Fragment, LegacyRef } from "react";
import { IReportTableData } from "./interfaces/IReportTableData";
import { getTableStyles, tableBaseClassName } from "./utils/getTableStyles";
import { DEFAULT_DAY_TIME_RANGES } from "./utils/DEFAULT_DAY_TIME_RANGES";

export type IReportTableProps = {
  data: IReportTableData;

  tableRef?: LegacyRef<HTMLTableElement> | undefined;

  tableStyleRef?: LegacyRef<HTMLStyleElement> | undefined;
};

const ReportTable: FC<IReportTableProps> = (props) => {
  const { data, tableRef, tableStyleRef } = props;

  const { columns, days, dayTimeRanges = DEFAULT_DAY_TIME_RANGES } = data;

  return (
    <>
      <style
        ref={tableStyleRef}
        dangerouslySetInnerHTML={{ __html: getTableStyles() }}
      />

      <table ref={tableRef} className={tableBaseClassName}>
        <thead>
          <tr>
            <th>Dia</th>
            <th></th>
            <th>Horários</th>
            {columns.map((column) => (
              <th key={column.header}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <Fragment key={day.weekDayOrder}>
              {dayTimeRanges.map((dayTimeRange, dayTimeRangeOrder) => (
                <tr
                  key={dayTimeRangeOrder}
                  data-order={dayTimeRangeOrder}
                  data-week-day={day.weekDayOrder}
                >
                  {dayTimeRangeOrder === 0 && (
                    <>
                      <td className="col-day" rowSpan={dayTimeRanges.length}>
                        <span>{day.weekDayText}</span>
                      </td>
                      <td className="col-date" rowSpan={dayTimeRanges.length}>
                        <span>{day.dateText}</span>
                      </td>
                    </>
                  )}

                  <td className="col-time">{dayTimeRange.text}</td>

                  {columns.map((column) => {
                    const displayText =
                      column.items === "loading"
                        ? "Carregando..."
                        : column?.items.find(
                            (i) =>
                              i.order === dayTimeRangeOrder &&
                              i.weekDay === day.weekDayOrder
                          )?.text ?? "-";

                    return (
                      <td key={column.header} className="col-text">
                        {displayText}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ReportTable;
