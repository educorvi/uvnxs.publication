from plone import api
import jats_importexport_client

def get_api_client():
    base_url = api.portal.get_registry_record("uvnxs.publication.base_url")
    if api.portal.get_registry_record("uvnxs.publication.use_api_key"):
        api_key = api.portal.get_registry_record("uvnxs.publication.api_key")
        configuration = jats_importexport_client.Configuration(host=base_url)
        configuration.api_key['APIKeyHeader'] = api_key
    else:
        configuration = jats_importexport_client.Configuration(host=base_url)
    return jats_importexport_client.ApiClient(configuration=configuration)
