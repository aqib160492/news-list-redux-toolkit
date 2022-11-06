import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { fetchNews } from "./newsAPI";

const initialState = {
  news: [],
  totalCount: 0,
  page: 1,
  status: "idle"
};
export const newsAsync = createAsyncThunk(
  "news/fetchNews",
  async ({ query, page, country }) => {
    const response = await fetchNews(query, page, country);
    return response;
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    loadMore: (state) => {
      state.page += 1;
    },
    clearNews: (state) => {
      state.news = [];
      state.totalCount = 0;
      state.page = 1;
    },
    hideItem: (state, action) => {
      let hiddenItems = localStorage.getItem("hiddenItems");
      if (hiddenItems === null) {
        hiddenItems = [];
      } else {
        hiddenItems = JSON.parse(hiddenItems);
      }
      const newHiddenItems = hiddenItems.filter(
        (hiddenItem) => hiddenItem !== action.payload
      );
      state.news = current(state.news).filter(
        (news) => news !== action.payload
      );
      localStorage.setItem(
        "hiddenItems",
        JSON.stringify([action.payload, ...newHiddenItems])
      );
    },
    sortItem: (state, action) => {
      console.log(current(state.news));
      let sortedNews = [...current(state.news)];
      if (action.payload === "ASC")
        sortedNews = sortedNews.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
      else
        sortedNews = sortedNews.sort((a, b) => {
          return new Date(a.publishedAt) - new Date(b.publishedAt);
        });
      console.log(sortedNews);
      state.news = sortedNews;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(newsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(newsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const hiddenItems = JSON.parse(localStorage.getItem("hiddenItems"));
        const newsArr = [
          ...current(state.news),
          ...action.payload.articles
        ].filter(
          (item) =>
            hiddenItems.findIndex(
              (hiddenItem) => hiddenItem.title === item.title
            ) < 0
        );
        state.news = newsArr;
        state.totalCount = action.payload.totalResults - hiddenItems.length;
      });
  }
});
export const { loadMore, clearNews, hideItem, sortItem } = newsSlice.actions;

export const selectNews = (state) => state.news || [];

export default newsSlice.reducer;
