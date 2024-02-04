import { Button, Col, Row, Stack, Form, Modal } from "react-bootstrap";
import NoteCard from "./NoteCard";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { useMemo, useState } from "react";
export default function HomePage({
  notes,
  availableTags,
  onEditTag,
  onDeleteTag,
}) {
  // const cols = notes.map((note) => (
  //   <Col key={note.id}>
  //     <NoteCard data={note.data.text} title={note.data.title} tags={tags} />
  //   </Col>
  // ));
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  let filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          String(note.data.title)
            .toLowerCase()
            .includes(title.toLowerCase())) &&
        (tags.length === 0 ||
          tags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [notes, tags, title]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={"/new"}>
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              variant="outline-secondary"
              onClick={() => setShowModal(true)}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <label for="tags" className="form-label">
                Tags
              </label>
              <ReactSelect
                class="form-control"
                id="tags"
                value={tags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(selectedTags) => {
                  setTags(
                    selectedTags.map((selectedTag) => {
                      return {
                        label: selectedTag.label,
                        id: selectedTag.value,
                      };
                    })
                  );
                }}
                isMulti
              ></ReactSelect>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} md={3} xl={4}>
        {filteredNotes.map((filteredNote) => (
          <Col key={filteredNote.id} className="mb-4">
            <NoteCard
              id={filteredNote.id}
              title={filteredNote.data.title}
              tags={filteredNote.tags}
            />
          </Col>
        ))}
      </Row>
      {showModal && (
        <EditTagModal
          showModal={showModal}
          setShowModal={setShowModal}
          availableTags={availableTags}
          onEditTag={onEditTag}
          onDeleteTag={onDeleteTag}
        />
      )}
    </>
  );
}

function EditTagModal({
  showModal,
  setShowModal,
  availableTags,
  onEditTag,
  onDeleteTag,
}) {
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Stack direction="vertical" gap={2}>
              {availableTags.map((tag) => (
                <Row key={tag.id}>
                  <Col>
                    <Form.Control
                      type="text"
                      defaultValue={tag.label}
                      onChange={(e) => {
                        e.preventDefault();
                        onEditTag(tag.id, e.target.value);
                      }}
                    ></Form.Control>
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="outline-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        onDeleteTag(tag.id);
                      }}
                    >
                      &times;
                    </Button>
                  </Col>
                </Row>
              ))}
            </Stack>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
