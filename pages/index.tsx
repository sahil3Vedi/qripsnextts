import Link from 'next/link'
import Navbar from '../components/navbar'
import GlobalStyle from '../stylesheets/globalStyle'

const IndexPage = () => (
    <div>
        <GlobalStyle/>
        <Navbar/>
        <h1>Index 👋</h1>
        <p>
            <Link href="/about">
                <a>About</a>
            </Link>
        </p>
    </div>
)

export default IndexPage
