import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__block">
                <Link to="/support" className="footer__link">
                    Support
                </Link>
                <Link to="/learning" className="footer__link">
                    Learning
                </Link>
                <Link to="/version" className="footer__link">
                    Русская версия
                </Link>
                <div className="footer__creator">© 2020 Your Name</div>
            </div>
        </footer>
    );
};
