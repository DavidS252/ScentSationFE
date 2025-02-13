import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export interface PostProps {
    content: string;
    owner: string;
    userImgUrl: string;
    username: string;
}

const PostCard: React.FC<PostProps> = ({ content, owner, userImgUrl, username }) => {
    return (
        <Card style={{ width: '20rem' }}>
            <Card.Img variant="top" src={userImgUrl} />
            <Card.Body>
                <Card.Title>{owner}</Card.Title>
                <Card.Text>{content}</Card.Text>
                <Card.Text>{username}</Card.Text>
                <Button className='button.card'>See Full Post</Button>
            </Card.Body>
        </Card>
    );
}

export default PostCard;