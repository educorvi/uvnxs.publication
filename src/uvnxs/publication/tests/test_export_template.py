"""Check inline export JavaScript with the server-side template engine."""

from pathlib import Path
import re
import unittest

from z3c.pt.pagetemplate import PageTemplate, PageTemplateFile


class ExportTemplateTests(unittest.TestCase):
    def test_polling_script_renders_without_server_side_interpolation(self):
        path = Path(__file__).parents[1] / "views" / "wait_for_export.pt"
        PageTemplateFile(str(path)).cook_check()
        script = re.search(r"<script\b[^>]*>(.*?)</script>", path.read_text(), re.S)[1]
        rendered = PageTemplate("<script>" + script + "</script>").render()
        self.assertIn("'Export failed: ' + res.state", rendered)
        self.assertIn("'Export status request failed with status ' + response.status", rendered)
