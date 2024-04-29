---
title: SCINet Workbooks
permalink: /
type: future
sidenav: false

# alerts:
#  - alert:
#    title: Ceres Maintenance
#    type: info
#    text: Ceres cluster maintenance is scheduled for the week of June 19, to update system software. The cluster will be down for several days. </br> The Atlas cluster will remain up and running during # Ceres downtime. </br> See <a href="https://forum.scinet.usda.gov/t/ceres-maintenance-the-week-of-june-19-20923/1053">the SCINet Forum Announcements page</a> for more information.

layout: home

## option 1
header:
  overlay_color: "primary-darker"
  image: /assets/img/agriscience_workbook_banner.png
  subtitle: 'Educational Resources for High Performance Computing'
  text: 'Self-paced, self-contained, interactive tutorials covering a wide variety of scientific computing techniques and skills from programming and data science fundamentals to domain-specific software and analyses.'
  button: 
    url: /workbooks
    text: Find a Workbook

details:
  comp: tagline
  s_class: usa-section--light margin-top-0 padding-top-4 padding-bottom-5
  container: true
  label: About
  title: "Learn scientific computing skills using SCINet's computing infrastructure"
  text: "These tutorials are designed for [USDA-ARS](https://www.ars.usda.gov/) researchers and their collaborators for use on SCINet's high-performance computing infrastructure. Development of these workbooks is funded by [USDA-ARS's SCINet](https://scinet.usda.gov/) and [AI Center of Excellence](https://scinet.usda.gov/opportunities/ai-innovation/) initiatives."

## Option 2
# header:
#   callout_color: "transparent" 
#   image: /assets/img/agriscience_workbook_banner.png
#   subtitle: 'Educational Resources for High Performance Computing'
#   subtitle_color: white

# details:
#   comp: tagline
#   s_class: usa-section--light margin-top-0 padding-top-4 padding-bottom-5
#   container: true
#   label: About
#   grid: true
#   title: "Learn scientific computing skills using SCINet's computing infrastructure"
#   text: "SCINet workbooks are self-paced, self-contained, interactive tutorials that can help you learn a wide variety of scientific computing techniques and skills from programming and data science fundamentals to domain-specific software and analyses.  
#   <br><br>
#   These tutorials are designed for [USDA-ARS](https://www.ars.usda.gov/) researchers and their collaborators for use on SCINet's high-performance computing infrastructure. Development of these workbooks is funded by [USDA-ARS's SCINet](https://scinet.usda.gov/) and [AI Center of Excellence](https://scinet.usda.gov/opportunities/ai-innovation/) initiatives."
#   button: 
#     url: /workbooks
#     text: Find a Workbook

attention:
  comp: attention
  s_class: usa-section--dark margin-bottom-4
  text: "Have an Account? Access the SCINet Forum"
  label: SCINet Forum
  url: https://forum.scinet.usda.gov
  external: true

cards1:
  comp: cards
  container: true
  format: icon
  title: "Core Workbooks"
  label: "Core Workbooks"
  collect:
    org: 0

cards:
  comp: cards
  container: true
  format: icon
  title: "Specialized Workbooks"
  label: "Specialized Workbooks"
  collect:
    workbook: specialization
    org: 1

---
{% include section.html section='details' %}
{% include section.html section='cards1' %}
{% include section.html section='cards' %}
{% include section.html section='attention' %}
