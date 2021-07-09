import { Counter } from "./send";
import constants from "../constants/constants";

let counter = new Counter();
const pageName = "main";
const requestId = String(Math.random()).substr(2, 12);
counter.init(constants.GUID, requestId, pageName);

const getBrowser = () => {
    if (/MSIE/.test(navigator.userAgent)) {
        return "Internet Explorer";
    } else if (/Edg/.test(navigator.userAgent)) {
        return "Edge";
    } else if (/Firefox/.test(navigator.userAgent)) {
        return "Firefox";
    } else if (/Opera/.test(navigator.userAgent)) {
        return "Opera";
    } else if (/YaBrowser/.test(navigator.userAgent)) {
        return "Yandex Browser";
    } else if (/Chrome/.test(navigator.userAgent)) {
        return "Google Chrome";
    } else if (/Safari/.test(navigator.userAgent)) {
        return "Safari";
    } else {
        return "other";
    }
};
const getPlatform = () => {
    if (
        /iPhone/.test(navigator.userAgent) ||
        /iPad/.test(navigator.userAgent) ||
        /Android/.test(navigator.userAgent) ||
        /Windows Phone/.test(navigator.userAgent) ||
        /BB10/.test(navigator.userAgent)
    ) {
        return "touch";
    } else {
        return "desktop";
    }
};
counter.setAdditionalParams({
    browser: getBrowser(),
    platform: getPlatform(),
});

if (window.performance) {
    const [navigation] = window.performance.getEntriesByType("navigation");

    const connect = Math.round(navigation.connectEnd - navigation.connectStart);
    //console.log(connect);
    counter.send("connect", connect);

    const reqRes = Math.round(navigation.responseEnd - navigation.requestStart);
    //console.log(reqRes);
    counter.send("ttfb", reqRes);

    setTimeout(function () {
        let performance = window.performance;
        let entries = performance.getEntriesByType("paint");
        entries.forEach((entry) => {
            const { name, startTime } = entry;
            //console.log(name, Math.round(startTime));
            if (name === "first-contentful-paint") counter.send("fcp", Math.round(startTime));
            else counter.send("fp", Math.round(startTime));
        });
    }, 3000);
}
let timeStart = Date.now();
window.addEventListener("getBuilds", () => {
    const getBuilds = Date.now() - timeStart;
    // console.log(getBuilds);
    counter.send("getBuilds", Math.round(getBuilds));
});
