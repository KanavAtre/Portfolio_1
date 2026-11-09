from starlette.requests import Request
from starlette.templating import Jinja2Templates

temp = Jinja2Templates(directory="templates")

async def resume(request:Request):
    context = {"request":request, "doc_path":"assets/static/Resume_Kanav_Atre.pdf"}
    return temp.TemplateResponse(request=request, name = "resume.html", context = context)