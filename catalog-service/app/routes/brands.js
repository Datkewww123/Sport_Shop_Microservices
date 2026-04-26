const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: API quản lý thương hiệu
 */

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Lấy danh sách thương hiệu
 *     tags: [Brands]
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
 *                   example: Brands retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 507f1f77bcf86cd799439011
 *                       name:
 *                         type: string
 *                         example: Nike
 *                       slug:
 *                         type: string
 *                         example: nike
 *                       logo:
 *                         type: string
 *                         example: https://example.com/logo.png
 *                       description:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 */
router.get('/', brandController.getBrands);

/**
 * @swagger
 * /brands/slug/{slug}:
 *   get:
 *     summary: Lấy thương hiệu theo slug
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug của thương hiệu
 *     responses:
 *       200:
 *         description: Tìm thấy thương hiệu
 *       404:
 *         description: Không tìm thấy thương hiệu
 */
router.get('/slug/:slug', brandController.getBrandBySlug);

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Tạo thương hiệu mới (Admin)
 *     tags: [Brands]
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
 *                 example: Nike
 *               logo:
 *                 type: string
 *                 example: https://example.com/logo.png
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tạo thương hiệu thành công
 *       401:
 *         description: Chưa xác thực
 *       403:
 *         description: Không có quyền
 */
router.post('/', auth, admin, brandController.createBrand);

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Cập nhật thương hiệu (Admin)
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thương hiệu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               logo:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy thương hiệu
 */
router.put('/:id', auth, admin, brandController.updateBrand);

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Xóa thương hiệu (Admin)
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của thương hiệu
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy thương hiệu
 */
router.delete('/:id', auth, admin, brandController.deleteBrand);

module.exports = router;
