# ============================================================================
# DEXTERITY ROBOT TESTS
# ============================================================================
#
# Run this robot test stand-alone:
#
#  $ bin/test -s uvnxs.publication -t test_vur_landing_page.robot --all
#
# Run this robot test with robot server (which is faster):
#
# 1) Start robot server:
#
# $ bin/robot-server --reload-path src uvnxs.publication.testing.UVNXS_PUBLICATION_ACCEPTANCE_TESTING
#
# 2) Run robot tests:
#
# $ bin/robot /src/uvnxs/publication/tests/robot/test_vur_landing_page.robot
#
# See the http://docs.plone.org for further details (search for robot
# framework).
#
# ============================================================================

*** Settings *****************************************************************

Resource  plone/app/robotframework/selenium.robot
Resource  plone/app/robotframework/keywords.robot

Library  Remote  ${PLONE_URL}/RobotRemote

Test Setup  Open test browser
Test Teardown  Close all browsers


*** Test Cases ***************************************************************

Scenario: As a site administrator I can add a VurLandingPage
  Given a logged-in site administrator
    and an add VurLandingPage form
   When I type 'My VurLandingPage' into the title field
    and I submit the form
   Then a VurLandingPage with the title 'My VurLandingPage' has been created

Scenario: As a site administrator I can view a VurLandingPage
  Given a logged-in site administrator
    and a VurLandingPage 'My VurLandingPage'
   When I go to the VurLandingPage view
   Then I can see the VurLandingPage title 'My VurLandingPage'


*** Keywords *****************************************************************

# --- Given ------------------------------------------------------------------

a logged-in site administrator
  Enable autologin as  Site Administrator

an add VurLandingPage form
  Go To  ${PLONE_URL}/++add++VurLandingPage

a VurLandingPage 'My VurLandingPage'
  Create content  type=VurLandingPage  id=my-vur_landing_page  title=My VurLandingPage

# --- WHEN -------------------------------------------------------------------

I type '${title}' into the title field
  Input Text  name=form.widgets.IBasic.title  ${title}

I submit the form
  Click Button  Save

I go to the VurLandingPage view
  Go To  ${PLONE_URL}/my-vur_landing_page
  Wait until page contains  Site Map


# --- THEN -------------------------------------------------------------------

a VurLandingPage with the title '${title}' has been created
  Wait until page contains  Site Map
  Page should contain  ${title}
  Page should contain  Item created

I can see the VurLandingPage title '${title}'
  Wait until page contains  Site Map
  Page should contain  ${title}
