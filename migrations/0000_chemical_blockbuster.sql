CREATE TABLE "note" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"body" text,
	"colors" text NOT NULL,
	"position" text NOT NULL
);
