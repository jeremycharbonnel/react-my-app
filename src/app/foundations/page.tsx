import LikeButton from './like-button'

export default function Foundations() {
    return (
        <main className="min-h-screen p-24">
            <HomePage />
        </main>
    )
}

function Header({ title }: { title: string }) {
    return <h1>{title ? title : 'Default title'}</h1>
}

function HomePage() {
    const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton']

    return (
        <div>
            <Header title="Develop. Preview. Ship." />
            <ul>
                {names.map((name) => (
                    <li key={name}>{name}</li>
                ))}
            </ul>

            <LikeButton />
        </div>
    )
}
