import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Adjust the path if necessary

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/posts'); // Adjust API endpoint as necessary
                setPosts(response.data); // Assume response data is an array of posts
            } catch (error) {
                console.error('Error fetching posts:', error);
                setError('Failed to load posts');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="feed">
            <h1>Feed</h1>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                posts.map(post => (
                    <div key={post._id} className="post">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p>Posted by: {post.user.name}</p>
                        <p>{new Date(post.createdAt).toLocaleString()}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Feed;
