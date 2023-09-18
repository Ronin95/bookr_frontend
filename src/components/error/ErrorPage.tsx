import MainNavigation from "../MainNavigation";
import "./ErrorPage.css";

function ErrorPage() {
    return (
        <div className="errorPage-view">
            <main>
                <h1>Could not find this page!</h1>
                <p>Please navigate to one of the pages below</p>
            </main>
            <MainNavigation/>
        </div>
    );
}

export default ErrorPage;