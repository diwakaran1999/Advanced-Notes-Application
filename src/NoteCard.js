import { Badge, Stack } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import styles from "./NoteList.modules.css";
function getRandomColor() {
  const color = ["#586994", "#7D869C", "#A2ABAB", "#B4C4AE", "#E5E8B6"];
  const idx = Math.floor(Math.random() * 5);
  return color[idx];
}
export default function NoteCard({ id, title, tags }) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
      style={{ backgroundColor: `${getRandomColor()}` }}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          {/* <span className="fs-5">{title}</span> */}
          <Card.Title>{title}</Card.Title>
          {tags.length > 0 && (
            <Stack
              gap={1}
              direction="horizontal"
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
