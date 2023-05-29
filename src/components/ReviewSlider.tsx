import {
  ChevronRightIcon,
  ChevronLeftIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { dateFormatter } from "../utilities/dateFormatter";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType, Navigation, Pagination, Autoplay } from "swiper";
import RATINGS from "../utilities/RATINGS";
import Loading from "../utilities/LoadingSpinner";
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";

export default function ReviewSlider({ data, loading }: any) {
  const swiperRef = useRef<SwiperType>();
  return (
    <>
      {loading && (
        <div className="sr-w-full sr-h-96 sr-flex sr-place-items-center sr-justify-center">
          <Loading />
        </div>
      )}

      {!loading && data && data.reviews.length && (
        <>
          <div className="sr-flex sr-flex-col sr-place-items-center sr-justify-center sr-text-center lg:sr-justify-between lg:sr-text-left lg:sr-place-items-end lg:sr-flex-row sr-gap-4 sr-mb-8">
            <div>
              <h2 className="sr-heading-large">Our Latest Google Reviews</h2>

              <p className="sr-mt-0 sr-py-0 sr-mb-0">
                Rated {String(data.averageRating).slice(0, 4)} Stars from{" "}
                {data.totalReviewCount} reviews
              </p>
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
          <div className="sr-flex sr-gap-2 sr-place-items-center">
            <button
              className="duration-300 sr-flex sr-place-items-center sr-justify-center sr-flex-shrink-0 sr-rounded-full sr-border-none sr-p-2 hover:sr-bg-gray-50 transition-ease sr-bg-white sr-cursor-pointer"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <ChevronLeftIcon className="sr-h-6 sr-w-6 " />
            </button>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              autoplay={{
                delay: 500000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                el: ".swiper-pagination-custom",
              }}
              navigation={false}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
              }}
              modules={[Pagination, Navigation, Autoplay]}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {data.reviews.slice(0, 15).map((review: any) => {
                return (
                  <SwiperSlide key={review.name}>
                    <div className="sr-p-6 sr-bg-white sr-border sr-rounded-md sr-h-full sr-flex sr-flex-col sr-justify-between">
                      <div>
                        <div className="sr-flex sr-place-items-center sr-gap-2 sr-mb-4">
                          <img
                            src={review.reviewer.avatar}
                            alt={review.reviewer.name}
                            className="sr-h-10 sr-w-10 sr-rounded-full sr-bg-gray-500"
                          />
                          <div>
                            <p className="sr-font-medium sr-mb-0 sr-mt-0">
                              {review.reviewer.name}
                            </p>
                            <div className="sr-flex">
                              {new Array(
                                RATINGS[review.rating as keyof typeof RATINGS]
                              )
                                .fill(null)
                                .map((star, index) => (
                                  <StarIcon
                                    className="sr-h-5 sr-w-5 sr-text-yellow-500"
                                    key={index}
                                  />
                                ))}
                            </div>
                          </div>
                        </div>
                        <p className="sr-line-clamp-6 sr-mb-6">
                          {review.comment}
                        </p>
                      </div>
                      <div className="sr-flex sr-justify-between sr-place-items-center">
                        <div className="sr-flex sr-gap-2 sr-place-items-center">
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
                          <p className="sr-text-xs sr-text-gray-500 sr-py-0 sr-mb-0">
                            Google Review
                          </p>
                        </div>
                        <p className="sr-text-xs sr-text-gray-500 sr-py-0 sr-mb-0">
                          {dateFormatter(review.createdAt)}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
              <div className="swiper-pagination-custom sr-justify-center sr-flex sr-mt-4 sr-flex-shrink-0"></div>
            </Swiper>
            <button
              className="duration-300 sr-flex sr-place-items-center sr-justify-center sr-flex-shrink-0 sr-rounded-full sr-border-none sr-p-2 hover:sr-bg-gray-50 transition-ease sr-bg-white sr-cursor-pointer"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <ChevronRightIcon className="sr-h-6 sr-w-6 " />
            </button>
          </div>
        </>
      )}
    </>
  );
}
