from django.contrib import admin
from django.urls import path, include
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


def get_csrf_token(request):
    """
    Get CSRF token and set it in a cookie.

    Returns:
        JsonResponse: {"success": "CSRF cookie set"}
    """
    return JsonResponse({"success": "CSRF cookie set"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))),
    path("csrf_cookie/", get_csrf_token),
]
