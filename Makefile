sync:
	bun install;
	bun run --filter "@cronos-app/db-v1-migrations" dbmate:up;
	bun run --filter "@cronos-app/db-v1-pull-lessons-schedules" sync;
	