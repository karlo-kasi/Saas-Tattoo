export default function EventModal({ onClose, onSave, hour, date, title, setTitle }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded shadow w-80">
          <h2 className="text-lg font-bold mb-2">
            Add Event @ {hour}:00 on {date.toLocaleDateString()}
          </h2>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
            className="w-full border px-3 py-2 mb-4 rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="bg-indigo-600 text-white px-3 py-1 rounded"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
  