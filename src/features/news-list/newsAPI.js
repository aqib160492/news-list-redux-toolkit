import { constant } from "../../common/constant";
// A mock function to mimic making an async request for data
export const fetchNews = (query, page = 1,country = "in") => {
  return new Promise((resolve, reject) =>
    //setTimeout(() => resolve({ data: amount }), 500)
    fetch(`${constant.BASE_URL}/top-headlines?country=${country}&q=${query}&page=${page}&apiKey=${constant.API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {
          resolve(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          reject(error);
        }
      )
  );
}

export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}
