// renders the component on the client side
'use client'

import Image from 'next/image'

import { useState, MouseEventHandler } from 'react'

// component declaration, states and event response
function MyButton() {
    const [count, setCount] = useState(0)

    function handleClick() {
        // alert('You clicked me!')
        setCount(count + 1)
    }

    return (
        <button
            className="rounded-md bg-white p-3 text-black"
            onClick={handleClick}
        >
            Clicked {count} times
        </button>
    )
}

// shared state with typescript
function MyOtherButton({
    count,
    onClick,
}: {
    count: number
    onClick: MouseEventHandler<HTMLButtonElement>
}) {
    return (
        <button
            className="rounded-md bg-white p-3 text-black"
            onClick={onClick}
        >
            Clicked {count} times
        </button>
    )
}

// default export as main component
export default function QuickStart() {
    const [count, setCount] = useState(0)

    function handleClick() {
        setCount(count + 1)
    }

    return (
        <main className="min-h-screen p-24">
            <div className="space-y-3">
                <h1 className="text-xl">Welcome to my app</h1>
                <h1>Counters that update separately</h1>
                <MyButton /> <br />
                <MyButton />
                <h1>Counters that update together</h1>
                <MyOtherButton count={count} onClick={handleClick} /> <br />
                <MyOtherButton count={count} onClick={handleClick} />
                <About />
                <Profile />
                <Login />
                <ShoppingList />
            </div>
        </main>
    )
}

// nested components
function About() {
    return (
        <>
            <h1>About</h1>
            <p>
                Hello there.
                <br />
                How do you do?
            </p>
        </>
    )
}

// adding style and displaying data
function Profile() {
    const user = {
        name: 'Hedy Lamarr',
        imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
        imageSize: 90,
    }

    return (
        <>
            <h1 className="text-xl">{user.name}</h1>
            <Image
                className="rounded-full"
                src={user.imageUrl}
                alt={'Photo of ' + user.name}
                width={user.imageSize}
                height={user.imageSize}
                style={{
                    width: user.imageSize,
                    height: user.imageSize,
                }}
            />
        </>
    )
}

// conditional rendering
function Login() {
    const isLoggedIn = true

    let content
    if (isLoggedIn) {
        content = <div>logged in</div>
    } else {
        content = <div>not logged in yet</div>
    }

    return (
        <>
            {content}

            <div>
                {isLoggedIn ? (
                    <div>logged in</div>
                ) : (
                    <div>not logged in yet</div>
                )}
            </div>

            <div>{isLoggedIn && <div>logged in</div>}</div>
        </>
    )
}

// rendering lists
function ShoppingList() {
    const products = [
        { title: 'Cabbage', isFruit: false, id: 1 },
        { title: 'Garlic', isFruit: false, id: 2 },
        { title: 'Apple', isFruit: true, id: 3 },
    ]

    const listItems = products.map((product) => (
        <li
            key={product.id}
            // style={{
            //     color: product.isFruit ? 'magenta' : 'darkgreen',
            // }}
            className={product.isFruit ? 'text-green-600' : 'text-red-600'}
        >
            {product.title}
        </li>
    ))

    return <ul>{listItems}</ul>
}
