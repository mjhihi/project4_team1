-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Mushroom1" (
    "ID" int   NOT NULL,
    "CapShape" VARCHAR   NOT NULL,
    "CapSurface" VARCHAR   NOT NULL,
    "CapColor" VARCHAR   NOT NULL,
    "Bruises" VARCHAR   NOT NULL,
    "Odor" VARCHAR   NOT NULL,
    "gill-attachment" VARCHAR   NOT NULL,
    "gill-spacing" VARCHAR   NOT NULL,
    "gill-size" VARCHAR   NOT NULL,
    "gill-color" VARCHAR   NOT NULL,
    "population" VARCHAR   NOT NULL,
    "habitat" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Mushroom1" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Mushroom2" (
    "ID" int   NOT NULL,
    "stalk-shape" VARCHAR   NOT NULL,
    "stalk-root" VARCHAR   NOT NULL,
    "stalk-surface-above-ring" VARCHAR   NOT NULL,
    "stalk-surface-below-ring" VARCHAR   NOT NULL,
    "stalk-color-above-ring" VARCHAR   NOT NULL,
    "stalk-color-below-ring" VARCHAR   NOT NULL,
    "veil-type" VARCHAR   NOT NULL,
    "veil-color" VARCHAR   NOT NULL,
    "ring-number" VARCHAR   NOT NULL,
    "ring-type" VARCHAR   NOT NULL,
    "spore-print-color" VARCHAR   NOT NULL,
    CONSTRAINT "pk_Mushroom2" PRIMARY KEY (
        "ID"
     )
);

ALTER TABLE "Mushroom1" ADD CONSTRAINT "fk_Mushroom1_ID" FOREIGN KEY("ID")
REFERENCES "Mushroom2" ("ID");

