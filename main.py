from starlette.applications import Starlette
from starlette.staticfiles import StaticFiles
from starlette.requests import Request
from starlette.responses import RedirectResponse
from starlette.templating import Jinja2Templates
from starlette.routing import Route
from email.utils import parseaddr
from pages.home import homepage
from pages.projects.projects import projects
from pages.resume import resume
from pages.experience import experience
from pages.technologies import technologies
from pages.personal import personal

temp = Jinja2Templates(directory="templates")  

routes = [
    Route("/", endpoint=homepage),
    Route("/projects", endpoint=projects, methods=["GET", "POST"]),
    Route("/resume", endpoint=resume, methods=["GET", "POST"]),
    Route("/experience", endpoint=experience, methods=["GET", "POST"]),
    Route("/technologies", endpoint=technologies, methods=["GET", "POST"]),
    Route("/personal", endpoint=personal),
]

app = Starlette(
    debug=False,
    routes=routes
)

app.mount(
    "/assets",
    StaticFiles(directory="assets"),
    name="assets"
)

app.mount(
    "/scripts",
    StaticFiles(directory="scripts"),
    name="scripts"
)