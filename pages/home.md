---
title: Digital AgriScience Workbook
permalink: /
type: future
sidenav: false

# alerts:
#  - alert:
#    title: Ceres Maintenance
#    type: info
#    text: Ceres cluster maintenance is scheduled for the week of June 19, to update system software. The cluster will be down for several days. </br> The Atlas cluster will remain up and running during # Ceres downtime. </br> See <a href="https://forum.scinet.usda.gov/t/ceres-maintenance-the-week-of-june-19-20923/1053">the SCINet Forum Announcements page</a> for more information.

layout: page

header:
  #overlay_color: "secondary-dark"
  callout_color: "transparent" #"secondary-darker"
  image: /assets/img/agriscience_workbook_banner.png
  # svg
  subtitle: 'Integrating Large-Scale Computing for Advanced Agricultural Data Science'

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
#  button:
#    url: /workbooks
#    text: All Workbooks
  collect:
    org: 0

cards:
  comp: cards
  container: true
  format: icon
  title: "Specialized Workbooks"
  label: "Specialized Workbooks"
#  button:
#    url: /specialization
#    text: All Specialized Workbooks
  collect:
    workbook: specialization
    org: 1

---
{% include section.html section='cards1' %}
{% include section.html section='cards' %}
{% include section.html section='attention' %}
