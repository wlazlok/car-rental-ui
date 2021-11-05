import { useState } from "react";
import { Button, Comment, Form } from "semantic-ui-react";
import { useSelector } from "react-redux";

const CommentItems = (props) => {
  const [content, setContent] = useState(null);
  const comments = props.comments;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

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
            <Comment.Content>
              {comments.map((item, index) => {
                return (
                  <div key={index}>
                    <Comment.Avatar
                      as="a"
                      src="https://cdn.iconscout.com/icon/premium/png-256-thumb/profile-1506810-1278719.png"
                    />
                    <Comment.Author as="a">{item.author}</Comment.Author>
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
            disabled={!content || !isLoggedIn}
          />
        </Form>
      </Comment.Group>
    </div>
  );
};

export default CommentItems;
