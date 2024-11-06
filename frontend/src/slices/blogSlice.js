import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  blogs: [],
  loading: true,
  maxBlogsLength: null,
};

export const fetchBlogsAsync = createAsyncThunk(
  "blog/fetchBlogs",
  async (currentOffset = 0) => {
    const AllBlogsQuery = {
      query: `
                    query GetAllPosts($limit: Int, $offset: Int) {
                        allPosts(limit: $limit, offset: $offset) {
                          id
                          title
                          content
                          createdAt
                        }
                        lenPosts
                    }
                `,
      variables: {
        limit: 5,
        offset: currentOffset,
      },
    };

    try {
      const response = await axios.post("/graphql/", AllBlogsQuery, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      });
      return response.data.data;
    } catch (error) {
    } finally {
      // Do nothing for now
    }
  }
);

export const addBlogAsync = createAsyncThunk(
  "blog/addBlog",
  async ({ title, content }) => {
    const createBlogMutation = {
      query: `
              mutation CreatePost($title: String!, $content: String!) {
                createPost(title: $title, content: $content) {
                  post {
                    id
                    title
                    content
                    createdAt
                  }
                }
              }
            `,
      variables: { title, content },
    };
    const response = await axios.post("/graphql/", createBlogMutation, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    return response.data.data.createPost.post;
  }
);

export const deleteBlogAsync = createAsyncThunk(
  "blog/deleteBlog",
  async ({ postId }) => {
    const deleteBlogMutation = {
      query: `
              mutation deletePost($postId: ID!) {
                deletePost(postId: $postId) {
                  success
                  deletedId
                }
              }
            `,
      variables: { postId },
    };
    const response = await axios.post("/graphql/", deleteBlogMutation, {
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    });
    return response.data.data.deletePost;
  }
);

const BlogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.push(...action.payload.allPosts);
        state.maxBlogsLength = action.payload.lenPosts;
      })
      .addCase(fetchBlogsAsync.rejected, (state) => {
        state.loading = false;
        state.blogs = [];
        state.maxBlogsLength = null;
      })
      .addCase(addBlogAsync.fulfilled, (state, action) => {
        state.blogs.push(action.payload);
      })
      .addCase(deleteBlogAsync.fulfilled, (state, action) => {
        const blogsListArr = state.blogs;
        blogsListArr.splice(
          blogsListArr.findIndex(({ id }) => id === action.payload.deletedId),
          1
        );
      });
  },
});

export const {} = BlogSlice.actions;
export default BlogSlice.reducer;
