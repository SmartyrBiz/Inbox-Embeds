import Loading from "../utilities/LoadingSpinner";
import { Rating } from "react-simple-star-rating";
export default function ReviewWidget({ data, loading }: any) {
  return (
    <>
      {loading && <Loading />}
      {!loading && data && data.reviews && data.reviews.length > 0 ? (
        <a
          target="_blank"
          href={data.locationUrl}
          className="sr-text-gray-800 sr-no-underline sr-shadow-lg sr-place-items-center sr-rounded-md sr-pl-3 hover:sr-bg-gray-50 sr-p-4 sr-bg-white sr-flex sr-gap-2 "
        >
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
          <div>
            <div className="sr-flex sr-place-items-center">
              <Rating
                readonly={true}
                initialValue={data.averageRating}
                allowFraction={true}
                size={20}
              />
            </div>
            <p className="sr-my-0 sr-mt-0">{data.totalReviewCount} Reviews</p>
          </div>
        </a>
      ) : null}
    </>
  );
}
