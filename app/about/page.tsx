export default function AboutPage() {

    return (
        <div className="flex flex-col gap-8 max-w-prose">
            <div>
                <h1 className="text-2xl font-bold">About ROOM archive</h1>
                <p className="mt-4">This is a simple website aimed to provide students with historical data and statistics of rooms rented on the ROOM.nl platform in Netherlands.</p>
            </div>

            <div>
                <h2 className="text-xl font-bold">Where does the data come from?</h2>
                <p className="mt-4">The data is fetched (<i>scraped</i>) from the ROOM.nl recently rented site and stored in a PostgreSQL database. The data is updated every day. The source code for the scraping script can be seen in its <a target="blank" href="https://github.com/bewuwy/roomnl-scraper">Github repo</a>.</p>
            </div>

            <div>
                <h2 className="text-xl font-bold" id="data-unavailable">Why is some data unavailable?</h2>
                <p className="mt-4">All of the data available on this site is fetched (<i>scraped</i>) from the ROOM.nl sites, hence if some data was not fetched while it was available it is unforutanetely lost forever. This can be the case with some columns of older rooms.</p>
            </div>

            <div>
                <h2 className="text-xl font-bold">What can I do with this data?</h2>
                <p className="mt-4">You can view the data in a tabular format, filter it by city, date or other parameters. The data can also be downloaded as a CSV file.</p>
            </div>

            <div>
                <h2 className="text-xl font-bold">How can I contribute?</h2>
                <p className="mt-4">The source code of this website is available on the <a target="blank" href="https://github.com/bewuwy/roomnl-archive-web">GitHub repo</a>. Feel free to contribute by submitting a pull request.</p>
            </div>
        </div>
    )
}
