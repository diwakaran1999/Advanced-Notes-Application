import "./App.css";
import { useMemo } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import NewNote from "./NewNote";
import ShowNotes from "./ShowNotes";
import useLocalStorage from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import HomePage from "./HomePage";
import NotesLayout from "./NotesLayout";
import EditNote from "./EditNote";
function App() {
  const [notes, setNotes] = useLocalStorage("NOTES", []);
  const [tags, setTags] = useLocalStorage("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);
  const onCreateNotes = ({ tags, ...data }) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        {
          ...data,
          id: uuidV4(),
          tagIds: tags.map((tag) => tag.id),
        },
      ];
    });
  };
  const updateNotes = (id, { tags, ...data }) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagIds: tags.map((tag) => tag.id),
          };
        } else return note;
      });
    });
  };
  const addTag = (newTag) => {
    setTags((prev) => [...prev, newTag]);
  };
  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  //edit tags
  const editTag = (id, value) => {
    setTags((tags) =>
      tags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, label: value };
        } else return tag;
      })
    );
  };

  const deleteTag = (id) => {
    setTags((tags) => tags.filter((tag) => tag.id !== id));
  };
  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              availableTags={tags}
              notes={notesWithTags}
              onEditTag={editTag}
              onDeleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNotes}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NotesLayout notes={notesWithTags} />}>
          <Route index element={<ShowNotes onDelete={deleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onUpdate={updateNotes}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  );
}

export default App;
