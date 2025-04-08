import type { DataSource } from "typeorm";
import {
  CourseEntity,
  LessonScheduleEntity,
  StudentClassEntity,
  StudentClassSlugEntity,
  SubjectEntity,
  SubjectSlugEntity,
  TeacherEntity,
  TeacherSlugEntity,
} from "./entities";

export class DatabaseContext {
  constructor(private source: DataSource) {}

  get couseRepository() {
    return this.source.getRepository(CourseEntity);
  }

  get subjectRepository() {
    return this.source.getRepository(SubjectEntity);
  }

  get subjectSlugRepository() {
    return this.source.getRepository(SubjectSlugEntity);
  }

  get teacherRepository() {
    return this.source.getRepository(TeacherEntity);
  }

  get teacherSlugRepository() {
    return this.source.getRepository(TeacherSlugEntity);
  }

  get studentClassRepository() {
    return this.source.getRepository(StudentClassEntity);
  }

  get studentClassSlugRepository() {
    return this.source.getRepository(StudentClassSlugEntity);
  }

  get lessonScheduleRepository() {
    return this.source.getRepository(LessonScheduleEntity);
  }
}
