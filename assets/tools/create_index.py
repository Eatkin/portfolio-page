import os, json

# Constants for the different types of projects
project_keys = ['DATA PROJECTS', 'GAME PROJECTS', 'WEB PROJECTS', 'BLOGS', 'CERTIFICATIONS']
project_json_keys = ['Data Science Projects', 'Game Development Projects', 'Web Development Projects', 'Blogs', 'Certifications']
# Tuples for translation between the two
project_keys_to_json_keys = tuple(zip(project_keys, project_json_keys))

def get_tech_skills():
    with open('assets/data/json/tech_skills.json', 'r') as f:
        return json.load(f)
    
def get_tech_skills_html(tech_json):
    html = ''
    for tech in tech_json:
        html += f'<h3>{tech}</h3>'
        html += '<ul>'
        for skill in tech_json[tech]:
            html += f'<div class="skill-wrapper"><li data-tooltip="{skill["description"]}">{skill["name"]}</li></div>'
        html += '</ul>'
    return html

def construct_index_html(tech_skills_html, projects_html):
    with open('assets/tools/index_boilerplate.html', 'r') as f:
        html = f.read()
    
    # Add in the content
    html = html.replace('<!-- TECH_SKILLS -->', tech_skills_html)

    # Projects section
    for replacement, key in project_keys_to_json_keys:
        html = html.replace(f'<!-- {replacement} -->', projects_html[key])

    # Add the about me section contained in about.html
    with open('assets/data/html/about.html', 'r') as f:
        html = html.replace('<!-- ABOUT_ME -->', f.read())
    
    with open('index.html', 'w') as f:
        f.write(html)
        
def get_projects():
    with open('assets/data/json/projects.json', 'r') as f:
        return json.load(f)
    
def get_projects_html(projects_json):
    """Returns the HTML for the projects section of the index page
    Why didn't I write my projects in markdown format?
    Because I didn't think of it at the time, and now it's too late"""
    # Create a dictionary of the different types of projects
    projects_html = {}
    for project in projects_json:
        projects_html[project] = f'<h2>{project}</h2>'
        for p in projects_json[project]:
            try:
                with open(p['html'], 'r') as f:
                    projects_html[project] += f.read()
            except:
                continue
                
    return projects_html

tech_skills = get_tech_skills()
tech_skills_html = get_tech_skills_html(tech_skills)

print("Got tech skills")

projects = get_projects()
projects_html = get_projects_html(projects)

print("Got projects")

construct_index_html(tech_skills_html, projects_html)

print("Index HTML created")