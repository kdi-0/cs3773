function ItemList() {

    const items = [
        {
            id: 1,
            name: 'Item 1',
            price: 10
        },
        {
            id: 2,
            name: 'Item 2',
            price: 15
        }
    ]

    return (
        <>
            <h1>Featured Items</h1>
            <div>
                {items.map((item) => {
                    return (
                        <div key={item.id}>{item.name} - {item.price}</div>
                    )
                })}
            </div>
        </>
    )
}

export default ItemList;