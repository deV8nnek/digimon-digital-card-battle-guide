from fastapi import status

from src.domain.card import Card


def get_cards(client):
    expected = {
        "status_code": status.HTTP_200_OK,
        "length": 301,
    }
    actual = client.get("/card")
    assert actual.status_code == expected["status_code"]
    assert len(actual.json()) == expected["length"]


def get_chart_digimon_return_chart(client):
    num = "0"
    filter = [el.value for el in Card.CardType][:-1]
    filter = "&filter=".join(filter)[1:]
    expected = {
        "status_code": status.HTTP_200_OK,
        "headers": {"content-type": "image/png"},
    }
    actual = client.get(f"/card/stat-chart/{num}?{filter}")
    assert actual.status_code == expected["status_code"]
    print(actual.headers)
    assert actual.headers["content-type"] == expected["headers"]["content-type"]


def get_chart_invalid_filter_return_error(client):
    num = "0"
    filter = "filter=string"
    expected = {
        "status_code": status.HTTP_406_NOT_ACCEPTABLE,
        "body": {"detail": "フィルターの入力は無効です"},
    }
    actual = client.get(f"/card/stat-chart/{num}?{filter}")
    assert actual.status_code == expected["status_code"]
    assert actual.json()["detail"] == expected["body"]["detail"]


def get_chart_not_found_return_error(client):
    num = "-1"
    filter = "filter=" + Card.CardType.FIRE.value
    expected = {
        "status_code": status.HTTP_406_NOT_ACCEPTABLE,
        "body": {"detail": "有効なのはデジモンカード（0から190まで）だけです"},
    }
    actual = client.get(f"/card/stat-chart/{num}?{filter}")
    assert actual.status_code == expected["status_code"]
    assert actual.json()["detail"] == expected["body"]["detail"]


def get_chart_option_return_error(client):
    num = "191"
    filter = "filter=" + Card.CardType.FIRE.value
    expected = {
        "status_code": status.HTTP_406_NOT_ACCEPTABLE,
        "body": {"detail": "有効なのはデジモンカード（0から190まで）だけです"},
    }
    actual = client.get(f"/card/stat-chart/{num}?{filter}")
    assert actual.status_code == expected["status_code"]
    assert actual.json()["detail"] == expected["body"]["detail"]


def get_fusion_1_digimon_1_option_return_fusion(client):
    num1 = "171"
    num2 = "300"
    expected = {"status_code": status.HTTP_200_OK}
    actual = client.get(f"/card/fusion?num1={num1}&num2={num2}")
    assert actual.status_code == expected["status_code"]
    # only the api result which could be any of 0-300
    assert actual.json()["number"]


def get_fusion_any_invalid_card_return_error(client):
    num1 = "-1"
    num2 = "301"
    expected = {
        "status_code": status.HTTP_406_NOT_ACCEPTABLE,
        "body": {"detail": "有効なのはカード（0から300まで）だけです"},
    }
    actual = client.get(f"/card/fusion?num1={num1}&num2={num2}")
    assert actual.status_code == expected["status_code"]
    assert actual.json()["detail"] == expected["body"]["detail"]


def get_fusion_any_partner_digimon_return_error(client):
    num1 = "172"
    num2 = "190"
    expected = {
        "status_code": status.HTTP_406_NOT_ACCEPTABLE,
        "body": {"detail": "パートナーカードの入力は無効です"},
    }
    actual = client.get(f"/card/fusion?num1={num1}&num2={num2}")
    assert actual.status_code == expected["status_code"]
    assert actual.json()["detail"] == expected["body"]["detail"]


def get_fusion_any_hard_to_obtain_return_error(client):
    num1 = "103"
    num2 = "293"
    expected = {
        "status_code": status.HTTP_406_NOT_ACCEPTABLE,
        "body": {"detail": "入手困難なカードの入力は推奨しません"},
    }
    actual = client.get(f"/card/fusion?num1={num1}&num2={num2}")
    assert actual.status_code == expected["status_code"]
    assert actual.json()["detail"] == expected["body"]["detail"]
