import apiClient, { CanceledError } from "./api-client";

export { CanceledError }

export interface Post {
    _id: string;
    content: string;
    owner: string;
    userImgUrl: string;
    username: string;
}

const getPosts = () => {
    const abortController = new AbortController();
    const request = apiClient.get<Post[]>("/posts",
        { signal: abortController.signal });
    return { request, abort: () => abortController.abort() };
}

export default { getPosts };