import { environment } from "../constants/environment";
import type { ICreateReviewPayload, IReviewQuery, IReviewListResponse } from "../types/review";
import fetchAPI from "../utils/fetch";
import { getLocalStorage } from "../utils/storage";

export const getReviews = async (query: IReviewQuery): Promise<IReviewListResponse> => {
  const params = new URLSearchParams();
  params.append("page", String(query.page));
  params.append("pageSize", String(query.pageSize));
  params.append("sortBy", query.sortBy);
  params.append("sortOrder", query.sortOrder);
  
  if (query.menuItemId) {
    params.append("menuItemId", query.menuItemId);
  }
  
  if (query.minRating !== undefined && query.minRating !== null) {
    params.append("minRating", String(query.minRating));
  }

  const url = `${environment.API_URL}/reviews?${params.toString()}`;

  const result = await fetchAPI(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getLocalStorage("auth")}`,
    },
  });

  return result;
};

export const createReview = async (payload: ICreateReviewPayload) => {
  const result = await fetchAPI(`${environment.API_URL}/reviews`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getLocalStorage("auth")}`,
    },
    body: JSON.stringify(payload),
  });
  return result;
};
