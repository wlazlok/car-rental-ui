import { useState } from "react";
import { Button, Comment, Form } from "semantic-ui-react";

const CommentItems = (props) => {
  const [content, setContent] = useState("");
  const comments = props.comments;

  const addComment = async () => {
    props.onAddComment(content);
    setContent("");
  };

  return (
    //style={{ align: "center", marginLeft: "40%", marginTop: "5%" }}
    <div>
      <Comment.Group>
        {comments.length > 0 && (
          <Comment>
            {/* todo: awatary dla użytkownika ??? */}
            <Comment.Avatar
              as="a"
              src="https://cdn.iconscout.com/icon/premium/png-256-thumb/profile-1506810-1278719.png"
            />
            <Comment.Content>
              {comments.map((item, index) => {
                return (
                  <div key={index}>
                    {/* todo: jak bedą użytkownicy to tutaj jego nazwa */}
                    <Comment.Author as="a">{item.userName}</Comment.Author>
                    <Comment.Metadata>
                      <div>{item.date}</div>
                    </Comment.Metadata>
                    <Comment.Text>{item.message}</Comment.Text>
                  </div>
                );
              })}
            </Comment.Content>
          </Comment>
        )}
        <Form reply>
          <Form.TextArea
            style={{ marginLeft: "20%" }}
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
            }}
          />
          <Button
            style={{ marginLeft: "20%" }}
            content="Dodaj komentarz"
            labelPosition="left"
            icon="edit"
            primary
            onClick={addComment}
          />
        </Form>
      </Comment.Group>
    </div>
  );
};

export default CommentItems;
