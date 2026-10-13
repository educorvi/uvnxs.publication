# ============================================================================
# DEXTERITY ROBOT TESTS
# ============================================================================
#
# Run this robot test stand-alone:
#
#  $ bin/test -s uvnxs.publication -t test_article_media.robot --all
#
# Run this robot test with robot server (which is faster):
#
# 1) Start robot server:
#
# $ bin/robot-server --reload-path src uvnxs.publication.testing.UVNXS_PUBLICATION_ACCEPTANCE_TESTING
#
# 2) Run robot tests:
#
# $ bin/robot /src/uvnxs/publication/tests/robot/test_article_media.robot
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

Scenario: As a site administrator I can add a ArticleMedia
  Given a logged-in site administrator
    and an add ArticleMedia form
   When I type 'My ArticleMedia' into the title field
    and I submit the form
   Then a ArticleMedia with the title 'My ArticleMedia' has been created

Scenario: As a site administrator I can view a ArticleMedia
  Given a logged-in site administrator
    and a ArticleMedia 'My ArticleMedia'
   When I go to the ArticleMedia view
   Then I can see the ArticleMedia title 'My ArticleMedia'


*** Keywords *****************************************************************

# --- Given ------------------------------------------------------------------

a logged-in site administrator
  Enable autologin as  Site Administrator

an add ArticleMedia form
  Go To  ${PLONE_URL}/++add++ArticleMedia

a ArticleMedia 'My ArticleMedia'
  Create content  type=ArticleMedia  id=my-article_media  title=My ArticleMedia

# --- WHEN -------------------------------------------------------------------

I type '${title}' into the title field
  Input Text  name=form.widgets.IBasic.title  ${title}

I submit the form
  Click Button  Save

I go to the ArticleMedia view
  Go To  ${PLONE_URL}/my-article_media
  Wait until page contains  Site Map


# --- THEN -------------------------------------------------------------------

a ArticleMedia with the title '${title}' has been created
  Wait until page contains  Site Map
  Page should contain  ${title}
  Page should contain  Item created

I can see the ArticleMedia title '${title}'
  Wait until page contains  Site Map
  Page should contain  ${title}
