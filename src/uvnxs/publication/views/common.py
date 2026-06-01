from plone import api
import jats_importexport_client

def get_api_client():
    base_url = api.portal.get_registry_record("uvnxs.publication.base_url")
    configuration = jats_importexport_client.Configuration(host=base_url)
    return jats_importexport_client.ApiClient(configuration=configuration)
