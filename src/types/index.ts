import {z} from "zod";
import {TodoSchema} from "@/models";

export type TTask = z.infer<typeof TodoSchema>;
