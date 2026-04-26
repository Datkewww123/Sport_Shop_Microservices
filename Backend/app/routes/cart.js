const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API quản lý giỏ hàng
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Lấy giỏ hàng hiện tại
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy giỏ hàng thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: object
 *                       quantity:
 *                         type: number
 *                       price:
 *                         type: number
 *                 totalPrice:
 *                   type: number
 *       401:
 *         description: Chưa xác thực
 */
router.get('/', auth, cartController.getCart);

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *               quantity:
 *                 type: number
 *                 default: 1
 *                 example: 2
 *     responses:
 *       200:
 *         description: Thêm vào giỏ thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: object
 *                       quantity:
 *                         type: number
 *                       price:
 *                         type: number
 *                       imageUrl:
 *                         type: string
 *       400:
 *         description: ProductId và quantity hợp lệ là bắt buộc
 *       404:
 *         description: Product not found
 *       401:
 *         description: Chưa xác thực
 */
router.post('/', auth, cartController.addToCart);

/**
 * @swagger
 * /cart/{itemId}:
 *   put:
 *     summary: Cập nhật số lượng sản phẩm trong giỏ
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của item trong giỏ hàng
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       404:
 *         description: Không tìm thấy item
 */
router.put('/:itemId', auth, cartController.updateCartItem);

/**
 * @swagger
 * /cart/{itemId}:
 *   delete:
 *     summary: Xóa sản phẩm khỏi giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của item trong giỏ hàng
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       404:
 *         description: Không tìm thấy item
 */
router.delete('/:itemId', auth, cartController.removeCartItem);

/**
 * @swagger
 * /cart:
 *   delete:
 *     summary: Xóa toàn bộ giỏ hàng
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Xóa giỏ hàng thành công
 *       401:
 *         description: Chưa xác thực
 */
router.delete('/', auth, cartController.clearCart);

module.exports = router;
