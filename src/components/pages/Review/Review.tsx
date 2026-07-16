import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Skeleton from "../../ui/Skeleton";
import { createReview } from "../../../services/reviews.service";
import { fetcher } from "../../../utils/fetch";
import { environment } from "../../../constants/environment";
import type { IReview } from "../../../types/review";
import type { IMenu } from "../../../types/order";
import styles from "./Review.module.css";

const Review = () => {
  // Page states for URL queries
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [filterMenuId, setFilterMenuId] = useState("");
  const [filterMinRating, setFilterMinRating] = useState("");

  // Form inputs states
  const [formMenuId, setFormMenuId] = useState("");
  const [formReviewerName, setFormReviewerName] = useState("");
  const [formRating, setFormRating] = useState("");
  const [formComment, setFormComment] = useState("");

  // UI status feedbacks states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    menuId?: string;
    reviewerName?: string;
    rating?: string;
    comment?: string;
  }>({});

  // Fetch menus for mapping ID->Name and selector options
  const { data: menuData } = useSWR(`${environment.API_URL}/menu?page=1&pageSize=100`, fetcher);
  const menus: IMenu[] = menuData?.data || [];

  // Map sortOption to API parameter values
  let sortBy: "created_at" | "rating" = "created_at";
  let sortOrder: "asc" | "desc" = "desc";
  if (sortOption === "oldest") {
    sortBy = "created_at";
    sortOrder = "asc";
  } else if (sortOption === "rating-desc") {
    sortBy = "rating";
    sortOrder = "desc";
  } else if (sortOption === "rating-asc") {
    sortBy = "rating";
    sortOrder = "asc";
  }

  // Construct query parameters for GET request SWR key
  const queryParams = new URLSearchParams();
  queryParams.append("page", String(page));
  queryParams.append("pageSize", "10");
  queryParams.append("sortBy", sortBy);
  queryParams.append("sortOrder", sortOrder);
  if (filterMenuId) queryParams.append("menuItemId", filterMenuId);
  if (filterMinRating) queryParams.append("minRating", filterMinRating);

  const reviewsUrl = `${environment.API_URL}/reviews?${queryParams.toString()}`;

  // Fetch reviews using SWR
  const {
    data: reviewsData,
    error: reviewsError,
    isLoading: isReviewsLoading,
    mutate: mutateReviews,
  } = useSWR(reviewsUrl, fetcher);

  const reviews: IReview[] = reviewsData?.data || [];
  const totalPages = reviewsData?.metadata?.totalPages || 0;

  // FilterLoaded_Reviews locally using search query
  const trimmedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredReviews = reviews.filter((review: IReview) => {
    if (!trimmedSearchQuery) return true;
    const nameMatches = review.reviewer_name.toLowerCase().includes(trimmedSearchQuery);
    const commentMatches = review.comment.toLowerCase().includes(trimmedSearchQuery);
    return nameMatches || commentMatches;
  });

  // Handler for sort filter changes
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    setPage(1);
  };

  // Handler for menu filter changes
  const handleFilterMenuChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterMenuId(e.target.value);
    setPage(1);
  };

  // Handler for min rating filter changes
  const handleFilterRatingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterMinRating(e.target.value);
    setPage(1);
  };

  // Submission handler with validations
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    const errors: {
      menuId?: string;
      reviewerName?: string;
      rating?: string;
      comment?: string;
    } = {};

    if (!formMenuId) {
      errors.menuId = "Please select a menu item.";
    }
    if (!formReviewerName.trim()) {
      errors.reviewerName = "Reviewer name is required.";
    }

    const parsedRating = parseInt(formRating, 10);
    if (!formRating) {
      errors.rating = "Please select a rating.";
    } else if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      errors.rating = "Rating must be an integer between 1 and 5.";
    }

    if (!formComment.trim()) {
      errors.comment = "Comment is required.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setIsSubmitting(true);

    try {
      await createReview({
        menuItemId: formMenuId,
        reviewerName: formReviewerName.trim(),
        rating: parsedRating,
        comment: formComment.trim(),
      });

      // Clear fields upon success
      setFormMenuId("");
      setFormReviewerName("");
      setFormRating("");
      setFormComment("");
      setSubmitSuccess("Review submitted successfully.");

      // Refresh reviews list
      mutateReviews();
    } catch (err) {
      console.error(err);
      setSubmitError("Review could not be submitted. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Visual stars helper for accessible ratings rendering
  const renderStars = (ratingNum: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= ratingNum ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      );
    }
    return (
      <div className={styles.starsWrapper} aria-label={`${ratingNum} out of 5 stars`}>
        {stars}
        <span className={styles["sr-only"]}>({ratingNum} out of 5 stars)</span>
      </div>
    );
  };

  // Select dropdown option arrays
  const menuOptions = [
    { value: "", label: "Select a menu item..." },
    ...menus.map((m) => ({ value: m.id, label: m.name })),
  ];

  const filterMenuOptions = [
    { value: "", label: "All menu items" },
    ...menus.map((m) => ({ value: m.id, label: m.name })),
  ];

  const ratingOptions = [
    { value: "", label: "Select rating..." },
    { value: "1", label: "1 Star" },
    { value: "2", label: "2 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "5", label: "5 Stars" },
  ];

  const minRatingOptions = [
    { value: "", label: "All ratings" },
    { value: "1", label: "1 Star & up" },
    { value: "2", label: "2 Stars & up" },
    { value: "3", label: "3 Stars & up" },
    { value: "4", label: "4 Stars & up" },
    { value: "5", label: "5 Stars" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "rating-desc", label: "Rating: High to Low" },
    { value: "rating-asc", label: "Rating: Low to High" },
  ];

  return (
    <main className={styles.review}>
      <div className={styles.container}>
        <section className={styles.header}>
          <h1 className={styles.title}>Reviews</h1>
          <div className={styles.button}>
            <Link to="/orders">
              <Button color="secondary">Back to Orders</Button>
            </Link>
          </div>
        </section>

        <div className={styles.mainContent}>
          {/* Form Column */}
          <section className={styles.formSection}>
            <div className={styles.card}>
              <h2 className={styles.sectionTitle}>Submit a Review</h2>
              <form onSubmit={handleFormSubmit} className={styles.form}>
                {submitSuccess && <p className={styles.successMessage}>{submitSuccess}</p>}
                {submitError && <p className={styles.errorMessage}>{submitError}</p>}

                <div className={styles.formField}>
                  <Select
                    id="menuItem"
                    name="menuItem"
                    label="Menu Item"
                    options={menuOptions}
                    value={formMenuId}
                    onChange={(e) => setFormMenuId(e.target.value)}
                    className=""
                  />
                  {validationErrors.menuId && (
                    <span className={styles.fieldError}>{validationErrors.menuId}</span>
                  )}
                </div>

                <div className={styles.formField}>
                  <Input
                    id="reviewerName"
                    name="reviewerName"
                    label="Reviewer Name"
                    placeholder="Enter customer or reviewer name..."
                    value={formReviewerName}
                    onChange={(e) => setFormReviewerName(e.target.value)}
                  />
                  {validationErrors.reviewerName && (
                    <span className={styles.fieldError}>{validationErrors.reviewerName}</span>
                  )}
                </div>

                <div className={styles.formField}>
                  <Select
                    id="rating"
                    name="rating"
                    label="Rating"
                    options={ratingOptions}
                    value={formRating}
                    onChange={(e) => setFormRating(e.target.value)}
                    className=""
                  />
                  {validationErrors.rating && (
                    <span className={styles.fieldError}>{validationErrors.rating}</span>
                  )}
                </div>

                <div className={styles.formField}>
                  <label htmlFor="comment" className={styles.textareaLabel}>
                    Comment
                    <textarea
                      id="comment"
                      name="comment"
                      placeholder="Write feedback comment here..."
                      className={styles.textarea}
                      value={formComment}
                      onChange={(e) => setFormComment(e.target.value)}
                    />
                  </label>
                  {validationErrors.comment && (
                    <span className={styles.fieldError}>{validationErrors.comment}</span>
                  )}
                </div>

                <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
                  Submit Review
                </Button>
              </form>
            </div>
          </section>

          {/* List and Filters Column */}
          <section className={styles.listSection}>
            <div className={styles.controlsCard}>
              <div className={styles.controlsRow}>
                <div className={styles.searchField}>
                  <Input
                    id="searchReviews"
                    name="searchReviews"
                    label="Search reviews"
                    placeholder="Search by reviewer name or comment..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className={styles.filterField}>
                  <Select
                    id="filterMenu"
                    name="filterMenu"
                    label="Menu Item"
                    options={filterMenuOptions}
                    value={filterMenuId}
                    onChange={handleFilterMenuChange}
                    className=""
                  />
                </div>
                <div className={styles.filterField}>
                  <Select
                    id="filterMinRating"
                    name="filterMinRating"
                    label="Min Rating"
                    options={minRatingOptions}
                    value={filterMinRating}
                    onChange={handleFilterRatingChange}
                    className=""
                  />
                </div>
                <div className={styles.sortField}>
                  <Select
                    id="sortReviews"
                    name="sortReviews"
                    label="Sort by"
                    options={sortOptions}
                    value={sortOption}
                    onChange={handleSortChange}
                    className=""
                  />
                </div>
              </div>
            </div>

            <div className={styles.listWrapper}>
              {reviewsError ? (
                <div className={styles.errorWrapper}>
                  <p className={styles.errorMessage}>Reviews could not be loaded. Please try again.</p>
                </div>
              ) : isReviewsLoading ? (
                <div className={styles.skeletonList}>
                  <Skeleton type="orderCard" count={3} />
                </div>
              ) : (
                <>
                  {filteredReviews.map((review) => {
                    const matchedMenu = menus.find((m) => m.id === review.menu_item_id);
                    const formattedDate = new Intl.DateTimeFormat("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(review.created_at));

                    return (
                      <div key={review.id} className={styles.reviewCard}>
                        <div className={styles.cardHeader}>
                          <div>
                            <h3 className={styles.reviewerName}>{review.reviewer_name}</h3>
                            <span className={styles.menuName}>
                              {matchedMenu ? matchedMenu.name : `Menu ID: ${review.menu_item_id}`}
                            </span>
                          </div>
                          <div className={styles.ratingSection}>
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className={styles.commentText}>{review.comment}</p>
                        <div className={styles.cardFooter}>
                          <span className={styles.dateText}>{formattedDate}</span>
                        </div>
                      </div>
                    );
                  })}

                  {reviews.length === 0 && (
                    <div className={styles.emptyState}>
                      <p>No reviews found.</p>
                    </div>
                  )}

                  {reviews.length > 0 && filteredReviews.length === 0 && (
                    <div className={styles.emptyState}>
                      <p>No matching reviews found.</p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 0 && (
              <div className={styles.pagination}>
                <Button
                  color="secondary"
                  disabled={page === 1 || isReviewsLoading}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <span className={styles.pageIndicator}>
                  Page {page} of {totalPages}
                </span>
                <Button
                  color="secondary"
                  disabled={page >= totalPages || isReviewsLoading}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Review;
