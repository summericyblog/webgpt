from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from urllib.parse import unquote
from asgiref.sync import async_to_sync


from apps.utils.chatgpt import gpt_polish


@api_view(["POST"])
def polish(request):
    text = request.data.get("text", "").strip()
    mood = request.data.get("mood", "").strip()
    genre = request.data.get("genre", "").strip()
    instruct = request.data.get("instruct", "").strip()
    text = unquote(text, encoding="utf8")
    answer = async_to_sync(gpt_polish)(
        text, mood=mood, genre=genre, instruct=instruct
    )
    ret = {"answer": answer}
    return Response(ret, status=status.HTTP_200_OK)


@api_view(["GET"])
def polish_latex(request):
    text = request.data.get("text", "").strip()
    mood = request.data.get("mood", "").strip()
    genre = request.data.get("genre", "").strip()
    instruct = request.data.get("instruct", "").strip()
    text = unquote(text, encoding="utf8")
    answer = async_to_sync(gpt_polish)(
        text, mood=mood, genre=genre, instruct=instruct, input="latex"
    )
    ret = {"answer": answer}
    return Response(ret, status=status.HTTP_200_OK)
