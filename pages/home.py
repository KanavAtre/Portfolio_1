from starlette.requests import Request
from starlette.templating import Jinja2Templates

temp = Jinja2Templates(directory="templates")

async def homepage(request:Request):
    context = {"request":request}
    return temp.TemplateResponse(request=request, name = "homepage.html", context = context)