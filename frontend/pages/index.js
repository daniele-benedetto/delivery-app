import Seo from '../components/seo/Seo';

export default function Home() {
    return (
        <div className={`container-fluid p-0`}>

            <Seo 
                title='Home | RistorApp'
                description='La tua app per ordinare su RistorApp'
            />

            <main className={`container-fluid`}>
                <div className={`row`}>
                    <section className={`border col-12 vh-100 d-flex flex-wrap justify-content-center align-items-center p-0`}>
                        <div className={`container text-center d-flex flex-column justify-content-center align-items-center has-bg-image`}>
                            <h1>RistorApp</h1>
                            <h4>La tua app per ordinare su RistorApp</h4>
                            <div className={`d-grid gap-2 col-4 mx-auto`}>
                                <a href='./ordina' className={`btn btn-primary`} type="button">Ordina Online</a>
                                <a href='./prenota' className={`btn btn-link`} type="button">Prenota un tavolo</a>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            
        </div>
    );
}
