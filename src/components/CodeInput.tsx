export default function CodeInput({
  labelText,
  value,
  placeholderText = "",
  handleOnInput = () => {},
}) {
  return (
    <div>
      {labelText && (
        <label className="block text-sm font-medium text-gray-700">
          {labelText}
        </label>
      )}
      <div className="mt-1">
        <textarea
          rows={5}
          className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400
      shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
          value={value}
          onInput={handleOnInput}
          placeholder={placeholderText}
        />
      </div>
    </div>
  );
}
