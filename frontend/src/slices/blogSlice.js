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
      return response.data.data
    } catch (error) {
    } finally {
      // Do nothing
    }

    //   const config = getConfig();
    //   const response = await axios.get(`/api/documents/docs?${filter}`, config);
    //   return response.data;
  }
);

const BlogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlogsAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchBlogsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs.push(...action.payload.allPosts);
      state.maxBlogsLength = action.payload.lenPosts;

    });
    builder.addCase(fetchBlogsAsync.rejected, (state, action) => {
      state.loading = false;
      state.blogs = [];
      state.maxBlogsLength = null;
    });
  },
});

export const {} = BlogSlice.actions;
export default BlogSlice.reducer;
