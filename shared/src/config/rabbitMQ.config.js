"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRabbitMQChannel = getRabbitMQChannel;
const amqplib_1 = __importDefault(require("amqplib"));
const index_1 = require("./index");
let connection = null;
let channel = null;
async function getRabbitMQChannel() {
    if (!connection) {
        connection = await amqplib_1.default.connect(index_1.CONNECTION_ENDPOINT);
        channel = await connection.createChannel();
        await channel.assertQueue(index_1.PAYMENT_QUEUE, { durable: true });
        console.log("RabbitMQ connected & payment channel ready");
    }
    return { channel };
}
