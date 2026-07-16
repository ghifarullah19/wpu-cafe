export interface IReview {
  id: string;
  menu_item_id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface IReviewListResponse {
  data: IReview[];
  metadata: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  };
}

export interface ICreateReviewPayload {
  menuItemId: string;
  reviewerName: string;
  rating: number;
  comment: string;
}

export interface IReviewQuery {
  page: number;
  pageSize: number;
  menuItemId?: string;
  minRating?: number;
  sortBy: "created_at" | "rating";
  sortOrder: "asc" | "desc";
}
