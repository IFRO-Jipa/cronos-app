import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

// COURSES

export const courseTable = sqliteTable("courses", {
  id: int("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name"),
});

// END COURSES

// SUBJECT

export const subjectTable = sqliteTable("subjects", {
  id: int("id").primaryKey({ autoIncrement: true }),
  fullName: text("full_name"),
});

export const subjectSlugTable = sqliteTable("subjects_slugs", {
  id: int().primaryKey({ autoIncrement: true }),

  slug: text("slug"),

  idSubjectFk: int("id_subject_fk").notNull(),
});

export const subjectSlugTableRelations = relations(
  subjectSlugTable,
  ({ one }) => ({
    subject: one(subjectTable, {
      fields: [subjectSlugTable.idSubjectFk],
      references: [subjectTable.id],
    }),
  })
);

// END SUBJECT

// TEACHER

export const teacherTable = sqliteTable("teachers", {
  id: int("id").primaryKey({ autoIncrement: true }),

  fullName: text("full_name"),
  commonName: text("common_name"),
});

export const teacherSlugTable = sqliteTable("teachers_slugs", {
  id: int().primaryKey({ autoIncrement: true }),
  slug: text("slug"),
  idTeacherFk: int("id_teacher_fk").notNull(),
});

export const teacherTableRelations = relations(teacherTable, ({ many }) => ({
  slugs: many(teacherSlugTable),
}));

export const teacherSlugTableRelations = relations(
  teacherSlugTable,
  ({ one }) => ({
    teacher: one(teacherTable, {
      fields: [teacherSlugTable.idTeacherFk],
      references: [teacherTable.id],
    }),
  })
);

// END TEACHER

// STUDENT CLASS

export const studentClassTable = sqliteTable("students_classes", {
  id: int("id").primaryKey({ autoIncrement: true }),

  period: text("period").notNull(),

  idCourseFk: int("id_course_fk").notNull(),
});

export const studentClassSlugTable = sqliteTable("students_classes_slugs", {
  id: int("id").primaryKey({ autoIncrement: true }),

  slug: text("period").notNull(),

  idStudentClassFk: int("id_student_class_fk").notNull(),
});

export const studentClassTableRelations = relations(
  studentClassTable,
  ({ many }) => ({
    slugs: many(studentClassSlugTable),
  })
);

export const studentClassSlugTableRelations = relations(
  studentClassSlugTable,
  ({ one }) => ({
    studentClass: one(studentClassTable, {
      fields: [studentClassSlugTable.idStudentClassFk],
      references: [studentClassTable.id],
    }),
  })
);

// END STUDENT CLASS

export const lessonScheduleTable = sqliteTable("lesson_schedule", {
  id: int("id").primaryKey({ autoIncrement: true }),

  date: text("date").notNull(),

  startsAt: text("starts_at").notNull(),
  endsAt: text("ends_at").notNull(),

  idTeacherFk: int("id_teacher_fk").notNull(),
  idStudentClassFk: int("id_student_class_fk").notNull(),
  idSubjectFk: int("id_subject_fk").notNull(),
});

export const lessonScheduleTableRelations = relations(
  lessonScheduleTable,
  ({ one }) => ({
    teacher: one(teacherTable, {
      fields: [lessonScheduleTable.idTeacherFk],
      references: [teacherTable.id],
    }),
    studentClass: one(studentClassTable, {
      fields: [lessonScheduleTable.idStudentClassFk],
      references: [studentClassTable.id],
    }),
    subject: one(subjectTable, {
      fields: [lessonScheduleTable.idSubjectFk],
      references: [subjectTable.id],
    }),
  })
);
