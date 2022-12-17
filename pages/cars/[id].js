/* [id].js where [param] is a paramater and the brackets make it a dynamic route */

/* import the { hook } from 'next/router' */ 
import { useRouter } from 'next/router';

// allows you to use the <Head> tag to add meta data to the page
import Head from 'next/head';

import styles from '../../styles/Home.module.css'

/* The default export is a react component, each file or page NEED 1 default */ 
export default function Car({ car }) {

    const router = useRouter()
    const { id } = router.query
    return (
        <div className={styles.container}>
            <Head>
                <title>{car.color} {car.id}</title>
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    {id}
                </h1>

                <img src={car.image} width="300px" />

            </main>
        </div>
    )
}


/* export async function getServerSideProps({ params }) {
    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json();

    return {
        props: { car: data },
    }
}
*/

 export async function getStaticProps({ params }) {

  const req = await fetch(`http://localhost:3000/${params.id}.json`);
      const data = await req.json();

    return {
        props: { car: data },
    }
 }

export async function getStaticPaths() {

    const req = await fetch('http://localhost:3000/cars.json');
    const data = await req.json();

   const paths = data.map(car => {
        return { params: { id: car } }
    })

    return {
        paths,
        fallback: false
    };
 }