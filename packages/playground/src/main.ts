import { DatabaseContext } from "@cronos-app/db-v1-connect";
import { getAppDataSource } from "./app.datasource";

const dataSource = await getAppDataSource();
const databaseContext = new DatabaseContext(dataSource);

async function getWeeks() {
  type IRawWeek = { starts_at: string; ends_at: string };

  const weeks = await dataSource.query<IRawWeek[]>(
    `
      SELECT 
        DISTINCT date(lessons_schedules.date, "-6 day", "weekday 1") as starts_at,
        date(lessons_schedules.date, "weekday 6") as ends_at
      FROM lessons_schedules;
    `
  );

  return weeks;
}

async function getStudentClasses() {
  const studentClasses = databaseContext.studentClassRepository.find();
  return studentClasses;
}

async function getLessonsSchedules() {
  const qb = databaseContext.lessonScheduleRepository.createQueryBuilder("ls");

  qb.innerJoin("ls.teacher", "teacher");
  qb.innerJoin("ls.studentClass", "studentClass");
  qb.innerJoin("ls.subject", "subject");

  qb.where("date(ls.date) >= :start AND date(ls.date) <= :end", {
    start: "2025-04-07",
    end: "2025-04-07",
  });

  qb.select(["ls", "teacher", "studentClass", "subject"]);

  console.log(await qb.getMany());
}

console.log("weeks:", await getWeeks());
console.log("student classes:", await getStudentClasses());
