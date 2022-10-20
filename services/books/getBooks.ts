import {  books } from "@libs/books";

type GetBooksResponse = {
    statusCode: number;
    body: string;
}


export const handler = async (): Promise<GetBooksResponse> => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            books
        })
    }
}