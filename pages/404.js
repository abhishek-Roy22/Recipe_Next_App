import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Error = () => {
    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.push("/")
        }, 3000);
    }, [])

    return (
        <div className="error">
            <h1>404</h1>
            <h2>Oooops! That page cannot be found :(</h2>
            <p>Redirecting to the <Link href="/">Home Page</Link> for more Recipes goodness...</p>

            <style jsx>{`
                .error {
                    background: #fff;
                    padding: 30px;
                    box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
                    transform: rotateZ(-1deg)
                    text-align: center;
                }
                h1{
                    font-size: 3em;
                }
            `}</style>
        </div>
    )
}

export default Error;