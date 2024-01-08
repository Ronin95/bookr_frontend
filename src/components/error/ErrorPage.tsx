import MainNavigation from "../services/MainNavigation";
import "./ErrorPage.css";

/**
 * The `function ErrorPage() {` is defining a functional component named `ErrorPage`. This component returns a JSX element
 * that represents the view of an error page.
 * 
 * @function
 * @name ErrorPage
 * @kind function
 * @returns {JSX.Element}
 */
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