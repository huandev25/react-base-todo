import {z} from "zod";

const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 191;

export const TodoSchema = z.object({
    id: z.string(),
    content: z.string()
        .min(MIN_NAME_LENGTH, `Task content must be at least ${MIN_NAME_LENGTH} character long`)
        .max(MAX_NAME_LENGTH, `Task content must be at most ${MAX_NAME_LENGTH} characters long`),
    isCompleted: z.boolean(),
    isImportant: z.boolean()
});
