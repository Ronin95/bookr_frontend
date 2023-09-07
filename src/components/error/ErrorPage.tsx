import Header from "../header/Header";
import MainNavigation from "../MainNavigation";

function ErrorPage() {
    return (
        <>
            <Header/>
            <MainNavigation/>
            <main>
                <h1>An error occured!</h1>
                <p>Could not find this page!</p>
            </main>
        </>
    );
}

export default ErrorPage;