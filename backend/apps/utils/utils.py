import langid


def test_language_langid(text: str):
    return langid.classify(text)[0]
