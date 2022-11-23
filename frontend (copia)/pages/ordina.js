import Seo from '../components/seo/Seo';

export default function Ordina() {
    return (
        <div className={`container-fluid p-0`}>
            <Seo 
                title='Ordina | RistorApp'
                description='La tua app per ordinare su RistorApp'
            />
            <main className={`container-fluid`}>
                <div className={`row`}>
                    <section className={`border col-12 vh-100 d-flex flex-wrap justify-content-center align-items-center p-0`}>
                        <div className={`container text-center d-flex flex-column justify-content-center align-items-center has-bg-image`}>
                            <h1>Ordina</h1>
                        </div>
                    </section>
                </div>
            </main>  
        </div>
    );
}