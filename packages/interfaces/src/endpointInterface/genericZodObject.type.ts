import { z } from "zod";

export type GenericZodObject = z.ZodObject<any, any, any>;

export type GenericZodStringObject = z.ZodObject<
  { [k: string]: z.ZodString },
  any,
  any
>;

export type GenericZodStringOrStringListObject = z.ZodObject<
  { [k: string]: z.ZodString | z.ZodArray<z.ZodString> },
  any,
  any
>;
