import Link from 'next/link'
import Navbar from '../components/navbar'
import GlobalStyle from '../stylesheets/globalStyle'

const AboutPage = () => (
    <div>
        <GlobalStyle/>
        <Navbar/>
        <h1>About 👋</h1>
        <p>
            <Link href="/about">
                <a>About</a>
            </Link>
        </p>
    </div>
)

export default AboutPage
