import { useState, FC } from 'react';


interface ItemsListProps {
    title: string,
    items: string[],
    onItemsSelected: (index: number) => void
}
const ItemsList: FC<ItemsListProps> = ({ title, items, onItemsSelected }) => {
    console.log('PostsList');
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [render, setRender] = useState(0);

    const onClick = (index: number) => {
        console.log('Clicked on', index);
        setSelectedIndex(index);
    }

    const addItem = () => {
        console.log('Adding an item');
        items.push('A new item');
        setRender(render + 1);

    }

    const onSelect = () => {
        console.log('Selected index is', selectedIndex);
        onItemsSelected(selectedIndex);
    }
    return (
        <>
            <h1>{title}</h1>
            <ul className="list-group">
                {
                    items.map((item, index) => {
                        return <li
                            className={index == selectedIndex ? "list-group-item active" : "list-group-item"}
                            key={index}
                            onClick={() => { onClick(index) }}
                        >
                            {index}: {item}
                        </li>
                    })
                }
            </ul >
            <button className="btn btn-primary m-3" onClick={addItem}>Add</button>
            <button className="btn btn-primary" onClick={onSelect}>Selected</button>

        </>
    );

}

export default ItemsList;