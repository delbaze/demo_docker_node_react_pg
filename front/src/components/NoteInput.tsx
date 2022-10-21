import { INoteInput } from "@/interfaces";

function NoteInput({ languages, handleChangeNote, noteIndex }: INoteInput) {
  return (
    <div>
      <input
        data-noteindex={noteIndex}
        name="note"
        type="number"
        placeholder="Indiquez la note"
        onChange={handleChangeNote}
      />
      <select
        data-noteindex={noteIndex}
        name="languageId"
        onChange={handleChangeNote}
      >
        <option value="">Choisissez un langage</option>
        {languages.map((l) => (
          <option key={l.id} value={l.id}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default NoteInput;
