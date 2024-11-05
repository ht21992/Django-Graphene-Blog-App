import logging
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Post
from channels.layers import get_channel_layer

logger = logging.getLogger(__name__)


class PostConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.channel_layer = get_channel_layer()
        if self.channel_layer is None:
            raise Exception("Channel layer not available")

        await self.channel_layer.group_add("posts", self.channel_name)
        await self.accept("graphql-transport-ws")
        self.subscription_id = None
        await self.send_json({"type": "connection_ack"})
        logger.info(f"WebSocket connected: {self.channel_name}")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("posts", self.channel_name)
        logger.info(f"WebSocket disconnected: {self.channel_name}")

    async def receive_json(self, content):
        if content.get("type") == "subscribe":
            self.subscription_id = content.get("id")

    async def new_post(self, event):
        post_id = event["post_id"]
        post = await database_sync_to_async(Post.objects.get)(id=post_id)
        post_data = {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "createdAt": post.created_at.isoformat(),
        }
        await self.send_json(
            {
                "id": self.subscription_id,
                "type": "next",
                "payload": {"data": {"new_post": post_data}},
            }
        )
