CREATE TABLE `courses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text
);
--> statement-breakpoint
CREATE TABLE `lesson_schedule` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` text NOT NULL,
	`starts_at` text NOT NULL,
	`ends_at` text NOT NULL,
	`id_teacher_fk` integer NOT NULL,
	`id_student_class_fk` integer NOT NULL,
	`id_subject_fk` integer NOT NULL,
	FOREIGN KEY (`id_teacher_fk`) REFERENCES `teachers`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_student_class_fk`) REFERENCES `students_classes`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`id_subject_fk`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `students_classes_slugs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`period` text NOT NULL,
	`id_student_class_fk` integer NOT NULL,
	FOREIGN KEY (`id_student_class_fk`) REFERENCES `students_classes`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `students_classes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`period` text NOT NULL,
	`id_course_fk` integer NOT NULL,
	FOREIGN KEY (`id_course_fk`) REFERENCES `courses`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `subjects_slugs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text,
	`id_subject_fk` integer NOT NULL,
	FOREIGN KEY (`id_subject_fk`) REFERENCES `subjects`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `subjects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text
);
--> statement-breakpoint
CREATE TABLE `teachers_slugs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text,
	`id_teacher_fk` integer NOT NULL,
	FOREIGN KEY (`id_teacher_fk`) REFERENCES `teachers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `teachers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`full_name` text,
	`common_name` text
);
