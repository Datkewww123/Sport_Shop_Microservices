const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

/**
 * @swagger
 * tags:
 *   name: News
 *   description: API quản lý tin tức/bài viết
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Lấy danh sách tin tức
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Số trang
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Số bài viết mỗi trang
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Lọc theo tag
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 */
router.get('/', newsController.getNews);

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Tạo bài viết mới (Admin)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: Tin tức mới nhất
 *               content:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Tạo bài viết thành công
 *       401:
 *         description: Chưa xác thực
 *       403:
 *         description: Không có quyền
 */
router.post('/', auth, admin, newsController.createNews);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Xem chi tiết bài viết
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bài viết
 *     responses:
 *       200:
 *         description: Lấy chi tiết thành công
 *       404:
 *         description: Không tìm thấy bài viết
 */
router.get('/:id', newsController.getNewsDetail);

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Cập nhật bài viết (Admin)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bài viết
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy bài viết
 */
router.put('/:id', auth, admin, newsController.updateNews);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Xóa bài viết (Admin)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của bài viết
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy bài viết
 */
router.delete('/:id', auth, admin, newsController.deleteNews);

module.exports = router;
