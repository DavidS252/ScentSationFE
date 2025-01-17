import { useState, FC } from 'react';
import PostCard, {PostProps} from './Post';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface ItemsListProps {
    posts: PostProps[],
    onItemsSelected: (index: number) => void
}
const ItemsList: FC<ItemsListProps> = ({ posts, onItemsSelected }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [render, setRender] = useState(0);

    const onClick = (index: number) => {
        console.log('Clicked on', index);
        setSelectedIndex(index);
    }

    const addItem = () => {
        console.log('Adding an item');
        posts.push('A new item');
        setRender(render + 1);
    }

    const onSelect = () => {
        console.log('Selected index is', selectedIndex);
        onItemsSelected(selectedIndex);
    }
    return (
        <>           
            <Row xs={1} md={3} className="g-4">
            {Array.from({ length: 3 }).map((_, idx) => (
                <Col key={idx}>
                    <div className="list-group">      
                {
                    posts.map((post, index) => {
                        return <div>
                            <PostCard
                            key={index}
                            content={post.content}
                            owner={post.owner}
                            userImgUrl={post.userImgUrl}
                            username={post.username}></PostCard>
                            <li onClick={() => { onClick(index) }}></li>
                        </div>
                    })
                }
            </div >
                </Col>
            ))}

            </Row>
            <button className="btn btn-primary m-3" onClick={addItem}>Add</button>
            <button className="btn btn-primary" onClick={onSelect}>Selected</button>

        </>
    );

}

export default ItemsList;