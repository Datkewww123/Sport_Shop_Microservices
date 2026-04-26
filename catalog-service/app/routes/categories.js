const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API quản lý danh mục sản phẩm
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Lấy danh sách danh mục
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lấy danh sách thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Categories retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 507f1f77bcf86cd799439012
 *                       name:
 *                         type: string
 *                         example: Giày bóng đá
 *                       slug:
 *                         type: string
 *                         example: giay-bong-da
 *                       description:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */
router.get('/', categoryController.getCategories);

/**
 * @swagger
 * /categories/slug/{slug}:
 *   get:
 *     summary: Lấy danh mục theo slug
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug của danh mục
 *     responses:
 *       200:
 *         description: Tìm thấy danh mục
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.get('/slug/:slug', categoryController.getCategoryBySlug);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Tạo danh mục mới (Admin)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Giày bóng đá
 *               description:
 *                 type: string
 *                 example: Danh mục giày bóng đá
 *     responses:
 *       201:
 *         description: Tạo danh mục thành công
 *       401:
 *         description: Chưa xác thực
 *       403:
 *         description: Không có quyền
 */
router.post('/', auth, admin, categoryController.createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Cập nhật danh mục (Admin)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của danh mục
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.put('/:id', auth, admin, categoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Xóa danh mục (Admin)
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của danh mục
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.delete('/:id', auth, admin, categoryController.deleteCategory);

module.exports = router;
