
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import wsClient from './graphqlClient';
import { addPost } from './slices/blogSlice';

const BlogSubscription = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = wsClient.subscribe(
      {
        query: `
          subscription NewPost {
            newPost {
              id
              title
              content
              createdAt
            }
          }
        `,
      },
      {
        next: (data) => {
          if (data.data?.new_post) {
            dispatch(addPost(data.data.new_post));
          }
        },
        error: (err) => console.error('Subscription error:', err),
        complete: () => console.log('Subscription completed'),
      }
    );

    return () => {
      unsubscribe(); // Cleanup on component unmount
    };
  }, [dispatch]);

  return null; // This component just listens, no UI needed
};

export default BlogSubscription;
