const News = require('../models/News');

exports.createNews = async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getNews = async (req, res) => {
  try {
    const { tag } = req.query;
    const filter = tag ? { tags: tag } : {};
    const newsList = await News.find(filter);
    res.json(newsList);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getNewsDetail = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    res.json(news);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(news);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
