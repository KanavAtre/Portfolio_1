from pathlib import Path
import frontmatter
import markdown
from starlette.requests import Request
from starlette.templating import Jinja2Templates

temp = Jinja2Templates(directory="templates")

def get_projects():
    projects = []

    for file in sorted(Path("pages/projects").glob("*.md")):
        post = frontmatter.load(file)

        projects.append({
            "title": post.get("title", file.stem),
            "description": post.get("description", ""),
            "technologies": post.get("technologies", []),
            "github": post.get("github"),
            "image": post.get("image"),
            "content": markdown.markdown(post.content),
        })

    return projects

async def projects(request:Request):
    context = {"request":request, "projects":get_projects()}
    return temp.TemplateResponse(request=request, name = "projects.html", context = context)