import { useOutletContext, Navigate } from "react-router-dom";
import { Row, Stack, Badge, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
export default function ShowNotes({ onDelete }) {
  const note = useOutletContext();
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{note.data.title}</h1>
          {note.tags.length > 0 && (
            <Stack gap={1} className="flex-wrap" direction="horizontal">
              {note.tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to={`/${note.id}/edit`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              variant="outline-danger"
              onClick={() => {
                onDelete(note.id);
                <Navigate to={"/"} />;
              }}
            >
              Delete
            </Button>
            <Link to={`/`}>
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{note.data.text}</ReactMarkdown>
    </>
  );
}
