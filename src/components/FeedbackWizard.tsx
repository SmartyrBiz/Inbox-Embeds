import { useState } from "react";
import Loading from "../utilities/LoadingSpinner";
import {
  CheckCircleIcon,
  MinusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

enum Experience {
  positive = "Excellent",
  average = "Average",
  negative = "Poor",
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

export default function FeedbackWizard({ data, organisationId, loading }: any) {
  const [experience, setExperience] = useState<Experience | null>(null);
  const [sendPositiveFeedback, setSendPositiveFeedback] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const ExperienceSelector = () => (
    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 gap-4">
      <button
        className="smy-button smy-button-outline py-4"
        onClick={() => setExperience(Experience.positive)}
      >
        <div className="grow text-lg flex justify-between items-center">
          <span>Excellent</span>
          {/* <CheckCircleIcon className="h-6" /> */}
          <span className="text-2xl [text-shadow:_1px_1px_4px_rgb(0_0_0_/_60%)]">
            😀
          </span>
        </div>
      </button>
      <button
        className="smy-button smy-button-outline py-4"
        onClick={() => setExperience(Experience.average)}
      >
        <div className="grow text-lg flex justify-between items-center">
          <span>Average</span>
          {/* <MinusCircleIcon className="h-6" /> */}
          <span className="text-2xl [text-shadow:_1px_1px_4px_rgb(0_0_0_/_60%)]">
            😐
          </span>
        </div>
      </button>
      <button
        className="smy-button smy-button-outline py-4"
        onClick={() => setExperience(Experience.negative)}
      >
        <div className="grow text-lg flex justify-between items-center">
          <span>Poor</span>
          {/* <XCircleIcon className="h-6" /> */}
          <span className="text-2xl [text-shadow:_1px_1px_4px_rgb(0_0_0_/_60%)]">
            😞
          </span>
        </div>
      </button>
    </div>
  );

  const PositiveReview = () => (
    <div>
      <div className="mb-8">
        <h1 className="font-semibold text-2xl mb-1">Thank you!</h1>
        <p>
          We're thrilled to hear that you had an excellent experience with our
          service. Please help us by leaving a review!
        </p>
      </div>

      <div className="flex justify-center gap-2">
        <a
          href={data.newReviewUrl}
          target="_blank"
          rel="noreferrer"
          className="smy-button smy-button-outline py-2 text-xl gap-4"
        >
          <span>Google</span>
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
        </a>
      </div>
      <div className="mt-8">
        <p className="text-neutral-500 text-sm">
          Alternatively, you can use this{" "}
          <span
            role="link"
            onClick={() => setSendPositiveFeedback(true)}
            className="font-semibold underline text-blue-600 cursor-pointer"
          >
            form
          </span>{" "}
          to leave us a message directly!
        </p>
      </div>
    </div>
  );

  const PositiveFeedback = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSpamBot, setIsSpamBot] = useState(false); // Add state for spam bot detection

    const onSubmit = (e: any) => {
      e.preventDefault();
      setError("");
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      if (!phoneRegex.test(phone)) {
        setError("Please enter a valid phone number. (e.g. +1234567890)");
        return;
      }

      if (isSpamBot) {
        setError(
          "Your submission has been flagged as spam. If this is a mistake, please try again without autofill."
        );
        return;
      }

      setIsSubmitting(true);
      fetch("https://inbox-api.smartyr.biz/api/v1/feedback", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          experience,
          feedback,
          organisationId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setName("");
          setEmail("");
          setPhone("");
          setFeedback("");
          setFeedbackSent(true);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("An error occurred. Please try again.");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    };

    return (
      <div>
        <div className="mb-8">
          <h1 className="font-semibold text-2xl mb-2">
            We'd love to hear from you!
          </h1>
          <p className="">
            We're really glad to hear that you had a positive experience with
            our service. Please feel free to let us know if there's anything we
            can do to make it even better!
          </p>
        </div>

        {error && (
          <div className="bg-red-500 mb-2 rounded-lg p-4">
            <p className="text-sm  text-white m-0">{error}</p>
          </div>
        )}

        <form
          className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 text-left"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-800" htmlFor="name">
              Name
            </label>
            <input
              required
              className="text-base px-2 py-0 bg-white font-medium whitespace-nowrap justify-center flex gap-1 items-center rounded-md border border-transparent focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 smy-input-outline py-4 px-2 mt-1"
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-800" htmlFor="phone">
              Email
            </label>
            <input
              required
              className="text-base px-2 py-0 bg-white font-medium whitespace-nowrap justify-center flex gap-1 items-center rounded-md border border-transparent focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 smy-input-outline py-4 px-2 mt-1"
              type="text"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
          </div>
          <div className="col-span-full flex flex-col">
            <label className="text-lg font-medium text-gray-800" htmlFor="phone">
              Phone
            </label>
            <input
              required
              className="text-base px-2 py-0 bg-white font-medium whitespace-nowrap justify-center flex gap-1 items-center rounded-md border border-transparent focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 smy-input-outline py-4 px-2 mt-1"
              type="text"
              value={phone || ""}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
            />
          </div>
          <div className="col-span-full flex flex-col">
            <label className="text-lg font-medium text-gray-800" htmlFor="feedback">
              Feedback
            </label>
            <textarea
              required
              className="text-base px-2 py-0 bg-white font-medium whitespace-nowrap justify-center flex gap-1 items-center rounded-md border border-transparent focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 smy-input-outline py-4 px-2 mt-1"
              rows={3}
              value={feedback || ""}
              onChange={(e) => setFeedback(e.target.value)}
              name="feedback"
            />
          </div>
          {/* Honeypot field */}
          <div
            className="col-span-full flex flex-col"
            style={{ display: "none" }}
          >
            <label htmlFor="honeypot">Leave this field blank</label>
            <input
              className="text-base px-2 py-0 bg-white font-medium whitespace-nowrap justify-center flex gap-1 items-center rounded-md border border-transparent focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 py-4 px-2 mt-1"
              type="text"
              value={isSpamBot ? "Spam Bot Detected" : ""}
              onChange={() => setIsSpamBot(true)}
              name="honeypot"
            />
          </div>
          <div className="flex gap-4 justify-end col-span-full">
            {/* <button
              onClick={() => setExperience(null)}
              type="button"
              className="smy-button smy-button-outline"
            >
              Go back
            </button> */}
            <button
              type="submit"
              className="smy-button smy-button-outline"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  if (feedbackSent) {
    return (
      <div className="text-center">
        <h1 className="font-semibold text-2xl">
          Thank you for your feedback
        </h1>
        <p className="">
          We really appreciate your feedback. Thank you for taking the time to
          let us know how we did!
        </p>
      </div>
    );
  }

  const NegativeReview = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [feedback, setFeedback] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSpamBot, setIsSpamBot] = useState(false); // Add state for spam bot detection

    const onSubmit = (e: any) => {
      e.preventDefault();
      setError("");
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }
      if (!phoneRegex.test(phone)) {
        setError("Please enter a valid phone number. (e.g. +1234567890)");
        return;
      }

      if (isSpamBot) {
        setError(
          "Your submission has been flagged as spam. If this is a mistake, please try again without autofill."
        );
        return;
      }

      setIsSubmitting(true);
      fetch("https://inbox-api.smartyr.biz/api/v1/feedback", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          experience,
          feedback,
          organisationId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setName("");
          setEmail("");
          setPhone("");
          setFeedback("");
          setFeedbackSent(true);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("An error occurred. Please try again.");
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    };

    return (
      <div>
        <div className="mb-8">
          <h1 className="font-semibold text-2xl mb-2">
            We're sorry we didn't meet your expectations
          </h1>
          <p>
            We're sorry to hear that you had a subpar experience with our
            service. Please let us know how we can improve.
          </p>
        </div>

        {error && (
          <div className="bg-red-500 mb-2 rounded-lg p-4">
            <p className="text-sm  text-white m-0">{error}</p>
          </div>
        )}

        <form
          className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 text-left"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-800" htmlFor="name">
              Name
            </label>
            <input
              required
              className="text-base px-2 py-0 bg-white font-medium whitespace-nowrap justify-center flex gap-1 items-center rounded-md border border-transparent focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 smy-input-outline py-4 px-2 mt-1"
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-800" htmlFor="phone">
              Email
            </label>
            <input
              required
              className="text-base px-2 py-0 bg-white font-medium whitespace-nowrap justify-center flex gap-1 items-center rounded-md border border-transparent focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 smy-input-outline py-4 px-2 mt-1"
              type="text"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
          </div>
          <div className="col-span-full flex flex-col">
            <label className="text-lg font-medium text-gray-800" htmlFor="phone">
              Phone
            </label>
            <input
              required
              className="text-base px-2 py-0 bg-white font-medium whitespace-nowrap justify-center flex gap-1 items-center rounded-md border border-transparent focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 smy-input-outline py-4 px-2 mt-1"
              type="text"
              value={phone || ""}
              onChange={(e) => setPhone(e.target.value)}
              name="phone"
            />
          </div>
          <div className="col-span-full flex flex-col">
            <label className="text-lg font-medium text-gray-800" htmlFor="feedback">
              Feedback
            </label>
            <textarea
              required
              className="text-base px-2 py-0 bg-white font-medium whitespace-nowrap justify-center flex gap-1 items-center rounded-md border border-transparent focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 smy-input-outline py-4 px-2 mt-1"
              rows={3}
              value={feedback || ""}
              onChange={(e) => setFeedback(e.target.value)}
              name="feedback"
            />
          </div>
          {/* Honeypot field */}
          <div
            className="col-span-full flex flex-col"
            style={{ display: "none" }}
          >
            <label htmlFor="honeypot">Leave this field blank</label>
            <input
              className="text-base px-2 py-0 bg-white font-medium whitespace-nowrap justify-center flex gap-1 items-center rounded-md border border-transparent focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 py-4 px-2 mt-1"
              type="text"
              value={isSpamBot ? "Spam Bot Detected" : ""}
              onChange={() => setIsSpamBot(true)}
              name="honeypot"
            />
          </div>
          <div className="flex gap-4 justify-end col-span-full">
            {/* <button
              onClick={() => setExperience(null)}
              type="button"
              className="smy-button smy-button-outline"
            >
              Go back
            </button> */}
            <button
              type="submit"
              className="smy-button smy-button-outline"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  };

  if (feedbackSent) {
    return (
      <div className="text-center">
        <h1 className="font-semibold text-2xl">
          Thank you for your feedback
        </h1>
        <p className="">
          We appreciate your feedback. Your input will help us improve our
          service.
        </p>
      </div>
    );
  }

  return (
    <>
      {loading && <Loading />}
      {!loading && data && (
        <div className="h-[36rem] text-xl flex flex-col justify-center text-center">
          {!experience ? (
            <div>
              <div className="mb-8">
                <h1 className="font-semibold text-2xl mb-1">
                  How did we do?
                </h1>
                <p className="">
                  We value your feedback! Please take a moment to let us know
                  about your experience with our service.
                </p>
              </div>
              <ExperienceSelector />
            </div>
          ) : (
            <div>
              {experience === Experience.positive && !sendPositiveFeedback && (
                <PositiveReview />
              )}
              {experience === Experience.positive && sendPositiveFeedback && (
                <PositiveFeedback />
              )}
              {experience === Experience.average && <NegativeReview />}
              {experience === Experience.negative && <NegativeReview />}
            </div>
          )}
        </div>
      )}
    </>
  );
}
