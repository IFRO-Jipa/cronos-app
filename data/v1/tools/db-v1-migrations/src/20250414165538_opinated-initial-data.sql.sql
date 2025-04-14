-- migrate:up
INSERT INTO
  courses(id, full_name, emoji)
VALUES
  (1, 'TÉCNICO EM FLORESTAS', '🌲'),
  (2, 'TÉCNICO EM QUÍMICA', '🧪'),
  (3, 'TÉCNICO EM INFORMÁTICA', '💻');

INSERT INTO
  students_classes(id, period, id_course_fk)
VALUES
  -- 1ºA FLORESTAS
  (111, '1ºA', 1),
  -- 2ºA FLORESTAS
  (121, '2ºA', 1),
  -- 3ºA FLORESTAS
  (131, '3ºA', 1),
  -- 1ºA QUÍMICA
  (211, '1ºA', 2),
  -- 1ºB QUÍMICA
  (212, '1ºB', 2),
  -- 2ºA QUÍMICA
  (221, '2ºA', 2),
  -- 2ºB QUÍMICA
  (222, '2ºB', 2),
  -- 3ºA QUÍMICA
  (231, '3ºA', 2),
  -- 3ºB QUÍMICA
  (232, '3ºB', 2),
  -- 1ºA INFORMÁTICA
  (311, '1ºA', 3),
  -- 1ºB INFORMÁTICA
  (312, '1ºB', 3),
  -- 2ºA INFORMÁTICA
  (321, '2ºA', 3),
  -- 2ºB INFORMÁTICA
  (322, '2ºB', 3),
  -- 3ºA INFORMÁTICA
  (331, '3ºA', 3),
  -- 3ºB INFORMÁTICA
  (332, '3ºB', 3);

INSERT INTO
  students_classes_slugs(id, period, id_student_class_fk)
VALUES
  ---
  (1, '1ºA  FLOR', 111),
  (2, '2ºA  FLOR', 121),
  (3, '3ºA FLOR', 131),
  ---
  (4, '1ºA  QUI', 211),
  (5, '1ºB  QUI', 212),
  (6, '2ºA  QUI', 221),
  (7, '2ºB  QUI', 222),
  (8, '3ºA  QUI', 231),
  (9, '3ºB  QUI', 232),
  ---
  (10, '1ºA  INF', 311),
  (11, '1ºB  INF', 312),
  (12, '2ºA  INF', 321),
  (13, '2ºB  INF', 322),
  (14, '3ºA  INF', 331),
  (15, '3ºB  INF', 332);

-- migrate:down
DELETE FROM
  students_classes_slugs;

DELETE FROM
  students_classes;

DELETE FROM
  courses;