import { Navigate, Outlet, useParams } from "react-router-dom";

export default function NotesLayout({ notes }) {
  const { id } = useParams();
  const filteredNote = notes.find((note) => note.id === id);
  if (filteredNote == null) return <Navigate to="/" replace />;
  return <Outlet context={filteredNote}></Outlet>;
}
