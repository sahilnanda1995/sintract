import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export default function InputGroup({
  labelText,
  placeholderText = "",
  isInvalid = false,
  value,
  handleOnInput = () => {},
}) {
  return (
    <div>
      {labelText && (
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          {labelText}
        </label>
      )}
      <div className="relative mt-1 rounded-md shadow-sm">
        {isInvalid ? (
          <input
            type="text"
            className="block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
            placeholder={placeholderText}
            onInput={handleOnInput}
            value={value}
          />
        ) : (
          <input
            type="text"
            placeholder={placeholderText}
            onInput={handleOnInput}
            value={value}
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400
      shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        )}
        {isInvalid && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {false && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          Your password must be less than 4 characters.
        </p>
      )}
    </div>
  );
}
