
export default function NavBar() {

    return (
        <nav className="flex justify-between items-center p-4 w-full absolute top-0">
            <div className="flex items-center gap-4">
                <a href="/" className="text-lg font-bold text-foreground">ROOM.nl archive</a>
                <a href="/about" className="hover:underline text-foreground">About</a>
            </div>
            <div className="flex items-center gap-4">
                <a href="https://github.com/bewuwy/roomnl-archive-web" target="blank" className="hover:underline text-foreground">Github</a>
            </div>
        </nav>
    )
}
