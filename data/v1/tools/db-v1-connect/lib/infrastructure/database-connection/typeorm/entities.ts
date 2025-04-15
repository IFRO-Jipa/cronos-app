import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("courses")
export class CourseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "full_name", type: "text", nullable: true })
  fullName!: string | null;

  @Column({ name: "emoji", type: "text", nullable: true })
  emoji!: string | null;
}

@Entity("subjects")
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "full_name", type: "text", nullable: true })
  fullName!: string | null;

  @OneToMany(() => SubjectSlugEntity, (row) => row.subject)
  slugs!: SubjectSlugEntity[] | null;
}

@Entity("subjects_slugs")
export class SubjectSlugEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "slug", type: "text", nullable: false })
  slug!: string;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: "id_subject_fk" })
  subject!: SubjectEntity;
}

@Entity("teachers")
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "full_name", type: "text", nullable: true })
  fullName!: string | null;

  @Column({ name: "common_name", type: "text", nullable: true })
  commonName!: string | null;
}

@Entity("teachers_slugs")
export class TeacherSlugEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "slug", type: "text", nullable: false })
  slug!: string;

  @ManyToOne(() => TeacherEntity)
  @JoinColumn({ name: "id_teacher_fk" })
  teacher!: TeacherEntity;
}

@Entity("students_classes")
export class StudentClassEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "period", type: "text", nullable: true })
  period!: string | null;

  @ManyToOne(() => CourseEntity)
  @JoinColumn({ name: "id_course_fk" })
  course!: CourseEntity;
}

@Entity("students_classes_slugs")
export class StudentClassSlugEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "period", type: "text", nullable: false })
  period!: string;

  @ManyToOne(() => StudentClassEntity)
  @JoinColumn({ name: "id_student_class_fk" })
  studentClass!: StudentClassEntity;
}

@Entity("lessons_schedules")
export class LessonScheduleEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "date", type: "text", nullable: false })
  date!: string;

  @Column({ name: "starts_at", type: "text", nullable: false })
  startsAt!: string;

  @Column({ name: "ends_at", type: "text", nullable: false })
  endsAt!: string;

  @ManyToOne(() => TeacherEntity)
  @JoinColumn({ name: "id_teacher_fk" })
  teacher!: TeacherEntity;

  @ManyToOne(() => StudentClassEntity)
  @JoinColumn({ name: "id_student_class_fk" })
  studentClass!: StudentClassEntity;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: "id_subject_fk" })
  subject!: SubjectEntity;
}

export const entities = [
  CourseEntity,
  SubjectEntity,
  SubjectSlugEntity,
  TeacherEntity,
  TeacherSlugEntity,
  StudentClassEntity,
  StudentClassSlugEntity,
  LessonScheduleEntity,
];
