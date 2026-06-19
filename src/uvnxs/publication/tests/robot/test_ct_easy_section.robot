# ============================================================================
# DEXTERITY ROBOT TESTS
# ============================================================================
#
# Run this robot test stand-alone:
#
#  $ bin/test -s uvnxs.publication -t test_easy_section.robot --all
#
# Run this robot test with robot server (which is faster):
#
# 1) Start robot server:
#
# $ bin/robot-server --reload-path src uvnxs.publication.testing.UVNXS_PUBLICATION_ACCEPTANCE_TESTING
#
# 2) Run robot tests:
#
# $ bin/robot /src/uvnxs/publication/tests/robot/test_easy_section.robot
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

Scenario: As a site administrator I can add a EasySection
  Given a logged-in site administrator
    and an add Body form
   When I type 'My EasySection' into the title field
    and I submit the form
   Then a EasySection with the title 'My EasySection' has been created

Scenario: As a site administrator I can view a EasySection
  Given a logged-in site administrator
    and a EasySection 'My EasySection'
   When I go to the EasySection view
   Then I can see the EasySection title 'My EasySection'


*** Keywords *****************************************************************

# --- Given ------------------------------------------------------------------

a logged-in site administrator
  Enable autologin as  Site Administrator

an add Body form
  Go To  ${PLONE_URL}/++add++Body

a EasySection 'My EasySection'
  Create content  type=Body  id=my-easy_section  title=My EasySection

# --- WHEN -------------------------------------------------------------------

I type '${title}' into the title field
  Input Text  name=form.widgets.IBasic.title  ${title}

I submit the form
  Click Button  Save

I go to the EasySection view
  Go To  ${PLONE_URL}/my-easy_section
  Wait until page contains  Site Map


# --- THEN -------------------------------------------------------------------

a EasySection with the title '${title}' has been created
  Wait until page contains  Site Map
  Page should contain  ${title}
  Page should contain  Item created

I can see the EasySection title '${title}'
  Wait until page contains  Site Map
  Page should contain  ${title}
