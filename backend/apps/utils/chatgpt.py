import os
import json
import openai
from dotenv import load_dotenv
from django.conf import settings

load_dotenv()

MODELS = [
    "gpt-3.5-turbo",
    "code-davinci-002",
    "text-davinci-003",
    "curie",
    "babbage",
    "ada",
]


def verify():
    openai.api_key = os.environ.get("OPENAI_API_KEY")


def gen_prompt(
    text: str,
    length: int = -1,
    role: str = "",
    task: str = "",
    mood: str | list = "",
    genre: str | list = "",
    instruct: dict = {},
    output: str = "",
):
    prompt_path = os.path.join(settings.BASE_DIR, "apps/utils/prompts.json")
    with open(prompt_path, "r", encoding="utf8") as f:
        prompt_list = json.load(f)
    system = ""
    prompt = ""
    if role != "":
        system = prompt_list["role"][role]
    else:
        system = "You are a helpful assistant."
    if task != "":
        prompt += prompt_list["task"][task]
    if isinstance(mood, list):
        for m in list:
            prompt += " " + prompt_list["mood"][m]
    elif isinstance(mood, str):
        if mood != "":
            prompt += " " + prompt_list["mood"][mood]
    if isinstance(genre, list):
        for m in list:
            prompt += " " + prompt_list["genre"][m]
    elif isinstance(genre, str):
        if genre != "":
            prompt += " " + prompt_list["genre"][genre]
    if length != -1:
        prompt += " " + (
            "For each request, the reply should be less than "
            + str(length)
            + " words."
        )
    prompt += "\n"
    for p, t in instruct.items():
        prompt += p + "(delimited in triple backticks): ```" + t + "```" + "\n"
    prompt += "Text(delimited in triple backticks): ```" + text + "```" + "\n"
    if output == "":
        prompt += " " + prompt_list["output"]["text"]
    else:
        prompt += " " + prompt_list["output"][output]
    return (system, prompt)


async def gpt_translate(
    text: str,
    lang: int,
    length: int = -1,
    mood: str | list = "",
    genre: str | list = "",
    instruct: str = "",
    output: str = "",
):
    model = MODELS[0]
    if lang == "en":
        task = "translate_cn"
    else:
        task = "translate_en"
    if instruct == "":
        instruct = {}
    (system, prompt) = gen_prompt(
        text,
        length=length,
        role="translator",
        task=task,
        mood=mood,
        genre=genre,
        instruct=instruct,
        output=output,
    )
    message = [
        {"role": "system", "content": system},
        {"role": "user", "content": prompt},
    ]
    response = await openai.ChatCompletion.acreate(
        model=model,
        messages=message,
        max_tokens=2048,
    )
    answer = response.choices[0]["message"]["content"].strip()
    return answer


async def gpt_polish(
    text: str,
    length: int = -1,
    mood: str | list = "",
    genre: str | list = "",
    input: str = "",
    instruct: str = "",
    output: str = "",
):
    model = MODELS[0]
    if input == "latex":
        task = "polish_latex"
        output = "latex"
    else:
        task = "polish"
        output = ""
    if instruct == "":
        instruct = {}
    (system, prompt) = gen_prompt(
        text,
        length=length,
        role="polish",
        task=task,
        mood=mood,
        genre=genre,
        instruct=instruct,
        output=output,
    )
    message = [
        {"role": "system", "content": system},
        {"role": "user", "content": prompt},
    ]
    response = await openai.ChatCompletion.acreate(
        model=model,
        messages=message,
        max_tokens=2048,
    )
    answer = response.choices[0]["message"]["content"].strip()
    return answer


if __name__ == "__main__":
    prompt = gen_prompt("translate", index=1)
    print(prompt)
