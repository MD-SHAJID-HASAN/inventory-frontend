function LoadingSpinner() {
  return (
    <div className="w-full flex justify-center">
      <button
        type="button"
        className="flex items-center bg-indigo-500 text-white px-4 py-2 rounded"
        disabled
        aria-busy="true"
      >
        <svg
          className="mr-3 w-5 h-5 animate-spin text-white"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        Loading…
      </button>
    </div>
  );
}

export default LoadingSpinner;
