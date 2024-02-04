import { Button, Form, Stack } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";

export default function NoteForm({
  noteTags = [],
  title = "",
  markdown = "",
  onSubmit,
  onAddTag,
  availableTags,
}) {
  const titleRef = useRef(null);
  const textareaRef = useRef(null);
  const [tags, setTags] = useState(noteTags);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      data: {
        title: titleRef.current.value,
        text: textareaRef.current.value,
      },
      tags: tags,
    });
    navigate("..");
    // console.log(titleRef.current.value);
    // console.log(textareaRef.current.value);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div className="row mb-4">
        <div className="col">
          <Form.Group controlId="title">
            <label for="title" className="form-label">
              Title
            </label>
            <input
              ref={titleRef}
              type="Text"
              id="title"
              className="form-control"
              defaultValue={title}
              required
            />
          </Form.Group>
        </div>
        <div className="col">
          <div className="form-group">
            <label for="tags" className="form-label">
              Tags
            </label>
            <CreatableReactSelect
              class="form-control"
              id="tags"
              onCreateOption={(label) => {
                const newTag = { id: uuidV4(), label };
                onAddTag(newTag);
                setTags((prev) => [...prev, newTag]);
              }}
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
            ></CreatableReactSelect>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="body">Body</label>
        <textarea
          ref={textareaRef}
          class="form-control"
          id="body"
          rows="15"
          defaultValue={markdown}
          required
        ></textarea>
      </div>
      <Stack
        direction="horizontal"
        gap={2}
        className="mt-4 justify-content-end"
      >
        <Button type="submit" variant="primary">
          Save
        </Button>
        <Link to=".." relative="path">
          <Button type="button" variant="outline-secondary">
            Cancel
          </Button>
        </Link>
      </Stack>
    </Form>
  );
}
