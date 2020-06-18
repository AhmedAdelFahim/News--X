const db = require('../models/index');
const axios = require('axios');
const User = db.user;

const subscribeSource = async (req, res) => {
    const {params: {id, sourceId}} = req;
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send({message:'not found'});
        }
        user.sources.push(sourceId);
        await user.save();
        res.status(200).send({sourceId})
    } catch (e) {
        return res.status(500).send({message:'internal server error'})
    }

}

const unsubscribeSource = async (req, res) => {
    const {params: {id, sourceId}} = req;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({message:'not found'});
        }
        user.sources = user.sources.filter((source) => source !== sourceId)
        await user.save();
        res.status(200).send({sourceId})
    } catch (e) {
        return res.status(500).send({message:'internal server error'})
    }

}

const getAllNews = async (req, res) => {
    const {userId} = req
    const pages = {
        hasPrevious: !!(req.query.page && req.query.page > 1)
    }
    const page = (req.query.page) || 1
    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).send({message:'not found'});
        }
        const sourcesQuery = user.sources.reduce((acc, source) => {
            if (acc.length > 1) {
                acc = `${acc},`
            }
            return `${acc}${source}`
        }, '')
        const result = await axios({
            url: `https://newsapi.org/v2/everything?sources=${sourcesQuery}&page=${page}&apiKey=${process.env.API_KEY}`,
            method: 'get'
        })
        if (!result.data && result.data.status !== 'ok') {
            return res.status(500).send({message:'internal server error'});
        }
        pages.pageNumber = page
        pages.hasNext = !!(result.data.totalResults && ( (Number(page) + 1) * 20 <= Math.min(100,result.data.totalResults)))
        res.status(200).send({news: result.data.articles, pages})
    } catch (e) {
        return res.status(500).send({message:'internal server error'})
    }

}

module.exports = {
    subscribeSource,
    unsubscribeSource,
    getAllNews
}
