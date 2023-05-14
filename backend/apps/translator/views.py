from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from urllib.parse import unquote
from asgiref.sync import async_to_sync

from apps.utils.chatgpt import gpt_translate
from apps.utils.utils import test_language_langid


@api_view(["POST"])
def translator(request):
    text = request.data.get("text", "").strip()
    mood = request.data.get("mood", "").strip()
    genre = request.data.get("genre", "").strip()
    lang = request.data.get("lang", "").strip()
    instruct = request.data.get("instruct", "").strip()
    text = unquote(text, encoding="utf8")
    if lang == "":
        lang = test_language_langid(text)
    answer = async_to_sync(gpt_translate)(
        text, lang, mood=mood, genre=genre, instruct=instruct
    )
    ret = {"answer": answer}
    response = Response(ret, status=status.HTTP_200_OK)
    return response
