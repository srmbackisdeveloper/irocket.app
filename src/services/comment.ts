import { TComment } from "../core/comment.type";
import { axiosInstance } from "./api";

class CommentAPI {
    private axios = axiosInstance("create_comment");

    postComment = async (rating: number, text: string) => {
        const response = await this.axios.post<TComment>('/', {
            [rating]: rating,
            [text]: text
        });
        return response.data;
    }
}

export const commentAPI = new CommentAPI();