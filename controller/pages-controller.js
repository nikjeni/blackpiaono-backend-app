const { Page } = require('../models/pages-model');

module.exports.createPage = async (req, res, next) => {
    try {
        var page = new Page({
            title: req.title,
            content: req.content,
            keywords: req.keywords,
            createdBy: req.createdBy
        })
        await page.save();
        return res.send({ message: 'Page has been created successfully', status: 200 });
    } catch (err) {
        return res.send({ message: 'Page creation failed', status: 500 });
    }
}

module.exports.deletePage = async (req, res, next) => {
    try {
        await Page.deleteOne({ _id: req.params.id });
        return res.send({ message: 'Page deleted successfully' });
    } catch (err) {
        return res.send({ message: 'Deletion failed', status: 400 });
    }
}

module.exports.updatePage = async (req, res, next) => {
    try {
        await Page.updateOne({ _id: req.body.pageId }, {
            $set: {
                title: req.body.title,
                content: req.body.content,
                keywords: req.body.keywords,
                createdBy: req.body.userId
            }
        })
        return res.send({ message: 'Page updated successsfully' });
    } catch (err) {
        return res.send({ message: 'Page updation failed', status: 400 });
    }
}

module.exports.getPages = async (req, res, next) => {
    try {
        Page.find({}).populate('createdBy').exec(function (err, pages) {
            return res.send({ data: pages, status: 200 })
        })
    } catch (err) {
        return res.send({ message: 'Failed to get pages', status: 400 })
    }
}