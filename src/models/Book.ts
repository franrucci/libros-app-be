import { Schema, model, InferSchemaType } from "mongoose";

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        author: {
            type: String,
            required: [true, "Author is required"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        publishedDate: {
            type: Date,
        },
        coverImage: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

type BookType = InferSchemaType<typeof bookSchema>;

const Book = model<BookType>("Book", bookSchema);

export default Book;
