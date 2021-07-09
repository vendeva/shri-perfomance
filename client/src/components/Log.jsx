const Convert = require("ansi-to-html");

export const Log = ({ log }) => {
    const componentName = "log";
    const convert = new Convert({
        fg: "#000",
        bg: "#000",
    });

    let html = convert.toHtml(log || "");
    const prettyLog = () => {
        return <pre dangerouslySetInnerHTML={{ __html: html }} />;
    };
    return <div className={componentName}>{prettyLog()}</div>;
};
