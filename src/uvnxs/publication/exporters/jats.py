from uvnxs.publication.exporters.interface import Exporter, T
from uvnxs.publication.jats_models import JATSDocument, Front, Body, Back, Appendix, AppendixGroup, GeneralSection, \
    Article

def _wrap_article_jats(jats: str) -> str:
    return f"""<!DOCTYPE article PUBLIC "-//NLM//DTD JATS (Z39.96) Journal Publishing DTD with OASIS Tables with MathML3 v1.1 20151215//EN" "JATS-journalpublishing-oasis-article1-mathml3.dtd">
<article xmlns:mml="http://www.w3.org/1998/Math/MathML" xmlns:xlink="http://www.w3.org/1999/xlink" xml:lang="de" article-type="DGUV Vorschrift" dtd-version="0.4">
	{jats}
</article>
"""

def _get_article_jats(article: Article) -> str:
    content = f"{_get_front_jats(article.front)}{_get_body_jats(article.body)}{_get_back_jats(article.back)}"
    return _wrap_article_jats(content)

def _get_front_jats(front: Front) -> str:
    return f"<front>{front.content_raw or ''}</front>"

def _get_body_jats(body: Body) -> str:
    body_content = "\n".join(section.content_raw or '' for section in body.sections)
    return f"<body>{body_content}</body>"
def _get_back_jats(back: Back) -> str:
    back_content = "\n".join(map(_get_appendix_group_jats, back.appendix_groups))
    return f"<back>{back_content}</back>"

def _get_appendix_group_jats(appendix_group: AppendixGroup) -> str:
    appendix_content = "\n".join(map(_get_general_section_jats, appendix_group.appendixes))
    return f"<appendix-group>{appendix_content}</appendix-group>"

def _get_general_section_jats(section: GeneralSection) -> str:
    return f"<sec>{section.content_raw or ''}</sec>"

class JatsExporter(Exporter[str]):
    def export(self, document: JATSDocument) -> str:
        return _get_article_jats(document.article)
