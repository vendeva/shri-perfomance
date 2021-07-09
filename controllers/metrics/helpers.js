// подсчет процентилей
function quantile(arr, q) {
    const sorted = arr.sort((a, b) => a - b);
    const pos = (sorted.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;

    if (sorted[base + 1] !== undefined) {
        return Math.floor(sorted[base] + rest * (sorted[base + 1] - sorted[base]));
    } else {
        return Math.floor(sorted[base]);
    }
}

// Обработка даты
function prepareData(result) {
    return result.data.map((item) => {
        item.date = item.timestamp.split("T")[0];

        return item;
    });
}

// показать сессию пользователя
function showSession(data, page, session) {
    console.group(`\n   Метрика сессии '${session}'`);
    const sampleData = data.filter((item) => item.page === page && item.requestId === session);
    if (sampleData.length) {
        const { browser, platform } = sampleData[0].additional;
        const { date } = sampleData[0];
        let result = {
            browser,
            platform,
            date,
        };
        sampleData.map((item) => {
            const { name, value } = item;
            result[name] = value;
        });
        console.table(result);
    } else {
        console.error(` По данной сессии '${session}' нет данных`);
    }
    console.groupEnd();
}

// рассчитать метрику за выбранный день
function calcMetricByDate(data, page, name, date) {
    console.group(`\n   Метрика '${name}' за ${date}`);
    const sampleData = data
        .filter((item) => {
            return item.page === page && item.name === name && item.date === date;
        })
        .map((item) => item.value);

    if (sampleData.length) {
        const result = {
            name,
            date,
            hits: sampleData.length,
            p25: quantile(sampleData, 0.25),
            p50: quantile(sampleData, 0.5),
            p75: quantile(sampleData, 0.75),
            p95: quantile(sampleData, 0.95),
        };
        console.table(result);
    } else {
        console.error(` По метрике '${name}' нет данных`);
    }
    console.groupEnd();
}

// показать значение метрики за несколько дней
function showMetricByPeriod(data, page, name, start, finish) {
    const startTimeStamp = new Date(start);
    const finishTimeStamp = new Date(finish);
    console.group(`\n   Метрика '${name}' в диапазоне дат с ${start} по ${finish}`);
    const sampleData = data
        .filter((item) => {
            const currentTimeStamp = new Date(item.date);
            return (
                item.page === page &&
                item.name === name &&
                currentTimeStamp >= startTimeStamp &&
                currentTimeStamp <= finishTimeStamp
            );
        })
        .map((item) => item.value);

    if (sampleData.length) {
        const result = {
            period: `${start}, ${finish}`,
            name,
            hits: sampleData.length,
            p25: quantile(sampleData, 0.25),
            p50: quantile(sampleData, 0.5),
            p75: quantile(sampleData, 0.75),
            p95: quantile(sampleData, 0.95),
        };
        console.table(result);
    } else {
        console.error(` По метрике '${name}' в данном диапазоне дат нет данных`);
    }
    console.groupEnd();
}

// сравнить метрику в разных срезах
function compareMetric(data, page, name, section) {
    console.group(`\n   Метрика '${name}' в срезе '${section}'`);
    let sectionsValues = {};
    data.filter((item) => {
        return item.page === page && item.name === name;
    }).forEach((item) => {
        const sectionValue = item.additional[section];
        if (!sectionsValues[sectionValue]) {
            sectionsValues[sectionValue] = [];
        }
        sectionsValues[sectionValue].push(item.value);
    });
    let result = {};
    for (key in sectionsValues) {
        if (sectionsValues[key].length) {
            const values = sectionsValues[key];
            result[key] = {
                hits: values.length,
                p25: quantile(values, 0.25),
                p50: quantile(values, 0.5),
                p75: quantile(values, 0.75),
                p95: quantile(values, 0.95),
            };
        }
    }

    if (Object.keys(result).length !== 0) {
        console.table(result);
    } else {
        console.error(` В срезе '${section}' нет данных`);
    }

    console.groupEnd();
}

module.exports = { prepareData, showSession, calcMetricByDate, showMetricByPeriod, compareMetric };
