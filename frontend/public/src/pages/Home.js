import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Adjust the path if necessary
import { useAuth } from '../context/AuthContext'; // Import the authentication context
import './Home.css'; // Import your CSS file for styling

const Home = () => {
    const { user } = useAuth(); // Get the user info from the auth context
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/posts'); // Fetch all posts
                setPosts(response.data); // Set the posts in state
            } catch (error) {
                setError('Failed to fetch posts.'); // Set error message
            } finally {
                setLoading(false); // Set loading to false
            }
        };

        fetchPosts();
    }, []);

    if (loading) return <div>Loading...</div>; // Show loading state

    return (
        <div className="home">
            <h1>Welcome to the Social Media Platform</h1>
            {error && <p className="error">{error}</p>} {/* Show error if any */}
            <div className="posts">
                {posts.length === 0 ? (
                    <p>No posts available.</p> // Show message if no posts
                ) : (
                    posts.map(post => (
                        <div key={post._id} className="post">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <p className="author">Posted by: {post.author}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
