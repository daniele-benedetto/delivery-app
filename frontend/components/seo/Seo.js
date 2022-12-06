import Head from "next/head";

export default function Seo({ title, description }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="author" content="Daniele Benedetto" />
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#ef705c" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}