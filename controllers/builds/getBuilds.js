const { instance } = require("../../config");

//получение списка сборок
module.exports = async (req, res) => {
    try {
        const queryString = `?${new URLSearchParams(req.query).toString()}`;
        const { data } = await instance.get(`/build/list${queryString}`);

        res.json(data);
    } catch (e) {
        res.end(e.message);
    }
};
