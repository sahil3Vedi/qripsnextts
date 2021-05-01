import Link from 'next/link'
import Navbar from '../components/navbar'
import GlobalStyle from '../stylesheets/globalStyle'

const AboutPage = () => (
    <div>
        <GlobalStyle/>
        <Navbar/>
        <h1>About 👋</h1>
        <p>
            <Link href="/home">
                <a>Home</a>
            </Link>
        </p>
    </div>
)

export default AboutPage
