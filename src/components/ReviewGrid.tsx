import React, { useEffect, useState } from "react";
import { Review, ReviewAPIData, WidgetProps } from "../utilities/types";
import { StarIcon } from "@heroicons/react/24/solid";
import Loading from "../utilities/LoadingSpinner";
import RATINGS from "../utilities/RATINGS";
import { dateFormatter } from "../utilities/dateFormatter";

export default function ReviewGrid({ data, loading }: any) {
  const [showedCount, setShowedCount] = useState(6);
  const [readMoreReviews, setReadMoreReviews] = useState<Array<string>>([]);

  function handleReadMore(name: string) {
    if (readMoreReviews.includes(name)) {
      setReadMoreReviews([...readMoreReviews.filter((item) => item !== name)]);
    } else {
      setReadMoreReviews([...readMoreReviews, name]);
    }
  }

  function handleShowMore() {
    if (showedCount >= data!.reviews.length) {
      setShowedCount(6);
    } else {
      setShowedCount(showedCount + 4);
    }
  }
  return (
    <>
      {loading && <Loading />}
      {!loading && data && data.reviews && data.reviews.length > 0 ? (
        <div>
          <div className="sr-flex sr-flex-col lg:sr-flex-row sr-gap-2 sr-justify-between  sr-place-items-start lg:sr-place-items-center sr-mb-6">
            <div className="">
              <h3 className="sr-heading-regular">
                Customer testimonials on Google
              </h3>
              <p className="sr-mt-0 sr-mb-0">{data.totalReviewCount} reviews</p>
            </div>
            <div className="sr-flex sr-gap-2">
              <a
                href={data.locationUrl}
                target="_blank"
                className="sr-button sr-button-outline"
              >
                All reviews
              </a>
              <a
                href={data.newReviewUrl}
                target="_blank"
                className="sr-button sr-button-outline"
              >
                Leave a review
              </a>
            </div>
          </div>

          <div className="sr-grid lg:sr-grid-cols-2 sr-gap-4">
            {data.reviews
              .slice(0, showedCount)
              .map((review: any, index: number) => {
                return (
                  <div
                    className="sr-border sr-bg-white sr-rounded-md sr-p-4 sr-flex sr-flex-col sr-place-items-start sr-space-y-3"
                    key={review.name}
                  >
                    <div className="sr-flex sr-w-full sr-justify-between sr-gap-2 sr-place-items-center">
                      <div className="sr-flex sr-place-items-center sr-gap-2">
                        <img
                          src={review.reviewer.avatar}
                          alt={review.reviewer.name}
                          loading="lazy"
                          className="sr-h-10 sr-w-10 sr-rounded-full sr-bg-gray-500"
                        />
                        <div>
                          <p className="sr-font-medium sr-my-0">
                            {review.reviewer.name}
                          </p>
                          <p className="sr-text-gray-400 sr-text-xs sr-my-0">
                            {dateFormatter(review.createdAt)}
                          </p>
                        </div>
                      </div>
                      <svg
                        width="36"
                        height="36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M32.708 15.062H31.5V15H18v6h8.477c-1.236 3.493-4.56 6-8.477 6a9 9 0 0 1 0-18c2.294 0 4.381.866 5.97 2.28l4.244-4.243C25.534 4.54 21.95 3 18 3 9.716 3 3 9.716 3 18c0 8.284 6.716 15 15 15 8.284 0 15-6.716 15-15 0-1.006-.103-1.988-.292-2.938Z"
                          fill="#FFC107"
                        />
                        <path
                          d="m4.73 11.018 4.928 3.614A8.996 8.996 0 0 1 18 9c2.294 0 4.381.866 5.97 2.28l4.244-4.243C25.534 4.54 21.95 3 18 3 12.239 3 7.242 6.253 4.73 11.018Z"
                          fill="#FF3D00"
                        />
                        <path
                          d="M18 33c3.875 0 7.395-1.483 10.057-3.894l-4.642-3.929A8.932 8.932 0 0 1 18 27c-3.901 0-7.214-2.488-8.462-5.96l-4.892 3.77C7.13 29.666 12.171 33 18 33Z"
                          fill="#4CAF50"
                        />
                        <path
                          d="M32.708 15.062H31.5V15H18v6h8.477a9.03 9.03 0 0 1-3.065 4.178l.002-.001 4.643 3.928C27.728 29.404 33 25.5 33 18c0-1.006-.103-1.988-.292-2.938Z"
                          fill="#1976D2"
                        />
                      </svg>
                    </div>
                    <div className="sr-flex">
                      {new Array(RATINGS[review.rating as keyof typeof RATINGS])
                        .fill(null)
                        .map((star, index) => (
                          <StarIcon
                            className="sr-h-5 sr-w-5 sr-text-yellow-500"
                            key={index}
                          />
                        ))}
                    </div>

                    <p
                      className={
                        readMoreReviews.includes(review.name)
                          ? "sr-line-clamp-none"
                          : "sr-line-clamp-4"
                      }
                    >
                      {review.comment}
                    </p>
                    {review.comment && review.comment.length > 250 && (
                      <button
                        onClick={() => handleReadMore(review.name)}
                        className="sr-button sr-text-sm"
                      >
                        {readMoreReviews.includes(review.name)
                          ? "Show less"
                          : "Read more"}
                      </button>
                    )}
                  </div>
                );
              })}
          </div>

          <div className="sr-py-6 sr-flex sr-justify-center">
            <button
              className="sr-button sr-button-outline"
              onClick={() => handleShowMore()}
            >
              {showedCount < data.reviews.length ? "Show more" : "Show less"}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
