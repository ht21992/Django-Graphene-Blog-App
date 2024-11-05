import graphene
from graphene_django.types import DjangoObjectType
from .models import Post
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


class PostType(DjangoObjectType):
    class Meta:
        model = Post


# Resolvers
class Query(graphene.ObjectType):
    all_posts = graphene.List(PostType)

    def resolve_all_posts(self, info):
        return Post.objects.all()


# Mutations
class CreatePost(graphene.Mutation):
    post = graphene.Field(PostType)

    class Arguments:
        title = graphene.String(required=True)
        content = graphene.String(required=True)

    def mutate(self, info, title, content):
        post = Post(title=title, content=content)
        post.save()

        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "posts",
            {
                "type": "new_post",
                "post_id": post.id,
            },
        )

        return CreatePost(post=post)


class Mutation(graphene.ObjectType):
    create_post = CreatePost.Field()


# Subscription
class Subscription(graphene.ObjectType):
    new_post = graphene.Field(PostType)


schema = graphene.Schema(query=Query, mutation=Mutation, subscription=Subscription)


"""
mutation {
  createPost(title: "New Blog Post", content: "This is a new blog post") {
    post {
      id
      title
      content
      createdAt
    }
  }
}

"""
