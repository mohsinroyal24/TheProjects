import re


def extract_session_id(session_str: str):
    match = re.search(r"/sessions/(.*?)/contexts/", session_str)
    if match:
        extract_session_id = match.group(1)
        return extract_session_id
    
    return ""

def get_str_from_food_dict(food_dict: dict):
    return ", ".join([f"{int(value)} {key}" for key, value in food_dict.items()])

# testing
if __name__=="__main__":
    print(get_str_from_food_dict({"samosa":2, "chhole": 5}))
    # print(extract_session_id("projects/sirafood-mohk/agent/sessions/1124tra683673b-d77b-b5da-61d2-5b3d7295dd59/contexts/ongoing-order"))