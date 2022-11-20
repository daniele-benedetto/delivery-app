import Seo from '../components/seo/Seo';
import Header from '../components/header/Header';
import Hero from '../components/hero/Hero';

export default function Home() {
    return (
        <div className='column-center-center w-100 h-100'>

            <Seo 
                title='Home | RistorApp'
                description='La tua app per ordinare su RistorApp'
            />

            <main className='w-100 p-20'>

                <Header />

                <Hero />

            </main>      
        </div>
    );
}
