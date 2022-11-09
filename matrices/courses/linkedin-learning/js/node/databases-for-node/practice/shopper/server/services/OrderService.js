const Models = require('../models/sequelize');

class OrderService {
    constructor(sequelize) {
        Models(sequelize);
        this.client = sequelize;
        this.models = sequelize.models;
    }

    async inTransaction(work) {
        const transaction = await this.client.transaction();

        try {
            await work(transaction);
            return transaction.commit();
        } catch (error) {
            transaction.rollback();
            throw error;
        }
    }

    async create(user, items, transaction) {
        const order = await this.models.Order.create({
            userId: user.id,
            email: user.email,
            status: 'Not Shipped'
        }, { transaction });

        return Promise.all(
            items.map(async (item) => {
                const orderItem = await this.models.OrderItem.create({
                    sku: item.sku,
                    qty: item.qty,
                    price: item.price,
                    name: item.name
                });

                return order.addOrderItem(orderItem, { transaction });
            })
        );
    }

    async getAll() {
        return this.models.Order.findAll({
            where: {},
            include: [this.models.Orderitem]
        });
    }

    async setStatus(orderId, status) {
        return this.models.Order.update({ status }, { where: { id: orderId } });
    }
}

module.exports = OrderService;
