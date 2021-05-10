import Navbar from '../components/navbar'
import GlobalStyle from '../stylesheets/globalStyle'
import Footer from '../components/footer'

const AboutPage = () => (
    <div>
        <GlobalStyle/>
        <div className="pageWrapper">
            <Navbar/>
            <h1>About 👋</h1>
            <Footer/>
        </div>
    </div>
)

export default AboutPage
