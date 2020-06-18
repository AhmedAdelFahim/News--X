const axios = require('axios');
const db = require('../models/index');

const User = db.user;
const getAllSources = async (req, res) => {
    const pages = {
        hasPrevious: !!(req.query.page && req.query.page > 1)
    }

    const page = (req.query.page && req.query.page - 1) || 0
    const limit = 12;
    try {
        const result = await axios({
            url: `https://newsapi.org/v2/sources?apiKey=${process.env.API_KEY}`,
            method: 'get'
        })
        const user = await User.findById(req.userId)
        const userSources = user.sources;
        if(!result.data || result.data.status !== 'ok'){
            return res.status(500).send({message:'internal server error'})
        }
        pages.hasNext = result.data.sources.length > (page + 1) * limit;
        pages.pageNumber = page + 1
        const finalResult = result.data.sources.slice(page*limit,(page*limit)+limit)
        finalResult.map((source) => {
            source.isSourceSubscribed = userSources.includes(source.id)
            return source
        })
        return res.status(200).send({sources: finalResult, pages})
    } catch (e) {
        return res.status(500).send({message:'internal server error'})
    }
}

module.exports = {
    getAllSources
}
