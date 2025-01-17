import { useEffect, useState } from "react";
import postService, { CanceledError, Post } from "../services/posts-service";

const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("useEffect")
        setIsLoading(true);
        const { request, abort } = postService.getPosts();
        request.then((response) => {
            setPosts(response.data);
            console.log(response.data);
            setIsLoading(false);
        }).catch((error) => {
            if (!(error instanceof CanceledError)) {
                console.log(error);
                setError("Network Error!!!");
                setIsLoading(false);
            }
        });
        return () => { abort() };
    }, []);
    return { posts, setPosts, error, setError, isLoading, setIsLoading };

}

export default usePosts;