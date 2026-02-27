import React, { useEffect, useState } from "react";
import { Review, ReviewAPIData, WidgetProps } from "../utilities/types";
import { StarIcon } from "@heroicons/react/24/solid";
import Loading from "../utilities/LoadingSpinner";
import RATINGS from "../utilities/RATINGS";
import { dateFormatter } from "../utilities/dateFormatter";

const processGoogleAvatar = (url: string) => {
  if (!url || !url.includes("googleusercontent.com")) return url;

  // Remove authentication parameters and use public format
  const baseUrl = url.split("=")[0];
  return `${baseUrl}=s40-c`; // s40 = 40px size, c = crop to square
};

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
      {!loading &&
      data &&
      data.reviews &&
      data.reviews.length > 0 &&
      data.totalReviewCount > 0 ? (
        <div>
          <div className="flex flex-col lg:flex-row gap-2 justify-between  place-items-start lg:place-items-center mb-6">
            <div className="">
              <h3 className="text-xl font-semibold tracking-tight text-gray-800 my-0">
                Customer testimonials on Google
              </h3>
              <p className="mt-0 mb-0">{data.totalReviewCount} reviews</p>
            </div>
            <div className="flex gap-2">
              <a
                href={data.locationUrl}
                target="_blank"
                className="smy-button smy-button-outline"
              >
                All reviews
              </a>
              <a
                href={data.newReviewUrl}
                target="_blank"
                className="smy-button smy-button-outline"
              >
                Leave a review
              </a>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            {data.reviews
              .slice(0, showedCount)
              .map((review: any, index: number) => {
                const processedAvatarUrl = processGoogleAvatar(
                  review.reviewer.avatar
                );
                return (
                  <div
                    className="border border-gray-200 bg-white rounded-md p-4 flex flex-col place-items-start space-y-3"
                    key={review.name}
                  >
                    <div className="flex w-full justify-between gap-2 place-items-center">
                      <div className="flex place-items-center gap-2">
                        <img
                          src={processedAvatarUrl}
                          alt={review.reviewer.name}
                          loading="lazy"
                          className="h-10 w-10 rounded-full bg-gray-500"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                        <div>
                          <p className="font-medium my-0">
                            {review.reviewer.name}
                          </p>
                          <p className="text-gray-400 text-xs my-0">
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
                    <div className="flex">
                      {new Array(RATINGS[review.rating as keyof typeof RATINGS])
                        .fill(null)
                        .map((star, index) => (
                          <StarIcon
                            className="h-5 w-5 text-yellow-500"
                            key={index}
                          />
                        ))}
                    </div>

                    <p
                      className={
                        readMoreReviews.includes(review.name)
                          ? "line-clamp-none"
                          : "line-clamp-4"
                      }
                    >
                      {review.comment}
                    </p>
                    {review.comment && review.comment.length > 250 && (
                      <button
                        onClick={() => handleReadMore(review.name)}
                        className="smy-button text-sm"
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

          <div className="py-6 flex justify-center">
            <button
              className="smy-button smy-button-outline"
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
