import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { format } from "date-fns/format";
import { FC } from "react";
import { useContextSelector } from "use-context-selector";
import { WeeksContext } from "../WeeksContext/WeeksContext";

export type IWeekSelectProps = {
  showLabel?: boolean;
  showLatestLabel?: boolean;

  disabled?: boolean;
};

const WeekSelect: FC<IWeekSelectProps> = (props) => {
  const { showLabel = true, showLatestLabel = true, disabled = false } = props;

  const selectedWeek = useContextSelector(
    WeeksContext,
    ({ selectedWeek }) => selectedWeek,
  );

  const setSelectedWeek = useContextSelector(
    WeeksContext,
    ({ setSelectedWeek }) => setSelectedWeek,
  );

  const weeks = useContextSelector(WeeksContext, ({ weeks }) => weeks);

  const isLoading = useContextSelector(
    WeeksContext,
    ({ weeksQuery }) => weeksQuery.isLoading,
  );

  return (
    <>
      <FormControl
        size={"medium"}
        variant="standard"
        disabled={disabled}
        style={{ width: "100%" }}
      >
        {showLabel && (
          <InputLabel id="select-week-label">Horário Semanal</InputLabel>
        )}

        <Select
          label="Horário Semanal"
          labelId="select-week-label"
          value={selectedWeek ?? "null"}
          onChange={(e) => {
            const value = e.target.value;
            setSelectedWeek(value !== "null" ? value : null);
          }}
        >
          {isLoading && (
            <MenuItem disabled value="null">
              Carregando...
            </MenuItem>
          )}

          {weeks.map((week, idx, arr) => {
            const text =
              week.startsAt && week.endsAt
                ? `${format(new Date(week.startsAt), "dd/MM")} a ${format(
                    new Date(week.endsAt),
                    "dd/MM",
                  )}`
                : week.title;

            const isLastWeek = idx === arr.length - 1;

            return (
              <MenuItem key={week.id} value={week.id}>
                {text}
                {isLastWeek && showLatestLabel && " (mais recente)"}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default WeekSelect;
