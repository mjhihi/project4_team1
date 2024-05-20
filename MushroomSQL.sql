-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Mushroom1" (
    "ID" int   NOT NULL,
    "CapShape" string   NOT NULL,
    "CapSurface" string   NOT NULL,
    "CapColor" string   NOT NULL,
    "Bruises" string   NOT NULL,
    "Odor" string   NOT NULL,
    "gill-attachment" string   NOT NULL,
    "gill-spacing" string   NOT NULL,
    "gill-size" string   NOT NULL,
    "gill-color" string   NOT NULL,
    "population" string   NOT NULL,
    "habitat" string   NOT NULL,
    CONSTRAINT "pk_Mushroom1" PRIMARY KEY (
        "ID"
     )
);

CREATE TABLE "Mushroom2" (
    "ID" int   NOT NULL,
    "stalk-shape" string   NOT NULL,
    "stalk-root" string   NOT NULL,
    "stalk-surface-above-ring" string   NOT NULL,
    "stalk-surface-below-ring" string   NOT NULL,
    "stalk-color-above-ring" string   NOT NULL,
    "stalk-color-below-ring" string   NOT NULL,
    "veil-type" string   NOT NULL,
    "veil-color" string   NOT NULL,
    "ring-number" string   NOT NULL,
    "ring-type" string   NOT NULL,
    "spore-print-color" string   NOT NULL,
    CONSTRAINT "pk_Mushroom2" PRIMARY KEY (
        "ID"
     )
);

ALTER TABLE "Mushroom1" ADD CONSTRAINT "fk_Mushroom1_ID" FOREIGN KEY("ID")
REFERENCES "Mushroom2" ("ID");

