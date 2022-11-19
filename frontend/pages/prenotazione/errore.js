import Seo from "../../components/seo/Seo";

export default function Conferma() {
    return (
        <div className={`container-fluid p-0`}>

            <Seo 
                title='Conferma prenotazione | RistorApp'
                description='La tua app per ordinare su RistorApp'
            />

            <main className={`container-fluid`}>
                <div className={`row`}>
                    <section className={`border col-12 vh-100 d-flex flex-wrap justify-content-center align-items-center p-0`}>
                        <div className={`container text-center`}>
                            <h1>...Qualcosa è andato storto</h1>
                            <p>Riprovare a prenotare più tardi</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}