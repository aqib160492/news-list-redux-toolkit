1. I have gone through the NEWS API and based on NEWS API I am showing TOP NEWS on home page
2. As country parameter was compulsary, By default I am using IN as an country
3. For Search, I am searching from the top news.
4. For hiding perticular news, I am saving the item in the localstorage, This could be easier if we have an unique News Ids.
5. Sorting is bit buggy and I wasn't able to solve it as I didnt have much time for it. There are 2 bugs in the sort,
   i) When we load more, new page data is not sorted. That we can solve by saving sort order in the redux toolkit and sort the data every time we change the page.
   ii) If we sort the data, whole data should be sorted and not just fetched data. Thats the reason we sort the data at server end and fetch sorted data only.
