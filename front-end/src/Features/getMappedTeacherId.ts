const getIdMappings = () =>
  import("./TEACHER_ID_MAPPINGS").then((mod) => mod.default);

export const getMappedTeacherId = async (baseId: string) => {
  const idMappings = await getIdMappings();

  let prevNextId;
  let nextId = baseId;

  do {
    prevNextId = nextId;
    nextId = idMappings[nextId] ?? nextId;
  } while (prevNextId !== nextId);

  return nextId;
};
