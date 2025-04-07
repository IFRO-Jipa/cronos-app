import "@typespec/http";

using Http;

scalar schedule_date extends string;
scalar schedule_time extends string;

namespace Teste {
  model TeacherSlug {
    id: string;
    slug: string;
    teacher: Teacher;
  }

  model Teacher {
    id: string;
    fullName: string | null;
    commonName: string | null;
  }

  model ClassGroup {
    id: string;
  }

  model Subject {
    id: string;
  }

  model ScheduleLesson {
    id: string;

    date: schedule_date;
    period: [schedule_time, schedule_time];

    teacher: Teacher;
    classGroup: ClassGroup;
    subject: Subject;
  }
}

@service(#{ title: "Dataset Service" })

namespace DatasetService {
  @route("/v1/-/")
  @tag("Schedule Lessons")
  interface ScheduleLessons {
    @route("/class-groups/{classGroupId}")
    @get list(@path classGroupId: string): Teste.ScheduleLesson[];
  }
}
